/* TO DO - list

  velocidad de respuesta, acierto o fallo,
    Si acierto pregunta en menos de 2seg - sumo 2 ptos
      (0ptos, pregunta correcta, 1seg) -> 2 ptos
      (1pto, correcta, 1seg) -> 3ptos
    Si fallo pregunta en más de 10seg - resto 2 ptos
      (1pto, falsa, 11seg) -> -1pto
    Si acierto pregunta entre 2 y 10seg - sumo 1 pto
      (1pto, correcta, 5seg) -> 2ptos
    Si acierto y tardo mas de 10seg - 0 ptos
      (1pto, correcta, 11seg) -> 1pto
    Si fallo antes de 10seg - resto 1 pto 
    No se puede pasar sin responder
    Si en 20seg no has respondido, pasa a siguiente pregunta y pierdes 3ptos
      (1pto, sin respuesta, 25seg) -> -2ptos

*/
/*TO DO - List
Identificar la respuesta correcta
  - Cuál es la capital de Portugal
    -a> Faro
    -b> Oporto
    -c> Lisboa
  El usuario dice Lisboa, entonces es correcta

Identificar la respuesta incorrecta
  - Cuál es la capital de Portugal
    -a> Faro
    -b> Oporto
    -c> Lisboa
  El usuario dice Faro, entonces es incorrecta
Identificar la respuesta incorrecta
  - Cuál es la capital de Portugal
    -a> Faro
    -b> Oporto
    -c> Lisboa
  El usuario dice Madrid, entonces es incorrecta
  */

/*var questions = [
   {title: '¿Cuántos años tiene Celio?', answer: {a: '35', b: 'No lo sabe ni ella', c: '25' }, correctAnswer: 'b'},
   {title: '¿Cuál es la capital de Zambia?', answer: {a: 'Lusaka', b: 'Harare', c: 'Madrid' }, correctAnswer: 'a'},
   {title: '¿Cuál es el nombre completo de Freud?', answer: {a: 'Adolf', b: 'Sefarad', c: 'Sigmund' }, correctAnswer: 'c'},
   {title: '¿Cuál es el animal más rápido del mundo?', answer: {a: 'Guepardo', b: 'León', c:'Tortuga' }, correctAnswer: 'a'}
 ]
*/
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

function renderQuestion(){
  var i = 0;
  setInterval (function(){
    if (i < questions.length) {
      console.log(questions[i].title);
      for(let x = 0; x < questions[i].answers.length; x++){
        console.log(questions[i].answers[x].answer);
      }
      i++;
    }
 
  }, 20000);
}

renderQuestion();

describe('comprobar respuesta', function(){
  var respuestaCorrecta = {
    value: 3
  },
  respuestaSeleccionada = {
    value: 3
  };

  function esCorrecta (respuestaCorrecta, respuestaSeleccionada) {
    if (respuestaCorrecta.value === respuestaSeleccionada.value) {
      return true;
    }
    if (respuestaCorrecta.value !== respuestaSeleccionada.value) {
      return false;
    }
  }

  it("reconoce una respuesta correcta", function(){
    expect(esCorrecta(respuestaCorrecta.value = 3,
      respuestaSeleccionada.value = 3)).toBeTruthy();
  }); 
  it("reconoce una respuesta incorrecta", function(){
    expect(esCorrecta(respuestaCorrecta,
      respuestaSeleccionada.value = 2)).toBeFalsy();
  });      
});
describe('calculo de marcador', function () {
  function recalcularAcertandoPregunta(marcador, tiempo) {
    if (tiempo <= 2) {
      return marcador + 2;
    }
    if (tiempo > 2 && tiempo <= 10) {
      return marcador + 1;
    }
    if (tiempo > 10) {
      return marcador;
    }
  }
  function recalcularFallandoPregunta(marcador, tiempo) {
    if (tiempo <= 10) {
      return marcador - 1;
    }
    if (tiempo > 10) {
      return marcador - 2;
    }
  }
  function recalcularSinRespuesta(marcador) {
    return marcador - 3;
  }

  it("suma los puntos si acierta muy rápido", function () {
    expect(recalcularAcertandoPregunta(0, 1)).toBe(2);
    expect(recalcularAcertandoPregunta(1, 1)).toBe(3);
  });
  it("suma menos puntos si tarda mucho en dar la respuesta correcta", function () {
    expect(recalcularAcertandoPregunta(1, 5)).toBe(2);
    expect(recalcularAcertandoPregunta(1, 10)).toBe(2);
  });
  it("no cambia la puntuación si tarda mucho en acertar", function () {
    expect(recalcularAcertandoPregunta(1, 11)).toBe(1);
  });
  it("resta puntos si falla y tarda mucho", function () {
    expect(recalcularFallandoPregunta(1, 11)).toBe(-1);
  });
  it("resta menos puntos si falla muy rápido", function () {
    expect(recalcularFallandoPregunta(0, 9)).toBe(-1);
    expect(recalcularFallandoPregunta(0, 10)).toBe(-1);
  });
  it("resta puntos si tarda mucho en responder", function () {
    expect(recalcularFallandoPregunta(0, 21)).toBe(-2);
  });
  it("resta puntos si no hay respuesta", function () {
    expect(recalcularSinRespuesta(0)).toBe(-3);
  });
});
