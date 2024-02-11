<?php

function native_plant_database_entry_form() {
    if ('POST' === $_SERVER['REQUEST_METHOD'] && !empty($_POST['action']) && $_POST['action'] === 'submit_custom_form') {
        
        // Handle form submission and create the draft post here
        $post_title = sanitize_text_field($_POST['post_title']);

        // Get ACF field values
        $acf_common = sanitize_text_field($_POST['acf_common']);
        $acf_other_common = sanitize_text_field($_POST['acf_other_common']);
        $selected_ecoregions = isset($_POST['ecoregion']) ? $_POST['ecoregion'] : array();
        $selected_growth = isset($_POST['growth_form']) ? $_POST['growth_form'] :array();
        $acf_min_height = intval($_POST['acf_min_height']);
        $acf_max_height = intval($_POST['acf_max_height']);
        $acf_min_spread = intval($_POST['acf_min_spread']);
        $acf_max_spread = intval($_POST['acf_max_spread']);
        $selected_light = isset($_POST['acf_light']) ? $_POST['acf_light'] : array();
        $selected_water = isset($_POST['acf_water']) ? $_POST['acf_water'] : array();
        $selected_leaf = isset($_POST['acf_leaf']) ? sanitize_text_field($_POST['acf_leaf']) : '';
        $selected_life = isset($_POST['acf_life']) ? sanitize_text_field($_POST['acf_life']) : '';
        $selected_color = isset($_POST['acf_color']) ? $_POST['acf_color'] : array();
        $selected_season = isset($_POST['acf_season']) ? $_POST['acf_season'] : array();
        $selected_interest = isset($_POST['acf_interest']) ? $_POST['acf_interest'] : array();
        $selected_benefit = isset($_POST['acf_benefit']) ? $_POST['acf_benefit'] : array();
        $selected_soil = isset($_POST['acf_soil']) ? $_POST['acf_soil'] : array();
        $selected_habitat = isset($_POST['acf_habitat']) ? $_POST['acf_habitat'] : array();
        $acf_maintenance = sanitize_text_field($_POST['acf_maintenance']);
        $acf_comments = sanitize_text_field($_POST['acf_comments']);
        $acf_references = sanitize_text_field($_POST['acf_references']);

        //get the logged in user id to populate author
         $current_user_id = get_current_user_id();

        // Create new post
        $new_post = array(
            'post_title'   => $post_title,
            'post_status'  => 'draft', // Set the post status to 'draft'
            'post_type'    => 'native-plant',
            'post_category' => [316], //Native Plant Database
            'post_author' => $current_user_id,
        );

        $post_id = wp_insert_post($new_post);

        // Update ACF fields using update_field() function
        update_field('common_name', $acf_common, $post_id);
        update_field('other_common_names', $acf_other_common, $post_id);
        update_field('ecoregion', $selected_ecoregions, $post_id);
        update_field('growth_form', $selected_growth, $post_id);
        update_field('min_height', $acf_min_height, $post_id);
        update_field('max_height', $acf_max_height, $post_id);
        update_field('min_spread', $acf_min_spread, $post_id);
        update_field('max_spread', $acf_max_spread, $post_id);
        update_field('light', $selected_light, $post_id);
        update_field('water', $selected_water, $post_id);
        update_field('leaf_retention', $selected_leaf, $post_id);
        update_field('lifespan', $selected_life, $post_id);
        update_field('blooming_color', $selected_color, $post_id);
        update_field('blooming_season', $selected_season, $post_id);
        update_field('seasonal_interest', $selected_interes, $post_id);
        update_field('wildlife_benefit', $selected_benefit, $post_id);
        update_field('soil_type', $selected_soil, $post_id);
        update_field('native_habitat', $selected_habitat, $post_id);
        update_field('maintenance', $acf_maintenance, $post_id);
        update_field('comments', $acf_comments, $post_id);
        update_field('native_plant_references', $acf_references, $post_id);
        
        // Handle multiple file uploads
    if (!empty($_FILES['file_upload']['name'])) {
        $uploaded_images = $_FILES['file_upload'];
        $gallery_images = array();

        // Define the upload directory path
        $upload_dir = wp_upload_dir();

        foreach ($uploaded_images['name'] as $key => $file_name) {
            $file_tmp = $uploaded_images['tmp_name'][$key];

            // Generate a unique file name to avoid overwriting
            $unique_filename = wp_unique_filename($upload_dir['path'], $file_name);
            $target_path = $upload_dir['path'] . '/' . $unique_filename;

            // Move the uploaded file to the target path
            move_uploaded_file($file_tmp, $target_path);

            // Prepare an array of attachment data
            $attachment = array(
                'post_title'     => sanitize_file_name($file_name),
                'post_mime_type' => $uploaded_images['type'][$key],
                'post_status'    => 'inherit',
            );

            // Insert the attachment into the media library
            $attach_id = wp_insert_attachment($attachment, $target_path, $post_id);

            // Generate attachment metadata and update the database
            require_once ABSPATH . 'wp-admin/includes/image.php';
            require_once ABSPATH . 'wp-admin/includes/file.php';
            $attach_data = wp_generate_attachment_metadata($attach_id, $target_path);
            wp_update_attachment_metadata($attach_id, $attach_data);

            // Add the attachment ID to the gallery_images array
            $gallery_images[] = $attach_id;
        }

        // Save the array of attachment IDs to the ACF gallery field
        update_field('native_plant_media', $gallery_images, $post_id);
}
    
    //create email to notify that plant is added
    $current_user = wp_get_current_user();
    $permalink = get_permalink($post_id);
    $notes = $_POST["native_notes"];
    
    $to      = ['XXXXXXXXXX@npsot.org'];
    // $to = ['XXXXXXXXX@gmail.com'];
    $subject = "$post_title was submitted to the Native Plant Database";
    $body    = "$post_title was submitted by $current_user->user_login -- $permalink
                $notes
    " ;
    $headers = array('Content-Type: text/plain; charset=\"utf-8\"\r\n');

    wp_mail( $to, $subject, $body, $headers );

    // Redirect after form submission (optional)
    wp_redirect(home_url('/resources/native-plants/native-plant-form-thank-you/'));
    
    exit;

}

if(!is_user_logged_in() || $_SERVER['HTTP_HOST'] !== 'npsotstg.wpengine.com') {
    echo "<h3>You must be logged in and on our staging site to use this form";
} else {
    ?>
    <div class='new-native-form-container'>
    <form method="post" enctype='multipart/form-data' action="<?php echo esc_url($_SERVER['REQUEST_URI']); ?>">
        <label class='new-native-form-heading' for="post_title">Scientific Name:</label>
        <input type="text" name="post_title" id="post_title" required>
        <p class='new-native-form-error'>Plant already exists in the database</p>

        <!-- Add ACF fields here -->
        <label class='new-native-form-heading' for="acf_common">Common Name:</label>
        <input type="text" name="acf_common" id="acf_common" required>

        <label class='new-native-form-heading' for="acf_other_common">Other Common Names:</label>
        <input type="text" name="acf_other_common" id="acf_other_common" required>


        <label class='new-native-form-heading' >Ecoregion:</label><br>
        <?php
        // Ecoregion choices
        $ecoregions = array(
            'Central Great Plains',
            'Chihuahuan Deserts',
            'Cross Timbers',
            'East Central Texas Plains',
            'Edwards Plateau',
            'Gulf Coast Prairies and Marshes',
            'High Plains',
            'Southern Texas Plains',
            'Southwestern Tablelands',
            'Texas Blackland Prairies',
            'Western Gulf Coastal Plain'
        );
        
        foreach ($ecoregions as $ecoregion) {
        echo '<label><input type="checkbox" name="ecoregion[]" value="' . esc_attr($ecoregion) . '"> ' . esc_html($ecoregion) . '</label><br>';
        }
        ?>
        
        <label class='new-native-form-heading' >Growth Form:</label><br>
        <?php
            $growths = array(
                'Cactus & Succulent',
                'Fern',
                'Grass & Sedge',
                'Groundcover',
                'Herbaceous',
                'Shrub',
                'Tree',
                'Vine',
                'Wetland'
            );

            
        foreach ($growths as $growth) {
        echo '<label><input type="checkbox" name="growth_form[]" value="' . esc_attr($growth) . '"> ' . esc_html($growth) . '</label><br>';
        }  
        ?>
        
        <label class='new-native-form-heading' for='acf_min_height'>Min Height(ft):</label>
        <input type='number' name="acf_min_height" id="acf_min_height" required>
        
        <label class='new-native-form-heading' for='acf_max_height'>Max Height(ft):</label>
        <input type='number' name="acf_max_height" id="acf_max_height" required>
        
        <label class='new-native-form-heading'  for='acf_min_spread'>Min Spread(ft):</label>
        <input type='number' name="acf_min_spread" id="acf_min_spread" required>
        
        <label class='new-native-form-heading' for='acf_max_spread'>Max Spread(ft):</label>
        <input type='number' name="acf_max_spread" id="acf_max_spread" required>
        
        <label class='new-native-form-heading'>Light:</label><br>
        <?php
        $lights = array(
            'Sun',
            'Part Shade',
            'Shade');
            
        foreach ($lights as $light) {
        echo '<label><input type="checkbox" name="acf_light[]" value="' . esc_attr($light) . '"> ' . esc_html($light) . '</label><br>';
        }  
        ?>
        
        <label class='new-native-form-heading' >Water:</label><br>
        <?php
        $waters = array(
            'Very Low',
            'Low',
            'Medium',
            'High');
            
        foreach ($waters as $water) {
        echo '<label><input type="checkbox" name="acf_water[]" value="' . esc_attr($water) . '"> ' . esc_html($water) . '</label><br>';
        }  
        ?>
        
    <label class='new-native-form-heading' for="acf_leaf">Leaf Retention:</label>
    <select name="acf_leaf" id="acf_leaf">
        <option value="Deciduous">Deciduous</option>
        <option value="Evergreen">Evergreen</option>
        <option value="Semi Evergreen">Semi Evergreen</option>
    </select>
  
    <label class='new-native-form-heading'  for="acf_life">Lifespan:</label>
    <select name="acf_life" id="acf_life">
        <option value="Annual">Annual</option>
        <option value="Biennial">Biennial</option>
        <option value="Perennial">Perennial</option>
    </select>
    
            <label class='new-native-form-heading'>Bloom Color:</label><br>
        <?php
            $colors = array(
                'Black',
                'Blue',
                'Brown',
                'Green',
                'Orange',
                'Pink',
                'Purple',
                'Red',
                'Violet',
                'White',
                'Yellow',
                'No Bloom',
            );

            
        foreach ($colors as $color) {
        echo '<label><input type="checkbox" name="acf_color[]" value="' . esc_attr($color) . '"> ' . esc_html($color) . '</label><br>';
        }  
        ?>
        
            <label class='new-native-form-heading' >Bloom Season:</label><br>
        <?php
        $seasons = array(
            'Spring',
            'Summer',
            'Winter',
            'Fall',
            'No Bloom');
            
        foreach ($seasons as $season) {
        echo '<label><input type="checkbox" name="acf_season[]" value="' . esc_attr($season) . '"> ' . esc_html($season) . '</label><br>';
        }  
        ?>
        
            <label class='new-native-form-heading' >Seasonal Interest:</label><br>
        <?php
            $interests = array(
                'Berry',
                'Flowers',
                'Fall Color',
                'Forage',
                'Fruit',
                'Larval Host',
                'Nectar',
                'Nesting Material',
                'Nuts',
                'Pollen',
                'Seeds'
            );
            
        foreach ($interests as $interest) {
        echo '<label><input type="checkbox" name="acf_interest[]" value="' . esc_attr($interest) . '"> ' . esc_html($interest) . '</label><br>';
        }  
        ?>
        
            <label class='new-native-form-heading' >Wildlife Benefit:</label><br>
        <?php
            $benefits = array(
                'Bees',
                'Beetles',
                'Birds',
                'Browsers',
                'Butterflies',
                'Caterpillars',
                'Deer',
                'Grasshoppers',
                'Hummingbirds',
                'Moths',
                'Nectar Insects',
                'Small Mammals'
            );
            
        foreach ($benefits as $benefit) {
        echo '<label><input type="checkbox" name="acf_benefit[]" value="' . esc_attr($benefit) . '"> ' . esc_html($benefit) . '</label><br>';
        }  
        ?>
        
            <label class='new-native-form-heading' >Soil Type:</label><br>
        <?php
       $soils = array(
            'Acid',
            'Alkaline',
            'Brackish',
            'Calcareous',
            'Caliche',
            'Clay',
            'Deep',
            'Dry',
            'Granitic',
            'Gravelly',
            'Limestone',
            'Loam',
            'Mud',
            'Moist',
            'Neutral',
            'Poor Drainage',
            'Rich',
            'Rocky',
            'Saline',
            'Sand',
            'Shallow',
            'Well Drained'
        );
            
        foreach ($soils as $soil) {
        echo '<label><input type="checkbox" name="acf_soil[]" value="' . esc_attr($soil) . '"> ' . esc_html($soil) . '</label><br>';
        }  
        ?>
        
            <label class='new-native-form-heading' >Native Habitat:</label><br>
        <?php
        $habitats = array(
            'Grassland',
            'Woodland',
            'Wetland or Riparian',
            'Variable');
            
        foreach ($habitats as $habitat) {
        echo '<label><input type="checkbox" name="acf_habitat[]" value="' . esc_attr($habitat) . '"> ' . esc_html($habitat) . '</label><br>';
        }  
        ?>
        
        <label class='new-native-form-heading' for="acf_maintenance">Maintenance:</label>
        <textarea type="text" name="acf_maintenance" id="acf_maintenance" required></textarea>
        
        <label class='new-native-form-heading' for="acf_comments">Comments:</label>
        <textarea type="text" name="acf_comments" id="acf_comments" required></textarea>
        
        <label class='new-native-form-heading' for="file_upload">Upload Images:</label><br>
        <input type="file" name="file_upload[]" id="file_upload" multiple><br>
        
        <label class='new-native-form-heading' for="acf_references">References:</label>
        <textarea type="text" name="acf_references" id="acf_references" required></textarea>
        
        <label class='new-native-form-heading' for="native_notes">Notes for Native Plant Committee (will not be added to database):</label>
        <textarea type="text" name="native_notes" id="native_notes" required></textarea>
        
        <!-- Add more ACF fields if needed -->

        <input type="hidden" name="action" value="submit_custom_form">
        <input id='new-native-form-button' type="submit" value="Submit">
    </form>
    </div>
    <?php
}
}

add_shortcode('native_plant_entry_form', 'native_plant_database_entry_form');
