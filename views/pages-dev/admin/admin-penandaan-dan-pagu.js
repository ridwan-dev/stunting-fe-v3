import { apopoverTrigger, datePicker } from '../../../services/api.js';

const AdminPenandaanDanPagu = {
  /**
   * Render the page content.
   */
  render: async () => {
    return /*html*/ `
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
      </div>`;
  },

  after_render: async () => {
    async function getDataPenandaan(tahun, smstr, kesepakatan) {
      try {
        let res = await fetch(config.api_url + '/pp/ro-penandaan', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": tahun,
            "semester": smstr,
            "kesepakatan": kesepakatan
          }),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        mData.Kesepakatan = _res.data;
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
      $(".form-switch input").prop("checked", false);
      $("#revisi-penandaan").addClass("loading");
      let subdata = form.reportValidity();
      if (subdata) {
        let thn = $("#sel_tahun").val(),
          smtr = $("#sel_sm").val(),
          rev = $("#sel_rev").val()
          ;
        await getDataPenandaan(thn, smtr, rev).then(function (data) {
          $("#input-revisi-penandaan").removeClass("hide");
          tableData(data, rev);
          $("#revisi-penandaan").removeClass("loading");
        });
      }
    }

    async function tableData(tableData, revisi) {
      $("#rev-ke").html(revisi);
      const table = new Tabulator("#table-admin-penandaan-pagu", {
        height: "515px",
        data: tableData,
        index: "id",
        layout: "fitDataStretch", //fitDataFill, fitData, fitDataTable, fitColumns, fitDataStretch
        columnHeaderVertAlign: "middle",
        selectable: true,
        dataLoader: false, //disable remote loader
        movableColumns: true,
        columns: [
          { title: "No", field: "id", visible: true, sorter: "number", hozAlign: "center", headerHozAlign: "center", frozen: true },
          {
            title: "Publish",
            field: "publish",
            variableHeight: true,
            frozen: true,
            formatter: function (cell, formatterParams) {
              let
                ro_id = cell._cell.row.data.kode,
                checkBox = cell.getValue() == 1 ? "checked='checked'" : "";
              return '  <div class="form-check form-switch text-center  ms-3 mt-2"><input class="form-check-input swictPublish"  type="checkbox" ro_id="' + ro_id + '"  ' + checkBox + '></div>'
            }
          },
          {
            title: "Kementerian/Lembaga",
            field: "kementerian_nama",
            width: 100,
            variableHeight: true,
            headerFilter: "input",
            frozen: true,
            formatter: function (cell, formatterParams) {
              return "<div class='d-flex flex-row bd-highlight'> <div class='bd-highlight pe-1'></div><div class='bd-highlight text-wrap'>" + cell.getValue() + "</div></div>"
            }
          },
          {
            title: "Rincian Output",
            field: "suboutput_nama",
            width: 400,
            variableHeight: true,
            headerFilter: "input",
            frozen: true,
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
            title: "Alokasi <br>RENJA-KL", titleDownload: "Renja KL",
            accessorDownload: numberIDRDownload,
            field: "alokasi_0", formatter: "money",
            formatter: function (cell, formatterParams) {
              return formatNumber(Number(cell.getValue() * 1000), 2);
            },
            sorter: "number", headerHozAlign: "center", hozAlign: "right",
            bottomCalcFormatter: "money",
            bottomCalc: function (cell) {
              let sumVal = 0;
              for (let val of cell) {
                sumVal += Number(val);
              }
              return sumVal * 1000;
            },
          },
          {
            title: "Alokasi <br>RKAKL", titleDownload: "RKAKL",
            field: "alokasi_2", formatter: "money",
            formatter: function (cell, formatterParams) {
              return formatNumber(Number(cell.getValue() * 1000), 2);
            },
            accessorDownload: numberIDRDownload, sorter: "number", headerHozAlign: "center", hozAlign: "right",
            bottomCalcFormatter: "money",
            bottomCalc: function (cell) {
              let sumVal = 0;
              for (let val of cell) {
                sumVal += Number(val);
              }
              return sumVal * 1000;
            },
          },
          {
            title: "Analisis <br>Lanjutan", titleDownload: "Analisis Lanjutan",
            field: "anl_alokasi", formatter: function (cell, formatterParams) {
              return formatNumber(Number(cell.getValue() * 1000), 2);
            },
            accessorDownload: numberIDRDownload, sorter: "number", headerHozAlign: "center", hozAlign: "right",
            bottomCalcFormatter: "money",
            bottomCalc: function (cell) {
              let sumVal = 0;
              for (let val of cell) {
                sumVal += Number(val);
              }
              return sumVal * 1000;
            },

          },
          {
            title: "Kesepakatan " + revisi + " <br> Alokasi di Tingkat RO ",
            titleDownload: "Kesepakatan " + revisi,
            /* editor: "input", */
            field: "tingkat_ro",
            formatter: function (cell, formatterParams) {
              let
                value = ((cell.getValue() === null) || (cell.getValue() === 0)) ? "" : cell.getValue(),
                conten = "<div class='d-flex flex-row-reverse bd-highlight'> <div class='bd-highlight text-wrap f_tingkat_ro'>" + formatNumber(value, 2) + "</div></div>";
              return conten;
            },
            accessorDownload: numberIDRDownload, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "Kesepakatan " + revisi + " <br> Analisis Lanjutan ",
            titleDownload: "Kesepakatan " + revisi,
            /* editor: "input", */
            field: "analisis_lanjutan",
            formatter: function (cell, formatterParams) {
              let
                value = ((cell.getValue() === null) || (cell.getValue() === 0)) ? "" : cell.getValue(),
                conten = "<div class='d-flex flex-row-reverse bd-highlight'> <div class='bd-highlight text-wrap f_analisis_lanjutan'>" + formatNumber(value, 2) + "</div></div>";
              return conten;
            }, accessorDownload: numberIDRDownload, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "#",
            width: 70, variableHeight: true,
            cellClick: function (e, cell) {
              let form_date = document.querySelector("#date_today").value;
              if (form_date === "") {
                alert("Tanggal Kesepakatan harus diisi");
                return false;
              }

              let
                title_form,
                tgl_kesepakatan = (cell._cell.row.data.tgl_kesepakatan == null) ? $("#date_today").val() : cell._cell.row.data.tgl_kesepakatan,
                tglK = tgl_kesepakatan.split(" ");
              ;
              if ((cell._cell.row.data.analisis_lanjutan === null || cell._cell.row.data.tingkat_ro === null) && (cell._cell.row.data.publish === null || cell._cell.row.data.publish === 0)) {
                title_form = "Add RO ";
              } else {
                title_form = "Edit RO ";
              }
              $("#titleInv").html(title_form + cell._cell.row.data.suboutput_nama);
              $("#viewData").html(/*html*/`
              <form id="formKesepakatan" data-parsley-validate="true">
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Tanggal Kesepakatan</label>
									<div class="col-lg-8">
                    <input type="hidden" id="id_ro" name="id_ro" value="${cell._cell.row.data.kode}" required>
                    <div class="">: ${tglK[0]} </div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Kementerian Lembaga</label>
									<div class="col-lg-8">
										<div class="">: ${cell._cell.row.data.kementerian_kode} - ${cell._cell.row.data.kementerian_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Program</label>
									<div class="col-lg-8">
										<div class="">: ${cell._cell.row.data.program_kode} - ${cell._cell.row.data.program_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Kegiatan</label>
									<div class="col-lg-8">
										<div class="">: ${cell._cell.row.data.kegiatan_kode} - ${cell._cell.row.data.kegiatan_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">KRO</label>
									<div class="col-lg-8">
										<div class="">: ${cell._cell.row.data.output_kode} - ${cell._cell.row.data.output_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">RO</label>
									<div class="col-lg-8">
										<div class="">: ${cell._cell.row.data.suboutput_kode} - ${cell._cell.row.data.suboutput_nama}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Alokasi Renja K/L</label>
									<div class="col-lg-8">
										<div class="">: Rp. ${formatNumber(Number(cell._cell.row.data.alokasi_0 * 1000), 2)}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Alokasi RKAKL</label>
									<div class="col-lg-8">
										<div class="">: Rp. ${formatNumber(Number(cell._cell.row.data.alokasi_2 * 1000), 2)}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Analisis Lanjutan</label>
									<div class="col-lg-8">
										<div class="">: Rp. ${formatNumber(Number(cell._cell.row.data.anl_alokasi * 1000), 2)}</div>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Kesepakatan ${revisi} Alokasi di Tingkat RO <span class="text-danger">*</span></label>
									<div class="col-lg-8">
										<input class="form-control input-price" type="number" id="alokasi_ro" name="alokasi_ro" value="${cell._cell.row.data.tingkat_ro === null ? "" : cell._cell.row.data.tingkat_ro}" data-parsley-type="digits" placeholder="" data-parsley-required="true" required>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Kesepakatan ${revisi} Analisis Lanjutan <span class="text-danger">*</span></label>
									<div class="col-lg-8">
										<input class="form-control input-price" type="number" id="analisis_lanjutan" name="analisis_lanjutan" value="${cell._cell.row.data.analisis_lanjutan === null ? "" : cell._cell.row.data.analisis_lanjutan}" data-parsley-type="digits" placeholder="" data-parsley-required="true" required>
									</div>
								</div>
                <div class="form-group row mb-3">
									<label class="col-lg-4 col-form-label form-label">Publish</label>
									<div class="col-lg-8">
										<div class="bd-highlight form-check form-switch"><input class="form-check-input" id="publish" type="checkbox" ${cell._cell.row.data.publish == 1 ? "checked='checked'" : ""} ></div>
									</div>
								</div>
                <div class="btn btn-primary w-100px me-5px" id="submitKesepakatan">Submit</div>
								<button class="btn btn-default w-100px" data-bs-dismiss="modal" aria-hidden="true">Cancel</button>
							</form>
              `);
              document.querySelector('#submitKesepakatan').addEventListener('click', (event) => {
                const
                  form = document.querySelector("#formKesepakatan"),
                  form_date = document.querySelector("#date_today").value;
                if (form_date === "") {
                  alert("Tanggal harus diisi");
                } else {
                  if (form) {
                    const fields = ["alokasi_ro", "analisis_lanjutan"];
                    validateonSubmitForm(form, fields);
                  }
                }
              });
            },
            formatter: function (cell, formatterParams) {
              let btn = "<div class='btn btn-primary my-1 py-1 px-2 fs-11px editRoIntv' data-bs-toggle='modal' data-bs-target='#tileModal' >Edit</div>";
              return "<div class='bd-highlight text-wrap'>" + btn + "</div></div>";
            }
          }
        ],
        initialSort: [
          { column: "id", dir: "asc" }
        ]
      });
      return table;
    }

    async function validateonSubmitForm(form, fields) {
      var error = 0;
      fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (validateFieldsx(input) == false) {
          error++;
        }
      });

      if (error > 0) {
        return false;
      } else {
        let publish_data;
        if ($("#formKesepakatan").find("#publish").prop("checked") == true) {
          publish_data = 1;
        } else {
          publish_data = 0;
        }
        let data = {
          id_ro: document.querySelector("#id_ro").value,
          kesepakatan: document.querySelector("#sel_rev").value,
          semester: document.querySelector("#sel_sm").value,
          tgl_kesepakatan: document.querySelector("#date_today").value,
          tingkat_ro: document.querySelector("#alokasi_ro").value,
          analisis_lanjutan: document.querySelector("#analisis_lanjutan").value,
          publish: publish_data,
          tahun: document.querySelector("#sel_tahun").value
        }

        try {
          let res = await fetch(config.api_url + '/pp/ro-penandaan-kesepakatan', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: config.fetchHeaders
          });
          let _res = await res.json();
          $('#tileModal').modal('hide');
          if (_res.status) {
            if (publish_data == 1) {
              $(".select_row").find(".swictPublish").attr("checked", "checked");
            } else {
              $(".select_row").find(".swictPublish").removeAttr("checked");
            }
            $(".select_row").find(".f_tingkat_ro").html((data.tingkat_ro === "0" || data.tingkat_ro === null) ? "" : formatNumber(Number(data.tingkat_ro), 2));
            $(".select_row").find(".f_analisis_lanjutan").html((data.analisis_lanjutan === "0" || data.analisis_lanjutan === null) ? "" : formatNumber(Number(data.analisis_lanjutan), 2));
            $(".select_row").removeClass("select_row");
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

    const validateFieldsx = (field) => {
      if (field.value.trim() === "") {
        return false;
      } else {
        return true;
      }
    }

    let today = new Date(),
      dd = String(today.getDate()).padStart(2, '0'),
      mm = String(today.getMonth() + 1).padStart(2, '0'), //January is 0!
      yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.querySelector("#date_today").value = today;

    $(document).on("change", "#allSwitch", async function () {
      let
        eventBtn = $(this),
        kode_ro = [];
      mData.Kesepakatan.forEach((row) => {
        kode_ro.push(row.kode);
      });
      postPublishKesepakatan(eventBtn, kode_ro, 1);
      $("#offSwitch").prop("checked", false);
    });

    $(document).on("change", "#offSwitch", async function () {
      let
        eventBtn = $(this),
        kode_ro = [];
      mData.Kesepakatan.forEach((row) => {
        kode_ro.push(row.kode);
      });
      postPublishKesepakatan(eventBtn, kode_ro, 0);
      $("#allSwitch").prop("checked", false);
    });

    $(document).on("change", "input.swictPublish", async function () {
      let
        eventBtn = $(this),
        kode_ro = [eventBtn.attr("ro_id")];
      postPublishKesepakatan(eventBtn, kode_ro);
    });

    async function postPublishKesepakatan(eventBtn, kode_ro, publishX) {
      let
        publish = publishX,
        note,
        btn_text,
        btn,
        thn = $("#sel_tahun").val(),
        smtr = $("#sel_sm").val(),
        rev = $("#sel_rev").val(),
        date = $("#date_today").val(),
        titleSw = 'Anda ingin data tersebut';

      if (eventBtn.prop("checked") == true) {
        publish = 1;
        note = " ditampilkan ";
        btn_text = "Publish";
        btn = "btn btn-primary";
      } else {
        publish = 0;
        note = " tidak ditampilkan ";
        btn_text = "UnPublish";
        btn = "btn btn-danger";
      }

      if (publishX == 0) {
        titleSw = 'Anda ingin semua data '
        note = " tidak ditampilkan ";
        btn_text = "UnPublish";
        btn = "btn btn-danger";
      }
      if (publishX == 1) {
        titleSw = 'Anda ingin semua data ';
      }

      if (kode_ro.length > 1) {
        publish = publishX;
      }
      swal({
        title: titleSw + note + '?',
        text: 'Kesepakatan Alokasi ditingkat RO dan Kesepakatan Analisis Lanjutan!',
        icon: 'info',
        buttons: {
          confirm: {
            text: btn_text,
            value: true,
            visible: true,
            className: btn,
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
          async function postData() {
            let data = {
              "semester": smtr,
              "kesepakatan": rev,
              "tahun": thn,
              "kode_ro": kode_ro,
              "tgl_kesepakatan": date,
              "publish": publish
            };
            try {
              let res = await fetch(config.api_url + '/pp/ro-kesepakatan-publish', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: config.fetchHeaders
              });
              let _res = await res.json();
              if (_res.status) {
                swal({
                  title: 'Data' + note + '?',
                  text: "Kesepakatan Alokasi ditingkat RO dan Kesepakatan Analisis Lanjutan!",
                  icon: "success",
                  button: "Tutup",
                });
                console.log("kode_ro.length", kode_ro.length);
                if (kode_ro.length > 1) {
                  if (publish == 1) {
                    $(".swictPublish").prop("checked", true);
                  } else {
                    $(".swictPublish").prop("checked", false);
                  }
                }
              } else {
                swal({
                  title: "Terjadi kesalahan harap dicoba kembali",
                  text: "",
                  icon: "danger",
                  button: "Tutup",
                });
              }
              //return _res.data;
            } catch (e) {
              return false;
            }
          }
          return postData();
        } else {
          if (publish == 1) {
            $(eventBtn).prop("checked", false);
          } else {
            $(eventBtn).prop("checked", true);
          }

        }
      });
    }
    $(document).on("click", "div [data-bs-target='#tileModal']", function () {
      $(this).parent().parent().parent().addClass("select_row");
    });
    apopoverTrigger();
    datePicker();

  }
};
export default AdminPenandaanDanPagu;