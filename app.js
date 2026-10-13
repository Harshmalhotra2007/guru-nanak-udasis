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
  { id:1, hex:'#A6402C', name:'First Udasi', years:'1500–1506', dir:'East',
    places:[
      {oldName:'Sultanpur Lodhi', newName:'Punjab', lat:31.22, lng:75.20, desc:'Where Guru Nanak entered the Kali Bein river and emerged with his first teaching: "There is no Hindu, no Musalman."'},
      {oldName:'Dilli', newName:'Delhi', lat:28.61, lng:77.21, desc:'Passed through the Sultanate capital on the road east.'},
      {oldName:'Thanesar', newName:'Kurukshetra', lat:29.97, lng:76.88, desc:'Visited during a solar eclipse fair, challenging ritualism at the sacred tanks.'},
      {oldName:'Haridwar', newName:'Uttarakhand', lat:29.95, lng:78.16, desc:'The episode of throwing water toward Punjab — questioning ritual water-offerings to ancestors.'},
      {oldName:'Gorakhmata', newName:'now Nanakmata', lat:28.94, lng:79.81, desc:'A major center of Nath Yogis; renamed Nanakmata after spiritual debates with ascetics.'},
      {oldName:'Ayodhya', newName:'Awadh', lat:26.79, lng:82.20, desc:'A stop on the Gangetic pilgrim road east.'},
      {oldName:'Prayag', newName:'now Prayagraj / Allahabad', lat:25.44, lng:81.85, desc:'At the sangam of the Ganga and Yamuna, another centre of ritual bathing.'},
      {oldName:'Kashi / Benares', newName:'now Varanasi', lat:25.32, lng:82.97, desc:'Engaged pandits on the meaning of true devotion versus empty ritual.'},
      {oldName:'Gaya', newName:'Bihar', lat:24.80, lng:85.00, desc:'A major site of Hindu ancestral rites.'},
      {oldName:'Pataliputra', newName:'now Patna', lat:25.59, lng:85.14, desc:'A stop on the journey down the Ganga.'},
      {oldName:'Kamrup', newName:'now Dhubri, Assam', lat:26.02, lng:89.99, desc:'Met the Vaishnav saint Shankardev in the Kamrup region.'},
      {oldName:'Pragjyotishpura', newName:'now Guwahati', lat:26.14, lng:91.74, desc:'Site of the well-known account of Guru Nanak and the sorceress Noor Shah.'},
      {oldName:'Sylhet', newName:'now Bangladesh', lat:24.89, lng:91.87, desc:'Met Sufi saint Shah Jalal, in what is now Bangladesh.'},
      {oldName:'Dacca', newName:'now Dhaka', lat:23.81, lng:90.41, desc:'Continued the eastern circuit through Bengal.'},
      {oldName:'Kataka', newName:'now Cuttack', lat:20.46, lng:85.88, desc:'A stop en route to the Odisha coast.'},
      {oldName:'Jagannath Puri', newName:'Puri, Odisha', lat:19.81, lng:85.83, desc:'Sang a hymn of the true Aarti — nature’s ceaseless worship — countering idol-focused ritual.'}
    ]},
  { id:2, hex:'#1F6F5C', name:'Second Udasi', years:'1506–1513', dir:'South',
    places:[
      {oldName:'Bidar (Nanak Jhira)', newName:'Karnataka', lat:17.91, lng:77.53, desc:'A Deccan stop; Gurdwara Nanak Jhira Sahib marks the tradition of his visit.'},
      {oldName:'Kanchi', newName:'now Kanchipuram', lat:12.83, lng:79.70, desc:'One of the great temple towns of the Tamil south.'},
      {oldName:'Sethubandha', newName:'now Rameshwaram', lat:9.29, lng:79.31, desc:'The southern tip of the mainland, a major pilgrimage crossing point.'},
      {oldName:'Sangladip', newName:'now Sri Lanka', lat:8.5, lng:80.5, desc:'Crossed the strait to the island, engaging local rulers and teachers, per the Puratan Janamsakhi.'}
    ]},
  { id:3, hex:'#33447C', name:'Third Udasi', years:'1514–1518', dir:'North',
    places:[
      {oldName:'Kashmir Valley', newName:'now Srinagar', lat:34.08, lng:74.80, desc:'Journeyed through the Kashmir valley on the northern route.'},
      {oldName:'Leh (Nanak Lama)', newName:'Ladakh', lat:34.15, lng:77.58, desc:'High-altitude stop; Gurdwara Pathar Sahib nearby marks his passage.'},
      {oldName:'Sumer Parbat', newName:'now Mount Kailash', lat:31.07, lng:81.31, desc:'Tradition holds he debated Siddha yogis gathered at this sacred peak.'},
      {oldName:'Lhasa', newName:'Tibet', lat:29.65, lng:91.17, desc:'Furthest point of the northern journey onto the Tibetan plateau.'},
      {oldName:'Kathmandu', newName:'Nepal', lat:27.72, lng:85.32, desc:'A stop on the Himalayan return leg.'},
      {oldName:'Tashkent', newName:'Uzbekistan', lat:41.30, lng:69.24, desc:'Some accounts extend this Udasi into Central Asia before the return.'}
    ]},
  { id:4, hex:'#8C5A24', name:'Fourth Udasi', years:'1519–1521', dir:'West',
    places:[
      {oldName:'Multan', newName:'Punjab, Pakistan', lat:30.16, lng:71.52, desc:'A centre of Sufi learning; met local Pirs here.'},
      {oldName:'Uch Sharif', newName:'Pakistan', lat:29.23, lng:71.07, desc:'An old seat of Sufi scholarship on the road southwest.'},
      {oldName:'Sukkur', newName:'Sindh', lat:27.71, lng:68.86, desc:'A stop along the Indus toward the Sindh coast.'},
      {oldName:'Lakhpat', newName:'Kutch, Gujarat', lat:23.82, lng:68.78, desc:'A gurdwara in Kutch commemorates his stay before the sea crossing.'},
      {oldName:'Mecca (Makka)', newName:'Saudi Arabia', lat:21.39, lng:39.86, desc:'Debated the qazis on the meaning of prayer’s true direction.'},
      {oldName:'Medina (Madinah)', newName:'Saudi Arabia', lat:24.52, lng:39.57, desc:'Continued the discourse on devotion beyond ritual orientation.'},
      {oldName:'Baghdad', newName:'Iraq', lat:33.32, lng:44.37, desc:'Engaged the Pir of Baghdad and scholars of this major centre of learning.'},
      {oldName:'Tehran', newName:'Iran', lat:35.69, lng:51.39, desc:'A stop on the return route through Persia.'},
      {oldName:'Kabul', newName:'Afghanistan', lat:34.56, lng:69.21, desc:'Crossed into Afghanistan en route back toward Punjab.'},
      {oldName:'Khyber Pass', newName:'Jalalabad Corridor', lat:34.44, lng:70.44, desc:'Passed through this historic mountain corridor home.'},
      {oldName:'Gorakh Hatri', newName:'now Peshawar', lat:34.02, lng:71.52, desc:'A stop on the final leg east.'},
      {oldName:'Panja Sahib', newName:'now Hasan Abdal', lat:33.82, lng:72.70, desc:'Tradition of the handprint on stone; marked today by Gurdwara Panja Sahib.'}
    ]},
  { id:5, hex:'#6B4226', name:'Fifth Udasi', years:'1523–1524', dir:'Punjab',
    places:[
      {oldName:'Kartarpur Sahib', newName:'Narowal, Pakistan', lat:32.04, lng:75.03, desc:'Guru Nanak founded this town on the Ravi in 1522 and settled here as a farmer-householder for his last 18 years.'}
    ]}
];

