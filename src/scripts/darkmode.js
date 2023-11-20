export default (function () {
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
})();
