import React from 'react';
import styles from "./ModularTemplate.css";
import { secureJsonParse } from './Helpers.js';
import productListSchema from './schemas/ProductList.js';
import { ProductSummaryList } from 'vtex.product-summary'
import { SliderLayout } from 'vtex.slider-layout';
import { Link } from 'vtex.render-runtime';

// Componente de HTML libre
const ProductList = function({ ProductSummary, __editorItemTitle, title, subtitle, more, sliderAttrs, productSummaryAttrs,  sectionId, columnId, blockName}) {
    // Nombre para Analytics 
    var path = window.location.pathname.split("/").at(-1);
    // Validacion de atributos
    if(productSummaryAttrs != undefined && productSummaryAttrs.specificationFilters != undefined)
        productSummaryAttrs.specificationFilters = [];
    return (
        <div className={styles.productList}>
            {title != null && title != undefined ?
            <div className={styles.productListHeader}>
                <div className={styles.productListInformation}>
                    <h3 className={`${styles.productListTitle} ${styles.h3}`}>{title}</h3>
                    {subtitle != null && subtitle != undefined ? <div className={`${styles.productListSubitle} ${styles['body']}`}>{subtitle}</div> : null}
                </div>
                {more != null && more != undefined ? <Link className={`${styles.productListMore} ${styles.link}`} href={more}>Ver más</Link> : null}
            </div> : null}
            <ProductSummaryList {...productSummaryAttrs}  listName={`${path == "" ? 'Home' : path}|MO-PRO-BLO-${sectionId}|TRK-${columnId}|pro_${__editorItemTitle}`} ProductSummary={ProductSummary}>
                <SliderLayout label={blockName} {...sliderAttrs} autoplay={{timeout:5000}} infinite={true} fullWidth={true}></SliderLayout>
            </ProductSummaryList>
        </div>
    );
}

// Asignar esquema
ProductList.schema = productListSchema;

export default ProductList;
