define(["exports","meta","./udaan-app.js","./ajax-call.js"],function(_exports,meta,_udaanApp,_ajaxCall){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0/* ignoreName */ /* skipSlots */});_exports.validateCcInput=validateCcInput;_exports.PaperDialogBehaviorImpl=_exports.PaperDialogBehavior=_exports.NeonAnimationRunnerBehaviorImpl=_exports.NeonAnimationRunnerBehavior=_exports.NeonAnimatableBehavior=_exports.IronValidatorBehavior=_exports.$paperDialogBehavior=_exports.$neonAnimationRunnerBehavior=_exports.$neonAnimatableBehavior=_exports.$ironValidatorBehavior=_exports.$ccValidator=void 0;meta=babelHelpers.interopRequireWildcard(meta);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){keys.push.apply(keys,Object.getOwnPropertySymbols(object))}if(enumerableOnly)keys=keys.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable});return keys}function _objectSpread(target){for(var i=1,source;i<arguments.length;i++){source=null!=arguments[i]?arguments[i]:{};if(i%2){ownKeys(source,!0).forEach(function(key){babelHelpers.defineProperty(target,key,source[key])})}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source))}else{ownKeys(source).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})}}return target}const bundledImportMeta=_objectSpread({},meta,{url:new URL("../../node_modules/%40polymer/gold-cc-cvc-input/gold-cc-cvc-input.js",meta.url).href});(0,_udaanApp.Polymer)({_template:_udaanApp.html$1`
    <style>
      :host {
        display: block;
      }

      iron-icon {
        margin-left: 10px;
        @apply --gold-cc-cvc-input-icon;
      }

      iron-icon[hidden] {
        display: none !important;
      }

      .container {
        @apply --layout-horizontal;
      }

      input {
        @apply --layout-flex;
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        width: 100%;
        max-width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        -webkit-appearance: none;
        text-align: inherit;
        vertical-align: bottom;
        /* Firefox sets a min-width on the input, which can cause layout issues */
        min-width: 0;
        @apply --paper-font-subhead;
        @apply --paper-input-container-input;
      }
      input::-webkit-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
      input:-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
      input::-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
      input:-ms-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }
    </style>

    <paper-input-container id="container" disabled$="[[disabled]]" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" invalid="[[invalid]]">

      <label slot="label" hidden$="[[!label]]">[[label]]</label>

      <iron-input id="input" slot="input" bind-value="{{value}}" allowed-pattern="[0-9]" invalid="{{invalid}}">
        <input id="nativeInput" aria-labelledby$="[[_ariaLabelledBy]]" aria-describedby$="[[_ariaDescribedBy]]" required$="[[required]]" type="tel" autocomplete="cc-csc" name$="[[name]]" disabled$="[[disabled]]" autofocus$="[[autofocus]]" inputmode$="[[inputmode]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" maxlength$="[[_requiredLength]]" size$="[[size]]">
      </iron-input>
      <div class="icon-container" slot="suffix">
        <iron-icon id="icon" src="[[resolveUrl('cvc_hint.png')]]" hidden$="[[_amex]]" alt="cvc"></iron-icon>
        <iron-icon id="amexIcon" hidden$="[[!_amex]]" src="[[resolveUrl('cvc_hint_amex.png')]]" alt="amex cvc"></iron-icon>
      </div>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on">[[errorMessage]]</paper-input-error>
      </template>

    </paper-input-container>
  `,is:"gold-cc-cvc-input",importMeta:bundledImportMeta,properties:{/**
     * The label for this input.
     */label:{type:String,value:"CVC"},/**
     * The type of card that the CVC is for.
     */cardType:{type:String,value:""},_requiredLength:{type:Number,computed:"_computeRequiredLength(cardType)"},_amex:{type:Boolean,computed:"_computeIsAmex(cardType)"},value:{type:String,observer:"_onValueChanged"}},behaviors:[_udaanApp.PaperInputBehavior,_udaanApp.IronFormElementBehavior],observers:["_onFocusedChanged(focused)"],ready:function(){if(!this.value){this.value=""}},/**
   * Returns a reference to the focusable element. Overridden from
   * PaperInputBehavior to correctly focus the native input.
   */get _focusableElement(){return this.inputElement._inputElement},// Note: This event is only available in the 2.0 version of this element.
// In 1.0, the functionality of `_onIronInputReady` is done in
// PaperInputBehavior::attached.
listeners:{"iron-input-ready":"_onIronInputReady"},_onIronInputReady:function(){// Only validate when attached if the input already has a value.
if(!!this.inputElement.bindValue){this._handleAutoValidate()}},/**
   * A handler that is called on input
   */_onValueChanged:function(value,oldValue){// The initial property assignment is handled by `ready`.
if(oldValue==void 0){return}this._handleAutoValidate()},_computeRequiredLength:function(cardType){return this._computeIsAmex(cardType)?4:3},_computeIsAmex:function(cardType){return"amex"==cardType.toLowerCase()},/**
   * Returns true if the element has a valid value, and sets the visual
   * error state.
   *
   * @return {boolean} Whether the input is currently valid or not.
   */validate:function(){// Empty, non-required input is valid.
var valid=this.$.input.validate()&&this.value.length==this._requiredLength||!this.required&&""==this.value;this.invalid=!valid;// Update the container and its addons (i.e. the custom error-message).
this.$.container.invalid=!valid;this.$.container.updateAddons({inputElement:this.$.input,value:this.value,invalid:!valid});return valid},/**
   * Overidden from Polymer.IronControlState.
   */_onFocusedChanged:function(focused){if(!this._focusableElement){return}if(!focused){this._handleAutoValidate()}}});const IronValidatorBehavior={ready:function(){new _udaanApp.IronMeta({type:"validator",key:this.is||this.constructor.is,value:this})},/**
   * Implement custom validation logic in this function.
   * @param {Object} values The value to validate. May be any type depending on the validation logic.
   * @return {boolean} true if `values` is valid.
   */validate:function(values){}};_exports.IronValidatorBehavior=IronValidatorBehavior;var ironValidatorBehavior={IronValidatorBehavior:IronValidatorBehavior};_exports.$ironValidatorBehavior=ironValidatorBehavior;(0,_udaanApp.Polymer)({is:"date-validator",behaviors:[IronValidatorBehavior],validate:function(date){if(!date)return(/* ignoreName */!1/* skipSlots */ /* skipSlots */);if(12<date.month||1>date.month)return!1;var then=new Date("20"+date.year,date.month),now=new Date;return then>now}});(0,_udaanApp.Polymer)({_template:_udaanApp.html$1`
    <style>
      span {
        @apply --paper-input-container-font;
        opacity: 0.33;
        text-align: center;
      }

      input[is="iron-input"], iron-input input {
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--primary-text-color));
        text-align: center;

        @apply --layout-flex;
        @apply --paper-font-subhead;
        @apply --paper-input-container-input;
      }

      .container {
        @apply --layout-horizontal;
      }
    </style>

    <date-validator id="validator"></date-validator>

    <span aria-hidden id="monthLabel" hidden>Month</span>
    <span aria-hidden id="yearLabel" hidden>Year</span>

    <div class="container">
      <iron-input
          id="expirationMonth"
          bind-value="{{month}}"
          allowed-pattern="[0-9]"
          invalid="{{invalid}}">
        <input
            id="nativeMonthInput"
            aria-labelledby$="[[_computeAriaLabel(ariaLabelPrefix,'monthLabel')]]"
            required$="[[required]]"
            maxlength="2"
            placeholder="MM"
            autocomplete="cc-exp-month"
            type="tel"
            disabled$="[[disabled]]"
            autofocus$="[[autofocus]]"
            inputmode$="[[inputmode]]"
            readonly$="[[readonly]]">
      </iron-input>
      <span>/</span>
      <iron-input
          id="expirationYear"
          bind-value="{{year}}"
          allowed-pattern="[0-9]"
          invalid="{{invalid}}">
        <input
            id="nativeYearInput"
            aria-labelledby$="[[_computeAriaLabel(ariaLabelPrefix,'yearLabel')]]"
            required$="[[required]]"
            maxlength="2"
            placeholder="YY"
            autocomplete="cc-exp-year"
            type="tel"
            disabled$="[[disabled]]"
            inputmode$="[[inputmode]]"
            readonly$="[[readonly]]">
      </iron-input>
    </div>
  `,is:"date-input",behaviors:[_udaanApp.IronA11yKeysBehavior,_udaanApp.IronValidatableBehavior],properties:{/**
     * Set to true to mark the input as required.
     */required:{type:Boolean,value:!1},/**
     * The month component of the date displayed.
     */month:{type:Number},/**
     * The year component of the date displayed.
     */year:{type:Number},/**
     * The date object used by the validator. Has two properties, month and
     * year.
     */date:{notify:!0,type:Object},validator:{type:String,value:"date-validator"},ariaLabelPrefix:{type:String},/**
     * Set to true to disable the month and year input elements.
     */disabled:{type:Boolean,value:!1},/**
     * Set to true to autofocus the month input element.
     */autofocus:{type:Boolean},/**
     * Bound to the month and year input elements' `inputmode` property.
     */inputmode:{type:String},/**
     * Set to true to mark the month and year inputs as not editable.
     */readonly:{type:Boolean,value:!1}},/**
   * @type {!Object}
   */keyBindings:{"/":"_selectYear"},observers:["_computeDate(month, year)"],created:function(){// Polymer 2+ does not call _computeDate observer before
// paper-input-container calls _handleValue in the parent's
// connectedCallback unlike in Polymer 1
this._computeDate("","")},_selectYear:function(){var yearInput=this.$.nativeYearInput||this.$.expirationYear;yearInput.focus()},_computeDate:function(month,year){// Months are 0-11.
this.date={month:month,year:year};// Advance cursor to year after month entry
if(month&&2===month.length){this._selectYear()}},validate:function(){// Empty, non-required input is valid.
if(!this.required&&""==this.month&&""==this.year){return!0}this.invalid=!this.$.validator.validate(this.date);this.fire("iron-input-validate");return!this.invalid},_computeAriaLabel:function(dateLabel,monthLabel){return dateLabel+" "+monthLabel}});(0,_udaanApp.Polymer)({_template:_udaanApp.html$1`
    <style>
      :host {
        display: block;
      }
    </style>

    <paper-input-container
        id="container"
        no-label-float="[[noLabelFloat]]"
        always-float-label="[[alwaysFloatLabel]]"
        attr-for-value="date"
        disabled$="[[disabled]]"
        invalid="[[invalid]]">
      <label slot="label" hidden$="[[!label]]">[[label]]</label>

      <date-input
          class="paper-input-input"
          id="input"
          slot="input"
          aria-label-prefix="[[_ariaLabelledBy]]"
          required$="[[required]]"
          autocomplete$="[[autocomplete]]"
          disabled$="[[disabled]]"
          invalid="{{invalid}}"
          autofocus$="[[autofocus]]"
          inputmode$="[[inputmode]]"
          placeholder$="[[placeholder]]"
          readonly$="[[readonly]]"
          on-date-changed="_onDateChanged">
      </date-input>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on" id="error">
          [[errorMessage]]
        </paper-input-error>
      </template>

    </paper-input-container>
  `,is:"gold-cc-expiration-input",/* The underlying dateInput is tabbable */hostAttributes:{tabindex:-1},behaviors:[_udaanApp.PaperInputBehavior,_udaanApp.IronFormElementBehavior],properties:{/**
     * The label for this input.
     */label:{type:String,value:"Expiration Date"},value:{type:String,value:"",observer:"_onValueChanged"}},observers:["_onFocusedChanged(focused)"],ready:function(){// If there's an initial input, validate it.
if(this.value){this._handleAutoValidate()}},created(){// Polymer 2+ propagates `autoValidate` earlier in the lifecycle than in
// Polymer 1
this.__ignoreAutoValidation=!0},/**
   * A handler that is called on input
   */_onValueChanged:function(value,oldValue){// The initial property assignment is handled by `ready`.
if(oldValue==void 0&&""===value){return}this.$.input.setProperties({month:this._computeMonth(value),year:this._computeYear(value)});this._handleAutoValidate()},_onDateChanged:function(event){// date-input's _computeDate gets called on created which is called before
// the first __onValueChanged is called
if(!this.__firstDateComputeSkipped){this.__firstDateComputeSkipped=!0;return}var month=event.detail.value.month||"",year=event.detail.value.year||"",value=year?month+"/"+year:month;this.value=value+""},_computeMonth:function(value){// Date is in MM/YY format.
return value.split("/")[0]},_computeYear:function(value){// Date is in MM/YY format.
return value.split("/")[1]||""},/**
   * Overidden from Polymer.PaperInputBehavior.
   */validate:function(){return this.$.input.validate()},/**
   * Overidden from Polymer.IronControlState.
   */_onFocusedChanged:function(focused){if(this.__ignoreAutoValidation){this.__ignoreAutoValidation=!1;return}if(!focused){this._handleAutoValidate()}}});/**
    @license
    Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at
    http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
    http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
    found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
    part of the polymer project is also subject to an additional IP rights grant
    found at http://polymer.github.io/PATENTS.txt
    */ /*
       jQuery Credit Card Validator 1.0
       
       Copyright 2012-2015 Pawel Decowski
       
       Permission is hereby granted, free of charge, to any person obtaining a copy
       of this software and associated documentation files (the "Software"), to deal
       in the Software without restriction, including without limitation the rights
       to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       copies of the Software, and to permit persons to whom the Software
       is furnished to do so, subject to the following conditions:
       The above copyright notice and this permission notice shall be included
       in all copies or substantial portions of the Software.
       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
       OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
       THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
       IN THE SOFTWARE. */var __indexOf=[].indexOf||function(item){for(var i=0,l=this.length;i<l;i++){if(i in this&&this[i]===item)return i}return-1},card,card_type,card_types,_i,_len,_ref;card_types=[{name:"amex",icon:"images/amex.png",pattern:/^3[47]/,valid_length:[15]},{name:"diners_club",icon:"images/diners_club.png",pattern:/^30[0-5]/,valid_length:[14]},{name:"diners_club",icon:"images/diners_club.png",pattern:/^36/,valid_length:[14]},{name:"jcb",icon:"images/jcb.png",pattern:/^35(2[89]|[3-8][0-9])/,valid_length:[16]},{name:"laser",pattern:/^(6304|670[69]|6771)/,valid_length:[16,17,18,19]},{name:"visa_electron",pattern:/^(4026|417500|4508|4844|491(3|7))/,valid_length:[16]},{name:"visa",icon:"images/visa.png",pattern:/^4/,valid_length:[16]},{name:"mastercard",icon:"images/mastercard.png",pattern:/^5[1-5]/,valid_length:[16]},{name:"maestro",pattern:/^(5018|5020|5038|6304|6759|676[1-3])/,valid_length:[12,13,14,15,16,17,18,19]},{name:"discover",icon:"images/discover.png",pattern:/^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,valid_length:[16]}];var options={};if(null==options.accept){options.accept=function(){var _i,_len,_results;_results=[];for(_i=0,_len=card_types.length;_i<_len;_i++){card=card_types[_i];_results.push(card.name)}return _results}()}_ref=options.accept;for(_i=0,_len=_ref.length;_i<_len;_i++){card_type=_ref[_i];if(0>__indexOf.call(function(){var _j,_len1,_results;_results=[];for(_j=0,_len1=card_types.length;_j<_len1;_j++){card=card_types[_j];_results.push(card.name)}return _results}(),card_type)){throw"Credit card type '"+card_type+"' is not supported"}}function get_card_type(number){var _j,_len1,_ref1;_ref1=function(){var _k,_len1,_ref1,_results;_results=[];for(_k=0,_len1=card_types.length;_k<_len1;_k++){card=card_types[_k];if(_ref1=card.name,0<=__indexOf.call(options.accept,_ref1)){_results.push(card)}}return _results}();for(_j=0,_len1=_ref1.length;_j<_len1;_j++){card_type=_ref1[_j];if(number.match(card_type.pattern)){return card_type}}return null};function is_valid_luhn(number){var digit,n,sum,_j,_len1,_ref1;sum=0;_ref1=number.split("").reverse();for(n=_j=0,_len1=_ref1.length;_j<_len1;n=++_j){digit=_ref1[n];digit=+digit;if(n%2){digit*=2;if(10>digit){sum+=digit}else{sum+=digit-9}}else{sum+=digit}}return 0===sum%10};function is_valid_length(number,card_type){var _ref1;return _ref1=number.length,0<=__indexOf.call(card_type.valid_length,_ref1)};function validate_number(number){var length_valid,luhn_valid;card_type=get_card_type(number);luhn_valid=!1;length_valid=!1;if(null!=card_type){luhn_valid=is_valid_luhn(number);length_valid=is_valid_length(number,card_type)}return{card_type:card_type,valid:luhn_valid&&length_valid,luhn_valid:luhn_valid,length_valid:length_valid}};function normalize(number){return number.replace(/[ -]/g,"")};function validateCcInput(input){return validate_number(normalize(input))};var ccValidator={validateCcInput:validateCcInput};_exports.$ccValidator=ccValidator;const bundledImportMeta$1=_objectSpread({},meta,{url:new URL("../../node_modules/%40polymer/gold-cc-input/gold-cc-input.js",meta.url).href});(0,_udaanApp.Polymer)({_template:_udaanApp.html$1`
    <style>
    :host {
      display: block;
    }

    /* Use a container so that when hiding the icon, the layout doesn't jump around. */
    .icon-container {
      margin-left: 10px;
      height: 24px;
      @apply --gold-cc-input-icon-container;
    }

    iron-icon {
      --iron-icon-width: 40px;
      --iron-icon-height: 24px;
    }

    .container {
      @apply --layout-horizontal;
    }

    input {
      @apply --layout-flex;
    }

    input {
      position: relative; /* to make a stacking context */
      outline: none;
      box-shadow: none;
      padding: 0;
      width: 100%;
      max-width: 100%;
      background: transparent;
      border: none;
      color: var(--paper-input-container-input-color, var(--primary-text-color));
      -webkit-appearance: none;
      text-align: inherit;
      vertical-align: bottom;
      /* Firefox sets a min-width on the input, which can cause layout issues */
      min-width: 0;
      @apply --paper-font-subhead;
      @apply --paper-input-container-input;
    }
    input::-webkit-input-placeholder {
      color: var(--paper-input-container-color, var(--secondary-text-color));
    }
    input:-moz-placeholder {
      color: var(--paper-input-container-color, var(--secondary-text-color));
    }
    input::-moz-placeholder {
      color: var(--paper-input-container-color, var(--secondary-text-color));
    }
    input:-ms-input-placeholder {
      color: var(--paper-input-container-color, var(--secondary-text-color));
    }
    </style>

    <paper-input-container
        id="container"
        disabled$="[[disabled]]"
        no-label-float="[[noLabelFloat]]"
        always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]"
        invalid="[[invalid]]">
      <label slot="label" hidden$="[[!label]]">[[label]]</label>

      <iron-input
          id="input"
          slot="input"
          allowed-pattern="[0-9 ]"
          bind-value="{{value}}"
          invalid="{{invalid}}"
          maxlength="30">
        <input
            id="nativeInput"
            aria-labelledby$="[[_ariaLabelledBy]]"
            aria-describedby$="[[_ariaDescribedBy]]"
            invalid$="{{invalid}}"
            required$="[[required]]"
            type="tel"
            prevent-invalid-input
            autocomplete="cc-number"
            name$="[[name]]"
            disabled$="[[disabled]]"
            autofocus$="[[autofocus]]"
            inputmode$="[[inputmode]]"
            placeholder$="[[placeholder]]"
            readonly$="[[readonly]]"
            size$="[[size]]">
      </iron-input>
      <div class="icon-container" slot="suffix">
        <iron-icon id="icon"></iron-icon>
      </div>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on" id="error">
          [[errorMessage]]
        </paper-input-error>
      </template>
    </paper-input-container>
  `,is:"gold-cc-input",importMeta:bundledImportMeta$1,behaviors:[_udaanApp.PaperInputBehavior,_udaanApp.IronValidatableBehavior,_udaanApp.IronFormElementBehavior],properties:{/**
     * The label for this input.
     */label:{type:String,value:"Card number"},/**
     * The type of the credit card, if it is valid. Empty otherwise.
     */cardType:{type:String,notify:!0},/**
     * A list of allowable card-types. If empty, all card-types are valid
     */cardTypes:{type:Array,observer:"_onCardTypesChanged"},value:{type:String,observer:"_onValueChanged"}},observers:["_onFocusedChanged(focused)"],ready:function(){if(!this.value){this.value=""}},/**
   * Returns a reference to the focusable element. Overridden from
   * PaperInputBehavior to correctly focus the native input.
   */get _focusableElement(){return this.inputElement._inputElement},// Note: This event is only available in the 2.0+ version of this element.
// In 1.0, the functionality of `_onIronInputReady` is done in
// PaperInputBehavior::attached.
listeners:{"iron-input-ready":"_onIronInputReady"},_onIronInputReady:function(){// Only validate when attached if the input already has a value.
if(!!this.inputElement.bindValue){this._handleAutoValidate()}},/**
   * A handler that is called when cardTypes changes
   */_onCardTypesChanged:function(cardTypes,oldValue){if(this.value)this._handleAutoValidate()},/**
   * A handler that is called on input
   */_onValueChanged:function(value,oldValue){if(oldValue==void 0)return;var start=this.$.input.selectionStart,previousCharASpace=value?" "==this.value.charAt(start-1):!1;value=value.replace(/\s+/g,"");for(var formattedValue="",i=0;i<value.length;i++){// Add a space after every 4 characters.
if(0!=i&&0==i%4){formattedValue+=" "}formattedValue+=value[i]}this.updateValueAndPreserveCaret(formattedValue.trim());// If the character right before the selection is a newly inserted
// space, we need to advance the selection to maintain the caret position.
if(!previousCharASpace&&" "==this.value.charAt(start-1)){this.$.input.selectionStart=start+1;this.$.input.selectionEnd=start+1}this._handleAutoValidate()},/**
   * Returns true if the element has a valid value, and sets the visual
   * error state.
   *
   * @return {boolean} Whether the input is currently valid or not.
   */validate:function(){// Empty, non-required input is valid.
if(!this.required&&""==this.value){return!0}var result=validateCcInput(this.value),valid=result.valid&&result.length_valid;if(valid&&this.cardTypes&&0<this.cardTypes.length){valid=-1!==this.cardTypes.indexOf(result.card_type.name)}this.cardType=valid?result.card_type.name:"";// Update the container and its addons (i.e. the custom error-message).
this.$.container.invalid=!valid;this.$.container.updateAddons({inputElement:this.$.input,value:this.value,invalid:!valid});// We don't have icons for all the card types.
if(valid&&result.card_type.icon){this.$.icon.src=this.resolveUrl(result.card_type.icon);this.$.icon.alt=this.cardType;this.$.icon.hidden=!1}else{this.$.icon.src=null;this.$.icon.alt="";this.$.icon.hidden=!0}return valid},/**
   * Overidden from Polymer.IronControlState.
   */_onFocusedChanged:function(focused){if(!this._focusableElement){return}if(!focused){this._handleAutoValidate()}}});const NeonAnimatableBehavior={properties:{/**
     * Animation configuration. See README for more info.
     */animationConfig:{type:Object},/**
     * Convenience property for setting an 'entry' animation. Do not set
     * `animationConfig.entry` manually if using this. The animated node is set
     * to `this` if using this property.
     */entryAnimation:{observer:"_entryAnimationChanged",type:String},/**
     * Convenience property for setting an 'exit' animation. Do not set
     * `animationConfig.exit` manually if using this. The animated node is set
     * to `this` if using this property.
     */exitAnimation:{observer:"_exitAnimationChanged",type:String}},_entryAnimationChanged:function(){this.animationConfig=this.animationConfig||{};this.animationConfig.entry=[{name:this.entryAnimation,node:this}]},_exitAnimationChanged:function(){this.animationConfig=this.animationConfig||{};this.animationConfig.exit=[{name:this.exitAnimation,node:this}]},_copyProperties:function(config1,config2){// shallowly copy properties from config2 to config1
for(var property in config2){config1[property]=config2[property]}},_cloneConfig:function(config){var clone={isClone:!0};this._copyProperties(clone,config);return clone},_getAnimationConfigRecursive:function(type,map,allConfigs){if(!this.animationConfig){return}if(this.animationConfig.value&&"function"===typeof this.animationConfig.value){this._warn(this._logf("playAnimation","Please put 'animationConfig' inside of your components 'properties' object instead of outside of it."));return}// type is optional
var thisConfig;if(type){thisConfig=this.animationConfig[type]}else{thisConfig=this.animationConfig}if(!Array.isArray(thisConfig)){thisConfig=[thisConfig]}// iterate animations and recurse to process configurations from child nodes
if(thisConfig){for(var config,index=0;config=thisConfig[index];index++){if(config.animatable){config.animatable._getAnimationConfigRecursive(config.type||type,map,allConfigs)}else{if(config.id){var cachedConfig=map[config.id];if(cachedConfig){// merge configurations with the same id, making a clone lazily
if(!cachedConfig.isClone){map[config.id]=this._cloneConfig(cachedConfig);cachedConfig=map[config.id]}this._copyProperties(cachedConfig,config)}else{// put any configs with an id into a map
map[config.id]=config}}else{allConfigs.push(config)}}}}},/**
   * An element implementing `NeonAnimationRunnerBehavior` calls this
   * method to configure an animation with an optional type. Elements
   * implementing `NeonAnimatableBehavior` should define the property
   * `animationConfig`, which is either a configuration object or a map of
   * animation type to array of configuration objects.
   */getAnimationConfig:function(type){var map={},allConfigs=[];this._getAnimationConfigRecursive(type,map,allConfigs);// append the configurations saved in the map to the array
for(var key in map){allConfigs.push(map[key])}return allConfigs}};_exports.NeonAnimatableBehavior=NeonAnimatableBehavior;var neonAnimatableBehavior={NeonAnimatableBehavior:NeonAnimatableBehavior};_exports.$neonAnimatableBehavior=neonAnimatableBehavior;const NeonAnimationRunnerBehaviorImpl={_configureAnimations:function(configs){var results=[],resultsToPlay=[];if(0<configs.length){for(let config,index=0,neonAnimation;config=configs[index];index++){neonAnimation=document.createElement(config.name);// is this element actually a neon animation?
if(neonAnimation.isNeonAnimation){let result=null;// Closure compiler does not work well with a try / catch here.
// .configure needs to be explicitly defined
if(!neonAnimation.configure){/**
             * @param {Object} config
             * @return {AnimationEffectReadOnly}
             */neonAnimation.configure=function(config){return null}}result=neonAnimation.configure(config);resultsToPlay.push({result:result,config:config,neonAnimation:neonAnimation})}else{console.warn(this.is+":",config.name,"not found!")}}}for(var i=0;i<resultsToPlay.length;i++){let result=resultsToPlay[i].result,config=resultsToPlay[i].config,neonAnimation=resultsToPlay[i].neonAnimation;// configuration or play could fail if polyfills aren't loaded
try{// Check if we have an Effect rather than an Animation
if("function"!=typeof result.cancel){result=document.timeline.play(result)}}catch(e){result=null;console.warn("Couldnt play","(",config.name,").",e)}if(result){results.push({neonAnimation:neonAnimation,config:config,animation:result})}}return results},_shouldComplete:function(activeEntries){for(var finished=!0,i=0;i<activeEntries.length;i++){if("finished"!=activeEntries[i].animation.playState){finished=!1;break}}return finished},_complete:function(activeEntries){for(var i=0;i<activeEntries.length;i++){activeEntries[i].neonAnimation.complete(activeEntries[i].config)}for(var i=0;i<activeEntries.length;i++){activeEntries[i].animation.cancel()}},/**
   * Plays an animation with an optional `type`.
   * @param {string=} type
   * @param {!Object=} cookie
   */playAnimation:function(type,cookie){var configs=this.getAnimationConfig(type);if(!configs){return}this._active=this._active||{};if(this._active[type]){this._complete(this._active[type]);delete this._active[type]}var activeEntries=this._configureAnimations(configs);if(0==activeEntries.length){this.fire("neon-animation-finish",cookie,{bubbles:!1});return}this._active[type]=activeEntries;for(var i=0;i<activeEntries.length;i++){activeEntries[i].animation.onfinish=function(){if(this._shouldComplete(activeEntries)){this._complete(activeEntries);delete this._active[type];this.fire("neon-animation-finish",cookie,{bubbles:!1})}}.bind(this)}},/**
   * Cancels the currently running animations.
   */cancelAnimation:function(){for(var k in this._active){var entries=this._active[k];for(var j in entries){entries[j].animation.cancel()}}this._active={}}};/** @polymerBehavior */_exports.NeonAnimationRunnerBehaviorImpl=NeonAnimationRunnerBehaviorImpl;const NeonAnimationRunnerBehavior=[NeonAnimatableBehavior,NeonAnimationRunnerBehaviorImpl];_exports.NeonAnimationRunnerBehavior=NeonAnimationRunnerBehavior;var neonAnimationRunnerBehavior={NeonAnimationRunnerBehaviorImpl:NeonAnimationRunnerBehaviorImpl,NeonAnimationRunnerBehavior:NeonAnimationRunnerBehavior};_exports.$neonAnimationRunnerBehavior=neonAnimationRunnerBehavior;const PaperDialogBehaviorImpl={hostAttributes:{role:"dialog",tabindex:"-1"},properties:{/**
     * If `modal` is true, this implies `no-cancel-on-outside-click`,
     * `no-cancel-on-esc-key` and `with-backdrop`.
     */modal:{type:Boolean,value:!1},__readied:{type:Boolean,value:!1}},observers:["_modalChanged(modal, __readied)"],listeners:{tap:"_onDialogClick"},/**
   * @return {void}
   */ready:function(){// Only now these properties can be read.
this.__prevNoCancelOnOutsideClick=this.noCancelOnOutsideClick;this.__prevNoCancelOnEscKey=this.noCancelOnEscKey;this.__prevWithBackdrop=this.withBackdrop;this.__readied=!0},_modalChanged:function(modal,readied){// modal implies noCancelOnOutsideClick, noCancelOnEscKey and withBackdrop.
// We need to wait for the element to be ready before we can read the
// properties values.
if(!readied){return}if(modal){this.__prevNoCancelOnOutsideClick=this.noCancelOnOutsideClick;this.__prevNoCancelOnEscKey=this.noCancelOnEscKey;this.__prevWithBackdrop=this.withBackdrop;this.noCancelOnOutsideClick=!0;this.noCancelOnEscKey=!0;this.withBackdrop=!0}else{// If the value was changed to false, let it false.
this.noCancelOnOutsideClick=this.noCancelOnOutsideClick&&this.__prevNoCancelOnOutsideClick;this.noCancelOnEscKey=this.noCancelOnEscKey&&this.__prevNoCancelOnEscKey;this.withBackdrop=this.withBackdrop&&this.__prevWithBackdrop}},_updateClosingReasonConfirmed:function(confirmed){this.closingReason=this.closingReason||{};this.closingReason.confirmed=confirmed},/**
   * Will dismiss the dialog if user clicked on an element with dialog-dismiss
   * or dialog-confirm attribute.
   */_onDialogClick:function(event){// Search for the element with dialog-confirm or dialog-dismiss,
// from the root target until this (excluded).
for(var path=(0,_udaanApp.dom)(event).path,i=0,l=path.indexOf(this),target;i<l;i++){target=path[i];if(target.hasAttribute&&(target.hasAttribute("dialog-dismiss")||target.hasAttribute("dialog-confirm"))){this._updateClosingReasonConfirmed(target.hasAttribute("dialog-confirm"));this.close();event.stopPropagation();break}}}};/** @polymerBehavior */_exports.PaperDialogBehaviorImpl=PaperDialogBehaviorImpl;const PaperDialogBehavior=[_udaanApp.IronOverlayBehavior,PaperDialogBehaviorImpl];_exports.PaperDialogBehavior=PaperDialogBehavior;var paperDialogBehavior={PaperDialogBehaviorImpl:PaperDialogBehaviorImpl,PaperDialogBehavior:PaperDialogBehavior};_exports.$paperDialogBehavior=paperDialogBehavior;const $_documentContainer=document.createElement("template");$_documentContainer.setAttribute("style","display: none;");$_documentContainer.innerHTML=`<dom-module id="paper-dialog-shared-styles">
  <template>
    <style>
      :host {
        display: block;
        margin: 24px 40px;

        background: var(--paper-dialog-background-color, var(--primary-background-color));
        color: var(--paper-dialog-color, var(--primary-text-color));

        @apply --paper-font-body1;
        @apply --shadow-elevation-16dp;
        @apply --paper-dialog;
      }

      :host > ::slotted(*) {
        margin-top: 20px;
        padding: 0 24px;
      }

      :host > ::slotted(.no-padding) {
        padding: 0;
      }

      
      :host > ::slotted(*:first-child) {
        margin-top: 24px;
      }

      :host > ::slotted(*:last-child) {
        margin-bottom: 24px;
      }

      /* In 1.x, this selector was \`:host > ::content h2\`. In 2.x <slot> allows
      to select direct children only, which increases the weight of this
      selector, so we have to re-define first-child/last-child margins below. */
      :host > ::slotted(h2) {
        position: relative;
        margin: 0;

        @apply --paper-font-title;
        @apply --paper-dialog-title;
      }

      /* Apply mixin again, in case it sets margin-top. */
      :host > ::slotted(h2:first-child) {
        margin-top: 24px;
        @apply --paper-dialog-title;
      }

      /* Apply mixin again, in case it sets margin-bottom. */
      :host > ::slotted(h2:last-child) {
        margin-bottom: 24px;
        @apply --paper-dialog-title;
      }

      :host > ::slotted(.paper-dialog-buttons),
      :host > ::slotted(.buttons) {
        position: relative;
        padding: 8px 8px 8px 24px;
        margin: 0;

        color: var(--paper-dialog-button-color, var(--primary-color));

        @apply --layout-horizontal;
        @apply --layout-end-justified;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer.content);(0,_udaanApp.Polymer)({_template:_udaanApp.html$1`
    <style>

      :host {
        display: block;
        @apply --layout-relative;
      }

      :host(.is-scrolled:not(:first-child))::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--divider-color);
      }

      :host(.can-scroll:not(.scrolled-to-bottom):not(:last-child))::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: var(--divider-color);
      }

      .scrollable {
        padding: 0 24px;

        @apply --layout-scroll;
        @apply --paper-dialog-scrollable;
      }

      .fit {
        @apply --layout-fit;
      }
    </style>

    <div id="scrollable" class="scrollable" on-scroll="updateScrollState">
      <slot></slot>
    </div>
