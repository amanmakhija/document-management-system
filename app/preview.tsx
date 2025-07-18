import { formatDateToDDMMYYYY } from "@/utils/date";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

export default function PreviewScreen() {
  const {
    file_url,
    major_head,
    minor_head,
    uploaded_by,
    document_date,
    document_remarks,
  } = useLocalSearchParams<{
    file_url: string;
    major_head: string;
    minor_head: string;
    uploaded_by: string;
    document_date: string;
    document_remarks: string;
  }>();

  const fileType = file_url?.endsWith(".pdf")
    ? "pdf"
    : file_url?.match(/\.(jpg|jpeg|png)$/)
    ? "image"
    : "unsupported";

  const handleDownload = async () => {
    try {
      const fileName = file_url.split("/").pop();

      if (!FileSystem.documentDirectory) {
        throw new Error("Document directory is not available.");
      }

      const dest = FileSystem.documentDirectory + fileName;

      const download = await FileSystem.downloadAsync(file_url, dest);
      Alert.alert("Download Complete", `Saved to:\n${download.uri}`);
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Please try again.";
      Alert.alert("Download Failed", errMsg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {major_head} - {minor_head}
      </Text>
      <Text style={styles.meta}>Uploaded by: {uploaded_by}</Text>
      <Text style={styles.meta}>
        Date: {formatDateToDDMMYYYY(new Date(document_date))}
      </Text>
      <Text style={styles.meta}>Remarks: {document_remarks}</Text>

      <View style={styles.previewBox}>
        {fileType === "pdf" ? (
          <WebView
            source={{ uri: file_url }}
            style={styles.webview}
            originWhitelist={["*"]}
          />
        ) : fileType === "image" ? (
          <Image
            source={{ uri: file_url }}
            style={styles.image}
            contentFit="contain"
          />
        ) : (
          <Text style={styles.unsupported}>Preview not available</Text>
        )}
      </View>

      <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
        <MaterialIcons name="file-download" size={24} color="#fff" />
        <Text style={styles.downloadText}>Download File</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: "#f7901e",
    fontWeight: "bold",
  },
  meta: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 2,
  },
  previewBox: {
    flex: 1,
    marginTop: 20,
  },
  webview: {
    flex: 1,
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 8,
  },
  unsupported: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
  downloadBtn: {
    flexDirection: "row",
    backgroundColor: "#f7901e",
    padding: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
