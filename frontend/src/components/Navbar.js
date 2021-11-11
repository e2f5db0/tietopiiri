import React, { useState } from 'react'
import sanat from '../resources/k-sanalista.js'
import spin from '../resources/spin-icon.png'
import classNames from 'classnames'

const Navbar = (props) => {

  const randomKWord = () => {
    const rand = Math.floor(Math.random() * (sanat.length - 1))
    const randK = sanat[rand]
    return randK
  }

  const rotation = () => {
    setRotate(true)
    setTimeout(() => {
      setRotate(false)
    }, 1000)
  }

  const [rotate, setRotate] = useState(false)
  const [dailyK, setDailyK] = useState(randomKWord())

  return (
    <div>
      <h1>Tietopiiri.tk <small>({props.user})</small> </h1>
      <div className='Daily-k-container'>
        <p className='Daily-k'>– tiedon {dailyK}</p>
        <img className={classNames({ 'Spin-icon': !rotate }, { 'Spin-icon Rotate': rotate })} src={spin} onClick={() => { rotation(); setDailyK(randomKWord()) }} alt='spin-icon.png' />
      </div>
    </div>
  )
}

export default Navbar
