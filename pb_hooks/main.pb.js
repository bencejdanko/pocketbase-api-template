routerAdd("GET", "/hello/:name", (c) => {
    let name = c.pathParam("name")

    return c.json(200, { "message": "Hello " + name })
})

routerAdd("GET", "/testing", (c) => {
    c.html(200, "<h1>Testing</h1>")
})

routerAdd("GET", "/data220/week4/q", (c) => {

    function generateWeek4Problem() {
        const q_and_a = [
            {
                html: `


                    <p>Suppose a weather forecast model predicts rain with a {likelihood} accuracy.</p> 
                
                    <p>However, it incorrectly predicts rain {false_positive_rate} of the time when it's not going to rain. </p>
                    
                    <p>Let's say the actual chance of rain on any given day in a particular region is {prior}.</p>
                
                    <p>What is the probability that it will rain on a day when the model predicts rain?</p>
                `,

                // all between 0.3 and 0.8
                variables: { 
                    likelihood: (Math.random() * 0.5 + 0.3).toFixed(2), 
                    prior: (Math.random() * 0.5 + 0.3).toFixed(2), 
                    false_positive_rate: (Math.random() * 0.5 + 0.3).toFixed(2) 
                },

                correctAnswer: ({ likelihood, prior, false_positive_rate }) => {
                    let p_forecast = likelihood * prior + (false_positive_rate * (1 - prior))
                    return [{
                        name: "Probability of rain",
                        value: (likelihood * prior / p_forecast).toFixed(2)
                    }]
                },

                explain: `
                    
                    <p> $ P(Rain|Forecast) = P(Forecast|Rain) * P(Rain) / P(Forecast)
                    P(Forecast) </p>
                    
                     <p> $ P(Rain|Forecast) = P(Forecast|Rain) * P(Rain) + P(Forecast|No Rain) * P(No Rain) $ </p>
                    
                    return: $ P(Rain|Forecast) $,
                `
            },

            {
                html: `
                
                    <p>A particular disease is more common in older people. Let's consider two age groups: under 50 and over 50.</p> 
                    
                    <p>The prevalence of the disease is {prior_disease_under50} in the under 50 group and {prior_disease_over50} in the over 50 group.</p> 
                    
                    <p>A screening accuracy test has different accuracy levels for these age groups: {accuracy_under50} for under 50s and {accuracy_over50} for over 50s. </p> 
                    
                    <p>However, the test has a {false_positive_rate} false positive rate for both age groups. </p>
                    
                    <p> If a person of both over or under 50 tests positive for the disease, what is the probability that they have the disease? </p>
                
                `
                ,

                variables: { 
                    prior_disease_under50: (Math.random() * 0.5 + 0.3).toFixed(2), 
                    prior_disease_over50: (Math.random() * 0.5 + 0.3).toFixed(2), 
                    accuracy_under50: (Math.random() * 0.5 + 0.3).toFixed(2), 
                    accuracy_over50: (Math.random() * 0.5 + 0.3).toFixed(2), 
                    false_positive_rate: (Math.random() * 0.5 + 0.3).toFixed(2) 
                },

                correctAnswer: ({ prior_disease_under50, prior_disease_over50, accuracy_under50, accuracy_over50, false_positive_rate }) => {

                    function bayesian_update_disease(prior, accuracy, false_positive_rate) {
                        return accuracy * prior / (accuracy * prior + false_positive_rate * (1 - prior))
                    }

                    return [
                        {
                            name: "under 50", 
                            value: bayesian_update_disease(prior_disease_under50, accuracy_under50, false_positive_rate).toFixed(2)
                        
                        }, 
                        {
                            name: "over 50", 
                            value: bayesian_update_disease(prior_disease_over50, accuracy_over50, false_positive_rate).toFixed(2)
                        }
                    ]
                },

                explain: `
                    <p> $ P(A|B) = P(B|A) * P(A) / [P(B|A) * P(A) + P(B|not A) * P(not A)] $ </p>
                ` 
            },

            {
                week: 4,

                html: `
                    <p> Suppose a certain disease $ D $ occurs in {prior} of the population. </p>
                    
                    <p> A test T for this disease has an accuracy of {accuracy}. If the disease D is not present, there is still a {false_positive_rate} chance that the test will return a positive result. </p>
                `,

                variables: {
                    prior: (Math.random() * 0.5 + 0.3).toFixed(2),
                    accuracy: (Math.random() * 0.5 + 0.3).toFixed(2),
                    false_positive_rate: (Math.random() * 0.5 + 0.3).toFixed(2)
                },

                correctAnswer: ({ prior, accuracy, false_positive_rate }) => {
                    return [{
                        name: "Probability of disease",
                        value: (accuracy * prior / (accuracy * prior + false_positive_rate * (1 - prior))).toFixed(2)
                    }]
                },

                explain: ``
            },

            {
                week: 4,
                html: `
                    <p> Suppose that two factories supply light bulbs to the market. Factory X's bulb's work for over 5000 hours in {prior_x}, while Factory Y's bulbs work for over 5000 hours in {prior_y} of the cases. </p>

                    <p> It is known that factory X supplies {accuracy_x} of the bulbs and factory Y supplies {accuracy_y} of the bulbs. </p>
                    
                    </p>

                    <p> What is the chance that a purchased bulb will last over 5000 hours? </p>
                `,

                variables: {
                    prior_x: (Math.random() * 0.5 + 0.3).toFixed(2),
                    prior_y: (Math.random() * 0.5 + 0.3).toFixed(2),
                    accuracy_x: (Math.random() * 0.5 + 0.3).toFixed(2),
                    accuracy_y: (Math.random() * 0.5 + 0.3).toFixed(2)
                },

                correctAnswer: ({ prior_x, prior_y, accuracy_x, accuracy_y }) => {
                    return [{
                        name: "Probability of lasting over 5000 hours",
                        value: ((prior_x * accuracy_x + prior_y * accuracy_y)).toFixed(2)
                    }]
                },

                explain: ``

            },

            {
                week: 6,
                html: `

                    <p>Do diabetics have a different blood pressure than the general population?</p>

                    <p>
                    The mean systolic blood pressure of the general population is {mean_general}.
                    </p>

                    <p>Sample of {sample_size}: $ x\bar = {mean_sample} $ and $ s = {s} $ </p>

                    <p>The researcher decides of a significance level of {alpha} </p>

                    <p> What kind of test is this? </p>

                    <p> Do we reject the null hypothesis? </p>
                
                `,

                variables: {
                    mean_general: Math.floor(Math.random() * 50 + 100),
                    sample_size: Math.floor(Math.random() * 50 + 100),
                    mean_sample: Math.floor(Math.random() * 50 + 100),
                    s: Math.floor(Math.random() * 10 + 10),
                    alpha: Math.random().toFixed(2)
                },

                correctAnswer: () => {
                    return []
                },
                explain: ``
            }
        ]

        const random_q = q_and_a[Math.floor(Math.random() * q_and_a.length)]
        let question_html = random_q.html;

        for (const [key, value] of Object.entries(random_q.variables)) {
            question_html = question_html.replace(`{${key}}`, ` <b class='text-red-500'> $ ${value} $ </b> `);
        }

        // Get the correct answer
        const correctAnswer = random_q.correctAnswer(random_q.variables);
        console.log(correctAnswer)

        return {
            html: question_html,
            correctAnswers: correctAnswer,
            explanation: random_q.explain
        }
    }

    let question = generateWeek4Problem()
    const html = `
        <html>

            <head>
                <script src="https://cdn.tailwindcss.com"></script>
                <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
                <script>
                MathJax = {
                    tex: {
                        inlineMath: [['$', '$'], ['\\(', '\\)']]
                    },
                    svg: {
                        fontCache: 'global'
                    }
                    };
                </script>

                <style type="text/tailwindcss">

                    :root {
                        background-color: #f7fafc;
                        @apply m-5
                    }

                    button {
                        padding: 0.5rem;
                        margin: 0.5rem;
                        background-color: #3182ce;
                        color: white;
                        border: none;
                        border-radius: 0.25rem;
                    }


                    input[type="text"] {
                        padding: 0.5rem;
                        width: 100%;
                        border-radius: 0.25rem;
                        border: 1px solid #e2e8f0;

                        @apply mt-3 mb-3
                    }

                    p {
                        @apply text-lg mb-1
                    }
                </style>
            </head>

            <body>
                <form action="/data220/week4/check" method="POST">
                    <div>${question.html}</div>
                    <div class='p-2 bg-blue-100 rounded mt-3 mb-3'>
                    ${question.correctAnswers.map((answer, index) => `
                        <label for="answer${index}">${answer.name}:</label>
                        <input type="text" id="answer${index}" name="answer${index}">
                    `).join('')}
                    <input type="hidden" name="correctAnswers" value='${JSON.stringify(question.correctAnswers)}'>
                    </div>


                    <input type="hidden" name="explanation" value="${question.explanation}">
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
    `;
    return c.html(200, html);
})

