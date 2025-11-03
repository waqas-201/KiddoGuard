import { createMMKV } from "react-native-mmkv";

export const ParentProfileStore = createMMKV({
    id: "ParentProfile",
    mode: "multi-process",
    readOnly: false,
});

