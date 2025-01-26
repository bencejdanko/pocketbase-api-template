/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2098916111")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "@request.auth.id = deck_id.id",
    "listRule": "",
    "updateRule": "@request.auth.id = deck_id.id",
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2098916111")

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
