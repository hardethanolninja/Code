const map = L.map("chapter_map").setView([31.9686, -99.9018], 6);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 10,
  minZoom: 5,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const chapterList = [
  {
    title: "Kerrville",
    alt: "Kerrville Chapter Location",
    loc: [30.0474, -99.1403],
    homepage: "https://www.npsot.us/chapters/kerrville",
    email: "kerrville@npsot.org",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
  },
  {
    title: "San Antonio",
    alt: "San Antonio Chapter Location",
    loc: [29.4252, -98.4946],
    homepage: "https://www.npsot.us/chapters/san-antonio",
    email: "",
    fb: "",
    youtube: "",
    twitter: "",
    insta: "",
  },
  {
    title: "Austin",
    alt: "Austin Chapter Location",
    loc: [30.2672, -97.7431],
    homepage: "https://www.npsot.us/chapters/austin",
    email: "",
    fb: "austin.facebook.com",
    youtube: "",
    twitter: "",
    insta: "austin.insta.com",
  },
];

const iconUrl =
  "https://img.icons8.com/external-xnimrodx-blue-xnimrodx/64/000000/external-pin-event-and-party-xnimrodx-blue-xnimrodx.png";

const chapterIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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
}

`;

  L.marker(e.loc, { icon: chapterIcon }).addTo(map).bindPopup(popup);
});
