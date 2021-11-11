import React from 'react'
import Navbar from './Navbar'

const Main = (props) => {

  return (
    <div className='Container'>
      <Navbar user={props.user} setView={props.setView} />
      <div className='Choice-container' onClick={() => props.setView('addTopics')}>
        <p>Lisää aihe</p>
      </div>
      <div className='Choice-container' onClick={() => props.setView('vote')}>
        <p>Äänestä</p>
      </div>
      <div className='Choice-container' onClick={() => props.setView('topicSelection')}>
        <p>Aihevalinta</p>
      </div>
    </div>
  )
}

export default Main
