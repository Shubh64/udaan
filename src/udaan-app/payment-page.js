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
      background: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
      overflow-y:hidden;
    }
  
    /* Credit Card */
    .credit-card {
      width: 360px;
      height: 270px;
      margin: 20px auto 0;
      border: 1px solid #ddd;
      border-radius: 6px;
      background-color: #95d3f5;
      box-shadow: 1px 2px 3px 0 rgba(0, 0, 0, .10);
    }
    .form-header {
      height: 40px;
      padding: 20px 30px 0;
      border-bottom: 1px solid #e1e8ee;
  }
   
  .form-body {
      height: 340px;
      padding: 30px 30px 20px;
  }
  .title {
      font-size: 18px;
      margin: 0;
      color: #5e6977;
  }
  .card-number,
  .cvv-input input,
  .month select,
  .year select {
      font-size: 14px;
      font-weight: 100;
      line-height: 20px;
  }
   .year
   {
     position:relative;
   }
  .card-number,
  .month select,
  .year select {
      font-size: 14px;
      font-weight: 140;
      line-height: 20px;
  }
   
  .card-number,
  .cvv-details,
  .cvv-input input,
  .month select,
  .year select {
      opacity: .7;
      color: #86939e;
  }
  .card-number {
      width: 100%;
      margin-bottom: 20px;
      padding-left: 20px;
      border: 2px solid #e1e8ee;
      border-radius: 6px;
  }
  .month select,
  .year select {
      width: 145px;
      margin-bottom: 20px;
      padding-left: 20px;
      border: 2px solid #e1e8ee;
      border-radius: 6px;
      background-position: 85% 50%;
      float: right;
      float: left;
    }
  .cvv-input input {
      float: left;
      width: 145px;
      padding-left: 20px;
      border: 2px solid #e1e8ee;
      border-radius: 6px;
      background: #fff;
  }
   
  .cvv-details {
      font-size: 12px;
      font-weight: 300;
      line-height: 20px;
      float: right;
      margin-bottom: 20px;
  }
  .cvv-details p {
      margin-top: 6px;
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
  #form
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

      <div slot="summary">Credit Card/Debit Card</div>
      <ul>
        <form class="credit-card">
          <div class="form-header">
            <h4 class="title">Credit card detail</h4>
          </div>
    
          <div class="form-body">
            <!-- Card Number -->
            <input type="text" class="card-number" id="cardNumber" placeholder="Card Number">
            <!-- Date Field -->
            <div class="date-field">
              <div class="month">
                <select name="Month">
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                </select>
              </div>
              <div class="year">
                <select name="Year">
                  <option value="2020">2020</option>
                </select>
              </div>
            </div>
    
            <!-- Card Verification Field -->
            <div class="card-verification">
              <div class="cvv-input">
                <input type="text" placeholder="CVV">
              </div>
              <div class="cvv-details">
                <p>3 or 4 digits usually found <br> on the signature strip</p>
              </div>
            </div>
          </div>
        </form>
      </ul>
   
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
