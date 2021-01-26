import Booru from "../api/Booru";
import Gelbooru from "../api/impl/Gelbooru";

export default class GlobalBooruState {
    private static _instance: GlobalBooruState;
    private static _hasInstance = false;

    static get instance(): GlobalBooruState {
        if (!GlobalBooruState._hasInstance) {
            GlobalBooruState._instance = new GlobalBooruState();
            GlobalBooruState._hasInstance = true;
        }
        return GlobalBooruState._instance;
    }

    booru: Booru = new Gelbooru("", "");
}
