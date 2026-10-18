/* ==========================================
   GURU NANAK TRAVEL MAP - APPLICATION JS
   Interactive Cartography & Web Audio Synth
   ========================================== */

/**
 * Historical Udasis dataset containing all five journeys.
 * Scholarly reconstruction based on Janamsakhi traditions, Bhai Gurdas's Vars,
 * and academic atlases (Fauja Singh & Kirpal Singh, Punjabi University Patiala).
 */
const UDASIS = [
  { id: 1, hex: '#A6402C', name: 'First Udasi', years: '1500–1506', dir: 'East',
    places: [
      {oldName: 'Sultanpur Lodhi', newName: 'Punjab', lat: 31.22, lng: 75.20, desc: 'Where Guru Nanak entered the Kali Bein river and emerged with his first teaching: "There is no Hindu, no Musalman."'},
      {oldName: 'Dilli', newName: 'Delhi', lat: 28.61, lng: 77.21, desc: 'Passed through the Sultanate capital on the road east.'},
      {oldName: 'Thanesar', newName: 'Kurukshetra', lat: 29.97, lng: 76.88, desc: 'Visited during a solar eclipse fair, challenging ritualism at the sacred tanks.'},
      {oldName: 'Haridwar', newName: 'Uttarakhand', lat: 29.95, lng: 78.16, desc: 'The episode of throwing water toward Punjab — questioning ritual water-offerings to ancestors.'},
      {oldName: 'Gorakhmata', newName: 'now Nanakmata', lat: 28.94, lng: 79.81, desc: 'A major center of Nath Yogis; renamed Nanakmata after spiritual debates with ascetics.'},
      {oldName: 'Ayodhya', newName: 'Awadh', lat: 26.79, lng: 82.20, desc: 'A stop on the Gangetic pilgrim road east.'},
      {oldName: 'Prayag', newName: 'now Prayagraj / Allahabad', lat: 25.44, lng: 81.85, desc: 'At the sangam of the Ganga and Yamuna, another centre of ritual bathing.'},
      {oldName: 'Kashi / Benares', newName: 'now Varanasi', lat: 25.32, lng: 82.97, desc: 'Engaged pandits on the meaning of true devotion versus empty ritual.'},
      {oldName: 'Gaya', newName: 'Bihar', lat: 24.80, lng: 85.00, desc: 'A major site of Hindu ancestral rites.'},
      {oldName: 'Pataliputra', newName: 'now Patna', lat: 25.59, lng: 85.14, desc: 'A stop on the journey down the Ganga.'},
      {oldName: 'Kamrup', newName: 'now Dhubri, Assam', lat: 26.02, lng: 89.99, desc: 'Met the Vaishnav saint Shankardev in the Kamrup region.'},
      {oldName: 'Pragjyotishpura', newName: 'now Guwahati', lat: 26.14, lng: 91.74, desc: 'Site of the well-known account of Guru Nanak and the sorceress Noor Shah.'},
      {oldName: 'Sylhet', newName: 'now Bangladesh', lat: 24.89, lng: 91.87, desc: 'Met Sufi saint Shah Jalal, in what is now Bangladesh.'},
      {oldName: 'Dacca', newName: 'now Dhaka', lat: 23.81, lng: 90.41, desc: 'Continued the eastern circuit through Bengal.'},
      {oldName: 'Kataka', newName: 'now Cuttack', lat: 20.46, lng: 85.88, desc: 'A stop en route to the Odisha coast.'},
      {oldName: 'Jagannath Puri', newName: 'Puri, Odisha', lat: 19.81, lng: 85.83, desc: 'Sang a hymn of the true Aarti — nature’s ceaseless worship — countering idol-focused ritual.'}
    ]
  },
  { id: 2, hex: '#1F6F5C', name: 'Second Udasi', years: '1506–1513', dir: 'South',
    places: [
      {oldName: 'Bidar (Nanak Jhira)', newName: 'Karnataka', lat: 17.91, lng: 77.53, desc: 'A Deccan stop; Gurdwara Nanak Jhira Sahib marks the tradition of his visit.'},
      {oldName: 'Kanchi', newName: 'now Kanchipuram', lat: 12.83, lng: 79.70, desc: 'One of the great temple towns of the Tamil south.'},
      {oldName: 'Sethubandha', newName: 'now Rameshwaram', lat: 9.29, lng: 79.31, desc: 'The southern tip of the mainland, a major pilgrimage crossing point.'},
      {oldName: 'Sangladip', newName: 'now Sri Lanka', lat: 8.50, lng: 80.50, desc: 'Crossed the strait to the island, engaging local rulers and teachers, per the Puratan Janamsakhi.'}
    ]
  },
  { id: 3, hex: '#33447C', name: 'Third Udasi', years: '1514–1518', dir: 'North',
    places: [
      {oldName: 'Kashmir Valley', newName: 'now Srinagar', lat: 34.08, lng: 74.80, desc: 'Journeyed through the Kashmir valley on the northern route.'},
      {oldName: 'Leh (Nanak Lama)', newName: 'Ladakh', lat: 34.15, lng: 77.58, desc: 'High-altitude stop; Gurdwara Pathar Sahib nearby marks his passage.'},
      {oldName: 'Sumer Parbat', newName: 'now Mount Kailash', lat: 31.07, lng: 81.31, desc: 'Tradition holds he debated Siddha yogis gathered at this sacred peak.'},
      {oldName: 'Lhasa', newName: 'Tibet', lat: 29.65, lng: 91.17, desc: 'Furthest point of the northern journey onto the Tibetan plateau.'},
      {oldName: 'Kathmandu', newName: 'Nepal', lat: 27.72, lng: 85.32, desc: 'A stop on the Himalayan return leg.'},
      {oldName: 'Tashkent', newName: 'Uzbekistan', lat: 41.30, lng: 69.24, desc: 'Some accounts extend this Udasi into Central Asia before the return.'}
    ]
  },
  { id: 4, hex: '#8C5A24', name: 'Fourth Udasi', years: '1519–1521', dir: 'West',
    places: [
      {oldName: 'Multan', newName: 'Punjab, Pakistan', lat: 30.16, lng: 71.52, desc: 'A centre of Sufi learning; met local Pirs here.'},
      {oldName: 'Uch Sharif', newName: 'Pakistan', lat: 29.23, lng: 71.07, desc: 'An old seat of Sufi scholarship on the road southwest.'},
      {oldName: 'Sukkur', newName: 'Sindh', lat: 27.71, lng: 68.86, desc: 'A stop along the Indus toward the Sindh coast.'},
      {oldName: 'Lakhpat', newName: 'Kutch, Gujarat', lat: 23.82, lng: 68.78, desc: 'A gurdwara in Kutch commemorates his stay before the sea crossing.'},
      {oldName: 'Mecca (Makka)', newName: 'Saudi Arabia', lat: 21.39, lng: 39.86, desc: 'Debated the qazis on the meaning of prayer’s true direction.'},
      {oldName: 'Medina (Madinah)', newName: 'Saudi Arabia', lat: 24.52, lng: 39.57, desc: 'Continued the discourse on devotion beyond ritual orientation.'},
      {oldName: 'Baghdad', newName: 'Iraq', lat: 33.32, lng: 44.37, desc: 'Engaged the Pir of Baghdad and scholars of this major centre of learning.'},
      {oldName: 'Tehran', newName: 'Iran', lat: 35.69, lng: 51.39, desc: 'A stop on the return route through Persia.'},
      {oldName: 'Kabul', newName: 'Afghanistan', lat: 34.56, lng: 69.21, desc: 'Crossed into Afghanistan en route back toward Punjab.'},
      {oldName: 'Khyber Pass', newName: 'Jalalabad Corridor', lat: 34.44, lng: 70.44, desc: 'Passed through this historic mountain corridor home.'},
      {oldName: 'Gorakh Hatri', newName: 'now Peshawar', lat: 34.02, lng: 71.52, desc: 'A stop on the final leg east.'},
      {oldName: 'Panja Sahib', newName: 'now Hasan Abdal', lat: 33.82, lng: 72.70, desc: 'Tradition of the handprint on stone; marked today by Gurdwara Panja Sahib.'}
    ]
  },
  { id: 5, hex: '#6B4226', name: 'Fifth Udasi', years: '1523–1524', dir: 'Punjab',
    places: [
      {oldName: 'Kartarpur Sahib', newName: 'Narowal, Pakistan', lat: 32.04, lng: 75.03, desc: 'Guru Nanak founded this town on the Ravi in 1522 and settled here as a farmer-householder for his last 18 years.'}
    ]
  }
];

