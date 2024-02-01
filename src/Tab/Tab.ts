export class Tab {
    public constructor(title: string, activate?: boolean) {
        if (activate == null) {
            activate = true;
        }
        const container = document.createElement("div");
        container.className = "titleBar tab container";
        container.innerHTML = "" +
            "<div class='titleBar tab separator left'></div>" +
            "<div class='titleBar tab containerBgContainer'>" +
            "    <svg version='1.1' xmlns='http://www.w3.org/2000/svg' class='titleBar tab containerBg'><defs><symbol id='chrome-tab-geometry-left' viewBox='0 0 214 36'><path d='M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z'></path></symbol><symbol id='chrome-tab-geometry-right' viewBox='0 0 214 36'><use xlink:href='#chrome-tab-geometry-left'></use></symbol><clipPath id='crop'><rect class='mask' width='100%' height='100%' x='0'></rect></clipPath></defs><svg width='52%' height='100%'><use xlink:href='#chrome-tab-geometry-left' width='214' height='36' class='chrome-tab-geometry'></use></svg><g transform='scale(-1, 1)'><svg width='52%' height='100%' x='-100%' y='0'><use xlink:href='#chrome-tab-geometry-right' width='214' height='36' class='chrome-tab-geometry'></use></svg></g></svg>" +
            "    <div class='titleBar tab containerBgHover'></div>" +
            "</div>" +
            "<div class='titleBar tab content'>" +
            "    <div class='titleBar tab iconContainer'><img src='defaultFavicon.svg' class='titleBar tab icon' alt='Page favicon' draggable='false'></div>" +
            "    <span class='titleBar tab title'>New Tab</span>" +
            "</div>" +
            "<div class='titleBar tab separator right'></div>";
        const parent = document.querySelector(".titleBar.tabs.container");
        if (!parent) {
            throw new Error("Could not get tabs strip!");
        }
        container.style.width = "0";
        container.setAttribute("data-tab-active", "" + activate);
        const contentElem: HTMLDivElement | null = container.querySelector(".titleBar.tab.content");
        if (!contentElem){
            throw new Error("Could not get tab content!");
        }
        contentElem.style.opacity = "0";
        parent.appendChild(container);
        setTimeout(() => {
            container.style.width = "100%";
            contentElem.style.opacity = "1";
        }, 100);
    }
}