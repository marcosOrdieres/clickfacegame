import { BaseScene } from 'components';
import template from './splashTemplate';
import { connect } from 'react-redux';
import { Dimensions, ToastAndroid } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { AdMobInterstitial } from 'react-native-admob';
import firebase from 'react-native-firebase';

const {width, height} = Dimensions.get('window');

class SplashController extends BaseScene {
  constructor (args) {
    super(args);
    this.initializeFirebaseApp();
    this.chargeAd();
    this.state = {
      renderAgain: false,
      numberFaces: [0],
      top: (Math.floor((Math.random() * (height / 2 - 0)) + 0)),
      left: (Math.floor((Math.random() * (width / 3 - 0)) + 0)),
      toastVisible: false,
      buttonGameOver: false
    };
  }

  async initializeFirebaseApp () {
    try {
      const firebaseConfig = {
        apiKey: this.env.apiKey,
        authDomain: this.env.authDomain,
        databaseURL: this.env.databaseURL
      };
      const firebaseApp = firebase.app(firebaseConfig);
    } catch (error) {
      console.warn(error.message);
    }
  }

  chargeAd () {
    console.warn('CHARGING');
    // Display an interstitial
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // poner el mio
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd();
  }

  generateFaces () {
    return this.state.numberFaces;
  }

  setTopAndLeft () {
    let topArray = [];
    let leftArray = [];
    this.state.numberFaces.forEach((value, index) => {
      topArray[index] = (Math.floor((Math.random() * (height / 2 - 0)) + 0));
      leftArray[index] = (Math.floor((Math.random() * (width / 3 - 0)) + 0));
    });
    console.log(topArray, leftArray);
    return {topArray, leftArray};
  }

  gameOver () {
    ToastAndroid.showWithGravityAndOffset(
        'GAME OVER',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        0,
        100
      );
    this.setState({buttonGameOver: true});
  }

  async onStartAgain () {
    // Display an interstitial
    await AdMobInterstitial.showAd();
    this.setState({
      buttonGameOver: false,
      numberFaces: [0]
    });
  }

  render () {
    return template(this);
  }
}

export default connect()(SplashController);