`,is:"paper-dialog-scrollable",properties:{/**
     * The dialog element that implements `Polymer.PaperDialogBehavior`
     * containing this element.
     * @type {?Node}
     */dialogElement:{type:Object}},/**
   * Returns the scrolling element.
   */get scrollTarget(){return this.$.scrollable},ready:function(){this._ensureTarget();this.classList.add("no-padding")},attached:function(){this._ensureTarget();requestAnimationFrame(this.updateScrollState.bind(this))},updateScrollState:function(){this.toggleClass("is-scrolled",0<this.scrollTarget.scrollTop);this.toggleClass("can-scroll",this.scrollTarget.offsetHeight<this.scrollTarget.scrollHeight);this.toggleClass("scrolled-to-bottom",this.scrollTarget.scrollTop+this.scrollTarget.offsetHeight>=this.scrollTarget.scrollHeight)},_ensureTarget:function(){// Read parentElement instead of parentNode in order to skip shadowRoots.
this.dialogElement=this.dialogElement||this.parentElement;// Check if dialog implements paper-dialog-behavior. If not, fit
// scrollTarget to host.
if(this.dialogElement&&this.dialogElement.behaviors&&0<=this.dialogElement.behaviors.indexOf(PaperDialogBehaviorImpl)){this.dialogElement.sizingTarget=this.scrollTarget;this.scrollTarget.classList.remove("fit")}else if(this.dialogElement){this.scrollTarget.classList.add("fit")}}});(0,_udaanApp.Polymer)({_template:_udaanApp.html$1`
    <style include="paper-dialog-shared-styles"></style>
    <slot></slot>
