/* ==========================================
   INITIALIZATION & EVENT BINDINGS
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById("enter-btn");
    if (enterBtn) {
        enterBtn.addEventListener("click", () => {
            if (isEntering) return;
            isEntering = true;
            enterBtn.disabled = true;

            try {
                initAudioEngine();
            } catch (e) {
                console.error("Audio engine failed to initialize:", e);
            }

            const splash = document.getElementById("splash-screen");
            if (splash) splash.classList.add("fade-out");

            setTimeout(() => {
                const appContainer = document.getElementById("app-container");
                if (appContainer) appContainer.classList.remove("hidden");

                initMap();

                const showAllBtn = document.getElementById("showAllBtn");
                if (showAllBtn) {
                    showAllBtn.onclick = showAll;
                }

                // Feature bindings
                initSearch();
                initMeasurement();
                loadURLState();

                // Compare button
                const compareBtn = document.getElementById('compareBtn');
                if (compareBtn) {
                    compareBtn.addEventListener('click', () => toggleCompareMode());
                }

                // Measure button
                const measureBtn = document.getElementById('measureBtn');
                if (measureBtn) {
                    measureBtn.addEventListener('click', () => {
                        measureMode = measureMode === 'distance' ? 'area' : 'distance';
                        clearMeasurement();
                    });
                }

                // Measure clear button
                const clearMeasureBtn = document.getElementById('clearMeasureBtn');
                if (clearMeasureBtn) {
                    clearMeasureBtn.addEventListener('click', () => {
                        clearMeasurement();
                    });
                }

                // Timeline button
                const timelineBtn = document.getElementById('timelineBtn');
                if (timelineBtn) {
                    timelineBtn.addEventListener('click', () => toggleTimeline());
                }

                // Export button
                const exportBtn = document.getElementById('exportBtn');
                if (exportBtn) {
                    exportBtn.addEventListener('click', () => exportMapAsPNG());
                }

                // Language selector
                const langSelect = document.getElementById('langSelect');
                if (langSelect) {
                    langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
                }

                // Drone variant selector
                const droneVariantSelect = document.getElementById('droneVariantSelect');
                if (droneVariantSelect) {
                    droneVariantSelect.addEventListener('change', (e) => setDroneVariant(e.target.value));
                }

                // Volume slider
                const volSlider = document.getElementById("volume-slider");
                if (volSlider) {
                    volSlider.addEventListener("input", () => {
                        if (masterGain) {
                            masterGain.gain.value = parseFloat(volSlider.value);
                        }
                    });
                }

                // Ambient toggle
                const ambientToggle = document.getElementById("ambient-toggle");
                if (ambientToggle) {
                    ambientToggle.addEventListener("click", () => {
                        isAmbient = !isAmbient;
                        ambientToggle.textContent = isAmbient ? i18n[currentLang].ambientOn : i18n[currentLang].ambientOff;
                    });
                }
            }, 600);
        });
    }

    // Attach click listeners to route-items and index-items on the landing page
    const routeItems = document.querySelectorAll(".route-item, .index-item");
    routeItems.forEach(item => {
        item.addEventListener("click", () => {
            const udasiId = item.dataset.udasi;
            if (enterBtn && !isEntering) {
                enterBtn.click();
            }
            if (udasiId) {
                setTimeout(() => {
                    showOne(parseInt(udasiId));
                }, 700);
            }
        });
    });

    // Lazy-load images with data-src attributes
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
            }
        });
    }

    // Call lazyLoadImages after DOM is ready
    lazyLoadImages();

    // Privacy-first analytics stub — no data leaves the client
    const analytics = {
        _events: [],
        trackJourneyView(journeyId) {
            this._events.push({ type: 'journeyView', journeyId, t: Date.now() });
        },
        trackError(msg) {
            this._events.push({ type: 'error', msg, t: Date.now() });
        }
    };

    // Initialize Privacy-First Analytics
    // Track initial page view
    analytics.trackJourneyView(0); // 0 represents overall page view, not a specific journey

    // Override console.error to capture errors for analytics
    (function() {
        const originalError = console.error;
        console.error = function(...args) {
            analytics.trackError(args.map(a => String(a)).join(' '));
            return originalError.apply(this, args);
        };
    })();

    // Override console.warn to capture warnings for analytics
    (function() {
        const originalWarn = console.warn;
        console.warn = function(...args) {
            analytics.trackError(args.map(a => String(a)).join(' '));
            return originalWarn.apply(this, args);
        };
    })();
});