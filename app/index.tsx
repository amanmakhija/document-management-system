import { useAuthGuard } from "@/hooks/useAuthGuard";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HomeSearchBar from "../components/HomeSearchBar";

export default function HomePage() {
  const router = useRouter();
  const loading = useAuthGuard();
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search.trim() !== "") {
        // search for document
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  if (loading) return null;

  const handleUpload = () => {
    router.push("/upload");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Document Management System</Text>
      </View>

      <HomeSearchBar value={search} onChange={setSearch} />
      <FlatList
        data={documents}
        renderItem={({ item }) => <Text>Document</Text>}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <Text style={styles.text}>Your Documents will appear here</Text>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleUpload}>
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    paddingHorizontal: 30,
  },
  headerContainer: {
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#888",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#f7901e",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
