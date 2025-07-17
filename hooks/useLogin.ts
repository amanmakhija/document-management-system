import { generateOTP, validateOTP } from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useLogin = (mobile: string) => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const otp = code.join("");

  const sendOtp = async () => {
    if (mobile.length !== 10) {
      Alert.alert("Invalid", "Enter a valid 10-digit mobile number");
      return;
    }
    try {
      await generateOTP(mobile);
      router.push({ pathname: "/otp", params: { mobile } });
    } catch {
      Alert.alert("Error", "Could not send OTP. Try again.");
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

  const verifyOtp = async () => {
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

  return { resendOtp, verifyOtp, sendOtp, code, setCode };
};
