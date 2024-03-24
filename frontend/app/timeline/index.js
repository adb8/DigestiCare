import { View, ScrollView, SafeAreaView, ImageBackground, Dimensions } from "react-native";
import styles from "../../styles/styles";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import EntryTimeline from "../../components/EntryTimeline";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Timeline = () => {
    const isFocused = useIsFocused();
    const [username, setUsername] = useState("");
    const [foodEntries, setFoodEntries] = useState([]);
    const [symptomEntries, setSymptomEntries] = useState([]);

    useEffect(() => {
        if (!isFocused) return;
        const getUserAndEntries = async () => {
            try {
                setFoodEntries([]);
                setSymptomEntries([]);
                const username = await SecureStore.getItemAsync("username");
                setUsername(username);
                const response = await axios.post(
                    "http://localhost:5000/entries/",
                    {
                        username: username,
                    },
                    {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }
                );
                const foodEntries = response.data.foods;
                const symptomEntries = response.data.symptoms;
                setFoodEntries(foodEntries);
                setSymptomEntries(symptomEntries);
            } catch (error) {
                console.log(error);
            }
        };
        getUserAndEntries();
    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/images/background.png")}
                resizeMode="stretch"
                style={styles.imageBackground}>
                <ScrollView
                    style={{ flex: 1, marginVertical: 20 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        width: screenWidth,
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}>
                        {foodEntries && <EntryTimeline type="food" entries={foodEntries} />}
                        {symptomEntries && <EntryTimeline type="symptom" entries={symptomEntries} />}
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Timeline;
