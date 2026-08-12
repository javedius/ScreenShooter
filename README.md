# ScreenShooter

[English](README.md) | [Русский](README.ru.md)

[Website](https://javedius.github.io/ScreenShooter/) · [Privacy Policy](https://javedius.github.io/ScreenShooter/privacy.html)

![ScreenShooter](assets/github-social-preview.png)

ScreenShooter is a browser extension for capturing visible areas, full scrolling pages, and selected page elements. Screenshots can be saved as PNG or PDF.

## Features

- Capture the visible area of the current tab.
- Capture an entire scrolling page.
- Select and capture a specific page element.
- Export screenshots as PNG or PDF.
- Support regular pages and applications with internal scroll containers.
- Hide scrollbars and repeated fixed or sticky elements during full-page capture.
- Remove common cookie banners, chat widgets, and advertising overlays.
- Automatically switch between English and Russian based on the browser language.

## Installation

1. Download or clone the repository.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the project directory.

Screenshots are saved to `Downloads/ScreenShooter`.

## Project structure

- `background/` contains capture workflows, tab access, and output delivery.
- `page/` contains functions executed inside the captured page.
- `offscreen/` handles canvas composition, cropping, PNG, and PDF generation.
- `popup/` contains the extension interface and settings.
- `shared/` contains localization, shared options, filenames, and error messages.

## MVP limitations

- Browser system pages such as `chrome://` and extension stores cannot be captured.
- Some non-standard fixed elements may still appear more than once in a long screenshot.
- Extremely tall pages may exceed the browser's maximum canvas size.
