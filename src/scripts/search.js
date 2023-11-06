// search functionality
document.querySelector(".Nav__search__input").addEventListener("input", (e) => {
    let inputText = e.target.value;
    let regEx = new RegExp(String.raw`${inputText}`, 'gi');
    document.querySelectorAll(".Card").forEach(card => {
        let headerText = card.querySelector(".Card__title").textContent;
        if(card.style.display) card.style.removeProperty("display");
        if(!regEx.test(headerText)){
            card.style.display = "none";
        }
    });
});