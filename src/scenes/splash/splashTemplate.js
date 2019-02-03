import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ToastAndroid, Button, Image } from 'react-native';
import logo from '../../images/logoMaps.png';
import splashStyles from './splashStyles';
import TimerCountdown from 'react-native-timer-countdown';
import BombExplosion from '../../assets/svg/BombExplosion.js';
import BombSafe from '../../assets/svg/BombSafe';

/* <TimerCountdown
  initialSecondsRemaining={1000 * 60}
  onTick={secondsRemaining => console.log('tick', secondsRemaining)}
  onTimeElapsed={() => console.log('complete')}
  allowFontScaling
  style={{ fontSize: 20 }}
/> */

// firebase, admob, button comenzar otra vez,

const {width, height} = Dimensions.get('window');

export default (controller) => (
  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
    {!controller.state.buttonGameOver ?
      <TouchableOpacity
        onPress={() => { controller.gameOver(); }}
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
            controller.chargeAd();
          }}
          style={{
            zIndex: 1000,
            position: 'absolute',
            top: (Math.floor((Math.random() * (height / 2 - 0)) + 0)),
            left: (Math.floor((Math.random() * (width / 3 - 0)) + 0))
          }}>
          <Image
            style={{width: 75, height: 75}}
            source={require('../../assets/images/trump.png')} />
          {/* <BombExplosion width={75} height={75} /> */}
        </TouchableOpacity>
        {controller.generateFaces().map((face, index) =>
          <TouchableOpacity
            onPress={() => { controller.gameOver(); }}
            style={{
              position: 'relative',
              top: !controller.user.getTopStyle() ? controller.state.top : controller.user.getTopStyle()[face],
              left: !controller.user.getLeftStyle() ? controller.state.left : controller.user.getLeftStyle()[face]
            }}>
            <Image
              style={{width: 50, height: 62}}
              source={require('../../assets/images/putin.png')} />

            {/* <BombSafe width={75} height={75} /> */}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      :
      null
    }
    {controller.state.buttonGameOver ?
      <TouchableOpacity
        style={{
          width: 200,
          height: 200,
          borderRadius: 100 / 2,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'black',
          marginTop: '20%',
          borderWidth: 5}}
        onPress={() => { controller.onStartAgain(); }}>
        <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>Try Again!</Text>
      </TouchableOpacity>
    :
    null
    }
    {!controller.state.buttonGameOver ?
      <TouchableOpacity style={{width: width / 2, backgroundColor: 'skyblue'}}>
        {controller.generateFaces().map((face, index) =>
          <TouchableOpacity
            onPress={() => { controller.gameOver(); }}
            style={{
              position: 'relative',
              top: !controller.user.getTopStyle() ? controller.state.top : controller.user.getTopStyle()[face],
              left: !controller.user.getLeftStyle() ? controller.state.left : controller.user.getLeftStyle()[face]
            }}>
            <Image
              style={{width: 50, height: 62}}
              source={require('../../assets/images/putin.png')} />

            {/* <BombSafe width={75} height={75} /> */}
          </TouchableOpacity>
          )}
      </TouchableOpacity>
      :
      null
    }
  </View>
);
