import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Text, Button, Icon } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import BarcodeScannerScreen from "./components/BarcodeScannerScreen";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>BarCode Scanner Sample{"\n"}</Text>
        <Button
          style={{ alignSelf: "center" }}
          onPress={() => this.props.navigation.navigate("バーコード読取")}
          >
          {/* <Icon type="FontAwesome5" name="barcode" /> */}
          <Text>バーコード読取</Text>
          </Button>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>バーコード読取</Text>
      </View>
    );
  }
}

const Stack = createStackNavigator();
function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen name="ホーム" component={HomeScreen} />
      <Stack.Screen name="詳細" component={DetailsScreen} />
      <Stack.Screen name="バーコード読取" component={BarcodeScannerScreen} />
    </Stack.Navigator>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <RootStack />
//     </NavigationContainer>
//   );
// }

export default class App extends React.Component {
  // ロードが終わるまでは「loading...」を表示するため、state「isReady」で制御
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  // DidMountのタイミングでフォントリソースをメモリ上に読み込み。終わったらisReadyをオン。
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }
  render() {
    //Wait for font loading... フォントの読み込み中なら、「loading...」を表示
    if (!this.state.isReady) {
      return (
        <View>
          <Text>loading...</Text>
        </View>
      );
    }

    return (
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
    );
  }
}
