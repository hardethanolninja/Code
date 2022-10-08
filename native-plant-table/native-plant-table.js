//http://tabulator.info/

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
          minWidth: 100,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Other Common Names",
          field: "otherCommon",
          headerFilter: true,
          formatter: "textarea",
          minWidth: 100,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Scientific Name",
          field: "sciName",
          headerFilter: true,
          formatter: "textarea",
          minWidth: 100,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Ecoregion",
          field: "ecoRegion",
          headerFilter: true,
          formatter: "textarea",
          minWidth: 150,
          maxWidth: 200,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Growth Form",
          field: "growthForm",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Height",
          field: "height",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Spread",
          field: "spread",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Light",
          field: "light",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Water",
          field: "water",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Leaf Retention",
          field: "leafRet",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Lifespan",
          field: "lifespan",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Bloom Color",
          field: "bloomColor",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Bloom Season",
          field: "bloomSeason",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Seasonal Interest",
          field: "seasonalInt",
          headerFilter: true,
          formatter: "textarea",
          maxWidth: 200,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Wildlife Benefit",
          field: "wildlifeBen",
          headerFilter: true,
          formatter: "textarea",
          maxWidth: 200,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Soil",
          field: "soil",
          headerFilter: true,
          formatter: "textarea",
          maxWidth: 200,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Maintenence",
          field: "maint",
          headerFilter: true,
          formatter: "textarea",
          minWidth: 200,
          maxWidth: 500,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Comments",
          field: "comm",
          headerFilter: true,
          formatter: "textarea",
          minWidth: 200,
          maxWidth: 500,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
      ],
      data: tableData,
      layout: "fitColumns",
      // responsiveLayout: "collapse",
      movableColumns: true,
      // maxHeight: "100%",
      footerElement:
        "<button onclick='downloadTabulator()'>Download CSV</button>",
    });
  } catch (error) {
    console.log(error);
  }
};

var headerMenu = function () {
  var menu = [];
  var columns = this.getColumns();

  for (let column of columns) {
    //create checkbox element using font awesome icons
    let icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add(column.isVisible() ? "fa-check-square" : "fa-square");

    //build label
    let label = document.createElement("span");
    let title = document.createElement("span");

    title.textContent = " " + column.getDefinition().title;

    label.appendChild(icon);
    label.appendChild(title);

    //create menu item
    menu.push({
      label: label,
      action: function (e) {
        //prevent menu closing
        e.stopPropagation();

        //toggle current column visibility
        column.toggle();

        //change menu item icon
        if (column.isVisible()) {
          icon.classList.remove("fa-square");
          icon.classList.add("fa-check-square");
        } else {
          icon.classList.remove("fa-check-square");
          icon.classList.add("fa-square");
        }
      },
    });
  }

  return menu;
};

//run function
getNativePlantData();

function downloadTabulator() {
  table.download("csv", "plant-list.csv");
}
