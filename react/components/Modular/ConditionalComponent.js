import React, { useState, useEffect } from 'react';
import { checkTimeRange } from "./Helpers";

function ConditionalComponent({visibility = 'all', platform = "all", programming = false, initialDate = '1900-01-01', finalDate = '2100-01-01', initialTime = '00:00', finalTime = '23:59', days = '0,1,2,3,4,5,6', Component }) {
    const [onThisTime, setOnThisTime] = useState(false);
    const [onThisPlataform, setOnThisPlataform] = useState(false);
    const [onThisSize, setOnThisSize] = useState(false);
  
    useEffect(() => {
      // Validacion por resolucion
      var w = document.body.clientWidth;
      var localOnThisSize = (visibility == 'all'
      || (visibility == "onlyMobile" && w < 1024) 
      || (visibility == "onlyPhone" && w < 768) 
      || (visibility == "onlyTablet" && w >= 768 && w < 1024) 
      || (visibility == "onlyDesktop"&& w >= 1024));
      setOnThisSize(localOnThisSize);
      // Validacion de plataforma
      var session_platform = sessionStorage.getItem("platform") ?? "Web";
      var localOnThisPlataform = (platform == "all"
      || (platform == "onlyWeb"&& session_platform == "Web")
      || (platform == "onlyApp" && session_platform == "App")
      || (platform == "onlyStore"&& session_platform == "Tienda"))
      setOnThisPlataform(localOnThisPlataform);
      // Validacion de tiempo
      if (programming == true && localOnThisPlataform == true && localOnThisSize == true) {
        const interval = setInterval(() => {
          setOnThisTime(checkTimeRange({ programming, initialDate, finalDate, initialTime, finalTime, days }));
        }, 1000); // Consulta cada segundo
  
        return () => clearInterval(interval);
      } else {
        setOnThisTime(true); // Si no se necesita validación por tiempo, se considera como dentro del rango
      }
    }, [visibility, platform, programming, initialDate, finalDate, initialTime, finalTime, days]);
  
    return (
      <>
        {onThisTime && onThisPlataform && onThisSize ? (
          <Component /> // Renderiza el componente si está dentro del rango de tiempo
        ) : null}
      </>
    );
  }
  
  export default ConditionalComponent;