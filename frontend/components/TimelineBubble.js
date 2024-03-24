import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { useState } from "react";

const TimelineBubble = ({ height, colors, size, data }) => {
    const [bubbleInfoVisible, setBubbleInfoVisible] = useState(false);
    const popupSize = 100;

    return (
        <TouchableOpacity
            onPress={() => {
                setBubbleInfoVisible(!bubbleInfoVisible);
            }}
            style={{
                width: bubbleInfoVisible ? size + popupSize : size,
                height: bubbleInfoVisible ? size + popupSize : size,
                borderRadius: size / 2,
                position: "absolute",
                top: height,
                left: data.type === "food" && bubbleInfoVisible ? -popupSize : null,
                right: data.type === "symptom" && bubbleInfoVisible ? -popupSize : null,
                overflow: "hidden",
            }}>
            {colors.map((color, index) => (
                <View
                    key={index}
                    style={{
                        flex: 1,
                        backgroundColor: color,
                    }}
                />
            ))}
            {bubbleInfoVisible && (
                <ScrollView
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#FFFFFF",
                        padding: 10,
                    }}
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}>
                    <View
                        style={{
                            flex: 1,
                            alignContent: "center",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: "center",
                            }}>
                            {data.type === "food" ? "You ate..." : "You had..."}
                        </Text>
                        {data.items.map((item, index) => (
                            <Text
                                key={index}
                                style={{
                                    fontSize: 16,
                                    textAlign: "center",
                                }}>
                                - {item}
                            </Text>
                        ))}
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                            }}>
                            {data.type === "food" ? "Size: " + data.scale : "Severity: " + data.scale}
                        </Text>
                        {data.notes && (
                            <Text
                                style={{
                                    fontSize: 16,
                                    textAlign: "center",
                                }}>
                                {data.notes}
                            </Text>
                        )}
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: "center",
                            }}>
                            {data.date}
                        </Text>
                    </View>
                </ScrollView>
            )}
        </TouchableOpacity>
    );
};

export default TimelineBubble;
