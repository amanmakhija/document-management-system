import { RootState } from "@/store";
import { clearUser } from "@/store/slices/userSlice";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    dispatch(clearUser());
    await AsyncStorage.removeItem("token");
    router.dismissAll();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="account-circle" size={100} color="#f7901e" />
      <Text style={styles.name}>{user.user_name}</Text>
      <Text style={styles.text}>User ID: {user.user_id}</Text>
      <Text style={styles.text}>Mobile Number: {user.mobile}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    color: "#ccc",
    fontSize: 16,
    marginVertical: 4,
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: "#f7901e",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
