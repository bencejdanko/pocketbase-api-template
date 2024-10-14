routerAdd("GET", "/hello/:name", (c) => {
    let name = c.pathParam("name")

    return c.json(200, { "message": "Hello " + name })
})

routerAdd("GET", "/data220/week4/q", (c) => {
    let question = generateWeek4Problem()
    const html = `
        <html>
            <body>
                <form action="/data220/week4/check" method="POST">
                    <p>${question.text}</p>
                    <input type="hidden" name="correctAnswer" value="${question.correctAnswer}">
                    <input type="hidden" name="explanation" value="${question.explanation}">
                    <label for="answer">Your Answer:</label>
                    <input type="text" id="answer" name="answer">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    `;
    return c.html(200, html);
})

routerAdd("POST", "/data220/week4/check", (c) => {
    const userAnswer = c.formParam("answer");
    const correctAnswer = c.formParam("correctAnswer");
    const explanation = c.formParam("explanation");

    let message;
    if (userAnswer === correctAnswer) {
        message = "Correct!";
    } else {
        message = "Incorrect. The correct answer was " + correctAnswer;
    }

    const html = `
        <html>
            <body>
                <p>${message}</p>
                <p>Explanation: ${explanation}</p>
                <a href="/data220/week4/q">Try another question</a>
            </body>
        </html>
    `;
    return c.html(200, html);
})

function generateWeek4Problem() {
    const q_and_a = [
        {
            "question": "Suppose a weather forecast model predicts rain with a {likelihood}% accuracy. However, it incorrectly predicts rain {prior}% of the time. Let's say the actual chance of rain on any given day in a particular region is {false_positive_rate}%. What is the probability that it will rain on a day when the model predicts rain?",
            variables: { likelihood: Math.random().toFixed(2), prior: Math.random().toFixed(2), false_positive_rate: Math.random().toFixed(2) },
            "answer": (likelihood, prior, false_positive_rate) => {

                p_forecast = likelihood * prior + (false_positive_rate * (1 - prior))
                return likelihood * prior / p_forecast
            },
            "explain": `
We want to calculate the probability of it actually raining given that
the forecast predicts rain

prior: P(Rain), the probability of it actually raining

likelihood: P(Forecast|Rain), the probability of a forecast being made
when it actually rains

false_positive_rate: P(Forecast|No Rain), the probability of a forecast being
made when it does not actually rain

Operation: P(Rain|Forecast) = P(Forecast|Rain) * P(Rain) / P(Forecast)
P(Forecast) = P(Forecast|Rain) * P(Rain) + P(Forecast|No Rain) * P(No Rain)

return: P(Rain|Forecast),
            `
        }
    ]

    const random_q = q_and_a[Math.floor(Math.random() * q_and_a.length)]
    let questionText = random_q.question;

    for (const [key, value] of Object.entries(random_q.variables)) {
        questionText = questionText.replace(`{${key}}`, value);
    }

    // Get the correct answer
    const correctAnswer = selectedQuestion.correctAnswer(selectedQuestion.variables);

    return {
        question: questionText,
        answer: correctAnswer,
        explain: selectedQuestion.explain
    }
}