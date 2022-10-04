<?php
/**
* Plugin Name: NPSOT functionality
* Description: Custom functionality for NPSOT.
* Version: 0.1
* Author: Jon Lienhard
* Author URI: https://www.lienhard.dev/
**/

//add categories to pages
function add_page_categories() {
register_taxonomy_for_object_type('category', 'page');
}
add_action("wp_head", "add_page_categories");
