import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PhoneVerified() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.dismissAll();
      router.replace("/");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name="check" size={40} color="#fff" />
      </View>
      <Text style={styles.title}>Phone Number Verified</Text>
      <Text style={styles.subtitle}>
        You will be redirected to the main page{"\n"}in a few moments
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconWrapper: {
    backgroundColor: "#f7901e",
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
  },
});
