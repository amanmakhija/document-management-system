import { generateOTP, validateOTP } from "@/services/api";
import { setUser } from "@/store/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

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
      const { data } = await generateOTP(mobile);
      if (!data.status) {
        Alert.alert(data.data);
        return;
      }
      router.push({ pathname: "/otp", params: { mobile } });
    } catch {
      Alert.alert("Error", "Could not send OTP. Try again.");
    }
  };

  const resendOtp = async () => {
    setCode(["", "", "", "", "", ""]);
    try {
      const { data } = await generateOTP(mobile);
      if (!data.status) {
        Alert.alert(data.data);
        return;
      }
      Alert.alert("Resent!");
    } catch {
      Alert.alert("Error", "Could not send OTP. Try again.");
    }
  };

  const dispatch = useDispatch();

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter 6-digit OTP");
      return;
    }

    try {
      const { data } = await validateOTP(mobile, otp);
      if (!data.status) {
        Alert.alert(data.message);
        return;
      }
      const { token, user_id, user_name } = data.data;
      dispatch(
        setUser({
          user_id,
          user_name,
          mobile,
        })
      );
      await AsyncStorage.setItem("token", token);
      router.dismissAll();
      router.replace("/phone-verified");
    } catch {
      Alert.alert("Invalid OTP", "Please try again");
    }
  };

  return { resendOtp, verifyOtp, sendOtp, code, setCode };
};
