import mapboxgl from "mapbox-gl"

mapboxgl.accessToken = 'pk.eyJ1IjoiYXBhcmsyMDIwIiwiYSI6ImNreWYxaHJmaTA4aXkyb25hNm5hOW03d3EifQ.B4hdg3BWPvgkXvd802O2Ng';
const maphsd = new mapboxgl.Map({
    container: 'maphsd', // container id
    style: 'mapbox://styles/apark2020/ckzsxevmj000x15mu7bl0p01k', // replace this with your style URL
    center: [-73.955, 40.8127],
    zoom: 13.4
});
var clickedhsd = '2010hsd';
const toggleableLayerIdsHSD = ['2010hsd','2015hsd','2019hsd'];
// After the last frame rendered before the map enters an "idle" state.
maphsd.on('idle', () => {

    var layers = maphsd.getStyle().layers;

    var layerIds = layers.map(function (layer) {
        return layer.id;
    });

    console.log(layerIds);

    // Enumerate ids of the layers.
    //const toggleableLayerIdsRINC = ['2010', '2015', '2019'];

    // Set up the corresponding toggle button for each layer.
    for (const id of toggleableLayerIdsHSD) {
        // Skip layers that already have a button set up.
        if (document.getElementById(id)) {
            continue;
        }

        // Create a linkHSD.
        const link = document.createElement('a');
        link.id = id;
        link.href = '#';
        if(id=='2010hsd'){
            link.textContent = '2010';
        }
        else if(id=='2015hsd'){
            link.textContent = '2015';
        }
        else if(id=='2019hsd'){
            link.textContent = '2019';
        }
        link.className = '';
        if(id==toggleableLayerIdsHSD[0]){
            link.className='active';
        }
        // Show or hide layer when the toggle is clickedhsd.
        link.onclick = function (e) {
            const clickedLayer = this.id;
            clickedhsd = clickedLayer;
            e.preventDefault();
            e.stopPropagation();

            const visibility = maphsd.getLayoutProperty(
                clickedLayer,
                'visibility'
            );

            // Toggle layer visibility by changing the layout object's visibility property.
            for (var j = 0; j < toggleableLayerIdsHSD.length; j++) {
                if (clickedLayer === toggleableLayerIdsHSD[j]) {
                    if (maphsd.getLayoutProperty(clickedLayer, 'visibility') === 'visible') {
                        layers.children[j].className = '';
                        clickedhsd='none';
                        maphsd.setLayoutProperty(toggleableLayerIdsHSD[j], 'visibility', 'none');
                    }
                    else {
                        layers.children[j].className = 'active';
                        maphsd.setLayoutProperty(toggleableLayerIdsHSD[j], 'visibility', 'visible');
                    }
                }
                else {
                    layers.children[j].className = '';
                    maphsd.setLayoutProperty(toggleableLayerIdsHSD[j], 'visibility', 'none');
                }
            }
        };

        const layers = document.getElementById('menuhsd');
        layers.appendChild(link);
    }
});

var xhsd ='';
maphsd.on('load', function () {
   
    //maphsd.addSource('tracts', {
      //  "type": "vector",
        //"url": "mapbox://apark2020.5t3c6xuy"
    //});
    //maphsd.addLayer({
       //  "id": "numbers",
       // "type": "fill",
       // "source": "tracts",
       // "source-layer": "feb17_tracts_geojson-9hdes3",
       // 'paint': {
       //     'fill-color': 'transparent',
       //     'fill-opacity': 1.0
       //  }
    //})
    //const popup = new mapboxgl.Popup({
       // closeButton: false,
     //   closeOnClick: false
   // });
    maphsd.on('mousemove', (e) => {
            const tracthsd = maphsd.queryRenderedFeatures(e.point, {
                layers: ['tracts']
            });
            // Change the cursor style as a UI indicator.
            maphsd.getCanvas().style.cursor = 'pointer';

            // Single out the first found feature.
            // Display a popup with the name of the county
            if (clickedhsd === toggleableLayerIdsHSD[0]) {
                xhsd = tracthsd[0].properties.hsd_2010;
            }
            else if (clickedhsd === toggleableLayerIdsHSD[1]) {
                xhsd = tracthsd[0].properties.hsd_2015;
            }
            else if (clickedhsd === toggleableLayerIdsHSD[2]) {
                xhsd = tracthsd[0].properties.hsd_2019;
            }
            //      if((clickedhsd != toggleableLayerIdsHSD[0])&&(clickedhsd != toggleableLayerIdsHSD[1])&&(clickedhsd != toggleableLayerIdsHSD[2])){
            //        popup.remove();
            //  }
            document.getElementById('pdhsd').innerHTML = tracthsd.length
            ? `<h3 style="font-size:14px;font-family:"Roboto";padding:0px; margin-bottom:0px;">${tracthsd[0].properties.NAMELSAD}</h3>
            <p style="font-size:18px;font-family:"Roboto";margin-top:2px">${xhsd}%</p>`
            : `<p id=hover>Hover over a tract!</p>`;
        });
    maphsd.on('mouseleave','tracts' ,function () {
        maphsd.getCanvas().style.cursor = '';
        document.getElementById('pdhsd').innerHTML = `<p id=hover>Hover over a tract!</p>`;
    });

    const layershsd = [
        '50%-60%',
        '60%-70%',
        '70%-80%',
        '80%-90%',
        '90%-100%'
    ];
    const colors = [
        '#f1eef6',
        '#bdc9e1',
        '#74a9cf',
        '#2b95ca',
        '#09689f'
    ];

    const legendhsd = document.getElementById('legendhsd');

    layershsd.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        if(i==0){
            item.classList.add( "first" );
        }
        const key = document.createElement('span');
        key.className = 'legendhsd1-key';
        key.style.backgroundColor = color;

        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legendhsd.appendChild(item);
    });
});
