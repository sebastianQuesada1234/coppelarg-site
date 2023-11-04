import React from 'react'
import style from './h1text.css'

interface Props {
  titulo ?: string
}

function textoHeader({ titulo }: Props) {
  return (
    <div id="h1Header" className={`${style.row}`}>
      <div className={`${style.container}`}>
        <h1 className={`${style.h1}`}>{titulo}</h1>
        <h2 className={`${style.h2}`}>Rodados, Neumáticos y Accesorios</h2>
      </div>
    </div>
  )
}

export default textoHeader