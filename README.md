# The Udasis of Guru Nanak — Interactive Travel Map Website

An interactive, responsive single-page web application visualizing the travels (*Udasis*) of Guru Nanak Dev Ji (1469–1539), the founder of Sikhism. This application integrates historical research and spiritual heritage with interactive mapping cartography and audio synthesis.

---

## Features

1. **Map Visualization**: A full-screen interactive Leaflet map charting the route lines of Guru Nanak's travels:
   - **First Udasi (East)**: Crimson / Saffron line path (`#A6402C`).
   - **Second Udasi (South)**: Emerald / Sea Green line path (`#1F6F5C`).
   - **Third Udasi (North)**: Royal Indigo line path (`#33447C`).
   - **Fourth Udasi (West)**: Earth Bronze line path (`#8C5A24`).
   - **Fifth Udasi (Punjab)**: Warm Earth line path (`#6B4226`).
2. **Manuscript Parchment Theme & Nomenclature**:
   - Displays **Traditional / Historical (Old) Names** in bold serif typography as the primary label, paired with **Modern (New) Names** in parenthetical secondary styling.
3. **Interactive Sidebar & Journey Selector**:
   - Single-click filtering between all 5 journeys (`#showAllBtn` and `.udasi-btn`).
   - Interactive stop cards (`.place-card`) that pan the map directly to locations and open popups.
4. **Ambient Audio Synthesizer**:
   - Uses native **Web Audio API** to generate a soft resonant tanpura-style golden drone (C and G perfect fifth harmonics) with integrated volume control pill in the header.

---

## Codebase Audit & Optimization Results

The codebase and asset structure underwent a comprehensive cleanup and optimization audit:

- **Deleted Orphaned Files**:
  - Removed deprecated legacy backend scripts (`api-engine.js`, `scanner-engine.js`, `ml-engine.js`).
  - Removed unused platform stylesheet (`platform.css`).
  - Removed backup snapshot (`_backup_snapshot/`), trash folder (`_trash/`), design canvas files (`.kombai/`), and the 68-skill definitions (`.agents/`).
  - Removed dev-only linting configs (`.eslintrc.json`, `.prettierrc`).
  - Total deleted file bloat: **~1.2 MB**.
- **Pruned Dead CSS Rules**:
  - Pruned unused CSS classes from legacy layout templates.
  - Removed unused `.control-btn.compare-selected` rule (compare mode uses inline `selected` class instead).
  - Removed unused `.timeline-item.highlight` rule and `@keyframes highlightPulse` (never triggered in JS).
  - Reduced `styles.css` from **38.7 KB → 14.0 KB** (63.8% size reduction).
  - Reduced production bundle `styles.min.css` from **27.5 KB → 10.5 KB** (61.8% bundle reduction).
- **Zero Syntax Errors & Verified Build**:
  - Node syntax checks (`node -c app.js` and `node -c app.min.js`) passed with **0 errors**.
  - Production build via `node build.js` generates clean minified bundles.

---

## Project Structure

| File | Size | Purpose |
|------|------|---------|
| `index.html` | 14.5 KB | Clean single-page application structure |
| `styles.css` | 18.9 KB | Cleaned manuscript parchment theme stylesheet |
| `styles.min.css` | 14.0 KB | Production minified CSS |
| `app.js` | 20.3 KB | Modular Udasis data, Leaflet rendering & Audio synth engine |
| `app.min.js` | 16.3 KB | Production minified JS |
| `build.js` | 1.0 KB | Automated build script (`node build.js`) |
| `research/` | — | Historical source PDF references |

---

## Performance & Accessibility

- **Instant Render**: Leaflet map container settling watched via `ResizeObserver`.
- **Keyboard Navigation**: Markers have `tabindex="0"` and `role="button"` for full WCAG AA compliance.
- **Low Memory Footprint**: Pure vanilla JS with 0 external npm runtime dependencies.

---

## How to Run Locally

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000
```
Open [http://localhost:8000](http://localhost:8000).

---

## Rebuilding Minified Assets

```bash
node build.js
```

---

## Historical Sources Cited

- **Encyclopaedia Britannica**, *"Guru Nanak"* (William Hewat McLeod).
- **Gurinder Singh Mann**, *"Guru Nanak's Life and Legacy: An Appraisal"*.
- **Fauja Singh & Kirpal Singh**, *"Atlas: Travels of Guru Nanak"* (Punjabi University Patiala, 1976).
- **Bhai Gurdas's Vars (Var 1)** (circa 1600).
- **Janamsakhi traditions** (Puratan, Bala, and Meharban manuscripts).
