(function () {
    'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t$2=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$4=Symbol(),n$6=new Map;class s$3{constructor(t,n){if(this._$cssResult$=!0,n!==e$4)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n$6.get(this.cssText);return t$2&&void 0===e&&(n$6.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o$3=t=>new s$3("string"==typeof t?t:t+"",e$4),r$3=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s$3(o,e$4)},i$5=(e,n)=>{t$2?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$3(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$2;const e$3=window.trustedTypes,r$2=e$3?e$3.emptyScript:"",h$1=window.reactiveElementPolyfillSupport,o$2={toAttribute(t,i){switch(i){case Boolean:t=t?r$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$5=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:o$2,reflect:!1,hasChanged:n$5};class a$1 extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1);}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$5(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$ES(t,i,s=l$2){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$2.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null;}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:o$2.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$5)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$E_());}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU();}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$EC=void 0),this._$EU();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.elementProperties=new Map,a$1.elementStyles=[],a$1.shadowRootOptions={mode:"open"},null==h$1||h$1({ReactiveElement:a$1}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.3.2");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t$1;const i$4=globalThis.trustedTypes,s$1=i$4?i$4.createPolicy("lit-html",{createHTML:t=>t}):void 0,e$2=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+e$2,n$4=`<${o$1}>`,l$1=document,h=(t="")=>l$1.createComment(t),r$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d$1=Array.isArray,u=t=>{var i;return d$1(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v$1=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m$1=/"/g,g=/^(?:script|style|textarea|title)$/i,p$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p$1(1),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x$1=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A$1=l$1.createTreeWalker(l$1,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v$1:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m$1:_):d===m$1||d===_?d=f:d===v$1||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$4:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e$2+y):s+e$2+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$1?s$1.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A$1.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A$1.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e$2)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e$2),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M$1:"?"===i[1]?H:"@"===i[1]?I:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e$2),s=t.length-1;if(s>0){l.textContent=i$4?i$4.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A$1.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$1)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e$2,t+1));)c.push({type:7,index:r}),t+=e$2.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r$1(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A$1.currentNode=o;let n=A$1.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A$1.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r$1(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.$(t);}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t));}$(t){this._$AH!==w&&r$1(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}S(t){d$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.M(h()),this.M(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r$1(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r$1(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.C(t);}C(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M$1 extends S{constructor(){super(...arguments),this.type=3;}C(t){this.element[this.name]=t===w?void 0:t;}}const k=i$4?i$4.emptyScript:"";class H extends S{constructor(){super(...arguments),this.type=4;}C(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(t$1=globalThis.litHtmlVersions)&&void 0!==t$1?t$1:globalThis.litHtmlVersions=[]).push("2.2.5");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var l,o;class s extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=x$1(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.0");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const n$2=n=>e=>"function"==typeof e?((n,e)=>(window.customElements.define(n,e),e))(n,e):((n,e)=>{const{kind:t,elements:i}=e;return {kind:t,elements:i,finisher(e){window.customElements.define(n,e);}}})(n,e);

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const i$3=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$1(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$3(e,n)}

    /**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var n$1;null!=(null===(n$1=window.HTMLSlotElement)||void 0===n$1?void 0:n$1.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

    // Unique ID creation requires a high quality random # generator. In the browser we therefore
    // require the crypto API and do not support built-in fallback to lower quality random number
    // generators (like Math.random()).
    var getRandomValues;
    var rnds8 = new Uint8Array(16);
    function rng() {
      // lazy load so that environments that need to polyfill have a chance to do so
      if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
        // find the complete implementation of crypto (msCrypto) on IE11.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

        if (!getRandomValues) {
          throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
      }

      return getRandomValues(rnds8);
    }

    var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

    function validate(uuid) {
      return typeof uuid === 'string' && REGEX.test(uuid);
    }

    /**
     * Convert array of 16 byte values to UUID string format of the form:
     * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     */

    var byteToHex = [];

    for (var i$2 = 0; i$2 < 256; ++i$2) {
      byteToHex.push((i$2 + 0x100).toString(16).substr(1));
    }

    function stringify(arr) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // Note: Be careful editing this code!  It's been tuned for performance
      // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
      var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
      // of the following:
      // - One or more input array values don't map to a hex octet (leading to
      // "undefined" in the uuid)
      // - Invalid input values for the RFC `version` or `variant` fields

      if (!validate(uuid)) {
        throw TypeError('Stringified UUID is invalid');
      }

      return uuid;
    }

    function v4(options, buf, offset) {
      options = options || {};
      var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

      rnds[6] = rnds[6] & 0x0f | 0x40;
      rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

      if (buf) {
        offset = offset || 0;

        for (var i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }

        return buf;
      }

      return stringify(rnds);
    }

    const DEPLOYED_URL = location.origin + location.pathname;
    function sha256(plain) {
        return __awaiter(this, void 0, void 0, function* () {
            const encoder = new TextEncoder();
            const data = encoder.encode(plain);
            return window.crypto.subtle.digest("SHA-256", data);
        });
    }
    function base64urlencode(a) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }
    class SpotifyInterface {
        constructor() {
            this.clientID = "70674e9164054734bec8ba9a94600c65";
            this.tokenInfo = null;
            this.playlists = [];
            this.userId = "";
            this.pending = false;
            this.listeners = [];
            this.init();
        }
        init() {
            return __awaiter(this, void 0, void 0, function* () {
                const storedTokenInfo = localStorage.getItem("token_info");
                const storedUserId = localStorage.getItem("user_id");
                if (storedTokenInfo && storedUserId) {
                    this.tokenInfo = JSON.parse(storedTokenInfo);
                    this.userId = storedUserId;
                    this.pending = true;
                    const isValid = yield this.tokenValid();
                    if (isValid) {
                        yield this.fetchPlaylists();
                    }
                    this.pending = false;
                    for (const listener of this.listeners) {
                        listener();
                    }
                }
            });
        }
        tokenValid() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.tokenInfo.expiry > Date.now()) {
                    return true;
                }
                // Attempt a refresh.
                const res = yield this.formRequest("https://accounts.spotify.com/api/token", {
                    grant_type: "refresh_token",
                    refresh_token: this.tokenInfo.refreshToken,
                    client_id: this.clientID,
                }, this.tokenInfo.refreshToken);
                if (res.status !== 200) {
                    // Refresh failed.
                    this.tokenInfo = null;
                    return false;
                }
                // Refresh success!
                this.tokenInfo.accessToken = res.access_token;
                this.tokenInfo.expiry = Date.now() + Number(res.expires_in) * 1000;
                localStorage.setItem("token_info", JSON.stringify(this.tokenInfo));
                return true;
            });
        }
        userHasWriteAccess(item) {
            // We just arn't gonna touch collaborative playlists because i don't wanna
            // think about the implications.
            if (item.collaborative)
                return false;
            return item.owner.id === this.userId;
        }
        fetchPlaylists() {
            return __awaiter(this, void 0, void 0, function* () {
                const playlistsResponse = yield this.makeRequest(`users/${this.userId}/playlists`);
                const { items } = playlistsResponse;
                this.playlists = items.map((item) => ({
                    name: item.name,
                    uri: item.uri,
                    writable: this.userHasWriteAccess(item),
                }));
            });
        }
        formRequest(href, params, overrideAuth = null) {
            return __awaiter(this, void 0, void 0, function* () {
                const url = new URL(href);
                let formBody = [];
                for (const property in params) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(params[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                const headers = {
                    "Content-Type": "application/x-www-form-urlencoded",
                };
                if (this.tokenInfo) {
                    headers["Authorization"] = `Bearer ${overrideAuth ? overrideAuth : this.tokenInfo.accessToken}`;
                }
                const r = yield fetch(url.href, {
                    method: "POST",
                    headers,
                    body: formBody.join("&"),
                });
                return r.json();
            });
        }
        makeRequest(endpoint, queryParams = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!this.tokenInfo) {
                    throw new Error("Attempted to make web request without tokens available.");
                }
                if (!(yield this.tokenValid())) {
                    throw new Error("Token is invalid now.");
                }
                const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
                for (const k of Object.keys(queryParams)) {
                    url.searchParams.set(k, queryParams[k]);
                }
                const r = yield fetch(url.href, {
                    headers: {
                        Authorization: `Bearer ${this.tokenInfo.accessToken}`,
                    },
                });
                return r.json();
            });
        }
        startLogin() {
            return __awaiter(this, void 0, void 0, function* () {
                const state = v4();
                const code_verifier = `${v4()}-${v4()}`;
                const hashed = yield sha256(code_verifier);
                const challange = base64urlencode(hashed);
                const url = new URL("https://accounts.spotify.com/authorize");
                url.searchParams.set("response_type", "code");
                url.searchParams.set("client_id", this.clientID);
                url.searchParams.set("scope", "playlist-read-private playlist-modify-private user-read-email user-library-read user-library-modify");
                url.searchParams.set("redirect_uri", DEPLOYED_URL);
                url.searchParams.set("state", state);
                url.searchParams.set("code_challenge_method", "S256");
                url.searchParams.set("code_challenge", challange);
                localStorage.setItem("login-in-progress", JSON.stringify({ state, code_verifier }));
                window.location.href = url.href;
            });
        }
        connectionState() {
            let pendingLogin;
            try {
                this.getPendingLogin();
                pendingLogin = true;
            }
            catch (e) {
                pendingLogin = false;
            }
            if (pendingLogin) {
                return "pending-login";
            }
            else if (this.pending) {
                return "pending-data";
            }
            else if (this.tokenInfo === null) {
                return "unconnected";
            }
            return "connected";
        }
        getPendingLogin() {
            const pendingLogin = localStorage.getItem("login-in-progress");
            if (!pendingLogin) {
                throw new Error("Attemped to complete a non pending login.");
            }
            return JSON.parse(pendingLogin);
        }
        completeLogin(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const pendingLogin = this.getPendingLogin();
                const { code_verifier, state } = pendingLogin;
                const code = params.get("code");
                if (state !== params.get("state")) {
                    throw new Error("Returned state does not match last login request. Aborting due to CSRF Risk.");
                }
                const res = yield this.formRequest("https://accounts.spotify.com/api/token", {
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: DEPLOYED_URL,
                    client_id: this.clientID,
                    code_verifier,
                });
                localStorage.removeItem("login-in-progress");
                this.tokenInfo = {
                    accessToken: res.access_token,
                    refreshToken: res.refresh_token,
                    expiry: Date.now() + Number(res.expires_in) * 1000,
                };
                const me = yield this.makeRequest("me");
                this.userId = me.id;
                localStorage.setItem("token_info", JSON.stringify(this.tokenInfo));
                localStorage.setItem("user_id", this.userId);
                // This will notify listeners.
                yield this.fetchPlaylists();
                for (const listener of this.listeners) {
                    listener();
                }
            });
        }
        getAllPlaylists() {
            return [
                ...this.playlists,
                {
                    name: "Liked Songs",
                    uri: "__LIKED__",
                    writable: true,
                },
            ];
        }
        onStateChange(callback) {
            this.listeners.push(callback);
        }
        getAllLikedSongs() {
            return __awaiter(this, void 0, void 0, function* () {
                const r = yield this.makeRequest("me/tracks");
                return r.items.map((item) => item.track);
            });
        }
        getAllSongsInPlaylist(playlistURI) {
            return __awaiter(this, void 0, void 0, function* () {
                if (playlistURI === "__LIKED__") {
                    return this.getAllLikedSongs();
                }
                const playlistId = playlistURI.split(":")[2];
                const r = yield this.makeRequest(`playlists/${playlistId}/tracks`, {
                    fields: "items(track(uri,preview_url,name,artists(name),album(name, images)))",
                });
                return r.items.map((item) => item.track);
            });
        }
        playlistUIDToName(playlistURI) {
            return this.playlists.find((s) => s.uri === playlistURI).name;
        }
        addSongToPlaylist(songURI, playlistURI) {
            if (playlistURI === "__LIKED__") {
                // TODO.
                return;
            }
            // TODO.
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class i$1{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

    /**
     * @license
     * Copyright 2018 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */const i=e(class extends i$1{constructor(t$1){var e;if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||(null===(e=t$1.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ct){this.ct=new Set;for(const t in r)this.ct.add(t);return this.render(r)}this.ct.forEach((t=>{null==r[t]&&(this.ct.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];null!=e&&(this.ct.add(t),t.includes("-")?s.setProperty(t,e):s[t]=e);}return b}});

    function n(n,r,t){return {r:255*t(n.r/255,r.r/255),g:255*t(n.g/255,r.g/255),b:255*t(n.b/255,r.b/255)}}function r(n,r){return r}function M(n,r,t){return Math.min(Math.max(n||0,r),t)}function m(n){return {r:M(n.r,0,255),g:M(n.g,0,255),b:M(n.b,0,255),a:M(n.a,0,1)}}function d(n){return {r:255*n.r,g:255*n.g,b:255*n.b,a:n.a}}function p(n){return {r:n.r/255,g:n.g/255,b:n.b/255,a:n.a}}function v(n,r){void 0===r&&(r=0);var t=Math.pow(10,r);return {r:Math.round(n.r*t)/t,g:Math.round(n.g*t)/t,b:Math.round(n.b*t)/t,a:n.a}}function x(n,r,t,u,i,o){return (1-r/t)*u+r/t*Math.round((1-n)*i+n*o)}function O(n,r,t,u,i){void 0===i&&(i={unitInput:!1,unitOutput:!1,roundOutput:!0}),i.unitInput&&(n=d(n),r=d(r)),n=m(n);var o=(r=m(r)).a+n.a-r.a*n.a,e=t(n,r,u),c=m({r:x(n.a,r.a,o,n.r,r.r,e.r),g:x(n.a,r.a,o,n.g,r.g,e.g),b:x(n.a,r.a,o,n.b,r.b,e.b),a:o});return c=i.unitOutput?p(c):i.roundOutput?v(c):function(n){return v(n,9)}(c),c}function A(t,u){return O(t,u,n,r)}

    const CARD_SIZE = 250;
    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     *
     * Credit: https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
     */
    function HSLToRGB(h, s, l) {
        h = h / 360;
        s = s / 100;
        l = l / 100;
        var r, g, b;
        if (s == 0) {
            r = g = b = l; // achromatic
        }
        else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255),
        };
    }
    // https://css-tricks.com/converting-color-spaces-in-javascript/
    function RGBToHSL(r, g, b) {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;
        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;
        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        return { h, s, l };
    }
    let AppView = class AppView extends s {
        constructor() {
            super(...arguments);
            this.spotifyInterface = new SpotifyInterface();
            this.currentGesture = null;
            this.currentAlbumColorComputeToken = 0;
            this.currentAudioTrack = null;
            this.enablePlayback = true;
            this.lastResizeEvent = 0;
            this.appState = null;
        }
        static get styles() {
            return r$3 `
      :host {
        width: 100vw;
        height: 100vh;
        display: block;
        position: relative;
        --card-size: ${CARD_SIZE}px;
      }
      @keyframes move-1 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-1);
        }
      }
      @keyframes move-2 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-2);
        }
      }
      @keyframes move-3 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-3);
        }
      }
      @keyframes move-4 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-4);
        }
      }
      @keyframes move-5 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-5);
        }
      }
      @keyframes move-6 {
        from {
          transform: translate(0, 0);
        }
        to {
          transform: var(--rand-translate-6);
        }
      }
      @keyframes pulse {
        from {
          opacity: 1;
        }
        to {
          opacity: 0.2;
        }
      }
      #background {
        background: var(--bg-color);
        transition: all 0.4s;
      }
      #background > path:nth-child(1) {
        animation: move-1 30s ease-in-out infinite alternate;
      }
      #background > path:nth-child(2) {
        animation: move-2 30s ease-in-out infinite alternate;
      }
      #background > path:nth-child(3) {
        animation: move-3 30s ease-in-out infinite alternate;
      }
      #background > path:nth-child(4) {
        animation: move-4 30s ease-in-out infinite alternate;
      }
      #background > path:nth-child(5) {
        animation: move-5 30s ease-in-out infinite alternate;
      }
      #background > g {
        animation: move-6 30s ease-in-out infinite alternate;
      }

      #background > * {
        transform-origin: center;
      }
      #background path {
        fill: var(--album-color);
        transition: fill 0.4s;
      }

      button {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      #content {
        width: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
        height: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      #background {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
      }

      .spotify-connecting-graphic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      .spotify-connecting-graphic .dot {
        width: 16px;
        height: 16px;
        background: white;
        border-radius: 50%;
        margin: 0 1rem;
        animation: pulse 1s infinite alternate;
      }
      .spotify-connecting-graphic .dot:nth-of-type(2) {
        animation-delay: 0.2s;
      }
      .spotify-connecting-graphic .dot:nth-of-type(3) {
        animation-delay: 0.4s;
      }
      .spotify-connecting-graphic svg {
        width: 72px;
        fill: white;
        margin-right: 1.5rem;
      }
      .spotify-connecting-graphic img {
        width: 72px;
        margin-left: 1.5rem;
      }
      .title {
        color: white;
        font-size: 3rem;
        margin: 0;
        padding-bottom: 1rem;
      }
      .subtitle {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1rem;
        padding-bottom: 2rem;
        text-align: center;
      }
      .action-btn {
        padding: 0.5rem 1rem;
        padding-left: 0.7rem;
        background: white;
        color: rgb(43, 50, 65);
        border: none;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: all 200ms ease-in-out;
      }
      .action-btn[disabled] {
        opacity: 0.5;
      }
      .action-btn:hover {
        transform: scale(1.05);
        transition: all 200ms ease-in-out;
      }
      .action-btn[disabled]:hover {
        transform: scale(1);
      }
      .action-btn svg {
        min-width: 14px;
        width: 14px;
        fill: rgb(43, 50, 65);
        margin-right: 0.5rem;
      }
      .action-btn span {
        overflow: hidden;
        white-space: nowrap;
      }
      fieldset {
        width: calc(100% - 4rem);
        border-color: rgba(255, 255, 255, 0.7);
        outline: none;
        border-style: solid;
        border-radius: 8px;
        margin-bottom: 1.5rem;
      }
      fieldset select {
        width: 100%;
        background: none;
        color: white;
        border: none;
        outline: none;
        font-size: 0.9rem;
        font-weight: 600;
      }
      fieldset legend {
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.7rem;
        padding: 0 0.5rem;
      }

      .card-container {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        position: relative;
        touch-action: none;
      }
      .card-container .card {
        position: absolute;
        width: var(--card-size);
        height: var(--card-size);
        background-size: contain;
        border-radius: 12px;
        cursor: pointer;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-direction: column;
      }
      .card-container .card.animated {
        transition: transform 0.15s linear;
      }
      .card-container .card.front {
        z-index: 3;
      }
      .card-container .card.back {
        z-index: 2;
      }
      .card .song-name {
        margin: 0;
        margin-bottom: 0.25rem;
        font-weight: 600;
        color: white;
        font-size: 1.2rem;
        width: 100%;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .card .album-artists {
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.8rem;
        width: 100%;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      #hidden-canvas {
        position: absolute;
        left: -1000px;
        opacity: 0;
        pointer-events: none;
      }
      .controls {
        display: flex;
        padding-bottom: 2rem;
        height: 200px;
        width: 100%;
        align-items: center;
        justify-content: center;
      }
      .controls .col {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding: 0 0.5rem;
        width: 33%;
        box-sizing: border-box;
      }
      .controls .col:first-child {
        align-items: flex-end;
      }
      .controls .col:last-child {
        align-items: flex-start;
      }
      .controls .col:last-child button svg {
        margin-left: 0.5rem;
        margin-right: 0rem;
      }
      .controls .col > button {
        font-size: 0.75rem;
        width: 100%;
        justify-content: center;
      }
      .controls button.info {
        background-color: var(--surface-color);
        color: white;
      }
      .controls button.info svg {
        fill: white;
      }
      .controls button .overflow-container {
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      }
      .controls button .overflow-container.scrolling {
        justify-content: flex-start;
      }

      .controls button .overflow-container.scrolling:before {
        content: "";
        position: absolute;
        left: 0;
        height: 100%;
        width: 4px;
        background: linear-gradient(90deg, var(--surface-color), transparent);
        z-index: 2;
      }
      .controls button .overflow-container.scrolling:after {
        content: "";
        position: absolute;
        right: 0;
        height: 100%;
        width: 4px;
        background: linear-gradient(-90deg, var(--surface-color), transparent);
        z-index: 2;
      }
      .controls button .overflow-container .text {
        position: absolute;
      }
      .controls button .overflow-container .text.marquee {
        padding-left: 4px;
      }
      #playback-status svg,
      #playback-status .overflow-container {
        display: none;
      }
      #playback-status.started .started-view {
        display: flex;
      }
      #playback-status.error .error-view {
        display: flex;
      }
      #playback-status.stopped .stopped-view {
        display: flex;
      }

      @keyframes marquee {
        0% {
          transform: translateX(0%);
        }
        20% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      .marquee {
        animation: marquee 8s infinite linear;
      }
    `;
        }
        connectSpotifyView() {
            return $ `
      <h1 class="title">Sortify</h1>
      <p class="subtitle">Sort your songs into playlists with a simple swipe</p>
      <button
        class="action-btn"
        @click=${() => this.spotifyInterface.startLogin()}
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        Connect Spotify
      </button>
    `;
        }
        spotifyPendingView() {
            return $ `
      <div class="spotify-connecting-graphic">
        <svg viewBox="0 0 24 24">
          <path
            d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
          />
        </svg>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <img src="logo.svg" />
      </div>
    `;
        }
        setupView() {
            const playlists = this.spotifyInterface.getAllPlaylists();
            const writablePlaylists = playlists.filter((pl) => pl.writable);
            return $ `
      <h1 class="title">Sortify</h1>
      <fieldset>
        <legend>Pick where to source songs from</legend>
        <select name="source" id="source">
          ${playlists.map((pl) => $ ` <option value=${pl.uri}>${pl.name}</option> `)}
        </select>
      </fieldset>
      <fieldset>
        <legend>Pick where songs go when you swipe them UP</legend>
        <select name="sink-up" id="sink-up">
          ${writablePlaylists.map((pl) => $ ` <option value=${pl.uri}>${pl.name}</option> `)}
        </select>
      </fieldset>
      <fieldset>
        <legend>Pick where songs go when you swipe them LEFT</legend>
        <select name="sink-left" id="sink-left">
          ${writablePlaylists.map((pl) => $ ` <option value=${pl.uri}>${pl.name}</option> `)}
        </select>
      </fieldset>
      <fieldset>
        <legend>Pick where songs go when you swipe them RIGHT</legend>
        <select name="sink-right" id="sink-right">
          ${writablePlaylists.map((pl) => $ ` <option value=${pl.uri}>${pl.name}</option> `)}
        </select>
      </fieldset>
      <button
        id="start-sorting-btn"
        class="action-btn"
        disabled
        @click=${() => this.startSorting()}
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59"
          />
        </svg>
        Start Sorting
      </button>
    `;
        }
        onCardPick(e) {
            if (this.currentGesture)
                return;
            this.currentGesture = {
                startPos: {
                    x: e.clientX,
                    y: e.clientY,
                },
                startTime: Date.now(),
            };
            const frontCard = this.renderRoot.querySelector(".card.front");
            frontCard.classList.remove("animated");
        }
        onCardDrag(e) {
            if (!this.currentGesture)
                return;
            const frontCard = this.renderRoot.querySelector(".card.front");
            const delta = {
                x: e.clientX - this.currentGesture.startPos.x,
                y: e.clientY - this.currentGesture.startPos.y,
            };
            frontCard.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
        }
        commitFrontCard(bucket) {
            this.appState.queue.pop();
            const { queue } = this.appState;
            let front, back;
            if (queue.length === 0) {
                // Let sort view take over.
                this.requestUpdate();
                return;
            }
            else if (queue.length === 1) {
                front = queue[queue.length - 1];
                back = null;
            }
            else {
                front = queue[queue.length - 1];
                back = queue[queue.length - 2];
            }
            this.setAlbumColor(front.album.images[0]);
            this.playbackSong(front.preview_url);
            const oldFrontCard = this.renderRoot.querySelector(".card.front");
            const oldBackCard = this.renderRoot.querySelector(".card.back");
            oldBackCard.classList.remove("back");
            oldBackCard.classList.add("front");
            requestAnimationFrame(() => {
                if (!back) {
                    oldFrontCard.remove();
                }
                else {
                    oldFrontCard.classList.remove("front");
                    oldFrontCard.classList.add("back");
                    oldFrontCard.style.transform = `translate(0px, 0px)`;
                    oldFrontCard.classList.remove("animated");
                    oldFrontCard.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .75)), url(${back.album.images[0].url})`;
                    oldFrontCard.querySelector(".song-name").innerText =
                        back.name;
                    oldFrontCard.querySelector(".album-artists").innerText = `${back.album.name} - ${back.artists
                    .map((a) => a.name)
                    .join(", ")}`;
                }
            });
        }
        onCardDrop(e) {
            if (!this.currentGesture)
                return;
            const frontCard = this.renderRoot.querySelector(".card.front");
            const bb = frontCard.getBoundingClientRect();
            // In px per ms.
            const deltaTime = Date.now() - this.currentGesture.startTime;
            const velocity = {
                x: (e.clientX - this.currentGesture.startPos.x) / deltaTime,
                y: (e.clientY - this.currentGesture.startPos.y) / deltaTime,
            };
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            let finalX, finalY;
            if (velocity.y < -1 || bb.y < CARD_SIZE * -0.25) {
                console.log("UP");
                finalX = 0;
                finalY = -winHeight;
                window.setTimeout(() => this.commitFrontCard("top"), 250);
            }
            else if (velocity.x < -1 || bb.x < CARD_SIZE * -0.25) {
                console.log("LEFT");
                finalX = -winWidth;
                finalY = 0;
                window.setTimeout(() => this.commitFrontCard("left"), 250);
            }
            else if (velocity.x > 1 ||
                bb.x + CARD_SIZE > winWidth + CARD_SIZE * 0.25) {
                console.log("RIGHT");
                finalX = winWidth;
                finalY = 0;
                window.setTimeout(() => this.commitFrontCard("right"), 250);
            }
            else if (velocity.y > 1 ||
                bb.y + CARD_SIZE > winHeight + CARD_SIZE * 0.25) {
                console.log("BOTTOM");
                finalX = 0;
                finalY = winHeight;
                window.setTimeout(() => this.commitFrontCard("bottom"), 250);
            }
            else {
                finalX = 0;
                finalY = 0;
            }
            this.currentGesture = null;
            frontCard.classList.add("animated");
            frontCard.style.transform = `translate(${finalX}px, ${finalY}px)`;
        }
        playbackSong(previewUrl) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                (_a = this.currentAudioTrack) === null || _a === void 0 ? void 0 : _a.pause();
                if (!previewUrl) {
                    this.currentAudioTrack = null;
                    this.updatePlaybackButton();
                    return;
                }
                this.currentAudioTrack = new Audio(previewUrl);
                this.currentAudioTrack.volume = 0.5;
                this.currentAudioTrack.loop = true;
                if (this.enablePlayback) {
                    this.currentAudioTrack.play();
                }
                this.updatePlaybackButton();
            });
        }
        setAlbumColor(image) {
            return __awaiter(this, void 0, void 0, function* () {
                this.currentAlbumColorComputeToken++;
                const token = this.currentAlbumColorComputeToken;
                // Get image.
                const img = new Image(image.width, image.height);
                img.src = image.url;
                img.crossOrigin = "Anonymous";
                yield new Promise((resolve) => {
                    img.onload = resolve;
                });
                // Render to Canvas.
                const canvas = this.renderRoot.querySelector("#hidden-canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                // Get image data.
                const pixels = ctx.getImageData(0, 0, image.width, image.height);
                const totalPixels = pixels.width * pixels.height;
                const cumulativeValue = {
                    r: 0,
                    g: 0,
                    b: 0,
                };
                const { data } = pixels;
                for (let i = 0; i < totalPixels; i++) {
                    cumulativeValue.r += data[i * 4];
                    cumulativeValue.g += data[i * 4 + 1];
                    cumulativeValue.b += data[i * 4 + 2];
                }
                const avgColor = {
                    r: Math.floor(cumulativeValue.r / totalPixels),
                    g: Math.floor(cumulativeValue.g / totalPixels),
                    b: Math.floor(cumulativeValue.b / totalPixels),
                };
                if (token < this.currentAlbumColorComputeToken) {
                    // Another call to this function has happened, ignore this one.
                    return;
                }
                let albumColorHsl = RGBToHSL(avgColor.r, avgColor.g, avgColor.b);
                let bgColor;
                if (albumColorHsl.l < 20) {
                    // Album color is dark, swap bg and album so we always have a dark
                    // background.
                    bgColor = Object.assign({}, albumColorHsl);
                    albumColorHsl.l = 85;
                }
                else {
                    bgColor = Object.assign(Object.assign({}, albumColorHsl), { l: 10 });
                }
                const albumColorRGB = HSLToRGB(albumColorHsl.h, albumColorHsl.s, albumColorHsl.l);
                this.style.setProperty("--album-color", `hsl(${albumColorHsl.h}, ${albumColorHsl.s}%, ${albumColorHsl.l}%)`);
                const surfaceColor = A(Object.assign(Object.assign({}, albumColorRGB), { a: 1 }), { r: 0, g: 0, b: 0, a: 0.4 });
                this.style.setProperty("--surface-color", `rgb(${surfaceColor.r}, ${surfaceColor.g}, ${surfaceColor.b})`);
                this.style.setProperty("--bg-color", `hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%)`);
            });
        }
        renderCard(song, stackingOrder) {
            const cardStyles = {
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .75)), url(${song.album.images[0].url})`,
            };
            return $ `
      <div
        @pointerdown=${(e) => this.onCardPick(e)}
        class="card ${stackingOrder}"
        style=${i(cardStyles)}
      >
        <p class="song-name">${song.name}</p>
        <p class="album-artists">
          ${song.album.name} - ${song.artists.map((a) => a.name).join(", ")}
        </p>
      </div>
    `;
        }
        togglePlayback() {
            if (!this.currentAudioTrack)
                return;
            this.enablePlayback = !this.enablePlayback;
            if (this.enablePlayback) {
                this.currentAudioTrack.play();
            }
            else {
                this.currentAudioTrack.pause();
            }
            this.updatePlaybackButton();
        }
        sortView() {
            const { queue } = this.appState;
            let front, back;
            if (queue.length === 0) {
                this.appState = null;
                // TODO: Have a nice "done" screen then a redirect.
                return $ `done!`;
            }
            else if (queue.length === 1) {
                front = this.renderCard(queue[queue.length - 1], "front");
                back = null;
            }
            else {
                front = this.renderCard(queue[queue.length - 1], "front");
                back = this.renderCard(queue[queue.length - 2], "back");
            }
            const frontSong = queue[queue.length - 1];
            this.setAlbumColor(frontSong.album.images[0]);
            this.playbackSong(frontSong.preview_url);
            return $ `
      <div class="card-container">${front} ${back}</div>
      <div class="controls">
        <div class="col">
          <button
            class="action-btn info"
            @click=${() => this.programaticSwipe("left")}
          >
            <svg viewBox="0 0 48 48">
              <path
                d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"
              />
            </svg>
            <div class="overflow-container">
              <div class="text">
                ${this.spotifyInterface.playlistUIDToName(this.appState.sinkLeft)}
              </div>
            </div>
            </span>
          </button>
        </div>
        <div class="col">
          <button
            class="action-btn info"
            @click=${() => this.programaticSwipe("top")}
          >
            <svg viewBox="0 0 48 48">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z"
              />
            </svg>
            <div class="overflow-container">
              <div class="text">
                ${this.spotifyInterface.playlistUIDToName(this.appState.sinkUp)}
              </div>
            </div>
          </button>
          <button
            id="playback-status"
            class=${"action-btn " + (this.currentAudioTrack ? "started" : "error")}
            @click=${() => this.togglePlayback()}
          >
            <svg class="started-view" viewBox="0 0 48 48 ">
              <path
                d="M19.65 42q-3.15 0-5.325-2.175Q12.15 37.65 12.15 34.5q0-3.15 2.175-5.325Q16.5 27 19.65 27q1.4 0 2.525.4t1.975 1.1V6h11.7v6.75h-8.7V34.5q0 3.15-2.175 5.325Q22.8 42 19.65 42Z"
              />
            </svg>
            <svg class="stopped-view" viewBox="0 0 48 48">
              <path
                d="M19.65 42q-3.15 0-5.325-2.175Q12.15 37.65 12.15 34.5q0-3.15 2.175-5.325Q16.5 27 19.65 27q1.4 0 2.525.4t1.975 1.1V6h11.7v6.75h-8.7V34.5q0 3.15-2.175 5.325Q22.8 42 19.65 42Z"
              />
            </svg>
            <svg class="error-view" viewBox="0 0 48 48">
              <path
                d="M22.65 34H25.65V22H22.65ZM24 18.3Q24.7 18.3 25.175 17.85Q25.65 17.4 25.65 16.7Q25.65 16 25.175 15.5Q24.7 15 24 15Q23.3 15 22.825 15.5Q22.35 16 22.35 16.7Q22.35 17.4 22.825 17.85Q23.3 18.3 24 18.3ZM24 44Q19.75 44 16.1 42.475Q12.45 40.95 9.75 38.25Q7.05 35.55 5.525 31.9Q4 28.25 4 24Q4 19.8 5.525 16.15Q7.05 12.5 9.75 9.8Q12.45 7.1 16.1 5.55Q19.75 4 24 4Q28.2 4 31.85 5.55Q35.5 7.1 38.2 9.8Q40.9 12.5 42.45 16.15Q44 19.8 44 24Q44 28.25 42.45 31.9Q40.9 35.55 38.2 38.25Q35.5 40.95 31.85 42.475Q28.2 44 24 44Z"
              />
            </svg>
            
            <div class="overflow-container started-view">
              <div class="text">Stop</div>
            </div>
            <div class="overflow-container stopped-view">
              <div class="text">Start</div>
            </div>
            <div class="overflow-container error-view">
              <div class="text">Missing</div>
            </div>
          </button>
          <button
            class="action-btn info"
            @click=${() => this.programaticSwipe("bottom")}
          >
            <svg viewBox="0 0 48 48">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"
              />
            </svg>
            <div class="overflow-container">
              <div class="text">Skip Track</div>
            </div>
          </button>
        </div>
        <div class="col">
          <button
            class="action-btn info"
            @click=${() => this.programaticSwipe("right")}
          >
            <div class="overflow-container">
              <div class="text">
                ${this.spotifyInterface.playlistUIDToName(this.appState.sinkRight)}
              </div>
            </div>
            <svg viewBox="0 0 48 48">
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <canvas id="hidden-canvas"></canvas>
    `;
        }
        startSorting() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.renderRoot
                    .querySelector("#start-sorting-btn")
                    .hasAttribute("disabled")) {
                    return;
                }
                const getSelect = (id) => this.renderRoot.querySelector(`#${id}`);
                const source = getSelect("source").value;
                this.appState = {
                    source,
                    sinkUp: getSelect("sink-up").value,
                    sinkRight: getSelect("sink-right").value,
                    sinkLeft: getSelect("sink-left").value,
                    queue: yield this.spotifyInterface.getAllSongsInPlaylist(source),
                };
                localStorage.setItem("app-state", JSON.stringify(this.appState));
            });
        }
        updateSetupViewValidity() {
            const getSelect = (id) => this.renderRoot.querySelector(`#${id}`);
            const btn = this.renderRoot.querySelector("#start-sorting-btn");
            const selections = [
                getSelect("source").value,
                getSelect("sink-up").value,
                getSelect("sink-right").value,
                getSelect("sink-left").value,
            ];
            if (new Set(selections).size !== selections.length) {
                btn.setAttribute("disabled", "");
            }
            else {
                btn.removeAttribute("disabled");
            }
        }
        updatePlaybackButton() {
            const btn = this.renderRoot.querySelector("#playback-status");
            if (!btn)
                return;
            btn.classList.remove("started");
            btn.classList.remove("stopped");
            btn.classList.remove("error");
            if (!this.currentAudioTrack) {
                btn.classList.add("error");
            }
            else if (this.enablePlayback) {
                btn.classList.add("started");
            }
            else {
                btn.classList.add("stopped");
            }
        }
        firstUpdated() {
            this.style.setProperty("--album-color", "#617193");
            this.style.setProperty("--surface-color", "#555B67");
            this.style.setProperty("--bg-color", "#2B3241");
            const numPaths = 6;
            for (let i = 0; i < numPaths; i++) {
                const x = Math.random() * 150 - 75;
                const y = Math.random() * 300 - 150;
                const d = Math.random() * 20 - 10;
                this.style.setProperty(`--rand-translate-${i + 1}`, `translate(${x}px,${y}px) rotate(${d}deg)`);
            }
            this.spotifyInterface.onStateChange(() => {
                this.requestUpdate();
            });
            const params = new URLSearchParams(document.location.search);
            if (params.has("code") &&
                params.has("state") &&
                this.spotifyInterface.connectionState() === "pending-login") {
                this.spotifyInterface.completeLogin(params);
            }
            this.onResize();
        }
        activateOverflowScrollRegions() {
            const elements = Array.from(this.renderRoot.querySelectorAll(".overflow-container .text"));
            for (const element of elements) {
                const parent = element.parentElement;
                const parentDim = parent.getBoundingClientRect();
                const elementDim = element.getBoundingClientRect();
                if (parentDim.width < elementDim.width) {
                    parent.classList.add("scrolling");
                    element.classList.add("marquee");
                }
                else {
                    parent.classList.remove("scrolling");
                    element.classList.remove("marquee");
                }
            }
        }
        programaticSwipe(bucket) {
            let finalX = null;
            let finalY = null;
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            if (bucket === "left") {
                window.setTimeout(() => this.commitFrontCard("left"), 250);
                finalX = -winWidth;
                finalY = 0;
            }
            else if (bucket === "right") {
                window.setTimeout(() => this.commitFrontCard("right"), 250);
                finalX = winWidth;
                finalY = 0;
            }
            else if (bucket === "top") {
                window.setTimeout(() => this.commitFrontCard("top"), 250);
                finalX = 0;
                finalY = -winHeight;
            }
            else {
                window.setTimeout(() => this.commitFrontCard("bottom"), 250);
                finalX = 0;
                finalY = winHeight;
            }
            const frontCard = this.renderRoot.querySelector(".card.front");
            frontCard.classList.add("animated");
            frontCard.style.transform = `translate(${finalX}px, ${finalY}px)`;
        }
        onKeyUp(e) {
            if (!this.appState) {
                // No sort in progress.
                return;
            }
            if (e.key === "ArrowLeft") {
                this.programaticSwipe("left");
            }
            else if (e.key === "ArrowRight") {
                this.programaticSwipe("right");
            }
            else if (e.key === "ArrowUp") {
                this.programaticSwipe("top");
            }
            else if (e.key === "ArrowDown") {
                this.programaticSwipe("bottom");
            }
        }
        onResize() {
            if (Date.now() - this.lastResizeEvent < 200) {
                // Throttle resize events so we only handle 1 every 200ms.
                return;
            }
            this.lastResizeEvent = Date.now();
            this.activateOverflowScrollRegions();
        }
        connectedCallback() {
            super.connectedCallback();
            // We never detach these so uh...never detach and reattach app-view!
            document.body.addEventListener("pointermove", (e) => {
                this.onCardDrag(e);
            });
            document.body.addEventListener("pointerup", (e) => {
                this.onCardDrop(e);
            });
            document.body.addEventListener("keyup", (e) => this.onKeyUp(e));
            window.addEventListener("resize", () => this.onResize());
        }
        render() {
            const state = this.spotifyInterface.connectionState();
            let content;
            const storedAppState = localStorage.getItem("app-state");
            if (state === "pending-login" || state === "pending-data") {
                content = this.spotifyPendingView();
            }
            else if (state === "unconnected") {
                content = this.connectSpotifyView();
            }
            else if (!this.appState && !storedAppState) {
                content = this.setupView();
            }
            else {
                if (!this.appState && storedAppState) {
                    this.appState = JSON.parse(storedAppState);
                }
                content = this.sortView();
                requestAnimationFrame(() => this.activateOverflowScrollRegions());
            }
            return $ `
      <svg
        id="background"
        xmlns="http://www.w3.org/2000/svg"
        width="375"
        height="604"
        viewBox="0 0 375 604"
        fill="none"
      >
        <path
          d="M428.242 98.6703C467.689 158.266 498.622 232.051 474.5 285.403C450.094 338.755 370.917 371.959 313.876 358.904C257.118 346.134 222.496 287.39 193.833 231.483C165.17 175.577 142.751 122.509 160.062 75.6834C177.373 29.1421 234.415 -11.4397 287.483 -8.88559C340.268 -6.3315 388.512 39.0747 428.242 98.6703Z"
        />
        <path
          d="M46.9848 28.5995C39.0715 40.5549 32.8661 55.3568 37.7052 66.0596C42.6012 76.7625 58.4847 83.4234 69.9277 80.8046C81.3137 78.2427 88.2592 66.4582 94.0092 55.2429C99.7591 44.0276 104.257 33.3817 100.784 23.9882C97.3111 14.6516 85.8682 6.51058 75.2222 7.02295C64.6332 7.53532 54.9551 16.6442 46.9848 28.5995Z"
        />
        <path
          d="M134.326 458.472C130.489 464.269 127.481 471.446 129.827 476.635C132.201 481.824 139.902 485.054 145.45 483.784C150.97 482.542 154.338 476.828 157.126 471.39C159.914 465.953 162.094 460.791 160.41 456.237C158.727 451.71 153.179 447.763 148.017 448.011C142.883 448.26 138.19 452.676 134.326 458.472Z"
        />
        <path
          d="M62.8931 252.113C66.0631 257.876 65.5444 265.542 62.0862 273.611C58.628 281.738 52.2879 290.268 41.0487 293.093C29.8096 295.859 13.6712 292.977 8.25338 283.698C2.77788 274.418 8.02284 258.856 16.0344 250.268C24.1035 241.738 34.9969 240.182 43.873 241.335C52.8067 242.487 59.7231 246.349 62.8931 252.113Z"
        />
        <path
          d="M118.037 384.728C128.514 403.778 126.799 429.114 115.37 455.783C103.94 482.643 82.9855 510.836 45.8391 520.17C8.69262 529.314 -44.6459 519.789 -62.5524 489.12C-80.6494 458.45 -63.3144 407.016 -36.8356 378.633C-10.1664 350.439 25.8371 345.296 55.1733 349.106C84.7 352.916 107.559 365.679 118.037 384.728Z"
        />
        <g>
          <path
            d="M409.211 380.486C379.728 354.489 197 407 194 413C223.5 431 300.046 423.982 343.277 420.967C377.54 418.305 438.695 406.483 409.211 380.486Z"
          />
          <path
            d="M406.38 453.845C386.751 419.789 255.694 416.403 192.619 418.967C202.67 434.4 289.039 460.174 330.967 471.132C364.284 479.559 426.01 487.9 406.38 453.845Z"
          />
          <path
            d="M371.679 513.017C364.886 479.578 271.133 441.452 206.849 420.49C195.05 416.642 188.553 425.334 197.707 433.713C222.879 456.751 268.509 488.444 294.674 505.515C323.603 524.066 379.505 551.538 371.679 513.017Z"
          />
          <path
            d="M321.797 542.143C325.521 512.472 267.107 458.044 216.116 417.843C197.234 402.957 182.89 413.769 195.953 433.955C213.297 460.755 236.343 491.538 251.228 510.426C272.712 537.249 316.903 581.145 321.797 542.143Z"
          />
        </g>
      </svg>
      <div id="content" @change=${() => this.updateSetupViewValidity()}>
        ${content}
      </div>
    `;
        }
    };
    __decorate([
        e$1({ type: Object })
    ], AppView.prototype, "appState", void 0);
    AppView = __decorate([
        n$2("app-view")
    ], AppView);

})();
//# sourceMappingURL=main.js.map
