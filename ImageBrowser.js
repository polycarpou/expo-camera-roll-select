import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
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
      selected: [],
      after: null,
      has_next_page: true
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
    let params = { first: 50, assetType: 'All' };
    if (this.state.after) params.after = this.state.after
    if (!this.state.has_next_page) return
    CameraRoll
      .getPhotos(params)
      .then(this.processPhotos)
  }
  processPhotos = (r) => {
    if (this.state.after === r.page_info.end_cursor) return;
    let newState = {
      photos: [...this.state.photos, ...r.edges],
      after: r.page_info.end_cursor,
      has_next_page: r.page_info.has_next_page
    };
    this.setState(newState)
  }

  componentDidMount() {
    this.getPhotos()
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text>{this.state.selected.length} Selected</Text>
        <Button
          title="Choose"
          onPress={() => this.props.navigation.goBack()}
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
        extraData={this.state.selected}
        renderItem={(input) => this.renderImage(input)}
        keyExtractor={(_,index) => index}
        onEndReached={()=> {this.getPhotos()}}
        onEndReachedThreshold={0.5}
      >
      </FlatList>
    )
  }

  renderImage(input) {
    let { item, index } = input;
    if (!item.node) return;
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
  header: {
    height: 40,
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
})
