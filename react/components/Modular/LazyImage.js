import React, { useState, useEffect, useRef } from 'react';
import styles from "./ModularTemplate.css";
import { getSize } from './Helpers';



const LazyImage = ({ title, alt, imageData, mobileImageData }) => {
  var getDimension = getSize(imageData?.size);
  var getDimensionMobile = getSize(mobileImageData?.size);

  const [dimensions, setDimensions] = useState(getDimension);
  const [dimensionsMobile, setDimensionsMobile] = useState(getDimensionMobile);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    // Si es la primera vez que se carga esta imagen, se extraen las propiedades
    var image = null;
    if(imageData?.size == undefined || imageData?.size == null || imageData?.size == '' || imageData.src != imageData.savedSrc)
    {
      image = new Image();
      image.src = imageData.src;
      image.onload = function(){
        const { width, height } = image;
        setDimensions({ width, height });
        /*
        imageData.size = width+"x"+height;
        imageData.savedSrc = imageData.src;
        */
      };
    }
    // Si es la primera vez que se carga esta imagen, se extraen las propiedades(Mobiel)
    var imageMobile = null;
    if(mobileImageData?.hasMobileImage == true && (mobileImageData?.size == undefined || mobileImageData?.size == null || mobileImageData?.size == '' || mobileImageData.src != mobileImageData.savedSrc))
    {
      imageMobile = new Image();
      imageMobile.src = mobileImageData.src;
      imageMobile.onload = function(){
        const { width, height } = imageMobile;
        setDimensionsMobile({ width, height });
        /*
        mobileImageData.size = width+"x"+height;
        mobileImageData.savedSrc = mobileImageData.src;
        */
      };
    }
    // Cargo cuando lo veo
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(imageRef.current);
    // Funcion de salida
    return() => {
      observer.disconnect();
      if(image != null)
        image.onload = null;
      if(imageMobile != null)
        imageMobile.onload = null;
    };
  }, []);

  var padding = (dimensionsMobile.height ?? 0) * 100 / (dimensionsMobile.width ?? 0);
  var paddingDesktop = (dimensions.height ?? 0) * 100 / (dimensions.width ?? 0);

  return (
    <div className={styles.imageContainer} style={{
        "--padding": `${mobileImageData?.hasMobileImage == true ? padding : paddingDesktop}%`,
        "--padding-desktop": `${paddingDesktop}%`
      }}>
      <div ref={imageRef} className={styles.image}>
        { (() => {
            if(isVisible)
              return <picture>
                  <source
                    srcset={imageData?.src}
                    media="(min-width: 1024px)"
                  />
                  <img
                    src={mobileImageData?.hasMobileImage == true ? mobileImageData?.src : imageData?.src}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    alt={alt}
                    title={title} 
                  />
                </picture>
            else
            return <div style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundColor: 'rgb(220,220,220)'}}></div>
          })()}
      </div>
    </div>
  );
};

export default LazyImage;