export default (function () {
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
    const CLASS_LIST = document.querySelector(".settings__main").classList;
    CLASS_LIST.toggle("darkmode__main");
    localStorage.setItem(
      "theme",
      CLASS_LIST.contains("darkmode__main") ? "darkmode" : ""
    );
  }

  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "");
  }

  if (localStorage.getItem("theme") === "darkmode") {
    CTA_BUTTON.checked = true;
  }

  const settingsMain = document.querySelector(".settings__main");
  settingsMain.classList.add(localStorage.getItem("theme"));
  settingsMain.style.transition = "background 2s ease";
})();
