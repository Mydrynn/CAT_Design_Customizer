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
  const learningFormatField = document.getElementById('learningFormatField');
  const courseProgressionField = document.getElementById('courseProgressionField');
  const linkedCoursesField = document.getElementById('linkedCoursesField');

  // Asset upload elements
  const assetUploadSection = document.getElementById('assetUploadSection');
  const primaryDropTarget = document.getElementById('primaryDropTarget');
  const primaryDropHint = document.getElementById('primaryDropHint');
  const primaryFileInput = document.getElementById('primaryFileInput');
  const primaryFileName = document.getElementById('primaryFileName');
  const subtitleDropTarget = document.getElementById('subtitleDropTarget');
  const subtitleFileInput = document.getElementById('subtitleFileInput');
  const subtitleFileName = document.getElementById('subtitleFileName');
  const completionButtonField = document.getElementById('completionButtonField');

  const assetAcceptMap = {
    Video: { accept: '.mp4', hint: 'Supported: .mp4' },
    Audio: { accept: '.mp3', hint: 'Supported: .mp3' },
    Document: { accept: '.doc,.docx,.pdf', hint: 'Supported: .doc, .docx, .pdf' },
  };

  const mobileReadyDefaultOptions = [
    { text: 'Yes', selected: true },
    { text: 'No', selected: false },
  ];
  const assetTypeOptions = [
    { text: '--', selected: true },
    { text: 'Video', selected: false },
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
    [themeSection, shapeToggleRow, launchScreenField, videoField, audioField, objectiveField, courseNotesField, courseTagsField, authorSmeGrid].forEach((el) => {
      if (el) el.classList.toggle('hidden', isAsset);
    });

    [learningFormatField, courseProgressionField, linkedCoursesField].forEach((el) => {
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

  function updateAssetUpload() {
    const isAsset = courseFormat && courseFormat.value === 'Asset';
    const assetType = mobileReadySelect ? mobileReadySelect.value : '--';

    if (!isAsset || assetType === '--') {
      if (assetUploadSection) assetUploadSection.classList.add('hidden');
      return;
    }

    if (assetUploadSection) assetUploadSection.classList.remove('hidden');

    const config = assetAcceptMap[assetType];
    if (config) {
      if (primaryFileInput) primaryFileInput.setAttribute('accept', config.accept);
      if (primaryDropHint) primaryDropHint.textContent = config.hint;
    }

    if (subtitleDropTarget) subtitleDropTarget.classList.toggle('hidden', assetType === 'Document');
    if (completionButtonField) completionButtonField.classList.toggle('hidden', assetType !== 'Document');
  }

  function handleDrop(dropTarget, fileInput, fileNameEl, allowedExts) {
    function setFile(file) {
      const dotIndex = file.name.lastIndexOf('.');
      const ext = dotIndex !== -1 ? file.name.slice(dotIndex).toLowerCase() : '';
      if (!ext || !allowedExts().includes(ext)) {
        if (fileNameEl) {
          fileNameEl.textContent = '⚠ Invalid file type: ' + (file.name || 'unknown');
          fileNameEl.classList.remove('hidden');
          fileNameEl.classList.add('drop-error');
        }
        return;
      }
      if (fileNameEl) {
        fileNameEl.textContent = '📄 ' + file.name;
        fileNameEl.classList.remove('hidden');
        fileNameEl.classList.remove('drop-error');
      }
    }

    if (dropTarget) {
      dropTarget.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropTarget.classList.add('drag-over');
      });
      dropTarget.addEventListener('dragleave', () => dropTarget.classList.remove('drag-over'));
      dropTarget.addEventListener('drop', (e) => {
        e.preventDefault();
        dropTarget.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) setFile(file);
      });
      dropTarget.addEventListener('click', () => fileInput && fileInput.click());
      dropTarget.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (fileInput) fileInput.click();
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) setFile(file);
      });
    }
  }

  handleDrop(
    primaryDropTarget,
    primaryFileInput,
    primaryFileName,
    () => {
      const assetType = mobileReadySelect ? mobileReadySelect.value : '--';
      const config = assetAcceptMap[assetType];
      return config ? config.accept.split(',') : [];
    }
  );

  handleDrop(
    subtitleDropTarget,
    subtitleFileInput,
    subtitleFileName,
    () => ['.vtt', '.srt']
  );

  if (mobileReadySelect) {
    mobileReadySelect.addEventListener('change', updateAssetUpload);
  }

  if (courseFormat) {
    courseFormat.addEventListener('change', () => {
      applyAssetMode(courseFormat.value === 'Asset');
      updateAssetUpload();
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
