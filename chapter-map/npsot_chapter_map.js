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

  L.marker(e.loc, { icon: chapterIcon }).addTo(map).bindPopup(popup);

  const loadCounties = async () => {
    for (let county of e.county) {
      const countyStyles = { fillOpacity: 0.3, weight: 0.5, color: "green" };
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
                .addTo(map);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (e.county[0] !== null) loadCounties();
});