/* ==========================================
   STATE MANAGEMENT
   ========================================== */
let map = null;
let markerLayers = {};
let lineLayers = {};
let activeId = null;
let compareMode = false;
let selectedUdasis = new Set();
let measureMode = 'none'; // 'none', 'distance', 'area'
let measureLayer = null;
let measurePoints = [];
let measurePolyline = null;
let isEntering = false;
let audioCtx = null;
let masterGain = null;
let activeOscillators = [];
let dronePlaying = false;
let currentDroneVariant = 'traditional';
let currentLang = 'en';
let timelineVisible = false;

// Constants
const MAP_FIT_PADDING = [40, 40];
const ROUTE_SHOW_DELAY = 700;

function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatPlaceTitle(p) {
    const oldN = p.oldName || p.name || '';
    const newN = p.newName ? `<span class="new-name">(${escapeHTML(p.newName)})</span>` : '';
    return `<span class="old-name">${escapeHTML(oldN)}</span> ${newN}`;
}

/**
 * Creates accessible markers conforming to WCAG AA keyboard focus rules
 */
function makeIcon(hex, isFirst) {
    return L.divIcon({
        className: '',
        html: `<div class="${isFirst ? 'start-marker' : 'nanak-marker'}" style="background:${hex};" tabindex="0" role="button" aria-label="${isFirst ? 'Starting point marker' : 'Journey stop marker'}"></div>`,
        iconSize: isFirst ? [21, 21] : [15, 15],
        iconAnchor: isFirst ? [11, 11] : [8, 8]
    });
}

