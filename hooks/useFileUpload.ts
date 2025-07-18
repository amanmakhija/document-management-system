import { uploadDocument } from "@/services/api";
import { RootState } from "@/store";
import { formatDateToDDMMYYYY } from "@/utils/date";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";

export const useFileUpload = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    uri: string;
    type: string;
  } | null>(null);
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

  useEffect(() => {
    setMinorHead("");
  }, [majorHead]);

  const submitFile = async () => {
    if (!selectedFile) {
      Alert.alert("Error", "Please select a file to upload.");
      return;
    }

    if (!majorHead.trim()) {
      Alert.alert("Validation Error", "Please select a major head.");
      return;
    }

    if (!minorHead.trim()) {
      Alert.alert("Validation Error", "Please select a minor head.");
      return;
    }

    if (tags.length === 0) {
      Alert.alert("Validation Error", "Please add at least one tag.");
      return;
    }

    if (!user.user_id) {
      Alert.alert("Not logged in");
      router.dismissAll();
      router.replace("/login");
      return;
    }

    try {
      const { data } = await uploadDocument(
        selectedFile.uri,
        selectedFile.name ?? "uploaded_file",
        selectedFile.type,
        {
          major_head: majorHead,
          minor_head: minorHead,
          document_date: formatDateToDDMMYYYY(date),
          document_remarks: remarks,
          tags: tags.map((t) => ({ tag_name: t })),
          user_id: user.user_id,
        }
      );

      if (data.status) {
        Alert.alert("Success", "File uploaded successfully.");
        router.dismissAll();
        router.replace("/");
      } else Alert.alert(data.message);
    } catch (error) {
      console.error(error);
      Alert.alert("Upload Failed", "Something went wrong.");
    }
  };

  const addFile = (file: DocumentPicker.DocumentPickerAsset) => {
    if (!allowedTypes.includes(file.mimeType || "")) {
      Alert.alert(
        "Unsupported Format",
        "Only PDF and image files are allowed."
      );
      return;
    }

    setSelectedFile({
      name: file.name,
      uri: file.uri,
      type: file.mimeType || "unknown",
    });
  };

  const handlePickFile = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: allowedTypes,
      copyToCacheDirectory: true,
    });

    if (!res.canceled && res.assets[0]) {
      addFile(res.assets[0]);
    }
  };

  const handleTakePhoto = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take a photo."
      );
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!res.canceled && res.assets[0]) {
      const photo = res.assets[0];
      addFile({
        name: `photo_${Date.now()}.jpg`,
        uri: photo.uri,
        mimeType: "image/jpeg",
      } as DocumentPicker.DocumentPickerAsset);
    }
  };

  const handlePickFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert("Permission Denied", "Gallery access is required.");
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!res.canceled && res.assets[0]) {
      const image = res.assets[0];
      addFile({
        name: `gallery_${Date.now()}.jpg`,
        uri: image.uri,
        mimeType: "image/jpeg",
      } as DocumentPicker.DocumentPickerAsset);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setMajorHead("");
    setMinorHead("");
    setTags([]);
    setRemarks("");
    setDate(new Date());
  };

  return {
    submitFile,
    handlePickFile,
    handlePickFromGallery,
    handleTakePhoto,
    removeFile,
    selectedFile,
    setSelectedFile,
    majorHead,
    setMajorHead,
    minorHead,
    setMinorHead,
    tags,
    setTags,
    date,
    setDate,
    remarks,
    setRemarks,
  };
};
