import React from "react";
import { Text, TouchableOpacity, Dimensions } from "react-native";
import styles from "../styles/styles";

const screenWidth = Dimensions.get("window").width;

const SmallButton = ({ buttonState, stateVar, onPress, text }) => {
    return (
        <TouchableOpacity
            style={[
                styles.smallBtn,
                {
                    width: screenWidth * 0.27,
                    backgroundColor: stateVar === buttonState ? "#93C7F8" : "#FFFFFF",
                    marginHorizontal: 0,
                },
            ]}
            onPress={onPress}>
            <Text
                style={{
                    fontSize: 18,
                }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default SmallButton;
