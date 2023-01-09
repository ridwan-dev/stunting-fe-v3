import WidgetCard from '../components/WidgetCard.js';
import { apiKementerian, apiTahunSemester, apiIntervensi } from '../../services/api.js';

const PenandaanPagu = {
  /**
   * Render the page content.
   */

  render: async () => {

    mData.dataKementerian = (typeof mData.dataKementerian === "undefined") ? await apiKementerian() : mData.dataKementerian;
    mData.dataSemester = (typeof mData.dataSemester === "undefined") ? await apiTahunSemester() : mData.dataSemester;
    mData.dataIntervensi = (typeof mData.dataIntervensi === "undefined") ? await apiIntervensi() : mData.dataIntervensi;

    const widgetCard1 = await WidgetCard.render('tile-1', 'Penandaan', 'white-100', 'lg-4');
    const widgetCard2 = await WidgetCard.render('tile-2', 'Pagu', 'white-100', 'lg-4');
    const widgetCard3 = await WidgetCard.render('tile-4', '5 K/L dengan RO Terbanyak <br><h6 class="fs-8px" ></h6>', 'white-100', 'lg-4');

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
          <div class="col-xl-1 ">
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
          ${widgetCard3}
        </div>
        <!-- end widget-card -->
        
        <div id="penandaan-table" class="is-bordered is-narrow rounded"></div>
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

    let
      thID = document.getElementById('sel_ta'),
      klID = document.getElementById('sel_kl'),
      intID = document.getElementById('sel_int'),
      dKementerian = [],
      dTahunSemester = [],
      dIntervensi = [];

    mData.dataSemester.forEach((item) => {
      dTahunSemester.push(
        `<option value="${item.tahun}-${item.semester}" selected="selected">${item.tahun} - Semester ${item.semester}</option>`
      );
    });
    thID.innerHTML = dTahunSemester.join(" ");
    mData.dataKementerian.forEach((item) => {
      dKementerian.push(
        `<option value="${item.kementerian_kode}" selected="selected">${item.kementerian_nama}</option>`
      );
    });
    klID.innerHTML = dKementerian.join(" ");
    mData.dataIntervensi.forEach((item) => {
      dIntervensi.push(
        `<option  value="${item.intervensi_kode}" selected="selected"> ${item.intervensi_nama}"</option>`
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

    await getPageData(periodeAng, sel_kl, sel_int).then(function (data) {
      tableData(data);
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
        await getPageData($("#sel_ta").val(), $("#sel_kl").val(), $("#sel_int").val(), kKey).then(function (data) {
          tableData(data);
        });
      }
    });

    $("#sel_ta, #sel_kl, #sel_int").on('change', async () => {
      let multi_tahun = $('#sel_ta').val(),
        search = document.getElementById("kinerjaAnggaranSrc").value,
        multi_kl = $("#sel_kl").val(),
        multi_int = $("#sel_int").val()
        ;
      await getPageData(multi_tahun, multi_kl, multi_int, search).then(function (data) {
        tableData(data);
      });
    });

    async function tableData(result) {
      console.log(result);
      const
        tile1 = document.getElementById('tile-1'),
        tile2 = document.getElementById('tile-2'),
        tile3 = document.getElementById('tile-4');

      tile1.innerHTML = /*html*/ `
        <div class="row">
          <div class="col-md-12">              
            <div class="d-flex justify-content-between border-bottom bd-highlight">
              <div class="d-flex flex-column pb-1">
                <div class="mb-0 fs-11px">
                  <span class="h1 text-green">${result.tile.rekonsiliasi_update_tagging.c_kl}</span>
                </div>
                <div class="fs-12px text-gray-700">Kementerian/Lembaga</div>
              </div>
              <div class="p-0 me-3 bd-highlight">
                <div class="d-flex flex-column pb-1">
                  <div class="mb-0 fs-11px">
                    <span class="h1 text-blue">${result.tile.realisasi_tagging.all.teridentifikasi}</span>
                  </div>
                  <div class="fs-12px text-gray-700">Rincian Output</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fs-15px text-gray-700  pt-1">Rincian Output</div>
        <div class="d-flex justify-content-between bd-highlight">
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
          <div class="p-0 ms-n2 bd-highlight">
            <table class="table table-responsive table-borderless table-sm mt-2 mb-0 mt-0 fs-11px text-center text-gray-600">      
              <tbody>            
              <tr class=" align-middle">
                <td class="align-middle"><span class="rounded bg-blue text-light p-1 mx-1">${result.tile.realisasi_tagging.spesifik.teridentifikasi}</span><span class="rounded bg-orange text-light p-1 mx-0">${result.tile.realisasi_tagging.spesifik.tagging}</span></td>
                <td class="align-middle"><span class="rounded bg-blue text-light p-1 mx-1">${result.tile.realisasi_tagging.sensitif.teridentifikasi}</span><span class="rounded bg-orange text-light p-1 mx-0">${result.tile.realisasi_tagging.sensitif.tagging}</span></td>
                <td class="align-middle"><span class="rounded bg-blue text-light p-1 mx-1">${result.tile.realisasi_tagging.pendamping.teridentifikasi}</span><span class="rounded bg-orange text-light p-1 mx-0">${result.tile.realisasi_tagging.pendamping.tagging}</span></td>
              </tr>
              <tr class="font-fw-bold">
                <td>Spesifik</td>
                <td>Sensitif</td>
                <td>Dukungan</td>
              </tr>
              </tbody>      
            </table>   
          </div>
        </div>
      `;

      let
        tRenjaKL = result.tile.pagu_level_output.dukungan_level_output_renjakl + result.tile.pagu_level_output.sensitif_level_output_renjakl + result.tile.pagu_level_output.spesifik_level_output_renjakl,
        tRkaKL = result.tile.pagu_level_output.dukungan_level_output_rkakl + result.tile.pagu_level_output.sensitif_level_output_rkakl + result.tile.pagu_level_output.spesifik_level_output_rkakl;

      tile2.innerHTML = /*html*/ `
      <div class="row">
        <div class="col-md-12 d-flex">
        <!-- BEGIN conversion-rate -->
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
          <!-- END conversion-rate -->
          <hr class="my-1">
        </div>        
        <!--div class="fs-15px mt-4 fw-bold">Intervensi</div-->
        <div class="">
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
      </div>
    `;

      let tableDataX = [];
      result.tile.top_5_alokasi.forEach((row) => {
        tableDataX.push(`
        <tr>
          <td class="">${row.kementerian_short}</td>
          <td class="text-end">${row.jumlah_ro}</td>
          <td class="text-end">${(Math.round(row.alokasi_renja / 1000000)).toLocaleString('id-ID')}</td>
          <td class="text-end">${(Math.round(row.alokasi_rkakl / 1000000)).toLocaleString('id-ID')}</td>
          <td class="text-end">${(Math.round(row.alokasi_anal / 1000000)).toLocaleString('id-ID')}</td>
        </tr>
          `)
      });

      tile3.innerHTML = /*html*/ `
        <table class="table table-sm fs-11px mb-0">
          <thead>
            <tr class="fw-bold bg-gray-200 border-0">
              <th class="border-0">K/L</th>
              <th class="border-0 text-end">RO</th>
              <th class="border-0 text-end">Renja KL</th>
              <th class="border-0 text-end">RKA KL</th>
              <th class="border-0 text-end">Analisis</th>
            </tr>
          </thead>
          <tbody>
            ${tableDataX.join("")}
          </tbody>      
        </table>      
      `;

      let opsiTabel = { expand: false };

      const tablePenandaanData = () => {
        let data = Object.values(result.detail);
        data.sort((a, b) => a.kementerian_kode > b.kementerian_kode && 1 || -1)
        data.forEach((item, i) => {
          item.id = i + 1;
        });
        return data;
      }

      const table = new Tabulator("#penandaan-table", {
        height: "515px",
        data: tablePenandaanData(),
        index: "id",
        // height: "fitData",
        layout: "fitDataStretch", //fitDataFill, fitData, fitDataTable, fitColumns, fitDataStretch
        // resizableColumns:true, // this option takes a boolean value (default = true)
        columnHeaderVertAlign: "middle",
        dataTree: true,
        dataTreeStartExpanded: opsiTabel.expand,
        dataTreeFilter: true,
        dataTreeElementColumn: "name",
        dataTreeChildColumnCalcs: false, //include child rows in column calculations
        dataTreeSelectPropagate: true,
        // progressiveLoad: "scroll",
        // placeholder: "Belum ada data",
        dataLoader: false, //disable remote loader
        // dataLoaderLoading: "Data Loading",
        // dataLoaderLoading: "<div style='display:inline-block; border:0px solid #333; border-radius:5px; background:#fff; font-weight:bold; font-size:16px; color:#000; padding:10px 20px;'>nge-Loading Data</div>",
        // autoColumns: true,
        columns: [
          { title: "No", field: "id", visible: true, sorter: "number", hozAlign: "center", headerHozAlign: "center", frozen: true },
          {
            title: "Kementerian/ Lembaga<br><small>Program / Kegiatan / KRO / RO</small>", field: "name", sorter: "string", width: 400, responsive: 0, frozen: true,
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
            // formatter: "number",
            sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", mutator: function (value, data, type, params, component) {
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
            title: "&#931; KEG", field: "jml_keg", formatter: "number", sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }, mutator: function (value, data, type, params, component) {
              var dt = data.program_id !== undefined && data.kegiatan_id === undefined ? data._children.length : '';
              var dy = 0;
              if (data.kl_id !== undefined && data.program_id === undefined) {
                data._children.forEach(function (arrayItem) {
                  dy = dy + arrayItem._children.length;
                });
                return dy;
              } else if (data.program_id !== undefined && data.kegiatan_id === undefined) {
                return data._children.length;
              } else { return ''; }
            }, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
          /* {
            title: "KRO", field: "jml_kro", formatter: "number", sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }, mutator: function (value, data, type, params, component) {
              var dt = data.program_id !== undefined && data.kegiatan_id === undefined ? data._children.length : '';
              var dy = 0;
              if (data.kl_id !== undefined && data.program_id === undefined) {
                data._children.forEach(function (arrayItem) {
                  arrayItem._children.forEach(function (arrayItem) {
                    dy = dy + arrayItem._children.length;
                  });
                });
                return dy;
              } else if (data.program_id !== undefined && data.kegiatan_id === undefined) {
                data._children.forEach(function (arrayItem) {
                  arrayItem._children.forEach(function (arrayItem) {
                    dy = dy + arrayItem._children.length;
                  });
                });
                return dy;
              } else if (data.kegiatan_id !== undefined && data.kro_id === undefined) {
                return data._children.length;
              } else { return ''; }
            }, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          }, */
          {
            title: "&#931; RO", field: "jml_ro", formatter: "money", formatterParams: {
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
            title: "Alokasi <br>RENJA-KL", field: "alokasi_0", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,  //include child rows in column calculations
            }, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "Alokasi <br>RKAKAL", field: "alokasi_2", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "Analisis <br>Lanjutan", field: "anl_alokasi", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 2,
            }
          },
          {
            title: "<span class='align-middle'>Target</span>", field: "target", sorter: "string", hozAlign: "right", headerHozAlign: "center", formatterParams: {
              decimal: ",",
              thousand: ".",
              precision: false,
            }, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
          {
            title: "Satuan", field: "satuan", sorter: "string", hozAlign: "left", headerHozAlign: "center", formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "") {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
            }
          },
          {
            title: "Lokasi", field: "lokasi", sorter: "string", hozAlign: "left", headerHozAlign: "center", formatter: function (cell, formatterParams) {
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

      table.on("rowClick", function (e, row) {
        //e - the click event object
        //row - row component
        // var children = row.getTreeChildren();
        // console.log('Child', children);
        // row.treeCollapse(); //collapse the rows children
        row.treeToggle();
      });

      //test trigger an alert message when the row is clicked
      table.on("rowClick", function (e, row) {
        //console.log('Clicked:', row.getData().kementerian_nama);
      });

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
            <li class="nav-item"><a  class="nav-link active" onClick="tabPopUp(this);" data-active="true" data-tab="1" id="tab_1a"><i class="ion ion-md-stats fa-2x align-middle"></i> &nbsp; Perkembangan Tagging dan Anggaran</h4></a></li>
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

    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    });
  }

};

export default PenandaanPagu;