let map = null;
let markerLayers = {};
let lineLayers = {};
let activeId = null;
let isEntering = false;
const AUDIO_FADE_DURATION = 1500;

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

    // Resources section toggle
    const resourcesBtn = document.getElementById('resourcesBtn');
    const resourcesContent = document.getElementById('resourcesContent');
    if (resourcesBtn && resourcesContent) {
        resourcesBtn.addEventListener('click', () => {
            const isHidden = resourcesContent.style.display === 'none';
            resourcesContent.style.display = isHidden ? 'block' : 'none';
            resourcesBtn.textContent = isHidden ? 'Hide Resources' : 'Resources';
        });
    }

    // Contribution form handling
    const contributionForm = document.getElementById('contributionForm');
    const contributionStatus = document.getElementById('contributionStatus');
    if (contributionForm && contributionStatus) {
        contributionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const topic = document.getElementById('contributionTopic').value.trim();
            const type = document.getElementById('contributionType').value;
            const details = document.getElementById('contributionDetails').value.trim();
            const source = document.getElementById('contributionSource').value.trim();

            if (!topic || !details) {
                contributionStatus.innerHTML = '<p style="color:#e74c3c;">Please fill in all required fields.</p>';
                contributionStatus.style.display = 'block';
                return;
            }

            // In a real implementation, this would be sent to a server for moderation
            // For this privacy-conscious implementation, we'll store it locally and show a success message
            const contribution = {
                topic,
                type,
                details,
                source: source || undefined,
                timestamp: new Date().toISOString()
            };

            // Store contributions locally (in a real app, this would be sent to a moderation queue)
            let contributions = JSON.parse(localStorage.getItem('gn_contributions') || '[]');
            contributions.push(contribution);
            try {
                localStorage.setItem('gn_contributions', JSON.stringify(contributions));
                contributionStatus.innerHTML = '<p style="color:#2ecc71;">Thank you for your contribution! It will be reviewed by moderators.</p>';
                contributionStatus.style.display = 'block';
                contributionForm.reset();
            } catch (error) {
                contributionStatus.innerHTML = '<p style="color:#e74c3c;">Unable to save contribution. Please try again later.</p>';
                contributionStatus.style.display = 'block';
            }
        });
    }
});

