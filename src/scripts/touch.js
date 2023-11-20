export default (function () {
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

      console.log(touchHandler);
      x = null;
    }
  }
})();
