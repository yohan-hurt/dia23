var clues = [
  { clue: 'Entras a la cocina y notas un olor extraño saliendo del horno.', verb: 'smells' },
  { clue: 'Miras al cielo y ves nubes negras enormes acercándose.', verb: 'looks' },
  { clue: 'Tu vecino te habla por teléfono tosiendo y con la voz ronca.', verb: 'sounds' },
  { clue: 'Tocas la manga de esta chaqueta nueva y es increíblemente suave.', verb: 'feels' },
  { clue: 'Pruebas la sopa que preparó tu compañero y está bastante desabrida.', verb: 'tastes' }
];
var clueIndex = 0;

var clueTextEl = document.getElementById('clueText');
var verbSelect = document.getElementById('verbSelect');
var clauseInput = document.getElementById('clauseInput');
var checkClueBtn = document.getElementById('checkClueBtn');
var nextClueBtn = document.getElementById('nextClueBtn');
var clueFeedback = document.getElementById('clueFeedback');
var clueCounter = document.getElementById('clueCounter');

function loadClue() {
  var c = clues[clueIndex];
  clueTextEl.textContent = c.clue;
  verbSelect.value = '';
  clauseInput.value = '';
  clueFeedback.className = 'feedback';
  clueFeedback.textContent = '';
  nextClueBtn.disabled = true;
  checkClueBtn.disabled = false;
  clueCounter.textContent = 'Pista ' + (clueIndex + 1) + ' de ' + clues.length;
}

checkClueBtn.addEventListener('click', function () {
  var c = clues[clueIndex];
  var verbOk = verbSelect.value === c.verb;

  var text = clauseInput.value.trim().toLowerCase();
  var hasConnector = /\bas (if|though)\b/.test(text);
  var hasSomethingAfter = hasConnector && text.replace(/\bas (if|though)\b/, '').trim().length > 2;

  if (verbOk && hasSomethingAfter) {
    showFeedback(clueFeedback, true, '¡Correcto! "' + c.verb + '" es el verbo de sentido adecuado, y tu cláusula con "as if / as though" está bien construida.', false);
    nextClueBtn.disabled = false;
    checkClueBtn.disabled = true;
  } else if (!verbOk && hasSomethingAfter) {
    showFeedback(clueFeedback, false, 'Tu cláusula está bien armada, pero el verbo de sentido no es el que mejor encaja con esta pista. Pista: ¿qué sentido estás usando en la escena?', true);
  } else if (verbOk && !hasSomethingAfter) {
    showFeedback(clueFeedback, false, 'Elegiste bien el verbo, pero falta completar con "as if" o "as though" seguido de una idea.', true);
  } else {
    showFeedback(clueFeedback, false, 'Todavía no. Revisa el verbo de sentido y recuerda usar "as if" o "as though" antes de tu idea.', true);
  }
});

nextClueBtn.addEventListener('click', function () {
  clueIndex++;
  if (clueIndex >= clues.length) {
    markSolved('A');
    clueTextEl.textContent = 'Pruebas completas. Buen trabajo, detective.';
    verbSelect.disabled = true;
    clauseInput.disabled = true;
    checkClueBtn.style.display = 'none';
    nextClueBtn.style.display = 'none';
    clueCounter.textContent = clues.length + ' de ' + clues.length + ' resueltas';
    return;
  }
  loadClue();
});

loadClue();
