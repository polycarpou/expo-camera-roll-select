import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
const { width } = Dimensions.get('window')

class ImageTile extends React.PureComponent {
  render() {
    let { item, index, selected, setIndex } = this.props;
    if (!item.node) return;
    return (
      <TouchableHighlight
        style={{opacity: selected ? 0.5 : 1}}
        underlayColor='transparent'
        onPress={() => setIndex(index)}
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
