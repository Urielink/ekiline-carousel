(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{7:function(e,t,n){}}]),function(e){function t(t){for(var o,a,i=t[0],c=t[1],u=t[2],d=0,p=[];d<i.length;d++)a=i[d],Object.prototype.hasOwnProperty.call(l,a)&&l[a]&&p.push(l[a][0]),l[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);for(s&&s(t);p.length;)p.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,i=1;i<n.length;i++){var c=n[i];0!==l[c]&&(o=!1)}o&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},l={0:0},r=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var i=window.webpackJsonp=window.webpackJsonp||[],c=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var s=c;r.push([9,1]),n()}([function(e,t){e.exports=window.wp.element},function(e,t){e.exports=window.wp.components},function(e,t){e.exports=window.wp.i18n},function(e,t){e.exports=window.wp.blockEditor},function(e,t){e.exports=window.wp.blocks},function(e,t){e.exports=window.wp.serverSideRender},function(e,t){e.exports=window.wp.data},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(4),l=n(2),r=(n(6),n(3)),a=(n(7),n(0)),i=n(1),c=n(5),u=n.n(c);n(8),Object(o.registerBlockType)("ekiline-blocks/ekiline-carousel",{apiVersion:2,title:Object(l.__)("Ekiline Carousel","ekiline-carousel"),description:Object(l.__)("Aqui va la descripcion del plugin","ekiline-carousel"),category:"widgets",icon:"slides",supports:{html:!1,align:["wide","full"]},attributes:{align:{type:"string",default:""},ChooseType:{type:"string",default:"posts"},SetIds:{type:"array",default:""},SetAmount:{type:"number",default:3},SetOrderBy:{type:"string",default:"date"},SetColumns:{type:"number",default:1},FindBlock:{type:"string",default:"none"},AllowMixed:{type:"boolean",default:!1},AddControls:{type:"boolean",default:!0},AddIndicators:{type:"boolean",default:!0},SetAuto:{type:"boolean",default:!0},SetTime:{type:"number",default:"5000"},SetAnimation:{type:"string",default:""}},edit:function(e){var t=e.attributes,n=e.setAttributes,o=e.blockProps,c=void 0===o?Object(r.useBlockProps)():o,s="ekiline-box-"+(Math.floor(100*Math.random())+1)+"-wrapper",d=wp.data.select("core").getEntityRecords("taxonomy","category",{per_page:-1}).map((function(e){var t=e.id;return{label:e.name,value:t}}));return Object(a.createElement)("div",c,Object(a.createElement)(r.InspectorControls,null,Object(a.createElement)(i.PanelBody,{title:"Contenido de carrusel",initialOpen:!0},Object(a.createElement)(i.SelectControl,{label:"Tipo de contenido",value:t.ChooseType,options:[{label:"Posts",value:"posts"},{label:"Images",value:"images"}],onChange:function(e){return n({ChooseType:e})}}),"posts"===t.ChooseType&&Object(a.createElement)(i.SelectControl,{multiple:!0,label:"Selecciona la categoria",value:t.SetIds,options:d,onChange:function(e){return n({SetIds:e})},style:{height:"150px"}}),"images"===t.ChooseType&&Object(a.createElement)(r.MediaUploadCheck,null,Object(a.createElement)(r.MediaUpload,{title:Object(l.__)("Ekiline Carousel: Seleccionar imagenes"),onSelect:function(e){for(var t=[],o=0,l=e.length;o<l;o+=1)t.push(e[o].id);n({SetIds:t})},allowedTypes:["image"],multiple:!0,value:t.SetIds,render:function(e){var t=e.open;return Object(a.createElement)(i.Button,{isSecondary:!0,onClick:t},Object(l.__)("Seleccionar imagenes"))},gallery:!1,addToGallery:!1})),"posts"===t.ChooseType&&Object(a.createElement)(i.TextControl,{label:Object(l.__)("¿Cuantas publicaciones?","ekiline"),type:"number",value:t.SetAmount,onChange:function(e){return n({SetAmount:parseInt(e)})}}),"posts"===t.ChooseType&&Object(a.createElement)(i.SelectControl,{label:"Organizar por:",value:t.SetOrderBy,options:[{label:"Date",value:"date"},{label:"Modified",value:"modified"},{label:"Title",value:"title"},{label:"Name",value:"name"},{label:"Author",value:"author"},{label:"Rand",value:"rand"}],onChange:function(e){return n({SetOrderBy:e})}}),"posts"===t.ChooseType&&Object(a.createElement)(i.SelectControl,{label:Object(l.__)("Buscar un bloque en un post","ekiline"),value:t.FindBlock,options:[{label:"None",value:"none"},{label:"Block",value:"core/block"},{label:"Comments",value:"core/latest-comments"},{label:"Archives",value:"core/archives"},{label:"Cover",value:"core/cover"}],onChange:function(e){return n({FindBlock:e})}}),"none"!==t.FindBlock&&Object(a.createElement)(i.ToggleControl,{label:Object(l.__)("Si no hay bloque, permitir ver publicacion","ekiline"),checked:t.AllowMixed,onChange:function(e){return n({AllowMixed:e})}})),Object(a.createElement)(i.PanelBody,{title:"Vista de carrusel",initialOpen:!1},Object(a.createElement)(i.RangeControl,{label:Object(l.__)("Columnas","ekiline"),value:t.SetColumns,onChange:function(e){return n({SetColumns:parseInt(e)})},min:1,max:4}),Object(a.createElement)(i.ToggleControl,{label:Object(l.__)("Mostrar controles","ekiline"),checked:t.AddControls,onChange:function(e){return n({AddControls:e})}}),Object(a.createElement)(i.ToggleControl,{label:Object(l.__)("Mostrar indicadores","ekiline"),checked:t.AddIndicators,onChange:function(e){return n({AddIndicators:e})}}),Object(a.createElement)(i.ToggleControl,{label:Object(l.__)("Iniciar automáticamente","ekiline"),checked:t.SetAuto,onChange:function(e){return n({SetAuto:e})}}),Object(a.createElement)(i.TextControl,{label:Object(l.__)("Transición en milisegundos","ekiline"),type:"number",value:t.SetTime,onChange:function(e){return n({SetTime:parseInt(e)})}}),Object(a.createElement)(i.SelectControl,{label:Object(l.__)("Tipo de animacion","ekiline"),value:t.SetAnimation,options:[{label:"Default",value:""},{label:"Fade",value:"fade"},{label:"Vertical",value:"vertical"}],onChange:function(e){return n({SetAnimation:e})}}))),Object(a.createElement)(r.BlockControls,null,Object(a.createElement)(i.ToolbarGroup,null,Object(a.createElement)(i.ToolbarItem,{as:i.Button,icon:"dashicons dashicons-visibility",title:"Preview",onClick:function(){transformarCarrusel("."+s+" .carousel-multiple")}}))),Object(a.createElement)("div",{className:s},Object(a.createElement)("div",null,Object(a.createElement)(u.a,{block:"ekiline-blocks/ekiline-carousel",attributes:e.attributes}))))},save:function(){return null}}),Object(o.registerBlockCollection)("ekiline-blocks",{title:"Ekiline blocks",icon:"layout"})}]);