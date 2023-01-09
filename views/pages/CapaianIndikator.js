import WidgetCard from"../components/WidgetCard.js";import{apiDataNasional,apiPrioritasKabupaten}from"../../services/api.js";const CapaianIndikator={render:async()=>{return`
    <div class="app-content-padding flex-grow-1 overflow-auto" data-height="100%">
            <!-- BEGIN page-header -->
      <h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">stacked_bar_chart</i>Capaian Indikator</h2>
      <!-- END page-header -->
      <!-- begin widget-card -->
      <div id="top-tiles" class="row">
        ${await WidgetCard.render("tile-2","Stunting","liwhitee-100","lg-7 ms-2 p-0")}
        ${await WidgetCard.render("tile-3","Underweight","white-100","lg mx-2 p-0")}
        ${await WidgetCard.render("tile-4","Wasting","white-100","lg me-2 p-0")}
      </div>
      <!-- end widget-card -->
      <div class="row map-stunting mt-3" id="main-map">	
        <div class="col-xl-12 ui-sortable">
          <ul class="nav nav-tabs nav-stunting bg-white" id="status_active" data-status="prioritas">
            <li class="nav-item"><a href="#nav-tab-1"  data-bs-toggle="tab" class="nav-link active" id="m_prioritas" onclick="m_prioritas(this)" data-active="true" >Kabupaten/Kota Prioritas</a></li>
            <li class="nav-item"><a href="#nav-tab-2"  data-bs-toggle="tab" class="nav-link" id="m_stunting" onclick="m_stunting(this)" data-active="false" >Stunting</a></li>
            <li class="nav-item"><a href="#nav-tab-3"  data-bs-toggle="tab" class="nav-link" id="m_underweight" onclick="m_underweight(this)" data-active="false"  >Underweight</a></li>
            <li class="nav-item"><a href="#nav-tab-4"  data-bs-toggle="tab" class="nav-link" id="m_wasting" onclick="m_wasting(this)" data-active="false" ></i>Wasting</a></li>									
          </ul>
          <div class="tab-content panel p-3 rounded-0 rounded-bottom">
          <div id="mapLoad"></div>            
            <div class="tab-pane fade active card-body p-0 m-0 show " id="nav-tab-1">
              <div id="data-prioritas" class="d-flex bd-highlight mb-3">                
                <div class="col-xl-8 p-2 bd-highlight" >
                  <div class="row me-1">   
                    <div class="d-flex bd-highlight" id="data_prioritas"></div>
                    <div class="card p-0">
                      <div class="card-body p-0 fs-12px">
                          <div id="mapPrioritas" class="loading bg-gray-100">                            
                          </div>
                        </div>                  
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 ms-auto p-2 bd-highlight">                  
                  <div class="card ">
                    <div class="card-body px-1 py-3 fs-12px">
                      <div class="d-flex flex-row bd-highlight">
                        <div class="bd-highlight">
                          <div class="h6 ms-2 mb-3">Lokasi Prioritas</div>
                        </div> 
                        <div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700  mb-1 fs-11px" style="position: absolute;right: 0.5em;">
                          <div class="bd-highlight">
                            <i class="fas fa-lg fa-fw fa-file-pdf p-0 m-0 cursor-pointer fs-15px text-red-400" title="Export Pdf" onclick="toPdf('#jstreeplan','pdf','Lokasi_Prioritae.pdf');"></i>
                          </div>  
                          <div class="bd-highlight">
                            <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer fs-15px  text-green-400" title="Export Xls" onclick="toXls('#jstreeplan','xls','Lokasi_Prioritae.xls');"></i>
                          </div> 
                          <div class="bd-highlight">
                            <div class="fs-10px fw-700">Download : </div>
                          </div>           
                        </div>
                      </div>
                      <div class="jstree-container overflow-auto bg-gray-100">                        
                        <div id="jstree-default" class="lokus_tree" style="width: 37em;">  
                          <div class="loading bg-gray-100"></div>
                        </div>                          
                      </div>
                    </div>                  
                  </div>                  
                </div>
              </div>
            </div>
            <div class="tab-pane fade card-body p-0 m-0 show " id="nav-tab-2">
              <div class="card" id="data_map_stunting"  fullscreen="false">
                <div class="card-body loading bg-gray-100" id="map_stunting">                  
                </div>              
              </div>              
            </div>
            <div class="tab-pane fade card-body p-0 m-0 show " id="nav-tab-3">
              <div class="card" id="data_map_underweight" fullscreen="false">
                <div class="card-body loading bg-gray-100" id="map_underweight" >
                </div>              
              </div>              
            </div>
            <div class="tab-pane fade card-body p-0 m-0 show " id="nav-tab-4">            
              <div class="card" id="data_map_wasting"  fullscreen="false">
                <div class="card-body loading bg-gray-100" id="map_wasting">
                </div>              
              </div>              
            </div>
          </div>
        </div>
      <!-- Modal -->
      <div class="modal modal-message  fade" id="GrafikModal" tabindex="-1" aria-labelledby="GrafikModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content rounded" id="popUp">
          <div class="modal-header w-100">						
						<button type="button" class="btn-close" title="tutup" data-bs-dismiss="modal" aria-hidden="true"></button>
					</div>
          <div id="chart_stunting" style="width: 100%;height: 600px;" ></div>
          </div>
        </div>
      </div>
      
      <div id="elmsidebarR" class="hide">
        <div id="sidebarR" class="float-end">
          <div class="h4 mt-4 mb-n2">Komparasi Data</div>
          <hr/>
          <div class="mb-n1" id="paramData"></div>
          <div id="compireData"></div>          
        </div>
      </div>
      <div  class="col-md-6 border-start hide" id ="jstreeplan"></div>
            <!-- End Modal -->
      </div>
    </div>`},after_render:async()=>{geoData.dataNasional=void 0===geoData.dataNasional?await apiDataNasional():geoData.dataNasional,geoData.dataPrioritasKabupaten=void 0===geoData.dataPrioritasKabupaten?await apiPrioritasKabupaten():geoData.dataPrioritasKabupaten,$(function(){PetaPropinsi(geoData.dataPrioritasKabupaten),mapPrioritas(geoData.dataPrioritasKabupaten)});const t=document.getElementById("tile-2"),a=document.getElementById("tile-3"),d=document.getElementById("tile-4");t.innerHTML=`
      <div class="row">
      <div class="col-md-12 d-flex">
      <div class="row mx-auto w-100" id="data_stunting_nasional">0</div>
      </div>
      </div>`,a.innerHTML=`
      <div class="row">
      <div class="col-md-12 d-flex">
      <div class="w-100" id="data_underweight_nasional">0</div>
      </div>
      </div>`,d.innerHTML=`
      <div class="row">
      <div class="col-md-12 d-flex">
      <div class="w-100" id="data_wasting_nasional">0</div>
      </div>
      </div>`;let i=arr_groupBy(["tahun"]),s=i(geoData.dataNasional.stunting),e=i(geoData.dataNasional.wasting),l=i(geoData.dataNasional.underweight);document.querySelector("#data_stunting_nasional").innerHTML=`
    <div class="d-flex justify-content-between bd-highlight m-0 p-0 my-2">
      <div class="bd-highlight">
        <table class="table fs-12px" style="margin-top: 1.85em;margin-right: -1em;">
          <thead>
            <tr>
            <th class="fw-500" >Usia</th>          
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="fw-500" >Balita</td>            
            </tr>
            <tr>
              <td class="fw-500" >Baduta</td>            
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bd-highlight">
        <p class="fs-12px fw-600 mb-1">Riskesdas (%)</p>
        <table class="table fs-12px">
          <thead>
            <tr>
            <th class="fw-500" >2007</th>
            <th class="fw-500" >2010</th>
            <th class="fw-500" >2013</th>
            <th class="fw-500" >2018</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${s[2007][0].pb_u_stunting}</td>
              <td>${s[2010][0].pb_u_stunting}</td>
              <td>${s[2013][0].pb_u_stunting}</td>
              <td>${s[2018][0].pb_u_stunting}</td>
            </tr>
            <tr>
              <td class="text-center">${void 0===s[2007][1]?"-":s[2007][1].pb_u_stunting}</td>
              <td class="text-center">${void 0===s[2010][1]?"-":s[2010][1].pb_u_stunting}</td>
              <td class="text-center">${void 0===s[2013][1]?"-":s[2013][1].pb_u_stunting}</td>
              <td class="text-center">${void 0===s[2018][1]?"-":s[2018][1].pb_u_stunting}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <span class="bd-highlight border-start px-1"></span>
      <div class="bd-highlight ms-n2">
        <p class="fs-12px fw-600 mb-1">PSG (%)</p>
        <table class="table fs-12px">
          <thead>
            <tr>
              <th class="fw-500" >2015</th>
              <th class="fw-500" >2016</th>
              <th class="fw-500" >2017</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${s[2015][0].pb_u_stunting}</td>
              <td>${s[2016][0].pb_u_stunting}</td>
              <td>${s[2017][0].pb_u_stunting}</td>
            </tr>
            <tr>
              <td class="text-center"> - </td>
              <td class="text-center"> - </td>
              <td class="text-center"> - </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span class="bd-highlight border-start px-1"></span>
      <div class="bd-highlight ms-n2">
        <p class="fs-12px fw-600 mb-1">SSGBI (%)</p>
        <table class="table fs-12px">
          <thead>
            <tr>
            <th class="fw-500" >2019</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${s[2019][0].pb_u_stunting}</td>
            </tr>
            <tr>
              <td class="text-center"> - </td>
            </tr>    
          </tbody>
        </table>
      </div>
      <span class="bd-highlight border-start px-1"></span>
      <div class="bd-highlight ms-n2">
        <p class="fs-12px fw-600 mb-1">SSGI (%)</p>
        <table class="table fs-12px">
          <thead>
            <tr>
            <th class="fw-500" >2021</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${s[2021][0].pb_u_stunting}</td>
            </tr>
            <tr>
              <td class="text-center"> - </td>
            </tr>    
          </tbody>
        </table>
      </div>
      <span class="bd-highlight border-start px-1"></span>
      <div class="bd-highlight ms-n2">
        <p class="fs-12px fw-600 mb-1">EPPGBM (%)</p>
        <table class="table fs-12px">
          <thead>
            <tr>
            <th class="fw-500" >2022</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${s[2022][0].pb_u_stunting}</td>
            </tr>
            <tr>
              <td class="text-center"> - </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`,document.querySelector("#data_underweight_nasional").innerHTML=`
    <div class="d-flex justify-content-between bd-highlight my-2">
      <div class="bd-highlight mx-1">
        <table class="table fs-12px" style="margin-top: 1.85em;margin-right: -1em;">
          <thead>
            <tr>
              <th class="fw-500" >Usia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="fw-500" >Balita</td>
            </tr>
            <tr>
              <td class="fw-500" >Baduta</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bd-highlight mx-1">
      <p class="fs-12px fw-600 mb-1">Riskesdas (%)</p>
      <table class="table fs-12px">
        <thead>
          <tr>
            <th class="fw-500" >2018</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${l[2018][0].jml_a1}</td>
          </tr>
          <tr>
            <td>${void 0===l[2018][1]?"-":l[2018][1].jml_a1}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="bd-highlight mx-1">
      <p class="fs-12px fw-600 mb-1">SSGI (%)</p>
      <table class="table fs-12px">
        <thead>
          <tr>
            <th class="fw-500" >2019</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${l[2019][0].jml_a1}</td>
          </tr>   
          <tr>
            <td class="text-center"> - </td>
          </tr>
        </tbody>
      </table>
    </div>`,document.querySelector("#data_wasting_nasional").innerHTML=`
    <div class="d-flex justify-content-between bd-highlight my-2">
    <div class="bd-highlight mx-1">
        <table class="table fs-12px" style="margin-top: 1.85em;margin-right: -1em;">
          <thead>
            <tr>
              <th class="fw-500" >Usia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="fw-500" >Balita</td>
            </tr>
            <tr>
              <td class="fw-500" >Baduta</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bd-highlight mx-1">
        <p class="fs-12px fw-600 mb-1">Riskesdas (%)</p>
        <table class="table fs-12px">
          <thead>
            <tr>
              <th class="fw-500" >2018</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${e[2018][0].jml_a1}</td>
            </tr>
            <tr>
              <td>${void 0===e[2018][1]?"-":e[2018][1].jml_a1}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bd-highlight mx-1">
        <p class="fs-12px fw-600 mb-1">SSGI (%)</p>
        <table class="table fs-12px">
          <thead>
            <tr>
            <th class="fw-500" >2019</th>
            </tr>            
          </thead>
          <tbody>
            <tr>
              <td>${e[2019][0].jml_a1}</td>
            </tr>    
            <tr>
              <td class="text-center"> - </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`}};export default CapaianIndikator;