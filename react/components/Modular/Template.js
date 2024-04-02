import React, { useEffect, useState } from 'react';
import styles from "./ModularTemplate.css";
import Section from './Section.js';
import templateSchema from './schemas/Template.js';
import { secureJsonParse } from './Helpers.js';

// Componente general
const Template = ({ ProductSummary, templateProps, sections, style}) => {
    // Guardado y sobreescritura de componente
    if(templateProps != undefined &&  templateProps.showScheme != undefined && templateProps.showScheme == true && templateProps.json != undefined)
    {
      if(templateProps.copy != null && templateProps.copy != undefined && templateProps.copy != '' && templateProps.copy != '[]')
      {
        const copy = secureJsonParse(templateProps.copy,[]);
        if(copy.length > 0)
        {
          sections.sectionsArray = copy;
          templateProps.copy = "[]";
        }
      }
      templateProps.json = JSON.stringify(sections?.sectionsArray);
    }
    // Id globales de Analytics
    var analyticsIds = { tkr : 0 };
    // Impresion de componente
    return (
      <div className={styles.modularTemplate+" template-modular"}>
        <style dangerouslySetInnerHTML={{ __html: style?.customCss }}></style>
        {sections?.sectionsArray?.map((section, index) => (
          <Section
            analyticsIds={analyticsIds}
            sectionId={index+1} 
            {...section} 
            ProductSummary={ProductSummary}
          />
        ))}
      </div>
    );
};

// Asignar esquema
Template.schema = templateSchema;

export default Template;