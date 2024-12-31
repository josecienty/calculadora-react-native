import { StyleSheet, Text, View } from "react-native"
import { colors, styles } from "../theme/app-theme"
import { CalculatorButton } from "../components/CalculatorButton"
import { useCalculator } from "../hooks/useCalculator"

export const CalculatorScreen = () => {
    const {
        formula,
        buildNumber,
        deleteOperation,
        clean,
        toogleSign,
        addOperation,
        subtractOperation,
        multiplyOperation,
        divideOperation,
        prevNumber,
        calculateResult
    } = useCalculator();

    return (
        <View style={styles.calculatorContainer}>
            <View style={customStyle.resultContainer}>
                <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={styles.mainResult}
                >
                    {formula}
                </Text>
                {(prevNumber !== '0') &&
                    <Text
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={styles.subResult}
                    >
                        {prevNumber}
                    </Text>
                }
            </View>

            <View style={styles.row}>
                <CalculatorButton onPress={clean} label="C" color={colors.ligthGray} blackText />
                <CalculatorButton onPress={toogleSign} label="+/-" color={colors.ligthGray} blackText />
                <CalculatorButton onPress={deleteOperation} label="del" color={colors.ligthGray} blackText />
                <CalculatorButton onPress={divideOperation} label="/" color={colors.orange} />
            </View>
            <View style={styles.row}>
                <CalculatorButton label="7" onPress={() => buildNumber('7')} />
                <CalculatorButton label="8" onPress={() => buildNumber('8')} />
                <CalculatorButton label="9" onPress={() => buildNumber('9')} />
                <CalculatorButton label="X" onPress={multiplyOperation} color={colors.orange} />
            </View>
            <View style={styles.row}>
                <CalculatorButton label="4" onPress={() => buildNumber('4')} />
                <CalculatorButton label="5" onPress={() => buildNumber('5')} />
                <CalculatorButton label="6" onPress={() => buildNumber('6')} />
                <CalculatorButton label="-" onPress={subtractOperation} color={colors.orange} />
            </View>
            <View style={styles.row}>
                <CalculatorButton label="1" onPress={() => buildNumber('1')} />
                <CalculatorButton label="2" onPress={() => buildNumber('2')} />
                <CalculatorButton label="3" onPress={() => buildNumber('3')} />
                <CalculatorButton label="+" onPress={addOperation} color={colors.orange} />
            </View>
            <View style={styles.row}>
                <CalculatorButton label="0" onPress={() => buildNumber('0')} doubleSize />
                <CalculatorButton label="." onPress={() => buildNumber('.')} />
                <CalculatorButton label="=" onPress={calculateResult} color={colors.orange} />
            </View>
        </View>
    )
}

const customStyle = StyleSheet.create({
    resultContainer: {
        paddingHorizontal: 30,
        paddingBottom: 20
    }
})