'use strict';

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
let originalQuestions = questions;
let score = 0;
let time = 0;
var btnStartGame = document.getElementById('start__button');
var btnNextQuestion = document.querySelector('.next__button');


function printQuestion(){
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
    questions = questions.slice(1); 
}
function onNextQuestion(){
    checkSelectedAnswer();
    printQuestion();
}
function onStart(){
    printQuestion();
}
function checkSelectedAnswer(){
    let radios = document.querySelectorAll('.input__answer');
    let questionID = document.querySelector('.question__title').id;
    let currentQuestion = originalQuestions.find(function(originalQuestion){
       // let currectAnswer = originalQuestions[questionID].correctAnswer;
        return (questionID == originalQuestion.id);
    });
    console.log('linea 74', questionID);
    for (let i = 0; i < radios.length; i++){
        if (radios[i].checked){
            let selectedAnswerID = radios[i].id;
            console.log('dentro if radios linea 78',selectedAnswerID);
            if(Number(selectedAnswerID) === currentQuestion.correctAnswer){
                console.log('bien');
            }
            else{
                console.log('mal');
            } 
        }          
    }
}

function recalculateCorrectAnswer(time, score) {
    if (time <= 2) {
        return score + 2;
    }
    if (time > 2 && time <= 10) {
        return score + 1;
    }
    if (time > 10) {
        return score;
    }
}

btnStartGame.addEventListener("click", onStart);
btnNextQuestion.addEventListener("click", onNextQuestion);





