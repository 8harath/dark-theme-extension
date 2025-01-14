chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applySettings') {
    applyDarkTheme(request.settings);
  }
});

function applyDarkTheme(settings) {
  const { darknessLevel, colorScheme, fontSize, backgroundPattern } = settings;

  document.documentElement.style.filter = `brightness(${100 - darknessLevel}%)`;
  document.documentElement.style.colorScheme = colorScheme;
  document.documentElement.style.fontSize = `${fontSize}px`;
  document.documentElement.style.backgroundImage = getBackgroundPattern(backgroundPattern);
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
