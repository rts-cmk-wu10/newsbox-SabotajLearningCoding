import getJSONfromLocalStorage from "./getJSONfromLocalStorage"
import printList from "./printList"
import saveJSONtoLocalStorage from "./saveJSONtoLocalStorage"

export default (function() {
	if (!window.location.pathname.includes("todo.html")) return // guard clause

	const TODO_FORM = document.querySelector(".todoForm")

	TODO_FORM.addEventListener("submit", submitHandler)

	function submitHandler(event) {
		event.preventDefault()

        saveJSONtoLocalStorage("todo-items", 
            { name: event.target.item.value, done: false })
            printList()
	}

    printList()

    const CLEAR_LIST_BTN = document.querySelector(".clearListBtn")
    CLEAR_LIST_BTN.addEventListener("click", function() {
        if (confirm("Delete all!, are you sure"))
        localStorage.setItem("todo-items", "[]")
        printList()
    })

})()