const map = L.map("chapter_map").setView([31.9686, -99.9018], 6);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 10,
  minZoom: 5,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const chapterList = [
  {
    title: "Amarillo",
    loc: [35.222, -101.8313],
    homepage: "https://www.npsot.us/chapters/amarillo",
    email: "amarillo-chapter@npsot.org",
    fb: "https://www.facebook.com/Amarillo-Chapter-Native-Plant-Society-of-Texas-555864317845780/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Potter"],
  },
  {
    title: "Austin",
    loc: [30.2672, -97.7431],
    homepage: "https://www.npsot.us/chapters/austin",
    email: "austin-chapter@npsot.org",
    fb: "https://www.facebook.com/groups/1699273670394452/?ref=br_tf%2F",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Travis"],
  },
  {
    title: "Beaumont",
    loc: [30.0802, -094.1266],
    homepage: "https://www.npsot.us/chapters/beaumont",
    email: "beaumont-chapter@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Jefferson"],
  },
  {
    title: "Big Bend",
    loc: [30.5416, -103.8393],
    homepage: "https://www.npsot.us/chapters/big-bend",
    email: "big-bend-chapter@npsot.org",
    fb: "https://www.facebook.com/BigBendNPSOT/",
    youtube: "",
    twitter: "",
    insta: "https://www.instagram.com/big_bend_npsot/",
    county: ["Brewster", "Jeff Davis", "Presidio"],
  },
  {
    title: "Boerne",
    loc: [29.7947, -98.732],
    homepage: "https://www.npsot.us/chapters/boerne",
    email: "boerne-chapter@npsot.org",
    fb: "https://www.facebook.com/NPSOTBOERNE/",
    youtube: "",
    twitter: "",
    insta: "https://www.instagram.com/npsotboerne/",
    county: ["Kendall"],
  },
  {
    title: "Caddo Wildflower",
    loc: [33.0124, -94.3655],
    homepage: "https://www.npsot.us/chapters/caddo-wildflower",
    email: "caddo-wildflower-chapter@npsot.org",
    fb: "https://www.facebook.com/groups/caddowildflowers/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Cass"],
  },
  {
    title: "Clear Lake",
    loc: [29.5857, -95.1328],
    homepage: "https://www.npsot.us/chapters/clear-lake",
    email: "clear-lake-chapter@npsot.org",
    fb: "https://www.facebook.com/NPSOTClearLake/",
    youtube: "https://www.youtube.com/channel/UCbdFiWKvB7MqryB_Dp3ccwA",
    twitter: "https://twitter.com/NPSOTClearLake/",
    insta: "https://www.instagram.com/npsotclearlake/",
    county: ["Brazoria", "Galveston"],
  },
  {
    title: "Collin County",
    loc: [33.1795, -96.493],
    homepage: "https://www.npsot.us/chapters/collin-county",
    email: "collin-county-chapter@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Collin"],
  },
  {
    title: "Cross Timbers",
    loc: [32.7593, -97.7973],
    homepage: "https://www.npsot.us/chapters/cross-timbers",
    email: "cross-timbers-chapter@npsot.org",
    fb: "https://www.facebook.com/groups/crosstimbersnativeplants/",
    youtube: "https://www.youtube.com/channel/UC7Yl4v5Tr7NrAGlgzP6-hMg",
    twitter: "",
    insta: "",
    county: ["Parker"],
  },
  {
    title: "Dallas",
    loc: [32.8025, -96.8351],
    homepage: "https://www.npsot.us/chapters/dallas",
    email: "dallas-chapter@npsot.org",
    fb: "https://www.facebook.com/profile.php?id=100064753446376",
    youtube: "https://www.youtube.com/channel/UCYEeWorlCPnqhzA04Z_tQLg",
    twitter: "",
    insta: "",
    county: ["Dallas"],
  },
  {
    title: "East Dallas",
    loc: [32.8722, -96.3652],
    homepage: "https://www.npsot.us/chapters/east-dallas",
    email: "east-dallas-chapter@npsot.org",
    fb: "https://www.facebook.com/groups/962708720584696//",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Rockwall", "Kaufman"],
  },
  {
    title: "Fredericksburg",
    loc: [30.2752, -98.872],
    homepage: "https://www.npsot.us/chapters/fredericksburg",
    email: "fredericksburg-chapter@npsot.org",
    fb: "https://www.facebook.com/groups/fbgtxnpsot",
    youtube: "https://www.youtube.com/channel/UC-y7AuUaJi86dbAdMGokIvw",
    twitter: "",
    insta: "",
    county: ["Gillespie"],
  },
  {
    title: "Guadalupe",
    loc: [29.5689, -97.9646],
    homepage: "https://www.npsot.us/chapters/guadalupe",
    email: "guadalupe-chapter@npsot.org",
    fb: "https://www.facebook.com/Guadalupe-Chapter-Native-Plant-Society-of-Texas-690837511042761/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Guadalupe"],
  },
  {
    title: "Highland Lakes",
    loc: [30.5782, -98.2729],
    homepage: "https://www.npsot.us/chapters/highland-lakes",
    email: "highland-lakes-chapter@npsot.org",
    fb: "https://www.facebook.com/HLNPSOT/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Burnet"],
  },
  {
    title: "Hill Country",
    loc: [30.0538, -98.0029],
    homepage: "https://www.npsot.us/chapters/hill-country",
    email: "hill-country-chapter@npsot.org",
    fb: "https://www.facebook.com/groups/HillCountryChapteroftheNativePlantSocietyofTexas/",
    youtube: "",
    twitter: "",
    insta: "https://www.instagram.com/hc.npsot/",
    county: ["Hays"],
  },
  {
    title: "Houston",
    loc: [29.7604, -95.3698],
    homepage: "https://www.npsot.us/chapters/houston",
    email: "houston-chapter@npsot.org",
    fb: "https://www.facebook.com/NativePlantsHOU/",
    youtube: "https://www.youtube.com/channel/UCG9VTOicjH4roPmvvSG_a2Q",
    twitter: "https://twitter.com/npsot_hou/",
    insta: "https://www.instagram.com/npsot_hou/",
    county: ["Harris"],
  },
  {
    title: "Kerrville",
    loc: [30.0474, -99.1403],
    homepage: "https://www.npsot.us/chapters/kerrville",
    email: "kerrville-chapter@npsot.org",
    fb: "",
    youtube: "https://www.youtube.com/channel/UCITe0U5Nr3qeJoSwkEjYoEg",
    twitter: "",
    insta: "",
    county: ["Kerr"],
  },
  {
    title: "La Bahia",
    loc: [30.1669, -96.3977],
    homepage: "https://www.npsot.us/chapters/la-bahia",
    email: "la-bahia-chapter@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Washington"],
  },
  {
    title: "Lindheimer",
    loc: [29.8106, -98.2213],
    homepage: "https://www.npsot.us/chapters/lindheimer",
    email: "lindheimer-chapter@npsot.org",
    fb: "https://www.facebook.com/npsot.lindheimer/",
    youtube: "https://www.youtube.com/channel/UCt_ZR_-qwIlnXBkKsUTY4FQ",
    twitter: "https://www.instagram.com/lindheimernpsot/",
    insta: "",
    county: ["Comal"],
  },
  {
    title: "New Braunfels",
    loc: [29.7026, -98.1241],
    homepage: "https://www.npsot.us/chapters/new-braunfels",
    email: "new-braunfels-chapter@npsot.org",
    fb: "https://www.facebook.com/NativePlantSocietyNBC/",
    youtube: "",
    twitter: "",
    insta: "",
    county: [""],
  },
  {
    title: "North Central",
    loc: [32.7555, -97.3308],
    homepage: "https://www.npsot.us/chapters/north-central",
    email: "north-central-chapter@npsot.org",
    fb: "https://www.facebook.com/groups/1479128372319091/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Tarrant"],
  },
  {
    title: "Northeast Texas",
    loc: [32.5007, -94.7405],
    homepage: "https://www.npsot.us/chapters/northeast-texas",
    email: "northeast-texas-chapter@npsot.org",
    fb: "https://www.facebook.com/NPSOTNortheastTexasChapter/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Gregg"],
  },
  {
    title: "Pines & Prairies",
    loc: [30.3119, -95.4561],
    homepage: "https://www.npsot.us/chapters/pines-prairies",
    email: "pines-prairies-chapter@npsot.org",
    fb: "https://www.facebook.com/profile.php?id=100063981707925",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Montgomery"],
  },
  {
    title: "Pineywoods",
    loc: [31.6039, -94.656],
    homepage: "https://www.npsot.us/chapters/pineywoods",
    email: "pineywoods-chapter@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Nacogdoches", "Angelina"],
  },
  {
    title: "Post Oak",
    loc: [30.628, -96.3344],
    homepage: "https://www.npsot.us/chapters/post-oak",
    email: "post-oak-chapter@npsot.org",
    fb: "https://www.facebook.com/groups/1036435446541316/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Brazos"],
  },
  {
    title: "Prairie Rose",
    loc: [32.4489, -97.7906],
    homepage: "https://www.npsot.us/chapters/prairie-rose",
    email: "prairie-rose-chapter@npsot.org",
    fb: "https://www.facebook.com/PrairieRoseNPSOT/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Hood", "Somervell"],
  },
  {
    title: "Sam Houston",
    loc: [30.7235, -95.5508],
    homepage: "https://www.npsot.us/chapters/sam-houston",
    email: "sam-houston-chapter@npsot.org",
    fb: "https://www.facebook.com/shnpsot/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Walker"],
  },
  {
    title: "San Antonio",
    loc: [29.4252, -98.4946],
    homepage: "https://www.npsot.us/chapters/san-antonio",
    email: "san-antonio-chapter@npsot.org",
    fb: "https://www.facebook.com/NativePlantSocietyOfTexasSanAntonioChapter/",
    youtube: "",
    twitter: "",
    insta: "https://www.instagram.com/npsot.sanantonio/",
    county: ["Bexar"],
  },
  {
    title: "South Plains",
    loc: [33.5779, -101.8552],
    homepage: "https://www.npsot.us/chapters/south-plains",
    email: "south-plains-chapter@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Lubbock"],
  },
  {
    title: "South Texas",
    loc: [27.8006, -97.3964],
    homepage: "https://www.npsot.us/chapters/south-texas",
    email: "south-texas-chapter@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Nueces", "San Patricio"],
  },
  {
    title: "Tonkawa",
    loc: [31.0982, -97.3428],
    homepage: "https://www.npsot.us/chapters/tonkawa",
    email: "tonkawa-chapter@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Bell"],
  },
  {
    title: "Trinity Forks",
    loc: [33.2148, -97.1331],
    homepage: "https://www.npsot.us/chapters/trinity-forks",
    email: "trinity-forks-chapter@npsot.org",
    fb: "https://www.facebook.com/TexasNativePlants.DentonArea/",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Denton"],
  },
  {
    title: "Tyler",
    loc: [32.3513, -95.3011],
    homepage: "https://www.npsot.us/chapters/tyler",
    email: "tyler-chapter@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Smith"],
  },
  {
    title: "Uvalde",
    loc: [29.2097, -99.7862],
    homepage: "https://www.npsot.us/chapters/uvalde",
    email: "uvalde-chapter@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
    county: ["Uvalde"],
  },
  {
    title: "Wilco",
    loc: [30.6333, -97.678],
    homepage: "https://www.npsot.us/chapters/wilco",
    email: "wilco-chapter@npsot.org",
    fb: "https://www.facebook.com/npsotwilco/",
    youtube: "https://www.youtube.com/channel/UC4JTqkLooQd2QPxYtD7wh5Q",
    twitter: "",
    insta: "https://www.instagram.com/npsotwilco/",
    county: ["Williamson"],
  },
];

