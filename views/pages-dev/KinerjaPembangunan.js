import WidgetCard from '../components/WidgetCard.js';
import { apiKementerian, apiTahunSemester, apiIntervensi } from '../../services/api.js';

const KinerjaAnggaran = {
  /**
   * Render the page content.
   */
  render: async () => {
    mData.dataKementerian = (typeof mData.dataKementerian === "undefined") ? await apiKementerian() : mData.dataKementerian;
    //mData.dataSemester = (typeof mData.dataSemester === "undefined") ? await apiTahunSemester() : mData.dataSemester;
    mData.dataIntervensi = (typeof mData.dataIntervensi === "undefined") ? await apiIntervensi() : mData.dataIntervensi;

    const icon_widg3 = /*html*/`
    <div class="btn bg-none text-blue m-0 p-0 mt-n3 mb-n3" id="konvergensi_sasaran" 
    data-title="Konvergensi Sasaran" data-bs-toggle="modal" data-bs-target="#chartModal">
    <i class="material-icons fs-17px">list_alt</i></div>
    `,
      icon_widg4 = /*html*/`
    <div class="btn bg-none text-blue m-0 p-0 mt-n3 mb-n3" id="konvergensi_koordinasi" 
    data-title="Konvergensi Koordinasi" data-bs-toggle="modal" data-bs-target="#chartModal">
    <i class="material-icons fs-17px">list_alt</i></div>
    `;
    const widgetCard2 = await WidgetCard.render('tile-00', '', '', 'lg-12 hide');
    const widgetCard3 = await WidgetCard.render('tile-3', icon_widg3 + 'Konvergensi Sasaran', '', 'lg-12');
    const widgetCard4 = await WidgetCard.render('tile-4', icon_widg4 + 'Korvergensi Koordinasi', '', 'lg-12');
    // const widgetCard4 = await WidgetCard.render('tile-4', 'Capaian RO', '', 'lg-2');

    return /*html*/ `
    <style>
      #poptabel_filter{
        position: relative;
        left: -0.5em;
        top: -1em;
      }
    </style>
      <div class="app-content-padding flex-grow-1 overflow-auto" data-scrollbar="true" data-height="100%">				
        <!-- BEGIN page-header -->
				<h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">corporate_fare</i>Kinerja Pembangunan</h2>
				<!-- END page-header -->
        <div id="main-tiles" class="border rounded">
          <div class="row pt-3 py-3  mx-0 bg-gray-300" id="drp_option">
            <div class="col-xl-3 ">
              <div class="form-group sel_tax">
                <select id="sel_ta" name="sel_ta" class="form-control selectpicker" data-title="Pilih Tahun" data-actions-box="true" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset">
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
            <div class="col-xl-6 hide">
              <div class="form-group sel_ro">
                <select id="sel_ro" name="sel_ro" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Rincian Output" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} RO dipilih">
                </select>
              </div>
            </div>
            <div class="col-xl-3 ">
              <div class="form-group pull-right width-full">
                <input id="kinerjaAnggaranSrc" type="text" class="form-control" placeholder="Search" aria-label="Search" >
                <i class="fa fa-times text-black hide" id="restoreData" style="position: absolute;right: 18px;top: 25px;"></i>
              </div>
            </div>
          </div>        
          <div id="top-tiles00" class="row mx-1 my-3">
            ${widgetCard2}
          </div>

          <div id="top-tiles" class="row m-3">
            <ul class="nav nav-tabs ">
              <li class="nav-item"><a class="nav-link nav-tableX p-0 px-3 py-2 active" onclick="tabElemn(this);" data-active="true" data-tab="1a" data-table="true" >Konvergensi Lokasi </a></li>
              <li class="nav-item"><a class="nav-link nav-tableX p-0 px-3 py-2" onclick="tabElemn(this);" data-active="false" data-tab="2a" data-table="true" >Lokasi Khusus Intervensi</a></li>
            </ul>
            <div class="tab-content rounded-bottom">
            <!--- Tab 1 -->
              <div class="tab-pane fade active show" id="default-tab-1a">
                <div class="col-lg-12">
                  <div class="h-100">
                    <div id="tile-1" class="m-3"></div>
                  </div>
                </div>
              </div>
              <!--- Tab 2 -->
              <div class="tab-pane fade" id="default-tab-2a">
                <div class="col-lg-12">
                  <div class="h-100">
                    <div id="tile-2" class="m-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="top-tiles2" class="row mx-1 my-3">
            ${widgetCard3}    
          </div>
          <div id="top-tiles3" class="row mx-1 my-3">
            ${widgetCard4}
          </div>

          <div class="m-3 hide" id="ro-lokus-detail">
            <div id="peta-ro-lokus" style="height: 36em;" class=" rounded">
            </div>
          </div>

          <div class="m-3" id="tile-detail">
            <ul class="nav nav-tabs ">
              <li class="nav-item"><a class="nav-link nav-table p-0 px-3 py-2 active" onclick="tabElemn(this);" data-active="true" data-tab="1" data-table="true" id="kinerja_pembangunan_form_1">Indikasi Konvergensi Implementasi</a></li>
              <li class="nav-item"><a class="nav-link nav-table p-0 px-3 py-2" onclick="tabElemn(this);" data-active="false" data-tab="2" data-table="true" id="kinerja_pembangunan_form_2">Analisis Kinerja</a></li>
            </ul>
            <div class="tab-content border-top">   
              <div class="card">
                <div class="card-body">
                  <!--- Tab 1 -->       
                  <div class="tab-pane fade active show" id="default-tab-1">
                    <div class="d-flex justify-content-between bd-highlight">              
                      <div class="bd-highlight cursor-pointer open_table1" style="width: 6%;">
                        <div class="fs-12px fw-600 position-relative ">                  
                          <i class="material-icons fs-15px text-green-400">close_fullscreen</i> 
                          <span class="position-absolute top-50 start-5 translate-middle-y ps-1 material-text">Open All</span>
                        </div>
                      </div>

                      ${user.export ? /*html*/`<div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700 my-2 mt-n1 fs-11px" >
                        <div class="bd-highlight">
                          <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer fs-15px text-green-400"  title="export xls" id="download-xlsx-kp1"></i>
                        </div> 
                        <div class="bd-highlight">
                          <div class="fs-12px fw-700">Download : </div>
                        </div>            
                      </div>` : ""}

                    </div>

                    <div id="kinerja-table" class="is-bordered is-narrow rounded-bottom"></div>
                  </div>
                  <!--- Tab 2 -->
                  <div class="tab-pane fade" id="default-tab-2">
                    <div class="d-flex justify-content-between bd-highlight">              
                      <div class="bd-highlight cursor-pointer open_table2" style="width: 6%;">
                        <div class="fs-12px fw-600 position-relative ">                  
                          <i class="material-icons fs-15px text-green-400">close_fullscreen</i> 
                          <span class="position-absolute top-50 start-5 translate-middle-y ps-1 material-text">Open All</span>
                        </div>
                      </div>

                      ${user.export ? /*html*/`<div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700 my-2 mt-n1 fs-11px" >
                        <div class="bd-highlight">
                          <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer fs-15px text-green-400"  title="export xls" id="download-xlsx-kp2"></i>
                        </div> 
                        <div class="bd-highlight">
                          <div class="fs-12px fw-700">Download : </div>
                        </div>            
                      </div>` : " "}

                    </div>

                    <div id="kinerja-table2" class="is-bordered is-narrow rounded-bottom"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- Modal -->
      <div class="modal modal-message  fade" id="chartModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" style="margin: 3% 35%; width: 37%;border-radius: 11px;">          
          <div class="modal-content" style="border-radius: inherit;">
            <div class="modal-header bg-gray-300" style="width: 100%;">
              <h5 class="modal-title" id="title"></h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body w-100" id="popUp">
            </div>          
          </div>
        </div>
      </div>
      <!-- End Modal -->
      <!-- Modal -->
      <div class="modal fade" id="chartModal2" tabindex="-1"  aria-hidden="true">
        <div class="modal-dialog " >
          <div class="modal-content" >  
            <div class="modal-header bg-gray-300">
              <h4 class="modal-title" id="title" ></h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body" id="viewData">
            </div>			
          </div>
        </div>
      </div>
      <!-- End Modal -->
    `;
  },
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */
  after_render: async () => {
    $(function () {
      $('select').selectpicker();
    });

    let
      thID = document.getElementById('sel_ta'),
      klID = document.getElementById('sel_kl'),
      intID = document.getElementById('sel_int'),
      dKementerian = [],
      //dTahunSemester = [],
      dIntervensi = [],
      plancontainer = () => {
        let spincontainer = /*html*/ `
        <div class="d-flex justify-content-center ">
            <div class="spinner-border text-orange mt-2 " role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>`;
        document.getElementById('tile-00').innerHTML = spincontainer;
        document.getElementById('tile-1').innerHTML = spincontainer;
        document.getElementById('tile-2').innerHTML = spincontainer;
        document.getElementById('tile-3').innerHTML = spincontainer;
        document.getElementById('tile-4').innerHTML = spincontainer;
      };

    /* mData.dataSemester.forEach((item) => {
      dTahunSemester.push(
        `<option value="${item.tahun}-${item.semester}" selected="selected">${item.tahun} - Semester ${item.semester}</option>`
      );
    }); */

    let dTahunSemester = [
      `<option value="2021-1" selected="selected">2021 - Semester 1</option>`,
      `<option value="2022-1" >2022 - Semester 1</option>`,
      `<option value="2022-2" >2022 - Semester 2</option>`
    ];
    thID.innerHTML = dTahunSemester.join(" ");
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

    let
      periode = document.getElementById("sel_ta").value,
      getSel_kl = document.getElementById("sel_kl"),
      getSel_int = document.getElementById("sel_int"),
      sel_kl = [],
      sel_int = [];
    ;
    Object.values(getSel_kl.options).forEach((row) => {
      sel_kl.push(row.getAttribute("value"));
    });
    Object.values(getSel_int.options).forEach((row) => {
      sel_int.push(row.getAttribute("value"));
    });

    async function getPembangunan(periode, kl, int, search) {
      let perData = periode.split("-");
      try {
        let res = await fetch(config.api_url + '/iki/indikasi-konvergensi-implementasi', {
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

    async function getPembangunan2(periode, kl, int, search) {
      let perData = periode.split("-");
      try {
        let res = await fetch(config.api_url + '/ak/analisis-kinerja', {
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

    /*------------------------------GET DATA---------------------------------------*/
    await getPembangunan(periode, sel_kl, sel_int).then(function (data) {
      let search = document.getElementById("kinerjaAnggaranSrc").value;
      tile_kinerja_pembangunan(data, periode, sel_kl, sel_int, search);
      tableData(data);
    });

    $("#kinerja_pembangunan_form_1").on("click", async function () {
      plancontainer();
      let multi_tahun = $('#sel_ta').val(),
        search = document.getElementById("kinerjaAnggaranSrc").value,
        multi_kl = $("#sel_kl").val(),
        multi_int = $("#sel_int").val()
        ;
      var opsiTabelx;
      if ($(".open_table1").hasClass('opentable')) {
        opsiTabelx = { expand: true };
      } else {
        opsiTabelx = { expand: false };
      }
      await getPembangunan(multi_tahun, multi_kl, multi_int, search).then(function (data) {
        tile_kinerja_pembangunan(data, multi_tahun, multi_kl, multi_int, search);
        tableData(data, opsiTabelx);
      });
    });

    $("#kinerja_pembangunan_form_2").on("click", async function () {
      plancontainer();
      let tahun = $('#sel_ta').val(),
        search = $("#kinerjaAnggaranSrc").val(),
        kl = $("#sel_kl").val(),
        int = $("#sel_int").val()
        ;
      var opsiTabelx;
      if ($(".open_table2").hasClass('opentable')) {
        opsiTabelx = { expand: true };
      } else {
        opsiTabelx = { expand: false };
      }

      await getPembangunan2(tahun, kl, int, search).then(function (data) {
        tableData2(data, opsiTabelx);
        tile_kinerja_pembangunan(data, tahun, kl, int, search);
      });
    });

    $("#kinerjaAnggaranSrc").keypress(async function (e) {
      let
        key = e.which,
        search = $(this).val(),
        html = '',
        tahun = $("#sel_ta").val(),
        kl = $("#sel_kl").val(),
        int = $("#sel_int").val();

      if (key == 13)  // the enter key code
      {
        plancontainer();
        $("#restoreData").removeClass('hide');
        $(this).after(html);

        if ($("#kinerja_pembangunan_form_1").data("active")) {
          await getPembangunan(tahun, kl, int, search).then(function (data) {
            tile_kinerja_pembangunan(data, tahun, kl, int, search);
            tableData(data);
          });
        } else {
          await getPembangunan2(tahun, kl, int, search).then(function (data) {
            tile_kinerja_pembangunan(data, tahun, kl, int, search);
            tableData2(data);
          });
        }
      }
    });

    $("#sel_ta, #sel_kl, #sel_int").on('change', async () => {
      plancontainer();
      let
        tahun = $('#sel_ta').val(),
        search = document.getElementById("kinerjaAnggaranSrc").value,
        kl = $("#sel_kl").val(),
        int = $("#sel_int").val()
        ;
      if ($("#kinerja_pembangunan_form_1").data("active")) {
        await getPembangunan(tahun, kl, int, search).then(function (data) {
          tile_kinerja_pembangunan(data, tahun, kl, int, search);
          tableData(data);
        });
      } else {
        await getPembangunan2(tahun, kl, int, search).then(function (data) {
          tile_kinerja_pembangunan(data, tahun, kl, int, search);
          tableData2(data);
        });
      }
    });



    $(".open_table1").on("click", async function () {

      var opsiTabelx;
      $(this).toggleClass('opentable');
      if ($(this).hasClass('opentable')) {
        $(this).find(".material-icons").html("open_in_full");
        $(this).find(".material-text").html("Close All");
        opsiTabelx = { expand: true };
      } else {
        $(this).find(".material-icons").html("close_fullscreen");
        $(this).find(".material-text").html("Open All");
        opsiTabelx = { expand: false };
      }


      let multi_tahun = $('#sel_ta').val(),
        search = document.getElementById("kinerjaAnggaranSrc").value,
        multi_kl = $("#sel_kl").val(),
        multi_int = $("#sel_int").val()
        ;
      await getPembangunan(multi_tahun, multi_kl, multi_int, search).then(function (data) {
        tableData(data, opsiTabelx);
      });
    });

    $(".open_table2").on("click", async function () {

      var opsiTabelx;
      $(this).toggleClass('opentable');
      if ($(this).hasClass('opentable')) {
        $(this).find(".material-icons").html("open_in_full");
        $(this).find(".material-text").html("Close All");
        opsiTabelx = { expand: true };
      } else {
        $(this).find(".material-icons").html("close_fullscreen");
        $(this).find(".material-text").html("Open All");
        opsiTabelx = { expand: false };
      }


      let multi_tahun = $('#sel_ta').val(),
        search = document.getElementById("kinerjaAnggaranSrc").value,
        multi_kl = $("#sel_kl").val(),
        multi_int = $("#sel_int").val()
        ;
      await getPembangunan2(multi_tahun, multi_kl, multi_int, search).then(function (data) {
        tableData2(data, opsiTabelx);
      });
    });

    /*Form 1*/
    async function tableData(result, opsiTabel = { expand: false }) {

      //let opsiTabel = { expand: false };
      const tablePenandaanData = () => {
        let data = Object.values(result.detail);
        data.sort((a, b) => a.kementerian_kode > b.kementerian_kode && 1 || -1)
        data.forEach((item, i) => {
          item.id = i + 1;
        });
        return data;
      }
      var dataX = [];
      const table = new Tabulator("#kinerja-table", {
        height: "579px",
        data: tablePenandaanData(),
        index: "kl_id",
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
        //printAsHtml: true,
        columns: [
          {
            title: "No",
            titleDownload: "No",
            field: "id", visible: true, sorter: "number", hozAlign: "center", headerHozAlign: "center", frozen: true
          },
          {
            title: "K/L, Program, Kegiatan, <br> RO",
            titleDownload: "K/L, Program, Kegiatan, RO",
            accessorDownload: cleanTextDownload,
            headerMenuIcon: "<i class='fas fa-lg fa-fw fa-grip-vertical text-primary-700' title='Menu Header'></i>",
            headerMenu: headerMenu,
            field: "name", width: 300, responsive: 0, frozen: true,
            formatter: function (cell, formatterParams) {

              let
                value = cell.getValue(),
                ncode;
              if (typeof cell._cell.row.data.ro_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1" >' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' p-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' p-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + ' p-1">' + cell._cell.row.data.kro_id + '</span><span class="' + color_ro + '  badge-right p-1">' + cell._cell.row.data.ro_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kro_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '" ><span class=" badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' p-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' p-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + '  badge-right p-1">' + cell._cell.row.data.kro_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kegiatan_id !== 'undefined') {
                ncode = '<div class="badge  ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' p-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' p-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + '  badge-right p-1">' + cell._cell.row.data.kegiatan_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.program_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' p-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + '  badge-right p-1">' + cell._cell.row.data.program_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.intervensi_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + '  badge-right p-1">' + cell._cell.row.data.intervensi_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kl_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '" ><span class=" badge-main ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span></div>';
              }
              return '<span style="padding-right: 2em;"> ' + ncode + ' ' + cell._cell.row.data.name + '</span >';
            }
          } //never hide this column
          ,
          {
            title: "&Sigma; Prog. ",
            titleDownload: "Program",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: function (e, columns) {
              return columns.hide();
            },
            field: "jml_program",
            titleDownload: "Program",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            width: 85, hozAlign: "center", formatter: "money", bottomCalc: "sum", formatterParams: { precision: false },
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return value == 0 ? "" : value;
            }
          },
          {
            title: "&Sigma; Keg. ",
            titleDownload: "Kegiatan",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "jml_kegiatan", width: 85, hozAlign: "center", formatter: "money", bottomCalc: "sum", formatterParams: { precision: false },
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return value == 0 ? "" : value;
            }
          },
          {
            title: "&Sigma; RO ",
            titleDownload: "RO",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "jml_ro", width: 85, hozAlign: "center", formatter: "money", bottomCalc: "sum", formatterParams: { precision: false },
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return value == 0 ? "" : value;
            }
          },
          {
            title: "Kesesuaian Lokasi (Jumlah Kab/Kota)",
            columns: [
              {
                title: "Jumlah Lokasi <br>(Kab/Kota) Prioritas",
                titleDownload: "Jumlah Lokasi (Kab/Kota) Prioritas",
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                field: "lokasi_prioritas_desc", hozAlign: "right", formatter: "money", width: 150,
                sorter: "alphanum", headerHozAlign: "center", hozAlign: "right",
                formatter: function (cell, formatterParams) {
                  var
                    hasil,
                    cel1 = cell._cell.row.data.lokasi_prioritas;
                  if (cel1) {
                    hasil = hasil = stringOrCurrency(cell.getValue());
                  } else {
                    hasil = cell.getValue();
                  }
                  return hasil;
                }
              },
              {
                title: "Jumlah Lokasi <br>(Kab/Kota) Lainnya",
                titleDownload: "Jumlah Lokasi (Kab/Kota) Lainnya",
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                field: "non_lokasi_prioritas_desc", hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150,
                formatter: function (cell, formatterParams) {
                  return stringOrCurrency(cell.getValue());
                }
              },
              {
                title: "Total", field: "total_lokasi",
                titleDownload: "Total",
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150,
                formatter: function (cell, formatterParams) {
                  return stringOrCurrency(cell.getValue());
                }
              },
            ]
          },
          {
            title: "Kesesuaian Target (Jumlah Sasaran Penerima)",
            columns: [
              {
                title: "Satuan", field: "satuan",
                titleDownload: "Satuan",
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                hozAlign: "center", formatter: "money", formatterParams: { precision: false }, width: 150
              },
              {
                title: "Sasaran Prioritas (1000 HPK)",
                columns: [
                  {
                    title: "Ya/Tidak",
                    accessorDownload: booleanDownload,
                    titleDownload: "Sasaran Prioritas (1000 HPK) (Ya/Tidak)",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "sasaran_prioritas", hozAlign: "center", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      return yesNo(cell.getValue());
                    }
                  },
                  {
                    title: "Jumlah", field: "sasaran_prioritas_jml",
                    titleDownload: "Jumlah",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      var
                        value = cell.getValue(),
                        cel1 = cell._cell.row.data.sasaran_prioritas,
                        hasil;
                      if (!cel1) {
                        hasil = '';
                      } else {
                        hasil = stringOrCurrency(value);
                      }
                      return hasil;
                    }
                  }
                ]
              },
              {
                title: "Sasaran Penting <br> (Anak usia 24 - 59 bulan, wanita usia subur, atau remaja putri)",
                titleDownload: "Sasaran Penting (Anak usia 24 - 59 bulan, wanita usia subur, atau remaja putri)",
                columns: [
                  {
                    title: "Ya/Tidak",
                    accessorDownload: booleanDownload,
                    titleDownload: "Sasaran Penting (Anak usia 24 - 59 bulan, wanita usia subur, atau remaja putri) (Ya/Tidak)",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "sasaran_penting", hozAlign: "center", formatterParams: { precision: false }, width: 210,
                    formatter: function (cell, formatterParams) {
                      return yesNo(cell.getValue());
                    }
                  },
                  {
                    title: "Jumlah", field: "sasaran_penting_jml",
                    titleDownload: "Jumlah",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 210,
                    formatter: function (cell, formatterParams) {
                      var
                        value = cell.getValue(),
                        cel1 = cell._cell.row.data.sasaran_penting,
                        hasil;
                      if (!cel1) {
                        hasil = '';
                      } else {
                        hasil = stringOrCurrency(value);
                      }
                      return hasil;
                    }
                  }
                ]
              },
              {
                title: "Lainnya",
                columns: [
                  {
                    title: "Ya/Tidak",
                    accessorDownload: booleanDownload,
                    titleDownload: "Lainnya (Ya/Tidak)",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "sasaran_lainnya", hozAlign: "center", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      return yesNo(cell.getValue());
                    }
                  },
                  {
                    title: "Jika ya, Sebutkan",
                    titleDownload: "Jika ya, Sebutkan (Ya/Tidak)",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "sasaran_lainnya_1", hozAlign: "center", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      return stringOrCurrency(cell.getValue());
                    }
                  },
                  {
                    title: "Jumlah", field: "sasaran_lainnya_jml",
                    titleDownload: "Jumlah",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      return stringOrCurrency(cell.getValue());
                    }
                  }
                ]
              },
            ]
          },
          {
            title: "Koordinasi dengan Stakeholde",
            columns: [
              {
                title: "K/L Lainnya",
                columns: [
                  {
                    title: "Ya/Tidak",
                    accessorDownload: booleanDownload,
                    titleDownload: "Koordinasi dengan Stakeholde (Ya/Tidak)",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "koord_kl", hozAlign: "center", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      return yesNo(cell.getValue());
                    }
                  }
                ]
              },
              {
                title: "Pemda",
                columns: [
                  {
                    title: "Ya/Tidak",
                    accessorDownload: booleanDownload,
                    titleDownload: "Pemda (Ya/Tidak)",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "koord_pemda", hozAlign: "center", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      return yesNo(cell.getValue());
                    }
                  }
                ]
              },
              {
                title: "Non Pemerintah",
                columns: [
                  {
                    title: "Ya/Tidak",
                    accessorDownload: booleanDownload,
                    titleDownload: "Non Pemerintah (Ya/Tidak)",
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "koord_non", hozAlign: "center", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      return yesNo(cell.getValue());
                    }
                  }
                ]
              }
            ]
          }
        ],
        initialSort: [
          { column: "id", dir: "asc" }
        ]
      });
      if (user.export) {
        document.getElementById("download-xlsx-kp1").addEventListener("click", function () {
          table.download("xlsx", "kinerja_pembangunan_1.xlsx", { sheetName: "data" });
        });
      }

      var mmm = () => {
        table.recalc();
      };
      return table;
    }

    /*-----------------------------------------------------------------------------------------------------*/

    $("#kinerja_pembangunan_form_1").on("click", function () {
      $("#default-tab-1").removeClass("hide");
      $("#default-tab-2").addClass("hide");
    });

    $("#kinerja_pembangunan_form_2").on("click", function () {
      $("#default-tab-2").removeClass("hide");
      $("#default-tab-1").addClass("hide");
    });
    /*Form 2*/
    async function tableData2(result, opsiTabel = { expand: false }) {

      //let opsiTabel = { expand: false };
      const tablePenandaanData = () => {
        let data = Object.values(result.detail);
        data.sort((a, b) => a.kementerian_kode > b.kementerian_kode && 1 || -1)
        data.forEach((item, i) => {
          item.id = i + 1;
        });
        return data;
      }

      const table = new Tabulator("#kinerja-table2", {
        height: "579px",
        data: tablePenandaanData(),
        index: "kl_id",
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
          {
            title: "No",
            titleDownload: "No",
            field: "id", visible: true, sorter: "number", hozAlign: "center", headerHozAlign: "center", frozen: true
          },
          {
            title: "K/L, <br> Program, <br> Kegiatan, <br> RO <br> &nbsp",
            titleDownload: "K/L,Program,Kegiatan,RO",
            accessorDownload: cleanTextDownload,
            headerMenuIcon: "<i class='fas fa-lg fa-fw fa-grip-vertical text-primary-700' title='Menu Header'></i>",
            headerMenu: headerMenu,
            field: "name", width: 350, responsive: 0, frozen: true,
            formatter: function (cell, formatterParams) {
              let
                value = cell.getValue(),
                ncode;
              if (typeof cell._cell.row.data.ro_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class=" badge-left ' + c_kl + ' px-1" >' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' px-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' px-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' px-1">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + ' px-1">' + cell._cell.row.data.kro_id + '</span><span class="' + color_ro + '   badge-right px-1">' + cell._cell.row.data.ro_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kro_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '" ><span class=" badge-left ' + c_kl + ' px-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' px-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' px-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' px-1">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + '  badge-right px-1">' + cell._cell.row.data.kro_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kegiatan_id !== 'undefined') {
                ncode = '<div class="badge  ' + c_main + '"><span class=" badge-left ' + c_kl + ' px-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' px-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' px-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + '  badge-right px-1">' + cell._cell.row.data.kegiatan_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.program_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class=" badge-left ' + c_kl + ' px-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' px-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + '  badge-right px-1">' + cell._cell.row.data.program_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.intervensi_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class="  badge-left ' + c_kl + ' px-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + '  badge-right px-1">' + cell._cell.row.data.intervensi_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kl_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '" ><span class=" badge-main ' + c_kl + ' px-1">' + cell._cell.row.data.kl_id + '</span></div>';
              }
              return '<span style="padding-right: 2em;"> ' + ncode + ' ' + cell._cell.row.data.name + '</span >';
            }
          }, /* //never hide this column */
          /* KOL 2 */
          {
            title: "<br/> <br/> &Sigma; Prog. <br/> <br/>",
            titleDownload: "Program",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "jml_program",
            titleDownload: "Program",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            width: 85, hozAlign: "center", formatter: "money", formatterParams: { precision: false },
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return value == 0 ? "" : value;
            }
          },
          {
            title: "<br/> <br/> &Sigma; Keg. <br/> <br/>",
            titleDownload: "Kegiatan",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "jml_kegiatan",
            width: 85, hozAlign: "center", formatter: "money", formatterParams: { precision: false },
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return value == 0 ? "" : value;
            }
          }, {
            title: "<br/> <br/> &Sigma; KRO <br/> <br/>",
            titleDownload: "KRO",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "jml_kro", width: 85, hozAlign: "center", formatter: "money", formatterParams: { precision: false },
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return value == 0 ? "" : value;
            }
          }, {
            title: "<br/> <br/> &Sigma; RO <br/> <br/>",
            titleDownload: "RO",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "jml_ro", width: 85, hozAlign: "center", formatter: "money", formatterParams: { precision: false },
            formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              return value == 0 ? "" : value;
            }
          },
          {
            title: "Aktivitas/Uraian Kegiatan <br> (bentuk aktivitas, jenis intervensi, kapan dilaksanakan, <br> periode pelaksanaan, stakeholder, <br> dll)<br> &nbsp",
            titleDownload: "Aktivitas/Uraian Kegiatan (bentuk aktivitas, jenis intervensi, kapan dilaksanakan, periode pelaksanaan, stakeholder, dll)",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "aktivitas", hozAlign: "left", formatter: "textarea", width: 150,
            formatter: htmlWrapFormatter, variableHeight: true
          },
          /* KOL 3 */
          {
            title: "Analisis Gap antara Capaian Kinerja <br>dengan Target",
            columns: [
              {
                title: "Kinerja Anggaran", field: "analisis_gap_ka",
                titleDownload: "Kinerja Anggaran",
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                hozAlign: "left", formatter: "money", formatterParams: { precision: false }, width: 250,
                formatter: htmlWrapFormatter, variableHeight: true
              },
              {
                title: "Kinerja Output", field: "analisis_gap_ko",
                titleDownload: "Kinerja Output",
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                hozAlign: "left", formatter: "money", formatterParams: { precision: false }, width: 250,
                formatter: htmlWrapFormatter, variableHeight: true
              },
            ]
          },
          /* KOL 4 */
          {
            title: "Dampak Pandemi Covid-19 melalui <br> kebijakan penghematan anggaran serta implementasinya",
            columns: [
              {
                title: "Ada Penghematan <br> (ya/tidak)",
                titleDownload: "Ada Penghematan (ya/tidak)",
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                accessorDownload: booleanDownload,
                field: "penghematan", hozAlign: "center", formatter: "money", formatterParams: { precision: false }, width: 250,
                formatter: function (cell, formatterParams) {
                  var value = ((cell.getValue() == "") || (cell.getValue() == null)) ? "" : (cell.getValue().toLowerCase() == "ya" ? yesNo(true) : yesNo(false));
                  return value;
                }
              },
              {
                title: "Target output turun <br> (ya/tidak)",
                titleDownload: "Target output turun (ya/tidak)",
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                accessorDownload: booleanDownload,
                field: "target_turun", hozAlign: "center", formatter: "money", formatterParams: { precision: false }, width: 250,
                formatter: function (cell, formatterParams) {
                  var value = ((cell.getValue() == "") || (cell.getValue() == null)) ? "" : (cell.getValue().toLowerCase() == "ya" ? yesNo(true) : yesNo(false));
                  return value;
                }
              },
              {
                title: "Keterangan  (penyelesaian revisi DIPA, <br/> perubahan skema implementasi, dll.)",
                titleDownload: "Keterangan  (penyelesaian revisi DIPA, perubahan skema implementasi, dll.)",
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                field: "keterangan", hozAlign: "left", formatter: "textarea", formatterParams: { precision: false }, width: 250,
                formatter: htmlWrapFormatter, variableHeight: true
              },
            ]
          },
          /* KOL 5 */
          {
            title: "Reviu permasalahan/faktor keberhasilan, termasuk <br> dengan penanganan pandemi covid-19 <br> (dari sisi perencanaan & penganggaran, proses pelaksanaan, <br> keterlibatan / peran serta pemangku kepentingan, <br> atau aspek lain yang relevan) ",
            titleDownload: "Reviu permasalahan/faktor keberhasilan, termasuk dengan penanganan pandemi covid-19 (dari sisi perencanaan & penganggaran, proses pelaksanaan, keterlibatan / peran serta pemangku kepentingan, atau aspek lain yang relevan) ",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "reviu", hozAlign: "left", formatter: "textarea", formatterParams: { precision: false }, width: 250,
            formatter: htmlWrapFormatter, variableHeight: true
          },
          {
            title: "Rekomendasi <br> Perbaikan <br> pada  <br> Semester II <br> &nbsp",
            titleDownload: "Rekomendasi Perbaikan pada Semester II",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "rekomendasi", hozAlign: "left", formatter: "textarea", formatterParams: { precision: false }, width: 250,
            formatter: htmlWrapFormatter, variableHeight: true
          }
        ],
        initialSort: [
          { column: "id", dir: "asc" }
        ]
      });

      if (user.export) {
        document.getElementById("download-xlsx-kp2").addEventListener("click", function () {
          table.download("xlsx", "kinerja_pembangunan_2.xlsx", { sheetName: "data" });
        });
      }
      /* document.getElementById("download-pdf-kp2").addEventListener("click", function () {
        table.download("pdf", "Analisis Kinerja.pdf", {
          orientation: "landscape", //set page orientation to portrait
          title: "Analisis Kinerja", //add title to report
          unit: 'in',
          format: 'tabloid',
          autoTable: function (doc) {
            //doc.text("SOME TEXT", 1, 3);
            return {
              styles: { fontsize: 7 },
              columnStyles: {
                0: { cellWidth: 100 }
              },
              
            }
          },
          documentProcessing: function (doc) {
          }
        });
      }); */

      return table;
    }

    async function tile_kinerja_pembangunan(result, tahun, kl, int, search) {
      //console.log("result", result);
      var
        rData,
        periode = tahun,
        perData = periode.split("-"),
        dataTile = result.tile,
        tile00 = document.getElementById('tile-00'),
        tile1 = document.getElementById('tile-1'),
        tile2 = document.getElementById('tile-2'),
        tile3 = document.getElementById('tile-3'),
        tile4 = document.getElementById('tile-4'),
        periode = document.getElementById("sel_ta").value;
      if (result.detail.length > 0) {
        $("#top-tiles,#top-tiles2,#top-tiles3,#tile-detail").show();
        let konvergensiLokasi = () => {

          tile1.innerHTML = /*html*/ `
            <div class="btn bg-none text-blue m-0 p-0 mt-n3 mb-n3" id="kesesuaian_lokasi" data-title="Kesesuaian Lokasi RO" data-bs-toggle="modal" data-bs-target="#chartModal">
              <i class="material-icons fs-17px">list_alt</i>
            </div> 
            <span class="h6">Detail</span>
            <div id="my_treex" class="my-3 mx-auto" style="width:50em">
              <div id="wrapper" class="fs-9px">
                <span class="labelx" style="background: #68b7dc;height: 4em;margin-left: 6em;"> 
                  &Sigma;  RO : <span id="tTreeRo1" class="badge bg-yellow text-black f-s-12">0</span>
                </span>
                <div class="branch lv1">
                  <div class="entry">
                    <span class="labelx  f-s-10 wdTree" style="background: green;top: 38%;"><span class="noLeft">1.</span> Dilaksanakan <br>di Kab/Kota Lokus <br>   &Sigma;  RO : <span id="tTreeRo2a" class="badge bg-yellow text-black f-s-10">0</span></span>
                    <div class="branch lv2">
                      <div class="entry">
                        <span class="labelx f-s-9  wdTree " style="background: green;top:16%">
                          <span class="noLeft">a.</span>Menyasar pada <br> >360 Kab/Kota Lokus <br>  &Sigma;  RO : <span id="tTreeRo3a" class="badge bg-yellow text-black f-s-10">0</span>
                        </span>
                        <div class="branch lv3">
                          <div class="entry sole"><span class="labelx  f-s-9  wdTree level4" style="background: green;top: 16%;">Memiliki <br>  Kab/Kota Non-Lokus <br>  &Sigma;  RO : <span id="tTreeRo4a" class="badge bg-yellow text-black f-s-10">0</span></span></div>
                        </div>
                      </div>
                      <div class="entry lv3">
                        <span class="labelx f-s-9 wdTree" style="background: #6894dc;top: 16em;">
                          <span class="noLeft">b.</span> Menyasar pada <br> <=360 Kab/Kota Lokus <br>  &Sigma;  RO : <span id="tTreeRo3b" class="badge bg-yellow text-black f-s-10">0</span>
                        </span>
                        <div class="branch lv3" style="top: 12.17em;">
                          <div class="entry">
                            <span class="labelx  f-s-9  wdTree level4" style="background: #6894dc;margin-top: -4em;">Tidak ada <br>  Kab/Kota Non-Lokus <br> &Sigma;  RO : <span id="tTreeRo4b" class="badge bg-yellow text-black f-s-10">0</span>
                            </span>
                          </div>										
                          <div class="entry last-tree">
                            <span class="labelx  f-s-9  wdTree level4" style="background: #6894dc;top: 11.3em;">Memiliki<br>   Kab/Kota Non-lokus <br> &Sigma; RO : <span id="tTreeRo4c" class="badge bg-yellow text-black f-s-10">0</span>
                            </span>
                          </div>
                        </div>
                      </div>									
                    </div>
                  </div>
                  <div class="entry r1"><span class="labelx  f-s-9 wdTree" style="background: #dc8c67;top: -2em;"><span class="noLeft">2.</span>Dilaksanakan <br> di level Pusat <br>  &Sigma;  RO : <span id="tTreeRo2b" class="badge bg-yellow text-black f-s-10">0</span> </span></div>
                  <div class="entry r2 lev1_adjust"><span class="labelx  f-s-9 wdTree" style="background: #c767dc;top: 0.9em;"><span class="noLeft">3.</span>Dilaksanakan <br> di level Provinsi <br>  &Sigma;  RO : <span id="tTreeRo2c" class="badge bg-yellow text-black f-s-10">0</span></span></div>
                  <div class="entry r3 "><span class="labelx  f-s-9 wdTree" style="background: #4b0082;top: 3.5em;"><span class="noLeft">4.</span>Dilaksanakan <br> di non-Kab/Kota Lokus <br>  &Sigma;  RO : <span id="tTreeRo2d" class="badge bg-yellow text-black f-s-10">0</span></span></div>
                </div>
              </div>
            </div>`;

          $("#tTreeRo1").html(dataTile.kesesuaianLokus.total_ro);
          $("#tTreeRo2a").html(dataTile.kesesuaianLokus.dilaksanakan_level_kota);
          $("#tTreeRo2b").html(dataTile.kesesuaianLokus.dilaksanakan_level_pusat);
          $("#tTreeRo2c").html(dataTile.kesesuaianLokus.dilaksanakan_level_provinsi);
          $("#tTreeRo2d").html(dataTile.kesesuaianLokus.dilaksanakan_lokasi_prioritas);
          $("#tTreeRo3a").html(dataTile.kesesuaianLokus.menyasar_mt_360_kota);
          $("#tTreeRo3b").html(dataTile.kesesuaianLokus.menyasar_lte_360_kota);
          $("#tTreeRo4a").html(dataTile.kesesuaianLokus.menyasar_mt_360_kota_kota_non_lokus);
          $("#tTreeRo4b").html(dataTile.kesesuaianLokus.menyasar_lte_360_kota_kota_none_non_lokus);
          $("#tTreeRo4c").html(dataTile.kesesuaianLokus.menyasar_lte_360_kota_kota_non_lokus);

          let tabPop = /*html*/ `
            <div class="container p-0 ps-2">
              <div class="row pt-1 fs-11px ">
                <div class="col fw-600 m-0 p-0 pe-2">                
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">Total RO</div>
                    <div class=" bd-highlight" id="tot_ro">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">1. Dilaksanakan pada Kab/Kota Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">a. Menyasar pada >360 Kab/Kota Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1a">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-3">&#183; Memiliki Kab/Kota Non-Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1aa">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">b. Menyasar pada <=360 Kab/Kota Lokus</div>
                    <div class=" bd-highlight"  id="tot_ro_1b">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-3">&#183; Tidak ada kab/kota Non-Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1ba">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-3">&#183; Memiliki kab/kota Non-lokus</div>
                    <div class=" bd-highlight" id="tot_ro_1bb">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">2. Dilaksanakan di level Pusat</div>
                    <div class=" bd-highlight" id="tot_ro_2">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">3. Dilaksanakan di level Provinsi</div>
                    <div class=" bd-highlight" id="tot_ro_3">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">4. Dilaksanakan di non Kab/Kota Lokus</div>
                    <div class=" bd-highlight" id="tot_ro_4">0</div>    
                  </div>
                </div>              
              </div>
            </div>`;

          $("#kesesuaian_lokasi").on("click", function () {

            $(".modal #title").html('<i class="material-icons ms-n2 me-1">list_alt</i>' + $(this).data("title"));
            $("#popUp").html(" ");
            $("#popUp").html(tabPop);

            $("#tot_ro").html(dataTile.kesesuaianLokus.total_ro);
            $("#tot_ro_1").html(dataTile.kesesuaianLokus.dilaksanakan_level_kota);
            $("#tot_ro_2").html(dataTile.kesesuaianLokus.dilaksanakan_level_pusat);
            $("#tot_ro_3").html(dataTile.kesesuaianLokus.dilaksanakan_level_provinsi);
            $("#tot_ro_4").html(dataTile.kesesuaianLokus.dilaksanakan_lokasi_prioritas);
            $("#tot_ro_1a").html(dataTile.kesesuaianLokus.menyasar_mt_360_kota);
            $("#tot_ro_1b").html(dataTile.kesesuaianLokus.menyasar_lte_360_kota);
            $("#tot_ro_1aa").html(dataTile.kesesuaianLokus.menyasar_mt_360_kota_kota_non_lokus);
            $("#tot_ro_1ba").html(dataTile.kesesuaianLokus.menyasar_lte_360_kota_kota_none_non_lokus);
            $("#tot_ro_1bb").html(dataTile.kesesuaianLokus.menyasar_lte_360_kota_kota_non_lokus);
          });
        }

        let lokusIntervensi = async () => {
          try {
            let res = await fetch(config.api_url + '/iki/chart-2', {
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
            rData = _res.data;
          } catch (e) {
            return false;
          }

          tile2.innerHTML = /*html*/ `
            <div class="btn bg-none text-blue m-0 p-0 mt-n3 mb-n3" id="lokasi_perintv" data-title="Lokasi Per intervensi" data-bs-toggle="modal" data-bs-target="#chartModal">
              <i class="material-icons fs-17px">list_alt</i>
            </div>
            <span class="h6">Detail</span>
            <div id="chartdiv3" style="height: 32em;margin-left: -1.1em;"></div>`;

          am4core.ready(function () {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            var chart = am4core.create('chartdiv3', am4charts.XYChart)
            chart.colors.step = 5;
            chart.legend = new am4charts.Legend()
            chart.legend.position = 'bottom'
            chart.legend.paddingBottom = 0
            chart.legend.labels.template.maxWidth = 10
            chart.fontSize = 9;
            //xAxis.renderer.minGridDistance = 50;

            var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
            //xAxis.dataFields.category = 'category'
            xAxis.dataFields.category = 'intervensi_nama'
            xAxis.renderer.cellStartLocation = 0.1
            xAxis.renderer.cellEndLocation = 0.9
            xAxis.renderer.grid.template.location = 0;
            //xAxis.renderer.cellStartLocation = 0.1;
            //xAxis.renderer.cellEndLocation = 0.1;
            //xAxis.renderer.grid.template.location = 0;
            //xAxis.startLocation = -0.3;
            xAxis.renderer.minGridDistance = 50;

            var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
            yAxis.min = 0;

            function createSeries(value, name) {
              //console.log("value", value);
              var series = chart.series.push(new am4charts.ColumnSeries())
              series.dataFields.valueY = value
              //series.dataFields.categoryX = 'category'
              series.dataFields.categoryX = 'intervensi_nama';
              //series.dataFields.width = 10;
              series.name = name;
              series.tooltipText = "{name}: [bold]{valueY}[/]";


              series.events.on("hidden", arrangeColumns);
              series.events.on("shown", arrangeColumns);
              //series.columns.template.width = am4core.percent(80);              

              /* var bullet = series.bullets.push(new am4charts.LabelBullet())
              bullet.interactionsEnabled = false
              bullet.dy = -10;
              bullet.label.text = '{valueY}'
              bullet.label.fill = am4core.color('#333') */

              return series;
            }

            chart.data = rData;
            createSeries('lokasi_kota', 'Kab/Kota');
            createSeries('lokasi_provinsi', 'Propinsi ');
            createSeries('lokasi_pusat', 'Pusat');

            function arrangeColumns() {
              var series = chart.series.getIndex(0);
              var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
              if (series.dataItems.length > 1) {
                var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
                var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
                var delta = ((x1 - x0) / chart.series.length) * w;
                if (am4core.isNumber(delta)) {
                  var middle = chart.series.length / 2;
                  var newIndex = 0;
                  chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                      series.dummyData = newIndex;
                      newIndex++;
                    }
                    else {
                      series.dummyData = chart.series.indexOf(series);
                    }
                  })
                  var visibleCount = newIndex;
                  var newMiddle = visibleCount / 2;

                  chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;
                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta
                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                  })
                }
              }
            }
            // Add cursor
            chart.cursor = new am4charts.XYCursor();
            //  chart.scrollbarX = new am4core.Scrollbar();
          }); // end am4core.ready()


          let tabPop2 = /*html*/ `
            <div class="container p-0 ps-2">
              <div class="row pt-1 fs-11px ">                
                <div class="col fw-600 m-0 p-0">                
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">1. Dilaksanakan pada Kab/Kota</div>
                    <div class=" bd-highlight" id="lokus_kabkota">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Spesifik</div>
                    <div class=" bd-highlight" id="lokus_kabkota_spes">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Sensitif</div>
                    <div class=" bd-highlight" id="lokus_kabkota_sen">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">&#183; Dukungan</div>
                    <div class=" bd-highlight" id="lokus_kabkota_duk">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">2. Dilaksanakan di Level Provinsi</div>
                    <div class=" bd-highlight" id="lokus_propinsi">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Spesifik</div>
                    <div class=" bd-highlight" id="lokus_propinsi_spe">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Sensitif</div>
                    <div class=" bd-highlight" id="lokus_propinsi_sen">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">&#183; Dukungan</div>
                    <div class=" bd-highlight" id="lokus_propinsi_duk">0</div>    
                  </div>            
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight">3. Dilaksanakan di Level Pusat</div>
                    <div class=" bd-highlight" id="lokus_pusat">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Spesifik</div>
                    <div class=" bd-highlight" id="lokus_pusat_spe">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-0">
                    <div class=" bd-highlight ps-2">&#183; Sensitif</div>
                    <div class=" bd-highlight" id="lokus_pusat_sen">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-1">
                    <div class=" bd-highlight ps-2">&#183; Dukungan</div>
                    <div class=" bd-highlight" id="lokus_pusat_duk">0</div>    
                  </div>
                </div>
              </div>
            </div>`;

          $("#lokasi_perintv").on("click", function () {
            $(".modal #title").html('<i class="material-icons ms-n2 me-1">list_alt</i>' + $(this).data("title"));
            $("#popUp").html(" ");
            $("#popUp").html(tabPop2);

            let
              tile_2 = dataTile.lokusIntervensi,
              lokus_kabkota = 0,
              lokasi_kota_A = 0,
              lokasi_kota_B = 0,
              lokasi_kota_C = 0,
              lokasi_provinsi = 0,
              lokasi_provinsi_A = 0,
              lokasi_provinsi_B = 0,
              lokasi_provinsi_C = 0,
              lokasi_pusat = 0,
              lokasi_pusat_A = 0,
              lokasi_pusat_B = 0,
              lokasi_pusat_C = 0;

            tile_2.forEach((rowx) => {
              lokus_kabkota += rowx.lokasi_kota;
              lokasi_provinsi += rowx.lokasi_provinsi;
              lokasi_pusat += rowx.lokasi_pusat;
              if (rowx.intervensi_kode == "A") {
                lokasi_kota_A += rowx.lokasi_kota;
                lokasi_provinsi_A += rowx.lokasi_provinsi;
                lokasi_pusat_A += rowx.lokasi_pusat;
              } else if (rowx.intervensi_kode == "B") {
                lokasi_kota_B += rowx.lokasi_kota;
                lokasi_provinsi_B += rowx.lokasi_provinsi;
                lokasi_pusat_B += rowx.lokasi_pusat;
              } else if (rowx.intervensi_kode == "C") {
                lokasi_kota_C += rowx.lokasi_kota;
                lokasi_provinsi_C += rowx.lokasi_provinsi;
                lokasi_pusat_C += rowx.lokasi_pusat;
              }
            });

            /*A-0 "Spesifik" */
            $("#lokus_kabkota_spes").html(lokasi_kota_A);
            $("#lokus_propinsi_spe").html(lokasi_provinsi_A);
            $("#lokus_pusat_spe").html(lokasi_pusat_A);

            /*B-2 "Sensitif" */
            $("#lokus_kabkota_sen").html(lokasi_kota_B);
            $("#lokus_propinsi_sen").html(lokasi_provinsi_B);
            $("#lokus_pusat_sen").html(lokasi_pusat_B);

            /*C-1 "Dukungan/ Koordinasi" */
            $("#lokus_kabkota_duk").html(lokasi_kota_C);
            $("#lokus_propinsi_duk").html(lokasi_provinsi_C);
            $("#lokus_pusat_duk").html(lokasi_pusat_C);

            /*Total*/
            $("#lokus_kabkota").html(lokus_kabkota);
            $("#lokus_propinsi").html(lokasi_provinsi);
            $("#lokus_pusat").html(lokasi_pusat);
          });
        }

        let konvergensiSasaranRo = async () => {
          let
            rData3,
            periode = document.getElementById("sel_ta").value,
            perData = periode.split("-");

          try {
            let res = await fetch(config.api_url + '/iki/chart-3', {
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
            rData3 = _res.data;
          } catch (e) {
            return false;
          }

          tile00.innerHTML = /*html*/ `  
          <div class="row">
            <div class="h5 m-0 p-0 ps-2 mb-3">Capaian Kinerja Penurunan <i>Stunting</i> <span class="text-yellow-600">Bersumber Belanja K/L 2021</span></div>      
            
            <div class="col-lg-3 p-0 px-1" >
              <div class="btn bg-green-600 text-white-500 ms-1 mt-2 mb-4 py-3">Intervensi Gizi Spesifik</div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-green-600"></i>
                    <i class="ion ion-md-woman fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-25px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-green-600 m-0 p-0 pt-1">246.560 </div>
                  <div class="fs-12px"><span class="fw-700">Ibu Hamil Kek Mendapatkan PMT </span>pada 360 Kabupaten/Kota Prioritas (Kemenkes)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-green-600"></i>
                    <i class="fas fa-baby fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-green-600 m-0 p-0 pt-1">441.000 </div>
                  <div class="fs-12px"><span class="fw-700">Balita Kurus Mendapat PMT </span>pada 55 Kabupaten/Kota Prioritas (Kemenkes)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-green-600"></i>
                    <i class="ion ion-md-timer fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-23px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-green-600 m-0 p-0 pt-1">140.000 </div>
                  <div class="fs-12px"><span class="fw-700">Balita Gizi Kurang Mendapat Suplementasi Gizi Mikro (Taburia) </span>pada 65 Kabupaten/Kota Prioritas (Kemenkes)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-green-600"></i>
                    <i class="fas fa-syringe fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-green-600 m-0 p-0 pt-1">490 </div>
                  <div class="fs-12px"><span class="fw-700">Tenaga Kesehatan yang telah dilatih Konseling Pemberian Makan Bayi dan Anak (PMBA) </span>di 514 Kabupaten/Kota (Kemenkes)</div>              
                </div>            
              </div>
              
            </div>
            
            
            <div class="col-lg-6 p-0 px-1 ps-4" >

              <div class="btn bg-yellow-600 text-white-500 ms-n1 mt-2 mb-4 py-3">Intervensi Gizi Sensitif</div>
              <div class="row">
                <div class="col-lg-6 m-0 p-0">
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-utensils fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-25px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">32.778 </div>
                      <div class="fs-12px"><span class="fw-700">Hektar kawasan Padi Kaya Gizi (Biofortifikasi) </span>(Kementan)</div>              
                    </div>   
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-house-user fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">2.040 </div>
                      <div class="fs-12px"><span class="fw-700">Guru dan Tenaga Kependidikan PAUD yang difasilitasi kompetensi melalui program kemitraan </span>di 119 Kabupaten/Kota (Kemendikbud)</div>              
                    </div>            
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-child fa-fw me-10px fa-child fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-23px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">3.893.635 </div>
                      <div class="fs-12px"><span class="fw-700">Keluarga dengan baduta yang mendapatkan fasilitas dan pembinaan 1000 HPK </span>(KBKKBN)</div>              
                    </div>            
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-users fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">574 </div>
                      <div class="fs-12px">Kelompok telah melakukan pengembangan <span class="fw-700">Pekarangan Pangan Lestari Stunting </span>(Kementan)</div>              
                    </div>            
                  </div>
                </div>
                <div class="col-lg-6 m-0 p-0">
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fas fa-fish fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-25px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">120 </div>
                      <div class="fs-12px"><span class="fw-700">Promosi untuk Kampanye Gerakan Masyarakat Makan Ikan </span>(KKP)</div>              
                    </div>   
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fab fa-slideshare fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">3.083.074 </div>
                      <div class="fs-12px">Keluarga Miskin pada 514 Kabupaten/Kota Prioritas telah mendapat <span class="fw-700">Bantuan Tunai Bersyarat </span>(Kemensos)</div>              
                    </div>            
                  </div>
                  <div class="d-flex flex-row bd-highlight mb-1">
                    <div class="p-1 bd-highlight ">
                      <span class="fa-stack fa-1x">
                        <i class="fa fa-square fa-stack-2x fs-38px text-yellow-600"></i>
                        <i class="fab fa-slideshare fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                      </span>
                    </div>
                    <div class="p-1 bd-highlight"> 
                      <div class="h5 fw-700 text-yellow-600 m-0 p-0 pt-1">18.519.519 </div>
                      <div class="fs-12px">KPM pada 514 Kabupaten/Kota Prioritas telah mendapat <span class="fw-700">Bantuan BNPT/SEMBAKO </span> (Kemensos)</div>              
                    </div>            
                  </div>
                  
                </div>
              </div>


              
            </div>
            
            
            <div class="col-lg-3 p-0 px-1 ps-4" >

              <div class="btn bg-gray-700 text-white-500 ms-1 mt-2 mb-3">Kordinasi, Pendampingan, Dukungan Teknis</div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-gray-700"></i>
                    <i class="fas fa-link fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-20px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-gray-700 m-0 p-0 pt-1">14.122 </div>
                  <div class="fs-12px"><span class="fw-700">Pendamping Program Bantuan Tunai Bersyarat </span>pada 360 Kabupaten/Kota Prioritas telah ditingkatkan kemampuan P2K2 (Kemensos)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-gray-700"></i>
                    <i class="ion ion-ios-create fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-25px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-gray-700 m-0 p-0 pt-1">234 </div>
                  <div class="fs-12px">Kegiatan telah dilaksanakan untuk <span class="fw-700">Diseminasi informasi mengenai Stunting </span>(Kemonkominfo)</div>              
                </div>            
              </div>
              <div class="d-flex flex-row bd-highlight mb-1">
                <div class="p-1 bd-highlight ">
                  <span class="fa-stack fa-1x">
                    <i class="fa fa-square fa-stack-2x fs-38px text-gray-700"></i>
                    <i class="fas fa-landmark fa-2x fa-fw  fa-stack-1x fa-inverse p-1 fs-21px"></i>							
                  </span>
                </div>
                <div class="p-1 bd-highlight"> 
                  <div class="h5 fw-700 text-gray-700 m-0 p-0 pt-1">360 </div>
                  <div class="fs-12px"><span class="fw-700">Daerah yang meningkat kapasitas aparaturnya dalam penilaian kinerja penanganan stunting </span>(Kemendagri)</div>              
                </div>            
              </div>
              
            
              
            </div>
            <div class="h6 text-end w-500px ms-auto"><i>Sumber : Laporan Evaluasi Mandiri K/L (diolah) untuk Laporan Kinerja Anggaran dan Pembangunan TA 2021</i></div>
          </div>
            `;
          tile3.innerHTML = /*html*/ `  
          <div class="row">      
            <div class="col-lg-6" id="default-pop-1">
              <div id="chartdiv4" style="height: 33em;"></div>
            </div>
            <div class="col-lg-6" id="default-pop-2">
              <div id="chartdiv5" style="height: 33em;"></div>
            </div>
          </div>
            `;

          //$(".modal #title").html('<i class="material-icons">bar_chart</i>' + $(this).data("title"));
          // $("#popUp").html(tabPop);

          am4core.ready(function () {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            var chart = am4core.create('chartdiv4', am4charts.XYChart)
            chart.colors.step = 5;

            chart.legend = new am4charts.Legend()
            chart.legend.position = 'bottom';
            chart.legend.paddingBottom = 20;
            chart.legend.labels.template.maxWidth = 95;
            chart.fontSize = 10;

            var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
            xAxis.dataFields.category = 'category'
            xAxis.renderer.cellStartLocation = 0.1
            xAxis.renderer.cellEndLocation = 0.9
            xAxis.renderer.grid.template.location = 0;

            var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
            yAxis.min = 0;

            function createSeries(value, name) {
              var series = chart.series.push(new am4charts.ColumnSeries());
              series.dataFields.valueY = value
              series.dataFields.categoryX = 'category'
              series.name = name;
              series.events.on("hidden", arrangeColumns);
              series.events.on("shown", arrangeColumns);

              var bullet = series.bullets.push(new am4charts.LabelBullet());
              bullet.interactionsEnabled = false
              bullet.dy = -10;
              bullet.label.text = '{valueY}'
              bullet.label.fill = am4core.color('#333');
              return series;
            }

            chart.data = rData3;
            createSeries('value', 'Konvergensi Sasaran');

            function arrangeColumns() {
              var series = chart.series.getIndex(0);
              var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
              if (series.dataItems.length > 1) {
                var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
                var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
                var delta = ((x1 - x0) / chart.series.length) * w;
                if (am4core.isNumber(delta)) {
                  var middle = chart.series.length / 2;
                  var newIndex = 0;
                  chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                      series.dummyData = newIndex;
                      newIndex++;
                    }
                    else {
                      series.dummyData = chart.series.indexOf(series);
                    }
                  })
                  var visibleCount = newIndex;
                  var newMiddle = visibleCount / 2;

                  chart.series.each(function (series) {
                    var trueIndex = chart.series.indexOf(series);
                    var newIndex = series.dummyData;
                    var dx = (newIndex - trueIndex + middle - newMiddle) * delta;
                    series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                  })
                }
              }
            }
          }); // end am4core.ready()

          am4core.ready(function () {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            // Create chart instance
            var chart = am4core.create("chartdiv5", am4charts.PieChart);
            chart.fontSize = 10;
            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "Konvergensi Sasaran";
            // Let's cut a hole in our Pie chart the size of 30% the radius
            chart.innerRadius = am4core.percent(30);
            // Put a thick white border around each Slice
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 0;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template
              // change the cursor on hover to make it apparent the object can be interacted with
              .cursorOverStyle = [
                {
                  "property": "cursor",
                  "value": "pointer"
                }
              ];

            pieSeries.alignLabels = false;
            pieSeries.labels.template.bent = true;
            pieSeries.labels.template.radius = 3;
            pieSeries.labels.template.padding(0, 0, 0, 0);
            pieSeries.ticks.template.disabled = true;
            // Create a base filter effect (as if it's not there) for the hover to return to
            var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
            shadow.opacity = 0;
            // Create hover state
            var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists
            // Slightly shift the shadow and make it more prominent on hover
            var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
            hoverShadow.opacity = 0.7;
            hoverShadow.blur = 5;
            // Add a legend
            chart.legend = new am4charts.Legend();
            chart.legend.position = "bottom";
            chart.legend.labels.template.maxWidth = 10
            chart.data = rData3
          }); // end am4core.ready()

          let tabPop3 = /*html*/`
          <div class="container p-0 ps-2">
            <div class="row pt-1">
              <div class="col fw-600 fs-11px m-0 p-0 pe-2">
                <div class="d-flex justify-content-between bd-highlight mb-1 border-bottom">
                  <div class=" bd-highlight">                
                    Sasaran
                  </div>
                  <div class=" bd-highlight">Σ RO</div>    
                </div>
                <div class="d-flex justify-content-between bd-highlight mb-2">
                  <div class=" bd-highlight">Sasaran Prioritas</div>
                  <div class=" bd-highlight" id="1000_hpk">0</div>    
                </div>
                <div class="d-flex justify-content-between bd-highlight mb-2">
                  <div class=" bd-highlight">Sasaran Penting</div>
                  <div class=" bd-highlight" id="1000_hpk_penting">0</div>    
                </div>
                <div class="d-flex justify-content-between bd-highlight mb-2">
                  <div class=" bd-highlight">Sasaran Lainnya</div>
                  <div class=" bd-highlight" id="1000_hpk_penting_lainnya">0</div>    
                </div>
              </div>
            </div>
          </div>`;
          $("#konvergensi_sasaran").on("click", function () {
            $(".modal #title").html('<i class="material-icons ms-n2 me-1">list_alt</i>' + $(this).data("title"));
            $("#popUp").html(" ");
            $("#popUp").html(tabPop3);
            let tile_2Isi = dataTile.konvergensiSasaran;
            tile_2Isi.forEach((a) => {
              (a.category == "Sasaran Prioritas") ? $("#1000_hpk").html(a.value) : "";
              (a.category == "Sasaran Penting") ? $("#1000_hpk_penting").html(a.value) : "";
              (a.category == "Sasaran Lainnya") ? $("#1000_hpk_penting_lainnya").html(a.value) : "";
            });
          });
        }

        let konvergensiKordinasi = async () => {
          let
            rData4,
            rData5,
            periode = document.getElementById("sel_ta").value,
            perData = periode.split("-");

          try {
            let res = await fetch(config.api_url + '/iki/chart-4', {
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
            rData4 = _res.data;
          } catch (e) {
            return false;
          }

          try {
            let res = await fetch(config.api_url + '/iki/chart-5', {
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
            rData5 = _res.data;
          } catch (e) {
            return false;
          }

          var dataSet = [];
          rData5.forEach((rowx) => {
            var color;
            if (rowx.name == "Pemda") {
              color = "#f59c1a";
            } else if (rowx.name == "K/L Lain") {
              color = "blue";
            } else if (rowx.name == "Non-Pemerintah") {
              color = "green";
            } else if (rowx.name == "K/L Lain, Pemda") {
              color = "indigo";
            } else if (rowx.name == "K/L Lain, Non-Pemerintah") {
              color = "yellow";
            } else if (rowx.name == "Pemda, Non-Pemerintah") {
              color = "grey";
            } else if (rowx.name == "K/L Lain, Pemda, Non-Pemerintah") {
              color = "lime";
            }
            dataSet.push({
              "name": rowx.name,
              "value": rowx.value,
              "color": color,
              "sets": rowx.sets
              //"sets": chld
            });
          });
          tile4.innerHTML = /*html*/`
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 p-3 ui-sortable"> 
                <div id="chartdiv1a" class="p-3" style="height: 33em;margin-bottom: -5em;"></div>
              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 p-3 ui-sortable"> 
                <div id="chartdiv1ab" class="p-3" style="height: 33em;"></div>
              </div>	
            </div>`;

          am4core.ready(function () {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            // Create chart instance
            var chart = am4core.create("chartdiv1a", am4charts.PieChart);
            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            //pieSeries.dataFields.value = "litres";
            //pieSeries.dataFields.category = "country";

            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "category";

            // Let's cut a hole in our Pie chart the size of 30% the radius
            chart.innerRadius = am4core.percent(30);
            // Put a thick white border around each Slice
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template
              // change the cursor on hover to make it apparent the object can be interacted with
              .cursorOverStyle = [
                {
                  "property": "cursor",
                  "value": "pointer"
                }
              ];

            pieSeries.alignLabels = false;
            pieSeries.labels.template.bent = true;
            pieSeries.labels.template.radius = 3;
            pieSeries.labels.template.padding(0, 0, 0, 0);
            pieSeries.ticks.template.disabled = true;

            // Create a base filter effect (as if it's not there) for the hover to return to
            var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
            shadow.opacity = 0;

            // Create hover state
            var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

            // Slightly shift the shadow and make it more prominent on hover
            var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
            hoverShadow.opacity = 0.7;
            hoverShadow.blur = 5;

            // Add a legend
            chart.legend = new am4charts.Legend();
            chart.legend.position = 'bottom';
            chart.fontSize = 10;
            chart.data = rData4;

          }); // end am4core.ready()

          am4core.ready(function () {
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            //var data = rData.data;
            // var data = dataxxx;
            var data = dataSet;
            var chart = am4core.create("chartdiv1ab", am4plugins_venn.VennDiagram);
            var series = chart.series.push(new am4plugins_venn.VennSeries());
            series.dataFields.category = "name";
            series.dataFields.value = "value";
            series.dataFields.intersections = "sets";
            series.data = data;
            series.labels.template.text = "{value}[/]";
            series.slices.template.propertyFields.fill = "color";
            //series.labels.template.text = "{category}[bold] : {value}[/]";
            series.slices.template.tooltipText = "{category}[bold] : {value}[/]";
            //console.log(''series.slice);
            //chart.colors.step = 3;
            chart.colors.step = 15;
            chart.legend = new am4charts.Legend();
            chart.legend.marginTop = 40;
            chart.legend.position = "right";
            chart.legend.labels.template.truncate = false;
            chart.legend.maxWidth = undefined;
            chart.legend.labels.template.text = "[{color}]{name}[/]";
            chart.legend = new am4charts.Legend();
            //chart.legend.marginTop = 40;
            chart.legend.position = 'bottom';
            chart.fontSize = 10;
          }); // end am4core.ready()

          let tabPop4 = /*html*/ `
            <div class="container p-0 ps-2">
              <div class="row pt-1">
                <div class="col fw-600 fs-10px m-0 p-0 pe-2">
                  <div class="d-flex justify-content-between bd-highlight mb-3 border-bottom">
                    <div class=" bd-highlight">                    
                    Pelaksanaan Koordinasi</div>
                    <div class=" bd-highlight fs-10px">Σ RO</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">Ada Kordinasi</div>
                    <div class=" bd-highlight" id="ada_kordinasi">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">Tidak Ada Kordinasi</div>
                    <div class=" bd-highlight" id="tdk_ada_kordinasi">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">N/A</div>
                    <div class=" bd-highlight" id="n_a">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mt-4 mb-3 border-bottom">
                    <div class=" bd-highlight"><i>Stakeholder</i></div>
                    <div class=" bd-highlight">Σ RO</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">Pemda</div>
                    <div class=" bd-highlight" id="kor_pemda">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">K/L Lainnya</div>
                    <div class=" bd-highlight" id="kor_kl">0</div>    
                  </div>
                  <div class="d-flex justify-content-between bd-highlight mb-2">
                    <div class=" bd-highlight">Non Pemerintah</div>
                    <div class=" bd-highlight" id="kor_pem">0</div>    
                  </div>
                </div>
              </div>
            </div>
            `;

          $("#konvergensi_koordinasi").on("click", function () {
            $(".modal #title").html('<i class="material-icons ms-n2 me-1">list_alt</i>' + $(this).data("title"));
            $("#popUp").html(" ");
            $("#popUp").html(tabPop4);
            let
              tile_3a = dataTile.pelaksanaanKoordinasi1,
              tile_3b = dataTile.pelaksanaanKoordinasi2;

            tile_3a.forEach((a) => {
              (a.category == "Ada Koordinasi") ? $("#ada_kordinasi").html(a.value) : "";
              (a.category == "Tidak Ada Koordinasi") ? $("#tdk_ada_kordinasi").html(a.value) : "";
              (a.category == "N/A") ? $("#n_a").html(a.value) : "";
            });
            tile_3b.forEach((b) => {
              (b.name == "Pemda") ? $("#kor_pemda").html(b.value) : "";
              (b.name == "K/L Lain") ? $("#kor_kl").html(b.value) : "";
              (b.name == "Non-Pemerintah") ? $("#kor_pem").html(b.value) : "";
            });
          });
        }

        konvergensiLokasi();
        lokusIntervensi();
        konvergensiSasaranRo();
        konvergensiKordinasi();
      } else {
        $("#top-tiles,#top-tiles2,#top-tiles3,#tile-detail").hide();
      }
    }

    /*----------Versi 3-------------*/
    $("#sel_ta,#sel_ro").on('change', async () => {
      $("#peta-ro-lokus").addClass("loading");
      let
        periode_data = $("#sel_ta").val(),
        per_data = periode_data.split("-"),
        per_tahun = per_data[0],
        ro_select = $("#sel_ro").val();
      if (typeof mData.tahunSemester == "undefined") {
        mData.tahunSemester = periode_data;
      } else {
        ro_select = (mData.tahunSemester == periode_data) ? ro_select : [];
        //console.log("ro_select", ro_select);
        $('#sel_ro').selectpicker('destroy');
        $('#sel_ro').selectpicker();
        mData.tahunSemester = periode_data;
      }

      if (per_tahun > "2021") {
        $("#ro-lokus-detail").removeClass("hide");
        $(".sel_kl").parent().addClass("hide");
        $(".sel_ig").parent().addClass("hide");
        $("#kinerjaAnggaranSrc").parent().parent().addClass("hide");

        await getLokusRo(periode_data, ro_select).then(function (data) {
          let option_ro = [];
          data.field.forEach((row) => {
            let selected = ro_select.includes(row.ro_field) ? "selected" : "";
            option_ro.push(
              `<option value="${row.ro_field}" class="text-warp" ${selected}>
                ${row.ro_code + "-"}
                ${row.ro_name}
              </option>`
            );
          });
          $("#sel_ro").html(option_ro);
          $('#sel_ro').selectpicker('destroy');
          $('#sel_ro').selectpicker();
          $('.sel_ro .dropdown-menu').addClass('w-100');
          $("#peta-ro-lokus").removeClass("loading");
          viewMapKinerjaPembangunan(data);
        });
        $(".sel_ro").parent().removeClass("hide");
      } else {
        $("#ro-lokus-detail").addClass("hide");
        $(".sel_ro").parent().addClass("hide");
        $(".sel_kl").parent().removeClass("hide");
        $(".sel_ig").parent().removeClass("hide");
        $("#kinerjaAnggaranSrc").parent().parent().removeClass("hide");
      }
    });

    $("#sel_ro").parent().find("button").on("click", function () {
      alert("me");
      //$('.sel_ro .dropdown-menu .inner ul li a span.text').addClass("text-wrap");
      $('li a.dropdown-item span.text').addClass("text-wrap");
      //$(this).parent().find('.dropdown-menu').find('.inner').find('ul').find('li').find('a').find('span.text').addClass("text-wrap");
    });

    async function getLokusRo(periode_data, ro) {
      //console.log(ro);
      let
        perData = periode_data.split("-"),
        paramData;
      if (ro.length < 1) {
        paramData = {
          "tahun": perData[0],
          "semester": perData[1]
        };
      } else {
        paramData = {
          "tahun": perData[0],
          "semester": perData[1],
          "ro": ro
        }
      }
      //console.log(paramData);
      try {
        let res = await fetch(config.api_url_v3 + '/ka/lokus-ro', {
          method: 'POST',
          body: JSON.stringify(paramData),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        return _res.data;
      } catch (e) {
        return false;
      }
    };



    /*----------END Versi 3---------*/
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    });
  }
};
export default KinerjaAnggaran;