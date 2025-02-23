// Creating the map (centered on Varna)

mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbjExMTAiLCJhIjoiY2tlNGF3NzhhMGhpcjJybDY4anE4OWY1eCJ9.Tlmp_T__rW9Mi2drHesBXw';
        let mymap = new mapboxgl.Map({
            container: 'mymap',
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [27.892033, 43.191973], // longitude, latitude
            zoom: 12,
            zoomControl: true,
            preferCanvas: false,
        });

// Adding the buoys to the map

let i, len, buoys, popup, nameb, lat, lon, coord, wt, ss, uv;

async function fetchDataBuoys() {
    let path_buoys = 'assets/json/buoys.json';
    const response = await fetch(path_buoys);
    let buoys_json = await response.json();

    buoys = buoys_json.buoys;
    len = buoys.length;
    for(i = 0; i < len; ++i) {

        nameb = "Buoy " + buoys[i].id;
        lat = buoys[i].latitude;
        lon = buoys[i].longitude;
        coord = '[' + lon + ', ' + lat + ']';
        wt = buoys[i].properties.water_temperature + " °C";
        ss = buoys[i].properties.sea_state;
        if (ss == 1) {
            ss += " бал";
        }
        else {
            ss += " балa";
        }
        wl = buoys[i].properties.wavelength + " m";
        wf = buoys[i].properties.wave_frequency + " Hz";

        coordinates = [lon, lat];
        el = document.createElement('div');
        el.className = 'custom-marker-buoy';
        el.style.backgroundImage = 'url(assets/images/buoy.png)';
        el.style.backgroundSize = 'cover';
        //console.log(el.style.backgroundImage);
        el.style.width = '30px';
        el.style.height = '30px';

        const marker = new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .addTo(mymap);

        myhtml =
            `<div id="myhtml" style="width: 100%; height: 100%;">
            <h3> <center> ${nameb} </center> </h3>
            <b>Water temperature: </b> ${wt} <br>
            <b>Sea state: </b> ${ss} <br>
            <b>Wavelength: </b> ${wl} <br>
            <b>Wave frequency: </b> ${wf} <br>
            <b>Location: </b> ${coord}
            </div>`

        let popup = new mapboxgl.Popup({ offset: 25, maxWidth: '300px' }).setHTML(myhtml);
        marker.setPopup(popup);
    }
}

fetchDataBuoys()

// Adding the rovers to the map

let rovers, namer, ph, tds, tv, nv, chv;

async function fetchDataRovers() {
    let path_buoys = 'assets/json/rovers.json';
    const response = await fetch(path_buoys);
    let rovers_json = await response.json();

    rovers = rovers_json.rovers;
    len = rovers.length;
    for(i = 0; i < len; ++i) {

        namer = "AmphiRover " + rovers[i].id;
        lat = rovers[i].latitude;
        lon = rovers[i].longitude;
        coord = '[' + lon + ', ' + lat + ']';

        ph = rovers[i].properties.ph_value;
        tds = rovers[i].properties.tds_value;
        tv = rovers[i].properties.turbidity_value;
        nv = rovers[i].properties.nitrate_value;
        chv = rovers[i].properties.chloride_value;

        coordinates = [lon, lat];
        el = document.createElement('div');
        el.className = 'custom-marker-rover';
        el.style.backgroundImage = 'url(assets/images/rover.png)';
        el.style.backgroundSize = '100% 100%';
        //console.log(el.style.backgroundImage);
        el.style.width = '60px';
        el.style.height = '30px';

        const marker = new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .addTo(mymap);

        myhtml =
            `<div id="myhtml" style="width: 100%; height: 100%;">
            <h3> <center> ${namer} </center> </h3>
            <b>PH value: </b> ${ph} <br>
            <b>TDS value: </b> ${tds} <br>
            <b>Turbidity value: </b> ${tv} <br>
            <b>Nitrate value: </b> ${nv} <br>
            <b>Chloride value: </b> ${chv} <br>
            <b>Location: </b> ${coord}
            </div>`

        let popup = new mapboxgl.Popup({ offset: 25, maxWidth: '300px' }).setHTML(myhtml);
        marker.setPopup(popup);
    }
}

fetchDataRovers()