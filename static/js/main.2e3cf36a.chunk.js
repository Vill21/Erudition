(this["webpackJsonpsalute-demo-app"]=this["webpackJsonpsalute-demo-app"]||[]).push([[0],{214:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),c=n(16),i=n.n(c),u=(n(90),n(9)),l=n.n(u),a=n(8),s=n(26),d=n(17),v=n.n(d),f=n(39),b=n.n(f),j=n(85),h=n(82),p=(n(61),n(3)),O=function(t){var e=t.word||"",n=t.indArr,r=t.show;return Object(p.jsx)("span",{className:"container",children:e.split("").map((function(t,e){return n.find((function(t,n,r){return t-1===e}))||r?Object(p.jsx)("label",{className:"word",children:t},e):Object(p.jsx)("label",{className:"word"},e)}))})},m=n(40),x=n.n(m),g=n(13),w="https://shielded-escarpment-91826.herokuapp.com/words/";function y(){return k.apply(this,arguments)}function k(){return(k=Object(s.a)(l.a.mark((function t(){var e,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,x.a.get(w);case 2:return e=t.sent,n=e.data,t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var S=function(){var t,e,n,o,c=v()([]),i=Object(a.a)(c,3),u=(i[0],i[1]),d=i[2],f=v()(0),m=Object(a.a)(f,3),x=(m[0],m[1]),w=m[2],k=v()(0),S=Object(a.a)(k,3),N=S[0],F=S[1],_=S[2],A=v()([]),T=Object(a.a)(A,3),q=T[0],E=T[1],R=T[2],C=Object(r.useRef)(void 0),G=Object(r.useRef)("formal"),B=Object(r.useState)(!1),J=Object(a.a)(B,2),D=J[0],I=J[1],L=Object(r.useRef)(0),M=v()(0),P=Object(a.a)(M,3),z=P[0],H=P[1],K=P[2];Object(r.useEffect)((function(){var t;C.current=(t=function(){return Q()},Object(j.a)({getState:t})),C.current.on("start",(function(t){console.log("assistant.on(start)",t)})),C.current.on("data",(function(t){"character"==t.type&&(G.current=t.character.id),t.assistant&&("official"==t.assistant?G.current="formal":G.current="informal"),console.log("assistant.on(data)",t);var e=t.action;U(e)}))}),[]),Object(r.useEffect)((function(){(function(){var t=Object(s.a)(l.a.mark((function t(){var e;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y();case 2:(e=t.sent).sort((function(){return Math.random()-.5})),console.log(e),u(e);case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[]);var Q=function(){var t,e,n,r,o,c;console.log("getStateForAssistant: this.state:",null===_||void 0===_?void 0:_.current);var i={item_selector:{items:{word:null===d||void 0===d||null===(t=d.current)||void 0===t||null===(e=t[null===w||void 0===w?void 0:w.current])||void 0===e?void 0:e.word,question:null===d||void 0===d||null===(n=d.current)||void 0===n||null===(r=n[null===w||void 0===w?void 0:w.current])||void 0===r?void 0:r.question,future:null===d||void 0===d||null===(o=d.current)||void 0===o||null===(c=o[(null===w||void 0===w?void 0:w.current)+1])||void 0===c?void 0:c.question,point:null===_||void 0===_?void 0:_.current,lives:null===K||void 0===K?void 0:K.current,arr:null===R||void 0===R?void 0:R.current,speech:null===G||void 0===G?void 0:G.current,possibility:null===_||void 0===_?void 0:_.current,try:null===L||void 0===L?void 0:L.current}}};return console.log("getStateForAssistant: state:",i),i},U=function(t){if(console.log("dispatchAssistantAction",t),t)switch(t.type){case"guess_word":return Y(t);case"add_life":return Z();case"open_letter":return $(t);case"init":return W();case"ease":return X(t);default:throw new Error}},V=function(t,e){var n;console.log("START"),null===C||void 0===C||null===(n=C.current)||void 0===n||n.sendData({action:{action_id:t,payload:{asked:e}}})},W=function(){V("say_question","\u041e\u0433\u043b\u0430\u0441\u0438 \u0432\u043e\u043f\u0440\u043e\u0441")},X=function(t){t.body&&(I(!0),setTimeout((function(){var t=(null===w||void 0===w?void 0:w.current)+1;x(t);var e=(null===_||void 0===_?void 0:_.current)+1;E([]),F(e),V("say_question","\u041e\u0433\u043b\u0430\u0441\u0438 \u0432\u043e\u043f\u0440\u043e\u0441"),I(!1)}),4500)),L.current=0},Y=function(t){if(!0===t.isRight){var e,n;b()({title:"\u0412\u0435\u0440\u043d\u043e!",text:"\u0421\u043b\u043e\u0432\u043e: ".concat(null===d||void 0===d||null===(e=d.current)||void 0===e||null===(n=e[null===w||void 0===w?void 0:w.current])||void 0===n?void 0:n.word),icon:"success",timer:3e3});var r=(null===w||void 0===w?void 0:w.current)+1;x(r);var o=(null===_||void 0===_?void 0:_.current)+1;E([]),F(o),L.current=0}else if((null===K||void 0===K?void 0:K.current)>0){var c=(null===K||void 0===K?void 0:K.current)-1;H(c)}else b()({text:"\u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430 :(",icon:"error",timer:3e3}),F(0),L.current+=1},Z=function(){var t=(null===K||void 0===K?void 0:K.current)+1;H(t);var e=(null===_||void 0===_?void 0:_.current)-2;F(e)},$=function(t){var e=t.id,n=null===R||void 0===R?void 0:R.current;n.push(e),E(n);var r=(null===_||void 0===_?void 0:_.current)-1;F(r)};return Object(p.jsxs)("div",{className:"content",children:[Object(p.jsxs)("div",{children:[Object(p.jsxs)("label",{className:"texts",children:["\u0423\u0433\u0430\u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u043e\u0434\u0440\u044f\u0434: ",N]}),Object(p.jsxs)("button",{onClick:function(){V("add_life","\u041a\u0443\u043f\u0438\u0442\u044c \u0436\u0438\u0437\u043d\u044c")},className:"shine-button",children:[Object(p.jsx)(g.f,{color:"#FF0000",className:"texts"}),Object(p.jsxs)("label",{className:"texts",children:[": ",z]})]})]}),Object(p.jsx)("div",{className:"resolut",children:Object(p.jsx)(O,{word:null===d||void 0===d||null===(t=d.current)||void 0===t||null===(e=t[null===w||void 0===w?void 0:w.current])||void 0===e?void 0:e.word,indArr:q,show:D})}),Object(p.jsx)(h.TextBox,{title:"\u0417\u0430\u0433\u0430\u0434\u043a\u0430:",size:"l",subTitle:null===d||void 0===d||null===(n=d.current)||void 0===n||null===(o=n[null===w||void 0===w?void 0:w.current])||void 0===o?void 0:o.question,className:"texts",style:{margin:"3% 0 0 0"}})]})},N=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,216)).then((function(e){var n=e.getCLS,r=e.getFID,o=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),r(t),o(t),c(t),i(t)}))},F=n(84),_=n(1),A=n(30),T=n(2);function q(){var t=Object(F.a)(["\n    html:root {\n        min-height: 100vh;\n        color: ",";\n        background-color: ",";\n        background-image: ",";\n    }\n"]);return q=function(){return t},t}var E=Object(_.createGlobalStyle)(q(),T.text,T.background,T.gradient),R=Object(_.createGlobalStyle)(A.darkSber),C=(Object(_.createGlobalStyle)(A.darkJoy),Object(_.createGlobalStyle)(A.darkEva),function(){return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(E,{}),Object(p.jsx)(R,{})]})});i.a.render(Object(p.jsxs)(o.a.StrictMode,{children:[Object(p.jsx)(C,{}),Object(p.jsx)(S,{})]}),document.getElementById("root")),N()},61:function(t,e,n){},90:function(t,e,n){}},[[214,1,2]]]);
//# sourceMappingURL=main.2e3cf36a.chunk.js.map