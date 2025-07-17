import { BackButton } from "@/components/BackButton";
import Dropdown from "@/components/Dropdown";
import TagInput from "@/components/TagInput";
import UploadBox from "@/components/UploadBox";
import { useFileUpload } from "@/hooks/useFileUpload";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function UploadScreen() {
  const router = useRouter();
  const {
    submitFile,
    handlePickFile,
    handlePickFromGallery,
    handleTakePhoto,
    removeFile,
    selectedFile,
    date,
    majorHead,
    minorHead,
    remarks,
    tags,
    setTags,
    setDate,
    setMajorHead,
    setMinorHead,
    setRemarks,
    setSelectedFile,
  } = useFileUpload();

  const [userId] = useState("test_aman");

  return (
    <View style={styles.container}>
      <View>
        <BackButton />
        <Text style={styles.title}>Upload Document</Text>
      </View>
      <KeyboardAwareScrollView>
        <UploadBox
          handlePickFile={handlePickFile}
          handlePickFromGallery={handlePickFromGallery}
          handleTakePhoto={handleTakePhoto}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          removeFile={removeFile}
        />
        {selectedFile && (
          <>
            <View style={styles.dropdownContainer}>
              <Text style={styles.text}>Date</Text>
              <DateTimePicker
                value={date}
                mode="date"
                onChange={(_, d) => d && setDate(d)}
              />
            </View>
            <Dropdown
              label="Major Head"
              options={["Personal", "Professional"]}
              selected={majorHead}
              onSelect={setMajorHead}
            />
            {majorHead !== "" && (
              <Dropdown
                label="Minor Head"
                options={
                  majorHead === "Personal"
                    ? ["John", "Tom", "Emily"]
                    : ["Accounts", "HR", "IT", "Finance"]
                }
                selected={minorHead}
                onSelect={setMinorHead}
              />
            )}

            <TagInput tags={tags} setTags={setTags} />

            <TextInput
              style={styles.input}
              placeholder="Remarks"
              value={remarks}
              onChangeText={setRemarks}
              placeholderTextColor="#aaa"
            />
          </>
        )}
      </KeyboardAwareScrollView>
      {selectedFile && (
        <TouchableOpacity style={styles.uploadBtn} onPress={submitFile}>
          <Text style={styles.uploadBtnText}>Upload Document</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 20,
  },
  text: { color: "#fff", marginBottom: 4, fontSize: 15 },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: "#fff",
  },
  uploadBtn: {
    backgroundColor: "#f7901e",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
