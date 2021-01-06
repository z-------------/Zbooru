import * as React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Text } from "./Themed";

const styles = StyleSheet.create({
    postThumb: {
        width: 100,
        height: 100,
    },
});

export default function PostThumb(props: {
    postId: string;
    postStuff: boolean;
    postUrlSmall: string;
    onPress: (postId: string) => void;
}) {
    return (
        <Pressable onPress={() => props.onPress(props.postId)}>
            <Text
                lightColor="#000000"
                darkColor="#ffffff"
            >
                {"{"}
                {props.postStuff ? "yes" : "no"}
                {"}"}
            </Text>
            <Image
                style={styles.postThumb}
                source={{uri: props.postUrlSmall}}
            />
        </Pressable>
    );
}
