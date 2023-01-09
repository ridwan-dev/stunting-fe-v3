import { apopoverTrigger, apiMasterIntervensi } from '../../../services/api.js';

const AdminPenandaanRo = {
  /**
   * Render the page content.
   */
  render: async () => {
    mData.dataMasterIntervensi = (typeof mData.dataMasterIntervensi === "undefined") ? await apiMasterIntervensi() : mData.dataMasterIntervensi;

    return /*html*/ `
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
    </div>`;
  },

  after_render: async () => {
    async function getDataPenandaanRo(tahun) {
      try {
        let res = await fetch(config.api_url + '/renja/listro', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": tahun
          }),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        console.log(_res);
        return _res.data;
      } catch (e) {
        return false;
      }
    };

    let
      form = document.querySelector('#formsub'),
      triggerButton = document.querySelector('#subdata')
      ;



    triggerButton.onclick = async function () {
      $("#input-revisi-penandaan").removeClass("hide");
      $("#table-admin-penandaan-pagu").parent().addClass("loading");
      let subdata = form.reportValidity();
      if (subdata) {
        let thn = $("#sel_tahun").val();
        await getDataPenandaanRo(thn).then(function (data) {
          tableDataRo(data);
          $("#table-admin-penandaan-pagu").parent().removeClass("loading");
        });
      }
    }

    async function tableDataRo(tableData) {
      let intvMaster = mData.dataMasterIntervensi,
        groupByIdType = arr_groupBy(['tipe_id']),
        data_pertype = groupByIdType(intvMaster)
        ;
      const data = tableData.data,
        dataInt = () => {
          let datax = Object.values(data);
          data.sort((a, b) => a.kementerian_kode > b.kementerian_kode && 1 || -1)
          data.forEach((item, i) => {
            item.idx = i + 1;
          });
          return datax;
        };

      console.log(tableData);
      const table = new Tabulator("#table-admin-penandaan-pagu", {
        height: "515px",
        index: 'idx',
        data: dataInt(),
        layout: "fitDataStretch", //fitDataFill, fitData, fitDataTable, fitColumns, fitDataStretch
        columnHeaderVertAlign: "middle",
        dataLoader: false, //disable remote loader
        selectable: true,
        columns: [
          {
            title: "No.",
            titleDownload: "No.", vertAlign: "middle",
            field: "idx", width: 50, headerSort: false,
            visible: true, sorter: "number",
            hozAlign: "center", headerHozAlign: "center", frozen: true
          },
          {
            title: "Kementerian/Lembaga", field: "kementerian_nama",
            width: 200, variableHeight: true, headerFilter: "input",
            formatter: function (cell, formatterParams) {
              return "<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>" + cell.getValue() + "</div></div>"
            }
          },
          {
            title: "Rincian Output", field: "suboutput_nama",
            width: 350, variableHeight: true, headerFilter: "input",
            formatter: function (cell, formatterParams) {
              let
                value = cell.getValue(),
                ncode;
              if (typeof cell._cell.row.data.ro_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class="badge-left ' + c_kl + ' p-1" >' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' p-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + ' p-1">' + cell._cell.row.data.kro_id + '</span><span class="' + color_ro + ' badge-right p-1">' + cell._cell.row.data.ro_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kementerian_kode !== 'undefined') {
                ncode = '<div class="badge  ' + c_main + '" ><span class="badge-main ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kro_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '" ><span class="badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' p-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + ' badge-right p-1">' + cell._cell.row.data.kro_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kegiatan_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class="badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' p-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' badge-right p-1">' + cell._cell.row.data.kegiatan_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.program_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class="badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' badge-right p-1">' + cell._cell.row.data.program_id + '</span></div>';
              }
              ncode = '<div class="badge ' + c_main + '">' +
                '<span class="badge-left ' + c_kl + ' p-1" title="K/L : ' + cell._cell.row.data.kementerian_nama.trim() + '"  data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Renja K/L : Rp. 3.422.951.172.00"">' + cell._cell.row.data.kementerian_kode + '</span>' +
                '<span class="' + c_prog + ' p-1" title="Program : ' + cell._cell.row.data.program_nama.trim() + '">' + cell._cell.row.data.program_kode + '</span>' +
                '<span class="' + c_keg + ' p-1" title="Kegiatan : ' + cell._cell.row.data.kegiatan_nama.trim() + '">' + cell._cell.row.data.kegiatan_kode + '</span>' +
                '<span class="' + c_kro + ' p-1" title="KRO : ' + cell._cell.row.data.output_nama.trim() + '">' + cell._cell.row.data.output_kode + '</span>' +
                '<span class="' + color_ro + ' badge-right p-1" title="RO : ' + cell._cell.row.data.suboutput_nama.trim() + '">' + cell._cell.row.data.suboutput_kode + '</span></div>';
              return /*html*/`
              <div class="d-flex flex-row bd-highlight">
              <div class="bd-highlight">${ncode}</div>
              <div class="bd-highlight text-wrap">${cell._cell.row.data.suboutput_nama}</div>
              </div>
              `
            }
          },
          {
            title: "Intervensi", field: "tipe_nama",
            width: 100, variableHeight: true, headerFilter: "input",
            formatter: function (cell, formatterParams) {
              return "<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>" + cell.getValue() + "</div></div>"
            }
          },
          {
            title: "Kelompok Intervensi", field: "intervensi_nama",
            width: 10, variableHeight: true, headerFilter: "input",
            cellClick: function (e, cell) {
              let popupIntv;
              console.log(cell._cell.row.data);
              $("#titleInv").html("Edit Intervensi RO " + cell._cell.row.data.suboutput_nama);

              if (cell._cell.row.data.tipe_nama === null) {
                popupIntv = /*html*/`
              <div action="${window.location.href}" id="formIntv">
								<fieldset>
                  <div class="mb-3">
                    <input type="hidden" value="${cell._cell.row.data.idro}" name="ro_id" id="ro_id" required>
                    <input type="hidden" value="${cell._cell.row.data.thang}" name="thang" id="thang" required>
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
              `;
              } else {
                let gIntv = cell._cell.row.data.tipe_nama,
                  codeInt = gIntv === "Spesifik" ? 1 : (gIntv === "Sensitif" ? 2 : 3),
                  optn = []
                  ;

                data_pertype[codeInt].forEach((a) => {
                  optn.push(/*html*/`
                  <option value="${a.intervensi_kode}" ${cell._cell.row.data.intervensi_nama == a.intervensi_nama ? "selected='selected'" : ""}>${a.intervensi_kode + "-" + a.intervensi_nama}</option>
                  `);
                });
                let optionv = ["<option value='' >Pilih</option>"].concat(optn);

                popupIntv = /*html*/`
              <div action="${window.location.href}" id="formIntv">
								<fieldset>
                  <div class="mb-3">
                    <input type="hidden" value="${cell._cell.row.data.idro}" name="ro_id" id="ro_id" required>
                    <input type="hidden" value="${cell._cell.row.data.thang}" name="thang" id="thang" required>
										<label class="form-label" for="grInt">Group Intevensi</label>
										<select class="form-select" id="grIntMaster"  required>
                      <option value="" >Pilih</option>
                      <option value="1-Spesifik"  ${gIntv == "Spesifik" ? "selected='selected'" : ""}>Spesifik</option>
                      <option value="2-Sensitif"  ${gIntv == "Sensitif" ? "selected='selected'" : ""}>Sensitif</option>
                      <option value="3-Dukungan"  ${gIntv == "Dukungan" ? "selected='selected'" : ""}>Dukungan</option>
                    </select>
									</div>
									<div class="mb-3" id="intMaster">
										<label class="form-label" for="deskInt">Intervensi</label>
										<select class="form-select" id="selectIntMaster" required>
                      ${optionv.join("")}
                    </select>
									</div>
                  <button type="submit" class="btn btn-primary w-100px me-5px" id="submitIntv">Submit</button>
									<div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
								</fieldset>
							</div>
              `;
              }
              $("#viewData").html(popupIntv);
              /* 1.Spesifik 2.Sensitif 3.Dukungan  */
              $("#grIntMaster").on("change", function () {
                let grp = $(this).val(),
                  grpSplit = grp.split("-"),
                  opt = [];
                grp === "" ? $("#intMaster").addClass("hide") : $("#intMaster").removeClass("hide")
                data_pertype[grpSplit[0]].forEach((a) => {
                  opt.push(/*html*/`
                  <option value="${a.intervensi_kode}">${a.intervensi_kode + "-" + a.intervensi_nama}</option>
                  `);
                });
                let optionv = ["<option value='' >Pilih</option>"].concat(opt);
                $("#intMaster select").html(optionv.join(""));
              });
              document.querySelector('#submitIntv').addEventListener('click', (event) => {
                const form = document.querySelector("#formIntv");
                if (form) {
                  const fields = ["ro_id", "thang", "grIntMaster", "selectIntMaster"];
                  validateonSubmitFormIntv(form, fields);
                }
              });
            },
            formatter: function (cell, formatterParams) {
              console.log(cell._cell.row.data);
              let conten = (cell.getValue() === null) ? "belum ditentukan" : "<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'>" + cell._cell.row.data.kode_intervensi + " - </div><div class='bd-highlight text-wrap'>" + cell.getValue() + "</div></div>",
                btn = "<div class='btn btn-primary my-1 py-1 px-2 fs-11px editRoIntv' data-bs-toggle='modal' data-bs-target='#tileModal' >Edit</div>";
              return "<div class='d-flex justify-content-between'> <div class='bd-highlight pe-1 name_intv' >" + conten + "</div><div class='bd-highlight text-wrap'>" + btn + "</div></div>"
            }
          }
        ],
        initialSort: [
          { column: "idx", dir: "asc" }
        ],

      });

      /* var mysum = function (values, data, calcParams) {
        var calc = 0;
        table && values.forEach(function (value, index) {
          var row = table.getRow(index + 1);
          var cell = row.getCell("name").getValue();

          //console.log(index+" - "+value);
          //console.log(row.isSelected());
          //console.log( !isNaN(value));
          //console.log((row.isSelected()) && ( !isNaN(value)));
          // console.log("cell: "+cell);
          //console.log(row.isSelected());
          if (row.isSelected() && value) {
            calc = calc + value;
            //console.log("pocitame "+value);
          }
        });
        if (calc == 0) {
          calc = ""
        }
        return calc;
      } */

      async function validateonSubmitFormIntv(form, fields) {
        var error = 0;
        fields.forEach((field) => {
          const input = document.querySelector(`#${field}`);
          if (validateFields(input) == false) {
            error++;
          }
        });
        console.log("error", error);
        if (error > 0) {
          return false;
        } else {
          let
            e = document.querySelector("#selectIntMaster"),
            dataX = {
              kode_intervensi: e.value,
              id_ro: document.querySelector("#ro_id").value,
              tahun: document.querySelector("#thang").value
            }
          try {
            let res = await fetch(config.api_url + '/renja/rointervensi', {
              method: 'POST',
              body: JSON.stringify(dataX),
              headers: config.fetchHeaders
            });
            let _res = await res.json();
            $('#tileModal').modal('hide');
            if (_res.status) {
              $(".tabulator-selected").find(".name_intv").html(e.options[e.selectedIndex].text);
              $(".tabulator-selected").removeClass("tabulator-selected");
              swal({
                title: 'Data tersimpan',
                text: ' ',
                icon: 'success',
                buttons: {
                  confirm: {
                    text: 'Tutup',
                    value: true,
                    visible: true,
                    className: 'btn btn-success',
                    closeModal: true,
                  }
                }
              });
            }

            return _res.data;
          } catch (e) {
            return false;
          }
        }
      }
      return table;
    }
    apopoverTrigger();
  }
};
export default AdminPenandaanRo;