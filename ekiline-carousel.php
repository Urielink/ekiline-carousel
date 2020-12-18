<?php
/**
 * Plugin Name:     Ekiline Carousel
 * Description:     Aqui va la descripcion del plugin
 * Version:         0.1.0
 * Author:          Uri Lazcano (Urielink)
 * License:         GPL-2.0-or-later
 * License URI:     http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:     ekiline-carousel
 *
 * @package         ekiline-blocks
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function ekiline_blocks_ekiline_carousel_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "ekiline-blocks/ekiline-carousel" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'ekiline-blocks-ekiline-carousel-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'ekiline-blocks-ekiline-carousel-block-editor', 'ekiline-carousel' );

	// $editor_css = 'build/index.css';
	// wp_register_style(
	// 	'ekiline-blocks-ekiline-carousel-block-editor',
	// 	plugins_url( $editor_css, __FILE__ ),
	// 	array(),
	// 	filemtime( "$dir/$editor_css" )
	// );

	// $style_css = 'build/style-index.css';
	// wp_register_style(
	// 	'ekiline-blocks-ekiline-carousel-block',
	// 	plugins_url( $style_css, __FILE__ ),
	// 	array(),
	// 	filemtime( "$dir/$style_css" )
	// );

	register_block_type( 'ekiline-blocks/ekiline-carousel', array(
		'editor_script' => 'ekiline-blocks-ekiline-carousel-block-editor',
		// 'editor_style'  => 'ekiline-blocks-ekiline-carousel-block-editor',
		// 'style'         => 'ekiline-blocks-ekiline-carousel-block',
		// Render call back crea el objeto en el front.
        'render_callback' => 'gutenberg_examples_dynamic_render_callback'
	) );
}
add_action( 'init', 'ekiline_blocks_ekiline_carousel_block_init' );

/**
 * Funcion php para muestreo en front
 */
function gutenberg_examples_dynamic_render_callback( $block_attributes, $content ) {
    // $recent_posts = wp_get_recent_posts( array(
    //     'numberposts' => 1,
    //     'post_status' => 'publish',
    // ) );
    // if ( count( $recent_posts ) === 0 ) {
    //     return 'No posts';
    // }
    // $post = $recent_posts[ 0 ];
    // $post_id = $post['ID'];
    // return sprintf(
    //     '<a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a>',
    //     esc_url( get_permalink( $post_id ) ),
    //     esc_html( get_the_title( $post_id ) )
	// );

	$carousel = do_shortcode('[ekiline-carousel type="images" id="611,1045,49,50,52,51"]');
	return $carousel;
}
