import{apopoverTrigger,apiMasterIntervensi}from"../../../services/api.js";const AdminPenandaanRo={render:async()=>(mData.dataMasterIntervensi=void 0===mData.dataMasterIntervensi?await apiMasterIntervensi():mData.dataMasterIntervensi,`
    <div class="app-content-padding flex-grow-1 overflow-auto admin-cover" data-height="100%">
      <h2 class="page-header text-blue">
        <i class="material-icons text-blue-600 align-middle me-1 mb-1">check_circle3</i>Administrasi Penandaan RO Ditandai dan Disepakati
      </h2>      
      <form class=" " id="formsub">          
        <div class="row pt-3 mx-0 mb-3 py-3 bg-gray-300 rounded" >        
          <div class="col-xl-3"></div>
          <div class="col-xl-4"></div>
          <div class="col-xl-3 ">          
            <div class="form-group sel_tax">                  
              <select id="sel_tahun" name="sel_tahun" class="form-control" required>
                <option value="">Pilih Tahun</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
          <div class="col-xl-2 ">
            <div class="form-group pull-right width-full">
              <div class="btn btn-primary mx-3 px-3" id="subdata">Filter</div>
            </div>
          </div>
        </div>          
      </form>
      <div class="" id="beforeload">	
        <form class="hide" id="input-revisi-penandaan">
          <div class="row mt-3" >	
            <div class="col-xl-12 ">
              <div class="card">
                <div class="card-body " >
                  <div class="" id="table-admin-penandaan-pagu"></div>      
                </div>      
              </div>      
            </div>      
          </div>
          <div class="row mt-3" >	
            <div class="col-xl-3">
              <div class="form-group  width-full">
                <div class="btn btn-primary" data-click="swal-success" id="pushdata">Submit Data</div>
              </div>
            </div>
          </div>
        </form> 
      </div>  
      <div class="modal fade" id="tileModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content" style="width: 58em;margin-left: -13em;">  
            <div class="modal-header bg-gray-300">
              <h4 class="modal-title" id="titleInv"></h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body" id="viewData"></div>			
          </div>
        </div>
      </div>
    </div>`),after_render:async()=>{let a=document.querySelector("#formsub"),t=document.querySelector("#input-revisi-penandaan"),i=document.querySelector("#subdata"),e=document.querySelector("#pushdata");e.onclick=async function(){if(t.reportValidity()){let t=[],i=[],a=$("#input-revisi-penandaan").serializeArray();a.forEach(a=>{"ditandai"===a.name&&t.push(a.value),"disepakati"===a.name&&i.push(a.value)});try{let a=await fetch(config.api_url+"/renja/taggingpost",{method:"POST",body:JSON.stringify({tahun:$("#sel_tahun").val(),ditandai:t,disepakati:i}),headers:config.fetchHeaders});var e=await a.json();return console.log(e),e.status&&swal({title:"Data tersimpan",text:" ",icon:"success",buttons:{confirm:{text:"Tutup",value:!0,visible:!0,className:"btn btn-success",closeModal:!0}}}),e.data}catch(a){return!1}}},i.onclick=async function(){$("#beforeload").addClass("loading"),a.reportValidity()&&await async function(t){try{let a=await fetch(config.api_url+"/renja/listro-tagging",{method:"POST",body:JSON.stringify({tahun:t}),headers:config.fetchHeaders});var i=await a.json();return console.log(i.data),i.data}catch(a){return!1}}($("#sel_tahun").val()).then(function(a){$("#input-revisi-penandaan").removeClass("hide"),async function(a){const t=a.data;!function(a){$("#table-admin-penandaan-pagu").html(`
        <table class="table" id="tableData" style="width: 100% !important;">
          <thead class="w-100x" style="width: 100% !important;">
            <tr>
              <td >No.</td>
              <td >
                <div style="writing-mode: vertical-rl;text-orientation: mixed;padding-bottom: 0.5em;margin-left: 1em;margin-right: -1em;" >Ditandai</div>
                <div class="form-check" style="margin-left: 1em;margin-right: -1em;">
                  <input class="form-check-input" type="checkbox" id="ditandaiAll">
                </div>
              </td>
              <td style="">
                <div style="writing-mode: vertical-rl;text-orientation: mixed;padding-bottom: 0.5em;">Disepakati</div>
                <div class="form-check" >
                  <input class="form-check-input" type="checkbox"  id="disepakatiAll">
                </div>
              </td>
              <td style="">Filter By</td>
              <td style="">Kementerian/Lembaga</td>
              <td style="">Rincian Output</td>
            </tr>
          </thead>
          <body>
          ${a}
          </body>
        </table>        
        `),$("#tableData").DataTable({scrollY:300,scrollX:!0,scrollCollapse:!0,paging:!1,fixedColumns:!0,responsive:!0,dom:"Bfrtip",buttons:["excel"]}),$("#ditandaiAll").click(function(a){var t=this.checked;$('input[check="ditandai"]').each(function(){this.checked=t})}),$("#disepakatiAll").click(function(a){var t=this.checked;$('input[check="disepakati"]').each(function(){this.checked=t})})}((()=>{let e=[];return t.sort((a,t)=>a.kementerian_kode>t.kementerian_kode?1:-1),t.forEach((a,t)=>{var i='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1" title="K/L : '+a.kementerian_nama.trim()+'"  data-bs-toggle="popover" style="cursor:pointer">'+a.kementerian_kode+'</span><span class="'+c_prog+' p-1" title="Program : '+a.program_nama.trim()+'">'+a.program_kode+'</span><span class="'+c_keg+' p-1" title="Kegiatan : '+a.kegiatan_nama.trim()+'">'+a.kegiatan_kode+'</span><span class="'+c_kro+' p-1" title="KRO : '+a.output_nama.trim()+'">'+a.output_kode+'</span><span class="'+color_ro+' badge-right p-1" title="RO : '+a.suboutput_nama.trim()+'">'+a.suboutput_kode+"</span></div>";e.push(`<tr>
                <td style="">
                  ${t+1}.
                </td>
                <td style="">
                  <div class="form-check ms-3">
                    <input class="form-check-input" type="checkbox"  check="ditandai" ${1==a.ditandai?"checked='checked'":""} value="${a.idro}" name="ditandai" >
                  </div>
                </td>
                <td style="">
                  <div class="form-check"">
                    <input class="form-check-input" type="checkbox"  check="disepakati" ${1==a.disepakati?"checked='checked'":""} value="${a.idro}" name="disepakati">
                  </div>
                </td>
                <td style="">
                  <div class="text-wrap">
                    ${-1===a.kdtema.search("008")?"Kata Kunci":"Tematik Stunting"}
                  </div>
                </td>
                <td style="">
                  <div class="text-wrap">
                    ${a.kementerian_nama}
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-row bd-highlight">
                    <div class="bd-highlight">${i}</div>
                    <div class="bd-highlight text-wrap">${a.suboutput_nama}</div>
                  </div>
                </td>
            </tr>`)}),e.join("")})())}(a)}),$("#beforeload").removeClass("loading")},apopoverTrigger()}};export default AdminPenandaanRo;