import { StatusBar, View } from "react-native";
import { CalculatorScreen } from "./screens/CalculatorScreen";
import { styles } from "./theme/app-theme";

export default function App() {
  return (
    <View style={styles.background}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'black'}
      />
      <CalculatorScreen />
    </View>
  )
}