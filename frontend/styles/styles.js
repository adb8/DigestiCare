import { StyleSheet, Dimensions } from "react-native";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    welcomeInput: {
        width: screenWidth * 0.8,
        height: screenHeight * 0.08,
        borderWidth: 2,
        borderColor: "#99CAF7",
        backgroundColor: "white",
        borderRadius: 12,
        fontSize: 18,
        paddingLeft: 25,
    },
    welcomeBtnsContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    welcomeBtn: {
        width: screenWidth * 0.65,
        height: screenHeight * 0.085,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#99CAF7",
        borderRadius: 12,
    },
    welcomeBtnSmall: {
        width: screenWidth * 0.45,
        height: screenHeight * 0.07,
    },
    imageBackground: {
        flexGrow: 1,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    outerHomeBtn: {
        borderWidth: 5,
        borderColor: "#FFFFFF",
        borderRadius: 500,
        marginTop: screenHeight * 0.05,
    },
    innerHomeBtn: {
        width: screenWidth * 0.7,
        height: screenWidth * 0.7,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 500,
        borderWidth: 5,
    },
    aboutContainer: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        borderRadius: 12,
    },
    aboutText: {
        fontSize: 18,
        textAlign: "center",
        lineHeight: 28,
    },
    smallBtn: {
        width: screenWidth * 0.3,
        height: screenHeight * 0.07,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginHorizontal: 10,
    },
    sizeContainer: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 12,
        width: screenWidth * 0.9,
        marginTop: 20,
    },
    sizeBtnsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        marginTop: 5,
    },
    foodsContainer: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 12,
        width: screenWidth * 0.9,
        marginTop: 20,
    },
    addFoodBtn: {
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 5,
    },
    notesContainer: {
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 12,
        width: screenWidth * 0.9,
        marginTop: 20,
    },
    notesInput: {
        height: screenHeight * 0.08,
        borderRadius: 12,
        marginTop: 10,
        textAlignVertical: "top",
        fontSize: 18,
        paddingHorizontal: 10,
    },
    foodContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        height: screenHeight * 0.055,
        borderTopWidth: 1,
    },
    modalInnerContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        padding: 20,
        backgroundColor: "#E0F4FF",
        borderRadius: 12,
        width: screenWidth * 0.8,
        height: screenHeight * 0.5,
    },
    modalOuterContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalInput: {
        marginTop: 15,
        height: screenHeight * 0.065,
        width: screenWidth * 0.6,
        backgroundColor: "white",
        fontSize: 18,
        borderRadius: 12,
        textAlign: "center",
    },
    modalDropdownContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        width: screenWidth * 0.6,
        height: screenHeight * 0.055,
        borderTopWidth: 1,
    },
    numberBtn: {
        width: 45,
        height: 45,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#FFFFFF",
    },
    foodLogItemContainer: {
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        height: screenHeight * 0.07,
        borderTopWidth: 1,
        width: screenWidth * 0.9,
        borderTopColor: "#93C7F8",
    },
    foodLogBtn: {
        alignSelf: "center",
        marginTop: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        padding: 12,
        marginHorizontal: 10,
    },
    foodLogEmpty: {
        fontSize: 18,
        marginTop: screenHeight * 0.345 - 30,
        marginHorizontal: 20,
        textAlign: "center",
        lineHeight: 25,
    },
});

export default styles;
