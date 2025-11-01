// import ExpoFaceEmbedderModule from "@/modules/expo-face-embedder/src/ExpoFaceEmbedderModule";
// import * as FileSystem from "expo-file-system";
// import React, { useEffect } from "react";
// import { Text, View } from "react-native";


// export default function TestFace() {
//     useEffect(() => {
//         (async () => {
//             try {
//                 // load the model (relative asset name)
//                 await ExpoFaceEmbedderModule.loadModel("face_embedder.task");
//                 console.log("Model loaded");

//                 // Quick test: copy a sample image into app file system OR use a real capture path
//                 // If you have a test image in project assets, copy it to a file path; example below assumes you have an image file at FileSystem.cacheDirectory + "test.jpg"
//                 // Replace with an actual image path on device/emulator (e.g., result from ImagePicker or camera)
//                 const testPath = FileSystem.Directory + "test_face.jpg";
//                 // ensure testPath exists or place an image there beforehand
//                 // then:
//                 // const embedding = await FaceEmbedder.getEmbeddingFromFile(testPath);
//                 // console.log("Embedding length:", embedding.length);
//             } catch (e) {
//                 console.error("FaceEmbedder error", e);
//             }
//         })();
//     }, []);

//     return (
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//             <Text>FaceEmbedder test — check logs</Text>
//         </View>
//     );
// }
