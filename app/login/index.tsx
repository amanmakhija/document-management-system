import CountryCodeDropdown from "@/components/CountryCodeDropdown";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generateOTP } from "../../services/api";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("+91");

  const handleSendOTP = async () => {
    if (phone.length !== 10) {
      Alert.alert("Invalid", "Enter a valid 10-digit mobile number");
      return;
    }
    try {
      await generateOTP(phone);
      router.push({ pathname: "/otp", params: { mobile: phone } });
    } catch {
      Alert.alert("Error", "Could not send OTP. Try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/login-banner.png")}
          style={styles.image}
          contentFit="contain"
        />
      </View>

      <View>
        <Text style={styles.heading}>Login to Your Account</Text>
        <View style={styles.phoneInputContainer}>
          <CountryCodeDropdown
            selectedCode={countryCode}
            onSelect={setCountryCode}
          />
          <TextInput
            style={styles.phoneInput}
            placeholder="9876543210"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
            placeholderTextColor="#aaa"
            returnKeyType="done"
          />
        </View>
        <TouchableOpacity style={styles.otpBtn} onPress={handleSendOTP}>
          <Text style={styles.otpBtnText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2E2F",
    paddingHorizontal: 20,
    justifyContent: "center",
    gap: 50,
  },
  imageContainer: {
    marginTop: -120,
  },
  image: {
    width: "100%",
    height: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 10,
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleSelected: {
    backgroundColor: "#fff",
  },
  toggleText: {
    color: "#fff",
  },
  phoneInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  countryCode: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countryText: {
    color: "#fff",
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 20,
  },
  otpBtn: {
    backgroundColor: "#f7901e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  otpBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    color: "#aaa",
    textAlign: "center",
  },
});
