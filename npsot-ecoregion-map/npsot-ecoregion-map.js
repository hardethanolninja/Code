let map = L.map("ecoregion_map", { zoomSnap: 0.25 }).setView(
  [31.75, -99.9],
  5.75
);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 10,
  minZoom: 5,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//array of ecoregion objects.  ID is for the epa.gov API.
const level3Eco = [
  {
    name: "Chihuahuan Deserts",
    id: 17,
    style: "yellow",
    info: "This desert ecoregion extends from the Madrean Archipelago in southeastern Arizona to the Edwards Plateau in south-central Texas. The    physiography of the region is generally a continuation of basin and range terrain (excluding the Stockton Plateau) that is typical of the Mojave Basin    and Range  and the Central Basin and Range  ecoregions to the west and north, although the pattern of alternating mountains and valleys is not as pronounced as it is in the Mojave Basin and Range and the Central Basin and Range. The mountain ranges are a geologic mix of faulted limestone reefs, volcanoes and associated basalt, rhyolite, and tuff extrusive rocks. Outside the major river drainages, such as the Rio Grande and Pecos River, the landscape is largely internally drained. Vegetative cover is predominantly semi-desert grassland and arid shrubland, except for high elevation islands of oak, juniper, and pinyon pine woodland. The extent of desert shrubland is increasing across lowlands and mountain foothills due to gradual desertification caused in part by historical grazing pressure.",
  },
  {
    name: "High Plains",
    id: 18,
    style: "cornflowerblue",
    info: "The High Plains ecoregion is higher and drier than the Central Great Plains to the east. And, in contrast to the characteristic irregular rangeland of the Northwestern Great Plains to the north in the Dakotas and eastern Montana and Wyoming, much of the High Plains is expressed as smooth to slightly irregular plains with a high percentage of cropland. The potential natural vegetation in this region is grama-buffalo grass compared to mostly wheatgrass-needlegrass to the north, Trans-Pecos shrub savanna to the south, and tallgrass prairie to the east (Kuchler 1964, 1970). The northern boundary of this ecological region is also the approximate northern limit of winter wheat and sorghum and the southern limit of spring wheat. The ecoregion includes the plains area of the Llano Estacado. Thousands of playa lakes (seasonal depressional wetlands) occur in this area, many serving as recharge areas for the important Ogallala Aquifer. These playa lakes are also essential for waterfowl during their yearly migration along the Central Flyway of North America. Oil and gas production occurs in many parts of the region.",
  },
  {
    name: "Southwestern Tablelands",
    id: 19,
    style: "orange",
    info: "The Southwestern Tablelands flank the High Plains with red hued canyons, mesas, badlands, and dissected river breaks. Unlike most adjacent Great Plains ecological regions, little of the Southwestern Tablelands are in cropland. Much of this region is in sub-humid grassland and semiarid rangeland. The potential natural vegetation in this region is grama-buffalo grass with some mesquite-buffalo grass in the southeast, juniper-scrub oak-midgrass savanna on escarpment bluffs, and shinnery (midgrass prairie with low oak brush) along parts of the Canadian River. Soils in this region include Alfisols, Inceptisols, Entisols, and Mollisols.",
  },
  {
    name: "Central Great Plains",
    id: 20,
    style: "chocolate",
    info: "The Central Great Plains are slightly lower, receive more precipitation, and are more irregular than the High Plains to the west. The ecological region was once grassland, a mixed or transitional prairie from the tallgrass in the east to shortgrass farther west. Scattered low trees and shrubs occur in the south. Most of the ecoregion is now cropland. The eastern boundary of the region marks the eastern limits of the major winter wheat growing area of the United States. Soils in this region are generally deep with shallow soils on ridges and breaks.",
  },
  {
    name: "Cross Timbers",
    id: 22,
    style: "green",
    info: "The Cross Timbers ecoregion is a transitional area between the once prairie, now winter wheat growing regions to the west, and the forested low mountains or hills of eastern Oklahoma and Texas. The region stretches from southern Kansas into central Texas, and contains irregular plains with some low hills and tablelands. It is a mosaic of forest, woodland, savanna, and prairie. The Cross Timbers ecoregion is not as arable or as suitable for growing corn and soybeans as the Central Irregular Plains to the northeast. The transitional natural vegetation of little bluestem grassland with scattered blackjack oak and post oak trees is used mostly for rangeland and pastureland, with some areas of woody plant invasion and closed forest. Oil production has been a major activity in this region for over eighty years.",
  },
  {
    name: "Edwards Plateau",
    id: 24,
    style: "olive",
    info: "This ecoregion is largely a dissected limestone plateau that is hillier to the south and east where it is easily distinguished from bordering ecological regions by a sharp fault line. The region contains a sparse network of perennial streams. Due to karst topography (related to dissolution of limestone substrate) and resulting underground drainage, streams are relatively clear and cool in temperature compared to those of surrounding areas. Soils in this region are mostly Mollisols with shallow and moderately deep soils on plateaus and hills, and deeper soils on plains and valley floors. Covered by juniper-oak savanna and mesquite-oak savanna, most of the region is used for grazing beef cattle, sheep, goats, exotic game mammals, and wildlife. Hunting leases are a major source of income. Combined with topographic gradients, fire was once an important factor controlling vegetation patterns on the Edwards Plateau. It is a region of many endemic vascular plants. With its rapid seed dispersal, low palatibility to browsers, and in the absence of fire, Ashe juniper has increased in some areas, reducing the extent of grassy savannas.",
  },
  {
    name: "Southern Texas Plains",
    id: 25,
    style: "navajowhite",
    info: "These rolling to moderately dissected plains were once covered in many areas with grassland and savanna vegetation that varied during wet and dry cycles. Following long continued grazing and fire suppression, thorny brush, such as mesquite, is now the predominant vegetation type. Ceniza and blackbrush occur on caliche soils. Also known as the Tamualipan Thornscrub, or the “brush country” as it is called locally, the region has its greatest extent in Mexico. The subhumid to dry region contains a diverse mosaic of soils, mostly clay, clay loam, and sandy clay loam surface textures, and ranging from alkaline to slightly acid. The ecoregion also contains a high and distinct diversity of plant and animal life. It is generally lower in elevation with warmer winters than the Chihuahuan Deserts to the northwest. Oil and natural gas production activities are widespread.",
  },
  {
    name: "Texas Blackland Prairies",
    id: 26,
    style: "black",
    info: "The Texas Blackland Prairies form a disjunct ecological region, distinguished from surrounding regions by fine-textured, clayey soils and predominantly prairie potential natural vegetation. The predominance of Vertisols in this area is related to soil formation in Cretaceous shale, chalk, and marl parent materials. Unlike tallgrass prairie soils that are mostly Mollisols in states to the north, this region contains Vertisols, Alfisols, and Mollisols. Dominant grasses included little bluestem, big bluestem, yellow Indiangrass, and switchgrass. This region now contains a higher percentage of cropland than adjacent regions; pasture and forage production for livestock is common. Large areas of the region are being converted to urban and industrial uses. Before Anglo settlement, animal species included bison, pronghorn antelope, mountain lion, bobcat, ocelot, black bear, collared peccary, deer, coyote, fox, badger, and river otter among others (Schmidley 2002, Diggs et al.,1999). Typical game species today include mourning dove and northern bobwhite on uplands and eastern fox squirrel along stream bottomlands.",
  },
  {
    name: "East Central Texas Plains",
    id: 27,
    style: "skyblue",
    info: "Also called the Post Oak Savanna or the Claypan Area, this region of irregular plains was originally covered by post oak savanna vegetation, in contrast to the more open prairie-type regions to the north, south, and west, and the pine forests to the east. The boundary with Ecoregion 35 is a subtle transition of soils and vegetation. Soils are variable among the parallel ridges and valleys, but tend to be acidic, with sands and sandy loams on the uplands and clay to clay loams in low-lying areas. Many areas have a dense, underlying clay pan affecting water movement and available moisture for plant growth. The bulk of this region is now used for pasture and range.",
  },
  {
    name: "Western Gulf Coastal Plains",
    id: 28,
    style: "royalblue",
    info: "The Western Gulf Coastal Plain is a relatively flat strip of land, generally 50 to 90 miles wide, adjacent to the Gulf of Mexico. The principal distinguishing characteristics of this ecoregion are its relatively flat topography and mainly grassland potential natural vegetation. Inland from this region the plains are older, more irregular, and have mostly forest or savanna-type vegetation potentials. Largely because of these characteristics, a higher percentage of the land is in cropland than in bordering ecological regions. Rice, grain sorghum, cotton, and soybeans are the principal crops. Urban and industrial land uses have expanded greatly in recent decades, and oil and gas production is common.",
  },
  {
    name: "South Central Plains",
    id: 29,
    style: "salmon",
    info: "Locally termed the “piney woods”, this region of mostly irregular plains represents the western edge of the southern coniferous forest belt. Once blanketed by a mix of pine and hardwood forests, much of the region is now in loblolly and shortleaf pine plantations. Soils are mostly acidic sands and sandy loams. Covering parts of Louisiana, Arkansas, east Texas, and Oklahoma, only about one sixth of the region is in cropland, primarily within the Red River floodplain, while about two thirds of the region is in forests and woodland. Lumber, pulpwood, oil, and gas production are major economic activities.",
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
const level3Layer = new L.layerGroup();

let loadLevel3Ecos = async () => {
  const promises = [];
  for (let eco of level3Eco) {
    try {
      let res = await fetch(
        `https://geodata.epa.gov/arcgis/rest/services/ORD/USEPA_Ecoregions_Level_III_and_IV/MapServer/11/query?where=&text=&objectIds=${eco.id}&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson`
      );
      let json = await res.json();
      //add ecoregion name so it can be bound to tooltip
      json.name = eco.name;
      json.style = eco.style;
      json.info = eco.info;
      promises.push(json);
    } catch (error) {
      console.log(error);
    }
  }
  Promise.all(promises).then((res) => {
    document.querySelector(".spinner-container").hidden = true;
    for (let ecoregion of res) {
      L.geoJSON(ecoregion, {
        fillOpacity: 0.3,
        weight: 1,
        color: ecoregion.style,
      })
        .bindTooltip(ecoregion.name, { className: "ecoregion-popup" })
        .on("click", function (e) {
          sidebar.setContent(`<h1>${ecoregion.name}</h1>
          <img height=300 width=300 src="https://source.unsplash.com/random/300x300/?desert" />
          <p>${ecoregion.info}</p>
          <a style="color:gray" href="https://gaftp.epa.gov/epadatacommons/ORD/Ecoregions/tx/TXeco_Jan08_v8_Cmprsd.pdf">Reference: Griffith, Bryce, Omernick & Rodgers (2007). Ecoregions of Texas.</a>`);
          sidebar.show();
        })
        .addTo(map)
        .addTo(level3Layer);
    }
    map.addLayer(level3Layer);

    const layerControl = L.control
      .layers(null, null, { collapsed: false })
      .addTo(map);

    layerControl.addOverlay(level3Layer, "Level 3 Ecoregions");
  });
};

loadLevel3Ecos();

const sidebar = L.control.sidebar("sidebar", {
  position: "left",
});

map.addControl(sidebar);
