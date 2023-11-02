export default (function() {
	if (!window.location.pathname.includes("artikel.html")) return // guard clause

	const SLIDES = document.querySelectorAll(".slide")

	SLIDES.forEach(slide => {
		slide.style.transform = "translateY(-150px)"
	})
})()