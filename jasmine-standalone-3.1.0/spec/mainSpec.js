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
    Si en 20seg no has respondido, pasa a siguiente pregunta y pierdes 2ptos
      (1pto)

*/

describe ('calculo de marcador', function(){
  function recalcularMarcador(puntos, esCorrecta, tiempo) {
      if (esCorrecta && tiempo <=2) {
        return puntos + 2;
      }
      else if ((esCorrecta == false) && tiempo > 10) {
        return puntos - 1;
      }
      else if (esCorrecta && (tiempo > 2 && tiempo < 10)) {
        return puntos + 1;
      }
      else if (esCorrecta && tiempo > 10) {
        return puntos;
      }
      else if ((esCorrecta == false) && tiempo >10) {
        return puntos - 2;
      }
      else if ((esCorrecta == null) && tiempo > 20) {
        return puntos -2;
      } 


  }
  it ("suma los puntos si acierta muy rápido", function(){
    expect (recalcularMarcador(0, true, 1)).toBe(2);
    expect (recalcularMarcador(1, true, 1)).toBe(3);
  });

  it ("resta puntos si falla y tarda mucho", function(){
    expect (recalcularMarcador(1, false, 11)).toBe(0);
  });

  it ("suma menos puntos si tarda mucho en dar la respuesta correcta", function(){
    expect (recalcularMarcador(1, true, 5)).toBe(2);
  });

  it ("no cambia la puntuación si tarda mucho en acertar", function(){
    expect (recalcularMarcador(1, true, 11)).toBe(1);
  });

  it ("resta menos puntos si falla muy rápido", function(){
    expect (recalcularMarcador(0, false, 11)).toBe(-1);
  });

  it ("resta puntos si tarda mucho en responder", function(){
    expect (recalcularMarcador(0, null, 21)).toBe(-2);
  });
  
});


  