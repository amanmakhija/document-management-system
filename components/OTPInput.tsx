import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type Props = {
  code: string[];
  setCode: (val: string[]) => void;
};

export default function OTPInput({ code, setCode }: Props) {
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length === 6 && index === 0) {
      const newCode = text.split("").slice(0, 6);
      setCode(newCode);
      inputs.current[5]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, i) => (
        <TextInput
          key={i}
          ref={(ref) => {
            inputs.current[i] = ref;
          }}
          value={digit}
          onChangeText={(text) => handleChange(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          style={styles.box}
          keyboardType="number-pad"
          maxLength={6}
          returnKeyType="done"
          textAlign="center"
          autoComplete="sms-otp"
          textContentType="oneTimeCode"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginVertical: 20,
  },
  box: {
    borderBottomWidth: 2,
    borderColor: "#555",
    width: 45,
    height: 55,
    fontSize: 24,
    color: "#fff",
  },
});
