export default (function() {
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

})()
