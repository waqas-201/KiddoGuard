import { createMMKV } from "react-native-mmkv";

export const isAppOpenFirstTime = createMMKV({
    id: "isAppOpenFirstTime",
    mode: 'multi-process',
    readOnly: false
})


export const LastScreeUserLeaveAt = createMMKV({
    id: "LastScreeUserLeaveAt",
    mode: 'multi-process',
    readOnly: false
})

