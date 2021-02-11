/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';

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
import Edit from './edit';
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
	 * https://developer.wordpress.org/block-editor/developers/block-api/block-supports/
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
		// Ancho de modulo
		align: [ 'wide', 'full' ],
	},

	// Pasar argumentos.
	attributes: {
		// toolbar
		align: {
			type: 'string',
			default: '',
		},
		// panel
		ChooseType: {
			type: 'string',
			default: 'posts',
		},
		SetIds: {
			type: 'array', // multiples valores seleccionados.
			default: '',
		},
		SetAmount: {
			type: 'number',
			default: 3,
		},
		SetOrderBy: {
			type: 'string',
			default: 'date',
		},
		SetColumns: {
			type: 'number',
			default: 1,
		},
		FindBlock: {
			type: 'string',
			default: 'none',
		},
		AllowMixed: {
			type: 'boolean',
			default: false,
		},
		AddControls: {
			type: 'boolean',
			default: true,
		},
		AddIndicators: {
			type: 'boolean',
			default: true,
		},
		SetAuto: {
			type: 'boolean',
			default: true,
		},
		SetTime: {
			type: 'number',
			default: '5000',
		},
		SetAnimation: {
			type: 'string',
			default: '',
		},
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	// save,
	save: () => {
		return null;
	},
} );

/**
 * Incorporar bloque a una coleccion.
 */
import { registerBlockCollection } from '@wordpress/blocks';
registerBlockCollection( 'ekiline-blocks', {
	title: 'Ekiline blocks',
	icon: 'layout',
} );
