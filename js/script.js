/* =========================================================
   ICT251 Activity 3 — Interactive JavaScript
   Author: Fact Bwalya
   Features:
     1. Contact form validation + local preview (compulsory)
     2. Gallery viewer with Prev/Next
     3. Study hours calculator
     4. Theme switch (light/dark)
     5. Mobile navigation toggle
   ========================================================= */

/* =========================================================
   FEATURE 1: Contact form validation + preview
   Validates name, email, and message.
   Rejects whitespace-only input and invalid email.
   Shows the entered data locally (no server).
   ========================================================= */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const preview = document.getElementById('form-preview');

  // Simple email pattern: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Helper: clear all previous errors
  function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // keep submission local
    clearErrors();
    preview.hidden = true;

    let valid = true;

    // Validate name
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    }

    // Validate email
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
      emailError.textContent = 'Please enter your email.';
      valid = false;
    } else if (!emailPattern.test(emailValue)) {
      emailError.textContent = 'Please enter a valid email address.';
      valid = false;
    }

    // Validate message
    const messageValue = messageInput.value.trim();
    if (messageValue === '') {
      messageError.textContent = 'Please enter a message.';
      valid = false;
    }

    // If all good, show the local preview
    if (valid) {
      preview.hidden = false;
      preview.textContent = ''; // start clean

      const heading = document.createElement('h3');
      heading.textContent = 'Form data validated (not sent)';

      const summary = document.createElement('p');
      // Use textContent for user input — safe against HTML injection
      summary.textContent =
        'Name: ' + nameValue +
        ' | Email: ' + emailValue +
        ' | Message: ' + messageValue;

      preview.appendChild(heading);
      preview.appendChild(summary);

      form.reset();
    }
  });
}

/* =========================================================
   FEATURE 2: Gallery viewer (Prev / Next)
   Uses the existing .gallery figure images.
   ========================================================= */
function setupGalleryViewer() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  // Collect all figure elements
  const figures = Array.from(gallery.querySelectorAll('figure'));
  if (figures.length === 0) return;

  // Hide all except the first
  let currentIndex = 0;

  function showFigure(index) {
    figures.forEach(function (fig, i) {
      fig.style.display = (i === index) ? '' : 'none';
    });
  }

  // Build controls
  const controls = document.createElement('div');
  controls.className = 'gallery-controls';

  const prevBtn = document.createElement('button');
  prevBtn.type = 'button';
  prevBtn.textContent = '← Previous';

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.textContent = 'Next →';

  const status = document.createElement('span');
  status.className = 'gallery-status';

  controls.appendChild(prevBtn);
  controls.appendChild(status);
  controls.appendChild(nextBtn);
  gallery.parentNode.insertBefore(controls, gallery.nextSibling);

  function update() {
    showFigure(currentIndex);
    status.textContent = 'Photo ' + (currentIndex + 1) + ' of ' + figures.length;
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === figures.length - 1);
  }

  prevBtn.addEventListener('click', function () {
    if (currentIndex > 0) {
      currentIndex--;
      update();
    }
  });

  nextBtn.addEventListener('click', function () {
    if (currentIndex < figures.length - 1) {
      currentIndex++;
      update();
    }
  });

  update();
}

/* =========================================================
   FEATURE 3: Study hours calculator
   Accepts hours/day and days/week (1–7).
   Rejects blank, non-numeric, or negative input.
   ========================================================= */
function setupStudyCalculator() {
  const button = document.getElementById('calc-hours');
  if (!button) return;

  const hoursInput = document.getElementById('hours-per-day');
  const daysInput = document.getElementById('days-per-week');
  const result = document.getElementById('calc-result');

  button.addEventListener('click', function () {
    const hours = parseFloat(hoursInput.value);
    const days = parseFloat(daysInput.value);

    // Validate hours
    if (isNaN(hours) || hours < 0 || hoursInput.value.trim() === '') {
      result.textContent = 'Please enter a valid number of hours (0 or more).';
      result.className = 'calc-result error-text';
      return;
    }

    // Validate days
    if (isNaN(days) || days < 1 || days > 7 || daysInput.value.trim() === '') {
      result.textContent = 'Please enter days between 1 and 7.';
      result.className = 'calc-result error-text';
      return;
    }

    const total = hours * days;
    result.textContent = 'Total: ' + total + ' hours per week';
    result.className = 'calc-result success-text';
  });
}

/* =========================================================
   FEATURE 4: Theme switch (light / dark)
   Toggles a 'dark' class on <body>.
   ========================================================= */
function setupThemeSwitch() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Load saved preference
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    toggle.textContent = '☀️ Light mode';
  }

  toggle.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggle.textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

/* =========================================================
   FEATURE 5: Mobile navigation toggle
   Shows/hides the nav on small screens.
   ========================================================= */
function setupMobileNav() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

/* =========================================================
   FEATURE (bonus): Project search / filter
   Filters project cards by text. Reset button restores all.
   ========================================================= */
function setupProjectFilter() {
  const search = document.getElementById('project-search');
  const reset = document.getElementById('reset-search');
  const message = document.getElementById('search-message');
  const cards = Array.from(document.querySelectorAll('.project-card'));
  if (!search || cards.length === 0) return;

  function filter() {
    const query = search.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(function (card) {
      const text = card.textContent.toLowerCase();
      const matches = text.includes(query);
      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    if (query === '') {
      message.textContent = '';
    } else if (visibleCount === 0) {
      message.textContent = 'No projects match "' + query + '".';
    } else {
      message.textContent = visibleCount + ' project(s) match.';
    }
  }

  search.addEventListener('input', filter);

  if (reset) {
    reset.addEventListener('click', function () {
      search.value = '';
      filter();
    });
  }
}

/* =========================================================
   FEATURE (bonus): Expandable project details
   ========================================================= */
function setupExpandables() {
  const buttons = document.querySelectorAll('.expand-btn');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const details = btn.nextElementSibling;
      if (!details) return;
      const isHidden = details.hasAttribute('hidden');
      if (isHidden) {
        details.removeAttribute('hidden');
        btn.textContent = 'Hide details';
      } else {
        details.setAttribute('hidden', '');
        btn.textContent = 'Show details';
      }
    });
  });
}

/* =========================================================
   Initialize everything once the DOM is ready.
   The script tag uses 'defer', so this runs after parsing.
   ========================================================= */
setupContactForm();
setupGalleryViewer();
setupStudyCalculator();
setupThemeSwitch();
setupMobileNav();
setupProjectFilter();
setupExpandables();