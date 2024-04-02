import htmlSchema from "./Html";
import logicSchema from "./Logic";
import cssAttrsSchema from "./CssAttrs";

// Define el esquema de personalización para el banner
const bannerSchema = {
    title: 'Banner',
    type: 'object',
    properties: {
        __editorItemTitle: {
             default: 'Bloque #',
             title: 'Nombre de la campaña',
             type: 'string'
        },
        logic: logicSchema,
        url: {
            "type": "string",
            "title": "URL de destino"
        },
        imageData: {
            type: 'object',
            properties: {
                src: {
                    title: 'Imagen',
                    default: '',
                    type: 'string',
                    widget: { "ui:widget": "image-uploader" }
                },
                savedSrc: {
                    title: 'Imagen(Guardada)',
                    default: '',
                    type: 'string',
                    isLayout: true
                },
                size: {
                    title: 'Tamaño de la imagen',
                    default: '',
                    type: 'string',
                    default: '{ancho}-{alto}',
                    isLayout: true
                }
            }
        },
        mobileImageData: {
            type: 'object',
            properties: {
                hasMobileImage: {
                    title: "Tiene imagen de mobile?",
                    type: "boolean",
                    default: false,
                },
            },
            dependencies: {
                hasMobileImage : {
                    oneOf: [
                        {
                            properties: {
                                hasMobileImage: {"enum": [true]},
                                src: {
                                    title: 'Imagen',
                                    default: '',
                                    type: 'string',
                                    widget: { "ui:widget": "image-uploader" }
                                },
                                savedSrc: {
                                    title: 'Imagen(Guardada)',
                                    default: '',
                                    type: 'string',
                                    isLayout: true
                                },
                                size: {
                                    title: 'Tamaño de la imagen',
                                    default: '',
                                    type: 'string',
                                    default: '{ancho}-{alto}',
                                    isLayout: true
                                }
                            }
                        }
                    ]
                }
            }
        },
        hasDescription : {
            title: 'Tiene descripcion?',
            type: 'boolean',
            default: false
        }
    },
    dependencies: {
        hasDescription : {
            oneOf: [
                {
                    properties: {
                        hasDescription: {"enum": [true]},
                        html: htmlSchema
                    }
                }
            ]
        }
    }
};

export default bannerSchema;