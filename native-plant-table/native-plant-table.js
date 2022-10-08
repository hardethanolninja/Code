const tableData = [];
let table;

const getNativePlantData = async () => {
  const url = `https://npsot.us/wp-json/wp/v2/native-plant/?per_page=100`;

  //query for native plant data
  try {
    const res = await fetch(url);
    const numPages = res.headers.get("X-WP-TotalPages");
    const json = await res.json();

    const allPosts = json;
    if (numPages > 1) {
      for (let i = 2; i < numPages + 1; i++) {
        const res = await fetch(url + `?page=${i}`);
        const json = await res.json();
        allPosts += json;
      }
    }

    // console.log("total pages", numPages);

    for (let [ind, plant] of allPosts.entries()) {
      tableData.push({
        id: `${ind}`,
        commonName: `${plant.title.rendered}`,
        otherCommon: `${plant.acf.other_common_names}`,
        sciName: `${plant.acf.scientific_name}`,
        ecoRegion: `${plant.acf.ecoregion.join(", ")}`,
        growthForm: `${plant.acf.growth_form}`,
        height: `${plant.acf.height}`,
        spread: `${plant.acf.spread}`,
        light: `${plant.acf.light.join(", ")}`,
        water: `${plant.acf.water.join(", ")}`,
        leafRet: `${plant.acf.leaf_retention}`,
        lifespan: `${plant.acf.lifespan}`,
        bloomColor: `${plant.acf.blooming_color.join(", ")}`,
        bloomSeason: `${plant.acf.blooming_season.join(", ")}`,
        seasonalInt: `${
          plant.acf.seasonal_interest.length > 1
            ? plant.acf.seasonal_interest.join(", ")
            : plant.acf.seasonal_interest
        }`,
        wildlifeBen: `${
          plant.acf.wildlife_benefit.length > 1
            ? plant.acf.wildlife_benefit.join(", ")
            : plant.acf.wildlife_benefit
        }`,
        soil: `${plant.acf.soil_type.join(", ")}`,
        maint: `${plant.acf.maintenence}`,
        comm: `${plant.acf.comments}`,
      });
    }

    table = new Tabulator("#tabulator-table", {
      columns: [
        {
          title: "Common Name",
          field: "commonName",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Other Common Names",
          field: "otherCommon",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Scientific Name",
          field: "sciName",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Ecoregion",
          field: "ecoRegion",
          headerFilter: true,
          formatter: "textarea",
          maxWidth: 200,
        },
        {
          title: "Growth Form",
          field: "growthForm",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Height",
          field: "height",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Spread",
          field: "spread",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Light (exact filter)",
          field: "light",
          headerFilter: true,
          headerFilterFunc: "=",
          formatter: "textarea",
        },
        {
          title: "Water",
          field: "water",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Leaf Retention",
          field: "leafRet",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Lifespan",
          field: "lifespan",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Bloom Color",
          field: "bloomColor",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Bloom Season",
          field: "bloomSeason",
          headerFilter: true,
          formatter: "textarea",
        },
        {
          title: "Seasonal Interest",
          field: "seasonalInt",
          headerFilter: true,
          formatter: "textarea",
          maxWidth: 200,
        },
        {
          title: "Wildlife Benefit",
          field: "wildlifeBen",
          headerFilter: true,
          formatter: "textarea",
          maxWidth: 200,
        },
        {
          title: "Soil",
          field: "soil",
          headerFilter: true,
          formatter: "textarea",
          maxWidth: 200,
        },
        {
          title: "Maintenence",
          field: "maint",
          headerFilter: true,
          formatter: "textarea",
          minWidth: 350,
          maxWidth: 500,
        },
        {
          title: "Comments",
          field: "comm",
          headerFilter: true,
          formatter: "textarea",
          minWidth: 350,
          maxWidth: 500,
        },
      ],
      data: tableData,
      layout: "fitColumns",
      // maxHeight: "100%",
      footerElement:
        "<button onclick='downloadTabulator()'>Download CSV</button>",
    });
  } catch (error) {
    console.log(error);
  }
};

//run function
getNativePlantData();

function downloadTabulator() {
  table.download("csv", "plant-list.csv");
}
