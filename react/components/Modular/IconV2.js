import React from 'react';
import styles from "./ModularTemplate.css";
import { secureJsonParse } from './Helpers.js';
import iconV2Schema from './schemas/IconV2.js';
import icons from './icons.json';
import Html from './Html.js';
import AnalyticsWrapper from './AnalyticsWrapper.js';

// Componente de HTML libre
const IconV2 = ({__editorItemTitle, content, link, style, offLabel, sectionId, columnId, blockName, position}) =>{
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
        <a href={link} className={`${styles.iconV2Link} ${styles[style?.theme]}`}>
            <div className={`${styles.iconV2Container} ${styles[content?.type == "Icono" ? "icon" : "noIcon" ]}`}>
                { content?.type == "Icono" &&
                    <div className={styles.icon} dangerouslySetInnerHTML={{ __html: icons[content.icon] }}/>
                }
                { content?.type == "Imagen" &&
                    <img className={styles.icon} src={content.image} alt={__editorItemTitle} title={__editorItemTitle} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy"/>
                }
            </div>
            <div className={styles.action}>{__editorItemTitle}</div>
            {offLabel != undefined && <Html content={`<div class="body-small ${styles.discountTagIconV2}">Hasta <SearchDiscount search="${offLabel ?? ""}"/></div>`} />}
        </a>
    );
    // Imprimir el componente evaluando las condiciones
    return (<AnalyticsWrapper width={"fit-content"} item={analyticsData} Component={Icon}></AnalyticsWrapper>);
};

// Asignar esquema
IconV2.schema = iconV2Schema;

export default IconV2;


