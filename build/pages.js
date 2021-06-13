// LANDING PAGE AND LOADING SCREEN CODE

// create text elements for the landing page
export function createLandingPageText(div) {
    const header = document.createElement("h1");
    const headerNode = document.createTextNode("SPEECH BUBBLES");
    header.appendChild(headerNode);
    header.style.fontSize = "32px";
    header.style.fontWeight = "400";
    header.style.fontStyle = "italic";
    header.style.letterSpacing = "5px";
    header.style.lineHeight = "50px";
    header.style.marginTop = "5vh";

    const subheading = document.createElement("h2");
    const subheadingNode = document.createTextNode("BLOW DIGITAL BUBBLES WITH SOUND");
    subheading.appendChild(subheadingNode);
    subheading.style.fontSize = "20px";
    subheading.style.fontWeight = "400";
    subheading.style.letterSpacing= "5px";
    subheading.style.lineHeight = "50px";
    subheading.style.marginTop = "20px";

    const info = document.createElement("h3");
    const infoNode = document.createTextNode("Please allow access to the camera and microphone to view. \nPlace an ear within a bubble to hear the sound in it!");
    info.appendChild(infoNode);
    info.style.fontSize = "18px";
    info.style.fontWeight = "200";
    info.style.lineHeight = "1.2em";
    info.style.marginTop = "10vh";
    info.style.marginBottom = "30px";
    info.style.whiteSpace = "pre";

    div.appendChild(header);
    div.appendChild(subheading);
    div.appendChild(info);
}

// create "enter sketch" button
export function createButton(div) {
    const button = document.createElement("button");

    button.style.position = "absolute";
    button.style.width = "140px";
    button.style.left = "calc(50% - 70px)";
    button.style.border = "1px solid #fff";
    button.style.borderRadius = "4px";
    button.style.padding = "12px 0px 12px 12px";
    button.style.color = "#fff";
    button.style.background = "none";
    button.style.font = "18px Helvetica";
    button.style.cursor = "pointer";
    button.textContent = "ENTER";
    button.style.letterSpacing= "5px";

    div.appendChild(button);
    return button;
}

// if the button is pressed, hide the div
export function buttonPressed(button, div, bg) {
    return new Promise(resolve => {
        button.onclick = () => {
            hideDiv(div);
            hideDiv(bg);
            let clicked = true;
            resolve(clicked);
        };
    });
}

export function hideDiv(div) {
    if (div.style.display !== "none") {
        div.style.display = "none";
    } else {
        div.style.display = "block";
    }
}

// create the loading screen
export function createLoadingScreen(div) {
    const loadingText = document.createElement("h1");
    const textNode = document.createTextNode("MODEL LOADING");
    loadingText.appendChild(textNode);
    loadingText.style.fontSize = "24px";
    loadingText.style.fontWeight = "lighter";
    loadingText.style.fontStyle = "italic";
    loadingText.style.letterSpacing= "5px";
    loadingText.style.lineHeight = "50px";
    div.appendChild(loadingText);
}