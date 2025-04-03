# Reading Mode Chrome Extension

![Extension Icon](icons/icon16.png)

A lightweight Chrome extension that applies a dark grayscale filter to web pages, reducing eye strain and improving focus for reading.

## Features

- Toggle between normal and reading mode with one click
- 🌙 Dark background for reduced eye strain
- Clean, distraction-free reading experience
- Automatically disables on Chrome internal pages

## Installation

1. Download the extension files to your computer
2. Open Chrome and navigate to `chrome://extensions`
3. Enable "Developer mode" (toggle in top right corner)
4. Click "Load unpacked" and select the extension folder

## Usage

1. Click the extension icon in your Chrome toolbar
2. Click "Enable Reading Mode" to apply the dark grayscale filter
3. Click again to disable when finished

## Technical Details

- **Manifest Version:** 3
- **Permissions:**
  - `activeTab` - Applies changes to current tab
  - `storage` - Remembers your preferences
  - `scripting` - Injects content scripts

