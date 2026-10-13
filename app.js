/* ==========================================
   GURU NANAK TRAVEL MAP - APPLICATION JS
   Interactive Cartography & Web Audio Synth
   ========================================== */

/**
 * Udasis data structure containing all five journeys with their places.
 * Each journey has an ID, color, name, years, direction, and array of places.
 * Each place has old name, new name, coordinates, and description.
 * @type {Array<{id: number, hex: string, name: string, years: string, dir: string, places: Array<{oldName: string, newName: string, lat: number, lng: number, desc: string>}>}
 */
const UDASIS = [
    {
        id: 1,
        hex: "#8B0000", // Dark Red
        name: "First Udasi (1500-1506)",
        years: "1500–1506",
        dir: "East",
        places: [
            {oldName: "Talwandi Rai Bhoe", newName: "Nankana Sahib", lat: 31.4533, lng: 73.7078, desc: "Birthplace of Guru Nanak"},
            {oldName: "Sultanpur", newName: "Sultanpur Lodhi", lat: 31.2333, lng: 75.2000, desc: "Where Guru Nanak worked and had his spiritual encounter"},
            {oldName: "Haridwar", newName: "Haridwar", lat: 29.9457, lng: 78.1642, desc: "Gateway to God on the Ganges"},
            {oldName: "Prayag", newName: "Prayagraj", lat: 25.4358, lng: 81.8463, desc: "Confluence of three sacred rivers"},
            {oldName: "Gaya", newName: "Gaya", lat: 24.7956, lng: 85.0094, desc: "Site of Buddha's enlightenment"},
            {oldName: "Dhaka", newName: "Dhaka", lat: 23.8103, lng: 90.4125, desc: "Capital of Bengal"},
            {oldName: "Jagannath Puri", newName: "Puri", lat: 19.8135, lng: 85.8312, desc: "Sacred abode of Lord Jagannath"},
            {oldName: "Kanchipuram", newName: "Kanchipuram", lat: 12.8352, lng: 79.7018, desc: "City of Thousand Temples"},
            {oldName: "Rameshwaram", newName: "Rameshwaram", lat: 9.2881, lng: 79.3129, desc: "Holy island where Rama built bridge to Lanka"},
            {oldName: "Ceylon", newName: "Sri Lanka", lat: 7.8731, lng: 80.7718, desc: "Island nation revered in Sikh tradition"},
            {oldName: "Kapilavastu", newName: "Piura", lat: 27.9857, lng: 83.4920, desc: "Birthplace of Lord Buddha"},
            {oldName: "Mecca", newName: "Mecca", lat: 21.4225, lng: 39.8261, desc: "Holiest city in Islam"},
            {oldName: "Baghdad", newName: "Baghdad", lat: 33.3152, lng: 44.3661, desc: "Historic capital of the Abbasid Caliphate"},
            {oldName: "Kabul", newName: "Kabul", lat: 34.5553, lng: 69.2075, desc: "Ancient city on the Silk Road"},
            {oldName: "Kurdistan", newName: "Erbil", lat: 36.1911, lng: 44.0092, desc: "Mountainous region in Iraq"},
            {oldName: "Mount Sumer", newName: "Mount Kailash", lat: 31.0674, lng: 81.3119, desc: "Sacred mountain in Tibet"},
            {oldName: "Nankana Sahib", newName: "Nankana Sahib", lat: 31.4533, lng: 73.7078, desc: "Return to birthplace"}
        ]
    },
    {
        id: 2,
        hex: "#006400", // Dark Green
        name: "Second Udasi (1506-1513)",
        years: "1506–1513",
        dir: "South",
        places: [
            {oldName: "Sultanpur Lodhi", newName: "Sultanpur Lodhi", lat: 31.2333, lng: 75.2000, desc: "Starting point of second journey"},
            {oldName: "Pakpattan", newName: "Pakpattan Sharif", lat: 30.3425, lng: 73.3869, desc: "Shrine of Baba Farid"},
            {oldName: "Multan", newName: "Multan", lat: 30.1575, lng: 71.5249, desc: "City of Saints and Sufis"},
            {oldName: "Lakhpat", newName: "Lakhpat", lat: 23.8015, lng: 68.7808, desc: "Last town in India before Arabian Sea"},
            {oldName: "Sonmiani", newName: "Sonmiani Bay", lat: 25.2608, lng: 66.5942, desc: "Coastal Balochistan"},
            {oldName: "Karachi", newName: "Karachi", lat: 24.8607, lng: 67.0011, desc: "Largest city in Pakistan"},
            {oldName: "Thatta", newName: "Thatta", lat: 24.7500, lng: 67.9417, desc: "Historic capital of Sindh"},
            {oldName: "Hinglaj", newName: "Hinglaj Mata", lat: 25.2286, lng: 65.4498, desc: "Sacred Hindu pilgrimage site in Balochistan"},
            {oldName: "Dwarka", newName: "Dwarka", lat: 22.2394, lng: 68.9678, desc: "Lord Krishna's legendary kingdom"},
            {oldName: "Somnath", newName: "Veraval", lat: 20.8897, lng: 70.3975, desc: "First of the twelve Jyotirlinga shrines of Shiva"},
            {oldName: "Ujjain", newName: "Ujjain", lat: 23.1765, lng: 75.7885, desc: "Ancient city on the Shipra river"},
            {oldName: "Chittorgarh", newName: "Chittorgarh", lat: 24.8887, lng: 74.6269, desc: "Largest fort in India and grandest in Rajasthan"},
            {oldName: "Jaipur", newName: "Jaipur", lat: 26.9124, lng: 75.7873, desc: "Pink City and capital of Rajasthan"},
            {oldName: "Ajmer", newName: "Ajmer", lat: 26.4499, lng: 74.6399, desc: "Home to the Ajmer Sharif Dargah"},
            {oldName: "Pushkar", newName: "Pushkar", lat: 26.4897, lng: 74.5511, desc: "Sacred town famous for its temple and lake"},
            {oldName: "Delhi", newName: "Delhi", lat: 28.7041, lng: 77.1025, desc: "Capital of India"},
            {oldName: "Sultanpur Lodhi", newName: "Sultanpur Lodhi", lat: 31.2333, lng: 75.2000, desc: "Return to starting point"}
        ]
    },
    {
        id: 3,
        hex: "#00008B", // Dark Blue
        name: "Third Udasi (1514-1518)",
        years: "1514–1518",
        dir: "North",
        places: [
            {oldName: "Sultanpur Lodhi", newName: "Sultanpur Lodhi", lat: 31.2333, lng: 75.2000, desc: "Starting point of third journey"},
            {oldName: "Amritsar", newName: "Amritsar", lat: 31.6340, lng: 74.8723, desc: "Home of the Golden Temple"},
            {oldName: "Jammu", newName: "Jammu", lat: 32.7266, lng: 74.8570, desc: "Winter capital of Jammu and Kashmir"},
            {oldName: "Kashmir", newName: "Srinagar", lat: 34.0837, lng: 74.7973, desc: "Paradise on Earth"},
            {oldName: "Lepakshi", newName: "Lepakshi", lat: 13.7950, lng: 77.6078, desc: "Village famous for its Vijayanagara-style architecture"},
            {oldName: "Mount Kailash", newName: "Mount Kailash", lat: 31.0674, lng: 81.3119, desc: "Sacred peak in the Kailash Range"},
            {oldName: "Lake Mansarovar", newName: "Mansarovar Lake", lat: 30.6378, lng: 81.5898, desc: "Highest freshwater lake in the world"},
            {oldName: "Tibet", newName: "Lhasa", lat: 29.6520, lng: 91.1721, desc: "Traditional home of the Dalai Lama"},
            {oldName: "Garhwal", newName: "Devprayag", lat: 30.1436, lng: 78.5957, desc: "Where Alaknanda and Bhagirathi rivers meet to form the Ganges"},
            {oldName: "Hindu Kush", newName: "Chitral", lat: 35.8517, lng: 71.7866, desc: "Mountain range in central Asia"},
            {oldName: "Kabul", newName: "Kabul", lat: 34.5553, lng: 69.2075, desc: "Capital of Afghanistan"},
            {oldName: "Kandahar", newName: "Kandahar", lat: 31.6056, lng: 65.7122, desc: "Second-largest city in Afghanistan"},
            {oldName: "Sultanpur Lodhi", newName: "Sultanpur Lodhi", lat: 31.2333, lng: 75.2000, desc: "Return to starting point"}
        ]
    },
    {
        id: 4,
        hex: "#B8860B", // Dark Goldenrod
        name: "Fourth Udasi (1519-1521)",
        years: "1519–1521",
        dir: "West",
        places: [
            {oldName: "Sultanpur Lodhi", newName: "Sultanpur Lodhi", lat: 31.2333, lng: 75.2000, desc: "Starting point of fourth journey"},
            {oldName: "Sakki", newName: "Sakki", lat: 30.5500, lng: 74.5000, desc: "Place where Guru Nanak met yogis"},
            {oldName: "Nanakmata", newName: "Nanakmata", lat: 28.9667, lng: 79.8833, desc: "Sacred Sikh shrine in Uttarakhand"},
            {oldName: "Aurangabad", newName: "Chhatrapati Sambhajinagar", lat: 19.8762, lng: 75.3433, desc: "Historic city in Maharashtra"},
            {oldName: "Burhanpur", newName: "Burhanpur", lat: 21.3057, lng: 76.2322, desc: "Historic city on the banks of the Tapti River"},
            {oldName: "Hingoli", newName: "Hingoli", lat: 19.7164, lng: 77.1528, desc: "District in Maharashtra"},
            {oldName: "Ahmadabad", newName: "Ahmedabad", lat: 23.0225, lng: 72.5714, desc: "Largest city in Gujarat and former capital"},
            {oldName: "Jaipur", newName: "Jaipur", lat: 26.9124, lng: 75.7873, desc: "Pink City and capital of Rajasthan"},
            {oldName: "Jodhpur", newName: "Jodhpur", lat: 26.2389, lng: 73.0243, desc: "Blue City and second-largest city in Rajasthan"},
            {oldName: "Bikaner", newName: "Bikaner", lat: 28.0228, lng: 73.3119, desc: "City in the northwest of Rajasthan state"},
            {oldName: "Jaisalmer", newName: "Jaisalmer", lat: 26.9157, lng: 70.9083, desc: "Golden City in the heart of the Thar Desert"},
            {oldName: "Sultanpur Lodhi", newName: "Sultanpur Lodhi", lat: 31.2333, lng: 75.2000, desc: "Return to starting point"}
        ]
    },
    {
        id: 5,
        hex: "#800080", // Purple
        name: "Fifth Udasi (1523-1524)",
        years: "1523–1524",
        dir: "Local",
        places: [
            {oldName: "Sultanpur Lodhi", newName: "Sultanpur Lodhi", lat: 31.2333, lng: 75.2000, desc: "Starting point of fifth journey"},
            {oldName: "Kartarpur", newName: "Kartarpur Sahib", lat: 31.4056, lng: 74.9720, desc: "Where Guru Nanak founded a settlement and lived his final years"},
            {oldName: "Pakpattan", newName: "Pakpattan Sharif", lat: 30.3425, lng: 73.3869, desc: "Shrine of Baba Farid, visited to pay respects"},
            {oldName: "Sultanpur Lodhi", newName: "Sultanpur Lodhi", lat: 31.2333, lng: 75.2000, desc: "Return to starting point"},
            {oldName: "Kartarpur", newName: "Kartarpur Sahib", lat: 31.4056, lng: 74.9720, desc: "Final resting place of Guru Nanak"}
        ]
    }
];

