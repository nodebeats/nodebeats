/**
 * Created by sanedev on 6/19/16.
 */
'use strict';

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import{HOST_URL}  from '../../configs/env.config';
@Component({
    selector: 'ajax-spinner',
    template: `<div *ngIf="show" class="spinner-wrapper fadeInDirectives">
                    <div class="spinner-back"></div>
                       <div class="spinner">  
                       <div class="rect1"></div>
                       <div class="rect2"></div>
                         <div class="rect3"></div>
                         <div class="rect4"></div>
                         <div class="rect5"></div>
                    </div></div>`,
    styles: [`
        .spinner-wrapper {
            height: 100%;
            width: 100%;
            position: fixed;         
            z-index: 999;
            overflow:hidden;
            left: 0;
            top: 0;
        }
        .spinner-back{
                background-color: #000;
             opacity: .5;
            height: inherit;
            position: inherit;
             width: inherit;

        }
        .spinner {
          margin: 100px auto;
          height: 100px;
          text-align: center;
          font-size: 10px;
          color:#fff;
        }
        
        .spinner > div {
          background-color: #fff;
          height: 100%;
          margin-left: 5px;
          display: inline-block;
          width: 15px;
           margin-left: 5px;
          -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
          animation: sk-stretchdelay 1.2s infinite ease-in-out;
        }
        
        .spinner .rect2 {
          -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s;
        }
        
        .spinner .rect3 {
          -webkit-animation-delay: -1.0s;
          animation-delay: -1.0s;
        }
        
        .spinner .rect4 {
          -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s;
        }
        
        .spinner .rect5 {
          -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s;
        }
        
        @-webkit-keyframes sk-stretchdelay {
          0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
          20% { -webkit-transform: scaleY(1.0) }
        }
        
        @keyframes sk-stretchdelay {
          0%, 40%, 100% { 
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
          }  20% { 
            transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
          }
        }`]
})
export class SpinnerComponent implements OnDestroy,OnInit {
    private currentTimeout:any;
    private isDelayedRunning:boolean = false;
    show:boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.detectAjax();
    }

    @Input()
    public delay:number = 300;

    @Input()
    public set isRunning(value:boolean) {
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
                that.show = true;
            this.addEventListener('load', function () {
                // console.log('request completed!');
                // console.log(this.readyState); //will always be 4 (ajax is completed successfully)
                // console.log(this.responseText); //whatever the response was
                setTimeout(()=>that.show = false, 500);
            });
            origOpen.apply(this, arguments);
          //  this.setRequestHeader("Auth","123");
        };


    }


    private cancelTimeout():void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy():any {
        this.cancelTimeout();
    }
}