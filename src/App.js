import "./App.css"
import { useState, useEffect } from "react"
import { deleteJoke, postNewJoke, getAllJokes, chooseToldJoke, chooseUntoldJoke } from "./services/jokeService"
import stevePic from "./assets/steve.png"

export const App = () => {
  const [allJokes, setAllJokes] = useState([])
  const [newJokes, setNewJokes] = useState([])
  const [showToldJokes, setToldJokes] = useState([])
  const [showUntoldJokes, setUntoldJokes] = useState([])
  const [updatedJokes , setUpdatedJokes] = useState([])


  const getUpdatedJokes = () => {
    getAllJokes().then(jokesArray => {
      setUpdatedJokes(jokesArray)
    })
  }


  useEffect(() => {
    getAllJokes().then(jokesArray => {
      setAllJokes(jokesArray)
    })
  }, [updatedJokes])

  useEffect(() => {
    const filterToldJokes = allJokes.filter(
      joke => joke.told === true)
    setToldJokes(filterToldJokes)
    const filterUntoldJokes = allJokes.filter(
      joke => joke.told === false)
    setUntoldJokes(filterUntoldJokes)
  }, [allJokes])



  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
        <div>
          <h2>Add Joke</h2>
          <div className="joke-add-form">
          <input
            value={newJokes}
            className="joke-input"
            type="text"
            placeholder="New One Liner"
            onChange={(event) => {
              setNewJokes(event.target.value)
            }}
          />
           <button className="joke-input-submit" onClick={() => postNewJoke(newJokes).then(setNewJokes("")).then(getUpdatedJokes())}>Add</button>
        </div>
        <div className="joke-lists-container">
          <div className="joke-list-container">
            <div><h2>Untold<span className="untold-count">{showUntoldJokes.length}</span></h2></div>
            <ul>
              {showUntoldJokes.map(joke => {
                return <li key={joke.id} className="joke-list-item">
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div className="joke-list-action-delete"><i id={joke.id} onClick={(event) => deleteJoke(event.target.id).then(getUpdatedJokes())} className="fa-solid fa-trash"/></div>
                  <div className="joke-list-action-toggle"><button><i id={joke.id} data-text={joke.text} onClick={(event) => chooseToldJoke(event.target.id, event.target.dataset.text).then(getUpdatedJokes())}className="fa-regular fa-face-smile"/></button></div>
                </li>
              })}
            </ul>
          </div>
          <div className="joke-list-container">
          <div><h2>Told<span className="told-count">{showToldJokes.length}</span></h2></div>
            <ul>
              {showToldJokes.map(joke => {
                return <li key={joke.id} className="joke-list-item">
                  <p  className="joke-list-item-text">{joke.text}</p>
                  <div className="joke-list-action-toggle"><button><i id={joke.id} onClick={(event) => chooseUntoldJoke(event.target.id, event.target.dataset.text).then(getUpdatedJokes())}className="fa-regular fa-face-frown"/></button></div>
                  <div className="joke-list-action-delete"><i id={joke.id} data-text={joke.text} onClick={(event) => deleteJoke(event.target.id).then(getUpdatedJokes())} className="fa-solid fa-trash"/></div>
                </li>
              })}
            </ul>
        </div>
        </div>
        </div>
      </div>
    </div>
  )
}