# React Native Add Photo

## Installation
1. ``` npm install ```
2. ``` react-native link ```

## react-native-camera manual installation if react-native-camera error build
1. Insert the following lines in android/app/build.gradle :
- inside defaultConfig block insert either:
``` 
android {
  ...
  defaultConfig {
    ...
    missingDimensionStrategy 'react-native-camera', 'general' <-- insert this line
  }
}
```
2. Declare the permissions in your Android Manifest (required for video recording feature)
``` 
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```
3. Add jitpack to android/build.gradle
``` 
allprojects {
    repositories {
        maven { url "https://jitpack.io" }
        maven { url "https://maven.google.com" }
    }
}
```

## Reference
- https://facebook.github.io/react-native/
- https://github.com/react-native-community/react-native-camera
- https://github.com/jeanpan/react-native-camera-roll-picker
- https://github.com/wassgha/react-native-fullwidth-image
- https://github.com/ivpusic/react-native-image-crop-picker
- https://github.com/ihor/react-native-scalable-image
- https://github.com/duyluonglc/react-native-thumbnail-grid
- https://github.com/react-native-community/react-native-modal
- https://github.com/oblador/react-native-vector-icons
