<?php

add_filter("manage_native-plant_posts_columns", 'native_plants_filter_post_columns');

function native_plants_filter_post_columns($columns) {
    $columns['common_name'] = __("Common Name");
    $columns['author'] = __("Author");
    $columns['plant_family'] = __("Family");
    $columns['image'] = ("Image");
    $columns['on_sale_1'] = ("Plant Sale 1");
    $columns['on_sale_2'] = ("Plant Sale 2");
    
return $columns;    
}

add_filter("manage_native-plant_posts_columns", 'native_plants_columns');

function native_plants_columns($columns) {
    $columns = array(
        'cb' => $columns['cb'],
        'image' => __("Image"),
        'title' => __('Scientific Name'),
        'common_name' => __('Common Name'),
        'plant_family' => __('Family'),
        'on_sale_1' => __("Plant Sale 1"),
        'on_sale_2' => __("Plant Sale 2"),
        'author' => __('Author'),
        );
    return $columns;    
}

add_action('manage_native-plant_posts_custom_column', 'native_plants_column', 10, 2);

function native_plants_column($column, $post_id) {

    // Image column
    if ('image' === $column) {
        $gallery = get_field('native_plant_media', $post_id);
        // var_dump($gallery);
        if (!empty($gallery)) {
            $image_id = $gallery[0];
            if (isset($image_id['sizes']['thumbnail'])) {
                $img_url = $image_id['sizes']['thumbnail'];
                $native_common_name = get_field('common_name', $post_id); // Get common name for alt text
                echo "<img src='$img_url' alt='$native_common_name' />";
            }
        }
    }
    
    //common name $columns
    if ('common_name' === $column) {
        $native_common_name = get_field('common_name', $post_id);
        echo $native_common_name;
    }
    
    if ('plant_family' === $column) {
        $native_plant_family = get_field('plant_family', $post_id);
        echo $native_plant_family;
    }
    
    //plant sale $columns
    if ('on_sale_1' === $column) {
        $on_sale_1_col = get_field('native_on_sale_1', $post_id);
        if (!empty($on_sale_1_col)) {
            echo implode(", ", $on_sale_1_col);
        }
    }
    if ('on_sale_2' === $column) {
        $on_sale_2_col = get_field('native_on_sale_2', $post_id);
        if (!empty($on_sale_2_col)) {
            echo implode(", ", $on_sale_2_col);
        }
    }
}

//make plant sales sortable
// Generate ACF filter dropdown
function generate_acf_filter_dropdown($field_key, $field_label) {
    $field_value = isset($_GET[$field_key]) ? sanitize_text_field($_GET[$field_key]) : '';

    ?>
    <select name="<?php echo esc_attr($field_key); ?>">
        <option value=""><?php echo esc_html__('All ' . $field_label, 'text-domain'); ?></option>
        <?php
        $choices = get_field_object($field_key)['choices'];

        foreach ($choices as $value => $label) {
            echo '<option value="' . esc_attr($value) . '" ' . selected($field_value, $value, false) . '>' . esc_html($label) . '</option>';
        }
        ?>
    </select>
    <?php
}

// Add ACF field filters to admin interface
function custom_filter_by_acf_field() {
    global $typenow;

    if ($typenow === 'native-plant') {
        generate_acf_filter_dropdown('native_on_sale_1', 'Plant Sale 1');
        generate_acf_filter_dropdown('native_on_sale_2', 'Plant Sale 2');
    }
}
add_action('restrict_manage_posts', 'custom_filter_by_acf_field');

// Modify query based on selected filter
function custom_filter_by_acf_field_query($query, $field_key) {
    global $pagenow, $typenow;

    if ($typenow === 'native-plant' && is_admin() && $pagenow === 'edit.php' && isset($_GET[$field_key]) && $_GET[$field_key] !== '') {
        $query->set('meta_query', array(
            array(
                'key' => $field_key,
                'value' => sanitize_text_field($_GET[$field_key]),
                'compare' => 'LIKE',
            ),
        ));
    }
}


// Hook the query function for each filter
add_action('pre_get_posts', function($query) {
    custom_filter_by_acf_field_query($query, 'native_on_sale_1');
});

add_action('pre_get_posts', function($query) {
    custom_filter_by_acf_field_query($query, 'native_on_sale_2');
});




add_action('admin_head', 'native_plant_column_width', 10, 2);

function native_plant_column_width() {
    echo '<style type="text/css">
    .column-image {text-align: left; width: 200px !important}
    .column-title {text-align: left; width: 400px !important}
    </style>';
}
