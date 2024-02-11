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

//build a variable for the sale based on user input in shortcode
$plant_sale = 'native_on_sale_' . $atts['sale'];

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
    'meta_key' => 'common_name',
    'orderby' => 'meta_value',
    'order' => 'asc'
);


// loop through the posts & create a display for each.
$loop = new WP_Query( $args ); 

?>

<table>
<tr>
    <th>Common Name</th>
    <th>Scientific Name</th>
    <th>Growth Form</th>
    <th>Light Requirement</th>
    <th>Water Requirement</th>
</tr>
     
<?php

while ( $loop->have_posts() ) : $loop->the_post();

$sci_name = get_the_title();
$common_name = get_field('common_name');
$growth_form = get_field('growth_form');
$light_req = implode(", ", get_field('light'));
$water_req = implode(", ", get_field('water'));
$link = get_permalink();

$output = "<tr>
<td>$common_name</td>
<td>$sci_name</td>
<td>$growth_form[0]</td>
<td>$light_req</td>
<td>$water_req</td>
</tr>";
    
echo $output;


endwhile;

wp_reset_postdata();

?>

</table>
<?php
