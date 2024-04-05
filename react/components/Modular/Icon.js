import React from 'react';
import styles from "./ModularTemplate.css";
import { secureJsonParse } from './Helpers.js';
import iconSchema from './schemas/Icon.js';
import icons from './icons.json';
import AnalyticsWrapper from './AnalyticsWrapper.js';

// Componente de HTML libre
const Icon = ({__editorItemTitle, content, link, style, sectionId, columnId, blockName, position}) =>{
    // Auto TAG
    var analyticsData = {
      promotionId :  `|MO-PRO-BLO-${sectionId}|TRK-${columnId}|pro_${blockName}`,
      promotionName : __editorItemTitle,
      formattedSrc : content?.type == "Imagen" ? content?.image : content.icon,
      promotionPosition : position ?? 1,
      promotionProductId : `pro_${blockName}`,
      promotionProductName : __editorItemTitle
    }
    // Componente
    var Icon = () => (
        <a href={link} className={`${styles.iconLink}`}>
            <div className={`${styles.iconContainer} ${styles[content?.type == "Icono" ? "icon" : "noIcon" ]} ${styles[style?.theme]}`}>
                { content?.type == "Icono" &&
                    <div className={styles.icon} dangerouslySetInnerHTML={{ __html: icons[content.icon] }}/>
                }
                { content?.type == "Imagen" &&
                    <img className={styles.icon} src={content?.image} alt={__editorItemTitle} title={__editorItemTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy"/>
                }
            </div>
            <div className={`${styles['subtitle-1']} ${styles.iconText}`}>{__editorItemTitle}</div>
        </a>
    );
    // Imprimir el componente evaluando las condiciones
    return (<AnalyticsWrapper width={"fit-content"} item={analyticsData} Component={Icon}></AnalyticsWrapper>);
};

// Asignar esquema
Icon.schema = iconSchema;

export default Icon;


