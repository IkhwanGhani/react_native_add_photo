import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeModules,
  FlatList,
  Dimensions,
  Modal,
  PermissionsAndroid,
  Alert
} from "react-native";
//Library
import FullWidthImage from "react-native-fullwidth-image";
import ImageScalable from "react-native-scalable-image";
import PhotoGrid from "react-native-thumbnail-grid";
import CameraRollPicker from "react-native-camera-roll-picker";
import CustomModal from "react-native-modal";
import ImagePicker from "react-native-image-crop-picker";

//Icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

//const
//import * from "./constant";

//style
//import DEFAULT_COLOR from "./color";
import mainStyle from "./styles/styles";
import photoStyle from "./styles/photoStyles";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //****** defectImages *******/
      //add/edit/upload
      selectedCamRoll: [],
      visiblePickerSelection: false,
      imagesCam: [],
      visibleCameraRoll: false,
      visibleShowEditImages: false,
      visibleFullEditImage: false,
      fullEditImages: [],
      imageUpload: []
    };
    this.requestCameraPermission();
    this.getSelectedImages = this.getSelectedImages.bind(this);
  }

  render() {
    return (
      <View style={mainStyle.container}>
        <TouchableOpacity onPress={() => this.togglePickerSelection(true)}>
          <View style={photoStyle.addPhotoBtn}>
            <Ionicons name="md-images" size={24} style={{ marginRight: 10 }} />
            <Text style={mainStyle.text}>Add Image</Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <PhotoGrid
            style={{ width: 300, height: 300, resizeMode: "contain" }}
            source={this.state.imageUpload}
            onPressImage={() => this.toggleShowEditImages(true)}
          />
        </View>

        {this.pickerSelectionModal()}
        {this.cameraRollModal()}
        {this.showEditImagesModal()}
        {this.fullEditImageModal()}
      </View>
    );
  }

  //Modal
  pickerSelectionModal() {
    return (
      <CustomModal
        isVisible={this.state.visiblePickerSelection}
        onBackdropPress={() => {
          this.togglePickerSelection(false);
        }}
        onRequestClose={() => {
          this.togglePickerSelection(false);
        }}
        style={styles.bottomModal}
      >
        <View style={styles.pickerSelectionContainer}>
          <Text style={{ fontSize: 12, color: "#999", marginVertical: 10 }}>
            Select Photo
          </Text>
          <TouchableOpacity
            onPress={() => this.pickSingleWithCamera(false)}
            style={styles.pickerSelectionBtn}
          >
            <Text style={{ fontSize: 15, color: "#2962FF" }}>
              Take Photo...
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.toggleCameraRoll(true)}
            style={styles.pickerSelectionBtn}
          >
            <Text style={{ fontSize: 15, color: "#2962FF" }}>
              Choose from Gallery...
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.togglePickerSelection(false)}>
          <View style={styles.btnClose}>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#2962FF" }}
            >
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </CustomModal>
    );
  }
  cameraRollModal() {
    return (
      <Modal
        visible={this.state.visibleCameraRoll}
        onRequestClose={() => {
          this.toggleCameraRoll(false);
        }}
        style={{ margin: 0 }}
      >
        <View style={styles.cameraRollContainer}>
          <View
            style={{
              backgroundColor: "#0f2b59",
              padding: 20,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity onPress={() => this.toggleCameraRoll(false)}>
                <Ionicons
                  name="md-arrow-back"
                  size={24}
                  style={{ color: "#fff" }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                GALLERY
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity onPress={() => this.doneSelectedImages()}>
                <Text style={{ color: "#fff", textAlign: "right" }}>DONE</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#eee",
              padding: 20,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#555",
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {this.state.selectedCamRoll.length}{" "}
                </Text>{" "}
                images has been selected from gallery
              </Text>
            </View>
          </View>
          <CameraRollPicker
            groupTypes="SavedPhotos"
            maximum={20}
            selected={this.state.selectedCamRoll}
            assetType="Photos"
            imagesPerRow={3}
            imageMargin={5}
            callback={this.getSelectedImages}
          />
        </View>
      </Modal>
    );
  }
  showEditImagesModal() {
    return (
      <Modal
        visible={this.state.visibleShowEditImages}
        onRequestClose={() => {
          this.toggleShowEditImages(false);
        }}
        style={{ margin: 0 }}
      >
        <View style={styles.showEditImagesContainer}>
          <View
            style={{
              backgroundColor: "#0f2b59",
              padding: 20,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => this.toggleShowEditImages(false)}
              >
                <Ionicons
                  name="md-arrow-back"
                  size={24}
                  style={{ color: "#fff" }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                EDIT
              </Text>
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => this.toggleShowEditImages(false)}
              >
                <Text style={{ color: "#fff", textAlign: "right" }} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#eee",
              padding: 20,
              flexDirection: "row"
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#555",
                  fontSize: 15,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                <Text style={{ fontWeight: "bold" }}>
                  {" "}
                  {this.state.imageUpload.length}{" "}
                </Text>{" "}
                images has been upload
              </Text>
            </View>
          </View>
          <ScrollView>
            <FlatList
              data={this.state.imageUpload}
              keyExtractor={(item, index) => index.toString()}
              renderItem={data => (
                <View style={{ marginBottom: 10 }}>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => this.deleteSelectedImages(data.item.uri)}
                  >
                    <Ionicons
                      name="md-close"
                      size={30}
                      style={{ color: "#fff" }}
                    />
                  </TouchableOpacity>
                  <View style={{ marginBottom: 10, alignItems: "center" }}>
                    <ImageScalable
                      width={Dimensions.get("window").width}
                      source={data.item}
                      onPress={() => this.toggleFullEditImage(data.item)}
                    />
                  </View>
                </View>
              )}
            />
            <TouchableOpacity onPress={() => this.togglePickerSelection(true)}>
              <View style={photoStyle.addPhotoBtn}>
                <Ionicons
                  name="md-images"
                  size={24}
                  style={{ marginRight: 10 }}
                />
                <Text>Add Photo</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    );
  }
  fullEditImageModal() {
    // console.log(`\n[task list] item: ${JSON.stringify(this.state.fullEditImages, null, "    ")}`);
    return (
      <Modal
        visible={this.state.visibleFullEditImage}
        onRequestClose={() => {
          this.toggleFullEditImage();
        }}
        style={{ margin: 0 }}
      >
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => this.toggleFullEditImage()}
        >
          <Ionicons name="md-arrow-back" size={30} style={{ color: "#fff" }} />
        </TouchableOpacity>
        <View style={styles.fullEditImageContainer}>
          <FullWidthImage source={this.state.fullEditImages} />
        </View>
      </Modal>
    );
  }

  // Add Defact Images Function
  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Write External Storage permission accepted");
        console.log("Read External Storage permission accepted");
      } else {
        console.log("Write External Storage permission denied");
        console.log("Read External Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  togglePickerSelection(visible) {
    this.setState({
      visiblePickerSelection: visible
    });
  }
  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true
    })
      .then(imagesCam => {
        console.log("received images from camera:", imagesCam);
        this.setState({
          imagesCam: {
            uri: imagesCam.path,
            width: imagesCam.width,
            height: imagesCam.height
          }
        });
        this.setState({
          imageUpload: this.state.imageUpload.concat(this.state.imagesCam)
        });
      })
      .catch(e => alert(e));

    this.togglePickerSelection(false);
  }
  toggleCameraRoll(visible) {
    this.setState({
      visibleCameraRoll: visible
    });
    this.togglePickerSelection(false);
  }
  getSelectedImages(imagesCamRoll, current) {
    this.setState({
      selectedCamRoll: imagesCamRoll
    });
  }
  doneSelectedImages() {
    // console.log("defect report screen: done get selected images - " + JSON.stringify(this.state.selectedCamRoll, null, "    "));
    this.setState({
      imageUpload: this.state.imageUpload.concat(this.state.selectedCamRoll)
    });
    this.toggleCameraRoll(false);
    this.setState({
      selectedCamRoll: []
    });
  }
  deleteSelectedImages = uri => {
    this.setState(prevState => {
      return {
        imageUpload: prevState.imageUpload.filter(a => {
          return a.uri !== uri;
        })
      };
    });
  };
  toggleShowEditImages(visible) {
    this.setState({
      visibleShowEditImages: visible
    });
  }
  toggleFullEditImage(uri) {
    this.setState({
      visibleFullEditImage: !this.state.visibleFullEditImage,
      fullEditImages: uri
    });
  }
}
export default App;

const styles = StyleSheet.create({
  pickerSelectionContainer: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginHorizontal: 10
  },
  cameraRollContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  showEditImagesContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  fullEditImageContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center"
  },
  pickerSelectionBtn: {
    paddingVertical: 15,
    borderColor: "#eee",
    borderTopWidth: 1,
    width: "100%",
    alignItems: "center"
  },
  btnClose: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
    borderColor: "rgba(0, 0, 0, 0.1)",
    margin: 10
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  }
});
