import { Text, View, TouchableOpacity, Modal, Dimensions, TextInput, ScrollView } from "react-native";
import { useState } from "react";
import styles from "../styles/styles";
import axios from "axios";

const screenHeight = Dimensions.get("window").height;

const EntryModal = ({ modalVisible, setModalVisible, type, setModalValue, callBackFunc, callBackParams }) => {
    const [inputValue, setInputValue] = useState("");
    const [dropdownValues, setDropdownValues] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    const apiCallAttempt = async (entry, limit, endpoint) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/${endpoint}`,
                {
                    query: entry,
                    limit: limit,
                },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            const data = response.data;
            if (type === "food") {
                setDropdownValues(data.foods);
            } else {
                setDropdownValues(data.symptoms);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
            <View style={styles.modalOuterContainer}>
                <View style={styles.modalInnerContainer}>
                    <Text
                        style={{
                            fontSize: 22,
                            marginBottom: 5,
                            fontWeight: "500",
                        }}>
                        {type === "food" ? "Add Food" : "Add Symptom"}
                    </Text>
                    <Text style={{ fontSize: 18, textAlign: "center" }}>
                        Selected {type === "food" ? "Food" : "Symptom"}: {selectedValue === "" ? "None" : selectedValue}
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <TextInput
                            style={styles.modalInput}
                            value={inputValue}
                            onChangeText={(e) => {
                                setInputValue(e);
                                if (e.length > 0) {
                                    apiCallAttempt(e, 10, type);
                                } else {
                                    setDropdownValues([]);
                                }
                            }}
                            placeholder={type === "food" ? "Search for Food" : "Search for Symptom"}
                        />
                        <ScrollView showsVerticalScrollIndicator={false} style={{ height: screenHeight * 0.3 }}>
                            {dropdownValues.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.modalDropdownContainer,
                                        {
                                            borderTopColor: type === "food" ? "#93C7F8" : "#F89393",
                                        },
                                    ]}
                                    onPress={() => {
                                        setInputValue("");
                                        setDropdownValues([]);
                                        setSelectedValue(item);
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                        }}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (selectedValue === "") return;
                                if (callBackFunc !== undefined && callBackParams !== undefined) {
                                    const { state, username, endpoint } = callBackParams;
                                    console.log(state, username, selectedValue);
                                    callBackFunc(state, username, selectedValue, endpoint);
                                }
                                setModalValue((oldArray) => [...oldArray, selectedValue]);
                                setInputValue("");
                                setDropdownValues([]);
                                setSelectedValue("");
                                setModalVisible(false);
                            }}
                            style={[
                                styles.smallBtn,
                                {
                                    backgroundColor: type === "food" ? "#93C7F8" : "#F89393",
                                    marginTop: 20,
                                },
                            ]}>
                            <Text
                                style={{
                                    fontSize: 18,
                                }}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setInputValue("");
                                setDropdownValues([]);
                                setSelectedValue("");
                                setModalVisible(false);
                            }}
                            style={[
                                styles.smallBtn,
                                {
                                    backgroundColor: type === "food" ? "#93C7F8" : "#F89393",
                                    marginTop: 20,
                                },
                            ]}>
                            <Text
                                style={{
                                    fontSize: 18,
                                }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default EntryModal;
