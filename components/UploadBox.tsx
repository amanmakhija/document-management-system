import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UploadBoxProps {
  selectedFile: {
    name: string;
    uri: string;
    type: string;
  } | null;
  setSelectedFile: React.Dispatch<
    React.SetStateAction<{
      name: string;
      uri: string;
      type: string;
    } | null>
  >;
  handlePickFile: () => Promise<void>;
  handlePickFromGallery: () => Promise<void>;
  handleTakePhoto: () => Promise<void>;
  removeFile: () => void;
}

export default function UploadBox({
  selectedFile,
  setSelectedFile,
  handlePickFile,
  handlePickFromGallery,
  handleTakePhoto,
  removeFile,
}: UploadBoxProps) {
  const getIcon = (type: string) => {
    if (type.includes("pdf"))
      return <MaterialIcons name="picture-as-pdf" size={24} color="#e74c3c" />;
    if (type.includes("image"))
      return <MaterialIcons name="image" size={24} color="#3498db" />;
    return <MaterialIcons name="insert-drive-file" size={24} color="#aaa" />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Media Upload</Text>
      <Text style={styles.subtext}>
        You can upload the following file types only. (.pdf, .jpg, .png)
      </Text>

      {!selectedFile ? (
        <View style={styles.uploadBox}>
          <FontAwesome5 name="folder-open" size={40} color="#4c8ef7" />
          <Text style={styles.instruction}>Drag or Select your file</Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.browse} onPress={handlePickFile}>
              <Text style={styles.browseText}>Browse Files</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.capture} onPress={handleTakePhoto}>
              <Text style={styles.browseText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.gallery}
              onPress={handlePickFromGallery}
            >
              <Text style={styles.browseText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.fileView}>
          <Text style={styles.heading}>Uploaded File</Text>
          <View style={styles.fileIconLarge}>
            {getIcon(selectedFile.type)}
            <Text style={styles.uploadedFileName}>{selectedFile.name}</Text>
            <TouchableOpacity onPress={removeFile}>
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
  },
  gallery: {
    backgroundColor: "#8e44ad",
    padding: 10,
    borderRadius: 6,
  },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtext: {
    color: "#bbb",
    marginBottom: 10,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#4c8ef7",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  instruction: {
    color: "#aaa",
    marginVertical: 10,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  browse: {
    backgroundColor: "#4c8ef7",
    padding: 10,
    borderRadius: 6,
  },
  capture: {
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 6,
  },
  browseText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fileView: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2e2e2e",
    borderRadius: 10,
    marginTop: 20,
  },
  fileIconLarge: {
    alignItems: "center",
    marginTop: 10,
  },
  uploadedFileName: {
    color: "#fff",
    marginTop: 6,
  },
  dropdown: {
    backgroundColor: "#2e2e2e",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  label: {
    color: "#bbb",
    marginTop: 10,
    marginBottom: 4,
  },
  remarksBox: {
    backgroundColor: "#2e2e2e",
    padding: 10,
    borderRadius: 6,
  },
  remove: {
    color: "red",
    marginVertical: 10,
    fontSize: 15,
  },
});
