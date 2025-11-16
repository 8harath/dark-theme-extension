# Contributing to Customizable Dark Theme Extension

First off, thank you for considering contributing to the Customizable Dark Theme Extension! It's people like you that make this extension better for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Testing Guidelines](#testing-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please be respectful, inclusive, and constructive in all interactions.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Use this template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g., Windows 10, macOS 12.0]
 - Chrome Version: [e.g., 120.0.6099.129]
 - Extension Version: [e.g., 1.0.0]

**Additional context**
Add any other context about the problem here, including:
- Console errors (F12 → Console)
- Extension console errors (chrome://extensions/ → Details → Inspect views)
```

### Suggesting Features

Feature suggestions are tracked as GitHub issues. When creating a feature request, please include:

- **Clear title and description** of the feature
- **Use case**: Why is this feature needed?
- **Proposed solution**: How should it work?
- **Alternatives considered**: What other solutions did you think about?
- **Additional context**: Screenshots, mockups, or examples

## Development Setup

### Prerequisites

- Google Chrome (latest version)
- Python 3.6+ (for icon generation)
- Git
- Text editor or IDE (VS Code, Sublime Text, etc.)

### Setup Instructions

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/dark-theme-extension.git
   cd dark-theme-extension
   ```

3. **Generate icons**
   ```bash
   pip3 install Pillow
   python3 generate_icons.py
   ```

4. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dark-theme-extension` directory

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Coding Guidelines

### JavaScript Style Guide

- **Use ES6+ features** where appropriate (const/let, arrow functions, etc.)
- **Use meaningful variable names**: `darknessLevel` not `dl`
- **Add JSDoc comments** for all functions
- **Handle all errors**: Use try-catch and check for chrome.runtime.lastError
- **Validate all inputs**: Never trust user input
- **Keep functions small**: One function should do one thing

### Example Function Documentation

```javascript
/**
 * Apply dark theme to the page
 * @param {Object} settings - Theme settings object
 * @param {number} settings.darknessLevel - Darkness level (0-100)
 * @param {string} settings.colorScheme - Color scheme name
 * @returns {boolean} True if applied successfully, false otherwise
 */
function applyDarkTheme(settings) {
  // Implementation
}
```

### File Organization

- **background.js**: Service worker, initialization, default settings
- **content.js**: Content script, theme application, DOM manipulation
- **popup.js**: Popup UI logic, event handlers, validation
- **popup.html**: Popup structure and layout
- **styles.css**: Popup styling

### Code Quality Checklist

Before submitting code, ensure:

- [ ] Code follows the style guide
- [ ] All functions have JSDoc comments
- [ ] Error handling is implemented
- [ ] Input validation is in place
- [ ] No console.log statements (use console.error for errors)
- [ ] Code is tested on multiple websites
- [ ] No ESLint warnings (if using ESLint)
- [ ] Code works on latest Chrome version

## Commit Messages

Write clear, descriptive commit messages following these guidelines:

### Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code formatting (no code change)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```
feat: Add keyboard shortcut support

- Implement Ctrl+Shift+D to toggle dark theme
- Add keyboard shortcut settings to options page
- Update documentation with shortcut information

Closes #42
```

```
fix: Handle tab access errors gracefully

Previously, the extension would crash when trying to access
restricted tabs. Now it catches the error and shows a helpful
message to the user.

Fixes #38
```

## Pull Request Process

1. **Update documentation**
   - Update README.md if you changed functionality
   - Update CHANGELOG.md with your changes
   - Add JSDoc comments to new functions

2. **Test thoroughly**
   - Test on multiple websites
   - Test all user interactions
   - Test edge cases
   - Verify no console errors

3. **Create the pull request**
   - Use a clear title: "feat: Add dark mode scheduling"
   - Describe what changed and why
   - Reference related issues: "Closes #42"
   - Include screenshots for UI changes

4. **Wait for review**
   - Address reviewer feedback
   - Make requested changes
   - Keep discussion professional and constructive

5. **Merge**
   - Once approved, a maintainer will merge your PR
   - Your contribution will be credited in the next release

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
- [ ] Tested on Chrome latest version
- [ ] Tested on multiple websites
- [ ] Tested edge cases
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here

## Related Issues
Closes #issue_number
```

## Testing Guidelines

### Manual Testing Checklist

Test your changes on:

- [ ] Simple static pages (Wikipedia, news sites)
- [ ] Dynamic content sites (Twitter, Facebook)
- [ ] Single-page applications (Gmail, Google Docs)
- [ ] Dark pages (already dark websites)
- [ ] Light pages (bright websites)
- [ ] Mixed content pages

### Test Scenarios

1. **First Install**
   - Install extension
   - Verify default settings are applied
   - Check that icons load correctly

2. **Settings Changes**
   - Change each setting individually
   - Verify preview updates in real-time
   - Apply settings and check they persist

3. **Edge Cases**
   - Try to apply on chrome:// pages
   - Test with extension disabled
   - Test with invalid input values
   - Test on pages with existing dark themes

4. **Storage**
   - Save settings
   - Reload Chrome
   - Verify settings persist
   - Test sync across devices (if possible)

### Console Checks

Check these consoles for errors:

1. **Page Console** (F12 → Console)
2. **Extension Popup Console** (Right-click popup → Inspect)
3. **Background Console** (chrome://extensions/ → Details → Inspect)

## Reporting Security Issues

If you discover a security vulnerability, please email us directly instead of using the public issue tracker. Include:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We'll respond as quickly as possible and credit you in the fix (if desired).

## Getting Help

Need help contributing?

- **Documentation**: Read the [README.md](README.md)
- **Issues**: Check existing [GitHub Issues](https://github.com/yourusername/dark-theme-extension/issues)
- **Discussions**: Join [GitHub Discussions](https://github.com/yourusername/dark-theme-extension/discussions)
- **Code**: Read the inline comments and JSDoc documentation

## Recognition

Contributors will be recognized in:

- The README.md contributors section
- Release notes in CHANGELOG.md
- GitHub's contributor graph

Thank you for making this project better! 🎉
