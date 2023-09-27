export const getAllJokes = async () => {
    const response = await fetch("http://localhost:8088/jokes")
    const jokes = await response.json()
    return jokes
}



export const postNewJoke = async (newJokeEntry) => {
    
    const newJoke = {
        "text": newJokeEntry,
        "told": false
    }

    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newJoke)
    }

    await fetch("http://localhost:8088/jokes", postOptions)

}



export const chooseToldJoke = async (jokeId,jokeText) => {
    const chooseToldJoke = {
        "id":parseInt(jokeId),
        "text": jokeText,
        "told": true
    }

    const putOptions = {
        method:"PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(chooseToldJoke)
    }
    await fetch(`http://localhost:8088/jokes/${jokeId}`, putOptions)
}


export const chooseUntoldJoke = async (jokeId, jokeText) => {
    const chooseUntoldJoke = {
        "id":parseInt(jokeId),
        "text": jokeText,
        "told": false
    }

    const putOptions = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(chooseUntoldJoke)
    }
    await fetch(`http://localhost:8088/jokes/${jokeId}`, putOptions)
}


export const deleteJoke = async (jokeId, jokeText) => {
    const deleteJoke = {
        "id":parseInt(jokeId),
        "text": jokeText,
        "told": false
    }

    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(deleteJoke)
    }
    await fetch(`http://localhost:8088/jokes/${jokeId}`, deleteOptions)
}