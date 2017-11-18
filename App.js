import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Start from './Start';
import ImageBrowser from './ImageBrowser';


const Navigation = StackNavigator({
  Start: {
    screen: Start,
    navigationOptions: {
      headerBackTitle: 'Back',
    }
  },
  ImageBrowser: { screen: ImageBrowser }
});
export default Navigation;
