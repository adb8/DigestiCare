import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{
                    drawerLabelStyle: {
                        fontSize: 16,
                        textAlign: "center",
                        color: "#000000",
                        fontWeight: "400",
                    },
                    drawerStyle: {
                        backgroundColor: "#E0F4FF",
                    },
                }}>
                <Drawer.Screen
                    name="home/index"
                    options={{
                        title: "Home",
                        drawerLabel: "Home",
                        headerTitle: "",
                        headerStyle: {
                            backgroundColor: "#C6EAFF",
                        },
                        drawerIcon: ({ size, color }) => <Entypo name="home" size={size} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="timeline/index"
                    options={{
                        title: "Timeline",
                        drawerLabel: "Timeline",
                        headerTitle: "Timeline",
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: "#C6EAFF",
                        },
                        drawerIcon: ({ size, color }) => <FontAwesome6 name="timeline" size={size} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="suggestions/index"
                    options={{
                        title: "Suggestions",
                        drawerLabel: "Suggestions",
                        headerTitle: "Suggestions",
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: "#C6EAFF",
                        },
                        drawerIcon: ({ size, color }) => <MaterialIcons name="lightbulb" size={size} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="enter-food/index"
                    options={{
                        title: "Enter Food",
                        drawerLabel: "Enter Food",
                        headerTitle: "Enter Food",
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: "#C6EAFF",
                        },
                        drawerIcon: ({ size, color }) => (
                            <MaterialCommunityIcons name="food-apple" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="enter-symptom/index"
                    options={{
                        title: "Enter Symptom",
                        drawerLabel: "Enter Symptom",
                        headerTitle: "Enter Symptom",
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: "#C6EAFF",
                        },
                        drawerIcon: ({ size, color }) => (
                            <MaterialCommunityIcons name="emoticon-sad" size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="food-log/index"
                    options={{
                        title: "Food Log",
                        drawerLabel: "Food Log",
                        headerTitle: "Food Log",
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: "#C6EAFF",
                        },
                        drawerIcon: ({ size, color }) => <FontAwesome5 name="book" size={size} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="about/index"
                    options={{
                        title: "About",
                        drawerLabel: "About",
                        headerTitle: "About",
                        headerTitleAlign: "center",
                        headerStyle: {
                            backgroundColor: "#C6EAFF",
                        },
                        drawerIcon: ({ size, color }) => <Foundation name="info" size={size} color={color} />,
                    }}
                />
                <Drawer.Screen
                    name="index"
                    options={{
                        title: "Log out",
                        drawerLabel: "Log out",
                        headerTitle: "",
                        headerStyle: {
                            backgroundColor: "#C6EAFF",
                        },
                        headerLeft: () => <></>,
                        drawerIcon: ({ size, color }) => <Ionicons name="exit" size={size} color={color} />,
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
