/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	ToggleControl,
	PanelBody,
	SelectControl,
	ToolbarGroup,
	ToolbarItem,
	Button,
	TextControl,
	RangeControl,
} from '@wordpress/components';

/**
 * Auxiliar, visualizar con php.
 * https://developer.wordpress.org/block-editor/tutorials/block-tutorial/creating-dynamic-blocks/
 */
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Funciones propias
 *
 * Classname dinamica para el envoltorio del carrusel.
 * @return {name} clase de apoyo para manipular el item con js del tema.
 */
function setClassName() {
	const rand = Math.floor( Math.random() * 100 ) + 1,
		name = 'ekiline-box-' + rand + '-wrapper';
	return name;
}

/**
 * Componente para ocupar las categorias.
 * Existen varios ejercicios.
 * @ref https://wordpress.stackexchange.com/questions/372134/gutenberg-block-get-categories-in-selectcontrol
 * @ref https://wordpress.stackexchange.com/questions/352323/how-to-return-a-list-of-custom-taxonomy-terms-via-the-gutenberg-getentityrecords
 * @ref https://wordpress.stackexchange.com/questions/319035/how-would-i-get-a-taxonomy-category-list-inside-a-gutenberg-block
 * @ref https://github.com/WordPress/gutenberg/blob/b7ad77d15f32ca234ff2f3df4994e47a5cf2e6d7/packages/editor/src/components/page-attributes/README.md
 * @ref https://developer.wordpress.org/block-editor/components/select-control/
 * Finalmente solo se requiere inicializar el metodo.
 *
 * Actualizacion:
 * Para incorporar datos dinamicos, se ocupa withSelect, que es un comoponente de wp.
 * Hicimos varios experimentos y requiere al menos incorporar un IF ya que la carga de estos datos,
 * puede crear un conflicto con otros plugins.
 * 
 * ejemplo withSelect.
 * @ref https://developer.wordpress.org/block-editor/packages/packages-core-data/
 * uso de rest api
 * @ref https://developer.wordpress.org/rest-api/reference/
 * @ref https://developer.wordpress.org/rest-api/reference/categories/
 * crear un componente e incorporar despues con dudas
 * @ref https://wpdev.life/using-withselect-for-wordpress-block-components/
 * @ref https://github.com/WordPress/gutenberg/issues/14064
 * @ref https://css-tricks.com/managing-wordpress-metadata-in-gutenberg-using-a-sidebar-plugin/
 */
// wp.data
// 	.select( 'core' )
// 	.getEntityRecords( 'taxonomy', 'category', { per_page: -1 } );

// Nueva prueba, corregir la obtencion de datos.

import { withSelect } from '@wordpress/data';

