import { string } from 'prop-types';
import modularSystemSchema from './ModularSystem.js';
import sectionSchema from './Section.js';

// Define el esquema de personalización para el listado del banner
const templateSchema = {
    title: 'Editor Modular',
    type: 'object',
    properties: {
        style: {
            type: 'object',
            properties : {
                showAdvancedStyle : {
                    title: "Mostrar estilos",
                    type: "boolean",
                    default: false,
                }
            },
            dependencies: {
                showAdvancedStyle : {
                    oneOf: [
                        {
                            properties: {
                                showAdvancedStyle: {"enum": [true]},
                                customCss: {
                                    title: "CSS Personalizado",
                                    type: "string",
                                    widget: { "ui:widget": "textarea" }
                                },
                            }
                        }
                    ]
                }
            }
        },
        templateProps: modularSystemSchema,
        sections: {
            title: 'Seccion Container',
            type: 'object',
            properties: {
                sectionsArray: {
                    type: 'array',
                    title: 'Secciones',
                    default: [],
                    items: sectionSchema
                }
            }
        }
    }
};

export default templateSchema;