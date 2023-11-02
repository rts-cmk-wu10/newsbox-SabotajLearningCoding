export default (function() {
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
})()