/**
 * Componente de imagenes
 * Requiere: Button, MediaUpload, MediaUploadCheck
 * @ref https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/media-upload;
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes, blockProps = useBlockProps() } = props;
	const boxClass = setClassName();
	// const RetrieveCategories = wp.data
	// 	.select( 'core' )
	// 	.getEntityRecords( 'taxonomy', 'category', { per_page: -1 } )
	// 	.map( ( { id, name } ) => ( { label: name, value: id } ) );

	const MyAuthorsListBase = ( { authors, categories } ) => {

		if ( categories ){

			return (
				<SelectControl
					multiple // multiples valores seleccionados.
					label="Selecciona la categoria"
					value={ attributes.SetIds }
						// options={ RetrieveCategories }
						// options={ MyAuthorsList }
						// options={
						// 	[
						// 		{ label: 'Datex', value: 'date' },
						// 		{ label: 'Modified', value: 'modified' },
						// 		{ label: 'Title', value: 'title' },
						// 		{ label: 'Name', value: 'name' },
						// 		{ label: 'Author', value: 'author' },
						// 		{ label: 'Rand', value: 'rand' },
						// 	]
						// }
					options={ categories.map( ( author ) => (
						{ label: author.name, value: author.id }
					) ) }
					onChange={ ( newval ) =>
						setAttributes( { SetIds: newval } )
					}
					style={ { height: '150px', border:'1px solid red' } }
				/>
			);

		} else {
			return (
				<></>
			)
		}
	}
	
	const MyAuthorsList = withSelect( ( select ) => ( {
		authors: select( 'core' ).getAuthors(),
		categories: select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: -1 } ),
	} ) )( MyAuthorsListBase );	

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title="Contenido de carrusel" initialOpen={ true }>
					{ /* Atributos OK */ }
					<SelectControl
						label="Tipo de contenido"
						value={ attributes.ChooseType }
						options={ [
							{ label: 'Posts', value: 'posts' },
							{ label: 'Images', value: 'images' },
						] }
						onChange={ ( ChooseType ) =>
							setAttributes( { ChooseType } )
						}
					/>

					<MyAuthorsList/>

					{ /* Selector de categorias o insertar imagenes */ }
					{/* { 'posts' === attributes.ChooseType && (
						<SelectControl
							multiple // multiples valores seleccionados.
							label="Selecciona la categoria"
							value={ attributes.SetIds }
							// options={ RetrieveCategories }
							options={ MyAuthorsList }
							onChange={ ( newval ) =>
								setAttributes( { SetIds: newval } )
							}
							style={ { height: '150px' } }
						/>
					) } */}

					{ 'images' === attributes.ChooseType && (
						<MediaUploadCheck>
							<MediaUpload
								title={ __(
									'Ekiline Carousel: Seleccionar imagenes'
								) }
								onSelect={ ( media ) => {
									const img_ids = [];
									for (
										let i = 0, max = media.length;
										i < max;
										i += 1
									) {
										img_ids.push( media[ i ].id );
									}
									setAttributes( { SetIds: img_ids } );
								} }
								allowedTypes={ [ 'image' ] }
								multiple={ true }
								value={ attributes.SetIds }
								render={ ( { open } ) => (
									<Button isSecondary onClick={ open }>
										{ __( 'Seleccionar imagenes' ) }
									</Button>
								) }
								gallery={ false }
								addToGallery={ false }
							/>
						</MediaUploadCheck>
					) }

					{ /* Mostrar solo cuando sean posts */ }
					{ 'posts' === attributes.ChooseType && (
						<TextControl
							label={ __( '¿Cuantas publicaciones?', 'ekiline' ) }
							type="number"
							value={ attributes.SetAmount } // variable
							onChange={ ( newval ) =>
								setAttributes( {
									SetAmount: parseInt( newval ),
								} )
							}
						/>
					) }

					{ /* Mostrar solo cuando sean posts */ }
					{ 'posts' === attributes.ChooseType && (
						<SelectControl
							label="Organizar por:"
							value={ attributes.SetOrderBy }
							options={ [
								{ label: 'Datex', value: 'date' },
								{ label: 'Modified', value: 'modified' },
								{ label: 'Title', value: 'title' },
								{ label: 'Name', value: 'name' },
								{ label: 'Author', value: 'author' },
								{ label: 'Rand', value: 'rand' },
							] }
							onChange={ ( SetOrderBy ) =>
								setAttributes( { SetOrderBy } )
							}
						/>
					) }

					{ /**
					 * Buscar bloques existentes.
					 * https://developer.wordpress.org/reference/functions/get_dynamic_block_names/
					 */ }

					{ /* Mostrar solo cuando sean posts */ }
					{ 'posts' === attributes.ChooseType && (
						<SelectControl
							label={ __(
								'Buscar un bloque en un post',
								'ekiline'
							) }
							value={ attributes.FindBlock }
							options={ [
								{ label: 'None', value: 'none' },
								{ label: 'Block', value: 'core/block' },
								{
									label: 'Comments',
									value: 'core/latest-comments',
								},
								{ label: 'Archives', value: 'core/archives' },
								{ label: 'Cover', value: 'core/cover' },
							] }
							onChange={ ( FindBlock ) =>
								setAttributes( { FindBlock } )
							}
						/>
					) }

					{ /* Mostrar solo cuando el bloque es buscado */ }
					{ 'none' !== attributes.FindBlock && (
						<ToggleControl
							label={ __(
								'Si no hay bloque, permitir ver publicacion',
								'ekiline'
							) }
							checked={ attributes.AllowMixed }
							onChange={ ( AllowMixed ) =>
								setAttributes( { AllowMixed } )
							}
						/>
					) }
				</PanelBody>

				<PanelBody title="Vista de carrusel" initialOpen={ false }>
					<RangeControl
						label={ __( 'Columnas', 'ekiline' ) }
						value={ attributes.SetColumns } // variable
						onChange={ ( newval ) =>
							setAttributes( { SetColumns: parseInt( newval ) } )
						}
						min={ 1 }
						max={ 4 }
					/>

					<ToggleControl
						label={ __( 'Mostrar controles', 'ekiline' ) }
						checked={ attributes.AddControls }
						onChange={ ( AddControls ) =>
							setAttributes( { AddControls } )
						}
					/>

					<ToggleControl
						label={ __( 'Mostrar indicadores', 'ekiline' ) }
						checked={ attributes.AddIndicators }
						onChange={ ( AddIndicators ) =>
							setAttributes( { AddIndicators } )
						}
					/>

					<ToggleControl
						label={ __( 'Iniciar automáticamente', 'ekiline' ) }
						checked={ attributes.SetAuto }
						onChange={ ( SetAuto ) => setAttributes( { SetAuto } ) }
					/>

					<TextControl
						label={ __( 'Transición en milisegundos', 'ekiline' ) }
						type="number"
						value={ attributes.SetTime } // variable
						onChange={ ( newval ) =>
							setAttributes( { SetTime: parseInt( newval ) } )
						}
					/>

					<SelectControl
						label={ __( 'Tipo de animacion', 'ekiline' ) }
						value={ attributes.SetAnimation }
						options={ [
							{ label: 'Default', value: '' },
							{ label: 'Fade', value: 'fade' },
							{ label: 'Vertical', value: 'vertical' },
						] }
						onChange={ ( SetAnimation ) =>
							setAttributes( { SetAnimation } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			{ /**
			 * Agregar un boton al control de bloque
			 * https://developer.wordpress.org/block-editor/components/toolbar-item/
			 * */ }
			<BlockControls>
				<ToolbarGroup>
					<ToolbarItem
						as={ Button }
						icon="dashicons dashicons-visibility"
						title="Preview"
						onClick={ () => {
							transformarCarrusel(
								'.' + boxClass + ' .carousel-multiple'
							);
						} }
					/>
				</ToolbarGroup>
			</BlockControls>

			{ /**
			 * Un div intermedio entre bloque y delimitador aparentemente
			 * detiene la sobreejecucion de boxClass por is-hovered.
			 */ }
			<div className={ boxClass }>
				<div>
					<ServerSideRender
						block="ekiline-blocks/ekiline-carousel"
						attributes={ props.attributes }
					/>
				</div>
			</div>
		</div>
	);
}
