const logicSchema = {
    title: 'Logica de visualizacion',
    type: 'object',
    properties: {
        showVisibility: {
            title: "Opciones de visibilidad",
            type: "boolean",
            default: false
        }
    },
    dependencies: {
        showVisibility : {
            oneOf: [
                {
                    properties: {
                        showVisibility: {"enum": [true]},
                        visibility: {
                            title: "Pantalla",
                            type: "string",
                            enumNames: ['Todas las pantallas','Solo mobile','Solo telefono','Solo tablet', 'Solo desktop'],
                            enum: [`all`,`onlyMobile`,`onlyPhone`,`onlyTablet`,'onlyDesktop'],
                            default: 'all'
                        },
                        platform: {
                            title: "Plataforma",
                            type: "string",
                            enumNames: ['Todas las plataformas','Solo App', 'Solo Web', 'Solo Tienda'],
                            enum: [`all`,`onlyApp`,'onlyWeb', 'onlyStore'],
                            default: 'all'
                        },
                        programming: {
                            title: "Habilitar programacion",
                            type: "boolean",
                            default: false
                        }
                    }
                },
            ]
        },
        programming : {
            oneOf: [
                {
                    properties: {
                        showVisibility: {"enum": [true]},
                        programming: {"enum": [true]},
                        initialDate : {
                            title: 'Fecha de inicio',
                            type: 'string',
                            format: 'date',
                            widget: {
                               "ui:widget": "date"
                            }
                        },
                        finalDate : {
                            title: 'Fecha de fin',
                            type: 'string',
                            format: 'date',
                            widget: {
                               "ui:widget": "date"
                            }
                        },
                        initialTime : {
                            title: 'Hora de inicio',
                            type: 'string',
                            description: '00:00'
                        },
                        finalTime : {
                            title: 'Hora de fin',
                            type: 'string',
                            description: '23:59'
                        },
                        days : {
                            title: 'Dias',
                            type: 'string',
                            description: '0,1,2'
                        }
                    }
                },
            ]
        }
    }
}

export default logicSchema;