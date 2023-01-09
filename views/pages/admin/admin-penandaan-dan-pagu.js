import{apopoverTrigger,datePicker}from"../../../services/api.js";const AdminPenandaanDanPagu={render:async()=>`
    <style>
      .tabulator-row.tabulator-selected {
          background-color: inherit !important;
      }
      .form-switch #offSwitch:checked {
          background-color: #e23b2d !important;
      }
    </style>
    <div class="app-content-padding flex-grow-1 overflow-auto admin-cover" data-height="100%">
      <h2 class="page-header text-blue">
        <i class="material-icons text-blue-600 align-middle me-1 mb-1">check_circle3</i>Administrasi Penandaan Dan Pagu
      </h2>      
      <form class=" " id="formsub">          
        <div class="row pt-3 mx-0 mb-3 py-3 bg-gray-300 rounded" >
          <div class="col-xl-3 ">          
            <div class="form-group sel_tax">                  
              <select id="sel_tahun" name="sel_tahun" class="form-control" required>
                <option value="">Pilih Tahun</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
          <div class="col-xl-3">
            <div class="form-group sel_kl">
              <select id="sel_sm" name="sel_sm" class="form-control" required>
                <option value="">Pilih Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
              </select>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="form-group sel_kl">
              <select id="sel_rev" name="sel_rev" class="form-control" required>
                <option value="">Pilih Kesepakatan</option>
                <option value="1">Kesepakatan 1</option>
                <option value="2">Kesepakatan 2</option>
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
        <div id="revisi-penandaan">	
          <form class="hide" id="input-revisi-penandaan">	
            <div class="row" >	
              <div class="col-xl-5">
                <div class="d-flex flex-row bd-highlight">
                  <div class="h6 bd-highlight w-50 ">Tanggal Kesepakatan <span id="rev-ke"></span></div>
                  <div class="bd-highlight"></div>
                  <div class="input-group date bd-highlight mb-0" data-render="datepicker" data-date-format="dd-mm-yyyy" data-date-start-date="Date.default">
                    <input type="text" class="form-control" value="" placeholder="Today's" id="date_today" required>
                    <span class="input-group-text input-group-addon border-0">
                      <i class="material-icons">event</i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row pt-3" >	
              <div class="col-xl-4">
                <div class="d-flex flex-row bd-highlight">
                  <div class="h6 bd-highlight w-50 ">Publish Semua <span id="rev-ke"></span></div>
                  <div class="bd-highlight"></div>
                  <div class="bd-highlight form-check form-switch ms-3"><input class="form-check-input" type="checkbox" id="allSwitch"></div>
                </div>
              </div>
            </div>
            <div class="row pt-3" >
              <div class="col-xl-4">
                <div class="d-flex flex-row bd-highlight">
                  <div class="h6 bd-highlight w-50 ">Unpublish Semua <span id="rev-ke"></span></div>
                  <div class="bd-highlight"></div>
                  <div class="bd-highlight form-check form-switch ms-3"><input class="form-check-input" type="checkbox" id="offSwitch"></div>
                </div>
              </div>
            </div>         
            <div class="row mt-3" >	
              <div class="col-xl-12 ">
                <div class="card">
                  <div class="card-body">
                    <div class="" id="table-admin-penandaan-pagu"></div>      
                  </div>      
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
              <div class="modal-body" id="viewData">
              </div>			
            </div>
          </div>
        </div>      
      </div>`,after_render:async()=>{let a=document.querySelector("#formsub"),e=document.querySelector("#subdata");e.onclick=async function(){if($(".form-switch input").prop("checked",!1),$("#revisi-penandaan").addClass("loading"),a.reportValidity()){let a=$("#sel_tahun").val(),e=$("#sel_sm").val(),l=$("#sel_rev").val();await async function(e,l,t){try{let a=await fetch(config.api_url+"/pp/ro-penandaan",{method:"POST",body:JSON.stringify({tahun:e,semester:l,kesepakatan:t}),headers:config.fetchHeaders});var i=await a.json();return mData.Kesepakatan=i.data,i.data}catch(a){return!1}}(a,e,l).then(function(a){$("#input-revisi-penandaan").removeClass("hide"),async function(a,o){$("#rev-ke").html(o);a=new Tabulator("#table-admin-penandaan-pagu",{height:"515px",data:a,index:"id",layout:"fitDataStretch",columnHeaderVertAlign:"middle",selectable:!0,dataLoader:!1,movableColumns:!0,columns:[{title:"No",field:"id",visible:!0,sorter:"number",hozAlign:"center",headerHozAlign:"center",frozen:!0},{title:"Publish",field:"publish",variableHeight:!0,frozen:!0,formatter:function(a,e){return'  <div class="form-check form-switch text-center  ms-3 mt-2"><input class="form-check-input swictPublish"  type="checkbox" ro_id="'+a._cell.row.data.kode+'"  '+(1==a.getValue()?"checked='checked'":"")+"></div>"}},{title:"Kementerian/Lembaga",field:"kementerian_nama",width:100,variableHeight:!0,headerFilter:"input",frozen:!0,formatter:function(a,e){return"<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>"+a.getValue()+"</div></div>"}},{title:"Rincian Output",field:"suboutput_nama",width:400,variableHeight:!0,headerFilter:"input",frozen:!0,formatter:function(a,e){a.getValue();let l;return void 0!==a._cell.row.data.ro_id?l='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1" >'+a._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' p-1">'+a._cell.row.data.kro_id+'</span><span class="'+color_ro+' badge-right p-1">'+a._cell.row.data.ro_id+"</span></div>":void 0!==a._cell.row.data.kementerian_kode?l='<div class="badge  '+c_main+'" ><span class="badge-main '+c_kl+' p-1">'+a._cell.row.data.kl_id+"</span></div>":void 0!==a._cell.row.data.kro_id?l='<div class="badge '+c_main+'" ><span class="badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' p-1">'+a._cell.row.data.kegiatan_id+'</span><span class="'+c_kro+' badge-right p-1">'+a._cell.row.data.kro_id+"</span></div>":void 0!==a._cell.row.data.kegiatan_id?l='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_prog+' p-1">'+a._cell.row.data.program_id+'</span><span class="'+c_keg+' badge-right p-1">'+a._cell.row.data.kegiatan_id+"</span></div>":void 0!==a._cell.row.data.program_id&&(l='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1">'+a._cell.row.data.kl_id+'</span><span class="'+c_prog+' badge-right p-1">'+a._cell.row.data.program_id+"</span></div>"),`
              <div class="d-flex flex-row bd-highlight">
              <div class="bd-highlight">${l='<div class="badge '+c_main+'"><span class="badge-left '+c_kl+' p-1" title="K/L : '+a._cell.row.data.kementerian_nama.trim()+'"  data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Renja K/L : Rp. 3.422.951.172.00"">'+a._cell.row.data.kementerian_kode+'</span><span class="'+c_prog+' p-1" title="Program : '+a._cell.row.data.program_nama.trim()+'">'+a._cell.row.data.program_kode+'</span><span class="'+c_keg+' p-1" title="Kegiatan : '+a._cell.row.data.kegiatan_nama.trim()+'">'+a._cell.row.data.kegiatan_kode+'</span><span class="'+c_kro+' p-1" title="KRO : '+a._cell.row.data.output_nama.trim()+'">'+a._cell.row.data.output_kode+'</span><span class="'+color_ro+' badge-right p-1" title="RO : '+a._cell.row.data.suboutput_nama.trim()+'">'+a._cell.row.data.suboutput_kode+"</span></div>"}</div>
              <div class="bd-highlight text-wrap">${a._cell.row.data.suboutput_nama}</div>
              </div>
              `}},{title:"Alokasi <br>RENJA-KL",titleDownload:"Renja KL",accessorDownload:numberIDRDownload,field:"alokasi_0",formatter:function(a,e){return formatNumber(Number(1e3*a.getValue()),2)},sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalcFormatter:"money",bottomCalc:function(a){let e=0;for(var l of a)e+=Number(l);return 1e3*e}},{title:"Alokasi <br>RKAKL",titleDownload:"RKAKL",field:"alokasi_2",formatter:function(a,e){return formatNumber(Number(1e3*a.getValue()),2)},accessorDownload:numberIDRDownload,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalcFormatter:"money",bottomCalc:function(a){let e=0;for(var l of a)e+=Number(l);return 1e3*e}},{title:"Analisis <br>Lanjutan",titleDownload:"Analisis Lanjutan",field:"anl_alokasi",formatter:function(a,e){return formatNumber(Number(1e3*a.getValue()),2)},accessorDownload:numberIDRDownload,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalcFormatter:"money",bottomCalc:function(a){let e=0;for(var l of a)e+=Number(l);return 1e3*e}},{title:"Kesepakatan "+o+" <br> Alokasi di Tingkat RO ",titleDownload:"Kesepakatan "+o,field:"tingkat_ro",formatter:function(a,e){a=null===a.getValue()||0===a.getValue()?"":a.getValue();return"<div class='d-flex flex-row-reverse bd-highlight'> <div class='bd-highlight text-wrap f_tingkat_ro'>"+formatNumber(a,2)+"</div></div>"},accessorDownload:numberIDRDownload,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"Kesepakatan "+o+" <br> Analisis Lanjutan ",titleDownload:"Kesepakatan "+o,field:"analisis_lanjutan",formatter:function(a,e){a=null===a.getValue()||0===a.getValue()?"":a.getValue();return"<div class='d-flex flex-row-reverse bd-highlight'> <div class='bd-highlight text-wrap f_analisis_lanjutan'>"+formatNumber(a,2)+"</div></div>"},accessorDownload:numberIDRDownload,sorter:"number",headerHozAlign:"center",hozAlign:"right",bottomCalc:"sum",bottomCalcFormatter:"money",bottomCalcFormatterParams:{decimal:",",thousand:".",symbol:"",symbolAfter:"",precision:2}},{title:"#",width:70,variableHeight:!0,cellClick:function(a,e){if(""===document.querySelector("#date_today").value)return alert("Tanggal Kesepakatan harus diisi"),!1;let l,t=null==e._cell.row.data.tgl_kesepakatan?$("#date_today").val():e._cell.row.data.tgl_kesepakatan,i=t.split(" ");l=null!==e._cell.row.data.analisis_lanjutan&&null!==e._cell.row.data.tingkat_ro||null!==e._cell.row.data.publish&&0!==e._cell.row.data.publish?"Edit RO ":"Add RO ",$("#titleInv").html(l+e._cell.row.data.suboutput_nama),$("#viewData").html(`
              <form id="formKesepakatan" data-parsley-validate="true">
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Tanggal Kesepakatan</label>
									<div class="col-lg-8">
                    <input type="hidden" id="id_ro" name="id_ro" value="${e._cell.row.data.kode}" required>
                    <div class="">: ${i[0]} </div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Kementerian Lembaga</label>
									<div class="col-lg-8">
										<div class="">: ${e._cell.row.data.kementerian_kode} - ${e._cell.row.data.kementerian_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Program</label>
									<div class="col-lg-8">
										<div class="">: ${e._cell.row.data.program_kode} - ${e._cell.row.data.program_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Kegiatan</label>
									<div class="col-lg-8">
										<div class="">: ${e._cell.row.data.kegiatan_kode} - ${e._cell.row.data.kegiatan_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">KRO</label>
									<div class="col-lg-8">
										<div class="">: ${e._cell.row.data.output_kode} - ${e._cell.row.data.output_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">RO</label>
									<div class="col-lg-8">
										<div class="">: ${e._cell.row.data.suboutput_kode} - ${e._cell.row.data.suboutput_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Alokasi Renja K/L</label>
									<div class="col-lg-8">
										<div class="">: Rp. ${formatNumber(Number(1e3*e._cell.row.data.alokasi_0),2)}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Alokasi RKAKL</label>
									<div class="col-lg-8">
										<div class="">: Rp. ${formatNumber(Number(1e3*e._cell.row.data.alokasi_2),2)}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Analisis Lanjutan</label>
									<div class="col-lg-8">
										<div class="">: Rp. ${formatNumber(Number(1e3*e._cell.row.data.anl_alokasi),2)}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Kesepakatan ${o} Alokasi di Tingkat RO <span class="text-danger">*</span></label>
									<div class="col-lg-8">
										<input class="form-control input-price" type="number" id="alokasi_ro" name="alokasi_ro" value="${null===e._cell.row.data.tingkat_ro?"":e._cell.row.data.tingkat_ro}" data-parsley-type="digits" placeholder="" data-parsley-required="true" required>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Kesepakatan ${o} Analisis Lanjutan <span class="text-danger">*</span></label>
									<div class="col-lg-8">
										<input class="form-control input-price" type="number" id="analisis_lanjutan" name="analisis_lanjutan" value="${null===e._cell.row.data.analisis_lanjutan?"":e._cell.row.data.analisis_lanjutan}" data-parsley-type="digits" placeholder="" data-parsley-required="true" required>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Publish</label>
									<div class="col-lg-8">
										<div class="bd-highlight form-check form-switch"><input class="form-check-input" id="publish" type="checkbox" ${1==e._cell.row.data.publish?"checked='checked'":""} ></div>
									</div>
								</div>
                <div class="btn btn-primary w-100px me-5px" id="submitKesepakatan">Submit</div>
								<button class="btn btn-default w-100px" data-bs-dismiss="modal" aria-hidden="true">Cancel</button>
							</form>
              `),document.querySelector("#submitKesepakatan").addEventListener("click",a=>{var e=document.querySelector("#formKesepakatan");""===document.querySelector("#date_today").value?alert("Tanggal harus diisi"):e&&async function(l){var e=0;{if(l.forEach(a=>{a=document.querySelector("#"+a);0==s(a)&&e++}),0<e)return;{let e;e=1==$("#formKesepakatan").find("#publish").prop("checked")?1:0;l={id_ro:document.querySelector("#id_ro").value,kesepakatan:document.querySelector("#sel_rev").value,semester:document.querySelector("#sel_sm").value,tgl_kesepakatan:document.querySelector("#date_today").value,tingkat_ro:document.querySelector("#alokasi_ro").value,analisis_lanjutan:document.querySelector("#analisis_lanjutan").value,publish:e,tahun:document.querySelector("#sel_tahun").value};try{let a=await fetch(config.api_url+"/pp/ro-penandaan-kesepakatan",{method:"POST",body:JSON.stringify(l),headers:config.fetchHeaders});var t=await a.json();return $("#tileModal").modal("hide"),t.status&&(1==e?$(".select_row").find(".swictPublish").attr("checked","checked"):$(".select_row").find(".swictPublish").removeAttr("checked"),$(".select_row").find(".f_tingkat_ro").html("0"===l.tingkat_ro||null===l.tingkat_ro?"":formatNumber(Number(l.tingkat_ro),2)),$(".select_row").find(".f_analisis_lanjutan").html("0"===l.analisis_lanjutan||null===l.analisis_lanjutan?"":formatNumber(Number(l.analisis_lanjutan),2)),$(".select_row").removeClass("select_row"),swal({title:"Data tersimpan",text:" ",icon:"success",buttons:{confirm:{text:"Tutup",value:!0,visible:!0,className:"btn btn-success",closeModal:!0}}})),t.data}catch(a){return}}}}(["alokasi_ro","analisis_lanjutan"])})},formatter:function(a,e){return"<div class='bd-highlight text-wrap'><div class='btn btn-primary my-1 py-1 px-2 fs-11px editRoIntv' data-bs-toggle='modal' data-bs-target='#tileModal' >Edit</div></div></div>"}}],initialSort:[{column:"id",dir:"asc"}]});return a}(a,l),$("#revisi-penandaan").removeClass("loading")})}};const s=a=>""!==a.value.trim();let l=new Date,t=String(l.getDate()).padStart(2,"0"),i=String(l.getMonth()+1).padStart(2,"0"),o=l.getFullYear();async function r(e,l,a){let t=a,i,o,s,r=$("#sel_tahun").val(),d=$("#sel_sm").val(),c=$("#sel_rev").val(),u=$("#date_today").val(),n="Anda ingin data tersebut";s=1==e.prop("checked")?(t=1,i=" ditampilkan ",o="Publish","btn btn-primary"):(t=0,i=" tidak ditampilkan ",o="UnPublish","btn btn-danger"),0==a&&(n="Anda ingin semua data ",i=" tidak ditampilkan ",o="UnPublish",s="btn btn-danger"),1==a&&(n="Anda ingin semua data "),1<l.length&&(t=a),swal({title:n+i+"?",text:"Kesepakatan Alokasi ditingkat RO dan Kesepakatan Analisis Lanjutan!",icon:"info",buttons:{confirm:{text:o,value:!0,visible:!0,className:s,closeModal:!0},cancel:{text:"Cancel",value:null,visible:!0,className:"btn btn-default",closeModal:!0}}}).then(a=>{if(a)return async function(){var e={semester:d,kesepakatan:c,tahun:r,kode_ro:l,tgl_kesepakatan:u,publish:t};try{let a=await fetch(config.api_url+"/pp/ro-kesepakatan-publish",{method:"POST",body:JSON.stringify(e),headers:config.fetchHeaders});(await a.json()).status?(swal({title:"Data"+i+"?",text:"Kesepakatan Alokasi ditingkat RO dan Kesepakatan Analisis Lanjutan!",icon:"success",button:"Tutup"}),console.log("kode_ro.length",l.length),1<l.length&&(1==t?$(".swictPublish").prop("checked",!0):$(".swictPublish").prop("checked",!1))):swal({title:"Terjadi kesalahan harap dicoba kembali",text:"",icon:"danger",button:"Tutup"})}catch(a){return!1}}();1==t?$(e).prop("checked",!1):$(e).prop("checked",!0)})}l=o+"-"+i+"-"+t,document.querySelector("#date_today").value=l,$(document).on("change","#allSwitch",async function(){let a=$(this),e=[];mData.Kesepakatan.forEach(a=>{e.push(a.kode)}),r(a,e,1),$("#offSwitch").prop("checked",!1)}),$(document).on("change","#offSwitch",async function(){let a=$(this),e=[];mData.Kesepakatan.forEach(a=>{e.push(a.kode)}),r(a,e,0),$("#allSwitch").prop("checked",!1)}),$(document).on("change","input.swictPublish",async function(){let a=$(this),e=[a.attr("ro_id")];r(a,e)}),$(document).on("click","div [data-bs-target='#tileModal']",function(){$(this).parent().parent().parent().addClass("select_row")}),apopoverTrigger(),datePicker()}};export default AdminPenandaanDanPagu;