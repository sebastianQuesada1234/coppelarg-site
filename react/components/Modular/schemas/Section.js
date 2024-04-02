import columnSchema from './Column.js';
import cssAttrsSchema from './CssAttrs.js';
import logicSchema from './Logic.js';

// Define el esquema de personalización para la seccion
const sectionSchema = {
    title: 'Seccion',
    type: 'object',
    properties: {
        __editorItemTitle: {
             default: 'Seccion #',
             title: 'Nombre de la seccion',
             type: 'string'
        },
        logic: logicSchema,
        cssAttrs: cssAttrsSchema,
        columns: {
            type: 'array',
            title: 'Columnas',
            default: [],
            items: columnSchema
        }
    }
};

export default sectionSchema;