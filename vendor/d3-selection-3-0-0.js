/**
 * Bundled by jsDelivr using Rollup v2.74.1 and Terser v5.15.1.
 * Original file: /npm/d3-selection@3.0.0/src/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var t="http://www.w3.org/1999/xhtml",n={svg:"http://www.w3.org/2000/svg",xhtml:t,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function e(t){var e=t+="",r=e.indexOf(":");return r>=0&&"xmlns"!==(e=t.slice(0,r))&&(t=t.slice(r+1)),n.hasOwnProperty(e)?{space:n[e],local:t}:t}function r(n){return function(){var e=this.ownerDocument,r=this.namespaceURI;return r===t&&e.documentElement.namespaceURI===t?e.createElement(n):e.createElementNS(r,n)}}function i(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function o(t){var n=e(t);return(n.local?i:r)(n)}function u(){}function s(t){return null==t?u:function(){return this.querySelector(t)}}function c(t){return null==t?[]:Array.isArray(t)?t:Array.from(t)}function a(){return[]}function l(t){return null==t?a:function(){return this.querySelectorAll(t)}}function f(t){return function(){return this.matches(t)}}function h(t){return function(n){return n.matches(t)}}var p=Array.prototype.find;function _(){return this.firstElementChild}var d=Array.prototype.filter;function y(){return Array.from(this.children)}function v(t){return new Array(t.length)}function m(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function g(t){return function(){return t}}function w(t,n,e,r,i,o){for(var u,s=0,c=n.length,a=o.length;s<a;++s)(u=n[s])?(u.__data__=o[s],r[s]=u):e[s]=new m(t,o[s]);for(;s<c;++s)(u=n[s])&&(i[s]=u)}function A(t,n,e,r,i,o,u){var s,c,a,l=new Map,f=n.length,h=o.length,p=new Array(f);for(s=0;s<f;++s)(c=n[s])&&(p[s]=a=u.call(c,c.__data__,s,n)+"",l.has(a)?i[s]=c:l.set(a,c));for(s=0;s<h;++s)a=u.call(t,o[s],s,o)+"",(c=l.get(a))?(r[s]=c,c.__data__=o[s],l.delete(a)):e[s]=new m(t,o[s]);for(s=0;s<f;++s)(c=n[s])&&l.get(p[s])===c&&(i[s]=c)}function x(t){return t.__data__}function S(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}function b(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function E(t){return function(){this.removeAttribute(t)}}function N(t){return function(){this.removeAttributeNS(t.space,t.local)}}function C(t,n){return function(){this.setAttribute(t,n)}}function L(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function B(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function P(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function T(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function q(t){return function(){this.style.removeProperty(t)}}function M(t,n,e){return function(){this.style.setProperty(t,n,e)}}function D(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function V(t,n){return t.style.getPropertyValue(n)||T(t).getComputedStyle(t,null).getPropertyValue(n)}function O(t){return function(){delete this[t]}}function R(t,n){return function(){this[t]=n}}function j(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function H(t){return t.trim().split(/^|\s+/)}function I(t){return t.classList||new U(t)}function U(t){this._node=t,this._names=H(t.getAttribute("class")||"")}function X(t,n){for(var e=I(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function G(t,n){for(var e=I(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function Y(t){return function(){X(this,t)}}function k(t){return function(){G(this,t)}}function z(t,n){return function(){(n.apply(this,arguments)?X:G)(this,t)}}function F(){this.textContent=""}function J(t){return function(){this.textContent=t}}function K(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function Q(){this.innerHTML=""}function W(t){return function(){this.innerHTML=t}}function Z(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function $(){this.nextSibling&&this.parentNode.appendChild(this)}function tt(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function nt(){return null}function et(){var t=this.parentNode;t&&t.removeChild(this)}function rt(){var t=this.cloneNode(!1),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function it(){var t=this.cloneNode(!0),n=this.parentNode;return n?n.insertBefore(t,this.nextSibling):t}function ot(t){return t.trim().split(/^|\s+/).map((function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}}))}function ut(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.options);++i?n.length=i:delete this.__on}}}function st(t,n,e){return function(){var r,i=this.__on,o=function(t){return function(n){t.call(this,n,this.__data__)}}(n);if(i)for(var u=0,s=i.length;u<s;++u)if((r=i[u]).type===t.type&&r.name===t.name)return this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=o,r.options=e),void(r.value=n);this.addEventListener(t.type,o,e),r={type:t.type,name:t.name,value:n,listener:o,options:e},i?i.push(r):this.__on=[r]}}function ct(t,n,e){var r=T(t),i=r.CustomEvent;"function"==typeof i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function at(t,n){return function(){return ct(this,t,n)}}function lt(t,n){return function(){return ct(this,t,n.apply(this,arguments))}}m.prototype={constructor:m,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}},U.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var ft=[null];function ht(t,n){this._groups=t,this._parents=n}function pt(){return new ht([[document.documentElement]],ft)}function _t(t){return"string"==typeof t?new ht([[document.querySelector(t)]],[document.documentElement]):new ht([[t]],ft)}function dt(t){return _t(o(t).call(document.documentElement))}ht.prototype=pt.prototype={constructor:ht,select:function(t){"function"!=typeof t&&(t=s(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u,c=n[i],a=c.length,l=r[i]=new Array(a),f=0;f<a;++f)(o=c[f])&&(u=t.call(o,o.__data__,f,c))&&("__data__"in o&&(u.__data__=o.__data__),l[f]=u);return new ht(r,this._parents)},selectAll:function(t){t="function"==typeof t?function(t){return function(){return c(t.apply(this,arguments))}}(t):l(t);for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var u,s=n[o],a=s.length,f=0;f<a;++f)(u=s[f])&&(r.push(t.call(u,u.__data__,f,s)),i.push(u));return new ht(r,i)},selectChild:function(t){return this.select(null==t?_:function(t){return function(){return p.call(this.children,t)}}("function"==typeof t?t:h(t)))},selectChildren:function(t){return this.selectAll(null==t?y:function(t){return function(){return d.call(this.children,t)}}("function"==typeof t?t:h(t)))},filter:function(t){"function"!=typeof t&&(t=f(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],s=u.length,c=r[i]=[],a=0;a<s;++a)(o=u[a])&&t.call(o,o.__data__,a,u)&&c.push(o);return new ht(r,this._parents)},data:function(t,n){if(!arguments.length)return Array.from(this,x);var e=n?A:w,r=this._parents,i=this._groups;"function"!=typeof t&&(t=g(t));for(var o=i.length,u=new Array(o),s=new Array(o),c=new Array(o),a=0;a<o;++a){var l=r[a],f=i[a],h=f.length,p=S(t.call(l,l&&l.__data__,a,r)),_=p.length,d=s[a]=new Array(_),y=u[a]=new Array(_),v=c[a]=new Array(h);e(l,f,d,y,v,p,n);for(var m,b,E=0,N=0;E<_;++E)if(m=d[E]){for(E>=N&&(N=E+1);!(b=y[N])&&++N<_;);m._next=b||null}}return(u=new ht(u,r))._enter=s,u._exit=c,u},enter:function(){return new ht(this._enter||this._groups.map(v),this._parents)},exit:function(){return new ht(this._exit||this._groups.map(v),this._parents)},join:function(t,n,e){var r=this.enter(),i=this,o=this.exit();return"function"==typeof t?(r=t(r))&&(r=r.selection()):r=r.append(t+""),null!=n&&(i=n(i))&&(i=i.selection()),null==e?o.remove():e(o),r&&i?r.merge(i).order():i},merge:function(t){for(var n=t.selection?t.selection():t,e=this._groups,r=n._groups,i=e.length,o=r.length,u=Math.min(i,o),s=new Array(i),c=0;c<u;++c)for(var a,l=e[c],f=r[c],h=l.length,p=s[c]=new Array(h),_=0;_<h;++_)(a=l[_]||f[_])&&(p[_]=a);for(;c<i;++c)s[c]=e[c];return new ht(s,this._parents)},selection:function(){return this},order:function(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,u=i[o];--o>=0;)(r=i[o])&&(u&&4^r.compareDocumentPosition(u)&&u.parentNode.insertBefore(r,u),u=r);return this},sort:function(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=b);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var u,s=e[o],c=s.length,a=i[o]=new Array(c),l=0;l<c;++l)(u=s[l])&&(a[l]=u);a.sort(n)}return new ht(i,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var u=r[i];if(u)return u}return null},size:function(){let t=0;for(const n of this)++t;return t},empty:function(){return!this.node()},each:function(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],u=0,s=o.length;u<s;++u)(i=o[u])&&t.call(i,i.__data__,u,o);return this},attr:function(t,n){var r=e(t);if(arguments.length<2){var i=this.node();return r.local?i.getAttributeNS(r.space,r.local):i.getAttribute(r)}return this.each((null==n?r.local?N:E:"function"==typeof n?r.local?P:B:r.local?L:C)(r,n))},style:function(t,n,e){return arguments.length>1?this.each((null==n?q:"function"==typeof n?D:M)(t,n,null==e?"":e)):V(this.node(),t)},property:function(t,n){return arguments.length>1?this.each((null==n?O:"function"==typeof n?j:R)(t,n)):this.node()[t]},classed:function(t,n){var e=H(t+"");if(arguments.length<2){for(var r=I(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?z:n?Y:k)(e,n))},text:function(t){return arguments.length?this.each(null==t?F:("function"==typeof t?K:J)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?Q:("function"==typeof t?Z:W)(t)):this.node().innerHTML},raise:function(){return this.each($)},lower:function(){return this.each(tt)},append:function(t){var n="function"==typeof t?t:o(t);return this.select((function(){return this.appendChild(n.apply(this,arguments))}))},insert:function(t,n){var e="function"==typeof t?t:o(t),r=null==n?nt:"function"==typeof n?n:s(n);return this.select((function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)}))},remove:function(){return this.each(et)},clone:function(t){return this.select(t?it:rt)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,n,e){var r,i,o=ot(t+""),u=o.length;if(!(arguments.length<2)){for(s=n?st:ut,r=0;r<u;++r)this.each(s(o[r],n,e));return this}var s=this.node().__on;if(s)for(var c,a=0,l=s.length;a<l;++a)for(r=0,c=s[a];r<u;++r)if((i=o[r]).type===c.type&&i.name===c.name)return c.value},dispatch:function(t,n){return this.each(("function"==typeof n?lt:at)(t,n))},[Symbol.iterator]:function*(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r,i=t[n],o=0,u=i.length;o<u;++o)(r=i[o])&&(yield r)}};var yt=0;function vt(){return new mt}function mt(){this._="@"+(++yt).toString(36)}function gt(t){let n;for(;n=t.sourceEvent;)t=n;return t}function wt(t,n){if(t=gt(t),void 0===n&&(n=t.currentTarget),n){var e=n.ownerSVGElement||n;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=t.clientX,r.y=t.clientY,[(r=r.matrixTransform(n.getScreenCTM().inverse())).x,r.y]}if(n.getBoundingClientRect){var i=n.getBoundingClientRect();return[t.clientX-i.left-n.clientLeft,t.clientY-i.top-n.clientTop]}}return[t.pageX,t.pageY]}function At(t,n){return t.target&&(t=gt(t),void 0===n&&(n=t.currentTarget),t=t.touches||[t]),Array.from(t,(t=>wt(t,n)))}function xt(t){return"string"==typeof t?new ht([document.querySelectorAll(t)],[document.documentElement]):new ht([c(t)],ft)}mt.prototype=vt.prototype={constructor:mt,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}};export{dt as create,o as creator,vt as local,f as matcher,e as namespace,n as namespaces,wt as pointer,At as pointers,_t as select,xt as selectAll,pt as selection,s as selector,l as selectorAll,V as style,T as window};export default null;