/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * clases auxiliares
 */
// import { withSelect } from '@wordpress/data'; //renderiza con js
import ServerSideRender from '@wordpress/server-side-render'; // renderiza con php
import { useBlockProps } from '@wordpress/block-editor';


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
// import Edit from './edit';
// import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'ekiline-blocks/ekiline-carousel', {
	/**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,

	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Ekiline Carousel', 'ekiline-carousel' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __( 'Aqui va la descripcion del plugin', 'ekiline-carousel' ),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'slides',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	/**
	 * @see ./edit.js
	 */
	// edit: Edit,

	/**
	 * Esta opcion renderiza el bloque con marcado js
	 */
    // edit: withSelect( ( select ) => {
    //     return {
    //         posts: select( 'core' ).getEntityRecords( 'postType', 'post' ),
    //     };
    // } )( ( { posts } ) => {

    //     const blockProps = useBlockProps();

    //     return (
    //         <div { ...blockProps }>
    //             { ! posts && 'Loading' }
    //             { posts && posts.length === 0 && 'No Posts' }
    //             { posts && posts.length > 0 && (
    //                 <a href={ posts[ 0 ].link }>
    //                     { posts[ 0 ].title.rendered }
    //                 </a>
    //             ) }
    //         </div>
    //     )

	// } ),

	/**
	 * Esta opcion ocupa el callback
	 */
	edit: function( props ) {
        const blockProps = useBlockProps();
        return (
            <div {...blockProps}>
                <ServerSideRender
                    block="ekiline-blocks/ekiline-carousel"
                    attributes={ props.attributes }
                />
            </div>
        );
    },

	/**
	 * @see ./save.js
	 */
	// save,
} );

/**
 * Incorporar bloque a una coleccion.
 */
import { registerBlockCollection } from '@wordpress/blocks';
registerBlockCollection( 'ekiline-blocks', { title: 'Ekiline blocks', icon: 'layout' } );