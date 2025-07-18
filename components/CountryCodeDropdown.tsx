import { COUNTRY_CODES } from "@/constants/country-code";
import { CountryCodeDropdownProps } from "@/types/utility";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CountryCodeDropdown({
  onSelect,
  selectedCode,
}: CountryCodeDropdownProps) {
  const [visible, setVisible] = useState(false);

  const selected = COUNTRY_CODES.find((c) => c.dial_code === selectedCode);

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.dropdown}
      >
        <Text style={styles.text}>{selected?.dial_code ?? "+91"}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modal}>
            <FlatList
              data={COUNTRY_CODES}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelect(item.dial_code);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.itemText}>
                    {item.name} ({item.dial_code})
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#333",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#222",
    maxHeight: "50%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 10,
  },
  item: {
    paddingVertical: 14,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
  },
});
