const gridAttrsSchema = {
    type: 'object',
    properties: {
        grid: {
             title: 'Grid',
             description: '{desktop}-{tablet}-{mobile}',
             type: 'string',
        }
    }
}

export default gridAttrsSchema;