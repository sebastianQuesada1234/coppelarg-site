import React, { useEffect, useState } from 'react';
import styles from "./ModularTemplate.css";
import { secureJsonParse } from './Helpers.js';
import productListSchema from './schemas/ProductList.js';
import { ProductSummaryList } from 'vtex.product-summary'
import { SliderLayout } from 'vtex.slider-layout';
import { Link } from 'vtex.render-runtime';
import productListV2Schema from './schemas/ProductListV2.js';

// Componente de HTML libre
const ProductListV2 = function({ ProductSummary, __editorItemTitle, title, subtitle, more, sliderAttrs, productSummaryAttrs,  sectionId, columnId, blockName}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {

        const fetchData = async (url) => {
            var productList = [];
            try {
                var response = await fetch(url)
                var data = await response.json();
                for(var i=0; i< data.length ; i++)
                {
                    var p = data[i];
                    var productClusters = [];
                    for (const [id, name] of Object.entries(p.productClusters))
                    {
                        productClusters.push({ id: parseInt(id), name });
                    }
                    var clusterHighlights = [];
                    for (const [id, name] of Object.entries(p.clusterHighlights))
                    {
                        clusterHighlights.push({ id: parseInt(id), name });
                    }
                    var sku = null;
                    for(var x=0; x< p.items.length; x++)
                    {
                        var tempP = p.items[x];
                        if(tempP.sellers[0].commertialOffer.IsAvailable == true)
                        {
                            sku = tempP;
                            break;
                        }
                    }
                    if(sku == null) continue;
                    sku.image = sku.images[0];
                    productList.push({
                        cacheId : "sp-" + p.productId,
                        productId: p.productId,
                        description: p.description,
                        productName: p.productName,
                        productReference: p.productReference,
                        linkText: p.linkText,
                        brand: p.brand,
                        brandId: p.brandId,
                        link: p.link.replace('https://www.coppel.com.ar', ''),
                        categories: p.categories,
                        categoryId: p.categoryId,
                        categoriesIds: p.categoriesIds,
                        priceRange: null,
                        specificationGroups: null,
                        skuSpecifications: p.skuSpecifications,
                        productClusters: productClusters,
                        clusterHighlights: clusterHighlights,
                        properties: null,
                        items: p.items,
                        releaseDate: p.releaseDate,
                        metaTagDescription: p.metaTagDescription,
                        origin: "intelligent-search",
                        productTitle: p.productTitle,
                        sku: sku,
                    });
                }
                console.log(productList);
                setProducts(productList);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }
        
        var interval = setInterval(() => {
                if(ScarabQueue != undefined)
                {
                    clearInterval(interval);
                    if(["POPULAR","CATEGORY","DEPARTAMENT"].includes(productSummaryAttrs.logic) && productSummaryAttrs.aditional != undefined && productSummaryAttrs.aditional != "")
                    {
                        ScarabQueue.push(['category', productSummaryAttrs.aditional]);
                    }
                    if(productSummaryAttrs.logic == "SEARCH" && productSummaryAttrs.aditional != undefined && productSummaryAttrs.aditional != "")
                    {
                        ScarabQueue.push(['searchTerm', productSummaryAttrs.aditional]);
                    }
                    if(["RELATED","ALSO_BOUGHT"].includes(productSummaryAttrs.logic) && productSummaryAttrs.aditional != undefined && productSummaryAttrs.aditional != "")
                    {
                        ScarabQueue.push(['view', productSummaryAttrs.aditional]);
                    }
                    ScarabQueue.push(['recommend', {
                        logic: productSummaryAttrs.logic,
                        limit: 10,
                        containerId: 'personal-recs',
                        success: function(SC) {
                            console.log(SC);
                            var url = "/api/catalog_system/pub/products/search?";
                            for(var i = 0; i < SC.page.products.length; i++)
                            {
                                url+="&fq=alternateIds_RefId:"+SC.page.products[i].group_id;
                            }
                            fetchData(url);
                        }
                    }]);
                    ScarabQueue.push(['go']);
                }
        },1000)
        /*
            ScarabQueue.push(['recommend', {
                logic: 'CART',
                containerId: 'personal-recs',
                success: function(SC, render) {
                    console.log('SC',SC);
                }
            }]);
            ScarabQueue.push(['go']);
        */
    }, []);
    // Nombre para Analytics 
    var path = window.location.pathname.split("/").at(-1);
    return (
        <div className={styles.productList}>
        {(() => {
            console.log('products.length',products.length);
            if(products.length > 5)
            return (
                <div>
                {title != null && title != undefined && title != "" ?
                <div className={styles.productListHeader}>
                    <div className={styles.productListInformation}>
                        <h3 className={`${styles.productListTitle} ${styles.h3}`}>{title}</h3>
                        {subtitle != null && subtitle != undefined ? <div className={`${styles.productListSubitle} ${styles['body']}`}>{subtitle}</div> : null}
                    </div>
                    {more != null && more != undefined ? <Link className={`${styles.productListMore} ${styles.link}`} href={more}>Ver más</Link> : null}
                </div> : null}
                <SliderLayout  label={blockName} {...sliderAttrs} autoplay={{timeout:5000}} infinite={true} fullWidth={true}>
                    {products?.map((product, index) => (
                        <ProductSummary
                        key={index}
                        product={product}
                        listName={`${path == "" ? 'Home' : path}|MO-PRO-BLO-${sectionId}|TRK-${columnId}|pro_${__editorItemTitle}`}
                        actionOnClick={() => {}}
                        position={index+1}
                        />
                    ))}
                </SliderLayout>
                </div>
            )
        })()}
        </div>
    );
}

// Asignar esquema
ProductListV2.schema = productListV2Schema;

export default ProductListV2;
