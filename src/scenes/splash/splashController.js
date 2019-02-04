import { BaseScene } from 'components';
import template from './splashTemplate';
import { connect } from 'react-redux';
import { Dimensions, ToastAndroid } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { AdMobInterstitial } from 'react-native-admob';
import firebase from 'react-native-firebase';
//import services from '../../services';

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
      buttonGameOver: false,
      score: 0,
      finalScore:0,
      currentScore:0
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

  async gameOver () {
    ToastAndroid.showWithGravityAndOffset(
        'GAME OVER',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        0,
        100
      );
    //this.setState({buttonGameOver: true});
    let bestScore = await this.storage.getAsyncStorage('bestScore');
    if(!bestScore){
      await this.storage.setAsyncStorage('bestScore', this.state.score);
    } else{
      if(this.state.score > bestScore){
        await this.storage.setAsyncStorage('bestScore', this.state.score);
      }
    }
    const finalScore = await this.storage.getAsyncStorage('bestScore');

    this.setState({
      buttonGameOver: true,
      currentScore: this.state.score,
      score: 0,
      finalScore
    });

  }

  async getBestScore(){
    //let bestScore = await this.storage.getAsyncStorage('bestScore');
    return 1;
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
