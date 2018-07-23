/**
 * Created by sanedev on 6/19/16.
 */
'use strict';

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import{HOST_URL}  from '../../configs/env.config';
@Component({
  selector: 'ajax-spinner',
  template: `<div [hidden]="hide" class="spinner-wrapper" [class.fadeIn]="showSpinner" [class.fadeOut]="!showSpinner">
            </div>`,
  styles: [`
        .spinner-wrapper {
            position: fixed;         
            z-index: 999;
            overflow:hidden;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            background-color: #000;
            background-color: rgba(0,0,0,0.5);
        }
        .spinner-wrapper:before {
          content: '';
          box-sizing: border-box;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 60px;
          margin-top: -15px;
          margin-left: -15px;
          border-radius: 50%;
          border: 1px solid #ccc;
          border-top-color: #07d;
          animation: spinner .7s linear infinite;
        }
        @keyframes spinner {
          to {transform: rotate(360deg);}
        }
      `]
})
export class SpinnerComponent implements OnDestroy,OnInit {
  private currentTimeout: any;
  private isDelayedRunning: boolean = false;
  showSpinner: boolean = false;
  hide: boolean = true;

  constructor() {
  }

  ngOnInit() {
    this.detectAjax();
  }

  @Input()
  public delay: number = 300;

  @Input()
  public set isRunning(value: boolean) {
    if (!value) {
      this.cancelTimeout();
      this.isDelayedRunning = false;
    }

    if (this.currentTimeout) {
      return;
    }

    this.currentTimeout = setTimeout(() => {
      this.isDelayedRunning = value;
      this.cancelTimeout();
    }, this.delay);
  }

  detectAjax() {
    let origOpen = XMLHttpRequest.prototype.open;
    let that = this;
    XMLHttpRequest.prototype.open = function (method, url, async) {
      if (url.indexOf(HOST_URL + '/api') != -1)
        that.showSpinner = true;
      that.hide = false;
      this.addEventListener('load', function () {
        // console.log('request completed!');
        // console.log(this.readyState); //will always be 4 (ajax is completed successfully)
        // console.log(this.responseText); //whatever the response was
        setTimeout(()=>
            that.showSpinner = false
          , 500
        );
        setTimeout(()=>
          that.hide = true, 1000
        );
      });
      origOpen.apply(this, arguments);
      //  this.setRequestHeader("Auth","123");
    };


  }


  private cancelTimeout(): void {
    clearTimeout(this.currentTimeout);
    this.currentTimeout = undefined;
  }

  ngOnDestroy(): any {
    this.cancelTimeout();
  }
}
