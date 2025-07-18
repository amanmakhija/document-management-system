import { ViewStyle } from "react-native";

export interface BackButtonProps {
  style?: ViewStyle;
}

export interface CountryCodeDropdownProps {
  onSelect: (code: string) => void;
  selectedCode: string;
}

export interface Country {
  code: string;
  dial_code: string;
  name: string;
}

export interface DropdownProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export interface OTPInputProps {
  code: string[];
  setCode: (val: string[]) => void;
}

export interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export interface UploadBoxProps {
  selectedFile: {
    name: string;
    uri: string;
    type: string;
  } | null;
  handlePickFile: () => Promise<void>;
  handlePickFromGallery: () => Promise<void>;
  handleTakePhoto: () => Promise<void>;
  removeFile: () => void;
}

export interface Metadata {
  major_head: string;
  minor_head: string;
  document_date: string;
  document_remarks: string;
  user_id: string;
  tags: { tag_name: string }[];
}
