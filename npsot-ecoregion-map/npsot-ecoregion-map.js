// eco3Load, eco3Show, eco4Load, eco4Show, chapterLoad, chapterShow, NICE, garden, monarch, BBMT, native, speaker
function NMap(params) {
  //initialize a map, zoomSnap enables smaller zoom intervals, intial view is center of texas.  5.75 is initial zoom level
  let map = L.map("ecoregion_map", { zoomSnap: 0.25 }).setView(
    [31.75, -99.9],
    5.75
  );

  //select a tile layer
  //https://leaflet-extras.github.io/leaflet-providers/preview/
  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 15,
      minZoom: 5,
      attribution:
        "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
    }
  ).addTo(map);

  //prevents map pins that overlap from being hidden
  //https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet
  const OMS = new OverlappingMarkerSpiderfier(map);

  // ZIP CODE lookup API link
  // https://www.geonames.org/
  const zipLookupURL =
    "http://api.geonames.org/postalCodeSearchJSON?username=jlienhard&country=US&postalcode=";

  // Address lookup API link
  // https://geocoding.geo.census.gov/geocoder/
  const addressLookupURL =
    "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?benchmark=2020&format=json&address=";

  //additional options for map icons
  // https://github.com/masajid390/BeautifyMarker
  const iconOptions = {
    borderWidth: 3,
    iconShape: "marker",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    innerIconAnchor: [0, 5.5],
  };

  //add texas boundry geojson to map
  L.geoJSON(texasGeo, {
    style: { weight: "5", fillOpacity: 0, color: "#3c5799" },
  }).addTo(map);

  //add layer controller to map.  this is used for the layer toggle checkboxes
  const layerControl = L.control
    .layers(null, null, { collapsed: false })
    .addTo(map);

  /*
 This will create a legend based on the level 3 ecoregions.  It will be loaded if either the level 3 ecoregion or level 4 ecoregions are loaded.  If both ecoregions are not shown by default, this will be minimized on load.
  */
  if (params.eco3Load === true || params.eco4Load === true) {
    //add legend to map
    const level3legend = L.control({ position: "bottomright" });

    //add legend
    level3legend.onAdd = function (map) {
      const div = L.DomUtil.create("div", "lvl3legend");
      const items = L.DomUtil.create("div", "legend-items");
      div.appendChild(items);
      items.innerHTML += "<h4>Level 3 Ecoregions</h4>";
      for (let ecoregion of level3Eco) {
        items.innerHTML += `<div class="legend-key"><i style="background: ${ecoregion.style}"></i><span>${ecoregion.name}</span></div>`;
      }
      div.insertAdjacentHTML(
        "beforeend",
        "<button class='legend-toggle' onclick='toggleLegend()'>Toggle Legend</button>"
      );
      return div;
    };
    level3legend.addTo(map);
    if (params.eco3Show !== true && params.eco4Show !== true) {
      const legend = document.querySelector(".legend-items");
      legend.style.display = "none";
    }
  }

  /*
  *eco3Load* will load the level 3 ecoregion data.  Must be TRUE in order for eco3Show to work.

  *eco3Show* will automatically populate the map with the level 3 ecoregions.  If not selected, the ecoregions & legend will load, but will be toggled off & minimized respectively.
  */
  if (params.eco3Load === true) {
    //initialize ecoregion layer
    const level3Layer = new L.layerGroup();

    //add loading spinner while ecoregions load
    document.querySelector("#ecoregion_map").insertAdjacentHTML(
      "afterend",
      `<div id="level-3-loading">
    <i class="fa-solid fa-circle-notch fa-spin"></i>
    <p>Level 3 Ecoregions Loading</p>
  </div>`
    );

    const loadLevel3Ecos = async () => {
      const promises = [];
      for (let eco of level3Eco) {
        try {
          let res = await fetch(
            `https://geodata.epa.gov/arcgis/rest/services/ORD/USEPA_Ecoregions_Level_III_and_IV/MapServer/11/query?where=US_L3CODE+%3D+%27${eco.id}%27&f=geojson`
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
        document.querySelector("#level-3-loading").style.display = "none";
        for (let ecoregion of res) {
          L.geoJSON(ecoregion, {
            className: "l3-layer-overlay",
            fillOpacity: 0.2,
            weight: 1,
            color: ecoregion.style,
          })
            //TODO currently uses unsplash filler images, needs to be updated in future with actual ecoregion pictures
            .bindTooltip(ecoregion.name, { className: "ecoregion-popup" })
            .on("click", function (e) {
              l3sidebar.setContent(`<h1>${ecoregion.name}</h1>
          <img height=300 width=300 src="https://source.unsplash.com/random/300x300/?desert" />
          <h2>Level 3 Ecoregion</h2>
          <p>${ecoregion.info}</p>
          <a style="color:gray" href="https://gaftp.epa.gov/epadatacommons/ORD/Ecoregions/tx/TXeco_Jan08_v8_Cmprsd.pdf">Reference: Griffith, Bryce, Omernick & Rodgers (2007). Ecoregions of Texas.</a>`);
              l3sidebar.show();
            })
            .addTo(level3Layer);
        }
        //add the layer to the map
        if (params.eco3Show === true) {
          map.addLayer(level3Layer);
        }

        //add layer to overlay so it can be toggled
        layerControl.addOverlay(level3Layer, "Level 3 Ecoregions");
      });
    };
    loadLevel3Ecos();

    //initialize sidebar
    const l3sidebar = L.control.sidebar("l3sidebar", {
      position: "left",
    });

    //add controls to sidebar
    map.addControl(l3sidebar);
  }

  /*
  *eco4Load* will load the level 3 ecoregion data.  Must be TRUE in order for eco4Show to work.

  *eco4Show* will automatically populate the map with the level 4 ecoregions.  If not selected, the ecoregions & legend (for level 3 ecoregions) will load, but will be toggled off & minimized respectively.
  */
  if (params.eco4Load === true) {
    //initialize ecoregion layer
    const level4Layer = new L.layerGroup();

    //add loading spinner while ecoregions load
    document.querySelector("#ecoregion_map").insertAdjacentHTML(
      "afterend",
      `<div id="level-4-loading">
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <p>Level 4 Ecoregions Loading</p>
        </div>`
    );

    const loadLevel4Ecos = async () => {
      const lvl4Promises = [];
      for (let eco of level4Eco) {
        try {
          let res = await fetch(
            `https://geodata.epa.gov/arcgis/rest/services/ORD/USEPA_Ecoregions_Level_III_and_IV/MapServer/7/query?where=US_L4CODE+%3D+%27${eco.id}%27&f=geojson`
          );
          let json = await res.json();
          //add ecoregion name so it can be bound to tooltip
          json.name = eco.name;
          json.style = eco.style;
          json.info = eco.info;
          lvl4Promises.push(json);
        } catch (error) {
          console.log(error);
        }
      }
      Promise.all(lvl4Promises).then((res) => {
        if (params.eco3Load === false && params.eco4Load === true) {
          document.querySelector(".spinner-container").hidden = true;
        }
        document.querySelector("#level-4-loading").style.display = "none";
        for (let ecoregion of res) {
          L.geoJSON(ecoregion, {
            className: "l4-layer-overlay",
            fillOpacity: 0.4,
            weight: 1,
            color: ecoregion.style,
          })
            //TODO currently uses unsplash filler images, needs to be updated in future with actual ecoregion pictures
            .bindTooltip(ecoregion.name, { className: "ecoregion-popup" })
            .on("click", function (e) {
              l4sidebar.setContent(`<h1>${ecoregion.name}</h1>
          <img height=300 width=300 src="https://source.unsplash.com/random/300x300/?desert" />
          <h2>Level 4 Ecoregion</h2>
          <p>${ecoregion.info}</p>
          <a style="color:gray" href="https://gaftp.epa.gov/epadatacommons/ORD/Ecoregions/tx/TXeco_Jan08_v8_Cmprsd.pdf">Reference: Griffith, Bryce, Omernick & Rodgers (2007). Ecoregions of Texas.</a>`);
              l4sidebar.show();
            })
            .addTo(level4Layer);
        }
        if (params.eco4Show === true) {
          //add the layer to the map
          map.addLayer(level4Layer);
        }

        //add layer to overlay so it can be toggled
        layerControl.addOverlay(level4Layer, "Level 4 Ecoregions");
      });
    };

    loadLevel4Ecos();

    const l4sidebar = L.control.sidebar("l4sidebar", {
      position: "right",
    });

    map.addControl(l4sidebar);
  }

  /*
  *chapterLoad* will load the chapter location pins & chapter counties to create a "heatmap".  Must be TRUE in order for eco3Show to work.

  *chapterShow* will automatically populate the map with the chapter location pins & chapter counties.  If not selected, the chapter location pins & chapter counties will load but will be toggled off.
  */
  if (params.chapterLoad === true) {
    const loadChapters = async () => {
      const chapterOptions = { ...iconOptions };
      chapterOptions.borderColor = "#3c5799";
      chapterOptions.textColor = "#3c5799";
      chapterOptions.icon = "users";

      //initialize layer for chapter pins
      const chapterPins = new L.LayerGroup();

      //initialize layer for chapter counties
      const chapterCounties = new L.LayerGroup();

      //storage for chapter counties
      const countyArr = [];

      //add loading spinner while ecoregions load
      document.querySelector("#ecoregion_map").insertAdjacentHTML(
        "afterend",
        `<div id="chapter-loading">
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <p>Chapters Loading</p>
        </div>`
      );

      try {
        const res = await fetch(
          `https://npsot.us/wp-json/wp/v2/pages?categories=97&_fields[]=acf&_fields[]=link&_fields[]=title&per_page=100`
        );
        const chapterJson = await res.json();
        chapterJson.forEach((ele) => {
          let tooltip = `<p class='map-item__popup'>${ele.title.rendered} Chapter</p>`;

          let popup = `<h3 class='chapter-title'><b>${
            ele.title.rendered
          } Chapter</b></h3><br>
          <a class='chapter-link' href=${ele.link}>Visit our Homepage</a>
          <p class='chapter-tag'>${ele.acf.ch_tag}</p>
          ${
            ele.acf.ch_email === ""
              ? ""
              : `<a class='chapter-link' href='mailto:${ele.acf.ch_email}'>Email Us</a><br>`
          }
          ${
            ele.acf.ch_fb === ""
              ? ""
              : `<a class='chapter-link' href='${ele.acf.ch_fb}' target='_blank'>Visit us on Facebook</a><br>`
          }
          ${
            ele.acf.ch_yt === ""
              ? ""
              : `<a class='chapter-link' href='${ele.acf.ch_yt}' target='_blank'>Check out our Youtube Channel</a><br>`
          }
          ${
            ele.acf.ch_tw === ""
              ? ""
              : `<a class='chapter-link' href='${ele.acf.ch_tw}' target='_blank'>Subscribe to our Twitter feed</a><br>`
          }
          ${
            ele.acf.ch_insta === ""
              ? ""
              : `<a class='chapter-link' href='${ele.acf.ch_insta}' target='_blank'>Follow us on Instagram</a><br>`
          }
          ${
            ele.acf.ch_other === ""
              ? ""
              : `<a class='chapter-link' href='${ele.acf.ch_other}' target='_blank'>You can also find us here</a><br>`
          }`;

          if (ele.acf.ch_loc !== null) {
            const marker = L.marker([ele.acf.ch_loc.lat, ele.acf.ch_loc.lng], {
              icon: L.BeautifyIcon.icon(chapterOptions),
            })
              .addTo(chapterPins)
              .bindPopup(popup)
              .bindTooltip(tooltip);

            OMS.addMarker(marker);
          }

          //load all the counties into an array
          if (ele.acf.ch_counties !== "") {
            countyArr.push(ele.acf.ch_counties.split(","));
          }
        });

        if (params.chapterShow === true) {
          map.addLayer(chapterPins);
        }
        layerControl.addOverlay(
          chapterPins,
          "<i class='fa-solid fa-users'></i> NPSOT Chapters"
        );
      } catch (error) {
        console.log(error);
      }

      const loadCounties = async () => {
        for (let county of countyArr.flat()) {
          const countyStyles = {
            fillOpacity: 0.3,
            weight: 0.5,
            color: "#3c5799",
          };

          const countyPromises = [];
          try {
            let response = await fetch(
              `https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/Texas_County_Boundaries/FeatureServer/0/query?where=CNTY_NM%20%3D%20'${county.trim()}'&outFields=GID,Shape__Area,Shape__Length,CNTY_NM&outSR=4326&f=geojson`
            );
            const countyJson = await response.json();
            countyPromises.push(countyJson);

            Promise.all(countyPromises).then((res) => {
              document.querySelector("#chapter-loading").style.display = "none";
              if (
                params.eco3Show !== true &&
                params.eco4Show !== true &&
                params.chapterLoad === true
              ) {
                document.querySelector(".spinner-container").hidden = true;
              }
              //skip chapters that do not have counties selected
              if (res[0].features.length === 0) return;

              for (let county of res) {
                L.geoJson(county.features[0].geometry, {
                  style: countyStyles,
                })
                  .bindTooltip(
                    `<b>${county.features[0].properties.CNTY_NM} County</b>`
                  )
                  .addTo(chapterCounties);
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
        if (params.chapterShow === true) {
          map.addLayer(chapterCounties);
        }
        layerControl.addOverlay(chapterCounties, "Chapter Counties");
      };
      loadCounties();
    };
    loadChapters();
  }
  //this will close and open the legend based on the level 3 ecoregion layer being toggled on or off.  commented out for now, but here for future reference
  // map.on("overlayadd", function (e) {
  //   if (e.name === "Level 3 Ecoregions") {
  //     document.querySelector(".lvl3legend").style.display = "block";
  //   }
  // });
  // map.on("overlayremove", function (e) {
  //   if (e.name === "Level 3 Ecoregions") {
  //     document.querySelector(".lvl3legend").style.display = "none";
  //   }
  // });

  /*
  *NICE* will load & show the NICE! Nursery Locations.
  
  *garden* will load & show the Chapter Demo Gardens.

  *monarch* will load & show the I-35 Monarch Waystations.

  *BBMT* will load & show the BBMT Texas Gardens.

  *native* will load & show the Where to See Native Plant locations.
  */

  if (
    params.NICE === true ||
    params.garden === true ||
    params.monarch === true ||
    params.BBMT === true ||
    params.native === true
  ) {
    let mapData;
    const mapArr = [];

    const url = "https://npsot.us/wp-json/wp/v2/map-item/?per_page=100";

    const fetchMapData = async () => {
      try {
        let mapRes = await fetch(url);
        let mapJSON = await mapRes.json();
        mapArr.push(mapJSON);
      } catch (error) {
        console.log(error);
      }
      mapData = await Promise.all(mapArr);

      //LOAD NICE NURSERY LOCATIONS
      if (params.NICE === true) {
        const loadNICE = () => {
          //initialize layer for NICE pins
          const NICEPins = new L.LayerGroup();

          const NICEOptions = { ...iconOptions };
          NICEOptions.textColor = "#E67E22";
          NICEOptions.borderColor = "#E67E22";
          NICEOptions.icon = "shop";

          const niceData = mapData[0].filter(
            (ele) => ele.acf.map_item_type === "NICE Partner"
          );

          for (nursery of niceData) {
            //pick color based on shipping
            nursery.acf.map_item_shipping === "Yes"
              ? (NICEOptions.backgroundColor = "rgba(0,0,0, 0.8)")
              : (NICEOptions.backgroundColor = "rgba(255,255,255,0.8)");

            //build tooltip
            let tooltip = `<p class='map-item__popup'>${nursery.title.rendered}</p>`;

            //build popup
            let popup = `<h3 class='map-item__title'>${
              nursery.title.rendered
            }</h3>
      ${
        nursery.acf.map_item_shipping === "Yes"
          ? "<p class='map-item__text'><b>We Ship!</b></p>"
          : ""
      }
      <a class='map-item__link' target='_blank' href=${
        nursery.acf.map_item_external_url
      }>Visit our Homepage</a>`;

            if (nursery.acf.map_item_associated_organization) {
              popup += `<hr><p class='map-item__text'><b>Associated Chapters</b></p>`;
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

            OMS.addMarker(marker);
          }

          map.addLayer(NICEPins);
          layerControl.addOverlay(
            NICEPins,
            "<i class='fa-solid fa-shop'></i> NICE! Nurseries"
          );
        };
        loadNICE();
      }
      //LOAD CHAPTER DEMO GARDENS
      if (params.garden === true) {
        const loadGarden = () => {
          //initialize layer for NICE pins
          const gardenPins = new L.LayerGroup();

          const gardenOptions = { ...iconOptions };
          gardenOptions.icon = "leaf";
          gardenOptions.textColor = "#5a703c";
          gardenOptions.borderColor = "#5a703c";
          gardenOptions.backgroundColor = "rgba(255,255,255,0.8)";

          const gardenData = mapData[0].filter(
            (ele) => ele.acf.map_item_type === "Chapter Demo Garden"
          );

          for (garden of gardenData) {
            //build tooltip
            let tooltip = `<p class='map-item__popup'>${garden.title.rendered}</p>`;

            //build popup
            let popup = `<h3 class='map-item__title'>${
              garden.title.rendered
            }</h3>
            <p class='map-item__text'>Address: ${
              garden.acf.map_item_loc.address
            } </p>
            <a class='map-item__link' target='_blank' href='${
              garden.link
            }'>Learn about this garden</a>
                              ${
                                garden.acf.map_item_external_url
                                  ? `<br><a class='map-item__link' target="_blank" href="${garden.acf.map_item_external_url}"'>Visit External Site</a>`
                                  : ""
                              }
            `;

            if (garden.acf.map_item_associated_organization) {
              popup += `<hr><p class='map-item__text'><b>Associated Chapters</b></p>`;
              garden.acf.map_item_associated_organization.forEach((ele) => {
                const chapter = ele.replace(/ +/g, "-").toLowerCase();
                popup += `<a class='map-item__link' href='https://npsot.us/chapter/${chapter}' target='_blank'>${ele}</a><br>`;
              });
            }

            const marker = L.marker(
              [garden.acf.map_item_loc.lat, garden.acf.map_item_loc.lng],
              {
                icon: L.BeautifyIcon.icon(gardenOptions),
              }
            )
              .addTo(gardenPins)
              .bindTooltip(tooltip)
              .bindPopup(popup);

            OMS.addMarker(marker);
          }

          map.addLayer(gardenPins);
          layerControl.addOverlay(
            gardenPins,
            "<i class='fa-solid fa-leaf'></i> Chapter Demo Gardens"
          );
        };
        loadGarden();
      }
      //LOAD I-35 WAYSTATIONS
      if (params.monarch === true) {
        const loadMonarch = () => {
          //initialize layer for NICE pins
          const monarchPins = new L.LayerGroup();

          const monarchOptions = { ...iconOptions };
          monarchOptions.icon = "road";
          monarchOptions.textColor = "#5D3FD3";
          monarchOptions.borderColor = "#5D3FD3";
          monarchOptions.backgroundColor = "rgba(255,255,255,0.8)";

          const monarchData = mapData[0].filter(
            (ele) => ele.acf.map_item_type === "I35 Monarch Station"
          );

          for (garden of monarchData) {
            //build tooltip
            let tooltip = `<p class='map-item__popup'>${garden.title.rendered}</p>`;

            //build popup
            let popup = `<h3 class='map-item__title'>${
              garden.title.rendered
            }</h3>
                  <p class='map-item__text'>Address: ${
                    garden.acf.map_item_loc.address
                  }</p>
                  ${
                    garden.acf.map_item_exit_number
                      ? `<p class='map-item__text'>Exit:  ${garden.acf.map_item_exit_number}</p>`
                      : ""
                  }
                  <br><a class='map-item__link' target='_blank' href='${
                    garden.link
                  }'>Learn about this waystation</a>
                                                ${
                                                  garden.acf
                                                    .map_item_external_url
                                                    ? `<br><a class='map-item__link' target="_blank" href="${garden.acf.map_item_external_url}"'>Visit External Site</a>`
                                                    : ""
                                                }`;

            if (garden.acf.map_item_associated_organization) {
              popup += `<hr><p class='map-item__text'><b>Associated Chapters</b></p>`;
              garden.acf.map_item_associated_organization.forEach((ele) => {
                const chapter = ele.replace(/ +/g, "-").toLowerCase();
                popup += `<a class='map-item__link' href='https://npsot.us/chapter/${chapter}' target='_blank'>${ele}</a><br>`;
              });
            }

            const marker = L.marker(
              [garden.acf.map_item_loc.lat, garden.acf.map_item_loc.lng],
              {
                icon: L.BeautifyIcon.icon(monarchOptions),
              }
            )
              .addTo(monarchPins)
              .bindTooltip(tooltip)
              .bindPopup(popup);

            OMS.addMarker(marker);
          }

          map.addLayer(monarchPins);
          layerControl.addOverlay(
            monarchPins,
            "<i class='fa-solid fa-road'></i> I-35 Monarch Waystations"
          );
        };
        loadMonarch();
      }
      //LOAD NATIVE PLANT GARDENS
      if (params.native === true) {
        const loadNativeGarden = () => {
          //initialize layer for NICE pins
          const gardenPins = new L.LayerGroup();

          const gardenOptions = { ...iconOptions };
          gardenOptions.icon = "camera";
          gardenOptions.textColor = "#c56a82";
          gardenOptions.borderColor = "#c56a82";
          gardenOptions.backgroundColor = "rgba(255,255,255,0.8)";

          const gardenData = mapData[0].filter(
            (ele) => ele.acf.map_item_type === "Native Plant Garden"
          );

          for (garden of gardenData) {
            //build tooltip
            let tooltip = `<p class='map-item__popup'>${garden.title.rendered}</p>`;

            //build popup
            let popup = `<h3 class='map-item__title'>${
              garden.title.rendered
            }</h3>
                        <p class='map-item__text'>Address: ${
                          garden.acf.map_item_loc.address
                        } </p>
                        <a class='map-item__link' target='_blank' href='${
                          garden.link
                        }'>Learn about this garden</a>
                          ${
                            garden.acf.map_item_external_url
                              ? `<br><a class='map-item__link' target="_blank" href="${garden.acf.map_item_external_url}">Visit External Site</a>`
                              : ""
                          }`;

            if (garden.acf.map_item_associated_organization) {
              popup += `<hr><p class='map-item__text'><b>Associated Organizations</b></p>`;
              garden.acf.map_item_associated_organization.forEach((ele) => {
                popup += `<p class='map-item__text'>${ele}</a><br>`;
              });
            }

            const marker = L.marker(
              [garden.acf.map_item_loc.lat, garden.acf.map_item_loc.lng],
              {
                icon: L.BeautifyIcon.icon(gardenOptions),
              }
            )
              .addTo(gardenPins)
              .bindTooltip(tooltip)
              .bindPopup(popup);

            OMS.addMarker(marker);
          }

          map.addLayer(gardenPins);
          layerControl.addOverlay(
            gardenPins,
            "<i class='fa-solid fa-camera'></i> Native Plant Gardens"
          );
        };
        loadNativeGarden();
        if (
          params.eco3Show !== true &&
          params.eco4Show !== true &&
          params.chapterLoad !== true
        ) {
          document.querySelector(".spinner-container").hidden = true;
        }
      }
    };
    fetchMapData();
  }

  /*
   *speaker* will load & show the speaker locations.
   */
  if (params.speaker === true) {
    const url = "https://npsot.us/wp-json/wp/v2/speaker_bureau/?per_page=100";

    const speakerArr = [];

    const fetchSpeakerData = async () => {
      try {
        let speakerRes = await fetch(url);
        let speakerJSON = await speakerRes.json();
        speakerArr.push(speakerJSON);
      } catch (error) {
        console.log(error);
      }
      const speakerData = await Promise.all(speakerArr);

      if (params.speaker) {
        //initialize layer for speaker pins
        const OMS = new OverlappingMarkerSpiderfier(map);
        const speakerPins = new L.LayerGroup();

        const speakerOptions = { ...iconOptions };
        speakerOptions.icon = "graduation-cap";
        speakerOptions.textColor = "#C41E3A";
        speakerOptions.borderColor = "#C41E3A";
        speakerOptions.backgroundColor = "rgba(255,255,255,0.8)";

        const allSpeakers = speakerData[0].filter(
          (ele) => ele.acf.speaker_post_type === "Speaker"
        );

        for (speaker of allSpeakers) {
          //build tooltip
          let tooltip = `<p class='map-item__popup' data-distance="${speaker.acf.driving_distance}" data-lat="${speaker.acf.speaker_location.lat}" data-lng="${speaker.acf.speaker_location.lng}">${speaker.title.rendered}</p>`;

          //build popup
          let popup = `<h3 class="map-item__title">${
            speaker.title.rendered
          }</h3>
      <p class="map-item__text">Lives in ${
        speaker.acf.speaker_location.city
      }</p>

      ${
        speaker.acf.driving_distance > 1
          ? `<p class='map-item__text'>Speaker will drive ${speaker.acf.driving_distance} miles</p>`
          : "<p class='map-item__text'>Speaker does not travel</p>"
      }

      <a class='map-item__link' target='_blank' href=${
        speaker.link
      }><b>View this Speaker's Info</b></a>`;

          if (speaker.acf.speaker_affiliation) {
            let speakerAffiliations =
              speaker.acf.speaker_affiliation.split(", ");
            popup += `<hr><p class='map-item__text'><b>Associated Organization${
              speakerAffiliations.length > 1 ? "s" : ""
            }</b></p>`;
            speakerAffiliations.forEach((ele) => {
              popup += `<p class='map-item__text'>${ele}</p>`;
            });
          }

          const marker = L.marker(
            [
              speaker.acf.speaker_location.lat,
              speaker.acf.speaker_location.lng,
            ],
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
          "<i class='fa-solid fa-graduation-cap'></i> Speakers Bureau"
        );
      }
    };
    fetchSpeakerData();
    if (
      params.eco3Show !== true &&
      params.eco4Show !== true &&
      params.chapterLoad !== true
    ) {
      document.querySelector(".spinner-container").hidden = true;
    }
  }
}

//this toggles the legend when the toggle legend button is clicked
const toggleLegend = () => {
  const legend = document.querySelector(".legend-items");
  legend.style.display === "none"
    ? (legend.style.display = "block")
    : (legend.style.display = "none");
};
