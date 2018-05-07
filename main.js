'use strict';

var questions = [
    {
        id: 1,
        title: '¿Cuántos años tiene María?',
        answers: [
            { id: 1, answer: '25' },
            { id: 2, answer: '33' },
            { id: 3, answer: '37' }
        ],
        correctAnswer: { id: 2 }
    },
    {
        id: 2,
        title: '¿Cuál es la capital de Zambia?',
        answers: [
            { id: 1, answer: 'Lusaka' },
            { id: 2, answer: 'Harare' },
            { id: 3, answer: 'Madrid' }
        ],
        correctAnswer: { id: 1 }
    },
    {
        id: 3,
        title: '¿Cuál es el nombre completo de Freud?',
        answers: [
            { id: 1, answer: 'Adolf' },
            { id: 2, answer: 'Sefarad' },
            { id: 3, answer: 'Sigmund' }
        ],
        correctAnswer: { id: 3 }
    },
    {
        id: 4,
        title: '¿Cuál es el animal más rápido del mundo?',
        answers: [
            { id: 1, answer: 'Guepardo' },
            { id: 2, answer: 'León' },
            { id: 3, answer: 'Tortuga' }
        ],
        correctAnswer: { id: 1 }
    }
  ];
  
var btnNext = document.querySelector('.next--question');

function printQuestion(){
    let i = 0;
    document.querySelector('.question--title').innerHTML = questions[i].title;
    for(let x = 0; x < questions[i].answers.length; x++){
        document.querySelectorAll('[data-key]').innerHTML = questions[i].answers[x].answer;
    }
    questions = questions.slice(1);
}



btnNext.addEventListener("click", printQuestion);

