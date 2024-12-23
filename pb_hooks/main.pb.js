routerAdd("GET", "/hello/:name", (c) => {
    let name = c.pathParam("name")

    return c.json(200, { "message": "Hello " + name })
})

routerAdd("GET", "/testing", (c) => {
    c.html(200, "<h1>Testing</h1>")
})