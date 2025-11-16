/**
 * Content script for Customizable Dark Theme Extension
 * Applies dark theme styling to web pages based on user settings
 */

/**
 * Store for current theme state
 */
let currentSettings = null;
let themeEnabled = true;
let originalStyles = {
  filter: '',
  colorScheme: '',
  fontSize: '',
  backgroundImage: ''
};

/**
 * Initialize the extension on page load
 */
function initializeExtension() {
  try {
    // Save original styles
    saveOriginalStyles();

    // Load and apply saved settings
    chrome.storage.sync.get(['enabled', 'darknessLevel', 'colorScheme', 'fontSize', 'backgroundPattern'], (data) => {
      if (chrome.runtime.lastError) {
        console.error('Error loading settings:', chrome.runtime.lastError);
        return;
      }

      if (data.enabled !== false) {
        applyDarkTheme(data);
      }
      currentSettings = data;
      themeEnabled = data.enabled !== false;
    });

    // Listen for storage changes
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'sync') {
        const newSettings = { ...currentSettings };

        for (let [key, { newValue }] of Object.entries(changes)) {
          newSettings[key] = newValue;
        }

        if (newSettings.enabled !== false) {
          applyDarkTheme(newSettings);
        } else {
          removeDarkTheme();
        }

        currentSettings = newSettings;
        themeEnabled = newSettings.enabled !== false;
      }
    });
  } catch (error) {
    console.error('Error initializing extension:', error);
  }
}

/**
 * Save original document styles before applying theme
 */
function saveOriginalStyles() {
  try {
    const docElement = document.documentElement;
    originalStyles = {
      filter: docElement.style.filter || '',
      colorScheme: docElement.style.colorScheme || '',
      fontSize: docElement.style.fontSize || '',
      backgroundImage: docElement.style.backgroundImage || ''
    };
  } catch (error) {
    console.error('Error saving original styles:', error);
  }
}

/**
 * Apply dark theme to the page
 * @param {Object} settings - Theme settings object
 */
function applyDarkTheme(settings) {
  try {
    if (!settings) {
      console.warn('No settings provided to applyDarkTheme');
      return;
    }

    const { darknessLevel = 50, colorScheme = 'default', fontSize = 16, backgroundPattern = 'none' } = settings;

    // Validate inputs
    const validDarknessLevel = Math.max(0, Math.min(100, Number(darknessLevel) || 50));
    const validFontSize = Math.max(10, Math.min(30, Number(fontSize) || 16));

    const docElement = document.documentElement;

    // Apply brightness filter
    if (validDarknessLevel > 0) {
      docElement.style.filter = `brightness(${100 - validDarknessLevel}%)`;
    } else {
      docElement.style.filter = '';
    }

    // Apply color scheme
    if (colorScheme && colorScheme !== 'default') {
      docElement.style.colorScheme = colorScheme;
    } else {
      docElement.style.colorScheme = 'dark';
    }

    // Apply font size (only if significantly different from default)
    if (validFontSize !== 16) {
      docElement.style.fontSize = `${validFontSize}px`;
    } else {
      docElement.style.fontSize = '';
    }

    // Apply background pattern
    const pattern = getBackgroundPattern(backgroundPattern);
    if (pattern !== 'none') {
      docElement.style.backgroundImage = pattern;
    } else {
      docElement.style.backgroundImage = '';
    }

    // Mark document as themed
    docElement.setAttribute('data-dark-theme-active', 'true');
  } catch (error) {
    console.error('Error applying dark theme:', error);
  }
}

/**
 * Remove dark theme and restore original styles
 */
function removeDarkTheme() {
  try {
    const docElement = document.documentElement;

    docElement.style.filter = originalStyles.filter;
    docElement.style.colorScheme = originalStyles.colorScheme;
    docElement.style.fontSize = originalStyles.fontSize;
    docElement.style.backgroundImage = originalStyles.backgroundImage;

    docElement.removeAttribute('data-dark-theme-active');
  } catch (error) {
    console.error('Error removing dark theme:', error);
  }
}

/**
 * Get CSS background pattern based on selection
 * @param {string} pattern - Pattern name
 * @returns {string} CSS background-image value
 */
function getBackgroundPattern(pattern) {
  // Using CSS gradients instead of image files for patterns
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

/**
 * Handle messages from popup
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === 'applySettings') {
      applyDarkTheme(request.settings);
      sendResponse({ success: true });
    } else if (request.action === 'toggleTheme') {
      if (themeEnabled) {
        removeDarkTheme();
        themeEnabled = false;
      } else {
        applyDarkTheme(currentSettings);
        themeEnabled = true;
      }
      sendResponse({ success: true, enabled: themeEnabled });
    } else if (request.action === 'getStatus') {
      sendResponse({ enabled: themeEnabled, settings: currentSettings });
    }
  } catch (error) {
    console.error('Error handling message:', error);
    sendResponse({ success: false, error: error.message });
  }
  return true; // Keep message channel open for async response
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeExtension);
} else {
  initializeExtension();
}
