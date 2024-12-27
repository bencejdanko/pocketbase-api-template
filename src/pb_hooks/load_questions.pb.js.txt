onAfterBootstrap((e) => {
    console.log("post bootstrap" + e.app);

    $app.dao().db()
        .newQuery(`
            DROP TABLE IF EXISTS questions;
            CREATE TABLE questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question_html TEXT NOT NULL,
                correct_answers TEXT NOT NULL,
                explain_html TEXT NOT NULL
            );
        `)
        .execute()
    $app.dao().db()
        .newQuery(`
            INSERT INTO questions (question_html, correct_answers, explain_html) 
            VALUES (?, ?, ?);
        `)
        .bind(
            "Suppose a weather forecast model predicts rain with a {likelihood}% accuracy. However, it incorrectly predicts rain {prior}% of the time. Let's say the actual chance of rain on any given day in a particular region is {false_positive_rate}%. What is the probability that it will rain on a day when the model predicts rain?",
            '["0.3", "0.5", "0.7"]', // Example correct answers as a JSON string
            "This is an example explanation for the probability calculation."
        )
        .execute();
});