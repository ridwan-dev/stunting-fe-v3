import { apopoverTrigger } from '../../../services/api.js';

const AdminKeywords = {
  /**
   * Render the page content.
   */
  render: async () => {
    return /*html*/ `
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
    </div>`;
  },

  after_render: async () => {
    if (typeof user != 'undefined') {
      user.role_permissions.forEach((row) => {
        if (row.name == "administrator") {
          $("#elemen_update").html(/*html*/`
          <div class="bd-highlight menu-icon btn btn-primary" title="klik untuk perbarui filter kata kunci pada Rincian Output" id="synch_keyword">
            <i class="fas fa-sync fs-20px p-1"></i>
          </div>

          <div class="bd-highlight ms-2">
            Rincian Output Diperbarui tanggal <br><span class="h6" id="update_synch">11/12/2022</span>
          </div>
        `);
        } else {
          $("#elemen_update").html(/*html*/`
          <div class="bd-highlight ms-2">
            Rincian Output Diperbarui tanggal <br><span class="h6" id="update_synch">11/12/2022</span>
          </div>
          `);
        }
      });
    }
    let popupTitle = "Tambah Kata Kunci",
      popupAdd = /*html*/`
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
                `;

    $("#viewData").html(popupAdd);
    $("#titleInv").html(popupTitle);

    $("#addKeyword").on("click", function () {
      let popupTitle = "Tambah Kata Kunci";
      $("#titleInv").html(popupTitle);
      $("#keyword").val(" ");
      $("#id").remove();
    });

    let
      triggerAdd = document.querySelector('#submitAdd');

    triggerAdd.onclick = async function () {
      addKeywords();
    };

    function addKeywords() {
      let data = {
        keyword: document.querySelector("#keyword").value,
        tahun: document.querySelector("#sel_tahun").value
      };
      var error = 0,
        fields = ["sel_tahun", "keyword"];

      fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (validateFields(input) == false) {
          error++;
        }
      });
      if (error > 0) {
        return false;
      } else {
        return postData(data);
      }
    }

    async function ListKeywords(tahun) {
      try {
        let res = await fetch(config.api_url + '/renja/listrokeyword', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": tahun
          }),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        return _res;
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
        await ListKeywords(thn).then(function (data) {
          tableDataRo(data);
          $("#table-admin-penandaan-pagu").parent().removeClass("loading");
          $("#elemen_update").removeClass("hide");
          let tgl = data.data.updated_at.split("T"),
            tgl_arry = tgl[0].split("-"),
            tgl_now = tgl_arry[2] + "/" + tgl_arry[1] + "/" + tgl_arry[0]
            ;
          $("#update_synch").html(tgl_now);
        });
      }
    }

    async function tableDataRo(tableData) {
      console.log(tableData);
      const data = tableData.data[0],
        dataInt = () => {
          let datax = Object.values(data);
          data.sort((a, b) => a.kementerian_kode > b.kementerian_kode && 1 || -1)
          data.forEach((item, i) => {
            item.idx = i + 1;
          });
          return datax;
        };

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
            title: "Kata Kunci", field: "keyword",
            width: 475, variableHeight: true, headerFilter: "input",
            formatter: function (cell, formatterParams) {
              return "<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>" + cell.getValue() + "</div></div>"
            }
          },
          {
            title: "Dibuat", field: "created_at",
            width: 100, variableHeight: true,
            formatter: function (cell, formatterParams) {
              let dateT = cell.getValue().split("T");
              return "<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>" + dateT[0] + "</div></div>"

            }
          },
          {
            title: "Diubah", field: "updated_at",
            width: 100, variableHeight: true,
            formatter: function (cell, formatterParams) {
              let dateT = cell.getValue().split("T");
              return "<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>" + dateT[0] + "</div></div>"
            }
          },
          {
            title: "#", field: "id",
            variableHeight: true,
            cellClick: function (e, cell) {
              console.log(cell._cell.row.data);
              swal({
                title: 'Apakah anda ingin hapus Kata Kunci tersebut?',
                text: cell._cell.row.data.keyword,
                icon: 'info',
                buttons: {
                  confirm: {
                    text: "Hapus",
                    value: true,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true
                  },
                  cancel: {
                    text: 'Cancel',
                    value: null,
                    visible: true,
                    className: 'btn btn-default',
                    closeModal: true,
                  }
                }
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result) {
                  let data = {
                    id: cell.getValue(),
                    keyword: cell._cell.row.data.keyword,
                    tahun: document.querySelector("#sel_tahun").value,
                    delete: 1
                  };
                  return postData(data);
                }
              });
            },
            formatter: function (cell, formatterParams) {
              let
                btn_delete = "<div class='btn btn-danger my-1 py-1 px-2 fs-11px me-1'   >Delete</div>";
              ;
              return "<div class='d-flex justify-content-between'> <div class='bd-highlight text-wrap'>" + btn_delete + "</div></div>"
            }
          },
          {
            title: "#", field: "id",
            variableHeight: true,
            cellClick: function (e, cell) {
              let popupIntv;
              $("#titleInv").html("Edit Kata Kunci");
              popupIntv = /*html*/`
              <div action="${window.location.href}" id="formInput">
								<fieldset>
                  <div class="mb-3">
                    <input type="hidden" value="${cell._cell.row.data.id}" name="id" id="id" required>
                  </div>
									<div class="mb-3" id="intMaster">
										<label class="form-label" for="deskInt">Kata Kunci</label>
										<input type="text" class="form-control" id="keyword" value="${cell._cell.row.data.keyword}" required>
                  </div>
                  <button type="submit" class="btn btn-primary w-100px me-5px" id="submitIntv">Submit</button>
									<div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
								</fieldset>
							</div>
              `;

              $("#viewData").html(popupIntv);
              document.querySelector('#submitIntv').addEventListener('click', (event) => {
                const form = document.querySelector("#formInput");
                if (form) {
                  if (!document.querySelector("#id")) {
                    addKeywords();
                  }
                  const fields = ["id", "sel_tahun", "keyword"];
                  validateonSubmitFormKeyword(form, fields);
                }
              });
            },
            formatter: function (cell, formatterParams) {
              let
                btn_edit = "<div class='btn btn-primary my-1 py-1 px-2 fs-11px editRoIntv' data-bs-toggle='modal' data-bs-target='#tileModal' >Edit</div>"
                ;
              return "<div class='d-flex justify-content-between'> <div class='bd-highlight text-wrap'>" + btn_edit + "</div></div>"
            }
          }
        ],
        initialSort: [
          { column: "idx", dir: "asc" }
        ],
      });

      async function validateonSubmitFormKeyword(form, fields) {
        var error = 0;
        fields.forEach((field) => {
          const input = document.querySelector(`#${field}`);
          if (validateFields(input) == false) {
            error++;
          }
        });
        if (error > 0) {
          return false;
        } else {
          let
            dataX = {
              id: document.querySelector("#id").value,
              keyword: document.querySelector("#keyword").value,
              tahun: document.querySelector("#sel_tahun").value
            };
          return postData(dataX);
        }
      }
      return table;
    }

    async function postData(dataX) {
      $("#table-admin-penandaan-pagu").parent().addClass("loading");
      try {
        let res = await fetch(config.api_url + '/renja/rokeyword', {
          method: 'POST',
          body: JSON.stringify(dataX),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        if (_res.status) {
          await ListKeywords(dataX.tahun).then(function (data) {
            tableDataRo(data);
            $("#table-admin-penandaan-pagu").parent().removeClass("loading");
          });
          $("#keyword").val(" ");
          if (dataX.id) {
            $("#tileModal").modal('hide');
          }
        } else {
          swal({
            title: "Terjadi kesalahan harap dicoba kembali",
            text: "",
            icon: "danger",
            button: "Tutup",
          });
        }
      } catch (e) {
        return false;
      }
    }

    $("#synch_keyword").on("click", async function () {
      $(this).find("i").addClass("fa-spin");

      try {
        let res = await fetch(config.api_url + '/renja/keyword-reload', {
          method: 'GET',
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        console.log(_res);



        $(this).find("i").removeClass("fa-spin");
        if (_res.status) {

          swal({
            title: 'Rincian Output telah diperbarui',
            text: ' ',
            icon: 'success',
            buttons: {
              confirm: {
                text: 'Tutup',
                value: true,
                visible: true,
                className: 'btn btn-success',
                closeModal: true
              }
            }
          });
          let tgl = _res.data.updated_at.split("T"),
            tgl_arry = tgl[0].split("-"),
            tgl_now = tgl_arry[2] + "/" + tgl_arry[1] + "/" + tgl_arry[0]
            ;
          $("#update_synch").html(tgl_now);
        }
        //return _res.data;
      } catch (e) {
        return false;
      }


    });



    apopoverTrigger();
  }
};
export default AdminKeywords;