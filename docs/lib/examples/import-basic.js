/*
 * @Date: 2020-03-25 21:35:29
 * @Author: Do not edit
 * @LastEditors: qiye
 * @LastEditTime: 2021-12-31 14:46:39
 * @FilePath: /video-react/docs/lib/examples/import-basic.js
 */
import React from 'react';
import { Player } from '../../../src/index';

export default class Index extends React.Component {
  componentDidMount() {
    this.player.subscribeToStateChange(state => {
      console.log(state, 'state');
      if (state.currentTime >= 20) {
        this.player.pause();
      }
    });
  }
  render() {
    return (
      <Player
        ref={player => {
          this.player = player;
        }}
        canSeekTime={20}
        enableKeyboard={false}
        playsInline
        src="https://vdse.bdstatic.com//1932ce27a3527df6eea140b5d9a60121.mp4?authorization=bce-auth-v1%2F40f207e648424f47b2e3dfbb1014b1a5%2F2021-12-16T05%3A25%3A43Z%2F-1%2Fhost%2Fc28eb96a98dcdba894d0a5a66d1f9cccae4275b37880fa5b9fd56ccd933a3eec"
      />
    );
  }
}
