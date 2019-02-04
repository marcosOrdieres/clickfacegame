import React, { Component } from 'react';
import i18n from '../translations';
import User from '../models/user';
import rootStore from '../stores/root';
import routes from '../common/routes';
import env from '../config/env';
import services from '../services';

export default class BaseScene extends Component {
  constructor (args) {
    super();
    this.services = services;
    this.storage = this.services.Storage;
    this.i18n = i18n;
    this.user = User.instance;
    this.rootStore = rootStore;
    this.routes = routes;
    this.env = env;
  }

  setState (args) {
    return new Promise((resolve) => super.setState(args, resolve));
  }
}
