import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhcmsyMDIwIiwiYSI6ImNreWYxaHJmaTA4aXkyb25hNm5hOW03d3EifQ.B4hdg3BWPvgkXvd802O2Ng';
const mapnrent = new mapboxgl.Map({
    container: 'mapnrent', // container id
    style: 'mapbox://styles/apark2020/ckzszc1sm002914tney3o0nm5', // replace this with your style URL
    center: [-73.955, 40.8105],
    zoom: 13.4
});
var clickednrent = '2010rent';
const toggleableLayerIdsNRENT = ['2010rent', '2015rent', '2019rent'];
// After the last frame rendered before the map enters an "idle" state.
mapnrent.on('idle', () => {


    // Enumerate ids of the layers.
    //const toggleableLayerIdsRINC = ['2010', '2015', '2019'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIdsNRENT) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

        // Create a linkNRENT.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        if (id == '2010rent') {
            link.textContent = '2010';
        }
        else if (id == '2015rent') {
            link.textContent = '2015';
        }
        else if (id == '2019rent') {
            link.textContent = '2019';
        }
        link.className = '';
        if (id == toggleableLayerIdsNRENT[0]) {
            link.className = 'active';
        }
        // Show or hide layer when the toggle is clickednrent.
        link.onclick = function (e) {
            const clickedLayer = this.id;
            clickednrent = clickedLayer;
            e.preventDefault();
            e.stopPropagation();

            const visibility = mapnrent.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            for (var j = 0; j < toggleableLayerIdsNRENT.length; j++) {
                if (clickedLayer === toggleableLayerIdsNRENT[j]) {
                    if (mapnrent.getLayoutProperty(clickedLayer, 'visibility') === 'visible') {
                        layers.children[j].className = '';
                        clickednrent = 'none';
                        mapnrent.setLayoutProperty(toggleableLayerIdsNRENT[j], 'visibility', 'none');
                    }
                    else {
                        layers.children[j].className = 'active';
                        mapnrent.setLayoutProperty(toggleableLayerIdsNRENT[j], 'visibility', 'visible');
                    }
                }
                else {
                    layers.children[j].className = '';
                    mapnrent.setLayoutProperty(toggleableLayerIdsNRENT[j], 'visibility', 'none');
                }
            }
        };

        const layers = document.getElementById('menunrent');
        layers.appendChild(link);
    }
});
var xnrent = '';
mapnrent.on('load', function () {

    mapnrent.on('mousemove', (e) => {
        const tractnrent = mapnrent.queryRenderedFeatures(e.point, {
            layers: ['tracts']
        });
        // Change the cursor style as a UI indicator.
        mapnrent.getCanvas().style.cursor = 'pointer';

        // Single out the first found feature.
        // Display a popup with the name of the county
        if (clickednrent === toggleableLayerIdsNRENT[0]) {
            xnrent = tractnrent[0].properties.nrent2010;
        }
        else if (clickednrent === toggleableLayerIdsNRENT[1]) {
            xnrent = tractnrent[0].properties.nrent2015;
        }
        else if (clickednrent === toggleableLayerIdsNRENT[2]) {
            xnrent = tractnrent[0].properties.nrent2019;
        }
        //      if((clickedhsd != toggleableLayerIdsNRENT[0])&&(clickedhsd != toggleableLayerIdsNRENT[1])&&(clickedhsd != toggleableLayerIdsNRENT[2])){
        //        popup.remove();
        //  }
        document.getElementById('pdnrent').innerHTML = tractnrent.length
            ? `<h3 style="font-size:14px;font-family:"Roboto";padding:0px; margin-bottom:0px;">${tractnrent[0].properties.NAMELSAD}</h3>
        <p style="font-size:18px;font-family:"Roboto";margin-top:2px">$${xnrent}</p>`
            : `<p id=hover>Hover over a tract!</p>`;
    });
    mapnrent.on('mouseleave', 'tracts', function () {
        mapnrent.getCanvas().style.cursor = '';
        document.getElementById('pdnrent').innerHTML = `<p id=hover>Hover over a tract!</p>`;
    });
    const layers = [
        '<$500',
        '$500-$1000',
        '$1000-$1500',
        '$1500-$2000',
        '$2000-$2500',
        '$2500-$3000',
        '$3000+',
    ];
    const colors = [
        '#ffffcc',
        '#d9f0a3',
        '#addd8e',
        '#78c679',
        '#41ab5d',
        '#238443',
        '#005a32',
    ];

    const legendnrent = document.getElementById('legendnrent');

    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        if (i == 0) {
            item.classList.add("first");
        }
        const key = document.createElement('span');
        key.className = 'legendnrent-key';
        key.style.backgroundColor = color;

        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legendnrent.appendChild(item);
    });
});
