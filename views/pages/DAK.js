import WidgetCard from"../components/WidgetCard.js";import{ApiTahunDAK,ApiDataByTahun,apiAnggaranDak,ApiDakPeta}from"../../services/api.js";const DAK={render:async()=>{return`
    <div class="app-content-padding flex-grow-1 overflow-auto" data-height="100%" >
				<!-- BEGIN page-header -->
				<h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">real_estate_agent</i>Dana Alokasi Khusus Fisik</h2>
				<!-- END page-header -->
        <!-- begin widget-card -->        
        <div id="fbody">
          <div class="row card-deck">
            ${await WidgetCard.render("tile-1","Total Anggaran","transparent","lg-3 ")}
            ${await WidgetCard.render("tile-2","Top 5 Provinsi & Kota/ Kab","white-100","lg-6 ")}
            ${await WidgetCard.render("tile-4","3 Tahun Terakhir","light-100","lg-3")}
          </div>
        <!-- end widget-card -->        
        <!-- begin widget-map -->
          <div class="border rounded mt-4 p-2">
            <div class="row pt-2">
              <div class="col-sm-12 col-xl-7 col-lg-8">
                <div class="mb-3 ps-2 fs-13px">
                  <b>SEBARAN ALOKASI ANGGARAN DAK FISIK</b>
                  <span class="ms-2 text-muted">
                    <i class="fa fa-info-circle" data-bs-toggle="popover" data-bs-trigger="hover"
                      data-bs-title="Sebaran Alokasi Anggaran DAK Fisik" data-bs-placement="top"
                      data-bs-content="Sebaran Alokasi Anggaran DAK Fisik." data-original-title="" title="">
                      </i>
                  </span>
                </div>
              </div>
              <div class="col-sm-2 col-xl-1">
                <div class="form-group mt-n2">
                  <select class="selectpicker" id="tahun-group" title="Tahun" data-style="btn-white" data-selected-text-format="count > 2" data-actions-box="true"  
                    data-selected-text-format="count > 2" data-width='100%' data-actions-box="false">
                    <option value="2021" selected>2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-10 col-xl-4">
                <div class="form-group mt-n2 ms-n1 me-2">
                  <select class="selectpicker" id="bidang-group" title="Bidang Kegiatan"
                    data-style="btn-white" data-selected-text-format="count > 2" data-width='100%' data-multiple-separator=' ' data-select-all-text='Semua' data-deselect-all-text='Reset' data-actions-box="true" multiple
                    data-selected-text-format="count > 2" data-actions-box="true" multiple>
                    <option data-icon="text-yellow fa fa-circle" value="Kesehatan dan KB" selected>Kesehatan dan KB</option>
                    <option data-icon="text-primary fa fa-circle" value="Air Minum" selected>Air Minum</option>
                    <option data-icon="text-success fa fa-circle" value="Sanitasi">Sanitasi</option>
                    <option data-icon="text-warning fa fa-circle" value="Lingkungan Hidup dan Kehutanan">Lingkungan Hidup dan Kehutanan</option>
                  </select>
                </div>
              </div>
            </div>          
            <div class="row px-3">
              <div  id="map-dak" class="col-xl-12 col-12" ></div>
            </div>            
          </div>
          <div class="row my-3">
            <div class="col-xl-6 col-6 " >
              <div class="card" >
                <div class="card-body me-1">
                  <div class="mb-2 fs-13px">
                    <b>BIDANG</b>
                    <span class="ms-2 text-muted">
                      <i class="fa fa-info-circle" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title="Pemetaan Berdasarkan Bidang" data-bs-placement="top" data-bs-content="Menampilkan data alokasi berdasarkan Bidang DAK." data-bs-original-title="" title=""></i>
                    </span>
                  </div>
                  <div id="chart-bidang" class="mb-2" style="height: 200px"></div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-6" >
              <div class=" card" >
                <div class="card-body ms-1">
                  <div class="mb-2 fs-13px">
                    <b>REALISASI BERDASARKAN TAHUN</b>
                    <span class="ms-2 text-muted">
                      <i class="fa fa-info-circle" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title="Realisasi berdasarkan tahun" data-bs-placement="top" data-bs-content="Menampilkan data realisasi DAK berdasarkan tahun." data-bs-original-title="" title=""></i>
                    </span>
                  </div>
                  <div id="chart-realisasi" class="mb-2" style="height: 200px"></div>
                </div>
              </div>               
            </div>               
          </div>
          <div class="card">
            <div class="card-body">
              <div class="row pt-3 mx-0 mb-3 py-3 bg-gray-300 rounded" id="drp_option">
                <div class="col-xl-3 ">
                  <div class="form-group sel_tax">                  
                    <select id="sel_ta" name="sel_ta" class="form-control selectpicker" data-title="Pilih Tahun" data-actions-box="true" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset">
                    </select>                    
                  </div>
                </div>
                <div class="col-xl-9">
                  <div class="form-group sel_tp">
                    <select id="sel_tp" name="sel_tp" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Tingkat Pelaksanaan" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Tingkat Pelaksanaan dipilih">
                    </select>
                  </div>
                </div>
                <div class="col-xl-3 hide">
                  <div class="form-group sel_provinsi">                  
                    <select id="sel_provinsi" name="sel_provinsi" class="form-control selectpicker" data-live-search="true" data-title="Pilih Intervensi" data-show-subtext="true" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Provinsi dipilih">
                    </select>                  
                  </div>
                </div>
                <div class="col-xl-3 hide">
                  <div class="form-group sel_pemda">                  
                    <select id="sel_pemda" name="sel_pemda" class="form-control selectpicker" data-live-search="true" data-title="Pilih Intervensi" data-show-subtext="true" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Pemda dipilih">
                    </select>
                  </div>
                </div>                
                <!-- <div class="col-xl-1 ">
                    <div class="form-group pull-right width-full">              
                      <div class="menu-icon btn btn-primary m-0 p-0 px-2" data-bs-toggle="modal" data-bs-target="#chartModal" >
                        <i class="material-icons fs-29px">bar_chart</i>
                      </div>
                    </div>
                </div> -->
              </div>
              <div class="d-flex justify-content-between bd-highlight" style="height: 2em;">
                <div class="bd-highlight cursor-pointer open_table" style="width: 6%;">
                    <div class="fs-12px fw-600 position-relative ">                  
                      <i class="material-icons fs-15px text-green-400">close_fullscreen</i> 
                      <span class="position-absolute top-50 start-5 translate-middle-y ps-1 material-text">Open All</span>
                    </div>
                  </div>
                <div class="bd-highlight mt-n1 fs-11px fw-600">
                  <div class="d-flex flex-row hide" id="provkab">
                    <div class="form-check-inline bd-highlight ps-1 me-1">Filter By :</div>
                    <div class="form-group bd-highlight">                  
                      <select id="provkabG" name="provkab" class="form-control selectpicker" data-title="Pilih Intervensi" data-show-subtext="true" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Pemda dipilih">
                        <option value="Provinsi" selected="selected"> Provinsi </option>
                        <option value="Kota/ Kabupaten" selected="selected"> Kota/Kabupaten </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between bd-highlight">

                  

                  <div class="bd-highlight">
                    <div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700 my-2 mt-n1 fs-11px">
                      
                      <div class="bd-highlight">
                        <i class="fas fa-lg fa-fw fa-file-pdf p-0 m-0 cursor-pointer fs-15px text-red-400" title="export pdf" id="download-pdf-dak"></i>
                      </div>  
                      <div class="bd-highlight">
                        <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer fs-15px text-green-400" title="export xls" id="download-xlsx-dak"></i>
                      </div>    
                      <div class="bd-highlight">
                        <div class="fs-12px fw-700">Download : </div>
                      </div>        
                    </div>
                  </div>
                </div>
              </div>
              <div id="dak-table" class="rounded-bottom"></div>  
            </div>        
          </div>
        </div>
      </div>
    </div>`},after_render:async()=>{const l=document.getElementById("tile-1"),p=document.getElementById("tile-2"),m=(document.getElementById("tile-3"),document.getElementById("tile-4"));mData.dataDak=void 0===mData.dataDak?await apiAnggaranDak():mData.dataDak,mData.tahunDAK=void 0===mData.tahunDAK?await ApiTahunDAK():mData.tahunDAK,mData.dataByTahun=void 0===mData.dataByTahun?await ApiDataByTahun():mData.dataByTahun,mData.DakPeta=void 0===mData.DakPeta?await ApiDakPeta():mData.DakPeta;let t=2021,u=document.getElementById("sel_ta"),g=document.getElementById("sel_tp"),a=document.getElementById("sel_pemda"),h=document.getElementById("sel_provinsi"),e=[],i=[],v=[],f=[],s=13;if(void 0===mData.GrpBidang){let a=arr_groupBy([1]);mData.GrpBidang=a(mData.dataDak)}async function b(e){(new FormData).append("tahun[]",e);try{let a=await fetch(config.api_url+"/dak/data-by-bidang",{method:"POST",body:JSON.stringify({tahun:[e]}),headers:config.fetchHeaders});var t=await a.json();return $("#chart-bidang").parent().find("b").html("Bidang Tahun "+e),t.data}catch(a){return!1}}if(void 0===mData.filterBidang&&(mData.filterBidang=Object.keys(mData.GrpBidang)),void 0===mData.DataByTingpel){let e;await b(t).then(function(a){e=a}),mData.DataByTingpel=e}function x(a){let e=a,t=am4core.create("chart-bidang",am4charts.PieChart),i=[];e.forEach(a=>{i.push({bidang_kode:a.bidang_kode,bidang_nama:a.bidang_nama,grand_total:parseFloat((a.grand_total/1e12).toFixed(2))})}),t.data=i;a=t.series.push(new am4charts.PieSeries);a.dataFields.value="grand_total",a.dataFields.category="bidang_nama",t.innerRadius=am4core.percent(40),a.labels.template.disabled=!0,a.labels.template.maxWidth=130,a.labels.template.wrap=!0,a.ticks.template.disabled=!0,a.slices.template.tooltipText="{category}: {value.value}T",a.colors.list=[am4core.color("#eb72a2"),am4core.color("#44b5de"),am4core.color("#845EC2"),am4core.color("#2eb6ac"),am4core.color("#D65DB1"),am4core.color("#FF6F91"),am4core.color("#FF9671"),am4core.color("#FFC75F"),am4core.color("#F9F871")],t.legend=new am4charts.Legend,t.fontSize=12,t.legend.position="right",exportAmchart4(t)}$("#chart-bidang").parent().find("b").html("Bidang Tahun "+t),x(mData.DataByTingpel),$("#tahun-group").on("change",async function(){let e,a=$(this).val();return await b(a).then(function(a){e=a}),mData.DataByTingpel=e,x(mData.DataByTingpel)});let _=mData.dataByTahun;if(am4core.ready(function(){am4core.useTheme(am4themes_animated);var o=am4core.create("chart-realisasi",am4charts.XYChart),d=(o.legend=new am4charts.Legend,o.legend.position="bottom",o.legend.paddingBottom=0,o.legend.labels.template.maxWidth=10,o.fontSize=12,o.xAxes.push(new am4charts.CategoryAxis));function a(a,e){var t=o.series.push(new am4charts.ColumnSeries);return t.dataFields.valueY=e,t.dataFields.categoryX="tahun",t.name=a,t.tooltipText="{name}: [bold]{valueY}T[/]",t.events.on("hidden",i),t.events.on("shown",i),t}d.dataFields.category="tahun",d.renderer.cellStartLocation=.1,d.renderer.cellEndLocation=.9,d.renderer.grid.template.location=0,d.renderer.minGridDistance=50,o.yAxes.push(new am4charts.ValueAxis).min=0;let e=[];function i(){var a,t,i,e,n,l=o.series.getIndex(0),s=1-d.renderer.cellStartLocation-(1-d.renderer.cellEndLocation);1<l.dataItems.length&&(a=d.getX(l.dataItems.getIndex(0),"categoryX"),t=(d.getX(l.dataItems.getIndex(1),"categoryX")-a)/o.series.length*s,am4core.isNumber(t)&&(i=o.series.length/2,e=0,o.series.each(function(a){a.isHidden||a.isHiding?a.dummyData=o.series.indexOf(a):(a.dummyData=e,e++)}),n=e/2,o.series.each(function(a){var e=o.series.indexOf(a),e=(a.dummyData-e+i-n)*t;a.animate({property:"dx",to:e},a.interpolationDuration,a.interpolationEasing),a.bulletsContainer.animate({property:"dx",to:e},a.interpolationDuration,a.interpolationEasing)})))}_.chart_data.forEach(a=>{e.push({nilai_rk:parseFloat((a.nilai_rk/1e12).toFixed(2)),realisasi:parseFloat((a.realisasi/1e12).toFixed(2)),tahun:a.tahun})}),o.data=e,a("Alokasi","nilai_rk"),a("Realisasi","realisasi"),o.adapter.add("tooltipText",function(a,e){return e.dataItem.dataContext.value?a:"{name}: No value"}),o.cursor=new am4charts.XYCursor,exportAmchart4(o)}),t=Math.max(...mData.tahunDAK),void 0===mData.PageData){let e;await async function(){(new FormData).append("tahun[]",t);try{let a=await fetch(config.api_url+"/dak/one-page",{method:"POST",body:JSON.stringify({tahun:[t]}),headers:config.fetchHeaders});return(await a.json()).data}catch(a){return!1}}().then(function(a){e=a}),mData.PageData=e}let n=mData.PageData,k=(mData.dak_total_anggaran=n.total_dak,mData.dak_total_anggaran_before=n.total_dak_before,mData.dak_selisih=n.total_dak-n.total_dak_before,mData.dak_selisih_persen=(n.total_dak-n.total_dak_before)/n.total_dak_before*100,l.innerHTML=`
      <p id="dak-total-anggaran" class="h2 mb-0 text-green" 
        data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="left" 
        data-bs-content="${parseFloat((+mData.dak_total_anggaran).toFixed(0)).toLocaleString("id-ID")}"> 
        ${parseFloat((mData.dak_total_anggaran/1e12).toFixed(2)).toLocaleString("id-ID")} T
      </p>
      <p id="dak-total-anggaran-before" class="fs-13px mb-0 text-gray-700">
        <span class="text-${0<mData.dak_selisih?"success":"danger"} fs-bold">
          <i class="fa fa-caret-${0<mData.dak_selisih?"up":"down"}"></i>
          <b> ${parseFloat(mData.dak_selisih_persen.toFixed(2)).toLocaleString("id-ID")}%</b>
        </span> 
        dari tahun sebelumnya <span class="fw-bold" data-bs-toggle="popover" data-bs-trigger="hover" 
          data-bs-placement="top" data-bs-content="${parseFloat((+mData.dak_total_anggaran_before).toFixed(0)).toLocaleString("id-ID")}"> 
          ${parseFloat((mData.dak_total_anggaran_before/1e12).toFixed(2)).toLocaleString("id-ID")} T</span>
      </p>
      <hr class="my-3"/>
      <div class="row text-truncate">
        <!-- BEGIN col-6 -->
        <div class="col-6">
          <div class="fs-12px">Tingkat Provinsi</div>
          <div id="tile-1-tingpel-prov" class="h6 mb-2px fw-bold text-primary" ><i class="fas fa-circle-notch fa-spin"></i></div>
          <div class="progress h-5px rounded-3 mt-2 mb-0">
            <div class="progress-bar progress-bar-striped rounded-right " data-animation="width" data-value="100%" style="width: 100%"></div>
          </div>
        </div>
        <!-- END col-6 -->
        <!-- BEGIN col-6 -->
        <div class="col-6">
          <div class="fs-12px">Tingkat Kab/Kota</div>
          <div id="tile-1-tingpel-kot" class="h6 mb-2px fw-bold text-warning"><span><i class="fas fa-circle-notch fa-spin"></i></span></div>
          <div class="progress h-5px rounded-3 mt-2 mb-0">
            <div class="progress-bar progress-bar-striped rounded-right bg-orange" data-animation="width" data-value="100%" style="width: 100%"></div>
          </div>
        </div>
        <!-- END col-6 -->
      </div>`,$("#tile-1-tingpel-prov").html(parseFloat((n.tingpel[0].grand_total/1e12).toFixed(2)).toLocaleString("id-ID")+' T <span class="fw-600 fs-9px">('+(parseFloat(n.tingpel[0].grand_total)/parseFloat(n.total_dak)*100).toLocaleString("id-ID")+"%)</span>"),$("#tile-1-tingpel-kot").html(parseFloat((n.tingpel[1].grand_total/1e12).toFixed(2)).toLocaleString("id-ID")+' T <span  class="fw-600 fs-9px">('+(parseFloat(n.tingpel[1].grand_total)/parseFloat(n.total_dak)*100).toLocaleString("id-ID")+"%)</span>"),p.innerHTML=`
      <div class="row">
        <div class="col">
          <p class="h4 mb-5px text-black-transparent-7"><span id="total-prov" class="h2 text-blue"></span> Provinsi</p>
          <div id="top-5-prov" class="fs-13px mt-3"></div>
        </div>
        <div class="col">
          <p class="h4 mb-5px text-black-transparent-7"><span id="total-pemda" class="h2 text-orange"></span> Kota/Kab</p>
          <div id="top-5-pemda" class="fs-13px mt-3"></div>
        </div>
      </div>`,m.innerHTML=`
      <div class="d-flex align-items-center mb-1">
        <h3 class="mb-0"><span id="tahun-total" class="text-green-600"><i class="fas fa-circle-notch fa-spin"></i></span></h4>
        <div class="ms-auto">
          <div id="store-session-sparkline"></div>
        </div>
      </div>
      <div class="mb-3">
      </div>
      <div class="d-flex mb-2">        
      </div>
      <div id="tahun-list" class="fs-13px"></div>`,$("#total-kl").html(n.kl_only.length),""),y=(n.data_kl.forEach(function(a,e){k+='<div class="d-flex py-1 mb-0 border-top"><div class="d-flex align-items-center"><i class="fa fa-circle text-red fs-8px me-2"></i>'+a.kementerian_nama+'</div><div class="d-flex align-items-center ms-auto"><div class="w-120px text-end ps-12 text-gray-700 fw-bold"><span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title="'+a.kementerian_nama+'" data-bs-placement="top" data-bs-content="'+a.grand_total.toLocaleString("id-ID")+'">'+(a.grand_total/1e9).toLocaleString("id-ID")+" M</span></div></div></div>",$("#top-3-kl").html(k)}),$("#total-prov").html(n.prov_count_all),$("#total-pemda").html(n.pemda_count_all),""),D=(n.top_5_prov.forEach(function(a,e){y+='<div class="d-flex border-top"><div class="d-flex align-items-center align-middle"><i class="fa fa-circle text-blue fs-8px me-2"></i>'+a.prov_nama+'</div><div class="d-flex align-items-center ms-auto"><div class="w-120px text-end ps-12 fw-500"><span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title="'+a.prov_nama+'" data-bs-placement="top" data-bs-content="'+a.grand_total.toLocaleString("id-ID")+'">'+(a.grand_total/1e9).toLocaleString("id-ID")+" M</span></div></div></div>",$("#top-5-prov").html(y)}),""),w=(n.top_5_pemda.forEach(function(a,e){D+='<div class="d-flex border-top"><div class="d-flex align-items-center"><i class="fa fa-circle text-warning fs-8px me-2"></i>'+a.pemda_nama+'</div><div class="d-flex align-items-center ms-auto"><div class="w-120px text-end ps-12 fw-500"><span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title="'+a.pemda_nama+'" data-bs-placement="top" data-bs-content="'+a.grand_total.toLocaleString("id-ID")+'">'+(a.grand_total/1e9).toLocaleString("id-ID")+" M</span></div></div></div>",$("#top-5-pemda").html(D)}),"");var A=0;n.data_3_tahun.forEach(function(a,e){var t="";null!=a.seilsih_before&&(t='<div class="fs-12px mx-3 '+(0<a.seilsih_before?"text-success":"text-danger")+'"><i class="fa '+(0<a.seilsih_before?"fa-caret-up":"fa-caret-down")+'"></i> <span data-animation="number" data-value="'+a.seilsih_before+'">'+parseFloat(a.seilsih_before.toFixed(2)).toLocaleString("id-ID")+"</span>%</div>"),w+='<div class="d-flex mb-2"><div class="d-flex align-items-center"><i class="fa fa-circle text-red fs-8px me-2"></i>'+a.tahun+'</div><div class="d-flex align-items-center ms-auto">'+t+'<div class="w-120px text-end ps-12 fw-bold text-gray-700"><span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title="'+a.tahun+'" data-bs-placement="top" data-bs-content="'+a.grand_total.toLocaleString("id-ID")+'">'+parseFloat((a.grand_total/1e12).toFixed(2)).toLocaleString("id-ID")+" T</span></div></div></div>",$("#tahun-list").html(w),A+=a.grand_total}),$("#tahun-total").html(parseFloat((A/1e12).toFixed(2)).toLocaleString("id-ID")+" T"),$("[data-bs-toggle=popover]").popover();let T=mData.dataByTahun,S=(T.chart_data.forEach(a=>{e.push(`<option value="${a.tahun}" ${a.tahun==t?"selected='selected'":""} >${a.tahun}</option>`)}),u.innerHTML=e.join(" "),mData.PageData.tingpel.forEach(a=>{i.push(`<option value="${a.tingkat_pelaksanaan}" selected="selected" >${a.tingkat_pelaksanaan}</option>`)}),g.innerHTML=i.join(" "),mData.PageData.pemda.forEach(a=>{v.push(`<option value="${a.pemda_kode+"-"+a.pemda_nama}" selected="selected" >${a.pemda_kode+"-"+a.pemda_nama}</option>`)}),a.innerHTML=v.join(" "),mData.PageData.provinsi.forEach(a=>{f.push(`<option value="${a.prov_kode+"-"+a.prov_nama}" selected="selected" >${a.prov_kode+"-"+a.prov_nama}</option>`)}),h.innerHTML=f.join(" "),$("#provkabG").on("change",async function(){let e=$(this).val(),t=[];mData.dataDakHistory.filter(async function(a){!e.includes(a[6].trim())||["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(a[2].trim())||["All"].includes(a[s])||t.push(a)}),o(t)}),$("#sel_tp").on("change",async function(){let a=$(this).val();a.includes("Provinsi")&&1===a.length?($("#sel_tp").parent().parent().parent().removeClass("col-xl-9").addClass("col-xl-3"),$("#sel_provinsi,#sel_pemda").parent().parent().parent().removeClass("hide")):a.includes("Kota/ Kabupaten")&&1===a.length?($("#sel_tp").parent().parent().parent().removeClass("col-xl-9").addClass("col-xl-3"),$("#sel_provinsi").parent().parent().parent().addClass("hide"),$("#sel_pemda").parent().parent().parent().removeClass("hide"),$("#sel_pemda").parent().parent().parent().removeClass("col-xl-3").addClass("col-xl-6")):(a.length,$("#sel_tp").parent().parent().parent().removeClass("col-xl-3").addClass("col-xl-9"),$("#sel_provinsi,#sel_pemda").parent().parent().parent().addClass("hide"),$("#sel_provinsi,#sel_pemda").parent().parent().parent().removeClass("col-xl-6").addClass("col-xl-3"))}),$("#sel_provinsi").on("change",async function(){$("#provkabG").find("option").attr("selected","selected");let e=$("#sel_ta").val(),t=$(this).val(),i=[],n=[],l=[];a.innerHTML="",mData.PageData.pemda.forEach(a=>{t.includes(a.provinsi)&&(i.push(`<option value="${a.pemda_kode+"-"+a.pemda_nama}" selected="selected" >${a.pemda_kode+"-"+a.pemda_nama}</option>`),n.push(a.pemda_kode+"-"+a.pemda_nama))}),a.innerHTML=i.join(" "),$("#sel_pemda").selectpicker("refresh"),mData.dataDak.filter(async function(a){e.includes(a[0].trim())&&t.includes(a[12].trim())&&!["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(a[2].trim())&&!["All"].includes(a[s])&&l.push(a)}),$("#provkabG").selectpicker("selectAll"),o(mData.dataDakHistory=l)}),$("#sel_pemda").on("change",async function(){let e=$("#sel_ta").val(),t=$(this).val(),i=$("#sel_provinsi").val(),n=[];$("#provkabG").find("option").attr("selected","selected"),mData.dataDak.filter(async function(a){e.includes(a[0].trim())&&i.includes(a[12].trim())&&t.includes(a[11].trim())&&!["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(a[2].trim())&&!["All"].includes(a[s])&&n.push(a)}),$("#provkabG").selectpicker("selectAll"),o(mData.dataDakHistory=n)}),$("#sel_tp").on("change",async function(){let e=$("#sel_ta").val(),t=$("#sel_tp").val(),i=$("#sel_pemda").val(),n=[];mData.dataDak.filter(async function(a){(2===t.length&&e.includes(a[0])&&!["All"].includes(a[s])&&!["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(a[2].trim())||1===t.length&&"Provinsi"===t.toString()&&e.includes(a[0].trim())&&!["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(a[2].trim())&&!["All"].includes(a[s])||1===t.length&&"Kota/ Kabupaten"===t.toString()&&e.includes(a[0].trim())&&i.includes(a[11].trim())&&!["All"].includes(a[s])&&!["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(a[2].trim()))&&n.push(a)}),"Kota/ Kabupaten"===t.toString()||2===t.length?$("#provkab").addClass("hide"):($("#sel_pemda").find("option").attr("selected","selected"),$("#sel_pemda").selectpicker("selectAll"),$("#provkab").removeClass("hide")),o(mData.dataDakHistory=n)}),$("#sel_ta").on("change",async function(){let e=$(this).val(),t=[];mData.dataDak.filter(async function(a){!e.includes(a[0])||["All"].includes(a[s])||["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(a[2].trim())||t.push(a)}),$("#sel_tp").parent().parent().parent().removeClass("col-xl-3").addClass("col-xl-9"),$("#sel_provinsi,#sel_pemda").parent().parent().parent().addClass("hide"),$("#sel_provinsi,#sel_pemda").parent().parent().parent().removeClass("col-xl-6").addClass("col-xl-3"),$("#provkab").addClass("hide"),$("#sel_pemda,#sel_tp,#sel_provinsi,#sel_pemda").selectpicker("selectAll"),o(t)}),[]);async function o(a,c={expand:!1}){let i=[],p=1,e=[...new Set(a.map(a=>a[0]))],t=[...new Set(a.map(a=>a[1]))],m=t.filter(a=>"15-Lingkungan Hidup dan Kehutanan"!==a),u=t.filter(a=>"14-Lingkungan Hidup dan Kehutanan"!==a);var n=t;"2019"===e.toString()?n=m:"2020"===e.toString()&&(n=u);for(let t of n){let e=0,n=[];a.forEach(a=>{[t].includes(a[1])&&(e+=a[9],n.push(a))});const s=[],o=[...new Set(n.map(a=>a[2]))];for(let t of o){let e=0,i=[];n.forEach(a=>{[t].includes(a[2])&&(e+=a[9],i.push(a))});const d=[],g=[...new Set(i.map(a=>a[4]))];for(let t of g){let e=0,l=[];i.forEach(a=>{[t].includes(a[4])&&(e+=a[9],l.push(a))});const r=[],h=[...new Set(l.map(a=>a[14]))];for(let n of h){let e=0,t,i;l.forEach(a=>{[n].includes(a[14])&&(e+=a[9],t=a[8],i=a[7])}),r.push({name:"  "+n,nilai:e,satuan:t,volumn:i})}d.push({name:"  "+t,nilai:e,satuan:"",volumn:"",_children:r})}s.push({name:" "+t,nilai:e,satuan:"",volumn:"",_children:d})}i.push({no:p++,name:t,nilai:e,satuan:"",volumn:"",_children:s})}const l=new Tabulator("#dak-table",{data:i,index:"id",layout:"fitDataStretch",columnHeaderVertAlign:"middle",dataTree:!0,dataTreeStartExpanded:!1,dataTreeFilter:!0,dataTreeElementColumn:"name",dataTreeStartExpanded:c.expand,dataTreeChildColumnCalcs:!1,dataTreeSelectPropagate:!0,dataLoader:!1,movableColumns:!0,columns:[{title:"Bidang/Sub Bidang/Kegiatan/Rincian",field:"name",visible:!0,width:500,sorter:"string",hozAlign:"left",headerHozAlign:"left",frozen:!0},{title:"Nilai RK",field:"nilai",visible:!0,bottomCalc:"sum",width:250,bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",hozAlign:"right",headerHozAlign:"right",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0}},{title:"Satuan",field:"satuan",visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center"},{title:"Volumn",field:"volumn",visible:!0,formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",hozAlign:"right",headerHozAlign:"right"}],initialSort:[{column:"name",dir:"asc"}]});return document.getElementById("download-xlsx-dak").addEventListener("click",function(){l.download("xlsx","Dana_Alokasi_Khusus.xlsx",{sheetName:"data"})}),document.getElementById("download-pdf-dak").addEventListener("click",function(){l.download("pdf","Dana Alokasi Khusus.pdf",{orientation:"landscape",title:"Dana Alokasi Khusus",unit:"in",format:"tabloid",autoTable:function(a){return{styles:{fontsize:7},columnStyles:{0:{cellWidth:450},1:{halign:"right"},2:{halign:"center"},3:{halign:"right"}}}},documentProcessing:function(a){}})}),l}mData.dataDak.filter(async function(a){![t.toString()].includes(a[0])||["All"].includes(a[s])||["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(a[2].trim())||S.push(a)}),o(S),$(".open_table").on("click",async function(){var a;$(this).toggleClass("opentable"),a=$(this).hasClass("opentable")?($(this).find(".material-icons").html("open_in_full"),$(this).find(".material-text").html("Close All"),{expand:!0}):(closeButton(),{expand:!1});let e=$("#sel_ta").val(),t=$("#sel_pemda").val(),i=$("#sel_provinsi").val(),n=[];mData.dataDak.filter(async function(a){e.includes(a[0].trim())&&i.includes(a[12].trim())&&t.includes(a[11].trim())&&!["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(a[2].trim())&&!["All"].includes(a[s])&&n.push(a)}),o(mData.dataDakHistory=n,a)});const F={radius:3,fillColor:"blue",color:"#000",weight:.5,opacity:1,fillOpacity:.8},P={radius:3,fillColor:"yellow",color:"#000",weight:.5,opacity:1,fillOpacity:.8};const B={radius:3,fillColor:"#dd7f2a",color:"#000",weight:.5,opacity:1,fillOpacity:.8},C={radius:3,fillColor:"darkgreen",color:"#000",weight:.5,opacity:1,fillOpacity:.8},I={fillColor:"#FFB230",color:"#FFFFFF",weight:1,fillOpacity:.9};var d;$(".selectpicker").selectpicker();{const M=L.Control.extend({options:{position:"topleft"},onAdd:function(a){var e=L.DomUtil.create("div","leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0");return e.title="Reset Posisi Peta",e.type="button",e.style.backgroundImage="url(img/home.png)",e.style.backgroundSize="30px 30px",e.style.width="33px",e.style.height="33px",e.onclick=function(){a.fitBounds(l.getBounds())},e}}),c=L.control({position:"bottomleft"});let t,i=L.map("map-dak",{attributionControl:!1}).setView([-2,117],5);i.addControl(new M),c.onAdd=function(a){var e=L.DomUtil.create("div","legend");return e.innerHTML+="<h4>Bidang Kegiatan</h4>",e.innerHTML+='<i style="background-color: yellow"></i><span>Kesehatan dan KB</span><br>',e.innerHTML+='<i style="background-color: blue"></i><span>Air Minum</span><br>',e.innerHTML+='<i style="background-color: darkgreen"></i><span>Sanitasi</span><br>',e.innerHTML+='<i style="background-color: #dd7f2a"></i><span>Lingkungan Hidup dan Kehutanan</span><br>',e},i.addControl(L.control.fullscreen({position:"topright",forceSeparateButton:!0,fullscreenElement:document.getElementById("fbody")})),i.on("enterFullscreen",function(){$("#map-dak").addClass("fullscreen-map-dak"),$("#fbody").addClass(["p-2","bg-white"])}),i.on("exitFullscreen",function(){$("#fbody").removeClass(["p-2","bg-white"]),$("#map-dak").removeClass("fullscreen-map-dak")}),c.addTo(i);var K=new GeoSearch.GeoSearchControl({provider:new GeoSearch.OpenStreetMapProvider({params:{"accept-language":"id",countrycodes:"id",addressdetails:0}}),showMarker:!1,searchLabel:"Pencarian Lokasi",style:"button",autoClose:!0,updateMap:!0});i.addControl(K),L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{attribution:'© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',tileSize:512,maxZoom:20,zoomOffset:-1,id:"mapbox/streets-v11",accessToken:"pk.eyJ1IjoiYXJqaWFudG8iLCJhIjoiMjYxNWQ1YjkyMjIzMTdkMDE2ODJiNTBkYmE4MDcyNjAifQ.NvwfCpUvHeEiTXXcTJ3MfQ"}).addTo(i);let n=L.geoJSON(null,{filter:a=>{var e=t.tahun.includes(a.properties.tahun),a=t.bidang.includes(a.properties.bidang_nama);return e&&a},pointToLayer:function(a,e){switch(a.properties.bidang_nama){case"Kesehatan dan KB":return L.circleMarker(e,P);case"Air Minum":return L.circleMarker(e,F);case"Sanitasi":return L.circleMarker(e,C);case"Lingkungan Hidup dan Kehutanan":return L.circleMarker(e,B);default:return L.circleMarker(e,P)}},onEachFeature:function(a,e){var t="";if(a.properties){for(const i in a.properties)t=`
            <span class='fs-6 fw-bold text-blue'><b>TA ${a.properties.tahun} </b></span><br/>
            <span class='fs-5 text-green-700'> ${a.properties.pemda_nama} </span><br/>
            <span class='fs-6 text-green-700'>
              ${a.properties.provinsi_kode==a.properties.pemda_kode?"":"Provinsi "+a.properties.provinsi_nama}
            </span>
            <hr class='my-1'>
            <div style="font-size:0.85rem">
              <span >
                <b>Bidang ${a.properties.bidang_nama} </b><br/>
                <i style='font-size:0.775rem;'>Sub Bidang ${a.properties.sub_bidang_nama} </i>
              </span><br/>
              <b>Menu Kegiatan:</b><br>
              <span style='font-size:0.775rem;'>${a.properties.menu_kegiatan_nama}</span><br/>
              <b>Rincian:</b><br>
              <span style='font-size:0.775rem;'>${a.properties.rincian_nama}</span><br/>
              <b>Detail Rincian:</b><br>
              <span style='font-size:0.775rem;'>${a.properties.detail_rincian_nama}</span><br/>
              <span style='font-size:0.9rem;'>
                <b>Volume </b> <span style='font-size:0.775rem;'>${a.properties.volume_rk} ${a.properties.satuan}</span><br/>
                <b>Nilai </b> <span style='font-size:0.775rem;'>Rp ${a.properties.nilai_rk.toLocaleString("id-ID")}</span>
              </span>
              <hr class='my-1'>
              <span>
                <b>Latitute </b>${a.geometry.coordinates[1].toFixed(6)} | <b>Longtitude </b> ${a.geometry.coordinates[0].toFixed(6)} 
              </span><br>
              <a href = 'https://www.google.com/maps?layer=c&cbll=${a.geometry.coordinates[1].toFixed(6)} , ${a.geometry.coordinates[0].toFixed(6)} &cbp=11,0,0,0,0' target = '_blank' id = 'infoBtn' class='btn btn-default btn-sm mt-1'>Street View</a></span>
              </div>        
              `;e.bindPopup(t,{minWidth:300,maxWidth:600,keepInView:!1}),e.on({mouseover:function(a){e.openPopup()},click:E})}}}).addTo(i),l=L.geoJSON(provinsiGeoData,{style:I,onEachFeature:function(a,e){a.properties&&(e.bindTooltip("<b>"+a.properties.name+"</b>"),e.on({mouseover:function(a){e.openTooltip(),i.closePopup()},click:function(a){a=a,i.fitBounds(a.target.getBounds())},mouseout:function(a){}}))}}).addTo(i),s=(i.on("zoomend",function(){11<=i.getZoom()&&i.hasLayer(l)&&i.removeLayer(l),i.getZoom()<11&&0==i.hasLayer(l)&&(i.addLayer(l),l.bringToBack())}),i.spin(!0),d=mData.DakPeta,r(),n.addData(d),n.bringToFront(),i.spin(!1),new Fuse(d.features,{keys:["properties.provinsi_nama","properties.detail_rincian","properties.pemda_nama","properties.detail_rincian_nama"]}));function E(a){var e=a.target;i.flyTo([a.latlng.lat,a.latlng.lng],20,{animate:!0,duration:1}),e.openPopup()}function r(){(t={tahun:[],bidang:[]}).tahun=$("#tahun-group").val(),t.bidang=$("#bidang-group").val()}L.control.search({layer:n,propertyName:"pemda_nama",filterData:function(a,e){var t,i,n=s.search(a),l={};for(i in n)l[t=n[i].properties.pemda_nama]=e[t];return l}}).on("search:locationfound",function(a){a.layer.openPopup()}).addTo(i),$("#tahun-group").on("changed.bs.select",function(a,e,t,i){n.clearLayers(),r(),n.addData(d)}),$("#bidang-group").on("changed.bs.select",function(a,e,t,i){n.clearLayers(),r(),n.addData(d)})}}};export default DAK;