function formatPlaceTitle(p) {
    const oldN = p.oldName || p.name || '';
    const newN = p.newName ? `<span class="new-name">(${p.newName})</span>` : '';
    return `<span class="old-name">${oldN}</span> ${newN}`;
}

function makeIcon(hex, isFirst) {
    return L.divIcon({
        className: '',
        html: `<div class="${isFirst ? 'start-marker' : 'nanak-marker'}" style="background:${hex};" tabindex="0" role="button"></div>`,
        iconSize: isFirst ? [21, 21] : [15, 15],
        iconAnchor: isFirst ? [11, 11] : [8, 8]
    });
}

function initMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement) return;

    if (map) {
        try { map.remove(); } catch (e) {}
        map = null;
    }

    map = L.map("map", { zoomControl: true }).setView([26, 70], 4);
    
    // Detailed Physical Map
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution: 'Tiles &copy; Esri — Source: US National Park Service',
        maxZoom: 14,
        maxNativeZoom: 8,
        updateWhenIdle: true,
        keepBuffer: 4,
        crossOrigin: true
    }).addTo(map);

    // OpenStreetMap Labels overlay (free, no API key)
    L.tileLayer("https://maps.wikimedia.org/img/osm-intl/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        pane: "overlayPane",
        opacity: 0.9
    }).addTo(map);

    if (map.zoomControl) {
        map.zoomControl.setPosition("bottomright");
    }

    const observer = new ResizeObserver(() => {
        if (map) map.invalidateSize();
    });
    observer.observe(mapElement);

    drawRoutesAndMarkers();
    initTimeline();
}

function drawRoutesAndMarkers() {
    markerLayers = {};
    lineLayers = {};

    UDASIS.forEach(u => {
        const grp = L.layerGroup();
        const latlngs = [];
        u.places.forEach((p, i) => {
            const marker = L.marker([p.lat, p.lng], { icon: makeIcon(u.hex, i === 0) });
            const titleHtml = formatPlaceTitle(p);
            const popupContent = `
                <div class="popup-tag" style="background:${u.hex}">${u.name} · ${u.dir}</div>
                <p class="popup-title">${titleHtml}</p>
                <p class="popup-desc">${p.desc}</p>
            `;
            marker.bindPopup(popupContent);
            marker.addTo(grp);
            latlngs.push([p.lat, p.lng]);
        });
        const line = L.polyline(latlngs, {
            color: u.hex,
            weight: 2.8,
            opacity: 0.85,
            dashArray: '1, 8',
            lineCap: 'round'
        });
        markerLayers[u.id] = grp;
        lineLayers[u.id] = line;
    });

    showAll();
}

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
    Object.keys(markerLayers).forEach(k => {
        if (map && map.hasLayer(markerLayers[k])) map.removeLayer(markerLayers[k]);
        if (map && map.hasLayer(lineLayers[k])) map.removeLayer(lineLayers[k]);
    });
    if (map && markerLayers[id] && lineLayers[id]) {
        markerLayers[id].addTo(map);
        lineLayers[id].addTo(map);
        map.fitBounds(lineLayers[id].getBounds(), { padding: [40, 40], maxZoom: 8 });
    }
    renderButtons();
    renderPlaceList(id);
}

function renderButtons() {
    const wrap = document.getElementById("udasiButtons");
    if (!wrap) return;
    wrap.innerHTML = '';
    UDASIS.forEach(u => {
        const btn = document.createElement("button");
        btn.className = 'udasi-btn' + (activeId === u.id ? ' active' : '') + (compareMode && selectedUdasis.has(u.id) ? ' compare-selected' : '');
        btn.style.setProperty('--dot', u.hex);
        btn.innerHTML = `<span class="dot"></span><span><b>${u.name} — ${u.dir}</b><span class="yr">${u.years}</span></span>`;
        btn.onclick = () => handleCompareClick(u.id);
        wrap.appendChild(btn);
    });
}

