import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';

export default function App() {
  console.log(Dimensions.get('screen'));
  const handlePress = () => console.log('clicked');
  const handlePressButtonOne = () =>
    Alert.alert('My title', 'My message', [
      { text: 'yes', onPress: () => console.log('yes') },
      { text: 'no', onPress: () => console.log('no') },
    ]);
  const handlePressButtonTwo = () =>
    Alert.prompt('My title', 'My message', (text) => console.log(text));
  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <Text style={{ backgroundColor: 'orange' }} onPress={handlePress}>
        Open up App.tsx to start working on your app!
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Image source={require('./assets/favicon.png')} />
        <TouchableOpacity>
          <Image source={{ width: 200, height: 300, uri: 'https://picsum.photos/200/300' }} />
        </TouchableOpacity>
      </View>
      <Button title='Click Me' onPress={handlePressButtonOne} />
      <Button title='Click Me' onPress={handlePressButtonTwo} />
    </SafeAreaView>
  );
}

const containerStyle = { backgroundColor: 'grey' };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
