routerAdd("GET", "/testing", (c) => {
    c.html(200, "<h1>Testing</h1>");
});

/**
 * Whenever a new user is created, create a subscription
 * relation between the user and the default subscription plan.
 *
 * For documentation on hooks, see https://pocketbase.io/docs/js-event-hooks/#record-model-hooks
 * For documentation on creating new records, see https://pocketbase.io/docs/js-records/#create-new-record
 */
onRecordAfterCreateSuccess((e) => {
    // e.app
    // e.record

    let collection = $app.findCollectionByNameOrId("subscriptions");
    let record = new Record(collection);

    record.set("user_id", e.record.id);
    record.set("level", "free");

    $app.save(record);
}, "users");

/**
 * Whenever a user is created, assign them a default avatar.
 * This is done by intercepting the create request.
 *
 * avatars come from boringavatars.com
 */
onRecordCreateRequest((e) => {
    let randomNumber = Math.floor(Math.random() * 9) + 1;
    let avatar = $filesystem.fileFromPath(
        `./default-avatars/default${randomNumber}.svg`,
    );
    e.record.set("avatar", avatar);
    e.next();
}, "users");

/**
 * Whenever a user creates a deck, increment the user's deck count.
 */
onRecordAfterCreateSuccess((e) => {
    let user = $app.findRecordById("users", e.record.get("user_id"));
    user.set("deck_count", user.get("deck_count") + 1);
    $app.save(user);
    e.next()
}, "decks");

/**
 * Whenever a user deletes a deck, 
 * decrement the user's deck count.
 */
onRecordAfterDeleteSuccess((e) => {
    let user = $app.findRecordById("users", e.record.get("user_id"));
    user.set("deck_count", user.get("deck_count") - 1);
    $app.save(user);
    e.next();
})

/**
 * Whenever a card is created, increment the deck's card count.
 */

/**
 * Before a user creates a deck, ensure 
 * they don't exceed their deck limit.
 */


/**
 * Whenever a user deletes a card, 
 * decrement the deck's card count.
 */

/**
 * Before a user creates a card, ensure their account tier allows the card type.
 */