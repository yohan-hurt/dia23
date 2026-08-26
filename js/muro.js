var starters = [
  'My friend acts as though...',
  'When she won the match, she cried as if...',
  'My little brother eats as if...',
  'He talks about his trip as though...',
  'The teacher looked at us as if...'
];
var chosenStarter = starters[0];
var wallEntries = [];

var starterPicker = document.getElementById('starterPicker');
var exagInput = document.getElementById('exagInput');
var addWallBtn = document.getElementById('addWallBtn');
var wallFeedback = document.getElementById('wallFeedback');
var wallContainer = document.getElementById('wallContainer');

starters.forEach(function (s, i) {
  var chip = document.createElement('button');
  chip.type = 'button';
  chip.className = 'starter-chip' + (i === 0 ? ' active' : '');
  chip.textContent = s;
  chip.addEventListener('click', function () {
    chosenStarter = s;
    Array.prototype.forEach.call(starterPicker.children, function (c) { c.classList.remove('active'); });
    chip.classList.add('active');
  });
  starterPicker.appendChild(chip);
});

function renderWall() {
  if (wallEntries.length === 0) {
    wallContainer.innerHTML = '<p class="wall-empty">El muro está vacío. Sé el primero en exagerar.</p>';
    return;
  }
  wallContainer.innerHTML = '';
  wallEntries.forEach(function (entry, i) {
    var card = document.createElement('div');
    card.className = 'wall-card';
    card.style.setProperty('--r', (i % 2 === 0) ? '-1.4deg' : '1deg');
    card.textContent = entry;
    wallContainer.appendChild(card);
  });
}

addWallBtn.addEventListener('click', function () {
  var ending = exagInput.value.trim();
  if (ending.length < 3) {
    showFeedback(wallFeedback, false, 'Escribe una idea para completar la frase antes de agregarla al muro.', true);
    return;
  }
  var full = chosenStarter.replace('...', '') + ' ' + ending;
  wallEntries.unshift(full);
  renderWall();
  exagInput.value = '';
  showFeedback(wallFeedback, true, 'Agregado al muro de exageraciones.', false);
  markSolved('D');
});

renderWall();