routerAdd("POST", "/data220/week4/check", (c) => {
    const correctAnswers = JSON.parse(c.formValue("correctAnswers"));
    const explanation = c.formValue("explanation");

    let allCorrect = true;
    correctAnswers.forEach((correctAnswer, index) => {
        const userAnswer = c.formValue(`answer${index}`);
        if (userAnswer !== correctAnswer.value) {
            allCorrect = false;
        }
    });

    let message;
    if (allCorrect) {
        message = "Correct!";
    } else {
        message = "Incorrect. The correct answers were " + correctAnswers.join(", ");
    }

    const html = `
        <html>

            <head>
                <script src="https://cdn.tailwindcss.com"></script>
                <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
                <script>
                MathJax = {
                    tex: {
                        inlineMath: [['$', '$'], ['\\(', '\\)']]
                    },
                    svg: {
                        fontCache: 'global'
                    }
                    };
                </script>

                <style type="text/tailwindcss">

                    :root {
                        background-color: #f7fafc;
                        @apply m-5
                    }

                    button {
                        padding: 0.5rem;
                        margin: 0.5rem;
                        background-color: #3182ce;
                        color: white;
                        border: none;
                        border-radius: 0.25rem;
                    }


                    input[type="text"] {
                        padding: 0.5rem;
                        width: 100%;
                        border-radius: 0.25rem;
                        border: 1px solid #e2e8f0;

                        @apply mt-3 mb-3
                    }

                    p {
                        @apply text-sm mb-1 font-serif
                    }
                </style>
            </head>

            <body>
                <p>${message}</p>
                ${explanation}
                <p><button> <a href="/data220/week4/q">Try another question</a> </button></p>
            </body>
        </html>
    `;
    return c.html(200, html);
})