import accordionSchema from "./Accordion";
import logicSchema from "./Logic";

// Define el esquema de personalización para el HTML
const accordionListSchema = {
    "title": "HTML",
    "type": "object",
    "properties": {
        __editorItemTitle: {
             default: 'Bloque #',
             title: 'Nombre del bloque',
             type: 'string'
        },
        logic: logicSchema,
        list: {
            type: 'array',
            title: 'Preguntas y respuestas',
            items: accordionSchema
        }
    }
};

export default accordionListSchema;