import{setWithExpiry,getWithExpiry,parseRequestUrl}from"./services/utils.js";import{validateAuth}from"./services/auth.js";import{api_url,api_url_v3}from"./js/utility/api.js";import Home from"./views/pages-dev/Home.js";import KinerjaAnggaran from"./views/pages-dev/KinerjaAnggaran.js";import KinerjaPembangunan from"./views/pages-dev/KinerjaPembangunan.js";import BelanjaKL from"./views/pages-dev/BelanjaKL.js";import PenandaanPagu from"./views/pages-dev/PenandaanPagu.js";import DAK from"./views/pages-dev/DAK.js";import CapaianIndikator from"./views/pages-dev/CapaianIndikator.js";import Login from"./views/pages-dev/Login.js";import Error404 from"./views/pages-dev/Error404.js";import AdminPenandaanDanPagu from"./views/pages-dev/admin/admin-penandaan-dan-pagu.js";import AdminPenandaanRo from"./views/pages-dev/admin/admin-penandaan-ro.js";import AdminPenandaanIntervensi from"./views/pages-dev/admin/admin-penandaan-intervensi.js";import AdminMasterIntervensi from"./views/pages-dev/admin/admin-master-intervensi.js";import AdminMasterKeywords from"./views/pages-dev/admin/admin-master-keywords.js";import Header from"./views/components-dev/Header.js";import Navbar from"./views/components-dev/Navbar.js";import Footer from"./views/components-dev/Footer.js";window.config={api_url:api_url(),api_url_v3:api_url_v3(),fetchHeaders:{Accept:"application/json","X-Requested-With":"XMLHttpRequest","Content-Type":"application/json; charset=utf-8",Authorization:"Bearer "+getWithExpiry("userLogIn")}},window.D=document,window.parseRequestUrl=parseRequestUrl,window.setWithExpiry=setWithExpiry,window.getWithExpiry=getWithExpiry,window.state={},window.geoData={},window.mData={},window.user={};let routesAdmin,routes=(null!=getWithExpiry("userProfile")&&(user.name=getWithExpiry("userProfile").name,user.email=getWithExpiry("userProfile").email,user.role_name=getWithExpiry("userProfile").roles[0].name,user.role_permissions=getWithExpiry("userProfile").roles[0].permissions,user.role_permissions.forEach(e=>{"administrator"==e.name&&(routesAdmin=["/admin-penandaan-dan-pagu","/admin-penandaan-ro","/admin-penandaan-intervensi","/admin-master-intervensi","/admin-master-keywords"]),"admin_ro"==e.name&&(routesAdmin=["/admin-penandaan-ro","/admin-master-keywords"])})),Number.prototype.format_uang=function(e,a,n,i){a="\\d(?=(\\d{"+(a||3)+"})+"+(0<e?"\\D":"$")+")",e=this.toFixed(Math.max(0,~~e));return(i?e.replace(".",i):e).replace(new RegExp(a,"g"),"$&"+(n||","))},{"/":Home,"/kinerja-anggaran-belanja-kl":KinerjaAnggaran,"/belanja-kl":BelanjaKL,"/kinerja-pembangunan":KinerjaPembangunan,"/penandaan-dan-pagu":PenandaanPagu,"/dak":DAK,"/capaian-indikator":CapaianIndikator,"/login":Login,"/admin-penandaan-dan-pagu":AdminPenandaanDanPagu,"/admin-penandaan-ro":AdminPenandaanRo,"/admin-penandaan-intervensi":AdminPenandaanIntervensi,"/admin-master-intervensi":AdminMasterIntervensi,"/admin-master-keywords":AdminMasterKeywords});var routesAuth=["/","/kinerja-anggaran-belanja-kl","/belanja-kl","/kinerja-pembangunan","/penandaan-dan-pagu","/dak","/capaian-indikator","/login"];"undefined"!=typeof user&&(routesAuth=routesAuth.concat(routesAdmin));const router=async()=>{var{resource:e,id:a,verb:n}=parseRequestUrl(),m=(routesAuth.includes("/"+e)||window.location.replace("#/login"),validateAuth(e)?"login"===e?window.location.replace("#/"):null:window.location.replace("#/login")),a=(routesAuth.includes("/"+e)||window.location.replace("#/"),(e?"/"+e:"/")+(a?"/:id":"")+(n?"/"+n:""));const i=D.getElementById("header"),r=D.getElementById("content"),t=D.getElementById("app"),s=D.getElementById("sidebar"),o=D.getElementById("app"),d=D.querySelector(".app-sidebar-bg"),p=routes[a]||Error404;t.classList.add("loading"),r.innerHTML=await p.render(),"login"===e||null===e?(o.classList.remove("app-header-fixed","app-content-full-height","app-with-wide-sidebar","app-with-light-sidebar"),o.classList.add("app-without-sidebar"),s.classList.add("d-none"),d.classList.add("d-none"),i.innerHTML="",s.innerHTML=""):(void 0===m&&window.location.replace("#/"),o.classList.remove("app-without-sidebar"),o.classList.add("app-header-fixed","app-content-full-height","app-with-wide-sidebar","app-with-light-sidebar"),s.classList.remove("d-none"),d.classList.remove("d-none"),i.innerHTML=await Header.render(),s.innerHTML=await Navbar.render(),r.innerHTML+=await Footer.render(),await Header.after_render(),await Navbar.after_render()),await p.after_render(),t.classList.remove("loading")};window.addEventListener("hashchange",router),window.addEventListener("load",router);