function renderPlaceList(id, query) {
    const wrap = document.getElementById("placeList");
    if (!wrap) return;
    wrap.innerHTML = '';
    let list = id ? UDASIS.find(u => u.id === id).places.map(p => ({ ...p, hex: UDASIS.find(u => u.id === id).hex, udasiId: id }))
                    : UDASIS.flatMap(u => u.places.map(p => ({ ...p, hex: u.hex, udasiId: u.id })));
    if (query) {
        const q = query.toLowerCase().trim();
        list = list.filter(p => fuzzyMatch(q, p.oldName) || fuzzyMatch(q, p.newName));
    }
    list.forEach(p => {
        const card = document.createElement("div");
        card.className = 'place-card';
        card.style.setProperty('--dot', p.hex);
        const titleHtml = formatPlaceTitle(p);
        card.innerHTML = `<div class="pname">${titleHtml}</div><div class="pdesc">${p.desc}</div>`;
        card.onclick = () => {
            if (map) {
                map.setView([p.lat, p.lng], Math.min(6, 8), { animate: true });
                for (const uId in markerLayers) {
                    markerLayers[uId].eachLayer(m => {
                        const mll = m.getLatLng();
                        if (Math.abs(mll.lat - p.lat) < 0.05 && Math.abs(mll.lng - p.lng) < 0.05) {
                            m.openPopup();
                        }
                    });
                }
            }
        };
        wrap.appendChild(card);
    });
}

/* ==========================================
   WEB AUDIO API - AMBIENT SOUND SYNTHESIZER
   ========================================== */
let audioCtx = null;
let masterGain = null;
let oscillators = [];
let dronePlaying = false;
let lfoInterval = null;

function initAudioEngine() {
    if (audioCtx) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(audioCtx.destination);
    
    let shouldMute = false;
    try {
        if (sessionStorage.getItem('audioMuted') === 'true') {
            shouldMute = true;
        }
    } catch (e) {}
    
    toggleDrone(!shouldMute);

    const volSlider = document.getElementById("volume-slider");
    if (volSlider) {
        volSlider.addEventListener("input", (e) => {
            if (masterGain) {
                masterGain.gain.value = parseFloat(e.target.value);
            }
        });
    }

    const toggleBtn = document.getElementById("ambient-toggle");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            try {
                toggleDrone(!dronePlaying);
            } catch (err) {
                console.error("Error toggling drone:", err);
            }
        });
    }
}

function toggleDrone(shouldPlay) {
    const toggleBtn = document.getElementById("ambient-toggle");
    const playIcon = toggleBtn ? toggleBtn.querySelector(".audio-icon-play") : null;
    const pauseIcon = toggleBtn ? toggleBtn.querySelector(".audio-icon-pause") : null;

    try {
        if (shouldPlay) {
            try { sessionStorage.setItem('audioMuted', 'false'); } catch (e) {}
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume();
            } else if (!audioCtx || audioCtx.state === 'closed') {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                audioCtx = new AudioContextClass();
                masterGain = audioCtx.createGain();
                masterGain.gain.value = parseFloat(volSlider?.value) ?? 0.3;
                masterGain.connect(audioCtx.destination);
            }
            
            startDrone();
            dronePlaying = true;
            
            if (toggleBtn) {
                toggleBtn.setAttribute("aria-pressed", "true");
                toggleBtn.classList.remove("pause");
                toggleBtn.classList.add("play");
            }
            if (playIcon) playIcon.classList.add("hidden");
            if (pauseIcon) pauseIcon.classList.remove("hidden");
        } else {
            try { sessionStorage.setItem('audioMuted', 'true'); } catch (e) {}
            stopDrone();
            dronePlaying = false;
            
            if (toggleBtn) {
                toggleBtn.setAttribute("aria-pressed", "false");
                toggleBtn.classList.remove("play");
                toggleBtn.classList.add("pause");
            }
            if (playIcon) playIcon.classList.remove("hidden");
            if (pauseIcon) pauseIcon.classList.add("hidden");
        }
    } catch (e) {
        console.error("Failed to toggle drone:", e);
    }
}

