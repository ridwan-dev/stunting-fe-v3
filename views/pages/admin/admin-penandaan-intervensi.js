import{apopoverTrigger,apiMasterIntervensi}from"../../../services/api.js";const AdminPenandaanRo={render:async()=>(mData.dataMasterIntervensi=void 0===mData.dataMasterIntervensi?await apiMasterIntervensi():mData.dataMasterIntervensi,`
    <div class="app-content-padding flex-grow-1 overflow-auto admin-cover" data-height="100%">
      <h2 class="page-header text-blue">
        <i class="material-icons text-blue-600 align-middle me-1 mb-1">check_circle3</i>Administrasi Penandaan Intervensi
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
      
      <form class="hide" id="input-revisi-penandaan">
        <div class="row mt-3" >	
          <div class="col-xl-12 ">
            <div class="card">
              <div class="card-body">
                <div class="" id="table-admin-penandaan-pagu"></div>      
              </div>      
            </div>      
          </div>      
        </div>
        <div class="row mt-3" >	
          <div class="col-xl-3">
            <div class="form-group  width-full"></div>
          </div>
        </div>
      </form> 
      <!--
      <form id="datax"></form> 
      -->
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
    </div>`),after_render:async()=>{let e=document.querySelector("#formsub"),a=document.querySelector("#subdata");a.onclick=async function(){$("#input-revisi-penandaan").removeClass("hide"),$("#table-admin-penandaan-pagu").parent().addClass("loading"),e.reportValidity()&&await async function(a){try{let e=await fetch(config.api_url+"/renja/listro",{method:"POST",body:JSON.stringify({tahun:a}),headers:config.fetchHeaders});var t=await e.json();return console.log(t),t.data}catch(e){return!1}}($("#sel_tahun").val()).then(function(e){!async function(e){let a=mData.dataMasterIntervensi,t=arr_groupBy(["tipe_id"]),n=t(a);const i=e.data,l=(console.log(e),new Tabulator("#table-admin-penandaan-pagu",{height:"515px",index:"idx",data:(()=>{var e=Object.values(i);return i.sort((e,a)=>e.kementerian_kode>a.kementerian_kode?1:-1),i.forEach((e,a)=>{e.idx=a+1}),e})(),layout:"fitDataStretch",columnHeaderVertAlign:"middle",dataLoader:!1,selectable:!0,columns:[{title:"No.",titleDownload:"No.",vertAlign:"middle",field:"idx",width:50,headerSort:!1,visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"Kementerian/Lembaga",field:"kementerian_nama",width:200,variableHeight:!0,headerFilter:"input",formatter:function(e,a){return"<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>"+e.getValue()+"</div></div>"}},{title:"Rincian Output",field:"suboutput_nama",width:350,variableHeight:!0,headerFilter:"input",formatter:function(e,a){e.getValue();let t;return void 0!==e._cell.row.data.ro_id?t='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1" >'+e._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1">'+e._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+e._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' p-1">'+e._cell.row.data.kro_id+'</span><span class="'+color_ro+' badge-right p-1">'+e._cell.row.data.ro_id+"</span></div>":void 0!==e._cell.row.data.kementerian_kode?t='<div class="badge  '+c_main+'" ><span class="badge-main '+c_kl+' p-1">'+e._cell.row.data.kl_id+"</span></div>":void 0!==e._cell.row.data.kro_id?t='<div class="badge '+c_main+'" ><span class="badge-left '+c_kl+' p-1">'+e._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1">'+e._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+e._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' badge-right p-1">'+e._cell.row.data.kro_id+"</span></div>":void 0!==e._cell.row.data.kegiatan_id?t='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1">'+e._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1">'+e._cell.row.data.program_id+'</span><span class="'+c_keg+' badge-right p-1">'+e._cell.row.data.kegiatan_id+"</span></div>":void 0!==e._cell.row.data.program_id&&(t='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1">'+e._cell.row.data.kl_id+'</span><span class="'+c_prog+' badge-right p-1">'+e._cell.row.data.program_id+"</span></div>"),`
              <div class="d-flex flex-row bd-highlight">
              <div class="bd-highlight">${t='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1" title="K/L : '+e._cell.row.data.kementerian_nama.trim()+'"  data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Renja K/L : Rp. 3.422.951.172.00"">'+e._cell.row.data.kementerian_kode+'</span><span class="'+c_prog+' p-1" title="Program : '+e._cell.row.data.program_nama.trim()+'">'+e._cell.row.data.program_kode+'</span><span class="'+c_keg+' p-1" title="Kegiatan : '+e._cell.row.data.kegiatan_nama.trim()+'">'+e._cell.row.data.kegiatan_kode+'</span><span class="'+c_kro+' p-1" title="KRO : '+e._cell.row.data.output_nama.trim()+'">'+e._cell.row.data.output_kode+'</span><span class="'+color_ro+' badge-right p-1" title="RO : '+e._cell.row.data.suboutput_nama.trim()+'">'+e._cell.row.data.suboutput_kode+"</span></div>"}</div>
              <div class="bd-highlight text-wrap">${e._cell.row.data.suboutput_nama}</div>
              </div>
              `}},{title:"Intervensi",field:"tipe_nama",width:100,variableHeight:!0,headerFilter:"input",formatter:function(e,a){return"<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>"+e.getValue()+"</div></div>"}},{title:"Kelompok Intervensi",field:"intervensi_nama",width:10,variableHeight:!0,headerFilter:"input",cellClick:function(e,l){let d;if(console.log(l._cell.row.data),$("#titleInv").html("Edit Intervensi RO "+l._cell.row.data.suboutput_nama),null===l._cell.row.data.tipe_nama)d=`
              <div action="${window.location.href}" id="formIntv">
								<fieldset>
                  <div class="mb-3">
                    <input type="hidden" value="${l._cell.row.data.idro}" name="ro_id" id="ro_id" required>
                    <input type="hidden" value="${l._cell.row.data.thang}" name="thang" id="thang" required>
										<label class="form-label" for="grInt">Group Intevensi</label>
										<select class="form-select" id="grIntMaster"  required>
                      <option value="" >Pilih</option>
                      <option value="1-Spesifik"  >Spesifik</option>
                      <option value="2-Sensitif"  >Sensitif</option>
                      <option value="3-Dukungan"  >Dukungan</option>
                    </select>
									</div>
									<div class="mb-3 hide" id="intMaster">
										<label class="form-label" for="deskInt">Intervensi</label>
										<select class="form-select" id="selectIntMaster" required>
                    </select>
									</div>
                  <button type="submit" class="btn btn-primary w-100px me-5px" id="submitIntv">Submit</button>
									<div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
								</fieldset>
							</div>
              `;else{let e=l._cell.row.data.tipe_nama,a="Spesifik"===e?1:"Sensitif"===e?2:3,t=[],i=(n[a].forEach(e=>{t.push(`
                  <option value="${e.intervensi_kode}" ${l._cell.row.data.intervensi_nama==e.intervensi_nama?"selected='selected'":""}>${e.intervensi_kode+"-"+e.intervensi_nama}</option>
                  `)}),["<option value='' >Pilih</option>"].concat(t));d=`
              <div action="${window.location.href}" id="formIntv">
								<fieldset>
                  <div class="mb-3">
                    <input type="hidden" value="${l._cell.row.data.idro}" name="ro_id" id="ro_id" required>
                    <input type="hidden" value="${l._cell.row.data.thang}" name="thang" id="thang" required>
										<label class="form-label" for="grInt">Group Intevensi</label>
										<select class="form-select" id="grIntMaster"  required>
                      <option value="" >Pilih</option>
                      <option value="1-Spesifik"  ${"Spesifik"==e?"selected='selected'":""}>Spesifik</option>
                      <option value="2-Sensitif"  ${"Sensitif"==e?"selected='selected'":""}>Sensitif</option>
                      <option value="3-Dukungan"  ${"Dukungan"==e?"selected='selected'":""}>Dukungan</option>
                    </select>
									</div>
									<div class="mb-3" id="intMaster">
										<label class="form-label" for="deskInt">Intervensi</label>
										<select class="form-select" id="selectIntMaster" required>
                      ${i.join("")}
                    </select>
									</div>
                  <button type="submit" class="btn btn-primary w-100px me-5px" id="submitIntv">Submit</button>
									<div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
								</fieldset>
							</div>
              `}$("#viewData").html(d),$("#grIntMaster").on("change",function(){let e=$(this).val(),a=e.split("-"),t=[],i=(""===e?$("#intMaster").addClass("hide"):$("#intMaster").removeClass("hide"),n[a[0]].forEach(e=>{t.push(`
                  <option value="${e.intervensi_kode}">${e.intervensi_kode+"-"+e.intervensi_nama}</option>
                  `)}),["<option value='' >Pilih</option>"].concat(t));$("#intMaster select").html(i.join(""))}),document.querySelector("#submitIntv").addEventListener("click",e=>{var a=document.querySelector("#formIntv");a&&!async function(a){var t=0;{if(a.forEach(e=>{e=document.querySelector("#"+e);0==validateFields(e)&&t++}),console.log("error",t),0<t)return;var a=document.querySelector("#selectIntMaster"),i={kode_intervensi:a.value,id_ro:document.querySelector("#ro_id").value,tahun:document.querySelector("#thang").value};try{let e=await fetch(config.api_url+"/renja/rointervensi",{method:"POST",body:JSON.stringify(i),headers:config.fetchHeaders});var l=await e.json();return $("#tileModal").modal("hide"),l.status&&($(".tabulator-selected").find(".name_intv").html(a.options[a.selectedIndex].text),$(".tabulator-selected").removeClass("tabulator-selected"),swal({title:"Data tersimpan",text:" ",icon:"success",buttons:{confirm:{text:"Tutup",value:!0,visible:!0,className:"btn btn-success",closeModal:!0}}})),l.data}catch(e){return}}}(["ro_id","thang","grIntMaster","selectIntMaster"])})},formatter:function(e,a){console.log(e._cell.row.data);return"<div class='d-flex justify-content-between'> <div class='bd-highlight pe-1 name_intv' >"+(null===e.getValue()?"belum ditentukan":"<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'>"+e._cell.row.data.kode_intervensi+" - </div><div class='bd-highlight text-wrap'>"+e.getValue()+"</div></div>")+"</div><div class='bd-highlight text-wrap'><div class='btn btn-primary my-1 py-1 px-2 fs-11px editRoIntv' data-bs-toggle='modal' data-bs-target='#tileModal' >Edit</div></div></div>"}}],initialSort:[{column:"idx",dir:"asc"}]}));return l}(e),$("#table-admin-penandaan-pagu").parent().removeClass("loading")})},apopoverTrigger()}};export default AdminPenandaanRo;