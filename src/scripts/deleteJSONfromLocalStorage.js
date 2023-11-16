import getJSONfromLocalStorage from "./getJSONfromLocalStorage"

function deleteJSONfromLocalStorage(key, index) {
    const OBJECT = getJSONfromLocalStorage(key)

    OBJECT.splice(index, 1)

    localStorage.setItem(key, JSON.stringify(OBJECT))
}

export default deleteJSONfromLocalStorage