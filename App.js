import { StatusBar } from "expo-status-bar";
import React from "react";
import { Camera } from "expo-camera";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";

let camera;

const CameraPreview = ({ photo, savePhoto, retakePicture }) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          paddingHorizontal: 16,
          paddingVertical: 24,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={retakePicture}
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            minWidth: 120,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Retake
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={savePhoto}
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 12,
            minWidth: 120,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Save Photo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [flashMode, setFlashMode] = React.useState("off");
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );

  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      // do something
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const __takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };
  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View style={{ width: "100%", flex: 1 }}>
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={() => {}}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                camera = r;
              }}
            >
              <TouchableOpacity
                onPress={__switchCamera}
                style={{
                  marginTop: 20,
                  borderRadius: "50%",
                  height: 25,
                  width: 25,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  {cameraType === "front" ? "?" : "?"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={__handleFlashMode}
                style={{
                  position: "absolute",
                  left: "5%",
                  top: "10%",
                  backgroundColor: flashMode === "off" ? "#000" : "#fff",
                  borderRadius: "50%",
                  height: 25,
                  width: 25,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  ⚡️
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: "#14274e",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
