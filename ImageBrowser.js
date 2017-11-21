import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  FlatList,
  Dimensions,
  Button
} from 'react-native';
import ImageTile from './ImageTile';
const { width } = Dimensions.get('window')

export default class ImageBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selected: {},
      after: null,
      has_next_page: true
    }
  }

  setIndex = (index) => {
    let { selected } = this.state;
    let newSelected = {...selected};
    if (selected[index]) {
      delete newSelected[index];
    } else {
      newSelected = {...selected, [index]: true}
    }
    if (!newSelected) newSelected = {}
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

  getItemLayout = (data,index) => {
    let length = width/4;
    return { length, offset: length * index, index }
  }

  renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text>{Object.keys(this.state.selected).length} Selected</Text>
        <Button
          title="Choose"
          onPress={() => this.props.callback()}
        />
      </View>
    )
  }
  renderImageTile = ({item, index}) => {
    let selected = this.state.selected[index] ? true : false
    return(
      <ImageTile
        item={item}
        index={index}
        selected={selected}
        setIndex={this.setIndex}
      />
    )
  }
  renderImages() {
    return(
      <FlatList
        data={this.state.photos}
        numColumns={4}
        renderItem={this.renderImageTile}
        keyExtractor={(_,index) => index}
        onEndReached={()=> {this.getPhotos()}}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text>Loading...</Text>}
        initialNumToRender={24}
        getItemLayout={this.getItemLayout}
      />
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
  },
  header: {
    height: 40,
    width: width,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20
  },
})
