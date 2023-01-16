import WidgetCard from"../components/WidgetCard.js";import{apiKementerian,apiTahunSemester,apiIntervensi}from"../../services/api.js";const KinerjaAnggaran={render:async()=>{mData.dataKementerian=void 0===mData.dataKementerian?await apiKementerian():mData.dataKementerian,mData.dataIntervensi=void 0===mData.dataIntervensi?await apiIntervensi():mData.dataIntervensi;return`
    <style>
      #poptabel_filter{
        position: relative;
        left: -0.5em;
        top: -1em;
      }
    </style>
      <div class="app-content-padding flex-grow-1 overflow-auto" data-scrollbar="true" data-height="100%">				
        <!-- BEGIN page-header -->
				<h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">corporate_fare</i>Kinerja Pembangunan</h2>
				<!-- END page-header -->
        <div id="main-tiles" class="border rounded">
          <div class="row pt-3 py-3  mx-0 bg-gray-300" id="drp_option">
            <div class="col-xl-3 ">
              <div class="form-group sel_tax">
                <select id="sel_ta" name="sel_ta" class="form-control selectpicker" data-title="Pilih Tahun" data-actions-box="true" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset">
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
          </div>        
          <div id="top-tiles00" class="row mx-1 my-3">
            ${await WidgetCard.render("tile-00","","","lg-12 hide")}
          </div>

          <div id="top-tiles" class="row m-3">
            <ul class="nav nav-tabs ">
              <li class="nav-item"><a class="nav-link nav-tableX p-0 px-3 py-2 active" onclick="tabElemn(this);" data-active="true" data-tab="1a" data-table="true" >Konvergensi Lokasi </a></li>
              <li class="nav-item"><a class="nav-link nav-tableX p-0 px-3 py-2" onclick="tabElemn(this);" data-active="false" data-tab="2a" data-table="true" >Lokasi Khusus Intervensi</a></li>
            </ul>
            <div class="tab-content rounded-bottom">
            <!--- Tab 1 -->
              <div class="tab-pane fade active show" id="default-tab-1a">
                <div class="col-lg-12">
                  <div class="h-100">
                    <div id="tile-1" class="m-3"></div>
                  </div>
                </div>
              </div>
              <!--- Tab 2 -->
              <div class="tab-pane fade" id="default-tab-2a">
                <div class="col-lg-12">
                  <div class="h-100">
                    <div id="tile-2" class="m-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="top-tiles2" class="row mx-1 my-3">
            ${await WidgetCard.render("tile-3",`
    <div class="btn bg-none text-blue m-0 p-0 mt-n3 mb-n3" id="konvergensi_sasaran" 
    data-title="Konvergensi Sasaran" data-bs-toggle="modal" data-bs-target="#chartModal">
    <i class="material-icons fs-17px">list_alt</i></div>
    `+"Konvergensi Sasaran","","lg-12")}    
          </div>
          <div id="top-tiles3" class="row mx-1 my-3">
            ${await WidgetCard.render("tile-4",`
    <div class="btn bg-none text-blue m-0 p-0 mt-n3 mb-n3" id="konvergensi_koordinasi" 
    data-title="Konvergensi Koordinasi" data-bs-toggle="modal" data-bs-target="#chartModal">
    <i class="material-icons fs-17px">list_alt</i></div>
    `+"Korvergensi Koordinasi","","lg-12")}
          </div>

          <div class="m-3 hide" id="ro-lokus-detail">
            <div id="peta-ro-lokus" style="height: 36em;" class=" rounded">
            </div>
          </div>

          <div class="m-3" id="tile-detail">
            <ul class="nav nav-tabs ">
              <li class="nav-item"><a class="nav-link nav-table p-0 px-3 py-2 active" onclick="tabElemn(this);" data-active="true" data-tab="1" data-table="true" id="kinerja_pembangunan_form_1">Indikasi Konvergensi Implementasi</a></li>
              <li class="nav-item"><a class="nav-link nav-table p-0 px-3 py-2" onclick="tabElemn(this);" data-active="false" data-tab="2" data-table="true" id="kinerja_pembangunan_form_2">Analisis Kinerja</a></li>
            </ul>
            <div class="tab-content border-top">   
              <div class="card">
                <div class="card-body">
                  <!--- Tab 1 -->       
                  <div class="tab-pane fade active show" id="default-tab-1">
                    <div class="d-flex justify-content-between bd-highlight">              
                      <div class="bd-highlight cursor-pointer open_table1" style="width: 6%;">
                        <div class="fs-12px fw-600 position-relative ">                  
                          <i class="material-icons fs-15px text-green-400">close_fullscreen</i> 
                          <span class="position-absolute top-50 start-5 translate-middle-y ps-1 material-text">Open All</span>
                        </div>
                      </div>
                      <div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700 my-2 mt-n1 fs-11px" >
                        <div class="bd-highlight">
                          <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer fs-15px text-green-400"  title="export xls" id="download-xlsx-kp1"></i>
                        </div> 
                        <div class="bd-highlight">
                          <div class="fs-12px fw-700">Download : </div>
                        </div>            
                      </div>
                    </div>

                    <div id="kinerja-table" class="is-bordered is-narrow rounded-bottom"></div>
                  </div>
                  <!--- Tab 2 -->
                  <div class="tab-pane fade" id="default-tab-2">
                    <div class="d-flex justify-content-between bd-highlight">              
                      <div class="bd-highlight cursor-pointer open_table2" style="width: 6%;">
                        <div class="fs-12px fw-600 position-relative ">                  
                          <i class="material-icons fs-15px text-green-400">close_fullscreen</i> 
                          <span class="position-absolute top-50 start-5 translate-middle-y ps-1 material-text">Open All</span>
                        </div>
                      </div>
                      <div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700 my-2 mt-n1 fs-11px" >
                        <div class="bd-highlight">
                          <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer fs-15px text-green-400"  title="export xls" id="download-xlsx-kp2"></i>
                        </div> 
                        <div class="bd-highlight">
                          <div class="fs-12px fw-700">Download : </div>
                        </div>            
                      </div>
                    </div>

                    <div id="kinerja-table2" class="is-bordered is-narrow rounded-bottom"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- Modal -->
      <div class="modal modal-message  fade" id="chartModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" style="margin: 3% 35%; width: 37%;border-radius: 11px;">          
          <div class="modal-content" style="border-radius: inherit;">
            <div class="modal-header bg-gray-300" style="width: 100%;">
              <h5 class="modal-title" id="title"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body w-100" id="popUp">
            </div>          
          </div>
        </div>
      </div>
      <!-- End Modal -->
      <!-- Modal -->
      <div class="modal fade" id="chartModal2" tabindex="-1"  aria-hidden="true">
        <div class="modal-dialog " >
          <div class="modal-content" >  
            <div class="modal-header bg-gray-300">
              <h4 class="modal-title" id="title" ></h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body" id="viewData">
            </div>			
          </div>
        </div>
      </div>
      <!-- End Modal -->
    `},after_render:async()=>{$(function(){$("select").selectpicker()});let a=document.getElementById("sel_ta"),l=document.getElementById("sel_kl"),p=document.getElementById("sel_int"),e=[],i=[],n=()=>{var a=`
        <div class="d-flex justify-content-center ">
            <div class="spinner-border text-orange mt-2 " role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`;document.getElementById("tile-00").innerHTML=a,document.getElementById("tile-1").innerHTML=a,document.getElementById("tile-2").innerHTML=a,document.getElementById("tile-3").innerHTML=a,document.getElementById("tile-4").innerHTML=a},m=['<option value="2021-1" selected="selected">2021 - Semester 1</option>','<option value="2022-1" >2022 - Semester 1</option>'],g=(a.innerHTML=m.join(" "),mData.dataKementerian.forEach(a=>{e.push(`<option value="${a.kementerian_kode}" selected="selected">${a.kementerian_nama}</option>`)}),l.innerHTML=e.join(" "),mData.dataIntervensi.forEach(a=>{i.push(`<option  value="${a.intervensi_kode}" selected="selected"> ${a.intervensi_nama}</option>`)}),p.innerHTML=i.join(" "),document.getElementById("sel_ta").value),f=document.getElementById("sel_kl"),v=document.getElementById("sel_int"),t=[],s=[];async function d(e,i,t,s){e=e.split("-");try{let a=await fetch(config.api_url+"/iki/indikasi-konvergensi-implementasi",{method:"POST",body:JSON.stringify({tahun:e[0],semester:e[1],kl:i,intervensi:t,search:s}),headers:config.fetchHeaders});return(await a.json()).data}catch(a){return!1}}async function r(e,i,t,s){e=e.split("-");try{let a=await fetch(config.api_url+"/ak/analisis-kinerja",{method:"POST",body:JSON.stringify({tahun:e[0],semester:e[1],kl:i,intervensi:t,search:s}),headers:config.fetchHeaders});return(await a.json()).data}catch(a){return!1}}async function o(e,a={expand:!1}){const i=new Tabulator("#kinerja-table",{height:"579px",data:(()=>{let a=Object.values(e.detail);return a.sort((a,e)=>a.kementerian_kode>e.kementerian_kode?1:-1),a.forEach((a,e)=>{a.id=e+1}),a})(),index:"kl_id",layout:"fitDataStretch",columnHeaderVertAlign:"middle",dataTree:!0,dataTreeStartExpanded:a.expand,dataTreeFilter:!0,dataTreeElementColumn:"name",dataTreeChildColumnCalcs:!1,dataTreeSelectPropagate:!0,dataLoader:!1,movableColumns:!0,columns:[{title:"No",titleDownload:"No",field:"id",visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"K/L, Program, Kegiatan, <br> RO",titleDownload:"K/L, Program, Kegiatan, RO",accessorDownload:cleanTextDownload,headerMenuIcon:"<i class='fas fa-lg fa-fw fa-grip-vertical text-primary-700' title='Menu Header'></i>",headerMenu:headerMenu,field:"name",width:300,responsive:0,frozen:!0,formatter:function(a,e){a.getValue();let i;return void 0!==a._cell.row.data.ro_id?i='<div class="badge '+c_main+'"><span class=" badge-left '+c_kl+' p-1" >'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' p-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' p-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' p-1">'+a._cell.row.data.kro_id+'</span><span class="'+color_ro+'  badge-right p-1">'+a._cell.row.data.ro_id+"</span></div>":void 0!==a._cell.row.data.kro_id?i='<div class="badge '+c_main+'" ><span class=" badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' p-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' p-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+'  badge-right p-1">'+a._cell.row.data.kro_id+"</span></div>":void 0!==a._cell.row.data.kegiatan_id?i='<div class="badge  '+c_main+'"><span class=" badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' p-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' p-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+'  badge-right p-1">'+a._cell.row.data.kegiatan_id+"</span></div>":void 0!==a._cell.row.data.program_id?i='<div class="badge '+c_main+'"><span class=" badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' p-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+'  badge-right p-1">'+a._cell.row.data.program_id+"</span></div>":void 0!==a._cell.row.data.intervensi_id?i='<div class="badge '+c_main+'"><span class=" badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+'  badge-right p-1">'+a._cell.row.data.intervensi_id+"</span></div>":void 0!==a._cell.row.data.kl_id&&(i='<div class="badge '+c_main+'" ><span class=" badge-main '+c_kl+' p-1">'+a._cell.row.data.kl_id+"</span></div>"),'<span style="padding-right: 2em;"> '+i+" "+a._cell.row.data.name+"</span >"}},{title:"&Sigma; Prog. ",titleDownload:"Program",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:function(a,e){return e.hide()},field:"jml_program",headerMenu:closeColumn,width:85,hozAlign:"center",formatter:function(a,e){a=a.getValue();return 0==a?"":a},bottomCalc:"sum",formatterParams:{precision:!1}},{title:"&Sigma; Keg. ",titleDownload:"Kegiatan",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"jml_kegiatan",width:85,hozAlign:"center",formatter:function(a,e){a=a.getValue();return 0==a?"":a},bottomCalc:"sum",formatterParams:{precision:!1}},{title:"&Sigma; RO ",titleDownload:"RO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"jml_ro",width:85,hozAlign:"center",formatter:function(a,e){a=a.getValue();return 0==a?"":a},bottomCalc:"sum",formatterParams:{precision:!1}},{title:"Kesesuaian Lokasi (Jumlah Kab/Kota)",columns:[{title:"Jumlah Lokasi <br>(Kab/Kota) Prioritas",titleDownload:"Jumlah Lokasi (Kab/Kota) Prioritas",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"lokasi_prioritas_desc",hozAlign:"right",formatter:function(a,e){a=a._cell.row.data.lokasi_prioritas?stringOrCurrency(a.getValue()):a.getValue();return a},width:150,sorter:"alphanum",headerHozAlign:"center"},{title:"Jumlah Lokasi <br>(Kab/Kota) Lainnya",titleDownload:"Jumlah Lokasi (Kab/Kota) Lainnya",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"non_lokasi_prioritas_desc",hozAlign:"right",formatter:function(a,e){return stringOrCurrency(a.getValue())},formatterParams:{precision:!1},width:150},{title:"Total",field:"total_lokasi",titleDownload:"Total",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,hozAlign:"right",formatter:function(a,e){return stringOrCurrency(a.getValue())},formatterParams:{precision:!1},width:150}]},{title:"Kesesuaian Target (Jumlah Sasaran Penerima)",columns:[{title:"Satuan",field:"satuan",titleDownload:"Satuan",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,hozAlign:"center",formatter:"money",formatterParams:{precision:!1},width:150},{title:"Sasaran Prioritas (1000 HPK)",columns:[{title:"Ya/Tidak",accessorDownload:booleanDownload,titleDownload:"Sasaran Prioritas (1000 HPK) (Ya/Tidak)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"sasaran_prioritas",hozAlign:"center",formatter:function(a,e){return yesNo(a.getValue())},formatterParams:{precision:!1},width:150},{title:"Jumlah",field:"sasaran_prioritas_jml",titleDownload:"Jumlah",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,hozAlign:"right",formatter:function(a,e){var i=a.getValue(),a=a._cell.row.data.sasaran_prioritas?stringOrCurrency(i):"";return a},formatterParams:{precision:!1},width:150}]},{title:"Sasaran Penting <br> (Anak usia 24 - 59 bulan, wanita usia subur, atau remaja putri)",titleDownload:"Sasaran Penting (Anak usia 24 - 59 bulan, wanita usia subur, atau remaja putri)",columns:[{title:"Ya/Tidak",accessorDownload:booleanDownload,titleDownload:"Sasaran Penting (Anak usia 24 - 59 bulan, wanita usia subur, atau remaja putri) (Ya/Tidak)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"sasaran_penting",hozAlign:"center",formatterParams:{precision:!1},width:210,formatter:function(a,e){return yesNo(a.getValue())}},{title:"Jumlah",field:"sasaran_penting_jml",titleDownload:"Jumlah",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,hozAlign:"right",formatter:function(a,e){var i=a.getValue(),a=a._cell.row.data.sasaran_penting?stringOrCurrency(i):"";return a},formatterParams:{precision:!1},width:210}]},{title:"Lainnya",columns:[{title:"Ya/Tidak",accessorDownload:booleanDownload,titleDownload:"Lainnya (Ya/Tidak)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"sasaran_lainnya",hozAlign:"center",formatter:function(a,e){return yesNo(a.getValue())},formatterParams:{precision:!1},width:150},{title:"Jika ya, Sebutkan",titleDownload:"Jika ya, Sebutkan (Ya/Tidak)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"sasaran_lainnya_1",hozAlign:"center",formatter:function(a,e){return stringOrCurrency(a.getValue())},formatterParams:{precision:!1},width:150},{title:"Jumlah",field:"sasaran_lainnya_jml",titleDownload:"Jumlah",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,hozAlign:"right",formatter:function(a,e){return stringOrCurrency(a.getValue())},formatterParams:{precision:!1},width:150}]}]},{title:"Koordinasi dengan Stakeholde",columns:[{title:"K/L Lainnya",columns:[{title:"Ya/Tidak",accessorDownload:booleanDownload,titleDownload:"Koordinasi dengan Stakeholde (Ya/Tidak)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"koord_kl",hozAlign:"center",formatter:function(a,e){return yesNo(a.getValue())},formatterParams:{precision:!1},width:150}]},{title:"Pemda",columns:[{title:"Ya/Tidak",accessorDownload:booleanDownload,titleDownload:"Pemda (Ya/Tidak)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"koord_pemda",hozAlign:"center",formatter:function(a,e){return yesNo(a.getValue())},formatterParams:{precision:!1},width:150}]},{title:"Non Pemerintah",columns:[{title:"Ya/Tidak",accessorDownload:booleanDownload,titleDownload:"Non Pemerintah (Ya/Tidak)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"koord_non",hozAlign:"center",formatter:function(a,e){return yesNo(a.getValue())},formatterParams:{precision:!1},width:150}]}]}],initialSort:[{column:"id",dir:"asc"}]});document.getElementById("download-xlsx-kp1").addEventListener("click",function(){i.download("xlsx","kinerja_pembangunan_1.xlsx",{sheetName:"data"})});return i}async function c(e,a={expand:!1}){const i=new Tabulator("#kinerja-table2",{height:"579px",data:(()=>{let a=Object.values(e.detail);return a.sort((a,e)=>a.kementerian_kode>e.kementerian_kode?1:-1),a.forEach((a,e)=>{a.id=e+1}),a})(),index:"kl_id",layout:"fitDataStretch",columnHeaderVertAlign:"middle",dataTree:!0,dataTreeStartExpanded:a.expand,dataTreeFilter:!0,dataTreeElementColumn:"name",dataTreeChildColumnCalcs:!1,dataTreeSelectPropagate:!0,dataLoader:!1,movableColumns:!0,columns:[{title:"No",titleDownload:"No",field:"id",visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"K/L, <br> Program, <br> Kegiatan, <br> RO <br> &nbsp",titleDownload:"K/L,Program,Kegiatan,RO",accessorDownload:cleanTextDownload,headerMenuIcon:"<i class='fas fa-lg fa-fw fa-grip-vertical text-primary-700' title='Menu Header'></i>",headerMenu:headerMenu,field:"name",width:350,responsive:0,frozen:!0,formatter:function(a,e){a.getValue();let i;return void 0!==a._cell.row.data.ro_id?i='<div class="badge '+c_main+'"><span class=" badge-left '+c_kl+' px-1" >'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' px-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' px-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' px-1">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' px-1">'+a._cell.row.data.kro_id+'</span><span class="'+color_ro+'   badge-right px-1">'+a._cell.row.data.ro_id+"</span></div>":void 0!==a._cell.row.data.kro_id?i='<div class="badge '+c_main+'" ><span class=" badge-left '+c_kl+' px-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' px-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' px-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' px-1">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+'  badge-right px-1">'+a._cell.row.data.kro_id+"</span></div>":void 0!==a._cell.row.data.kegiatan_id?i='<div class="badge  '+c_main+'"><span class=" badge-left '+c_kl+' px-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' px-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' px-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+'  badge-right px-1">'+a._cell.row.data.kegiatan_id+"</span></div>":void 0!==a._cell.row.data.program_id?i='<div class="badge '+c_main+'"><span class=" badge-left '+c_kl+' px-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' px-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+'  badge-right px-1">'+a._cell.row.data.program_id+"</span></div>":void 0!==a._cell.row.data.intervensi_id?i='<div class="badge '+c_main+'"><span class="  badge-left '+c_kl+' px-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+'  badge-right px-1">'+a._cell.row.data.intervensi_id+"</span></div>":void 0!==a._cell.row.data.kl_id&&(i='<div class="badge '+c_main+'" ><span class=" badge-main '+c_kl+' px-1">'+a._cell.row.data.kl_id+"</span></div>"),'<span style="padding-right: 2em;"> '+i+" "+a._cell.row.data.name+"</span >"}},{title:"<br/> <br/> &Sigma; Prog. <br/> <br/>",titleDownload:"Program",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"jml_program",titleDownload:"Program",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,width:85,hozAlign:"center",formatter:function(a,e){a=a.getValue();return 0==a?"":a},formatterParams:{precision:!1}},{title:"<br/> <br/> &Sigma; Keg. <br/> <br/>",titleDownload:"Kegiatan",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"jml_kegiatan",width:85,hozAlign:"center",formatter:function(a,e){a=a.getValue();return 0==a?"":a},formatterParams:{precision:!1}},{title:"<br/> <br/> &Sigma; KRO <br/> <br/>",titleDownload:"KRO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"jml_kro",width:85,hozAlign:"center",formatter:function(a,e){a=a.getValue();return 0==a?"":a},formatterParams:{precision:!1}},{title:"<br/> <br/> &Sigma; RO <br/> <br/>",titleDownload:"RO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"jml_ro",width:85,hozAlign:"center",formatter:function(a,e){a=a.getValue();return 0==a?"":a},formatterParams:{precision:!1}},{title:"Aktivitas/Uraian Kegiatan <br> (bentuk aktivitas, jenis intervensi, kapan dilaksanakan, <br> periode pelaksanaan, stakeholder, <br> dll)<br> &nbsp",titleDownload:"Aktivitas/Uraian Kegiatan (bentuk aktivitas, jenis intervensi, kapan dilaksanakan, periode pelaksanaan, stakeholder, dll)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"aktivitas",hozAlign:"left",formatter:"textarea",width:150,formatter:htmlWrapFormatter,variableHeight:!0},{title:"Analisis Gap antara Capaian Kinerja <br>dengan Target",columns:[{title:"Kinerja Anggaran",field:"analisis_gap_ka",titleDownload:"Kinerja Anggaran",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,hozAlign:"left",formatter:"money",formatterParams:{precision:!1},width:250,formatter:htmlWrapFormatter,variableHeight:!0},{title:"Kinerja Output",field:"analisis_gap_ko",titleDownload:"Kinerja Output",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,hozAlign:"left",formatter:"money",formatterParams:{precision:!1},width:250,formatter:htmlWrapFormatter,variableHeight:!0}]},{title:"Dampak Pandemi Covid-19 melalui <br> kebijakan penghematan anggaran serta implementasinya",columns:[{title:"Ada Penghematan <br> (ya/tidak)",titleDownload:"Ada Penghematan (ya/tidak)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,accessorDownload:booleanDownload,field:"penghematan",hozAlign:"center",formatter:function(a,e){return""==a.getValue()||null==a.getValue()?"":"ya"==a.getValue().toLowerCase()?yesNo(!0):yesNo(!1)},formatterParams:{precision:!1},width:250},{title:"Target output turun <br> (ya/tidak)",titleDownload:"Target output turun (ya/tidak)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,accessorDownload:booleanDownload,field:"target_turun",hozAlign:"center",formatter:function(a,e){return""==a.getValue()||null==a.getValue()?"":"ya"==a.getValue().toLowerCase()?yesNo(!0):yesNo(!1)},formatterParams:{precision:!1},width:250},{title:"Keterangan  (penyelesaian revisi DIPA, <br/> perubahan skema implementasi, dll.)",titleDownload:"Keterangan  (penyelesaian revisi DIPA, perubahan skema implementasi, dll.)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"keterangan",hozAlign:"left",formatter:"textarea",formatterParams:{precision:!1},width:250,formatter:htmlWrapFormatter,variableHeight:!0}]},{title:"Reviu permasalahan/faktor keberhasilan, termasuk <br> dengan penanganan pandemi covid-19 <br> (dari sisi perencanaan & penganggaran, proses pelaksanaan, <br> keterlibatan / peran serta pemangku kepentingan, <br> atau aspek lain yang relevan) ",titleDownload:"Reviu permasalahan/faktor keberhasilan, termasuk dengan penanganan pandemi covid-19 (dari sisi perencanaan & penganggaran, proses pelaksanaan, keterlibatan / peran serta pemangku kepentingan, atau aspek lain yang relevan) ",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"reviu",hozAlign:"left",formatter:"textarea",formatterParams:{precision:!1},width:250,formatter:htmlWrapFormatter,variableHeight:!0},{title:"Rekomendasi <br> Perbaikan <br> pada  <br> Semester II <br> &nbsp",titleDownload:"Rekomendasi Perbaikan pada Semester II",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"rekomendasi",hozAlign:"left",formatter:"textarea",formatterParams:{precision:!1},width:250,formatter:htmlWrapFormatter,variableHeight:!0}],initialSort:[{column:"id",dir:"asc"}]});return document.getElementById("download-xlsx-kp2").addEventListener("click",function(){i.download("xlsx","kinerja_pembangunan_2.xlsx",{sheetName:"data"})}),i}async function h(a,e,d,r,i){console.log("result",a);var s,t=e.split("-"),m=a.tile,l=document.getElementById("tile-00"),e=document.getElementById("tile-1"),n=document.getElementById("tile-2"),o=document.getElementById("tile-3"),c=document.getElementById("tile-4");document.getElementById("sel_ta").value;0<a.detail.length?($("#top-tiles,#top-tiles2,#top-tiles3,#tile-detail").show(),e.innerHTML=`
            <div class="btn bg-none text-blue m-0 p-0 mt-n3 mb-n3" id="kesesuaian_lokasi" data-title="Kesesuaian Lokasi RO" data-bs-toggle="modal" data-bs-target="#chartModal">
              <i class="material-icons fs-17px">list_alt</i>
            </div> 
            <span class="h6">Detail</span>
            <div id="my_treex" class="my-3 mx-auto" style="width:50em">
              <div id="wrapper" class="fs-9px">
                <span class="labelx" style="background: #68b7dc;height: 4em;margin-left: 6em;"> 
                  &Sigma;  RO : <span id="tTreeRo1" class="badge bg-yellow text-black f-s-12">0</span>
                </span>
                <div class="branch lv1">
                  <div class="entry">
                    <span class="labelx  f-s-10 wdTree" style="background: green;top: 38%;"><span class="noLeft">1.</span> Dilaksanakan <br>di Kab/Kota Lokus <br>   &Sigma;  RO : <span id="tTreeRo2a" class="badge bg-yellow text-black f-s-10">0</span></span>
                    <div class="branch lv2">
                      <div class="entry">
                        <span class="labelx f-s-9  wdTree " style="background: green;top:16%">
                          <span class="noLeft">a.</span>Menyasar pada <br> >360 Kab/Kota Lokus <br>  &Sigma;  RO : <span id="tTreeRo3a" class="badge bg-yellow text-black f-s-10">0</span>
                        </span>
                        <div class="branch lv3">
                          <div class="entry sole"><span class="labelx  f-s-9  wdTree level4" style="background: green;top: 16%;">Memiliki <br>  Kab/Kota Non-Lokus <br>  &Sigma;  RO : <span id="tTreeRo4a" class="badge bg-yellow text-black f-s-10">0</span></span></div>
                        </div>
                      </div>
                      <div class="entry lv3">
                        <span class="labelx f-s-9 wdTree" style="background: #6894dc;top: 16em;">
                          <span class="noLeft">b.</span> Menyasar pada <br> <=360 Kab/Kota Lokus <br>  &Sigma;  RO : <span id="tTreeRo3b" class="badge bg-yellow text-black f-s-10">0</span>
                        </span>
                        <div class="branch lv3" style="top: 12.17em;">
                          <div class="entry">
                            <span class="labelx  f-s-9  wdTree level4" style="background: #6894dc;margin-top: -4em;">Tidak ada <br>  Kab/Kota Non-Lokus <br> &Sigma;  RO : <span id="tTreeRo4b" class="badge bg-yellow text-black f-s-10">0</span>
                            </span>
                          </div>										
                          <div class="entry last-tree">
                            <span class="labelx  f-s-9  wdTree level4" style="background: #6894dc;top: 11.3em;">Memiliki<br>   Kab/Kota Non-lokus <br> &Sigma; RO : <span id="tTreeRo4c" class="badge bg-yellow text-black f-s-10">0</span>
                            </span>
                          </div>
                        </div>
                      </div>									
                    </div>
                  </div>
                  <div class="entry r1"><span class="labelx  f-s-9 wdTree" style="background: #dc8c67;top: -2em;"><span class="noLeft">2.</span>Dilaksanakan <br> di level Pusat <br>  &Sigma;  RO : <span id="tTreeRo2b" class="badge bg-yellow text-black f-s-10">0</span> </span></div>
                  <div class="entry r2 lev1_adjust"><span class="labelx  f-s-9 wdTree" style="background: #c767dc;top: 0.9em;"><span class="noLeft">3.</span>Dilaksanakan <br> di level Provinsi <br>  &Sigma;  RO : <span id="tTreeRo2c" class="badge bg-yellow text-black f-s-10">0</span></span></div>
                  <div class="entry r3 "><span class="labelx  f-s-9 wdTree" style="background: #4b0082;top: 3.5em;"><span class="noLeft">4.</span>Dilaksanakan <br> di non-Kab/Kota Lokus <br>  &Sigma;  RO : <span id="tTreeRo2d" class="badge bg-yellow text-black f-s-10">0</span></span></div>
                </div>
              </div>
            </div>`,$("#tTreeRo1").html(m.kesesuaianLokus.total_ro),$("#tTreeRo2a").html(m.kesesuaianLokus.dilaksanakan_level_kota),$("#tTreeRo2b").html(m.kesesuaianLokus.dilaksanakan_level_pusat),$("#tTreeRo2c").html(m.kesesuaianLokus.dilaksanakan_level_provinsi),$("#tTreeRo2d").html(m.kesesuaianLokus.dilaksanakan_lokasi_prioritas),$("#tTreeRo3a").html(m.kesesuaianLokus.menyasar_mt_360_kota),$("#tTreeRo3b").html(m.kesesuaianLokus.menyasar_lte_360_kota),$("#tTreeRo4a").html(m.kesesuaianLokus.menyasar_mt_360_kota_kota_non_lokus),$("#tTreeRo4b").html(m.kesesuaianLokus.menyasar_lte_360_kota_kota_none_non_lokus),$("#tTreeRo4c").html(m.kesesuaianLokus.menyasar_lte_360_kota_kota_non_lokus),$("#kesesuaian_lokasi").on("click",function(){$(".modal #title").html('<i class="material-icons ms-n2 me-1">list_alt</i>'+$(this).data("title")),$("#popUp").html(" "),$("#popUp").html(`
            <div class="container p-0 ps-2">
              <div class="row pt-1 fs-11px ">
                <div class="col fw-600 m-0 p-0 pe-2">                
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">Total RO</div>
                    <div class=" bd-highlight" id="tot_ro">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">1. Dilaksanakan pada Kab/Kota Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">a. Menyasar pada >360 Kab/Kota Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1a">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-3">&#183; Memiliki Kab/Kota Non-Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1aa">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">b. Menyasar pada <=360 Kab/Kota Lokus</div>
                    <div class=" bd-highlight"  id="tot_ro_1b">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-3">&#183; Tidak ada kab/kota Non-Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1ba">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-3">&#183; Memiliki kab/kota Non-lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1bb">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">2. Dilaksanakan di level Pusat</div>
                    <div class=" bd-highlight" id="tot_ro_2">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">3. Dilaksanakan di level Provinsi</div>
                    <div class=" bd-highlight" id="tot_ro_3">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">4. Dilaksanakan di non Kab/Kota Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_4">0</div>    
                  </div>
                </div>              
              </div>
            </div>`),$("#tot_ro").html(m.kesesuaianLokus.total_ro),$("#tot_ro_1").html(m.kesesuaianLokus.dilaksanakan_level_kota),$("#tot_ro_2").html(m.kesesuaianLokus.dilaksanakan_level_pusat),$("#tot_ro_3").html(m.kesesuaianLokus.dilaksanakan_level_provinsi),$("#tot_ro_4").html(m.kesesuaianLokus.dilaksanakan_lokasi_prioritas),$("#tot_ro_1a").html(m.kesesuaianLokus.menyasar_mt_360_kota),$("#tot_ro_1b").html(m.kesesuaianLokus.menyasar_lte_360_kota),$("#tot_ro_1aa").html(m.kesesuaianLokus.menyasar_mt_360_kota_kota_non_lokus),$("#tot_ro_1ba").html(m.kesesuaianLokus.menyasar_lte_360_kota_kota_none_non_lokus),$("#tot_ro_1bb").html(m.kesesuaianLokus.menyasar_lte_360_kota_kota_non_lokus)}),(async()=>{try{let a=await fetch(config.api_url+"/iki/chart-2",{method:"POST",body:JSON.stringify({tahun:t[0],semester:t[1],kl:d,intervensi:r,search:i}),headers:config.fetchHeaders});var e=await a.json();s=e.data}catch(a){return}n.innerHTML=`
            <div class="btn bg-none text-blue m-0 p-0 mt-n3 mb-n3" id="lokasi_perintv" data-title="Lokasi Per intervensi" data-bs-toggle="modal" data-bs-target="#chartModal">
              <i class="material-icons fs-17px">list_alt</i>
            </div>
            <span class="h6">Detail</span>
            <div id="chartdiv3" style="height: 32em;margin-left: -1.1em;"></div>`,am4core.ready(function(){am4core.useTheme(am4themes_animated);var d=am4core.create("chartdiv3",am4charts.XYChart),r=(d.colors.step=5,d.legend=new am4charts.Legend,d.legend.position="bottom",d.legend.paddingBottom=0,d.legend.labels.template.maxWidth=10,d.fontSize=9,d.xAxes.push(new am4charts.CategoryAxis));function a(a,e){var i=d.series.push(new am4charts.ColumnSeries);return i.dataFields.valueY=a,i.dataFields.categoryX="intervensi_nama",i.name=e,i.tooltipText="{name}: [bold]{valueY}[/]",i.events.on("hidden",t),i.events.on("shown",t),i}function t(){var a,i,t,e,s,l=d.series.getIndex(0),n=1-r.renderer.cellStartLocation-(1-r.renderer.cellEndLocation);1<l.dataItems.length&&(a=r.getX(l.dataItems.getIndex(0),"categoryX"),i=(r.getX(l.dataItems.getIndex(1),"categoryX")-a)/d.series.length*n,am4core.isNumber(i)&&(t=d.series.length/2,e=0,d.series.each(function(a){a.isHidden||a.isHiding?a.dummyData=d.series.indexOf(a):(a.dummyData=e,e++)}),s=e/2,d.series.each(function(a){var e=d.series.indexOf(a),e=(a.dummyData-e+t-s)*i;a.animate({property:"dx",to:e},a.interpolationDuration,a.interpolationEasing),a.bulletsContainer.animate({property:"dx",to:e},a.interpolationDuration,a.interpolationEasing)})))}r.dataFields.category="intervensi_nama",r.renderer.cellStartLocation=.1,r.renderer.cellEndLocation=.9,r.renderer.grid.template.location=0,r.renderer.minGridDistance=50,d.yAxes.push(new am4charts.ValueAxis).min=0,d.data=s,a("lokasi_kota","Kab/Kota"),a("lokasi_provinsi","Propinsi "),a("lokasi_pusat","Pusat"),d.cursor=new am4charts.XYCursor});$("#lokasi_perintv").on("click",function(){$(".modal #title").html('<i class="material-icons ms-n2 me-1">list_alt</i>'+$(this).data("title")),$("#popUp").html(" "),$("#popUp").html(`
            <div class="container p-0 ps-2">
              <div class="row pt-1 fs-11px ">                
                <div class="col fw-600 m-0 p-0">                
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">1. Dilaksanakan pada Kab/Kota</div>
                    <div class=" bd-highlight" id="lokus_kabkota">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Spesifik</div>
                    <div class=" bd-highlight" id="lokus_kabkota_spes">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Sensitif</div>
                    <div class=" bd-highlight" id="lokus_kabkota_sen">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">&#183; Dukungan</div>
                    <div class=" bd-highlight" id="lokus_kabkota_duk">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">2. Dilaksanakan di Level Provinsi</div>
                    <div class=" bd-highlight" id="lokus_propinsi">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Spesifik</div>
                    <div class=" bd-highlight" id="lokus_propinsi_spe">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Sensitif</div>
                    <div class=" bd-highlight" id="lokus_propinsi_sen">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">&#183; Dukungan</div>
                    <div class=" bd-highlight" id="lokus_propinsi_duk">0</div>    
                  </div>            
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">3. Dilaksanakan di Level Pusat</div>
                    <div class=" bd-highlight" id="lokus_pusat">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Spesifik</div>
                    <div class=" bd-highlight" id="lokus_pusat_spe">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Sensitif</div>
                    <div class=" bd-highlight" id="lokus_pusat_sen">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">&#183; Dukungan</div>
                    <div class=" bd-highlight" id="lokus_pusat_duk">0</div>    
                  </div>
                </div>
              </div>
            </div>`);let a=m.lokusIntervensi,e=0,i=0,t=0,s=0,l=0,n=0,d=0,r=0,o=0,c=0,h=0,p=0;a.forEach(a=>{e+=a.lokasi_kota,l+=a.lokasi_provinsi,o+=a.lokasi_pusat,"A"==a.intervensi_kode?(i+=a.lokasi_kota,n+=a.lokasi_provinsi,c+=a.lokasi_pusat):"B"==a.intervensi_kode?(t+=a.lokasi_kota,d+=a.lokasi_provinsi,h+=a.lokasi_pusat):"C"==a.intervensi_kode&&(s+=a.lokasi_kota,r+=a.lokasi_provinsi,p+=a.lokasi_pusat)}),$("#lokus_kabkota_spes").html(i),$("#lokus_propinsi_spe").html(n),$("#lokus_pusat_spe").html(c),$("#lokus_kabkota_sen").html(t),$("#lokus_propinsi_sen").html(d),$("#lokus_pusat_sen").html(h),$("#lokus_kabkota_duk").html(s),$("#lokus_propinsi_duk").html(r),$("#lokus_pusat_duk").html(p),$("#lokus_kabkota").html(e),$("#lokus_propinsi").html(l),$("#lokus_pusat").html(o)})})(),(async()=>{let s,a=document.getElementById("sel_ta").value,e=a.split("-");try{let a=await fetch(config.api_url+"/iki/chart-3",{method:"POST",body:JSON.stringify({tahun:e[0],semester:e[1],kl:d,intervensi:r}),headers:config.fetchHeaders});var i=await a.json();s=i.data}catch(a){return}l.innerHTML=`  
          <div class="row">
            <div class="h5 m-0 p-0 ps-2 mb-3">Capaian Kinerja Penurunan <i>Stunting</i> <span class="text-yellow-600">Bersumber Belanja K/L 2021</span></div>      
            
            <div class="col-lg-3 p-0 px-1" >
              <div class="btn bg-green-600 text-white-500 ms-1 mt-2 mb-4 py-3">Intervensi Gizi Spesifik</div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-green-600"></i>
                    <i class="ion ion-md-woman fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-25px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-green-600 m-0 p-0 pt-1">246.560 </div>
                  <div class="fs-12px"><span class="fw-700">Ibu Hamil Kek Mendapatkan PMT </span>pada 360 Kabupaten/Kota Prioritas (Kemenkes)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-green-600"></i>
                    <i class="fas fa-baby fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-green-600 m-0 p-0 pt-1">441.000 </div>
                  <div class="fs-12px"><span class="fw-700">Balita Kurus Mendapat PMT </span>pada 55 Kabupaten/Kota Prioritas (Kemenkes)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-green-600"></i>
                    <i class="ion ion-md-timer fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-23px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-green-600 m-0 p-0 pt-1">140.000 </div>
                  <div class="fs-12px"><span class="fw-700">Balita Gizi Kurang Mendapat Suplementasi Gizi Mikro (Taburia) </span>pada 65 Kabupaten/Kota Prioritas (Kemenkes)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-green-600"></i>
                    <i class="fas fa-syringe fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-green-600 m-0 p-0 pt-1">490 </div>
                  <div class="fs-12px"><span class="fw-700">Tenaga Kesehatan yang telah dilatih Konseling Pemberian Makan Bayi dan Anak (PMBA) </span>di 514 Kabupaten/Kota (Kemenkes)</div>              
                </div>            
              </div>
              
            </div>
            
            
            <div class="col-lg-6 p-0 px-1 ps-4" >

              <div class="btn bg-yellow-600 text-white-500 ms-n1 mt-2 mb-4 py-3">Intervensi Gizi Sensitif</div>
              <div class="row">
                <div class="col-lg-6 m-0 p-0">
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-utensils fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-25px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">32.778 </div>
                      <div class="fs-12px"><span class="fw-700">Hektar kawasan Padi Kaya Gizi (Biofortifikasi) </span>(Kementan)</div>              
                    </div>   
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-house-user fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">2.040 </div>
                      <div class="fs-12px"><span class="fw-700">Guru dan Tenaga Kependidikan PAUD yang difasilitasi kompetensi melalui program kemitraan </span>di 119 Kabupaten/Kota (Kemendikbud)</div>              
                    </div>            
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-child fa-fw me-10px fa-child fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-23px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">3.893.635 </div>
                      <div class="fs-12px"><span class="fw-700">Keluarga dengan baduta yang mendapatkan fasilitas dan pembinaan 1000 HPK </span>(KBKKBN)</div>              
                    </div>            
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-users fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">574 </div>
                      <div class="fs-12px">Kelompok telah melakukan pengembangan <span class="fw-700">Pekarangan Pangan Lestari Stunting </span>(Kementan)</div>              
                    </div>            
                  </div>
                </div>
                <div class="col-lg-6 m-0 p-0">
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-fish fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-25px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">120 </div>
                      <div class="fs-12px"><span class="fw-700">Promosi untuk Kampanye Gerakan Masyarakat Makan Ikan </span>(KKP)</div>              
                    </div>   
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fab fa-slideshare fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">3.083.074 </div>
                      <div class="fs-12px">Keluarga Miskin pada 514 Kabupaten/Kota Prioritas telah mendapat <span class="fw-700">Bantuan Tunai Bersyarat </span>(Kemensos)</div>              
                    </div>            
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fab fa-slideshare fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">18.519.519 </div>
                      <div class="fs-12px">KPM pada 514 Kabupaten/Kota Prioritas telah mendapat <span class="fw-700">Bantuan BNPT/SEMBAKO </span> (Kemensos)</div>              
                    </div>            
                  </div>
                  
                </div>
              </div>


              
            </div>
            
            
            <div class="col-lg-3 p-0 px-1 ps-4" >

              <div class="btn bg-gray-700 text-white-500 ms-1 mt-2 mb-3">Kordinasi, Pendampingan, Dukungan Teknis</div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-gray-700"></i>
                    <i class="fas fa-link fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-gray-700 m-0 p-0 pt-1">14.122 </div>
                  <div class="fs-12px"><span class="fw-700">Pendamping Program Bantuan Tunai Bersyarat </span>pada 360 Kabupaten/Kota Prioritas telah ditingkatkan kemampuan P2K2 (Kemensos)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-gray-700"></i>
                    <i class="ion ion-ios-create fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-25px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-gray-700 m-0 p-0 pt-1">234 </div>
                  <div class="fs-12px">Kegiatan telah dilaksanakan untuk <span class="fw-700">Diseminasi informasi mengenai Stunting </span>(Kemonkominfo)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-gray-700"></i>
                    <i class="fas fa-landmark fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-21px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-gray-700 m-0 p-0 pt-1">360 </div>
                  <div class="fs-12px"><span class="fw-700">Daerah yang meningkat kapasitas aparaturnya dalam penilaian kinerja penanganan stunting </span>(Kemendagri)</div>              
                </div>            
              </div>
              
            
              
            </div>
            <div class="h6 text-end w-500px ms-auto"><i>Sumber : Laporan Evaluasi Mandiri K/L (diolah) untuk Laporan Kinerja Anggaran dan Pembangunan TA 2021</i></div>
          </div>
            `,o.innerHTML=`  
          <div class="row">      
            <div class="col-lg-6" id="default-pop-1">
              <div id="chartdiv4" style="height: 33em;"></div>
            </div>
            <div class="col-lg-6" id="default-pop-2">
              <div id="chartdiv5" style="height: 33em;"></div>
            </div>
          </div>
            `,am4core.ready(function(){am4core.useTheme(am4themes_animated);var a,e,i,d=am4core.create("chartdiv4",am4charts.XYChart),r=(d.colors.step=5,d.legend=new am4charts.Legend,d.legend.position="bottom",d.legend.paddingBottom=20,d.legend.labels.template.maxWidth=95,d.fontSize=10,d.xAxes.push(new am4charts.CategoryAxis));function t(){var a,i,t,e,s,l=d.series.getIndex(0),n=1-r.renderer.cellStartLocation-(1-r.renderer.cellEndLocation);1<l.dataItems.length&&(a=r.getX(l.dataItems.getIndex(0),"categoryX"),i=(r.getX(l.dataItems.getIndex(1),"categoryX")-a)/d.series.length*n,am4core.isNumber(i)&&(t=d.series.length/2,e=0,d.series.each(function(a){a.isHidden||a.isHiding?a.dummyData=d.series.indexOf(a):(a.dummyData=e,e++)}),s=e/2,d.series.each(function(a){var e=d.series.indexOf(a),e=(a.dummyData-e+t-s)*i;a.animate({property:"dx",to:e},a.interpolationDuration,a.interpolationEasing),a.bulletsContainer.animate({property:"dx",to:e},a.interpolationDuration,a.interpolationEasing)})))}r.dataFields.category="category",r.renderer.cellStartLocation=.1,r.renderer.cellEndLocation=.9,r.renderer.grid.template.location=0,d.yAxes.push(new am4charts.ValueAxis).min=0,d.data=s,a="value",e="Konvergensi Sasaran",(i=d.series.push(new am4charts.ColumnSeries)).dataFields.valueY=a,i.dataFields.categoryX="category",i.name=e,i.events.on("hidden",t),i.events.on("shown",t),(a=i.bullets.push(new am4charts.LabelBullet)).interactionsEnabled=!1,a.dy=-10,a.label.text="{valueY}",a.label.fill=am4core.color("#333")}),am4core.ready(function(){am4core.useTheme(am4themes_animated);var a=am4core.create("chartdiv5",am4charts.PieChart),e=(a.fontSize=10,a.series.push(new am4charts.PieSeries));e.dataFields.value="value",e.dataFields.category="Konvergensi Sasaran",a.innerRadius=am4core.percent(30),e.slices.template.stroke=am4core.color("#fff"),e.slices.template.strokeWidth=0,e.slices.template.strokeOpacity=1,e.slices.template.cursorOverStyle=[{property:"cursor",value:"pointer"}],e.alignLabels=!1,e.labels.template.bent=!0,e.labels.template.radius=3,e.labels.template.padding(0,0,0,0),e.ticks.template.disabled=!0,e.slices.template.filters.push(new am4core.DropShadowFilter).opacity=0;e=e.slices.template.states.getKey("hover").filters.push(new am4core.DropShadowFilter);e.opacity=.7,e.blur=5,a.legend=new am4charts.Legend,a.legend.position="bottom",a.legend.labels.template.maxWidth=10,a.data=s});$("#konvergensi_sasaran").on("click",function(){$(".modal #title").html('<i class="material-icons ms-n2 me-1">list_alt</i>'+$(this).data("title")),$("#popUp").html(" "),$("#popUp").html(`
          <div class="container p-0 ps-2">
            <div class="row pt-1">
              <div class="col fw-600 fs-11px m-0 p-0 pe-2">
                <div class="d-flex justify-content-between bd-highlight mb-1 border-bottom">
                  <div class=" bd-highlight">                
                    Sasaran
                  </div>
                  <div class=" bd-highlight">Σ RO</div>    
                </div>
                <div class="d-flex justify-content-between bd-highlight mb-2">
                  <div class=" bd-highlight">Sasaran Prioritas</div>
                  <div class=" bd-highlight" id="1000_hpk">0</div>    
                </div>
                <div class="d-flex justify-content-between bd-highlight mb-2">
                  <div class=" bd-highlight">Sasaran Penting</div>
                  <div class=" bd-highlight" id="1000_hpk_penting">0</div>    
                </div>
                <div class="d-flex justify-content-between bd-highlight mb-2">
                  <div class=" bd-highlight">Sasaran Lainnya</div>
                  <div class=" bd-highlight" id="1000_hpk_penting_lainnya">0</div>    
                </div>
              </div>
            </div>
          </div>`);let a=m.konvergensiSasaran;a.forEach(a=>{"Sasaran Prioritas"==a.category&&$("#1000_hpk").html(a.value),"Sasaran Penting"==a.category&&$("#1000_hpk_penting").html(a.value),"Sasaran Lainnya"==a.category&&$("#1000_hpk_penting_lainnya").html(a.value)})})})(),(async()=>{let i,e,a=document.getElementById("sel_ta").value,t=a.split("-");try{let a=await fetch(config.api_url+"/iki/chart-4",{method:"POST",body:JSON.stringify({tahun:t[0],semester:t[1],kl:d,intervensi:r}),headers:config.fetchHeaders});var s=await a.json();i=s.data}catch(a){return}try{let a=await fetch(config.api_url+"/iki/chart-5",{method:"POST",body:JSON.stringify({tahun:t[0],semester:t[1],kl:d,intervensi:r}),headers:config.fetchHeaders});var l=await a.json();e=l.data}catch(a){return}var n=[];e.forEach(a=>{var e;"Pemda"==a.name?e="#f59c1a":"K/L Lain"==a.name?e="blue":"Non-Pemerintah"==a.name?e="green":"K/L Lain, Pemda"==a.name?e="indigo":"K/L Lain, Non-Pemerintah"==a.name?e="yellow":"Pemda, Non-Pemerintah"==a.name?e="grey":"K/L Lain, Pemda, Non-Pemerintah"==a.name&&(e="lime"),n.push({name:a.name,value:a.value,color:e,sets:a.sets})}),c.innerHTML=`
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 p-3 ui-sortable"> 
                <div id="chartdiv1a" class="p-3" style="height: 33em;margin-bottom: -5em;"></div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 p-3 ui-sortable"> 
                <div id="chartdiv1ab" class="p-3" style="height: 33em;"></div>
              </div>	
            </div>`,am4core.ready(function(){am4core.useTheme(am4themes_animated);var a=am4core.create("chartdiv1a",am4charts.PieChart),e=a.series.push(new am4charts.PieSeries);e.dataFields.value="value",e.dataFields.category="category",a.innerRadius=am4core.percent(30),e.slices.template.stroke=am4core.color("#fff"),e.slices.template.strokeWidth=2,e.slices.template.strokeOpacity=1,e.slices.template.cursorOverStyle=[{property:"cursor",value:"pointer"}],e.alignLabels=!1,e.labels.template.bent=!0,e.labels.template.radius=3,e.labels.template.padding(0,0,0,0),e.ticks.template.disabled=!0,e.slices.template.filters.push(new am4core.DropShadowFilter).opacity=0;e=e.slices.template.states.getKey("hover").filters.push(new am4core.DropShadowFilter);e.opacity=.7,e.blur=5,a.legend=new am4charts.Legend,a.legend.position="bottom",a.fontSize=10,a.data=i}),am4core.ready(function(){am4core.useTheme(am4themes_animated);var a=n,e=am4core.create("chartdiv1ab",am4plugins_venn.VennDiagram),i=e.series.push(new am4plugins_venn.VennSeries);i.dataFields.category="name",i.dataFields.value="value",i.dataFields.intersections="sets",i.data=a,i.labels.template.text="{value}[/]",i.slices.template.propertyFields.fill="color",i.slices.template.tooltipText="{category}[bold] : {value}[/]",e.colors.step=15,e.legend=new am4charts.Legend,e.legend.marginTop=40,e.legend.position="right",e.legend.labels.template.truncate=!1,e.legend.maxWidth=void 0,e.legend.labels.template.text="[{color}]{name}[/]",e.legend=new am4charts.Legend,e.legend.position="bottom",e.fontSize=10});$("#konvergensi_koordinasi").on("click",function(){$(".modal #title").html('<i class="material-icons ms-n2 me-1">list_alt</i>'+$(this).data("title")),$("#popUp").html(" "),$("#popUp").html(`
            <div class="container p-0 ps-2">
              <div class="row pt-1">
                <div class="col fw-600 fs-10px m-0 p-0 pe-2">
                  <div class="d-flex justify-content-between bd-highlight mb-3 border-bottom">
                    <div class=" bd-highlight">                    
                    Pelaksanaan Koordinasi</div>
                    <div class=" bd-highlight fs-10px">Σ RO</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">Ada Kordinasi</div>
                    <div class=" bd-highlight" id="ada_kordinasi">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">Tidak Ada Kordinasi</div>
                    <div class=" bd-highlight" id="tdk_ada_kordinasi">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">N/A</div>
                    <div class=" bd-highlight" id="n_a">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mt-4 mb-3 border-bottom">
                    <div class=" bd-highlight"><i>Stakeholder</i></div>
                    <div class=" bd-highlight">Σ RO</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">Pemda</div>
                    <div class=" bd-highlight" id="kor_pemda">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">K/L Lainnya</div>
                    <div class=" bd-highlight" id="kor_kl">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">Non Pemerintah</div>
                    <div class=" bd-highlight" id="kor_pem">0</div>    
                  </div>
                </div>
              </div>
            </div>
            `);let a=m.pelaksanaanKoordinasi1,e=m.pelaksanaanKoordinasi2;a.forEach(a=>{"Ada Koordinasi"==a.category&&$("#ada_kordinasi").html(a.value),"Tidak Ada Koordinasi"==a.category&&$("#tdk_ada_kordinasi").html(a.value),"N/A"==a.category&&$("#n_a").html(a.value)}),e.forEach(a=>{"Pemda"==a.name&&$("#kor_pemda").html(a.value),"K/L Lain"==a.name&&$("#kor_kl").html(a.value),"Non-Pemerintah"==a.name&&$("#kor_pem").html(a.value)})})})()):$("#top-tiles,#top-tiles2,#top-tiles3,#tile-detail").hide()}Object.values(f.options).forEach(a=>{t.push(a.getAttribute("value"))}),Object.values(v.options).forEach(a=>{s.push(a.getAttribute("value"))}),await d(g,t,s).then(function(a){var e=document.getElementById("kinerjaAnggaranSrc").value;h(a,g,t,s,e),o(a)}),$("#kinerja_pembangunan_form_1").on("click",async function(){n();let e=$("#sel_ta").val(),i=document.getElementById("kinerjaAnggaranSrc").value,t=$("#sel_kl").val(),s=$("#sel_int").val();var l=$(".open_table1").hasClass("opentable")?{expand:!0}:{expand:!1};await d(e,t,s,i).then(function(a){h(a,e,t,s,i),o(a,l)})}),$("#kinerja_pembangunan_form_2").on("click",async function(){n();let e=$("#sel_ta").val(),i=$("#kinerjaAnggaranSrc").val(),t=$("#sel_kl").val(),s=$("#sel_int").val();var l=$(".open_table2").hasClass("opentable")?{expand:!0}:{expand:!1};await r(e,t,s,i).then(function(a){c(a,l),h(a,e,t,s,i)})}),$("#kinerjaAnggaranSrc").keypress(async function(a){let e=a.which,i=$(this).val(),t=$("#sel_ta").val(),s=$("#sel_kl").val(),l=$("#sel_int").val();13==e&&(n(),$("#restoreData").removeClass("hide"),$(this).after(""),$("#kinerja_pembangunan_form_1").data("active")?await d(t,s,l,i).then(function(a){h(a,t,s,l,i),o(a)}):await r(t,s,l,i).then(function(a){h(a,t,s,l,i),c(a)}))}),$("#sel_ta, #sel_kl, #sel_int").on("change",async()=>{n();let e=$("#sel_ta").val(),i=document.getElementById("kinerjaAnggaranSrc").value,t=$("#sel_kl").val(),s=$("#sel_int").val();$("#kinerja_pembangunan_form_1").data("active")?await d(e,t,s,i).then(function(a){h(a,e,t,s,i),o(a)}):await r(e,t,s,i).then(function(a){h(a,e,t,s,i),c(a)})}),$(".open_table1").on("click",async function(){$(this).toggleClass("opentable"),e=$(this).hasClass("opentable")?($(this).find(".material-icons").html("open_in_full"),$(this).find(".material-text").html("Close All"),{expand:!0}):($(this).find(".material-icons").html("close_fullscreen"),$(this).find(".material-text").html("Open All"),{expand:!1});var e,a=$("#sel_ta").val(),i=document.getElementById("kinerjaAnggaranSrc").value;await d(a,$("#sel_kl").val(),$("#sel_int").val(),i).then(function(a){o(a,e)})}),$(".open_table2").on("click",async function(){$(this).toggleClass("opentable"),e=$(this).hasClass("opentable")?($(this).find(".material-icons").html("open_in_full"),$(this).find(".material-text").html("Close All"),{expand:!0}):($(this).find(".material-icons").html("close_fullscreen"),$(this).find(".material-text").html("Open All"),{expand:!1});var e,a=$("#sel_ta").val(),i=document.getElementById("kinerjaAnggaranSrc").value;await r(a,$("#sel_kl").val(),$("#sel_int").val(),i).then(function(a){c(a,e)})}),$("#kinerja_pembangunan_form_1").on("click",function(){$("#default-tab-1").removeClass("hide"),$("#default-tab-2").addClass("hide")}),$("#kinerja_pembangunan_form_2").on("click",function(){$("#default-tab-2").removeClass("hide"),$("#default-tab-1").addClass("hide")}),$("#sel_ta").on("change",async()=>{$("#peta-ro-lokus").addClass("loading");var a=$("#sel_ta").val();"2022-1"===a?($("#ro-lokus-detail").removeClass("hide"),$("#sel_kl").parent().addClass("hide"),$(".sel_ig").parent().addClass("hide"),$("#kinerjaAnggaranSrc").parent().parent().addClass("hide"),await async function(e){e=e.split("-");try{let a=await fetch(config.api_url_v3+"/ka/lokus-ro",{method:"POST",body:JSON.stringify({tahun:e[0],semester:e[1]}),headers:config.fetchHeaders});var i=await a.json();return console.log(i),i.data}catch(a){return!1}}(a).then(function(a){$("#peta-ro-lokus").removeClass("loading"),viewMapKinerjaPembangunan(a)})):($("#ro-lokus-detail").addClass("hide"),$("#sel_kl").parent().removeClass("hide"),$(".sel_ig").parent().removeClass("hide"),$("#kinerjaAnggaranSrc").parent().parent().removeClass("hide"))});const u=[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));u.map(function(a){return new bootstrap.Popover(a)})}};export default KinerjaAnggaran;