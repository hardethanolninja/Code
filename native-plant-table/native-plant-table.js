const getNativePlantData = async () => {
  const url = `https://npsot.us/wp-json/wp/v2/native-plant`;
  //query for native plant data
  try {
    const res = await fetch(url);
    const json = await res.json();

    //loop through data
    for (let plant of json) {
      const newRow = document.getElementById("native-plant-table").insertRow();
      newRow.innerHTML = `
      <td>${plant.title.rendered}</td>
      <td>${plant.acf.other_common_names}</td>
      <td>${plant.acf.scientific_name}</td>
      <td>${
        plant.acf.ecoregion.length > 1
          ? plant.acf.ecoregion.join(", ")
          : plant.acf.ecoregion
      }</td>
      <td>${plant.acf.growth_form}</td>
      <td>${plant.acf.height}</td>
      <td>${plant.acf.spread}</td>
      <td>${
        plant.acf.light.length > 1
          ? plant.acf.light.join(", ")
          : plant.acf.light
      }</td>
      <td>${
        plant.acf.water.length > 1
          ? plant.acf.water.join(", ")
          : plant.acf.water
      }</td>
      <td>${plant.acf.leaf_retention}</td>
      <td>${plant.acf.lifespan}</td>
      <td>${
        plant.acf.blooming_season.length > 1
          ? plant.acf.blooming_season.join(", ")
          : plant.acf.blooming_season
      }</td>
      <td>${
        plant.acf.blooming_color.length > 1
          ? plant.acf.blooming_color.join(", ")
          : plant.acf.blooming_color
      }</td>
      <td>${
        plant.acf.seasonal_interest.length > 1
          ? plant.acf.seasonal_interest.join(", ")
          : plant.acf.seasonal_interest
      }</td>
      <td>${
        plant.acf.wildlife_benefit.length > 1
          ? plant.acf.wildlife_benefit.join(", ")
          : plant.acf.wildlife_benefit
      }</td>
      <td>${
        plant.acf.soil_type.length > 1
          ? plant.acf.soil_type.join(", ")
          : plant.acf.soil_type
      }</td>
      <td>${plant.acf.maintenence}</td>
      <td>${plant.acf.comments}</td>
      `;
    }
  } catch (error) {
    console.log(error);
  }
};

//run function
getNativePlantData();
