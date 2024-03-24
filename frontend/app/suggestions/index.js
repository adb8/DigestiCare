import {
    View,
    ScrollView,
    SafeAreaView,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
} from "react-native";
import styles from "../../styles/styles";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Suggestions = () => {
    const isFocused = useIsFocused();
    const [username, setUsername] = useState("");
    const [foodEntries, setFoodEntries] = useState([]);
    const [symptomEntries, setSymptomEntries] = useState([]);
    const [mostInflammatoryFoods, setMostInflammatoryFoods] = useState([]);

    useEffect(() => {
        if (!isFocused) return;
        const getEntriesAndCalculate = async () => {
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

                if (foodEntries.length === 0 || symptomEntries.length === 0) return;

                const mostInflammatoryFoods = [];
                const uniqueFoods = [];
                foodEntries.forEach((entry) => {
                    entry.foods.forEach((food) => {
                        if (!uniqueFoods.includes(food)) {
                            uniqueFoods.push(food);
                        }
                    });
                });

                console.log(uniqueFoods);
                uniqueFoods.forEach((food) => {
                    let totalDistance = 0;
                    let totalOccurrences = 0;
                    foodEntries.forEach((entry) => {
                        if (entry.foods.includes(food)) {
                            const foodDate = new Date(entry.date);
                            let shortestDistanceToSymptom = Infinity;
                            symptomEntries.forEach((symptomEntry) => {
                                const symptomDate = new Date(symptomEntry.date);
                                const distance = symptomDate - foodDate;
                                if (distance >= 0 && distance < shortestDistanceToSymptom) {
                                    shortestDistanceToSymptom = distance;
                                }
                            });
                            if (shortestDistanceToSymptom !== Infinity) {
                                totalDistance += shortestDistanceToSymptom;
                                totalOccurrences++;
                            }
                        }
                    });
                    let averageDistance = totalDistance / totalOccurrences;
                    if (!averageDistance) {
                        averageDistance = Infinity;
                    }
                    const avgDistHours = averageDistance / (1000 * 60 * 60);
                    const foodIndex = 1 / avgDistHours;
                    const roundedFoodIndex = Math.round(foodIndex * 100) / 100;
                    mostInflammatoryFoods.push({
                        food: food,
                        averageDistance: averageDistance,
                        foodIndex: roundedFoodIndex,
                    });
                });
                mostInflammatoryFoods.sort((a, b) => a.averageDistance - b.averageDistance);
                setMostInflammatoryFoods(mostInflammatoryFoods);
            } catch (error) {
                console.log(error);
            }
        };
        getEntriesAndCalculate();
    }, [isFocused]);

    const saveToDB = async (username, foodItem) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/logs/post`,
                {
                    type: "unsafe",
                    username: username,
                    food: foodItem,
                },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/images/background.png")}
                resizeMode="stretch"
                style={styles.imageBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}>
                    <View
                        style={{
                            marginBottom: 20,
                            backgroundColor: "#FFFFFF",
                            width: screenWidth * 0.7,
                            height: screenHeight * 0.08,
                            borderRadius: 12,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                            }}>
                            Food Inflammation Index
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                            }}>
                            From greatest to least
                        </Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: "center",
                            ...styles.foodsContainer,
                            marginTop: 0,
                            paddingVertical: 0,
                            height: screenHeight * 0.75,
                        }}>
                        {mostInflammatoryFoods &&
                            mostInflammatoryFoods.map((entry, index) => {
                                console.log(mostInflammatoryFoods);
                                return (
                                    <View
                                        key={index}
                                        style={[
                                            styles.foodLogItemContainer,
                                            {
                                                borderTopWidth: index > 0 ? 1 : 0,
                                                flexDirection: "row",
                                            },
                                        ]}>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                            }}>
                                            {entry.food} - {entry.foodIndex}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                saveToDB(username, entry.food);
                                            }}
                                            style={{
                                                position: "absolute",
                                                right: 30,
                                            }}>
                                            <Image
                                                source={require("../../assets/images/plus-icon.png")}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                    </ScrollView>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Suggestions;
