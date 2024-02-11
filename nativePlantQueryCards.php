<style>
    .query-container {
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        width:fit-content;
    }
    
    .query-card__link {
        text-decoration:none !important;
    }
    
    .query-card {
        display:flex;
        flex-direction:column;
        width:275px;
        border:2px solid black;
        margin:8px;
        align-items:center;
        justify-content:center;
        border-radius:6px;
        box-shadow: 4px 5px 6px 0px rgba(134,135,134,0.75);
    }
    
    .query-card__title {
        padding-left:4px;
        margin-bottom:4px;
        max-width:265px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    
    .query-card__subtitle {
        margin-bottom:8px;
        color:#3C5799 !important;
        font-style:italic;
        max-width:265px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    
    .query-card__img {
        max-height:150px;
        width:275px;
        object-fit:cover;
        border-radius:0px 0px 4px 4px;
    }
    
    .query-card:hover {
        transform: scale(1.03, 1.03);
        transition: all 0.3s ease;
    }
    
    .query-card:not(:hover) {
        transition: all 0.3s ease;
    }
    
</style>

<?php

// Define selectable attributes
$atts = shortcode_atts([
    'ecoregion' => '',
    'wildlife' => '',
    'water' => '',
    'light' => '',
], $atts);

// Initialize empty arrays for meta_query
$meta_query = array();

// Process ecoregion if not empty
if (!empty($atts['ecoregion'])) {
    $eco_query = explode(",", $atts['ecoregion']);
    $newEcoArray = array_map(function ($value) {
        return array(
            'key' => 'ecoregion',
            'value' => $value,
            'compare' => 'LIKE'
        );
    }, $eco_query);
    $meta_query = array_merge($meta_query, $newEcoArray);
}

// Process wildlife if not empty
if (!empty($atts['wildlife'])) {
    $wl_query = explode(",", $atts['wildlife']);
    $newWildlifeArray = array_map(function ($value) {
        return array(
            'key' => 'wildlife_benefit',
            'value' => $value,
            'compare' => 'LIKE'
        );
    }, $wl_query);
    $meta_query = array_merge($meta_query, $newWildlifeArray);
}

// Process water if not empty
if (!empty($atts['water'])) {
    $wl_query = explode(",", $atts['water']);
    $newWildlifeArray = array_map(function ($value) {
        return array(
            'key' => 'water',
            'value' => $value,
            'compare' => 'LIKE'
        );
    }, $wl_query);
    $meta_query = array_merge($meta_query, $newWildlifeArray);
}

// Process water if not empty
if (!empty($atts['light'])) {
    $wl_query = explode(",", $atts['light']);
    $newWildlifeArray = array_map(function ($value) {
        $ucVal = ucwords($value);
        return array(
            'key' => 'light',
            'value' => '"' . $ucVal . '"',
            'compare' => 'LIKE'
        );
    }, $wl_query);
    $meta_query = array_merge($meta_query, $newWildlifeArray);
}

$args = array(
    'post_type' => 'native-plant',
    'posts_per_page' => -1,
    'meta_query' => $meta_query,
    'orderby' => 'title',
    'order' => 'asc',
    'relevanssi' => false,
);

// Loop through the posts & create a display for each.
$loop = new WP_Query($args);

?>

 <!-- outer container for all cards -->
<div class='query-container'>
     
<?php

while ( $loop->have_posts() ) : $loop->the_post();

$images = get_field('native_plant_media');
$img = $images[0]['url'];
$alt = $images[0]['alt'];
$common_name = get_field('common_name');
$sci_name = get_the_title();
$link = get_permalink();

//plant card

$output =  "<a class='query-card__link' href=$link>
                <div class='query-card'>
                    <h4 class='query-card__title'>$common_name</h4>
                    <h5 class='query-card__subtitle'>$sci_name</h5>
                    <img class='query-card__img' src='$img' alt='$alt'>
                </div> 
            </a>";

echo $output;


endwhile;

wp_reset_postdata();



?>

</div>
