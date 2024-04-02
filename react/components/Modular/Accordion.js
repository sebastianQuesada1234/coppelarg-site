import React, { useState } from 'react';
import styles from "./ModularTemplate.css";
import accordionSchema from './schemas/Accordion.js';

// Componente de HTML libre
const Accordion = function({ __editorItemTitle, content}) {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className={styles.accordionItem}>
        <div className={styles.accordionTitle} onClick={toggleAccordion}>
          {__editorItemTitle}
          <span>{isOpen ? 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.21967 17.0303C2.51256 17.3232 2.98744 17.3232 3.28033 17.0303L12 8.31065L20.7197 17.0303C21.0126 17.3232 21.4874 17.3232 21.7803 17.0303C22.0732 16.7374 22.0732 16.2625 21.7803 15.9697L12.8839 7.07321C12.3957 6.58505 11.6043 6.58505 11.1161 7.07321L2.21967 15.9697C1.92678 16.2625 1.92678 16.7374 2.21967 17.0303Z" fill="#1B1A16"/></svg>
            : 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.21967 7.01973C2.51256 6.72684 2.98744 6.72684 3.28033 7.01973L12 15.7394L20.7197 7.01973C21.0126 6.72684 21.4874 6.72684 21.7803 7.01973C22.0732 7.31263 22.0732 7.7875 21.7803 8.08039L12.8839 16.9768C12.3957 17.465 11.6043 17.465 11.1161 16.9768L2.21967 8.08039C1.92678 7.7875 1.92678 7.31263 2.21967 7.01973Z" fill="#1B1A16"/></svg>
          }</span>
        </div>
        {isOpen && (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
  )
}

// Asignar esquema
Accordion.schema = accordionSchema;

export default Accordion;
