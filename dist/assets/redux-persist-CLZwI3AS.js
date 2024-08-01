import{b as X}from"./redux-DITMfSWq.js";import{r as Q}from"./react-81QIzOlz.js";var W="persist:",N="persist/FLUSH",F="persist/REHYDRATE",B="persist/PAUSE",Y="persist/PERSIST",q="persist/PURGE",J="persist/REGISTER",Z=-1;function E(e){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?E=function(r){return typeof r}:E=function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},E(e)}function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function C(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?k(r,!0).forEach(function(n){ee(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(r).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function ee(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function te(e,t,r,n){n.debug;var i=C({},r);return e&&E(e)==="object"&&Object.keys(e).forEach(function(u){u!=="_persist"&&t[u]===r[u]&&(i[u]=e[u])}),i}function re(e){var t=e.blacklist||null,r=e.whitelist||null,n=e.transforms||[],i=e.throttle||0,u="".concat(e.keyPrefix!==void 0?e.keyPrefix:W).concat(e.key),a=e.storage,f;e.serialize===!1?f=function(h){return h}:typeof e.serialize=="function"?f=e.serialize:f=ne;var s=e.writeFailHandler||null,c={},l={},o=[],b=null,v=null,R=function(h){Object.keys(h).forEach(function(y){O(y)&&c[y]!==h[y]&&o.indexOf(y)===-1&&o.push(y)}),Object.keys(c).forEach(function(y){h[y]===void 0&&O(y)&&o.indexOf(y)===-1&&c[y]!==void 0&&o.push(y)}),b===null&&(b=setInterval(d,i)),c=h};function d(){if(o.length===0){b&&clearInterval(b),b=null;return}var p=o.shift(),h=n.reduce(function(y,g){return g.in(y,p,c)},c[p]);if(h!==void 0)try{l[p]=f(h)}catch(y){console.error("redux-persist/createPersistoid: error serializing state",y)}else delete l[p];o.length===0&&S()}function S(){Object.keys(l).forEach(function(p){c[p]===void 0&&delete l[p]}),v=a.setItem(u,f(l)).catch(_)}function O(p){return!(r&&r.indexOf(p)===-1&&p!=="_persist"||t&&t.indexOf(p)!==-1)}function _(p){s&&s(p)}var w=function(){for(;o.length!==0;)d();return v||Promise.resolve()};return{update:R,flush:w}}function ne(e){return JSON.stringify(e)}function ie(e){var t=e.transforms||[],r="".concat(e.keyPrefix!==void 0?e.keyPrefix:W).concat(e.key),n=e.storage;e.debug;var i;return e.deserialize===!1?i=function(a){return a}:typeof e.deserialize=="function"?i=e.deserialize:i=oe,n.getItem(r).then(function(u){if(u)try{var a={},f=i(u);return Object.keys(f).forEach(function(s){a[s]=t.reduceRight(function(c,l){return l.out(c,s,f)},i(f[s]))}),a}catch(s){throw s}else return})}function oe(e){return JSON.parse(e)}function ue(e){var t=e.storage,r="".concat(e.keyPrefix!==void 0?e.keyPrefix:W).concat(e.key);return t.removeItem(r,se)}function se(e){}function H(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?H(r,!0).forEach(function(n){ae(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):H(r).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function ae(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function fe(e,t){if(e==null)return{};var r=le(e,t),n,i;if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(i=0;i<u.length;i++)n=u[i],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function le(e,t){if(e==null)return{};var r={},n=Object.keys(e),i,u;for(u=0;u<n.length;u++)i=n[u],!(t.indexOf(i)>=0)&&(r[i]=e[i]);return r}var pe=5e3;function We(e,t){var r=e.version!==void 0?e.version:Z;e.debug;var n=e.stateReconciler===void 0?te:e.stateReconciler,i=e.getStoredState||ie,u=e.timeout!==void 0?e.timeout:pe,a=null,f=!1,s=!0,c=function(o){return o._persist.rehydrated&&a&&!s&&a.update(o),o};return function(l,o){var b=l||{},v=b._persist,R=fe(b,["_persist"]),d=R;if(o.type===Y){var S=!1,O=function(T,P){S||(o.rehydrate(e.key,T,P),S=!0)};if(u&&setTimeout(function(){!S&&O(void 0,new Error('redux-persist: persist timed out for persist key "'.concat(e.key,'"')))},u),s=!1,a||(a=re(e)),v)return m({},t(d,o),{_persist:v});if(typeof o.rehydrate!="function"||typeof o.register!="function")throw new Error("redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.");return o.register(e.key),i(e).then(function(g){var T=e.migrate||function(P,$e){return Promise.resolve(P)};T(g,r).then(function(P){O(P)},function(P){O(void 0,P)})},function(g){O(void 0,g)}),m({},t(d,o),{_persist:{version:r,rehydrated:!1}})}else{if(o.type===q)return f=!0,o.result(ue(e)),m({},t(d,o),{_persist:v});if(o.type===N)return o.result(a&&a.flush()),m({},t(d,o),{_persist:v});if(o.type===B)s=!0;else if(o.type===F){if(f)return m({},d,{_persist:m({},v,{rehydrated:!0})});if(o.key===e.key){var _=t(d,o),w=o.payload,p=n!==!1&&w!==void 0?n(w,l,_,e):_,h=m({},p,{_persist:m({},v,{rehydrated:!0})});return c(h)}}}if(!v)return t(l,o);var y=t(d,o);return y===d?l:c(m({},y,{_persist:v}))}}function G(e){return ve(e)||ye(e)||ce()}function ce(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function ye(e){if(Symbol.iterator in Object(e)||Object.prototype.toString.call(e)==="[object Arguments]")return Array.from(e)}function ve(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}function K(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function $(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?K(r,!0).forEach(function(n){de(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):K(r).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function de(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var V={registry:[],bootstrapped:!1},he=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:V,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case J:return $({},t,{registry:[].concat(G(t.registry),[r.key])});case F:var n=t.registry.indexOf(r.key),i=G(t.registry);return i.splice(n,1),$({},t,{registry:i,bootstrapped:i.length===0});default:return t}};function Fe(e,t,r){var n=X(he,V,void 0),i=function(s){n.dispatch({type:J,key:s})},u=function(s,c,l){var o={type:F,payload:c,err:l,key:s};e.dispatch(o),n.dispatch(o)},a=$({},n,{purge:function(){var s=[];return e.dispatch({type:q,result:function(l){s.push(l)}}),Promise.all(s)},flush:function(){var s=[];return e.dispatch({type:N,result:function(l){s.push(l)}}),Promise.all(s)},pause:function(){e.dispatch({type:B})},persist:function(){e.dispatch({type:Y,register:i,rehydrate:u})}});return a.persist(),a}var L={},M={};M.__esModule=!0;M.default=Oe;function I(e){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?I=function(r){return typeof r}:I=function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},I(e)}function A(){}var me={getItem:A,setItem:A,removeItem:A};function be(e){if((typeof self>"u"?"undefined":I(self))!=="object"||!(e in self))return!1;try{var t=self[e],r="redux-persist ".concat(e," test");t.setItem(r,"test"),t.getItem(r),t.removeItem(r)}catch{return!1}return!0}function Oe(e){var t="".concat(e,"Storage");return be(t)?self[t]:me}L.__esModule=!0;L.default=Se;var Pe=ge(M);function ge(e){return e&&e.__esModule?e:{default:e}}function Se(e){var t=(0,Pe.default)(e);return{getItem:function(n){return new Promise(function(i,u){i(t.getItem(n))})},setItem:function(n,i){return new Promise(function(u,a){u(t.setItem(n,i))})},removeItem:function(n){return new Promise(function(i,u){i(t.removeItem(n))})}}}var _e=void 0,we=Ee(L);function Ee(e){return e&&e.__esModule?e:{default:e}}var Ie=(0,we.default)("local");_e=Ie;function j(e){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?j=function(r){return typeof r}:j=function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},j(e)}function je(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function xe(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function De(e,t,r){return t&&xe(e.prototype,t),e}function Re(e,t){return t&&(j(t)==="object"||typeof t=="function")?t:x(e)}function z(e){return z=Object.setPrototypeOf?Object.getPrototypeOf:function(r){return r.__proto__||Object.getPrototypeOf(r)},z(e)}function x(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Te(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&U(e,t)}function U(e,t){return U=Object.setPrototypeOf||function(n,i){return n.__proto__=i,n},U(e,t)}function D(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Ae=function(e){Te(t,e);function t(){var r,n;je(this,t);for(var i=arguments.length,u=new Array(i),a=0;a<i;a++)u[a]=arguments[a];return n=Re(this,(r=z(t)).call.apply(r,[this].concat(u))),D(x(n),"state",{bootstrapped:!1}),D(x(n),"_unsubscribe",void 0),D(x(n),"handlePersistorState",function(){var f=n.props.persistor,s=f.getState(),c=s.bootstrapped;c&&(n.props.onBeforeLift?Promise.resolve(n.props.onBeforeLift()).finally(function(){return n.setState({bootstrapped:!0})}):n.setState({bootstrapped:!0}),n._unsubscribe&&n._unsubscribe())}),n}return De(t,[{key:"componentDidMount",value:function(){this._unsubscribe=this.props.persistor.subscribe(this.handlePersistorState),this.handlePersistorState()}},{key:"componentWillUnmount",value:function(){this._unsubscribe&&this._unsubscribe()}},{key:"render",value:function(){return typeof this.props.children=="function"?this.props.children(this.state.bootstrapped):this.state.bootstrapped?this.props.children:this.props.loading}}]),t}(Q.PureComponent);D(Ae,"defaultProps",{children:null,loading:null});export{Ae as P,We as a,_e as d,Fe as p};
