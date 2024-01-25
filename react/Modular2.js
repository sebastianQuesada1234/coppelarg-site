import React from 'react';

function CustomComponent({sections, Carrousel}) {
    const isMobile = window.innerWidth < 768;
    var moduls = '';
    console.log(sections)
    if(sections != undefined)
    {
        moduls = sections.map(() => (
            <div><Carrousel/></div>
        ))
    }
    return(
       <div>
        <div>TEXT</div>
        {moduls}
       </div>
    );
}
  
  CustomComponent.defaultProps = {
    title: "Title Default"
  }
  CustomComponent.schema = {
    title: "Custom Component",
    type: "object",
    properties: {
      sections: {
        type: 'array',
        title: 'Secciones',
        items: { //item configuration
           type: 'object',
           title: 'Seccion',
           properties: {
                __editorItemTitle: { // now change name is available
                    default: 'Seccion',
                    title: 'Nombre de la seccion',
                    type: 'string'
                },
                type: {
                    title: 'Tipo',
                    type: 'string',
                    enum: ['Carrusel', 'Banner']
                }
           }
        }
     }
    }
  }

export default CustomComponent;