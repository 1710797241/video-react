/*
 * @Date: 2020-03-25 21:35:29
 * @Author: Do not edit
 * @LastEditors: qiye
 * @LastEditTime: 2022-01-12 15:56:07
 * @FilePath: /video-react/src/Manager.js
 */
import { createStore } from 'redux';
import reducer from './reducers';
import * as playerActions from './actions/player';
import * as videoActions from './actions/video';

export default class Manager {
  constructor(store) {
    this.store = store || createStore(reducer);

    this.video = null;
    this.rootElement = null;
  }

  getActions() {
    const manager = this;
    const { dispatch } = this.store;
    const actions = {
      ...playerActions,
      ...videoActions
    };

    function bindActionCreator(actionCreator) {
      return function bindAction() {
        // eslint-disable-next-line prefer-rest-params
        const action = actionCreator.apply(manager, arguments);
        if (typeof action !== 'undefined') {
          dispatch(action);
        }
      };
    }

    return Object.keys(actions)
      .filter(key => typeof actions[key] === 'function')
      .reduce((boundActions, key) => {
        boundActions[key] = bindActionCreator(actions[key]);
        return boundActions;
      }, {});
  }

  getState() {
    return this.store.getState();
  }

  // subscribe state change
  subscribeToStateChange(listener, getState) {
    if (!getState) {
      getState = this.getState.bind(this);
    }

    let prevState = getState();

    const handleChange = () => {
      const state = getState();
      if (state === prevState) {
        return;
      }

      // console.log(
      //   state === prevState,
      //   prevState,
      //   'prevState',
      //   'subscribeToStateChange===',
      //   state,
      //   'state'
      // );

      const prevStateCopy = prevState;
      prevState = state;
      listener(state, prevStateCopy);
    };

    return this.store.subscribe(handleChange);
  }

  // subscribe to operation state change
  subscribeToOperationStateChange(listener) {
    return this.subscribeToStateChange(
      listener,
      () => this.getState().operation
    );
  }

  // subscribe to player state change
  subscribeToPlayerStateChange(listener) {
    return this.subscribeToStateChange(listener, () => this.getState().player);
  }
}
