import Booru from "./api/Booru";
import Gelbooru from "./api/impl/Gelbooru";

export default class GlobalState {
    private static _instance: GlobalState;
    private static _hasInstance = false;

    static get instance(): GlobalState {
        if (!GlobalState._hasInstance) {
            GlobalState._instance = new GlobalState();
            GlobalState._hasInstance = true;
        }
        return GlobalState._instance;
    }

    booru: Booru = new Gelbooru("", "");
}
