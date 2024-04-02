import logicSchema from "./Logic";
import sliderSchema from "./Slider";

// Define el esquema de personalización para el HTML
const productListV2Schema = {
    "title": "HTML",
    "type": "object",
    properties: {
        __editorItemTitle: {
             default: 'Slider #',
             title: 'Nombre del slider',
             type: 'string'
        },
        logic: logicSchema,
        sliderAttrs : sliderSchema,
        title: {
             default: '',
             title: 'Titulo',
             type: 'string'
        },
        subtitle: {
             default: '',
             title: 'Subtitulo',
             type: 'string'
        },
        more: {
             default: '',
             title: 'Ver mas',
             type: 'string'
        },
        productSummaryAttrs : {
            "type": "object",
            "properties": {
                logic: {
                    title: 'Logica',
                    default: '',
                    type: 'string'
                },
                aditional: {
                    title: 'Atributos Adicionales',
                    default: '',
                    type: 'string'
                }
            }
        }
    }
};

export default productListV2Schema;