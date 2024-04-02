import React from 'react';
import styles from "./ModularTemplate.css";
import { secureJsonParse, checkTimeRange } from './Helpers.js';
import sectionSchema from './schemas/Section.js';
import Column from './Column.js';
import ConditionalComponent from './ConditionalComponent.js';

// Componente de la seccion
const Section = ({ ProductSummary, cssAttrs, columns = [], logic, sectionId, analyticsIds}) => {
    // Generacion del componente
    const Component = () => (
        <section className={`${styles.section} ${cssAttrs?.class} section`}>
            <div className={`${styles.sectionContainer} ${styles.grid} section-container`}>
                {columns.length > 0 && columns.map((column) => (
                    <Column 
                        sectionId={sectionId}
                        columnId={++analyticsIds.tkr} 
                        {...column}
                        ProductSummary={ProductSummary}
                    />
                ))}
            </div>
        </section>);
    // Imprimir el componente evaluando las condiciones
    return (<ConditionalComponent {...logic} Component={Component}></ConditionalComponent>);
};

// Asignar esquema
Section.schema = sectionSchema;

export default Section;