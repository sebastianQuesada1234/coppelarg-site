const modularSystemSchema = {
    type: 'object',
    default: {json:'[]', copy:'[]'},
    properties: {
        showScheme : {
            title: "Mostar esquema",
            type: "boolean",
            default: false,
        }
    },
    dependencies: {
        showScheme : {
            oneOf: [
                {
                    properties: {
                        showScheme: {"enum": [true]},
                        json: {
                            title: 'Esquema JSON Actual',
                            type: 'string',
                            default: '{}',
                            readOnly: true
                    
                        },
                        copy: {
                            title: 'Esquema JSON Nuevo',
                            type: 'string',
                            default: '{}'
                        }
                    }
                }
            ]
        }
    }
}

export default modularSystemSchema;