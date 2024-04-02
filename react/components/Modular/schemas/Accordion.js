// Define el esquema de personalización para el HTML
const accordionSchema = {
    type: "object",
    properties: {
         __editorItemTitle: {
            title: 'Pregunta',
            default: '',
            type: 'string'
        },
        content: {
            title: 'Respuesta',
            default: '',
            type: 'string',
            widget: { "ui:widget": "textarea" }
        }
    }
};

export default accordionSchema; 