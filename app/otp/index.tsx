import { BackButton } from "@/components/BackButton";
import { useLogin } from "@/hooks/useLogin";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import OTPInput from "../../components/OTPInput";

export default function OTPScreen() {
  const { mobile } = useLocalSearchParams<{ mobile: string }>();
  const { resendOtp, verifyOtp, code, setCode } = useLogin(mobile);

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

      <TouchableOpacity onPress={verifyOtp}>
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
