
import { __ } from '@wordpress/i18n';
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
import ServerSideRender from '@wordpress/server-side-render';
import './editor.scss';
import { withSelect } from '@wordpress/data';

const setClassName = () => {
	var rand = Math.floor( Math.random() * 100 ) + 1,
		name = 'ekiline-box-' + rand + '-wrapper';
	return name;
}

export default function Edit(props) {
	const { attributes, setAttributes, blockProps = useBlockProps() } = props;
	const boxClass = setClassName();
	const MyCategoryList = ( { categories } ) => {
		if ( categories ){
			return (
				<SelectControl
					multiple
					label="Selecciona la categoria"
					value={ attributes.SetIds }
					options={ categories.map( ( category ) => (
						{ label: category.name, value: category.id }
					) ) }
					onChange={ ( newval ) =>
						setAttributes( { SetIds: newval } )
					}
					style={ { height: '150px', border:'1px solid red' } }
				/>
			)
		} else {
			return (
				<></>
			)
		}
	}

	const MyCategorySelect = withSelect( ( select ) => ( {
		categories: select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: -1 } ),
	} ) )( MyCategoryList );

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title="Contenido de carrusel" initialOpen={ true }>

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

					{ 'posts' === attributes.ChooseType && (
						<MyCategorySelect/>
					)}

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

					{ 'posts' === attributes.ChooseType && (
						<TextControl
							label={ __( '¿Cuantas publicaciones?', 'ekiline' ) }
							type="number"
							value={ attributes.SetAmount }
							onChange={ ( newval ) =>
								setAttributes( {
									SetAmount: parseInt( newval ),
								} )
							}
						/>
					) }

					{ 'posts' === attributes.ChooseType && (
						<SelectControl
							label="Organizar por:"
							value={ attributes.SetOrderBy }
							options={ [
								{ label: 'Date', value: 'date' },
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
						value={ attributes.SetColumns }
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
						value={ attributes.SetTime }
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
