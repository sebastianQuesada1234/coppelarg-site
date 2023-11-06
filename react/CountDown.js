import style from './CountDown.css'
import React, { useEffect } from 'react';

function Countdown({ Carrousel }) {
  const deadline = "April, 1, 2023";

  const updateContent = () => {
    const date = new Date();
    var hora = date.getHours();
    var minutos = date.getMinutes();
    var segundos = date.getSeconds();

    var act = new Date(`1/1/1990 ${hora}:${minutos}:${segundos}`);
    var ini_1 = new Date(`1/1/1990 19:59:00`);
    var fin_1 = new Date(`1/1/1990 22:00:00`); 

    var fin_comparacion = null;

    if (act >= ini_1 && act <= fin_1) {
      fin_comparacion = fin_1;
    } else {
      fin_comparacion = null;
    }

    if (fin_comparacion !== null) {
      document.getElementById('ofertas-bomba').style.display = 'flex';
      const time = fin_comparacion - act;
      var hour = (Math.floor((time / (1000 * 60 * 60)) % 24));
      var minutes = (Math.floor((time / 1000 / 60) % 60));
      var seconds = (Math.floor((time / 1000) % 60));
      document.getElementById('hour').innerHTML = `${hour < 10 ? '0' + hour : hour}`;
      document.getElementById('minute').innerHTML = `${minutes < 10 ? '0' + minutes : minutes}`;
      document.getElementById('second').innerHTML = `${seconds < 10 ? '0' + seconds : seconds}`;
    } else {
      document.getElementById('ofertas-bomba').style.display = 'none';
    }
  }

  useEffect(() => {
    updateContent(); 
    const intervalId = setInterval(updateContent, 1000); 

    return () => {
      clearInterval(intervalId); 
    };
  }, []);

  return (
        <div id="ofertas-bomba" className={`${style.timerContainer}`}>
      <div className={`${style.fondo}`}>
        <div className={`${style.timerHeader}`}>
          <div className={`${style.timerTitle}`}>Ofertas Bomba</div>
          <div className={`${style.timerText}`}>
            <div className={`${style.timerLabel}`}>
              Termina en:
            </div>
            <div className={`${style.timerNumber}`}>
            <div className={style.hourContainer}>
                <div id="hour" className={style.hour}></div>
                <div className={style.hourLabel}>Horas</div>
              </div>
              <div className={style.minuteContainer}>
                <div id="minute" className={style.minute}></div>
                <div className={style.minuteLabel}>Minutos</div>
              </div>
              <div className={style.secondContainer}>
                <div id="second" className={style.second}></div>
                <div className={style.secondLabel}>Segundos</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${style.timerProducts}`}><Carrousel/></div>
      </div>
    </div>
  );
}

export default Countdown;