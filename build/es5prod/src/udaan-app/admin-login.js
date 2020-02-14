define(["./udaan-app.js","./ajax-call.js"],function(_udaanApp,_ajaxCall){"use strict";function _templateObject_89fa3ee04f5311ea93b76d3367071c20(){var data=babelHelpers.taggedTemplateLiteral(["\n      <style>\n        :host {\n          display: block;\n          background:url(../../images/donation.jpg);\n          overflow:hidden;\n          background-size:100% 100%;\n          height:85vh;\n          scoll: hidden;\n        }\n     #form\n       {\n      background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);\n      width:40%;\n      margin:150px auto;\n      padding:15px;\n      box-shadow:0px 0px 5px 5px;\n    }\n    span{\n      display:flex;\n      margin-top: 10px;\n      justify-content: center;\n    }\n    paper-button{\n      background-color: darkblue;\n      color: whitesmoke;\n    }\n      </style>\n      <app-location route={{route}}></app-location>\n\n      <paper-toast text={{message}} id=\"toast\"></paper-toast>\n      \n      <ajax-call id=\"ajax\"></ajax-call>\n      <iron-form id=\"form\">\n      <form>\n      <paper-input id=\"mobileNumber\"  required allowed-pattern=[0-9] minlength=\"10\" maxlength=\"10\" label=\"Enter Mobile Number\"></paper-input>\n      <paper-input id=\"password\"  required type=\"password\" minlength=\"5\" label=\"Password\"></paper-input>\n      <span>\n      <paper-button on-click=\"_signIn\" raised id=\"loginBtn\">LogIn</paper-button></span>\n      </form>\n      </iron-form>\n    "]);_templateObject_89fa3ee04f5311ea93b76d3367071c20=function _templateObject_89fa3ee04f5311ea93b76d3367071c20(){return data};return data}var AdminLogin=/*#__PURE__*/function(_PolymerElement){babelHelpers.inherits(AdminLogin,_PolymerElement);function AdminLogin(){babelHelpers.classCallCheck(this,AdminLogin);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(AdminLogin).apply(this,arguments))}babelHelpers.createClass(AdminLogin,[{key:"ready",/**
    * listening customEvents sent from child elements
    */value:function ready(){var _this=this;babelHelpers.get(babelHelpers.getPrototypeOf(AdminLogin.prototype),"ready",this).call(this);this.addEventListener("ajax-response",function(e){return _this._loginStatus(e)})}/**
     * @description call the service to validate login credential
     * @param {mouseEvent} event on SignIn click event is fired
     * validate if mobile No. has 10 digits or not
     * get the user details from the database
     */},{key:"_signIn",value:function _signIn(){if(this.$.form.validate()){var mobileNumber=parseInt(this.$.mobileNumber.value),password=this.$.password.value,postObj={mobileNumber:mobileNumber,password:password};this.$.ajax._makeAjaxCall("post","".concat(baseUrl,"/udaan/admin/login"),postObj,"ajaxResponse")}else{this.message="Enter Valid UserName or password";this.$.toast.open()}}/**
     * @description check the response of ajax and log in if valid user
     * @param {CustomEvent} event will contain the data to LogIn
     * handles the response sent by the database
     * transfer the user on the base of role as customer or staff to respective page
     */},{key:"_loginStatus",value:function _loginStatus(event){var data=event.detail.data;this.message="".concat(data.message);this.$.toast.open();this.$.form.validate();if("200"==event.detail.data.statusCode){sessionStorage.setItem("isLogin",!0/* ignoreName */ /* skipSlots */ /* ignoreName */ /* skipSlots */);//   this.set('route.path','admin-home')
window.history.pushState({},null,"#/admin-home");window.dispatchEvent(new CustomEvent("location-changed"))}}}],[{key:"template",get:function get(){return(0,_udaanApp.html)(_templateObject_89fa3ee04f5311ea93b76d3367071c20())}},{key:"properties",get:function get(){return{}}}]);return AdminLogin}(_udaanApp.PolymerElement);window.customElements.define("admin-login",AdminLogin)});