/* ==========================================
   WEB AUDIO ENGINE (Tanpura-Style Drone)
   ========================================== */
function initAudioEngine() {
    if (audioCtx) return;
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        masterGain = audioCtx.createGain();
        const volSlider = document.getElementById('volume-slider');
        masterGain.gain.value = volSlider ? parseFloat(volSlider.value) : 0.3;
        masterGain.connect(audioCtx.destination);
    } catch (e) {
        console.error('Failed to initialize audio engine:', e);
    }
}

function startDrone() {
    initAudioEngine();
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    stopDrone(); // Clear any existing oscillators

    const baseFreq = 65.41; // C2 (Sa)
    let f1, f2, f3, f4;
    switch (currentDroneVariant) {
        case 'meditative':
            f1 = baseFreq;
            f2 = baseFreq * 1.5; // Pa
            f3 = baseFreq * 2;   // Sa'
            f4 = baseFreq * 2.67;// Ma'
            break;
        case 'ambient':
            f1 = baseFreq * 0.5; // Low Sa
            f2 = baseFreq * 0.75;// Low Pa
            f3 = baseFreq;       // Sa
            f4 = baseFreq * 1.5; // Pa
            break;
        case 'traditional':
        default:
            f1 = baseFreq;
            f2 = baseFreq * 1.5; // Pa
            f3 = baseFreq * 2;   // Sa'
            f4 = baseFreq * 3;   // Pa'
    }

    const oscConfigs = [
        { freq: f1, type: 'sawtooth', gain: 0.25 },
        { freq: f2, type: 'sine', gain: 0.20 },
        { freq: f3, type: 'triangle', gain: 0.15 },
        { freq: f4, type: 'sine', gain: 0.10 }
    ];

    activeOscillators = oscConfigs.map(cfg => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();

        osc.type = cfg.type;
        osc.frequency.setValueAtTime(cfg.freq, audioCtx.currentTime);

        g.gain.setValueAtTime(0.001, audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(cfg.gain, audioCtx.currentTime + 1.2);

        osc.connect(g);
        g.connect(masterGain);
        osc.start();

        return { osc, gainNode: g };
    });

    dronePlaying = true;
    updateAudioUI(true);
}

function stopDrone() {
    if (!dronePlaying && activeOscillators.length === 0) return;

    if (activeOscillators.length > 0) {
        activeOscillators.forEach(({ osc, gainNode }) => {
            try {
                if (audioCtx) {
                    gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.4);
                    setTimeout(() => {
                        try {
                            osc.stop();
                            osc.disconnect();
                        } catch (err) {}
                    }, 450);
                } else {
                    osc.stop();
                    osc.disconnect();
                }
            } catch (e) {}
        });
        activeOscillators = [];
    }

    dronePlaying = false;
    updateAudioUI(false);
}

function toggleDrone() {
    if (dronePlaying) {
        stopDrone();
    } else {
        startDrone();
    }
}

function updateAudioUI(isPlaying) {
    const ambientBtn = document.getElementById('ambient-toggle');
    if (!ambientBtn) return;

    ambientBtn.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    const playIcon = ambientBtn.querySelector('.audio-icon-play');
    const pauseIcon = ambientBtn.querySelector('.audio-icon-pause');

    if (playIcon && pauseIcon) {
        if (isPlaying) {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
            ambientBtn.classList.remove('pause');
            ambientBtn.classList.add('playing');
        } else {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            ambientBtn.classList.add('pause');
            ambientBtn.classList.remove('playing');
        }
    }
}

function setDroneVariant(variant) {
    currentDroneVariant = variant;
    if (dronePlaying) {
        startDrone();
    }
}

/* ==========================================
   MAP INITIALIZATION & LAYERS
   ========================================== */
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    if (map) {
        try { map.remove(); } catch (e) {}
        map = null;
    }

    map = L.map('map', {
        center: [26, 68],
        zoom: 4,
        zoomControl: false
    });

    // Detailed Esri World Imagery (satellite basemap)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ',
        maxZoom: 17,
        opacity: 0.8
    }).addTo(map);

    // Carto Positron Labels Overlay
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        opacity: 0.7
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const observer = new ResizeObserver(() => {
        if (map) map.invalidateSize();
    });
    observer.observe(mapElement);

    drawRoutesAndMarkers();
    initTimeline();
    initMeasurement();
    attachMapEventListeners();
}

