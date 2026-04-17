// Main UI interactions for static mockup controls.
(function () {
  const courseCards = Array.from(document.querySelectorAll('.type-card'));
  const shapeToggle = document.getElementById('shapeToggle');
  const publishDropdown = document.getElementById('publishDropdown');
  const publishButton = document.getElementById('publishButton');
  const toastContainer = document.getElementById('toastContainer');
  const toastTriggers = document.querySelectorAll('[data-toast-trigger="true"]');

  courseCards.forEach((card) => {
    card.addEventListener('click', () => {
      courseCards.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-pressed', 'true');
    });
  });

  if (shapeToggle) {
    shapeToggle.addEventListener('click', () => {
      const isOn = shapeToggle.classList.toggle('on');
      shapeToggle.setAttribute('aria-pressed', String(isOn));
      shapeToggle.setAttribute('aria-label', isOn ? 'Rounded corners enabled' : 'Rounded corners disabled');
      const text = shapeToggle.querySelector('.toggle-text');
      if (text) text.textContent = isOn ? 'Yes' : 'No';
    });
  }

  if (publishButton && publishDropdown) {
    publishButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = publishDropdown.classList.toggle('open');
      publishButton.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!publishDropdown.contains(event.target)) {
        publishDropdown.classList.remove('open');
        publishButton.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        publishDropdown.classList.remove('open');
        publishButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  toastTriggers.forEach((button) => {
    button.addEventListener('click', () => {
      showToast('Mockup only – no data saved.');
    });
  });

  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    window.setTimeout(() => {
      toast.remove();
    }, 2400);
  }
})();
