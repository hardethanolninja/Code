const arr = [
  "23a",
  "23b",
  "24a",
  "24b",
  "24c",
  "24d",
  "24e",
  "25b",
  "25e",
  "25i",
  "25j",
  "25k",
  "26a",
  "26b",
  "26c",
  "26d",
  "27h",
  "27i",
  "27j",
  "29b",
  "29c",
  "29d",
  "29e",
  "29f",
  "30a",
  "30b",
  "30c",
  "30d",
  "31a",
  "31b",
  "31c",
  "31d",
  "32a",
  "32b",
  "32c",
  "33a",
  "33b",
  "33c",
  "33d",
  "33e",
  "33f",
  "34a",
  "34b",
  "34c",
  "34d",
  "34e",
  "34f",
  "34g",
  "34h",
  "34i",
  "35a",
  "35b",
  "35c",
  "35e",
  "35f",
  "35g",
];

console.log(arr.length);

const ecoNames = [];

for (ele of arr) {
  const getData = async () => {
    const queryURL = `https://geodata.epa.gov/arcgis/rest/services/ORD/USEPA_Ecoregions_Level_III_and_IV/MapServer/7/query?where=US_L4CODE+%3D+%27${ele}%27&f=pjson`;
    try {
      const res = await fetch(queryURL);
      const json = await res.json();
      ecoNames.push(json.features[0].attributes);
    } catch (error) {
      console.log(error);
    }
  };
  getData();
}
