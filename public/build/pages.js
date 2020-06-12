// LANDING PAGE AND LOADING SCREEN CODE

// create text elements for the landing page
export function createLandingPageText(div) {
    const header = document.createElement("h1");
    const headerNode = document.createTextNode("S_P_E_E_C_H__B_U_B_B_L_E_S");
    header.appendChild(headerNode);
    header.style.color = "#ffef9e";
    header.style.font = "32px HelveticaNeue-Italic";
    header.style.paddingTop = "15%";

    const subheading = document.createElement("h2");
    const subheadingNode = document.createTextNode("✨ A WORK IN PROGRESS ✨");
    subheading.appendChild(subheadingNode);
    subheading.style.color = "white";
    subheading.style.font = "20px HelveticaNeue";
    subheading.style.paddingTop = "2%";

    const info = document.createElement("h3");
    const infoNode = document.createTextNode("Blow digital bubbles with sound!");
    info.appendChild(infoNode);
    info.style.color = "white";
    info.style.font = "20px HelveticaNeue";
    info.style.paddingBottom = "2%";

    const request = document.createElement("p");
    const requestNode = document.createTextNode(
        "Please allow the browser to access the camera and microphone and disable your adblocker to view."
    );
    request.appendChild(requestNode);
    request.style.color = "#ffef9e";
    // request.style.opacity = "50%";
    request.style.font = "14px HelveticaNeue-Light";
    request.style.verticalAlign = "baseline";

    div.appendChild(header);
    div.appendChild(subheading);
    div.appendChild(info);
    div.appendChild(request);
}

// create "enter sketch" button
export function createButton(div) {
    const button = document.createElement("button");

    button.style.position = "absolute";
    button.style.bottom = "30%";
    button.style.width = "210px";
    button.style.left = "calc(50% - 105px)";
    button.style.border = "1px solid #fff";
    button.style.borderRadius = "4px";
    button.style.padding = "12px 6px";
    button.style.color = "#fff";
    button.style.background = "rgba(0,0,0,0.1)";
    button.style.font = "14px Helvetica";
    // button.style.opacity = "0.5";
    button.style.cursor = "pointer";
    button.textContent = "ENTER SKETCH";

    button.onmouseenter = () => {
        button.style.color = "#ffef9e";
        button.style.border = "1px solid #ffef9e";
    };

    button.onmouseleave = () => {
        button.style.color = "#fff";
        button.style.border = "1px solid #fff";
    };

    div.appendChild(button);
    return button;
}

// if the button is pressed, hide the div
export function buttonPressed(button, div) {
    return new Promise(resolve => {
        button.onclick = () => {
            hideDiv(div);
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
    const textNode = document.createTextNode("M_O_D_E_L__L_O_A_D_I_N_G");
    loadingText.appendChild(textNode);
    loadingText.style.color = "#ffef9e";
    loadingText.style.font = "24px HelveticaNeue-Italic";
    loadingText.style.paddingTop = "22%";
    div.appendChild(loadingText);
}