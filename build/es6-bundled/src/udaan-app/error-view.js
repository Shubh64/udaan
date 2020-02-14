define(["./udaan-app.js"],function(_udaanApp){"use strict";class ErrorView extends _udaanApp.PolymerElement{static get template(){return _udaanApp.html`
    <style>
    :host {
      display: block;
    }
  </style>
    <h1>Error View 404 Page Not Found</h1>
    `}}window.customElements.define("error-view",ErrorView)});