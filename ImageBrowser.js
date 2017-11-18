import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Image,
  Button
} from 'react-native';
const { width } = Dimensions.get('window')

export default class ImageBrowser extends React.Component {
  static navigationOptions = {
    title: 'Camera Roll Images'
  }

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      index: null
    }
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
  }

  componentDidMount() {
    this.getPhotos()
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text>This is the Image Browser</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button
          title="Choose"
          onPress={() => {navigate('Start')}}
        />

        <ScrollView
          contentContainerStyle={styles.scrollView}
        >
          {
            this.state.photos.map((p, i) => {
              return (
                <TouchableHighlight
                  style={{opacity: i === this.state.index ? 0.5 : 1}}
                  key={i}
                  underlayColor='transparent'
                  onPress={() => this.setIndex(i)}
                >
                <Image
                style={{
                  width: width/4,
                  height: width/4
                }}
                source={{uri: p.node.image.uri}}
                />
                </TouchableHighlight>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  shareButton: {
    position: 'absolute',
    width,
    padding: 10,
    bottom: 0,
    left: 0
  }
})
