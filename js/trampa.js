var traps = [
  { prompt: 'My boss is yelling at me ______ (he / be / my father).', pattern: /\bas (if|though)\b.*\bhe were\b.*\bfather\b/, wasPattern: /\bhe was\b.*\bfather\b/ },
  { prompt: 'She spends money ______ (she / be / rich).', pattern: /\bas (if|though)\b.*\bshe were\b.*\brich\b/, wasPattern: /\bshe was\b.*\brich\b/ },
  { prompt: 'He talks to me ______ (I / be / a child).', pattern: /\bas (if|though)\b.*\bi were\b.*\bchild\b/, wasPattern: /\bi was\b.*\bchild\b/ },
  { prompt: 'They act ______ (nothing / be / wrong).', pattern: /\bas (if|though)\b.*\bnothing were\b.*\bwrong\b/, wasPattern: /\bnothing was\b.*\bwrong\b/ },
  { prompt: 'My cat looks at me ______ (I / be / crazy).', pattern: /\bas (if|though)\b.*\bi were\b.*\bcrazy\b/, wasPattern: /\bi was\b.*\bcrazy\b/ }
];
var trapIndex = 0;

var trapPrompt = document.getElementById('trapPrompt');
var trapInput = document.getElementById('trapInput');
var checkTrapBtn = document.getElementById('checkTrapBtn');
var nextTrapBtn = document.getElementById('nextTrapBtn');
var trapFeedback = document.getElementById('trapFeedback');
var trapCounter = document.getElementById('trapCounter');

function loadTrap() {
  var t = traps[trapIndex];
  trapPrompt.textContent = t.prompt;
  trapInput.value = '';
  trapFeedback.className = 'feedback';
  trapFeedback.textContent = '';
  nextTrapBtn.disabled = true;
  checkTrapBtn.disabled = false;
  trapCounter.textContent = 'Caso ' + (trapIndex + 1) + ' de ' + traps.length;
}

checkTrapBtn.addEventListener('click', function () {
  var t = traps[trapIndex];
  var text = trapInput.value.trim().toLowerCase();

  if (t.pattern.test(text)) {
    showFeedback(trapFeedback, true, '¡Exacto! Como la situación no es real, el verbo "to be" tiene que ser "were", sin importar el sujeto.', false);
    nextTrapBtn.disabled = false;
    checkTrapBtn.disabled = true;
  } else if (t.wasPattern.test(text)) {
    showFeedback(trapFeedback, false, 'Casi. Usaste "was", pero como la situación es completamente irreal, la gramática exige "were" para todos los sujetos.', true);
  } else {
    showFeedback(trapFeedback, false, 'No es correcto todavía. Recuerda: "as if / as though" + sujeto + "were" + el resto de la idea.', true);
  }
});

nextTrapBtn.addEventListener('click', function () {
  trapIndex++;
  if (trapIndex >= traps.length) {
    markSolved('C');
    trapPrompt.textContent = 'Todos los casos resueltos. La trampa irreal ya no te atrapa.';
    trapInput.disabled = true;
    checkTrapBtn.style.display = 'none';
    nextTrapBtn.style.display = 'none';
    trapCounter.textContent = traps.length + ' de ' + traps.length + ' resueltos';
    return;
  }
  loadTrap();
});

loadTrap();
