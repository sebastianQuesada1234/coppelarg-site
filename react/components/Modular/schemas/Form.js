import gridAttrsSchema from "./GridAttrs";
import logicSchema from "./Logic";

// Define el esquema de personalización para el form
const formSchema = {
    title: 'Formulario',
    type: 'object',
    properties: {
        __editorItemTitle: {
            default: 'Formulario',
            title: 'Nombre del fomulario(Solo editor)',
            type: 'string'
        },
        logic: logicSchema,
        entity: {
            default: 'CL',
            title: 'Entidad de masterdata',
            type: 'string'
        },
        fields: {
            type: 'array',
            title: 'Campos',
            default: [],
            items: {
                title: 'Campo',
                type: 'object',
                properties: {
                    __editorItemTitle: {
                        title: "Nombre del campo",
                        type: "string",
                        default: ""
                    },
                    mdLabel: {
                        title: "ID(masterdata)",
                        type: "string",
                        default: ""
                    },
                    type: {
                        title: "Tipo de campo",
                        type: "string",
                        default: "",
                        enum: ["Texto","Nro","DNI","Correo"]
                    },
                    gridAttr: gridAttrsSchema
                }
            }
        },
        checks: {
            title: "Validaciones a realizar",
            type: "array",
            default: "",
            items: {
                title: 'validacion',
                type: 'object',
                properties: {
                    __editorItemTitle: {
                        title: "Identificador del check",
                        type: "string",
                        default: ""
                    },
                    htmlLabel: {
                        type: "string",
                        title: "Etiqueta de validacion",
                        default: "",
                        widget: { "ui:widget": "textarea" }
                    }
                }
            }
        },
        button: {
            title: "Texto del boton",
            type: "string",
            default: ""
        },
        succesMessage: {
            title: "Mensaje de exito",
            type: "string",
            default: ""
        },
        showSuccesMessage: {
            title: "Previsualizar mensaje de exito",
            type: "boolean",
            default: false
        }
    }
};

export default formSchema;