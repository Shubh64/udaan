import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'highcharts-chart/highcharts-chart.js';
import './exporting-dependency';
class HighCharts extends PolymerElement
    {
        static get template()
        {
            return html `
            <style>
            </style>
            <highcharts-chart type="column" data={{data}} x-label={{xLabel}} x-axis={{category}} title="Testing" export=true></highcharts-chart>
            `
        }
        static get properties() {
            return {
                prop1: {
                    type: String,
                    value: 'car-insurance'
                },
                data: {
                    type: Array,
                    value: [
                        {
                            name: "Abhi",
                            y: 80
                        },
                        {
                            name: "ABC",
                            y: 20
                        }
                    ]
                },
                xLabel:{
                    type:String,
                    value:'Name'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
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
    customElements.define('high-chart',HighCharts)