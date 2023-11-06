// if tutorial isnt completed
if(!localStorage["tutorial"]){
    document.addEventListener("DOMContentLoaded", ()=>{
        const bodyNode = document.querySelector(".Body");
        const lightBox = document.createElement("div");

        //adds the lightbox to DOM
        lightBox.classList.add("LightBox");
        bodyNode.append(lightBox);

        // disables scrolling
        bodyNode.style.overflow = "hidden";

        const bodyElements = bodyNode.children;
        for(let i = 0; i < bodyElements.length; i++){
            if(bodyElements[i].localName != "script") 
            bodyElements[i].style.pointerEvents = "none";
        }
        
        let step = 0;
        // elements to be highlighted
        const DOMElements = [
            ".Nav__inbox", 
            ".Nav__settings", 
            ".Nav__search__input", 
            ".Section__header", 
            ".show-hide"
        ];

        // text for highlighted elements
        const elementText = [
            "This is where your archived articles go, when you archive them.",
            "These are the settings, here you can customize your app.",
            "This is the search bar, here you can search for keywords.",
            "These are the categories, under these are the articles.",
            "And guess what.. You can toggle them, using this handy button."
        ];
        
        // ends the tutorial
        const endTutorial = () => {
            step = bodyElements.length;
            for(let i = 0; i < bodyElements.length; i++){
                if(bodyElements[i].localName != "script") 
                bodyElements[i].removeAttribute("style");
            }
            removeClass("Tutorial_highlighted", DOMElements);
            lightBox.remove();
            skipBtn.remove();
            if(document.querySelector(".Tutorial"))
            document.querySelector(".Tutorial").remove();
            bodyNode.removeAttribute("style");
            localStorage["tutorial"] = "completed";
            bodyNode.removeEventListener("click", handler);
        }

        // removes z-index of the highlighted elements
        const removeClass = (cssClass, collection) => {
            for(let i = 0; i < collection.length; i++){
                let DOMElement = document.querySelector(collection[i]);
                DOMElement.classList.remove(cssClass);
            };
        };
    
        // creates the actual tutorial box
        const createTutorial = (x, y, content) => {
            let div = document.createElement("div");
            div.classList.add("Tutorial");
            div.textContent = content;
            let elementLeft;
            x < (window.innerWidth / 2) 
            ? elementLeft = x-10
            : elementLeft = x-(window.innerWidth/2)+20;
            div.style.left = `${elementLeft}px`;
            div.style.top = `${y+40}px`;
            // creates triangle
            let triangle = document.createElement("div");
            triangle.classList.add("Tutorial__triangle");
            triangle.style.left = `${elementLeft}px`
            div.append(triangle);
            document.querySelector("body").append(div);
        }
        
        // loops through the DOM elements to be highlighted
        const elementLoop = (step) => {
            for(let i = 0; i < DOMElements.length; i++){
                let DOMElement = document.querySelector(DOMElements[i]);
                let tutorialElement = document.querySelector(".Tutorial");
                let top = DOMElement.offsetTop;
                let left = DOMElement.offsetLeft;
                if(tutorialElement) tutorialElement.remove();
                removeClass("Tutorial_highlighted", DOMElements);
                DOMElement.classList.add("Tutorial_highlighted");
                createTutorial(left, top, elementText[i]);
                if(step === i) break;
            };
        }
        // starts the tutorial at first step
        elementLoop(step);
        step++;

        // skip button
        const skipBtn = document.createElement("button");
        skipBtn.classList.add("Tutorial__skip-btn");
        skipBtn.textContent = "Skip";
        bodyNode.append(skipBtn);

        skipBtn.addEventListener("click", ()=>{
            endTutorial();
        });
    
        // event handle (necessary for removing the EventListener)
        let handler = () => {
            if(step < DOMElements.length){
                elementLoop(step);
                step++;
            } else {
                endTutorial();
            }
        }
        bodyNode.addEventListener("click", handler);
    });
}