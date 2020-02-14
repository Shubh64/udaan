import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import './ajax-call.js';
/**
* @customElement
* @polymer
*/
class DonationDetails extends PolymerElement {
static get template() {
return html`
<style>
:host {
    display: block;
    padding:0px;
    margin:0px;
    box-sizing:border-box;
    height:76vh;
    overflow-y: hidden;
    background-size:cover;
    background-repeat:no-repeat;
    background-image:url('../../images/udaan-home.jpg')
  }
  .container
  {
      width:400px;
      min-height:400px;
      margin-left:100px;
      margin-top:30px;
      padding:10px;
      border-radius:10px;
      background:white;
      grid-area:g1;
  }
  .container2
  {
      width:400px;
      min-height:400px;
      margin-left:100px;
      margin-top:30px;
      padding:10px;
      border-radius:10px;
      background:white;
      grid-area:g2;
  }
  h1
  {
      margin:10px 20px 0px 20px;
      text-align: center;
      color:steelblue;
  }
  p
  {
      width:200px;
      font-size:12px;
  }
  #next
  {
      margin-top:10px;
   background:orange;
   float:right;
  }
  #main-container
  {
      display:grid;
      grid-template-columns:700px auto;
      grid-template-areas:"g1 g2"
  }
</style>
<ajax-call id="ajax"></ajax-call>
<app-location route="{{route}}"></app-location>
<div id="main-container">
<div class="container">
<h2>You have chosen {{details.schemeName}} scheme</h2>
<ul>
<li>Scheme Amount: {{details.schemeAmount}}</li>
<li>Description: {{details.description}}</li>
<li>Tax Benefit: {{details.taxBenefit}}%</li>
<li>Tax Benefit Amount:Rs.{{details.taxBenefitAmount}}</li>
</ul>
      </div>
<div class="container2">
<iron-form id="form">
<form>
    <paper-input label="Full name" id="fullName" required allowed-pattern="[a-zA-Z]" 
    error-message="Please Enter Your First name"></paper-input>
    <paper-input label="Pan Number" id="panNo" required allowed-pattern="[0-9a-zA-Z]" 
    error-message="Please Enter Your Pan Number"></paper-input>
    <paper-input label="Mobile No." id="mobile" required type="number" char-counter maxlength="10"
        error-message="Please Enter Mobile No."></paper-input>
    <paper-input id="mail" label="Email" required pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$">
        <iron-icon icon="mail" slot="prefix"></iron-icon>
    </paper-input>
    <paper-button raised on-click="_handleNext" id="next">Next</paper-button>
</form>
</iron-form>
      </div>
      </div>
`;
}
static get properties() {
return {
details: {
type: Object,
value: {
    schemeName:'Nirvana',
    schemeAmount:1,
    description:'xyz',
    taxBenefit:'10%',
    taxBenefitAmount:1000
}
}
};
}
ready()
{
    super.ready();
    this.addEventListener('ajax-response', (e) => this._schemeDetails(e))
}
connectedCallback()
{
    super.connectedCallback();
    this.$.ajax._makeAjaxCall('get', `${baseUrl}/udaan/schemes/${sessionStorage.getItem('schemeId')}`, null, 'ajaxResponse')
}
_schemeDetails(event)
{
    console.log(event.detail.data);
    this.details=event.detail.data;
}
_handleNext()
{
    this.schemeId=sessionStorage.getItem('schemeId')
    let fullName=this.$.fullName.value;
    let panNo=this.$.panNo.value;
    let mobile=this.$.mobile.value;
    let mail=this.$.mail.value;
    let postObj={fullName,mobile,panNo,mail,schemeId:this.schemeId};
    sessionStorage.setItem('donorDetails',JSON.stringify(postObj))
    this.set('route.path','/payment')
}
}

window.customElements.define('donation-details', DonationDetails);