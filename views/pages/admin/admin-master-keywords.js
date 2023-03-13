import{apopoverTrigger}from"../../../services/api.js";const AdminKeywords={render:async()=>`
    <style>
      .swal-text {
          color: red !important;
          padding-top: 0.5em !important;
          font-size: 1.5rem !important;
      }
    </style>
    <div class="app-content-padding flex-grow-1 overflow-auto admin-cover" data-height="100%">
      <h2 class="page-header text-blue">
        <i class="material-icons text-blue-600 align-middle me-1 mb-1">check_circle3</i>Administrasi Master RO Keywords
      </h2>
      
      <form class=" " id="formsub">          
        <div class="row pt-3 mx-0 mb-3 py-3 bg-gray-300 rounded" >        
        <div class="col-xl-3">          
        </div>
        <div class="col-xl-4">          
        </div>
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
      
      <form class="hide" id="input-revisi-penandaan">              
        <div class="row mt-3" >	
          <div class="col-xl-12 ">
            <div class="card">
              <div class="card-body">
                <div class="text-end mb-3">
                  <div class="btn btn-success" id="addKeyword" data-bs-toggle="modal" data-bs-target="#tileModal">Tambah Kata Kunci</div>
                </div>
                <div class="" id="table-admin-penandaan-pagu"></div>
                <div class="d-flex justify-content-start bd-highlight mt-3 hide" id="elemen_update">

                  
                </div>
              </div>      
            </div>      
          </div>      
        </div>
        <div class="row mt-3" >	
          <div class="col-xl-3">
            <div class="form-group  width-full">
            </div>
          </div>
        </div>
      </form> 
      <!---
        <form id="datax"> 
        </form> 
      -->
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
    </div>`,after_render:async()=>{"undefined"!=typeof user&&user.role_permissions.forEach(e=>{"administrator"==e.name?$("#elemen_update").html(`
          <div class="bd-highlight menu-icon btn btn-primary" title="klik untuk perbarui filter kata kunci pada Rincian Output" id="synch_keyword">
            <i class="fas fa-sync fs-20px p-1"></i>
          </div>

          <div class="bd-highlight ms-2">
            Rincian Output Diperbarui tanggal <br><span class="h6" id="update_synch">11/12/2022</span>
          </div>
        `):$("#elemen_update").html(`
          <div class="bd-highlight ms-2">
            Rincian Output Diperbarui tanggal <br><span class="h6" id="update_synch">11/12/2022</span>
          </div>
          `)});var e=`
                <div action="${window.location.href}" id="formInput">
                  <fieldset>
                    <div class="mb-3" id="intMaster">
                      <label class="form-label" for="deskInt">Kata Kunci</label>
                      <input type="text" class="form-control" id="keyword" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100px me-5px" id="submitAdd">Submit</button>
                    <div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
                  </fieldset>
                </div>
                `;$("#viewData").html(e),$("#titleInv").html("Tambah Kata Kunci"),$("#addKeyword").on("click",function(){$("#titleInv").html("Tambah Kata Kunci"),$("#keyword").val(" "),$("#id").remove()});let t=document.querySelector("#submitAdd");function a(){var e={keyword:document.querySelector("#keyword").value,tahun:document.querySelector("#sel_tahun").value},t=0;return["sel_tahun","keyword"].forEach(e=>{e=document.querySelector("#"+e);0==validateFields(e)&&t++}),!(0<t)&&s(e)}async function i(t){try{let e=await fetch(config.api_url+"/renja/listrokeyword",{method:"POST",body:JSON.stringify({tahun:t}),headers:config.fetchHeaders});return await e.json()}catch(e){return!1}}t.onclick=async function(){a()};let d=document.querySelector("#formsub"),l=document.querySelector("#subdata");async function n(e){const t=e.data[0];return new Tabulator("#table-admin-penandaan-pagu",{height:"515px",index:"idx",data:(e=Object.values(t),t.sort((e,t)=>e.kementerian_kode>t.kementerian_kode?1:-1),t.forEach((e,t)=>{e.idx=t+1}),e),layout:"fitDataStretch",columnHeaderVertAlign:"middle",dataLoader:!1,selectable:!0,columns:[{title:"No.",titleDownload:"No.",vertAlign:"middle",field:"idx",width:50,headerSort:!1,visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"Kata Kunci",field:"keyword",width:475,variableHeight:!0,headerFilter:"input",formatter:function(e,t){return"<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>"+e.getValue()+"</div></div>"}},{title:"Dibuat",field:"created_at",width:100,variableHeight:!0,formatter:function(e,t){return"<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>"+e.getValue().split("T")[0]+"</div></div>"}},{title:"Diubah",field:"updated_at",width:100,variableHeight:!0,formatter:function(e,t){return"<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>"+e.getValue().split("T")[0]+"</div></div>"}},{title:"#",field:"id",variableHeight:!0,cellClick:function(e,t){console.log(t._cell.row.data),swal({title:"Apakah anda ingin hapus Kata Kunci tersebut?",text:t._cell.row.data.keyword,icon:"info",buttons:{confirm:{text:"Hapus",value:!0,visible:!0,className:"btn btn-danger",closeModal:!0},cancel:{text:"Cancel",value:null,visible:!0,className:"btn btn-default",closeModal:!0}}}).then(e=>{if(e)return s({id:t.getValue(),keyword:t._cell.row.data.keyword,tahun:document.querySelector("#sel_tahun").value,delete:1})})},formatter:function(e,t){return"<div class='d-flex justify-content-between'> <div class='bd-highlight text-wrap'><div class='btn btn-danger my-1 py-1 px-2 fs-11px me-1'   >Delete</div></div></div>"}},{title:"#",field:"id",variableHeight:!0,cellClick:function(e,t){$("#titleInv").html("Edit Kata Kunci"),t=`
              <div action="${window.location.href}" id="formInput">
								<fieldset>
                  <div class="mb-3">
                    <input type="hidden" value="${t._cell.row.data.id}" name="id" id="id" required>
                  </div>
									<div class="mb-3" id="intMaster">
										<label class="form-label" for="deskInt">Kata Kunci</label>
										<input type="text" class="form-control" id="keyword" value="${t._cell.row.data.keyword}" required>
                  </div>
                  <button type="submit" class="btn btn-primary w-100px me-5px" id="submitIntv">Submit</button>
									<div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
								</fieldset>
							</div>
              `,$("#viewData").html(t),document.querySelector("#submitIntv").addEventListener("click",e=>{var t=document.querySelector("#formInput");t&&(document.querySelector("#id")||a(),async function(e){var t=0;return e.forEach(e=>{e=document.querySelector("#"+e);0==validateFields(e)&&t++}),!(0<t)&&s({id:document.querySelector("#id").value,keyword:document.querySelector("#keyword").value,tahun:document.querySelector("#sel_tahun").value})}(["id","sel_tahun","keyword"]))})},formatter:function(e,t){return"<div class='d-flex justify-content-between'> <div class='bd-highlight text-wrap'><div class='btn btn-primary my-1 py-1 px-2 fs-11px editRoIntv' data-bs-toggle='modal' data-bs-target='#tileModal' >Edit</div></div></div>"}}],initialSort:[{column:"idx",dir:"asc"}]})}async function s(t){$("#table-admin-penandaan-pagu").parent().addClass("loading");try{let e=await fetch(config.api_url+"/renja/rokeyword",{method:"POST",body:JSON.stringify(t),headers:config.fetchHeaders});(await e.json()).status?(await i(t.tahun).then(function(e){n(e),$("#table-admin-penandaan-pagu").parent().removeClass("loading")}),$("#keyword").val(" "),t.id&&$("#tileModal").modal("hide")):swal({title:"Terjadi kesalahan harap dicoba kembali",text:"",icon:"danger",button:"Tutup"})}catch(e){return!1}}l.onclick=async function(){$("#input-revisi-penandaan").removeClass("hide"),$("#table-admin-penandaan-pagu").parent().addClass("loading"),d.reportValidity()&&await i($("#sel_tahun").val()).then(function(e){n(e),$("#table-admin-penandaan-pagu").parent().removeClass("loading"),$("#elemen_update").removeClass("hide");let t=e.data.updated_at.split("T"),a=t[0].split("-"),i=a[2]+"/"+a[1]+"/"+a[0];$("#update_synch").html(i)})},$("#synch_keyword").on("click",async function(){$(this).find("i").addClass("fa-spin");try{let e=await fetch(config.api_url+"/renja/keyword-reload",{method:"GET",headers:config.fetchHeaders}),i=await e.json();if(console.log(i),$(this).find("i").removeClass("fa-spin"),i.status){swal({title:"Rincian Output telah diperbarui",text:" ",icon:"success",buttons:{confirm:{text:"Tutup",value:!0,visible:!0,className:"btn btn-success",closeModal:!0}}});let e=i.data.updated_at.split("T"),t=e[0].split("-"),a=t[2]+"/"+t[1]+"/"+t[0];$("#update_synch").html(a)}}catch(e){return!1}}),apopoverTrigger()}};export default AdminKeywords;