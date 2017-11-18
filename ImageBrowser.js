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
      index: null,
      selected: []
    }
  }

  setIndex = (index) => {
    let { selected } = this.state;
    if (selected.includes(index)) {
      selected = selected.filter(item => item !== index )
    } else {
      selected.push(index)
    }
    this.setState({ selected })
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

  renderHeader() {
    const { goBack } = this.props.navigation
    return (
      <View>
        <Text>This is the Image Browser</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Button
          title="Choose"
          onPress={() => goBack()}
        />
      </View>
    )
  }
  renderImages() {
    return(
      <ScrollView contentContainerStyle={styles.scrollView}>
        {
          this.state.photos.map((p, i) => {
            return ( this.renderImage(p,i) )
          })
        }
      </ScrollView>
    )
  }

  renderImage(p, i) {
    return (
      <TouchableHighlight
        style={{opacity: this.state.selected.includes(i) ? 0.5 : 1}}
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
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderImages()}
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
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
})
