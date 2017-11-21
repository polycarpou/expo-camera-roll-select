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
class ImageTile extends React.PureComponent {
  render(input) {
    let { item, index } = this.props.input;
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
}
export default ImageTile;
