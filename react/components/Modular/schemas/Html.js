import logicSchema from "./Logic";

// Define el esquema de personalización para el HTML
const htmlSchema = {
    "title": "HTML",
    "type": "object",
    properties: {
        __editorItemTitle: {
             default: 'Bloque #',
             title: 'Nombre del bloque',
             type: 'string'
        },
        logic: logicSchema,
        content: {
           title: 'Contenido HTML',
           default: '',
           type: 'string',
           widget: { "ui:widget": "textarea" }
        }
    }
};

export default htmlSchema;