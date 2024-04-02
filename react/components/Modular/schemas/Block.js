import accordionSchema from './Accordion.js';
import bannerSchema from './Banner.js';
import htmlSchema from './Html.js';
import formSchema from './Form.js';
import logicSchema from './Logic.js';
import cssAttrsSchema from './CssAttrs.js';
import gridAttrsSchema from './GridAttrs.js';
import { array } from 'prop-types';
import bannerSliderSchema from './BannerSlider.js';
import iconSliderSchema from './IconSlider.js';
import iconV2SliderSchema from './IconV2Slider.js';
import productListSchema from './ProductList.js';
import accordionListSchema from './AccordionList.js';
import productListV2Schema from './ProductListV2.js';

// Define el esquema de personalización para el bloque
const blockSchema = {
    title: 'Bloque',
    type: 'object',
    properties: {
        __editorItemTitle: {
             default: 'Bloque #',
             title: 'Nombre de bloque',
             type: 'string'
        },
        logic: logicSchema,
        cssAttrs: cssAttrsSchema,
        gridAttrs: gridAttrsSchema,
        contentType: {
            "type": "string",
            "title": "Tipo de contenido",
            "enum": [
                "Banner",
                "Carrusel de banners",
                "Carrusel de iconos",
                "Carrusel de iconos V2",
                "Carrusel de productos",
                "Carrusel dinamico",
                "HTML",
                "Acordeón",
                "Formulario"
            ],
            "default": "Banner"
        },
    },
    dependencies: {
        contentType : {
            oneOf: [
                {
                    "properties": {
                        contentType: { "enum": [ "Banner" ] },
                        contentAttr: {
                            type: "array",
                            title: "Versiones",
                            items: bannerSchema
                        }
                    }
                },
                {
                    "properties": {
                        contentType: { "enum": [ "Carrusel de banners"] },
                        contentAttr: {
                            type: "array",
                            title: "Versiones",
                            items: bannerSliderSchema
                        }
                    }
                },
                {
                    "properties": {
                        contentType: { "enum": [ "Carrusel de iconos"] },
                        contentAttr: {
                            type: "array",
                            title: "Versiones",
                            items: iconSliderSchema
                        }
                    }
                },
                {
                    "properties": {
                        contentType: { "enum": [ "Carrusel de iconos V2"] },
                        contentAttr: {
                            type: "array",
                            title: "Versiones",
                            items: iconV2SliderSchema
                        }
                    }
                },
                {
                    "properties": {
                        contentType: { "enum": [ "Carrusel de productos"] },
                        contentAttr: {
                            type: "array",
                            title: "Versiones",
                            items: productListSchema
                        }
                    }
                },
                {
                    "properties": {
                        contentType: { "enum": [ "Carrusel dinamico"] },
                        contentAttr: {
                            type: "array",
                            title: "Versiones",
                            items: productListV2Schema
                        }
                    }
                },
                {
                    "properties": {
                        contentType: { "enum": [ "HTML" ] },
                        contentAttr: {
                            type: "array",
                            title: "Versiones",
                            items: htmlSchema
                        }
                    }
                },
                {
                    "properties": {
                        contentType: { "enum": [ "Acordeón" ] },
                        contentAttr: {
                            type: "array",
                            title: "Versiones",
                            items: accordionListSchema
                        }
                    }
                },
                {
                    "properties": {
                        contentType: { "enum": [ "Formulario" ] },
                        contentAttr: {
                            type: "array",
                            title: "Versiones",
                            items: formSchema
                        }
                    }
                }
            ]
        }
    }
};

export default blockSchema;