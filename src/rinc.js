import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhcmsyMDIwIiwiYSI6ImNreWYxaHJmaTA4aXkyb25hNm5hOW03d3EifQ.B4hdg3BWPvgkXvd802O2Ng';
const maprinc = new mapboxgl.Map({
    container: 'maprinc', // container id
    style: 'mapbox://styles/apark2020/ckzszc3uw000x14p9jrkt1deo', // replace this with your style URL
    center: [-73.956,40.8108],
    zoom: 13.4
});
var clickedrinc = '2010rinc';
const toggleableLayerIdsRINC = ['2010rinc','2015rinc','2019rinc'];
// After the last frame rendered before the map enters an "idle" state.
maprinc.on('idle', () => {


    // Enumerate ids of the layers.
    //const toggleableLayerIdsRINC = ['2010', '2015', '2019'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIdsRINC) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

        // Create a linkRINC.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        if(id=='2010rinc'){
            link.textContent = '2010';
        }
        else if(id=='2015rinc'){
            link.textContent = '2015';
        }
        else if(id=='2019rinc'){
            link.textContent = '2019';
        }
        link.className = '';
        if(id==toggleableLayerIdsRINC[0]){
            link.className='active';
        }
        // Show or hide layer when the toggle is clickedrinc.
        link.onclick = function (e) {
            const clickedLayer = this.id;
            clickedrinc = clickedLayer;
            e.preventDefault();
            e.stopPropagation();

            const visibility = maprinc.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            for (var j = 0; j < toggleableLayerIdsRINC.length; j++) {
                if (clickedLayer === toggleableLayerIdsRINC[j]) {
                    if (maprinc.getLayoutProperty(clickedLayer, 'visibility') === 'visible') {
                        layers.children[j].className = '';
                        clickedrinc='none';
                        maprinc.setLayoutProperty(toggleableLayerIdsRINC[j], 'visibility', 'none');
                    }
                    else {
                        layers.children[j].className = 'active';
                        maprinc.setLayoutProperty(toggleableLayerIdsRINC[j], 'visibility', 'visible');
                    }
                }
                else {
                    layers.children[j].className = '';
                    maprinc.setLayoutProperty(toggleableLayerIdsRINC[j], 'visibility', 'none');
                }
            }
        };

        const layers = document.getElementById('menurinc');
        layers.appendChild(link);
    }
});

    const layers = [
        '20%-30%',
        '30%-40%',
        '40%-50%',
        '50%-60%',
        '60%+'
    ];
    const colors = [
        '#ffffcc',
        '#c2e699',
        '#78c679',
        '#31a354',
        '#006837'
    ];

    const legendrinc = document.getElementById('legendrinc');

    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        if(i==0){
            item.classList.add( "first" );
        }
        const key = document.createElement('span');
        key.className = 'legendrinc-key';
        key.style.backgroundColor = color;

        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legendrinc.appendChild(item);
    });
    var x ='';
    maprinc.on('load', function () {
        maprinc.addSource('tracts', {
            "type": "vector",
            "url": "mapbox://apark2020.5t3c6xuy"
        });
        maprinc.addLayer({
            "id": "numbers",
            "type": "fill",
            "source": "tracts",
            "source-layer": "feb17_tracts_geojson-9hdes3",
            'paint': {
                'fill-color': 'transparent',
                'fill-opacity': 1.0
             }
        })
        maprinc.on('click', 'numbers', function (e) {
            // Change the cursor style as a UI indicator.
            maprinc.getCanvas().style.cursor = 'pointer';
    
            // Single out the first found feature.
            var feature = e.features[0];
    
            // Display a popup with the name of the county
            if(clickedrinc === toggleableLayerIdsRINC[0]){
                x=feature.properties.rinc_2010;
            }
            else if(clickedrinc === toggleableLayerIdsRINC[1]){
                x=feature.properties.rinc_2015;
            }
            else if(clickedrinc === toggleableLayerIdsRINC[2]){
                x=feature.properties.rinc_2019;
            }
            if((clickedrinc != toggleableLayerIdsRINC[0])&&(clickedrinc != toggleableLayerIdsRINC[1])&&(clickedrinc != toggleableLayerIdsRINC[2])){
                popup.remove();
            }
            else{
                const popup = new mapboxgl.Popup();
                popup.setLngLat(e.lngLat)
                .setHTML(
                    `
                    <h3 style="font-size:14px;font-family:"Roboto";padding:0px; margin-bottom:0px;">${feature.properties.NAMELSAD}</h3>
                    <p style="font-size:18px;font-family:"Roboto";margin-top:2px">${x}%</p>
                    </body>`
                )
                .addTo(maprinc);
            }
        });
    
        maprinc.on('mouseleave', 'numbers', function () {
            maprinc.getCanvas().style.cursor = '';
            popup.remove();
        });
});
