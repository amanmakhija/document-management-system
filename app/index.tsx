import Dropdown from "@/components/Dropdown";
import TagInput from "@/components/TagInput";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { searchDocuments } from "@/services/api";
import { Document } from "@/types/document";
import { formatDateToDDMMYYYY } from "@/utils/date";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomePage() {
  const router = useRouter();
  const loading = useAuthGuard();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (tags.length || majorHead || fromDate || toDate) {
        setPage(0);
        setHasMore(true);
        fetchDocuments(true);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [majorHead, minorHead, tags, fromDate, toDate]);

  const fetchDocuments = async (isNewSearch = false) => {
    if (isFetching || (!hasMore && !isNewSearch)) return;

    setIsFetching(true);

    const payload = {
      major_head: majorHead,
      minor_head: minorHead,
      from_date: fromDate ? formatDateToDDMMYYYY(fromDate) : "",
      to_date: toDate ? formatDateToDDMMYYYY(toDate) : "",
      tags: tags.map((t) => ({ tag_name: t })),
      uploaded_by: "",
      start: isNewSearch ? 0 : page * 10,
      length: 10,
      filterId: "",
      search: { value: "" },
    };

    try {
      const { data } = await searchDocuments(payload);

      if (data.status) {
        const newDocs: Document[] = data.data;

        setDocuments((prev) => (isNewSearch ? newDocs : [...prev, ...newDocs]));
        setHasMore(newDocs.length === 10);
        setPage((prev) => (isNewSearch ? 1 : prev + 1));
      }
    } catch (e) {
      console.error("Error loading documents:", e);
    } finally {
      setIsFetching(false);
    }
  };

  if (loading) return null;

  const handleUpload = () => {
    router.push("/upload");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Document Management System</Text>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <MaterialIcons name="account-circle" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      <Dropdown
        label="Major Head"
        options={["Personal", "Professional"]}
        selected={majorHead}
        onSelect={(val) => {
          setMajorHead(val);
          setMinorHead("");
        }}
      />

      {majorHead !== "" && (
        <Dropdown
          label="Minor Head"
          options={
            majorHead === "Personal"
              ? ["Travel", "Education"]
              : ["HR", "Finance", "Operations"]
          }
          selected={minorHead}
          onSelect={setMinorHead}
        />
      )}

      <TagInput tags={tags} setTags={setTags} />

      <View style={styles.dateRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>From Date</Text>
          <DateTimePicker
            value={fromDate || new Date()}
            mode="date"
            display="default"
            onChange={(_, d) => d && setFromDate(d)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>To Date</Text>
          <DateTimePicker
            value={toDate || new Date()}
            mode="date"
            display="default"
            onChange={(_, d) => d && setToDate(d)}
          />
        </View>
      </View>

      <FlatList
        data={documents}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/preview",
                params: {
                  file_url: item.file_url,
                  major_head: item.major_head,
                  minor_head: item.minor_head,
                  uploaded_by: item.uploaded_by,
                  document_date: item.document_date,
                  document_remarks: item.document_remarks,
                },
              })
            }
          >
            <View style={styles.card}>
              <Text style={styles.docTitle}>
                {item.major_head} - {item.minor_head}
              </Text>
              <Text style={styles.docMeta}>
                Uploaded by: {item.uploaded_by}
              </Text>
              <Text style={styles.docMeta}>
                Date: {formatDateToDDMMYYYY(new Date(item.document_date))}
              </Text>
              <Text style={styles.docRemarks}>{item.document_remarks}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.document_id.toString()}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.emptyWrapper}>
            <Text style={styles.text}>Your Documents will appear here</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        onEndReached={() => fetchDocuments(false)}
        onEndReachedThreshold={0.5}
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    paddingBottom: 100,
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
  label: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 10,
  },
  card: {
    backgroundColor: "#2d2d2d",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f7901e",
    marginBottom: 6,
  },
  docMeta: {
    color: "#ccc",
    fontSize: 13,
  },
  docRemarks: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 6,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
});
