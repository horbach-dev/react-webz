import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View
} from 'react-native';
import { Swiper } from "./packages/Swiper";

const sliderItems = [{
  title: 'Title First',
  color: '#4d0a91',
}, {
  title: 'Hello Second',
  color: '#1658da',
}, {
  title: 'Hello Third',
  color: '#184350',
}]

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle='dark-content' />
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Swiper items={sliderItems} />
      </View>
    </SafeAreaView>
  );
};
export default App