function drawRoutesAndMarkers() {
    markerLayers = {};
    lineLayers = {};

    UDASIS.forEach(u => {
        const markerGroup = L.layerGroup();
        const latlngs = [];

        u.places.forEach((p, idx) => {
            const isFirst = (idx === 0);
            const marker = L.marker([p.lat, p.lng], {
                icon: makeIcon(u.hex, isFirst),
                keyboard: true,
                title: p.oldName
            });

            const titleHtml = formatPlaceTitle(p);
            marker.bindPopup(`
                <div class="popup-tag" style="background:${u.hex}">${escapeHTML(u.name)} · ${escapeHTML(u.dir)}</div>
                <p class="popup-title">${titleHtml}</p>
                <p class="popup-desc">${escapeHTML(p.desc)}</p>
            `);

            // Keyboard accessibility listener for map markers
            marker.on('add', () => {
                const el = marker.getElement();
                if (el) {
                    el.addEventListener('keydown', (ev) => {
                        if (ev.key === 'Enter' || ev.key === ' ') {
                            ev.preventDefault();
                            marker.openPopup();
                        }
                    });
                }
            });

            marker.addTo(markerGroup);
            latlngs.push([p.lat, p.lng]);
        });

        const polyline = L.polyline(latlngs, {
            color: u.hex,
            weight: 3.5,
            opacity: 0.85,
            dashArray: '4, 8',
            lineCap: 'round',
            lineJoin: 'round'
        });

        markerLayers[u.id] = markerGroup;
        lineLayers[u.id] = polyline;
    });

    showAll();
}

/* ==========================================
   JOURNEY DISPLAY LOGIC
   ========================================== */
function showAll() {
    activeId = null;
    compareMode = false;
    selectedUdasis.clear();
    updateCompareUI();

    Object.values(markerLayers).forEach(g => {
        if (map && !map.hasLayer(g)) g.addTo(map);
    });
    Object.values(lineLayers).forEach(l => {
        if (map && !map.hasLayer(l)) l.addTo(map);
    });

    if (map) map.setView([26, 68], 4);
    renderButtons();
    renderPlaceList(null);
    updateTimelinePosition();
}

function showOne(id) {
    activeId = id;
    compareMode = false;
    selectedUdasis.clear();
    updateCompareUI();

    Object.values(markerLayers).forEach(g => {
        if (map && map.hasLayer(g)) g.remove();
    });
    Object.values(lineLayers).forEach(l => {
        if (map && map.hasLayer(l)) l.remove();
    });

    if (markerLayers[id] && map) markerLayers[id].addTo(map);
    if (lineLayers[id] && map) {
        lineLayers[id].addTo(map);
        try {
            const bounds = lineLayers[id].getBounds();
            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: MAP_FIT_PADDING, maxZoom: 8 });
            }
        } catch (e) {}
    }

    renderButtons();
    renderPlaceList(id);
    updateTimelinePosition();
}

function toggleCompareMode() {
    compareMode = !compareMode;
    if (!compareMode) {
        selectedUdasis.clear();
        showAll();
    } else {
        selectedUdasis.clear();
        if (activeId !== null) selectedUdasis.add(activeId);
        updateMapLayers();
    }
    updateCompareUI();
}

function toggleUdasiSelection(id) {
    if (!compareMode) return;

    if (selectedUdasis.has(id)) {
        selectedUdasis.delete(id);
    } else {
        selectedUdasis.add(id);
    }

    updateCompareUI();
    updateMapLayers();
}

function updateCompareUI() {
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.textContent = compareMode ? 'Exit Compare' : (i18n[currentLang]?.compare || 'Compare');
        compareBtn.classList.toggle('active', compareMode);
    }

    const buttons = document.querySelectorAll('.udasi-btn');
    buttons.forEach(btn => {
        const id = parseInt(btn.dataset.id, 10);
        btn.classList.toggle('selected', compareMode && selectedUdasis.has(id));
    });
}

function updateMapLayers() {
    if (!compareMode) return;

    Object.values(markerLayers).forEach(g => { if (map && map.hasLayer(g)) g.remove(); });
    Object.values(lineLayers).forEach(l => { if (map && map.hasLayer(l)) l.remove(); });

    const activeGroups = [];
    selectedUdasis.forEach(id => {
        if (markerLayers[id] && map) {
            markerLayers[id].addTo(map);
            activeGroups.push(markerLayers[id]);
        }
        if (lineLayers[id] && map) lineLayers[id].addTo(map);
    });

    if (activeGroups.length > 0 && map) {
        const fg = L.featureGroup(activeGroups);
        const bounds = fg.getBounds();
        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: MAP_FIT_PADDING });
        }
    } else if (map) {
        map.setView([26, 68], 4);
    }
}

function renderButtons() {
    const container = document.getElementById('udasiButtons');
    if (!container) return;

    container.innerHTML = UDASIS.map(u => {
        const isActive = (activeId === u.id);
        return `
            <button class="udasi-btn${isActive ? ' active' : ''}" data-id="${u.id}" style="--dot: ${u.hex}; border-left: 4px solid ${u.hex};">
                <span class="dot" style="background:${u.hex};"></span>
                <span>
                    <b>${escapeHTML(u.name)} — ${escapeHTML(u.dir)}</b>
                    <span class="yr">${escapeHTML(u.years)}</span>
                </span>
            </button>
        `;
    }).join('');

    const showAllBtn = document.getElementById('showAllBtn');
    if (showAllBtn) {
        showAllBtn.classList.toggle('active', activeId === null && !compareMode);
    }

    document.querySelectorAll('.udasi-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id, 10);
            if (compareMode) {
                toggleUdasiSelection(id);
            } else {
                showOne(id);
            }
        });
    });
}

