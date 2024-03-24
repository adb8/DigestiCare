import { View, ScrollView, SafeAreaView, Text, ImageBackground } from "react-native";
import styles from "../../styles/styles";

const About = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require("../../assets/images/background.png")}
                resizeMode="stretch"
                style={styles.imageBackground}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.aboutContainer}>
                        <Text style={styles.aboutText}>
                            DigestiCare is an app designed to help those suffering from IBD efficiently track and
                            analyze their food intake and symptom patterns with the purpose of discovering inflammatory
                            foods so users can remove them from their diet.
                        </Text>
                    </View>
                    <View style={styles.aboutContainer}>
                        <Text style={styles.aboutText}>
                            DigestiCare was made by Abu Ahmed, a high school senior at the Bronx High School of Science,
                            as part of a project submission for All Star Code & Google Play's 2023 Technical
                            Entrepreneurship Incubator program.
                        </Text>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default About;
