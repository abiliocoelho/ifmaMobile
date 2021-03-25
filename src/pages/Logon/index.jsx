import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Logon({ navigation }) {
  const [registration, setRegistration] = useState("");

  async function handleLogin() {
    if (registration !== "") {
      await AsyncStorage.setItem("@ifma-registration", registration);
      navigation.navigate("Feed", { registration });
    }
  }

  useEffect(() => {
    async function getStorage() {
      const registration = await AsyncStorage.getItem("@ifma-registration");
      if (registration) {
        navigation.navigate("Feed", { registration });
      }
    }
    getStorage();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        onChangeText={(text) => setRegistration(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.title}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    height: 56,
    backgroundColor: "rgba(0,0,0,0.1)",
    fontSize: 22,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  button: {
    marginTop: 5,
    height: 56,
    paddingHorizontal: 10,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
  },
});