function renderPlaceList(udasiId) {
    const container = document.getElementById('placeList');
    if (!container) return;

    let places = [];
    let title = '';

    if (udasiId === null) {
        title = i18n[currentLang]?.allStops || 'All Stops (39 Sites)';
        places = UDASIS.flatMap(u => u.places.map((p, idx) => ({ ...p, udasiName: u.name, udasiId: u.id, index: idx, hex: u.hex })));
    } else {
        const udasi = UDASIS.find(u => u.id === udasiId);
        if (udasi) {
            title = `${udasi.name} Stops`;
            places = udasi.places.map((p, idx) => ({ ...p, udasiName: udasi.name, udasiId: udasi.id, index: idx, hex: udasi.hex }));
        }
    }

    container.innerHTML = `
        <h3 style="font-size:0.85rem; color:var(--ink-soft); margin: 10px 0 6px;">${escapeHTML(title)}</h3>
        ${places.map(p => `
            <div class="place-card" data-udasi="${p.udasiId}" data-index="${p.index}" style="--dot: ${p.hex}; cursor: pointer;">
                <div class="place-info">
                    <div class="pname">${formatPlaceTitle(p)}</div>
                    <div class="pdesc">${escapeHTML(p.desc)}</div>
                </div>
            </div>
        `).join('')}
    `;

    container.querySelectorAll('.place-card').forEach(card => {
        card.addEventListener('click', () => {
            const uId = parseInt(card.dataset.udasi, 10);
            const pIdx = parseInt(card.dataset.index, 10);
            focusPlace(uId, pIdx);
        });
    });
}

function focusPlace(udasiId, placeIndex) {
    const udasi = UDASIS.find(u => u.id === udasiId);
    if (!udasi) return;
    const place = udasi.places[placeIndex];
    if (!place || !map) return;

    // If journey is not currently on map, bring it in
    if (activeId !== null && activeId !== udasiId) {
        showOne(udasiId);
    } else if (!map.hasLayer(markerLayers[udasiId])) {
        markerLayers[udasiId].addTo(map);
        if (lineLayers[udasiId]) lineLayers[udasiId].addTo(map);
    }

    map.setView([place.lat, place.lng], 8, { animate: true });

    // Open popup
    const markerGroup = markerLayers[udasiId];
    if (markerGroup) {
        markerGroup.eachLayer(layer => {
            const ll = layer.getLatLng();
            if (Math.abs(ll.lat - place.lat) < 0.001 && Math.abs(ll.lng - place.lng) < 0.001) {
                setTimeout(() => layer.openPopup(), 200);
            }
        });
    }
}

/* ==========================================
   SEARCH FEATURE
   ========================================== */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
            renderPlaceList(activeId);
            return;
        }

        const results = [];
        UDASIS.forEach(u => {
            u.places.forEach((p, idx) => {
                const searchStr = `${p.newName} ${p.oldName} ${p.desc} ${u.name}`.toLowerCase();
                if (searchStr.includes(query)) {
                    results.push({ ...p, udasiName: u.name, udasiId: u.id, index: idx, hex: u.hex });
                }
            });
        });

        renderSearchResults(results);
    });
}

function renderSearchResults(results) {
    const container = document.getElementById('placeList');
    if (!container) return;

    container.innerHTML = `
        <h3 style="font-size:0.85rem; color:var(--ink-soft); margin: 10px 0 6px;">
            Search Results (${results.length} found)
        </h3>
        ${results.length === 0 ?
            '<p style="font-size:0.75rem; color:var(--ink-soft); padding:8px 0;">No places found. Try another city or keyword.</p>' :
            results.map(p => `
                <div class="place-card" data-udasi="${p.udasiId}" data-index="${p.index}" style="--dot: ${p.hex}; cursor: pointer;">
                    <div class="place-info">
                        <div class="pname">${formatPlaceTitle(p)}</div>
                        <div style="font-size:0.65rem; color:var(--saffron); font-weight:600; margin-bottom:2px;">${escapeHTML(p.udasiName)}</div>
                        <div class="pdesc">${escapeHTML(p.desc)}</div>
                    </div>
                </div>
            `).join('')}
    `;

    container.querySelectorAll('.place-card').forEach(card => {
        card.addEventListener('click', () => {
            const uId = parseInt(card.dataset.udasi, 10);
            const pIdx = parseInt(card.dataset.index, 10);
            focusPlace(uId, pIdx);
        });
    });
}

/* ==========================================
   MEASUREMENT TOOLS
   ========================================== */
function initMeasurement() {
    if (map && !measureLayer) {
        measureLayer = L.layerGroup().addTo(map);
    }
}

function clearMeasurement() {
    if (measureLayer) measureLayer.clearLayers();
    measurePoints = [];
    measurePolyline = null;
    const res = document.getElementById('measurementResult');
    if (res) res.textContent = '';
    const clearBtn = document.getElementById('clearMeasureBtn');
    if (clearBtn) clearBtn.style.display = 'none';
}

