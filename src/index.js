import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';
import Edit from './edit';
// import save from './save';
registerBlockType( 'ekiline-blocks/ekiline-carousel', {
	apiVersion: 2,
	title: __( 'Ekiline Carousel', 'ekiline-carousel' ),
	description: __( 'Aqui va la descripcion del plugin',
		'ekiline-carousel'
	),
	category: 'widgets',
	icon: 'slides',
	supports: {
		html: false,
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
			type: 'array',
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

	edit: Edit,
	// save,
} );


/**
 * Incorporar bloque a una coleccion.
 */
import { registerBlockCollection } from '@wordpress/blocks';
registerBlockCollection( 'ekiline-blocks', {
	title: 'Ekiline blocks',
	icon: 'layout',
} );