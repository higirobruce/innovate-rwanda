(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-014447b8"],{"05f1":function(t,s,a){t.exports=a.p+"img/welcome-image.1a47075a.png"},"1f12":function(t,s,a){t.exports=a.p+"img/counter-users.0deb94a4.svg"},a03d:function(t,s,a){},aa08:function(t,s,a){"use strict";var e=a("bc3a"),o=a.n(e);const{VUE_APP_BACKEND_URL:n}=Object({NODE_ENV:"production",VUE_APP_BACKEND_URL:"http://localhost:5000/",BASE_URL:"/"});let c={headers:{authorization:localStorage.token||"","Cache-Control":"no-cache","Access-Control-Allow-Origin":"*","Content-Type":"application/json"}};class i{static post(t,s){return new Promise((a,e)=>o.a.post(`${n}${t}`,s,c).then(t=>{a(t)}).catch(t=>{e(t)}))}static get(t){return new Promise((s,a)=>o.a.get(`${n}${t}`,c).then(t=>{s(t)}).catch(t=>{a(t)}))}static put(t,s){return new Promise((a,e)=>o.a.put(`${n}${t}`,s,c).then(t=>{a(t)}).catch(t=>{e(t)}))}static patch(t,s){return new Promise((a,e)=>o.a.patch(`${n}${t}`,s,c).then(t=>{a(t)}).catch(t=>{e(t)}))}static delete(t){return new Promise((s,a)=>o.a.delete(`${n}${t}`,c).then(t=>{s(t)}).catch(t=>{a(t)}))}}s["a"]=i},adcf:function(t,s,a){"use strict";a("a03d")},c889:function(t,s,a){t.exports=a.p+"img/counter-pending.bf321032.svg"},ec4f:function(t,s,a){t.exports=a.p+"img/counter-companies.e215187d.svg"},ed52:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"wrap-home-dash"},[e(t.layout,{tag:"component"},[e("div",{staticClass:"dash-welcome"},[e("div",{staticClass:"welcome-content"},[e("h1",{staticClass:"h2 font-weight-bold text-blue-dark"},[t._v("Welcome")]),e("div",[t._v(" Innovate Rwanda was created to showcase Rwanda’s growing ecosystem of technology and technology-enabled corporations, SMEs and startups and enablers. Innovation and Technology are at the core of Rwanda’s strategy for economic and social transformation and this platform represents the shared interests of the community to connect, collaborate and innovate for growth. ")])]),e("div",{staticClass:"welcome-img"},[e("img",{attrs:{src:a("05f1")}})])]),t._.isEmpty(t.summary)?t._e():e("div",{staticClass:"wrap-counters"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-12 col-lg-4"},[e("div",{staticClass:"one-counter"},[e("img",{attrs:{src:a("ec4f")}}),e("h3",{staticClass:"ml-2"},[t._v(t._s(t.summary.approvedCompaniesCount))]),e("h4",{staticClass:"ml-2"},[t._v("Total registered Companies")])])]),e("div",{staticClass:"col-sm-12 col-lg-4"},[e("div",{staticClass:"one-counter"},[e("img",{attrs:{src:a("1f12")}}),e("h3",{staticClass:"ml-2"},[t._v(t._s(t.summary.usersCount))]),e("h4",{staticClass:"ml-2"},[t._v("Users")])])]),e("div",{staticClass:"col-sm-12 col-lg-4"},[e("div",{staticClass:"one-counter"},[e("img",{attrs:{src:a("c889")}}),e("h3",{staticClass:"ml-2"},[t._v(t._s(t.summary.pendingRequestsCount))]),e("h4",{staticClass:"ml-2"},[t._v("Pending Registration Requests")])])])])])])],1)},o=[],n=a("aa08"),c={name:"dashboard",components:{},data(){return{summary:{}}},computed:{layout(){return this.$route.meta.layout}},created(){this.loadingDirectory=!0,n["a"].get("counters").then(t=>{this.summary=t.data.result})}},i=c,r=(a("adcf"),a("2877")),l=Object(r["a"])(i,e,o,!1,null,"607f0284",null);s["default"]=l.exports}}]);
//# sourceMappingURL=chunk-014447b8.09002116.js.map