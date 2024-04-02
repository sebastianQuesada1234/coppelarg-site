import React, { useRef, useEffect, useState, useCallback } from "react";
import { usePixel } from "vtex.pixel-manager";
import { canUseDOM, useRuntime } from "vtex.render-runtime";

// Evento Analytics
const useAnalyticsSender = () => {
    const { push } = usePixel();

    const sendPromoClick = useCallback(
        (item, callback) => {
            if (item.analyticsProperties === "none") {
                callback && callback();
                return;
            }
            const promotionEventData = {
                id: item.promotionId,
                name: item.promotionName,
                creative: item.formattedSrc,
                position: item.promotionPosition,
                products: [
                    {
                        productId: item.promotionProductId,
                        productName: item.promotionProductName,
                    },
                ],
            };
            push({
                event: "promotionClick",
                promotions: [promotionEventData],
            });

            callback && callback();
        },
        [push]
    );

    const sendPromoView = useCallback(
        (item, callback) => {
            if (item.analyticsProperties === "none") {
                callback && callback();
                return;
            }
            const promotionEventData = {
                id: item.promotionId,
                name: item.promotionName,
                creative: item.formattedSrc,
                position: item.promotionPosition,
                products: [
                    {
                        productId: item.promotionProductId,
                        productName: item.promotionProductName,
                    },
                ],
            };
            push({
                event: "promoView",
                promotions: [promotionEventData],
            });

            callback && callback();
        },
        [push]
    );

    return { sendPromoClick, sendPromoView };
};

// Wrapper
const AnalyticsWrapper = ({ Component, item, width }) => {

    // Ajustes de AutoTag
    var itemLocal = JSON.parse(JSON.stringify(item));
    var path = window.location.pathname.split("/").at(-1);
    itemLocal.promotionId = (path == "" ? 'Home' : path) +  itemLocal.promotionId;
    
    console.log("Path", path,itemLocal);
    
    const { navigate } = useRuntime();
    const { sendPromoClick, sendPromoView } = useAnalyticsSender();
    const [isVisible, setIsVisible] = useState(false);
    const componentRef = useRef(null);

    if (!canUseDOM) return <></>;

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                    sendPromoView(itemLocal)
                }
            });
        });

        if (componentRef.current)
            observer.observe(componentRef.current);

        return () => {
            if (componentRef.current)
                observer.unobserve(componentRef.current);
        };

    }, []);

    return (
        <div ref={componentRef} style={{width: width ?? "100%"}} onClick={() =>  sendPromoClick(itemLocal, () => navigate({ to : itemLocal.link }))}>
            {isVisible ? <Component/> : null}
        </div>
    );
};

export default AnalyticsWrapper;