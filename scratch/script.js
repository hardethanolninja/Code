const url = "https://npsot.us/wp-json/wp/v2/map-item/?per_page=100";

const mapArr = [];

// https://github.com/masajid390/BeautifyMarker
const iconOptions = {
  //   icon: "shop",
  borderColor: "#3c5799",
  textColor: "#3c5799",
  //   backgroundColor: NICENurseries[ind].Shipping
  //     ? "rgba(136, 155, 206,0.8)"
  //     : "rgba(255,255,255,0.8)",
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
    let mapRes = await fetch(url);
    let mapJSON = await mapRes.json();
    mapArr.push(mapJSON);
  } catch (error) {
    console.log(error);
  }
  const mapData = await Promise.all(mapArr);

  if (params.nice) {
    //initialize layer for NICE pins
    const NICEoms = new OverlappingMarkerSpiderfier(map);
    const NICEPins = new L.LayerGroup();

    const NICEOptions = iconOptions;
    NICEOptions.icon = "shop";

    const niceData = mapData[0].filter(
      (ele) => ele.acf.map_item_type === "NICE Partner"
    );

    for (nursery of niceData) {
      //pick color based on shipping
      nursery.acf.map_item_shipping === "Yes"
        ? (NICEOptions.backgroundColor = "rgba(136, 155, 206,0.8)")
        : (NICEOptions.backgroundColor = "rgba(255,255,255,0.8)");

      //build tooltip
      let tooltip = `<h3 class=map-item__title>${nursery.title.rendered}</h3>`;

      //build popup
      let popup = `<h3 class=map-item__title>${nursery.title.rendered}</h3><br>
      ${
        nursery.acf.map_item_shipping === "Yes"
          ? "<p class='map-item__text'><b>We Ship!</b></p><br>"
          : ""
      }
      <a class='map-item__link' target='_blank' href=${
        nursery.acf.map_item_external_url
      }>Visit our Homepage</a><br>`;

      if (nursery.acf.map_item_associated_organization) {
        popup += `<p class='nice-text'><b>Associated Chapters</b></p>`;
        nursery.acf.map_item_associated_organization.forEach((ele) => {
          const chapter = ele.replace(/ +/g, "-").toLowerCase();
          popup += `<a class='map-item__link' href='https://npsot.us/chapter/${chapter}' target='_blank'>${ele}</a><br>`;
        });
      }

      const marker = L.marker(
        [nursery.acf.map_item_loc.lat, nursery.acf.map_item_loc.lng],
        {
          icon: L.BeautifyIcon.icon(NICEOptions),
        }
      )
        .addTo(NICEPins)
        .bindTooltip(tooltip)
        .bindPopup(popup);

      NICEoms.addMarker(marker);
    }

    map.addLayer(NICEPins);
    layerControl.addOverlay(NICEPins, "NICE! Nurseries");
  }
};
fetchStuff({ nice: true });
