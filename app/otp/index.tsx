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
      const res = await validateOTP(mobile, otp);
      const token = res.data.token;
      await AsyncStorage.setItem("token", token);
      Alert.alert("Success", "OTP verified");
    } catch {
      Alert.alert("Invalid OTP", "Please try again");
    }
  };

  const resendOtp = async () => {
    try {
      await generateOTP(mobile);
      Alert.alert("Resent!");
    } catch {
      Alert.alert("Error", "Could not send OTP. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Phone Verification</Text>
      <Text style={styles.subtext}>
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
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtext: {
    fontSize: 15,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 10,
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
