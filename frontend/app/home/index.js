import { View, ScrollView, SafeAreaView, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import styles from "../../styles/styles";

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/images/background.png")}
                resizeMode="stretch"
                style={styles.imageBackground}>
                <Drawer>
                    <Drawer.Screen
                        name="home/index"
                        options={{
                            drawerLabel: "Home",
                            title: "overview",
                            headerShown: true,
                            headerTitle: "Overview",
                        }}
                    />
                </Drawer>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center",
                    }}>
                    <TouchableOpacity
                        style={styles.outerHomeBtn}
                        onPress={() => {
                            router.push("/enter-food");
                        }}>
                        <View
                            style={[
                                styles.innerHomeBtn,
                                {
                                    backgroundColor: "#D8F1FF",
                                    borderColor: "#B5E1F9",
                                },
                            ]}>
                            <Text
                                style={{
                                    fontSize: 30,
                                }}>
                                I Ate...
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.outerHomeBtn}
                        onPress={() => {
                            router.push("/enter-symptom");
                        }}>
                        <View
                            style={[
                                styles.innerHomeBtn,
                                {
                                    backgroundColor: "#FFD8D8",
                                    borderColor: "#F9B5B5",
                                },
                            ]}>
                            <Text
                                style={{
                                    fontSize: 30,
                                }}>
                                I Feel...
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Home;
