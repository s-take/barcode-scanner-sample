import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Container, Text, Button, Icon } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import BarcodeScannerScreen from "./components/BarcodeScannerScreen";
import CartItemList from "./components/CartItemList";
import AddCart from "./components/AddCart";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>JANバーコード読取サンプル{"\n"}</Text>
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
  button: {
    alignSelf: "center",
    margin: 10,
  },
});

const Tab = createMaterialBottomTabNavigator();
//const Stack = createStackNavigator();
function RootStack() {
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "ホーム",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="BarcodeScanner"
        component={BarcodeScannerScreen}
        options={{
          tabBarLabel: "バーコード読取",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="barcode" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddCart"
        component={AddCart}
        options={{
          tabBarLabel: "カートテスト",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartItemList}
        options={{
          tabBarLabel: "カート",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
          title: "カート",
        }}
      />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  // ロードが終わるまでは「loading...」を表示するため、state「isReady」で制御
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }
  // DidMountのタイミングでフォントリソースをメモリ上に読み込み。終わったらisReadyをオン。
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
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
