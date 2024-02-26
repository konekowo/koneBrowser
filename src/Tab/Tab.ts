import {TabManager} from "./TabManager";
import {v4} from "uuid";

export class Tab {
    private isActive: boolean = false;
    public isDragging: boolean = false;
    public lastX = 0;
    public lastElemX = 0;
    private container: HTMLDivElement;
    private tabsContainer: HTMLDivElement;

    public constructor(title: string, activate?: boolean) {
        if (activate == null) {
            activate = true;
        }
        this.container = document.createElement("div");
        this.container.className = "titleBar tab container";
        this.container.innerHTML = "" +
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
        const parent: HTMLDivElement | null = document.querySelector(".titleBar.tabs.container");
        if (!parent) {
            throw new Error("Could not get tabs strip!");
        }
        this.container.style.width = "0";
        this.container.setAttribute("data-tab-isDragging", "false");
        this.isActive = false;

        const contentElem: HTMLDivElement | null = this.container.querySelector(".titleBar.tab.content");
        if (!contentElem){
            throw new Error("Could not get tab content!");
        }
        contentElem.style.opacity = "0";
        parent.appendChild(this.container);
        this.tabsContainer = parent;
        setTimeout(() => {
            this.container.style.width = "100%";
            contentElem.style.opacity = "1";
        }, 100);

        TabManager.register(this);

        this.container.addEventListener("mousedown", (e) => {
            this.setDragging(true, e);
            if (!this.getActive()){
                TabManager.tabs.forEach((tab: Tab) => {
                   tab.setActive(false);
                });
                this.setActive(true);
            }


            const mouseUp = (e: MouseEvent) => {
                if (this.getDragging()) {
                    this.setDragging(false, e);
                }
                document.removeEventListener("mouseup", mouseUp);
            }

            document.addEventListener("mouseup", mouseUp);
        });

        this.setActive(activate);
    }

    public setDragging(isDragging: boolean, e: MouseEvent){
        this.isDragging = isDragging;
        this.container.setAttribute("data-tab-isDragging", "" + this.isDragging);
        const parent: HTMLDivElement | null = document.querySelector(".titleBar.tabs.container");
        if (!parent) {
            throw new Error("Could not get tabs strip!");
        }
        this.tabsContainer = parent;
        if (this.isDragging) {
            this.lastElemX = 0;
            this.lastX = 0;
            this.lastX = e.clientX;
            this.container.style.zIndex = "999";
            document.addEventListener("mousemove", this.startDrag);
        }
        else {
            // wait for animation to be done
            setTimeout(() => {
                this.container.style.zIndex = "unset";
            }, 400);
            this.container.style.transform = "translateY(0.3em)";
            document.removeEventListener("mousemove", this.startDrag);
            this.lastElemX = 0;
            this.lastX = 0;
        }
    }

    public startDrag = (e: MouseEvent) => {
        let elemX = (this.lastElemX - (this.lastX - e.clientX));
        if (elemX + this.container.offsetWidth +this.container.offsetLeft > this.tabsContainer.offsetLeft + this.tabsContainer.offsetWidth) {
           elemX = this.tabsContainer.offsetLeft + this.tabsContainer.offsetWidth - this.container.offsetWidth - this.container.offsetLeft;
        }
        else if (elemX + this.container.offsetLeft < this.tabsContainer.offsetLeft) {
            elemX = this.tabsContainer.offsetLeft - this.container.offsetLeft;
        }
        this.container.style.transform = "translate(" + elemX + "px, 0.3em)";
        this.lastElemX = elemX;
        this.lastX = e.clientX;
    }


    public getDragging(){
        return this.isDragging;
    }

    public setActive(isActive :boolean) {
        this.isActive = isActive;
        this.container.setAttribute("data-tab-active", "" + this.isActive);
        if (this.container.parentElement === null){
            throw new Error("go kys!");
        }
        for (let i = 0; i < this.container.parentElement.children.length; i++) {
            if (this.container.parentElement.children[i] == this.container) {
                if (this.container.parentElement.children[i-1]) {
                    let rightSelector: HTMLDivElement | null = this.container.parentElement.children[i - 1].querySelector(".titleBar.tab.separator.right");
                    if (rightSelector === null) {
                        throw new Error("no");
                    }
                    if (isActive) {
                        rightSelector.style.opacity = "0";
                    } else {
                        rightSelector.style.opacity = "1";
                    }
                }
            }
        }
    }

    public getActive(){
        return this.isActive;
    }


}