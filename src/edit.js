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
import { useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { ToggleControl, PanelBody, PanelRow, CheckboxControl, SelectControl, ColorPicker, Toolbar, ToolbarGroup, ToolbarButton, ToolbarItem, Button, Placeholder, Disabled, TextControl, RangeControl } from '@wordpress/components';

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
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {

	const { attributes, setAttributes, blockProps = useBlockProps() } = props;
	const boxClass = setClassName();

	return (
		<div {...blockProps}>

			<InspectorControls>
				<PanelBody
					title="Contenido de carrusel"
					initialOpen={false}
				>
					{/* Atributos OK */}
					<SelectControl
						label="Tipo de contenido"
						value={attributes.ChooseType}
						options={[
							{label: "Posts", value: 'posts'},
							{label: "Images", value: 'images'},
						]}
						onChange={(ChooseType) => setAttributes({ ChooseType })}
					/>

					<TextControl
						label={__("Inserta IDs", 'ekiline')}
						value={attributes.SetIds} // variable
						onChange={(newval) => setAttributes({ SetIds:newval })}
					/>

					{/* Mostrar solo cuando sean posts */}
					{ 'posts' === attributes.ChooseType &&
						<TextControl
							label={__("¿Cuantas publicaciones?", 'ekiline')}
							type="number"
							value={attributes.SetAmount} // variable
							onChange={(newval) => setAttributes({ SetAmount: parseInt(newval) })}
						/>
					}

					{/* Mostrar solo cuando sean posts */}
					{ 'posts' === attributes.ChooseType &&
						<SelectControl
							label="Organizar por:"
							value={attributes.SetOrderBy}
							options={[
								{label: "Date", value: 'date'},
								{label: "Modified", value: 'modified'},
								{label: "Title", value: 'title'},
								{label: "Name", value: 'name'},
								{label: "Author", value: 'author'},
								{label: "Rand", value: 'rand'},
							]}
							onChange={(SetOrderBy) => setAttributes({ SetOrderBy })}
						/>
					}

					{/** 
					 * Buscar bloques existentes.
					 * https://developer.wordpress.org/reference/functions/get_dynamic_block_names/
					 */}

					{/* Mostrar solo cuando sean posts */}
					{ 'posts' === attributes.ChooseType &&
						<SelectControl
							label={__("Buscar un bloque en un post", 'ekiline')}
							value={attributes.FindBlock}
							options={[
								{label: "None", value: 'none'},
								{label: "Block", value: 'core/block'},
								{label: "Comments", value: 'core/latest-comments'},
								{label: "Archives", value: 'core/archives'},
								{label: "Cover", value: 'core/cover'},
							]}
							onChange={(FindBlock) => setAttributes({ FindBlock })}
						/>
					}

					{/* Mostrar solo cuando el bloque es buscado */}
					{ 'none' !== attributes.FindBlock &&
						<ToggleControl
							label={__("Si no hay bloque, permitir ver publicacion", 'ekiline')}
							checked={attributes.AllowMixed}
							onChange={(AllowMixed) => setAttributes({ AllowMixed })}
						/>
					}

				</PanelBody>

				<PanelBody
					title="Vista de carrusel"
					initialOpen={true}
				>

					<RangeControl
						label={__("Columnas", 'ekiline')}
						value={attributes.SetColumns} // variable
						onChange={(newval) => setAttributes({ SetColumns: parseInt(newval) })}						
						min={ 1 }
						max={ 4 }
					/>

					<ToggleControl
						label={__("Mostrar controles", 'ekiline')}
						checked={attributes.AddControls}
						onChange={(AddControls) => setAttributes({ AddControls })}
					/>

					<ToggleControl
						label={__("Mostrar indicadores", 'ekiline')}
						checked={attributes.AddIndicators}
						onChange={(AddIndicators) => setAttributes({ AddIndicators })}
					/>

					<ToggleControl
						label={__("Iniciar automáticamente", 'ekiline')}
						checked={attributes.SetAuto}
						onChange={(SetAuto) => setAttributes({ SetAuto })}
					/>

					<TextControl
						label={__("Transición en milisegundos", 'ekiline')}
						type="number"
						value={attributes.SetTime} // variable
						onChange={(newval) => setAttributes({ SetTime: parseInt(newval) })}
					/>

					<SelectControl
						label={__("Tipo de animacion", 'ekiline')}
						value={attributes.SetAnimation}
						options={[
							{label: "Default", value: ''},
							{label: "Fade", value: 'fade'},
							{label: "Vertical", value: 'vertical'},
						]}
						onChange={(SetAnimation) => setAttributes({ SetAnimation })}
					/>

				</PanelBody>

			</InspectorControls>

			{/**
			 * Agregar un boton al control de bloque
			 * https://developer.wordpress.org/block-editor/components/toolbar-item/
			 * */}
			<BlockControls>
				<ToolbarGroup>
					<ToolbarItem 
						as={ Button }
						onClick={ () => {
							console.log( '.'+ boxClass +' .carousel-multiple' );
							transformarCarrusel('.'+ boxClass +' .carousel-multiple');
						} }
					>preview</ToolbarItem>
				</ToolbarGroup>
			</BlockControls>

			<div className={ boxClass }>
				<ServerSideRender
					block="ekiline-blocks/ekiline-carousel"
					attributes={ props.attributes }
				/>
			</div>

		</div>
	);
}

// Establecer el nombre del contenedor.
function setClassName() {
	const rand = Math.floor(Math.random() * 100) + 1,
	name = 'ekiline-carousel-box-' + rand + '-col';
	return name;
}

// // ejecutar preview
// function transformarCarrusel(carrusel){

// 	jQuery(document).ready(function( $ ) {

// 		if ( 0 === $(carrusel).length ) {
// 			return;
// 		}

// 		$(carrusel).each(function(){
// 			// Vistas, columnas y grupo.
// 			var params = [ ['x2','6','0'],['x3','4','1'],['x4','3','2'],['x6','2','4'] ];
// 			var view, item;
// 			// Envoltorio extra para agrupar.
// 			for ( var i = 0; i < params.length; i++ ) {
// 				if ( $(this).hasClass( params[i][0] ) ){
// 					item = params[i][1];
// 					view = params[i][2];
// 				}
// 			}
// 			// Items envoltorio.
// 			$(this).find('.carousel-item').each(function(){
// 				$(this).children().wrapAll('<figure class="col-md-' + item + '">','</figure>');
// 			});
// 			// Loop grupos.
// 			$(this).find( '.carousel-item').each(function(){
// 				// Copiar el primer slide y agregarlo.
// 				var next = $(this).next();
// 				if ( !next.length ) {
// 					next = $(this).siblings(':first');
// 				}
// 				next.children(':first-child').clone().appendTo( $(this) );
// 				// Agrupar slides (view).
// 				for ( var i=0;i<view;i++ ) {
// 					next = next.next();
// 					if ( !next.length ) {
// 						next = $(this).siblings(':first');
// 					}
// 					next.children(':first-child').clone().appendTo( $(this) );
// 				}
// 			});

// 		});

// 	});

// }