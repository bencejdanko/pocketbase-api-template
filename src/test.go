package main

import (
	"fmt"
)

func main() {

	// testing multiline string
	prompt := fmt.Sprintf(`

We are trying to respond to a user request for new custom flashcards. If they do not specify a count, we will generate 5 new cards.

Input Box Label: Generate Cards

		`)

	fmt.Println(prompt)

}
