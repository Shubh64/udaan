define(["./udaan-app.js","./exporting-dependency.js"],function(_udaanApp,_exportingDependency){"use strict";class HighCharts extends _udaanApp.PolymerElement{static get template(){return _udaanApp.html`
            <style>
            </style>
            <highcharts-chart type="column" data={{data}} x-label={{xLabel}} x-axis={{category}} title="Testing" export=true></highcharts-chart>
            `}static get properties(){return{prop1:{type:String,value:"car-insurance"},data:{type:Array,value:[{name:"Abhi",y:80},{name:"ABC",y:20}]},xLabel:{type:String,value:"Name"},legend:{layout:"vertical",align:"right",verticalAlign:"top",x:-150,y:100,floating:!0/* ignoreName */ /* skipSlots */,borderWidth:1,backgroundColor:Highcharts.defaultOptions.legend.backgroundColor||"#FFFFFF"},category:{type:Object,value:{categories:["Abhi","ABC"],crosshair:!0}}}}}customElements.define("high-chart",HighCharts)});