import {Tab} from "./Tab";

export class TabManager {
    public static tabs: Tab[] = [];

    public static register(tab: Tab){
        this.tabs.push(tab);
    }

    public static remove(tab: Tab) {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab){
                this.tabs.splice(i, 1);
            }
        }
    }
}