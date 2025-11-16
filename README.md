# Customizable Dark Theme Chrome Extension

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/dark-theme-extension)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Chrome](https://img.shields.io/badge/chrome-extension-orange.svg)](https://www.google.com/chrome/)

A professional, production-ready Chrome extension that converts any webpage to a customizable dark theme with advanced features and comprehensive edge case handling.

## ✨ Features

### Core Functionality
- **🌙 Adjustable Darkness Level**: Fine-tune the brightness from 0-100% with a smooth slider
- **🎨 Multiple Color Schemes**: Choose from default, blue, green, and red color schemes
- **📏 Font Size Control**: Adjust text size between 10-30px for better readability
- **🖼️ Background Patterns**: Select from dots, stripes, grid, or no pattern
- **👁️ Live Preview**: See changes in real-time before applying them
- **💾 Persistent Settings**: Your preferences are saved and synced across devices

### Production-Ready Features
- **✅ Enable/Disable Toggle**: Quickly turn the theme on or off
- **🛡️ Edge Case Handling**: Comprehensive error handling for all scenarios
- **⚡ Auto-Apply**: Theme automatically applies to all new pages
- **🔄 Sync Storage**: Settings sync across all your Chrome instances
- **⚠️ Input Validation**: All user inputs are validated and sanitized
- **🚫 Protected Pages**: Smart detection of browser internal pages
- **📱 Responsive UI**: Clean, modern interface that works smoothly

## 📸 Screenshots

The extension provides a clean, intuitive interface with:
- Toggle switch for quick enable/disable
- Darkness level slider with real-time preview
- Customization options for color, size, and patterns
- Success/error messages for user feedback

## 🚀 Installation

### For Users

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/dark-theme-extension.git
   cd dark-theme-extension
   ```

2. **Generate Icons** (if needed)
   ```bash
   python3 generate_icons.py
   ```
   Or install Pillow first if needed:
   ```bash
   pip3 install Pillow
   python3 generate_icons.py
   ```

3. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" using the toggle in the top right
   - Click "Load unpacked"
   - Select the `dark-theme-extension` directory
   - The extension icon should appear in your toolbar!

### For Developers

```bash
# Clone the repository
git clone https://github.com/yourusername/dark-theme-extension.git
cd dark-theme-extension

# Generate icons
python3 generate_icons.py

# Load the extension in Chrome (see step 3 above)
```

## 📖 Usage

### Basic Usage

1. **Click the extension icon** in your Chrome toolbar
2. **Toggle the theme** on or off using the switch at the top
3. **Adjust settings**:
   - Drag the darkness slider to set your preferred level
   - Select a color scheme from the dropdown
   - Set your preferred font size
   - Choose a background pattern (optional)
4. **Preview** your changes in the preview box
5. **Click "Apply"** to apply the theme to the current page

### Advanced Usage

- **Auto-Apply**: Once you set your preferences, they automatically apply to new pages
- **Per-Page Adjustment**: You can adjust settings for specific pages
- **Quick Toggle**: Use the toggle switch to quickly enable/disable without losing settings
- **Sync Across Devices**: Your settings sync via Chrome's sync storage

### Keyboard Shortcuts

Currently, this extension uses the popup interface. Keyboard shortcuts can be added in future versions.

## 🛠️ Technical Details

### Architecture

- **Manifest V3**: Uses the latest Chrome extension manifest version
- **Service Worker**: Efficient background script with minimal resource usage
- **Content Scripts**: Lightweight scripts that run on web pages
- **Storage API**: Chrome's sync storage for cross-device settings

### Edge Cases Handled

1. **Browser Internal Pages**: Cannot apply themes to `chrome://`, `chrome-extension://`, or `edge://` pages
2. **Tab Access**: Gracefully handles cases where tab information is unavailable
3. **Storage Errors**: Proper error handling for storage quota and sync issues
4. **Input Validation**: All user inputs are validated and clamped to safe ranges
5. **Message Passing**: Robust error handling for cross-context messaging
6. **Initial Load**: Theme applies automatically on extension load
7. **Dynamic Content**: Works with dynamically loaded content
8. **Original Styles**: Preserves and restores original page styles when disabled

### File Structure

```
dark-theme-extension/
├── manifest.json           # Extension configuration (Manifest V3)
├── background.js          # Service worker for initialization
├── content.js            # Content script for applying themes
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic and event handlers
├── styles.css            # Popup styling
├── generate_icons.py     # Icon generation script
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── README.md             # This file
├── LICENSE               # MIT License
├── CHANGELOG.md          # Version history
└── CONTRIBUTING.md       # Contribution guidelines
```

## 🔒 Permissions

The extension requires the following permissions:

- **`storage`**: To save and sync your preferences
- **`activeTab`**: To apply themes to the current tab
- **`scripting`**: To inject theme styles into pages
- **`<all_urls>`**: To work on all websites (you control when it's applied)

All permissions are used solely for the extension's core functionality. No data is collected or transmitted.

## 🐛 Troubleshooting

### Common Issues

**Theme not applying?**
- Refresh the page after applying settings
- Check that the toggle is enabled
- Ensure you're not on a browser internal page (chrome://, etc.)

**Settings not saving?**
- Check your Chrome sync is enabled
- Try disabling and re-enabling the extension
- Check the browser console for errors

**Extension not loading?**
- Ensure Developer mode is enabled
- Check that all files are present
- Look for errors in `chrome://extensions/`

**Icons not showing?**
- Run `python3 generate_icons.py` to create icons
- Ensure the `icons/` directory exists with all three PNG files

### Getting Help

If you encounter issues:

1. Check the browser console for errors (F12 → Console)
2. Check the extension's service worker console in `chrome://extensions/`
3. Review the [Troubleshooting](#troubleshooting) section
4. Open an issue on GitHub with:
   - Chrome version
   - Extension version
   - Steps to reproduce
   - Console errors (if any)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with clear, documented code
4. Test thoroughly across different websites
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add JSDoc comments for all functions
- Handle all edge cases with proper error messages
- Test on multiple websites and scenarios
- Update documentation as needed

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Chrome Extension Manifest V3
- Icons generated using Python Pillow
- Inspired by the need for customizable dark mode experiences

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/dark-theme-extension/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/dark-theme-extension/discussions)
- **Email**: your.email@example.com

---

**Made with ❤️ for a better browsing experience**
