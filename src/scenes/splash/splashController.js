import { BaseScene } from 'components';
import template from './splashTemplate';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

class SplashController extends BaseScene {
  constructor (args) {
    super(args);
    this.state = {
      renderAgain: false,
      numberFaces: [0],
      top: (Math.floor((Math.random() * (height / 2 - 0)) + 0)),
      left: (Math.floor((Math.random() * (width / 3 - 0)) + 0))
    };
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

  render () {
    return template(this);
  }
}

export default connect()(SplashController);
