import WidgetCard from"../components/WidgetCard.js";import{apiKementerian,apiTahunSemester,apiIntervensi}from"../../services/api.js";const KinerjaAnggaran={render:async()=>{return mData.dataKementerian=void 0===mData.dataKementerian?await apiKementerian():mData.dataKementerian,mData.dataSemester=void 0===mData.dataSemester?await apiTahunSemester():mData.dataSemester,mData.dataIntervensi=void 0===mData.dataIntervensi?await apiIntervensi():mData.dataIntervensi,`
      <div class="app-content-padding flex-grow-1 overflow-auto" data-scrollbar="true" data-height="100%">				
        <!-- BEGIN page-header -->
				<h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">balance</i>Kinerja Anggaran</h2>
				<!-- END page-header -->
        <!-- begin widget-card -->
        <div class="row pt-3  mx-0 py-3 mb-3 bg-gray-300 rounded" id="drp_option">
          <div class="col-xl-2 ">
            <div class="form-group sel_tax">
              <select id="sel_ta" name="sel_ta" class="form-control selectpicker " data-title="Pilih Tahun" data-actions-box="true" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset">
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
              <select id="sel_kl" name="sel_kl" class="form-control selectpicker" data-toggle="dropdown"   data-title="Pilih Kementerian/ Lembaga" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} K/L dipilih">
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
          <div class="col-xl-1 ">
            <div class="form-group pull-right width-full">              
              <div class="menu-icon btn btn-primary m-0 p-0 px-2" data-bs-toggle="modal" data-bs-target="#chartModal" >
                <i class="material-icons fs-29px">bar_chart</i>
              </div>
            </div>
          </div>
        </div>
        <div id="top-tiles" class="row">
          ${await WidgetCard.render("tile-1","","","lg-12 mb-3")}
          ${await WidgetCard.render("tile-2","Rincian Pagu",""," col-12 mb-3")}
          ${await WidgetCard.render("tile-3","Realisasi Anggaran",""," col-12")}    
        </div>
        <div class="card my-3 " id="persenRO"></div>
        <div class="card my-3 hide" id="mapload" style="height: 37em;">
          <div id="belanjaKL" style="height: 37em;"></div>
        </div>
        <div class="card hide" id="container_renjakl">
          <div class="card-body" >
            <div id="elemenOpenClose"></div>
            <div class="mx-n3 mb-n3 hide" id="tableload" ></div>            
          </div>          
        </div>
        <div class="sumber-data-renja pb-2 ps-2 mt-3 fs-12px fw-500 hide">info</div>          
        <div class="card" id="tabelData">
          <div class="card-body">
            <div id="elemenOpenCloseFst"></div>
            <div id="kinerja-table" class="is-bordered is-narrow rounded"></div>
            <div class="sumber-data-annual pt-1 pb-2 ps-2 fs-12px fw-500"></div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal modal-message  fade" id="chartModal" tabindex="-1" aria-labelledby="Chart Kinerja Anggaran" aria-hidden="true">
        <div class="modal-dialog card" style="margin: 2% 2%;width: 96%;border-radius: 11px;">
          <div class="modal-content card-body p-0" id="popUp" style="border-radius: inherit !important;">          
          </div>
        </div>
      </div>
      <!-- End Modal -->
      <!-- Modal -->
      <div class="modal fade" id="tileModal" tabindex="-1"  aria-hidden="true">
        <div class="modal-dialog " >
          <div class="modal-content" style="width: 58em;margin-left: -13em;">  
            <div class="modal-header bg-gray-300">
              <h4 class="modal-title" id="titleInv" ></h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body" id="viewData">
            </div>			
          </div>
        </div>
      </div>
      <!-- End Modal -->
      <div class="row">
        <div class="col-xl-12">
          <div id="before-side-bar">            
          </div>
        </div>
    </div>
    `},after_render:async()=>{$(function(){$("select").selectpicker()}),sumberDataRenja();treeOpenCloseHtml("#elemenOpenClose",{xls_id:"export_xls"}),sumberDataAnnual();let k="exp_xls",n=(treeOpenCloseHtml("#elemenOpenCloseFst",{xls_id:k},!0),document.getElementById("sel_kl")),a=document.getElementById("sel_int"),e=[],t=[],x=(mData.dataKementerian.forEach(a=>{e.push(`<option value="${a.kementerian_kode}" selected="selected">${a.kementerian_nama}</option>`)}),n.innerHTML=e.join(" "),mData.dataIntervensi.forEach(a=>{t.push(`<option  value="${a.intervensi_kode}" selected="selected"> ${a.intervensi_nama}</option>`)}),a.innerHTML=t.join(" "),document.getElementById("sel_ta").value),i=document.getElementById("sel_kl"),r=document.getElementById("sel_int"),y=[],w=[];async function l(e,t,i,l){e=e.split("-");try{let a=await fetch(config.api_url+"/ka/kinerja-anggaran",{method:"POST",body:JSON.stringify({tahun:e[0],semester:e[1],kl:t,intervensi:i,search:l}),headers:config.fetchHeaders});return(await a.json()).data}catch(a){return!1}}async function d(e,t,i){e=e.split("-");try{let a=await fetch(config.api_url+"/ka/chart-1-hap",{method:"POST",body:JSON.stringify({tahun:e[0],semester:e[1],kl:t,intervensi:i}),headers:config.fetchHeaders});return(await a.json()).data}catch(a){return!1}}async function c(){resetOpenClose();var a=$("#sel_ta").val(),e=document.getElementById("kinerjaAnggaranSrc").value,t=$("#sel_kl").val(),i=$("#sel_int").val();closeButton(),await l(a,t,i,e).then(function(a){0===a.detail.length?$("#top-tiles,#persenRO,#tabelData,[data-bs-target='#chartModal']").hide():$("#top-tiles,#persenRO,#tabelData,[data-bs-target='#chartModal']").show(),s(a).then(a=>{var e=new ApexCharts(document.querySelector("#tingkat_output"),a.chat1),t=new ApexCharts(document.querySelector("#analisis_lanjutan"),a.chat2),i=new ApexCharts(document.querySelector("#ra_tingkat_output"),a.chat3),l=new ApexCharts(document.querySelector("#ra_analisis_lanjutan"),a.chat4),a=new ApexCharts(document.querySelector("#chart-capaian-kinerja-anggaran"),a.chat5);e.render(),t.render(),i.render(),l.render(),a.render()}).catch(a=>{console.log(a)})}),p(a,t,0,e),await d(a,t,i).then(function(a){kinerjaAnggaranChart(a)})}async function s(a,e={expand:!1},t){const c=document.getElementById("tile-1"),p=document.getElementById("tile-2"),m=document.getElementById("tile-3");console.log(a);var i=a.tile.capaian_ro.capaianOutputByCapaianOutput.r1+a.tile.capaian_ro.capaianOutputByCapaianOutput.r2+a.tile.capaian_ro.capaianOutputByCapaianOutput.r3+a.tile.capaian_ro.capaianOutputByCapaianOutput.r4+a.tile.capaian_ro.capaianOutputByCapaianOutput.r5,i=`
          <div class="card-body">
            <h5 class="card-title fs-13px text-black text-uppercase">Capaian Kinerja Anggaran</h5>
            <div class="row">
              <div class="col mx-2 border rounded px-0 pb-1">              
                <div class="text-center fw-bold bg-blue py-1 text-white d-block w-100 fs-20px rounded-top"> &gt;90 %</div>                
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output" data-catpersen="91">                        
                      <span class="h4 text-green" >
                        ${a.tile.capaian_ro.capaianOutputByCapaianOutput.r1} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat((a.tile.capaian_ro.capaianOutputByCapaianOutput.r1/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>                        
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1 ">
                    <div class="my-1 mx-2  tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran" data-catpersen="91">                       
                      <span class="h4 text-blue" >
                        ${a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r1} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                      ${parseFloat((a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r1/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>                        
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>
              <div class="col mx-2 border rounded px-0 pb-1">
                <span class="text-center fw-bold py-1 text-white d-block w-100 fs-20px bg-orange-500 text-black rounded-top">71% - 90%</span>
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output" data-catpersen="71">
                      <span class="h4 text-green" >
                        ${a.tile.capaian_ro.capaianOutputByCapaianOutput.r2} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat((a.tile.capaian_ro.capaianOutputByCapaianOutput.r2/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran" data-catpersen="71">
                      <span class="h4 text-blue" >
                        ${a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r2} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                       ${parseFloat((a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r2/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>
              <div class="col mx-2 border rounded px-0 pb-1">
                <span class="text-center fw-bold bg-blue py-1  d-block w-100 fs-20px  bg-gray text-white">51% - 70%</span>
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output" data-catpersen="51">
                      <span class="h4 text-green" >
                        ${a.tile.capaian_ro.capaianOutputByCapaianOutput.r3} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat((a.tile.capaian_ro.capaianOutputByCapaianOutput.r3/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran" data-catpersen="51">
                      <span class="h4 text-blue" >
                        ${a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r3} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                       ${parseFloat((a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r3/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>
              <div class="col mx-2 border rounded px-0 pb-1">
                <span class="text-center fw-bold bg-blue py-1  d-block w-100 fs-20px bg-yellow text-black rounded-top">31% - 50%</span>
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output"  data-catpersen="31">
                      <span class="h4 text-green" >
                        ${a.tile.capaian_ro.capaianOutputByCapaianOutput.r4} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat((a.tile.capaian_ro.capaianOutputByCapaianOutput.r4/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2  tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran" data-catpersen="31">
                      <span class="h4 text-blue" >
                        ${a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r4} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                       ${parseFloat((a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r4/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>
              <div class="col mx-2 border rounded px-0 pb-1">
                <span class="text-center fw-bold py-1  d-block w-100 fs-20px  bg-green text-black rounded-top">0% - 30%</span>
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output"  data-catpersen="0">
                      <span class="h4 text-green" >
                        ${a.tile.capaian_ro.capaianOutputByCapaianOutput.r5} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat((a.tile.capaian_ro.capaianOutputByCapaianOutput.r5/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2  tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran"  data-catpersen="0">
                      <span class="h4 text-blue" >
                        ${a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r5} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                       ${parseFloat((a.tile.capaian_ro.capaianRoByKinerjaAnggaran.r5/i*100).toFixed(2)).toLocaleString("id-ID")}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>              
            </div>
            <div class="row mt-3">
              <div class="col mx-2 border rounded px-0 pb-1">
                <div id="chart-capaian-kinerja-anggaran" class="mx-3">                
                <div>
              </div>
            </div>
          </div>
      `;document.getElementById("persenRO").innerHTML=i,c.innerHTML=`
        <div class="d-flex justify-content-between bd-highlight">
          <div class=" bd-highlight">
            <div class="fs-15px py-2 text-gray-700">Kementerian/Lembaga</div>            
            <div class="d-flex flex-column">
              <div class="mb-0 fs-11px">
                <span class="fs-45px fw-600  text-green">${a.tile.perkembangan_tagging_dan_pagu.c_kl}</span>
              </div>
              <div class="fs-13px text-gray-600 text-start">K/L Pelaksana</div>
            </div>
          </div>          
          <div class=" bd-highlight">        
            <div class="fs-15px py-2 text-gray-700">Rincian Output dan Intervensi</div>
            <div class="d-flex justify-content-between bd-highlight "> 
              <div class="p-0 bd-highlight">
                <div class="d-flex flex-column">
                  <div class="mb-0 px-0">
                    <span class="fs-45px fw-600 text-blue">${a.tile.perkembangan_tagging_dan_pagu.tot_ro}</span>
                  </div>
                  <div class="fs-13px text-gray-600 text-start">Rincian Output</div>
                </div>
              </div>              
              <div class="p-0 bd-highlight mt-2">              
                <table class="table table-responsive table-borderless table-sm ms-1 mb-0 fs-12px text-center text-gray-600">
                  <tbody>
                  <tr class="h5 align-middle">
                    <td class="align-middle spes"><span class="btn btn-primary tileTop fs-21px" data-bs-toggle="modal" data-bs-target="#tileModal" data-intervensi="spesifik">${a.tile.perkembangan_tagging_dan_pagu.spesifik_ro}</span></td>
                    <td class="align-middle sens"><span class="btn btn-primary tileTop fs-21px" data-bs-toggle="modal" data-bs-target="#tileModal" data-intervensi="sensitif">${a.tile.perkembangan_tagging_dan_pagu.sesnsitif_ro}</span></td>
                    <td class="align-middle duk"><span class="btn btn-primary tileTop fs-21px" data-bs-toggle="modal" data-bs-target="#tileModal" data-intervensi="dukungan">${a.tile.perkembangan_tagging_dan_pagu.pendamping_ro}</span></td>
                  </tr>
                  <tr class="font-fw-bold fs-14px">
                    <td class="spes fs-13px text-gray-600 text-center">Spesifik</td>
                    <td class="sens fs-13px text-gray-600 text-center">Sensitif</td>
                    <td class="duk fs-13px text-gray-600 text-center">Dukungan</td>
                  </tr>
                  </tbody>
                </table>
              </div>        
            </div>
          </div>
          <div class=" bd-highlight">            
            <div class="fs-14px pt-2 text-gray-700 ps-3">Total Pagu</div>
            <div class=" d-flex justify-content-between">
              <div class="bd-highlight mx-3">            
                <div class="mb-0 fs-11px">            
                  <span class="fs-20px fw-600 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(a.tile.perkembangan_tagging_dan_pagu.pagu_dokumen_ringkasan.toFixed(0)).toLocaleString("id-ID")}.00" title="Dokumen Ringkasan">
                    ${parseFloat((a.tile.perkembangan_tagging_dan_pagu.pagu_dokumen_ringkasan/1e6).toFixed(2)).toLocaleString("id-ID")}T
                  </span>
                </div>    
                <div class="fs-11px text-gray-600 text-start">Dokumen Ringkasan</div>            
              </div>    
              <div class="bd-highlight justify-content-center mx-3">
                <div class="mb-0  fs-11px">
                  <span class="fs-20px fw-600 text-blue" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(a.tile.perkembangan_tagging_dan_pagu.pagu_awal_dipa.toFixed(0)).toLocaleString("id-ID")}.00" title="Pagu Awal">
                    ${parseFloat((a.tile.perkembangan_tagging_dan_pagu.pagu_awal_dipa/1e6).toFixed(2)).toLocaleString("id-ID")}T
                  </span>
                </div>
                <div class="fs-11px text-gray-600 text-start">Pagu Awal</div>            
              </div>
              <div class="bd-highlight mx-3">
                <div class="mb-0  fs-11px ">
                  <span class="fs-20px fw-600 text-yellow zoom" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(a.tile.perkembangan_tagging_dan_pagu.pagu_harian_dipa.toFixed(0)).toLocaleString("id-ID")}.00" title="Pagu Harian">
                    ${parseFloat((a.tile.perkembangan_tagging_dan_pagu.pagu_harian_dipa/1e6).toFixed(2)).toLocaleString("id-ID")}T
                  </span>
                </div>
                <div class="fs-11px text-gray-600 text-start">Pagu Harian</div>            
              </div>              
            </div>
            <div class="fs-14px pt-2 text-gray-700 ps-3">Analisis Lanjutan</div>
            <div class=" d-flex justify-content-between">
              <div class="bd-highlight mx-3">
                <div class="mb-0 fs-11px">
                  <span class="fs-20px fw-600 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_dokumen_ringkasan+a.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_dokumen_ringkasan+a.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_dokumen_ringkasan).toFixed(0)).toLocaleString("id-ID")}.00" title="Dokumen Ringkasan">
                    ${parseFloat(((a.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_dokumen_ringkasan+a.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_dokumen_ringkasan+a.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_dokumen_ringkasan)/1e6).toFixed(2)).toLocaleString("id-ID")}T
                  </span>
                </div>    
                <div class="fs-11px text-gray-600 text-start">Dokumen Ringkasan</div>            
              </div>    
              <div class="bd-highlight justify-content-center mx-3">
                <div class="mb-0  fs-11px">
                  <span class="fs-20px fw-600 text-blue" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa+a.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa+a.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_awal_dipa).toFixed(0)).toLocaleString("id-ID")}.00" title="Pagu Awal">
                    ${parseFloat(((a.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa+a.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa+a.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_awal_dipa)/1e6).toFixed(2)).toLocaleString("id-ID")}T
                  </span>
                </div>
                <div class="fs-11px text-gray-600 text-start">Pagu Awal</div>            
              </div>
              <div class="bd-highlight mx-3">
                <div class="mb-0  fs-11px ">
                  <span class="fs-20px fw-600 text-yellow zoom" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa+a.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa+a.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa).toFixed(0)).toLocaleString("id-ID")}.00" title="Pagu Harian">
                    ${parseFloat(((a.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa+a.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa+a.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa)/1e6).toFixed(2)).toLocaleString("id-ID")}T
                  </span>
                </div>
                <div class="fs-11px text-gray-600 text-start">Pagu Harian</div>
              </div>
            </div>
          </div>
        </div>
        `,p.innerHTML=`
        <div class="container p-0 mb-0">
          <div class="row align-items-start fs-14px pt-2 pb-0">
            <div class="col-6 p-0 m-0">
              <div id="tingkat_output" style="width:100%;height:50px"></div>
            </div>
            <div class="col-6 p-0 m-0    border-start">
              <div id="analisis_lanjutan" style="width:100%;"></div>
            </div>
          </div>
        </div>      
      `,m.innerHTML=`
      <div class="container p-0 mb-0">
        <div class="row align-items-start fs-14px pt-2 pb-0">
          <div class="col-6 p-0 m-0">
            <div id="ra_tingkat_output" style="width:100%;height:150px"></div>
          </div>
          <div class="col-6 p-0 m-0">
            <div class="border-start" id="ra_analisis_lanjutan" style="width:100%;"></div>
          </div>
        </div>
      </div>      
    `;const l=new Tabulator("#kinerja-table",{height:"515px",data:a.detail,index:"id",layout:"fitDataStretch",columnHeaderVertAlign:"middle",dataTree:!0,dataTreeStartExpanded:e.expand,dataTreeFilter:!0,dataTreeElementColumn:"name",dataTreeChildColumnCalcs:!1,dataTreeSelectPropagate:!0,dataLoader:!1,movableColumns:!0,columns:[{title:"No",titleDownload:"No",field:"id",visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"K/L, Program, Kegiatan, KRO, <br> RO",titleDownload:"K/L, Program, Kegiatan, KRO,RO",headerMenuIcon:"<i class='fas fa-lg fa-fw fa-grip-vertical text-primary-700' title='Menu Header'></i>",headerMenu:headerMenu,field:"name",sorter:"string",width:400,responsive:0,frozen:!0,formatter:function(a,e){a.getValue();let t;return void 0!==a._cell.row.data.ro_id?t='<div class="badge '+c_main+'"><span class="'+c_kl+'  badge-left  p-1" >'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' p-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' p-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' p-1">'+a._cell.row.data.kro_id+'</span><span class="'+color_ro+'  badge-right p-1">'+a._cell.row.data.ro_id+"</span></div>":void 0!==a._cell.row.data.kro_id?t='<div class="badge '+c_main+'" ><span class="  badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' p-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' p-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+'  badge-right p-1">'+a._cell.row.data.kro_id+"</span></div>":void 0!==a._cell.row.data.kegiatan_id?t='<div class="badge  '+c_main+'"><span class=" badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' p-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' p-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' badge-right  p-1">'+a._cell.row.data.kegiatan_id+"</span></div>":void 0!==a._cell.row.data.program_id?t='<div class="badge '+c_main+'"><span class=" badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' p-1">'+a._cell.row.data.intervensi_id+'</span><span class="'+c_prog+' badge-right  p-1">'+a._cell.row.data.program_id+"</span></div>":void 0!==a._cell.row.data.intervensi_id?t='<div class="badge '+c_main+'"><span class=" badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_inv+' badge-right  p-1">'+a._cell.row.data.intervensi_id+"</span></div>":void 0!==a._cell.row.data.kl_id&&(t='<div class="badge '+c_main+'" ><span class="'+c_kl+'  badge-main p-1">'+a._cell.row.data.kl_id+"</span></div>"),'<span style="padding-right: 2em;"> '+t+" "+a._cell.row.data.name+"</span >"}},{title:"PROG",titleDownload:"Program",field:"jml_pro",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==t||"program"==t||void 0===t,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",mutator:function(a,e,t,i,l){var n=void 0===e._children?0:e._children.length;return void 0!==e.kl_id&&void 0===e.program_id?n:""},formatter:function(a,e){var t=a.getValue();return""===t&&(a.getElement().style.backgroundColor="#E5E8E8"),t}},{title:"&#931; KEG",field:"jml_keg",titleDownload:"Kegiatan",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==t||"kegiatan"==t||void 0===t,formatter:function(a,e){var t=a.getValue();return""===t&&(a.getElement().style.backgroundColor="#E5E8E8"),t},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},mutator:function(a,e,t,i,l){var n=0;return void 0!==e.kl_id&&void 0===e.program_id&&void 0!==e._children?(e._children.forEach(function(a){n+=void 0===a._children?0:a._children.length}),n):void 0!==e.program_id&&void 0===e.kegiatan_id?void 0===e._children?0:e._children.length:""}},{title:"&#931; KRO",field:"jml_kro",titleDownload:"KRO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==t||"kro"==t||void 0===t,formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0}},{title:"&#931; RO",field:"jml_ro",titleDownload:"RO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==t||"ro"==t||void 0===t,formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0}},{title:"Tingkat Output",titleDownload:"Tingkat Output",headerHozAlign:"center",cssClass:"has-background-warning-light",columns:[{title:"Kinerja Anggaran",headerHozAlign:"center",columns:[{title:"Pagu<br>(Dok. Ringkasan)",titleDownload:"Pagu (Dok. Ringkasan)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"alokasi_0",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2,dataTreeChildColumnCalcs:!0},sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Pagu Awal<br>DIPA",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"alokasi_1",titleDownload:"Pagu Awal DIPA",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Pagu Harian <br>DIPA",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"alokasi_2",titleDownload:"Pagu Harian DIPA",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Realisasi",titleDownload:"Pagu Harian DIPA",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"alokasi_realisasi",accessorDownload:numberIDRDownload,formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Realisasi Anggaran <br><small>(%)</small>",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"prsn_realisasi",titleDownload:"Realisasi Anggaran (%)",accessorDownload:persenDownload,width:150,hozAlign:"center",formatter:function(a,e){a=checkValue(a.getValue(),0);return vpersen(a)}}]},{title:"Kinerja Output",titleDownload:"Kinerja Output",headerHozAlign:"center",columns:[{title:"Target Volume dalam <br> Dokumen Ringkasan",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"volume_0",titleDownload:"Target Volume dalam  Dokumen Ringkasan",hozAlign:"right",formatter:"money",formatterParams:{precision:!1},width:150},{title:"Target Pagu Awal",titleDownload:"Target Pagu Awal",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"volume_1",hozAlign:"right",formatter:function(a,e){var t=a._cell.row.data.volume_1,i=a._cell.row.data.volume_2,l=a._cell.row.data.volume_realisasi;return 0==t&&0==i&&0==l?"":(t=checkValue(a.getValue(),0),i=a._cell.row.data.volume_0,upDown(t,i))},formatterParams:{precision:!1},width:150},{title:"Target<br>Harian<br>DIPA",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"volume_2",titleDownload:"Target Harian DIPA",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right"},{title:"Capaian<br>Volume",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"volume_realisasi",titleDownload:"Capaian Volume",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right"},{title:"Satuan",titleDownload:"Satuan",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"satuan",width:150,hozAlign:"center"},{title:"Capaian<br>Output<br><small>(%)</small>",titleDownload:"Capaian Output (%)",accessorDownload:persenDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"prsen_output",width:150,hozAlign:"center",formatter:function(a,e){a=checkValue(a.getValue(),0);return vpersen(a)}}]}]},{title:"Tingkat Analisis Lanjutan",titleDownload:"Tingkat Analisis Lanjutan",headerHozAlign:"center",cssClass:"has-background-info-light",columns:[{title:"Kinerja Anggaran",headerHozAlign:"center",columns:[{title:"Pagu<br>(Dok. Ringkasan)",titleDownload:"Pagu (Dok. Ringkasan)",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"alokasi_0",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2,dataTreeChildColumnCalcs:!0},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Pagu Awal<br>DIPA",titleDownload:"Pagu Awal DIPA",accessorDownload:numberIDRDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"anl_alokasi_1",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Pagu Harian <br>DIPA",titleDownload:"Pagu Harian DIPA",accessorDownload:numberIDRDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"anl_alokasi_2",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Rencana<br>Penarikan<br>Dana",titleDownload:"Rencana Penarikan Dana",accessorDownload:numberIDRDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"anl_alokasi_rpd",formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Realisasi",titleDownload:"Realisasi",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"anl_alokasi_realisasi",accessorDownload:numberIDRDownload,formatter:"money",formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Realisasi Anggaran <br><small>(%)</small>",titleDownload:"Realisasi Anggaran (%)",accessorDownload:persenDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"prsn_anl_realisasi",width:150,hozAlign:"center",formatter:function(a,e){a=checkValue(a.getValue(),0);return vpersen(a)}},{title:"Realisasi thd RPD<br><small>(%)</small>",titleDownload:"Realisasi thd RPD (%)",accessorDownload:persenDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"prsn_anl_realisasi_rpd",width:150,hozAlign:"center",formatter:function(a,e){a=checkValue(a.getValue(),0);return vpersen(a)}}]},{title:"Kinerja Output",titleDownload:"Kinerja Output",columns:[{title:"Target Volume dalam <br/> Dokumen Ringkasan",titleDownload:"Target Volume dalam Dokumen Ringkasan",accessorDownload:numberIDRDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"anl_volume_0",hozAlign:"right",formatter:"money",formatterParams:{precision:!1},width:150},{title:"Target Pagu Awal",titleDownload:"Target Pagu Awal",accessorDownload:numberIDRDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"anl_volume_1",hozAlign:"right",formatter:function(a,e){var t=a._cell.row.data.anl_volume_1,i=a._cell.row.data.anl_volume_2,l=a._cell.row.data.anl_volume_realisasi;return 0==t&&0==i&&0==l?void 0!==a._cell.row.data.ro_id?0:"":(t=checkValue(a.getValue(),0),i=a._cell.row.data.anl_volume_0,upDown(t,i))},formatterParams:{precision:!1},width:150},{title:"Target Pagu Harian",titleDownload:"Target Pagu Harian",accessorDownload:numberIDRDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"anl_volume_2",hozAlign:"right",formatter:function(a,e){var t=a._cell.row.data.anl_volume_1,i=a._cell.row.data.anl_volume_2,l=a._cell.row.data.anl_volume_realisasi;return 0==t&&0==i&&0==l?void 0!==a._cell.row.data.ro_id?0:"":(t=checkValue(a.getValue(),0),i=a._cell.row.data.anl_volume_1,upDown(t,i))},formatterParams:{precision:!1},width:150},{title:"Capaian Volume",titleDownload:"Capaian Volume",accessorDownload:numberIDRDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"anl_volume_realisasi",hozAlign:"right",formatter:"money",formatterParams:{precision:!1},width:150},{title:"Satuan",titleDownload:"Satuan",accessorDownload:numberIDRDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"satuan2",width:150,hozAlign:"center"},{title:"Capaian Output<br><small>(%)</small>",titleDownload:"Capaian Output (%)",accessorDownload:persenDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"prsn_anl_output",hozAlign:"center",formatter:function(a,e){a=checkValue(a.getValue(),0);return vpersen(a)}}]},{title:"Kinerja<br>Umum<br><small>(%)</small>",titleDownload:"Kinerja Umum (%)",accessorDownload:persenDownload,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"kinerja_umum",hozAlign:"center",formatter:function(a,e){a=checkValue(a.getValue(),0);return vpersen(a)}}]},{title:"Satuan",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"satuan",titleDownload:"Satuan",sorter:"string",hozAlign:"right",headerHozAlign:"center"},{title:"Lokasi",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,field:"lokasi",titleDownload:"Lokasi",sorter:"string",hozAlign:"right",headerHozAlign:"center"}],initialSort:[{column:"id",dir:"asc"}]});function n(a,e,t,i,l=370){return{series:i,chart:{height:l,type:"line"},stroke:{width:[0,0,0,0],dashArray:[0,0,0,0]},title:{text:a,align:"center",style:{fontSize:"14px",fontWeight:"400"}},xaxis:{categories:t},yaxis:[{title:{text:"Triliun",style:{fontSize:"9px",fontWeight:300}},decimalsInFloat:2,tickAmount:5,labels:{formatter:function(a){return a.toFixed(0)}},seriesName:"Dok Ringkasan"},{seriesName:"Pagu Awal",show:!1},{seriesName:"Pagu Harian",show:!1}],tooltip:{y:{formatter:function(a,{}){return"Rp "+a+" Triliun"}}}}}function s(a,e,t,i,l=370){return{series:i,chart:{height:l,type:"line"},title:{text:a,align:"center",style:{fontSize:"14px",fontWeight:"400"}},markers:{size:5,colors:void 0,strokeColors:"#fff",strokeWidth:2,strokeOpacity:.9,strokeDashArray:0,fillOpacity:1,discrete:[],shape:"circle",radius:2,offsetX:0,offsetY:0,onClick:void 0,onDblClick:void 0,showNullDataPoints:!0,hover:{size:8,sizeOffset:3}},stroke:{width:[0,0,0,4,4],dashArray:[0,0,0,4,4]},xaxis:{categories:t},yaxis:[{seriesName:"Realisasi",position:"left",title:{text:"Triliun",style:{fontSize:"9px",fontWeight:300}},decimalsInFloat:0,min:0,max:100,tickAmount:5,opposite:!1,showAlways:!0,axisTicks:{show:!1}},{seriesName:"Pagu Harian",show:!1},{seriesName:"Pagu Harian",show:!1},{seriesName:"Pagu Harian",show:!1},{title:{text:"Persen (%)",style:{fontSize:"9px",fontWeight:300}},decimalsInFloat:2,tickAmount:5,labels:{formatter:function(a){return a.toFixed(0).toLocaleString("id-ID")+" %"}},opposite:!0,seriesName:"Pagu Awal",show:!0}],tooltip:{y:{formatter:function(a,{seriesIndex:e}){return 3==e||4==e?a.toFixed(2).toLocaleString("id-ID")+" %":"Rp "+a+" Triliun"}}}}}document.getElementById(k).addEventListener("click",function(){l.download("xlsx","kinerja_anggaran.xlsx",{sheetName:"data"})});let o=[],r=[],d=[],u=[],g=[];a.detail.forEach(a=>{o.push(a.name_short),r.push(a.alokasi_realisasi/1e3),d.push(a.alokasi_2/1e3),g.push(a.prsn_realisasi),u.push(a.prsen_output)});var i=[{name:"Dok Ringkasan",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_level_output_pagu_dokumen_ringkasan/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_level_output_pagu_dokumen_ringkasan/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_level_output_pagu_dokumen_ringkasan/1e6).toFixed(2))]},{name:"Pagu Awal",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_level_output_pagu_awal_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_level_output_pagu_awal_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_level_output_pagu_awal_dipa/1e6).toFixed(2))]},{name:"Pagu Harian",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_level_output_harian_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_level_output_harian_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_level_output_harian_dipa/1e6).toFixed(2))]}],e=[{name:"Dok Ringkasan",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_dokumen_ringkasan/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_dokumen_ringkasan/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_dokumen_ringkasan/1e6).toFixed(2))]},{name:"Pagu Awal",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_awal_dipa/1e6).toFixed(2))]},{name:"Pagu Harian",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa/1e6).toFixed(2))]}],t=["Spesifik","Sensitif","Dukungan"],h=["Spesifik","Sensitif","Dukungan"],f=o,b=[{name:"Realisasi",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_level_output_realisasi/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_level_output_realisasi/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_level_output_realisasi/1e6).toFixed(2))]},{name:"Pagu Awal",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_level_output_pagu_awal_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_level_output_pagu_awal_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_level_output_pagu_awal_dipa/1e6).toFixed(2))]},{name:"Pagu Harian",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_level_output_harian_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_level_output_harian_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_level_output_harian_dipa/1e6).toFixed(2))]},{name:"%Pagu Awal",type:"line",data:[parseFloat((100*a.tile.data_intervensi.spesifik_p_realisasi_terhadap_pagu_awal).toFixed(2)),parseFloat((100*a.tile.data_intervensi.sensitif_p_realisasi_terhadap_pagu_awal).toFixed(2)),parseFloat((100*a.tile.data_intervensi.pendamping_p_realisasi_terhadap_pagu_awal).toFixed(2))]},{name:"%Pagu Harian",type:"line",data:[parseFloat((100*a.tile.data_intervensi.spesifik_p_realisasi_terhadap_pagu_harian).toFixed(2)),parseFloat((100*a.tile.data_intervensi.sensitif_p_realisasi_terhadap_pagu_harian).toFixed(2)),parseFloat((100*a.tile.data_intervensi.pendamping_p_realisasi_terhadap_pagu_harian).toFixed(2))]}],v=[{name:"Realisasi",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_ralisasi/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_analisis_lanjutan_ralisasi/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_analisis_lanjutan_ralisasi/1e6).toFixed(2))]},{name:"Pagu Awal",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_awal_dipa/1e6).toFixed(2))]},{name:"Pagu Harian",type:"column",data:[parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa/1e6).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa/1e6).toFixed(2))]},{name:"%Pagu Awal",type:"line",data:[parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_ralisasi/a.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa*100).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_analisis_lanjutan_ralisasi/a.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa*100).toFixed(2)),parseFloat((a.tile.data_intervensi.pendamping_analisis_lanjutan_ralisasi/a.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa*100).toFixed(2))]},{name:"%Pagu Harian",type:"line",data:[parseFloat((a.tile.data_intervensi.spesifik_analisis_lanjutan_ralisasi/a.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa*100).toFixed(2)),parseFloat((a.tile.data_intervensi.sensitif_analisis_lanjutan_ralisasi/a.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa*100).toFixed(2)),parseFloat((100*a.tile.data_intervensi.pendamping_p_realisasi_terhadap_pagu_harian).toFixed(2))]}],_=[{name:"Alokasi Anggaran",type:"column",data:d},{name:"Realisasi Anggaran",type:"column",data:r},{name:"Capaian Output",type:"line",data:u},{name:"Kinerja Anggaran",type:"line",data:g}];return $(".tileTop").on("click",async function(){$("#viewData").html(" ");let a=$(this).data("intervensi"),t,i;t="sensitif"==a?["B"]:"spesifik"==a?["A"]:["C"],$("#titleInv").html($(this).html()+" RO "+$(this).data("intervensi").charAt(0).toUpperCase()+$(this).data("intervensi").slice(1));try{let a=x.split("-"),e=await fetch(config.api_url+"/ka/ro-intervensi",{method:"POST",body:JSON.stringify({tahun:a[0],semester:a[1],kl:y,intervensi:t,search:$("#kinerjaAnggaranSrc").val()}),headers:config.fetchHeaders});i=await e.json()}catch(a){return!1}let l=[];i.data.detail.forEach((a,e)=>{let t=[];a._children.forEach((a,e)=>{t.push(`
              <li class="ms-4 d-flex bd-highlight fs-14px">
                <div class="p-1 bd-highlight">${e+1}. </div>
                <div class="p-1 bd-highlight">${a.suboutput_nama}.</div>
                <!-- <div class="p-1 bd-highlight ms-auto">${a.kl_id+a.intervensi_id+a.program_kode+a.kegiatan_kode+a.output_kode+a.suboutput_kode} </div> -->
              </li>
            `)}),l.push(`
            <ul class="list-unstyled">
              <li class="ms-4">
                <div class="d-flex bd-highlight h6 mb-0">
                  <div class="p-1 bd-highlight">${e+1}. </div>
                  <div class="p-1 bd-highlight">${a.name}.</div>
                </div>
                <ul class="list-unstyled">${t.join(" ")}</ul>
              </li>
            </ul>
            `)}),$("#viewData").html(l)}),$(".tileBottom").on("click",async function(){$("#viewData").html(" ");let a=$(this).data("title"),t=$(this).data("catpersen"),i,l=[];if("capaian output"==a.toLowerCase())try{let a=x.split("-"),e=await fetch(config.api_url+"/ka/ro-capaian",{method:"POST",body:JSON.stringify({tahun:a[0],semester:a[1],kl:y,intervensi:w,search:$("#kinerjaAnggaranSrc").val(),parameter:t}),headers:config.fetchHeaders});(i=await e.json()).data.detail.forEach((a,e)=>{let t=[];a._children.sort((a,e)=>e.prsn_anl_output-a.prsn_anl_output),a._children.forEach((a,e)=>{t.push(`
                  <li class="ms-4 d-flex bd-highlight fs-14px">
                    <div class="p-1 bd-highlight">${e+1}. </div>
                    <div class="p-1 bd-highlight">${a.suboutput_nama}.</div>
                    <div class="p-1 bd-highlight ms-auto">${1<=a.prsn_anl_output?100:(100*a.prsn_anl_output).toFixed(2)}%</div>
                    <!-- <div class="p-1 bd-highlight ms-auto">${a.kl_id+a.intervensi_id+a.program_kode+a.kegiatan_kode+a.output_kode+a.suboutput_kode} </div> -->
                  </li>
                `)}),l.push(`
                <ul class="list-unstyled">
                  <li class="ms-4">
                    <div class="d-flex bd-highlight h6 mb-0">
                      <div class="p-1 bd-highlight">${e+1}. </div>
                      <div class="p-1 bd-highlight">${a.name}.</div>
                    </div>
                    <ul class="list-unstyled">${t.join(" ")}</ul>
                  </li>
                </ul>
              `)})}catch(a){return!1}if("kinerja anggaran"==a.toLowerCase())try{let a=x.split("-"),e=await fetch(config.api_url+"/ka/ro-anggaran",{method:"POST",body:JSON.stringify({tahun:a[0],semester:a[1],kl:y,intervensi:w,search:$("#kinerjaAnggaranSrc").val(),parameter:t}),headers:config.fetchHeaders});(i=await e.json()).data.detail.forEach((a,e)=>{let t=[];a._children.sort((a,e)=>e.prsn_anl_realisasi-a.prsn_anl_realisasi),a._children.forEach((a,e)=>{t.push(`
                  <li class="ms-4 d-flex bd-highlight fs-14px">
                    <div class="p-1 bd-highlight">${e+1}. </div>
                    <div class="p-1 bd-highlight">${a.suboutput_nama}.</div>
                    <div class="p-1 bd-highlight ms-auto">
                    ${1<=a.prsn_anl_realisasi?100:(100*a.prsn_anl_realisasi).toFixed(2)}%
                    </div>
                    <!-- <div class="p-1 bd-highlight ms-auto">${a.kl_id+a.intervensi_id+a.program_kode+a.kegiatan_kode+a.output_kode+a.suboutput_kode} </div> -->
                  </li>
                `)}),l.push(`
                <ul class="list-unstyled">
                  <li class="ms-4">
                    <div class="d-flex bd-highlight h6 mb-0">
                      <div class="p-1 bd-highlight">${e+1}. </div>
                      <div class="p-1 bd-highlight">${a.name}.</div>
                    </div>
                    <ul class="list-unstyled">${t.join(" ")}</ul>
                  </li>
                </ul>
              `)})}catch(a){return!1}$("#titleInv").html(a+"<br/><div class='h6 py-1 fw-500'>"+$(this).find(".h4").html().trim()+"   ("+$(this).find(".h5").html()+" dari total RO)</div>"),$("#viewData").html(l)}),{data:l,chat1:n("Tingkat Ouput",0,t,i,270),chat2:n("Analisis Lanjutan",0,t,e,270),chat3:s("Tingkat Ouput",0,h,b,270),chat4:s("Analisis Lanjutan",0,h,v,270),chat5:{series:_,chart:{height:410,type:"line"},title:{text:" ",align:"center",style:{fontSize:"14px",fontWeight:"400"}},markers:{size:5,colors:void 0,strokeColors:"#fff",strokeWidth:2,strokeOpacity:.9,strokeDashArray:0,fillOpacity:1,discrete:[],shape:"circle",radius:2,offsetX:0,offsetY:0,onClick:void 0,onDblClick:void 0,showNullDataPoints:!0,hover:{size:8,sizeOffset:3}},stroke:{width:[0,0,4,4],dashArray:[0,0,4,4]},xaxis:{categories:f},yaxis:[{seriesName:"Alokasi Anggaran",position:"left",title:{text:"Milyar",style:{fontSize:"9px",fontWeight:300}},decimalsInFloat:0,tickAmount:5,min:10,opposite:!1,showAlways:!0,axisTicks:{show:!1},labels:{show:!0,align:"right",minWidth:0,maxWidth:160,offsetX:0,offsetY:0,rotate:0,formatter:function(a){return a.toLocaleString("id-ID",{minimumFractionDigits:0,maximumFractionDigits:0})}}},{seriesName:"Realisasi Anggaran",show:!1},{seriesName:"Capaian Output",show:!1},{title:{text:"Persen (%)",style:{fontSize:"9px",fontWeight:300}},decimalsInFloat:2,tickAmount:5,labels:{formatter:function(a){return(100*a).toLocaleString("id-ID",{minimumFractionDigits:0,maximumFractionDigits:0})+" %"}},opposite:!0,seriesName:"Kinerja Anggaran",show:!0}],tooltip:{y:{formatter:function(a,{seriesIndex:e}){return 2==e||3==e?1===a||0===a?100*a+"%":(100*a).toLocaleString("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2})+"%":"Rp "+a.toLocaleString("id-ID",{minimumFractionDigits:2,maximumFractionDigits:2})+" Milyar"}}}},result:a.detail}}async function p(a,e,t,i){var l=a.split("-");["2022","2023"].includes(l[0])?($("#mapload,#tableload,.sumber-data-renja,#container_renjakl").removeClass("hide"),$("#mapload,#tableload").addClass("loading"),await async function(e,t,i){e=e.split("-");try{let a=await fetch(config.api_url+"/renja/kabupaten",{method:"POST",body:JSON.stringify({tahun:[e[0]],kl:t,search:i}),headers:config.fetchHeaders});return(await a.json()).data}catch(a){return!1}}(a,e,i).then(function(t){mData.belanjaKL=t;{var i=mData.belanjaKL,l=(t="belanjaKL",new L.Popup({autoPan:!1}),"#mapload"),n=t,s=(void 0===document.querySelector(l)||null==document.querySelector(l)||(document.querySelector(l).innerHTML='<div id="'+n+'" style="height: 37em;""></div>'),document.querySelector("#before-side-bar").innerHTML=`
            <div id="leaflet-sidebar" class="leaflet-sidebar collapsed">
              <div id="title-tab"></div>
              <!-- Nav tabs -->
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link nav-popup active" onclick="tabElemn(this);" data-active="true" data-tab="1">
                    <i class='fa fa-table text-primary me-2'></i>Detail Indikator
                  </a>
                </li>
                <li class="nav-item hide">
                  <a class="nav-link nav-popup" onclick="tabElemn(this);" data-active="false" data-tab="2">
                    <i class='fa fa-chart-bar text-primary me-2'></i>Grafik
                  </a>
                </li>
              </ul>
              <!-- Tab panes -->
              <div class="tab-content mx-2">
                <div class="d-flex justify-content-between bd-highlight">
                  <div class="d-flex justify-content-between pt-3 pb-2 ms-2 bd-highlight open_table">
                    <div class="fs-12px fw-600 position-relative ">                  
                      <i class="material-icons fs-15px text-green-400">close_fullscreen</i> 
                      <span class="position-absolute top-50 start-5 translate-middle-y ps-1 material-text" style="width: 5em;">Open All</span>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade active show" id="default-pop-1"></div>
                <div class="tab-pane fade" id="default-pop-2">
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
            </div>`,L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'})),o=L.map(document.getElementById(t),{layers:[s],zoomControl:!1,scrollWheelZoom:!0,loadingControl:!0,gestureHandling:!0}),r=L.geoJSON(null,{className:"",onEachFeature:function(a,i){let p=a.properties;i.setStyle({weight:1,color:"#ff9800",dashArray:"",fillOpacity:.7}),i.bindTooltip('<span class="fs-12px fw-600">'+kabKotaName(p.kabupaten_nama,"sort")+' |</span> <span class= "fs-12px" >'+p.provinsi_nama+"</span>"),i.bindPopup('<div class="spinner-grow text-warning mt-2"></div>',{keepInView:!0,autoPan:!0,autoClose:!0,closeOnClick:!1,className:"popupCustom",maxWidth:307}),i.on({mouseover:function(a){(a=a.target).setStyle({weight:2,color:"#ff9800",dashArray:"",fillOpacity:.9}),L.Browser.ie||L.Browser.opera||L.Browser.edge||a.bringToFront(),i.openTooltip()},mouseout:d,click:function(e){o.closePopup(),i.openPopup(),m.isVisible()&&m.hide();{var t=p;let a,l="",n=e.target.getPopup(),s=t.kabupaten_kode,o=kabKotaName(t.kabupaten_nama),r=t.provinsi_nama,d=$("#sel_ta").val(),c=$("#sel_kl").val();return $(".leaflet-popup-content-wrapper").addClass(["bg-black-transparent-8","rounded"]),void(async()=>{try{let a=await fetch(config.api_url+"/renja/renjalokus",{method:"POST",body:JSON.stringify({tahun:d,kl:c,level:"kabupaten",kabupaten:s}),headers:config.fetchHeaders});var e=(await a.json()).data}catch(a){return}async function t(e,a={expand:!1}){var t=()=>{let a=Object.values(e.detail);return a.sort((a,e)=>a.kl_id>e.kl_id?1:-1),a.forEach((a,e)=>{Object.values(a._children).forEach(a=>{Object.values(a._children).forEach(a=>{Object.values(a._children).forEach(a=>{Object.values(a._children).forEach(t=>{if(t.lokasi="",void 0!==t.lokasi_ro||null!=t.lokasi_ro||""!=t.lokasi_ro){let a=Object.assign({},t.lokasi_ro),e=[];Object.values(a).forEach(a=>{e.push(a.nama_lokus)}),t.lokasi=e.join(",")}})})})}),a.id=e+1}),a};console.log(t()),new Tabulator("#default-pop-1",{height:"515px",data:t(),index:"id",layout:"fitDataStretch",columnHeaderVertAlign:"middle",dataTree:!0,dataTreeStartExpanded:a.expand,dataTreeFilter:!0,dataTreeElementColumn:"name",dataTreeChildColumnCalcs:!1,dataTreeSelectPropagate:!0,dataLoader:!1,columns:[{title:"No",titleDownload:"No",vertAlign:"middle",field:"id",visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"K/L, Program, Kegiatan, KRO, RO, Komponen",titleDownload:"K/L, Program, Kegiatan, KRO, Komponen",vertAlign:"middle",field:"name",sorter:"string",width:450,responsive:0,variableHeight:!0,formatter:function(a,e){let t,i=a.getValue(),l="";return t="KL"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<span class="badge rounded-pill py-1 bg-orange-600">K/L</span>'}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>`:"Program"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<span class="badge rounded-pill py-1 bg-cyan-600">Program</span>'}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"Kegiatan"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<span class="badge rounded-pill py-1 bg-green-600">Kegiatan</span>'}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"KRO"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<span class="badge rounded-pill bg-warning py-1 bg-lime-600">KRO</span>'}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"RO"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<span class="badge rounded-pill py-1 bg-purple-600">RO</span>'}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:`
                    <div class="container">
                      <div class="row">
                        <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<span class="badge rounded-pill bg-yellow-600 py-1">Komponen</span>'}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="text-black w-50 ps-4 ms-5 my-1">
                          <span class="badge py-1 bg-indigo-600 ms-2 ">Indikator Pbj : ${a._cell.row.data.indikator_pbj}</span>   
                          <span class="badge py-1 bg-blue-600">Jenis : ${a._cell.row.data.komponen_jenis}</span>
                        </div>
                      </div>
                    </div> 
                    `}},{title:"Alokasi Bulan Januari",titleDownload:"Alokasi Bulan Januari",field:"alokasi_totaloutput",formatter:"money",width:150,formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2,dataTreeChildColumnCalcs:!0},sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2},formatter:function(a,e){a=a.getValue();return void 0===a?"":formatNumber(1e3*a)}},{title:"Tingkat Output",titleDownload:"Tingkat Output",field:"alokasi_totaloutput",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(1e3*t+195e3,2);return a},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Analisis Lanjutan",titleDownload:"Analisis Lanjutan",field:"alokasi_totaloutput",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(1e3*t+215e3,2);return a},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Realisasi Tingkat Output",titleDownload:"Realisasi Tingkat Output",field:"alokasi_totaloutputx",formatter:function(a,e){var t=a.getValue();""===t||void 0===t?a.getElement().style.backgroundColor="#E5E8E8":formatNumber(1e3*t+215e3,2);return""},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload},{title:"Realisasi Analisis Lanjutan",titleDownload:"Realisasi Analisis Lanjutan",field:"alokasi_totaloutputx",formatter:function(a,e){var t=a.getValue();""===t||void 0===t?a.getElement().style.backgroundColor="#E5E8E8":formatNumber(1e3*t+215e3,2);return""},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload},{title:"Lokasi",titleDownload:"Lokasi",field:"lokasi_ro",hozAlign:"right",width:167,formatter:function(a,e){return a.getElement().style.textAlign="left",a.getElement().style.width=400,""===a._cell.row.data.lokasi_ro||void 0===a._cell.row.data.lokasi_ro?(a.getElement().style.backgroundColor="#E5E8E8",""):"<span class='text-wrap text-black fw-400'>"+a._cell.row.data.lokasi+"</span>"},sorter:"number",headerHozAlign:"center",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Satuan ",titleDownload:"Satuan ",field:"satuan",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):"<span class='text-wrap text-black fw-500'>"+capitalize(t)+"</span>";return a},width:140,sorter:"number",headerHozAlign:"center",hozAlign:"center",accessorDownload:numberIDRDownload},{title:"Target ",titleDownload:"Target ",field:"target_0",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):0===t?0:formatNumber(t);return a},width:120,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Target Kesepakatan Tingkat Output",titleDownload:"Target Kesepakatan Tingkat Output ",field:"target_0",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):0===t?0:formatNumber(Number(t)+3);return a},width:120,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Target Kesepakatan Tingkat Analisis Lanjutan",titleDownload:"Target Kesepakatan Tingkat Analisis Lanjutan",field:"target_0",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):0===t?0:formatNumber(Number(t)+2);return a},width:120,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}}],initialSort:[{column:"id",dir:"asc"}]})}$("#title-tab").html(`
          <p class="h3 p-0 m-0 mx-4 text-black">${o}</p>
          <p class="h5 py-1 m-0 mx-4 mb-3 text-black">Provinsi ${r}</p>
        `),t(e),$(".open_table").on("click",async function(){var a;$(this).toggleClass("opentable"),a=$(this).hasClass("opentable")?($(this).find(".material-icons").html("open_in_full"),$(this).find(".material-text").html("Close All"),{expand:!0}):(closeButton(),{expand:!1}),t(e,a)});let i=[];e.detail.forEach(a=>{let e=[];a._children.forEach(a=>{e.push(`
              <li class="list-group-item py-1 px-2 text-dark">
                <div class="d-flex flex-row bd-highlight">
                  <div class="bd-highlight">
                    <i class="fa fa-capsules me-2 text-primary"></i>
                  </div>
                  <div class="bd-highlight">  
                    ${a.name}
                  </div>   
                </div>   
                <span class="badge badge-dark py-1 ps-4 text-black fs-11px" > Alokasi <b>Rp ${formatNumber(1e3*a.alokasi_totaloutput)}</b></span>
              </li>`)}),i.push(`
            <ul class="list-group mt-1 border-0 fs-12px mb-2">
              <li class="list-group-item py-1 px-2 active" >
                <div class="d-flex flex-row bd-highlight">
                  <div class="bd-highlight">
                    <i class="fa fa-landmark me-2"></i>
                  </div>
                  <div class="bd-highlight">
                    ${a.name}
                  </div>   
                </div>
              </li >
              ${e.join(" ")}  
            </ul>           
            `)}),l=`       
            <span class='h6 text-white'>${o}</span>
            <span class='float-end'><button class='btn btn-primary btn-sm rounded h6 mt-2 ' id="infoBtn">Detail</button></span>
            <br/>
            <span class='fs-12px fw-600 h6 text-white'>Provinsi ${r}</span>
            <br/>
            
              ${i.join(" ")}
            `,n.setContent(l),n.update(),a=L.DomUtil.get("infoBtn"),L.DomEvent.addListener(a,"click",function(a){m.isVisible()||m.toggle()})})()}}})}}).addTo(o);o.addControl(L.control.fullscreen({position:"topright",forceSeparateButton:!0,fullscreenElement:document.getElementById("fbody")})),L.control.zoom({position:"topright"}).addTo(o);let a=L.Control.extend({options:{position:"topleft"},onAdd:function(a){var e=L.DomUtil.create("div","leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0");return e.title="Reset Posisi Peta",e.type="button",e.style.backgroundImage="url(img/home.png)",e.style.backgroundSize="26px 26px",e.style.width="27px",e.style.height="27px",e.onclick=function(){a.closePopup(),a.fitBounds(r.getBounds())},e}}),e=new GeoSearch.GeoSearchControl({provider:new GeoSearch.OpenStreetMapProvider({params:{"accept-language":"id",countrycodes:"id",addressdetails:0}}),showMarker:!1,searchLabel:"Pencarian Lokasi",style:"button",autoClose:!0,updateMap:!0}),m=L.control.sidebar("leaflet-sidebar",{closeButton:!0,position:"right"});function d(a){a.target.setStyle({weight:1,color:"#ff9800",dashArray:"",fillOpacity:.7})}return o.addControl(m),o.addControl(new a),o.addControl(e),o.on("click",function(){m.hide(),o.closePopup(),closeButton()}),(async()=>{null!=i.features&&(o.spin(!0,{lines:10,length:20}),r.addData(i),o.spin(!1))})(),void(null!=i.features&&o.fitBounds(r.getBounds()))}}),await async function(e,t,i){t=["010","063","047","027"];try{let a=await fetch(config.api_url_v3+"/renja/renjakl-v3",{method:"POST",body:JSON.stringify({tahun:e,kl:t,search:i}),headers:config.fetchHeaders});var l=await a.json();return console.log(l.data),l.data}catch(a){return console.log("e",a),!1}}(a,0,i).then(function(a){mData.dataDetailBKL=a,o(tableTreeLevel(function(a){let e=arr_groupBy(["kementerian_kode"]),t=e(a),d=Object.assign({},t),c=[];return Object.keys(d).forEach(a=>{let e=Object.assign({},d[a]),t=sumObject(Object.values(e),"realisasi_ro"),i=sumObject(Object.values(e),"alokasi_0"),s=0,o=0,r=0,l=arr_groupBy(["program_kode"]),n=l(Object.values(e)),m=Object.assign({},n),h=[];Object.keys(m).forEach(a=>{s+=1;let e=Object.assign({},m[a]),t=sumObject(Object.values(e),"realisasi_ro"),i=sumObject(Object.values(e),"alokasi_0"),d=0,c=0,p=0,l=arr_groupBy(["kegiatan_kode"]),n=l(Object.values(e)),u=Object.assign({},n),g=[];Object.keys(u).forEach(a=>{d+=1;let e=Object.assign({},u[a]),t=sumObject(Object.values(e),"realisasi_ro"),i=sumObject(Object.values(e),"alokasi_0"),s=0,o=0,l=arr_groupBy(["output_kode"]),n=l(Object.values(e)),r=Object.assign({},n),m=[];Object.keys(r).forEach(a=>{s+=1;let e=Object.assign({},r[a]),t=sumObject(Object.values(e),"realisasi_ro"),i=sumObject(Object.values(e),"alokasi_0"),d=0,l=arr_groupBy(["suboutput_kode"]),n=l(Object.values(e)),c=Object.assign({},n),p=[];Object.keys(c).forEach(a=>{d+=1;let e=Object.assign({},c[a]),t=sumObject(Object.values(e),"realisasi_ro"),i=sumObject(Object.values(e),"alokasi_0"),l=0,n=arr_groupBy(["komponen_kode"]),s=n(Object.values(e)),o=Object.assign({},s),r=[];Object.keys(o).forEach(a=>{l+=1;var a=Object.assign({},o[a]),e=sumObject(Object.values(a),"realisasi_ro"),t=sumObject(Object.values(a),"alokasi_0");r.push({komponen_jenis:a[0].jenis_komponen,indikator_pbj:a[0].indikator_pbj,target_0:a[0].target_0,satuan:a[0].satuan,indikator_komponen:a[0].indikator_komponen,sumber_dana:a[0].sumber_dana_ids,attrs:a[0].attrs,tahun:a[0].tahun,kro_id:a[0].output_kode,jml_kro:null,jml_ro:null,jml_program:null,jml_kegiatan:null,kegiatan_id:a[0].kegiatan_kode,program_id:a[0].program_kode,komponen_id:a[0].komponen_kode,name:a[0].komponen_nama,tahun:a[0].tahun,kl_id:a[0].kementerian_kode,alokasi_totaloutput:t,alokasi_realisasi:e,keterangan:"",posisi:"komponen"})}),p.push({tahun:e[0].tahun,kl_id:e[0].kementerian_kode,program_id:e[0].program_kode,kro_id:e[0].output_kode,kegiatan_id:e[0].kegiatan_kode,ro_id:e[0].suboutput_kode,name:e[0].suboutput_nama,jml_program:null,jml_kegiatan:null,jml_kro:null,jml_ro:null,jml_komponen:l,alokasi_totaloutput:i,alokasi_realisasi:t,lokasi_ro:null,keterangan:"",posisi:"RO",_children:r})}),m.push({tahun:e[0].tahun,name:e[0].kegiatan_nama,kl_id:e[0].kementerian_kode,program_id:e[0].program_kode,kegiatan_id:e[0].kegiatan_kode,kro_id:e[0].output_kode,jml_program:null,jml_kegiatan:null,jml_kro:null,jml_ro:d,alokasi_totaloutput:i,alokasi_realisasi:t,keterangan:"",posisi:"KRO",_children:p}),o+=d}),g.push({tahun:e[0].tahun,kl_id:e[0].kementerian_kode,kegiatan_id:e[0].kegiatan_kode,program_id:e[0].program_kode,name:e[0].kegiatan_nama,jml_program:null,jml_kegiatan:null,jml_kro:s,jml_ro:o,alokasi_totaloutput:i,alokasi_realisasi:t,keterangan:"",posisi:"Kegiatan",_children:m}),p+=o,c+=s}),h.push({program_id:e[0].program_kode,name:e[0].program_nama,jml_program:null,jml_kegiatan:d,jml_kro:c,jml_ro:p,tahun:e[0].tahun,kl_id:e[0].kementerian_kode,alokasi_totaloutput:i,alokasi_realisasi:t,keterangan:"",posisi:"Program",_children:g}),r+=p,o+=c}),c.push({tahun:e[0].tahun,kl_id:e[0].kementerian_kode,name:e[0].kementerian_nama,name_short:e[0].kementerian_nama_alias,alokasi_totaloutput:i,alokasi_realisasi:t,keterangan:"",posisi:"KL",jml_program:s,jml_kegiatan:0,jml_kro:o,jml_ro:r,_children:h})}),c}(a),"all"))})):$("#mapload,#tableload,.sumber-data-renja,#container_renjakl").addClass("hide"),closeButton(),void 0===mData.belanjaKL?$("#belanjaKL").hide():($("#belanjaKL").show(),$("#mapload,#tableload").removeClass("loading"))}async function o(a,e={expand:!1},t){parseInt($("#sel_ta").val()),new Tabulator("#tableload",{data:a,index:"id",layout:"fitDataStretch",columnHeaderVertAlign:"middle",dataTree:!0,dataTreeStartExpanded:e.expand,dataTreeFilter:!0,dataTreeElementColumn:"name",dataTreeChildColumnCalcs:!1,dataTreeSelectPropagate:!0,dataLoader:!1,movableColumns:!0,columns:[{title:"No",titleDownload:"No",vertAlign:"middle",field:"id",visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"K/L, Program, Kegiatan, KRO, RO, Komponen",titleDownload:"K/L, Program, Kegiatan, KRO, Komponen",vertAlign:"middle",frozen:!0,field:"name",sorter:"string",width:500,responsive:0,variableHeight:!0,formatter:function(a,e){let t,i=a.getValue(),l="";return t="KL"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight ps-1"> ${l='<div class="badge py-1 '+c_main+'" ><span class="'+c_kl+'  badge-main p-1" title="Kementerian/Lembaga">'+a._cell.row.data.kl_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"Program"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<div class="badge '+c_main+'"><span class=" badge-left '+c_kl+' p-1" title="Kementerian/Lembaga">'+a._cell.row.data.kl_id+'</span><span class="'+c_prog+' badge-right  p-1" title="Program">'+a._cell.row.data.program_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"Kegiatan"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<div class="badge  '+c_main+'"><span class=" badge-left '+c_kl+' p-1" title="Kementerian/Lembaga">'+a._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1" title="Program">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' badge-right  p-1" title="Kegiatan">'+a._cell.row.data.kegiatan_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"KRO"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<div class="badge '+c_main+'" ><span class="  badge-left '+c_kl+' p-1" title="Kementerian/Lembaga">'+a._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1" title="Program">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1" title="Kegiatan">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+'  badge-right p-1"  title="Klasifikasi Rincian Ouput">'+a._cell.row.data.kro_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:"RO"===a._cell.row.data.posisi?`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<div class="badge '+c_main+'"><span class="'+c_kl+'  badge-left  p-1" title="Kementerian/Lembaga">'+a._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1" title="Program">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1" title="Kegiatan">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' p-1"  title="Klasifikasi Rincian Output">'+a._cell.row.data.kro_id+'</span><span class="'+color_ro+'  badge-right p-1"  title="Rincian Output">'+a._cell.row.data.ro_id+"</span></div>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                    `:`
                    <div class="container">
                      <div class="row">
                        <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${l='<span class="badge rounded-pill bg-yellow-600 py-1">'+a._cell.row.data.komponen_id+"</span>"}</div>  
                          <div class="bd-highlight text-wrap ms-1">${i}</div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="text-black w-50 ps-4 ms-5 my-1">
                          <span class="badge py-1 bg-indigo-600 ms-2 ">Indikator Pbj : ${a._cell.row.data.indikator_pbj}</span>   
                          <span class="badge py-1 bg-blue-600">Jenis : ${a._cell.row.data.komponen_jenis}</span>
                        </div>
                      </div>
                    </div> 
                    `}},{title:"&#931; PROG",field:"jml_program",titleDownload:"Program",visible:"semua"==t||"program"==t||void 0===t,headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",mutator:function(a,e,t,i,l){return void 0!==e.kl_id&&void 0===e.program_id?e._children.length:""},formatter:function(a,e){var t=a.getValue();return""===t&&(a.getElement().style.backgroundColor="#E5E8E8"),t}},{title:"&#931; KEG",titleDownload:"Kegiatan ",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==t||"kegiatan"==t||void 0===t,field:"jml_kegiatan",formatter:function(a,e){var t=a.getValue();return""===t&&(a.getElement().style.backgroundColor="#E5E8E8"),t},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},mutator:function(a,e,t,i,l){let n=void 0===e._children?0:e._children.length,s=(void 0!==e.program_id&&e.kegiatan_id,0);return void 0!==e.kl_id&&void 0===e.program_id?(e._children.forEach(function(a){s+=void 0===a._children?0:a._children.length}),s):void 0!==e.program_id&&void 0===e.kegiatan_id?void 0===e._children?0:e._children.length:""}},{title:"&#931; KRO",titleDownload:"KRO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==t||"kro"==t||void 0===t,field:"jml_kro",formatter:function(a,e){var t=a.getValue();return""!==t&&null!==t||(a.getElement().style.backgroundColor="#E5E8E8"),t},formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0}},{title:"&#931; RO",titleDownload:"RO",headerMenuIcon:'<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>',headerMenu:closeColumn,visible:"semua"==t||"ro"==t||void 0===t,field:"jml_ro",formatter:function(a,e){var t=a.getValue();return""!==t&&null!==t||(a.getElement().style.backgroundColor="#E5E8E8"),t},formatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:0}},{title:"Alokasi Anggaran",titleDownload:"Alokasi Anggaran",field:"alokasi_totaloutput",headerPopup:function(a,e,t){return popupnote("Alokasi Anggaran")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(t,2);return a},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Realisasi Anggaran",titleDownload:"Realisasi Anggaran",field:"alokasi_realisasi",headerPopup:function(a,e,t){return popupnote("Realisasi Anggaran")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(t,2);return a},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"% Realisasi Anggaran",titleDownload:"% Realisasi Anggaran",field:"alokasi_realisasi",headerPopup:function(a,e,t){return popupnote("% Realisasi Anggaran")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue(),t=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(a._cell.row.data.alokasi_realisasi/a._cell.row.data.alokasi_totaloutput*100,2)+"%";return t},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload},{title:"Tingkat Output",titleDownload:"Tingkat Output",field:"",headerPopup:function(a,e,t){return popupnote("Alokasi ditingkat output")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(t,2);return a},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Analisis Lanjutan",titleDownload:"Analisis Lanjutan",field:"",headerPopup:function(a,e,t){return popupnote("Alokasi ditingkat Analisis Lanjutan")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):formatNumber(t,2);return a},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Realiasasi Tingkat Output",titleDownload:"Realiasasi Tingkat Output",field:"alokasi_realisasi",headerPopup:function(a,e,t){return popupnote("Realiasasi Tingkat Output")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue();""===t||void 0===t?a.getElement().style.backgroundColor="#E5E8E8":formatNumber(t,2);return""},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Realisasi Analisis Lanjutan",titleDownload:"Realisasi Analisis Lanjutan",field:"",headerPopup:function(a,e,t){return popupnote("Realiasasi Analisis Lanjutan")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue();""===t||void 0===t?a.getElement().style.backgroundColor="#E5E8E8":formatNumber(t,2);return""},width:167,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Lokasi",titleDownload:"Lokasi",field:"lokasi_ro",hozAlign:"right",width:167,headerPopup:function(a,e,t){return popupnote("Lokasi")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){return a.getElement().style.textAlign="left",a.getElement().style.width=400,""===a._cell.row.data.lokasi_ro||void 0===a._cell.row.data.lokasi_ro?(a.getElement().style.backgroundColor="#E5E8E8",""):"<span class='text-wrap text-black fw-400'>"+a._cell.row.data.lokasi+"</span>"},sorter:"number",headerHozAlign:"center",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Satuan ",titleDownload:"Satuan ",field:"satuan",headerPopup:function(a,e,t){return popupnote("Satuan")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):"<span class='text-wrap text-black fw-500'>"+capitalize(t)+"</span>";return a},width:140,sorter:"text",headerHozAlign:"center",hozAlign:"center",accessorDownload:numberIDRDownload},{title:"Target ",titleDownload:"Target ",field:"target_0",headerPopup:function(a,e,t){return popupnote("Target")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):0===t?0:formatNumber(t);return a},width:120,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Target Kesepakatan Tingkat Output",titleDownload:"Target Kesepakatan Tingkat Output ",field:"",headerPopup:function(a,e,t){return popupnote("Target Kesepakatan Tingkat Output")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):0===t?0:formatNumber(Number(t)+3);return a},width:120,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Target Kesepakatan Tingkat Analisis Lanjutan",titleDownload:"Target Kesepakatan Tingkat Analisis Lanjutan",field:"",headerPopup:function(a,e,t){return popupnote("Target Kesepakatan Tingkat Analisis Lanjutan")},headerPopupIcon:"<i class='fas fa-exclamation-circle'></i>",formatter:function(a,e){var t=a.getValue(),a=""===t||void 0===t?(a.getElement().style.backgroundColor="#E5E8E8",""):0===t?0:formatNumber(Number(t)+2);return a},width:120,sorter:"number",headerHozAlign:"center",hozAlign:"right",accessorDownload:numberIDRDownload,bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}}],initialSort:[{column:"id",dir:"asc"}]})}Object.values(i.options).forEach(a=>{y.push(a.getAttribute("value"))}),Object.values(r.options).forEach(a=>{w.push(a.getAttribute("value"))}),await l(x,y,w).then(function(a){var e=tableTreeLevel(a.detail,"all");mData.kinerjaAnggaranBelanja={detail:e,tile:a.tile},s(mData.kinerjaAnggaranBelanja).then(a=>{var e=new ApexCharts(document.querySelector("#tingkat_output"),a.chat1),t=new ApexCharts(document.querySelector("#analisis_lanjutan"),a.chat2),i=new ApexCharts(document.querySelector("#ra_tingkat_output"),a.chat3),l=new ApexCharts(document.querySelector("#ra_analisis_lanjutan"),a.chat4),a=new ApexCharts(document.querySelector("#chart-capaian-kinerja-anggaran"),a.chat5);e.render(),t.render(),i.render(),l.render(),a.render()}).catch(a=>{console.log(a)})}),$("#kinerjaAnggaranSrc").keypress(async function(a){13==a.which&&(a=$(this).val(),$("#restoreData").removeClass("hide"),$(this).after(""),closeButton(),await l($("#sel_ta").val(),$("#sel_kl").val(),$("#sel_int").val(),a).then(function(a){s(a)}))}),await d(x,y,w).then(function(a){kinerjaAnggaranChart(a)}),$("#sel_ta").on("change",async()=>{let e,t=[],a=$("#sel_ta").val(),i=a.split("-");if(2021<i[0]){try{let a=await fetch(config.api_url+"/ka/renja/kementerian",{method:"POST",body:JSON.stringify({tahun:i[0]}),headers:config.fetchHeaders});var l=await a.json();e=l}catch(a){return!1}e.data.forEach(a=>{t.push(`<option value="${a.kementerian_kode}" selected="selected">${a.kementerian_nama}</option>`)}),$("#sel_kl").find("value").remove(),n.innerHTML=" ",n.innerHTML=t.join(" "),$("#sel_kl").selectpicker("destroy"),$("#sel_kl").selectpicker()}c()}),$("#sel_kl, #sel_int").on("change",async()=>{c()}),popUp=`
      <div class="modal-header bg-gray-300 w-100">
        <h5 class="modal-title">
          <i class="far fa-lg fa-fw fa-chart-bar"></i>
          Kinerja Anggaran
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body w-100">
        <div class="tab-overflowx">
          <ul class="nav nav-tabs ">
            <li class="nav-item"><a  class="nav-link nav-popup active" onClick="tabElemn(this);" data-active="true" data-tab="1"><i class="material-icons" style="position: relative;bottom: -7px;">fact_check</i> &nbsp; Chart Tingkat Output</h4></a></li>
            <li class="nav-item"><a  class="nav-link nav-popup" onClick="tabElemn(this);" data-active="false" data-tab="2"><i class="material-icons" style="position: relative;bottom: -7px;">content_paste_search</i> &nbsp; Chart Tingkat Analisis Lanjutan</h4></a></li>
          </ul>
        </div>
        <div class="tab-content border-top">
          <!-- begin tab-pane -->
          <div class="tab-pane p-3 fade active show" id="default-pop-1">                        
            <div class="btn-group btn-group-justified" id="btn-pilih">
              <span class="gchart me-3">Group By :</span>
              <a class="btn btn-default text-end active" id="gpIntervensi" onClick="gpIntervensi(this)" style="min-width: 8em;border-top-left-radius: 5px;border-bottom-left-radius: 5px;"><i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Intervensi</a>
              <a class="btn btn-default text-end " id="gpKL" onClick="gpKL(this)" style="min-width: 14em;">Kementerian/Lembaga</a>
            </div>                        
            <div class="col-xl-12 show active" id="contentIntervensi" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL" ><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR" ><span class="text-middle">Dokumen Ringkasan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA" ><span class="text-middle">Pagu Awal</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH" ><span class="text-middle">Pagu Harian</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-danger" id="sortByR" ><span class="text-middle">Realisasi</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-green" id="sortByRO" ><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
              </div>
              <!--GRAFIK-->
              <div id="chartdiv" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
            <div class="col-xl-12 hide" id="contentKL" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL12" ><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR12" ><span class="text-middle">Dokumen Ringkasan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA12" ><span class="text-middle">Pagu Awal</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH12" ><span class="text-middle">Pagu Harian</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-danger" id="sortByR12" ><span class="text-middle">Realisasi</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-green" id="sortByRO12" ><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
              </div>
              <!--GRAFIK-->
              <div id="chartdiv12" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
          </div>
          <div class="tab-pane p-3 fade" id="default-pop-2">
            <div class="btn-group btn-group-justified" id="btn-pilih">
              <span class="gchart me-3">Group By :</span>
              <a class="btn btn-default text-end active" id="gpIntervensi2"  onClick="gpIntervensi2(this)" style="min-width: 8em;border-top-left-radius: 5px;border-bottom-left-radius: 5px;"><i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Intervensi</a>
              <a class="btn btn-default text-end " id="gpKL2" onClick="gpKL2(this)" style="min-width: 14em;">Kementerian/Lembaga</a>
            </div>
            <div class="col-xl-12 show active" id="contentIntervensi2" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL2" ><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR2" ><span class="text-middle">Dokumen Ringkasan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA2" ><span class="text-middle">Pagu Awal</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH2" ><span class="text-middle">Pagu Harian</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-danger" id="sortByR2" ><span class="text-middle">Realisasi</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-green" id="sortByRO2" ><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>                                    
              </div>
              <!--GRAFIK--->
              <div id="chartdiv3" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK--->                    
            </div>
            <div class="col-xl-12 hide" id="contentKL2" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL22" ><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR22" ><span class="text-middle">Dokumen Ringkasan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA22" ><span class="text-middle">Pagu Awal</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH22" ><span class="text-middle">Pagu Harian</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-danger" id="sortByR22" ><span class="text-middle">Realisasi</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-green" id="sortByRO22" ><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
              </div>
              <!--GRAFIK-->
              <div id="chartdiv32" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
          </div>
        </div>
      </div>`,p(x,y,w,search),treeOpenCloseHtml("#elemenOpenClose"),$(".openclose").on("click",function(){var a=document.getElementById("sel_ta").value;["2022","2023"].includes(a)?o((a=treeOpenClose(this,mData.dataDetailBKL.detail)).adjust,a.opsiTabel,a.item):(a=mData.kinerjaAnggaranBelanja.detail,s({detail:(a=treeOpenClose(this,a,!0)).adjust,tile:mData.kinerjaAnggaranBelanja.tile},a.opsiTabel,a.item).then(a=>{var e=new ApexCharts(document.querySelector("#tingkat_output"),a.chat1),t=new ApexCharts(document.querySelector("#analisis_lanjutan"),a.chat2),i=new ApexCharts(document.querySelector("#ra_tingkat_output"),a.chat3),l=new ApexCharts(document.querySelector("#ra_analisis_lanjutan"),a.chat4),a=new ApexCharts(document.querySelector("#chart-capaian-kinerja-anggaran"),a.chat5);e.render(),t.render(),i.render(),l.render(),a.render()}).catch(a=>{console.log(a)}))}),$(".groupItem button").on("click",function(){var a=document.getElementById("sel_ta").value;console.log(this),["2022","2023"].includes(a)?o((a=treeBtnGroup(this,mData.dataDetailBKL.detail)).adjust,a.opsiTabel,a.item):(a=mData.kinerjaAnggaranBelanja.detail,s({detail:(a=treeBtnGroup(this,a,!0)).adjust,tile:mData.kinerjaAnggaranBelanja.tile},a.opsiTabel,a.item).then(a=>{var e=new ApexCharts(document.querySelector("#tingkat_output"),a.chat1),t=new ApexCharts(document.querySelector("#analisis_lanjutan"),a.chat2),i=new ApexCharts(document.querySelector("#ra_tingkat_output"),a.chat3),l=new ApexCharts(document.querySelector("#ra_analisis_lanjutan"),a.chat4),a=new ApexCharts(document.querySelector("#chart-capaian-kinerja-anggaran"),a.chat5);e.render(),t.render(),i.render(),l.render(),a.render()}).catch(a=>{console.log(a)}))}),document.getElementById("popUp").innerHTML=popUp;const m=[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));m.map(function(a){return new bootstrap.Popover(a)}),$(".leaflet-popup-content").removeAttr("style").attr("style","width:10em")}};export default KinerjaAnggaran;