const iconUrl =
  "https://img.icons8.com/external-xnimrodx-blue-xnimrodx/64/000000/external-pin-event-and-party-xnimrodx-blue-xnimrodx.png";

const chapterIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -10],
});

//initialize layer for chapter pins
const chapterPins = new L.LayerGroup();

//initialize layer for chapter counties
const chapterCounties = new L.layerGroup();

chapterList.forEach((e) => {
  let popup = `
<span class='chapter-title'><b>${e.title} Chapter</b></span><br>
<a class='chapter-link' href=${e.homepage}>Visit our Homepage</a><br>
${
  e.email === ""
    ? ""
    : `<a class='chapter-link' href='mailto:${e.email}'>Email Us</a><br>`
}
${
  e.fb === ""
    ? ""
    : `<a class='chapter-link' href=${e.fb}'>Visit us on Facebook</a><br>`
}
${
  e.youtube === ""
    ? ""
    : `<a class='chapter-link' href=${e.youtube}'>Check out our Youtube Channel</a><br>`
}
${
  e.twitter === ""
    ? ""
    : `<a class='chapter-link' href=${e.twitter}'>Subscribe to our Twitter feed</a><br>`
}
${
  e.insta === ""
    ? ""
    : `<a class='chapter-link' href=${e.insta}'>Follow us on Instagram</a><br>`
}`;

  L.marker(e.loc, { icon: chapterIcon }).addTo(chapterPins).bindPopup(popup);
  map.addLayer(chapterPins);

  const loadCounties = async () => {
    for (let county of e.county) {
      const countyStyles = { fillOpacity: 0.3, weight: 0.5, color: "#3c5799" };
      try {
        let response = await fetch(
          `https://maps.dot.state.tx.us/arcgis/rest/services/Boundaries/MapServer/1/query?where=&text=${county}&geometryPrecision=2&f=geojson`
        );
        const countyJson = await response.json();

        for (let i = 0; i < countyJson.features.length; i++) {
          for (let j = 0; j < e.county.length; j++) {
            if (countyJson.features[i].properties.CNTY_NM === e.county[j]) {
              L.geoJson(countyJson.features[i].geometry, {
                style: countyStyles,
              })
                .bindTooltip(`<b>${county} County</b><br>${e.title} Chapter`)
                .addTo(chapterCounties);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (e.county[0] !== null) loadCounties();
  map.addLayer(chapterCounties);
});

//adds control layer to map after loop
const layerControl = L.control
  .layers(null, null, { collapsed: false })
  .addTo(map);
layerControl.addOverlay(chapterPins, "Chapter Pins");
layerControl.addOverlay(chapterCounties, "Counties");

//array of ecoregion objects.  ID is for the epa.gov API.
let ecoObj = [
  {
    name: "Chihuahuan Deserts",
    id: 17,
    style: "yellow",
  },
  {
    name: "High Plains",
    id: 18,
    style: "cornflowerblue",
  },
  {
    name: "Southwestern Tablelands",
    id: 19,
    style: "orange",
  },
  {
    name: "Central Great Plains",
    id: 20,
    style: "chocolate",
  },
  {
    name: "Cross Timbers",
    id: 22,
    style: "green",
  },
  {
    name: "Edwards Plateau",
    id: 24,
    style: "olive",
  },
  {
    name: "Southern Texas Plains",
    id: 25,
    style: "navajowhite",
  },
  {
    name: "Texas Blackland Prairies",
    id: 26,
    style: "black",
  },
  {
    name: "East Central Texas Plains",
    id: 27,
    style: "skyblue",
  },
  {
    name: "Western Gulf Coastal Plains",
    id: 28,
    style: "royalblue",
  },
  {
    name: "South Central Plains",
    id: 29,
    style: "salmon",
  },
];

//texas boundry geojson
let texasGeo = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "USA-TX",
      properties: { fips: "48", name: "Texas" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-101.812942, 36.501861],
            [-100.000075, 36.501861],
            [-100.000075, 34.563024],
            [-99.923398, 34.573978],
            [-99.698843, 34.382285],
            [-99.57835, 34.415147],
            [-99.260688, 34.404193],
            [-99.189488, 34.2125],
            [-98.986841, 34.223454],
            [-98.767763, 34.135823],
            [-98.570593, 34.146777],
            [-98.488439, 34.064623],
            [-98.36247, 34.157731],
            [-98.170777, 34.113915],
            [-98.088623, 34.004376],
            [-97.946222, 33.987946],
            [-97.869545, 33.851022],
            [-97.694283, 33.982469],
            [-97.458774, 33.905791],
            [-97.371143, 33.823637],
            [-97.256128, 33.861976],
            [-97.173974, 33.736006],
            [-96.922034, 33.960561],
            [-96.850834, 33.845545],
            [-96.631756, 33.845545],
            [-96.423633, 33.774345],
            [-96.346956, 33.686714],
            [-96.149786, 33.840068],
            [-95.936185, 33.889361],
            [-95.8376, 33.834591],
            [-95.602092, 33.933176],
            [-95.547322, 33.878407],
            [-95.289906, 33.87293],
            [-95.224183, 33.960561],
            [-94.966767, 33.861976],
            [-94.868182, 33.74696],
            [-94.484796, 33.637421],
            [-94.380734, 33.544313],
            [-94.183564, 33.593606],
            [-94.041164, 33.54979],
            [-94.041164, 33.018527],
            [-94.041164, 31.994339],
            [-93.822086, 31.775262],
            [-93.816609, 31.556184],
            [-93.542762, 31.15089],
            [-93.526331, 30.93729],
            [-93.630393, 30.679874],
            [-93.728978, 30.575812],
            [-93.696116, 30.438888],
            [-93.767317, 30.334826],
            [-93.690639, 30.143133],
            [-93.926148, 29.787132],
            [-93.838517, 29.688547],
            [-94.002825, 29.68307],
            [-94.523134, 29.546147],
            [-94.70935, 29.622824],
            [-94.742212, 29.787132],
            [-94.873659, 29.672117],
            [-94.966767, 29.699501],
            [-95.016059, 29.557101],
            [-94.911997, 29.496854],
            [-94.895566, 29.310638],
            [-95.081782, 29.113469],
            [-95.383014, 28.867006],
            [-95.985477, 28.604113],
            [-96.045724, 28.647929],
            [-96.226463, 28.582205],
            [-96.23194, 28.642452],
            [-96.478402, 28.598636],
            [-96.593418, 28.724606],
            [-96.664618, 28.697221],
            [-96.401725, 28.439805],
            [-96.593418, 28.357651],
            [-96.774157, 28.406943],
            [-96.801542, 28.226204],
            [-97.026096, 28.039988],
            [-97.256128, 27.694941],
            [-97.404005, 27.333463],
            [-97.513544, 27.360848],
            [-97.540929, 27.229401],
            [-97.425913, 27.262263],
            [-97.480682, 26.99937],
            [-97.557359, 26.988416],
            [-97.562836, 26.840538],
            [-97.469728, 26.758384],
            [-97.442344, 26.457153],
            [-97.332805, 26.353091],
            [-97.30542, 26.161398],
            [-97.217789, 25.991613],
            [-97.524498, 25.887551],
            [-97.650467, 26.018997],
            [-97.885976, 26.06829],
            [-98.198161, 26.057336],
            [-98.466531, 26.221644],
            [-98.669178, 26.238075],
            [-98.822533, 26.369522],
            [-99.030656, 26.413337],
            [-99.173057, 26.539307],
            [-99.266165, 26.840538],
            [-99.446904, 27.021277],
            [-99.424996, 27.174632],
            [-99.50715, 27.33894],
            [-99.479765, 27.48134],
            [-99.605735, 27.640172],
            [-99.709797, 27.656603],
            [-99.879582, 27.799003],
            [-99.934351, 27.979742],
            [-100.082229, 28.14405],
            [-100.29583, 28.280974],
            [-100.399891, 28.582205],
            [-100.498476, 28.66436],
            [-100.629923, 28.905345],
            [-100.673738, 29.102515],
            [-100.799708, 29.244915],
            [-101.013309, 29.370885],
            [-101.062601, 29.458516],
            [-101.259771, 29.535193],
            [-101.413125, 29.754271],
            [-101.851281, 29.803563],
            [-102.114174, 29.792609],
            [-102.338728, 29.869286],
            [-102.388021, 29.765225],
            [-102.629006, 29.732363],
            [-102.809745, 29.524239],
            [-102.919284, 29.190146],
            [-102.97953, 29.184669],
            [-103.116454, 28.987499],
            [-103.280762, 28.982022],
            [-103.527224, 29.135376],
            [-104.146119, 29.381839],
            [-104.266611, 29.513285],
            [-104.507597, 29.639255],
            [-104.677382, 29.924056],
            [-104.688336, 30.181472],
            [-104.858121, 30.389596],
            [-104.896459, 30.570335],
            [-105.005998, 30.685351],
            [-105.394861, 30.855136],
            [-105.602985, 31.085167],
            [-105.77277, 31.167321],
            [-105.953509, 31.364491],
            [-106.205448, 31.468553],
            [-106.38071, 31.731446],
            [-106.528588, 31.786216],
            [-106.643603, 31.901231],
            [-106.616219, 31.999816],
            [-103.067161, 31.999816],
            [-103.067161, 33.002096],
            [-103.045254, 34.01533],
            [-103.039777, 36.501861],
            [-103.001438, 36.501861],
            [-101.812942, 36.501861],
          ],
        ],
      },
    },
  ],
};

//add texas boundry geojson to map
L.geoJSON(texasGeo, {
  style: { weight: "5", fillOpacity: 0, color: "#3c5799" },
}).addTo(map);

//initialize ecoregion layer
const ecoLayer = new L.layerGroup();

//add ecoregions to map
const loadEcoregions = async () => {
  for (let ecoregion of ecoObj) {
    let ecoregionStyle = {
      fillOpacity: 0.3,
      weight: 1,
      color: ecoregion.style,
    };
    try {
      let res = await fetch(
        `https://geodata.epa.gov/arcgis/rest/services/ORD/USEPA_Ecoregions_Level_III_and_IV/MapServer/11/query?where=&text=&objectIds=${ecoregion.id}&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson`
      );
      let json = await res.json();
      L.geoJSON(json, {
        style: ecoregionStyle,
      })
        .bindTooltip(ecoregion.name, { className: "ecoregion-popup" })
        .addTo(ecoLayer);
    } catch (error) {
      console.log(error);
    }
  }
};

loadEcoregions();
layerControl.addOverlay(ecoLayer, "Ecoregions");
