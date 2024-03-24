import {
    View,
    ScrollView,
    SafeAreaView,
    Text,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Image,
} from "react-native";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import styles from "../../styles/styles";
import SmallButton from "../../components/SmallButton";
import EntryModal from "../../components/EntryModal";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const FoodLog = () => {
    const [state, setState] = useState(0);
    const [safeLogValues, setSafeLogValues] = useState([]);
    const [unsureLogValues, setUnsureLogValues] = useState([]);
    const [unsafeLogValues, setUnsafeLogValues] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [deleteMode, setDeleteMode] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;
        const getUserAndLogs = async () => {
            setSafeLogValues([]);
            setUnsureLogValues([]);
            setUnsafeLogValues([]);
            setState(0);
            try {
                const username = await SecureStore.getItemAsync("username");
                setUsername(username);
                const response = await axios.post(
                    "http://localhost:5000/logs/",
                    {
                        username: username,
                    },
                    {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    }
                );
                const data = response.data.data;
                data.forEach((log) => {
                    if (log.type === "safe") {
                        setSafeLogValues((prev) => [...prev, log.food]);
                    } else if (log.type === "unsure") {
                        setUnsureLogValues((prev) => [...prev, log.food]);
                    } else if (log.type === "unsafe") {
                        setUnsafeLogValues((prev) => [...prev, log.food]);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        getUserAndLogs();
    }, [isFocused]);

    const saveToRemoveFromDB = async (state, username, foodItem, endpoint) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/logs/${endpoint}`,
                {
                    type: state === 0 ? "safe" : state === 1 ? "unsure" : "unsafe",
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

    const mapFunction = (item, index) => (
        <TouchableOpacity
            onPress={() => {
                if (deleteMode) {
                    if (state === 0) {
                        setSafeLogValues((prev) => prev.filter((_, i) => i !== index));
                    } else if (state === 1) {
                        setUnsureLogValues((prev) => prev.filter((_, i) => i !== index));
                    } else {
                        setUnsafeLogValues((prev) => prev.filter((_, i) => i !== index));
                    }
                    saveToRemoveFromDB(state, username, item, "remove");
                    setDeleteMode(false);
                }
            }}
            key={index}
            style={[
                styles.foodLogItemContainer,
                {
                    borderTopWidth: index > 0 ? 1 : 0,
                },
            ]}>
            <Text
                style={{
                    fontSize: 18,
                }}>
                {item}
            </Text>
        </TouchableOpacity>
    );

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
                            justifyContent: "space-between",
                            marginBottom: 20,
                            width: screenWidth * 0.9,
                        }}>
                        <SmallButton
                            buttonState={0}
                            stateVar={state}
                            onPress={() => {
                                setState(0);
                            }}
                            text="Safe"
                        />
                        <SmallButton
                            buttonState={1}
                            stateVar={state}
                            onPress={() => {
                                setState(1);
                            }}
                            text="Unsure"
                        />
                        <SmallButton
                            buttonState={2}
                            stateVar={state}
                            onPress={() => {
                                setState(2);
                            }}
                            text="Unsafe"
                        />
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: "center",
                            ...styles.foodsContainer,
                            marginTop: 0,
                            paddingVertical: 0,
                            height: screenHeight * 0.68,
                        }}>
                        {state == 0 && safeLogValues.map(mapFunction)}
                        {state == 1 && unsureLogValues.map(mapFunction)}
                        {state == 2 && unsafeLogValues.map(mapFunction)}
                        {((state === 0 && safeLogValues.length === 0) ||
                            (state === 1 && unsureLogValues.length === 0) ||
                            (state === 2 && unsafeLogValues.length === 0)) && (
                            <Text style={styles.foodLogEmpty}>
                                No logs to display. Press the add button below to add foods to this list.
                            </Text>
                        )}
                    </ScrollView>
                    <View
                        style={{
                            flexDirection: "row",
                        }}>
                        <TouchableOpacity
                            style={[styles.foodLogBtn]}
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
                        <TouchableOpacity
                            style={[styles.foodLogBtn]}
                            onPress={() => {
                                deleteMode ? setDeleteMode(false) : setDeleteMode(true);
                            }}>
                            <Image
                                source={require("../../assets/images/minus-icon.png")}
                                style={{
                                    width: 22,
                                    height: 22,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <EntryModal
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        setModalValue={
                            state === 0 ? setSafeLogValues : state === 1 ? setUnsureLogValues : setUnsafeLogValues
                        }
                        type="food"
                        callBackFunc={saveToRemoveFromDB}
                        callBackParams={{ state, username, endpoint: "post" }}
                    />
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default FoodLog;
