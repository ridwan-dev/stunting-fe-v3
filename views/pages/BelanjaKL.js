import WidgetCard from"../components/WidgetCard.js";import{apiGeodataKab,apiDataTahun,apiBklKementerian,apiBklIntervensi,apiBklProgram}from"../../services/api.js";const KinerjaAnggaran={render:async()=>{return`
        <div class="app-content-padding flex-grow-1 overflow-auto"  data-height="100%" >				
            <!-- BEGIN page-header -->
            <h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">balance</i>Belanja K/L</h2>
            <!-- END page-header -->
            <!-- begin widget-card -->
            <div id="fbody" style="min-height: 53em;">
            <div class="row pt-3 mt-3  mx-0 py-3 bg-gray-300 rounded mb-3 hide" id="drp_option">
                <div class="col-xl-4 ">
                    <div class="form-group sel_tax">
                        <select id="sel_ta" name="sel_ta" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Tahun" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Tahun dipilih">
                        </select>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="form-group sel_kl">
                        <select id="sel_kl" name="sel_kl" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Kementerian/ Lembaga" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} K/L dipilih">
                        </select>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="form-group sel_ig">
                        <select id="sel_ig" name="sel_ig" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Intervensi" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Intervensi dipilih">
                        </select>
                    </div>
                </div>                
            </div>

            <div id="top-tiles" class="row mb-3">
                ${await WidgetCard.render("tile-1","Alokasi","","lg-3")}
                ${await WidgetCard.render("tile-2","Kinerja Anggaran","","lg-3")}
                ${await WidgetCard.render("tile-3","Capaian Output","","lg-3")}    
                ${await WidgetCard.render("tile-4","Sub Output / RO","","lg-3")}    
            </div>
            <!-- end widget-card -->
            
            <div class="row">
                <div class="col-xl-12">
                    <div id="leaflet-sidebar" class="leaflet-sidebar collapsed">
                        <div id="title-tab"></div>
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs hide" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link font-weight-normal active" id="detail-data-tab" data-toggle="tab" href="#detail-data" role="tab" aria-controls="home" aria-selected="true" style="text-shadow:none"><i class='fa fa-table text-primary me-2'></i>Detail Indikator</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link font-weight-normal" id="chart-tab" data-toggle="tab" href="#chart" role="tab" aria-controls="chart" aria-selected="false" style="text-shadow:none"><i class='fa fa-chart-bar text-primary me-2'></i>Grafik</a>
                            </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content mx-2">
                            <div class="tab-pane active" id="detail-data" role="tabpanel" aria-labelledby="home-tab">
                            <!--isi--> 
                            </div>
                            <div class="tab-pane  p-3" id="chart" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="row flex">
                                    <div class="card rounded-lg m-2 mt-3 col">
                                        <div class="card-body">
                                            <h5 class="card-title text-dark font-weight-bold">Proporsi Alokasi Anggaran</h5>
                                            <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Kementerian/ Lembaga </h6>
                                            <div id="chart-pie-kl"></div>
                                        </div>
                                    </div>
                                    <div class="card rounded-lg m-2 mt-3 col">
                                        <div class="card-body">
                                            <h5 class="card-title text-dark font-weight-bold">Alokasi dan Realisasi Anggaran</h5>
                                            <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Kementerian/ Lembaga </h6>
                                            <div id="chart-bar-kementerian"></div>
                                        </div>
                                    </div>                            
                                </div>
                                <div class="row flex">
                                    <div class="card rounded-lg m-2 mt-3 col">
                                        <div class="card-body">
                                            <h5 class="card-title text-dark font-weight-bold">Proporsi Alokasi Anggaran</h5>
                                            <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Intervensi </h6>
                                            <div id="chart-pie-int"></div>
                                        </div>
                                    </div>
                                    <div class="card rounded-lg m-2 mt-3 col">
                                        <div class="card-body">
                                            <h5 class="card-title text-dark font-weight-bold">Alokasi dan Realisasi Anggaran</h5>
                                            <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Intervensi </h6>
                                            <div id="chart-bar-int"></div>
                                        </div>
                                    </div>                            
                                </div>
                                <div class="row flex">
                                    <div class="card rounded-lg m-2 mt-3 col">
                                        <div class="card-body">
                                            <h5 class="card-title text-dark font-weight-bold">Capaian Indikator Komponen</h5>
                                            <h6 class="card-subtitle mb-2 text-dark">Terhadap Tahun Anggaran </h6>
                                            <div id="chart-capaian-1"></div>
                                        </div>
                                    </div>
                                    <div class="card rounded-lg m-2 mt-3 col">
                                        <div class="card-body">
                                            <h5 class="card-title text-dark font-weight-bold">Capaian Indikator Komponen</h5>
                                            <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Intervensi </h6>
                                            <div id="chart-capaian-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="peta-sebaran-kegiatan" class="rounded " style="width: 100%; float: left; "> </div>    
            </div>
            
        </div>`},after_render:async()=>{mData.GeodataKab=void 0===mData.GeodataKab?await apiGeodataKab():mData.GeodataKab,mData.DataThn=void 0===mData.DataThn?await apiDataTahun():mData.DataThn,mData.BklKementerian=void 0===mData.BklKementerian?await apiBklKementerian():mData.BklKementerian,mData.BklInterv=void 0===mData.BklInterv?await apiBklIntervensi():mData.BklInterv,mData.BklProgram=void 0===mData.BklProgram?await apiBklProgram():mData.BklProgram;let i=mData.GeodataKab,s=mData.DataThn,r=mData.BklKementerian,o=mData.BklInterv,u=mData.BklProgram,b=($(function(){$("select").selectpicker()}),document.getElementById("sel_ta")),h=document.getElementById("sel_kl"),f=document.getElementById("sel_ig"),v=[],x=[],k=[];s.forEach(a=>{x.push(`<option value="${a.id}" selected="selected">${a.text}</option>`)}),b.innerHTML=x.join(" "),r.forEach(a=>{v.push(`<option value="${a.id}" selected="selected">${a.text}</option>`)}),h.innerHTML=v.join(" "),o.forEach(a=>{let t=[];a.children.forEach(a=>{t.push(`<option data-subtext='${a.type}' value='${a.id}' selected="selected"> ${a.text}</option>`)}),k.push(`<optgroup label='${a.text}' >${t.join(" ")}</optgroup>`)}),f.innerHTML=k.join(" ");const y=document.getElementById("tile-1"),w=document.getElementById("tile-2"),_=document.getElementById("tile-3"),I=document.getElementById("tile-4");async function F(t,e,i){y.innerHTML=`
            <div class="loading spin-5px"></div>
            `,w.innerHTML=`
            <div class="loading spin-5px"></div>
            `,_.innerHTML=`
            <div class="loading spin-5px"></div>
            `,I.innerHTML=`
            <div class="loading spin-5px"></div>
            `;let n;try{let a=await fetch(config.api_url+"/monitoring/capaian/intervensitotal",{method:"POST",body:JSON.stringify({tahun:t,kementerian:e,intervensi:i}),headers:config.fetchHeaders});n=await a.json()}catch(a){return!1}y.innerHTML=`
                    <div class="d-flex bd-highlight">
                        <span class="h3 py-2 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(n.data.alokasi.toFixed(2)).toLocaleString("id-ID")}" title="" data-bs-original-title="Alokasi Tahun ${n.data.tahun}">
                            ${parseFloat((n.data.alokasi/1e12).toFixed(2)).toLocaleString("id-ID")}T
                        </span>
                    </div>
                    <div class="d-flex flex-row bd-highlight mb-3 fs-10px">
                        <div class="bd-highlight">
                            <div class="${n.data.perbandinganalokasi<0?"text-red":"text-lime-600"} text-lime fw-400">
                                <i class="fa ${n.data.perbandinganalokasi<0?"fa-caret-down":"fa-caret-up"}"></i> 
                                ${n.data.perbandinganalokasi<0?parseFloat((-1*n.data.perbandinganalokasi).toFixed(2)).toLocaleString("id-ID"):void 0===n.data.perbandinganalokasi?100:parseFloat(n.data.perbandinganalokasi.toFixed(2)).toLocaleString("id-ID")}%
                            </div>
                        </div>    
                        <div class="bd-highlight">
                            <div class="ms-1 fw-400">
                                <div>dari tahun sebelumnya
                                    <span class="text-blue fw-700" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(n.data.alokasi_sebelumnya.toFixed(2)).toLocaleString("id-ID")}" title="" data-bs-original-title="Alokasi Tahun ${n.data.tahun-1}">
                                        ${parseFloat((n.data.alokasi_sebelumnya/1e12).toFixed(2)).toLocaleString("id-ID")}T
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>              
                    `,w.innerHTML=`
                    <div class="d-flex bd-highlight">
                        <span class="h3 py-2 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(n.data.realisasi.toFixed(2)).toLocaleString("id-ID")}" title="" data-bs-original-title="Kinerja Anggaran Tahun ${n.data.tahun}">
                            ${parseFloat((n.data.realisasi/1e12).toFixed(2)).toLocaleString("id-ID")}T
                        </span>
                    </div>
                    <div class="d-flex flex-row bd-highlight mb-3 fs-10px">
                        <div class="bd-highlight">
                            <div class="${n.data.perbandingan_realisasi<0?"text-red":"text-lime-600"} text-lime fw-400">
                                <i class="fa ${n.data.perbandingan_realisasi<0?"fa-caret-down":"fa-caret-up"}"></i> 
                                ${(n.data.perbandingan_realisasi<0?parseFloat((-1*n.data.perbandingan_realisasi).toFixed(2)):parseFloat(n.data.perbandingan_realisasi.toFixed(2))).toLocaleString("id-ID")}%
                            </div>
                        </div>    
                        <div class="bd-highlight">
                            <div class="ms-1 fw-400">
                                <div>dari tahun sebelumnya
                                    <span class="text-blue fw-700" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(n.data.realisasi_sebelumnya.toFixed(2)).toLocaleString("id-ID")}" title="" data-bs-original-title="Kinerja Anggaran Tahun ${n.data.tahun-1}">
                                        ${parseFloat((n.data.realisasi_sebelumnya/1e12).toFixed(2)).toLocaleString("id-ID")}T
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>              
                    `,_.innerHTML=`
                    <div class="d-flex bd-highlight">
                        <span class="h3 py-2 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="${parseFloat(n.data.capaian_keu.toFixed(2)).toLocaleString("id-ID")}%" title="" data-bs-original-title="Capaian Output Tahun ${n.data.tahun}">
                            ${parseFloat(n.data.capaian_keu.toFixed(2)).toLocaleString("id-ID")}%
                        </span>
                    </div>
                    <div class="d-flex flex-row bd-highlight mb-3 fs-10px">
                        <div class="bd-highlight">
                            <div class="${n.data.perbandingan_capaiankeu<0?"text-red":"text-lime-600"} text-lime fw-400">
                                <i class="fa ${n.data.perbandingan_capaiankeu<0?"fa-caret-down":"fa-caret-up"}"></i> 
                                ${(n.data.perbandingan_capaiankeu<0?parseFloat((-1*n.data.perbandingan_capaiankeu).toFixed(2)):parseFloat(n.data.perbandingan_capaiankeu.toFixed(2))).toLocaleString("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2})}%
                            </div>
                        </div>    
                        <div class="bd-highlight">
                            <div class="ms-1 fw-400">
                                <div>dari tahun sebelumnya
                                    <span class="text-blue fw-700" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="${parseFloat(n.data.capaian_keu_sebelumnya.toFixed(2)).toLocaleString("id-ID")}%" title="" data-bs-original-title="Capaian Output Tahun ${n.data.tahun-1}">
                                        ${parseFloat(n.data.capaian_keu_sebelumnya.toFixed(2)).toLocaleString("id-ID")}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>              
                    `,I.innerHTML=`
                    <div class="d-flex bd-highlight">
                        <span class="h3 py-2 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="${parseFloat(n.data.capaian_fisik.toFixed(2)).toLocaleString("id-ID")}%" title="" data-bs-original-title="Sub Output/Rincian Output Tahun ${n.data.tahun}">
                            ${parseFloat(n.data.capaian_fisik.toFixed(2)).toLocaleString("id-ID")}%
                        </span>
                    </div>
                    <div class="d-flex flex-row bd-highlight mb-3 fs-10px ">
                        <div class="bd-highlight">
                            <div class="${n.data.perbandingan_capaianfisik<0?"text-red":"text-lime-600"} text-lime fw-400">
                                <i class="fa ${n.data.perbandingan_capaianfisik<0?"fa-caret-down":"fa-caret-up"}"></i> 
                                ${(n.data.perbandingan_capaianfisik<0?parseFloat((-1*n.data.perbandingan_capaianfisik).toFixed(2)):parseFloat(n.data.perbandingan_capaianfisik.toFixed(2))).toLocaleString("id-ID")}%
                            </div>
                        </div>    
                        <div class="bd-highlight">
                            <div class="ms-1 fw-400">
                                <div>dari tahun sebelumnya
                                    <span class="text-blue fw-700" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="${parseFloat(n.data.capaian_fisik_sebelumnya.toFixed(2)).toLocaleString("id-ID")}%" title="" data-bs-original-title="Sub Output/Rincian Output Tahun ${n.data.tahun-1}">
                                        ${parseFloat(n.data.capaian_fisik_sebelumnya.toFixed(2)).toLocaleString("id-ID")}%                                
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>              
                    `}await F($("#sel_ta").val(),$("#sel_kl").val(),$("#sel_ig").val()),$("#sel_ta, #sel_kl, #sel_int").on("change",async()=>{await F($("#sel_ta").val(),$("#sel_kl").val(),$("#sel_ig").val())}),void 0===numeral.locales.id&&numeral.register("locale","id",{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},currency:{symbol:"Rp",position:"prefix",spaceSeparated:"false"},ordinal:function(a){return"."}}),numeral.locale("id");let n=L.map("peta-sebaran-kegiatan",{zoomControl:!1,center:[-2.45,118],zoom:5.25,zoomSnap:.25,zoomDelta:.25,fadeAnimation:!1,zoomAnimation:!1});$("#myTab a").on("click",function(a){a.preventDefault(),$(this).tab("show")}),$("#chart-tab").on("click",function(a){sa(p)}),Apex.theme={mode:"light",palette:"palette2",monochrome:{enabled:!1,color:"#255aee",shadeTo:"light",shadeIntensity:.65}};var A={chart:{type:"bar",id:"bar-kl"},series:[{name:"Alokasi",type:"column",data:[]},{name:"Realisasi",type:"column",data:[]}],xaxis:{type:"category",categories:[]},yaxis:[{decimalsInFloat:0,tickAmount:4,title:{text:"Anggaran (Juta)"},labels:{formatter:function(a){return numeral(a/1e6).format("0,0")}}}],tooltip:{y:{formatter:function(a,{}){return numeral(a/1e6).format("0,0.00")+" Juta"}}},dataLabels:{enabled:!(Apex.chart={fontFamily:"Nunito, Segoe UI",toolbar:{show:!1}})},plotOptions:{bar:{horizontal:!1,endingShape:"rounded"}},noData:{text:"Loading..."}},D={chart:{id:"pie-kl",type:"donut"},legend:{position:"bottom"},plotOptions:{pie:{startAngle:-90,endAngle:270,size:"67%"}},series:[],labels:[],dataLabels:{enabled:!0,formatter:function(a,{}){return numeral(a).format("0")+"%"}},tooltip:{y:{formatter:function(a,{}){return numeral(a/1e6).format("0,0.000")+" Juta"}}}},C={chart:{id:"bar-int",type:"bar"},series:[{name:"Alokasi",type:"column",data:[]},{name:"Realisasi",type:"column",data:[]}],xaxis:{type:"category",categories:[],labels:{trim:!0}},yaxis:[{decimalsInFloat:0,tickAmount:4,title:{text:"Anggaran (Juta)"},labels:{formatter:function(a){return numeral(a/1e6).format("0,0")}}}],tooltip:{y:{formatter:function(a,{}){return numeral(a/1e6).format("0,0.00")+" Juta"}}},dataLabels:{enabled:!1},plotOptions:{bar:{horizontal:!1}}},S={chart:{id:"pie-int",type:"donut"},legend:{position:"bottom"},plotOptions:{pie:{startAngle:-90,endAngle:270,size:"67%"}},series:[],labels:[],fill:{type:"gradient"},dataLabels:{enabled:!0,formatter:function(a,{}){return numeral(a).format("0")+"%"}},tooltip:{y:{formatter:function(a,{}){return numeral(a/1e6).format("0,0.000")+" Juta"}}}},T={series:[{name:"Alokasi Anggaran",type:"column",data:[]},{name:"Capaian Anggaran",type:"line",data:[]},{name:"Capaian Indikator",type:"line",data:[]}],chart:{id:"mix-indi-1",type:"line"},markers:{size:5,colors:void 0,strokeColors:"#fff",strokeWidth:2,strokeOpacity:.9,strokeDashArray:0,fillOpacity:1,discrete:[],shape:"circle",radius:2,offsetX:0,offsetY:0,onClick:void 0,onDblClick:void 0,showNullDataPoints:!0,hover:{size:8,sizeOffset:3}},stroke:{width:[0,4,4],dashArray:[0,5,0]},xaxis:{categories:[]},yaxis:[{title:{text:"Alokasi Anggaran (Juta)"},decimalsInFloat:0,labels:{formatter:function(a){return numeral(a/1e6).format("0,0")}}},{seriesName:"Capaian Anggaran",title:{text:"Capaian Anggaran (%)"},decimalsInFloat:0,min:0,max:100,opposite:!0,show:!1},{seriesName:"Capaian Indikator",title:{text:"Capaian (%)"},decimalsInFloat:0,min:0,max:100,tickAmount:5,opposite:!0,showAlways:!0}],tooltip:{y:{formatter:function(a,{seriesIndex:t}){return 0==t?numeral(a/1e6).format("0,0.00")+" Juta":numeral(a).format("0,0.00")+" %"}}}},O={series:[{name:"Alokasi Anggaran",type:"column",data:[]},{name:"Capaian Anggaran",type:"line",data:[]},{name:"Capaian Indikator",type:"line",data:[]}],chart:{id:"mix-indi-2",type:"line"},markers:{size:5,colors:void 0,strokeColors:"#fff",strokeWidth:2,strokeOpacity:.9,strokeDashArray:0,fillOpacity:1,discrete:[],shape:"circle",radius:2,offsetX:0,offsetY:0,onClick:void 0,onDblClick:void 0,showNullDataPoints:!0,hover:{size:8,sizeOffset:3}},stroke:{width:[0,4,4],dashArray:[0,5,0]},xaxis:{categories:[],labels:{trim:!0}},yaxis:[{title:{text:"Alokasi Anggaran (Juta)"},decimalsInFloat:0,labels:{formatter:function(a){return numeral(a/1e6).format("0,0")}}},{seriesName:"Capaian Anggaran",title:{text:"Capaian Anggaran (%)"},decimalsInFloat:0,min:0,max:100,opposite:!0,show:!1},{seriesName:"Capaian Indikator",title:{text:"Capaian (%)"},decimalsInFloat:0,min:0,max:100,tickAmount:5,opposite:!0,showAlways:!0}],tooltip:{y:{formatter:function(a,{seriesIndex:t}){return 0==t?numeral(a/1e6).format("0,0.00")+" Juta":numeral(a).format("0,0.00")+" %"}}}},B=new ApexCharts(document.querySelector("#chart-pie-kl"),D),E=new ApexCharts(document.querySelector("#chart-bar-kementerian"),A),P=new ApexCharts(document.querySelector("#chart-pie-int"),S),j=new ApexCharts(document.querySelector("#chart-bar-int"),C),K=new ApexCharts(document.querySelector("#chart-capaian-1"),T),R=new ApexCharts(document.querySelector("#chart-capaian-2"),O);B.render(),E.render(),P.render(),j.render(),K.render(),R.render();let a=[],d=[],z,N,M,H,U,G,J,W,q,V,X,t,Y,c,Z,p,Q,aa=[],ta=0;const ea=L.Control.extend({options:{position:"topleft"},onAdd:function(a){var t=L.DomUtil.create("div","leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0");return t.title="Reset Posisi Peta",t.type="button",t.style.backgroundImage="url(img/home.png)",t.style.backgroundSize="26px 26px",t.style.width="27px",t.style.height="27px",t.onclick=function(){a.closePopup(),a.fitBounds(l.getBounds())},t}}),ia=L.Control.Watermark=L.Control.extend({onAdd:function(a){var t=L.DomUtil.create("img");return t.src="img/icon-logo.png",t.style.width="100px",t.style.opacity="0.7",t}});D=new GeoSearch.GeoSearchControl({provider:new GeoSearch.OpenStreetMapProvider({params:{"accept-language":"id",countrycodes:"id",addressdetails:0}}),showMarker:!1,searchLabel:"Pencarian Lokasi",style:"button",autoClose:!0,updateMap:!0});const m=L.control.sidebar("leaflet-sidebar",{closeButton:!0,position:"right"});n.addControl(m),n.addControl(new ea),n.addControl(D),n.addControl(new ia({position:"bottomleft"})),n.addControl(L.control.fullscreen({position:"topright",forceSeparateButton:!0,fullscreenElement:document.getElementById("fbody")})),L.control.zoom({position:"topright"}).addTo(n),n.on("enterFullscreen",function(){$("#peta-sebaran-kegiatan").addClass("fullscreen-map-belanja-kl"),$("#fbody").addClass(["p-2","bg-white"])}),n.on("exitFullscreen",function(){$("#peta-sebaran-kegiatan").removeClass("fullscreen-map-belanja-kl"),$("#fbody").removeClass(["p-2","bg-white","screen-map-belanja-kl"])}),n.on("click",function(){m.hide(),n.closePopup()});L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',maxZoom:18}).addTo(n);let l=L.geoJSON(null,{filter:function(a){return!!d[0]&&!!ra(a.properties.data,d[0]).length},style:function(a){return a.properties.style={fillColor:"#FFB230",color:"#FFFFFF",weight:1,fillOpacity:.9},a.properties&&a.properties.style},onEachFeature:function(t,e){var a=performance.now();t.properties&&(e.bindTooltip("<b>"+t.properties.kabupaten_nama+" |</b> "+t.properties.provinsi_nama),e.bindPopup('<div class="spinner-grow text-warning mt-2"></div>',{keepInView:!0,autoPan:!0,autoClose:!0,closeOnClick:!1,className:"popupCustom"}),e.on({mouseover:function(a){(a=a.target).setStyle({weight:4,color:"#666",dashArray:"",fillOpacity:.4}),L.Browser.ie||L.Browser.opera||L.Browser.edge||a.bringToFront(),e.openTooltip()},click:function(a){n.closePopup(),e.openPopup(),m.isVisible()&&m.hide();{var o=t.properties;let e="",s="",i=[],n=a.target.getPopup(),r=o.id;return void(async()=>{const a=await fetch(config.api_url+"/monitoring/capaian/intervensi",{method:"POST",body:JSON.stringify({lokasi_id:o.id,tahun:d[0].tahun,intervensi:d[0].intervensi_id,kementerian:d[0].kementerian_id}),headers:config.fetchHeaders});var t=await a.json();Z=t.data.indikator,aa=t.data.detail,p=t.data.chart,N=["tahun","kementerian_id"],z={},p.forEach(function(i){N.reduce(function(a,t,e){return a[i[t]]=a[i[t]]||(e+1===N.length?[]:{}),a[i[t]]},z).push(i)}),e="<span class='font-weight-bold text-light' style='font-size:1.4rem;'>"+o.kabupaten_nama+` </span>
                <span class='float-end me-4'><button id='infoBtn' class='btn btn-primary btn-sm rounded font-weight-bold mt-2'>Detail</button></span><br/>
                <span class='text-light' style='font-size:0.925rem;'>PROVINSI `+o.provinsi_nama.toUpperCase()+"</span><br/>",$.each(z,function(a,t){e+="<div class='bg-orange-600 badge badge-warning font-weight-bold text-light mt-3 me-1 mb-1 text-start' style='font-size:1rem;display: block;width: 3em;'>"+a+"</div>",$.each(t,function(a,t){e+="<ul class='list-group mt-1 border-0'>";a=g(Q,a);e+="<li class='list-group-item py-1 px-2 active' style='font-size:0.85rem;'><i class='fa fa-landmark me-2'></i>"+a.text+"</li>",$.each(t,function(a,t){e+="<li class='list-group-item py-1 px-2 text-dark' style='font-size:0.8rem;'><i class='fa fa-capsules me-2 text-primary'></i>"+t.intervensi+" <br><span class='badge badge-dark py-1 pl-2 text-black' style='font-size:0.75rem;'> Alokasi <b>Rp"+numeral(t.alokasi).format("0,0")+"</b> | Realisasi <b>Rp"+numeral(t.realisasi).format("0,0")+"</b> | <b>"+numeral(t.realisasi/t.alokasi).format("0.00%")+"</b></span></li>"}),e+="</ul>"})}),n.setContent(e),n.update(),X=L.DomUtil.get("infoBtn"),L.DomEvent.addListener(X,"click",function(a){m.isVisible()||m.toggle()}),aa&&(i=ra(aa,d[0])),M=["tahun","kementerian_id","intervensi_id","program_id","kegiatan_id","output_id","sub_output_id"],q={};let l;i.forEach(function(i){M.reduce(function(a,t,e){return a[i[t]]=a[i[t]]||(e+1===M.length?[]:{}),a[i[t]]},q).push(i)}),W="<p class='h3 p-0 m-0 mx-4 text-black'>"+o.kabupaten_nama+"</p><p class='h5 py-1 m-0 mx-4 mb-3 text-black'>PROVINSI "+o.provinsi_nama.toUpperCase()+"</p>",s="<section class='container p-0 m-0'>",document.getElementById("detail-data").innerHTML=s,document.getElementById("title-tab").innerHTML=W,Object.entries(q).forEach(([t,a])=>{s=(s+="<div class='ac p-0'>")+"<input class='ac-input' id='t-"+t+"' name='t-"+t+"' type='checkbox' /><label class='ac-label rounded-top bg-pastel-6 text-inverse my-0 mt-2 p-2 pl-3' for='t-"+t+"' style='font-size:1rem;'><i class='fa fa-calendar-alt me-2'></i>"+t+"</label>                                <article class='ac-text'>",Object.entries(a).forEach(([n,a])=>{V=g(Q,n),s=(s+="<div class='ac-sub'>")+"<input class='ac-input' id='k-"+t+n+"' name='k-"+t+n+"' type='checkbox' /><label class='ac-label bg-pastel-7 text-dark my-0 p-2 pl-3' for='k-"+t+n+"' style='font-size:0.95rem;'><i class='fa fa-landmark me-2'></i>"+V.text+"</label><article class='ac-text'>",Object.entries(a).forEach(([i,a])=>{H=0,U=0,G=g(Y,i),s=(s+="<div class='ac-sub'>")+"<input class='ac-input' id='i-"+t+n+i+"' name='i-"+t+n+i+"' type='checkbox' /><label class='ac-label bg-pastel-9 text-dark my-0 p-2 pl-3' for='i-"+t+n+i+"'><i class='fa fa-capsules me-2'></i>"+G.text+"<span class='badge badge-light float-end align-middle py-1'>INTERVENSI "+G.type.toUpperCase()+"</span></label><article class='ac-text'>",Object.entries(a).forEach(([a,t])=>{l=g(c,a),s=(s+="<div class='ac-sub bg-pastel-1'>")+"<input class='ac-input' id='p-"+n+i+a+"' name='p-"+n+i+a+"' type='checkbox' /><label class='ac-label text-dark my-0 p-2 pl-3 ml-2' for='p-"+n+i+a+"'><i class='fa fa-paperclip text-pink me-2'></i>"+l.text+"<span class='badge badge-pink mt-1 py-1 float-end'>PROGRAM</span></label><article class='ac-text'>",Object.entries(t).forEach(([a,t])=>{l=g(c,a),s=(s+="<div class='ac-sub bg-pastel-2'>")+"<input class='ac-input' id='pk-"+n+i+a+"' name='pk-"+n+i+a+"' type='checkbox'/><label class='ac-label text-dark my-0 p-2 pl-3 ml-3' for='pk-"+n+i+a+"'><i class='fa fa-paperclip text-blue me-2'></i>"+l.text+"<span class='badge badge-blue  mt-1 py-1 float-end'>KEGIATAN</span></label><article class='ac-text'>",Object.entries(t).forEach(([a,t])=>{l=g(c,a),s=(s+="<div class='ac-sub bg-pastel-3'>")+"<input class='ac-input' id='o-"+n+i+a+"' name='o-"+n+i+a+"' type='checkbox' /><label class='ac-label text-dark my-0 p-2 pl-3 ml-4' for='o-"+n+i+a+"'><i class='fa fa-paperclip text-orange me-2'></i>"+l.text+"<span class='badge badge-orange mt-1 py-1 float-end'>OUTPUT</span></label><article class='ac-text'>",Object.entries(t).forEach(([t,a])=>{l=g(c,t),s=(s+="<div class='ac-sub bg-pastel-4'>")+"<input class='ac-input' id='s-"+n+i+t+"' name='s-"+n+i+t+"' type='checkbox' /><label class='ac-label text-dark my-0 p-2 pl-3 ml-5' for='s-"+n+i+t+"' ><i class='fa fa-paperclip text-indigo me-2'></i>"+l.text+"<span class='badge badge-indigo mt-1 py-1 float-end'>SUB OUTPUT</span></label><article class='ac-text'>",Object.entries(a).forEach(([a,e])=>{l=g(c,e.komponen_id),J=Z.filter(a=>[e.komponen_id].includes(a.parent_id)&&[r].includes(a.lokasi_id)),s=(s=(s+="<div class='ac-sub bg-pastel-5'>")+"<input class='ac-input' id='p-"+n+i+t+a+e.komponen_id+"' name='p-"+n+i+t+a+e.komponen_id+"' type='checkbox' /><label class='ac-label text-dark my-0 p-2 ml-5' for='p-"+n+i+t+a+e.komponen_id+"'><i class='fa fa-paperclip text-danger me-2'></i>"+l.text+"<span class='badge badge-danger mt-1 py-1 float-end'>KOMPONEN</span></label>")+"<article class='ac-text'><div class='my-0 '><table class='table table-sm table-bordered my-0' style='border-color: #00000021;'><thead class='bg-light'>                                                <tr>                                                    <th rowspan='2' class='bg-pastel-5 text-dark text-center align-middle'>Satuan</th>                                                    <th colspan='3' class='bg-pastel-5 text-dark text-center align-middle'>Fisik</th>                                                    <th colspan='3'class='bg-pastel-5 text-dark text-center align-middle'>Keuangan</th>                                                </tr>                                                <tr>                                                    <th class='bg-pastel-5 text-dark text-center' style=width:10%'>Volume</th>                                                    <th class='bg-pastel-5 text-dark text-center' style='width:10%'>Realisasi</th>                                                    <th class='bg-pastel-5 text-dark text-center' style='width:10%'>Capaian(%)</th>                                                    <th class='bg-pastel-5 text-dark text-center' style=width:20%'>Alokasi</th>                                                    <th class='bg-pastel-5 text-dark text-center' style='width:20%'>Realisasi</th>                                                    <th class='bg-pastel-5 text-dark text-center' style='width:10%'>Capaian(%)</th>                                                </tr></thead><tbody>",$.each(J,function(a,t){s+="<tr class='bg-light'><td>"+t.satuan+"</td><td class='text-end'>"+e.target+"</td><td class='text-end'>"+(isNaN(e.target)?e.target:Math.floor(e.target*e.capaian_fisik/100))+"</td><td class='text-end'>"+e.capaian_fisik+"</td><td class='text-end'>"+numeral(e.alokasi).format("0,0")+"</td><td class='text-end'>"+numeral(e.realisasi).format("0,0")+"</td><td class='text-end'>"+e.capaian+"</td></tr>"}),s=(s+="</tbody></table></div>")+"</article></div>"}),s+="</article></div>"}),s+="</article></div>"}),s+="</article></div>"}),s+="</article></div>"}),s+="</article></div>"}),s+="</article></div>"}),s+="</article></div>"}),s+="</section>",document.getElementById("detail-data").innerHTML=s,sa(p)})()}},mouseout:na}));var i=performance.now();ta+=i-a}}).addTo(n);function na(a){l.resetStyle(a.target)}function la(){(a={tahun:[],kementerian_id:[],intervensi_id:[]}).tahun=$("#sel_ta").val(),a.kementerian_id=$("#sel_kl").val(),a.intervensi_id=$("#sel_ig").val(),(d=[]).push(a)}function sa(a){E.updateOptions({xaxis:{categories:e(a,"kementerian","grpby")},series:[{data:e(a,"kementerian","alokasi")},{data:e(a,"kementerian","realisasi")}]}),B.updateOptions({labels:e(a,"kementerian","grpby"),series:e(a,"kementerian","alokasi")}),j.updateOptions({xaxis:{categories:e(a,"intervensi","grpby")},series:[{data:e(a,"intervensi","alokasi")},{data:e(a,"intervensi","realisasi")}]}),P.updateOptions({labels:e(a,"intervensi","grpby"),series:e(a,"intervensi","alokasi")}),K.updateOptions({xaxis:{categories:e(a,"tahun","grpby")},series:[{data:e(a,"tahun","alokasi")},{data:e(a,"tahun","capaian_keuangan")},{data:e(a,"tahun","capaian_fisik")}]}),R.updateOptions({xaxis:{categories:e(a,"intervensi","grpby")},series:[{data:e(a,"intervensi","alokasi")},{data:e(a,"intervensi","capaian_keuangan")},{data:e(a,"intervensi","capaian_fisik")}]})}function g(a,t){return a[a.findIndex(a=>a.id==t)]}function e(a,e,t){var i=[],n=[];return a.reduce(function(a,t){return a[t[e]]||(a[t[e]]={grpby:t[e],alokasi:0,realisasi:0,capaian_keuangan:0,jumlah:0,jfis:0,capaian_fisik:0},i.push(a[t[e]])),a[t[e]].alokasi+=t.alokasi,a[t[e]].realisasi+=t.realisasi,a[t[e]].capaian_keuangan=a[t[e]].realisasi/a[t[e]].alokasi*100,a[t[e]].jumlah+=1,a[t[e]].jfis+=t.capaian_fisik,a[t[e]].capaian_fisik=a[t[e]].jfis/a[t[e]].jumlah,a},{}),i.forEach(a=>{n.push(a[t])}),n}(async()=>{performance.now(),n.spin(!0,{lines:10,length:20}),geoData=i,Q=r,t=o,Y=[].concat(t[0].children,t[1].children,t[2].children,t[3].children),c=u,performance.now();la(),l.addData(i),n.spin(!1)})();function ra(a,i){const t=Object.keys(i);return a.filter(e=>t.every(t=>!i[t].length||i[t].find(a=>("string"==typeof a?a.toUpperCase():a)==("string"==typeof e[t]?e[t].toUpperCase():e[t]))))}$(".selectpicker").on("changed.bs.select",function(a,t,e,i){l.clearLayers(),la(),l.addData(geoData),m.hide()});const oa=[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));oa.map(function(a){return new bootstrap.Popover(a)}),document.getElementById("myTab").classList.remove("hide"),document.getElementById("drp_option").classList.remove("hide")}};export default KinerjaAnggaran;