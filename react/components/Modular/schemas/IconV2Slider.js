import iconV2Schema from './IconV2.js';
import logicSchema from './Logic.js';
import sliderSchema from './Slider.js';

// Define el esquema de personalización para el slider de banners
const iconV2SliderSchema = {
    title: 'Seccion',
    type: 'object',
    properties: {
        __editorItemTitle: {
             default: 'Slider #',
             title: 'Nombre del slider',
             type: 'string'
        },
        logic: logicSchema,
        sliderAttrs : sliderSchema,
        theme: {
            title: "Estilo",
            type: "string",
            enumNames: ['Default','Alternativo'],
            enum: [``,`alter`],
            default: ''
        },
        icons: {
            type: 'array',
            title: 'Categorias',
            default: [],
            items: iconV2Schema
        }
    }
};

export default iconV2SliderSchema;