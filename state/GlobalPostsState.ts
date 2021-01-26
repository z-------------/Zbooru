import * as React from "react";
import Post from "../api/Post";

/*
 * The global state concept and implementation here is taken from
 * https://dev.to/yezyilomo/global-state-management-in-react-with-global-variables-and-hooks-state-management-doesn-t-have-to-be-so-hard-2n2c
 */

type Subscriber = ((post: Post) => any);

export class GlobalPostsState {
    private static _instance: GlobalPostsState;
    private static _hasInstance = false;

    static get instance(): GlobalPostsState {
        if (!GlobalPostsState._hasInstance) {
            GlobalPostsState._instance = new GlobalPostsState();
            GlobalPostsState._hasInstance = true;
        }
        return GlobalPostsState._instance;
    }

    value: { [postId: string]: Post } = {};
    subscribers: { [postId: string]: Subscriber[] } = {};

    getValue(postId: string) {
        if (!this.value.hasOwnProperty(postId)) {
            console.log("GlobalPostState contains posts:", this.value);
            throw new Error(`GlobalPostState does not contain post with ID '${postId}'.`);
        }
        return this.value[postId];
    }

    setValue(postId: string, post: Post) {
        console.log("GlobalPostsState setValue(", postId, ", ", post, ")");
        // if (!this.value.hasOwnProperty(postId)) return;
        if (this.value[postId] === post) return;
        console.log("\tMade it past the guard.");

        this.value[postId] = post;
        for (const subscriber of this.subscribers[postId] || []) {
            subscriber(this.value[postId]);
        }
    }

    subscribe(postId: string, subscriber: Subscriber) {
        if (!this.subscribers.hasOwnProperty(postId)) {
            this.subscribers[postId] = [];
        }
        if (this.subscribers[postId].indexOf(subscriber) !== -1) return; // already subscribed
        this.subscribers[postId].push(subscriber);
    }

    unsubscribe(postId: string, subscriber: Subscriber) {
        if (!this.subscribers.hasOwnProperty(postId)) return;
        this.subscribers[postId] = this.subscribers[postId].filter(s => s !== subscriber);
    }
}

export function useGlobalPostsState(postId: string): [Post, (post: Post) => void] {
    const globalState = GlobalPostsState.instance;

    const [, rSetState] = React.useState({});
    const state = globalState.getValue(postId);

    function reRender(post: Post) {
        // This will be called when the global state changes
        rSetState({});
    }

    React.useEffect(() => {
        // Subscribe to a global state when a component mounts
        globalState.subscribe(postId, reRender);

        return () => {
            // Unsubscribe from a global state when a component unmounts
            globalState.unsubscribe(postId, reRender);
        };
    });

    function setState(post: Post) {
        // Send update request to the global state and let it update itself
        globalState.setValue(postId, post);
    }

    return [state, setState];
}
