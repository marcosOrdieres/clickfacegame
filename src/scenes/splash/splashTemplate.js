import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, ToastAndroid, Button, Image } from 'react-native';
import logo from '../../images/logoMaps.png';
import splashStyles from './splashStyles';
import TimerCountdown from 'react-native-timer-countdown';
import BombExplosion from '../../assets/svg/BombExplosion.js';
import BombSafe from '../../assets/svg/BombSafe';

const {width, height} = Dimensions.get('window');

export default (controller) => (
  <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {!controller.state.buttonGameOver ?

    <View style={{flexDirection: 'row', width: width, height: 50, alignItems: 'center', paddingTop:10}}>
      <View style={{justifyContent: 'center',alignItems: 'center', width:width/2}}>
        <Text style={{fontSize:20, fontWeight:'bold'}}>Score: {controller.state.score}</Text>

      </View>
      <View style={{justifyContent: 'center',alignItems: 'center', width:width/2}}>
        <TimerCountdown
          initialSecondsRemaining={5000}
          onTick={secondsRemaining => console.log('tick', secondsRemaining)}
          onTimeElapsed={() => {controller.gameOver();}}
          allowFontScaling
          style={{ fontSize: 20 }}
        />
      </View>
    </View>
    :
    null
  }

    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch'}}>
      {!controller.state.buttonGameOver ?
        <TouchableOpacity
          onPress={() => { controller.gameOver(); }}
          style={{width: width / 2, backgroundColor: 'powderblue', borderWidth:1, borderColor:'black'}}>
          <TouchableOpacity
            onPress={() => {
              let newelement = [controller.state.numberFaces.slice(-1)[0] + 1, controller.state.numberFaces.slice(-1)[0] + 2];
              let joined = controller.state.numberFaces.concat(newelement);
              controller.setState({
                numberFaces: joined
              });
              controller.setState({
                score: controller.state.score + 1
              })
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
        <View>
        <TouchableOpacity
          style={{
            width:width,
            height:height / 3,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'black',
            marginTop: '20%',
            borderWidth: 5}}
          onPress={() => { controller.onStartAgain(); }}>
          <Text style={{color: 'white', textAlign: 'center',fontSize: 20}}>Try Again!</Text>
        </TouchableOpacity>
        <View style={{width:width, height:height / 4, justifyContent: 'center',alignItems: 'center'}}>
          <Text style={{fontSize:20}}>Actual Score: {controller.state.currentScore}</Text>
        </View>
        <View style={{width:width, height:height / 4, justifyContent: 'center',alignItems: 'center'}}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>Best Score: {controller.state.finalScore}</Text>
        </View>
      </View>

      :
      null
      }
      {!controller.state.buttonGameOver ?
        <TouchableOpacity style={{width: width / 2, backgroundColor: 'skyblue', borderWidth:1, borderColor:'black'}}>
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
  </View>
);
