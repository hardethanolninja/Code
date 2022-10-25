function npsotEcoMap(
  [eco3Load, eco3Show],
  [eco4Load, eco4Show],
  [chapterLoad, chapterShow]
) {
  let map = L.map("ecoregion_map", { zoomSnap: 0.25 }).setView(
    [31.75, -99.9],
    5.75
  );

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 10,
      minZoom: 5,
      attribution:
        "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
    }
  ).addTo(map);

  //array of level 3 ecoregion objects.  ID is for the epa.gov API.
  const level3Eco = [
    {
      name: "Chihuahuan Deserts",
      id: 24,
      style: "red",
      info: "This desert ecoregion extends from the Madrean Archipelago in southeastern Arizona to the Edwards Plateau in south-central Texas. The    physiography of the region is generally a continuation of basin and range terrain (excluding the Stockton Plateau) that is typical of the Mojave Basin    and Range  and the Central Basin and Range  ecoregions to the west and north, although the pattern of alternating mountains and valleys is not as pronounced as it is in the Mojave Basin and Range and the Central Basin and Range. The mountain ranges are a geologic mix of faulted limestone reefs, volcanoes and associated basalt, rhyolite, and tuff extrusive rocks. Outside the major river drainages, such as the Rio Grande and Pecos River, the landscape is largely internally drained. Vegetative cover is predominantly semi-desert grassland and arid shrubland, except for high elevation islands of oak, juniper, and pinyon pine woodland. The extent of desert shrubland is increasing across lowlands and mountain foothills due to gradual desertification caused in part by historical grazing pressure.",
    },
    {
      name: "High Plains",
      id: 25,
      style: "cornflowerblue",
      info: "The High Plains ecoregion is higher and drier than the Central Great Plains to the east. And, in contrast to the characteristic irregular rangeland of the Northwestern Great Plains to the north in the Dakotas and eastern Montana and Wyoming, much of the High Plains is expressed as smooth to slightly irregular plains with a high percentage of cropland. The potential natural vegetation in this region is grama-buffalo grass compared to mostly wheatgrass-needlegrass to the north, Trans-Pecos shrub savanna to the south, and tallgrass prairie to the east (Kuchler 1964, 1970). The northern boundary of this ecological region is also the approximate northern limit of winter wheat and sorghum and the southern limit of spring wheat. The ecoregion includes the plains area of the Llano Estacado. Thousands of playa lakes (seasonal depressional wetlands) occur in this area, many serving as recharge areas for the important Ogallala Aquifer. These playa lakes are also essential for waterfowl during their yearly migration along the Central Flyway of North America. Oil and gas production occurs in many parts of the region.",
    },
    {
      name: "Southwestern Tablelands",
      id: 26,
      style: "orange",
      info: "The Southwestern Tablelands flank the High Plains with red hued canyons, mesas, badlands, and dissected river breaks. Unlike most adjacent Great Plains ecological regions, little of the Southwestern Tablelands are in cropland. Much of this region is in sub-humid grassland and semiarid rangeland. The potential natural vegetation in this region is grama-buffalo grass with some mesquite-buffalo grass in the southeast, juniper-scrub oak-midgrass savanna on escarpment bluffs, and shinnery (midgrass prairie with low oak brush) along parts of the Canadian River. Soils in this region include Alfisols, Inceptisols, Entisols, and Mollisols.",
    },
    {
      name: "Central Great Plains",
      id: 27,
      style: "chocolate",
      info: "The Central Great Plains are slightly lower, receive more precipitation, and are more irregular than the High Plains to the west. The ecological region was once grassland, a mixed or transitional prairie from the tallgrass in the east to shortgrass farther west. Scattered low trees and shrubs occur in the south. Most of the ecoregion is now cropland. The eastern boundary of the region marks the eastern limits of the major winter wheat growing area of the United States. Soils in this region are generally deep with shallow soils on ridges and breaks.",
    },
    {
      name: "Cross Timbers",
      id: 29,
      style: "green",
      info: "The Cross Timbers ecoregion is a transitional area between the once prairie, now winter wheat growing regions to the west, and the forested low mountains or hills of eastern Oklahoma and Texas. The region stretches from southern Kansas into central Texas, and contains irregular plains with some low hills and tablelands. It is a mosaic of forest, woodland, savanna, and prairie. The Cross Timbers ecoregion is not as arable or as suitable for growing corn and soybeans as the Central Irregular Plains to the northeast. The transitional natural vegetation of little bluestem grassland with scattered blackjack oak and post oak trees is used mostly for rangeland and pastureland, with some areas of woody plant invasion and closed forest. Oil production has been a major activity in this region for over eighty years.",
    },
    {
      name: "Edwards Plateau",
      id: 30,
      style: "olive",
      info: "This ecoregion is largely a dissected limestone plateau that is hillier to the south and east where it is easily distinguished from bordering ecological regions by a sharp fault line. The region contains a sparse network of perennial streams. Due to karst topography (related to dissolution of limestone substrate) and resulting underground drainage, streams are relatively clear and cool in temperature compared to those of surrounding areas. Soils in this region are mostly Mollisols with shallow and moderately deep soils on plateaus and hills, and deeper soils on plains and valley floors. Covered by juniper-oak savanna and mesquite-oak savanna, most of the region is used for grazing beef cattle, sheep, goats, exotic game mammals, and wildlife. Hunting leases are a major source of income. Combined with topographic gradients, fire was once an important factor controlling vegetation patterns on the Edwards Plateau. It is a region of many endemic vascular plants. With its rapid seed dispersal, low palatibility to browsers, and in the absence of fire, Ashe juniper has increased in some areas, reducing the extent of grassy savannas.",
    },
    {
      name: "Southern Texas Plains",
      id: 31,
      style: "indigo",
      info: "These rolling to moderately dissected plains were once covered in many areas with grassland and savanna vegetation that varied during wet and dry cycles. Following long continued grazing and fire suppression, thorny brush, such as mesquite, is now the predominant vegetation type. Ceniza and blackbrush occur on caliche soils. Also known as the Tamualipan Thornscrub, or the “brush country” as it is called locally, the region has its greatest extent in Mexico. The subhumid to dry region contains a diverse mosaic of soils, mostly clay, clay loam, and sandy clay loam surface textures, and ranging from alkaline to slightly acid. The ecoregion also contains a high and distinct diversity of plant and animal life. It is generally lower in elevation with warmer winters than the Chihuahuan Deserts to the northwest. Oil and natural gas production activities are widespread.",
    },
    {
      name: "Texas Blackland Prairies",
      id: 32,
      style: "black",
      info: "The Texas Blackland Prairies form a disjunct ecological region, distinguished from surrounding regions by fine-textured, clayey soils and predominantly prairie potential natural vegetation. The predominance of Vertisols in this area is related to soil formation in Cretaceous shale, chalk, and marl parent materials. Unlike tallgrass prairie soils that are mostly Mollisols in states to the north, this region contains Vertisols, Alfisols, and Mollisols. Dominant grasses included little bluestem, big bluestem, yellow Indiangrass, and switchgrass. This region now contains a higher percentage of cropland than adjacent regions; pasture and forage production for livestock is common. Large areas of the region are being converted to urban and industrial uses. Before Anglo settlement, animal species included bison, pronghorn antelope, mountain lion, bobcat, ocelot, black bear, collared peccary, deer, coyote, fox, badger, and river otter among others (Schmidley 2002, Diggs et al.,1999). Typical game species today include mourning dove and northern bobwhite on uplands and eastern fox squirrel along stream bottomlands.",
    },
    {
      name: "East Central Texas Plains",
      id: 33,
      style: "skyblue",
      info: "Also called the Post Oak Savanna or the Claypan Area, this region of irregular plains was originally covered by post oak savanna vegetation, in contrast to the more open prairie-type regions to the north, south, and west, and the pine forests to the east. The boundary with Ecoregion 35 is a subtle transition of soils and vegetation. Soils are variable among the parallel ridges and valleys, but tend to be acidic, with sands and sandy loams on the uplands and clay to clay loams in low-lying areas. Many areas have a dense, underlying clay pan affecting water movement and available moisture for plant growth. The bulk of this region is now used for pasture and range.",
    },
    {
      name: "Gulf Coast Prairies and Marshes",
      id: 34,
      style: "royalblue",
      info: "In the Sep 2012 TPWD Texas Conservation Action Plan (TCAP), this ecoregion was renamed from South Central Plains (35) (Griffith et. al. 2007, North American Commission for Environmental Cooperation 2011). Here we use the TPWD TCAP names.<br><hr><p>Gulf Coast Prairies and Marshes is a relatively flat strip of land, generally 50 to 90 miles wide, adjacent to the Gulf of Mexico. The principal distinguishing characteristics of this ecoregion are its relatively flat topography and mainly grassland potential natural vegetation. Inland from this region the plains are older, more irregular, and have mostly forest or savanna-type vegetation potentials. Largely because of these characteristics, a higher percentage of the land is in cropland than in bordering ecological regions. Rice, grain sorghum, cotton, and soybeans are the principal crops. Urban and industrial land uses have expanded greatly in recent decades, and oil and gas production is common.</p>",
    },
    {
      name: "Western Gulf Coastal Plain",
      id: 35,
      style: "salmon",
      info: "In the Sep 2012 TPWD Texas Conservation Action Plan (TCAP), this ecoregion was renamed from South Central Plains (35) (Griffith et. al. 2007, North American Commission for Environmental Cooperation 2011). Here we use the TPWD TCAP names.<br><hr><p>Locally termed the “piney woods”, this region of mostly irregular plains represents the western edge of the southern coniferous forest belt. Once blanketed by a mix of pine and hardwood forests, much of the region is now in loblolly and shortleaf pine plantations. Soils are mostly acidic sands and sandy loams. Covering parts of Louisiana, Arkansas, east Texas, and Oklahoma, only about one sixth of the region is in cropland, primarily within the Red River floodplain, while about two thirds of the region is in forests and woodland. Lumber, pulpwood, oil, and gas production are major economic activities.</p>",
    },
  ];

  //array of level 4 ecoregion objects
  const level4Eco = [
    {
      name: "Chihuahuan Desert Slopes",
      id: "23a",
      style: "yellow",
      info: "The Chihuahuan Desert Slopes of the Guadalupe Mountains in Texas form the leading edge of a giant uplifted Permian reef created from the accumulated remains of algae, sponges, and marine bivalves. The 2000 foot high, white cliff face of the southern Guadalupe Mountains dominates the landscape of the northern Trans-Pecos of Texas. The lower slopes of the mountains, composed of eroded limestone, shale, and sandstone, represent a continuation of the Chihuahuan Desert ecosystem; soils and vegetation in much of Ecoregion 23a are similar to those in the Low Mountains and Bajadas (24c) of the Chihuahuan Deserts ecoregion (24). There is some evidence that the lower Guadalupe Mountains were once grasslands overgrazed in the late 19th century and subsequently invaded by desert shrubs. Yucca, sotol, lechuguilla, ocotillo, and cacti now dominate the rocky slopes below 5500 feet. These shrub species are sometimes called succulent desert shrubs to distinguish them from shrubs such as creosotebush typically found in the drier Chihuahuan Basins and Playas (24a). Grasslands persist near alluvial fans and on gentle slopes with deeper, sandstone-derived soils. Water is scarce; the few streams that originate from springs at higher elevations do not persist beyond the mouths of major canyons. Several lizard species that are adapted to the exposed, sun-baked landscape of West Texas are indicative of the succulent desert shrubland: the round-tailed horned lizard, the checkered whiptail, and the greater earless lizard.",
      img: "",
    },
    {
      name: "Montane Woodlands",
      id: "23b",
      style: "yellow",
      info: "The Montane Woodlands ecoregion covers the higher slopes of the Guadalupe Mountains above 5500 feet with densities of juniper, pinyon pine, and oak varying according to aspect. At middle elevations, a chaparral community occurs beneath the trees, composed of shrubs such as desert ceanothus, alderleaf mountain mahogany, and catclaw mimosa. The top of the plateau is grassy and park-like with scattered trees. A limited area of  Douglas-fir, southwestern white pine, and ponderosa pine appears at the highest elevations, forming an outlier of the type of forests that prevail at similar elevations elsewhere in the Arizona/New Mexico Mountains (23) where more moisture is available. However, these patches of high elevation conifers are too small to map at this scale. The east and west faces of the Guadalupe Mountains are cut by a series of canyons. Surface water is scarce. Infiltrating rainfall percolates through the limestone, creating caverns throughout the range and a few springs that emerge from sandstone layers at 6000 feet or below. The canyons support a high number of endemic plant species due in part to their isolation as relics of a wetter climate. McKittrick Creek is considered a perennial stream, although it often runs underground and ends at the mouth of its canyon. The riparian areas surrounding the springs are oases of velvet ash, chinkapin oak, Texas madrone, bigtooth maple, maidenhair fern, and sawgrass. Mule deer, reintroduced elk, black bear, mountain lion, and the only chipmunk in Texas, the gray-footed chipmunk, are protected within Guadalupe Mountains National Park.",
      img: "",
    },
    {
      name: "Chihuahuan Basins & Playas",
      id: "24a",
      style: "red",
      info: "The Chihuahuan Basins and Playas ecoregion includes alluvial fans, internally drained basins, and river valleys below 3500 feet. The major Chihuahuan basins in Ecoregion 24a, such as the Hueco, Salt, and Presidio basins, formed during the Basin and Range tectonism when the Earth’s crust stretched and fault collapse resulted in sediment-filled basins. These low elevation areas represent the hottest and most arid habitats in Texas, with less than 12 inches of precipitation per year. Precipitation amounts are highest in July, August, and September, and winter precipitation is relatively sparse. The playas and basin floors have saline or alkaline soils and areas of salt flats, dunes, and windblown sand. The typical desert shrubs and grasses growing in these environments, such as creosotebush, tarbush, fourwing saltbush, blackbrush, gyp grama, and alkali sacaton, must withstand large diurnal ranges in temperature, low available moisture, and an extremely high evapotranspiration rate. The alien saltcedar and common reed have invaded riparian areas. Land use, particularly grazing, is limited in desert areas due to sparse vegetation and lack of water. However, limited areas of agriculture exist near El Paso and Dell City, where irrigation water is available to produce cotton, pecans, alfalfa, tomatoes, onions, and chile peppers.",
      img: "",
    },
    {
      name: "Chihuahuan Desert Grasslands",
      id: "24b",
      style: "red",
      info: "The Chihuahuan Desert Grasslands occur in areas of fine-textured soils, such as silts and clays, that have a higher water retention capacity than coarse-textured, rocky soil. The grasslands occur in areas of somewhat higher annual precipitation (10 to 18 inches) than the Chihuahuan Basins and Playas (24a), such as elevated basins between mountain ranges, low mountain benches and plateau tops, and north-facing high mountain slopes. Grasslands in West Texas were once more widespread, but grazing pressure in the late 19th and early 20th centuries was unsustainable, and desert shrubs invaded where the grass cover became fragmented. In grassland areas with lower rainfall, areal coverage of grasses may be sparse, 10% or less. Typical grasses are black, blue, and sideoats grama, bush muhly, tobosa, beargrass, and galleta, with scattered creosotebush and cholla cactus. Effective management strategies for grasslands take into account their fragile and erosive nature.",
      img: "",
    },
    {
      name: "Low Mountains & Bajadas",
      id: "24c",
      style: "red",
      info: "The Low Mountains and Bajadas ecoregion includes disjunct areas scattered across West Texas that have a mixed geology: Permian-age sandstone, limestone, and shale in the Apache and Delaware Mountains; Cretaceous-age limestone on the Stockton Plateau and southward along the Rio Grande; and Tertiary-age volcanic rocks in the Chisos and Davis Mountains. The mountainous terrain has shallow soil, exposed bedrock, and coarse rocky substrates. Alluvial fans of rubble, sand, and gravel build at the base of the mountains and often coalesce to form bajadas. Vegetation includes mostly desert shrubs, such as sotol, lechuguilla, yucca, ocotillo, lotebush, tarbush, and pricklypear, with a sparse intervening cover of black grama and other grasses. At higher elevations, there may be scattered one-seeded juniper and pinyon pine. Strips of gray oak, velvet ash, and little walnut etch the patterns of intermittent and ephemeral drainages, and oaks may spread up north-facing slopes from the riparian zones. The varied habitats provide cover for mule deer, bobcat, collared peccary, and Montezuma quail.",
      img: "",
    },
    {
      name: "Chihuahuan Montane Woodlands",
      id: "24d",
      style: "red",
      info: "Mountains. The mountainous terrain has shallow soil, exposed bedrock, and coarse rocky substrates. Alluvial fans of rubble, sand, and gravel build at the base of the mountains and often coalesce to form bajadas. Vegetation includes mostly desert shrubs, such as sotol, lechuguilla, yucca, ocotillo, lotebush, tarbush, and pricklypear, with a sparse intervening cover of black grama and other grasses. At higher elevations, there may be scattered one-seeded juniper and pinyon pine. Strips of gray oak, velvet ash, and little walnut etch the patterns of intermittent and ephemeral drainages, and oaks may spread up north-facing slopes from the riparian zones. The varied habitats provide cover for mule deer, bobcat, collared peccary, and Montezuma quail.",
      img: "",
    },
    {
      name: "Stockton Plateau",
      id: "24e",
      style: "red",
      info: "The Stockton Plateau ecoregion is similar geologically to the Edwards Plateau (30), but it differs ecologically. Geologically, it is a continuation of the Cretaceous-age limestone that forms the Edwards Plateau, but it is located west of the Pecos River in the dry climatic conditions of West Texas. The character of Ecoregion 24e is transitional to the arid grassland and desert shrub habitats of the Chihuahuan Desert to the west. Its mesa topography is more sharply defined than the rounded profiles of hills in the Edwards Plateau due to a lack of precipitation and associated chemical weathering. The mesa tops are sparsely covered by honey mesquite brush and either redberry or Ashe juniper. Mohr oak and Vasey oak, both shrubby in growth form, replace the plateau live oak that is common on the Edwards Plateau. The lower elevations on the Stockton Plateau are covered with Chihuahuan Desert shrubs and grama grasses.",
      img: "",
    },
    {
      name: "Rolling Sand Plains",
      id: "25b",
      style: "cornflowerblue",
      info: "The Rolling Sand Plains expand northward from the lip of the Canadian River trough, and they are topographically expressed as flat sandy plains or rolling dunes. In northern Texas, the vegetative cover of the Rolling Sand Plains is transitional between the Shinnery Sands (25j) to the south and the sandsage prairies of Oklahoma and Kansas. Havard shin oak, the characteristic shrub cover of the Shinnery Sands, still grows in the Texas portion of Ecoregion 25b, but it is at the northern limit of its distribution. However, both Havard shin oak and sand sagebrush perform the same important function of stabilizing sandy areas subject to wind erosion. The goal of both agricultural and grazing management is to keep enough vegetative cover on the land surface to minimize wind erosion. The sandsage association includes grasses such as big sandreed, little bluestem, sand dropseed, and sand bluestem. Lesser prairie-chickens use both shin oak and sandsage prairie habitats, but are presently imperiled due to agricultural conversion to modern farming practices as well as intensive grazing.",
      img: "",
    },
    {
      name: "Canadian/Cimarron High Plains",
      id: "25e",
      style: "cornflowerblue",
      info: "The Canadian/Cimarron High Plains ecoregion includes that portion of the Llano Estacado that lies north of the Canadian River in the Texas Panhandle. Winters are more severe than on the Llano Estacado (25i); the increased snow accumulation delays summer drought conditions because the snowmelt saturates the ground in the spring season. Although the topography of 25e is just as flat as the rest of the Llano Estacado, the northern portion has fewer playas, and it is more deeply dissected by stream channels. There is also more grazing land in Ecoregion 25e; the rougher terrain near the stream incisions tends to be grazed rather than tilled. In cultivated areas, corn, winter wheat, and grain sorghum are the principal crops.",
      img: "",
    },
    {
      name: "Llano Estacado",
      id: "25i",
      style: "cornflowerblue",
      info: "The Llano Estacado ecoregion, translated as the “Staked Plain”, is an elevated plain surrounded by escarpments on three sides. Geologically, the Llano Estacado began as an apron of Miocene-Pliocene sediments (Ogallala Formation) eroded from the eastern Rocky Mountains that was eventually covered by Pleistocene wind-borne sand and silt. Several caliche horizons developed in the Ogallala sediments, including a hardened caprock caliche in the uppermost layer. The Pecos River captured the headwater streams of rivers that once ran across the plain from the Rockies, isolating the Llano Estacado and truncating the drainage areas of the Red, Brazos, and Colorado rivers of Texas. As a result, the dry plain, cut off from a mountain surface water source and with little slope to induce runoff, has a very low drainage density. Instead, the smooth surface of the plain holds seasonal rainfall in myriads of small intermittent ponds or playas. The Llano Estacado was once covered with shortgrass prairie, composed of buffalograss, blue and sideoats grama, and little bluestem. An estimated 7 million bison once populated the southern High Plains. They were the most prominent elements of a prairie ecosystem that no longer functions as an interdependent web of bison, black-tailed prairie dog, black-footed ferret, snake, ferruginous hawk, coyote, swift fox, deer, pronghorn, mountain lion, and gray wolf. The Llano Estacado is presently 97% tilled for agriculture. Farmers produce cotton, corn, and wheat under dryland agriculture or irrigated with water pumped from the Ogallala Aquifer. In the era before irrigation, agriculture was not sustainable during drought cycles; the Llano Estacado formed the core of the Dust Bowl during the drought years of the 1930’s. The capacity of the Ogallala Aquifer is limited, particularly under drought conditions, emphasizing the need for enhancement and expansion of ongoing water conservation practices for agricultural and urban users.",
      img: "",
    },
    {
      name: "Shinnery Sands",
      id: "25j",
      style: "cornflowerblue",
      info: "The Shinnery Sands ecoregion is named for the Havard oak brush that stablizes sandy areas subject to wind erosion. The disjunct areas include sand hills and dunes as well as flat sandy recharge areas. The largest area, at the southwestern edge of the Llano Estacado, is composed of sands most likely blown out of the Pecos River Basin against the western escarpment of the Llano Estacado. While sand sagebrush and prairie grasses such as sand dropseed, sand bluestem, and big sandreed may create a continuous plant cover in portions of Ecoregion 25j, the shrub and forb cover may be sparse in dune areas. The shinnery sands are habitat for the lesser prairie-chicken, a species that is in serious decline. The shrubs offer cover and shade for nesting, and shin oak acorns are a staple food source. The decline of the prairiechicken is linked to the conversion of shinnery to other uses.",
      img: "",
    },
    {
      name: "Arid Llano Estacado",
      id: "25k",
      style: "cornflowerblue",
      info: "The Arid Llano Estacado ecoregion is drier than the main portion of the Llano Estacado (25i) to the north. Its climate is transitional to the arid Trans-Pecos region to the southwest (Ecoregion 24). It has somewhat more broken topography and fewer playas than the plain (25i) to the north. There is also less winter precipitation and snow cover to provide lasting moisture over the summer months. The arid conditions arereflected in the land use, which is dominated by livestock grazing and more recently irrigated peanut production. Oil and gas production activities are widespread.",
      img: "",
    },
    {
      name: "Canadian/Cimmaron Breaks",
      id: "26a",
      style: "orange",
      info: "The Canadian/Cimmaron Breaks ecoregion is a broad erosional incision between the High Plains (25) and the Central Great Plains (27). During the Pleistocene, the Canadian River carried much more water than it does today, in draining the meltwater from glaciers in the Rocky Mountains to the west. The river’s erosional force was great enough to cause the headward erosion of the edge of the High Plains. The dissolution of underlying salt beds and subsequent collapse of overlying rocks helped to create the deep trench of the Canadian River. Erosion has not penetrated deeply enough in the Texas portion of this region, however, to expose the Permian red beds that are prominent in the Cimarron Breaks to the north and east. The primary surficial deposit is the Ogallala Formation.",
      img: "",
    },
    {
      name: "Flat Tablelands & Valleys",
      id: "26b",
      style: "orange",
      info: "The Flat Tablelands and Valleys ecoregion includes islands of level land between the prominent buttes, badlands, and escarpments of the tablelands. Geologically, the surficial composition of these flat areas may be undissected Triassic or Permian red beds, or (in western portions) the Ogallala caprock that is found on the Llano Estacado (25i) to the west. The soils are predominately fine sandy loams or silt loams; as a result, most of Ecoregion 26b has been tilled to produce cotton, sorghum, and wheat. There is a trend toward desertification in Ecoregion 26 which is more subtle than that in the Chihuahuan Desert country of West Texas (24). Fragments of remaining native prairie are composed of mid-height grasses, such as sideoats grama and blue grama, typical of a wetter climate. Where the land has been intensively grazed, short grasses such as buffalograss predominate, and invading cacti and honey mesquite are common. Saltcedars are replacing native vegetation in riparian areas.",
      img: "",
    },
    {
      name: "Caprock Canyons, Badlands, & Breaks",
      id: "26c",
      style: "orange",
      info: "The Caprock Canyons, Badlands, and Breaks ecoregion covers the broken country extending eastward from the eroded edge of the High Plains (25). The escarpment at the eastern edge of the Llano Estacado (25i) exposes Ogallala Formation sediments, underlying multicolored Triassic shales, mudstones, and sandstones, and Permian red beds with white gypsum deposits that form the plains to the east. The maximum relief along the escarpment is 1100 feet; the combination of topography and climate in Ecoregion 26c creates thunderstorms and tornadoes in the spring and early summer. Along the escarpments, redberry junipers grow on the rimrock and cliff faces, along with skunkbush sumac, ephedra, mountain mahogany, plum, grape, and clematis. Mohr shin oak and Havard oak are found on the benches and slopes, and honey mesquite on the flat valley floors. Riparian vegetation includes cottonwood, willow, hackberry, and big bluestem grasses with alien elms and saltcedars. Steep slopes, runoff, and salinity in badland areas limit vegetation to a sparse growth of yucca, cacti, ephedra, or sandsage.",
      img: "",
    },
    {
      name: "Semiarid Canadian Breaks",
      id: "26d",
      style: "orange",
      info: "The Semiarid Canadian Breaks ecoregion is similar to Ecoregion 26a to the east with its broad valleys and moderate-relief tablelands, although this region is drier. Some flora found in Ecoregion 26a tend to drop out towards the west in 26d. The shrub and midgrass prairie vegetation includes juniper, sand sagebrush, skunkbush sumac, and yucca, along with sideoats grama and little bluestem. Fringes of cottonwood, willow, and hackberry occur along some streams. Invasive saltcedars have become established along many bottomlands, and honey mesquite has also increased in the region. Human population is sparse, with large ranches and land use devoted primarily to livestock grazing and hunting leases. The exotic aoudad, or Barbary sheep, released in the mid-20th century as a trophy game animal, has increased in the breaks and competes with the native mule deer for browse.",
      img: "",
    },
    {
      name: "Red Prairie",
      id: "27h",
      style: "chocolate",
      info: "The broken tablelands of Ecoregion 26c flatten out to form the gently rolling Red Prairie ecoregion. Erosion by the Brazos and Colorado rivers has removed the overlying Cretaceous limestones to expose the Permian sedimentary rocks. The Central Great Plains ecoregions form a shallow trough between the High Plains (25) to the west and the more rugged topography of the Cross Timbers (29) to the east and Edwards Plateau (30) to the south. Precipitation amounts are considerably greater than on the High Plains, although they are not high enough to support forest vegetation. Prairie type may be midgrass or shortgrass dependent upon soil type, moisture availability and grazing pressure. Typical grasses include little bluestem, Texas wintergrass, white tridens, Texas cupgrass, sideoats grama, and curlymesquite. Much of the Red Prairie is under cultivation.",
      img: "",
    },
    {
      name: "Broken Red Plains",
      id: "27i",
      style: "chocolate",
      info: "The soils of the Broken Red Plains ecoregion are red clay and sand, similar to that on the Red Prairie (27h). However, the topography of Ecoregion 27i is more irregular and more shrub-covered, although the prevalence of honey mesquite may be the result of grazing pressure. The line of 30 inches annual precipitation (or about the 98th meridian) marks the eastern limit of the distribution of mesquite and the eastern boundary of Ecoregion 27i. As in Ecoregion 27h, the prairie type is transitional between tallgrass and shortgrass growth forms. Besides honey mesquite, wolfberry, sand sagebrush, yucca, and pricklypear cacti may be mixed with the grasses. Riparian vegetation includes cottonwood, hackberry, cedar elm, pecan, and little walnut. In contrast to land use practices in Ecoregion 27h, the Broken Red Plains are used mainly for grazing.",
      img: "",
    },
    {
      name: "Limestone Plains",
      id: "27j",
      style: "chocolate",
      info: "The Limestone Plains ecoregion is composed of thin strata of Permian-age limestone, sandy limestones, and mudstone. The Limestone Plains are covered by mixed grass prairie of little bluestem, yellow Indiangrass, and buffalograss, with scattered honey mesquite. However, upland soils are often thin, rocky, and droughty in the vicinity of limestone outcrops. Drier (or eroded) areas support desert shrubs such as lotebush, agarita, tree cholla, and ephedra. The Central Great Plains (27) are typically treeless except in riparian areas, but at the southern end of Ecoregion 27j, scattered plateau live oak grow with the mesquite shrub, in transition to the live oak-mesquite-juniper woodland of the adjacent Edwards Plateau (30). As in some other limestone-based ecoregions in Texas (such as 29d, 29e, 30a), land use is dominated by grazing rather than cultivated agriculture. A minor amount of wheat or sorghum may be grown in deeper alluvial soils.",
      img: "",
    },
    {
      name: "Eastern Cross Timbers",
      id: "29b",
      style: "green",
      info: "The Eastern Cross Timbers ecoregion covers a more confined area than the Western Cross Timbers (29c). The ecoregion occurs on sandy substrates (Woodbine Sand) lying between the Grand Prairie (29d) and Texas Blackland Prairies (32) in eastern Texas. The soils are mainly red and yellow sands that have been leached of nutrients. Post oaks and blackjack oaks have adapted to life in sandy soils and they dominate the overstory, with scattered honey mesquite and grasses, such as little bluestem and threeawn, growing beneath them. Although the rural land use is predominantly cattle grazing, there is some farming for peanuts, grain sorghum, pecans, peaches, and vegetables. Extensive urban development also occurs within this region.",
      img: "",
    },
    {
      name: "Western Cross Timbers",
      id: "29c",
      style: "green",
      info: "The Western Cross Timbers ecoregion covers the wooded areas west of the Grand  Prairie (29d) on sandstone and shale beds. The landscape has cuesta topography consisting of sandstone ridges with a gentle dip slope on one side and a steeper scarp on the other. The soils are mostly fine sandy loams with clay subsoils that retain water. As in the Eastern Cross Timbers (29b), the dominant trees are post oak and blackjack oak with an  understory of greenbriar, little bluestem, and purpletop grasses. Some researchers contend that these woodland areas would be savanna-like if they experienced fire, although one early account described the Cross Timbers as “an immense natural hedge” or belt of thick impenetrable forest. It is likely that there were more prairie openings between the belts of forest. The area has a long history of coal, oil, and natural gas production from the Pennsylvanian sandstone/limestone/shale beds. Deeper soils in the eastern part of this ecoregion support a dairy industry, pastureland, and cultivation of forage sorghum, silage, corn, and peanuts.",
      img: "",
    },
    {
      name: "Grand Prairie",
      id: "29d",
      style: "green",
      info: "The Grand Prairie is an undulating plain underlain by Lower Cretaceous limestones with interbedded marl and clay. Although the vegetation of the Grand Prairie is similar to the Northern Blackland Prairie (32a), the limestone of the Grand Prairie is more resistant to weathering, which gives the topography a rougher appearance. Meandering streams deeply incise the limestone surface. The original vegetation was tallgrass prairie in the upland areas and elm, pecan, and hackberry in riparian areas where deeper soils have developed in floodplain deposits or where the underlying clays have been exposed by limestone erosion. The invasive species Ashe juniper and, to a lesser extent, honey mesquite have increased since settlement. Grand Prairie grasses include big bluestem, yellow Indiangrass, little bluestem, hairy grama, Texas wintergrass, sideoats grama, and Texas cupgrass. Some common Great Plains animals, such as black-tailed jackrabbit and the scissortail flycatcher, range farther east through the Grand Prairie, creating an overlap in Great Plains and eastern forest species. Present land uses include grazing on ridges with shallow soils and farming of corn, grain sorghum, and wheat on the deeper soils on the flats.",
      img: "",
    },
    {
      name: "Limestone Cut Plain",
      id: "29e",
      style: "green",
      info: "Mesas alternate with broad intervening valleys in the stairstep topography of the Limestone Cut Plain. Ecoregion 29e is underlain by Lower Cretaceous limestones, including the Glen Rose Formation and Walnut Clay, that are older than the limestone of the Edwards Plateau (30). The Glen Rose Formation has alternating layers of limestone, chert, and marl that erode differentially and generally more easily than the Edwards Limestone. The effects of increased precipitation and runoff are also apparent in the increased erosion and dissolution of the limestone layer. The Limestone Cut Plain has flatter topography, lower drainage density, and a more open woodland character than the Balcones Canyonlands (30c). The vegetation of Ecoregion 29e is similar to that of the Balcones Canyonlands, but less diverse: post oak, white shin oak, cedar elm, Texas ash, plateau live oak, and bur oak are prevalent. Although the grasslands of the Limestone Cut Plain are a mix of tall, mid, and short grasses, some consider it a westernmost extension of the tallgrass prairie, which distinguishes this ecoregion from the Edwards Plateau Woodland (30a). Grasses include big bluestem, little bluestem, yellow Indiangrass, silver bluestem, Texas wintergrass, tall dropseed, sideoats grama, and common curlymesquite.",
      img: "",
    },
    {
      name: "Carbonate Cross Timbers",
      id: "29f",
      style: "green",
      info: "The Carbonate Cross Timbers ecoregion is that portion of the Western Cross Timbers (29c) that has Pennsylvanian or Cretaceous limestone substrate. This area is not included on some maps of the Cross Timbers, because it does not support the typical oak woodland of the sandstone-based territory surrounding it. The topography of Ecoregion 29f is also somewhat different from that of the Western Cross Timbers (29c) as it contains low mountains rather than alternating ridges and shallow basins. The limestone substrate is apparent in the vegetation cover, which has more plateau live oak, honey mesquite, and pure Ashe juniper woodland than in other surrounding Cross Timbers areas. The juniper woodlands are particularly dense. It is presumed that before widespread fire suppression, the area was less wooded and more savannah-like.",
      img: "",
    },
    {
      name: "Edwards Plateau Woodland",
      id: "30a",
      style: "olive",
      info: "The Edwards Plateau Woodland ecoregion contains the central part of the Edwards Plateau north of the highly dissected Balcones Canyonlands (30c). It encompasses the portion of the Edwards Plateau that receives sufficient rainfall to support woodland in contrast to the drier portion of the plateau to the west (30d) that has open juniper woodland and brush. The profile of the hills is rounded due to increased precipitation and chemical weathering. The dissection is moderate compared to the higher dissection of the Balcones Canyonlands (30c) to the south. Historically, the Edwards Plateau was a savanna of grasslands with scattered plateau live oak, Texas oak, Ashe juniper, and honey mesquite. With fire suppression and grazing, Ashe juniper and mesquite have spread, reducing the savanna character of the plateau. The grasslands of Ecoregion 30a are considered a southern extension of the mixed grass prairie, expressed as tallgrass or shortgrass dependent upon soil type, moisture availability, and grazing pressure. Grasses include little bluestem, Texas wintergrass, yellow Indiangrass, white tridens, Texas cupgrass, sideoats grama, seep muhly, and common curlymesquite.",
      img: "",
    },
    {
      name: "Llano Uplift",
      id: "30b",
      style: "olive",
      info: "The Llano Uplift ecoregion is actually a basin; in some places, it is 1000 feet below the level of the surrounding limestone escarpment. It gets its name from the granitic mass (batholith) that is exposed in the basin, granite that has been dated at one billion years old. Upland soils are shallow, reddish brown, stony, sandy loams over granite, gneiss, and schist with deeper sandy loams in the valleys. Soils tend to be acidic in contrast to the alkaline soils of the Edwards Plateau Woodland (30a) surrounding Ecoregion 30b. The woody vegetation has elements of both 30a and the Cross Timbers (29b and 29c), with plateau live oak, honey mesquite, post oak, blackjack oak, cedar elm, and some black hickory present depending on aspect and habitat. Flora normally found in the deserts of West Texas, such as catclaw mimosa and soaptree yucca, also occur on dry sites. Ashe juniper and Texas oak are generally absent from the Llano Uplift; they are found mainly on the slopes of the limestone escarpment surrounding the basin or on limestone inclusions. Grasses include little bluestem, switchgrass, yellow Indiangrass, and silver bluestem. Dome-like granite hills and outcrops contain unusual plant communities. Although ranching is the major land use, level areas of sandy loam produce wheat, sorghum, and peaches.",
      img: "",
    },
    {
      name: "Balcones Canyonlands",
      id: "30c",
      style: "olive",
      info: "The Balcones Canyonlands ecoregion forms the southeastern boundary of the Edwards Plateau (30). The Edwards Plateau was uplifted during the Miocene epoch at the Balcones Fault Zone, separating central Texas from the coastal plain. The Balcones Canyonlands are highly dissected through the erosion and solution of springs, streams, and rivers working both above and below ground; percolation through the porous limestone contributes to the recharge of the Edwards Aquifer. High gradient streams originating from springs in steep-sided canyons supply water for development on the Texas Blackland Prairies (32) at the eastern base of the escarpment. Ecoregion 30c supports a number of endemic plants and has a higher representation of deciduous woodland than elsewhere on the Edwards Plateau (30), with escarpment black cherry, Texas mountain-laurel, madrone, Lacey oak, bigtooth maple, and Carolina basswood. Some relicts of eastern swamp communities, such as baldcypress, American sycamore, and black willow, occur along major streamcourses. It is likely that these trees have persisted as relics of moister, cooler climates following the Pleistocene glacial epoch. Toward the west, the vegetation changes gradually as the climate becomes more arid. Plateau live oak woodland is eventually restricted to north and east facing slopes and floodplains, and dry slopes are covered with open shrublands of juniper, sumac, sotol, acacia, honey mesquite, and ceniza.",
      img: "",
    },
    {
      name: "Semiarid Edwards Plateau",
      id: "30d",
      style: "olive",
      info: "The Semiarid Edwards Plateau ecoregion lies west of the 100th meridian, where precipitation amounts are too low to support closed canopy forest. Although the geologic foundation of Ecoregion 30d, Cretaceous limestone, is the same as the rest of the Edwards Plateau, the shape of the landscape differs from that further east because of the relative lack of precipitation. The profiles of the hills are sharp, not rounded, because erosion occurs mainly through rockfall at the margins of mesas rather than through limestone dissolution. Canyons break the surface; most streams are intermittent, but perennial streams have the character of those in the wetter central Edwards Plateau to the east. Although honey mesquite, Ashe juniper, and plateau live oak are still present in Ecoregion 30d, live oak is restricted to floodplains. Other arid-land shrubs become more common: lotebush, lechuguilla, sotol, and redberry juniper. Short grasses, such as buffalograss, tobosa, and black grama become more common in the west and northwest portions of Ecoregion 30d as the climate becomes more arid.",
      img: "",
    },
    {
      name: "Northern Nueces Alluvial Plains",
      id: "31a",
      style: "indigo",
      info: "The Northern Nueces Alluvial Plains ecoregion differs from much of Ecoregion 31 due to greater precipitation (22-28 in.), numerous streams that flow from the Balcones Canyonlands (30c), transitional vegetation patterns, different mosaic of soils and surficial materials, and land cover that includes more cropland and pasture. Broad Holocene and Pleistocene-age alluvial fans and other alluvial plain deposits characterize the region. The region has a hyperthermic soil temperature regime with aridic ustic and typic ustic soil moisture regimes. Soils are mostly very deep, moderately fine-textured and medium-textured. Mollisols and Alfisols are typical, with some Inceptisols. General vegetation types include some mesquitelive oak-bluewood parks in the north, and mesquite-granjeno parks in the south. Some open grassland with scattered honey mesquite, plateau live oak, and other trees occur. Little bluestem, sideoats grama, lovegrass tridens, multiflowered false rhodesgrass, Arizona cottontop, plains bristlegrass, and other mid grasses are dominant on deeper soils. Open grassland with scattered low-growing brush, such as guajillo, blackbrush, elbowbush, and kidneywood, characterize shallower soils. Arizona cottontop, sideoats grama, green sprangletop, and false rhodesgrass are dominant mid grasses on these soils. Some floodplain forests may have hackberry, plateau live oak, pecan, and cedar elm, with black willow and eastern cottonwood along the banks. Cropland is common, but large areas are used as rangeland. The main crops are corn, cotton, small grains, and vegetables. Most cropland areas are irrigated. Hunting leases for white-tailed deer, northern bobwhite, and mourning dove are an important source of income.",
      img: "",
    },
    {
      name: "Semiarid Edwards Bajada",
      id: "31b",
      style: "indigo",
      info: "The Semiarid Edwards Bajada ecoregion is composed primarily of alluvial fan and slope wash deposits below the escarpment of the Edwards Plateau (30). Although not composed of karstic Edwards Limestone nor physiographically part of Ecoregion 30, Ecoregion 31b contains springs and streams that show some similarities to those of the Edwards Plateau (30) because they flow over a chalky substrate and likely originate from cool water aquifers beneath the Edwards Plateau. The very presence of perennial streams in such an arid region is distinctive. Elevations are lower and the climate is warmer than on the Edwards Plateau (30), and the vegetation, primarily blackbrush and honey mesquite, is more typical of the rest of the Southern Texas Plains (31).",
      img: "",
    },
    {
      name: "Texas-Tamaulipan Thornscrub",
      id: "31c",
      style: "indigo",
      info: "Covering a large portion of the Southern Texas Plains, the Texas-Tamaulipan Thornscrub ecoregion encompasses a mosaic of vegetation assemblages and a variety of soils. This South Texas region owes its diversity to the convergence of the Chihuahuan Desert to the west, the Tamaulipan thornscrub and subtropical woodlands along the Rio Grande to the south, and coastal grasslands to the east. Composed of mostly gently rolling or irregular plains, the region is cut by arroyos and streams, and covered with low-growing vegetation. The thorn woodland and thorn shrubland vegetation is distinctive, and these Rio Grande Plains are commonly called the 'brush country'. Three centuries of grazing, suppression of fire, and droughts have contributed to the spread of brush and the decrease of grasses. Soils include hyperthermic Alfisols, Aridisols, Mollisols, and Vertisols. They are varied and complex, highly alkaline to slightly acidic, ranging from deep sands to clays and clay loams. Caliche outcroppings and gravel ridges are common. Precipitation is bimodal, with peak rainfall occurring in spring and fall. Spring rains are the result of frontal activity, while fall precipitation is usually tropical in origin. Typically, transpiration and evaporation far exceed input from precipitation. Precipitation is erratic, with extreme year-to-year moisture variation. Droughts are common and frequently severe. The vegetation is dominated by drought-tolerant, mostly smallleaved, and often thorn-laden small trees and shrubs, especially legumes. The most important woody species is honey mesquite. Where conditions are suitable, there is a dense understory of smaller trees and shrubs such as brasil, colima or lime pricklyash, Texas persimmon, lotebush, granjeno, kidneywood, coyotillo, Texas paloverde, anacahuita, and various species of cacti. Xerophytic brush species, such as blackbrush, guajillo, and ceniza, are typical on the rocky, gravelly ridges and uplands. The brush communities also tend to grade into desert scrub near the Rio Grande. Mid and short grasses are common, including cane bluestem, silver bluestem, multiflowered false rhodesgrass, sideoats grama, pink pappusgrass, bristlegrasses, lovegrasses, and tobosa. Most of the area is rangeland and large ranches raise beef cattle. Ranching income is supplemented with hunting leases. Northern bobwhite and white-tailed deer are important game species. Hunting also occurs for mourning doves, wild turkey, and collared peccary. Cultivated land is minimal, with mostly grain sorghum, small grains, cotton, and watermelons.",
      img: "",
    },
    {
      name: "Rio Grande Floodplain & Terraces",
      id: "31d",
      style: "indigo",
      info: "The Rio Grande Floodplain and Terraces are relatively narrow in Texas, but this region is an important natural and cultural feature of the state. Draining more than 182,000 square miles in eight states of Mexico and the United States, the Rio Grande Basin is one of the largest in North America. The river is generally sluggish and its water flow in this section is controlled in part by two large dams, Amistad above Del Rio, and Falcon below Laredo. The region consists of mostly Holocene alluvium or Holocene and Pleistocene terrace deposits, with a mix of ustic to aridic, hyperthermic soils. Some floodplain forests occurred, especially in the lower portion of the region, with species such as sugar hackberry, cedar elm, and Mexican ash. These species are generally more typical downstream in 34f. Riparian forests have declined as natural floods have been restricted by flood-controlling dams and water diversions. Brushy species from adjacent dry uplands occur at the margins, such as honey mesquite, huisache, blackbrush, and lotebush, with some grasses such as multiflowered false rhodesgrass, sacaton, cottontop, and plains bristlegrass. Wetter areas near the river may have black willow, black mimosa, common and giant reed, and hydrophytes such as cattails, bulrushes, and sedges. Many of the wider alluvial areas of the floodplain and terraces are now in cropland, mostly with cotton, grain sorghum, and cool-season vegetables. The arid or semi-arid climate of the Rio Grande Basin, the over-allocation of actual water, and the difficulties of binational management contribute to serious water resource, environmental, and economic issues. Water withdrawals and pollution from agricultural, urban, and industrial sources have degraded water quality. Salinity, nutrients, fecal coliform bacteria, heavy metals, and toxic chemicals are concerns for river uses such as irrigation and drinking water.",
      img: "",
    },
    {
      name: "Northern Blackland Prairie",
      id: "32a",
      style: "black",
      info: "The rolling to nearly level plains of the Northern Blackland Prairie ecoregion are underlain by interbedded chalks, marls, limestones, and shales of Cretaceous age. Soils are mostly fine-textured, dark, calcareous, and productive Vertisols. Historical vegetation was dominated by little bluestem, big bluestem, yellow Indiangrass, and tall dropseed. In lowlands and more mesic sites, such as on some of the clayey Vertisol soils in the higher precipitation areas to the northeast, dominant grasses were eastern gamagrass and switchgrass. Also in the northeast, over loamy Alfisols, were grass communities dominated by Silveanus dropseed, Mead’s sedge, bluestems, and long-spike tridens. Common forbs included asters, prairie bluet, prairie clovers, and black-eyed susan. Stream bottoms were often wooded with bur oak, Shumard oak, sugar hackberry, elm, ash, eastern cottonwood, and pecan. Most of the prairie has been converted to cropland, non-native pasture, and expanding urban uses around Dallas, Waco, Austin, and San Antonio.",
      img: "",
    },
    {
      name: "Southern Blackland Prairie",
      id: "32b",
      style: "black",
      info: "The Southern Blackland Prairie ecoregion, also known as the Fayette Prairie, has similarities to 32a, although there are some geologic, soil, vegetation, and land use differences. The Miocene-age Fleming Formation and to the west the Oakville Sandstone have some calcareous clays and marls, but differ some from the Cretaceous-age formations of Ecoregion 32a. Soils are mostly Vertisols (Calciusterts and Haplusterts), Mollisols (Calciustolls, and Paleustolls), and Alfisols (Paleustalfs and Haplustalfs). The region appears more dissected than most of 32a, elevations are lower, and there are less extensive areas of cropland. Land cover is a more complex mosaic than in 32a, with more post oak woods and pasture. Historical grassland differences between 32b and 32a are not well known. Although they were likely to be generally similar, 32b may have had some subdominant species more similar to those of the Northern Humid Gulf Coastal Prairies (34a). Big bluestem was a likely dominant on the Blackland Prairie Mollisols, and little bluestem-brownseed paspalum prairie often occurred on the Fayette Prairie Alfisols. Similar to Ecoregion 32a, the shrink-swell clays contain gilgai microtopography with small knolls and shallow depressions that can influence the composition of plant communities.",
      img: "",
    },
    {
      name: "Floodplains & Low Terraces",
      id: "32c",
      style: "black",
      info: "The Floodplains and Low Terraces ecoregion of the Texas Blackland Prairies includes only the broadest floodplains, i.e., those of the Trinity, Brazos, and Colorado rivers. It covers primarily the Holocene deposits and not the older, high terraces. The bottomland forests contained bur oak, Shumard oak, sugar hackberry, elm, ash, eastern cottonwood, and pecan, but most have been converted to cropland and pasture. The alluvial soils include Vertisols, Mollisols, and Inceptisols.",
      img: "",
    },
    {
      name: "Northern Post Oak Savanna",
      id: "33a",
      style: "skyblue",
      info: "The landscapes of the Northern Post Oak Savanna ecoregion are generally more level and gently rolling compared to the more dissected and irregular topography of much of Ecoregion 33b to the south. It is underlain by mostly Eocene and Paleocene-age formations with some Cretaceous rocks to the north. The soils have an udic soil moisture regime compared to ustic in Ecoregion 33b to the south, and are generally finer textured loams. Annual precipitation averages 40-48 inches compared to 28-40 inches in Ecoregion 33b. The deciduous forest or woodland is composed mostly of post oak, blackjack oak, eastern redcedar, and black hickory. Prairie openings contained little bluestem and other grasses and forbs. The land cover currently has more improved pasture and less post oak woods and forest than 33b. Some coniferous trees occur, especially on the transitional boundary with Ecoregion 35a. Loblolly pine has been planted in several areas. Typical wildlife species include white-tailed deer, eastern wild turkey, northern bobwhite, eastern fox squirrel, and eastern gray squirrel.",
      img: "",
    },
    {
      name: "Southern Post Oak Savanna",
      id: "33b",
      style: "skyblue",
      info: "The Southern Post Oak Savanna ecoregion has more woods and forest than the adjacent prairie ecoregions (32 and 34), and consists of mostly hardwoods compared to the pines to the east in Ecoregion 35. Historically a post oak savanna, current land cover is a mix of post oak woods, improved pasture, and rangeland, with some invasive mesquite to the south. A thick understory of yaupon and eastern redcedar occurs in some parts. Many areas of this region have more dissected and irregular topography than Ecoregion 33a to the north. The soils generally have an ustic soil moisture regime compared to udic in Ecoregion 33a, and more sand and sandy loam surface textures. It is underlain by Miocene, Oligocene, Eocene, and Paleocene sediments. Sand exposures within these Tertiary deposits have a distinctive sandyland flora, and in a few areas unique bogs occur.",
      img: "",
    },
    {
      name: "San Antonio Prairie",
      id: "33c",
      style: "skyblue",
      info: "The San Antonio Prairie is a narrow, 100-mile long region occurring primarily on the Eocene Cook Mountain Formation. Soils of Ecoregion 33c are mostly Alfisols, with some Vertisols, and Mollisols. Generally, there are fewer Vertisols compared to the Northern Blackland Prairie ecoregion (32a) to the west. Upland Alfisol prairies were dominated by little bluestem and yellow Indiangrass and contained a different mix of grasses and forbs than the dark, clayey, more calcareous Vertisols of Ecoregion 32a. Since the 1830’s, settlement clustered along the Old San Antonio Road (State Highway 21 in the south, Old San Antonio Road in the north) within this narrow belt of prairie land. Currently, land cover is a mosaic of woodland, improved pasture, rangeland, and some cropland.",
      img: "",
    },
    {
      name: "Northern Prairie Outliers",
      id: "33d",
      style: "skyblue",
      info: "The small, disjunct areas of the Northern Prairie Outliers ecoregion have a blend of characteristics from Ecoregions 32 and 33. The northern two outliers, north of the Sulphur River, occur on Cretaceous sediments, while south of the river, Paleocene and Eocene formations predominate. A mosaic of forest and prairie occurred historically in this and adjacent regions. Burning was important in maintaining grassy openings, and woody invasions have taken place in the absence of fire. The tallgrass prairies included little bluestem, big bluestem, yellow Indiangrass, and tall dropseed. Current land cover is mostly pasture, with some cropland.",
      img: "",
    },
    {
      name: "Bastrop Lost Pines",
      id: "33e",
      style: "skyblue",
      info: "The Bastrop Lost Pines ecoregion is an outlier of relict loblolly pine-post oak upland forest occurring on some dissected hills. It is the westernmost tract of southern pine in the United States. The pines mostly occur on gravelly soils that formed in Pleistocene high gravel, fluvial terrace deposits associated with the ancestral Colorado River, and sandy soils that formed in Eocene sandstones (Sparta Sand, Weches Formation, Queen City Sand, Recklaw Formation, and Carrizo Sand). The Lost Pines are about 100 miles west of the Texas pine belt of Ecoregion 35 and occur in a drier environment with 36 inches of average annual precipitation. In this area, the deep, acidic, sandy soils and the additional moisture provided by the Colorado River contribute to the occurrence of pines, which are thought to be a relict population predating the last glacial period. Other areas of loblolly pines appear within parts of 33b, but are mostly too small to map at this scale.",
      img: "",
    },
    {
      name: "Floodplains & Low Terraces",
      id: "33f",
      style: "skyblue",
      info: "The Floodplains and Low Terraces ecoregion contains floodplain and low terrace deposits downstream from Ecoregion 32 and upstream from Ecoregions 34 and 35. It includes only the wider floodplains of major streams, such as the Sulphur, Trinity, Brazos, and Colorado rivers. In addition, it covers primarily Holocene deposits and not Pleistocene deposits on older, high terraces. The bottomland forests contain water oak, post oak, elms, green ash, pecan, willow oak to the east, and to the west some hackberry and eastern cottonwoods. The northern floodplains tend to have more forested land cover, while in the south the Brazos and Colorado River floodplains are characterized by more cropland and pasture.",
      img: "",
    },
    {
      name: "Northern Humid Gulf Coastal Prairies",
      id: "34a",
      style: "royalblue",
      info: "Quaternary-age deltaic sands, silts, and clays underlie much of the Northern Humid Gulf Coastal Prairies on this gently sloping coastal plain. The original vegetation was mostly grasslands with a few clusters of oaks, known as oak mottes or maritime woodlands. Little bluestem, yellow Indiangrass, brownseed paspalum, gulf muhly, and switchgrass were the dominant grassland species, with some similarities to the grasslands of Ecoregion 32. Almost all of the coastal prairies have been converted to cropland, rangeland, pasture, or urban land uses. The exotic Chinese tallow tree and Chinese privet have invaded large areas in this region. Some loblolly pine occurs in the northern part of the region in the transition to Ecoregion 35. Soils are mostly fine-textured: clay, clay loam, or sandy clay loam. Within the region, there are some differences from the higher Lissie Formation to the lower Beaumont Formation, both of Pleistocene age. The Lissie Formation has lighter colored soils, mostly Alfisols with sandy clay loam surface texture, while darker, clayey soils associated with Vertisols are more typical of the Beaumont Formation. Annual precipitation varies from 37 inches in the southwest portion to 58 inches in the northeast, with a summer maximum.",
      img: "",
    },
    {
      name: "Southern Subhumid Gulf Coastal Prairies",
      id: "34b",
      style: "royalblue",
      info: "The Southern Subhumid Gulf Coastal Prairies ecoregion is drier than Ecoregion 34a to the north, not only receiving less annual precipitation, but also typically experiencing summer drought. Annual precipitation ranges from 26 inches in the southwest to 37 inches in the  northeast, with May and September peaks. Soils are hyperthermic compared to thermic in most of Ecoregion 34a. Little bluestem, yellow Indiangrass, and tall dropseed were once dominant grasses. Eragrostoid grasses, including the genera Bouteloua, Buchloe, Eragrostis, Hilaria, and Setaria increase in importance in Ecoregion 34b compared to 34a. Invasive species such as honey mesquite and huisache are a concern. Within the region, there are some differences from the higher Lissie Formation to the lower Beaumont Formation, both of Pleistocene age. The Lissie Formation has lighter colored soils, mostly Alfisols with sandy clay loam surface texture, while darker, clayey Vertisols are more typical of the Beaumont Formation. Almost all of the coastal prairies have been converted to other land uses: cropland, pasture, or urban and industrial.",
      img: "",
    },
    {
      name: "Floodplains & Low Terraces",
      id: "34c",
      style: "royalblue",
      info: "Covering primarily the Holocene floodplain and low terrace deposits, the Floodplains and Low Terraces ecoregion, especially to the southwest, has a different bottomland forest than the floodplains of Ecoregion 35. Bottomland forests of pecan, water oak, southern live oak, and elm, are typical, with some baldcypress on larger streams. The Brazos and Colorado River floodplains are a broad expanse of alluvial sediments, while floodplains to the south are more narrow. Soils include Vertisols, Mollisols, and Entisols. Large portions of floodplain forest have been removed and land cover is now a mix of forest, cropland, and pasture.",
      img: "",
    },
    {
      name: "Coastal Sand Plain",
      id: "34d",
      style: "royalblue",
      info: "The Coastal Sand Plain ecoregion provides a distinct break in both vegetation and surficial materials from the fine-textured soil grasslands of Ecoregion 34b to the north. This sand sheet landscape consists of active and (mostly) stabilized sand dune deposits with lesser amounts of silt sheet deposits (silt and fine sand) to the north. This depositional plain is characterized by a closed internal drainage system with only occasional discontinuous drainage remnants due to sand movement. Closed depressions pond water in response to seasonal and tropical storm precipitation. Soils developed on these parent sediments are Entisols and Alfisols with thick sand surfaces. The dominant grasses on the coastal sand ridges and islands extend inland covering parts of the sand plain. Vegetation is mostly mid and tall grasses such as seacoast bluestem, switchgrass, gulfdune paspalum, fringeleaf paspalum, sandbur, purple threeawn, pricklypear, and catclaw with an overstory of southern live oak and honey mesquite trees. The potholes have a variety of bulrushes and sedges. Most of the Coastal Sand Plain has been moderately to heavily grazed, and large areas have been converted to non-native range or pasture grasses. The region has little cropland compared to Ecoregion 34b.",
      img: "",
    },
    {
      name: "Lower Rio Grande Valley",
      id: "34e",
      style: "royalblue",
      info: "The Lower Rio Grande Valley ecoregion once supported dense, diverse grassland and shrub communities and low woodlands. However, mesquite, granjeno, and a variety of brush and shrub species invaded the landscape. Now, it is almost all in cropland, pasture, and urban land cover. The region is underlain by a mix of Quaternary clays and sands with some Miocene-age sediments of the Goliad Formation at the western edge. Mollisols are extensive, and the soils are deep, mostly clay loams and sandy clay loams. The freeze-free growing season is often over 320 days compared to 250-260 days along the northern Texas coastal area of Ecoregion 34a. Along with Ecoregion 34f, the Lower Rio Grande Valley contains important nesting grounds for the white-winged dove, a favored hunting species in southern Texas.",
      img: "",
    },
    {
      name: "Lower Rio Grande Alluvial Floodplain",
      id: "34f",
      style: "royalblue",
      info: "The Lower Rio Grande Alluvial Floodplain ecoregion includes the Holocene-age alluvial sands and clays of the Rio Grande floodplain that are now almost completely in cropland or urban land cover. The soils, mostly Vertisols and Mollisols, are deep, loamy and clayey, and tend to be finer-textured than in Ecoregion 34e to the north. Some Entisols and Inceptisols occur near the river. The floodplain ridges once had abundant palm trees, and early Spanish explorers called the river “Rio de las Palmas.” Most large palm trees and floodplain forests had been cleared by the early 1900’s. A few small pieces of unique floodplain forests remain, including Texas ebony, Texas palmetto, and sugar hackberry-cedar elm floodplain forests. It is the most subtropical climate of Texas, but hard freezes occasionally occur, affecting plants and animals that are at the northern limit of their range. Crops include cotton, citrus, grain sorghum, sugar cane, vegetables, and melons. The Rio Grande’s water is mostly diverted from its channel for irrigation and urban use, and little or no flow reaches the Gulf of Mexico. Both the Central and Mississippi flyways funnel through the southern tip of Texas and many species of birds reach their extreme northernmost range in this region. In addition, subtropical, temperate, coastal, and desert influences converge here, allowing for great species diversity. Nearly 500 bird species, including neotropical migratory birds, shorebirds, raptors, and waterfowl, can be found here.",
      img: "",
    },
    {
      name: "Texas-Louisiana Coastal Marshes",
      id: "34g",
      style: "royalblue",
      info: "The Texas-Louisiana Coastal Marshes region is distinguished from Ecoregions 34h and 34i by its extensive freshwater and saltwater coastal marshes, lack of barrier islands and fewer bays, and its wetter, more humid climate. Annual precipitation is 48 to 54 inches in Texas and up to 60 inches in Louisiana. There are many rivers, lakes, bayous, tidal channels, and canals. The streams and rivers that supply nutrients and sediments to this region are primarily from the humid pine belt of Ecoregion 35. Extensive cordgrass marshes occur. The estuarine and marsh complex supports marine life, supplies wintering grounds for ducks and geese, and provides habitat for small mammals and American alligators. Brown shrimp, the most commercially important marine species in Texas, is common along the whole coast, but in this northern coastal zone white shrimp are also commercially important. Eastern oysters and blue crabs are also common and commercially important in the region. Sport fishery species such as red drum, black drum, southern flounder, and spotted seatrout occur throughout the coastal bays of this region and Ecoregion 34h.",
      img: "",
    },
    {
      name: "Mid-Coast Barrier Islands & Coastal Marshes",
      id: "34h",
      style: "royalblue",
      info: "The Mid-Coast Barrier Islands and Coastal Marshes portion of the Texas coast is subhumid compared to the humid climate of Ecoregion 34g to the northeast and to the semiarid climate of Ecoregion 34i to the south. Annual precipitation within Ecoregion 34h increases to the northeast, ranging from 34 to 46 inches. The region encompasses primarily Holocene deposits with saline, brackish, and freshwater marshes, barrier islands with minor washover fans, and tidal flat sands and clays. In the inland section from Matagorda Bay to Corpus Christi Bay, Pleistocene barrier island deposits occur. Typical soils on the coastal marshes are Entisols, with a minor extent of Histosols. Mollisols occur on tidal flats and coastal marshes, and Entisols form in sandy barrier islands and dunes. Smooth cordgrass, marshhay cordgrass, and gulf saltgrass dominate in more saline zones. Other native vegetation is mainly grassland composed of seacoast bluestem, sea-oats, common reed, gulfdune paspalum, and soilbind morning-glory. Some areas have clumps of sweetbay, redbay, and dwarf southern live oak trees. In the Coastal Bend area, the barrier islands support extensive foredunes and back-island dune fields. Scarps can characterize bay margins due to beach erosion. Salt marsh and wind-tidal flats are mostly confined to the back side of the barrier islands with fresh or brackish marshes associated with river-mouth delta areas. Marshhay cordgrass becomes less important to the south in this region. Black mangrove begins to appear from Port O'Connor south. This area of the coast has all three commercially important species of shrimp as well as important oyster and blue crab fisheries. Convergence of longshore currents from north and south occurs south of the Corpus Christi area near Padre Island National Seashore. Corpus Christi Bay serves as the ecozone or boundary between two distinct estuarine ecosystems. Copano and Mesquite bays to the north are low to moderate-salinity bays and attract whooping cranes and other birdlife. To the south in 34i, hypersaline Laguna Madre forms a unique ecosystem and supports greater expanses of seagrasses.",
      img: "",
    },
    {
      name: "Laguna Madre Barrier Islands & Coastal Marshes",
      id: "34i",
      style: "royalblue",
      info: "The Laguna Madre Barrier Islands and Coastal Marshes ecoregion is distinguished by its hypersaline lagoon system, vast seagrass meadows, wide tidal mud flats, large overwintering redhead duck population, numerous protected species, great fishery productivity, and a narrow barrier island with a number of washover fans. The lower coastal zone in Texas has a more semi-arid climate and has less precipitation (27-29 inches) compared to 34g and 34h. There is extreme variability in annual rainfall, and evapotranspiration is generally two to three times greater than precipitation. As no rivers drain into the Texas Laguna Madre, the lagoon water can be hypersaline. Combined with the Laguna Madre of Tamaulipas, it is the largest hypersaline system in the world. The shallow depth, clear water, and warm climate of this lagoon are conducive to seagrass production. Nearly 80% of all seagrass beds in Texas are now found in the Laguna Madre. The food web of the Laguna Madre is predominantly based on this submerged aquatic vegetation (seagrass and algae), rather than free-floating phytoplankton. Because of the hypersalinity, oysters are not commercially harvested to a large extent, although the region does contain the only strain of high-salinity adapted oysters in North America. The blue crab harvest is also smaller than the other two coastal regions to the north. Pink shrimp make up an important part of the commercial harvest while white shrimp are more abundant to the north in 34g. The historically highly productive commercial fisheries have now given way to an important sport fishery for species such as red drum, black drum, and spotted sea trout. Marshes are less extensive on the southern coast. A few stands of black mangrove tidal shrub occur in this region.",
      img: "",
    },
    {
      name: "Tertiary Uplands",
      id: "35a",
      style: "salmon",
      info: "The rolling Tertiary Uplands, gently to moderately sloping, cover a large area in east Texas, southern Arkansas, and northern Louisiana. In East Texas, Tertiary deposits are mostly Eocene sediments, with minor amounts of Paleocene and Cretaceous sediments in the north. Soils are mostly well-drained Ultisols and Alfisols, typically with sandy and loamy surface textures. Natural vegetation includes loblolly pine, shortleaf pine, southern red oak, post oak, white oak, hickory, and sweetgum, and mid and tall grasses such as yellow Indiangrass, pinehill bluestem, narrowleaf woodoats, and panicums. American beautyberry, sumac, greenbriar, and hawthorn are part of the understory. The sandier areas, mostly found on the Sparta, Queen City, and Carrizo Sand Formations, often have more bluejack oak, post oak, and stunted pines. Pine density is less than in Ecoregions 35e and 35f to the south and in 35a to the east in Arkansas and Louisiana. Toward the western boundary, this region is slightly drier and has more pasture, oak-pine, and oak-hickory forest compared to other regions of Ecoregion 35. Many areas are replanted to loblolly pine for timber production, or are in improved pasture. Lumber and pulpwood production, livestock grazing, and poultry production are typical land uses. Oil and gas production is also widespread.",
      img: "",
    },
    {
      name: "Floodplains & Low Terraces",
      id: "35b",
      style: "salmon",
      info: "In Texas, the Floodplains and Low Terraces of Ecoregion 35 comprise the western margin of the southern bottomland hardwood communities that extend along the Gulf and Atlantic coastal plains from Texas to Virginia. As delineated, 35b is mostly the Holocene alluvial floodplains and low terraces where there is a distinct vegetation change into bottomland oaks and gum forest. It does not include all of the higher terraces such as the older Deweyville Formation terraces where vegetation tends to be more similar to the uplands, with some minor swamp and wetland communities. Water oak, willow oak, sweetgum, blackgum, elm, red maple, southern red oak, swamp chestnut oak, and loblolly pine are typical. Baldcypress and water tupelo occur in semipermanently flooded areas. Soils can include Inceptisols, Vertisols, andc Entisols and are generally somewhat poorly drained to very poorly drained, clayey and loamy.",
      img: "",
    },
    {
      name: "Pleistocene Fluvial Terraces",
      id: "35c",
      style: "salmon",
      info: "The Pleistocene Fluvial Terraces ecoregion covers significant terrace deposits on major streams in Louisiana and Arkansas, but terraces are less extensive in Texas, occurring mostly along the Red River. Some smaller terraces occur along the Sulphur River but are not mapped at this scale. The broad flats and gently sloping stream terraces are lower and less dissected than 35a, but higher than the floodplains of 35b. Soils are typically Alfisols. In Texas, current land cover is mostly pine-hardwood forest, with post oak, Shumard oak, and eastern redcedar woods to the west. In Arkansas, loblolly pine is more common on the terraces than shortleaf pine.",
      img: "",
    },
    {
      name: "Southern Tertiary Uplands",
      id: "35e",
      style: "salmon",
      info: "The Southern Tertiary Uplands ecoregion generally covers the remainder of longleaf pine range north of the Flatwoods (35f) on Tertiary sediments. Longleaf pine often occurred on sand ridges and uplands, but open forests were also found on other soil types and locations in 35e and 35f. On more mesic sites, some American beech or magnolia-beech-loblolly pine forests occurred. Some sandstone outcrops (Catahoula Formation) have distinctive barrens or glades in Texas and Louisiana. Seeps in sand hills support acid bog species including southern sweetbay, hollies, wax-myrtles, insectivorous plants, orchids, and wild azalea; this vegetation becomes more extensive in the Flatwoods (35f). The region is more hilly and dissected than the Flatwoods (35f) to the south, and soils are generally better drained over the more permeable sediments. Currently, it has more pine forest than the oak-pine and pasture land cover to the north in 35a. Large parts of the region are public National Forest land.",
      img: "",
    },
    {
      name: "Flatwoods",
      id: "35f",
      style: "salmon",
      info: "Mostly flat to gently sloping, the Flatwoods ecoregion occurs on Pleistocene sediments in southeast Texas and southwest Louisiana. Soils on the sands in the Pleistocene Lissie Formation are generally more clayey, poorly drained and more acidic than on the Miocene Willis Sands to the north in 35e. Soils are less clayey than 34b to the south. This ecoregion once had a diversity of mixed pine-hardwood forest types with a mosaic of well-drained and poorly drained communities. The upland pine community was mostly longleaf pine along with sweetgum, white oak, southern red oak, willow oak, blackgum, and hollies. Poorly drained flat uplands had areas of pine savannas and small prairies with species-rich ground layers. Savanna wetlands on the Montgomery Formation and prairie areas on the Beaumont Formation were most likely larger in the Flatwoods than in 35e and 35a to the north. The beech-magnolia association, often cited as the climatic climax for this region, was probably not extensive, occurring in narrow areas along some streams and mesic slopes, and it contained a higher percentage of pine than in similar regions to the east. In 35f, there is less beech and more swamp chestnut oak compared to Ecoregion 35e. Loblolly pine and laurel oak also occurred in mesic and other areas. This region is warmer, wetter, flatter, less dissected, and lower in elevation than 35a and 35e to the north, with a greater presettlement fire frequency. Streams are low gradient and sluggish. Almost all of the Big Thicket National Preserve is within this region.",
      img: "",
    },
    {
      name: "Red River Bottomlands",
      id: "35g",
      style: "salmon",
      info: "The Red River Bottomlands contain the floodplain and low terraces of the Red River within Ecoregion 35. The region includes the meandering channel of the Red River, oxbow lakes, meander scars, ridges, and backswamps. The Holocene alluvium associated with Red River deposition is of variable texture and permeability. The lithology contrasts with the Pleistocene terrace deposits of Ecoregion 35c, and the Tertiary sediments of Ecoregion 35a. Natural vegetation of the bottomland hardwood forests included trees such as water oak, sweetgum, willow oak, southern red oak, eastern redcedar, blackgum, blackjack oak, overcup oak, river birch, red maple, green ash, and American elm. There are also some plant distribution differences between the floodplains of Ecoregion 35g and 35b. Currently in Ecoregion 35g, most natural woodland has been cleared for cropland and improved pasture, although some woodland still occurs in very poorly drained and frequently flooded areas. The broad, nearly level bottomlands are often dominated by agriculture, with more cropland than other floodplains of Ecoregion 35. Soybeans, sorghum, wheat, and cotton are principal crops in Texas. The Red River carries high silt loads and is almost continuously turbid compared to other rivers of Ecoregion 35.",
      img: "",
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

  //add layer controller to map
  const layerControl = L.control
    .layers(null, null, { collapsed: false })
    .addTo(map);

  if (eco3Load === true || eco4Load === true) {
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
    if (eco3Show === false && eco4Show === false) {
      const legend = document.querySelector(".legend-items");
      legend.style.display = "none";
    }
  }

  /*
LOAD & DISPLAY LEVEL 3 ECOREGIONS BASED ON BOOLEANS PASSED INTO FORMULA
  */
  if (eco3Load === true) {
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
        if (eco3Show === true) {
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

  if (eco4Load === true) {
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
        if (eco3Load === false && eco4Load === true) {
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
        if (eco4Show === true) {
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

  if (chapterLoad === true) {
    const loadChapters = async () => {
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
          let popup = `<h3 class='chapter-title'><b>${
            ele.title.rendered
          } Chapter</b></h3><br>
          <a class='chapter-link' href=${ele.link}>Visit our Homepage</a><br>
          <p class='chapter-tag'>${ele.acf.ch_tag}</p>
          ${
            ele.acf.ch_email === ""
              ? ""
              : `<a class='chapter-link' href='mailto:${ele.acf.ch_email}'>Email Us</a><br>`
          }
          ${
            ele.acf.ch_fb === ""
              ? ""
              : `<a class='chapter-link' href=${ele.acf.ch_fb}'>Visit us on Facebook</a><br>`
          }
          ${
            ele.acf.ch_yt === ""
              ? ""
              : `<a class='chapter-link' href=${ele.acf.ch_yt}'>Check out our Youtube Channel</a><br>`
          }
          ${
            ele.acf.ch_tw === ""
              ? ""
              : `<a class='chapter-link' href=${ele.acf.ch_tw}'>Subscribe to our Twitter feed</a><br>`
          }
          ${
            ele.acf.ch_insta === ""
              ? ""
              : `<a class='chapter-link' href=${ele.acf.ch_insta}'>Follow us on Instagram</a><br>`
          }
          ${
            ele.acf.ch_other === ""
              ? ""
              : `<a class='chapter-link' href=${ele.acf.ch_other}'>You can also find us here</a><br>`
          }`;

          if (ele.acf.ch_loc !== null) {
            L.marker([ele.acf.ch_loc.lat, ele.acf.ch_loc.lng], {
              icon: chapterIcon,
            })
              .addTo(chapterPins)
              .bindPopup(popup);
          }

          //load all the counties into an array
          if (ele.acf.ch_counties !== "") {
            countyArr.push(ele.acf.ch_counties.split(","));
          }
        });

        if (chapterShow === true) {
          map.addLayer(chapterPins);
        }
        layerControl.addOverlay(chapterPins, "Chapter Pins");
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
                eco3Load === false &&
                eco4Load === false &&
                chapterLoad === true
              ) {
                document.querySelector(".spinner-container").hidden = true;
              }
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
        if (chapterShow === true) {
          map.addLayer(chapterCounties);
        }
        layerControl.addOverlay(chapterCounties, "Chapter Counties");
      };
      loadCounties();
    };
    loadChapters();
  }
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
}

const toggleLegend = () => {
  const legend = document.querySelector(".legend-items");
  legend.style.display === "none"
    ? (legend.style.display = "block")
    : (legend.style.display = "none");
};

// const checkbox
