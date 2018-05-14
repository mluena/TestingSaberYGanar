function application(){
    'use strict';

// Array Questions

var questions = [
    {
        id: 0,
        title: '¿Cuántos años tiene María?',
        answers: [
            { id: 1, answer: '25' },
            { id: 2, answer: '33' },
            { id: 3, answer: '37' }
        ],
        correctAnswer: 2
    },
    {
        id: 1,
        title: '¿Cuál es la capital de Zambia?',
        answers: [
            { id: 1, answer: 'Lusaka' },
            { id: 2, answer: 'Harare' },
            { id: 3, answer: 'Madrid' }
        ],
        correctAnswer: 1
    },
    {
        id: 2,
        title: '¿Cuál es el nombre completo de Freud?',
        answers: [
            { id: 1, answer: 'Adolf' },
            { id: 2, answer: 'Sefarad' },
            { id: 3, answer: 'Sigmund' }
        ],
        correctAnswer: 3
    },
    {
        id: 3,
        title: '¿Cuál es el animal más rápido del mundo?',
        answers: [
            { id: 1, answer: 'Guepardo' },
            { id: 2, answer: 'León' },
            { id: 3, answer: 'Tortuga' }
        ],
        correctAnswer: 1
    }
];

// Global variables

var originalQuestions = questions;
var score = 0;
var time;
var btnStartGame = document.getElementById('start__button');
var btnNextQuestion = document.querySelector('.next__button');
let timeCounter;
//Function to start the game

function onStart(){
    var dataSection = document.querySelector('.data__container');
  //  btnStartGame.classList.add('invisible');
    dataSection.classList.remove('invisible');
    btnNextQuestion.classList.toggle('invisible');
    startTime();
    handleNextQuestion();
}

// Function to go to check question, print next one and restart time

function onNextQuestion(){
    time = 21;
    recalculateScore();
    handleNextQuestion();
}

// Function to print questions and answers

function handleNextQuestion(){
    var btnNextQuestion = document.querySelector('.next__button').disabled = true;
    if (questions.length>0){
        printQuestion(questions[0]);
    } 
    if (questions.length == 0) {
        setScores();
    } 
    enableBtnNextQuestion();
    questions = questions.slice(1);
}
function printQuestion(question){
    var questionsPosition = document.querySelector('.questions__container');
    questionsPosition.innerHTML = (`<h3 class="question__title" id=${question.id}>${question.title}</h3>`);
    for (const answers of question.answers) {
        var answerValue = answers.answer;
        var answerID = answers.id;
        questionsPosition.innerHTML += 
            `<label for="${answerID}">${answerValue}</label>
            <input id="${answerID}" type="radio" value="${answerValue}" name="answerOption" class="input__answer" />`    
    }
}
//
//Check if radio buttons are selected to enabled/disabled next question button
function handleQuestionsTime(on){
    timeCounter = setInterval(function () {
        startTime();
        enableBtnNextQuestion();
    }, 1000);
}



}
function enableBtnNextQuestion() {
    function enableChecked() {
        var radios = document.querySelectorAll('.input__answer');
        if ((radios[0].checked)||(radios[1].checked)||(radios[2].checked)){
            btnNextQuestion.disabled = false;
        }   
        else{
            btnNextQuestion.disabled = true;
        }
    }
    setInterval(enableChecked,1000);
}
// Function to keep track of time

function startTime(){
    time = 21;
    function timeControl(){
        if (time>0){
            time-=1;
            document.querySelector('.time__container').innerHTML = time;
        }
        else {
            time = 21;
            handleNextQuestion();
        }          
    }
    (timeControl,1000);
}

// 
//Check if user selected answer iscorrect

function recalculateScore(){
    var radios = document.querySelectorAll('.input__answer');
    var questionID = document.querySelector('.question__title').id;
    var currentQuestion = originalQuestions.find(function(originalQuestion){
        return (questionID == originalQuestion.id);
    });
    for (var i = 0; i < radios.length; i++){
        if (radios[i].checked){
            var selectedAnswerID = radios[i].id;
            if(Number(selectedAnswerID) === currentQuestion.correctAnswer){
                recalculateCorrectAnswer();
            }
            else{
                recalculateWrongAnswer();
            } 
        }          
    }
}

//
// CALCULATING SCORE
// Recalcute score if user's answer is correct

function recalculateCorrectAnswer() {
    if (time >= 18) {
        score = score + 2;
    }
    if (time < 18 && time >= 10) {
        score = score + 1;
    }
    if (time < 10) {
        score = score;
    }
    document.querySelector('.scores__container').innerHTML = score;
}

// Recalcute score if user's answer is wrong

function recalculateWrongAnswer(){
    if (time > 10) {
        score = score - 1;
    }
    if (time <= 10) {
        score = score - 2;
    }
    document.querySelector('.scores__container').innerHTML = score;
}

//

 function setScores(){
    var btnNextQuestion = document.querySelector('.playingBoard');
    btnNextQuestion.classList.add('invisible');
    var userInfo = document.querySelector('.user__info');
    userInfo.classList.remove('invisible');
    var btnAddUserName = document.querySelector('.addUser');
    btnAddUserName.addEventListener("click", printUserInfo);
 }
 
 function printUserInfo() {
    var userName = document.querySelector('.user__name').value;
    if (userName != 0){
        var usersList = document.querySelector('.usersList');
        var content = '<li placeholder="Introduce tu nombre">' + userName + ': ' + score + '</li>';
        usersList.innerHTML += content;
        var historicSection = document.querySelector('.historic');
        historicSection.classList.remove('invisible');
        var btnNewGame = document.querySelector('.startNewGame');
        
    }
    btnNewGame.addEventListener("click", reset);

 }
 function reset(){
    questions = originalQuestions;
    score = 0;
    var historic = document.querySelector('.historic');
    historic.classList.add('invisible');
    var userInfo = document.querySelector('.user__info');
    userInfo.classList.add('invisible');
    btnStartGame.classList.remove('invisible');
    onStart();
 }

 btnStartGame.addEventListener("click", onStart);
 btnNextQuestion.addEventListener("click", onNextQuestion);