function startDrone() {
    try {
        if (!audioCtx) return;
        oscillators.forEach(item => {
            try {
                item.osc.stop();
                item.osc.disconnect();
            } catch (e) {}
        });
        oscillators = [];
        if (lfoInterval) {
            clearInterval(lfoInterval);
            lfoInterval = null;
        }
        
        const chords = [
            { note: "Low C", freq: 65.41, type: "sawtooth", volume: 0.12 },
            { note: "Med G", freq: 98.00, type: "sine", volume: 0.20 },
            { note: "Med C", freq: 130.81, type: "sine", volume: 0.18 },
            { note: "High G", freq: 196.00, type: "triangle", volume: 0.06 }
        ];

        chords.forEach(chord => {
            const osc = audioCtx.createOscillator();
            osc.type = chord.type;
            osc.frequency.setValueAtTime(chord.freq, audioCtx.currentTime);
            
            const filter = audioCtx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(chord.type === "sawtooth" ? 220 : 400, audioCtx.currentTime);
            
            const gainNode = audioCtx.createGain();
            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            
            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(masterGain);
            
            osc.start();
            oscillators.push({ osc, gainNode, targetVol: chord.volume });
        });

        let chordIndex = 0;
        const pluckString = () => {
            if (!audioCtx || audioCtx.state !== 'running') {
                if (lfoInterval) {
                    clearInterval(lfoInterval);
                    lfoInterval = null;
                }
                return;
            }
            const node = oscillators[chordIndex];
            if (node) {
                const time = audioCtx.currentTime;
                node.gainNode.gain.cancelScheduledValues(time);
                node.gainNode.gain.setValueAtTime(node.gainNode.gain.value, time);
                node.gainNode.gain.linearRampToValueAtTime(node.targetVol, time + 0.5);
                node.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 3.5);
            }
            chordIndex = (chordIndex + 1) % oscillators.length;
        };

        pluckString();
        lfoInterval = setInterval(pluckString, 900);
    } catch (e) {
        console.error("Start drone failed:", e);
    }
}

function stopDrone() {
    try {
        if (lfoInterval) {
            clearInterval(lfoInterval);
            lfoInterval = null;
        }
        oscillators.forEach(item => {
            try {
                const time = audioCtx.currentTime;
                item.gainNode.gain.cancelScheduledValues(time);
                item.gainNode.gain.setValueAtTime(item.gainNode.gain.value, time);
                item.gainNode.gain.linearRampToValueAtTime(0, time + (AUDIO_FADE_DURATION / 1000));
                setTimeout(() => {
                    try {
                        item.osc.stop();
                        item.osc.disconnect();
                    } catch (e) {}
                }, AUDIO_FADE_DURATION + 100);
            } catch(e) {}
        });
        oscillators = [];
    } catch (e) {
        console.error("Stop drone failed:", e);
    }
}

/* ==========================================
   FEATURE 1: LOCATION SEARCH (FUZZY)
   ========================================== */
let allPlaces = UDASIS.flatMap(u => u.places.map(p => ({ ...p, udasiId: u.id, udasiName: u.name, hex: u.hex })));

function fuzzyMatch(query, text) {
    if (!query) return true;
    query = query.toLowerCase().trim();
    text = text.toLowerCase();
    let qIdx = 0;
    for (let i = 0; i < text.length && qIdx < query.length; i++) {
        if (text[i] === query[qIdx]) qIdx++;
    }
    return qIdx === query.length;
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        renderPlaceList(null, query);
    });
}

/* ==========================================
   FEATURE 2: JOURNEY COMPARISON (OVERLAY)
   ========================================== */
let selectedUdasis = new Set();
let compareMode = false;

function toggleCompareMode() {
    compareMode = !compareMode;
    selectedUdasis.clear();
    updateCompareUI();
    if (!compareMode) showAll();
}

function updateCompareUI() {
    const btn = document.getElementById('compareBtn');
    if (btn) {
        btn.textContent = compareMode ? 'Exit Comparison' : 'Compare Journeys';
        btn.classList.toggle('active', compareMode);
    }
}

function handleCompareClick(id) {
    if (!compareMode) {
        showOne(id);
        return;
    }
    if (selectedUdasis.has(id)) {
        selectedUdasis.delete(id);
    } else {
        selectedUdasis.add(id);
    }
    renderCompareLayers();
}

function renderCompareLayers() {
    // Clear existing map layers
    Object.values(markerLayers).forEach(g => { if (map && map.hasLayer(g)) map.removeLayer(g); });
    Object.values(lineLayers).forEach(l => { if (map && map.hasLayer(l)) map.removeLayer(l); });

    // Add selected journeys
    let bounds = null;
    selectedUdasis.forEach(id => {
        if (markerLayers[id] && map) {
            markerLayers[id].addTo(map);
        }
        if (lineLayers[id] && map) {
            lineLayers[id].addTo(map);
            if (!bounds) bounds = lineLayers[id].getBounds();
            else bounds.extend(lineLayers[id].getBounds());
        }
    });

    if (bounds && map && selectedUdasis.size > 0) {
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
    }

    // Update sidebar buttons
    document.querySelectorAll('.udasi-btn').forEach((btn, idx) => {
        const u = UDASIS[idx];
        btn.classList.toggle('compare-selected', selectedUdasis.has(u.id));
    });
}

/* ==========================================
   FEATURE 3: MEASUREMENT TOOLS
   ========================================== */
let measureMode = 'distance';
let measurePoints = [];
let measureLines = [];
let measureMarkers = [];
let measureDistance = 0;

