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
  function toggleDarkMode() {
    const settingsMain = document.querySelector(".settings__main");
    const CLASS_LIST = settingsMain.classList;
    CLASS_LIST.toggle("darkmode__main");
    localStorage.setItem(
      "theme",
      CLASS_LIST.contains("darkmode__main") ? "darkmode" : ""
    );

    // Ek olarak, başka bir öğeye de "darkmode" sınıfını ekleyebilirsiniz
    const otherElement = document.querySelector(".other-element");
    otherElement.classList.toggle("darkmode__other");
  }

  function applyDarkModeState() {
    const theme = localStorage.getItem("theme");
    const settingsMain = document.querySelector(".settings__main");
    settingsMain.classList.add(theme);
    settingsMain.style.transition = "background 2s ease";

    const darkModeButtons = document.querySelectorAll(".darkMode-Btn");
    darkModeButtons.forEach((button) => {
      button.checked = theme === "darkmode";
      button.addEventListener("click", toggleDarkMode);
    });
  }

  if (!window.location.pathname.includes("settings.html")) return; // guard clause

  if (
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    localStorage.getItem("theme") !== ""
  ) {
    localStorage.setItem("theme", "darkmode");
  }

  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "");
  }

  applyDarkModeState();
})());

;// CONCATENATED MODULE: ./src/scripts/touch.js
/* harmony default export */ var touch = ((function () {
  if (!window.location.pathname.includes("index.html")) return; // guard clause

  const LI = document.querySelector(".news__category__items");

  LI.addEventListener("touchstart", touchHandler);
  LI.addEventListener("touchend", touchHandler);

  let x;

  function touchHandler(event) {
    if (event.type === "touchstart") {
      x = event.changedTouches[0].clientX;
    } else {
      // touchend
      let direction;
      if (x + 50 < event.changedTouches[0].clientX) {
        direction = "Right";
      } else if (x - 50 > event.changedTouches[0].clientX) {
        direction = "Left";
      }

      if (direction) {
        LI.addEventListener("animationstart", function () {
          LI.removeEventListener("touchstart", touchHandler);
          LI.removeEventListener("touchend", touchHandler);
        });
        LI.addEventListener("animationend", function () {
          //LI.lastElementChild.style.animation = ""
          LI.addEventListener("touchstart", touchHandler);
          LI.addEventListener("touchend", touchHandler);
        });

        LI.lastElementChild.style.animation = `move${direction} 2s ease`;
        direction = null;
      }
      x = null;
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