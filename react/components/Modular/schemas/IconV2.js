import icons from '../icons.json';
import logicSchema from './Logic';

// Genera un arreglo con los nombres de los archivos (sin la extensión)
const iconNames = Object.keys(icons).map((icon) => icon.replace('.svg', ''));

// Define el esquema de personalización para el icono
const iconV2Schema = {
    "title": "HTML",
    "type": "object",
    "properties": {
        __editorItemTitle: {
             default: 'Categoria',
             title: 'Etiqueta de la categoria',
             type: 'string'
        },
        logic: logicSchema,
        link: {
          type: 'string',
          title: 'URL'
        },
        content: {
            type: "object",
            properties: {
                type: {
                    type: "string",
                    title: "Tipo de contenido",
                    enum: ["Icono", "Imagen"]
                }
            },
            dependencies: {
                type : {
                    oneOf: [
                        {
                            properties: {
                                type: { "enum": [ "Icono" ] },
                                icon: {
                                    type: "string",
                                    title: "Icono",
                                    enum: iconNames,
                                    default: "Banners",
                                },
                            }
                        },
                        {
                            properties: {
                                type: { "enum": [ "Imagen" ] },
                                image: {
                                    default: '',
                                    type: 'string',
                                    widget: { "ui:widget": "image-uploader" }
                                },
                            }
                        }
                    ]
                }
            }
        },
        style: {
            type: 'object',
            properties: {
                theme: {
                    title: "Estilo",
                    type: "string",
                    enumNames: ['Default','Alternativo'],
                    enum: [``,`alterIcon`],
                    default: ''
                }
            }
        },
        offLabel : {
            type: "string",
            title: "% de descuento"
        }
    }
};

export default iconV2Schema;