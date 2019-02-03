import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import logo from '../../images/logoMaps.png';
import splashStyles from './splashStyles';
import TimerCountdown from 'react-native-timer-countdown';

/* <TimerCountdown
  initialSecondsRemaining={1000 * 60}
  onTick={secondsRemaining => console.log('tick', secondsRemaining)}
  onTimeElapsed={() => console.log('complete')}
  allowFontScaling
  style={{ fontSize: 20 }}
/> */
const {width, height} = Dimensions.get('window');

export default (controller) => (

  <View style={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  }}>
    <TouchableOpacity
      onPress={() => { console.log('GAME OVER'); }}
      style={{width: width / 2, backgroundColor: 'powderblue'}}>
      <TouchableOpacity
        onPress={() => {
          console.log('CORRECTTTTTT');
          let newelement = [controller.state.numberFaces.slice(-1)[0] + 1, controller.state.numberFaces.slice(-1)[0] + 2];
          let joined = controller.state.numberFaces.concat(newelement);
          controller.setState({
            numberFaces: joined
          });
          const topAndLeft = controller.setTopAndLeft();
          controller.user.setTopStyle(topAndLeft.topArray);
          controller.user.setLeftStyle(topAndLeft.leftArray);
        }}
        style={{
          backgroundColor: 'red',
          width: 50,
          height: 50,
          borderRadius: 50 / 2,
          position: 'absolute',
          top: (Math.floor((Math.random() * (height / 2 - 0)) + 0)),
          left: (Math.floor((Math.random() * (width / 3 - 0)) + 0))
        }} />
      {controller.generateFaces().map((face, index) =>
        <TouchableOpacity
          onPress={() => { console.log('GAME OVER IN THE LEFT'); }}
          style={{
            backgroundColor: 'blue',
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            position: 'relative',
            top: !controller.user.getTopStyle() ? controller.state.top : controller.user.getTopStyle()[face],
            left: !controller.user.getLeftStyle() ? controller.state.left : controller.user.getLeftStyle()[face]
          }} />
      )}
    </TouchableOpacity>
    <TouchableOpacity style={{width: width / 2, backgroundColor: 'skyblue'}}>
      {controller.generateFaces().map((face, index) =>
        <TouchableOpacity
          onPress={() => { console.log('GAME OVER IN THE RIGHT'); }}
          style={{
            backgroundColor: 'blue',
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            position: 'relative',
            top: !controller.user.getTopStyle() ? controller.state.top : controller.user.getTopStyle()[face],
            left: !controller.user.getLeftStyle() ? controller.state.left : controller.user.getLeftStyle()[face]
          }} />
    )}
    </TouchableOpacity>

  </View>
);
