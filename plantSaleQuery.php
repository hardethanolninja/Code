<style>
    .sale-query-container {
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        width:fit-content;
    }
    
    .sale-query-card__link {
        text-decoration:none !important;
    }
    
    .sale-query-card {
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
    
    .sale-query-card__title {
        padding-left:4px;
        margin-bottom:4px;
        max-width:265px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    
    .sale-query-card__subtitle {
        margin-bottom:8px;
        color:#3C5799 !important;
        font-style:italic;
        max-width:265px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    
    .sale-query-card__img {
        max-height:150px;
        width:275px;
        object-fit:cover;
        border-radius:0px 0px 4px 4px;
    }
    
    .sale-query-card:hover {
        transform: scale(1.03, 1.03);
        transition: all 0.3s ease;
    }
    
    .sale-query-card:not(:hover) {
        transition: all 0.3s ease;
    }
    
</style>

<?php

//define selectable attributes
$atts = shortcode_atts([
    'sale' => '1',
], $atts);

// Get terms for the page to determine the organization
$terms = get_the_terms( $post->ID , 'organization' );
$org = $terms[0]->name;

$plant_types = array (
    'post_type' => 'native-plant',
    'posts_per_page' => -1,
    );

$plant_type_query = new WP_Query($plant_types);

$all_fields = array();

//get all the plant categories to organize the cards under
foreach ($plant_type_query->posts as $allPosts) {
    $field = get_field('growth_form', $allPosts->ID);
    array_push($all_fields, $field[0]);
}

$plant_cats = array_unique($all_fields);

foreach ($plant_cats as $category) {
echo "<h2>$category</h2>";

//build a variable for the sale based on user input in shortcode
$plant_sale = 'native_on_sale_' . $atts['sale'];

// print_r($atts['sale']);

// query for native plant posts that are on sale for the current page's organization
$args = array(
    'post_type' => 'native-plant',
    'post_status' => 'publish',
    'posts_per_page' => 999,
    'meta_query' => [
    [
      'key' => $plant_sale,
      'value' =>  $org,
      'compare' => 'LIKE'
    ]],
    'orderby' => 'title',
    'order' => 'asc'
);


// loop through the posts & create a display for each.
$loop = new WP_Query( $args ); 

?>

 <!-- outer container for all cards -->
<div class='plant-sale-category sale-query-container'>
     
<?php

while ( $loop->have_posts() ) : $loop->the_post();

$images = get_field('native_plant_media');
$img = $images[0]['url'];
$alt = $images[0]['alt'];
$common_name = get_field('common_name');
$growth_form = get_field('growth_form');
$sci_name = get_the_title();
$link = get_permalink();

//plant card
if ($growth_form[0] === $category) {
$output =  "<a class='sale-query-card__link' href=$link>
        <div class='sale-query-card'>
            <h4 class='sale-query-card__title'>$common_name</h4>
            <h5 class='sale-query-card__subtitle'>$sci_name</h5>
    <img class='sale-query-card__img' src=$img alt=$alt </img>
        </div> 
    </a>";
    
    echo $output;
};

endwhile;

wp_reset_postdata();

?>

</div>
<?php
};
