import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView,Image} from 'react-native';
import ImageBrowser from './ImageBrowser';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: []
    }
  }
  imageBrowserCallback = (callback) => {
    console.log(callback)
    this.setState({
      imageBrowserOpen: false,
      photos: callback
    })
  }

  renderImage(item, i) {
    return(
      <Image
        style={{height: 100, width: 100}}
        source={{uri: item.node.image.uri}}
        key={i}
      />
    )
  }
  render() {
    if (this.state.imageBrowserOpen) {
      return(<ImageBrowser callback={this.imageBrowserCallback}/>);
    }
    return (
      <View style={styles.container}>
        <Button
          title="Choose Images"
          onPress={() => this.setState({imageBrowserOpen: true})}
        />
        <Text>This is an example of a</Text>
        <Text>multi image selector using expo</Text>
        <ScrollView>
          {this.state.photos.map((item,i) => this.renderImage(item,i))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
