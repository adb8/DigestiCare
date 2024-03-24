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
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;

const EnterSymptom = () => {
    const router = useRouter();
    const [symptomSeverity, setSymptomSeverity] = useState(0);
    const [symptoms, setSymptoms] = useState([]);
    const [notes, setNotes] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState("");
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;
        const getUserAndReset = async () => {
            setUsername("");
            setSymptomSeverity(0);
            setSymptoms([]);
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

    const addSymptomAttempt = async () => {
        if (symptomSeverity === 0 || symptoms.length === 0) {
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/entries/symptom",
                {
                    severity: symptomSeverity,
                    symptoms: symptoms,
                    notes: notes,
                    username: username,
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
                            style={styles.smallBtn}
                            onPress={() => {
                                setSymptomSeverity(0);
                                setSymptoms([]);
                                setNotes("");
                                router.push("/enter-food");
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                }}>
                                I Ate
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.smallBtn,
                                {
                                    backgroundColor: "#F89393",
                                },
                            ]}>
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
                            Symptom Severity
                        </Text>
                        <View style={styles.sizeBtnsContainer}>
                            <NumberButton
                                bgColor="#FFDADA"
                                value={1}
                                setValue={setSymptomSeverity}
                                currentValue={symptomSeverity}
                            />
                            <NumberButton
                                bgColor="#FFA6A6"
                                value={2}
                                setValue={setSymptomSeverity}
                                currentValue={symptomSeverity}
                            />
                            <NumberButton
                                bgColor="#FF7373"
                                value={3}
                                setValue={setSymptomSeverity}
                                currentValue={symptomSeverity}
                            />
                            <NumberButton
                                bgColor="#FF3F3F"
                                value={4}
                                setValue={setSymptomSeverity}
                                currentValue={symptomSeverity}
                            />
                            <NumberButton
                                bgColor="#FF0000"
                                value={5}
                                setValue={setSymptomSeverity}
                                currentValue={symptomSeverity}
                            />
                        </View>
                    </View>
                    <View style={styles.foodsContainer}>
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: "center",
                            }}>
                            Symptoms
                        </Text>
                        <ScrollView
                            style={{
                                marginTop: 10,
                                height: screenHeight * 0.2,
                            }}>
                            {symptoms.map((symptom, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.foodContainer,
                                        {
                                            borderTopColor: "#F89393",
                                        },
                                    ]}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                        }}>
                                        {symptom}
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
                        style={[styles.smallBtn, { backgroundColor: "#F89393", marginTop: 20 }]}
                        onPress={() => {
                            addSymptomAttempt();
                            setSymptomSeverity(0);
                            setSymptoms([]);
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
                        type={"symptom"}
                        setModalValue={setSymptoms}
                    />
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default EnterSymptom;
