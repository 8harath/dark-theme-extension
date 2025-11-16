# Testing Guide

This document provides comprehensive testing instructions for the Customizable Dark Theme Extension.

## Quick Start Testing

### 1. Load the Extension

```bash
# From the project directory
python3 generate_icons.py  # If icons aren't generated yet
```

Then in Chrome:
1. Go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `dark-theme-extension` directory

### 2. Basic Functionality Test

1. Click the extension icon
2. Verify the popup opens
3. Check the toggle switch is ON by default
4. Adjust the darkness slider
5. Click "Apply"
6. Verify the page darkens

## Comprehensive Test Scenarios

### Test 1: First Install Experience

**Steps:**
1. Install the extension for the first time
2. Open any webpage
3. Click the extension icon

**Expected Results:**
- [ ] Default settings are loaded (darkness: 50)
- [ ] Toggle is enabled by default
- [ ] Theme is applied automatically
- [ ] Preview shows correctly
- [ ] All controls are responsive

### Test 2: Settings Persistence

**Steps:**
1. Open extension popup
2. Change darkness to 75
3. Change color scheme to "blue"
4. Change font size to 20
5. Click "Apply"
6. Close and reopen the popup

**Expected Results:**
- [ ] Darkness slider shows 75
- [ ] Color scheme shows "blue"
- [ ] Font size shows 20
- [ ] Settings persist after browser restart

### Test 3: Toggle On/Off

**Steps:**
1. Open extension popup
2. Toggle the theme OFF
3. Observe the page
4. Toggle the theme ON
5. Click "Apply"

**Expected Results:**
- [ ] Controls disable when toggle is OFF
- [ ] Preview shows "Theme Disabled"
- [ ] Page returns to normal when OFF
- [ ] Page darkens when ON
- [ ] Settings are preserved

### Test 4: Input Validation

**Steps:**
1. Try to enter font size > 30 (should cap at 30)
2. Try to enter font size < 10 (should cap at 10)
3. Use slider to set darkness to various levels

**Expected Results:**
- [ ] Font size is clamped to 10-30 range
- [ ] Darkness slider works from 0-100
- [ ] No errors in console
- [ ] Invalid inputs show error message

### Test 5: Edge Cases - Restricted Pages

**Steps:**
1. Go to `chrome://extensions/`
2. Click extension icon
3. Try to apply theme

**Expected Results:**
- [ ] Error message: "Cannot apply theme to browser internal pages"
- [ ] No JavaScript errors
- [ ] Popup remains functional

**Test other restricted pages:**
- `chrome://settings/`
- `chrome://flags/`
- `chrome-extension://[extension-id]/popup.html`
- `edge://settings/` (if using Edge)

### Test 6: Different Website Types

Test on these types of websites:

**Static Sites:**
- [ ] Wikipedia - https://en.wikipedia.org
- [ ] MDN Docs - https://developer.mozilla.org
- [ ] News sites

**Dynamic Sites:**
- [ ] Twitter - https://twitter.com
- [ ] Facebook - https://facebook.com
- [ ] Reddit - https://reddit.com

**Single Page Applications:**
- [ ] Gmail - https://mail.google.com
- [ ] Google Docs
- [ ] React/Vue apps

**Already Dark Sites:**
- [ ] GitHub (dark mode)
- [ ] YouTube (dark theme)
- [ ] Stack Overflow (dark mode)

**Expected Results:**
- [ ] Theme applies consistently
- [ ] No layout breaking
- [ ] Controls remain usable
- [ ] Text remains readable

### Test 7: Background Patterns

**Steps:**
1. Select each pattern option:
   - None
   - Dots
   - Stripes
   - Grid
2. Click "Apply" for each

**Expected Results:**
- [ ] Preview shows pattern correctly
- [ ] Pattern applies to page
- [ ] Patterns don't interfere with readability
- [ ] "None" removes pattern

### Test 8: Auto-Apply on New Pages

**Steps:**
1. Set preferences (e.g., darkness 70, blue scheme)
2. Click "Apply"
3. Open a new tab
4. Navigate to a new website

**Expected Results:**
- [ ] Theme applies automatically
- [ ] Same settings as configured
- [ ] No need to click "Apply" again

### Test 9: Storage Sync (Multi-Device)

