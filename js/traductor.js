var sentences = [
  { informal: "It looks like it's going to rain.", keywords: ['going', 'rain'] },
  { informal: "It looks like she isn't coming.", keywords: ['isn', 'coming', 'not'] },
  { informal: "You sound like you've had a rough day.", keywords: ['rough', 'day', 'had'] },
  { informal: "He looks like he hasn't slept.", keywords: ['slept', 'hasn'] }
];
var sentenceIndex = 0;
var isFormal = false;

var modeSwitch = document.getElementById('modeSwitch');
var modeName = document.getElementById('modeName');
var sentenceDisplay = document.getElementById('sentenceDisplay');
var rewriteField = document.getElementById('rewriteField');
var rewriteInput = document.getElementById('rewriteInput');
var checkRewriteBtn = document.getElementById('checkRewriteBtn');
var nextSentenceBtn = document.getElementById('nextSentenceBtn');
var rewriteFeedback = document.getElementById('rewriteFeedback');
var sentenceCounter = document.getElementById('sentenceCounter');

function renderSentence() {
  var s = sentences[sentenceIndex];
  sentenceCounter.textContent = 'Frase ' + (sentenceIndex + 1) + ' de ' + sentences.length;
  rewriteFeedback.className = 'feedback';
  rewriteFeedback.textContent = '';
  rewriteInput.value = '';

  if (isFormal) {
    sentenceDisplay.innerHTML = '<span class="broken">' + s.informal + '</span>';
    rewriteField.style.display = 'block';
    checkRewriteBtn.style.display = 'inline-block';
  } else {
    sentenceDisplay.textContent = s.informal;
    rewriteField.style.display = 'none';
    checkRewriteBtn.style.display = 'none';
  }
}

function setMode(formal) {
  isFormal = formal;
  modeSwitch.classList.toggle('formal', formal);
  modeName.textContent = formal ? 'Textbook' : 'Street Talk';
  renderSentence();
}

modeSwitch.addEventListener('click', function () { setMode(!isFormal); });
modeSwitch.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    setMode(!isFormal);
  }
});

checkRewriteBtn.addEventListener('click', function () {
  var s = sentences[sentenceIndex];
  var text = rewriteInput.value.trim().toLowerCase();
  var hasConnector = /\bas (if|though)\b/.test(text);
  var keywordHits = s.keywords.filter(function (k) { return text.indexOf(k) !== -1; }).length;

  if (hasConnector && keywordHits >= 1) {
    showFeedback(rewriteFeedback, true, 'Exacto: "' + s.informal.replace('like', 'as if') + '" (o "as though") es la versión de "textbook".', false);
    if (sentenceIndex === sentences.length - 1) markSolved('B');
  } else if (!hasConnector) {
    showFeedback(rewriteFeedback, false, 'En modo "Textbook" necesitas usar "as if" o "as though" en vez de "like".', true);
  } else {
    showFeedback(rewriteFeedback, false, 'Usaste el conector correcto, pero falta mantener la idea original de la frase.', true);
  }
});

nextSentenceBtn.addEventListener('click', function () {
  sentenceIndex = (sentenceIndex + 1) % sentences.length;
  renderSentence();
});

renderSentence();
