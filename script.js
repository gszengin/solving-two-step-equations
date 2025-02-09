let score = 0;
let timeLeft = 60;
let timer;
let correctAnswers = 0;
let wrongAnswers = 0;
let correctStreak = 0; // Declare correctStreak
let currentQuestion = {};

// Function to generate a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random integers
function generateQuestion() {
    let type = getRandomInt(1, 8);
    let x, num1, num2, answer, question;

    num1 = getRandomInt(1, 5); // First operation (addition or subtraction)
    num2 = getRandomInt(2, 5); // Second operation (multiplication or division)

    switch (type) {
        case 1: // num2 * x - num1 = result
            x = getRandomInt(1, 10);
            answer = x;
            question = `${num2}x - ${num1} = ${num2 * x - num1}`;
            break;
        case 2: // num2 * x + num1 = result
            x = getRandomInt(1, 10);
            answer = x;
            question = `${num2}x + ${num1} = ${num2 * x + num1}`;
            break;
        case 3: // (x / num2) - num1 = result
            x = num2 * getRandomInt(1, 10); // Ensure x is divisible by num2
            answer = x;
            question = `<div style="display: flex; justify-content: center; align-items: center;">
                            <div style="display: inline-flex; flex-direction: column; align-items: center; text-align: center;">
                                <span style="border-bottom: 2px solid black; padding: 2px;">x</span>
                                <span>${num2}</span>
                            </div>
                            &nbsp;- ${num1} = ${(x / num2) - num1}
                        </div>`;
            break;
        case 4: // (x / num2) + num1 = result
            x = num2 * getRandomInt(1, 10); // Ensure x is divisible by num2
            answer = x;
            question = `<div style="display: flex; justify-content: center; align-items: center;">
                            <div style="display: inline-flex; flex-direction: column; align-items: center; text-align: center;">
                                <span style="border-bottom: 2px solid black; padding: 2px;">x</span>
                                <span>${num2}</span>
                            </div>
                            &nbsp;+ ${num1} = ${(x / num2) + num1}
                        </div>`;
            break;

        case 5: // (x - num1) * num2 = result
            x = getRandomInt(num1 + 1, num1 + 10); // Ensure x - num1 is positive
            answer = x;
            question = `${num2 !== 1 ? num2 + '(x - ' + num1 + ')' : 'x - ' + num1} = ${(x - num1) * num2}`;
            break;
        
        case 6: // (x + num1) * num2 = result
            x = getRandomInt(1, 10);
            answer = x;
            question = `${num2 !== 1 ? num2 + '(x + ' + num1 + ')' : 'x + ' + num1} = ${(x + num1) * num2}`;
            break;

        case 7: // (x - num1) / num2 = result
            x = num2 * getRandomInt(1, 10) + num1; // Ensure (x - num1) is divisible by num2
            answer = x;
            question = `<div style="display: flex; justify-content: center; align-items: center;">
                            <div style="display: inline-flex; flex-direction: column; align-items: center; text-align: center;">
                                <span style="border-bottom: 2px solid black; padding: 2px;">x - ${num1}</span>
                                <span>${num2}</span>
                            </div>
                            &nbsp;= ${(x - num1) / num2}
                        </div>`;
            break;

        case 8: // (x + num1) / num2 = result
            x = num2 * getRandomInt(1, 10) - num1; // Ensure (x + num1) is divisible by num2
            answer = x;
            question = `<div style="display: flex; justify-content: center; align-items: center;">
                            <div style="display: inline-flex; flex-direction: column; align-items: center; text-align: center;">
                                <span style="border-bottom: 2px solid black; padding: 2px;">x + ${num1}</span>
                                <span>${num2}</span>
                            </div>
                            &nbsp;= ${(x + num1) / num2}
                        </div>`;
            break;
    }

    // Replace '*' with '×' for display purposes
    if (typeof question === 'string') {
        question = question.replace(/\*/g, '×');
    }

    currentQuestion = { answer: x };  // Store correct value of x
    document.getElementById("question").innerHTML = question;
    document.getElementById("answer").value = ""; // Clear previous answer
}


// Allow Enter key to submit answer
document.addEventListener("DOMContentLoaded", function () {
    // Initially disable the answer input and submit button
    document.getElementById("answer").disabled = true;
    document.querySelector("#question-box button").disabled = true;

    document.getElementById("startButton").addEventListener("click", startGame);
    document.getElementById("answer").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    // Generate the first question but disable answering
    generateQuestion();
});



