/**
 * Popup script for Customizable Dark Theme Extension
 * Handles user interface and settings management
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const themeToggle = document.getElementById('theme-toggle');
  const darknessSlider = document.getElementById('darkness-slider');
  const colorSchemeSelect = document.getElementById('color-scheme');
  const fontSizeInput = document.getElementById('font-size');
  const backgroundPatternSelect = document.getElementById('background-pattern');
  const preview = document.getElementById('preview');
  const applyButton = document.getElementById('apply-button');

  /**
   * Load saved settings from storage
   */
  function loadSettings() {
    chrome.storage.sync.get(['enabled', 'darknessLevel', 'colorScheme', 'fontSize', 'backgroundPattern'], (data) => {
      if (chrome.runtime.lastError) {
        console.error('Error loading settings:', chrome.runtime.lastError);
        showError('Failed to load settings. Please try again.');
        return;
      }

      // Set toggle state
      if (data.enabled !== undefined) {
        themeToggle.checked = data.enabled;
        updateControlsState(data.enabled);
      }

      // Set other settings
      if (data.darknessLevel !== undefined) {
        darknessSlider.value = Math.max(0, Math.min(100, Number(data.darknessLevel)));
      }
      if (data.colorScheme !== undefined) {
        colorSchemeSelect.value = data.colorScheme;
      }
      if (data.fontSize !== undefined) {
        fontSizeInput.value = Math.max(10, Math.min(30, Number(data.fontSize)));
      }
      if (data.backgroundPattern !== undefined) {
        backgroundPatternSelect.value = data.backgroundPattern;
      }

      updatePreview();
    });
  }

  /**
   * Update controls enabled/disabled state based on toggle
   */
  function updateControlsState(enabled) {
    const controls = [darknessSlider, colorSchemeSelect, fontSizeInput, backgroundPatternSelect, applyButton];
    controls.forEach(control => {
      control.disabled = !enabled;
    });
  }

  /**
   * Validate input values
   */
  function validateInputs() {
    const darknessLevel = Number(darknessSlider.value);
    const fontSize = Number(fontSizeInput.value);

    if (isNaN(darknessLevel) || darknessLevel < 0 || darknessLevel > 100) {
      showError('Darkness level must be between 0 and 100');
      return false;
    }

    if (isNaN(fontSize) || fontSize < 10 || fontSize > 30) {
      showError('Font size must be between 10 and 30');
      return false;
    }

    return true;
  }

  /**
   * Show error message to user
   */
  function showError(message) {
    // Create or update error message element
    let errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.id = 'error-message';
      errorDiv.style.cssText = 'color: #d32f2f; background: #ffebee; padding: 10px; margin: 10px 0; border-radius: 4px; font-size: 12px;';
      applyButton.parentNode.insertBefore(errorDiv, applyButton);
    }
    errorDiv.textContent = message;

    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }

  /**
   * Show success message to user
   */
  function showSuccess(message) {
    let successDiv = document.getElementById('success-message');
    if (!successDiv) {
      successDiv = document.createElement('div');
      successDiv.id = 'success-message';
      successDiv.style.cssText = 'color: #2e7d32; background: #e8f5e9; padding: 10px; margin: 10px 0; border-radius: 4px; font-size: 12px;';
      applyButton.parentNode.insertBefore(successDiv, applyButton);
    }
    successDiv.textContent = message;

    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.remove();
      }
    }, 3000);
  }

  /**
   * Apply settings to current tab
   */
  function applySettings() {
    if (!validateInputs()) {
      return;
    }

    const settings = {
      enabled: themeToggle.checked,
      darknessLevel: Number(darknessSlider.value),
      colorScheme: colorSchemeSelect.value,
      fontSize: Number(fontSizeInput.value),
      backgroundPattern: backgroundPatternSelect.value
    };

    // Save to storage
    chrome.storage.sync.set(settings, () => {
      if (chrome.runtime.lastError) {
        console.error('Error saving settings:', chrome.runtime.lastError);
        showError('Failed to save settings. Please try again.');
        return;
      }

      // Apply to current tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
          console.error('Error querying tabs:', chrome.runtime.lastError);
          showError('Failed to apply theme. Please refresh the page.');
          return;
        }

        if (!tabs || tabs.length === 0) {
          showError('No active tab found');
          return;
        }

        const currentTab = tabs[0];

        // Check if we can access this tab
        if (!currentTab.url || currentTab.url.startsWith('chrome://') || currentTab.url.startsWith('chrome-extension://') || currentTab.url.startsWith('edge://')) {
          showError('Cannot apply theme to browser internal pages');
          return;
        }

        chrome.tabs.sendMessage(currentTab.id, { action: 'applySettings', settings }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
            showError('Theme will apply on next page load');
          } else if (response && response.success) {
            showSuccess('Theme applied successfully!');
          }
        });
      });
    });
  }

  /**
   * Update preview with current settings
   */
  function updatePreview() {
    if (!themeToggle.checked) {
      preview.style.filter = '';
      preview.style.colorScheme = '';
      preview.style.fontSize = '';
      preview.style.backgroundImage = '';
      preview.textContent = 'Theme Disabled';
      return;
    }

    const darknessLevel = Number(darknessSlider.value) || 50;
    const colorScheme = colorSchemeSelect.value;
    const fontSize = Number(fontSizeInput.value) || 16;
    const backgroundPattern = backgroundPatternSelect.value;

    preview.style.filter = `brightness(${100 - darknessLevel}%)`;
    preview.style.colorScheme = colorScheme;
    preview.style.fontSize = `${fontSize}px`;
    preview.style.backgroundImage = getBackgroundPattern(backgroundPattern);
    preview.textContent = 'Preview';
  }

  /**
   * Get CSS background pattern
   */
  function getBackgroundPattern(pattern) {
    switch (pattern) {
      case 'dots':
        return 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)';
      case 'stripes':
        return 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)';
      case 'grid':
        return 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)';
      default:
        return 'none';
    }
  }

  // Event Listeners
  themeToggle.addEventListener('change', () => {
    const enabled = themeToggle.checked;
    updateControlsState(enabled);
    updatePreview();
  });

  darknessSlider.addEventListener('input', updatePreview);
  colorSchemeSelect.addEventListener('change', updatePreview);
  fontSizeInput.addEventListener('input', updatePreview);
  backgroundPatternSelect.addEventListener('change', updatePreview);
  applyButton.addEventListener('click', applySettings);

  // Initialize
  loadSettings();
});
