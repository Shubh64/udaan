import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'highcharts-chart/highcharts-chart.js';
import './exporting-dependency';
/**
 * @customElement
 * @polymer
 */
class AdminHome extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <highcharts-chart type="pie" data={{data}} x-label={{xLabel}} color-by-point=true x-axis={{category}} title="Scheme Statistics" legend=true plot-options="{{plotOptions}}" export=true></highcharts-chart>
    `;
  }
  static get properties() {
    return {
        data: {
            type: Array,
            value: [
                {
                    name: "Nirvana",
                    y: 2000
                },
                {
                    name: "Crucial",
                    y: 500
                },
                {
                    name: "Save Child",
                    y: 800
                },
                {
                    name: "Save Daughter",
                    y: 1000
                }
            ]
        },
        xLabel:{
            type:String,
            value:'Name'
        },
        category:{
            type:Object,
            value:{
                categories: [
                'Abhi',
                'ABC'
                ],
                crosshair:true
        }}
    };
  }
}

window.customElements.define('admin-home', AdminHome);
