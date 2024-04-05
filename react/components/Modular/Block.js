import React, { useEffect, useState } from 'react';
import styles from "./ModularTemplate.css";
import { gridClass, checkTimeRange } from './Helpers.js';
// Importar schema
import blockSchema from './schemas/Block.js';
// Importar bloques
import Banner from './Banner.js';
import Html from './Html.js';
import CustomSlider from './Slider.js';
import Form from './Form.js';
import ConditionalComponent from './ConditionalComponent.js';
import ProductList from './ProductList.js';
import AccordionList from './AccordionList.js';
import ProductListV2 from './ProductListV2.js';
import Benefits from './Benefits.js';

// Componente de bloque
const Block = ({ __editorItemTitle, logic, cssAttrs, gridAttrs, contentType, contentAttr, ProductSummary, sectionId, columnId }) => {
    // Version logic
    const [version, setVersion] = useState(-1);
    const [component, setComponent] = useState(<></>);
    function defineVersion(){
        if(["Beneficios"].includes(contentType))
        {
            if(version != 0)
            {
                setVersion(0);
                if(contentType == "Beneficios")
                    setComponent(() => (<Benefits/>));
            }
        }
        else
        for(var i=0; i<contentAttr?.length; i++)
            if(checkTimeRange(contentAttr[i].logic))
            {
                if(version != i)
                {
                    setVersion(i);
                    if(contentType == "Banner")
                        setComponent(() => (<Banner {...contentAttr[i]} sectionId={sectionId} columnId={columnId} blockName={__editorItemTitle}/>));
                    else if(contentType == "Carrusel de banners")
                        setComponent(() => (<CustomSlider {...contentAttr[i]} itemType={"Banner"} sectionId={sectionId} columnId={columnId} blockName={__editorItemTitle}/>));
                    else if(contentType == "Carrusel de iconos")
                        setComponent(() => (<CustomSlider {...contentAttr[i]} itemType={"Icon"} sectionId={sectionId} columnId={columnId} blockName={__editorItemTitle}/>));
                    else if(contentType == "Carrusel de iconos V2")
                        setComponent(() => (<CustomSlider {...contentAttr[i]} itemType={"IconV2"} sectionId={sectionId} columnId={columnId} blockName={__editorItemTitle}/>));
                    else if(contentType == "Carrusel de productos")
                        setComponent(() => (<ProductList {...contentAttr[i]} ProductSummary={ProductSummary} sectionId={sectionId} columnId={columnId} blockName={__editorItemTitle}/>));
                    else if(contentType == "Carrusel dinamico")
                        setComponent(() => (<ProductListV2 {...contentAttr[i]} ProductSummary={ProductSummary} sectionId={sectionId} columnId={columnId} blockName={__editorItemTitle}/>));
                    else if(contentType == "HTML")
                        setComponent(() => (<Html {...contentAttr[i]} ProductSummary={ProductSummary} sectionId={sectionId} columnId={columnId} blockName={__editorItemTitle}/>));
                    else if(contentType == "Acordeón")
                        setComponent(() => (<AccordionList {...contentAttr[i]} sectionId={sectionId} columnId={columnId} blockName={__editorItemTitle}/>));
                    else if(contentType == "Formulario")
                        setComponent(() => (<Form {...contentAttr[i]} sectionId={sectionId} columnId={columnId} blockName={__editorItemTitle}/>));
                }   
                break;
            }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            defineVersion();
        }, 1000);
    }, []);
    defineVersion();
    //return null;
    // Generacion del componente
    const Component = () => (
        <div className={`${gridClass(gridAttrs)} ${cssAttrs?.class} block`}>
            {component}
        </div>);
    // Imprimir el componente evaluando las condiciones
    return (<ConditionalComponent {...logic} Component={Component}></ConditionalComponent>);
};

// Asignar esquema
Block.schema = blockSchema;

export default Block;