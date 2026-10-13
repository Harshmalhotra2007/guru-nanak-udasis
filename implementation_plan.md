# Implementation Plan: Filesystem Audit & Cleanup

Comprehensive audit and cleanup of the codebase to eliminate unnecessary files, optimize build assets, update tests, and verify all core functions.

## User Review Required

> [!IMPORTANT]
> **Files to be Deleted**:
> - [DELETE] `api-engine.js` (34 KB unreferenced legacy script)
> - [DELETE] `ml-engine.js` (24 KB unreferenced legacy script)
> - [DELETE] `scanner-engine.js` (22 KB unreferenced legacy script)
> - [DELETE] `platform.css` (43 KB unreferenced legacy stylesheet)
> - [DELETE] `Optimized_Website_Source.pdf` (220 KB unused root PDF artifact)

## Proposed Changes

### Root Directory Cleanup

#### [DELETE] [api-engine.js](file:///c:/Code/Baba%20nanak/api-engine.js)
- Delete unused legacy file.

#### [DELETE] [ml-engine.js](file:///c:/Code/Baba%20nanak/ml-engine.js)
- Delete unused legacy file.

#### [DELETE] [scanner-engine.js](file:///c:/Code/Baba%20nanak/scanner-engine.js)
- Delete unused legacy file.

#### [DELETE] [platform.css](file:///c:/Code/Baba%20nanak/platform.css)
- Delete unused legacy stylesheet.

#### [DELETE] [Optimized_Website_Source.pdf](file:///c:/Code/Baba%20nanak/Optimized_Website_Source.pdf)
- Delete unused root PDF artifact.

---

### Core Files Preservation & Validation

#### [MODIFY] [build.js](file:///c:/Code/Baba%20nanak/build.js)
- Execute `node build.js` to ensure `app.min.js` and `styles.min.css` are up-to-date with current `app.js` and `styles.css`.

#### [NEW] [tests.html](file:///c:/Code/Baba%20nanak/tests.html)
- Add regression test suite verifying `UDASIS` array data, `initMap()`, audio synthesizer, button handlers, and DOM structure.

#### [MODIFY] [README.md](file:///c:/Code/Baba%20nanak/README.md)
- Update documentation reflecting lean directory structure and instructions for running the site and test suite.

---

## Verification Plan

### Automated Build & Test Validation
- Run `node build.js` to generate minified bundles.
- Execute automated unit test suite in `tests.html` via Node/HTTP server.
- Perform HTTP status check on `http://localhost:8000/`.

### Manual & Regression Verification
- Verify map rendering with Esri physical tiles and Carto labels overlay.
- Test Udasi selection buttons, place list filtering, and audio toggle.
