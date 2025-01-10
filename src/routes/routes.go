package routes

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"

	"google.golang.org/genai"
)

const gemini_api_key = "AIzaSyBwUi28-4mveZ_LIbtP-drSqwtaMS1U2y4"

// RegisterRoutes registers the custom routes
func RegisterRoutes(app core.App) {
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// register "GET /hello/{name}" route (allowed for everyone)
		se.Router.GET("/hello/{name}", func(e *core.RequestEvent) error {
			name := e.Request.PathValue("name")
			return e.String(http.StatusOK, "Hello "+name)
		})

		ctx := context.Background()
		// Using this guide: https://ai.google.dev/gemini-api/docs/sdks
		client, err := genai.NewClient(ctx, &genai.ClientConfig{
			APIKey:  gemini_api_key,
			Backend: genai.BackendGoogleAI,
		})

		if err != nil {
			log.Fatal("Unable to create Gemini client: ", err)
		}

		/**
		* Query the an LLM to generate flashcards
		 */
		se.Router.GET("/create_cards", func(e *core.RequestEvent) error {

			//e.Response.Header().Set("Content-Type", "text/plain")

			// read/scan the request body into a typed struct
			body := struct {
				UserQuery string `json:"user_query"`
				DeckId    string `json:"deck_id"`
			}{}

			if err := e.BindBody(&body); err != nil {
				return e.BadRequestError("Invalid request body", err)
			}

			// do I need to verify that current user ID has access to the deck? Check later

			// query the database for the current cards
			cards := []struct {
				content string `db:"content"`
			}{}

			app.DB().
				NewQuery("SELECT content FROM cards WHERE deck_id = {:deck_id}").
				Bind(dbx.Params{
					"deck_id": body.DeckId,
				}).
				All(&cards)

			// if there are no cards?

			// Turn cards into string for prompt generation
			var currentCards string

			if len(cards) == 0 {
				currentCards = "The user has created no cards yet."
			} else {
				for _, card := range cards {
					currentCards += card.content + "\n"
				}
			}

			// Create a multiline prompt with custom string variables
			prompt := fmt.Sprintf(`
				We are trying to respond to a user request for new custom flashcards. If they do not specify a count, we will generate 5 new cards.

				Input Box Label: Generate Cards
				User input: %s

				Here are the users current cards: %s

				We should try to avoid duplicating these cards and the subjects they cover, but we should keep them in mind.

			`, body.UserQuery, currentCards)

			result, err := client.Models.GenerateContent(ctx, "gemini-2.0-flash-exp", genai.Text("What is the capital of France?"), nil)

			if err != nil {
				log.Fatal(err)
			}

			text := result.Candidates[0].Content.Parts[0].Text

			return e.JSON(http.StatusOK, map[string]string{"response": text})
		}).Bind(apis.RequireAuth())

		return se.Next()
	})
}
