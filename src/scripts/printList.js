import deleteJSONfromLocalStorage from "./deleteJSONfromLocalStorage"
import getJSONfromLocalStorage from "./getJSONfromLocalStorage"
import updateJSONinLocalStorage from "./updateJSONinLocalStorage"

function printList() { 
    const DATA = getJSONfromLocalStorage("todo-items")
    const ITEMS = document.querySelector(".items")

    ITEMS.innerHTML = ""

    DATA.forEach(function (item, index) {
        const LI = document.createElement("li")
        const CHECKBOX = document.createElement("input")
        const DELETEBTN = document.createElement("button")
        DELETEBTN.innerHTML = "X"
        DELETEBTN.name = index
        CHECKBOX.type = "checkbox"
        CHECKBOX.name = index
        CHECKBOX.checked = item.done
        LI.append(CHECKBOX, item.name)
        ITEMS.append(LI)

        CHECKBOX.addEventListener("click", clickHandler)
        DELETEBTN.addEventListener("click", deleteHandler)

        function clickHandler(event) {
            updateJSONinLocalStorage("todo-items", parseInt(event.target.name))
        }

        function deleteHandler(event){
            if (confirm("Are you sure for delete this item?"))
            deleteJSONfromLocalStorage("todo-items", parseInt(event.target.name))
            printList()
        }
    })
}

export default printList