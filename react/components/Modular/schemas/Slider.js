// Define el esquema de personalización para el slider
const sliderSchema = {
    title: 'Seccion',
    type: 'object',
    properties: {
        showAttrs: {
            title: "Mostrar atributos carrusel",
            type: "boolean",
            default: false,
        }
    },
    dependencies: {
        showAttrs : {
            oneOf: [
                {
                    properties: {
                        usePagination: {
                            title:"usar paginación?",
                            type: "boolean",
                            default: false
                        },
                        showAttrs: {"enum": [true]},
                        showNavigationArrows: {
                                        title: 'Mostrar flechas de navegacion',
                                        type: 'string',
                                        enumNames: ["Solo mobile", "Solo desktop", "Siempre", "Nunca"], 
                                        enum: ["mobileOnly", "desktopOnly", "always", "never"],
                                        default: "Siempre"
                        },
                        showPaginationDots: {
                                        title: 'Mostrar puntos de paginación',
                                        type: 'string',
                                        enumNames: ["Solo mobile", "Solo desktop", "Siempre", "Nunca"], 
                                        enum: ["mobileOnly", "desktopOnly", "always", "never"],
                                        default: "Siempre"
                        },
                        perPage : {
                            title: 'Items por pagina',
                            type: 'string',
                            default: '',
                            description: '{desktop}-{tablet}-{mobile}'
                        },
                        navigationStep: {
                            title: 'Items por scroll',
                            type: 'number',
                        }
                    }
                }
            ]
        }
    }
};

export default sliderSchema;