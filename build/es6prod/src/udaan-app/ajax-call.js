define(["../../node_modules/@polymer/polymer/polymer-element.js","../../node_modules/@polymer/iron-ajax/iron-ajax.js"],function(_polymerElement,_ironAjax){"use strict";/**
 * @customElement
 * @polymer
 */class AjaxCall extends _polymerElement.PolymerElement{static get template(){return _polymerElement.html`
      <style>
        :host {
          display: block;
        }
      </style>
    <iron-ajax id="ajax" on-response="_handleResponse" on-error="_handleError" handle-as="json" content-type="application/json"> </iron-ajax>
    `}static get properties(){return{}}/**
   * @description:handle diferent  ajax calls  
  *@param {String} url url of specific location
  *@param {String} method method type:get/put/post/delete
  *@param {Object} postObj needs object as value for put/post and null for get/delete
  *@param {Boolean} sync true for synchronization and false for asynchronization
  **/_makeAjaxCall(method,url,obj,action){const ajax=this.$.ajax;this.action=action;ajax.body=obj?JSON.stringify(obj):void 0;ajax.method=method;ajax.url=url;ajax.generateRequest()}/**
 * @description: Fired everytime when ajax call is made.It handles response of the ajax 
 * @param {*} event 
 */_handleResponse(event){const data=event.detail.response;console.log(data);console.log(this.action);//All the response has been handled through switch case by dispatching event details to the parent
switch(this.action){case"ajaxResponse":this.dispatchEvent(new CustomEvent("ajax-response",{bubbles:!0,composed:!0,detail:{data,loading:!0}}));break;default:}}_handleError(event){//All the response has been handled through switch case by dispatching event details to the parent
const data=event.detail.request.response;console.log(data);switch(this.action){case"ajaxResponse":this.dispatchEvent(new CustomEvent("ajax-response",{bubbles:!0,composed:!0,detail:{data}}));break;}}}window.customElements.define("ajax-call",AjaxCall)});