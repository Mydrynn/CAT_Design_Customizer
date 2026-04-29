// Main UI interactions for static mockup controls.
(function () {
  const courseCards = Array.from(document.querySelectorAll('.type-card'));
  const shapeToggle = document.getElementById('shapeToggle');
  const publishDropdown = document.getElementById('publishDropdown');
  const publishButton = document.getElementById('publishButton');
  const toastContainer = document.getElementById('toastContainer');
  const toastTriggers = document.querySelectorAll('[data-toast-trigger="true"]');
  const courseFormat = document.getElementById('courseFormat');

  // Elements toggled when "Asset" format is selected
  const themeSection = document.getElementById('themeSection');
  const shapeToggleRow = document.getElementById('shapeToggleRow');
  const launchScreenField = document.getElementById('launchScreenField');
  const videoField = document.getElementById('videoField');
  const audioField = document.getElementById('audioField');
  const objectiveField = document.getElementById('objectiveField');
  const courseNotesField = document.getElementById('courseNotesField');
  const courseTagsField = document.getElementById('courseTagsField');
  const customCssField = document.getElementById('customCssField');
  const authorSmeGrid = document.getElementById('authorSmeGrid');
  const mobileReadyLabel = document.getElementById('mobileReadyLabel');
  const mobileReadySelect = document.getElementById('mobileReady');

  const mobileReadyDefaultOptions = [
    { text: 'Yes', selected: true },
    { text: 'No', selected: false },
  ];
  const assetTypeOptions = [
    { text: 'Video', selected: true },
    { text: 'Audio', selected: false },
    { text: 'Document', selected: false },
  ];

  function setSelectOptions(selectEl, options) {
    selectEl.innerHTML = '';
    options.forEach(({ text, selected }) => {
      const opt = document.createElement('option');
      opt.textContent = text;
      opt.selected = selected;
      selectEl.appendChild(opt);
    });
  }

  function applyAssetMode(isAsset) {
    [themeSection, shapeToggleRow, launchScreenField, videoField, audioField, objectiveField, courseNotesField, courseTagsField, customCssField, authorSmeGrid].forEach((el) => {
      if (el) el.classList.toggle('hidden', isAsset);
    });

    if (mobileReadyLabel) {
      const span = mobileReadyLabel.querySelector('span');
      mobileReadyLabel.textContent = isAsset ? 'Asset Type ' : 'Mobile Ready ';
      if (span) mobileReadyLabel.appendChild(span);
    }

    if (mobileReadySelect) {
      setSelectOptions(mobileReadySelect, isAsset ? assetTypeOptions : mobileReadyDefaultOptions);
    }
  }

  if (courseFormat) {
    courseFormat.addEventListener('change', () => {
      applyAssetMode(courseFormat.value === 'Asset');
    });
  }

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
