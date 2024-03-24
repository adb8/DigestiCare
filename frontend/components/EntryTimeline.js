import { View } from "react-native";
import TimelineBubble from "./TimelineBubble";
import colors from "../util/image-colors";
import { useEffect, useState } from "react";

const EntryTimeline = ({ type, entries }) => {
    const backgroundColor = type === "food" ? "#93CEEF" : "#EF9393";
    const [uniqueItems, setUniqueItems] = useState([]);
    const [bubbleColors, setBubbleColors] = useState([]);
    const [timelineHeight, setTimelineHeight] = useState(1200);

    useEffect(() => {
        let uniqueItems = [];
        entries.forEach((entry) => {
            if (type === "food") {
                entry.foods.forEach((item) => {
                    if (!uniqueItems.includes(item)) {
                        uniqueItems.push(item);
                    }
                });
            } else {
                entry.symptoms.forEach((item) => {
                    if (!uniqueItems.includes(item)) {
                        uniqueItems.push(item);
                    }
                });
            }
        });
        uniqueItems = [...new Set(uniqueItems.flat())];
        setUniqueItems(uniqueItems);
        if (type === "food") {
            setBubbleColors(colors.healthy);
        } else {
            setBubbleColors(colors.unhealthy);
        }
    }, [colors, entries, type]);

    return (
        <View
            style={{
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <View
                style={[
                    {
                        backgroundColor: backgroundColor,
                        marginBottom: -10,
                        zIndex: -1,
                        width: 25,
                        height: 25,
                        borderRadius: 50,
                    },
                ]}></View>
            <View
                style={{
                    backgroundColor: backgroundColor,
                    height: timelineHeight,
                    width: 8,
                    marginHorizontal: 35,
                    alignContent: "center",
                    alignItems: "center",
                }}>
                {entries &&
                    bubbleColors &&
                    bubbleColors.length > 0 &&
                    uniqueItems &&
                    uniqueItems.length > 0 &&
                    entries.map((entry, index) => {
                        const thisBubbleColors = [];
                        if (type === "food") {
                            entry.foods.forEach((item) => {
                                const index = uniqueItems.indexOf(item);
                                if (
                                    index > -1 &&
                                    bubbleColors[index] &&
                                    !thisBubbleColors.includes(bubbleColors[index])
                                ) {
                                    thisBubbleColors.push(bubbleColors[index]);
                                }
                            });
                        } else {
                            entry.symptoms.forEach((item) => {
                                const index = uniqueItems.indexOf(item);
                                if (
                                    index > -1 &&
                                    bubbleColors[index] &&
                                    !thisBubbleColors.includes(bubbleColors[index])
                                ) {
                                    thisBubbleColors.push(bubbleColors[index]);
                                }
                            });
                        }

                        const thisDate = new Date(entry.date);
                        const thisDateString = `${thisDate.getMonth() + 1}/${thisDate.getDate()}`;
                        const thisTime = `${thisDate.getHours()}:${thisDate.getMinutes()}`;
                        const thisDateTime = `${thisDateString} ${thisTime}`;
                        const currentDate = new Date();
                        const dateDifference = currentDate - thisDate;
                        const bubbleHeight = dateDifference / (1000 * 60 * 15); // 1 pixel = 15 minutes
                        if (bubbleHeight > timelineHeight) {
                            setTimelineHeight(bubbleHeight + 200);
                        }

                        let additionalNotes = "";
                        if (entry.notes.length > 0) {
                            additionalNotes = entry.notes;
                        }

                        let sizeSeverity = 2;
                        if (type === "food") {
                            sizeSeverity = entry.size;
                        } else if (type === "symptom") {
                            sizeSeverity = entry.severity;
                        }
                        const bubbleSize =
                            sizeSeverity === 1
                                ? 20
                                : sizeSeverity === 2
                                ? 25
                                : sizeSeverity === 3
                                ? 35
                                : sizeSeverity === 4
                                ? 45
                                : sizeSeverity === 5
                                ? 55
                                : 25;

                        return (
                            <TimelineBubble
                                key={index}
                                height={bubbleHeight}
                                colors={thisBubbleColors}
                                size={bubbleSize}
                                data={{
                                    type: type,
                                    date: thisDateTime,
                                    notes: additionalNotes,
                                    items: type === "food" ? entry.foods : entry.symptoms,
                                    scale: sizeSeverity,
                                }}
                            />
                        );
                    })}
            </View>
            <View
                style={[
                    {
                        backgroundColor: backgroundColor,
                        marginTop: -10,
                        zIndex: -1,
                        width: 25,
                        height: 25,
                        borderRadius: 50,
                    },
                ]}></View>
        </View>
    );
};

export default EntryTimeline;
