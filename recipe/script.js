// Helpers
    const $ = (sel, el=document) => el.querySelector(sel);
    const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));

    // Toggles for ingredients list
    const ingBtn = document.getElementById('toggle-ingredients');
    const ingList = document.getElementById('ingredients-list');
    ingBtn.addEventListener('click', () => {
      const isHidden = ingList.classList.toggle('hidden');
      ingBtn.textContent = isHidden ? 'Show' : 'Hide';
      ingBtn.setAttribute('aria-expanded', String(!isHidden));
    });

    // Steps progression
    const steps = $$('#steps-list .step');
    const startBtn = document.getElementById('start');
    const nextBtn  = document.getElementById('next');
    const resetBtn = document.getElementById('reset');
    const progressEl = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');

    let idx = -1; // current active step index
    let timerInterval = null; let seconds = 0; const timerEl = document.getElementById('timer');

    function setProgress(i) {
      const pct = Math.round(((i+1) / steps.length) * 100);
      progressEl.style.width = pct + '%';
      progressEl.setAttribute('aria-valuenow', pct);
      progressText.textContent = pct + '%';
    }

    function highlight(i) {
      steps.forEach((li, n) => {
        li.classList.toggle('active', n === i);
        li.classList.toggle('done', n < i);
      });
      if (i >= 0) setProgress(i); else { progressEl.style.width = '0%'; progressText.textContent = '0%'; progressEl.setAttribute('aria-valuenow', 0); }
      nextBtn.disabled = i >= steps.length - 1;
    }

    function startTimer() {
      clearInterval(timerInterval);
      seconds = 0;
      timerInterval = setInterval(() => {
        seconds++;
        const m = String(Math.floor(seconds/60)).padStart(2,'0');
        const s = String(seconds%60).padStart(2,'0');
        timerEl.textContent = `${m}:${s}`;
      }, 1000);
    }

    function stopTimer() { clearInterval(timerInterval); timerInterval = null; }

    startBtn.addEventListener('click', () => {
      if (idx === -1) {
        idx = 0; highlight(idx); startBtn.textContent = 'Resume'; startTimer(); nextBtn.disabled = false;
      } else { // resume
        startTimer();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (idx < steps.length - 1) {
        idx++; highlight(idx);
        if (idx === steps.length - 1) { stopTimer(); startBtn.textContent = 'Start Cooking'; }
      }
    });

    resetBtn.addEventListener('click', () => {
      idx = -1; highlight(idx); startBtn.textContent = 'Start Cooking'; nextBtn.disabled = true;
      steps.forEach(li => li.classList.remove('done','active'));
      stopTimer(); timerEl.textContent = '00:00';
    });

    // Global show/hide shortcuts
    document.getElementById('show-all').addEventListener('click', () => {
      ingList.classList.remove('hidden'); ingBtn.textContent = 'Hide'; ingBtn.setAttribute('aria-expanded','true');
      $('#steps-list').classList.remove('hidden');
    });
    document.getElementById('hide-all').addEventListener('click', () => {
      ingList.classList.add('hidden'); ingBtn.textContent = 'Show'; ingBtn.setAttribute('aria-expanded','false');
      $('#steps-list').classList.add('hidden');
    });

    // Print
    document.getElementById('print').addEventListener('click', () => window.print());

    // Accessibility: Allow Enter/Space to advance when a step is active
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !nextBtn.disabled) {
        e.preventDefault(); nextBtn.click();
      }
    });