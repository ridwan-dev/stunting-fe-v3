import{apopoverTrigger,apiMasterIntervensi}from"../../../services/api.js";const AdminPenandaanDanPagu={render:async()=>(mData.dataMasterIntervensi=void 0===mData.dataMasterIntervensi?await apiMasterIntervensi():mData.dataMasterIntervensi,`
    <div class="app-content-padding flex-grow-1 overflow-auto admin-cover" data-height="100%">
      <h2 class="page-header text-blue">
        <i class="material-icons text-blue-600 align-middle me-1 mb-1">account_tree</i>Master Intervensi
      </h2>
      
      <form class=" " id="dataIntev">          
        <div class="row pt-3 mx-0 mb-3 py-3  rounded" >
          <div class="col-xl-12 ">          
            <div class="text-end mb-3"><div class="btn btn-success" id="addIntv" data-bs-toggle="modal" data-bs-target="#tileModal">Tambah Intervensi</div></div>
            <div id="intervensi-table"></div>
          </div>          
        </div>          
      </form>
      
      <div class="modal fade" id="tileModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content" style="width: 58em;margin-left: -13em;">  
            <div class="modal-header bg-gray-300">
              <h4 class="modal-title" id="titleInv"></h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body" id="viewData">
            </div>			
          </div>
        </div>
      </div>
            
    </div>`),after_render:async()=>{async function a(e,t,a){var i=0;if(t.forEach(e=>{e=document.querySelector("#"+e);0==validateFields(e)&&i++}),console.log("error",i),0<i)return!1;{let e=document.querySelector("#grInt").value.split("-"),t;t="edit"===a?{tipe_id:e[0],id:document.querySelector("#idInt").value,intervensi_kode:document.querySelector("#kodeInt").value,intervensi_nama:document.querySelector("#namaInt").value,intervensi_nama_alias:document.querySelector("#aliasInt").value,deskripsi:document.querySelector("#deskInt").value}:{tipe_id:e[0],intervensi_kode:document.querySelector("#kodeInt").value,intervensi_nama:document.querySelector("#namaInt").value,intervensi_nama_alias:document.querySelector("#aliasInt").value,deskripsi:document.querySelector("#deskInt").value};try{let e=await fetch(config.api_url+"/data/intervensipost",{method:"POST",body:JSON.stringify(t),headers:config.fetchHeaders});await e.json();swalPopup("Data Tersimpan"),delete mData.dataMasterIntervensi,mData.dataMasterIntervensi=void 0===mData.dataMasterIntervensi?await apiMasterIntervensi():mData.dataMasterIntervensi,l(mData.dataMasterIntervensi)}catch(e){return!1}}}async function l(e){console.log(e);var t;return new Tabulator("#intervensi-table",{height:"411px",data:(t=Object.values(e),e.sort((e,t)=>e.kementerian_kode>t.kementerian_kode?1:-1),e.forEach((e,t)=>{e.idx=t+1}),t),layout:"fitColumns",columns:[{title:"No.",titleDownload:"No.",vertAlign:"middle",field:"idx",width:70,visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"Kode Intervensi",field:"intervensi_kode",width:150,headerFilter:"input"},{title:"Kelompok Intervensi",field:"intervensi_nama",width:390,headerFilter:"input"},{title:"Alias",field:"intervensi_nama_alias",width:110,headerFilter:"input"},{title:"Deskripsi",field:"deskripsi",width:170,headerFilter:"input"},{title:"Group Intervensi",field:"tipe_nama",width:150,headerFilter:"input"},{title:"Aksi",hozAlign:"center",cellClick:function(e,t){console.log(t._cell.row.data.intervensi_nama),$("#titleInv").html("Edit Intervensi "+t._cell.row.data.intervensi_nama),$("#viewData").html(`
              <form action="${window.location.href}"  id="form-add">
            <!--  <form action="/" method="POST"> -->
								<fieldset>
                  <div class="mb-3">
                    <input class="form-control" type="hidden" value="${t._cell.row.data.id}" id="idInt" required>
                    <label class="form-label" for="grInt">Group Intevensi</label>
										<select class="form-select" id="grInt"  required>
                      <option value="" >Pilih</option>
                      <option value="1-Spesifik" ${1===t._cell.row.data.tipe_id?'selected="selected"':""} >Spesifik</option>
                      <option value="2-Sensitif" ${2===t._cell.row.data.tipe_id?'selected="selected"':""} >Sensitif</option>
                      <option value="3-Dukungan" ${3===t._cell.row.data.tipe_id?'selected="selected"':""} >Dukungan</option>
                      <option value="100-Linnya" ${100===t._cell.row.data.tipe_id?'selected="selected"':""} >Lainnya</option>
                    </select>
									</div>
									<div class="mb-3">
										<label class="form-label" for="kodeInt">Kode Intervensi</label>
										<input class="form-control" type="text" value="${t._cell.row.data.intervensi_kode}" id="kodeInt" placeholder="Kode Intervensi"  required>
									</div>
									<div class="mb-3">
										<label class="form-label" for="namaInt">Kelompok Intervensi</label>
										<input class="form-control" type="text" id="namaInt" value="${t._cell.row.data.intervensi_nama}" placeholder="Kelompok Intervensi"  required>
									</div>									
									<div class="mb-3">
										<label class="form-label" for="aliasInt">Alias</label>
										<input class="form-control" type="text" id="aliasInt" value="${t._cell.row.data.intervensi_nama_alias}" placeholder="Alias"  required>
									</div>
									<div class="mb-3">
										<label class="form-label" for="deskInt">Deskripsi</label>
										<input class="form-control" type="text" id="deskInt" value="${null===t._cell.row.data.deskripsi?"":t._cell.row.data.deskripsi}" placeholder="Deskripsi">
									</div>
                  <button type="submit" class="btn btn-primary w-100px me-5px" id="submit-intv-edit" >Submit</button>
									<div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
								</fieldset>
							</form>
              `),document.querySelector("#submit-intv-edit").addEventListener("click",e=>{var t=document.querySelector("form");t&&a(0,["idInt","grInt","kodeInt","namaInt","aliasInt","deskInt"],"edit")})},formatter:function(e,t,a){return"<div class='btn btn-primary editIntv' data-bs-toggle='modal' data-bs-target='#tileModal'>Edit</div>"}}],initialSort:[{column:"idx",dir:"asc"}]})}$("#addIntv").on("click",async function(){$("#titleInv").html("Tambah Intervensi "),$("#viewData").html(`
              <form action="${window.location.href}"  id="form-add">
								<fieldset>
                  <div class="mb-3">
										<label class="form-label" for="grInt">Group Intevensir</label>
										<select class="form-select" id="grInt" data-error="This field should not be left blank." x-moz-errormessage="This field should not be left blank." required>
                      <option value="" >Pilih</option>
                      <option value="1-Spesifik">Spesifik</option>
                      <option value="2-Sensitif" >Sensitif</option>
                      <option value="3-Dukungan" >Dukungan</option>
                      <option value="100-Linnya" >Lainnya</option>
                    </select>
									</div>
									<div class="mb-3">
										<label class="form-label" for="kodeInt">Kode Intervensi</label>
										<input class="form-control" type="text"  id="kodeInt" placeholder="Kode Intervensi" title="This field should not be left blankx." required>
									</div>
									<div class="mb-3">
										<label class="form-label" for="namaInt">Kelompok Intervensi</label>
										<input class="form-control" type="text" id="namaInt"  placeholder="kelompok Intervensi" required>
									</div>									
									<div class="mb-3">
										<label class="form-label" for="aliasInt">Alias</label>
										<input class="form-control" type="text" id="aliasInt"  placeholder="Alias" required>
									</div>
									<div class="mb-3">
										<label class="form-label" for="deskInt">Deskripsi</label>
										<input class="form-control" type="text" id="deskInt" placeholder="Deskripsi">
									</div>
                  <button type="submit" class="btn btn-primary w-100px me-5px" id="submit-intv" >Submit</button>
									<div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
								</fieldset>
							</form>
              `),document.querySelector("#submit-intv").addEventListener("click",e=>{var t=document.querySelector("form");t&&a(0,["grInt","kodeInt","namaInt","aliasInt","deskInt"],"insert")})}),l(mData.dataMasterIntervensi),apopoverTrigger()}};export default AdminPenandaanDanPagu;