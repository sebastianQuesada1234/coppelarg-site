import React, { useEffect, useRef } from 'react';
import htmlSchema from './schemas/Html.js';
import { secureJsonParse, checkTimeRange } from './Helpers.js';
import styles from "./ModularTemplate.css";

const Html = function({ content, className}) {
    const containerRef = useRef(null);
    const intervalIdsRef = useRef([]);

    useEffect(() => {
        const container = containerRef.current;

        const countdownElements = container.querySelectorAll('CountdownTimer');

        countdownElements.forEach(element => {
            const startDate = new Date(element.getAttribute('startDate') + 'T' + element.getAttribute('startTime'));
            const endDate = new Date(element.getAttribute('endDate') + 'T' + element.getAttribute('endTime'));
            const format = element.getAttribute('format') || 'DD:HH:MM:SS';

            const updateCountdown = () => {
                const now = new Date();

                let remaining = 0;

                if (now >= startDate && now <= endDate) {
                    remaining = endDate - now;
                }

                const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

                let formattedTime = format.replace('DD', days);
                formattedTime = formattedTime.replace('HH', String(hours).padStart(2, '0'));
                formattedTime = formattedTime.replace('MM', String(minutes).padStart(2, '0'));
                formattedTime = formattedTime.replace('SS', String(seconds).padStart(2, '0'));

                element.innerText = formattedTime;
            };

            intervalIdsRef.current.push(setInterval(updateCountdown, 1000));
        });

        const searchDiscountElements = container.querySelectorAll('SearchDiscount, searchdiscount');
          
        // Actualizar SearchDiscount
        searchDiscountElements.forEach(element => {
            const search = element.getAttribute('search');

            if(search == undefined) return;

            const fetchDiscount = async () => {
              try {
                const response = await fetch(`/api/io/_v/api/intelligent-search/product_search/${search}?sort=discount:desc&page=1&count=1`);
                const data = await response.json();
                if (data && data.products.length > 0) {
                  const product = data.products[0];
                  const price = product.items[0].sellers[0].commertialOffer.Price;
                  const list = product.items[0].sellers[0].commertialOffer.ListPrice;
                  const percentage = Math.round((100 - (price * 100 / list)));
                  // Reemplazar el contenido con el porcentaje de descuento
                  const replacementElement = document.createTextNode(`${percentage}%`);
                  element.replaceWith(replacementElement);
                }
              } catch (error) {
                console.error('Error fetching discount:', error);
              }
            };
      
            fetchDiscount();
        });

        //Actualizar clases
        var classMatch = [
          ["secondaryButton",styles.secondaryButton],
          ["tertiaryButton",styles.tertiaryButton],
          ["display",styles["display"]],
          ["h1",styles["h1"]],
          ["h2",styles["h2"]],
          ["h3",styles["h3"]],
          ["subtitle-1",styles["subtitle-1"]],
          ["subtitle-2",styles["subtitle-2"]],
          ["action",styles["action"]],
          ["link",styles["link"]],
          ["body",styles["body"]],
          ["body-small",styles["body-small"]],
          ["body-footer",styles["body-footer"]],
          ["caption",styles["caption"]],
          ["caption-small",styles["caption-small"]],
        ];

        classMatch.forEach(match => {
          const elementosClaseA = document.querySelectorAll('.' + match[0]);
          elementosClaseA.forEach(elemento => { elemento.classList.add(match[1]); });
        });

        //Actualizar clases a componente
        var elementMatch = [
          ["h1",styles.h1],
          ["h2",styles.h2],
          ["h3",styles.h3],
          ["h4",styles['subtitle-1']],
          ["h5",styles['subtitle-2']],
          ["a",styles['link']]
        ];

        elementMatch.forEach(match => {
          const elementosClaseA = document.querySelectorAll(match[0]);
          elementosClaseA.forEach(elemento => { elemento.classList.add(match[1]); });
        });
        
        return () => {
            intervalIdsRef.current.forEach(clearInterval);
            intervalIdsRef.current = [];
        };
    }, [content]);

    return (
     (
      <div className={styles.htmlContainer + " " + (className ?? null) + " " } ref={containerRef} dangerouslySetInnerHTML={{ __html: content }} />)
    );
}

Html.schema = htmlSchema;

export default Html;