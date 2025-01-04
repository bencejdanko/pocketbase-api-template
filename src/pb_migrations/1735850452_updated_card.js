/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_823787363")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "@request.auth.id = deck_id.user.id",
    "listRule": "@request.auth.id = deck_id.user.id",
    "updateRule": "@request.auth.id = deck_id.user.id",
    "viewRule": "@request.auth.id = deck_id.user.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_823787363")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
