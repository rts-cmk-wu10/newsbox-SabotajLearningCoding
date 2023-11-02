/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/scripts/observer.js
/* harmony default export */ var observer = ((async function init(offset = 0) {
	if (!window.location.pathname.includes("index.html")) return // guard clause

	let fetchObserver = new IntersectionObserver(callback, {rootMargin: "0px", threshold: 1.0})
	let imageObserver = new IntersectionObserver(imageCallback, {rootMargin: "0px", threshold: 1.0})
	
	let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`)
	let data = await response.json()
	
	data.results.forEach((pokemon, index) => {
		const p = document.createElement("p")
		const img = document.createElement("img")

		const id = pokemon.url.split("/")[6]

		img.dataset.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
		imageObserver.observe(img)

		p.innerText = pokemon.name
		p.append(img)

		document.body.append(p)
		if (index === data.results.length - 1) {
			fetchObserver.observe(p)
		}
	})

	function callback(entries) {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return // guard clause

			if (entry.intersectionRatio >= 0.5) {
				fetchObserver.unobserve(entry.target)
				init(offset + 50)
			}
		})
	}

	function imageCallback(entries) {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return // guard clause

			if (entry.intersectionRatio >= 0.1) {
				imageObserver.unobserve(entry.target)
				entry.target.src = entry.target.dataset.src
			}
		})
	}
})());

;// CONCATENATED MODULE: ./src/scripts/localstorage.js
/* harmony default export */ var localstorage = ((function() {
	if (!window.location.pathname.includes("index.html")) return // guard clause

	const FORM = document.querySelector(".nameForm")
	const NAME = document.querySelector(".name")

	NAME.innerText = localStorage.getItem("name")

	FORM.addEventListener("submit", submitHandler)

	function submitHandler(event) {
		event.preventDefault()

		localStorage.setItem("name", event.target.nameInput.value)
		NAME.innerText = localStorage.getItem("name")
	}
})());
;// CONCATENATED MODULE: ./src/scripts/jsonconvert.js
/* harmony default export */ var jsonconvert = ((function() {
	if (!window.location.pathname.includes("index.html")) return // guard clause
	const json = {
		"name": "Brian",
		"age": 2561,
		"hair_color": false
	}

	localStorage.setItem("fnyf", JSON.stringify(json))

	console.log(JSON.parse(localStorage.getItem("fnyf")).hair_color)
})());
;// CONCATENATED MODULE: ./src/scripts/hent-og-gem.js
/* harmony default export */ var hent_og_gem = ((async function() {
	if (!window.location.pathname.includes("index.html")) return // guard clause

	const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto")
	const pokemon = await response.json()

	localStorage.setItem("pokemon", JSON.stringify(pokemon))

	const savedPokemon = JSON.parse(localStorage.getItem("pokemon"))

	console.log(savedPokemon)

	document.querySelector(".hentoggem").innerHTML = `
		<h1>${savedPokemon.name}</h1>
		<p>weight: ${savedPokemon.weight}</p>
	`
})());

;// CONCATENATED MODULE: ./src/scripts/artikel.js
/* harmony default export */ var artikel = ((function() {
	if (!window.location.pathname.includes("artikel.html")) return // guard clause

	const OBSERVER = new IntersectionObserver(callback, {
		threshold: 1.0
	})

	const PARAGRAPHS = document.querySelectorAll(".artikel p")

	PARAGRAPHS.forEach(function(p) {
		OBSERVER.observe(p)
	})

	function callback(entries) {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return
			if (entry.intersectionRatio > 0.5) {
				entry.target.style.fontWeight = "bold"
			}
		})
	}

	// Tilbage til toppen funktionalitetstingelingdims
	const scrollTop = function () {
		const scrollBtn = document.getElementById("scroll-btn");
		scrollBtn.innerHTML = "&uarr;";
	  
		const observerOptions = {
		  root: null,
		  threshold: 0,
		};
	  
		const handleIntersection = (entries, observer) => {
		  entries.forEach((entry) => {
			if (entry.isIntersecting) {
			  scrollBtn.classList.add("show");
			} else {
			  scrollBtn.classList.remove("show");
			}
		  });
		};
	  
		const observer = new IntersectionObserver(handleIntersection, observerOptions);
		observer.observe(scrollBtn);
	  
		scrollBtn.addEventListener("click", () => {
		  window.scrollTo({
			top: 0,
			behavior: "smooth",
		  });
		});
	  };
	  
	  scrollTop();

})());

;// CONCATENATED MODULE: ./src/scripts/karussel.js
/* harmony default export */ var karussel = ((function() {
	if (!window.location.pathname.includes("artikel.html")) return // guard clause

	const SLIDES = document.querySelectorAll(".slide")

	SLIDES.forEach(slide => {
		slide.style.transform = "translateY(-150px)"
	})
})());
;// CONCATENATED MODULE: ./src/scripts/progress.js
/* harmony default export */ var progress = ((function() {
	if (!window.location.pathname.includes("artikel.html")) return // guard clause

	const OBSERVER = new IntersectionObserver(callback, {
		threshold: 0.01
	})

	const ARTIKEL = document.querySelector(".artikel")

	OBSERVER.observe(ARTIKEL)

	function callback(entries) {
		const [ENTRY] = entries
		if (!ENTRY.isIntersecting) return

		if (ENTRY.isIntersecting) {
			window.addEventListener("scroll", function() {
				const ENTRY_HEIGHT = ENTRY.target.clientHeight
				const ENTRY_DISTANCE_FROM_TOP = ENTRY.target.offsetTop
				const SCREEN_HEIGHT = window.innerHeight
				const SCROLL_FROM_TOP = window.scrollY
	
				const PROGRESS = ((SCROLL_FROM_TOP + SCREEN_HEIGHT - ENTRY_DISTANCE_FROM_TOP) / ENTRY_HEIGHT) * 100
	
				const PROGRESS_BAR = document.querySelector("progress")
				PROGRESS_BAR.value = Math.ceil(PROGRESS)
			})
		}
	}
})());

;// CONCATENATED MODULE: ./src/scripts/getJSONfromLocalStorage.js
function getJSONfromLocalStorage(key) {
	const OBJECT = localStorage.getItem(key)
		? JSON.parse(localStorage.getItem(key))
		: []
	return OBJECT
}

/* harmony default export */ var scripts_getJSONfromLocalStorage = (getJSONfromLocalStorage);

;// CONCATENATED MODULE: ./src/scripts/deleteJSONfromLocalStorage.js


function deleteJSONfromLocalStorage(key, index) {
    const OBJECT = scripts_getJSONfromLocalStorage(key)

    OBJECT.splice(index, 1)

    localStorage.setItem(key, JSON.stringify(OBJECT))
}

/* harmony default export */ var scripts_deleteJSONfromLocalStorage = (deleteJSONfromLocalStorage);
;// CONCATENATED MODULE: ./src/scripts/updateJSONinLocalStorage.js


function updateJSONinLocalStorage(key, index) {
	const DATA = scripts_getJSONfromLocalStorage(key)

    DATA[index].done = !DATA[index].done

    localStorage.setItem(key, JSON.stringify(DATA))
}

/* harmony default export */ var scripts_updateJSONinLocalStorage = (updateJSONinLocalStorage);
;// CONCATENATED MODULE: ./src/scripts/printList.js




function printList() { 
    const DATA = scripts_getJSONfromLocalStorage("todo-items")
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
            scripts_updateJSONinLocalStorage("todo-items", parseInt(event.target.name))
        }

        function deleteHandler(event){
            if (confirm("Are you sure for delete this item?"))
            scripts_deleteJSONfromLocalStorage("todo-items", parseInt(event.target.name))
            printList()
        }
    })
}

/* harmony default export */ var scripts_printList = (printList);
;// CONCATENATED MODULE: ./src/scripts/saveJSONtoLocalStorage.js


function saveJSONtoLocalStorage(key, item) {
    const OLD_OBJECT = scripts_getJSONfromLocalStorage(key)

    OLD_OBJECT.push(item)

    localStorage.setItem(key, JSON.stringify(OLD_OBJECT))
}

/* harmony default export */ var scripts_saveJSONtoLocalStorage = (saveJSONtoLocalStorage);
;// CONCATENATED MODULE: ./src/scripts/todo.js




/* harmony default export */ var todo = ((function() {
	if (!window.location.pathname.includes("todo.html")) return // guard clause

	const TODO_FORM = document.querySelector(".todoForm")

	TODO_FORM.addEventListener("submit", submitHandler)

	function submitHandler(event) {
		event.preventDefault()

        scripts_saveJSONtoLocalStorage("todo-items", 
            { name: event.target.item.value, done: false })
            scripts_printList()
	}

    scripts_printList()

    const CLEAR_LIST_BTN = document.querySelector(".clearListBtn")
    CLEAR_LIST_BTN.addEventListener("click", function() {
        if (confirm("Delete all!, are you sure"))
        localStorage.setItem("todo-items", "[]")
        scripts_printList()
    })

})());
;// CONCATENATED MODULE: ./src/scripts/darkmode.js
/* harmony default export */ var darkmode = ((function() {
	if (!window.location.pathname.includes("darkmode.html")) return // guard clause

	if (window.matchMedia("(prefers-color-scheme: dark)").matches
		&& localStorage.getItem("theme") !== "") {
		localStorage.setItem("theme", "darkmode")
	}

	const CTA_BUTTON = document.querySelector(".switch__checkbox")
	CTA_BUTTON.addEventListener("click", clickHandler)

	function clickHandler() {
		const CLASS_LIST = document.body.classList
		CLASS_LIST.toggle("darkmode")
		localStorage.setItem("theme",
			CLASS_LIST.contains("darkmode")
				? "darkmode"
				: "")
	}

	if(!localStorage.getItem("theme")) {
		localStorage.setItem("theme", "")
	}

	if (localStorage.getItem("theme") === "darkmode") {
		CTA_BUTTON.checked = true
	}

	document.body.classList.add(localStorage.getItem("theme"))

})());

;// CONCATENATED MODULE: ./src/scripts/touch.js
/* harmony default export */ var touch = ((function() {
	if (!window.location.pathname.includes("touch.html")) return // guard clause

	const DIV = document.querySelector(".touchDiv")

	DIV.addEventListener("touchstart", touchHandler)
	DIV.addEventListener("touchend", touchHandler)

	let x

	function touchHandler(event) {
		if (event.type === "touchstart") {
			x = event.changedTouches[0].clientX
		} else { // touchend
			let direction
			if (x + 50 < event.changedTouches[0].clientX) {
				direction = "Right"
			} else if (x - 50 > event.changedTouches[0].clientX) {
				direction = "Left"
			}

			if (direction) {
				DIV.lastElementChild.addEventListener("animationstart", function() {
					DIV.removeEventListener("touchstart", touchHandler)
					DIV.removeEventListener("touchend", touchHandler)
				})
				DIV.lastElementChild.addEventListener("animationend", function() {
					//DIV.lastElementChild.style.animation = ""
					DIV.removeChild(DIV.lastElementChild)
					DIV.addEventListener("touchstart", touchHandler)
					DIV.addEventListener("touchend", touchHandler)
				})

				DIV.lastElementChild.style.animation = `move${direction} 2s ease`;
				direction = null
			}
			x = null
		}
	}
})());

;// CONCATENATED MODULE: ./src/images/266.jpg
var _266_namespaceObject = "data:image/jpeg;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzLzI2Ni5qcGciOw==";
;// CONCATENATED MODULE: ./src/images/354.jpg
var _354_namespaceObject = "data:image/jpeg;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzLzM1NC5qcGciOw==";
;// CONCATENATED MODULE: ./src/images/394.jpg
var _394_namespaceObject = "data:image/jpeg;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzLzM5NC5qcGciOw==";
;// CONCATENATED MODULE: ./src/images/463.jpg
var _463_namespaceObject = "data:image/jpeg;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzLzQ2My5qcGciOw==";
;// CONCATENATED MODULE: ./src/images/539.jpg
var _539_namespaceObject = "data:image/jpeg;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzLzUzOS5qcGciOw==";
;// CONCATENATED MODULE: ./src/index.js
















/******/ })()
;
//# sourceMappingURL=main.js.map