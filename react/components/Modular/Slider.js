import React, { useEffect, useState } from 'react';
import styles from "./ModularTemplate.css";
import { secureJsonParse, checkTimeRange, sliderItems } from './Helpers.js';
import sliderSchema from './schemas/Slider.js';
import { SliderLayout } from "vtex.slider-layout";
// Importar bloques
import Banner from './Banner.js';
import Icon from './Icon.js';
import ProductList from './ProductList.js';
import IconV2 from './IconV2.js';
import ConditionalComponent from './ConditionalComponent.js';

// Componente de Slider
const Slider = ({ ProductSummary, sliderAttrs, itemType, logic, theme, banners = [], icons = [],  sectionId, columnId, blockName}) => {
    // Reglas de componentes
    const [items, setItems] = useState([]);
    function defineVersion(){
        var list = itemType == "Banner" ? banners : icons;
        var availableItems = [];
        for(var i=0; i < list?.length; i++)
            if(checkTimeRange(list[i]?.logic ?? {}))
            {
                availableItems.push(list[i]);
            }
        if(JSON.stringify(items) != JSON.stringify(availableItems))
            setItems(availableItems);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            defineVersion();
        }, 5000);
    }, []);
    defineVersion();
    // Impresion del componente
    return (
        <div className={`${styles[logic?.visibility]} ${styles.sliderContainer} ${styles[theme ?? '']} ${styles[itemType ?? '']}`}>
            <SliderLayout label={blockName} {...sliderAttrs} itemsPerPage={sliderItems(sliderAttrs?.perPage)} autoplay={{timeout:5000}} infinite={true} fullWidth={true}>
                {(() => {
                    if(itemType == "Banner")
                        return items?.map((banner, index) => (
                            <Banner {...banner} key={index}  sectionId={sectionId} columnId={columnId} position={index+1}  blockName={blockName}></Banner>
                        ))
                        else if(itemType == "Icon")
                            return items?.map((icon, index) => (
                                <Icon {...icon} key={index}  sectionId={sectionId} columnId={columnId}  blockName={blockName} position={index+1}></Icon>
                            ))
                        else if(itemType == "IconV2")
                            return items?.map((icon, index) => (
                                <IconV2 {...icon} key={index}  sectionId={sectionId} columnId={columnId}  blockName={blockName} position={index+1}></IconV2>
                            ))
                })()}
            </SliderLayout>
        </div>
    );
};

// Asignar esquema
Slider.schema = sliderSchema;

export default Slider;