`,is:"paper-dialog",behaviors:[PaperDialogBehavior,NeonAnimationRunnerBehavior],listeners:{"neon-animation-finish":"_onNeonAnimationFinish"},_renderOpened:function(){this.cancelAnimation();this.playAnimation("entry")},_renderClosed:function(){this.cancelAnimation();this.playAnimation("exit")},_onNeonAnimationFinish:function(){if(this.opened){this._finishRenderOpened()}else{this._finishRenderClosed()}}});class PaymentPage extends _udaanApp.PolymerElement{static get template(){return _udaanApp.html`
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
      height:30px;
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
h2{
  color:green;
}
#donationDetails{
  width:500px;
  height:420px;
}
a{
  text-decoration:none
}
  </style>
  <app-location route={{route}}></app-location>
  <ajax-call id="ajax"></ajax-call>
    <div id="cardDetails">
    <h3>Enter Card Details</h3>
            <!-- Card Number -->
            <gold-cc-input auto-validate id="card" label="Card number" error-message="Enter valid visa or mastercard!" card-types='["visa", "mastercard"]' required>
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
  <h2>ThankYou for giving Wings to some Dreams</h2>
  <h3>Your Donation Details are:</h3>
  <ul>
      <li>Donar Name:{{userName}}</li>
      <li>Scheme Name:{{schemeName}}</li>
      <li>Scheme Amount:{{schemeAmount}}</li>
      <li>Email-Id:{{emailId}}</li>
      <li>MobileNo.:{{mobileNumber}}</li>
      <li>PAN Card No.:{{panNumber}}</li>
      <li>TaxBenefitAmount:{{taxBenefitAmount}}</li>
  </ul>
  </form>
  </paper-dialog-scrollable>
  <paper-button raised dialog-dismiss>Cancel</paper-button>
  <a href="http://10.117.189.176:9090/udaan/users/{{userId}}/email"><paper-button  raised >Send Email</paper-button></a>
  <a href="http://10.117.189.176:9090/udaan/users/{{userId}}/download" download="payment details.pdf"><paper-button  raised >Download</paper-button></a>
</paper-dialog>
    `}static get properties(){return{schemeName:String,schemeAmount:String,userName:String,emailId:String,mobileNumber:String,panNumber:String,taxBenefitAmount:String,statusCode:String,userId:Number,postObj:{type:Object,value:{}}}}_handleSubmit(){this.postObj=JSON.parse(sessionStorage.getItem("donorDetails"));this.postObj.creditCardNumber=this.$.card.value;console.log(this.postObj);this.$.ajax._makeAjaxCall("post",`${baseUrl}/udaan/users`,this.postObj,"ajaxResponse")}ready(){super.ready();this.addEventListener("ajax-response",e=>this._payments(e))}_payments(event){console.log(event.detail.data);this.schemeName=event.detail.data.schemeName;this.schemeAmount=event.detail.data.schemeAmount;this.userName=event.detail.data.userName;this.emailId=event.detail.data.emailId;this.mobileNumber=event.detail.data.mobileNumber;this.panNumber=event.detail.data.panNumber;this.taxBenefitAmount=event.detail.data.taxBenefit;this.userId=event.detail.data.userId;this.$.modal.open()}}window.customElements.define("payment-page",PaymentPage)});