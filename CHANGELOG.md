# Changelog

All notable changes to the Customizable Dark Theme Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-16

### Added
- Initial release of Customizable Dark Theme Extension
- Adjustable darkness level slider (0-100%)
- Multiple color scheme options (default, blue, green, red)
- Font size adjustment (10-30px)
- Background pattern selection (none, dots, stripes, grid)
- Live preview functionality in popup
- Enable/disable toggle for quick theme control
- Persistent settings using Chrome sync storage
- Automatic theme application on page load
- Comprehensive error handling for edge cases
- Input validation for all user inputs
- Protection against applying themes to browser internal pages
- JSDoc documentation for all functions
- Icon generation script using Python Pillow
- Professional README with installation and usage instructions

### Technical Details
- Upgraded to Manifest V3 for future compatibility
- Service worker background script for minimal resource usage
- Content script with auto-initialization
- Storage change listeners for real-time updates
- Graceful error handling for restricted pages
- CSS gradient patterns instead of image files
- Original style preservation and restoration
- Cross-device settings synchronization

### Documentation
- Comprehensive README.md with features, installation, and usage
- LICENSE file (MIT License)
- CONTRIBUTING.md with contribution guidelines
- CHANGELOG.md (this file)
- Inline code documentation with JSDoc comments

### Security
- Input validation and sanitization
- Proper error handling to prevent crashes
- No data collection or external transmission
- Minimal required permissions

## [Unreleased]

### Planned Features
- Keyboard shortcuts for quick actions
- Per-domain settings (remember settings for specific websites)
- Import/export settings functionality
- Additional color schemes and themes
- Scheduled dark mode (auto-enable at certain times)
- Whitelist/blacklist for automatic application
- Advanced CSS filters (contrast, saturation, hue rotation)
- Custom color picker for personalized themes
- Accessibility improvements (screen reader support)
- Performance optimizations for large pages

### Known Issues
- None reported yet

---

## Version History

- **1.0.0** (2025-01-16): Initial production-ready release

---

For more information about each release, please visit the [GitHub releases page](https://github.com/yourusername/dark-theme-extension/releases).
