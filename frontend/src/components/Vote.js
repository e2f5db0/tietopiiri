import React, { useEffect, useState } from 'react'
import axios from 'axios'
import classNames from 'classnames'
import Navbar from './Navbar'

const querystring = require('querystring')

const Vote = (props) => {

    const [topics, setTopics] = useState([])
    const [fetchedOnce, setFetchedOnce] = useState(false)

    const url = process.env.REACT_APP_DATABASE_URL

    const fetchTopics = () => axios.get(`${url}/topics`).then((res) => setTopics(res.data)).catch(error => console.log(error))

    useEffect(() => {
        if (!fetchedOnce) {
            fetchTopics()
        }
        setInterval(() => {
            fetchTopics()
            setFetchedOnce(true)
        }, 2000)
    }, [])

    const vote = async (id) => {
        await axios.post(`${url}/vote/${id}`, querystring.stringify({ user: props.user }))
    }

    return (
        <div className='Container'>
            <Navbar user={props.user} setView={props.setView} />
            <h2>Äänestä</h2>
            <div className='Topic-list'>
                <h3>Aiheet</h3>
                {topics.length && <div className='Vote-container'>
                    {topics.length > 0 && topics.map(topic => <div key={topic.name} className={classNames({ 'Topic-vote': !topic.votes.includes(props.user) }, { 'Topic-vote Voted': topic.votes.includes(props.user) })} onClick={() => vote(topic.id)}><span>{topic.name}</span><span>{topic.votes.length}/{props.memberCount}</span></div>)}
                </div>}
                {!topics.length &&
                    <div className='Loading-animation-container'>
                        <div className='Half-circle-large'></div><div className='Half-circle-small'></div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Vote