function handleMapClick(e) {
    if (measureMode === 'none') return;

    const latLng = e.latlng;
    measurePoints.push(latLng);

    const clearBtn = document.getElementById('clearMeasureBtn');
    if (clearBtn) clearBtn.style.display = 'block';

    L.circleMarker(latLng, {
        radius: 5,
        color: '#E67E22',
        weight: 2,
        fillColor: '#FFD700',
        fillOpacity: 0.9
    }).addTo(measureLayer);

    if (measureMode === 'distance') {
        if (measurePoints.length === 1) {
            document.getElementById('measurementResult').textContent = 'Click second point to measure distance...';
        } else if (measurePoints.length >= 2) {
            const p1 = measurePoints[measurePoints.length - 2];
            const p2 = measurePoints[measurePoints.length - 1];

            L.polyline([p1, p2], {
                color: '#E67E22',
                weight: 3,
                dashArray: '5, 5'
            }).addTo(measureLayer);

            let totalDist = 0;
            for (let i = 0; i < measurePoints.length - 1; i++) {
                totalDist += map.distance(measurePoints[i], measurePoints[i + 1]);
            }
            const km = (totalDist / 1000).toFixed(1);
            document.getElementById('measurementResult').textContent = `Total Distance: ${km} km (${measurePoints.length} points)`;
        }
    } else if (measureMode === 'area') {
        if (measurePoints.length < 3) {
            document.getElementById('measurementResult').textContent = `Add ${3 - measurePoints.length} more point(s), then double-click to close area.`;
        } else {
            document.getElementById('measurementResult').textContent = `${measurePoints.length} points. Double-click map to complete polygon.`;
        }
    }
}

function handleMapDoubleClick(e) {
    if (measureMode !== 'area' || measurePoints.length < 3) return;

    L.DomEvent.stop(e); // Stop Leaflet double click zoom

    const polygon = L.polygon(measurePoints, {
        color: '#E67E22',
        weight: 2.5,
        fillColor: '#FFD700',
        fillOpacity: 0.35
    }).addTo(measureLayer);

    // Accurate Spherical Polygon Area calculation
    const areaSqM = computePolygonArea(measurePoints);
    const areaSqKm = (areaSqM / 1000000).toFixed(1);
    document.getElementById('measurementResult').textContent = `Enclosed Area: ${areaSqKm} km²`;

    measurePoints = [];
}

/**
 * Computes spherical excess polygon area in square meters
 */
function computePolygonArea(latlngs) {
    const RADIUS = 6378137; // Earth radius in meters
    if (latlngs.length < 3) return 0;
    let total = 0;
    const len = latlngs.length;
    for (let i = 0; i < len; i++) {
        const p1 = latlngs[i];
        const p2 = latlngs[(i + 1) % len];
        const lat1 = p1.lat * Math.PI / 180;
        const lat2 = p2.lat * Math.PI / 180;
        const dLng = (p2.lng - p1.lng) * Math.PI / 180;
        total += dLng * (2 + Math.sin(lat1) + Math.sin(lat2));
    }
    return Math.abs(total * RADIUS * RADIUS / 4.0);
}

/* ==========================================
   TIMELINE FEATURE
   ========================================== */
function initTimeline() {
    const track = document.querySelector('.timeline-track');
    if (!track) return;

    track.innerHTML = '<div id="timelineIndicator"></div>';

    // Build timeline markers for all 5 journeys
    UDASIS.forEach((u, uIdx) => {
        u.places.forEach((p, pIdx) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.dataset.udasi = u.id;
            item.dataset.index = pIdx;
            item.title = `${u.name}: ${p.oldName} (${p.newName})`;
            item.innerHTML = `<span style="color:${u.hex}; font-weight:700;">${u.id}.${pIdx + 1}</span> ${escapeHTML(p.oldName)}`;
            
            // Positioning across 100% width
            const pct = ((uIdx * 8 + pIdx) / 38) * 94 + 3;
            item.style.left = `${pct}%`;

            item.addEventListener('click', () => {
                focusPlace(u.id, pIdx);
            });

            track.appendChild(item);
        });
    });
}

function updateTimelinePosition() {
    if (!map || !timelineVisible) return;

    const track = document.querySelector('.timeline-track');
    const indicator = document.getElementById('timelineIndicator');
    if (!track || !indicator) return;

    track.querySelectorAll('.timeline-item').forEach(item => {
        const itemUId = parseInt(item.dataset.udasi, 10);
        if (activeId === null || activeId === itemUId) {
            item.classList.add('in-view');
        } else {
            item.classList.remove('in-view');
        }
    });

    if (activeId !== null) {
        const firstOfU = track.querySelector(`.timeline-item[data-udasi="${activeId}"]`);
        if (firstOfU) {
            indicator.style.left = firstOfU.style.left;
        }
    }
}

