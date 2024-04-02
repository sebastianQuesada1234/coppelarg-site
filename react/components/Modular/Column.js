import React from 'react';
import styles from "./ModularTemplate.css";
import columnSchema from './schemas/Column.js';
import Block from './Block.js';
import ConditionalComponent from './ConditionalComponent.js';
import { gridClass } from './Helpers.js';

// Componente de la seccion
const Column = ({ logic, cssAttrs, gridAttrs,  blocks = [], ProductSummary, sectionId, columnId}) => {
    // Generacion del componente
    const Component = () => (
        <div className={`${styles.grid} ${gridClass(gridAttrs)} ${cssAttrs?.class} column`}>
            {blocks.length > 0 && blocks.map((block, index) => (
                <Block 
                    sectionId={sectionId}
                    columnId = {columnId}
                    key={index} 
                    {...block}
                    ProductSummary={ProductSummary} 
                />
            ))}
        </div>);
    // Imprimir el componente evaluando las condiciones
    return (<ConditionalComponent {...logic} Component={Component}></ConditionalComponent>);
};

// Asignar esquema
Column.schema = columnSchema;

export default Column;