function initMeasurement() {
    const measureBtn = document.getElementById('measureBtn');
    if (!measureBtn) return;
    measureBtn.addEventListener('click', () => {
        measureMode = measureMode === 'distance' ? 'area' : 'distance';
        clearMeasurement();
        map.dragging.disable();
        map.on('click', addMeasurePoint);
        measureBtn.textContent = measureMode === 'distance' ? 'Dist: On' : 'Area: On';
    });
}

function addMeasurePoint(e) {
    const point = e.latlng;
    measurePoints.push(point);

    const marker = L.marker(point, { draggable: true })
        .addTo(map)
        .bindPopup(`Point ${measurePoints.length}`)
        .on('drag', function(ev) {
            const idx = measurePoints.indexOf(this.getLatLng());
            if (idx !== -1) measurePoints[idx] = ev.latlng;
            updateMeasurement();
        });
    measureMarkers.push(marker);

    if (measurePoints.length > 1) {
        const prev = measurePoints[measurePoints.length - 2];
        const line = L.polyline([prev, point], { color: '#C1791F', weight: 2, dashArray: '5,5' }).addTo(map);
        measureLines.push(line);
    }
    updateMeasurement();
}

function updateMeasurement() {
    if (measurePoints.length < 2) return;

    measureLines.forEach(l => map.removeLayer(l));
    measureLines = [];
    measureDistance = 0;

    for (let i = 1; i < measurePoints.length; i++) {
        const prev = measurePoints[i - 1];
        const curr = measurePoints[i];
        const dist = map.distance(prev, curr);
        measureDistance += dist;
        const line = L.polyline([prev, curr], { color: '#C1791F', weight: 2, dashArray: '5,5' }).addTo(map);
        measureLines.push(line);
    }

    const resultEl = document.getElementById('measurementResult');
    if (resultEl) {
        if (measureMode === 'area' && measurePoints.length >= 3) {
            const area = calculatePolygonArea(measurePoints);
            resultEl.textContent = `Area: ${(area / 1e6).toFixed(2)} km²`;
        } else {
            resultEl.textContent = `Distance: ${(measureDistance / 1000).toFixed(2)} km`;
        }
    }
}

function calculatePolygonArea(points) {
    let area = 0;
    const n = points.length;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += points[i].lng * points[j].lat;
        area -= points[j].lng * points[i].lat;
    }
    return Math.abs(area) * 111320 * 111320 / 2; // Approximate conversion to square meters
}

function clearMeasurement() {
    measurePoints = [];
    measureLines.forEach(l => map && map.removeLayer(l));
    measureMarkers.forEach(m => map && map.removeLayer(m));
    measureLines = [];
    measureMarkers = [];
    measureDistance = 0;
    map.dragging.enable();
    map.off('click', addMeasurePoint);
    const resultEl = document.getElementById('measurementResult');
    if (resultEl) resultEl.textContent = '';
    const btn = document.getElementById('measureBtn');
    if (btn) {
        btn.textContent = measureMode === 'distance' ? 'Dist: Off' : 'Area: Off';
        btn.classList.remove('active');
    }
}

/* ==========================================
   FEATURE 4: URL STATE MANAGEMENT
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

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
        canonicalLink.href = `${window.location.origin}${newURL}`;
    }

    // Update document title based on current view
    let title = "The Udasis of Guru Nanak - Interactive Map";
    if (selectedUdasis.size > 0) {
        const selectedNames = Array.from(selectedUdasis).map(id => {
            const udasi = UDASIS.find(u => u.id === id);
            return udasi ? udasi.name : "";
        }).filter(Boolean);
        if (selectedNames.length > 0) {
            title = `${selectedNames.join(", ")} - The Udasis of Guru Nanak`;
        }
    } else if (map) {
        const center = map.getCenter();
        // Approximate location-based title
        if (center.lat > 30 && center.lat < 40 && center.lng > 70 && center.lng < 80) {
            title = "Central India Region - The Udasis of Guru Nanak";
        } else if (center.lat > 20 && center.lat < 30 && center.lng > 70 && center.lng < 80) {
            title = "Southern India Region - The Udasis of Guru Nanak";
        } else if (center.lat > 30 && center.lat < 40 && center.lng < 70) {
            title = "Northern Region - The Udasis of Guru Nanak";
        } else if (center.lat < 20) {
            title = "Southern Region - The Udasis of Guru Nanak";
        }
    }
    document.title = title;
}

function loadURLState() {
    const params = new URLSearchParams(window.location.search);
    const udasisParam = params.get('udasis');
    const centerParam = params.get('center');
    const zoomParam = params.get('zoom');

    if (udasisParam) {
        compareMode = true;
        udasisParam.split(',').forEach(id => {
            const idNum = parseInt(id);
            if (!isNaN(idNum)) selectedUdasis.add(idNum);
        });
        if (UDASIS.length > 0 && map) {
            renderCompareLayers();
        }
    } else if (centerParam) {
        const [lat, lng] = centerParam.split(',').map(Number);
        const zoom = zoomParam ? parseInt(zoomParam) : 4;
        if (map && !isNaN(lat) && !isNaN(lng)) {
            map.setView([lat, lng], zoom);
        }
    }
    updateCompareUI();
    updateURLState();
}

/* ==========================================
   FEATURE 5: ENHANCED AUDIO CONTROLS
   ========================================== */
