/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1757051097")

  // remove field
  collection.fields.removeById("json79845629")

  // remove field
  collection.fields.removeById("text3630795382")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1757051097")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json79845629",
    "maxSize": 0,
    "name": "cards",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3630795382",
    "max": 0,
    "min": 0,
    "name": "document",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
