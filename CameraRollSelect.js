import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Start from './Start';
import ImageBrowser from './ImageBrowser';

//Not being used right now
const Navigation = StackNavigator({
  Start: { screen: Start },
  ImageBrowser: { screen: ImageBrowser }
});
export default Navigation;
