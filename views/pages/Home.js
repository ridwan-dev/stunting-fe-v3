import WidgetCardLink from"../components/WidgetCardLink.js";import{logOut}from"../../services/auth.js";const Home={render:async()=>{if(null==JSON.parse(localStorage.getItem("userProfile")))return!1;const a=JSON.parse(localStorage.getItem("userProfile")).value,n=await WidgetCardLink.render("tile-1","Penandaan dan Pagu","verified","white-100","lg-2","white-100","#/penandaan-dan-pagu","<div style=''>Perkembangan penandaan dan pagu Program-program terkait dengan percepatan penurunan <i>stunting</i> pada tahap perencanaan dan penganggaran.</div>"),t=await WidgetCardLink.render("tile-2","Kinerja Anggaran","balance","white-100","lg-3","white-100","#/kinerja-anggaran-belanja-kl","<div style=''>Pemantauan kinerja Kementerian/Lembaga (K/L) serta mengidentifikasi kegiatan khususnya pada keluaran (output) yang berkontribusi terhadap percepatan penurunan stunting atas penggunaan anggaran yang tertuang dalam dokumen anggaran.</div>"),i=await WidgetCardLink.render("tile-3","Dana Alokasi Khusus","real_estate_agent","white-100","lg-3","white-100","#/dak","<div style=''>Pemantauan dana yang bersumber dari pendapatan APBN yang dialokasikan kepada daerah tertentu dengan tujuan untuk membantu mendanai kegiatan khusus yang merupakan urusan daerah dan sesuai dengan Prioritas Nasional  berupa DAK Fisik maupun Non Fisik, ke pemerintah daerah.</div>"),r=await WidgetCardLink.render("tile-4","Kinerja Pembangunan","stacked_bar_chart","white-100","lg-2","white-100","#/kinerja-pembangunan","<div style=''>Pemantau dan evaluasi kinerja kementerian/lembaga (K/L) serta mengidentifikasi keberhasilan dan hambatan pelaksanaan kegiatan.</div>"),d=await WidgetCardLink.render("tile-5","Capaian Indikator","insights","white-100","lg-2","white-100","#/capaian-indikator","<div style=''>Capaian Indikator meliputi cakupan gizi buruk <i>stunting, underweight, wasting</i> berdasarkan basis data survei terkait pada anak balita dan baduta.</div>");let s=[],o=[{sort:1,data:n}].concat({sort:2,data:t},{sort:3,data:i},{sort:4,data:r},{sort:5,data:d}),e=("undefined"==typeof user?s="":user.role_permissions.forEach((a,e)=>{"administrator"==a.name&&(s=o),"admin_ro"==a.name&&(s=o),"dashboard"==a.name&&(s=o),"kinerja_anggaran"==a.name&&(s[e]={sort:2,data:t}),"kineja_pembangunan"==a.name&&(s[e]={sort:4,data:r}),"capaian_indikator"==a.name&&(s[e]={sort:5,data:d}),"dak"==a.name&&(s[e]={sort:3,data:i}),"penandaan_pagu"==a.name&&(s[e]={sort:1,data:n})}),s.sort((a,e)=>a.sort-e.sort),[]);return s.forEach(a=>{e.push(a.data)}),`
    <div class="app-content-padding p-2 overflow-hidden" data-scrollbar="true">
      <div class="btn-group float-end">
        <a href="#" class="btn btn-sm btn-primary">${a.name}</a>
        <a href="#" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown">
          <i class="fa fa-caret-down"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <!-- <li class="dropdown-item">Setting</li> -->
          <li class="dropdown-item logout-button">Log Out</li>
        </ul>
      </div>
      <div class="p-3 text-center">                
        <p class="h2 text-green mt-5 mb-2">i-MONEV <span class="text-warning fw-bold">STUNTING</span></p>
        <p class="h3 text-gray-700 mt-3">Sistem Pemantauan & Evaluasi</p>
        <p class="h4 text-gray-700">Program Percepatan Penurunan Stunting</p>
        <p class="h5 text-gray-700">Secara Terintegrasi dan Berbasis Spasial</p>
      </div>
      <div class="container d-flex flex-column border-top pt-2">
        <div class="row p-2 align-self-center" id="widgetcard">
          ${e.join(" ")}
        </div>
      </div>
    </div>
    `},after_render:async()=>{try{let a=await fetch(config.api_url+"/pp/krisna-update",{method:"GET",headers:config.fetchHeaders});var e=await a.json();setWithExpiry("updateRenja",e.data,36e5)}catch(a){console.log(a)}$("#tile-1,#tile-2,#tile-3,#tile-4,#tile-5").find("h5").attr("style","height: 2em;");const a=D.querySelector(".logout-button");if(null==a)return!1;a.addEventListener("click",function(a){a.preventDefault(),logOut()})}};export default Home;