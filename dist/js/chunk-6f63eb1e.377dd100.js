(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f63eb1e"],{"1d55":function(t,e,s){"use strict";s("53bb")},"3ce8":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s(t.layout,{tag:"component"},[s("div",{staticClass:"page-info px-5 position-relative"},[s("h2",{staticClass:"h2 font-weight-bold"},[t._v("Contents")]),s("MenuContent",{attrs:{active:"jobs"}}),"normal"===t.profile.role?s("div",{staticClass:"wrap-content-head-btns"},[s("router-link",{staticClass:"btn font-weight-bol btn-gray-outline",attrs:{to:"/dashboard/content"}},[t._v("Cancel")]),s("button",{staticClass:"btn font-weight-bold btn-primary-outline ml-3",attrs:{disabled:""===t.post.title},on:{click:function(e){return t.saveAsDraft("draft")}}},[t._v(" Save as draft ")]),s("button",{staticClass:"btn font-weight-bold btn-success-outline ml-3",attrs:{disabled:""===t.post.title||""===t.post.category||""===t.post.content},on:{click:function(e){return t.publishArticle("pending")}}},[t._v(" Publish ")])],1):t._e()],1),s("div",{staticClass:"dash-container"},[t._v(" "+t._s(typeof t.tags)+" "+t._s(t.tags)+" "),"normal"===t.profile.role?s("div",[s("h4",{staticClass:"h5"},[s("router-link",{staticClass:"btn btn-back",attrs:{to:"/dashboard/content/blog"}},[s("i",{staticClass:"icon-arrow-left"}),s("span",{staticClass:"ml-3"},[t._v(" Back ")])]),s("span",{staticClass:"text-blue-dark font-weight-bold"},[t._v(" New post ")])],1),!t.created&&t.uploading?s("div",{staticClass:"alert alert-info"},[t._v(" Wait, we are creating your content... ")]):t._e(),t.created&&!t.uploading?s("div",{staticClass:"alert alert-success"},[t._v(" Your content has been created successfully! ")]):t._e(),s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm-12 col-md-8 col-l-8"},[s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.post.title,expression:"post.title"}],staticClass:"form-control custom-input",attrs:{type:"text",required:"",placeholder:"Post Title"},domProps:{value:t.post.title},on:{input:function(e){e.target.composing||t.$set(t.post,"title",e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("vue-editor",{attrs:{editorToolbar:t.toobar,editorOptions:t.editorSettings},model:{value:t.post.content,callback:function(e){t.$set(t.post,"content",e)},expression:"post.content"}})],1)]),s("div",{staticClass:"col-sm-12 col-md-4 col-l-4"},[s("div",{staticClass:"content-form-sidebar"},[s("h3",{staticClass:"h6"},[t._v("Category")]),s("div",{staticClass:"form-group"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.post.category,expression:"post.category"}],staticClass:"form-control form-control-lg",attrs:{name:"category"},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.post,"category",e.target.multiple?s:s[0])},function(e){return t.changeCategory(e)}]}},[s("option",{attrs:{value:"",selected:"",disabled:""}},[t._v("Select category")]),t._l(t.categories,(function(e,a){return s("option",{key:a,domProps:{value:e.name}},[t._v(" "+t._s(e.name)+" ")])})),s("option",{attrs:{value:"other"}},[t._v("Other category")])],2)]),t.showOtherCategoryInput?s("div",{staticClass:"form-group"},[s("h3",{staticClass:"h6"},[t._v("Specify other category")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.post.category,expression:"post.category"}],staticClass:"form-control custom-input",attrs:{type:"text",placeholder:"Type category..."},domProps:{value:t.post.category},on:{input:function(e){e.target.composing||t.$set(t.post,"category",e.target.value)}}})]):t._e(),s("h3",{staticClass:"h6"},[t._v("Tags")]),s("vue-tags-input",{attrs:{tags:t.tags},on:{"tags-changed":function(e){return t.tags=e}},model:{value:t.post.tags,callback:function(e){t.$set(t.post,"tags",e)},expression:"post.tags"}}),s("h3",{staticClass:"h6"},[t._v("Featured Image")]),s("button",{staticClass:"btn btn-block",on:{click:function(e){return t.$refs.FileInput.click()}}},[t._v(" Select image ")]),s("div",{staticClass:"my-3"},[s("input",{ref:"FileInput",staticStyle:{display:"none"},attrs:{type:"file"},on:{change:t.onFileSelect}}),s("VueCropper",{directives:[{name:"show",rawName:"v-show",value:t.selectedFile,expression:"selectedFile"}],ref:"cropper",attrs:{src:t.selectedFile,alt:"Source Image",aspectRatio:t.aspectRatio}})],1)],1)])])]):s("div",{staticClass:"not-allowed"})])])],1)},o=[],i=s("2b0e"),r=s("bc3a"),n=s.n(r),l=s("aa08"),c=s("8f8f"),p=s("95c3"),u=s.n(p),d=(s("6107"),s("c0dd")),g=s("c7a0"),h=s.n(g),m=s("5873"),v={name:"write-blog",components:{MenuContent:c["a"],VueCropper:u.a,VueTagsInput:h.a,VueEditor:m["a"]},data(){return{post:{title:"",content:"",tags:"",image:"",status:"pending",author:"",category:""},toobar:[["bold","italic","underline"]],editorSettings:{modules:{clipboard:{matchVisual:!1}}},tags:[],categories:[],mime_type:"",cropedImage:"",autoCrop:!1,selectedFile:"",aspectRatio:2,image:"",dialog:!1,files:"",uploading:!1,created:!1,showOtherCategoryInput:!1}},mounted(){this.categories=d["a"],this.post.author=`${this.profile.firstName} ${this.profile.lastName}`},methods:{changeCategory(t){"other"===t.target.value?(this.showOtherCategoryInput=!0,this.post.category=""):(this.showOtherCategoryInput=!1,this.post.category=t.target.value)},publishArticle(t){this.savePost(t)},saveAsDraft(t){this.savePost(t)},savePost(t){this.post.status=t,this.uploading=!0,this.created=!1;let e=[];if(this.tags){for(const t of this.tags)e=[...e,t.text];this.post.tags=JSON.stringify(e)}this.selectedFile?(this.uploading=!1,this.uploadImage()):this.submitPostNow()},submitPostNow(){l["a"].post("blog/post",this.post).then(()=>{this.created=!0,i["default"].$toast.open({message:"Blog has been created successfully",type:"success"}),setTimeout(()=>{},4500)}).catch(()=>{this.uploading=!1,this.created=!1,i["default"].$toast.open({message:"Sorry, something went wrong while updating your social media accounts",type:"error"})})},uploadImage(){this.cropedImage=this.$refs.cropper.getCroppedCanvas().toDataURL(),this.$refs.cropper.getCroppedCanvas().toBlob(t=>{const e=new FormData;e.append("file",t),e.append("upload_preset","wjjxv2a4"),e.append("cloud_name","dbvxqoznr");const s={headers:{"X-Requested-With":"XMLHttpRequest"}};n.a.post("https://api.cloudinary.com/v1_1/dbvxqoznr/image/upload",e,s).then(t=>{this.post.image=`v${t.data.version}/${t.data.public_id}.${t.data.format}`,this.submitPostNow()}).catch(()=>{this.uploading=!1,this.created=!1})},this.mime_type)},onFileSelect(t){const e=t.target.files[0];if(this.mime_type=e.type,console.log(this.mime_type),"function"===typeof FileReader){this.dialog=!0;const t=new FileReader;t.onload=t=>{this.selectedFile=t.target.result,this.$refs.cropper.replace(this.selectedFile)},t.readAsDataURL(e)}else alert("Sorry, FileReader API not supported")}},computed:{layout(){return this.$route.meta.layout}}},f=v,b=(s("1d55"),s("2877")),y=Object(b["a"])(f,a,o,!1,null,"013f4dda",null);e["default"]=y.exports},"53bb":function(t,e,s){}}]);
//# sourceMappingURL=chunk-6f63eb1e.377dd100.js.map