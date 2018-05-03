/* TO DO - list

  velocidad de respuesta, acierto o fallo,
    Si acierto pregunta en menos de 2seg - sumo 2 ptos
      (0ptos, pregunta correcta, 1seg) -> 2 ptos
      (1pto, crrecta, 1seg) -> 3ptos
    Si fallo pregunta en más de 10seg - resto 2 ptos
    Si acierto pregunta entre 2 y 10seg - sumo 1 pto
      (1pto, correcta, 5seg) -> 2ptos
    Si acierto y tardo mas de 10seg - 0 ptos
    Si fallo antes de 10seg - resto 1 pto 
    No se puede pasar sin responder
    Si en 20seg no has respondido, pasa a siguiente pregunta y pierdes 2ptos

*/

describe ('calculo de marcador', function(){
  function recalcularMarcador(puntos, esCorrecta, tiempo) {
      if (esCorrecta && tiempo <=2) {
        return puntos + 2;
      }

  }
  it ("suma los puntos si acierta muy rápido", function(){
    expect (recalcularMarcador(0, true, 1)).toBe(2);
    expect (recalcularMarcador(2, true, 1)).toBe(4);

  });

});