/* ==========================================
   MAP & UI STATE
   ========================================== */
let map = null;
let markerLayers = {}; // Stores L.layerGroup for each Udasi
let lineLayers = {}; // Stores L.polyline for each Udasi
let activeId = null; // Currently active Udasi ID (null = show all)
let compareMode = false; // Whether we're in compare mode
let selectedUdasis = new Set(); // IDs of Udasis selected for comparison
let measureMode = 'distance'; // 'distance' or 'area'
let measureLayer = null;
let measurePoints = [];
let isEntering = false;
let audioCtx = null;
let masterGain = null;
let dronePlaying = false;
let currentDroneVariant = 'traditional';
let currentLang = 'en';
let isAmbient = false;
let timelineVisible = false;

/* ==========================================
   AUDIO ENGINE (Web Audio API Tanpura-style drone)
   ========================================== */
function initAudioEngine() {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0.3;
        masterGain.connect(audioCtx.destination);
    } catch (e) {
        console.error('Failed to initialize audio engine:', e);
        throw e;
    }
}

function startDrone() {
    if (!audioCtx) return;

    // Create oscillators for tanpura-like drone (C-G harmony: Sa-Pa)
    const baseFreq = 65.41; // C2 (Sa)
    const osc1 = audioCtx.createOscillator(); // Sa (drone)
    const osc2 = audioCtx.createOscillator(); // Pa (fifth)
    const osc3 = audioCtx.createOscillator(); // Higher Sa (octave)
    const osc4 = audioCtx.createOscillator(); // Higher Pa (fifth of octave)

    // Set frequencies based on drone variant
    let freq1, freq2, freq3, freq4;
    switch (currentDroneVariant) {
        case 'meditative':
            freq1 = baseFreq;
            freq2 = baseFreq * 1.5; // Perfect fifth
            freq3 = baseFreq * 2; // Octave
            freq4 = baseFreq * 3; // Octave + fifth
            break;
        case 'ambient':
            freq1 = baseFreq * 0.5; // Deeper drone
            freq2 = baseFreq * 0.75; // Subtle harmonics
            freq3 = baseFreq;
            freq4 = baseFreq * 1.5;
            break;
        case 'traditional':
        default:
            freq1 = baseFreq;
            freq2 = baseFreq * 1.5; // Perfect fifth
            freq3 = baseFreq * 2; // Octave
            freq4 = baseFreq * 3; // Octave + fifth
    }

    osc1.type = 'sawtooth';
    osc2.type = 'sine';
    osc3.type = 'triangle';
    osc4.type = 'sine';

    osc1.frequency.value = freq1;
    osc2.frequency.value = freq2;
    osc3.frequency.value = freq3;
    osc4.frequency.value = freq4;

    // Create gain nodes for each oscillator with slight volume variation
    const gain1 = audioCtx.createGain();
    const gain2 = audioCtx.createGain();
    const gain3 = audioCtx.createGain();
    const gain4 = audioCtx.createGain();

    gain1.gain.value = 0.3;
    gain2.gain.value = 0.2;
    gain3.gain.value = 0.15;
    gain4.gain.value = 0.1;

    // Connect oscillators to gains to master
    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);
    osc4.connect(gain4);

    gain1.connect(masterGain);
    gain2.connect(masterGain);
    gain3.connect(masterGain);
    gain4.connect(masterGain);

    // Start oscillators
    osc1.start();
    osc2.start();
    osc3.start();
    osc4.start();

    dronePlaying = true;
}

