define(["./udaan-app.js","./exporting-dependency.js","./ajax-call.js"],function(_udaanApp,_exportingDependency,_ajaxCall){"use strict";class AdminHome extends _udaanApp.PolymerElement{static get template(){return _udaanApp.html`
      <style>
        :host {
          display: block;
          overflow:hidden;
        }
        #logOut
        {
          background:orange;
          float:right;
        }
      </style>
      <ajax-call id="ajax"></ajax-call>
      <paper-button id="logOut" on-click="_logOut" raised>Logout</paper-button>
      <highcharts-chart type="pie" data={{data}} x-label={{xLabel}} color-by-point=true x-axis={{category}} title="Scheme Statistics" legend=true plot-options="{{plotOptions}}" export=true></highcharts-chart>
    `}static get properties(){return{data:{type:Array,value:[{name:"Nirvana",y:2e3},{name:"Crucial",y:500},{name:"Save Child",y:800},{name:"Save Daughter",y:1e3}]},xLabel:{type:String,value:"Name"},category:{type:Object,value:{categories:["Abhi","ABC"],crosshair:!0/* ignoreName */ /* skipSlots */}}}}ready(){super.ready();this.addEventListener("ajax-response",e=>this._chartData(e))}connectedCallback(){super.connectedCallback();this.$.ajax._makeAjaxCall("get",`${baseUrl}/udaan/admin`,null,"ajaxResponse")}_logOut(){sessionStorage.clear();window.history.pushState({},null,"#/login");window.dispatchEvent(new CustomEvent("location-changed"))}_chartData(event){let obj=event.detail.data.schemeList,i;for(i=0;i<obj.length;i++){obj[i].name=obj[i].schemeName;obj[i].y=obj[i].count;delete obj[i].schemeName;delete obj[i].count}console.log(obj);this.data=obj}}window.customElements.define("admin-home",AdminHome)});