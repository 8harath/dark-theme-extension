/**
 * Background service worker for Customizable Dark Theme Extension
 * Handles initialization and default settings
 */

/**
 * Default settings for the extension
 */
const DEFAULT_SETTINGS = {
  enabled: true,
  darknessLevel: 50,
  colorScheme: 'default',
  fontSize: 16,
  backgroundPattern: 'none'
};

/**
 * Initialize extension with default settings on install
 */
chrome.runtime.onInstalled.addListener((details) => {
  try {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      // Set default settings on first install
      chrome.storage.sync.set(DEFAULT_SETTINGS, () => {
        if (chrome.runtime.lastError) {
          console.error('Error setting default settings:', chrome.runtime.lastError);
        } else {
          console.log('Customizable Dark Theme installed with default settings');
        }
      });
    } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
      // Merge existing settings with new defaults to add any missing properties
      chrome.storage.sync.get(null, (existingSettings) => {
        if (chrome.runtime.lastError) {
          console.error('Error reading settings on update:', chrome.runtime.lastError);
          return;
        }

        const updatedSettings = { ...DEFAULT_SETTINGS, ...existingSettings };
        chrome.storage.sync.set(updatedSettings, () => {
          if (chrome.runtime.lastError) {
            console.error('Error updating settings:', chrome.runtime.lastError);
          } else {
            console.log('Extension updated to version', chrome.runtime.getManifest().version);
          }
        });
      });
    }
  } catch (error) {
    console.error('Error in onInstalled listener:', error);
  }
});

/**
 * Handle messages from popup or content scripts
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.action === 'getSettings') {
      // Return current settings
      chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
        if (chrome.runtime.lastError) {
          sendResponse({ error: chrome.runtime.lastError.message });
        } else {
          sendResponse({ settings });
        }
      });
      return true; // Keep the message channel open for async response
    }
  } catch (error) {
    console.error('Error handling message:', error);
    sendResponse({ error: error.message });
  }
  return true;
});