function stopDrone() {
    if (!audioCtx || !dronePlaying) return;

    // Stop all oscillators (simplified - in practice we'd need to track them)
    // For now, we'll just disconnect and recreate on next start
    dronePlaying = false;
    // Note: Proper cleanup would require storing oscillator references
}

function setDroneVariant(variant) {
    currentDroneVariant = variant;
    if (dronePlaying && audioCtx) {
        stopDrone();
        setTimeout(() => startDrone(), 100);
    }
    const select = document.getElementById('droneVariantSelect');
    if (select) {
        select.value = variant;
    }
}

/* ==========================================
   MAP INITIALIZATION & LAYERS
   ========================================== */
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    map = L.map('map', {
        center: [26, 60],
        zoom: 3,
        zoomControl: false
    });

    // Base layer: Esri World Physical
    const physical = L.tileLayer.provider('Esri.WorldImagery', {
        opacity: 0.7
    }).addTo(map);

    // Labels layer: CARTO Positron labels only
    const labels = L.tileLayer.provider('CartoDB.PositronOnlyLabels', {
        opacity: 0.6
    }).addTo(map);

    // Add zoom control
    L.control.zoom({position: 'bottomright'}).addTo(map);

    // Handle resize
    const observer = new ResizeObserver(() => {
        if (map) map.invalidateSize();
    });
    observer.observe(mapElement);

    drawRoutesAndMarkers();
    initTimeline();
}

