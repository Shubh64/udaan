import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import './smart-accordian.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import './ajax-call.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/gold-cc-input/gold-cc-input.js';
import '@polymer/gold-cc-expiration-input/gold-cc-expiration-input.js';
import '@polymer/gold-cc-cvc-input/gold-cc-cvc-input.js';

/**
 * @customElement
 * @polymer
 */
class PaymentPage extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
  .proceed-btn, paper-button {
    margin-top:10px;
      margin-bottom: 10px;
      background-color: darkblue;
      color: whitesmoke;
      cursor: pointer;
      font-size: 16px;
      border-radius: 6px;
  }
  .proceed-btn a {
      text-decoration: none;
      color: #fff;
  }
  #cardDetails{
    background: #eee9f0;
  }
div
  {
 background:white;
 width:40%;
 margin:auto;
 padding:15px;
}
span{
 display:flex;
 margin-top: 10px;
 justify-content: center;
}
ul{
  font-size:16px;
  font-weight:lighter;
}
#donationDetails{
  width:500px;
  height:500px;
}
  </style>
  <app-location route={{route}}></app-location>
  <ajax-call id="ajax"></ajax-call>
    <div id="cardDetails">
            <!-- Card Number -->
            <gold-cc-input auto-validate label="Card number" error-message="Enter valid visa or mastercard!" card-types='["visa", "mastercard"]' required>
        </gold-cc-input>

            <!-- Date Field -->
            <gold-cc-expiration-input></gold-cc-expiration-input>
  
            <!-- Card Verification Field -->
            <gold-cc-cvc-input card-type="[[cardType]]"></gold-cc-cvc-input>
          </div>
    <span> <paper-button type="submit"  on-click="_handleSubmit" raised class="proceed-btn">Proceed</paper-button>
    </span> 
  <paper-dialog id="modal">
  <paper-dialog-scrollable>
  <form id="donationDetails">
  <h2>Your Donation Details are:
  <ul>
      <li>Scheme Name:{{schemeName}}</li>
      <li>Scheme Amount:{{schemeAmount}}</li>
      <li>Donar Name:{{userName}}</li>
      <li>Email-Id:{{emailId}}</li>
      <li>MobileNo.:{{mobileNumber}}</li>
      <li>PAN Card No.:{{panNumber}}</li>
      <li>TaxBenefitAmount:{{taxBenefitAmount}}</li>
  </ul>
  </form>
  </paper-dialog-scrollable>
  <paper-button  raised dialog-dismiss>ok</paper-button>
  <paper-button  raised on-click="_sendEmail">Send Email</paper-button>
  <paper-button  raised on-click="_download">Download</paper-button>
</paper-dialog>
    `;
  }
  static get properties() {
    return {
      schemeName:String,
      schemeAmount:String,
      userName:String,
      emailId:String,
      mobileNumber:String,
      panNumber:String,
      taxBenefitAmount:String,
      statusCode:String
      };
    }
    _handleSubmit(){
      this.$.modal.open();
      const postObj= JSON.parse(sessionStorage.getItem('donarDetails'))
      console.log(postObj);
    }
    ready() {
      super.ready();
      this.addEventListener('payments', (e) => this._payments(e))
    }
    _payments(event){
      console.log(event.detail.data)
        this.orderId=event.detail.data.orderId;
        this.schemeName=event.detail.data.schemeName;
        this.schemeAmount=event.detail.data.schemeAmount
        this.userName=event.detail.data.userName
        this.emailId=event.detail.data.emailId
        this.mobileNumber=event.detail.data.mobileNumber
        this.panNumber=event.detail.data.panNumber
        this.taxBenefitAmount=event.detail.data.taxBenefitAmount
       this.$.modal.open();
    }
    _download(){
      console.log('in download')
    }
    _sendEmail(){
      console.log('in email')
    }
  }

window.customElements.define('payment-page', PaymentPage);
