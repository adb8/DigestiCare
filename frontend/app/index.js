import {
    View,
    ScrollView,
    SafeAreaView,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    TextInput,
    BackHandler,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import styles from "../styles/styles";
import { useIsFocused } from "@react-navigation/native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Welcome = () => {
    const router = useRouter();
    const [state, setState] = useState(0);
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupUsername, setSignupUsername] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const isFocused = useIsFocused();

    async function saveUser(key, value) {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (state != 0) {
                setState(0);
                setLoginUsername("");
                setLoginPassword("");
                setSignupUsername("");
                setSignupPassword("");
                return true;
            }
            return false;
        });
        return () => backHandler.remove();
    }, [state]);

    useEffect(() => {
        if (!isFocused) return;
        async function deleteAll() {
            await SecureStore.deleteItemAsync("username");
            await SecureStore.deleteItemAsync("password");
        }
        deleteAll();
    }, [isFocused]);

    const loginAttempt = async () => {
        if (loginPassword.length === 0 || loginUsername.length === 0) {
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/users/login",
                {
                    username: loginUsername,
                    password: loginPassword,
                },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            const data = response.data;
            if (data.message === "Login successful") {
                setState(0);
                saveUser("username", loginUsername);
                saveUser("password", loginPassword);
                setLoginUsername("");
                setLoginPassword("");
                router.push("/home");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const signupAttempt = async () => {
        if (
            signupPassword.length === 0 ||
            signupUsername.length === 0 ||
            reenterPassword.length === 0 ||
            signupPassword !== reenterPassword
        ) {
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/users/add",
                {
                    username: signupUsername,
                    password: signupPassword,
                },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            const data = response.data;
            if (data.message === "Signup successful") {
                setState(0);
                saveUser("username", signupUsername);
                saveUser("password", signupPassword);
                setSignupUsername("");
                setSignupPassword("");
                setReenterPassword("");
                router.push("/home");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../assets/images/background.png")}
                resizeMode="stretch"
                style={styles.imageBackground}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}>
                    <Image
                        source={require("../assets/images/digesticare-logo.png")}
                        resizeMode="cover"
                        style={{
                            width: screenWidth * 0.8,
                            marginTop: screenHeight * 0.08,
                            resizeMode: "contain",
                        }}
                    />
                    <View style={styles.welcomeBtnsContainer}>
                        {state === 0 && (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        // skip login for now
                                        saveUser("username", "abu");
                                        saveUser("password", "abu");
                                        router.push("/home");
                                        // setState(1);
                                    }}
                                    style={styles.welcomeBtn}>
                                    <Text style={{ fontSize: 20 }}>Log in</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setState(2);
                                    }}
                                    style={[
                                        styles.welcomeBtn,
                                        {
                                            marginTop: 20,
                                            backgroundColor: "transparent",
                                            borderWidth: 2,
                                            borderColor: "#99CAF7",
                                        },
                                    ]}>
                                    <Text style={{ fontSize: 20 }}>Sign up</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {state === 1 && (
                            <>
                                <TextInput
                                    placeholder="Username"
                                    value={loginUsername}
                                    onChangeText={setLoginUsername}
                                    style={[
                                        styles.welcomeInput,
                                        {
                                            borderBottomLeftRadius: 0,
                                            borderBottomRightRadius: 0,
                                        },
                                    ]}
                                />
                                <TextInput
                                    placeholder="Password"
                                    value={loginPassword}
                                    onChangeText={setLoginPassword}
                                    secureTextEntry={true}
                                    style={[
                                        styles.welcomeInput,
                                        {
                                            borderTopWidth: 0,
                                            borderTopLeftRadius: 0,
                                            borderTopRightRadius: 0,
                                        },
                                    ]}
                                />
                                <TouchableOpacity
                                    onPress={loginAttempt}
                                    style={[styles.welcomeBtn, styles.welcomeBtnSmall, { marginTop: 20 }]}>
                                    <Text style={{ fontSize: 20 }}>Log in</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        {state === 2 && (
                            <>
                                <TextInput
                                    placeholder="Username"
                                    value={signupUsername}
                                    onChangeText={setSignupUsername}
                                    style={[
                                        styles.welcomeInput,
                                        {
                                            borderBottomLeftRadius: 0,
                                            borderBottomRightRadius: 0,
                                        },
                                    ]}
                                />
                                <TextInput
                                    placeholder="Password"
                                    value={signupPassword}
                                    onChangeText={setSignupPassword}
                                    secureTextEntry={true}
                                    style={[
                                        styles.welcomeInput,
                                        {
                                            borderTopWidth: 0,
                                            borderRadius: 0,
                                        },
                                    ]}
                                />
                                <TextInput
                                    placeholder="Re-enter Password"
                                    value={reenterPassword}
                                    onChangeText={setReenterPassword}
                                    secureTextEntry={true}
                                    style={[
                                        styles.welcomeInput,
                                        {
                                            borderTopWidth: 0,
                                            borderTopLeftRadius: 0,
                                            borderTopRightRadius: 0,
                                        },
                                    ]}
                                />
                                <TouchableOpacity
                                    onPress={signupAttempt}
                                    style={[styles.welcomeBtn, styles.welcomeBtnSmall, { marginTop: 20 }]}>
                                    <Text style={{ fontSize: 20 }}>Sign up</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Welcome;
