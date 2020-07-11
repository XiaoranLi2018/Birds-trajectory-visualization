const map = new mapboxgl.Map({
    container: 'map',
    style: carto.basemaps.darkmatter,
    center: [104.1954, 35.8617],
    zoom: 1,
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');
map.addControl(new mapboxgl.FullscreenControl(), 'top-left');

carto.setDefaultAuth({
    username: 'li000940',
    apiKey: '2a1055314ae9574811119d61197b92d7a66fc516'
});

// Add source
const source = new carto.source.Dataset('ornitela_simplify1000');

// Define animation viz with variables
const viz = new carto.Viz(`
    @uuid: $uuid
    @velocity: $velocity
    @duration: 15
    @animation: animation($date, @duration, fade(1, 4))
    width: ramp(globalQuantiles($velocity, 5), [0, 10]) 
    filter: @animation
    color: ramp($uuid, [midnightblue, gold])
    strokeWidth: 0
    `);

// Create layer
const layer = new carto.Layer('layer', source, viz);

layer.addTo(map);

// Get HTML elements
const $playbutton = document.getElementById('js-play-button');
const $pausebutton = document.getElementById('js-pause-button');
const $durationRange = document.getElementById('js-duration-range');
const $timeRange = document.getElementById('js-time-range');
const $spanDuration = document.getElementById('js-duration-span');
const $currentTime = document.getElementById('js-current-time');

// Save initial time range value
let last = $timeRange.value;

// Listen to interaction events
$durationRange.addEventListener('change', () => {
    const duration = parseInt($durationRange.value, 10);
    // Update animation duration
    viz.variables.duration = $spanDuration.innerHTML = duration;
});

$playbutton.addEventListener('click', () => {
    // Play the animation
    viz.variables.animation.play()
});

$pausebutton.addEventListener('click', () => {
    // Pause the animation
    viz.variables.animation.pause();
});

$timeRange.addEventListener('change', () => {
    // Update animation progress
    viz.variables.animation.setProgressPct($timeRange.value);
    last = $timeRange.value;
});

// Update time slider
layer.on('updated', () => {
    if ($timeRange.value == last) {
        $timeRange.value = viz.variables.animation.getProgressPct();
        last = $timeRange.value;
    }
    $currentTime.innerText = viz.variables.animation.getProgressValue().toISOString();
});

layer.on('loaded', hideLoader);

function hideLoader() {
    document.getElementById('loader').style.opacity = '0';
}

// Define interactivity

// Define pop-up
const popup = new mapboxgl.Popup({
    //closeButton: false,
    //closeOnClick: false
});
const interactivity = new carto.Interactivity(layer);
const delay = 50;
let clickedFeatureId = null;

// Change style on 'featureEnter'
interactivity.on('featureEnter', event => {
    event.features.forEach(feature => {
        if (feature.id !== clickedFeatureId) {
            feature.color.blendTo('opacity(DeepPink, 0.5)', delay)
            feature.strokeWidth.blendTo('4', delay);
            feature.strokeColor.blendTo('opacity(DeepPink, 0.8)', delay);
        }
    });
});

interactivity.on('featureLeave', event => {
    event.features.forEach(feature => {
        if (feature.id !== clickedFeatureId) {
            feature.color.reset(delay);
            feature.strokeWidth.reset(delay);
            feature.strokeColor.reset(delay);
        }
    });
});

interactivity.on('featureClick', updatePopup);

function updatePopup(event) {
if (event.features.length > 0) {
const vars = event.features[0].variables;
popup.setHTML(`
    <div>
        <h3 class ="h3">${vars.uuid.value}</h3>
        <p class="description open-sans">velocity: ${vars.velocity.value.toFixed(3)}</h3>
    </div>
`);
popup.setLngLat([event.coordinates.lng, event.coordinates.lat]);
if (!popup.isOpen()) {
    popup.addTo(map);
}
} else {
popup.remove();
}
}