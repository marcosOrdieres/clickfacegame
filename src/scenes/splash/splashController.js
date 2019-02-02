import { BaseScene } from 'components';
import template from './splashTemplate';

class SplashController extends BaseScene {
  constructor (args) {
    super(args);
  }

  render () {
    return template(this);
  }
}

export default connect()(SplashController);