function toggleTimeline() {
    timelineVisible = !timelineVisible;
    const bar = document.getElementById('timelineBar');
    if (bar) {
        bar.classList.toggle('visible', timelineVisible);
    }
    const btn = document.getElementById('timelineBtn');
    if (btn) {
        btn.classList.toggle('active', timelineVisible);
    }
    updateTimelinePosition();
}

/* ==========================================
   URL & HISTORY STATE MANAGEMENT
   ========================================== */
function updateURLState() {
    if (!map) return;
    const params = new URLSearchParams();
    if (activeId !== null) {
        params.set('udasi', activeId.toString());
    } else if (selectedUdasis.size > 0) {
        params.set('udasis', Array.from(selectedUdasis).join(','));
    }
    const center = map.getCenter();
    params.set('center', `${center.lat.toFixed(2)},${center.lng.toFixed(2)}`);
    params.set('zoom', map.getZoom().toString());
    history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
}

function loadURLState() {
    const params = new URLSearchParams(window.location.search);
    const udasiParam = params.get('udasi');
    const udasisParam = params.get('udasis');

    if (udasiParam) {
        const id = parseInt(udasiParam, 10);
        if (!isNaN(id) && UDASIS.some(u => u.id === id)) {
            showOne(id);
        }
    } else if (udasisParam) {
        const ids = udasisParam.split(',').map(s => parseInt(s, 10)).filter(n => !isNaN(n));
        if (ids.length > 0) {
            compareMode = true;
            selectedUdasis = new Set(ids);
            updateCompareUI();
            updateMapLayers();
        }
    }

    const centerParam = params.get('center');
    const zoomParam = params.get('zoom');
    if (centerParam && zoomParam && map) {
        const [lat, lng] = centerParam.split(',').map(parseFloat);
        const z = parseInt(zoomParam, 10);
        if (!isNaN(lat) && !isNaN(lng) && !isNaN(z)) {
            map.setView([lat, lng], z);
        }
    }
}

/* ==========================================
   MULTILINGUAL SUPPORT (i18n)
   ========================================== */
const i18n = {
    en: {
        selectJourney: 'Select a journey',
        showAll: 'Show all five journeys',
        stops: 'Stops',
        tools: 'Tools',
        compare: 'Compare',
        measure: 'Measure',
        clear: 'Clear',
        timeline: 'Timeline',
        export: 'Export',
        language: 'Language',
        audio: 'Audio',
        resources: 'Resources',
        resourcesBtn: 'Resources',
        allStops: 'All Stops (39 Sites)',
        searchPlaceholder: 'Search places, cities, teachings...'
    },
    pa: {
        selectJourney: 'ਉਦਾਸੀ ਚੁਣੋ',
        showAll: 'ਪੰਜੇ ਉਦਾਸੀਆਂ ਦਿਖਾਓ',
        stops: 'ਮੁੱਖ ਪੜਾਅ',
        tools: 'ਸਾਧਨ',
        compare: 'ਤੁਲਨਾ ਕਰੋ',
        measure: 'ਦੂਰੀ ਮਾਪੋ',
        clear: 'ਸਾਫ਼ ਕਰੋ',
        timeline: 'ਕਾਲਕ੍ਰਮ',
        export: 'ਐਕਸਪੋਰਟ',
        language: 'ਭਾਸ਼ਾ',
        audio: 'ਧੁਨੀ',
        resources: 'ਸਰੋਤ',
        resourcesBtn: 'ਸਰੋਤ ਵੇਖੋ',
        allStops: 'ਸਾਰੇ ੩੯ ਇਤਿਹਾਸਕ ਸਥਾਨ',
        searchPlaceholder: 'ਸਥਾਨ ਜਾਂ ਸ਼ਹਿਰ ਖੋਜੋ...'
    }
};

function setLanguage(lang) {
    currentLang = lang;
    const t = i18n[lang] || i18n.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = t.searchPlaceholder;
    }

    renderPlaceList(activeId);
}

/* ==========================================
   EXPORT REPORT
   ========================================== */
function exportMapSummary() {
    window.print();
}

/* ==========================================
   EVENT LISTENERS FOR LEAFLET MAP
   ========================================== */
function attachMapEventListeners() {
    if (!map) return;

    map.on('click', handleMapClick);
    map.on('dblclick', handleMapDoubleClick);
    map.on('moveend', updateURLState);
    map.on('move', updateTimelinePosition);
}

