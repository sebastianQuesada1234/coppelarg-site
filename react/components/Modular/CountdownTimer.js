import React, { useEffect, useRef } from 'react';
import { secureJsonParse } from './Helpers.js';
import htmlSchema from './schemas/Html.js';

const Html = function({ content, className, style }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const countdownElements = container.querySelectorAll('CountdownTimer');

        countdownElements.forEach(element => {
            const startDate = element.getAttribute('startDate');
            const endDate = element.getAttribute('endDate');
            const startTime = element.getAttribute('startTime');
            const endTime = element.getAttribute('endTime');

            // Calcular el tiempo restante y actualizar el elemento CountdownTimer
            const updateCountdown = () => {
                const now = new Date();
                const startDateTime = new Date(startDate + 'T' + startTime);
                const endDateTime = new Date(endDate + 'T' + endTime);

                let remaining = 0;

                if (now >= startDateTime && now <= endDateTime) {
                    remaining = endDateTime - now;
                }

                const hours = Math.floor(remaining / (1000 * 60 * 60));
                const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

                element.innerText = `${hours}h ${minutes}m`;
            };

            // Actualizar cada segundo
            const intervalId = setInterval(updateCountdown, 1000);

            // Limpieza del intervalo cuando el componente se desmonta
            return () => clearInterval(intervalId);
        });
    }, [content]);

    return (
      <div className={className ?? null} style={style} ref={containerRef} dangerouslySetInnerHTML={{ __html: content }} />
    );
}

Html.schema = htmlSchema;

export default Html;