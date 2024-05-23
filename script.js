
var currentQuestion = 0;
var score = 0;
var selectedQuestions; 
var totalQuestions; 
var repeatOnIncorrect = false;

// Fungsi untuk menampilkan halaman berdasarkan ID
function showPage(pageId) {
    var pages = document.getElementsByClassName('page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    document.getElementById(pageId).style.display = 'block';
}

var questions = {
    pertambahan: {
        mudah: [
            { text: "Berapakah hasil dari 2 + 2?", answers: [{ text: "3", correct: false }, { text: "4", correct: true }, { text: "5", correct: false }, { text: "6", correct: false }] },
            { text: "Berapakah hasil dari 3 + 5?", answers: [{ text: "6", correct: false }, { text: "7", correct: false }, { text: "8", correct: true }, { text: "9", correct: false }] }
        ],
        sedang: [
            // Tambahkan pertanyaan untuk tingkat kesulitan sedang
        ],
        sulit: [
            // Tambahkan pertanyaan untuk tingkat kesulitan sulit
        ]
    },
    pengurangan: {
        mudah: [
            // Tambahkan pertanyaan untuk tingkat kesulitan mudah
        ],
        sedang: [
            // Tambahkan pertanyaan untuk tingkat kesulitan sedang
        ],
        sulit: [
            // Tambahkan pertanyaan untuk tingkat kesulitan sulit
        ]
    },
    perkalian: {
        mudah: [
            // Tambahkan pertanyaan untuk tingkat kesulitan mudah
        ],
        sedang: [
            // Tambahkan pertanyaan untuk tingkat kesulitan sedang
        ],
        sulit: [
            // Tambahkan pertanyaan untuk tingkat kesulitan sulit
        ]
    },
    pembagian: {
        mudah: [
            // Tambahkan pertanyaan untuk tingkat kesulitan mudah
        ],
        sedang: [
            // Tambahkan pertanyaan untuk tingkat kesulitan sedang
        ],
        sulit: [
            // Tambahkan pertanyaan untuk tingkat kesulitan sulit
        ]
    }
};

function startQuiz(subject, difficulty) {
    selectedQuestions = questions[subject][difficulty];
    totalQuestions = selectedQuestions.length;
    showPage('quiz-page');
    document.getElementById('quiz-title').innerText = 'Soal ' + subject + ' - ' + difficulty;
    displayQuestion(selectedQuestions[currentQuestion]);
}

function displayQuestion(question) {
    document.getElementById('nextQuestionSound').play();
    document.getElementById('question-text').innerText = question.text;
    var answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';
    question.answers.forEach(function(answer) {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('main-button');
        button.onclick = function() {
            selectAnswer(this, answer.correct);
        };
        answerButtons.appendChild(button);
    });
}

// Fungsi untuk memilih jawaban
function selectAnswer(button, correct) {
    var previousSelectedButton = document.querySelector('.selected');
    if (previousSelectedButton) {
        previousSelectedButton.classList.remove('selected');
    }
    button.classList.add('selected');
    if (correct) {
        checkAnswer(true);
        nextQuestion();
    } else {
        // Tampilkan modal
        document.getElementById('wrongAnswerSound').play();
        var modal = document.getElementById("myModal");
        modal.style.display = "block";

        // Ketika pengguna mengklik tombol "Coba lagi"
        document.getElementById("retryBtn").onclick = function() {
            modal.style.display = "none"; // Sembunyikan modal
            displayQuestion(selectedQuestions[currentQuestion]); // Tampilkan pertanyaan lagi
        }

        // Ketika pengguna mengklik tombol "Lanjutkan"
        document.getElementById("nextBtn").onclick = function() {
            modal.style.display = "none"; // Sembunyikan modal
            checkAnswer(false); // Tandai jawaban sebagai salah
            nextQuestion(); // Pindah ke pertanyaan berikutnya
        }
    }
}

function toggleRepeatOnIncorrect() {
    repeatOnIncorrect = !repeatOnIncorrect;
    var repeatButton = document.getElementById('repeat-toggle-button');
    repeatButton.innerText = repeatOnIncorrect ? 'On' : 'Off';
}

function checkAnswer(correct) {
    if (correct) {
        score++;
    }
}


function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= totalQuestions) {
        showFinalScore();
    } else {
        displayQuestion(selectedQuestions[currentQuestion]);
    }
}

function showFinalScore() {
    document.getElementById('score-text').innerText = "Skor Anda: " + score + "/" + totalQuestions;
    showPage('score-page');
    score = 0;
    currentQuestion = 0;
}

function retryQuiz() {
    score = 0;
    currentQuestion = 0;
    showPage('landing-page');
}

showPage('landing-page');
