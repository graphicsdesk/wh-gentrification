import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhcmsyMDIwIiwiYSI6ImNreWYxaHJmaTA4aXkyb25hNm5hOW03d3EifQ.B4hdg3BWPvgkXvd802O2Ng';
const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/apark2020/ckzt94vps001415lcgypsxau0', // replace this with your style URL
    center: [-73.956,40.8108],
    zoom: 13.4
});
var clickedpov = '2010pov';
const toggleableLayerIdsPOV = ['2010pov','2015pov','2019pov'];
// After the last frame rendered before the map enters an "idle" state.
map.on('idle', () => {


    // Enumerate ids of the layers.
    //const toggleableLayerIdsRINC = ['2010', '2015', '2019'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIdsPOV) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

        // Create a linkPOV.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        if(id=='2010pov'){
            link.textContent = '2010';
        }
        else if(id=='2015pov'){
            link.textContent = '2015';
        }
        else if(id=='2019pov'){
            link.textContent = '2019';
        }
        link.className = '';
        if(id==toggleableLayerIdsPOV[0]){
            link.className='active';
        }
        // Show or hide layer when the toggle is clickedpov.
        link.onclick = function (e) {
            const clickedLayer = this.id;
            clickedpov = clickedLayer;
            e.preventDefault();
            e.stopPropagation();

            const visibility = map.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            for (var j = 0; j < toggleableLayerIdsPOV.length; j++) {
                if (clickedLayer === toggleableLayerIdsPOV[j]) {
                    if (map.getLayoutProperty(clickedLayer, 'visibility') === 'visible') {
                        layers.children[j].className = '';
                        clickedpov='none';
                        map.setLayoutProperty(toggleableLayerIdsPOV[j], 'visibility', 'none');
                    }
                    else {
                        layers.children[j].className = 'active';
                        map.setLayoutProperty(toggleableLayerIdsPOV[j], 'visibility', 'visible');
                    }
                }
                else {
                    layers.children[j].className = '';
                    map.setLayoutProperty(toggleableLayerIdsPOV[j], 'visibility', 'none');
                }
            }
        };

        const layers = document.getElementById('menu');
        layers.appendChild(link);
    }
});

    const layers = [
        '0%-10%',
        '10%-20%',
        '20%-30%',
        '30%-40%',
        '40%+'
    ];
    const colors = [
        '#ffffb2',
        '#fecc5c',
        '#fd8d3c',
        '#f03b20',
        '#b60707'
    ];

    const legend = document.getElementById('legend');

    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        if(i==0){
            item.classList.add( "first" );
        }
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    });
    
    var x ='';
    map.on('load', function () {
    
        map.addSource('tracts', {
            "type": "vector",
            "url": "mapbox://apark2020.845x1exg"
        });
        map.addLayer({
            "id": "numbers",
            "type": "fill",
            "source": "tracts",
            "source-layer": "feb17_new_tracts_geojson-7h0u9p",
            'paint': {
                'fill-color': 'transparent',
                'fill-opacity': 1.0
            }
        })
        map.on('click', 'numbers', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
    
            // Single out the first found feature.
            var feature = e.features[0];
    
            // Display a popup with the name of the county
            if (clickedpov === toggleableLayerIdsPOV[0]) {
                x = feature.properties.pov_2010;
            }
            else if (clickedpov === toggleableLayerIdsPOV[1]) {
                x = feature.properties.pov_2015;
            }
            else if (clickedpov === toggleableLayerIdsPOV[2]) {
                x = feature.properties.pov_2019;
            }
            if((clickedpov != toggleableLayerIdsPOV[0])&&(clickedpov != toggleableLayerIdsPOV[1])&&(clickedpov != toggleableLayerIdsPOV[2])){
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
                .addTo(map);
            }
        });
    
        map.on('mouseleave', 'numbers', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
});