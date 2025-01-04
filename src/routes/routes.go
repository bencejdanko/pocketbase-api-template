package routes

import (
	"context"
	"fmt"
	"log"
	"net/http"

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

		// register "POST /api/myapp/settings" route (allowed only for authenticated users)
		se.Router.POST("/api/myapp/settings", func(e *core.RequestEvent) error {
			// do something ...
			return e.JSON(http.StatusOK, map[string]bool{"success": true})
		}).Bind(apis.RequireAuth())

		// Add more routes here
		se.Router.GET("/newroute", func(e *core.RequestEvent) error {
			return e.String(http.StatusOK, "This is a new route")
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

		se.Router.GET("/example_call", func(e *core.RequestEvent) error {

			e.Response.Header().Set("Content-Type", "text/plain")
			e.Response.Header().Set("Transfer-Encoding", "chunked")

			flusher, ok := e.Response.(http.Flusher)

			if !ok {
				http.Error(e.Response, "Streaming unsupported!", http.StatusInternalServerError)
				return nil
			}

			prompt := "Tell me about New York?"

			// Call the GenerateContentStream method.
			for result, err := range client.Models.GenerateContentStream(
				ctx,
				"gemini-2.0-flash-exp",
				genai.Text(prompt),
				nil,
			) {
				if err != nil {
					log.Fatal(err)
				}
				fmt.Fprint(e.Response, result.Candidates[0].Content.Parts[0].Text)
				flusher.Flush()
			}

			return nil
		})

		// se.Router.POST("/conversations/{deck_id}", func(e *core.RequestEvent) error {

		// 	deck_id := e.Request.PathValue("deck_id")

		// 	collection, err := app.FindCollectionByNameOrId("conversations")

		// 	if err != nil {
		// 		return err
		// 	}

		// 	record := core.newRecord(collection)

		// 	record.Set("deck_id", deck_id)

		// 	err = app.Save(record)

		// 	if err != nil {
		// 		return err
		// 	}

		// 	return e.JSON(http.StatusOK, map[string]bool{"success": true})
		// }).Bind(apis.RequireAuth())

		// se.Router.GET("/conversations/{id}/messages/{message_id}/text/{text}", func(e *core.RequestEvent) error {

		// 	type document struct {
		// 		document string
		// 	}

		// 	id := e.Request.PathValue("id")

		// 	app.DB().NewQuery("SELECT document FROM decks WHERE id = {:id}").
		// 	Bind(dbx.Params{
		// 		"id":
		// 	})

		// 	chat := e.Request.PathValue("chat")

		// 	e.Response.Header().Set("Content-Type", "text/plain")
		// 	e.Response.Header().Set("Transfer-Encoding", "chunked")

		// 	flusher, ok := e.Response.(http.Flusher)

		// 	if !ok {
		// 		http.Error(e.Response, "Streaming unsupported!", http.StatusInternalServerError)
		// 		return nil
		// 	}

		// 	prompt := fmt.Sprintf("You are an assistant. Please answer this question: %s.", chat)

		// 	// Call the GenerateContentStream method.
		// 	for result, err := range client.Models.GenerateContentStream(
		// 		ctx,
		// 		"gemini-2.0-flash-exp",
		// 		genai.Text(prompt),
		// 		nil,
		// 	) {
		// 		if err != nil {
		// 			log.Fatal(err)
		// 		}
		// 		fmt.Fprint(e.Response, result.Candidates[0].Content.Parts[0].Text)
		// 		flusher.Flush()
		// 	}

		// 	return nil
		// }).Bind(apis.RequireAuth())

		return se.Next()
	})
}
