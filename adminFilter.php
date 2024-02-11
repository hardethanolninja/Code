<?php

//https://wordpress.stackexchange.com/questions/578/adding-a-taxonomy-filter-to-admin-list-for-a-custom-post-type

add_action( 'restrict_manage_posts', 'my_restrict_manage_posts' );
function my_restrict_manage_posts() {

    // only display these taxonomy filters on desired custom post_type listings
    global $typenow;
    if ($typenow == 'post' || $typenow == 'page' || $typenow == 'map-item') {

        // create an array of taxonomy slugs you want to filter by - if you want to retrieve all taxonomies, could use get_taxonomies() to build the list
        $filters = array('organization');

        foreach ($filters as $tax_slug) {
            // retrieve the taxonomy object
            $tax_obj = get_taxonomy($tax_slug);
            $tax_name = $tax_obj->labels->name;
            // retrieve array of term objects per taxonomy
            $terms = get_terms($tax_slug);

            // output html for taxonomy dropdown filter
            echo "<select name='$tax_slug' id='$tax_slug' class='postform'>";
            echo "<option value=''>All $tax_name</option>";
            foreach ($terms as $term) {
                // output each select option line, check against the last $_GET to show the current option selected
                echo '<option value='. $term->slug, $_GET[$tax_slug] == $term->slug ? ' selected="selected"' : '','>' . $term->name .'</option>';
            }
            echo "</select>";
        }
    }
    
        if ($typenow == 'tribe_events' ) {

        // create an array of taxonomy slugs you want to filter by - if you want to retrieve all taxonomies, could use get_taxonomies() to build the list
        $filters = array('tribe_events_cat', 'post_tag');

        foreach ($filters as $tax_slug) {
            // retrieve the taxonomy object
            $tax_obj = get_taxonomy($tax_slug);
            $tax_name = $tax_obj->labels->name;
            // retrieve array of term objects per taxonomy
            $terms = get_terms($tax_slug);

            // output html for taxonomy dropdown filter
            echo "<select name='$tax_slug' id='$tax_slug' class='postform'>";
            echo "<option value=''>All $tax_name</option>";
            foreach ($terms as $term) {
                // output each select option line, check against the last $_GET to show the current option selected
                echo '<option value='. $term->slug, $_GET[$tax_slug] == $term->slug ? ' selected="selected"' : '','>' . $term->name .'</option>';
            }
            echo "</select>";
        }
    }
}


//add authors filter to top of posts 
// https://rudrastyh.com/wordpress/filter-posts-by-author.html
add_action( 'restrict_manage_posts', 'rudr_filter_by_the_author' );

function rudr_filter_by_the_author( $post_type ) {
	
	// you can add a condition for a specific post type
	// if( 'my_type' !== $post_type ) {
	// 	return;
	// }

	$selected = isset( $_GET[ 'user' ] ) && $_GET[ 'user' ] ? $_GET[ 'user' ] : '';
 
	wp_dropdown_users(
		array(
			'role__in' => array( 
				'administrator', 
				'editor', 
				'author',
				'contributor',
				'webmaster'
			),
			'name' => 'author',
			'show_option_all' => 'All authors',
			'selected' => $selected
		)
	); 
}
