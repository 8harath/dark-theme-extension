chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.sync.set({ darknessLevel: 50 }, () => {
      console.log('Default darkness level set to 50');
    });
  } else if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    console.log('Extension updated');
  }
});
