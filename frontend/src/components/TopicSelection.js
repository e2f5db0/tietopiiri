import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import classNames from 'classnames'
import ReactAudioPlayer from 'react-audio-player'
import winnerTopicSound from '../resources/winner-topic.mp3'
import voteMore from '../resources/vote-more.mp3'

const TopicSelection = (props) => {

  const [topics, setTopics] = useState([])
  const [winner, setWinner] = useState(undefined)

  const [play, setPlay] = useState(undefined)

  const url = process.env.REACT_APP_DATABASE_URL

  const fetchTopics = () => axios.get(`${url}/winnertopics`).then((res) => setTopics(res.data)).catch(error => console.log(error))

  useEffect(() => {
    fetchTopics()
    setInterval(() => {
      fetchTopics()
    }, 2000)
  }, [])

  const selectTopic = () => {
    axios.get(`${url}/selectwinner`).then((res) => {
      const response = res.data;
      if (response.name) {
        props.pauseBackgroundMusic(5500)
        setPlay('winner')
        setWinner(res.data.name)
      } else {
        if (winner !== 'Pitää äänestää lisää!') props.pauseBackgroundMusic(3000)
        setPlay('vote more')
        setWinner('Pitää äänestää lisää!')
      }
    }).catch(error => console.log(error))
    fetchTopics()
  }

  return (
    <div className='Container'>
      <ReactAudioPlayer src={play === 'winner' ? winnerTopicSound : voteMore} autoPlay={play} />
      <Navbar user={props.user} setView={props.setView} />
      <h1>Aiheen valinta</h1>
      <div className='Winner-container'>
        <h3>Voittaja-aihe:</h3>
        <p className={classNames({ 'Winner-topic': !winner || winner === 'Pitää äänestää lisää!' }, { 'Winner-topic Bounce': winner && winner !== 'Pitää äänestää lisää!' })}>{topics.length > 0 && !winner ? topics[0].name : winner ? winner : '-'}</p>
        <button className='btn' onClick={() => selectTopic()}>Uusi aihe</button>
      </div>
      <div className='Topic-list'>
        <h3>Menneet aiheet</h3>
        {topics.length > 0 && topics.map(topic => <p key={topic.name}><span>{topic.name}</span></p>)}
      </div>
    </div>
  )
}

export default TopicSelection
