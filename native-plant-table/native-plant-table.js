//http://tabulator.info/

const tableData = [];
let table;

const getNativePlantData = async () => {
  const url = `https://npsot.us/wp-json/wp/v2/native-plant/?per_page=100`;

  // query for native plant data
  try {
    const res = await fetch(url);
    const numPages = res.headers.get("X-WP-TotalPages") * 1;
    const json = await res.json();
    let allPosts = json;

    if (numPages > 1) {
      for (let i = 2; i < numPages + 1; i++) {
        const res = await fetch(url + `&page=${i}`);
        const json = await res.json();
        allPosts = [...allPosts, ...json];
      }
    }

    for (let [ind, plant] of allPosts.entries()) {
      tableData.push({
        id: `${ind}`,
        commonName: `${plant.acf.common_name}`,
        otherCommon: `${plant.acf.other_common_names}`,
        sciName: `${plant.title.rendered}`,
        ecoRegion: `${
          plant.acf.ecoregion.length > 1
            ? plant.acf.ecoregion.join(", ")
            : plant.acf.ecoregion
        }`,
        growthForm: `${plant.acf.growth_form}`,
        minHeight: `${plant.acf.min_height}`,
        maxHeight: `${plant.acf.max_height}`,
        minSpread: `${plant.acf.min_spread}`,
        maxSpread: `${plant.acf.max_spread}`,
        light: `${
          plant.acf.light.length > 1
            ? plant.acf.light.join(", ")
            : plant.acf.light
        }`,
        water: `${
          plant.acf.water.length > 1
            ? plant.acf.water.join(", ")
            : plant.acf.water
        }`,
        leafRet: `${plant.acf.leaf_retention}`,
        lifespan: `${plant.acf.lifespan}`,
        bloomColor: `${
          plant.acf.blooming_color.length > 1
            ? plant.acf.blooming_color.join(", ")
            : plant.acf.blooming_color
        }`,
        bloomSeason: `${
          plant.acf.blooming_season.length > 1
            ? plant.acf.blooming_season.join(", ")
            : plant.acf.blooming_season
        }`,
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
        soil: `${
          plant.acf.soil_type.length > 1
            ? plant.acf.soil_type.join(", ")
            : plant.acf.soil_type
        }`,
        maint: `${plant.acf.maintenance}`,
        comm: `${plant.acf.comments}`,
        plantLink: `${plant.link}`,
      });
    }
    // console.log(tableData);

    table = new Tabulator("#tabulator-table", {
      initialSort: [{ column: "commonName", dir: "asc" }],
      columns: [
        { formatter: "rownum", width: 40 },
        {
          title: "Growth Form",
          field: "growthForm",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Common Name",
          field: "commonName",
          headerFilter: true,
          minWidth: 100,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
          formatter: "link",
          formatterParams: {
            target: "_blank",
            labelField: "commonName",
            urlField: "plantLink",
          },
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
          minWidth: 100,
          maxWidth: 200,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },

        {
          title: "Min Height",
          field: "minHeight",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Max Height",
          field: "maxHeight",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Min Spread",
          field: "minSpread",
          headerFilter: true,
          formatter: "textarea",
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Max Spread",
          field: "maxSpread",
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
          title: "Bloom Season",
          field: "bloomSeason",
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
          title: "Seasonal Interest",
          field: "seasonalInt",
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
          title: "Wildlife Benefit",
          field: "wildlifeBen",
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
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
        {
          title: "Comments",
          field: "comm",
          headerFilter: true,
          formatter: "textarea",
          minWidth: 200,
          headerMenu: headerMenu,
          headerFilterPlaceholder: "Filter this field...",
        },
      ],
      data: tableData,
      layout: "fitColumns",
      // responsiveLayout: "collapse",
      movableColumns: true,
      maxHeight: "100%",
      footerElement:
        "<button onclick='downloadCSV()'>Download CSV</button><button onclick='downloadExcel()'>Download XLSX</button>",
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

//filter function for top of table
const HSfieldEl = document.getElementById("hs-filter-field");
const HStypeEl = document.getElementById("hs-filter-type");
const HSvalueEl = document.getElementById("hs-filter-value");

function bigTrees() {
  table.setFilter([
    { field: "growthForm", type: "=", value: "Tree" },
    { field: "maxHeight", type: ">=", value: 25 },
  ]);
}
function smallTrees() {
  table.setFilter([
    { field: "growthForm", type: "=", value: "Tree" },
    { field: "maxHeight", type: "<", value: 25 },
  ]);
}
function lowWater() {
  table.setFilter([{ field: "water", type: "=", value: "Low" }]);
}

function updateFilter() {
  const filterVal = HSfieldEl.options[HSfieldEl.selectedIndex].value;
  const typeVal = HStypeEl.options[HStypeEl.selectedIndex].value;

  const filter = filterVal == "function" ? customFilter : filterVal;

  if (filterVal == "function") {
    HStypeEl.disabled = true;
    HSvalueEl.disabled = true;
  } else {
    HStypeEl.disabled = false;
    HSvalueEl.disabled = false;
  }

  if (filterVal) {
    table.setFilter(filter, typeVal, HSvalueEl.value);
  }
}

//Update filters on value change
document
  .getElementById("hs-filter-field")
  .addEventListener("change", updateFilter);
document
  .getElementById("hs-filter-type")
  .addEventListener("change", updateFilter);
document
  .getElementById("hs-filter-value")
  .addEventListener("keyup", updateFilter);

//Clear filters on "Clear Filters" button click
document.getElementById("filter-clear").addEventListener("click", function () {
  HSfieldEl.value = "";
  HStypeEl.value = "=";
  HSvalueEl.value = "";

  table.clearFilter();
});

//run function
getNativePlantData();

function downloadCSV() {
  table.download("csv", "plant-list.csv");
}
function downloadExcel() {
  table.download("xlsx", "plant-list.xlsx", { sheetName: "Plant List" });
}
