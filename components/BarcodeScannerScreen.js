import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

// class BarcodeScannerScreenContent extends React.Component {
export default function BarcodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`バーコードタイプ；${type} \n読取結果：${data}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.button}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={"タップして再スキャン"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// const BarcodeScannerScreen = ({ navigation }) => {
//   return (
//     <Subscribe to={[InvoiceContainer]}>
//       {globalState => <BarcodeScannerScreenContent globalState={globalState} navigation={navigation} />}
//     </Subscribe>
//   );
// };
