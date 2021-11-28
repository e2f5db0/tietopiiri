import React, { useEffect } from 'react'

const Login = (props) => {

  const members = ['Alisa', 'Eemeli', 'Maija', 'Oona', 'Sami', 'Sebu', 'Silva', 'Suski',]

  useEffect(() => {
    props.setMemberCount(members.length)
  }, [])

  return (
    <div className='Container'>
      <h1>Tietopiiri</h1>
      {members.map(name => 
        <div key={name} className='Login-name-container' onClick={() => {props.setPlay(true); props.setUser(name)}}>
          <p>{name}</p>
        </div>
      )}
    </div>
  )
}

export default Login
