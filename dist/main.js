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
    const t$1=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$2=Symbol(),n$4=new Map;class s$3{constructor(t,n){if(this._$cssResult$=!0,n!==e$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n$4.get(this.cssText);return t$1&&void 0===e&&(n$4.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o$3=t=>new s$3("string"==typeof t?t:t+"",e$2),r$3=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s$3(o,e$2)},i$2=(e,n)=>{t$1?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S$1=t$1?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o$3(e)})(t):t;

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var s$2;const e$1=window.trustedTypes,r$2=e$1?e$1.emptyScript:"",h$1=window.reactiveElementPolyfillSupport,o$2={toAttribute(t,i){switch(i){case Boolean:t=t?r$2:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$3=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:o$2,reflect:!1,hasChanged:n$3};class a$1 extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S$1(i));}else void 0!==i&&s.push(S$1(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Eg)&&void 0!==i?i:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Eg)||void 0===i||i.splice(this._$Eg.indexOf(t)>>>0,1);}_$Em(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$2(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$ES(t,i,s=l$2){var e,r;const h=this.constructor._$Eh(t,s);if(void 0!==h&&!0===s.reflect){const n=(null!==(r=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==r?r:o$2.toAttribute)(i,s.type);this._$Ei=t,null==n?this.removeAttribute(h):this.setAttribute(h,n),this._$Ei=null;}}_$AK(t,i){var s,e,r;const h=this.constructor,n=h._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=h.getPropertyOptions(n),l=t.converter,a=null!==(r=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==r?r:o$2.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$3)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ep=this._$E_());}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$EU();}catch(t){throw i=!1,this._$EU(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Eg)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$EU(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$ES(i,this[i],t))),this._$EC=void 0),this._$EU();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.elementProperties=new Map,a$1.elementStyles=[],a$1.shadowRootOptions={mode:"open"},null==h$1||h$1({ReactiveElement:a$1}),(null!==(s$2=globalThis.reactiveElementVersions)&&void 0!==s$2?s$2:globalThis.reactiveElementVersions=[]).push("1.3.2");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    var t;const i$1=globalThis.trustedTypes,s$1=i$1?i$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,e=`lit$${(Math.random()+"").slice(9)}$`,o$1="?"+e,n$2=`<${o$1}>`,l$1=document,h=(t="")=>l$1.createComment(t),r$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,d$1=Array.isArray,u=t=>{var i;return d$1(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v$1=/-->/g,a=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,m$1=/"/g,g=/^(?:script|style|textarea|title)$/i,p$1=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),$=p$1(1),b=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),T=new WeakMap,x$1=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(h(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},A$1=l$1.createTreeWalker(l$1,129,null,!1),C=(t,i)=>{const o=t.length-1,l=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<o;i++){const s=t[i];let o,u,p=-1,$=0;for(;$<s.length&&(d.lastIndex=$,u=d.exec(s),null!==u);)$=d.lastIndex,d===c?"!--"===u[1]?d=v$1:void 0!==u[1]?d=a:void 0!==u[2]?(g.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=f):void 0!==u[3]&&(d=f):d===f?">"===u[0]?(d=null!=h?h:c,p=-1):void 0===u[1]?p=-2:(p=d.lastIndex-u[2].length,o=u[1],d=void 0===u[3]?f:'"'===u[3]?m$1:_):d===m$1||d===_?d=f:d===v$1||d===a?d=c:(d=f,h=void 0);const y=d===f&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+n$2:p>=0?(l.push(o),s.slice(0,p)+"$lit$"+s.slice(p)+e+y):s+e+(-2===p?(l.push(void 0),i):y);}const u=r+(t[o]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==s$1?s$1.createHTML(u):u,l]};class E{constructor({strings:t,_$litType$:s},n){let l;this.parts=[];let r=0,d=0;const u=t.length-1,c=this.parts,[v,a]=C(t,s);if(this.el=E.createElement(v,n),A$1.currentNode=this.el.content,2===s){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A$1.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(e)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(e),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?M$1:"?"===i[1]?H:"@"===i[1]?I:S});}else c.push({type:6,index:r});}for(const i of t)l.removeAttribute(i);}if(g.test(l.tagName)){const t=l.textContent.split(e),s=t.length-1;if(s>0){l.textContent=i$1?i$1.emptyScript:"";for(let i=0;i<s;i++)l.append(t[i],h()),A$1.nextNode(),c.push({type:2,index:++r});l.append(t[s],h());}}}else if(8===l.nodeType)if(l.data===o$1)c.push({type:2,index:r});else {let t=-1;for(;-1!==(t=l.data.indexOf(e,t+1));)c.push({type:7,index:r}),t+=e.length-1;}r++;}}static createElement(t,i){const s=l$1.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===b)return i;let d=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=r$1(i)?void 0:i._$litDirective$;return (null==d?void 0:d.constructor)!==u&&(null===(n=null==d?void 0:d._$AO)||void 0===n||n.call(d,!1),void 0===u?d=void 0:(d=new u(t),d._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=d:s._$Cu=d),void 0!==d&&(i=P(t,d._$AS(t,i.values),d,e)),i}class V{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:l$1).importNode(s,!0);A$1.currentNode=o;let n=A$1.nextNode(),h=0,r=0,d=e[0];for(;void 0!==d;){if(h===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}h!==(null==d?void 0:d.index)&&(n=A$1.nextNode(),h++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),r$1(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==b&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):u(t)?this.S(t):this.$(t);}M(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t));}$(t){this._$AH!==w&&r$1(this._$AH)?this._$AA.nextSibling.data=t:this.k(l$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=E.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new V(o,this),i=t.p(this.options);t.m(s),this.k(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new E(t)),i}S(t){d$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.M(h()),this.M(h()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!r$1(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===b&&(h=this._$AH[l]),n||(n=!r$1(h)||h!==this._$AH[l]),h===w?t=w:t!==w&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.C(t);}C(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M$1 extends S{constructor(){super(...arguments),this.type=3;}C(t){this.element[this.name]=t===w?void 0:t;}}const k=i$1?i$1.emptyScript:"";class H extends S{constructor(){super(...arguments),this.type=4;}C(t){t&&t!==w?this.element.setAttribute(this.name,k):this.element.removeAttribute(this.name);}}class I extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:w)===b)return;const e=this._$AH,o=t===w&&e!==w||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==w&&(e===w||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=window.litHtmlPolyfillSupport;null==z||z(E,N),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.2.5");

    /**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */var l,o;class s extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=x$1(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return b}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n$1=globalThis.litElementPolyfillSupport;null==n$1||n$1({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.0");

    let current;
    let currentId = 0;
    function setCurrent(state) {
        current = state;
    }
    function clear() {
        current = null;
        currentId = 0;
    }
    function notify() {
        return currentId++;
    }

    const phaseSymbol = Symbol('haunted.phase');
    const hookSymbol = Symbol('haunted.hook');
    const updateSymbol = Symbol('haunted.update');
    const commitSymbol = Symbol('haunted.commit');
    const effectsSymbol = Symbol('haunted.effects');
    const layoutEffectsSymbol = Symbol('haunted.layoutEffects');
    const contextEvent = 'haunted.context';

    class State {
        update;
        host;
        virtual;
        [hookSymbol];
        [effectsSymbol];
        [layoutEffectsSymbol];
        constructor(update, host) {
            this.update = update;
            this.host = host;
            this[hookSymbol] = new Map();
            this[effectsSymbol] = [];
            this[layoutEffectsSymbol] = [];
        }
        run(cb) {
            setCurrent(this);
            let res = cb();
            clear();
            return res;
        }
        _runEffects(phase) {
            let effects = this[phase];
            setCurrent(this);
            for (let effect of effects) {
                effect.call(this);
            }
            clear();
        }
        runEffects() {
            this._runEffects(effectsSymbol);
        }
        runLayoutEffects() {
            this._runEffects(layoutEffectsSymbol);
        }
        teardown() {
            let hooks = this[hookSymbol];
            hooks.forEach(hook => {
                if (typeof hook.teardown === 'function') {
                    hook.teardown();
                }
            });
        }
    }

    const defer = Promise.resolve().then.bind(Promise.resolve());
    function runner() {
        let tasks = [];
        let id;
        function runTasks() {
            id = null;
            let t = tasks;
            tasks = [];
            for (var i = 0, len = t.length; i < len; i++) {
                t[i]();
            }
        }
        return function (task) {
            tasks.push(task);
            if (id == null) {
                id = defer(runTasks);
            }
        };
    }
    const read = runner();
    const write = runner();
    class BaseScheduler {
        renderer;
        host;
        state;
        [phaseSymbol];
        _updateQueued;
        constructor(renderer, host) {
            this.renderer = renderer;
            this.host = host;
            this.state = new State(this.update.bind(this), host);
            this[phaseSymbol] = null;
            this._updateQueued = false;
        }
        update() {
            if (this._updateQueued)
                return;
            read(() => {
                let result = this.handlePhase(updateSymbol);
                write(() => {
                    this.handlePhase(commitSymbol, result);
                    write(() => {
                        this.handlePhase(effectsSymbol);
                    });
                });
                this._updateQueued = false;
            });
            this._updateQueued = true;
        }
        handlePhase(phase, arg) {
            this[phaseSymbol] = phase;
            switch (phase) {
                case commitSymbol:
                    this.commit(arg);
                    this.runEffects(layoutEffectsSymbol);
                    return;
                case updateSymbol: return this.render();
                case effectsSymbol: return this.runEffects(effectsSymbol);
            }
        }
        render() {
            return this.state.run(() => this.renderer.call(this.host, this.host));
        }
        runEffects(phase) {
            this.state._runEffects(phase);
        }
        teardown() {
            this.state.teardown();
        }
    }

    const toCamelCase = (val = '') => val.replace(/-+([a-z])?/g, (_, char) => char ? char.toUpperCase() : '');
    function makeComponent(render) {
        class Scheduler extends BaseScheduler {
            frag;
            constructor(renderer, frag, host) {
                super(renderer, (host || frag));
                this.frag = frag;
            }
            commit(result) {
                render(result, this.frag);
            }
        }
        function component(renderer, baseElementOrOptions, options) {
            const BaseElement = (options || baseElementOrOptions || {}).baseElement || HTMLElement;
            const { observedAttributes = [], useShadowDOM = true, shadowRootInit = {} } = options || baseElementOrOptions || {};
            class Element extends BaseElement {
                _scheduler;
                static get observedAttributes() {
                    return renderer.observedAttributes || observedAttributes || [];
                }
                constructor() {
                    super();
                    if (useShadowDOM === false) {
                        this._scheduler = new Scheduler(renderer, this);
                    }
                    else {
                        this.attachShadow({ mode: 'open', ...shadowRootInit });
                        this._scheduler = new Scheduler(renderer, this.shadowRoot, this);
                    }
                }
                connectedCallback() {
                    this._scheduler.update();
                }
                disconnectedCallback() {
                    this._scheduler.teardown();
                }
                attributeChangedCallback(name, oldValue, newValue) {
                    if (oldValue === newValue) {
                        return;
                    }
                    let val = newValue === '' ? true : newValue;
                    Reflect.set(this, toCamelCase(name), val);
                }
            }
            function reflectiveProp(initialValue) {
                let value = initialValue;
                let isSetup = false;
                return Object.freeze({
                    enumerable: true,
                    configurable: true,
                    get() {
                        return value;
                    },
                    set(newValue) {
                        // Avoid scheduling update when prop value hasn't changed
                        if (isSetup && value === newValue)
                            return;
                        isSetup = true;
                        value = newValue;
                        if (this._scheduler) {
                            this._scheduler.update();
                        }
                    }
                });
            }
            const proto = new Proxy(BaseElement.prototype, {
                getPrototypeOf(target) {
                    return target;
                },
                set(target, key, value, receiver) {
                    let desc;
                    if (key in target) {
                        desc = Object.getOwnPropertyDescriptor(target, key);
                        if (desc && desc.set) {
                            desc.set.call(receiver, value);
                            return true;
                        }
                        Reflect.set(target, key, value, receiver);
                        return true;
                    }
                    if (typeof key === 'symbol' || key[0] === '_') {
                        desc = {
                            enumerable: true,
                            configurable: true,
                            writable: true,
                            value
                        };
                    }
                    else {
                        desc = reflectiveProp(value);
                    }
                    Object.defineProperty(receiver, key, desc);
                    if (desc.set) {
                        desc.set.call(receiver, value);
                    }
                    return true;
                }
            });
            Object.setPrototypeOf(Element.prototype, proto);
            return Element;
        }
        return component;
    }

    class Hook {
        id;
        state;
        constructor(id, state) {
            this.id = id;
            this.state = state;
        }
    }
    function use(Hook, ...args) {
        let id = notify();
        let hooks = current[hookSymbol];
        let hook = hooks.get(id);
        if (!hook) {
            hook = new Hook(id, current, ...args);
            hooks.set(id, hook);
        }
        return hook.update(...args);
    }
    function hook(Hook) {
        return use.bind(null, Hook);
    }

    function createEffect(setEffects) {
        return hook(class extends Hook {
            callback;
            lastValues;
            values;
            _teardown;
            constructor(id, state, ignored1, ignored2) {
                super(id, state);
                setEffects(state, this);
            }
            update(callback, values) {
                this.callback = callback;
                this.values = values;
            }
            call() {
                if (!this.values || this.hasChanged()) {
                    this.run();
                }
                this.lastValues = this.values;
            }
            run() {
                this.teardown();
                this._teardown = this.callback.call(this.state);
            }
            teardown() {
                if (typeof this._teardown === 'function') {
                    this._teardown();
                }
            }
            hasChanged() {
                return !this.lastValues || this.values.some((value, i) => this.lastValues[i] !== value);
            }
        });
    }

    function setEffects(state, cb) {
        state[effectsSymbol].push(cb);
    }
    /**
     * @function
     * @param {() => void} effect - callback function that runs each time dependencies change
     * @param {unknown[]} [dependencies] - list of dependencies to the effect
     * @return {void}
     */
    const useEffect = createEffect(setEffects);

    /**
     * @function
     * @template T
     * @param    {Context<T>} context
     * @return   {T}
     */
    const useContext = hook(class extends Hook {
        Context;
        value;
        _ranEffect;
        _unsubscribe;
        constructor(id, state, _) {
            super(id, state);
            this._updater = this._updater.bind(this);
            this._ranEffect = false;
            this._unsubscribe = null;
            setEffects(state, this);
        }
        update(Context) {
            if (this.state.virtual) {
                throw new Error('can\'t be used with virtual components');
            }
            if (this.Context !== Context) {
                this._subscribe(Context);
                this.Context = Context;
            }
            return this.value;
        }
        call() {
            if (!this._ranEffect) {
                this._ranEffect = true;
                if (this._unsubscribe)
                    this._unsubscribe();
                this._subscribe(this.Context);
                this.state.update();
            }
        }
        _updater(value) {
            this.value = value;
            this.state.update();
        }
        _subscribe(Context) {
            const detail = { Context, callback: this._updater };
            this.state.host.dispatchEvent(new CustomEvent(contextEvent, {
                detail,
                bubbles: true,
                cancelable: true,
                composed: true, // to pass ShadowDOM boundaries
            }));
            const { unsubscribe = null, value } = detail;
            this.value = unsubscribe ? value : Context.defaultValue;
            this._unsubscribe = unsubscribe;
        }
        teardown() {
            if (this._unsubscribe) {
                this._unsubscribe();
            }
        }
    });

    function makeContext(component) {
        return (defaultValue) => {
            const Context = {
                Provider: class extends HTMLElement {
                    listeners;
                    _value;
                    constructor() {
                        super();
                        this.listeners = new Set();
                        this.addEventListener(contextEvent, this);
                    }
                    disconnectedCallback() {
                        this.removeEventListener(contextEvent, this);
                    }
                    handleEvent(event) {
                        const { detail } = event;
                        if (detail.Context === Context) {
                            detail.value = this.value;
                            detail.unsubscribe = this.unsubscribe.bind(this, detail.callback);
                            this.listeners.add(detail.callback);
                            event.stopPropagation();
                        }
                    }
                    unsubscribe(callback) {
                        this.listeners.delete(callback);
                    }
                    set value(value) {
                        this._value = value;
                        for (let callback of this.listeners) {
                            callback(value);
                        }
                    }
                    get value() {
                        return this._value;
                    }
                },
                Consumer: component(function ({ render }) {
                    const context = useContext(Context);
                    return render(context);
                }),
                defaultValue,
            };
            return Context;
        };
    }

    /**
     * @function
     * @template T
     * @param  {() => T} fn function to memoize
     * @param  {unknown[]} values dependencies to the memoized computation
     * @return {T} The next computed value
     */
    hook(class extends Hook {
        value;
        values;
        constructor(id, state, fn, values) {
            super(id, state);
            this.value = fn();
            this.values = values;
        }
        update(fn, values) {
            if (this.hasChanged(values)) {
                this.values = values;
                this.value = fn();
            }
            return this.value;
        }
        hasChanged(values = []) {
            return values.some((value, i) => this.values[i] !== value);
        }
    });

    function setLayoutEffects(state, cb) {
        state[layoutEffectsSymbol].push(cb);
    }
    /**
     * @function
     * @param  {Effect} callback effecting callback
     * @param  {unknown[]} [values] dependencies to the effect
     * @return {void}
     */
    const useLayoutEffect = createEffect(setLayoutEffects);

    /**
     * @function
     * @template {*} T
     * @param {T} [initialState] - Optional initial state
     * @return {readonly [state: T, updaterFn: StateUpdater<T>]} stateTuple - Tuple of current state and state updater function
     */
    const useState = hook(class extends Hook {
        args;
        constructor(id, state, initialValue) {
            super(id, state);
            this.updater = this.updater.bind(this);
            if (typeof initialValue === 'function') {
                initialValue = initialValue();
            }
            this.makeArgs(initialValue);
        }
        update() {
            return this.args;
        }
        updater(value) {
            if (typeof value === 'function') {
                const updaterFn = value;
                const [previousValue] = this.args;
                value = updaterFn(previousValue);
            }
            this.makeArgs(value);
            this.state.update();
        }
        makeArgs(value) {
            this.args = Object.freeze([value, this.updater]);
        }
    });

    /**
     * @license
     * Portions Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
    Promise.resolve();

    /**
     * Given a reducer function, initial state, and optional state initializer function, returns a tuple of state and dispatch function.
     * @function
     * @template S State
     * @template I Initial State
     * @template A Action
     * @param {Reducer<S, A>} reducer - reducer function to compute the next state given the previous state and the action
     * @param {I} initialState - the initial state of the reducer
     * @param {(init: I) => S} [init=undefined] - Optional initializer function, called on initialState if provided
     * @return {readonly [S, (action: A) => void]}
     */
    hook(class extends Hook {
        reducer;
        currentState;
        constructor(id, state, _, initialState, init) {
            super(id, state);
            this.dispatch = this.dispatch.bind(this);
            this.currentState = init !== undefined ? init(initialState) : initialState;
        }
        update(reducer) {
            this.reducer = reducer;
            return [this.currentState, this.dispatch];
        }
        dispatch(action) {
            this.currentState = this.reducer(this.currentState, action);
            this.state.update();
        }
    });

    function haunted({ render }) {
        const component = makeComponent(render);
        const createContext = makeContext(component);
        return { component, createContext };
    }

    const { component, createContext } = haunted({ render: x$1 });

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

    for (var i = 0; i < 256; ++i) {
      byteToHex.push((i + 0x100).toString(16).substr(1));
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

    function debugLog(s) {
        console.log(s);
    }

    /**
     * Represents a remote list of data which is fetched regularly whenever a local
     * cache drops under `minCacheSize` items. More items are requested from remote
     * via the `getMore` function. The initial cache is populated witg `inital`.
     */
    class VirtualList {
        constructor(minCacheSize, getMore, initial) {
            this.minCacheSize = minCacheSize;
            this.getMore = getMore;
            this.cache = [];
            this.awaitingResponse = false;
            this.remoteEmpty = false;
            this.requestOffset = initial.length;
            this.cache.push(...initial);
        }
        requestMore() {
            return __awaiter(this, void 0, void 0, function* () {
                debugLog("Requesting More Data");
                if (this.awaitingResponse) {
                    debugLog("... Response already pending, abandoning request");
                    return;
                }
                if (this.remoteEmpty) {
                    debugLog("... Remote is empty, abandoning request");
                    return;
                }
                this.awaitingResponse = true;
                debugLog("... Requesting Data");
                const additionalItems = yield this.getMore(this.requestOffset);
                if (additionalItems === null) {
                    debugLog("... null received, marking remote as empty.");
                    this.remoteEmpty = true;
                }
                else {
                    debugLog(`... ${additionalItems.length} items recieved.`);
                    this.requestOffset += additionalItems.length;
                    this.cache.push(...additionalItems);
                }
                this.awaitingResponse = false;
            });
        }
        peekHead() {
            if (this.cache.length > 0) {
                return this.cache[0];
            }
            return null;
        }
        peekNext() {
            if (this.cache.length > 1) {
                return this.cache[1];
            }
            return null;
        }
        pop() {
            if (this.cache.length <= 0) {
                throw new Error("Tried to pop from a empty Virtual List");
            }
            debugLog("Popping from a virtual list");
            const result = this.cache.shift();
            if (this.cache.length < this.minCacheSize) {
                debugLog(`... Cache size has dipped below minCacheSize (${this.minCacheSize}), requesting more data.`);
                this.requestMore();
            }
            return result;
        }
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
                const oldToken = Object.assign({}, this.tokenInfo);
                this.tokenInfo = null;
                // Attempt a refresh.
                const res = yield this.formRequest("https://accounts.spotify.com/api/token", {
                    grant_type: "refresh_token",
                    refresh_token: oldToken.refreshToken,
                    client_id: this.clientID,
                });
                if (res.status !== 200) {
                    // Refresh failed.
                    return false;
                }
                // Refresh success!
                this.tokenInfo = oldToken;
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
        formRequest(href, params) {
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
                    headers["Authorization"] = `Bearer ${this.tokenInfo.accessToken}`;
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
                const getLikedSongs = (offset) => __awaiter(this, void 0, void 0, function* () {
                    const r = yield this.makeRequest("me/tracks", {
                        offset: String(offset),
                        limit: "50",
                    });
                    if (r.items.length === 0) {
                        return null;
                    }
                    return r.items.map((item) => item.track);
                });
                return new VirtualList(30, getLikedSongs, yield getLikedSongs(0));
            });
        }
        getAllSongsInPlaylist(playlistURI) {
            return __awaiter(this, void 0, void 0, function* () {
                if (playlistURI === "__LIKED__") {
                    return this.getAllLikedSongs();
                }
                const playlistId = playlistURI.split(":")[2];
                const getSongs = (offset) => __awaiter(this, void 0, void 0, function* () {
                    const r = yield this.makeRequest(`playlists/${playlistId}/tracks`, {
                        fields: "items(track(uri,preview_url,name,artists(name),album(name, images)))",
                        offset: String(offset),
                        limit: "50",
                    });
                    if (r.items.length === 0) {
                        return null;
                    }
                    return r.items.map((item) => item.track);
                });
                return new VirtualList(30, getSongs, yield getSongs(0));
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
    const spotifyInterface = new SpotifyInterface();

    function n(n,r,t){return {r:255*t(n.r/255,r.r/255),g:255*t(n.g/255,r.g/255),b:255*t(n.b/255,r.b/255)}}function r(n,r){return r}function M(n,r,t){return Math.min(Math.max(n||0,r),t)}function m(n){return {r:M(n.r,0,255),g:M(n.g,0,255),b:M(n.b,0,255),a:M(n.a,0,1)}}function d(n){return {r:255*n.r,g:255*n.g,b:255*n.b,a:n.a}}function p(n){return {r:n.r/255,g:n.g/255,b:n.b/255,a:n.a}}function v(n,r){void 0===r&&(r=0);var t=Math.pow(10,r);return {r:Math.round(n.r*t)/t,g:Math.round(n.g*t)/t,b:Math.round(n.b*t)/t,a:n.a}}function x(n,r,t,u,i,o){return (1-r/t)*u+r/t*Math.round((1-n)*i+n*o)}function O(n,r,t,u,i){void 0===i&&(i={unitInput:!1,unitOutput:!1,roundOutput:!0}),i.unitInput&&(n=d(n),r=d(r)),n=m(n);var o=(r=m(r)).a+n.a-r.a*n.a,e=t(n,r,u),c=m({r:x(n.a,r.a,o,n.r,r.r,e.r),g:x(n.a,r.a,o,n.g,r.g,e.g),b:x(n.a,r.a,o,n.b,r.b,e.b),a:o});return c=i.unitOutput?p(c):i.roundOutput?v(c):function(n){return v(n,9)}(c),c}function A(t,u){return O(t,u,n,r)}

    /**
     * Allows a haunted lit componentent to specify css styles.
     * Taken from https://whoisryosuke.com/blog/2020/adding-constructable-stylesheets-to-hauntedjs/
     */
    function useConstructableStylesheets(el, styles) {
        /**
         * Applies styling to the element shadowRoot using the [[`styles`]]
         * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
         * available and will fallback otherwise. When Shadow DOM is polyfilled,
         * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
         * is available but `adoptedStyleSheets` is not, styles are appended to the
         * end of the `shadowRoot` to [mimic spec
         * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
         */
        const adoptStyles = (el) => {
            if (styles.length === 0) {
                return;
            }
            // There are three separate cases here based on Shadow DOM support.
            // (1) shadowRoot polyfilled: use ShadyCSS
            // (2) shadowRoot.adoptedStyleSheets available: use it
            // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
            // rendering
            if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
                window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map((s) => s.cssText), el.localName);
            }
            else if (t$1) {
                el.shadowRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
            }
            else {
                styles.forEach((s) => {
                    const style = document.createElement("style");
                    style.textContent = s.cssText;
                    el.shadowRoot.appendChild(style);
                });
            }
        };
        useLayoutEffect(() => {
            adoptStyles(el);
        }, [styles]);
    }
    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
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
    function extractColorsFromImage(image, processingCanvas) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get image.
            const img = new Image(image.width, image.height);
            img.src = image.url;
            img.crossOrigin = "Anonymous";
            yield new Promise((resolve) => {
                img.onload = resolve;
            });
            // Render to Canvas.
            processingCanvas.width = img.naturalWidth;
            processingCanvas.height = img.naturalHeight;
            const ctx = processingCanvas.getContext("2d");
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
            const surfaceColor = A(Object.assign(Object.assign({}, albumColorRGB), { a: 1 }), { r: 0, g: 0, b: 0, a: 0.4 });
            return {
                album: `hsl(${albumColorHsl.h}, ${albumColorHsl.s}%, ${albumColorHsl.l}%)`,
                surface: `rgb(${surfaceColor.r}, ${surfaceColor.g}, ${surfaceColor.b})`,
                bg: `hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%)`,
            };
        });
    }

    const SPOTIFY_ICON = $ `
  <svg viewBox="0 0 24 24">
    <path
      d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75C5.8,9.9 5.3,9.6 5.15,9.15C5,8.65 5.3,8.15 5.75,8C9.3,6.95 15.15,7.15 18.85,9.35C19.3,9.6 19.45,10.2 19.2,10.65C18.95,11 18.35,11.15 17.9,10.9M17.8,13.7C17.55,14.05 17.1,14.2 16.75,13.95C14.05,12.3 9.95,11.8 6.8,12.8C6.4,12.9 5.95,12.7 5.85,12.3C5.75,11.9 5.95,11.45 6.35,11.35C10,10.25 14.5,10.8 17.6,12.7C17.9,12.85 18.05,13.35 17.8,13.7M16.6,16.45C16.4,16.75 16.05,16.85 15.75,16.65C13.4,15.2 10.45,14.9 6.95,15.7C6.6,15.8 6.3,15.55 6.2,15.25C6.1,14.9 6.35,14.6 6.65,14.5C10.45,13.65 13.75,14 16.35,15.6C16.7,15.75 16.75,16.15 16.6,16.45M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
    />
  </svg>
`;
    const SORT_ICON = $ `
  <svg viewBox="0 0 24 24">
    <path
      d="M21.47,4.35L20.13,3.79V12.82L22.56,6.96C22.97,5.94 22.5,4.77 21.47,4.35M1.97,8.05L6.93,20C7.24,20.77 7.97,21.24 8.74,21.26C9,21.26 9.27,21.21 9.53,21.1L16.9,18.05C17.65,17.74 18.11,17 18.13,16.26C18.14,16 18.09,15.71 18,15.45L13,3.5C12.71,2.73 11.97,2.26 11.19,2.25C10.93,2.25 10.67,2.31 10.42,2.4L3.06,5.45C2.04,5.87 1.55,7.04 1.97,8.05M18.12,4.25A2,2 0 0,0 16.12,2.25H14.67L18.12,10.59"
    />
  </svg>
`;

    function loadingPage() {
        useConstructableStylesheets(this, [
            r$3 `
      @keyframes pulse {
        from {
          opacity: 1;
        }
        to {
          opacity: 0.2;
        }
      }
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
      .dot {
        width: 16px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
        background: white;
        border-radius: 50%;
        margin: 0 1rem;
        animation: pulse 1s infinite alternate;
      }
      .dot:nth-of-type(2) {
        animation-delay: 0.2s;
      }
      .dot:nth-of-type(3) {
        animation-delay: 0.4s;
      }
      svg {
        width: 72px;
        min-width: 48px;
        fill: white;
        margin-right: 1.5rem;
      }
      img {
        width: 72px;
        min-width: 48px;
        margin-left: 1.5rem;
      }
    `,
        ]);
        return $ ` ${SPOTIFY_ICON}
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <img src="logo.svg" />`;
    }
    const LoadingPage = component(loadingPage);
    customElements.define("loading-page", LoadingPage);

    function appButton({ icon }) {
        useConstructableStylesheets(this, [
            r$3 `
      button {
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
      :host([disabled]) button {
        opacity: 0.5;
      }
      button:hover {
        transform: scale(1.05);
        transition: all 200ms ease-in-out;
      }
      :host([disabled]) button:hover {
        transform: scale(1);
      }
      button svg {
        min-width: 14px;
        width: 14px;
        fill: rgb(43, 50, 65);
        margin-right: 0.5rem;
      }
      button span {
        overflow: hidden;
        white-space: nowrap;
      }
    `,
        ]);
        return $ `
    <button>
      ${icon}
      <span><slot></slot></span>
    </button>
  `;
    }
    const AppButton = component(appButton);
    customElements.define("app-button", AppButton);

    function connectPage() {
        useConstructableStylesheets(this, [
            r$3 `
      :host {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      h1 {
        color: white;
        font-size: 3rem;
        margin: 0;
        padding-bottom: 1rem;
      }
      p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1rem;
        padding-bottom: 1.5rem;
        text-align: center;
      }
    `,
        ]);
        return $ `
    <h1 class="title">Sortify</h1>
    <p class="subtitle">Sort your songs into playlists with a simple swipe</p>
    <app-button
      @click=${() => spotifyInterface.startLogin()}
      .icon=${SPOTIFY_ICON}
    >
      Connect Spotify
    </app-button>
  `;
    }
    const ConnectPage = component(connectPage);
    customElements.define("connect-page", ConnectPage);

    function createUpdateColorsEvent(colors) {
        return new CustomEvent("update-colors", {
            bubbles: true,
            composed: true,
            detail: colors,
        });
    }
    function createStartSortingEvent(selections) {
        return new CustomEvent("start-sorting", {
            bubbles: true,
            composed: true,
            detail: selections,
        });
    }

    function setupPage() {
        const playlists = spotifyInterface.getAllPlaylists();
        const writablePlaylists = playlists.filter((pl) => pl.writable);
        const getSelections = () => {
            const getSelect = (id) => this.shadowRoot.querySelector(`#${id}`);
            return {
                source: getSelect("source").value,
                sinkUp: getSelect("sink-up").value,
                sinkRight: getSelect("sink-right").value,
                sinkLeft: getSelect("sink-left").value,
            };
        };
        const onInputChange = () => {
            const btn = this.shadowRoot.querySelector("app-button");
            const selections = Object.values(getSelections());
            if (new Set(selections).size !== selections.length) {
                btn.setAttribute("disabled", "");
            }
            else {
                btn.removeAttribute("disabled");
            }
        };
        const onStartSort = () => {
            const btn = this.shadowRoot.querySelector("app-button");
            if (btn.hasAttribute("disabled")) {
                return;
            }
            this.dispatchEvent(createStartSortingEvent(getSelections()));
        };
        useConstructableStylesheets(this, [
            r$3 `
      :host {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      h1 {
        color: white;
        font-size: 3rem;
        margin: 0;
        padding-bottom: 2rem;
      }
      fieldset {
        width: calc(100% - 4rem);
        border-color: rgba(255, 255, 255, 0.7);
        outline: none;
        border-style: solid;
        border-radius: 8px;
        margin-bottom: 1.5rem;
      }
      fieldset.row {
        display: flex;
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
      app-button {
        margin-top: 2rem;
      }
    `,
        ]);
        useEffect(() => {
            this.addEventListener("input", onInputChange);
            onInputChange();
            return () => {
                this.removeEventListener("input", onInputChange);
            };
        }, []);
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
    <app-button @click=${onStartSort} .icon=${SORT_ICON}>
      Start Sorting</app-button
    >
  `;
    }
    const SetupPage = component(setupPage);
    customElements.define("setup-page", SetupPage);

    const CARD_SIZE = 250;
    function sortCard({ song }) {
        useConstructableStylesheets(this, [
            r$3 `
      :host {
        position: absolute;
        width: ${CARD_SIZE}px;
        height: ${CARD_SIZE}px;
        border-radius: 12px;
        cursor: pointer;
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        flex-direction: column;
        background: black;
      }
      :host(.animated) {
        transition: transform 0.15s linear;
      }
      :host(.front) {
        z-index: 3;
      }
      :host(.back) {
        z-index: 2;
      }
      .song-name {
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
      .album-artists {
        margin: 0;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.8rem;
        width: 100%;
        max-width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    `,
        ]);
        const imgUrl = song.album.images[0].url;
        useEffect(() => {
            const bgImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .75)), url(${imgUrl})`;
            this.style.backgroundImage = bgImage;
            this.style.backgroundSize = "contain";
        }, [song]);
        return $ `
    <p class="song-name">${song.name}</p>
    <p class="album-artists">
      ${song.album.name} - ${song.artists.map((a) => a.name).join(", ")}
    </p>
  `;
    }
    const SortCard = component(sortCard);
    customElements.define("sort-card", SortCard);

    function sortPage({ appState }) {
        let currentGesture = null;
        let currentAlbumColorComputeToken = 0;
        const commitFrontCard = (bucket) => {
            const song = appState.queue.pop();
            let playlist = null;
            if (bucket === "top") {
                playlist = appState.sinkUp;
            }
            else if (bucket === "left") {
                playlist = appState.sinkLeft;
            }
            else if (bucket === "right") {
                playlist = appState.sinkRight;
            }
            if (playlist !== null) {
                spotifyInterface.addSongToPlaylist(song.uri, playlist);
            }
            // We actually dodge doing a lit rerender here since the card z-index
            // shuffle results in weird artifacts that ruin the experience. Instead we
            // "promote" the back card to now be the front card and update the front
            // card to become the back card. Then we change the data in the back card
            // while it's safely out of view.
            const backCard = this.shadowRoot.querySelector("sort-card.back");
            const frontCard = this.shadowRoot.querySelector("sort-card.front");
            backCard.classList.remove("back");
            backCard.classList.add("front");
            const head = appState.queue.peekHead();
            updateColorsFromAlbum(head.album.images[0]);
            frontCard.classList.remove("front");
            frontCard.classList.remove("animated");
            frontCard.classList.add("back");
            frontCard.style.transform = "";
            frontCard.song = appState.queue.peekNext();
        };
        const onCardPick = (e) => {
            if (currentGesture)
                return;
            currentGesture = {
                startPos: {
                    x: e.clientX,
                    y: e.clientY,
                },
                startTime: Date.now(),
            };
            const frontCard = this.shadowRoot.querySelector("sort-card.front");
            frontCard.classList.remove("animated");
        };
        const onCardDrag = (e) => {
            if (!currentGesture)
                return;
            const frontCard = this.shadowRoot.querySelector("sort-card.front");
            const delta = {
                x: e.clientX - currentGesture.startPos.x,
                y: e.clientY - currentGesture.startPos.y,
            };
            frontCard.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
        };
        const onCardDrop = (e) => {
            if (!currentGesture)
                return;
            const frontCard = this.shadowRoot.querySelector("sort-card.front");
            const bb = frontCard.getBoundingClientRect();
            // In px per ms.
            const deltaTime = Date.now() - currentGesture.startTime;
            const velocity = {
                x: (e.clientX - currentGesture.startPos.x) / deltaTime,
                y: (e.clientY - currentGesture.startPos.y) / deltaTime,
            };
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            let finalX, finalY;
            if (velocity.y < -1 || bb.y < CARD_SIZE * -0.25) {
                finalX = 0;
                finalY = -winHeight;
                window.setTimeout(() => commitFrontCard("top"), 250);
            }
            else if (velocity.x < -1 || bb.x < CARD_SIZE * -0.25) {
                finalX = -winWidth;
                finalY = 0;
                window.setTimeout(() => commitFrontCard("left"), 250);
            }
            else if (velocity.x > 1 ||
                bb.x + CARD_SIZE > winWidth + CARD_SIZE * 0.25) {
                finalX = winWidth;
                finalY = 0;
                window.setTimeout(() => commitFrontCard("right"), 250);
            }
            else if (velocity.y > 1 ||
                bb.y + CARD_SIZE > winHeight + CARD_SIZE * 0.25) {
                finalX = 0;
                finalY = winHeight;
                window.setTimeout(() => commitFrontCard("bottom"), 250);
            }
            else {
                finalX = 0;
                finalY = 0;
            }
            currentGesture = null;
            frontCard.classList.add("animated");
            frontCard.style.transform = `translate(${finalX}px, ${finalY}px)`;
        };
        const updateColorsFromAlbum = (albumImg) => __awaiter(this, void 0, void 0, function* () {
            currentAlbumColorComputeToken++;
            const token = currentAlbumColorComputeToken;
            const hiddenCanvas = this.shadowRoot.querySelector("#hidden-canvas");
            const colors = yield extractColorsFromImage(albumImg, hiddenCanvas);
            if (token < currentAlbumColorComputeToken) {
                // Another call to this function has happened, ignore this one.
                return;
            }
            this.dispatchEvent(createUpdateColorsEvent(colors));
        });
        const head = appState.queue.peekHead();
        const next = appState.queue.peekNext();
        let frontCard = null;
        let backCard = null;
        if (head) {
            frontCard = $ `<sort-card
      class="front"
      @pointerdown=${(e) => onCardPick(e)}
      .song=${head}
    ></sort-card>`;
        }
        if (next) {
            backCard = $ `<sort-card
      class="back"
      .song=${next}
      @pointerdown=${(e) => onCardPick(e)}
    ></sort-card>`;
        }
        if (!head && !next) {
            // TODO: Dispatch done event.
            // TODO: Make this nice.
            return $ ` Done. `;
        }
        useEffect(() => {
            updateColorsFromAlbum(head.album.images[0]);
            this.addEventListener("pointermove", onCardDrag);
            this.addEventListener("pointerup", onCardDrop);
            return () => {
                this.removeEventListener("pointermove", onCardDrag);
                this.removeEventListener("pointerup", onCardDrop);
            };
        }, []);
        useConstructableStylesheets(this, [
            r$3 `
      :host {
        width: 100%;
        height: 100%;
      }
      .card-container {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        position: relative;
        touch-action: none;
      }
    `,
        ]);
        return $ `
    <div class="card-container">${frontCard} ${backCard}</div>
    <div class="controls">
      <div class="col">
        <app-button></app-button>
      </div>
      <div class="col">
        <app-button></app-button>
        <app-button></app-button>
        <app-button></app-button>
      </div>
      <div class="col">
        <app-button></app-button>
      </div>
    </div>

    <canvas id="hidden-canvas"></canvas>
  `;
    }
    const SortPage = component(sortPage);
    customElements.define("sort-page", SortPage);

    const ANIMATIONS = r$3 `
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
`;
    function appController() {
        const [appState, setAppState] = useState(null);
        const [connectionState, setConnectionState] = useState(spotifyInterface.connectionState());
        spotifyInterface.onStateChange(() => {
            setConnectionState(spotifyInterface.connectionState());
        });
        const updateColors = (colors) => {
            this.style.setProperty("--album-color", colors.album);
            this.style.setProperty("--surface-color", colors.surface);
            this.style.setProperty("--bg-color", colors.bg);
        };
        const startSorting = (selections) => __awaiter(this, void 0, void 0, function* () {
            setConnectionState("pending-data");
            setAppState(Object.assign(Object.assign({}, selections), { queue: yield spotifyInterface.getAllSongsInPlaylist(selections.source) }));
            setConnectionState("connected");
        });
        const randomizeAnimation = () => {
            const numPaths = 6;
            for (let i = 0; i < numPaths; i++) {
                const x = Math.random() * 150 - 75;
                const y = Math.random() * 300 - 150;
                const d = Math.random() * 20 - 10;
                this.style.setProperty(`--rand-translate-${i + 1}`, `translate(${x}px,${y}px) rotate(${d}deg)`);
            }
        };
        const maybeCompleteLogin = () => __awaiter(this, void 0, void 0, function* () {
            const params = new URLSearchParams(document.location.search);
            if (params.has("code") &&
                params.has("state") &&
                connectionState === "pending-login") {
                yield spotifyInterface.completeLogin(params);
                window.history.replaceState({}, document.title, location.pathname);
            }
        });
        let page;
        if (connectionState === "pending-data" ||
            connectionState === "pending-login") {
            page = $ `<loading-page></loading-page> `;
        }
        else if (connectionState === "unconnected") {
            page = $ `<connect-page></connect-page> `;
        }
        else if (appState === null) {
            page = $ `<setup-page></setup-page> `;
        }
        else {
            page = $ `<sort-page .appState=${appState}></sort-page>`;
        }
        useEffect(() => {
            updateColors({
                album: "#617193",
                surface: "#555b67",
                bg: "#2b3241",
            });
            randomizeAnimation();
            maybeCompleteLogin();
        }, []);
        useConstructableStylesheets(this, [
            ANIMATIONS,
            r$3 `
      :host {
        width: 100vw;
        height: 100vh;
        display: block;
        position: relative;
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
    `,
        ]);
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
    <div
      id="content"
      @update-colors=${(e) => updateColors(e.detail)}
      @start-sorting=${(e) => startSorting(e.detail)}
    >
      ${page}
    </div>
  `;
    }
    const AppController = component(appController);
    customElements.define("app-controller", AppController);

})();
//# sourceMappingURL=main.js.map
