import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/api";

export default function Feed({ route, navigation }) {
  const { registration } = route.params;
  const [data, setData] = useState({});

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={async () => {
            await AsyncStorage.clear();
            navigation.navigate("Logon");
          }}
        >
          <Icon name="exit-outline" size={28} />
        </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    async function getStudent() {
      const response = await api.get(`/class/1/student/${registration}`);
      setData(response.data);
    }
    getStudent();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {data.messages?.map((message) => (
        <View key={message.id} style={styles.messageView}>
          <Text style={styles.title}>{message.title}</Text>
          <Text style={styles.message}>{message.message}</Text>
          <Text style={styles.data}>
            {new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(
              new Date(message.created_at.replace(/-/g, "/"))
            )}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  messageView: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 6,

    padding: 10,
  },
  message: {
    fontSize: 18,
    marginTop: 5,
  },
  data: {
    marginTop: 20,
    color: "#555",
  },
});
