(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aeb36"],{"0ad3":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i(t.layout,{tag:"component"},[i("div",{staticClass:"page-info"},[i("h2",{staticClass:"h2 font-weight-bold"},[t._v("Settings")]),i("MenuSettings",{attrs:{active:"blog"}})],1)])],1)},a=[],n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"page-nav list-inline"},[t.profile&&"super-admin"===t.profile.role?i("li",{class:{"list-inline-item mr-5 list-active":"blog"==t.active,"list-inline-item mr-5":"blog"!=t.active}},[i("router-link",{attrs:{exact:"",to:"/dashboard/content"}},[t._v("Profile")])],1):t._e(),t.profile&&"super-admin"===t.profile.role?i("li",{class:{"list-inline-item mr-5 list-active":"events"==t.active,"list-inline-item mr-5":"events"!=t.active}},[i("router-link",{attrs:{exact:"",to:"/dashboard/content/events"}},[t._v("Business Activities")])],1):t._e(),t.profile&&"super-admin"===t.profile.role?i("li",{class:{"list-inline-item mr-5 list-active":"jobs"==t.active,"list-inline-item mr-5":"jobs"!=t.active}},[i("router-link",{attrs:{exact:"",to:"/dashboard/content/jobs"}},[t._v("Company type")])],1):t._e(),i("li",{class:{"list-inline-item mr-5 list-active":"jobs"==t.active,"list-inline-item mr-5":"jobs"!=t.active}},[i("router-link",{attrs:{exact:"",to:"/dashboard/content/jobs"}},[t._v("Reset password")])],1)])},l=[],o={name:"menu-content",props:["active"],data(){return{user:{},auth:!1}},mounted(){this.user=JSON.parse(localStorage.getItem("profile"))||{},this.auth=localStorage.getItem("isAuth")||!1}},r=o,c=i("2877"),u=Object(c["a"])(r,n,l,!1,null,null,null),m=u.exports,v={name:"dashboard",components:{MenuSettings:m},computed:{layout(){return this.$route.meta.layout}}},p=v,d=Object(c["a"])(p,s,a,!1,null,"4ba2cb66",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0aeb36.2091012f.js.map