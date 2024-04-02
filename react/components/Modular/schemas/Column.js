import blockSchema from './Block.js';
import logicSchema from './Logic.js';
import cssAttrsSchema from './CssAttrs.js';
import gridAttrsSchema from './GridAttrs.js';

// Define el esquema de personalización para la seccion
const columnSchema = {
    title: 'Columna',
    type: 'object',
    properties: {
        __editorItemTitle: {
             default: 'Columna #',
             title: 'Nombre de la columna',
             type: 'string'
        },
        logic: logicSchema,
        cssAttrs: cssAttrsSchema,
        gridAttrs: gridAttrsSchema,
        blocks: {
            type: 'array',
            title: 'Bloques',
            default: [],
            items: blockSchema
        }
    }
};

export default columnSchema;