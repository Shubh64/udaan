import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-form/iron-form.js';
import './ajax-call.js';
import '@polymer/app-route/app-location.js';
/**
 * @customElement
 * @polymer
 */
class AdminLogin extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          background:url(../../images/donation.jpg);
          overflow:hidden;
          background-size:100% 100%;
          height:85vh;
          scoll: hidden;
        }
     #form
       {
      background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
      width:40%;
      margin:150px auto;
      padding:15px;
      box-shadow:0px 0px 5px 5px;
    }
    span{
      display:flex;
      margin-top: 10px;
      justify-content: center;
    }
    paper-button{
      background-color: darkblue;
      color: whitesmoke;
    }
      </style>
      <app-location route={{route}}></app-location>

      <paper-toast text={{message}} id="toast"></paper-toast>
      
      <ajax-call id="ajax"></ajax-call>
      <iron-form id="form">
      <form>
      <paper-input id="mobileNumber"  required allowed-pattern=[0-9] minlength="10" maxlength="10" label="Enter Mobile Number"></paper-input>
      <paper-input id="password"  required type="password" minlength="5" label="Password"></paper-input>
      <span>
      <paper-button on-click="_signIn" raised id="loginBtn">LogIn</paper-button></span>
      </form>
      </iron-form>
    `;
  }
  static get properties() {
    return {

      }
    };
   /**
   * listening customEvents sent from child elements
   */
  ready()
  {
    super.ready();
    this.addEventListener('ajax-response', (e) => this._loginStatus(e))
  }
  /**
   * @description call the service to validate login credential
   * @param {mouseEvent} event on SignIn click event is fired
   * validate if mobile No. has 10 digits or not
   * get the user details from the database
   */
  _signIn(){
   if(this.$.form.validate()){
    const mobileNumber = parseInt(this.$.mobileNumber.value);
    const password=this.$.password.value;
    let postObj={mobileNumber,password}
    this.$.ajax._makeAjaxCall('post',`http://10.117.189.28:9090/udaan/admin/login`,postObj,'ajaxResponse')  
    }
    else{
      this.message='Enter Valid UserName or password'
      this.$.toast.open();
    }
  } 
  /**
   * @description check the response of ajax and log in if valid user
   * @param {CustomEvent} event will contain the data to LogIn
   * handles the response sent by the database
   * transfer the user on the base of role as customer or staff to respective page
   */
  _loginStatus(event)
  {
      const data=event.detail.data;
      this.message=`${data.message}`
      this.$.toast.open();
      this.$.form.validate()
      if(event.detail.data.statusCode=='200'){
      sessionStorage.setItem('isLogin',true);
      sessionStorage.setItem('userName',data.name);
    //   this.set('route.path','admin-home')
      window.history.pushState({}, null, '#/admin-home');
      window.dispatchEvent(new CustomEvent('location-changed'));
  }
}
}

window.customElements.define('admin-login', AdminLogin);
