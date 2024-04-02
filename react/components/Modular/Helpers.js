import { func } from "prop-types";
import styles from "./ModularTemplate.css";

// Generar JSON de manera segura
export function secureJsonParse(str, def = {}) {
  try { return JSON.parse(str); } catch (e) { return def; }
}

export function checkTimeRange({programming = false,initialDate = '1900-01-01',finalDate = '2100-01-01',initialTime = '00:00', finalTime = '23:59',days = '0,1,2,3,4,5,6'}) {
  if (!programming) {
    return true; // Si no se necesita validación por tiempo, se considera como dentro del rango
  }
    
  const now = new Date();
  const currentDate = new Date();
  const startTimeArray = initialTime == "" ? [0,0] : initialTime.split(':');
  const endTimeArray = finalTime == "" ? [23,59] : finalTime.split(':');

  currentDate.setHours(0, 0, 0, 0);
    
  const startDate = new Date(initialDate);
  const endDate = new Date(finalDate);
    
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
    
  const daysArray = (days == "" ? "0,1,2,3,4,5,6,7" : days).split(',').map(day => parseInt(day.trim(), 10));
    
  const currentDay = now.getDay();
    
  return (
    currentDate >= startDate &&
    currentDate <= endDate &&
    (currentHour > parseInt(startTimeArray[0], 10) || (currentHour == parseInt(startTimeArray[0], 10) && currentMinute >= parseInt(startTimeArray[1], 10))) &&
    (currentHour < parseInt(endTimeArray[0], 10) || (currentHour == parseInt(endTimeArray[0], 10) && currentMinute <= parseInt(endTimeArray[1], 10))) &&
    daysArray.includes(currentDay)
  );
}

export function secureParseInt(value, alternative){
  var number = parseInt(value);
  if(!isNaN(number))
    return number;
  else
    return alternative;
}
  
export function gridClass(gridAttr){
  var grid = gridAttr?.grid?.trim().split("-") ?? [12,12];
  var desktop = secureParseInt(grid[0], 12);
  var tablet = secureParseInt(grid[1] ?? desktop, 12);
  var phone = secureParseInt(grid[2] ?? tablet, 12);
  return `${styles["col-" + phone ?? 12]} ${styles["col-md-" + tablet ?? 12]} ${styles["col-xl-" + desktop ?? 12]}`;
}

export function sliderItems(itemsPerPage){
  var items = itemsPerPage?.trim().split("-") ?? [1,1,1];
  var desktop = secureParseInt(items[0], 12);
  var tablet = secureParseInt(items[1] ?? desktop, 12);
  var phone = secureParseInt(items[2] ?? tablet, 12);
  return {desktop: desktop, tablet: tablet, phone: phone};
}

export function getSize(size)
{
  var items = typeof size === "string" ? (size?.trim().split("x") ?? [0,0]) : [0,0];
  var width = secureParseInt(items[0], 0);
  var height = secureParseInt(items[1], 0);
  return {width: width, height: height}
}