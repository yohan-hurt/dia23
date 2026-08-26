// estado global de las 4 pruebas
var solved = { A: false, B: false, C: false, D: false };

function markSolved(letter) {
  if (solved[letter]) return;
  solved[letter] = true;

  var pin = document.querySelector('.progress-pin[data-pin="' + letter + '"]');
  if (pin) pin.classList.add('done');

  var allDone = Object.keys(solved).every(function (k) { return solved[k]; });
  if (allDone) {
    var stamp = document.getElementById('mainStamp');
    stamp.classList.add('solved');
    stamp.innerHTML = 'CASO<br>RESUELTO';
  }
}

function showFeedback(el, ok, msg, shake) {
  el.className = 'feedback show ' + (ok ? 'ok' : 'bad') + (shake ? ' shake' : '');
  el.textContent = msg;

  if (shake) {
    el.classList.remove('shake');
    void el.offsetWidth; // fuerza el reflow para poder repetir la animación
    el.classList.add('shake');
  }
}
