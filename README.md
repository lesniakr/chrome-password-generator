# Chrome Password Generator

> Secure password generator Chrome extension built with Manifest V3

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome)](https://developer.chrome.com/docs/extensions/)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- [x] Configurable password length (8-64 characters)
- [x] Character type selection:
  - Lowercase letters (a-z)
  - Uppercase letters (A-Z)  
  - Digits (0-9)
  - Special symbols (!@#$%^&*...)
- [x] Cryptographically secure randomness (`crypto.getRandomValues`)
- [x] One-click copy to clipboard
- [x] Clean, responsive popup interface
- [x] Password strength indicator
- [x] Animated UI feedback

## Tech Stack

| Technology | Purpose |
|------------|---------|
| JavaScript (ES6+) | Core logic |
| Chrome Extension API | Browser integration |
| Manifest V3 | Extension configuration |
| Web Crypto API | Secure random generation |
| ESLint + Prettier | Code quality & formatting |

## Architecture

```
src/
├── core/           # Password generation logic
├── utils/          # Helper functions (clipboard, etc.)
├── ui/             # Popup interface (HTML, CSS, JS)
└── manifest.json   # Extension configuration
```

## Installation

### Development Mode

1. Clone the repository:
   ```bash
   git clone https://github.com/lesniakr/chrome-password-generator.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top right)

4. Click **Load unpacked** and select the `src/` folder

5. The extension icon will appear in your toolbar

## GitFlow

This project follows GitFlow branching model:

```
main        → Production-ready releases (tagged)
develop     → Integration branch
feature/*   → New features
release/*   → Release preparation
hotfix/*    → Production fixes
```

### Branch Naming Convention

- `feature/password-generator-core`
- `feature/popup-ui`
- `release/1.0.0`
- `hotfix/clipboard-fix`

## Roadmap

- [x] **v1.0.0** - Core functionality
  - Password generation with options
  - Copy to clipboard
  - Basic UI
- [x] **v1.1.0** - Enhanced UX
  - Password strength indicator
  - Animated feedback
- [x] **v1.2.0** - UI Improvements
  - Click-to-copy on password input
  - Inline copy icon in password field
  - Auto-generate on options change
  - Regenerate button
  - Symbols enabled by default
- [ ] **v1.3.0** - Persistence
  - Save preferences (local storage)
  - Password history (session only)
- [ ] **v1.4.0** - Advanced Features
  - Advanced settings panel
  - Generate multiple passwords at once
  - Custom character sets

## Development

```bash
# Clone and install
git clone https://github.com/lesniakr/chrome-password-generator.git
npm install

# Lint and format
npm run lint
npm run format
```

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add password generation logic
fix: resolve clipboard permission issue
docs: update README with installation steps
chore: configure ESLint rules
refactor: extract character sets to constants
```

## License

MIT License - see [LICENSE](LICENSE) for details.