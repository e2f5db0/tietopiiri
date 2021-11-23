import React, { useState } from 'react'
import './App.css'
import { Switch, Route, useHistory } from 'react-router-dom'
import Login from './components/Login'
import Main from './components/Main'
import AddTopics from './components/AddTopics'
import TopicSelection from './components/TopicSelection'
import Vote from './components/Vote'
import ReactAudioPlayer from 'react-audio-player'
import background from './resources/background.mp3'

const App = () => {

    const [memberCount, setMemberCount] = useState(0)
    const [user, setUser] = useState(undefined)

    const history = useHistory()

    const setView = (view) => {
        history.push(`/${view}`)
    }

    const [play, setPlay] = useState(false)
    const [volume, setVolume] = useState(1)

    const pauseBackgroundMusic = (time) => {
        setVolume(.1)
        setTimeout(() => {
            setVolume(1)
        }, time)
    }

    const views = {}

    views['login'] = <Login setPlay={setPlay} setMemberCount={setMemberCount} setUser={setUser} />

    views['main'] = <Main user={user} setView={setView} />

    views['addTopics'] = <AddTopics user={user} setView={setView} />

    views['vote'] = <Vote user={user} setView={setView} memberCount={memberCount} />

    views['topicSelection'] = <TopicSelection user={user} setView={setView} pauseBackgroundMusic={pauseBackgroundMusic} />


    return (
        <div className="App">
            <ReactAudioPlayer src={background} autoPlay={play} loop={true} volume={volume} />
            <Switch>
                <Route exact path='/'>
                    {user ? views['main'] : views['login']}
                </Route>

                <Route exact path='/main'>
                    {user ? views['main'] : views['login']}
                </Route>

                <Route exact path='/addTopics'>
                    {user ? views['addTopics'] : views['login']}
                </Route>

                <Route exact path='/vote'>
                    {user ? views['vote'] : views['login']}
                </Route>

                <Route exact path='/topicSelection'>
                    {user ? views['topicSelection'] : views['login']}
                </Route>

            </Switch>
        </div>
    )

}

export default App
