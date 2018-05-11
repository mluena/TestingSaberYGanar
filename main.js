
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

let originalQuestions = questions;
let score = 0;
let time;
let btnStartGame = document.getElementById('start__button');
let btnNextQuestion = document.querySelector('.next__button');
let btnNewGame = document.querySelector('.startNewGame');

//Function to start the game

function onStart(){
    let dataSection = document.querySelector('.data__container');
    btnStartGame.classList.add('invisible');
    dataSection.classList.remove('invisible');
    btnNextQuestion.classList.remove('invisible');
    startTime();
    printQuestion();
}

//
// Function to go to check question, print next one and restart time

function onNextQuestion(){
    time = 21;
    checkSelectedAnswer();
    printQuestion();
}

//
// Function to print questions and answers

function printQuestion(){
    var btnNextQuestion = document.querySelector('.next__button').disabled = true;
    let questionsPosition = document.querySelector('.questions__container');
    if (questions.length>0){
        questionsPosition.innerHTML = (`<h3 class="question__title" id=${questions[0].id}>${questions[0].title}</h3>`);
        for (const answers of questions[0].answers) {
            let answerValue = answers.answer;
            let answerID = answers.id;
            questionsPosition.innerHTML += 
                `<label for="${answerID}">${answerValue}</label>
                <input id="${answerID}" type="radio" value="${answerValue}" name="answerOption" class="input__answer" />`    
        }
    } 
    if (questions.length == 0) {
        let btnNextQuestion = document.querySelector('.next__button');
        btnNextQuestion.classList.add('invisible');
        var questionsSection = document.querySelector('.questionsAnswers');
        questionsSection.classList.add('invisible');
        var historicSection = document.querySelector('.historic');
        historicSection.classList.remove('invisible');
        var dataSection = document.querySelector('.data__container');
        dataSection.classList.add('invisible');
        var user = document.querySelector('.user__name');
        user.classList.remove('invisible');
    } 
    enableBtnNextQuestion();
    questions = questions.slice(1);

}

//
//Check if radio buttons are selected to enabled/disabled next question button

function enableBtnNextQuestion() {
    function enableChecked() {
        let radios = document.querySelectorAll('.input__answer');
        if ((radios[0].checked)||(radios[1].checked)||(radios[2].checked)){
            btnNextQuestion.disabled = false;
        }   
        else{
            btnNextQuestion.disabled = true;
        }
    }
    setInterval(enableChecked,1000);
}

// 
//Check if user selected answer iscorrect

function checkSelectedAnswer(){
    let radios = document.querySelectorAll('.input__answer');
    let questionID = document.querySelector('.question__title').id;
    let currentQuestion = originalQuestions.find(function(originalQuestion){
        return (questionID == originalQuestion.id);
    });
    for (let i = 0; i < radios.length; i++){
        if (radios[i].checked){
            let selectedAnswerID = radios[i].id;
            if(Number(selectedAnswerID) === currentQuestion.correctAnswer){
                document.querySelector('.answerResult__container').innerHTML = 'Correcto!';
                recalculateCorrectAnswer();
            }
            else{
                document.querySelector('.answerResult__container').innerHTML = 'Fallaste!';
                recalculateWrongAnswer();
            } 
        }          
    }
}

//
// CALCULATING SCORE
// Recalcute score if user's answer is correct

function recalculateCorrectAnswer() {
    if (time <= 18) {
        score = score + 2;
    }
    if (time < 18 && time >= 10) {
        score = score + 1;
    }
    if (time < 10) {
        score = score;
    }
    document.querySelector('.scores__container').innerHTML = score;
    return score;
}

// Recalcute score if user's answer is wrong

function recalculateWrongAnswer(){
    if (time <= 10) {
        score = score - 1;
    }
    if (time > 10) {
        score = score - 2;
    }
    document.querySelector('.scores__container').innerHTML = score;
    return score;
}

//
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
            printQuestion();
        }          
    }
    setInterval(timeControl,1000);
}

//

function checkStatistics(){
    let user = document.querySelector('.user__name');
    user.classList.remove('invisible');
    var dataSection = document.querySelector('.data__container');
    dataSection.classList.add('invisible');
    let userName = document.querySelector('.user__name').value;
    user.classList.add('invisible');
    var usersList = document.querySelector('.usersList');
    var content = '<li placeholder="Introduce tu nombre">' + userName + ': ' + score + '</li>';
    usersList.innerHTML += content; 
}


btnStartGame.addEventListener("click", onStart);
btnNextQuestion.addEventListener("click", onNextQuestion);
btnNewGame.addEventListener("click", checkStatistics);

