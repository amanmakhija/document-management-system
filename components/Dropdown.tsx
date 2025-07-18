import { DropdownProps } from "@/types/utility";
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

export default function Dropdown({
  label,
  options,
  selected,
  onSelect,
}: DropdownProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.text}>
          {selected === "" ? "Select " + label : selected}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 5, marginVertical: 10 },
  label: {
    color: "#fff",
    marginBottom: 6,
    marginTop: 12,
    fontSize: 15,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2e2e2e",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000aa",
  },
  modal: {
    backgroundColor: "#222",
    marginHorizontal: 30,
    borderRadius: 8,
    padding: 10,
  },
  option: {
    padding: 12,
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});
