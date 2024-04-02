import bannerSchema from './Banner.js';
import logicSchema from './Logic.js';
import sliderSchema from './Slider.js';

// Define el esquema de personalización para el slider de banners
const bannerSliderSchema = {
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
        banners: {
            type: 'array',
            title: 'Banners',
            default: [],
            items: bannerSchema
        }
    }
};

export default bannerSliderSchema;