// Check user answer
function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.trim(); // Remove spaces
    let correctAnswer = Number(currentQuestion.answer); // Ensure correct answer is a number
    let feedbackElement = document.getElementById("feedback"); // Get feedback element

    if (userAnswer === "") {
        feedbackElement.innerText = "⚠️ Please enter an answer.";
        return;
    }

    let userNumber = Number(userAnswer);

    if (isNaN(userNumber)) {
        feedbackElement.innerText = "❌ Please enter a valid number.";
        return;
    }

    if (userNumber === correctAnswer) {
        score++;
        correctAnswers++;
        correctStreak++;

        let positiveFeedback = [
            "Great job! 🎉",
            "You're a math master! 🔥",
            "Keep it up! 🚀",
            "Awesome work! ✅",
            "You’re nailing this! 🌟"
        ];

        let feedbackMessage = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];

        if (correctStreak === 3) {
            feedbackMessage = "Incredible! You're on fire! 🔥🔥🔥";
        } else if (correctStreak === 5) {
            feedbackMessage = "Math genius alert! 🚀💡";
        } else if (correctStreak === 10) {
            feedbackMessage = "Unstoppable! 🏆 You should be teaching this! 👏";
        }

        feedbackElement.innerText = feedbackMessage;
    } else {
        correctStreak = 0;
        wrongAnswers++;
        feedbackElement.innerText = "❌ Incorrect, try again!";
    }

    document.getElementById("score").textContent = score;
    generateQuestion();
}


// Start the challenge
function startGame() {
    score = 0;
    timeLeft = parseInt(document.querySelector('input[name="timer"]:checked').value);

    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timeLeft;

    if (timer) {
        clearInterval(timer);
    }

    generateQuestion();

    // Enable the answer input field and the submit button
    document.getElementById("answer").disabled = false;
    document.querySelector("#question-box button").disabled = false;

    // Clear the previous answer field value
    document.getElementById("answer").value = "";

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();  // ✅ Ensure the game ends when time runs out
        }
    }, 1000);
}




// End the challenge
function endGame() {
    clearInterval(timer);
    document.getElementById("final-score").innerText = score;
    document.getElementById("end-screen").classList.remove("hidden");

    // ❌ Disable input and submit button after game ends
    document.getElementById("answer").disabled = true;
    document.querySelector("#question-box button").disabled = true;
}


// Generate and display certificate
function generateCertificate() {

    document.getElementById("certificate").style.display = "block";

    let playerName = document.getElementById("player-name").value.trim();
    if (playerName === "") {
        playerName = "Student"; // Default if no name is entered
    }

    let totalQuestions = correctAnswers + wrongAnswers;
    let percentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : 0;

    // Achievement messages based on performance
    let achievementMessage = "";
    if (percentage === 100) {
        achievementMessage = "Outstanding performance! You achieved a perfect score! 🌟";
    } else if (percentage >= 90) {
        achievementMessage = "Amazing work! You're mastering one-step equations like a pro! 🚀";
    } else if (percentage >= 75) {
        achievementMessage = "Great job! You're on your way to becoming a math expert! 💡";
    } else if (percentage >= 50) {
        achievementMessage = "Good effort! Keep practicing and you'll be a pro in no time! 🔥";
    } else {
        achievementMessage = "Keep going! Every mistake is a step toward improvement. 💪";
    }

    // Get the selected timer challenge
    let selectedTimer = document.querySelector('input[name="timer"]:checked')?.value || "Unknown";

    // Certificate template
    let certificateHTML = `
        <h2>Solving Two-Step Equations Challenge Certificate</h2>
        <p><strong>Congratulations, ${playerName}!</strong></p>
        <p>You completed the Solving Two-Step Equations Challenge in <strong>${selectedTimer} seconds</strong> with the following results:</p>
        <ul>
            <p><strong>Correct Answers:</strong> ${correctAnswers} and <strong>Wrong Answers:</strong> ${wrongAnswers}</p>
            <p><strong>Total Questions Attempted:</strong> ${totalQuestions}</p>
            <p><strong>Accuracy:</strong> ${percentage}%</p>
        </ul>
        <p>${achievementMessage}</p>
        <p>Keep up the great work, and continue sharpening your math skills! </p>
    `;

    document.getElementById("certificate").innerHTML = certificateHTML;
}


// Save certificate as an image
function saveCertificateAsImage() {
    html2canvas(document.getElementById("certificate")).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "Equation_Certificate.png";
        link.click();
    });
}


function saveCertificateAsPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: "landscape", // Landscape format
        unit: "in", // Use inches
        format: [11, 8.5] // US Letter size (11 x 8.5 inches)
    });

    const certificateElement = document.getElementById("certificate");

    html2canvas(certificateElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        const margin = 0.5; // Adjust bottom margin (in inches)
        const imgWidth = 10.2; // Keep some space on left/right
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.setFontSize(15); // Adjust font size (default is 16)

        pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight - margin); // Adds spacing at bottom
        pdf.save("Solving_Two_Step_Equations_Certificate.pdf"); // Updated file name
    });
}
