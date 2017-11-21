import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  ScrollView,
  FlatList,
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
      selected: []
    }
  }

  setIndex = (index) => {
    let { selected } = this.state;
    let newSelected;
    if (selected.includes(index)) {
      newSelected = selected.filter(item => item !== index )
    } else {
      newSelected = [...selected, index]
    }
    this.setState({ selected: newSelected })
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 50,
      assetType: 'All'
    })
    .then(this.processPhotos)
  }
  processPhotos = (r) => {
    this.setState({ photos: r.edges })
  }

  componentDidMount() {
    this.getPhotos()
  }

  renderHeader() {
    const { goBack } = this.props.navigation
    return (
      <View>
        <Text>{this.state.selected}</Text>
        <Text>{this.state.selected.length} Selected</Text>
        <Button
          title="Choose"
          onPress={() => goBack()}
        />
      </View>
    )
  }
  renderImages() {
    let { photos, selected } =  this.state;
    return(
      <FlatList
        data={photos}
        numColumns={4}
        extraData={selected}
        renderItem={(input) => this.renderImage(input)}
        keyExtractor={(_,index) => index}
      >
      </FlatList>
    )
  }

  renderImage(input) {
    let { item, index } = input;
    return (
      <TouchableHighlight
        style={{opacity: this.state.selected.includes(index) ? 0.5 : 1}}
        underlayColor='transparent'
        onPress={() => this.setIndex(index)}
      >
        <Image
          style={{width: width/4, height: width/4}}
          source={{uri: item.node.image.uri}}
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
