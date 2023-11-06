let cardStorage = localStorage["cards"] ? JSON.parse(localStorage["cards"] ) : [];

// if dark mode
if(localStorage["darkmode"] == "on") document.querySelector("body").classList.add("dark-theme");

// sets visual number of cards in localstorage
if(localStorage["cards"]){
    document.querySelector(".Nav__inbox").setAttribute("data-text", cardStorage.length);
} else document.querySelector(".Nav__inbox").setAttribute("data-text", "0");

const key = "CsZGAx8GwP1dlmWuflb94puYcOmdpaXP";
const categories = ["world", "health", "sports", "business",  "travel"];

const idArray = [];
cardStorage.forEach(card => idArray.push(card.id));

const ax = (category) => {
    let req = `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${key}`;
    return axios(req, {mode: "cors"}).then(res => res.data.results);
}

function shortenStr(str, max){
    if(str.length <= max) return str;
    return str.substr(0, str.lastIndexOf(" ", max));
}

// generate cards via axios
categories.forEach(category => {
    if(localStorage[`${category}`] != "off"){
        let section = document.createElement("section");
        section.classList.add("Section");
        document.querySelector("#main").append(section);
        section.innerHTML += `
        <div class="d-f gap-3 p-2 ai-center">
            <div class="Section__icon br-full d-f jc-center ai-center">
                <img src="./assets/icn_surfing.svg" alt="Header Icon" class="w-auto">
            </div>
            <h2 class="Section__header">${category}</h2>
            <button class="ml-auto Section__btn show-hide"><i class="fas fa-chevron-down Section__chevron"></i></button>
        </div>`;
        let containerHeight = 0;
        let cardContainer = document.createElement("div");
        cardContainer.classList.add("Card__container");
        section.append(cardContainer);
        ax(category).then(arr => {
            arr.forEach(article => {
                if(article.section != "admin" &&
                !idArray.includes(article.short_url) &&
                article.multimedia &&
                article.abstract){
                    cardContainer.innerHTML += `
                    <article class="Card" id="${article.short_url}"
                    data-section="${section.querySelector(".Section__header").textContent}">
                        <button class="Card__btn Card__btn_inbox"><i class="fas fa-inbox fs-l text-snow"></i></button>
                        <div class="Card__text p-2">
                            <img src="${article.multimedia[0].url}" class="Card__img">
                            <div>
                                <h3 class="Card__title">${article.title}</h3>
                                <p class="Card__abstract">${shortenStr(article.abstract, 30)}...</p>
                            </div>
                        </div>
                    </article>`;
                    containerHeight += 100;
                    cardContainer.style.maxHeight = `${containerHeight}px`;
                }
            }); 
        }).catch(error => {
            if(error.status){
                let res = error.response;
                document.querySelector("#main").innerHTML = 
                `<p class="ta-center">
                    Error: ${res.status.toString()} (${res.statusText})<br>
                    ${res.status == 429 ? "Please wait awhile before reloading the page.." : ""}
                </p>`;
            }
        });
    }
});

// swipe functionality
document.querySelector(".Main").addEventListener("touchstart", (e)=>{
    let touchElement = e.target.parentElement;
    let parentElement = e.target.closest(".Card");
    if(touchElement.classList.contains("Card__text") || 
    touchElement.parentElement.classList.contains("Card__text")){
        touchElement = e.target.closest(".Card__text")
        let touchCordStart = Math.floor(e.touches[0].clientX);
        let touchCordMove;
        let delBtn = parentElement.querySelector(".Card__btn");
        let btnWidth = delBtn.offsetWidth;

        // touch move
        touchElement.addEventListener("touchmove", (e) => {
            touchCordMove = Math.floor(e.touches[0].clientX);
            // move functionality 
            if(touchCordMove < touchCordStart 
            && touchCordMove > touchCordStart-btnWidth){
                touchElement.style.transform = `translateX(${touchCordMove-touchCordStart}px)`;
            }
        });

        // touch end
        touchElement.addEventListener("touchend", () => {
            if(touchCordMove < touchCordStart-(btnWidth / 3)){
                // snap to child
                touchElement.style.transform = `translateX(-${btnWidth}px)`;
            } else {
                // snap to 0
                touchElement.style.transform = "translateX(0px)";
            }
        });
        //del btn onclick
        delBtn.onclick = () => {
            delBtn.disabled = true;
            let userObj = {
                id: parentElement.id,
                section: parentElement.getAttribute("data-section")
            }
            cardStorage.push(userObj);
            localStorage["cards"] = JSON.stringify(cardStorage);
            document.querySelector(".Nav__inbox").setAttribute("data-text", cardStorage.length);
            Toastify({
                className: "Toast_save",
                text: `'${shortenStr(parentElement.querySelector(".Card__title").textContent, 20)}...' was archived.`,
                duration: 3000,
                stopOnFocus: false,
                gravity: "top",
                position: "center"
            }).showToast();
            parentElement.classList.add("del-animation");
            parentElement.style.pointerEvents = "none";
            let container = parentElement.closest(".Card__container");
            container.style.maxHeight = `${container.offsetHeight - 100}px`;
            setTimeout(()=>{
                parentElement.remove();
            }, 1200);
        };
    // show/hide
    } else if(touchElement.classList.contains("show-hide")){
        touchElement.onclick = ()=>{
            let section = e.target.closest(".Section");
            let container = section.querySelector(".Card__container");
            if(e.target.style.transform != "rotate(-90deg)"){
                e.target.style.transform = "rotate(-90deg)";
                container.style.pointerEvents = "none";
                container.classList.remove("show-animation");
                container.classList.add("hide-animation");
            } else {
                e.target.style.transform = "rotate(0deg)";
                container.style.pointerEvents = "auto";
                container.classList.remove("hide-animation");
                container.classList.add("show-animation");
            }
        };
    }
});