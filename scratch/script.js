const url = "https://npsot.us/wp-json/wp/v2/speaker_bureau/?per_page=100";

const speakerArr = [];

// https://github.com/masajid390/BeautifyMarker
const iconOptions = {
  borderColor: "#3c5799",
  textColor: "#3c5799",
  iconShape: "marker",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  innerIconAnchor: [0, 7],
};

const fetchStuff = async (params) => {
  let map = L.map("ecoregion_map", { zoomSnap: 0.25 }).setView(
    [31.75, -99.9],
    5.75
  );

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 10,
      minZoom: 5,
      attribution:
        "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
    }
  ).addTo(map);

  //add layer controller to map.  this is used for the layer toggle checkboxes
  const layerControl = L.control
    .layers(null, null, { collapsed: false })
    .addTo(map);

  try {
    let speakerRes = await fetch(url);
    let speakerJSON = await speakerRes.json();
    speakerArr.push(speakerJSON);
  } catch (error) {
    console.log(error);
  }
  const speakerData = await Promise.all(speakerArr);

  if (params.speaker) {
    //initialize layer for NICE pins
    const OMS = new OverlappingMarkerSpiderfier(map);
    const speakerPins = new L.LayerGroup();

    const speakerOptions = iconOptions;
    speakerOptions.icon = "graduation-cap";
    speakerOptions.textColor = "#C41E3A";
    speakerOptions.borderColor = "#C41E3A";
    speakerOptions.backgroundColor = "rgba(255,255,255,0.8)";

    const allSpeakers = speakerData[0].filter(
      (ele) => ele.acf.speaker_post_type === "Speaker"
    );

    for (speaker of allSpeakers) {
      //build tooltip
      let tooltip = `<h3 class=map-item__title data-distance="${speaker.acf.driving_distance}" data-lat="${speaker.acf.speaker_location.lat}" data-lng="${speaker.acf.speaker_location.lng}">${speaker.title.rendered}</h3>`;

      //build popup
      let popup = `<h3 class="map-item__title">${speaker.title.rendered}</h3>
      <p class="map-item__text">Lives in ${
        speaker.acf.speaker_location.city
      }</p>
      ${
        speaker.acf.driving_distance
          ? `<p class='map-item__text'>Speaker will drive ${speaker.acf.driving_distance} miles</p>`
          : null
      }
      <a class='map-item__link' target='_blank' href=${
        speaker.link
      }><b>View this Speaker's Info</b></a>`;

      if (speaker.acf.speaker_affiliation) {
        let speakerAffiliations = speaker.acf.speaker_affiliation.split(", ");
        popup += `<hr><p class='map-item__text'><b>Associated Organization${
          speakerAffiliations.length > 1 ? "s" : ""
        }</b></p>`;
        speakerAffiliations.forEach((ele) => {
          popup += `<p class='map-item__text'>${ele}</p>`;
        });
      }

      const marker = L.marker(
        [speaker.acf.speaker_location.lat, speaker.acf.speaker_location.lng],
        {
          icon: L.BeautifyIcon.icon(speakerOptions),
        }
      )
        .addTo(speakerPins)
        .bindTooltip(tooltip)
        .bindPopup(popup)
        .on("click", function (e) {
          const regex = /"([^"]*)"/g;

          const data = e.target._tooltip._content.match(regex);

          const circle = L.circle(
            [data[1].slice(1, -1) * 1, data[2].slice(1, -1) * 1],
            {
              color: "#C41E3A",
              radius: data[0].slice(1, -1) * 1609,
            }
          ).addTo(map);

          circle.on("click", () => {
            circle.remove();
          });
        });

      OMS.addMarker(marker);
    }

    map.addLayer(speakerPins);
    layerControl.addOverlay(
      speakerPins,
      "<i class='fa-solid fa-graduation-cap'></i>Speakers Bureau"
    );
  }
};
fetchStuff({ speaker: true });