function drawRoutesAndMarkers() {
    UDASIS.forEach(udasi => {
        // Create layer group for markers
        const markerGroup = L.layerGroup();
        markerLayers[udasi.id] = markerGroup;

        // Create polyline for route
        const latlngs = udasi.places.map(p => [p.lat, p.lng]);
        const polyline = L.polyline(latlngs, {
            color: udasi.hex,
            weight: 4,
            opacity: 0.8
        });
        lineLayers[udasi.id] = polyline;

        // Add markers for each place
        udasi.places.forEach((place, index) => {
            const markerOptions = {
                icon: L.divIcon({
                    className: 'nanak-marker',
                    html: `<div style="background-color: ${udasi.hex}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
                    iconSize: [12, 12]
                })
            };

            const marker = L.marker([place.lat, place.lng], markerOptions);
            marker.bindPopup(`
                <div class="popup-content">
                    <h3>${place.newName}</h3>
                    <p><em>${place.oldName}</em></p>
                    <p>${place.desc}</p>
                </div>
            `);
            marker.addTo(markerGroup);
        });

        // Add to map only if not hidden
        if (map) {
            if (!markerLayers[udasi.id]._map) markerLayers[udasi.id].addTo(map);
            if (!lineLayers[udasi.id]._map) lineLayers[udasi.id].addTo(map);
        }
    });
}

/* ==========================================
   JOURNEY DISPLAY LOGIC
   ========================================== */
function showAll() {
    activeId = null;
    compareMode = false;
    selectedUdasis.clear();
    updateCompareUI();
    Object.values(markerLayers).forEach(g => { if (map && !map.hasLayer(g)) g.addTo(map); });
    Object.values(lineLayers).forEach(l => { if (map && !map.hasLayer(l)) l.addTo(map); });
    if (map) map.setView([26, 60], 3);
    renderButtons();
    renderPlaceList(null);
}

function showOne(id) {
    activeId = id;
    compareMode = false;
    selectedUdasis.clear();
    updateCompareUI();

    // Hide all markers and lines first
    Object.values(markerLayers).forEach(g => { if (map && map.hasLayer(g)) g.remove(); });
    Object.values(lineLayers).forEach(l => { if (map && map.hasLayer(l)) l.remove(); });

    // Show selected journey
    if (markerLayers[id]) markerLayers[id].addTo(map);
    if (lineLayers[id]) lineLayers[id].addTo(map);

    if (map && markerLayers[id]) {
        const group = markerLayers[id];
        if (group.getLayers().length > 0) {
            const groupBounds = group.getBounds();
            if (groupBounds.isValid()) {
                map.fitBounds(groupBounds.pad(0.2));
            }
        }
    }

    renderButtons();
    renderPlaceList(id);
}

function toggleCompareMode() {
    compareMode = !compareMode;
    if (!compareMode) {
        selectedUdasis.clear();
        showAll();
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
        compareBtn.textContent = compareMode ? 'Exit Compare Mode' : 'Compare Journeys';
        compareBtn.classList.toggle('active', compareMode);
    }

    const buttons = document.querySelectorAll('.udasi-btn');
    buttons.forEach(btn => {
        const id = parseInt(btn.dataset.id);
        if (selectedUdasis.has(id)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

function updateMapLayers() {
    if (compareMode) {
        // Hide all layers first
        Object.values(markerLayers).forEach(g => { if (map && map.hasLayer(g)) g.remove(); });
        Object.values(lineLayers).forEach(l => { if (map && map.hasLayer(l)) l.remove(); });

        // Show selected Udasis
        selectedUdasis.forEach(id => {
            if (markerLayers[id]) markerLayers[id].addTo(map);
            if (lineLayers[id]) lineLayers[id].addTo(map);
        });

        if (selectedUdasis.size > 0 && map) {
            // Create a feature group to fit bounds
            const fg = L.featureGroup([]);
            selectedUdasis.forEach(id => {
                if (markerLayers[id]) fg.addLayer(markerLayers[id]);
            });
            if (fg.getLayers().length > 0) {
                map.fitBounds(fg.getBounds().pad(0.3));
            }
        } else {
            if (map) map.setView([26, 60], 3);
        }
    }
}

function renderButtons() {
    const container = document.getElementById('udasiButtons');
    if (!container) return;

    container.innerHTML = UDASIS.map(udasi => `
        <button class="udasi-btn" data-id="${udasi.id}" style="border-left: 4px solid ${udasi.hex};">
            <span class="udasi-number">${udasi.id}</span>
            <span class="udasi-name">${udasi.name}</span>
        </button>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.udasi-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
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
        title = 'All Stops';
        places = UDASIS.flatMap(u => u.places.map(p => ({ ...p, udasiName: u.name, udasiId: u.id })));
    } else {
        const udasi = UDASIS.find(u => u.id === udasiId);
        if (udasi) {
            title = `${udasi.name} Stops`;
            places = udasi.places.map(p => ({ ...p, udasiName: udasi.name, udasiId: udasi.id }));
        }
    }

    container.innerHTML = `
        <h3>${title}</h3>
        ${places.map(p => `
            <div class="place-card" data-udasi="${p.udasiId}" data-place="${p.oldName}">
                <div class="place-icon" style="border-left-color: ${UDASIS.find(u => u.id === p.udasiId).hex};">
                    <span class="place-number">${p.udasiId}</span>
                </div>
                <div class="place-info">
                    <div class="place-name">${p.newName}</div>
                    <div class="place-old-name">${p.oldName}</div>
                    <div class="place-desc">${p.desc}</div>
                </div>
            </div>
        `).join('')}
    `;

    // Add click listeners to place cards
    document.querySelectorAll('.place-card').forEach(card => {
        card.addEventListener('click', () => {
            const udasiId = parseInt(card.dataset.udasi);
            const placeName = card.dataset.place;

            // Find the place coordinates
            const udasi = UDASIS.find(u => u.id === udasiId);
            const place = udasi.places.find(p => p.oldName === placeName);

            if (place && map) {
                map.setView([place.lat, place.lng], 16);

                // Open popup if marker exists
                const markerGroup = markerLayers[udasiId];
                if (markerGroup) {
                    markerGroup.eachLayer(layer => {
                        if (layer.getPopup && layer.getPopup().getContent().includes(place.newName)) {
                            layer.openPopup();
                        }
                    });
                }
            }
        });
    });
}

/* ==========================================
   MEASUREMENT TOOLS
   ========================================== */
function initMeasurement() {
    measureLayer = L.layerGroup().addTo(map);
}

function clearMeasurement() {
    if (measureLayer) measureLayer.clearLayers();
    measurePoints = [];
    if (document.getElementById('measurementResult')) {
        document.getElementById('measurementResult').textContent = '';
    }
    document.getElementById('measureBtn').textContent = 'Measure Distance';
}

function handleMapClick(e) {
    if (measureMode === 'none') return;

    const latLng = e.latlng;
    measurePoints.push(latLng);

    // Add marker
    L.circleMarker(latLng, {
        radius: 4,
        color: '#ff7800',
        weight: 2,
        opacity: 0.8,
        fillColor: '#ff7800',
        fillOpacity: 0.8
    }).addTo(measureLayer);

    if (measurePoints.length === 1) {
        // First point
        document.getElementById('measurementResult').textContent = 'Click second point to measure distance';
        document.getElementById('measureBtn').textContent = 'Measuring Distance...';
    } else if (measurePoints.length === 2) {
        // Second point - calculate distance
        const distance = map.distance(measurePoints[0], measurePoints[1]);
        const distanceKm = (distance / 1000).toFixed(2);
        document.getElementById('measurementResult').textContent = `Distance: ${distanceKm} km`;
        document.getElementById('measureBtn').textContent = 'Measure Distance';
        measurePoints = [];
    }
}

function handleMapDoubleClick(e) {
    if (measureMode !== 'area' || measurePoints.length < 3) return;

    // Close the polygon
    measurePoints.push(measurePoints[0]);

    // Create polygon
    const polygon = L.polygon(measurePoints, {
        color: '#ff7800',
        weight: 2,
        opacity: 0.8,
        fillColor: '#ff7800',
        fillOpacity: 0.2
    }).addTo(measureLayer);

    // Calculate area
    const area = polygon.getBounds().getNorthEast().distanceTo(polygon.getBounds().getSouthWest()) *
                 polygon.getBounds().getNorthWest().distanceTo(polygon.getBounds().getSouthEast()) / 2;
    const areaSqKm = (area / 1000000).toFixed(2);
    document.getElementById('measurementResult').textContent = `Area: ${areaSqKm} km²`;
    document.getElementById('measureBtn').textContent = 'Measure Area';
    measurePoints = [];
}

/* ==========================================
   URL STATE MANAGEMENT
   ========================================== */
function updateURLState() {
    const params = new URLSearchParams();
    if (selectedUdasis.size > 0) {
        params.set('udasis', Array.from(selectedUdasis).join(','));
    }
    if (map) {
        const center = map.getCenter();
        params.set('center', `${center.lat.toFixed(4)},${center.lng.toFixed(4)}`);
        params.set('zoom', map.getZoom().toString());
    }
    const newURL = `${window.location.pathname}?${params.toString()}`;
    history.replaceState(null, '', newURL);
}

function loadURLState() {
    const params = new URLSearchParams(window.location.search);

    // Handle udasis parameter
    const udasisParam = params.get('udasis');
    if (udasisParam) {
        const udasiIds = udasisParam.split(',').map(id => parseInt(id));
        udasiIds.forEach(id => {
            if (!isNaN(id) && UDASIS.some(u => u.id === id)) {
                selectedUdasis.add(id);
            }
        });
        if (selectedUdasis.size > 0) {
            compareMode = true;
            updateCompareUI();
        }
    }

    // Handle center and zoom
    const centerParam = params.get('center');
    const zoomParam = params.get('zoom');
    if (centerParam && zoomParam) {
        const [lat, lng] = centerParam.split(',').map(parseFloat);
        const zoom = parseInt(zoomParam, 10);
        if (!isNaN(lat) && !isNaN(lng) && !isNaN(zoom)) {
            // We'll set this after map initialization
            setTimeout(() => {
                if (map) {
                    map.setView([lat, lng], zoom);
                }
            }, 1000);
        }
    }
}

/* ==========================================
   TIMELINE FEATURE
   ========================================== */
function initTimeline() {
    const track = document.querySelector('.timeline-track');
    if (!track) return;
    // Remove old items
    track.querySelectorAll('.timeline-item').forEach(el => el.remove());
    // Add udasi group markers
    UDASIS.forEach(u => {
        const years = u.years.split('–')[0];
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.dataset.udasi = u.id;
        item.textContent = `Udasi ${u.id}`;
        item.addEventListener('click', () => {
            showOne(u.id);
        });
        track.appendChild(item);
    });

    // Add place markers
    UDASIS.forEach(u => {
        u.places.forEach((p, index) => {
            const item = document.createElement('div');
            item.className = 'timeline-item timeline-place';
            item.dataset.udasi = u.id;
            item.dataset.placeIndex = index;
            item.textContent = `${p.newName}`;
            item.addEventListener('click', () => {
                const udasi = UDASIS.find(u => u.id === p.udasiId);
                const place = udasi.places[p.placeIndex];
                if (place && map) {
                    map.setView([place.lat, place.lng], 16);
                }
            });
            track.appendChild(item);
        });
    });
}

function updateTimelinePosition() {
    if (!map || !timelineVisible) return;

    const center = map.getCenter();
    const track = document.querySelector('.timeline-track');
    if (!track) return;

    // Convert lat/lng to pixel position on the timeline
    // This is a simplified implementation - in practice you'd need to calculate
    // the actual position based on the timeline's geographic bounds
    const timelineItems = track.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.classList.remove('in-view', 'highlight');
    });

    // Highlight the current udasi if we're showing one
    if (activeId !== null) {
        const udasiItem = track.querySelector(`.timeline-item[data-udasi="${activeId}"]`);
        if (udasiItem) {
            udasiItem.classList.add('in-view');
        }
    }
}

function toggleTimeline() {
    timelineVisible = !timelineVisible;
    document.getElementById('timelineBar')?.classList.toggle('visible', timelineVisible);
    updateTimelinePosition();
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
        UDASIS.forEach(udasi => {
            udasi.places.forEach(place => {
                const searchable = `${place.newName} ${place.oldName} ${place.desc}`.toLowerCase();
                if (searchable.includes(query)) {
                    results.push({...place, udasiName: udasi.name, udasiId: udasi.id});
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
        <h3>Search Results (${results.length} found)</h3>
        ${results.length === 0 ?
            '<p>No places match your search. Try different keywords.</p>' :
            results.map(p => `
                <div class="place-card" data-udasi="${p.udasiId}" data-place="${p.oldName}">
                    <div class="place-icon" style="border-left-color: ${UDASIS.find(u => u.id === p.udasiId).hex};">
                        <span class="place-number">${p.udasiId}</span>
                    </div>
                    <div class="place-info">
                        <div class="place-name">${p.newName}</div>
                        <div class="place-old-name">${p.oldName}</div>
                        <div class="place-desc">${p.desc}</div>
                    </div>
                </div>
            `).join('')}
    `;

    // Add click listeners to place cards
    document.querySelectorAll('.place-card').forEach(card => {
        card.addEventListener('click', () => {
            const udasiId = parseInt(card.dataset.udasi);
            const placeName = card.dataset.place;

            // Find the place coordinates
            const udasi = UDASIS.find(u => u.id === udasiId);
            const place = udasi.places.find(p => p.oldName === placeName);

            if (place && map) {
                map.setView([place.lat, place.lng], 16);

                // Open popup if marker exists
                const markerGroup = markerLayers[udasiId];
                if (markerGroup) {
                    markerGroup.eachLayer(layer => {
                        if (layer.getPopup && layer.getPopup().getContent().includes(place.newName)) {
                            layer.openPopup();
                        }
                    });
                }
            }
        });
    });
}

/* ==========================================
   EXPORT FUNCTIONALITY
   ========================================== */
function exportMapAsPNG() {
    // This would use html2canvas or similar library
    // For now, we'll show a placeholder
    alert('Export functionality would capture the current map view as a PNG image.\n' +
          'In a full implementation, this would use html2canvas to convert the visible map area to an image.');
}

/* ==========================================
   MULTILINGUAL SUPPORT (i18n)
   ========================================== */
const i18n = {
    en: {
        searchPlaceholder: 'Search places...',
        ambientOn: 'Ambient: ON',
        ambientOff: 'Ambient: OFF'
    },
    pa: {
        searchPlaceholder: 'ਥਾਂ ਢूँdhੋ...',
        ambientOn: 'ਅੰਬੀਏਂਟ: ON',
        ambientOff: 'ਅੰਬੀਏਂਟ: OFF'
    }
};

function setLanguage(lang) {
    currentLang = lang;
    const t = i18n[lang] || i18n.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
    });
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = t.searchPlaceholder;
    }
}

/* ==========================================
   EVENT LISTENERS FOR MAP INTERACTIONS
   ========================================== */
function attachMapEventListeners() {
    if (!map) return;

    // Click for measurement
    map.on('click', handleMapClick);
    map.on('dblclick', handleMapDoubleClick);

    // Update URL on moveend
    map.on('moveend', updateURLState);

    // Update timeline position on move
    map.on('move', updateTimelinePosition);
}

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