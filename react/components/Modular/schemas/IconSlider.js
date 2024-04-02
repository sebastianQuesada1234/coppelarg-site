import iconSchema from './Icon.js';
import logicSchema from './Logic.js';
import sliderSchema from './Slider.js';

// Define el esquema de personalización para el slider de banners
const iconSliderSchema = {
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
        icons: {
            type: 'array',
            title: 'Categorias',
            default: [],
            items: iconSchema
        }
    }
};

export default iconSliderSchema;