document.addEventListener('DOMContentLoaded', () => {
  const darknessSlider = document.getElementById('darkness-slider');
  const colorSchemeSelect = document.getElementById('color-scheme');
  const fontSizeInput = document.getElementById('font-size');
  const backgroundPatternSelect = document.getElementById('background-pattern');
  const preview = document.getElementById('preview');
  const applyButton = document.getElementById('apply-button');

  // Load saved settings
  chrome.storage.sync.get(['darknessLevel', 'colorScheme', 'fontSize', 'backgroundPattern'], (data) => {
    if (data.darknessLevel !== undefined) {
      darknessSlider.value = data.darknessLevel;
    }
    if (data.colorScheme !== undefined) {
      colorSchemeSelect.value = data.colorScheme;
    }
    if (data.fontSize !== undefined) {
      fontSizeInput.value = data.fontSize;
    }
    if (data.backgroundPattern !== undefined) {
      backgroundPatternSelect.value = data.backgroundPattern;
    }
    updatePreview();
  });

  // Event listeners for customization options
  darknessSlider.addEventListener('input', updatePreview);
  colorSchemeSelect.addEventListener('change', updatePreview);
  fontSizeInput.addEventListener('input', updatePreview);
  backgroundPatternSelect.addEventListener('change', updatePreview);

  // Apply button event listener
  applyButton.addEventListener('click', () => {
    const settings = {
      darknessLevel: darknessSlider.value,
      colorScheme: colorSchemeSelect.value,
      fontSize: fontSizeInput.value,
      backgroundPattern: backgroundPatternSelect.value
    };
    chrome.storage.sync.set(settings, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'applySettings', settings });
      });
    });
  });

  function updatePreview() {
    const darknessLevel = darknessSlider.value;
    const colorScheme = colorSchemeSelect.value;
    const fontSize = fontSizeInput.value;
    const backgroundPattern = backgroundPatternSelect.value;

    preview.style.filter = `brightness(${100 - darknessLevel}%)`;
    preview.style.colorScheme = colorScheme;
    preview.style.fontSize = `${fontSize}px`;
    preview.style.backgroundImage = getBackgroundPattern(backgroundPattern);
  }

  function getBackgroundPattern(pattern) {
    switch (pattern) {
      case 'dots':
        return 'url(dots.png)';
      case 'stripes':
        return 'url(stripes.png)';
      case 'grid':
        return 'url(grid.png)';
      default:
        return 'none';
    }
  }
});
