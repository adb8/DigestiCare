import {
    View,
    ScrollView,
    SafeAreaView,
    Text,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import NumberButton from "../../components/NumberButton";
import styles from "../../styles/styles";
import EntryModal from "../../components/EntryModal";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;

const EnterFood = () => {
    const router = useRouter();
    const [mealSize, setMealSize] = useState(0);
    const [foods, setFoods] = useState([]);
    const [notes, setNotes] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;
        const getUserAndReset = async () => {
            setUsername("");
            setMealSize(0);
            setFoods([]);
            setNotes("");
            try {
                const username = await SecureStore.getItemAsync("username");
                setUsername(username);
            } catch (error) {
                console.log(error);
            }
        };
        getUserAndReset();
    }, [isFocused]);

    const addMealAttempt = async () => {
        if (mealSize === 0 || foods.length === 0) {
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/entries/food",
                {
                    username: username,
                    size: mealSize,
                    foods: foods,
                    notes: notes,
                    date: new Date(),
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
                            flexDirection: "row",
                        }}>
                        <TouchableOpacity
                            style={[
                                styles.smallBtn,
                                {
                                    backgroundColor: "#93C7F8",
                                },
                            ]}>
                            <Text
                                style={{
                                    fontSize: 18,
                                }}>
                                I Ate
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.smallBtn}
                            onPress={() => {
                                setMealSize(0);
                                setFoods([]);
                                setNotes("");
                                router.push("/enter-symptom");
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                }}>
                                I Feel
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sizeContainer}>
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: "center",
                            }}>
                            Meal Size
                        </Text>
                        <View style={styles.sizeBtnsContainer}>
                            <NumberButton bgColor="#DAF2FF" value={1} setValue={setMealSize} currentValue={mealSize} />
                            <NumberButton bgColor="#A6DFFF" value={2} setValue={setMealSize} currentValue={mealSize} />
                            <NumberButton bgColor="#73CCFF" value={3} setValue={setMealSize} currentValue={mealSize} />
                            <NumberButton bgColor="#3FBAFF" value={4} setValue={setMealSize} currentValue={mealSize} />
                            <NumberButton bgColor="#00A3FF" value={5} setValue={setMealSize} currentValue={mealSize} />
                        </View>
                    </View>
                    <View style={[styles.foodsContainer]}>
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: "center",
                            }}>
                            Foods
                        </Text>
                        <ScrollView
                            style={{
                                marginTop: 10,
                                height: screenHeight * 0.2,
                            }}>
                            {foods.map((food, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.foodContainer,
                                        {
                                            borderTopColor: "#93C7F8",
                                        },
                                    ]}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                        }}>
                                        {food}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.addFoodBtn}
                            onPress={() => {
                                setModalVisible(true);
                            }}>
                            <Image
                                source={require("../../assets/images/plus-icon.png")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.notesContainer}>
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: "center",
                            }}>
                            Additional Notes
                        </Text>
                        <TextInput style={styles.notesInput} value={notes} onChangeText={setNotes} multiline={true} />
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.smallBtn,
                            {
                                backgroundColor: "#93C7F8",
                                marginTop: 20,
                            },
                        ]}
                        onPress={() => {
                            addMealAttempt();
                            setMealSize(0);
                            setFoods([]);
                            setNotes("");
                            router.push("/home");
                        }}>
                        <Text
                            style={{
                                fontSize: 18,
                            }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                    <EntryModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        type={"food"}
                        setModalValue={setFoods}
                    />
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default EnterFood;
