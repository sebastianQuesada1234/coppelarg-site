import React from 'react';
import styles from "./ModularTemplate.css";
import bannerSchema from './schemas/Banner.js';
import Html from './Html.js';
import AnalyticsWrapper from './AnalyticsWrapper.js';
import LazyImage from './LazyImage.js';

// Componente de banner
const Banner = ({__editorItemTitle, url, imageData, mobileImageData, hasDescription, html, position, sectionId, columnId, blockName}) => {
    // Auto TAG
    var analyticsData = {
      promotionId :  `|MO-PRO-BLO-${sectionId}|TRK-${columnId}|pro_${blockName}`,
      promotionName : __editorItemTitle,
      formattedSrc : imageData?.src,
      promotionPosition : position ?? 1,
      promotionProductId : `pro_${blockName}`,
      promotionProductName : __editorItemTitle
    }
    // Componente
    var Banner = () => (
        <a href={ url?.replace('https://www.coppel.com.ar', '') }  className={`${styles.banner}`}>
          <LazyImage imageData={imageData} mobileImageData={mobileImageData} alt={__editorItemTitle} title={__editorItemTitle}></LazyImage>
          {
            (() => {
              if(hasDescription != undefined && hasDescription == true && html != undefined)
                return <Html {...html} />
            })() 
          }
        </a>);
    // Imprimir el componente evaluando las condiciones
    return (<AnalyticsWrapper item={analyticsData} Component={Banner}></AnalyticsWrapper>);
}

// Asignar esquema
Banner.schema = bannerSchema;

export default Banner;
