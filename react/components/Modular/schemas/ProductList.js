import logicSchema from "./Logic";
import sliderSchema from "./Slider";

// Define el esquema de personalización para el HTML
const productListSchema = {
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
                category: {
                    title: 'Categoria',
                    default: '133914',
                    description: 'departamento/categoria/..',
                    type: 'string'
                },
                specificationFilters: {
                    title: 'Filtros',
                    default: '',
                    description: '{ id: String, value: String }',
                    type: 'string'
                },
                collection: {
                    title: 'Coleccion',
                    default: '',
                    type: 'string'
                },
                orderBy: {
                    "type": "string",
                    "title": "Orden",
                    "enum": [
                        "OrderByTopSaleDESC",
                        "OrderByReleaseDateDESC",
                        "OrderByBestDiscountDESC",
                        "OrderByPriceDESC",
                        "OrderByPriceASC",
                        "OrderByNameASC",
                        "OrderByNameDESC"
                    ],
                    "default": "OrderByTopSaleDESC"
                },
                hideUnavailableItems: {
                    type: 'boolean',
                    title: 'Ocultar productos no disponibles',
                    default: false
                },
                maxItems: {
                    type: 'number',
                    title: 'Cantidad maxima de productos',
                    default: 10,
                }
            }
        }
    }
};

export default productListSchema;