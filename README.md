# El caso de "as if" / "as though"

Página interactiva para repasar la gramática de "as if" y "as though" en inglés, basada en la lección de Aprende inglés con Marcos. Le puse un tema de expediente policial porque encajaba bien con lo de los verbos de los sentidos (mirar, oír, oler, tocar, probar): al final estás "investigando" pistas para deducir qué está pasando.

No usa frameworks ni build. Es HTML, CSS y JS planos, así que basta con abrir `index.html` en el navegador.

## Qué hay adentro

- Un repaso de la teoría: la definición de "as if / as though", los verbos de los sentidos, la alternativa informal con "like", y la regla del subjuntivo con "were" que casi nadie usa bien.
- Cuatro minijuegos:
  - **Detective de los sentidos** — elegís el verbo de sentido correcto para una escena y completás la frase.
  - **Like vs. As if** — un interruptor entre "Street Talk" y "Textbook" para practicar la conversión entre las dos formas.
  - **La trampa irreal** — ejercicios de completar espacios enfocados en el "were" del pasado irreal.
  - **Muro de exageraciones** — escritura libre a partir de frases dramáticas ("My friend acts as though...").

Cada prueba resuelta marca un pin en la barra de progreso, y cuando completás las cuatro el sello de arriba cambia de "CASO ABIERTO" a "CASO RESUELTO".

## Estructura

```
index.html
css/
  main.css
js/
  progress.js     -> estado compartido de las 4 pruebas + helper de feedback
  detective.js     -> juego A
  traductor.js     -> juego B
  trampa.js        -> juego C
  muro.js          -> juego D
```

Cada juego vive en su propio archivo y usa las funciones `markSolved()` y `showFeedback()` de `progress.js`, que se carga primero en el HTML.

## Cosas a tener en cuenta

- Los datos del muro de exageraciones se guardan en memoria (un array de JS), no en localStorage ni en ningún backend. Si recargás la página, se borra. Si querés que persista, habría que conectarlo a algo (localStorage, una API, lo que sea).
- La validación de las respuestas de texto libre es por palabras clave y expresiones regulares simples, no un chequeo gramatical real. Es suficiente para el propósito del ejercicio pero no es perfecta — puede aceptar respuestas raras o rechazar alguna correcta si está redactada muy distinto.
- No usa ningún framework a propósito, para que sea fácil de leer y modificar sin instalar nada.

## Ideas para seguir

- Guardar el progreso en localStorage para que no se pierda al recargar.
- Agregar más pistas/frases a cada juego (los arrays están al principio de cada archivo, es cuestión de sumar objetos).
- Sumar un modo oscuro.
