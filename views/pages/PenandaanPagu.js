import WidgetCard from"../components/WidgetCard.js";import{apopoverTrigger,apiKementerian,apiTahunSemester,apiIntervensi}from"../../services/api.js";const PenandaanPagu={render:async()=>{return mData.dataKementerian=void 0===mData.dataKementerian?await apiKementerian():mData.dataKementerian,mData.dataSemester=void 0===mData.dataSemester?await apiTahunSemester():mData.dataSemester,mData.dataIntervensi=void 0===mData.dataIntervensi?await apiIntervensi():mData.dataIntervensi,`
      <div class="app-content-padding flex-grow-1 overflow-auto" data-scrollbar="true">
				<!-- BEGIN page-header -->
				<h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">verified</i>Penandaan dan Pagu</h2>
				<!-- END page-header -->
        <!-- begin widget-card -->
        <div class="row pt-3 mx-0 mb-3 py-3 bg-gray-300 rounded" id="drp_option">
          <div class="col-xl-2 ">
              <div class="form-group sel_tax">                  
                <select id="sel_ta" name="sel_ta" class="form-control selectpicker" data-title="Pilih Tahun" data-actions-box="true" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset">
                  <option value="2021-1" selected="selected">2021 - Semester 1</option>
                  <option value="2021-2">2021 - Semester 2</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
          </div>
          <div class="col-xl-3">
              <div class="form-group sel_kl">
                <select id="sel_kl" name="sel_kl" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Kementerian/ Lembaga" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} K/L dipilih">
                </select>
              </div>
          </div>
          <div class="col-xl-3">
              <div class="form-group sel_ig">                  
                <select id="sel_int" name="sel_int" class="form-control selectpicker" data-title="Pilih Intervensi" data-show-subtext="true" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Intervensi dipilih">
                </select>                  
              </div>
          </div>
          <div class="col-xl-3 ">
              <div class="form-group pull-right width-full">
                <input id="kinerjaAnggaranSrc" type="text" class="form-control" placeholder="Search" aria-label="Search" >
                <i class="fa fa-times text-black hide" id="restoreData" style="position: absolute;right: 18px;top: 25px;"></i>
              </div>
          </div>
          <div class="col-xl-1 " id="chartData">
              <div class="form-group pull-right width-full">              
                <div class="menu-icon btn btn-primary m-0 p-0 px-2" data-bs-toggle="modal" data-bs-target="#chartModal" >
                  <i class="material-icons fs-29px">bar_chart</i>
                </div>
              </div>
          </div>          
        </div>
        <div id="top-tiles" class="row mb-2 ">        
          ${await WidgetCard.render("tile-1","Penandaan","white-100","lg-12")}
          ${await WidgetCard.render("tile-2","Pagu","white-100","lg-12 mt-3 mb-2")}          
        </div>
        <!-- end widget-card -->
        <div class="card">
          <div class="card-body" id="table1">
            <div id="elemenOpenCloseFst"></div>
            <div id="penandaan-table" class="is-bordered is-narrow rounded"></div>
            <div class="sumber-data-annual pt-1 pb-2 ps-2 fs-12px fw-500"></div>
          </div>
          <div class="" id="container_renjakl">
            <div class="card-body hide" >
              <div id="elemenOpenClose"></div>
              <div class="mx-n3 mb-n3" id="table2"></div>
              <div class="sumber-data-renja pt-4 pb-2 ms-n2 fs-12px fw-500"></div>
              <div class="mx-n3 mb-n3 hide" id="table_excel">
                <table class="table table-bordered">
                  <thead class="h6">
                    <tr>
                      <td colspan="8">Data RO yang Mendukung Percepatan Penurunan Stunting pada Renja K/L TA &nbsp <span id="thn_data"></span> </td>
                    </tr>
                    <tr>
                      <td colspan="8">Berdasarkan filter pada Tematik "Upaya Konvergensi Stunting"</td>
                    </tr>
                    <tr>
                      <td colspan="8">Catatan : data ditarik dari krisna.systems pada tanggal &nbsp <span id="tgl_update"></span> </td>
                    </tr>
                    <tr>
                      <td colspan="8"></td>
                    </tr>
                    <tr>
                      <td colspan="8"></td>
                    </tr>
                    <tr>
                      <td>KL</td>
                      <td>Program</td>
                      <td>Kegiatan</td>
                      <td>KRO</td>
                      <td>RO/Komponen</td>
                      <td>Target</td>
                      <td>Satuan</td>
                      <td>Alokasi (Ribuan Rupiah)</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>                    
                    </tr>
                  </thead>
                  <tbody class="fs-12px"></tbody>
                </table>
              </div>
            </div>
          </div>          
        </div>
      </div>
      <!-- Modal -->
      <div class="modal modal-message  fade" id="chartModal" tabindex="-1" aria-labelledby="Chart Penandaan dan Pagu" aria-hidden="true">
        <div class="modal-dialog card" style="margin: 2% 2%;width: 96%;border-radius: 11px;">
          <div class="modal-content card-body p-0" id="popUp" style="border-radius: inherit !important;">          
          </div>
        </div>
      </div>
      <!-- End Modal -->
    `},after_render:async()=>{sumberDataRenja(),treeOpenCloseHtml("#elemenOpenClose",{xls_html:`
      <button class="btn btn-white" >
        <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer fs-20px text-green-400" title="export xls" onclick="toXls('#table_excel','xls','Penandaan dan Pagu.xls');"></i>
      </button>`}),sumberDataAnnual();let m="exp_xls",g="exp_pdf",s=(treeOpenCloseHtml("#elemenOpenCloseFst",{xls_id:m,pdf_id:g}),document.getElementById("sel_kl")),t=document.getElementById("sel_int"),a=[],e=[];mData.dataKementerian.forEach(t=>{a.push(`<option value="${t.kementerian_kode}" selected="selected">${t.kementerian_nama}</option>`)}),s.innerHTML=a.join(" "),mData.dataIntervensi.forEach(t=>{e.push(`<option  value="${t.intervensi_kode}" selected="selected"> ${t.intervensi_nama}</option>`)}),t.innerHTML=e.join(" "),$("select").selectpicker();var r=document.getElementById("sel_ta").value,c=document.getElementById("sel_kl"),p=document.getElementById("sel_int"),i=[],l=[];async function n(a,e,i,l){a=a.split("-");try{let t=await fetch(config.api_url+"/pp/perkembangan-penandaan",{method:"POST",body:JSON.stringify({tahun:a[0],semester:a[1],kl:e,intervensi:i,search:l}),headers:config.fetchHeaders});return(await t.json()).data}catch(t){return!1}}async function u(){resetOpenClose();let t=$("#sel_ta").val(),a=document.getElementById("kinerjaAnggaranSrc").value,e=$("#sel_kl").val(),i=$("#sel_int").val(),l=t.split("-");2021<l[0]?($("#top-tiles,#table1,#chartData").addClass("hide"),$("#container_renjakl").addClass("loading"),e=$("#sel_kl").val(),await async function(a,e,i){try{let t=await fetch(config.api_url+"/renja/renjakl",{method:"POST",body:JSON.stringify({tahun:a,kl:e,search:i}),headers:config.fetchHeaders});var l=await t.json();return console.log(l.data),l.data}catch(t){return!1}}(l[0],e,a).then(function(t){mData.datahasil=t.detail;t=tableTreeLevel(t.detail,"all");$("#container_renjakl .card-body").removeClass("hide"),o(t)}),$("#container_renjakl").removeClass("loading")):($("#top-tiles,#table1").removeClass("hide"),$("#container_renjakl .card-body").addClass("hide"),await n(t,e,i,a).then(function(t){mData.annualreport=t.detail;var a=tableTreeLevel(t.detail,"all");mData.annualreport={detail:a,baseline:t.baseline,tile:t.tile},$("#penandaan-table").addClass("loading"),d(mData.annualreport),$("#penandaan-table").removeClass("loading")})),closeButton()}async function o(t,a={expand:!1},e){parseInt($("#sel_ta").val());console.log("result1",t);a=new Tabulator("#table2",{height:"515px",data:t,index:"id",layout:"fitDataFill",columnHeaderVertAlign:"middle",columnVertAlign:"left",dataTree:!0,dataTreeStartExpanded:a.expand,dataTreeFilter:!0,dataTreeElementColumn:"name",dataTreeChildColumnCalcs:!1,dataLoader:!1,movableColumns:!0,columns:[{title:"No",titleDownload:"No",vertAlign:"middle",field:"id",visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"K/L, Program, Kegiatan, KRO, RO, Komponen",titleDownload:"K/L, Program, Kegiatan, KRO, Komponen",vertAlign:"middle",frozen:!0,field:"name",sorter:"string",width:500,responsive:0,variableHeight:!0,formatter:function(t,a){let e,i=t.getValue(),l="";return e="KL"===t._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight ps-1"> ${l='<div class="badge py-1 '+c_main+'" ><span class="'+c_kl+'  badge-main p-1" title="Kementerian/Lembaga">'+t._cell.row.data.kl_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"Program"===t._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<div class="badge '+c_main+'"><span class=" badge-left '+c_kl+' p-1" title="Kementerian/Lembaga">'+t._cell.row.data.kl_id+'</span><span class="'+c_prog+' badge-right  p-1" title="Program">'+t._cell.row.data.program_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"Kegiatan"===t._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<div class="badge  '+c_main+'"><span class=" badge-left '+c_kl+' p-1" title="Kementerian/Lembaga">'+t._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1" title="Program">'+t._cell.row.data.program_id+'</span><span class="'+c_keg+' badge-right  p-1" title="Kegiatan">'+t._cell.row.data.kegiatan_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"KRO"===t._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<div class="badge '+c_main+'" ><span class="  badge-left '+c_kl+' p-1" title="Kementerian/Lembaga">'+t._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1" title="Program">'+t._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1" title="Kegiatan">'+t._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+'  badge-right p-1"  title="Klasifikasi Rincian Ouput">'+t._cell.row.data.kro_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"RO"===t._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<div class="badge '+c_main+'"><span class="'+c_kl+'  badge-left  p-1" title="Kementerian/Lembaga">'+t._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1" title="Program">'+t._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1" title="Kegiatan">'+t._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' p-1"  title="Klasifikasi Rincian Output">'+t._cell.row.data.kro_id+'</span><span class="'+color_ro+'  badge-right p-1"  title="Rincian Output">'+t._cell.row.data.ro_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:(console.log("komponen",t._cell.row.data.komponen_kode),`
                    <div class="container">
                      <div class="row">
                        <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<span class="badge rounded-pill bg-aqua-600 py-1">Komponen</span>'}</div>  
                          <div class="bd-highlight text-wrap ms-1">${t._cell.row.data.komponen_kode}-${i}</div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="text-black w-50 ps-4 ms-5 my-1">
                          <span class="badge py-1 bg-indigo-600 ms-2 ">Indikator Pbj : ${t._cell.row.data.indikator_pbj}</span>   
                          <span class="badge py-1 bg-blue-600">Jenis : ${t._cell.row.data.komponen_jenis}</span>
                        </div>
                      </div>
                    </div> 
                    `)}},{title:"&#931; PROG",field:"jml_program",titleDownload:"Program",visible:"semua"==e||"program"==e||void 0===e,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",mutator:function(t,a,e,i,l){return void 0!==a.kl_id&&void 0===a.program_id?a._children.length:""},formatter:function(t,a){var e=t.getValue();return""===e&&(t.getElement().style.backgroundColor="#E5E8E8"),e}},{title:"&#931; KEG",titleDownload:"Kegiatan ",visible:"semua"==e||"kegiatan"==e||void 0===e,field:"jml_kegiatan",formatter:function(t,a){var e=t.getValue();return""===e&&(t.getElement().style.backgroundColor="#E5E8E8"),e},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},mutator:function(t,a,e,i,l){let s=void 0===a._children?0:a._children.length,n=(void 0!==a.program_id&&a.kegiatan_id,0);return void 0!==a.kl_id&&void 0===a.program_id?(a._children.forEach(function(t){t=void 0===t._children?0:t._children.length;n+=t}),n):void 0===a.program_id||void 0!==a.kegiatan_id||void 0===a._children?"":a._children.length}},{title:"&#931; KRO",titleDownload:"KRO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==e||"kro"==e||void 0===e,field:"jml_ro",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0}},{title:"&#931; RO",titleDownload:"RO",visible:"semua"==e||"ro"==e||void 0===e,field:"jml_ro",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0}},{title:"Alokasi Bulan Januari",titleDownload:"Alokasi Bulan Januari",field:"alokasi_totaloutput",headerPopup:function(t,a,e){return popupnote("Alokasi pada bulan Januari")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(t,a){var e=t.getValue(),t=""===e||void 0===e?(t.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(1e3*e,2);return t},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Tingkat Output",titleDownload:"Tingkat Output",field:"alokasi_totaloutput",headerPopup:function(t,a,e){return popupnote("Alokasi ditingkat output")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(t,a){var e=t.getValue(),t=""===e||void 0===e?(t.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(1e3*e+195e3,2);return t},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Analisis Lanjutan",titleDownload:"Analisis Lanjutan",field:"alokasi_totaloutput",headerPopup:function(t,a,e){return popupnote("Alokasi ditingkat Analisis Lanjutan")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(t,a){var e=t.getValue(),t=""===e||void 0===e?(t.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(1e3*e+215e3,2);return t},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Lokasi",titleDownload:"Lokasi",field:"lokasi_ro",hozAlign:"right",width:167,headerPopup:function(t,a,e){return popupnote("Lokasi realisasi Anggaran")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(t,a){return t.getElement().style.textAlign="left",t.getElement().style.width=400,""===t._cell.row.data.lokasi_ro||void 0===t._cell.row.data.lokasi_ro?(t.getElement().style.backgroundColor="#E5E8E8",""):"<span class='text-wrap text-black fw-400'>"+t._cell.row.data.lokasi+"</span>"},sorter:"number",headerHozAlign:"center",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Satuan ",titleDownload:"Satuan ",field:"satuan",headerPopup:function(t,a,e){return popupnote("Satuan terkait target")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(t,a){var e=t.getValue(),t=""===e||void 0===e?(t.getElement().style.backgroundColor="#E5E8E8",""):"<span class='text-wrap text-black fw-500'>"+e+"</span>";return t},width:140,sorter:"number",headerHozAlign:"center",hozAlign:"center",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Target ",titleDownload:"Target ",field:"target_0",headerPopup:function(t,a,e){return popupnote("Target")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(t,a){var e=t.getValue(),t=""===e||void 0===e?(t.getElement().style.backgroundColor="#E5E8E8",""):0===e?0:formatNumber(e);return t},width:120,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Target Kesepakatan Tingkat Output",titleDownload:"Target Kesepakatan Tingkat Output ",field:"target_0",headerPopup:function(t,a,e){return popupnote("Target pada kesepakatan tingkat output")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(t,a){var e=t.getValue(),t=""===e||void 0===e?(t.getElement().style.backgroundColor="#E5E8E8",""):0===e?0:formatNumber(Number(e)+3);return t},width:120,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Target Kesepakatan Tingkat Analisis Lanjutan",titleDownload:"Target Kesepakatan Tingkat Analisis Lanjutan",field:"target_0",headerPopup:function(t,a,e){return popupnote("Target Kesepakatan pada Analisis Lanjutan")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(t,a){var e=t.getValue(),t=""===e||void 0===e?(t.getElement().style.backgroundColor="#E5E8E8",""):0===e?0:formatNumber(Number(e)+2);return t},width:120,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}}],initialSort:[{column:"id",dir:"asc"}]});let i=[],l=(t.forEach(e=>{var t=`
          <tr class="bg-gray-300" >
            <td colspan="5" class="fw-700">${e.kl_id+"-"+e.name}</td>
            <td></td>
            <td></td>
            <td class="fw-700 text-end">${e.alokasi_totaloutput}</td>                    
          </tr>`;let l=[];e._children.forEach(t=>{var a=`
            <tr>
              <td></td>
              <td colspan="4">${e.kl_id+"."+t.program_id+"-"+t.name}</td>
              <td></td>
              <td></td>
              <td class="text-end">${t.alokasi_totaloutput}</td>                    
            </tr>`;let i=[];t._children.forEach(t=>{var a=`
              <tr>
                <td></td>
                <td></td>
                <td colspan="3">${t.kegiatan_id+"-"+t.name}</td>
                <td></td>
                <td></td>
                <td class="text-end">${t.alokasi_totaloutput}</td>                    
              </tr>`;let e=[];t._children.forEach(t=>{var a=`
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td colspan="2">${t.kro_id+"-"+t.name}</td>
                  <td></td>
                  <td></td>
                  <td class="text-end">${t.alokasi_totaloutput}</td>                    
                </tr>`;let i=[];t._children.forEach(t=>{var e=`
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td >${t.ro_id+"-"+t.name}</td>
                  <td></td>
                  <td></td>
                  <td class="text-end">${t.alokasi_totaloutput}</td>                    
                </tr>`;if(void 0!==t._children){let a=[];t._children.forEach(t=>{t=`
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="ps-5">${t.komponen_kode+"-"+t.komponen_nama}</td>
                        <td>${t.target_0}</td>
                        <td>${t.satuan}</td>
                        <td class="text-end">${t.alokasi_totaloutput}</td>                    
                      </tr>`;a.push(t)}),i.push(e+a.join(" "))}else i.push(e)}),e.push(a+i.join(" "))}),i.push(a+e.join(" "))}),l.push(a+i.join(" "))}),i.push(t+l.join(" "))}),a&&$("#table_excel tbody").html(i),$(".sumber-data-renja").html()),s=$("#sel_ta").val(),n=l.split("tanggal");$("#thn_data").html(" "+s),$("#tgl_update").html(" "+n[1])}async function d(t,a={expand:!1},e){const c=document.getElementById("tile-1"),p=document.getElementById("tile-2"),l=[],s=[],i=[],n=[];t.tile.top_5_alokasi.forEach((t,a)=>{let e=t.tagging/t.jumlah_ro==1||t.tagging/t.jumlah_ro==0?t.tagging/t.jumlah_ro*100:(t.tagging/t.jumlah_ro*100).toLocaleString("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2}),i=e.toString()+" &#37;";a<5&&l.push(`
          <tr>
            <td class="ps-2">${t.kementerian_short}</td>
            <td class="text-end" tabulator-align="right">${t.jumlah_ro}</td>
            <td class="text-end" tabulator-align="right">${t.tagging}</td>
            <td class="text-end" tabulator-align="right">${i}</td>
            <td class="text-end" tabulator-align="right">${t.jumlah_ro_spesifik}</td>
            <td class="text-end" tabulator-align="right">${t.jumlah_ro_sensitif}</td>
            <td class="text-end pe-2" tabulator-align="right">${t.jumlah_ro_dukungan}</td>
          </tr>`),s.push(`
          <tr>
            <td class="ps-2">${t.kementerian_short}</td>
            <td class="text-end" tabulator-align="right">${t.jumlah_ro}</td>
            <td class="text-end" tabulator-align="right">${t.tagging}</td>
            <td class="text-end" tabulator-align="right">${i}</td>
            <td class="text-end" tabulator-align="right">${t.jumlah_ro_spesifik}</td>
            <td class="text-end" tabulator-align="right">${t.jumlah_ro_sensitif}</td>
            <td class="text-end pe-2" tabulator-align="right">${t.jumlah_ro_dukungan}</td>
          </tr>`)}),t.tile.top_5_detail.forEach((t,a)=>{a<5&&i.push(`
          <tr>
            <td class="ps-2">${t.kementerian_short}</td>
            <td class="text-end">${t.jumlah_ro}</td>
            <td class="text-end">${t.alokasi_rkakl_spesifik+t.alokasi_rkakl_sensitif+t.alokasi_rkakl_dukungan===0?"-":((t.alokasi_rkakl_spesifik+t.alokasi_rkakl_sensitif+t.alokasi_rkakl_dukungan)/1e9).toLocaleString("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2})+" T"}</td>
            <td class="text-end">${0===t.alokasi_rkakl_spesifik?"-":(t.alokasi_rkakl_spesifik/1e9).toLocaleString("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2})+" T"}</td>
            <td class="text-end">${0===t.alokasi_rkakl_sensitif?"-":(t.alokasi_rkakl_sensitif/1e9).toLocaleString("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2})+" T"}</td>
            <td class="text-end pe-2">${0===t.alokasi_rkakl_dukungan?"-":(t.alokasi_rkakl_dukungan/1e9).toLocaleString("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2})+" T"}</td>
          </tr>`),n.push(`
        <tr>
          <td class="ps-2">${t.kementerian_short}</td>
          <td class="text-end">${t.jumlah_ro}</td>
          <td class="text-end">${t.alokasi_rkakl_spesifik+t.alokasi_rkakl_sensitif+t.alokasi_rkakl_dukungan===0?"-":(t.alokasi_rkakl_spesifik+t.alokasi_rkakl_sensitif+t.alokasi_rkakl_dukungan).toLocaleString("id-ID",{minimumFractionDigits:0,maximumFractionDigits:0})+" "}</td>
          <td class="text-end">${0===t.alokasi_rkakl_spesifik?"-":t.alokasi_rkakl_spesifik.toLocaleString("id-ID",{minimumFractionDigits:0,maximumFractionDigits:0})+" "}</td>
          <td class="text-end">${0===t.alokasi_rkakl_sensitif?"-":t.alokasi_rkakl_sensitif.toLocaleString("id-ID",{minimumFractionDigits:0,maximumFractionDigits:0})+" "}</td>
          <td class="text-end pe-2">${0===t.alokasi_rkakl_dukungan?"-":t.alokasi_rkakl_dukungan.toLocaleString("id-ID",{minimumFractionDigits:0,maximumFractionDigits:0})+" "}</td>
        </tr>
          `)}),c.innerHTML=`
        <div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700  mb-1 fs-11px" style="position: absolute;top: 1.1em;right: 1.5em;">
          <div class="mt-n1  bd-highlight">            
            <div class="btn-group" id="groupExp">
              <button class="btn btn-white fs-11px px-2 py-1 active">Export</button>                  
              <button class="btn btn-white fs-11px px-2 py-1">
                  <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer  text-green-400" title="export xls" id="exp_xls" onclick="toXls('#tableSum1All','xls','Penandaan.xls');"></i>
              </button>                  
              <button class="btn btn-white fs-11px px-2 py-1">
                  <i class="fas fa-lg fa-fw fa-file-pdf p-0 m-0 cursor-pointer  text-red-400" title="export pdf" onclick="toPdf('#tableSum1All','pdf','Penandaan.pdf');"></i>
              </button>                  
            </div>
          </div>
        </div>

        <div class="col-md-6 border-start hide" id="tableSum1All">
          <table class="table table-sm bg-light-500 rounded-top fs-11px mb-0"  >
            <thead>
              <tr class="fw-normal border-0 text-gray-700">
                <th class="border-0 ps-2">K/L</th>
                <th class="border-0 text-end">Disepakati</th>
                <th class="border-0 text-end">Ditandai</th>
                <th class="border-0 text-end">Kepatuhan %</th>
                <th class="border-0 text-end">Spesifik</th>
                <th class="border-0 text-end">Sensitif</th>
                <th class="border-0 text-end pe-2">Dukungan</th>
              </tr>
            </thead>
            <tbody class="fs-10px bg-white">
              ${s.join("")}
            </tbody>      
          </table>
        </div>
        <div class="row">
          <div class="col-md-6">              
            <div class="d-flex justify-content-between border-bottom bd-highlight">              
              <div class="d-flex flex-column pb-1">
                <div class="mb-0 fs-11px">
                  <span class="h2 text-green">${t.tile.rekonsiliasi_update_tagging.c_kl}</span>
                </div>
                <div class="fs-12px text-gray-700">Kementerian/Lembaga</div>
              </div>
              <div class="p-0 bd-highlight text-end w-100">
                <div class="d-flex flex-column pb-1">
                  <div class="mb-0 fs-11px">
                    <span class="h2 text-blue">${(t.tile.realisasi_tagging.all.tagging/t.tile.realisasi_tagging.all.teridentifikasi*100).toLocaleString("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2})}%</span>
                  </div>
                  <div class="fs-12px text-gray-700">Kepatuhan Penandaan</div>
                </div>
              </div>
            </div>
            <div class="fs-15px text-gray-700  pt-1">Rincian Output</div>            
            <div class="d-flex justify-content-between bd-highlight">
              <div class="p-0 ms-n2 me-5 w-250px bd-highlight">
                <table class="table table-responsive table-borderless table-sm mt-2 mb-0 mt-0 fs-11px text-center text-gray-600">      
                  <tbody>            
                  <tr class=" align-middle">
                    <td class="align-middle"><span class="rounded bg-blue text-light p-1 px-2 mx-1">${t.tile.realisasi_tagging.spesifik.teridentifikasi}</span><span class="rounded bg-orange text-light p-1 px-2 mx-0">${t.tile.realisasi_tagging.spesifik.tagging}</span></td>
                    <td class="align-middle"><span class="rounded bg-blue text-light p-1 px-2 mx-1">${t.tile.realisasi_tagging.sensitif.teridentifikasi}</span><span class="rounded bg-orange text-light p-1 px-2 mx-0">${t.tile.realisasi_tagging.sensitif.tagging}</span></td>
                    <td class="align-middle"><span class="rounded bg-blue text-light p-1 px-2 mx-1">${t.tile.realisasi_tagging.pendamping.teridentifikasi}</span><span class="rounded bg-orange text-light p-1 px-2 mx-0">${t.tile.realisasi_tagging.pendamping.tagging}</span></td>
                  </tr>
                  <tr class="font-fw-bold">
                    <td>Spesifik</td>
                    <td>Sensitif</td>
                    <td>Dukungan</td>
                  </tr>
                  </tbody>      
                </table>   
              </div>
              <div class="p-0 me-2 bd-highlight">
                <div class="d-flex flex-column">
                  <div class="mb-0 mt-2 px-0 fs-11px">
                  <span class="h3 text-blue">${t.tile.realisasi_tagging.all.teridentifikasi}</span>
                  </div>
                  <div class="fs-11px text-gray-600"><i>Baseline</i></div>
                </div>
              </div>
              <div class="p-0 me-2 bd-highlight">
                <div class="d-flex flex-column">
                  <div class="mb-0 mt-2 px-0 fs-11px">
                  <span class="h3 text-blue">${t.tile.realisasi_tagging.all.teridentifikasi}</span>
                  </div>
                  <div class="fs-11px text-gray-600">Disepakati</div>
                </div>
              </div>
              <div class="p-0 me-3 bd-highlight">
                <div class="d-flex flex-column">
                  <div class="mb-0 mt-2 px-0 fs-11px">
                    <span class="h3 text-orange">${t.tile.realisasi_tagging.all.tagging}</span>
                  </div>
                  <div class="fs-11px text-gray-600">Ditandai</div>
                </div>
              </div>              
            </div>
          </div>
          <div class="col-md-6 border-start">
            <table class="table table-sm bg-light-500 rounded-top fs-11px mb-0" id="tableSum1" >
              <thead>
                <tr class="fw-normal border-0 text-gray-700">
                  <th class="border-0 ps-2">K/L</th>
                  <th class="border-0 text-end">Disepakati</th>
                  <th class="border-0 text-end">Ditandai</th>
                  <th class="border-0 text-end">Kepatuhan %</th>
                  <th class="border-0 text-end">Spesifik</th>
                  <th class="border-0 text-end">Sensitif</th>
                  <th class="border-0 text-end pe-2">Dukungan</th>
                </tr>
              </thead>
              <tbody class="fs-10px bg-white">
                ${l.join("")}
              </tbody>      
            </table>
          </div>
        </div>`;let o=t.tile.pagu_level_output.dukungan_level_output_renjakl+t.tile.pagu_level_output.sensitif_level_output_renjakl+t.tile.pagu_level_output.spesifik_level_output_renjakl,d=t.tile.pagu_level_output.dukungan_level_output_rkakl+t.tile.pagu_level_output.sensitif_level_output_rkakl+t.tile.pagu_level_output.spesifik_level_output_rkakl;p.innerHTML=`
        <div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700  mb-1 fs-11px" style="position: absolute;top: 1.1em;right: 1.5em;">
          <div class="mt-n1  bd-highlight">            
            <div class="btn-group" id="groupExp">
              <button class="btn btn-white fs-11px px-2 py-1 active">Export</button>                  
              <button class="btn btn-white fs-11px px-2 py-1">
                  <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer  text-green-400" title="export xls" id="exp_xls" onclick="toXls('#table2All','xls','Pegu.xls');"></i>
              </button>                  
              <button class="btn btn-white fs-11px px-2 py-1">
                  <i class="fas fa-lg fa-fw fa-file-pdf p-0 m-0 cursor-pointer  text-red-400" title="export pdf" onclick="toPdf('#table2All','pdf','Pagu.pdf');"></i>
              </button>                  
            </div>
          </div>
        </div>
        <div class="col-md-6 border-start hide" id="table2All">            
            <table class="table table-sm bg-light-400 rounded-top fs-10px mb-0" id="tableSum2">
              <thead>
                <tr class="fw-bold border-0">
                  <th class="border-0 ps-2">K/L</th>
                  <th class="border-0 text-end">RO</th>
                  <th class="border-0 text-end">RKA K/L</th>
                  <th class="border-0 text-end">Spesifik</th>
                  <th class="border-0 text-end">Sensitif</th>
                  <th class="border-0 text-end pe-2">Dukungan</th>
                </tr>
              </thead>
              <tbody class="fs-10px bg-white">
                ${n.join("")}
              </tbody>      
            </table>     
          </div>
        <div class="row">        
          <div class="col-md-6 ">        
            <div class="d-flex ">
              <div class="flex-fill ">
                <div class="mb-0 fs-11px">
                  <span class="h4 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(o.toFixed(0)).toLocaleString("id-ID")}.00" title="Renja K/L">
                    ${parseFloat((o/1e9).toFixed(2)).toLocaleString("id-ID")} T
                  </span>
                </div>
                <div class="fs-13px text-gray-600">Renja K/L</div>
              </div>            
              <div class="flex-fill justify-content-center ">
                <div class="mb-0  fs-11px">
                  <span class="h4 text-blue" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(d.toFixed(0)).toLocaleString("id-ID")}.00" title="RKA K/L">
                    ${parseFloat((d/1e9).toFixed(2)).toLocaleString("id-ID")} T
                  </span>
                </div>
                <div class="fs-13px text-gray-600">RKA K/L</div>
              </div>
              <div class="flex-row-reverse ">
                <div class="mb-0  fs-11px">
                  <span class="h4 text-orange" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((t.tile.pagu_analisis_lanjutan.dukungan_analisis_lanjutan_alokasi+t.tile.pagu_analisis_lanjutan.sensitif_analisis_lanjutan_alokasi+t.tile.pagu_analisis_lanjutan.spesifik_analisis_lanjutan_alokasi).toFixed(0)).toLocaleString("id-ID")}.00" title="Analisis Lanjutan">
                    ${parseFloat(((t.tile.pagu_analisis_lanjutan.dukungan_analisis_lanjutan_alokasi+t.tile.pagu_analisis_lanjutan.sensitif_analisis_lanjutan_alokasi+t.tile.pagu_analisis_lanjutan.spesifik_analisis_lanjutan_alokasi)/1e9).toFixed(2)).toLocaleString("id-ID")} T 
                  </span>
                </div>
                <div class="fs-13px text-gray-600">Analisis Lanjutan</div>
              </div>
            </div>          
            <hr class="my-1">
            <table class="table table-sm mb-0 mt-3 mb-0 fs-13px">      
              <tbody>            
                <tr>
                  <td class="py-1 text-gray-700"><i class="fas fa-bullseye fa-fw"></i> Spesifik</td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-green">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Renja K/L : Rp. ${parseFloat(t.tile.pagu_level_output.spesifik_level_output_renjakl.toFixed(0)).toLocaleString("id-ID")}.00" data-bs-original-title=" " title="Spesifik">
                        ${parseFloat((t.tile.pagu_level_output.spesifik_level_output_renjakl/1e9).toFixed(2)).toLocaleString("id-ID")} T  
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-blue">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="RKA K/L : Rp. ${parseFloat(t.tile.pagu_level_output.spesifik_level_output_rkakl.toFixed(0)).toLocaleString("id-ID")}.00" data-bs-original-title=" " title="Spesifik">
                        ${parseFloat((t.tile.pagu_level_output.spesifik_level_output_rkakl/1e9).toFixed(2)).toLocaleString("id-ID")} T  
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-orange">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Analisis Lanjutan : Rp. ${parseFloat(t.tile.pagu_analisis_lanjutan.spesifik_analisis_lanjutan_alokasi.toFixed(0)).toLocaleString("id-ID")}.00" data-bs-original-title=" " title="Spesifik">
                        ${parseFloat((t.tile.pagu_analisis_lanjutan.spesifik_analisis_lanjutan_alokasi/1e9).toFixed(2)).toLocaleString("id-ID")} T    
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="py-1 text-gray-700"><i class="fas fa-book-medical fa-fw"></i> Sensitif</td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-green">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Renja K/L : Rp. ${parseFloat(t.tile.pagu_level_output.sensitif_level_output_renjakl.toFixed(0)).toLocaleString("id-ID")}.00" data-bs-original-title=" " title="Sensitif">
                        ${parseFloat((t.tile.pagu_level_output.sensitif_level_output_renjakl/1e9).toFixed(2)).toLocaleString("id-ID")} T
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-blue ">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="RKA K/L : Rp. ${parseFloat(t.tile.pagu_level_output.sensitif_level_output_rkakl.toFixed(0)).toLocaleString("id-ID")}.00" data-bs-original-title=" " title="Sensitif">
                        ${parseFloat((t.tile.pagu_level_output.sensitif_level_output_rkakl/1e9).toFixed(2)).toLocaleString("id-ID")} T
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold  text-orange">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Analisis Lanjutan : Rp. ${parseFloat(t.tile.pagu_analisis_lanjutan.sensitif_analisis_lanjutan_alokasi.toFixed(0)).toLocaleString("id-ID")}.00" data-bs-original-title=" " title="Sensitif">
                        ${parseFloat((t.tile.pagu_analisis_lanjutan.sensitif_analisis_lanjutan_alokasi/1e9).toFixed(2)).toLocaleString("id-ID")} T
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="py-1 text-gray-700"><i class="fas fa-book-reader fa-fw"></i> Dukungan</td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-green">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Renja K/L : Rp. ${parseFloat(t.tile.pagu_level_output.dukungan_level_output_renjakl.toFixed(0)).toLocaleString("id-ID")}.00" data-bs-original-title=" " title="Dukungan">
                        ${parseFloat((t.tile.pagu_level_output.dukungan_level_output_renjakl/1e9).toFixed(2)).toLocaleString("id-ID")} T
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-blue">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="RKA K/L : Rp. ${parseFloat(t.tile.pagu_level_output.dukungan_level_output_rkakl.toFixed(0)).toLocaleString("id-ID")}.00" data-bs-original-title=" " title="Dukungan">
                        ${parseFloat((t.tile.pagu_level_output.dukungan_level_output_rkakl/1e9).toFixed(2)).toLocaleString("id-ID")} T
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold  text-orange">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Analisis Lanjutan : Rp. ${parseFloat(t.tile.pagu_analisis_lanjutan.dukungan_analisis_lanjutan_alokasi.toFixed(0)).toLocaleString("id-ID")}.00" data-bs-original-title=" " title="Dukungan">
                        ${parseFloat((t.tile.pagu_analisis_lanjutan.dukungan_analisis_lanjutan_alokasi/1e9).toFixed(2)).toLocaleString("id-ID")} T
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>      
            </table>
          </div>  
          <div class="col-md-6 border-start">            
            <table class="table table-sm bg-light-400 rounded-top fs-10px mb-0" id="tableSum2">
              <thead>
                <tr class="fw-bold border-0">
                  <th class="border-0 ps-2">K/L</th>
                  <th class="border-0 text-end">RO</th>
                  <th class="border-0 text-end">RKA K/L</th>
                  <th class="border-0 text-end">Spesifik</th>
                  <th class="border-0 text-end">Sensitif</th>
                  <th class="border-0 text-end pe-2">Dukungan</th>
                </tr>
              </thead>
              <tbody class="fs-10px bg-white">
                ${i.join("")}
              </tbody>      
            </table>     
          </div>
        </div>
      `;const r=new Tabulator("#penandaan-table",{height:"515px",data:t.detail,index:"id",layout:"fitDataStretch",columnHeaderVertAlign:"middle",dataTree:!0,dataTreeStartExpanded:a.expand,dataTreeFilter:!0,dataTreeElementColumn:"name",dataTreeChildColumnCalcs:!1,dataTreeSelectPropagate:!0,dataLoader:!1,movableColumns:!0,columns:[{title:"No",field:"id",visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"Kementerian/ Lembaga<br><small>Program / Kegiatan / KRO / RO</small>",titleDownload:"Kementerian/Lembaga Program   /Kegiatan/KRO/RO",field:"name",sorter:"string",width:400,responsive:0,frozen:!0,accessorDownload:cleanTextDownload,headerMenuIcon:"<i class='fas fa-lg fa-fw fa-grip-vertical text-primary-700' title='Menu Header'></i>",headerMenu:headerMenu,formatter:function(t,a){t.getValue();let e;return void 0!==t._cell.row.data.ro_id?e='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1" >'+t._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1">'+t._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+t._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' p-1">'+t._cell.row.data.kro_id+'</span><span class="'+color_ro+' badge-right p-1">'+t._cell.row.data.ro_id+"</span></div>":void 0!==t._cell.row.data.kementerian_kode?e='<div class="badge  '+c_main+'" ><span class="badge-main '+c_kl+' p-1">'+t._cell.row.data.kl_id+"</span></div>":void 0!==t._cell.row.data.kro_id?e='<div class="badge '+c_main+'" ><span class="badge-left '+c_kl+' p-1">'+t._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1">'+t._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+t._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' badge-right p-1">'+t._cell.row.data.kro_id+"</span></div>":void 0!==t._cell.row.data.kegiatan_id?e='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1">'+t._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1">'+t._cell.row.data.program_id+'</span><span class="'+c_keg+' badge-right p-1">'+t._cell.row.data.kegiatan_id+"</span></div>":void 0!==t._cell.row.data.program_id&&(e='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1">'+t._cell.row.data.kl_id+'</span><span class="'+c_prog+' badge-right p-1">'+t._cell.row.data.program_id+"</span></div>"),'<span style="padding-right: 2em;"> '+e+" "+t._cell.row.data.name+"</span >"}},{title:"&#931; PROG",field:"jml_pro",titleDownload:"Program",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==e||"program"==e||void 0===e,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",mutator:function(t,a,e,i,l){var s=void 0===a._children?0:a._children.length;return void 0!==a.kl_id&&void 0===a.program_id?s:""},formatter:function(t,a){var e=t.getValue();return""===e&&(t.getElement().style.backgroundColor="#E5E8E8"),e}},{title:"&#931; KEG",titleDownload:"Kegiatan ",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==e||"kegiatan"==e||void 0===e,field:"jml_keg",formatter:function(t,a){var e=t.getValue();return""===e&&(t.getElement().style.backgroundColor="#E5E8E8"),e},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},mutator:function(t,a,e,i,l){var s=void 0===a._children?0:a._children.length,n=(void 0!==a.program_id&&a.kegiatan_id,0);return void 0!==a.kl_id&&void 0===a.program_id?(a._children.forEach(function(t){t=void 0===t._children?0:t._children.length;n+=t}),n):void 0!==a.program_id&&void 0===a.kegiatan_id?void 0===a._children?0:a._children.length:""}},{title:"&#931; KRO",titleDownload:"KRO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==e||"kro"==e||void 0===e,field:"jml_kro",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0}},{title:"&#931; RO",titleDownload:"RO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==e||"ro"==e||void 0===e,field:"jml_ro",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0}},{title:"Alokasi <br>RENJA-KL",titleDownload:"Renja KL",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,accessorDownload:numberIDRDownload,field:"alokasi_0",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Alokasi <br>RKAKL",titleDownload:"RKAKL",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"alokasi_2",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},accessorDownload:numberIDRDownload,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Analisis <br>Lanjutan",titleDownload:"Analisis Lanjutan",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"anl_alokasi",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},accessorDownload:numberIDRDownload,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"<span class='align-middle'>Target</span>",titleDownload:"Target",field:"target",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,sorter:"string",hozAlign:"right",headerHozAlign:"center",accessorDownload:numberIDRDownload,formatter:function(t,a){var e=t.getValue();return""===e&&(t.getElement().style.backgroundColor="#E5E8E8"),e}},{title:"Satuan",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"satuan",titleDownload:"Satuan",sorter:"string",hozAlign:"left",headerHozAlign:"center",formatter:function(t,a){var e=t.getValue();return""===e&&(t.getElement().style.backgroundColor="#E5E8E8"),e}},{title:"Lokasi",field:"lokasi",titleDownload:"Lokasi",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,sorter:"string",hozAlign:"left",headerHozAlign:"center",formatter:function(t,a){var e=t.getValue();return""===e&&(t.getElement().style.backgroundColor="#E5E8E8"),e}}],initialSort:[{column:"id",dir:"asc"}]});return document.getElementById(m).addEventListener("click",function(){r.download("xlsx","data.xlsx",{sheetName:"data"})}),document.getElementById(g).addEventListener("click",function(){r.download("pdf","data.pdf",{orientation:"landscape",title:"Penandaan dan Pagu",unit:"in",format:[612,792],autoTable:function(t){return{columnStyles:{3:{halign:"center"},4:{halign:"center"},2:{halign:"center"},5:{halign:"right"},6:{halign:"right"},7:{halign:"right"},8:{halign:"right"}}}}})}),r}Object.values(c.options).forEach(t=>{i.push(t.getAttribute("value"))}),Object.values(p.options).forEach(t=>{l.push(t.getAttribute("value"))}),await n(r,i,l).then(function(t){$("#penandaan-table").addClass("loading");var a=tableTreeLevel(t.detail,"all");mData.annualreport={detail:a,baseline:t.baseline,tile:t.tile},d(mData.annualreport),$("#penandaan-table").removeClass("loading")}),await async function(a,e,i){a=a.split("-");try{let t=await fetch(config.api_url+"/pp/chart-1-hap",{method:"POST",body:JSON.stringify({tahun:a[0],semester:a[1],kl:e,intervensi:i}),headers:config.fetchHeaders});return(await t.json()).data}catch(t){return!1}}(r,i,l).then(function(t){penandaanPagu(t)}),$("#kinerjaAnggaranSrc").keypress(async function(t){13==t.which&&(t=$(this).val(),$("#restoreData").removeClass("hide"),$(this).after(""),closeButton(),await n($("#sel_ta").val(),$("#sel_kl").val(),$("#sel_int").val(),t).then(function(t){d(t)}))}),$("#sel_ta").on("change",async function(){let a,e=[],t=$("#sel_ta").val(),i=t.split("-");if(2021<i[0]){try{let t=await fetch(config.api_url+"/ka/renja/kementerian",{method:"POST",body:JSON.stringify({tahun:i[0]}),headers:config.fetchHeaders});var l=await t.json();a=l}catch(t){return!1}a.data.forEach(t=>{e.push(`<option value="${t.kementerian_kode}" selected="selected">${t.kementerian_nama}</option>`)}),$("#sel_kl").find("value").remove(),s.innerHTML=" ",s.innerHTML=e.join(" "),$("#sel_kl").selectpicker("destroy"),$("#sel_kl").selectpicker()}u()}),$("#sel_kl, #sel_int").on("change",async()=>{u()}),$(".openclose").on("click",function(){var t=document.getElementById("sel_ta").value;["2022","2023"].includes(t)?o((t=treeOpenClose(this,mData.datahasil)).adjust,t.opsiTabel,t.item):(t=mData.annualreport.detail,d({detail:(t=treeOpenClose(this,t)).adjust,baseline:mData.annualreport.baseline,tile:mData.annualreport.tile},t.opsiTabel,t.item))}),$(".groupItem button").on("click",function(){var t=document.getElementById("sel_ta").value;console.log(this),["2022","2023"].includes(t)?o((t=treeBtnGroup(this,mData.datahasil)).adjust,t.opsiTabel,t.item):(t=mData.annualreport.detail,d({detail:(t=treeBtnGroup(this,t)).adjust,baseline:mData.annualreport.baseline,tile:mData.annualreport.tile},t.opsiTabel,t.item))}),document.getElementById("popUp").innerHTML=`
      <div class="modal-header bg-gray-300 w-100">
        <h5 class="modal-title">
          <i class="far fa-lg fa-fw fa-chart-bar"></i>
          Penandaan dan Pagu
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body w-100">
        <div class="tab-overflowx">
          <ul class="nav nav-tabs ">
            <li class="nav-item"><a  class="nav-link active" data-active="true" data-tab="1" id="tab_1a"><i class="material-icons" style="position: relative;bottom: -7px;">assignment_turned_in</i> &nbsp; Perkembangan Tagging dan Anggaran</h4></a></li>
          </ul>
        </div>
        <div class="tab-content border-top">
          <!-- begin tab-pane -->
          <div class="tab-pane p-3 fade active show" id="default-tab-1">                        
            <div class="btn-group btn-group-justified" id="btn-pilih">
              <span class="gchart me-3">Group By :</span>
              <a class="btn btn-default text-end active" id="gpIntervensi" onClick="gpIntervensi(this)" style="min-width: 8em;border-top-left-radius: 5px;border-bottom-left-radius: 5px;"><i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Intervensi</a>
              <a class="btn btn-default text-end " id="gpKL" onClick="gpKL(this)" style="min-width: 14em;">Kementerian/Lembaga</a>
            </div>                        
            <div class="col-xl-12 show active" id="contentIntervensi" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL11"><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR11"><span class="text-middle">Pagu Awal (Renja K/L)</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA11"><span class="text-middle">Pagu Awal (RKA K/L)</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH11"><span class="text-middle">Analisi Lanjutan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-green" id="sortByRO11"><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div> 
              </div>
              <!--GRAFIK-->
              <div id="chartdiv11" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
            <div class="col-xl-12 hide" id="contentKL" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                  <div class="btn btn-primary" id="sortByKL12"><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                  <div class="btn btn-info" id="sortByDR12"><span class="text-middle">Pagu Awal (Renja K/L)</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                  <div class="btn btn-indigo" id="sortByPA12"><span class="text-middle">Pagu Awal (RKA K/L)</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                  <div class="btn btn-pink" id="sortByPH12"><span class="text-middle">Analisi Lanjutan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                  <div class="btn btn-green" id="sortByRO12"> <span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div> 
              </div>              
              <!--GRAFIK-->
              <div id="chartdiv12x" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
          </div>          
        </div>
      </div>`,apopoverTrigger()}};export default PenandaanPagu;