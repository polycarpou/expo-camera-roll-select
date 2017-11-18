import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default class Start extends React.Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Button
          title="Choose Images"
          onPress={() => {navigate('ImageBrowser')}}
        />
        <Text>This is an example of how to build</Text>
        <Text> a multi image selector using expo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
