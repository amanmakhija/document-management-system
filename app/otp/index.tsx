import { BackButton } from "@/components/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OTPInput from "../../components/OTPInput";
import { generateOTP, validateOTP } from "../../services/api";

export default function OTPScreen() {
  const router = useRouter();
  const { mobile } = useLocalSearchParams<{ mobile: string }>();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const otp = code.join("");

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter 6-digit OTP");
      return;
    }

    try {
      const { data } = await validateOTP(mobile, otp);
      const { token } = data.data;
      await AsyncStorage.setItem("token", token);
      router.replace("/");
    } catch {
      Alert.alert("Invalid OTP", "Please try again");
    }
  };

  const resendOtp = async () => {
    setCode(["", "", "", "", "", ""]);
    try {
      await generateOTP(mobile);
      Alert.alert("Resent!");
    } catch {
      Alert.alert("Error", "Could not send OTP. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.headerText}>Phone Verification</Text>
      </View>
      <Text style={styles.text}>
        Enter 6 digit verification code sent to your phone number
      </Text>

      <OTPInput code={code} setCode={setCode} />

      <TouchableOpacity onPress={handleVerify}>
        <Text style={styles.verifyBtn}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resendOtp}>
        <Text style={styles.resend}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2E2F",
    padding: 24,
  },
  headerContainer: {
    position: "relative",
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 50,
    textAlign: "center",
  },
  text: {
    fontSize: 25,
    color: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  resend: {
    color: "#f7901e",
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
  verifyBtn: {
    backgroundColor: "#f7901e",
    color: "#fff",
    padding: 12,
    textAlign: "center",
    borderRadius: 8,
    fontWeight: "bold",
    marginTop: 10,
  },
});