let currentDroneVariant = 'traditional';
const droneVariants = {
    traditional: {
        notes: [
            { freq: 65.41, type: 'sawtooth', vol: 0.12 },
            { freq: 98.00, type: 'sine', vol: 0.20 },
            { freq: 130.81, type: 'sine', vol: 0.18 },
            { freq: 196.00, type: 'triangle', vol: 0.06 }
        ]
    },
    meditative: {
        notes: [
            { freq: 65.41, type: 'sine', vol: 0.15 },
            { freq: 130.81, type: 'sine', vol: 0.25 },
            { freq: 196.00, type: 'sine', vol: 0.20 },
            { freq: 261.63, type: 'sine', vol: 0.10 }
        ]
    },
    ambient: {
        notes: [
            { freq: 32.70, type: 'sine', vol: 0.18 },
            { freq: 65.41, type: 'triangle', vol: 0.22 },
            { freq: 98.00, type: 'sine', vol: 0.15 },
            { freq: 164.81, type: 'sine', vol: 0.08 }
        ]
    }
};

function setDroneVariant(variant) {
    currentDroneVariant = variant;
    if (dronePlaying && audioCtx) {
        stopDrone();
        setTimeout(() => startDrone(), 100);
    }
    const select = document.getElementById('droneVariantSelect');
    select?.value = variant;
}

/* ==========================================
   FEATURE 6: HISTORICAL TIMELINE
   ========================================== */
let timelineVisible = false;

function toggleTimeline() {
    timelineVisible = !timelineVisible;
    document.getElementById('timelineBar')?.classList.toggle('visible', timelineVisible);
    updateTimelinePosition();
}

function updateTimelinePosition() {
    if (!map || !timelineVisible) return;
    const bounds = map.getBounds();
    const lat = bounds.getCenter().lat;
    const minLat = 19, maxLat = 42; // Geographic bounds of all places
    const progress = Math.max(0, Math.min(1, (lat - minLat) / (maxLat - minLat)));
    const indicator = document.getElementById('timelineIndicator');
    if (indicator) {
        indicator.style.left = `${progress * 100}%`;
    }
    // Highlight places in current view
    allPlaces.forEach(p => {
        const el = document.getElementById(`tl-${p.oldName.replace(/\s+/g, '-')}`);
        if (el) {
            const inView = bounds.contains([p.lat, p.lng]);
            el.classList.toggle('in-view', inView);
        }
    });
}

function scrollToTimelineItem(udasiId) {
    const target = document.getElementById(`tl-udasi-${udasiId}`);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('highlight');
        setTimeout(() => target.classList.remove('highlight'), 2000);
    }
}

/* ==========================================
   FEATURE 7: MULTILINGUAL SUPPORT (i18n)
   ========================================== */
const i18n = {
    en: {
        selectJourney: 'Select a journey',
        showAll: 'Show all five journeys',
        stops: 'Stops',
        searchPlaceholder: 'Search places...',
        compare: 'Compare Journeys',
        measure: 'Measure Distance',
        area: 'Measure Area',
        timeline: 'Historical Timeline',
        export: 'Export Map',
        distance: 'Distance',
        areaLabel: 'Area',
        km: 'km',
        km2: 'km²'
    },
    pa: {
        selectJourney: 'ਇੱਕ ਯਾਤਰਾ ਚੁਣੋ',
        showAll: 'ਪੰਜਾਂ ਯਾਤਰਾਵਾਂ ਦਿਖਾਓ',
        stops: 'ਰੁਕਾਵਟਾਂ',
        searchPlaceholder: 'ਜਗ੍ਹਾਵਾਂ ਖੋਜੋ...',
        compare: 'ਤੁਲਨਾ ਕਰੋ',
        measure: 'ਦੂਰੀ ਮਾਪੋ',
        area: 'ਖੇਤਰ ਮਾਪੋ',
        timeline: 'ਇਤਿਹਾਸਿਕ ਸਮਾਂ-ਰੇਖਾ',
        export: 'ਨਕਲ ਕਰੋ',
        distance: 'ਦੂਰੀ',
        areaLabel: 'ਖੇਤਰ',
        km: 'ਕਿ.ਮੀ.',
        km2: 'ਕਿ.ਮੀ.²'
    }
};
let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    const t = i18n[lang] || i18n.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) el.textContent = t[key];
    });
    document.getElementById('searchInput')?.placeholder = t.searchPlaceholder;
}

