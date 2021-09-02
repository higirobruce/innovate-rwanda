(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5995d9f8"],{"08a0":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a(e.layout,{tag:"component"},[a("div",{class:!0===e.changingRole?"overlay covered":"overlay"},[a("div",{staticClass:"page-info px-5 position-relative"},[a("h2",{staticClass:"h2 font-weight-bold"},[e._v("Users")]),a("div",{staticClass:"wrap-content-head-btns align-items-end"},[e.profile&&"admin-user"===e.profile.role||"super-admin"===e.profile.role?a("button",{staticClass:"btn font-weight-bold btn-primary-outline",on:{click:e.regiserUser}},[e._v(" Add New User ")]):e._e()])]),a("div",{staticClass:"dash-container"},[!e.loading&&"admin-user"===e.profile.role||"super-admin"===e.profile.role?a("table",{staticClass:"table"},[a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[e._v("Names")]),a("th",{attrs:{scope:"col"}},[e._v("email")]),a("th",{attrs:{scope:"col"}},[e._v("Job")]),a("th",{attrs:{scope:"col"}},[e._v("Role")]),a("th",{attrs:{scope:"col"}},[e._v("Status")]),a("th",{attrs:{scope:"col"}},[e._v("Date")]),a("th",{attrs:{scope:"col"}},[e._v("Actions")])])]),e.users&&Object.keys(e.users).length?a("tbody",e._l(e.users,(function(t,o){return a("tr",{key:o,class:e.profile.id===t.id?"my-account":""},[a("td",[a("span",{staticClass:"cursor-pointer text-blue"},[e._v(" "+e._s(t.firstName)+" "+e._s(t.lastName)+" ")])]),a("td",[e._v(e._s(t.email))]),a("td",[e._v(e._s(t.jobTitle||"-"))]),a("td",["normal"!==t.role&&e.profile.id!==t.id?a("select",{staticClass:"form-control form-control-sm",attrs:{name:"role"},on:{change:function(t){return e.changeRole(t)}}},e._l(e.roles,(function(s,o){return a("option",{key:o,domProps:{value:t.text,selected:t.role===s.text}},[e._v(" "+e._s(s.name)+" ")])})),0):e._e(),"normal"===t.role?a("span",[e._v(" Normal ")]):e._e()]),a("td",{staticClass:"d-flex align-content-center flex-wrap"},["new"===t.status?a("span",{staticClass:"status pending"},[e._v(" Account not verified ")]):e._e(),"active"===t.status?a("span",{staticClass:"status approved"},[e._v(" Active ")]):e._e(),"inactive"===t.status?a("span",{staticClass:"status declined"},[e._v(" Inactive ")]):e._e()]),a("td",[e._v(e._s(e._f("date")(t.createdAt,"DD/MM/YYYY")))]),a("td",[a("div",{staticClass:"wrap-actions"},[e.profile.id!==t.id&&"active"===t.status?a("button",{on:{click:function(s){return e.deleteUser(t.email)}}},[a("img",{attrs:{src:s("b32a"),alt:"delete"}})]):e._e()])])])})),0):e._e()]):e._e(),e.loading||e.changingRole||0!==Object.keys(e.users).length?e._e():a("div",{staticClass:"not-found"}),a("modal",{attrs:{name:"openChangeRole",adaptive:!0,scrollable:!0,height:240,width:600}},[a("h3",{staticClass:"p-4 bottom-shadow shadow"},[e._v("Role")]),a("div",{staticClass:"p-4"},[e._v(" Do you really want to assign this role to "),a("b",[e._v(e._s(e.user.firstName)+" "+e._s(e.user.lastName))]),e._v("? ")]),a("div",{staticClass:"my-2 mx-4"},[a("span",{staticClass:"float-left"},[a("button",{staticClass:"btn btn-success-outline mr-2",on:{click:e.changeRoleAnyway}},[e._v(" Change role ")])]),a("span",{staticClass:"float-right"},[a("button",{staticClass:"btn btn-gray-outline mr-2",on:{click:e.closeModal}},[e._v(" Cancel ")])])])]),a("modal",{attrs:{name:"openRegister",adaptive:!0,scrollable:!0,height:660,width:800}},[a("NewUser")],1)],1)])])],1)},o=[],r=s("2b0e"),i=s("aa08"),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h3",{staticClass:"p-4 bottom-shadow shadow"},[e._v("Create a user")]),s("div",{staticClass:"px-4"},[s("form",{on:{submit:e.register}},[s("div",{staticClass:"wrap-modal py-2",staticStyle:{"max-height":"600px",overflow:"scroll"}},[s("h4",{staticClass:"pl-2"},[e._v("Names")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-6 col-sm-12"},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.$v.user.firstName.$model,expression:"$v.user.firstName.$model",modifiers:{trim:!0}}],staticClass:"form-control custom-input",attrs:{type:"text",name:"firstname",required:"",placeholder:"First name"},domProps:{value:e.$v.user.firstName.$model},on:{input:function(t){t.target.composing||e.$set(e.$v.user.firstName,"$model",t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])]),s("div",{staticClass:"col-lg-6 col-sm-12"},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.$v.user.lastName.$model,expression:"$v.user.lastName.$model",modifiers:{trim:!0}}],staticClass:"form-control custom-input",attrs:{type:"text",name:"last name",required:"",placeholder:"Lastname"},domProps:{value:e.$v.user.lastName.$model},on:{input:function(t){t.target.composing||e.$set(e.$v.user.lastName,"$model",t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])])]),s("h4",{staticClass:"pl-2"},[e._v("Emails")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.$v.user.email.$model,expression:"$v.user.email.$model",modifiers:{trim:!0}}],staticClass:"form-control custom-input",attrs:{type:"email",name:"email",placeholder:"Email"},domProps:{value:e.$v.user.email.$model},on:{input:function(t){t.target.composing||e.$set(e.$v.user.email,"$model",t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}})])])]),s("h4",{staticClass:"pl-2"},[e._v("Role")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-12"},[s("div",{staticClass:"form-group"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.user.role,expression:"user.role"}],staticClass:"form-control form-control-lg",attrs:{name:"role"},on:{change:[function(t){var s=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.user,"role",t.target.multiple?s:s[0])},function(t){return e.changeRole(t)}]}},[s("option",{attrs:{value:"",selected:"",disabled:""}},[e._v("Select role")]),e._l(e.roles,(function(t,a){return s("option",{key:a,domProps:{value:t.text}},[e._v(" "+e._s(t.name)+" ")])}))],2)])])]),s("h4",{staticClass:"pl-2"},[e._v("Password")]),s("div",{staticClass:"row"},[s("div",{staticClass:"col-8"},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"form-control custom-input",attrs:{disabled:"",placeholder:"Password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})])]),s("div",{staticClass:"col-4"},[s("button",{staticClass:"btn mt-3 btn-gray btn-block btn-sm",attrs:{type:"button"},on:{click:function(t){return e.generatePassword(10)}}},[e._v(" Generate new password ")])])])]),s("div",{staticClass:"my-2"},[s("span",{staticClass:"float-left"},[s("button",{staticClass:"btn btn-success float-right",attrs:{disabled:e.$v.$invalid,type:"submit"},on:{click:function(t){return t.preventDefault(),e.register(t)}}},[e._v(" Register new user ")])]),s("span",{staticClass:"float-right"},[s("button",{staticClass:"btn btn-gray-outline mr-2",attrs:{type:"button"},on:{click:e.closeModal}},[e._v(" Cancel ")])])])])])])},n=[],c=s("1881"),u=s.n(c),d=s("1dce"),m=s.n(d),p=s("b5ae");r["default"].use(m.a),r["default"].use(u.a);var h={name:"register-user",data(){return{user:{firstName:"",lastName:"",email:"",role:"",password:""},roles:[{name:"Administrator",text:"super-admin"},{name:"Users",text:"admin-user"},{name:"Blog",text:"admin-blog"},{name:"Events",text:"admin-event"},{name:"Jobs",text:"admin-job"},{name:"Companies",text:"admin-job"}]}},created(){this.generatePassword(10)},methods:{generatePassword(e){let t="";const s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=s.length;for(let o=0;o<e;o++)t+=s.charAt(Math.floor(Math.random()*a));this.user.password=t},changeRole(e){this.user.role=e.target.value},closeModal(){this.$modal.hide("openRegister")},register(){i["a"].post("users/create",this.user).then(()=>{r["default"].$toast.open({message:"User has been registered successfully, he/she should check the message sent to his/her email!",type:"success"}),setTimeout(()=>{this.$router.go()},2e3)}).catch(e=>{409===e.response.status?r["default"].$toast.open({message:"This account already exists",type:"info"}):r["default"].$toast.open({message:"Sorry, something went wrong. try again later!",type:"error"})}),this.closeModal()}},validations:{user:{firstName:{required:p["required"],minLength:Object(p["minLength"])(3),maxLength:Object(p["maxLength"])(25)},lastName:{required:p["required"],minLength:Object(p["minLength"])(3),maxLength:Object(p["maxLength"])(25)},email:{email:p["email"]},role:{required:p["required"]}}}},v=h,g=s("2877"),f=Object(g["a"])(v,l,n,!1,null,null,null),b=f.exports,C={components:{NewUser:b},data(){return{users:[],temporaryUsers:[],loading:!1,userRole:"",changingRole:!1,user:{},role:"",roles:[{name:"Administrator",text:"super-admin"},{name:"Users",text:"admin-user"},{name:"Blog",text:"admin-blog"},{name:"Events",text:"admin-event"},{name:"Jobs",text:"admin-job"},{name:"Companies",text:"admin-job"}]}},created(){this.loading=!0,this.loadUsers()},methods:{regiserUser(){this.$modal.show("openRegister")},deleteUser(e){i["a"].delete("users/deactivate/"+e).then(()=>{this.loadUsers(),r["default"].$toast.open({message:"User has been deleted successfully",type:"success"})}).catch(()=>{r["default"].$toast.open({message:"Sorry, something went wrong. try again later!",type:"error"})})},loadUsers(){this.loading=!0,i["a"].get("users").then(e=>{this.users=e.data.result,this.temporaryUsers=e.data.result,this.loading=!1}).catch(e=>{this.users=[],404===e.response.status||400===e.response.status?this.error="No content yet!":403===e.response.status?(this.error="No companies found at this moment",this.notAllowed=!0):this.error="Something went wrong, try again later",this.loading=!1})},closeModal(){this.changingRole=!1,this.users=this.temporaryUsers,this.$modal.hide("openChangeRole")},changeRole(e){console.log("en solo",e),this.changingRole=!0,this.users=[],this.$modal.show("openChangeRole")},changeRoleAnyway(){i["a"].put("users/change-role/"+this.user.id).then(()=>{r["default"].$toast.open({message:`Role of ${this.user.firstName} has been updated successfully`,type:"success"})}).catch(()=>{r["default"].$toast.open({message:"Sorry, something went wrong. try again later!",type:"error"})}),this.closeModal()}},computed:{layout(){return this.$route.meta.layout}}},w=C,_=(s("1217"),Object(g["a"])(w,a,o,!1,null,"45260106",null));t["default"]=_.exports},1217:function(e,t,s){"use strict";s("6943")},6943:function(e,t,s){},b32a:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAYAAACEYr13AAAACXBIWXMAAAsSAAALEgHS3X78AAAA2klEQVQ4je2UwRGCMBREXxwbsAVbwBK4kpstYAlaApaALXDjCi3YAi1Ywnc+BAyBERxvjjtD2En+7k8yszEiwjfYzmqtOQOpN/MArpRShKXTHXTirBV0QkUEHIEDpdzHBgl5YKqdG6BeMd+oQQXEbrFZeR2R+xfoESRBJCFt+ZovIdfGyjezF2hN5niGNanjFdbEYfnUAPbeFiOPx25t0eAj/A1+wmAuzhqWneMa3z4fms5REucN/MyXcvP4xavqGwwGKsqxJoz2O5x0eD0o1uiDMTgvoKGUGuAJ50xilb5BrM8AAAAASUVORK5CYII="}}]);
//# sourceMappingURL=chunk-5995d9f8.10b8f3af.js.map