(function(e){function t(t){for(var r,o,c=t[0],u=t[1],s=t[2],h=0,d=[];h<c.length;h++)o=c[h],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(t);while(d.length)d.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(r=!1)}r&&(a.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},i={app:0},a=[];function c(e){return u.p+"js/"+({"account~home~not_found~sign_form":"account~home~not_found~sign_form","account~home~sign_form":"account~home~sign_form",account:"account","home~sign_form":"home~sign_form",home:"home",sign_form:"sign_form",not_found:"not_found"}[e]||e)+"."+{"account~home~not_found~sign_form":"5ff360b6","account~home~sign_form":"8665f53c",account:"d6fa7daa","home~sign_form":"227b1280",home:"976cd17a",sign_form:"3c04e319",not_found:"48b7ec65"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"account~home~not_found~sign_form":1,"account~home~sign_form":1,"home~sign_form":1,home:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({"account~home~not_found~sign_form":"account~home~not_found~sign_form","account~home~sign_form":"account~home~sign_form",account:"account","home~sign_form":"home~sign_form",home:"home",sign_form:"sign_form",not_found:"not_found"}[e]||e)+"."+{"account~home~not_found~sign_form":"c758e25e","account~home~sign_form":"29fa68a6",account:"31d6cfe0","home~sign_form":"7bae8081",home:"e99ecd36",sign_form:"31d6cfe0",not_found:"31d6cfe0"}[e]+".css",i=u.p+r,a=document.getElementsByTagName("link"),c=0;c<a.length;c++){var s=a[c],h=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(h===r||h===i))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){s=d[c],h=s.getAttribute("data-href");if(h===r||h===i)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var r=t&&t.target&&t.target.src||i,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],l.parentNode.removeChild(l),n(a)},l.href=i;var f=document.getElementsByTagName("head")[0];f.appendChild(l)})).then((function(){o[e]=0})));var r=i[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=i[e]=[t,n]}));t.push(r[2]=a);var s,h=document.createElement("script");h.charset="utf-8",h.timeout=120,u.nc&&h.setAttribute("nonce",u.nc),h.src=c(e);var d=new Error;s=function(t){h.onerror=h.onload=null,clearTimeout(l);var n=i[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",d.name="ChunkLoadError",d.type=r,d.request=o,n[1](d)}i[e]=void 0}};var l=setTimeout((function(){s({type:"timeout",target:h})}),12e4);h.onerror=h.onload=s,document.head.appendChild(h)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/wishlist_app/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],h=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var l=h;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"034f":function(e,t,n){"use strict";n("85ec")},"85ec":function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-main",[n("router-view")],1)],1)},i=[],a=n("d4ec"),c=n("bee2"),u=n("262e"),s=n("2caf"),h=n("9ab4"),d=n("1b40"),l=function(e){Object(u["a"])(n,e);var t=Object(s["a"])(n);function n(){return Object(a["a"])(this,n),t.apply(this,arguments)}return Object(c["a"])(n,[{key:"moveBackward",value:function(){console.log(1)}}]),n}(r["a"]);l=Object(h["a"])([Object(d["a"])({components:{}})],l);var f=l,m=f,p=(n("034f"),n("2877")),v=n("6544"),g=n.n(v),b=n("7496"),_=n("f6c4"),w=Object(p["a"])(m,o,i,!1,null,null,null),y=w.exports;g()(w,{VApp:b["a"],VMain:_["a"]});n("d3b7"),n("3ca3"),n("ddb0");var k=n("8c4f"),O=n("5530"),x=n("b85c"),j=n("1da1"),E=(n("96cf"),n("b0c0"),n("159b"),n("2f62")),S=n("260b"),A=(n("e71f"),n("8934"),n("f792"));r["a"].use(E["a"]);var I={user:null,unsubscribeAuthObserver:null},R=new E["a"].Store({state:I,getters:{isUserSignedIn:function(e){return null!==e.user}},mutations:{SET_AUTH_USER:function(e,t){e.user=t},SET_UNSUBSCRIBE_AUTH_OBSERVER:function(e,t){e.unsubscribeAuthObserver=t}},actions:{initAuthentication:function(e){var t=e.commit,n=e.state;return new Promise((function(e){n.unsubscribeAuthObserver&&n.unsubscribeAuthObserver();var r=S["a"].auth().onAuthStateChanged((function(n){console.log("👣 the user has changed"),n?(t("SET_AUTH_USER",n),e(n)):(t("SET_AUTH_USER",null),e(null))}));t("SET_UNSUBSCRIBE_AUTH_OBSERVER",r)}))},registerUserWithEmailAndPassword:function(e,t){var n=t.email,r=t.password;return S["a"].auth().createUserWithEmailAndPassword(n,r).catch((function(e){throw e}))},signInWithEmailAndPassword:function(e,t){var n=t.email,r=t.password;return S["a"].auth().signInWithEmailAndPassword(n,r)},signOut:function(){return S["a"].auth().signOut()},buildUserWishlistsTree:function(e,t){return Object(j["a"])(regeneratorRuntime.mark((function n(){var r,o,i,a,c,u,s,h,d,l,f,m,p,v,g,b,_;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=e.dispatch,o=t.uid,i=new A["a"]("root",{name:"Root"}),n.next=5,r("fetchAllWishlist",{uid:o});case 5:a=n.sent,c=Object(x["a"])(a),n.prev=7,c.s();case 9:if((u=c.n()).done){n.next=38;break}return s=u.value,h=i.addChild(new A["a"](s.id,{name:s.name,priority:s.priority,due_date:s.due_date,user:s.user,done:0,cost:0})),n.next=14,r("fetchItems",{wishlistId:s.id});case 14:d=n.sent,l=Object(x["a"])(d),n.prev=16,l.s();case 18:if((f=l.n()).done){n.next=28;break}return m=f.value,p=h.addChild(new A["a"](m.id,{name:m.name,priority:m.priority,due_date:s.due_date,done:m.done,cost:m.cost})),n.next=23,r("fetchItems",{wishlistId:s.id,itemId:m.id});case 23:v=n.sent,g=Object(x["a"])(v);try{for(g.s();!(b=g.n()).done;)_=b.value,p.addChild(new A["a"](_.id,{name:_.name,done:_.done,due_date:"",cost:_.cost,priority:m.priority}))}catch(w){g.e(w)}finally{g.f()}case 26:n.next=18;break;case 28:n.next=33;break;case 30:n.prev=30,n.t0=n["catch"](16),l.e(n.t0);case 33:return n.prev=33,l.f(),n.finish(33);case 36:n.next=9;break;case 38:n.next=43;break;case 40:n.prev=40,n.t1=n["catch"](7),c.e(n.t1);case 43:return n.prev=43,c.f(),n.finish(43);case 46:return n.abrupt("return",i);case 47:case"end":return n.stop()}}),n,null,[[7,40,43,46],[16,30,33,36]])})))()},fetchAllWishlist:function(e,t){return Object(j["a"])(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.uid,e.next=3,S["a"].firestore().collection("wishlist").where("user","==",n).get().then((function(e){var t=[];return e.forEach((function(e){t.push(Object(O["a"])({id:e.id},e.data()))})),t})).catch((function(e){throw e}));case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})))()},fetchItems:function(e,t){return Object(j["a"])(regeneratorRuntime.mark((function e(){var n,r,o,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=t.wishlistId,r=t.itemId,o="wishlist/".concat(n,"/items/"),r&&(o+="".concat(r,"/items")),e.next=5,S["a"].firestore().collection(o).get().then((function(e){var t=[];return e.forEach((function(e){t.push(Object(O["a"])({id:e.id},e.data()))})),t})).catch((function(e){throw e}));case 5:return i=e.sent,e.abrupt("return",i);case 7:case"end":return e.stop()}}),e)})))()},updateItem:function(e,t){return Object(j["a"])(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t.path,r=t.itemId,o=t.data,S["a"].firestore().collection(n).doc(r).update(o).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})))()},addItem:function(e,t){return Object(j["a"])(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t.path,r=t.itemId,o=t.data,S["a"].firestore().collection(n).doc(r).set(o).catch((function(e){return console.log(e)}));case 2:case"end":return e.stop()}}),e)})))()},deleteItem:function(e,t){return Object(j["a"])(regeneratorRuntime.mark((function e(){var n,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t.path,r=t.itemId,o=S["a"].functions().httpsCallable("recursiveDelete"),o({path:n+"/"+r}).then((function(e){console.log("Delete success: "+JSON.stringify(e))})).catch((function(e){console.log("Delete failed, see console,"),console.warn(e)}));case 3:case"end":return e.stop()}}),e)})))()}},modules:{}});r["a"].use(k["a"]);var T=[{path:"/",name:"Home",component:function(){return Promise.all([n.e("account~home~not_found~sign_form"),n.e("account~home~sign_form"),n.e("home~sign_form"),n.e("home")]).then(n.bind(null,"bb51"))},props:!0,meta:{requiresAuth:!0}},{path:"/sign",name:"SignForm",component:function(){return Promise.all([n.e("account~home~not_found~sign_form"),n.e("account~home~sign_form"),n.e("home~sign_form"),n.e("sign_form")]).then(n.bind(null,"8bd4"))},meta:{requiresGuest:!0}},{path:"/account",name:"Account",component:function(){return Promise.all([n.e("account~home~not_found~sign_form"),n.e("account~home~sign_form"),n.e("account")]).then(n.bind(null,"77be"))},props:!0,meta:{requiresAuth:!0}},{path:"*",name:"NotFound",component:function(){return Promise.all([n.e("account~home~not_found~sign_form"),n.e("not_found")]).then(n.bind(null,"9703"))}}],P=new k["a"]({mode:"history",base:"/wishlist_app/",routes:T});P.beforeEach((function(e,t,n){R.dispatch("initAuthentication").then((function(t){e.matched.some((function(e){return e.meta.requiresAuth}))?t?n():n({name:"SignForm",query:{redirectTo:e.path}}):e.matched.some((function(e){return e.meta.requiresGuest}))&&t?n({name:"Home"}):n()}))}));var U=P,C=(n("000b"),n("ea7b"),n("15f5"),n("5363"),n("f309"));r["a"].use(C["a"]);var B=new C["a"]({icons:{iconfont:"mdi",values:{up:"mdi-arrow-up-bold-circle",down:"mdi-arrow-down-bold-circle",cost:"mdi-cash",spent:"mdi-cash-check",remain:"mdi-cash-minus",done:"mdi-check",undone:"mdi-close",list:"mdi-clipboard-list",complete:"mdi-check",plus:"mdi-plus-circle-outline",cancel:"mdi-close",close:"mdi-close",delete:"mdi-close",clear:"mdi-close",success:"mdi-check",info:"mdi-information-outline",warning:"mdi-exclamation",error:"mdi-exclamation",prev:"mdi-chevron-left",next:"mdi-chevron-right",checkboxOn:"mdi-checkbox-marked-outline",checkboxOff:"mdi-checkbox-blank-outline"}}}),M={apiKey:"AIzaSyDW3exQMHcX-IiHcBHByBxLedSbJkDUvbw",authDomain:"wishlistapp-643a6.firebaseapp.com",projectId:"wishlistapp-643a6",storageBucket:"wishlistapp-643a6.appspot.com",messagingSenderId:"657412770551",appId:"1:657412770551:web:3fabf95ae13f80c261e1f2",measurementId:"G-0F19Z4DJ32"};S["a"].initializeApp(M),r["a"].config.productionTip=!1,new r["a"]({router:U,store:R,vuetify:B,render:function(e){return e(y)}}).$mount("#app")},f792:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n("d4ec"),o=n("bee2"),i=n("262e"),a=n("2caf"),c=(n("b0c0"),n("4de4"),n("a434"),n("4e82"),n("b85c"));function u(e){var t=[];t.push(this),function n(){var r,o;if(0!==t.length){o=t.shift();var i,a=Object(c["a"])(o.children);try{for(a.s();!(i=a.n()).done;){var u=i.value;t.push(u)}}catch(s){a.e(s)}finally{a.f()}r=e.call(void 0,o),!1!==r&&n()}}()}function s(e){var t,n=e.call(void 0,this),r=Object(c["a"])(this.children);try{for(r.s();!(t=r.n()).done;){var o=t.value;if(!1===n)return!1;n=s.call(o,e)}}catch(i){r.e(i)}finally{r.f()}return n}function h(e){var t,n,r=Object(c["a"])(this.children);try{for(r.s();!(n=r.n()).done;){var o=n.value;if(t=h.call(o,e),!1===t)return!1}}catch(i){r.e(i)}finally{r.f()}return t=e.call(void 0,this),t}var d=function(){function e(t,n){Object(r["a"])(this,e),this.parent=void 0,this.children=[],this.traversalMethods={breadth:u,pre:s,post:h},this.id=t,this.data=n}return Object(o["a"])(e,[{key:"addChild",value:function(t){if(!(t instanceof e))throw new TypeError("Child must be of type Node.");return t.parent=this,this.children.push(t),t}},{key:"drop",value:function(){var e;return this.isRoot||(e=this.parent.children.indexOf(this),this.parent.children.splice(e,1),this.parent=void 0,delete this.parent),this}},{key:"sort",value:function(e){this.children.sort(e)}},{key:"walk",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"pre";return this.traversalMethods[t].call(this,e)}},{key:"first",value:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"pre",r=function(n){if(e.call(void 0,n))return t=n,!1};return this.traversalMethods[n].call(this,r),t}},{key:"all",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"pre",n=[],r=function(t){e.call(void 0,t)&&n.push(t)};return this.traversalMethods[t].call(this,r),n}},{key:"index",get:function(){return this.isRoot?0:this.parent.children.indexOf(this)},set:function(e){if(this.isRoot){if(0===e)return;throw new Error("Invalid index.")}if(e<0||e>=this.parent.children.length)throw new Error("Invalid index.");var t=this.parent.children.indexOf(this);this.parent.children.splice(e,0,this.parent.children.splice(t,1)[0])}},{key:"isRoot",get:function(){return void 0===this.parent}},{key:"isLeaf",get:function(){return 0===this.children.length}},{key:"getDepth",get:function(){var e=0,t=this.parent;while(void 0!=t)t=t.parent,e++;return e}},{key:"getHeight",get:function(){var e=[];return this.walk((function(t){return e.push(t.getDepth)})),Math.abs(this.getDepth-Math.max.apply(Math,e))}},{key:"getPath",get:function(){var e=[];return function t(n){e.unshift(n),void 0!==n.parent&&t(n.parent)}(this),e}}],[{key:"addChildToNode",value:function(e,t){return t.parent=e,e.children.push(t),e}}]),e}(),l=function(e){Object(i["a"])(n,e);var t=Object(a["a"])(n);function n(e,o){var i;return Object(r["a"])(this,n),i=t.call(this,e,o),i.children=[],i.data=o,i}return Object(o["a"])(n,[{key:"name",get:function(){var e;return null===(e=this.data)||void 0===e?void 0:e.name}},{key:"due_date",get:function(){var e;return null===(e=this.data)||void 0===e?void 0:e.due_date}},{key:"priority",get:function(){var e;return null===(e=this.data)||void 0===e?void 0:e.priority}},{key:"cost",get:function(){return this.isLeaf?this.data.cost:this.total_cost}},{key:"done",get:function(){return this.isLeaf?this.data.done:this.children.every((function(e){return 100===e.done}))?100:0},set:function(e){this.data.done=e}},{key:"total_cost",get:function(){return this.children.reduce((function(e,t){return e+t.cost}),0)}},{key:"total_spent",get:function(){return this.children.reduce((function(e,t){return t.isLeaf?100===t.done?e+t.cost:e+0:e+t.total_spent}),0)}},{key:"remaining",get:function(){return this.total_cost-this.total_spent}},{key:"total_done",get:function(){return this.children.filter((function(e){var t;return 100===(null===(t=e.data)||void 0===t?void 0:t.done)})).length}},{key:"total_undone",get:function(){return this.children.filter((function(e){var t;return 0===(null===(t=e.data)||void 0===t?void 0:t.done)})).length}},{key:"progress",get:function(){return this.total_cost?Math.round(this.total_spent/this.total_cost*100):0}}]),n}(d)}});
//# sourceMappingURL=app.6438c680.js.map