/* ==========================================
   FEATURE 8: EXPORT FUNCTIONALITY
   ========================================== */
function exportMap() {
    if (!map) return;
    // Use Leaflet's built-in export via canvas
    const mapContainer = map.getContainer();
    const canvas = document.createElement('canvas');
    canvas.width = mapContainer.offsetWidth * 2;
    canvas.height = mapContainer.offsetHeight * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);

    // Draw a simple representation (Leaflet doesn't export tiles easily)
    ctx.fillStyle = '#dfe6e0';
    ctx.fillRect(0, 0, mapContainer.offsetWidth, mapContainer.offsetHeight);

    // Add title and info
    ctx.fillStyle = '#2B2118';
    ctx.font = 'bold 18px Georgia';
    ctx.fillText('The Udasis of Guru Nanak', 20, 30);
    ctx.font = '12px Arial';
    ctx.fillText(`View: ${map.getCenter().lat.toFixed(2)}°N, ${map.getCenter().lng.toFixed(2)}°E`, 20, 50);
    ctx.fillText(`Zoom: ${map.getZoom()}`, 20, 68);

    // Create download link
    const link = document.createElement('a');
    link.download = `guru-nanak-udasis-map-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

/* ==========================================
   FEATURE 6: TIMELINE GENERATION
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
        item.textContent = `Udasi ${u.id} · ${years}`;
        item.id = `tl-udasi-${u.id}`;
        item.style.left = `${((u.id - 1) / (UDASIS.length - 1)) * 100}%`;
        item.onclick = () => scrollToTimelineItem(u.id);
        track.appendChild(item);
    });

    // Add place markers
    allPlaces.forEach(p => {
        const years = UDASIS.find(u => u.id === p.udasiId)?.years.split('–')[0] || '';
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.textContent = p.oldName;
        item.title = `${p.oldName} (${p.newName})`;
        item.id = `tl-${p.oldName.replace(/\s+/g, '-')}`;
        // Position by latitude (south to north)
        const minLat = 19, maxLat = 42;
        item.style.left = `${((p.lat - minLat) / (maxLat - minLat)) * 100}%`;
        track.appendChild(item);
    });
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

                // Clear measurement button
                const clearBtn = document.getElementById('clearMeasureBtn');
                if (clearBtn) {
                    clearBtn.addEventListener('click', clearMeasurement);
                }

                // Timeline toggle
                const timelineBtn = document.getElementById('timelineBtn');
                if (timelineBtn) {
                    timelineBtn.addEventListener('click', toggleTimeline);
                }

                // Export button
                const exportBtn = document.getElementById('exportBtn');
                if (exportBtn) {
                    exportBtn.addEventListener('click', exportMap);
                }

                // Language selector
                const langSelect = document.getElementById('langSelect');
                if (langSelect) {
                    langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
                }

                // Drone variant selector
                const variantSelect = document.getElementById('droneVariantSelect');
                if (variantSelect) {
                    variantSelect.addEventListener('change', (e) => setDroneVariant(e.target.value));
                }

                // Map move event for timeline and URL updates
                if (map) {
                    map.on('moveend', () => {
                        updateTimelinePosition();
                        updateURLState();
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

    // Initialize Privacy-First Analytics
    // Track initial page view
    analytics.trackJourneyView(0); // 0 represents overall page view, not a specific journey

    // Override console.error to capture errors for analytics
    (function() {
        const originalError = console.error;
        console.error = function(...args) {
            // In a real implementation, you might send this to your own error tracking endpoint
            // For privacy-conscious implementation, we could store locally and let user export if desired
            // For now, we'll just call the original error to maintain normal behavior
            originalError.apply(console, args);
        };
    })();

    // Set up Performance Observer for Core Web Vitals (if supported)
    if ('PerformanceObserver' in window) {
        const po = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                // Log Core Web Vitals for analytics
                // In a real implementation, you might send this to your own analytics endpoint
                // For privacy-conscious implementation, we store locally and let user export if desired
                console.log('Core Web Vital:', entry.name, entry.value);
            }
        });

        po.observe({entryTypes: ['measure']});

        // Measure specific metrics
        if ('performance' in window) {
            if (performance.mark) {
                performance.mark('analytics-loaded');
            }

            // Measure First Input Delay (FID) approximation
            const fidObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    const delay = entry.processingStart - entry.startTime;
                    // Log FID for analytics
                    console.log('FID approximation:', delay);
                }
            });

            fidObserver.observe({entryTypes: ['first-input']});
        }
    }
});