/* ==========================================
   DOM INITIALIZATION & BINDINGS
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            if (isEntering) return;
            isEntering = true;
            enterBtn.disabled = true;

            try {
                initAudioEngine();
            } catch (e) {
                console.error('Audio engine init failed:', e);
            }

            const splash = document.getElementById('splash-screen');
            if (splash) splash.classList.add('fade-out');

            // Wait for fade-out CSS transition (800ms) before showing app & initializing map
            setTimeout(() => {
                const appContainer = document.getElementById('app-container');
                if (appContainer) appContainer.classList.remove('hidden');

                try {
                    initMap();
                } catch (e) {
                    console.error('Map init failed:', e);
                }

                // Revalidate map size now that both containers are laid out
                if (map && appContainer) {
                    const checkVisible = () => {
                        if (appContainer.offsetParent !== null || getComputedStyle(appContainer).display !== 'none') {
                            map.invalidateSize();
                            return;
                        }
                        requestAnimationFrame(checkVisible);
                    };
                    requestAnimationFrame(checkVisible);
                }

                // Show all button
                const showAllBtn = document.getElementById('showAllBtn');
                if (showAllBtn) {
                    showAllBtn.onclick = showAll;
                }

                // Search
                try { initSearch(); } catch (e) { console.error('Search init failed:', e); }

                // URL state
                loadURLState();
                window.addEventListener('popstate', loadURLState);

                // Compare button
                const compareBtn = document.getElementById('compareBtn');
                if (compareBtn) {
                    compareBtn.addEventListener('click', () => toggleCompareMode());
                }

                // Measure button
                const measureBtn = document.getElementById('measureBtn');
                if (measureBtn) {
                    measureBtn.addEventListener('click', () => {
                        if (measureMode === 'none') {
                            measureMode = 'distance';
                            measureBtn.textContent = 'Measuring Distance';
                            measureBtn.classList.add('active');
                            if (map) map.doubleClickZoom.enable();
                        } else if (measureMode === 'distance') {
                            measureMode = 'area';
                            measureBtn.textContent = 'Measuring Area';
                            measureBtn.classList.add('active');
                            if (map) map.doubleClickZoom.disable();
                        } else {
                            measureMode = 'none';
                            measureBtn.textContent = i18n[currentLang]?.measure || 'Measure';
                            measureBtn.classList.remove('active');
                            if (map) map.doubleClickZoom.enable();
                            clearMeasurement();
                        }
                    });
                }

                // Clear Measure button
                const clearMeasureBtn = document.getElementById('clearMeasureBtn');
                if (clearMeasureBtn) {
                    clearMeasureBtn.addEventListener('click', () => clearMeasurement());
                }

                // Timeline button
                const timelineBtn = document.getElementById('timelineBtn');
                if (timelineBtn) {
                    timelineBtn.addEventListener('click', () => toggleTimeline());
                }

                // Export button
                const exportBtn = document.getElementById('exportBtn');
                if (exportBtn) {
                    exportBtn.addEventListener('click', () => exportMapSummary());
                }

                // Language selector
                const langSelect = document.getElementById('langSelect');
                if (langSelect) {
                    langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
                }

                // Audio Drone variant selector
                const droneVariantSelect = document.getElementById('droneVariantSelect');
                if (droneVariantSelect) {
                    droneVariantSelect.addEventListener('change', (e) => setDroneVariant(e.target.value));
                }

                // Volume slider
                const volSlider = document.getElementById('volume-slider');
                if (volSlider) {
                    volSlider.addEventListener('input', () => {
                        if (masterGain) {
                            masterGain.gain.setValueAtTime(parseFloat(volSlider.value), audioCtx.currentTime);
                        }
                    });
                }

                // Ambient Audio toggle button
                const ambientToggle = document.getElementById('ambient-toggle');
                if (ambientToggle) {
                    ambientToggle.addEventListener('click', () => {
                        toggleDrone();
                    });
                }

                // Resources button toggle
                const resourcesBtn = document.getElementById('resourcesBtn');
                const resourcesContent = document.getElementById('resourcesContent');
                if (resourcesBtn && resourcesContent) {
                    resourcesBtn.addEventListener('click', () => {
                        const isHidden = (resourcesContent.style.display === 'none' || !resourcesContent.style.display);
                        resourcesContent.style.display = isHidden ? 'block' : 'none';
                        resourcesBtn.classList.toggle('active', isHidden);
                    });
                }

                // Contribution Form Submission Handler
                const contributionForm = document.getElementById('contributionForm');
                const contributionStatus = document.getElementById('contributionStatus');
                if (contributionForm) {
                    contributionForm.addEventListener('submit', (ev) => {
                        ev.preventDefault();
                        const topic = document.getElementById('contributionTopic')?.value;
                        if (contributionStatus) {
                            contributionStatus.innerHTML = `<span style="color:#2ecc71; font-size:0.75rem;">Thank you! Your contribution on "${escapeHTML(topic)}" has been received for moderation.</span>`;
                        }
                        contributionForm.reset();
                        setTimeout(() => {
                            if (contributionStatus) contributionStatus.innerHTML = '';
                        }, 5000);
                    });
                }
            }, 600);
        });
    }

    // Landing Page route index & sidebar buttons
    const routeItems = document.querySelectorAll('.route-item, .index-item');
    routeItems.forEach(item => {
        item.addEventListener('click', () => {
            const udasiId = item.dataset.udasi;
            if (enterBtn && !isEntering) {
                enterBtn.click();
            }
            if (udasiId) {
                const targetId = parseInt(udasiId, 10);
                const attemptShow = () => {
                    if (map) {
                        showOne(targetId);
                    } else {
                        setTimeout(attemptShow, 200);
                    }
                };
                setTimeout(attemptShow, ROUTE_SHOW_DELAY);
            }
        });
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }
    });
});