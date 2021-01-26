import * as React from "react";
import { FlatList } from "react-native";
import Post from "../api/Post";
import PostThumb from "./PostThumb";

export default function PostThumbList(props: {
    postIds: string[],
}) {
    const [postIds, setPostIds] = React.useState([] as string[]);

    const renderItem = ({ item }: { item: string }) => {
        console.log("renderItem", item);
        return (
            <PostThumb
                postId={item}
            ></PostThumb>
        );
    };

    React.useEffect(() => {
        console.log("posts prop changed");
        // update our state posts by adding only the prop posts that we don't already have
        const postIdsNew = [] as string[];
        for (const propPostId of props.postIds) {
            if (postIds.indexOf(propPostId) === -1) {
                postIdsNew.push(propPostId);
            }
        }
        setPostIds(postIdsNew);
    }, [props.postIds]);

    return (
        <FlatList
            data={postIds}
            renderItem={renderItem}
            keyExtractor={postId => postId}
        ></FlatList>
    );
}
