import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import './ajax-call.js';
/**
 * @customElement
 * @polymer
 */
class UdaanSchemes extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
          padding:0px;
          margin:0px;
          box-sizing:border-box;
          height:84vh;
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
            padding-top:10px;
            border-radius:10px;
            background:white;
        }
        h1
        {
            margin:10px 20px 0px 20px;
            text-align: center;
            color:steelblue;
        }
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          display:inline-block;
          border-top:2px solid steelblue;
          border-bottom:2px solid steelblue;
          border-left:2px solid steelblue;
          overflow: hidden;
        }
        li:last-child {
            border-right: none;
          }
        li {
          float: left;
        border-right:2px solid steelblue;
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          background-color: #333;
          cursor:pointer;
        }
        li:hover:not(.active) {
          background-color: steelblue;
        }
        .active {
          background-color: steelblue;
        }
        .grid
        {
            margin-top:20px;
            display:flex;
            justify-content:space-around;
        }
        p
        {
            width:200px;
            font-size:12px;
        }
        #next
        {
         background:orange;
         height:40px;
         align-self:center;
        }
        #amount
        {
            text-align:center;
        }
        h3
        {
            color:gray;
            text-align:center;
        }
      </style>
      <app-location id="location" route="{{route}}"></app-location>
      <ajax-call id="ajax"></ajax-call>
      <div class="container">
          <h1>The first month of a child’s life is the most important.</h1>
          <h3>With your support, UDAAN can help more children like Rishita</h3>
         <div id="amount">
          <ul>
          <template is="dom-repeat" items={{amount}}>
            <li on-click="setActive" id="{{item.schemeId}}">{{item.schemeAmount}}</li>
            </template>
          </ul>
          </div>
          <div class="grid">
          <p>As you proceed, you will be taken to a secure payment page,
               where you perform the transfer of your gift.</p>
         <paper-button id="next" on-click="_handleNext" raised>Next</paper-button>
         </div>  
      </div>
    `;
    }
    static get properties() {
        return {
            amount: {
                type: Array,
                value: [{
                    schemeId: 1,
                    schemeAmount: 1000
                },
                {
                    schemeId: 2,
                    schemeAmount: 2000
                },
                {
                    schemeId: 3,
                    schemeAmount: 3500
                },
                {
                    schemeId: 4,
                    schemeAmount: 5600
                }]
            },
            selected: {
                type: Number,
                value: 0
            }
        };
    }
    ready() {
        super.ready();
        this.addEventListener('ajax-response', (e) => this._getAmount(e))
    }
    connectedCallback() {
        super.connectedCallback();
        this.$.ajax._makeAjaxCall('get', `${baseUrl}/udaan/schemes`, null, 'ajaxResponse')
    }
    _getAmount(event)
    {
        console.log(event.detail.data)
        this.amount=event.detail.data
    }
    /**
     * 
     * @event {click} adds active class to the selected amount and removes 
     * active class from the Previously selected amount
     */
    setActive(event) {
        console.log('abhinav')
        let id = event.model.item.schemeId
        let navs = this.shadowRoot.querySelectorAll('ul li')
        for (let i = 0; i < navs.length; i++) {
            if (navs[i].id == id) {

                navs[i].classList.add('active')
                this.selected = id;
            }
            else {
                navs[i].classList.remove('active')
            }
        }
    }
    /**
     * @description Routes to the donation-details page on the basis of the scheme chosen
     */
    _handleNext() {
        sessionStorage.setItem('schemeId', this.selected)
        // this.set('route.path', '/donation-details');
        window.history.pushState({}, null, '#/donation-details');
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
}

window.customElements.define('udaan-schemes', UdaanSchemes);