**If you have Chrome sync enabled:**

**Steps:**
1. Configure settings on Device A
2. Wait for sync
3. Open Chrome on Device B
4. Click extension icon

**Expected Results:**
- [ ] Settings are synced to Device B
- [ ] Theme applies with same settings
- [ ] Changes on either device sync

### Test 10: Error Handling

**Test these error scenarios:**

1. **No Active Tab**
   - Close all tabs except extensions page
   - Try to apply theme
   - Should show appropriate error

2. **Storage Quota**
   - Settings should be small enough to never hit quota
   - Verify storage usage is minimal

3. **Rapid Toggling**
   - Toggle theme on/off rapidly
   - Should remain stable, no crashes

### Test 11: Performance

**Steps:**
1. Open a large, complex page (e.g., Amazon, eBay)
2. Apply theme
3. Scroll the page
4. Interact with page elements

**Expected Results:**
- [ ] No noticeable lag
- [ ] Scrolling remains smooth
- [ ] Page interactions work normally
- [ ] No memory leaks (check Task Manager)

### Test 12: Console Checks

**Check these consoles for errors:**

1. **Page Console** (F12 → Console)
   ```
   - No errors when theme is applied
   - No errors when theme is removed
   - Content script loads without errors
   ```

2. **Extension Popup Console** (Right-click popup → Inspect)
   ```
   - No errors on popup open
   - No errors when changing settings
   - No errors on Apply click
   ```

3. **Background Console** (`chrome://extensions/` → Details → Inspect)
   ```
   - Service worker initializes correctly
   - No errors during storage operations
   - Messages are handled properly
   ```

## Automated Testing Checklist

While this extension currently uses manual testing, here's a checklist for future automated tests:

- [ ] Unit tests for validation functions
- [ ] Integration tests for message passing
- [ ] E2E tests for user workflows
- [ ] Performance benchmarks
- [ ] Accessibility testing

## Bug Reporting Template

If you find a bug during testing, report it with:

```markdown
**Bug Description:**
Brief description of the issue

**Steps to Reproduce:**
1. Step one
2. Step two
3. ...

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happened

**Environment:**
- Chrome Version: [from chrome://version/]
- Extension Version: 1.0.0
- OS: [Windows/Mac/Linux]
- Test Page: [URL where bug occurred]

**Console Errors:**
[Paste any console errors]

**Screenshots:**
[If applicable]
```

## Performance Benchmarks

### Expected Performance Metrics

- **Popup Open Time**: < 100ms
- **Theme Application**: < 50ms
- **Settings Load**: < 20ms
- **Storage Operations**: < 10ms

### How to Measure

1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Start recording
4. Perform action (e.g., apply theme)
5. Stop recording
6. Analyze timeline

## Accessibility Testing

### Screen Reader Testing

1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate through popup with keyboard
3. Verify all controls are announced
4. Ensure all functionality is keyboard-accessible

### Keyboard Navigation

- [ ] Tab through all controls
- [ ] Enter/Space activate buttons
- [ ] Arrow keys work on sliders
- [ ] Escape closes popup (native Chrome behavior)

## Security Testing

### XSS Prevention

- [ ] Input fields don't execute scripts
- [ ] Settings storage doesn't allow code injection
- [ ] Message passing validates data

### Permission Scope

- [ ] Extension only uses declared permissions
- [ ] No unnecessary data access
- [ ] Storage stays within quota

## Final Pre-Release Checklist

Before releasing a new version:

- [ ] All manual tests pass
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Works on latest Chrome stable
- [ ] Works on latest Chrome beta (optional)
- [ ] Documentation is updated
- [ ] CHANGELOG is updated
- [ ] Version number is bumped in manifest.json
- [ ] Icons are generated and look good
- [ ] .crx package builds successfully
- [ ] Test installation from .crx

## Continuous Testing

During development:

1. **After every change:**
   - Test the specific feature you changed
   - Check console for new errors
   - Verify no regressions

2. **Before every commit:**
   - Run quick smoke test (install, apply theme, toggle)
   - Check for console errors

3. **Before every release:**
   - Complete full test suite
   - Test on multiple websites
   - Verify all documentation

---

**Happy Testing! 🧪**

If you find issues or have suggestions for additional test cases, please open an issue or submit a PR.
