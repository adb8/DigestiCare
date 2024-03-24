import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/styles";

const NumberButton = ({ bgColor, value, setValue, currentValue }) => {
    return (
        <TouchableOpacity
            onPress={() => setValue(value)}
            style={[
                styles.numberBtn,
                {
                    backgroundColor: bgColor,
                    borderWidth: currentValue === value ? 3 : 0,
                },
            ]}>
            <Text
                style={{
                    fontSize: 18,
                }}>
                {value}
            </Text>
        </TouchableOpacity>
    );
};

export default NumberButton;
