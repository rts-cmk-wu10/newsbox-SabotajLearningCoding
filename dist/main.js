/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

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
;// CONCATENATED MODULE: ./src/scripts/darkmode.js
/* harmony default export */ var darkmode = ((function () {
  if (!window.location.pathname.includes("settings.html")) return; // guard clause

  if (
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    localStorage.getItem("theme") !== ""
  ) {
    localStorage.setItem("theme", "darkmode");
  }

  const CTA_BUTTON = document.querySelector(".darkMode-Btn");
  CTA_BUTTON.addEventListener("click", clickHandler);

  function clickHandler() {
    const CLASS_LIST = document.body.classList;
    CLASS_LIST.toggle("darkmode");
    localStorage.setItem(
      "theme",
      CLASS_LIST.contains("darkmode") ? "darkmode" : ""
    );
  }

  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "");
  }

  if (localStorage.getItem("theme") === "darkmode") {
    CTA_BUTTON.checked = true;
  }

  document.body.classList.add(localStorage.getItem("theme"));
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

;// CONCATENATED MODULE: ./src/images/archive-icon.png
var archive_icon_namespaceObject = "data:image/png;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL2FyY2hpdmUtaWNvbi5wbmciOw==";
;// CONCATENATED MODULE: ./src/images/settings-icon.png
var settings_icon_namespaceObject = "data:image/png;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL3NldHRpbmdzLWljb24ucG5nIjs=";
;// CONCATENATED MODULE: ./src/images/delete-icon.png
var delete_icon_namespaceObject = "data:image/png;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL2RlbGV0ZS1pY29uLnBuZyI7";
;// CONCATENATED MODULE: ./src/images/placeholder.png
var placeholder_namespaceObject = "data:image/png;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL3BsYWNlaG9sZGVyLnBuZyI7";
;// CONCATENATED MODULE: ./src/images/arrow-left-icon.png
var arrow_left_icon_namespaceObject = "data:image/png;base64,ZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyAiaW1hZ2VzL2Fycm93LWxlZnQtaWNvbi5wbmciOw==";
;// CONCATENATED MODULE: ./src/index.js












/******/ })()
;
//# sourceMappingURL=main.js.map