/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2098916111")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id = card_id.id",
    "name": "cards_tags",
    "updateRule": "@request.auth.id = card_id.id"
  }, collection)

  // remove field
  collection.fields.removeById("relation286869724")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_823787363",
    "hidden": false,
    "id": "relation1254922784",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "card_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2098916111")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id = deck_id.id",
    "name": "decks_tags",
    "updateRule": "@request.auth.id = deck_id.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1757051097",
    "hidden": false,
    "id": "relation286869724",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "deck_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("relation1254922784")

  return app.save(collection)
})
