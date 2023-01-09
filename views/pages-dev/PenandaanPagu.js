import WidgetCard from '../components/WidgetCard.js';
import { apopoverTrigger, apiKementerian, apiTahunSemester, apiIntervensi } from '../../services/api.js';

const PenandaanPagu = {
  /**
   * Render the page content.
   */

  render: async () => {

    mData.dataKementerian = (typeof mData.dataKementerian === "undefined") ? await apiKementerian() : mData.dataKementerian;
    mData.dataSemester = (typeof mData.dataSemester === "undefined") ? await apiTahunSemester() : mData.dataSemester;
    mData.dataIntervensi = (typeof mData.dataIntervensi === "undefined") ? await apiIntervensi() : mData.dataIntervensi;

    const widgetCard1 = await WidgetCard.render('tile-1', 'Penandaan', 'white-100', 'lg-12');
    const widgetCard2 = await WidgetCard.render('tile-2', 'Pagu', 'white-100', 'lg-12 mt-3 mb-2');

    return /*html*/ `
      <div class="app-content-padding flex-grow-1 overflow-auto" data-scrollbar="true">
				<!-- BEGIN page-header -->
				<h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">verified</i>Penandaan dan Pagu</h2>
				<!-- END page-header -->
        <!-- begin widget-card -->
        <div class="row pt-3 mx-0 mb-3 py-3 bg-gray-300 rounded" id="drp_option">
          <div class="col-xl-2 ">
              <div class="form-group sel_tax">                  
                <select id="sel_ta" name="sel_ta" class="form-control selectpicker" data-title="Pilih Tahun" data-actions-box="true" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset">
                  <option value="2021-1" selected="selected">2021 - Semester 1</option>
                  <option value="2021-2">2021 - Semester 2</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>
          </div>
          <div class="col-xl-3">
              <div class="form-group sel_kl">
                <select id="sel_kl" name="sel_kl" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Kementerian/ Lembaga" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} K/L dipilih">
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
          <div class="col-xl-1 " id="chartData">
              <div class="form-group pull-right width-full">              
                <div class="menu-icon btn btn-primary m-0 p-0 px-2" data-bs-toggle="modal" data-bs-target="#chartModal" >
                  <i class="material-icons fs-29px">bar_chart</i>
                </div>
              </div>
          </div>          
        </div>
        <div id="top-tiles" class="row mb-2 ">        
          ${widgetCard1}
          ${widgetCard2}          
        </div>
        <!-- end widget-card -->
        <div class="card">
          <div class="card-body" id="table1">
            <div id="elemenOpenCloseFst"></div>
            <div id="penandaan-table" class="is-bordered is-narrow rounded"></div>
            <div class="sumber-data-annual pt-1 pb-2 ps-2 fs-12px fw-500"></div>
          </div>
          <div class="" id="container_renjakl">
            <div class="card-body hide" >
              <div id="elemenOpenClose"></div>
              <div class="mx-n3 mb-n3" id="table2"></div>
              <div class="sumber-data-renja pt-4 pb-2 ms-n2 fs-12px fw-500"></div> 
            </div>
          </div>          
        </div>
      </div>
      <!-- Modal -->
      <div class="modal modal-message  fade" id="chartModal" tabindex="-1" aria-labelledby="Chart Penandaan dan Pagu" aria-hidden="true">
        <div class="modal-dialog card" style="margin: 2% 2%;width: 96%;border-radius: 11px;">
          <div class="modal-content card-body p-0" id="popUp" style="border-radius: inherit !important;">          
          </div>
        </div>
      </div>
      <!-- End Modal -->
    `;
  },

  after_render: async () => {

    sumberDataRenja();
    let xls_id = "export_xls";
    treeOpenCloseHtml("#elemenOpenClose", { "xls_id": xls_id });

    sumberDataAnnual();
    let xlss_id = "exp_xls",
      pdff_id = "exp_pdf";
    treeOpenCloseHtml("#elemenOpenCloseFst", { "xls_id": xlss_id, "pdf_id": pdff_id });

    let
      //thID = document.getElementById('sel_ta'),
      klID = document.getElementById('sel_kl'),
      intID = document.getElementById('sel_int'),
      dKementerian = [],
      //dTahunSemester = [],
      dIntervensi = [];

    /* mData.dataSemester.forEach((item) => {
      dTahunSemester.push(
        `<option value="${item.tahun}-${item.semester}" selected="selected">${item.tahun} - Semester ${item.semester}</option>`
      );
    });
    thID.innerHTML = dTahunSemester.join(" "); */
    mData.dataKementerian.forEach((item) => {
      dKementerian.push(
        `<option value="${item.kementerian_kode}" selected="selected">${item.kementerian_nama}</option>`
      );
    });
    klID.innerHTML = dKementerian.join(" ");
    mData.dataIntervensi.forEach((item) => {
      dIntervensi.push(
        `<option  value="${item.intervensi_kode}" selected="selected"> ${item.intervensi_nama}</option>`
      );
    });
    intID.innerHTML = dIntervensi.join(" ");

    (function () {
      $('select').selectpicker();
    })();

    var
      popUp,
      periodeAng = document.getElementById("sel_ta").value,
      getSel_kl = document.getElementById("sel_kl"),
      getSel_int = document.getElementById("sel_int"),
      sel_kl = [],
      sel_int = []
      ;

    /*value KL & intervensi*/
    Object.values(getSel_kl.options).forEach((row) => {
      sel_kl.push(row.getAttribute("value"));
    });
    Object.values(getSel_int.options).forEach((row) => {
      sel_int.push(row.getAttribute("value"));
    });

    async function getPageData(periode, kl, int, search) {
      /* /pp/chart-1-hap */
      let perData = periode.split("-");
      try {
        let res = await fetch(config.api_url + '/pp/perkembangan-penandaan', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": perData[0],
            "semester": perData[1],
            "kl": kl,
            "intervensi": int,
            "search": search
          }),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        return _res.data;
      } catch (e) {
        return false;
      }
    };

    /* first load 2021 sm 1 */
    await getPageData(periodeAng, sel_kl, sel_int).then(function (data) {
      $("#penandaan-table").addClass("loading");
      let adjust = tableTreeLevel(data.detail, "all");
      mData.annualreport = {
        "detail": adjust,
        "baseline": data.baseline,
        "tile": data.tile,
      };
      tableData(mData.annualreport);
      $("#penandaan-table").removeClass("loading");
    });

    async function getChart(periode, kl, int) {
      let perData = periode.split("-");
      try {
        let res = await fetch(config.api_url + '/pp/chart-1-hap', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": perData[0],
            "semester": perData[1],
            "kl": kl,
            "intervensi": int
          }),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        return _res.data;
      } catch (e) {
        return false;
      }
    };

    await getChart(periodeAng, sel_kl, sel_int).then(function (data) {
      penandaanPagu(data);
    });

    $("#kinerjaAnggaranSrc").keypress(async function (e) {
      var key = e.which;
      if (key == 13)  // the enter key code
      {
        var kKey = $(this).val();
        var html = '';
        $("#restoreData").removeClass('hide');
        $(this).after(html);
        closeButton();
        await getPageData($("#sel_ta").val(), $("#sel_kl").val(), $("#sel_int").val(), kKey).then(function (data) {
          tableData(data);
        });
      }
    });

    $("#sel_ta").on('change', async function () {
      let
        dataKl,
        renjaKL = [],
        multi_tahun = $('#sel_ta').val(),
        perData = multi_tahun.split("-");

      if (perData[0] > 2021) {
        try {
          let res = await fetch(config.api_url + '/ka/renja/kementerian', {
            method: 'POST',
            body: JSON.stringify({
              "tahun": perData[0]
            }),
            headers: config.fetchHeaders
          });
          let _res = await res.json();
          dataKl = _res;
        } catch (e) {
          return false;
        }
        dataKl.data.forEach((item) => {
          renjaKL.push(
            `<option value="${item.kementerian_kode}" selected="selected">${item.kementerian_nama}</option>`
          );
        });

        $('#sel_kl').find('value').remove();
        klID.innerHTML = " ";
        klID.innerHTML = renjaKL.join(" ");
        $('#sel_kl').selectpicker('destroy');
        $('#sel_kl').selectpicker();
      }
      tableDataPendaanPagu(this);
    });

    $("#sel_kl, #sel_int").on('change', async () => {
      tableDataPendaanPagu(this);
    });


    async function tableDataPendaanPagu(ev) {
      resetOpenClose();
      let multi_tahun = $('#sel_ta').val(),
        search = document.getElementById("kinerjaAnggaranSrc").value,
        multi_kl = $("#sel_kl").val(),
        multi_int = $("#sel_int").val(),
        perData = multi_tahun.split("-");

      /*krisna*/
      //if (['2022', '2023'].includes(perData[0])) {
      if (perData[0] > 2021) {
        $("#top-tiles,#table1,#chartData").addClass("hide");
        $("#container_renjakl").addClass("loading");
        multi_kl = $("#sel_kl").val();
        await getTabelNew(perData[0], multi_kl, multi_int, search).then(function (data) {
          mData.datahasil = data.detail;
          let adjust = tableTreeLevel(data.detail, "all");
          $("#container_renjakl .card-body").removeClass("hide");
          dataTabelNew(adjust);
        });
        $("#container_renjakl").removeClass("loading");
      } else {
        $("#top-tiles,#table1").removeClass("hide");
        $("#container_renjakl .card-body").addClass("hide");
        await getPageData(multi_tahun, multi_kl, multi_int, search).then(function (data) {
          mData.annualreport = data.detail;
          let adjust = tableTreeLevel(data.detail, "all");
          mData.annualreport = {
            "detail": adjust,
            "baseline": data.baseline,
            "tile": data.tile,
          };
          $("#penandaan-table").addClass("loading");
          tableData(mData.annualreport);
          $("#penandaan-table").removeClass("loading");
        });
      }
      closeButton();
    }

    $(".openclose").on("click", function () {
      let periode = document.getElementById("sel_ta").value;
      if (['2022', '2023'].includes(periode)) {
        let data = treeOpenClose(this, mData.datahasil);
        dataTabelNew(data.adjust, data.opsiTabel, data.item);
      } else {
        let
          detail = mData.annualreport.detail,
          data = treeOpenClose(this, detail),
          dataAdjust = {
            "detail": data.adjust,
            "baseline": mData.annualreport.baseline,
            "tile": mData.annualreport.tile,
          };
        tableData(dataAdjust, data.opsiTabel, data.item);
      }
    });

    $(".groupItem button").on("click", function () {
      let periode = document.getElementById("sel_ta").value;
      console.log(this);
      if (['2022', '2023'].includes(periode)) {
        let data = treeBtnGroup(this, mData.datahasil);
        dataTabelNew(data.adjust, data.opsiTabel, data.item);
      } else {
        let
          detail = mData.annualreport.detail,
          data = treeBtnGroup(this, detail),
          dataAdjust = {
            "detail": data.adjust,
            "baseline": mData.annualreport.baseline,
            "tile": mData.annualreport.tile,
          }
          ;
        tableData(dataAdjust, data.opsiTabel, data.item);
      }
    });

    /* tahun 2022 Up */
    async function getTabelNew(periode, kl, int, search) {
      try {
        let res = await fetch(config.api_url + '/renja/renjakl', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": periode,
            "kl": kl,
            "search": search
          }),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        console.log(_res.data);
        return _res.data;
      } catch (e) {
        return false;
      }
    };

    async function dataTabelNew(result, opsiTabel = { expand: false }, itemShow) {
      let thn_ini = parseInt($("#sel_ta").val()),
        thn_1 = thn_ini + 1,
        thn_2 = thn_ini + 2,
        thn_3 = thn_ini + 3;

      const table = new Tabulator("#table2", {
        height: "515px",
        data: result,
        index: "id",
        //layout: "fitDataStretch", //fitDataFill, fitData, fitDataTable, fitColumns, fitDataStretch
        layout: "fitDataFill", //fitDataFill, fitData, fitDataTable, fitColumns, fitDataStretch
        columnHeaderVertAlign: "middle",
        columnVertAlign: "left",
        dataTree: true,
        dataTreeStartExpanded: opsiTabel.expand,
        dataTreeFilter: true,
        dataTreeElementColumn: "name",
        dataTreeChildColumnCalcs: false, //include child rows in column calculations
        //dataTreeSelectPropagate: true,
        dataLoader: false, //disable remote loader
        movableColumns: true,
        columns: [
          {
            title: "No",
            titleDownload: "No", vertAlign: "middle",
            field: "id", visible: true, sorter: "number",
            hozAlign: "center", headerHozAlign: "center", frozen: true
          },
          {
            title: "K/L, Program, Kegiatan, KRO, RO, Komponen",
            titleDownload: "K/L, Program, Kegiatan, KRO, Komponen",
            vertAlign: "middle", frozen: true,
            field: "name", sorter: "string", width: 500, responsive: 0,
            variableHeight: true,
            formatter: function (cell, formatterParams) {
              let
                hasil,
                value = cell.getValue(),
                ncode = "";
              if (cell._cell.row.data.posisi === 'KL') {
                //ncode = '<span class="badge rounded-pill py-1 bg-orange-600">K/L</span>';
                ncode = '<div class="badge py-1 ' + c_main + '" ><span class="' + c_kl + '  badge-main p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight ps-1"> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              } else if (cell._cell.row.data.posisi === 'Program') {
                //ncode = '<span class="badge rounded-pill py-1 bg-cyan-600">Program</span>';
                ncode = '<div class="badge ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' badge-right  p-1" title="Program">' + cell._cell.row.data.program_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              } else if (cell._cell.row.data.posisi === 'Kegiatan') {
                //ncode = '<span class="badge rounded-pill py-1 bg-green-600">Kegiatan</span>';
                ncode = '<div class="badge  ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' p-1" title="Program">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' badge-right  p-1" title="Kegiatan">' + cell._cell.row.data.kegiatan_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              } else if (cell._cell.row.data.posisi === 'KRO') {/* OUTPUT */
                //ncode = '<span class="badge rounded-pill bg-warning py-1 bg-lime-600">KRO</span>';
                ncode = '<div class="badge ' + c_main + '" ><span class="  badge-left ' + c_kl + ' p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' p-1" title="Program">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1" title="Kegiatan">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + '  badge-right p-1"  title="Klasifikasi Rincian Ouput">' + cell._cell.row.data.kro_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              } else if (cell._cell.row.data.posisi === 'RO') {
                //ncode = '<span class="badge rounded-pill py-1 bg-purple-600">RO</span>';
                ncode = '<div class="badge ' + c_main + '"><span class="' + c_kl + '  badge-left  p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' p-1" title="Program">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1" title="Kegiatan">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + ' p-1"  title="Klasifikasi Rincian Output">' + cell._cell.row.data.kro_id + '</span><span class="' + color_ro + '  badge-right p-1"  title="Rincian Output">' + cell._cell.row.data.ro_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              }
              else {
                ncode = '<span class="badge rounded-pill bg-aqua-600 py-1">Komponen</span>';
                hasil = `
                    <div class="container">
                      <div class="row">
                        <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${cell._cell.row.data.komponen_kode}-${value}</div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="text-black w-50 ps-4 ms-5 my-1">
                          <span class="badge py-1 bg-indigo-600 ms-2 ">Indikator Pbj : ${cell._cell.row.data.indikator_pbj}</span>   
                          <span class="badge py-1 bg-blue-600">Jenis : ${cell._cell.row.data.komponen_jenis}</span>
                        </div>
                      </div>
                    </div> 
                    `;
              }
              return hasil;
            }
          }, {
            title: "&#931; PROG", field: "jml_program",
            titleDownload: "Program",
            visible: ((itemShow == "semua") || (itemShow == "program") || (typeof itemShow == "undefined")) ? true : false,
            sorter: "number", headerHozAlign: "center",
            hozAlign: "right", bottomCalc: "sum",
            mutator: function (value, data, type, params, component) {
              var dt = data.kl_id !== undefined && data.program_id === undefined ? data._children.length : '';
              return dt;
            }, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
          {
            title: "&#931; KEG", titleDownload: "Kegiatan ",
            visible: ((itemShow == "semua") || (itemShow == "kegiatan") || (typeof itemShow == "undefined")) ? true : false,
            field: "jml_kegiatan", formatter: "number", sorter: "number", headerHozAlign: "center",
            hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }, mutator: function (value, data, type, params, component) {
              let num = (typeof data._children == "undefined") ? 0 : data._children.length,
                dt = data.program_id !== undefined && data.kegiatan_id === undefined ? num : '',
                dy = 0;
              if (data.kl_id !== undefined && data.program_id === undefined) {
                data._children.forEach(function (arrayItem) {
                  let num = (typeof arrayItem._children == "undefined") ? 0 : arrayItem._children.length;
                  dy = dy + num;
                });
                return dy;
              } else if (data.program_id !== undefined && data.kegiatan_id === undefined) {
                return (typeof data._children == "undefined") ? "" : data._children.length;
              } else { return ''; }
            }, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
          {
            title: "&#931; KRO", titleDownload: "KRO",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "kro") || (typeof itemShow == "undefined")) ? true : false,
            field: "jml_ro", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,  //include child rows in column calculations
            }, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }
          },
          {
            title: "&#931; RO", titleDownload: "RO",
            visible: ((itemShow == "semua") || (itemShow == "ro") || (typeof itemShow == "undefined")) ? true : false,
            field: "jml_ro", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,  //include child rows in column calculations
            }, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }
          },
          {
            title: "Alokasi Bulan Januari",
            titleDownload: "Alokasi Bulan Januari",
            field: "alokasi_totaloutput",
            headerPopup: function (e, column, onRendered) {
              return popupnote("Alokasi pada bulan Januari");
            },
            headerPopupIcon: "<i class='fas fa-exclamation-circle'></i>",
            /*  formatter: "money", */
            formatter: function (cell, formatterParams) {
              var value = cell.getValue(),
                numbx;
              if (value === "" || (typeof value === "undefined")) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
                numbx = "";
              } else {
                numbx = formatNumber(value * 1000, 2);
              }
              return numbx;
            },
            width: 167,
            sorter: "number", headerHozAlign: "center", hozAlign: "right",
            accessorDownload: numberIDRDownload,
            bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "Tingkat Output",
            titleDownload: "Tingkat Output",
            field: "alokasi_totaloutput",
            headerPopup: function (e, column, onRendered) {
              return popupnote("Alokasi ditingkat output");
            },
            headerPopupIcon: "<i class='fas fa-exclamation-circle'></i>",

            /*  formatter: "money", */
            formatter: function (cell, formatterParams) {
              var value = cell.getValue(),
                numbx;
              if (value === "" || (typeof value === "undefined")) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
                numbx = "";
              } else {
                numbx = formatNumber((value * 1000) + 195000, 2);
              }
              return numbx;
            },
            width: 167,
            sorter: "number", headerHozAlign: "center", hozAlign: "right",
            accessorDownload: numberIDRDownload,
            bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "Analisis Lanjutan",
            titleDownload: "Analisis Lanjutan",
            field: "alokasi_totaloutput",
            headerPopup: function (e, column, onRendered) {
              return popupnote("Alokasi ditingkat Analisis Lanjutan");
            },
            headerPopupIcon: "<i class='fas fa-exclamation-circle'></i>",

            /*  formatter: "money", */
            formatter: function (cell, formatterParams) {
              var value = cell.getValue(),
                numbx;
              if (value === "" || (typeof value === "undefined")) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
                numbx = "";
              } else {
                numbx = formatNumber((value * 1000) + 215000, 2);
              }
              return numbx;
            },
            width: 167,
            sorter: "number", headerHozAlign: "center", hozAlign: "right",
            accessorDownload: numberIDRDownload,
            bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "Lokasi",
            titleDownload: "Lokasi",
            field: "lokasi_ro",
            hozAlign: "left",
            width: 500,
            headerPopup: function (e, column, onRendered) {
              return popupnote("Lokasi realisasi Anggaran");
            },
            headerPopupIcon: "<i class='fas fa-exclamation-circle'></i>",

            /*  formatter: "money", */
            formatter: function (cell, formatterParams) {
              cell.getElement().style.textAlign = "left";
              cell.getElement().style.width = 400;
              var numbx;
              if (cell._cell.row.data.lokasi_ro === "" || (typeof cell._cell.row.data.lokasi_ro === "undefined")) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
                numbx = "";
              } else {

                numbx = "<span class='text-wrap text-black fw-400'>" + cell._cell.row.data.lokasi + "</span>"
              }
              return numbx;
            },
            width: 167,
            sorter: "number", headerHozAlign: "center", hozAlign: "right",
            accessorDownload: numberIDRDownload,
            bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "Satuan ",
            titleDownload: "Satuan ",
            field: "satuan",
            headerPopup: function (e, column, onRendered) {
              return popupnote("Satuan terkait target");
            },
            headerPopupIcon: "<i class='fas fa-exclamation-circle'></i>",

            /*  formatter: "money", */
            formatter: function (cell, formatterParams) {
              var value = cell.getValue(),
                numbx;
              if (value === "" || (typeof value === "undefined")) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
                numbx = "";
              } else {
                numbx = "<span class='text-wrap text-black fw-500'>" + capitalize(value) + "</span>";
              }
              return numbx;
            },
            width: 140,
            sorter: "number", headerHozAlign: "center", hozAlign: "center",
            accessorDownload: numberIDRDownload,
            bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "Target ",
            titleDownload: "Target ",
            field: "target_0",
            headerPopup: function (e, column, onRendered) {
              return popupnote("Target");
            },
            headerPopupIcon: "<i class='fas fa-exclamation-circle'></i>",

            /*  formatter: "money", */
            formatter: function (cell, formatterParams) {
              var value = cell.getValue(),
                numbx;
              if (value === "" || (typeof value === "undefined")) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
                numbx = "";
              } else {
                numbx = value === 0 ? 0 : formatNumber(value);
              }
              return numbx;
            },
            width: 120,
            sorter: "number", headerHozAlign: "center", hozAlign: "right",
            accessorDownload: numberIDRDownload,
            bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          }
          ,
          {
            title: "Target Kesepakatan Tingkat Output",
            titleDownload: "Target Kesepakatan Tingkat Output ",
            field: "target_0",
            headerPopup: function (e, column, onRendered) {
              return popupnote("Target pada kesepakatan tingkat output");
            },
            headerPopupIcon: "<i class='fas fa-exclamation-circle'></i>",

            /*  formatter: "money", */
            formatter: function (cell, formatterParams) {
              var value = cell.getValue(),
                numbx;
              if (value === "" || (typeof value === "undefined")) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
                numbx = "";
              } else {
                numbx = value === 0 ? 0 : formatNumber(Number(value) + 3);
              }
              return numbx;
            },
            width: 120,
            sorter: "number", headerHozAlign: "center", hozAlign: "right",
            accessorDownload: numberIDRDownload,
            bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          }
          ,
          {
            title: "Target Kesepakatan Tingkat Analisis Lanjutan",
            titleDownload: "Target Kesepakatan Tingkat Analisis Lanjutan",
            field: "target_0",
            headerPopup: function (e, column, onRendered) {
              return popupnote("Target Kesepakatan pada Analisis Lanjutan");
            },
            headerPopupIcon: "<i class='fas fa-exclamation-circle'></i>",

            /*  formatter: "money", */
            formatter: function (cell, formatterParams) {
              var value = cell.getValue(),
                numbx;
              if (value === "" || (typeof value === "undefined")) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
                numbx = "";
              } else {
                numbx = value === 0 ? 0 : formatNumber(Number(value) + 2);
              }
              return numbx;
            },
            width: 120,
            sorter: "number", headerHozAlign: "center", hozAlign: "right",
            accessorDownload: numberIDRDownload,
            bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          }

        ],
        initialSort: [
          { column: "id", dir: "asc" }
        ]
      });
      document.getElementById(xls_id).addEventListener("click", function () {
        table.download("xlsx", "data.xlsx", { sheetName: "data" });
      });
    };

    async function tableData(result, opsiTabel = { expand: false }, itemShow) {
      const
        tile1 = document.getElementById('tile-1'),
        tile2 = document.getElementById('tile-2'),
        tableDataTile1 = [],
        tableDataTile1All = [],
        tableDataTile2 = [],
        tableDataTile2All = [];

      result.tile.top_5_alokasi.forEach((row, index) => {
        let kepatuhan_psn = ((row.tagging / row.jumlah_ro) === 1) || ((row.tagging / row.jumlah_ro) === 0) ? (row.tagging / row.jumlah_ro) * 100 : ((row.tagging / row.jumlah_ro) * 100).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
          kpn_psn = kepatuhan_psn.toString() + " &#37;";
        if (index < 5) {
          tableDataTile1.push(/*html*/`
          <tr>
            <td class="ps-2">${row.kementerian_short}</td>
            <td class="text-end" tabulator-align="right">${row.jumlah_ro}</td>
            <td class="text-end" tabulator-align="right">${row.tagging}</td>
            <td class="text-end" tabulator-align="right">${kpn_psn}</td>
            <td class="text-end" tabulator-align="right">${row.jumlah_ro_spesifik}</td>
            <td class="text-end" tabulator-align="right">${row.jumlah_ro_sensitif}</td>
            <td class="text-end pe-2" tabulator-align="right">${row.jumlah_ro_dukungan}</td>
          </tr>`);
        }
        tableDataTile1All.push(/*html*/`
          <tr>
            <td class="ps-2">${row.kementerian_short}</td>
            <td class="text-end" tabulator-align="right">${row.jumlah_ro}</td>
            <td class="text-end" tabulator-align="right">${row.tagging}</td>
            <td class="text-end" tabulator-align="right">${kpn_psn}</td>
            <td class="text-end" tabulator-align="right">${row.jumlah_ro_spesifik}</td>
            <td class="text-end" tabulator-align="right">${row.jumlah_ro_sensitif}</td>
            <td class="text-end pe-2" tabulator-align="right">${row.jumlah_ro_dukungan}</td>
          </tr>`);
      });

      result.tile.top_5_detail.forEach((row, index) => {
        if (index < 5) {
          tableDataTile2.push(/*html*/`
          <tr>
            <td class="ps-2">${row.kementerian_short}</td>
            <td class="text-end">${row.jumlah_ro}</td>
            <td class="text-end">${((row.alokasi_rkakl_spesifik + row.alokasi_rkakl_sensitif + row.alokasi_rkakl_dukungan) === 0) ? "-" : ((row.alokasi_rkakl_spesifik + row.alokasi_rkakl_sensitif + row.alokasi_rkakl_dukungan) / 1000000000).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " T"}</td>
            <td class="text-end">${(row.alokasi_rkakl_spesifik === 0) ? "-" : ((row.alokasi_rkakl_spesifik / 1000000000)).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " T"}</td>
            <td class="text-end">${(row.alokasi_rkakl_sensitif === 0) ? "-" : ((row.alokasi_rkakl_sensitif / 1000000000)).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " T"}</td>
            <td class="text-end pe-2">${(row.alokasi_rkakl_dukungan === 0) ? "-" : ((row.alokasi_rkakl_dukungan / 1000000000)).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " T"}</td>
          </tr>`);
        }
        tableDataTile2All.push(/*html*/`
        <tr>
          <td class="ps-2">${row.kementerian_short}</td>
          <td class="text-end">${row.jumlah_ro}</td>
          <td class="text-end">${((row.alokasi_rkakl_spesifik + row.alokasi_rkakl_sensitif + row.alokasi_rkakl_dukungan) === 0) ? "-" : ((row.alokasi_rkakl_spesifik + row.alokasi_rkakl_sensitif + row.alokasi_rkakl_dukungan)).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " "}</td>
          <td class="text-end">${(row.alokasi_rkakl_spesifik === 0) ? "-" : ((row.alokasi_rkakl_spesifik)).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " "}</td>
          <td class="text-end">${(row.alokasi_rkakl_sensitif === 0) ? "-" : ((row.alokasi_rkakl_sensitif)).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " "}</td>
          <td class="text-end pe-2">${(row.alokasi_rkakl_dukungan === 0) ? "-" : ((row.alokasi_rkakl_dukungan)).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " "}</td>
        </tr>
          `);

      });

      tile1.innerHTML = /*html*/ `
        <div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700  mb-1 fs-11px" style="position: absolute;top: 1.1em;right: 1.5em;">
          <div class="mt-n1  bd-highlight">            
            <div class="btn-group" id="groupExp">
              <button class="btn btn-white fs-11px px-2 py-1 active">Export</button>                  
              <button class="btn btn-white fs-11px px-2 py-1">
                  <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer  text-green-400" title="export xls" id="exp_xls" onclick="toXls('#tableSum1All','xls','Penandaan.xls');"></i>
              </button>                  
              <button class="btn btn-white fs-11px px-2 py-1">
                  <i class="fas fa-lg fa-fw fa-file-pdf p-0 m-0 cursor-pointer  text-red-400" title="export pdf" onclick="toPdf('#tableSum1All','pdf','Penandaan.pdf');"></i>
              </button>                  
            </div>
          </div>
        </div>

        <div class="col-md-6 border-start hide" id="tableSum1All">
          <table class="table table-sm bg-light-500 rounded-top fs-11px mb-0"  >
            <thead>
              <tr class="fw-normal border-0 text-gray-700">
                <th class="border-0 ps-2">K/L</th>
                <th class="border-0 text-end">Disepakati</th>
                <th class="border-0 text-end">Ditandai</th>
                <th class="border-0 text-end">Kepatuhan %</th>
                <th class="border-0 text-end">Spesifik</th>
                <th class="border-0 text-end">Sensitif</th>
                <th class="border-0 text-end pe-2">Dukungan</th>
              </tr>
            </thead>
            <tbody class="fs-10px bg-white">
              ${tableDataTile1All.join("")}
            </tbody>      
          </table>
        </div>
        <div class="row">
          <div class="col-md-6">              
            <div class="d-flex justify-content-between border-bottom bd-highlight">              
              <div class="d-flex flex-column pb-1">
                <div class="mb-0 fs-11px">
                  <span class="h2 text-green">${result.tile.rekonsiliasi_update_tagging.c_kl}</span>
                </div>
                <div class="fs-12px text-gray-700">Kementerian/Lembaga</div>
              </div>
              <div class="p-0 bd-highlight text-end w-100">
                <div class="d-flex flex-column pb-1">
                  <div class="mb-0 fs-11px">
                    <span class="h2 text-blue">${((result.tile.realisasi_tagging.all.tagging / result.tile.realisasi_tagging.all.teridentifikasi) * 100).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</span>
                  </div>
                  <div class="fs-12px text-gray-700">Kepatuhan Penandaan</div>
                </div>
              </div>
            </div>
            <div class="fs-15px text-gray-700  pt-1">Rincian Output</div>            
            <div class="d-flex justify-content-between bd-highlight">
              <div class="p-0 ms-n2 me-5 w-250px bd-highlight">
                <table class="table table-responsive table-borderless table-sm mt-2 mb-0 mt-0 fs-11px text-center text-gray-600">      
                  <tbody>            
                  <tr class=" align-middle">
                    <td class="align-middle"><span class="rounded bg-blue text-light p-1 px-2 mx-1">${result.tile.realisasi_tagging.spesifik.teridentifikasi}</span><span class="rounded bg-orange text-light p-1 px-2 mx-0">${result.tile.realisasi_tagging.spesifik.tagging}</span></td>
                    <td class="align-middle"><span class="rounded bg-blue text-light p-1 px-2 mx-1">${result.tile.realisasi_tagging.sensitif.teridentifikasi}</span><span class="rounded bg-orange text-light p-1 px-2 mx-0">${result.tile.realisasi_tagging.sensitif.tagging}</span></td>
                    <td class="align-middle"><span class="rounded bg-blue text-light p-1 px-2 mx-1">${result.tile.realisasi_tagging.pendamping.teridentifikasi}</span><span class="rounded bg-orange text-light p-1 px-2 mx-0">${result.tile.realisasi_tagging.pendamping.tagging}</span></td>
                  </tr>
                  <tr class="font-fw-bold">
                    <td>Spesifik</td>
                    <td>Sensitif</td>
                    <td>Dukungan</td>
                  </tr>
                  </tbody>      
                </table>   
              </div>
              <div class="p-0 me-2 bd-highlight">
                <div class="d-flex flex-column">
                  <div class="mb-0 mt-2 px-0 fs-11px">
                  <span class="h3 text-blue">${result.tile.realisasi_tagging.all.teridentifikasi}</span>
                  </div>
                  <div class="fs-11px text-gray-600"><i>Baseline</i></div>
                </div>
              </div>
              <div class="p-0 me-2 bd-highlight">
                <div class="d-flex flex-column">
                  <div class="mb-0 mt-2 px-0 fs-11px">
                  <span class="h3 text-blue">${result.tile.realisasi_tagging.all.teridentifikasi}</span>
                  </div>
                  <div class="fs-11px text-gray-600">Disepakati</div>
                </div>
              </div>
              <div class="p-0 me-3 bd-highlight">
                <div class="d-flex flex-column">
                  <div class="mb-0 mt-2 px-0 fs-11px">
                    <span class="h3 text-orange">${result.tile.realisasi_tagging.all.tagging}</span>
                  </div>
                  <div class="fs-11px text-gray-600">Ditandai</div>
                </div>
              </div>              
            </div>
          </div>
          <div class="col-md-6 border-start">
            <table class="table table-sm bg-light-500 rounded-top fs-11px mb-0" id="tableSum1" >
              <thead>
                <tr class="fw-normal border-0 text-gray-700">
                  <th class="border-0 ps-2">K/L</th>
                  <th class="border-0 text-end">Disepakati</th>
                  <th class="border-0 text-end">Ditandai</th>
                  <th class="border-0 text-end">Kepatuhan %</th>
                  <th class="border-0 text-end">Spesifik</th>
                  <th class="border-0 text-end">Sensitif</th>
                  <th class="border-0 text-end pe-2">Dukungan</th>
                </tr>
              </thead>
              <tbody class="fs-10px bg-white">
                ${tableDataTile1.join("")}
              </tbody>      
            </table>
          </div>
        </div>`;

      let
        tRenjaKL = result.tile.pagu_level_output.dukungan_level_output_renjakl + result.tile.pagu_level_output.sensitif_level_output_renjakl + result.tile.pagu_level_output.spesifik_level_output_renjakl,
        tRkaKL = result.tile.pagu_level_output.dukungan_level_output_rkakl + result.tile.pagu_level_output.sensitif_level_output_rkakl + result.tile.pagu_level_output.spesifik_level_output_rkakl;

      tile2.innerHTML = /*html*/ `
        <div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700  mb-1 fs-11px" style="position: absolute;top: 1.1em;right: 1.5em;">
          <div class="mt-n1  bd-highlight">            
            <div class="btn-group" id="groupExp">
              <button class="btn btn-white fs-11px px-2 py-1 active">Export</button>                  
              <button class="btn btn-white fs-11px px-2 py-1">
                  <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer  text-green-400" title="export xls" id="exp_xls" onclick="toXls('#table2All','xls','Pegu.xls');"></i>
              </button>                  
              <button class="btn btn-white fs-11px px-2 py-1">
                  <i class="fas fa-lg fa-fw fa-file-pdf p-0 m-0 cursor-pointer  text-red-400" title="export pdf" onclick="toPdf('#table2All','pdf','Pagu.pdf');"></i>
              </button>                  
            </div>
          </div>
        </div>
        <div class="col-md-6 border-start hide" id="table2All">            
            <table class="table table-sm bg-light-400 rounded-top fs-10px mb-0" id="tableSum2">
              <thead>
                <tr class="fw-bold border-0">
                  <th class="border-0 ps-2">K/L</th>
                  <th class="border-0 text-end">RO</th>
                  <th class="border-0 text-end">RKA K/L</th>
                  <th class="border-0 text-end">Spesifik</th>
                  <th class="border-0 text-end">Sensitif</th>
                  <th class="border-0 text-end pe-2">Dukungan</th>
                </tr>
              </thead>
              <tbody class="fs-10px bg-white">
                ${tableDataTile2All.join("")}
              </tbody>      
            </table>     
          </div>
        <div class="row">        
          <div class="col-md-6 ">        
            <div class="d-flex ">
              <div class="flex-fill ">
                <div class="mb-0 fs-11px">
                  <span class="h4 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((tRenjaKL).toFixed(0)).toLocaleString('id-ID')}.00" title="Renja K/L">
                    ${parseFloat((tRenjaKL / 1000000000).toFixed(2)).toLocaleString('id-ID')} T
                  </span>
                </div>
                <div class="fs-13px text-gray-600">Renja K/L</div>
              </div>            
              <div class="flex-fill justify-content-center ">
                <div class="mb-0  fs-11px">
                  <span class="h4 text-blue" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((tRkaKL).toFixed(0)).toLocaleString('id-ID')}.00" title="RKA K/L">
                    ${parseFloat((tRkaKL / 1000000000).toFixed(2)).toLocaleString('id-ID')} T
                  </span>
                </div>
                <div class="fs-13px text-gray-600">RKA K/L</div>
              </div>
              <div class="flex-row-reverse ">
                <div class="mb-0  fs-11px">
                  <span class="h4 text-orange" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat(((result.tile.pagu_analisis_lanjutan.dukungan_analisis_lanjutan_alokasi + result.tile.pagu_analisis_lanjutan.sensitif_analisis_lanjutan_alokasi + result.tile.pagu_analisis_lanjutan.spesifik_analisis_lanjutan_alokasi).toFixed(0))).toLocaleString('id-ID')}.00" title="Analisis Lanjutan">
                    ${parseFloat(((result.tile.pagu_analisis_lanjutan.dukungan_analisis_lanjutan_alokasi + result.tile.pagu_analisis_lanjutan.sensitif_analisis_lanjutan_alokasi + result.tile.pagu_analisis_lanjutan.spesifik_analisis_lanjutan_alokasi) / 1000000000).toFixed(2)).toLocaleString('id-ID')} T 
                  </span>
                </div>
                <div class="fs-13px text-gray-600">Analisis Lanjutan</div>
              </div>
            </div>          
            <hr class="my-1">
            <table class="table table-sm mb-0 mt-3 mb-0 fs-13px">      
              <tbody>            
                <tr>
                  <td class="py-1 text-gray-700"><i class="fas fa-bullseye fa-fw"></i> Spesifik</td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-green">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Renja K/L : Rp. ${parseFloat((result.tile.pagu_level_output.spesifik_level_output_renjakl.toFixed(0))).toLocaleString('id-ID')}.00" data-bs-original-title=" " title="Spesifik">
                        ${parseFloat((result.tile.pagu_level_output.spesifik_level_output_renjakl / 1000000000).toFixed(2)).toLocaleString('id-ID')} T  
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-blue">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="RKA K/L : Rp. ${parseFloat((result.tile.pagu_level_output.spesifik_level_output_rkakl.toFixed(0))).toLocaleString('id-ID')}.00" data-bs-original-title=" " title="Spesifik">
                        ${parseFloat((result.tile.pagu_level_output.spesifik_level_output_rkakl / 1000000000).toFixed(2)).toLocaleString('id-ID')} T  
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-orange">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Analisis Lanjutan : Rp. ${parseFloat((result.tile.pagu_analisis_lanjutan.spesifik_analisis_lanjutan_alokasi.toFixed(0))).toLocaleString('id-ID')}.00" data-bs-original-title=" " title="Spesifik">
                        ${parseFloat((result.tile.pagu_analisis_lanjutan.spesifik_analisis_lanjutan_alokasi / 1000000000).toFixed(2)).toLocaleString('id-ID')} T    
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="py-1 text-gray-700"><i class="fas fa-book-medical fa-fw"></i> Sensitif</td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-green">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Renja K/L : Rp. ${parseFloat((result.tile.pagu_level_output.sensitif_level_output_renjakl.toFixed(0))).toLocaleString('id-ID')}.00" data-bs-original-title=" " title="Sensitif">
                        ${parseFloat((result.tile.pagu_level_output.sensitif_level_output_renjakl / 1000000000).toFixed(2)).toLocaleString('id-ID')} T
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-blue ">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="RKA K/L : Rp. ${parseFloat((result.tile.pagu_level_output.sensitif_level_output_rkakl.toFixed(0))).toLocaleString('id-ID')}.00" data-bs-original-title=" " title="Sensitif">
                        ${parseFloat((result.tile.pagu_level_output.sensitif_level_output_rkakl / 1000000000).toFixed(2)).toLocaleString('id-ID')} T
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold  text-orange">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Analisis Lanjutan : Rp. ${parseFloat((result.tile.pagu_analisis_lanjutan.sensitif_analisis_lanjutan_alokasi.toFixed(0))).toLocaleString('id-ID')}.00" data-bs-original-title=" " title="Sensitif">
                        ${parseFloat((result.tile.pagu_analisis_lanjutan.sensitif_analisis_lanjutan_alokasi / 1000000000).toFixed(2)).toLocaleString('id-ID')} T
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="py-1 text-gray-700"><i class="fas fa-book-reader fa-fw"></i> Dukungan</td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-green">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Renja K/L : Rp. ${parseFloat((result.tile.pagu_level_output.dukungan_level_output_renjakl.toFixed(0))).toLocaleString('id-ID')}.00" data-bs-original-title=" " title="Dukungan">
                        ${parseFloat((result.tile.pagu_level_output.dukungan_level_output_renjakl / 1000000000).toFixed(2)).toLocaleString('id-ID')} T
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold text-blue">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="RKA K/L : Rp. ${parseFloat((result.tile.pagu_level_output.dukungan_level_output_rkakl.toFixed(0))).toLocaleString('id-ID')}.00" data-bs-original-title=" " title="Dukungan">
                        ${parseFloat((result.tile.pagu_level_output.dukungan_level_output_rkakl / 1000000000).toFixed(2)).toLocaleString('id-ID')} T
                      </span>
                    </div>
                  </td>
                  <td class="py-1 text-end">
                    <div class="w-120px text-end ps-12 fw-bold  text-orange">
                      <span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Analisis Lanjutan : Rp. ${parseFloat((result.tile.pagu_analisis_lanjutan.dukungan_analisis_lanjutan_alokasi.toFixed(0))).toLocaleString('id-ID')}.00" data-bs-original-title=" " title="Dukungan">
                        ${parseFloat((result.tile.pagu_analisis_lanjutan.dukungan_analisis_lanjutan_alokasi / 1000000000).toFixed(2)).toLocaleString('id-ID')} T
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>      
            </table>
          </div>  
          <div class="col-md-6 border-start">            
            <table class="table table-sm bg-light-400 rounded-top fs-10px mb-0" id="tableSum2">
              <thead>
                <tr class="fw-bold border-0">
                  <th class="border-0 ps-2">K/L</th>
                  <th class="border-0 text-end">RO</th>
                  <th class="border-0 text-end">RKA K/L</th>
                  <th class="border-0 text-end">Spesifik</th>
                  <th class="border-0 text-end">Sensitif</th>
                  <th class="border-0 text-end pe-2">Dukungan</th>
                </tr>
              </thead>
              <tbody class="fs-10px bg-white">
                ${tableDataTile2.join("")}
              </tbody>      
            </table>     
          </div>
        </div>
      `;

      const table = new Tabulator("#penandaan-table", {
        height: "515px",
        data: result.detail,
        index: "id",
        layout: "fitDataStretch", //fitDataFill, fitData, fitDataTable, fitColumns, fitDataStretch
        columnHeaderVertAlign: "middle",
        dataTree: true,
        dataTreeStartExpanded: opsiTabel.expand,
        dataTreeFilter: true,
        dataTreeElementColumn: "name",
        dataTreeChildColumnCalcs: false, //include child rows in column calculations
        dataTreeSelectPropagate: true,
        dataLoader: false, //disable remote loader
        movableColumns: true,
        columns: [
          { title: "No", field: "id", visible: true, sorter: "number", hozAlign: "center", headerHozAlign: "center", frozen: true },
          {
            title: "Kementerian/ Lembaga<br><small>Program / Kegiatan / KRO / RO</small>", titleDownload: "Kementerian/Lembaga Program   /Kegiatan/KRO/RO", field: "name", sorter: "string", width: 400, responsive: 0, frozen: true,
            accessorDownload: cleanTextDownload,
            headerMenuIcon: "<i class='fas fa-lg fa-fw fa-grip-vertical text-primary-700' title='Menu Header'></i>",
            headerMenu: headerMenu,
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
              return '<span style="padding-right: 2em;"> ' + ncode + ' ' + cell._cell.row.data.name + '</span >';
            }
          },
          {
            title: "&#931; PROG", field: "jml_pro",
            titleDownload: "Program",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "program") || (typeof itemShow == "undefined")) ? true : false,
            sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", mutator: function (value, data, type, params, component) {
              var
                cdt = typeof data._children == "undefined" ? 0 : data._children.length,
                dt = data.kl_id !== undefined && data.program_id === undefined ? cdt : '';
              return dt;
            }, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
          {
            title: "&#931; KEG", titleDownload: "Kegiatan ",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "kegiatan") || (typeof itemShow == "undefined")) ? true : false,
            field: "jml_keg", formatter: "number", sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }, mutator: function (value, data, type, params, component) {
              var
                cdt = typeof data._children == "undefined" ? 0 : data._children.length,
                dt = data.program_id !== undefined && data.kegiatan_id === undefined ? cdt : '';
              var dy = 0;
              if (data.kl_id !== undefined && data.program_id === undefined) {
                data._children.forEach(function (arrayItem) {
                  let cdy = typeof arrayItem._children == "undefined" ? 0 : arrayItem._children.length;
                  dy = dy + cdy;
                });
                return dy;
              } else if (data.program_id !== undefined && data.kegiatan_id === undefined) {
                return typeof data._children == "undefined" ? 0 : data._children.length;
              } else { return ''; }
            }, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
          {
            title: "&#931; KRO", titleDownload: "KRO",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "kro") || (typeof itemShow == "undefined")) ? true : false,
            field: "jml_kro", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,  //include child rows in column calculations
            }, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }
          },
          {
            title: "&#931; RO", titleDownload: "RO",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "ro") || (typeof itemShow == "undefined")) ? true : false,
            field: "jml_ro", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,  //include child rows in column calculations
            }, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }
          },
          {
            title: "Alokasi <br>RENJA-KL", titleDownload: "Renja KL",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            accessorDownload: numberIDRDownload,
            field: "alokasi_0", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,  //include child rows in column calculations
            },
            sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "Alokasi <br>RKAKL", titleDownload: "RKAKL",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "alokasi_2", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
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
            title: "Analisis <br>Lanjutan", titleDownload: "Analisis Lanjutan",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "anl_alokasi", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }, accessorDownload: numberIDRDownload, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "<span class='align-middle'>Target</span>",
            titleDownload: "Target", field: "target",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            sorter: "string", hozAlign: "right", headerHozAlign: "center",
            accessorDownload: numberIDRDownload, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
          {
            title: "Satuan",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "satuan",
            titleDownload: "Satuan",
            sorter: "string",
            hozAlign: "left", headerHozAlign: "center", formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
          {
            title: "Lokasi", field: "lokasi",
            titleDownload: "Lokasi",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            sorter: "string", hozAlign: "left", headerHozAlign: "center", formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
        ],
        initialSort: [
          { column: "id", dir: "asc" }
        ]
      });
      //console.log("xlss_id", xlss_id);

      if (typeof xlss_id != "undefined") {
        document.getElementById(xlss_id).addEventListener("click", function () {
          table.download("xlsx", "data.xlsx", { sheetName: "data" });
        });
      }
      if (typeof pdff_id != "undefined") {
        document.getElementById(pdff_id).addEventListener("click", function () {
          table.download("pdf", "data.pdf", {
            orientation: "landscape", //set page orientation to portrait
            title: "Penandaan dan Pagu", //add title to report
            unit: 'in',
            format: [612, 792],
            autoTable: function (doc) {
              //doc.text("SOME TEXT", 1, 3);
              return {
                columnStyles: {
                  3: { halign: 'center' },
                  4: { halign: 'center' },
                  2: { halign: 'center' },
                  5: { halign: 'right' },
                  6: { halign: 'right' },
                  7: { halign: 'right' },
                  8: { halign: 'right' },
                },
                /* didDrawCell: (data) => {
                  if (data.section === 'body' && data.column.index === 5) {
                    
                  }
                } */
              }
            }
          });
        });
      }
      return table;
    }

    popUp = /*html*/ `
      <div class="modal-header bg-gray-300 w-100">
        <h5 class="modal-title">
          <i class="far fa-lg fa-fw fa-chart-bar"></i>
          Penandaan dan Pagu
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body w-100">
        <div class="tab-overflowx">
          <ul class="nav nav-tabs ">
            <li class="nav-item"><a  class="nav-link active" data-active="true" data-tab="1" id="tab_1a"><i class="material-icons" style="position: relative;bottom: -7px;">assignment_turned_in</i> &nbsp; Perkembangan Tagging dan Anggaran</h4></a></li>
          </ul>
        </div>
        <div class="tab-content border-top">
          <!-- begin tab-pane -->
          <div class="tab-pane p-3 fade active show" id="default-tab-1">                        
            <div class="btn-group btn-group-justified" id="btn-pilih">
              <span class="gchart me-3">Group By :</span>
              <a class="btn btn-default text-end active" id="gpIntervensi" onClick="gpIntervensi(this)" style="min-width: 8em;border-top-left-radius: 5px;border-bottom-left-radius: 5px;"><i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Intervensi</a>
              <a class="btn btn-default text-end " id="gpKL" onClick="gpKL(this)" style="min-width: 14em;">Kementerian/Lembaga</a>
            </div>                        
            <div class="col-xl-12 show active" id="contentIntervensi" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL11"><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR11"><span class="text-middle">Pagu Awal (Renja K/L)</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA11"><span class="text-middle">Pagu Awal (RKA K/L)</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH11"><span class="text-middle">Analisi Lanjutan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-green" id="sortByRO11"><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div> 
              </div>
              <!--GRAFIK-->
              <div id="chartdiv11" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
            <div class="col-xl-12 hide" id="contentKL" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                  <div class="btn btn-primary" id="sortByKL12"><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                  <div class="btn btn-info" id="sortByDR12"><span class="text-middle">Pagu Awal (Renja K/L)</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                  <div class="btn btn-indigo" id="sortByPA12"><span class="text-middle">Pagu Awal (RKA K/L)</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                  <div class="btn btn-pink" id="sortByPH12"><span class="text-middle">Analisi Lanjutan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                  <div class="btn btn-green" id="sortByRO12"> <span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div> 
              </div>              
              <!--GRAFIK-->
              <div id="chartdiv12x" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
          </div>          
        </div>
      </div>`;
    document.getElementById('popUp').innerHTML = popUp;
    apopoverTrigger();
  }
};
export default PenandaanPagu;