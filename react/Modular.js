import React from 'react';import { ProductSummaryList } from 'vtex.product-summary'


function CustomComponent({sections, Carrousel}) {
    const isMobile = window.innerWidth < 768;
    var moduls = '';
    console.log('Carrousel');
    console.log(Carrousel);
    console.log(<Carrousel/>);
    if(sections != undefined)
    {
        moduls = sections.map(() => (
            <div><Carrousel/></div>
        ))
    }
    return(
       <div>
        <div>TEXT</div>
            <div><Carrousel/></div>
            <div><ProductSummaryList /></div>
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
                products: {
                    title: "Products",
                    properties: {
                        filterOption: {
                        title: "Origin",
                        type: "string",
                        enum: ["OrderByTopSaleDESC", "collection"],
                        enumNames: [
                            "Show the best selling products",
                            "Display products from an existing collection"
                        ],
                        default: "OrderByTopSaleDESC"
                        }
                    },
                    required: ["filterOption"],
                    dependencies: {
                        filterOption: {
                        oneOf: [
                            {
                            "title": "Products",
                            "properties": {
                                "filterOption": {
                                "enum": ["collection"]
                                },
                                "collection": {
                                "title": "Collection ID",
                                "type": "string"
                                }
                            },
                            "required": ["collection"]
                            }
                        ]
                        }
                    }
                },
           }
        }
     }
    }
  }

export default CustomComponent;