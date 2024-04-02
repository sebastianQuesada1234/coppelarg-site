import React from 'react';
import styles from "./ModularTemplate.css";
import accordionListSchema from './schemas/AccordionList.js';
import Accordion from './Accordion.js';

// Componente de la seccion
const AccordionList = ({ list }) => {
    // Generacion del componente
    return (
        <div className={styles.accordionList}>
        {
            list?.map((item, index)=>(
                <Accordion {...item}/>
            ))
        }
        </div>);
};

// Asignar esquema
AccordionList.schema = accordionListSchema;

export default AccordionList;