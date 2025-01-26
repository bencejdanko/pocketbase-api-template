/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_823787363")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id = deck_id.user_id.id",
    "listRule": "@request.auth.id = deck_id.user_id.id",
    "updateRule": "@request.auth.id = deck_id.user_id.id",
    "viewRule": "@request.auth.id = deck_id.user_id.id"
  }, collection)

  // remove field
  collection.fields.removeById("bool2086131741")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "select2363381545",
    "maxSelect": 1,
    "name": "type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "flashcard",
      "input",
      "matching"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_823787363")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id = deck_id.user.id",
    "listRule": "@request.auth.id = deck_id.user.id",
    "updateRule": "@request.auth.id = deck_id.user.id",
    "viewRule": "@request.auth.id = deck_id.user.id"
  }, collection)

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool2086131741",
    "name": "approved",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // remove field
  collection.fields.removeById("select2363381545")

  return app.save(collection)
})
