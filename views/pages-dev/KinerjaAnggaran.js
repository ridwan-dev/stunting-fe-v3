import WidgetCard from '../components/WidgetCard.js';
import { apiKementerian, apiTahunSemester, apiIntervensi } from '../../services/api.js';

const KinerjaAnggaran = {
  /**
   * Render the page content.
   * kinerja-anggaran-belanja-kl
   */
  render: async () => {
    mData.dataKementerian = (typeof mData.dataKementerian === "undefined") ? await apiKementerian() : mData.dataKementerian;
    mData.dataSemester = (typeof mData.dataSemester === "undefined") ? await apiTahunSemester() : mData.dataSemester;
    mData.dataIntervensi = (typeof mData.dataIntervensi === "undefined") ? await apiIntervensi() : mData.dataIntervensi;

    const widgetCard1 = await WidgetCard.render('tile-1', '', '', 'lg-12 mb-3');
    const widgetCard2 = await WidgetCard.render('tile-2', 'Rincian Pagu', '', ' col-12 mb-3');
    const widgetCard3 = await WidgetCard.render('tile-3', 'Realisasi Anggaran', '', ' col-12');

    return /*html*/ `
      <div class="app-content-padding flex-grow-1 overflow-auto" data-scrollbar="true" data-height="100%">				
        <!-- BEGIN page-header -->
				<h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">balance</i>Kinerja Anggaran</h2>
				<!-- END page-header -->
        <!-- begin widget-card -->
        <div class="row pt-3  mx-0 py-3 mb-3 bg-gray-300 rounded" id="drp_option">
          <div class="col-xl-2 ">
            <div class="form-group sel_tax">
              <select id="sel_ta" name="sel_ta" class="form-control selectpicker " data-title="Pilih Tahun" data-actions-box="true" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset">
                <option value="2021-1" selected="selected">2021 - Semester 1</option>
                <option value="2021-2">2021 - Semester 2</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
          <div class="col-xl-3">
            <div class="form-group sel_kl">
              <select id="sel_kl" name="sel_kl" class="form-control selectpicker" data-toggle="dropdown"   data-title="Pilih Kementerian/ Lembaga" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} K/L dipilih">
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
        <div id="top-tiles" class="row">
          ${widgetCard1}
          ${widgetCard2}
          ${widgetCard3}    
        </div>
        <div class="card my-3 " id="persenRO"></div>
        <div class="card my-3 hide" id="mapload" style="height: 37em;">
          <div id="belanjaKL" style="height: 37em;"></div>
        </div>
        <div class="card hide" id="container_renjakl">
          <div class="card-body" >
            <div id="elemenOpenClose"></div>
            <div class="mx-n3 mb-n3 hide" id="tableload" ></div>            
          </div>          
        </div>
        <div class="sumber-data-renja pb-2 ps-2 mt-3 fs-12px fw-500 hide">info</div>          
        <div class="card" id="tabelData">
          <div class="card-body">
            <div id="elemenOpenCloseFst"></div>
            <div id="kinerja-table" class="is-bordered is-narrow rounded"></div>
            <div class="sumber-data-annual pt-1 pb-2 ps-2 fs-12px fw-500"></div>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal modal-message  fade" id="chartModal" tabindex="-1" aria-labelledby="Chart Kinerja Anggaran" aria-hidden="true">
        <div class="modal-dialog card" style="margin: 2% 2%;width: 96%;border-radius: 11px;">
          <div class="modal-content card-body p-0" id="popUp" style="border-radius: inherit !important;">          
          </div>
        </div>
      </div>
      <!-- End Modal -->
      <!-- Modal -->
      <div class="modal fade" id="tileModal" tabindex="-1"  aria-hidden="true">
        <div class="modal-dialog " >
          <div class="modal-content" style="width: 58em;margin-left: -13em;">  
            <div class="modal-header bg-gray-300">
              <h4 class="modal-title" id="titleInv" ></h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body" id="viewData">
            </div>			
          </div>
        </div>
      </div>
      <!-- End Modal -->
      <div class="row">
        <div class="col-xl-12">
          <div id="before-side-bar">            
          </div>
        </div>
    </div>
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

    sumberDataRenja();
    let xls_id = "export_xls";
    treeOpenCloseHtml("#elemenOpenClose", { "xls_id": xls_id });

    sumberDataAnnual();
    let xlss_id = "exp_xls";
    treeOpenCloseHtml("#elemenOpenCloseFst", { "xls_id": xlss_id }, true); /* true is intervensi */

    let
      klID = document.getElementById('sel_kl'),
      intID = document.getElementById('sel_int'),
      dKementerian = [],
      dIntervensi = []
      ;

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
      sel_int = []
      ;
    Object.values(getSel_kl.options).forEach((row) => {
      sel_kl.push(row.getAttribute("value"));
    });
    Object.values(getSel_int.options).forEach((row) => {
      sel_int.push(row.getAttribute("value"));
    });

    async function getPageDataLoad(periode, kl, int, search) {
      let perData = periode.split("-");
      try {
        let res = await fetch(config.api_url + '/ka/kinerja-anggaran', {
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

    await getPageDataLoad(periode, sel_kl, sel_int).then(function (data) {
      let adjust = tableTreeLevel(data.detail, "all");
      mData.kinerjaAnggaranBelanja = {
        "detail": adjust,
        "tile": data.tile,
      };
      tableData(mData.kinerjaAnggaranBelanja).then((result) => {
        var chart1 = new ApexCharts(
          document.querySelector('#tingkat_output'),
          result.chat1
        ), chart2 = new ApexCharts(
          document.querySelector('#analisis_lanjutan'),
          result.chat2
        ), chart3 = new ApexCharts(
          document.querySelector('#ra_tingkat_output'),
          result.chat3
        ), chart4 = new ApexCharts(
          document.querySelector('#ra_analisis_lanjutan'),
          result.chat4
        ), chart5 = new ApexCharts(
          document.querySelector('#chart-capaian-kinerja-anggaran'),
          result.chat5
        );
        chart1.render();
        chart2.render();
        chart3.render();
        chart4.render();
        chart5.render();
      })
        .catch((error) => {
          console.log(error);
        });
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
        await getPageDataLoad($("#sel_ta").val(), $("#sel_kl").val(), $("#sel_int").val(), kKey).then(function (data) {
          tableData(data);
        });
      }
    });

    async function getChart(periode, kl, int) {
      let perData = periode.split("-");
      try {
        let res = await fetch(config.api_url + '/ka/chart-1-hap', {
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

    await getChart(periode, sel_kl, sel_int).then(function (data) {
      kinerjaAnggaranChart(data);
    });

    $("#sel_ta").on('change', async () => {
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
      tableKinerjaAnggaran();
    });

    $("#sel_kl, #sel_int").on('change', async () => {
      tableKinerjaAnggaran();
    });

    async function tableKinerjaAnggaran(ev) {
      resetOpenClose();
      let
        multi_tahun = $('#sel_ta').val(),
        search = document.getElementById("kinerjaAnggaranSrc").value,
        multi_kl = $("#sel_kl").val(),
        multi_int = $("#sel_int").val()
        ;
      closeButton();
      await getPageDataLoad(multi_tahun, multi_kl, multi_int, search).then(function (data) {

        if (data.detail.length === 0) {
          $("#top-tiles,#persenRO,#tabelData,[data-bs-target='#chartModal']").hide();
        } else {
          $("#top-tiles,#persenRO,#tabelData,[data-bs-target='#chartModal']").show();
        }

        tableData(data).then((result) => {
          var chart1 = new ApexCharts(
            document.querySelector('#tingkat_output'),
            result.chat1
          ), chart2 = new ApexCharts(
            document.querySelector('#analisis_lanjutan'),
            result.chat2
          ), chart3 = new ApexCharts(
            document.querySelector('#ra_tingkat_output'),
            result.chat3
          ), chart4 = new ApexCharts(
            document.querySelector('#ra_analisis_lanjutan'),
            result.chat4
          ), chart5 = new ApexCharts(
            document.querySelector('#chart-capaian-kinerja-anggaran'),
            result.chat5
          );
          chart1.render();
          chart2.render();
          chart3.render();
          chart4.render();
          chart5.render();
        })
          .catch((error) => {
            console.log(error);
          });
      });
      belanjaKL(multi_tahun, multi_kl, multi_int, search);
      await getChart(multi_tahun, multi_kl, multi_int).then(function (data) {
        kinerjaAnggaranChart(data);
      });
    }

    async function tableData(result, opsiTabel = { expand: false }, itemShow) {
      const
        tile1 = document.getElementById('tile-1'),
        tile2 = document.getElementById('tile-2'),
        tile3 = document.getElementById('tile-3');
      console.log(result);
      let
        tot_co = result.tile.capaian_ro.capaianOutputByCapaianOutput.r1 +
          result.tile.capaian_ro.capaianOutputByCapaianOutput.r2 +
          result.tile.capaian_ro.capaianOutputByCapaianOutput.r3 +
          result.tile.capaian_ro.capaianOutputByCapaianOutput.r4 +
          result.tile.capaian_ro.capaianOutputByCapaianOutput.r5,
        persenRO = /*html*/ `
          <div class="card-body">
            <h5 class="card-title fs-13px text-black text-uppercase">Capaian Kinerja Anggaran</h5>
            <div class="row">
              <div class="col mx-2 border rounded px-0 pb-1">              
                <div class="text-center fw-bold bg-blue py-1 text-white d-block w-100 fs-20px rounded-top"> &gt;90 %</div>                
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output" data-catpersen="91">                        
                      <span class="h4 text-green" >
                        ${result.tile.capaian_ro.capaianOutputByCapaianOutput.r1} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat(((result.tile.capaian_ro.capaianOutputByCapaianOutput.r1 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>                        
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1 ">
                    <div class="my-1 mx-2  tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran" data-catpersen="91">                       
                      <span class="h4 text-blue" >
                        ${result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r1} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                      ${parseFloat(((result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r1 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>                        
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>
              <div class="col mx-2 border rounded px-0 pb-1">
                <span class="text-center fw-bold py-1 text-white d-block w-100 fs-20px bg-orange-500 text-black rounded-top">71% - 90%</span>
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output" data-catpersen="71">
                      <span class="h4 text-green" >
                        ${result.tile.capaian_ro.capaianOutputByCapaianOutput.r2} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat(((result.tile.capaian_ro.capaianOutputByCapaianOutput.r2 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran" data-catpersen="71">
                      <span class="h4 text-blue" >
                        ${result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r2} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                       ${parseFloat(((result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r2 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>
              <div class="col mx-2 border rounded px-0 pb-1">
                <span class="text-center fw-bold bg-blue py-1  d-block w-100 fs-20px  bg-gray text-white">51% - 70%</span>
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output" data-catpersen="51">
                      <span class="h4 text-green" >
                        ${result.tile.capaian_ro.capaianOutputByCapaianOutput.r3} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat(((result.tile.capaian_ro.capaianOutputByCapaianOutput.r3 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran" data-catpersen="51">
                      <span class="h4 text-blue" >
                        ${result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r3} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                       ${parseFloat(((result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r3 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>
              <div class="col mx-2 border rounded px-0 pb-1">
                <span class="text-center fw-bold bg-blue py-1  d-block w-100 fs-20px bg-yellow text-black rounded-top">31% - 50%</span>
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output"  data-catpersen="31">
                      <span class="h4 text-green" >
                        ${result.tile.capaian_ro.capaianOutputByCapaianOutput.r4} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat(((result.tile.capaian_ro.capaianOutputByCapaianOutput.r4 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2  tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran" data-catpersen="31">
                      <span class="h4 text-blue" >
                        ${result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r4} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                       ${parseFloat(((result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r4 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>
              <div class="col mx-2 border rounded px-0 pb-1">
                <span class="text-center fw-bold py-1  d-block w-100 fs-20px  bg-green text-black rounded-top">0% - 30%</span>
                <div class="d-flex justify-content-evenly bd-highlight text-center fs-11px">
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2 tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Capaian Output"  data-catpersen="0">
                      <span class="h4 text-green" >
                        ${result.tile.capaian_ro.capaianOutputByCapaianOutput.r5} RO
                      </span>
                      <br>
                      <span class="h5 text-green" >
                        ${parseFloat(((result.tile.capaian_ro.capaianOutputByCapaianOutput.r5 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Capaian</i></div>
                    <div class="text-gray-600"><i>Output</i></div>
                  </div>
                  <div class="bd-highlight mt-1">
                    <div class="my-1 mx-2  tileBottom" data-bs-toggle="modal" data-bs-target="#tileModal" data-title="Kinerja Anggaran"  data-catpersen="0">
                      <span class="h4 text-blue" >
                        ${result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r5} RO
                      </span>
                      <br>
                      <span class="h5 text-blue" >
                       ${parseFloat(((result.tile.capaian_ro.capaianRoByKinerjaAnggaran.r5 / tot_co) * 100).toFixed(2)).toLocaleString('id-ID')}%
                      </span>
                    </div>
                    <div class="text-gray-600"><i>Kinerja</i></div>
                    <div class="text-gray-600"><i>Anggaran</i></div>
                  </div>
                </div>
              </div>              
            </div>
            <div class="row mt-3">
              <div class="col mx-2 border rounded px-0 pb-1">
                <div id="chart-capaian-kinerja-anggaran" class="mx-3">                
                <div>
              </div>
            </div>
          </div>
      `;
      document.getElementById('persenRO').innerHTML = persenRO;
      tile1.innerHTML = /*html*/ `
        <div class="d-flex justify-content-between bd-highlight">
          <div class=" bd-highlight">
            <div class="fs-15px py-2 text-gray-700">Kementerian/Lembaga</div>            
            <div class="d-flex flex-column">
              <div class="mb-0 fs-11px">
                <span class="fs-45px fw-600  text-green">${result.tile.perkembangan_tagging_dan_pagu.c_kl}</span>
              </div>
              <div class="fs-13px text-gray-600 text-start">K/L Pelaksana</div>
            </div>
          </div>          
          <div class=" bd-highlight">        
            <div class="fs-15px py-2 text-gray-700">Rincian Output dan Intervensi</div>
            <div class="d-flex justify-content-between bd-highlight "> 
              <div class="p-0 bd-highlight">
                <div class="d-flex flex-column">
                  <div class="mb-0 px-0">
                    <span class="fs-45px fw-600 text-blue">${result.tile.perkembangan_tagging_dan_pagu.tot_ro}</span>
                  </div>
                  <div class="fs-13px text-gray-600 text-start">Rincian Output</div>
                </div>
              </div>              
              <div class="p-0 bd-highlight mt-2">              
                <table class="table table-responsive table-borderless table-sm ms-1 mb-0 fs-12px text-center text-gray-600">
                  <tbody>
                  <tr class="h5 align-middle">
                    <td class="align-middle spes"><span class="btn btn-primary tileTop fs-21px" data-bs-toggle="modal" data-bs-target="#tileModal" data-intervensi="spesifik">${result.tile.perkembangan_tagging_dan_pagu.spesifik_ro}</span></td>
                    <td class="align-middle sens"><span class="btn btn-primary tileTop fs-21px" data-bs-toggle="modal" data-bs-target="#tileModal" data-intervensi="sensitif">${result.tile.perkembangan_tagging_dan_pagu.sesnsitif_ro}</span></td>
                    <td class="align-middle duk"><span class="btn btn-primary tileTop fs-21px" data-bs-toggle="modal" data-bs-target="#tileModal" data-intervensi="dukungan">${result.tile.perkembangan_tagging_dan_pagu.pendamping_ro}</span></td>
                  </tr>
                  <tr class="font-fw-bold fs-14px">
                    <td class="spes fs-13px text-gray-600 text-center">Spesifik</td>
                    <td class="sens fs-13px text-gray-600 text-center">Sensitif</td>
                    <td class="duk fs-13px text-gray-600 text-center">Dukungan</td>
                  </tr>
                  </tbody>
                </table>
              </div>        
            </div>
          </div>
          <div class=" bd-highlight">            
            <div class="fs-14px pt-2 text-gray-700 ps-3">Total Pagu</div>
            <div class=" d-flex justify-content-between">
              <div class="bd-highlight mx-3">            
                <div class="mb-0 fs-11px">            
                  <span class="fs-20px fw-600 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((result.tile.perkembangan_tagging_dan_pagu.pagu_dokumen_ringkasan).toFixed(0)).toLocaleString('id-ID')}.00" title="Dokumen Ringkasan">
                    ${parseFloat((result.tile.perkembangan_tagging_dan_pagu.pagu_dokumen_ringkasan / 1000000).toFixed(2)).toLocaleString('id-ID')}T
                  </span>
                </div>    
                <div class="fs-11px text-gray-600 text-start">Dokumen Ringkasan</div>            
              </div>    
              <div class="bd-highlight justify-content-center mx-3">
                <div class="mb-0  fs-11px">
                  <span class="fs-20px fw-600 text-blue" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((result.tile.perkembangan_tagging_dan_pagu.pagu_awal_dipa).toFixed(0)).toLocaleString('id-ID')}.00" title="Pagu Awal">
                    ${parseFloat((result.tile.perkembangan_tagging_dan_pagu.pagu_awal_dipa / 1000000).toFixed(2)).toLocaleString('id-ID')}T
                  </span>
                </div>
                <div class="fs-11px text-gray-600 text-start">Pagu Awal</div>            
              </div>
              <div class="bd-highlight mx-3">
                <div class="mb-0  fs-11px ">
                  <span class="fs-20px fw-600 text-yellow zoom" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((result.tile.perkembangan_tagging_dan_pagu.pagu_harian_dipa).toFixed(0)).toLocaleString('id-ID')}.00" title="Pagu Harian">
                    ${parseFloat((result.tile.perkembangan_tagging_dan_pagu.pagu_harian_dipa / 1000000).toFixed(2)).toLocaleString('id-ID')}T
                  </span>
                </div>
                <div class="fs-11px text-gray-600 text-start">Pagu Harian</div>            
              </div>              
            </div>
            <div class="fs-14px pt-2 text-gray-700 ps-3">Analisis Lanjutan</div>
            <div class=" d-flex justify-content-between">
              <div class="bd-highlight mx-3">
                <div class="mb-0 fs-11px">
                  <span class="fs-20px fw-600 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((result.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_dokumen_ringkasan + result.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_dokumen_ringkasan + result.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_dokumen_ringkasan).toFixed(0)).toLocaleString('id-ID')}.00" title="Dokumen Ringkasan">
                    ${parseFloat(((result.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_dokumen_ringkasan + result.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_dokumen_ringkasan + result.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_dokumen_ringkasan) / 1000000).toFixed(2)).toLocaleString('id-ID')}T
                  </span>
                </div>    
                <div class="fs-11px text-gray-600 text-start">Dokumen Ringkasan</div>            
              </div>    
              <div class="bd-highlight justify-content-center mx-3">
                <div class="mb-0  fs-11px">
                  <span class="fs-20px fw-600 text-blue" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((result.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa + result.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa + result.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_awal_dipa).toFixed(0)).toLocaleString('id-ID')}.00" title="Pagu Awal">
                    ${parseFloat(((result.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa + result.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa + result.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_awal_dipa) / 1000000).toFixed(2)).toLocaleString('id-ID')}T
                  </span>
                </div>
                <div class="fs-11px text-gray-600 text-start">Pagu Awal</div>            
              </div>
              <div class="bd-highlight mx-3">
                <div class="mb-0  fs-11px ">
                  <span class="fs-20px fw-600 text-yellow zoom" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((result.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa + result.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa + result.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa).toFixed(0)).toLocaleString('id-ID')}.00" title="Pagu Harian">
                    ${parseFloat(((result.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa + result.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa + result.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa) / 1000000).toFixed(2)).toLocaleString('id-ID')}T
                  </span>
                </div>
                <div class="fs-11px text-gray-600 text-start">Pagu Harian</div>
              </div>
            </div>
          </div>
        </div>
        `;

      tile2.innerHTML = /*html*/ `
        <div class="container p-0 mb-0">
          <div class="row align-items-start fs-14px pt-2 pb-0">
            <div class="col-6 p-0 m-0">
              <div id="tingkat_output" style="width:100%;height:50px"></div>
            </div>
            <div class="col-6 p-0 m-0    border-start">
              <div id="analisis_lanjutan" style="width:100%;"></div>
            </div>
          </div>
        </div>      
      `;

      tile3.innerHTML = /*html*/ `
      <div class="container p-0 mb-0">
        <div class="row align-items-start fs-14px pt-2 pb-0">
          <div class="col-6 p-0 m-0">
            <div id="ra_tingkat_output" style="width:100%;height:150px"></div>
          </div>
          <div class="col-6 p-0 m-0">
            <div class="border-start" id="ra_analisis_lanjutan" style="width:100%;"></div>
          </div>
        </div>
      </div>      
    `;

      const table = new Tabulator("#kinerja-table", {
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
          {
            title: "No",
            titleDownload: "No",
            field: "id", visible: true, sorter: "number", hozAlign: "center", headerHozAlign: "center", frozen: true
          },
          {
            title: "K/L, Program, Kegiatan, KRO, <br> RO",
            titleDownload: "K/L, Program, Kegiatan, KRO,RO",
            headerMenuIcon: "<i class='fas fa-lg fa-fw fa-grip-vertical text-primary-700' title='Menu Header'></i>",
            headerMenu: headerMenu,
            field: "name", sorter: "string", width: 400, responsive: 0, frozen: true,
            formatter: function (cell, formatterParams) {
              let
                value = cell.getValue(),
                ncode;
              if (typeof cell._cell.row.data.ro_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class="' + c_kl + '  badge-left  p-1" >' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' p-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' p-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + ' p-1">' + cell._cell.row.data.kro_id + '</span><span class="' + color_ro + '  badge-right p-1">' + cell._cell.row.data.ro_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kro_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '" ><span class="  badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' p-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' p-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + '  badge-right p-1">' + cell._cell.row.data.kro_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kegiatan_id !== 'undefined') {
                ncode = '<div class="badge  ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' p-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' p-1">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' badge-right  p-1">' + cell._cell.row.data.kegiatan_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.program_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' p-1">' + cell._cell.row.data.intervensi_id + '</span><span class="' + c_prog + ' badge-right  p-1">' + cell._cell.row.data.program_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.intervensi_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1">' + cell._cell.row.data.kl_id + '</span><span class="' + c_inv + ' badge-right  p-1">' + cell._cell.row.data.intervensi_id + '</span></div>';
              }
              else if (typeof cell._cell.row.data.kl_id !== 'undefined') {
                ncode = '<div class="badge ' + c_main + '" ><span class="' + c_kl + '  badge-main p-1">' + cell._cell.row.data.kl_id + '</span></div>';
              }
              return '<span style="padding-right: 2em;"> ' + ncode + ' ' + cell._cell.row.data.name + '</span >';
            }
          },
          {
            title: "PROG",
            titleDownload: "Program",
            field: "jml_pro",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "program") || (typeof itemShow == "undefined")) ? true : false,
            //headerContextMenu:headerContextMenu,
            sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", mutator: function (value, data, type, params, component) {
              var
                cdt = (typeof data._children == "undefined") ? 0 : data._children.length,
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
            title: "&#931; KEG", field: "jml_keg",
            titleDownload: "Kegiatan",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "kegiatan") || (typeof itemShow == "undefined")) ? true : false,
            formatter: "number", sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }, mutator: function (value, data, type, params, component) {
              var dy = 0;
              if ((data.kl_id !== undefined) && (data.program_id === undefined) && (typeof data._children != "undefined")) {
                data._children.forEach(function (arrayItem) {
                  dy = dy + ((typeof arrayItem._children == "undefined") ? 0 : arrayItem._children.length);
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
            title: "&#931; KRO", field: "jml_kro",
            titleDownload: "KRO",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "kro") || (typeof itemShow == "undefined")) ? true : false,
            formatter: "money", formatterParams: {
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
            title: "&#931; RO", field: "jml_ro",
            titleDownload: "RO",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "ro") || (typeof itemShow == "undefined")) ? true : false,
            formatter: "money", formatterParams: {
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
          {//KA column group
            title: "Tingkat Output",
            titleDownload: "Tingkat Output",
            headerHozAlign: "center", cssClass: "has-background-warning-light",
            columns: [
              {//KA column group
                title: "Kinerja Anggaran", headerHozAlign: "center",
                columns:
                  [
                    {
                      title: "Pagu<br>(Dok. Ringkasan)",
                      titleDownload: "Pagu (Dok. Ringkasan)",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "alokasi_0", formatter: "money", formatterParams: {
                        decimal: ",",
                        thousand: ".",
                        symbol: "",
                        symbolAfter: "",
                        precision: 2, dataTreeChildColumnCalcs: true, //include child rows in column calculations
                      }, sorter: "number", headerHozAlign: "center", hozAlign: "right",
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
                      title: "Pagu Awal<br>DIPA",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "alokasi_1",
                      titleDownload: "Pagu Awal DIPA",
                      formatter: "money", formatterParams: {
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
                      title: "Pagu Harian <br>DIPA",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "alokasi_2",
                      titleDownload: "Pagu Harian DIPA",
                      formatter: "money", formatterParams: {
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
                      title: "Realisasi",
                      titleDownload: "Pagu Harian DIPA",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "alokasi_realisasi",
                      accessorDownload: numberIDRDownload,
                      formatter: "money", formatterParams: {
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
                      title: "Realisasi Anggaran <br><small>(%)</small>",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "prsn_realisasi",
                      titleDownload: "Realisasi Anggaran (%)",
                      accessorDownload: persenDownload,
                      width: 150, hozAlign: "center",
                      formatter: function (cell, formatterParams) {
                        var value = checkValue(cell.getValue(), 0);
                        return vpersen(value);
                      }
                    },
                  ]
              },
              {//KA column group
                title: "Kinerja Output",
                titleDownload: "Kinerja Output",
                headerHozAlign: "center",
                columns:
                  [
                    {
                      title: "Target Volume dalam <br> Dokumen Ringkasan",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "volume_0",
                      titleDownload: "Target Volume dalam  Dokumen Ringkasan",
                      hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150
                    },
                    {
                      title: "Target Pagu Awal",
                      titleDownload: "Target Pagu Awal",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "volume_1", hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150,
                      formatter: function (cell, formatterParams) {
                        var
                          cel1 = cell._cell.row.data.volume_1,
                          cel2 = cell._cell.row.data.volume_2,
                          cel3 = cell._cell.row.data.volume_realisasi;
                        if ((cel1 == 0) && (cel2 == 0) && (cel3 == 0)) {
                          return "";
                        } else {
                          var value = checkValue(cell.getValue(), 0),

                            data_awal = cell._cell.row.data.volume_0;
                          return upDown(value, data_awal);
                        }
                      }
                    },
                    {
                      title: "Target<br>Harian<br>DIPA",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "volume_2",
                      titleDownload: "Target Harian DIPA",
                      formatter: "money", formatterParams: {
                        decimal: ",",
                        thousand: ".",
                        symbol: "",
                        symbolAfter: "",
                        precision: 0,
                      }, sorter: "number", headerHozAlign: "center", hozAlign: "right"
                    },
                    {
                      title: "Capaian<br>Volume",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "volume_realisasi",
                      titleDownload: "Capaian Volume",
                      formatter: "money", formatterParams: {
                        decimal: ",",
                        thousand: ".",
                        symbol: "",
                        symbolAfter: "",
                        precision: 0,
                      }, sorter: "number", headerHozAlign: "center", hozAlign: "right"
                    },
                    {
                      title: "Satuan",
                      titleDownload: "Satuan",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "satuan", width: 150, hozAlign: "center"
                    },
                    {
                      title: "Capaian<br>Output<br><small>(%)</small>",
                      titleDownload: "Capaian Output (%)",
                      accessorDownload: persenDownload,
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "prsen_output", width: 150, hozAlign: "center",
                      formatter: function (cell, formatterParams) {
                        var value = checkValue(cell.getValue(), 0);
                        return vpersen(value);
                      }
                    },
                  ]
              },
            ]
          },
          {//Tingkat Analisis Lanjutan column group
            title: "Tingkat Analisis Lanjutan",
            titleDownload: "Tingkat Analisis Lanjutan",
            headerHozAlign: "center", cssClass: "has-background-info-light",
            columns: [
              {//KA column group
                title: "Kinerja Anggaran", headerHozAlign: "center",
                columns:
                  [
                    {
                      title: "Pagu<br>(Dok. Ringkasan)",
                      titleDownload: "Pagu (Dok. Ringkasan)",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "alokasi_0", formatter: "money", formatterParams: {
                        decimal: ",",
                        thousand: ".",
                        symbol: "",
                        symbolAfter: "",
                        precision: 2, dataTreeChildColumnCalcs: true, //include child rows in column calculations
                      }, sorter: "number", headerHozAlign: "center", hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
                        decimal: ",",
                        thousand: ".",
                        symbol: "",
                        symbolAfter: "",
                        precision: 2,
                      }
                    },
                    {
                      title: "Pagu Awal<br>DIPA",
                      titleDownload: "Pagu Awal DIPA",
                      accessorDownload: numberIDRDownload,
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "anl_alokasi_1", formatter: "money", formatterParams: {
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
                      title: "Pagu Harian <br>DIPA",
                      titleDownload: "Pagu Harian DIPA",
                      accessorDownload: numberIDRDownload,
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "anl_alokasi_2", formatter: "money", formatterParams: {
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
                      title: "Rencana<br>Penarikan<br>Dana",
                      titleDownload: "Rencana Penarikan Dana",
                      accessorDownload: numberIDRDownload,
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "anl_alokasi_rpd", formatter: "money", formatterParams: {
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
                      title: "Realisasi",
                      titleDownload: "Realisasi",
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "anl_alokasi_realisasi",
                      accessorDownload: numberIDRDownload,
                      formatter: "money", formatterParams: {
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
                      title: "Realisasi Anggaran <br><small>(%)</small>",
                      titleDownload: "Realisasi Anggaran (%)",
                      accessorDownload: persenDownload,
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "prsn_anl_realisasi", width: 150, hozAlign: "center",
                      formatter: function (cell, formatterParams) {
                        var value = checkValue(cell.getValue(), 0);
                        return vpersen(value);
                      }
                    },
                    {
                      title: "Realisasi thd RPD<br><small>(%)</small>",
                      titleDownload: "Realisasi thd RPD (%)",
                      accessorDownload: persenDownload,
                      headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                      headerMenu: closeColumn,
                      field: "prsn_anl_realisasi_rpd", width: 150, hozAlign: "center",
                      formatter: function (cell, formatterParams) {
                        var value = checkValue(cell.getValue(), 0);
                        return vpersen(value);
                      }
                    }
                  ]
              },
              {
                title: "Kinerja Output",
                titleDownload: "Kinerja Output",
                columns: [
                  {
                    title: "Target Volume dalam <br/> Dokumen Ringkasan",
                    titleDownload: "Target Volume dalam Dokumen Ringkasan",
                    accessorDownload: numberIDRDownload,
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "anl_volume_0", hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150
                  },
                  {
                    title: "Target Pagu Awal",
                    titleDownload: "Target Pagu Awal",
                    accessorDownload: numberIDRDownload,
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "anl_volume_1", hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      var
                        cel1 = cell._cell.row.data.anl_volume_1,
                        cel2 = cell._cell.row.data.anl_volume_2,
                        cel3 = cell._cell.row.data.anl_volume_realisasi;
                      if ((cel1 == 0) && (cel2 == 0) && (cel3 == 0)) {
                        if (typeof cell._cell.row.data.ro_id !== 'undefined') {
                          return 0;
                        } else {
                          return "";
                        }
                      } else {
                        var value = checkValue(cell.getValue(), 0),
                          data_awal = cell._cell.row.data.anl_volume_0;
                        return upDown(value, data_awal);
                      }
                    }
                  },
                  {
                    title: "Target Pagu Harian",
                    titleDownload: "Target Pagu Harian",
                    accessorDownload: numberIDRDownload,
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "anl_volume_2", hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150,
                    formatter: function (cell, formatterParams) {
                      var
                        cel1 = cell._cell.row.data.anl_volume_1,
                        cel2 = cell._cell.row.data.anl_volume_2,
                        cel3 = cell._cell.row.data.anl_volume_realisasi;
                      if ((cel1 == 0) && (cel2 == 0) && (cel3 == 0)) {
                        if (typeof cell._cell.row.data.ro_id !== 'undefined') {
                          return 0;
                        } else {
                          return "";
                        }
                      } else {
                        var value = checkValue(cell.getValue(), 0),
                          data_awal = cell._cell.row.data.anl_volume_1;
                        return upDown(value, data_awal);
                      }
                    }
                  },
                  {
                    title: "Capaian Volume",
                    titleDownload: "Capaian Volume",
                    accessorDownload: numberIDRDownload,
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "anl_volume_realisasi", hozAlign: "right", formatter: "money", formatterParams: { precision: false }, width: 150
                  },
                  {
                    title: "Satuan",
                    titleDownload: "Satuan",
                    accessorDownload: numberIDRDownload,
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "satuan2", width: 150, hozAlign: "center"
                  },
                  {
                    title: "Capaian Output<br><small>(%)</small>",
                    titleDownload: "Capaian Output (%)",
                    accessorDownload: persenDownload,
                    headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                    headerMenu: closeColumn,
                    field: "prsn_anl_output", hozAlign: "center",
                    formatter: function (cell, formatterParams) {
                      var value = checkValue(cell.getValue(), 0);
                      return vpersen(value);
                    }
                  }
                ]
              },
              {
                title: "Kinerja<br>Umum<br><small>(%)</small>",
                titleDownload: "Kinerja Umum (%)",
                accessorDownload: persenDownload,
                headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
                headerMenu: closeColumn,
                field: "kinerja_umum", hozAlign: "center",
                formatter: function (cell, formatterParams) {
                  var value = checkValue(cell.getValue(), 0);
                  return vpersen(value);
                }
              },
            ]
          },
          {
            title: "Satuan",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "satuan", titleDownload: "Satuan", sorter: "string", hozAlign: "right", headerHozAlign: "center"
          },
          {
            title: "Lokasi",
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            field: "lokasi", titleDownload: "Lokasi", sorter: "string", hozAlign: "right", headerHozAlign: "center"
          },
        ],
        initialSort: [
          { column: "id", dir: "asc" }
        ],
      });

      document.getElementById(xlss_id).addEventListener("click", function () {
        table.download("xlsx", "kinerja_anggaran.xlsx", { sheetName: "data" });
      });

      function chart_bar(titleChart, titleY, catX, seriesData, heightC = 370) {
        let options = {
          series: seriesData,
          chart: {
            height: heightC,
            type: 'line',
          },
          stroke: {
            width: [0, 0, 0, 0],
            dashArray: [0, 0, 0, 0]
          },
          title: {
            text: titleChart,
            align: 'center',
            style: {
              fontSize: '14px',
              fontWeight: '400',
            },
          },
          xaxis: {
            categories: catX
          },
          yaxis: [
            {
              title: {
                text: 'Triliun',
                style: { fontSize: '9px', fontWeight: 300 }
              },
              decimalsInFloat: 2,
              tickAmount: 5,
              labels: {
                formatter: function (value) {
                  return ((value).toFixed(0));
                }
              },
              seriesName: 'Dok Ringkasan'
            },
            {
              seriesName: 'Pagu Awal',
              show: false
            },
            {
              seriesName: 'Pagu Harian',
              show: false
            }
          ],
          tooltip: {
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return "Rp " + (value) + ' Triliun'
              }
            }
          }
        }
        return options;
      }

      function chart_bar2(titleChart, titleY, catX, seriesData, heightC = 370) {
        let options = {
          series: seriesData,
          chart: {
            height: heightC,
            type: 'line',
          },
          title: {
            text: titleChart,
            align: 'center',
            style: {
              fontSize: '14px',
              fontWeight: '400'
            },
          },
          markers: {
            size: 5,
            colors: undefined,
            strokeColors: '#fff',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
              size: 8,
              sizeOffset: 3
            }
          },
          stroke: {
            width: [0, 0, 0, 4, 4],
            dashArray: [0, 0, 0, 4, 4]
          },
          xaxis: {
            categories: catX
          },
          yaxis: [
            {
              seriesName: 'Realisasi',
              position: 'left',
              title: {
                text: 'Triliun',
                style: { fontSize: '9px', fontWeight: 300 }
              },
              decimalsInFloat: 0,
              min: 0,
              max: 100,
              tickAmount: 5,
              opposite: false,
              showAlways: true,
              axisTicks: {
                show: false
              },
            },
            {
              seriesName: 'Pagu Harian',
              show: false
            },
            {
              seriesName: 'Pagu Harian',
              show: false
            },
            {
              seriesName: 'Pagu Harian',
              show: false
            },
            {
              title: {
                text: 'Persen (%)',
                style: { fontSize: '9px', fontWeight: 300 }
              },
              decimalsInFloat: 2,
              tickAmount: 5,
              labels: {
                formatter: function (value) {
                  return ((value).toFixed(0)).toLocaleString('id-ID') + " %";
                }
              },
              opposite: true,
              seriesName: 'Pagu Awal',
              show: true
            },
          ],
          tooltip: {
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return seriesIndex == 3 || seriesIndex == 4 ? ((value).toFixed(2)).toLocaleString('id-ID') + ' %' : "Rp " + (value) + ' Triliun'
              }
            }
          }
        }
        return options;
      }

      function chart_bar3(titleChart, titleY, catX, seriesData, heightC = 370) {

        let options = {
          series: seriesData,
          chart: {
            height: heightC,
            type: 'line',
          },
          title: {
            text: titleChart,
            align: 'center',
            style: {
              fontSize: '14px',
              fontWeight: '400'
            },
          },
          markers: {
            size: 5,
            colors: undefined,
            strokeColors: '#fff',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
              size: 8,
              sizeOffset: 3
            }
          },
          stroke: {
            width: [0, 0, 4, 4],
            dashArray: [0, 0, 4, 4]
          },
          xaxis: {
            categories: catX
          },
          yaxis: [
            {
              seriesName: 'Alokasi Anggaran',
              position: 'left',
              title: {
                text: 'Milyar',
                style: { fontSize: '9px', fontWeight: 300 }
              },
              decimalsInFloat: 0,
              tickAmount: 5,
              min: 10,
              opposite: false,
              showAlways: true,
              axisTicks: {
                show: false
              },
              labels: {
                show: true,
                align: 'right',
                minWidth: 0,
                maxWidth: 160,
                offsetX: 0,
                offsetY: 0,
                rotate: 0,
                formatter: function (value) {
                  return (value).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                }
              }
            },
            {
              seriesName: 'Realisasi Anggaran',
              show: false
            },
            {
              seriesName: 'Capaian Output',
              show: false
            },
            {
              title: {
                text: 'Persen (%)',
                style: { fontSize: '9px', fontWeight: 300 }
              },
              decimalsInFloat: 2,
              tickAmount: 5,
              labels: {
                formatter: function (value) {
                  return (value * 100).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " %";
                  //return value;
                }
              },
              opposite: true,
              seriesName: 'Kinerja Anggaran',
              show: true
            },
          ],
          tooltip: {
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return seriesIndex == 2 || seriesIndex == 3 ? ((value === 1 || value === 0) ? value * 100 + "%" : (value * 100).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%') : "Rp " + (value).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Milyar'
              }
            }
          }
        }
        return options;
      }

      let
        name_short = [],
        realisasi_v = [],
        pagu_harian_v = [],
        output_prsn = [],
        realisasi_prsn = []
        ;

      /* tablePenandaanData().forEach((row) => { */
      result.detail.forEach((row) => {
        name_short.push(row.name_short);
        realisasi_v.push(row.alokasi_realisasi / 1000);
        pagu_harian_v.push(row.alokasi_2 / 1000);
        realisasi_prsn.push(row.prsn_realisasi);
        output_prsn.push(row.prsen_output);

      });

      let seriesDataTile21 = [
        {
          name: 'Dok Ringkasan', type: 'column', data: [
            parseFloat((result.tile.data_intervensi.spesifik_level_output_pagu_dokumen_ringkasan / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.sensitif_level_output_pagu_dokumen_ringkasan / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.pendamping_level_output_pagu_dokumen_ringkasan / 1000000).toFixed(2)),
          ]
        },
        {
          name: 'Pagu Awal', type: 'column', data: [
            parseFloat((result.tile.data_intervensi.spesifik_level_output_pagu_awal_dipa / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.sensitif_level_output_pagu_awal_dipa / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.pendamping_level_output_pagu_awal_dipa / 1000000).toFixed(2)),
          ]
        },
        {
          name: 'Pagu Harian', type: 'column', data: [
            parseFloat((result.tile.data_intervensi.spesifik_level_output_harian_dipa / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.sensitif_level_output_harian_dipa / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.pendamping_level_output_harian_dipa / 1000000).toFixed(2))
          ]
        }
      ], seriesDataTile22 = [
        {
          name: 'Dok Ringkasan', type: 'column', data: [
            parseFloat((result.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_dokumen_ringkasan / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_dokumen_ringkasan / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_dokumen_ringkasan / 1000000).toFixed(2)),
          ]
        },
        {
          name: 'Pagu Awal', type: 'column', data: [
            parseFloat((result.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_awal_dipa / 1000000).toFixed(2)),
          ]
        },
        {
          name: 'Pagu Harian', type: 'column', data: [
            parseFloat((result.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa / 1000000).toFixed(2)),
            parseFloat((result.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa / 1000000).toFixed(2))
          ]
        }
      ],
        cat1X = ['Spesifik', 'Sensitif', 'Dukungan'],
        cat2X = ['Spesifik', 'Sensitif', 'Dukungan'],
        cat3X = name_short,
        seriesDataTile31 = [
          {
            name: 'Realisasi', type: 'column', data: [
              parseFloat((result.tile.data_intervensi.spesifik_level_output_realisasi / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.sensitif_level_output_realisasi / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.pendamping_level_output_realisasi / 1000000).toFixed(2))
            ]
          },
          {
            name: 'Pagu Awal', type: 'column', data: [
              parseFloat((result.tile.data_intervensi.spesifik_level_output_pagu_awal_dipa / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.sensitif_level_output_pagu_awal_dipa / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.pendamping_level_output_pagu_awal_dipa / 1000000).toFixed(2)),
            ]
          },
          {
            name: 'Pagu Harian', type: 'column', data: [
              parseFloat((result.tile.data_intervensi.spesifik_level_output_harian_dipa / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.sensitif_level_output_harian_dipa / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.pendamping_level_output_harian_dipa / 1000000).toFixed(2))
            ]
          },
          {
            name: '%Pagu Awal', type: 'line', data: [
              parseFloat((result.tile.data_intervensi.spesifik_p_realisasi_terhadap_pagu_awal * 100).toFixed(2)),
              parseFloat((result.tile.data_intervensi.sensitif_p_realisasi_terhadap_pagu_awal * 100).toFixed(2)),
              parseFloat((result.tile.data_intervensi.pendamping_p_realisasi_terhadap_pagu_awal * 100).toFixed(2)),
            ]
          },
          {
            name: '%Pagu Harian', type: 'line', data: [
              parseFloat((result.tile.data_intervensi.spesifik_p_realisasi_terhadap_pagu_harian * 100).toFixed(2)),
              parseFloat((result.tile.data_intervensi.sensitif_p_realisasi_terhadap_pagu_harian * 100).toFixed(2)),
              parseFloat((result.tile.data_intervensi.pendamping_p_realisasi_terhadap_pagu_harian * 100).toFixed(2))
            ]
          },
        ],
        seriesDataTile32 = [
          {
            name: 'Realisasi', type: 'column', data: [
              parseFloat((result.tile.data_intervensi.spesifik_analisis_lanjutan_ralisasi / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.sensitif_analisis_lanjutan_ralisasi / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.pendamping_analisis_lanjutan_ralisasi / 1000000).toFixed(2))
            ]
          },
          {
            name: 'Pagu Awal', type: 'column', data: [
              parseFloat((result.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.pendamping_analisis_lanjutan_pagu_awal_dipa / 1000000).toFixed(2)),
            ]
          },
          {
            name: 'Pagu Harian', type: 'column', data: [
              parseFloat((result.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa / 1000000).toFixed(2)),
              parseFloat((result.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa / 1000000).toFixed(2))
            ]
          },
          {
            name: '%Pagu Awal', type: 'line', data: [
              parseFloat(((result.tile.data_intervensi.spesifik_analisis_lanjutan_ralisasi / result.tile.data_intervensi.spesifik_analisis_lanjutan_harian_dipa) * 100).toFixed(2)),
              parseFloat(((result.tile.data_intervensi.sensitif_analisis_lanjutan_ralisasi / result.tile.data_intervensi.sensitif_analisis_lanjutan_harian_dipa) * 100).toFixed(2)),
              parseFloat(((result.tile.data_intervensi.pendamping_analisis_lanjutan_ralisasi / result.tile.data_intervensi.pendamping_analisis_lanjutan_harian_dipa) * 100).toFixed(2)),
            ]
          },
          {
            name: '%Pagu Harian', type: 'line', data: [
              parseFloat(((result.tile.data_intervensi.spesifik_analisis_lanjutan_ralisasi / result.tile.data_intervensi.spesifik_analisis_lanjutan_pagu_awal_dipa) * 100).toFixed(2)),
              parseFloat(((result.tile.data_intervensi.sensitif_analisis_lanjutan_ralisasi / result.tile.data_intervensi.sensitif_analisis_lanjutan_pagu_awal_dipa) * 100).toFixed(2)),
              parseFloat((result.tile.data_intervensi.pendamping_p_realisasi_terhadap_pagu_harian * 100).toFixed(2))
            ]
          },
        ],
        seriesDataTile4 = [
          {
            name: 'Alokasi Anggaran', type: 'column', data: pagu_harian_v
          },
          {
            name: 'Realisasi Anggaran', type: 'column', data: realisasi_v
          },
          {
            name: 'Capaian Output', type: 'line', data: output_prsn
          },
          {
            name: 'Kinerja Anggaran', type: 'line', data: realisasi_prsn
          },
        ]
        ;

      $(".tileTop").on("click", async function () {
        $("#viewData").html(" ");

        let
          intv = $(this).data("intervensi"),
          intv_id,
          res_popup;

        if (intv == "sensitif") {
          intv_id = ["B"];
        }
        else if (intv == "spesifik") {
          intv_id = ["A"];
        }
        else {
          intv_id = ["C"];
        }

        $("#titleInv").html($(this).html() + " RO " + $(this).data("intervensi").charAt(0).toUpperCase() + $(this).data("intervensi").slice(1));

        try {
          let
            perData = periode.split("-"),
            res = await fetch(config.api_url + '/ka/ro-intervensi', {
              method: 'POST',
              body: JSON.stringify({
                "tahun": perData[0],
                "semester": perData[1],
                "kl": sel_kl,
                "intervensi": intv_id,
                "search": $("#kinerjaAnggaranSrc").val()
              }),
              headers: config.fetchHeaders
            });
          res_popup = await res.json();

        } catch (e) {
          return false;
        }

        let gKl = [];
        res_popup.data.detail.forEach((item, index1) => {

          let gRo = [];
          item._children.forEach((itemx, index2) => {
            gRo.push(/*html*/`
              <li class="ms-4 d-flex bd-highlight fs-14px">
                <div class="p-1 bd-highlight">${index2 + 1}. </div>
                <div class="p-1 bd-highlight">${itemx.suboutput_nama}.</div>
                <!-- <div class="p-1 bd-highlight ms-auto">${itemx.kl_id + itemx.intervensi_id + itemx.program_kode + itemx.kegiatan_kode + itemx.output_kode + itemx.suboutput_kode} </div> -->
              </li>
            `);
          });

          gKl.push(/*html*/`
            <ul class="list-unstyled">
              <li class="ms-4">
                <div class="d-flex bd-highlight h6 mb-0">
                  <div class="p-1 bd-highlight">${index1 + 1}. </div>
                  <div class="p-1 bd-highlight">${item.name}.</div>
                </div>
                <ul class="list-unstyled">${gRo.join(" ")}</ul>
              </li>
            </ul>
            `);
        });
        $("#viewData").html(gKl);
      });

      $(".tileBottom").on("click", async function () {
        $("#viewData").html(" ");

        let
          titlePopup = $(this).data("title"),
          cPersen = $(this).data("catpersen"),
          res_popup1;
        let gKl = [];
        if (titlePopup.toLowerCase() == "capaian output") {
          try {
            let
              perData = periode.split("-"),
              res = await fetch(config.api_url + '/ka/ro-capaian', {
                method: 'POST',
                body: JSON.stringify({
                  "tahun": perData[0],
                  "semester": perData[1],
                  "kl": sel_kl,
                  "intervensi": sel_int,
                  "search": $("#kinerjaAnggaranSrc").val(),
                  "parameter": cPersen
                }),
                headers: config.fetchHeaders
              });
            res_popup1 = await res.json();
            res_popup1.data.detail.forEach((item, index1) => {
              let gRo = [];
              item._children.sort((a, b) => b.prsn_anl_output - a.prsn_anl_output);
              item._children.forEach((itemx, index2) => {
                gRo.push(/*html*/`
                  <li class="ms-4 d-flex bd-highlight fs-14px">
                    <div class="p-1 bd-highlight">${index2 + 1}. </div>
                    <div class="p-1 bd-highlight">${itemx.suboutput_nama}.</div>
                    <div class="p-1 bd-highlight ms-auto">${(itemx.prsn_anl_output) >= 1 ? 100 : (itemx.prsn_anl_output * 100).toFixed(2)}%</div>
                    <!-- <div class="p-1 bd-highlight ms-auto">${itemx.kl_id + itemx.intervensi_id + itemx.program_kode + itemx.kegiatan_kode + itemx.output_kode + itemx.suboutput_kode} </div> -->
                  </li>
                `);
              });

              gKl.push(/*html*/`
                <ul class="list-unstyled">
                  <li class="ms-4">
                    <div class="d-flex bd-highlight h6 mb-0">
                      <div class="p-1 bd-highlight">${index1 + 1}. </div>
                      <div class="p-1 bd-highlight">${item.name}.</div>
                    </div>
                    <ul class="list-unstyled">${gRo.join(" ")}</ul>
                  </li>
                </ul>
              `);
            });

          } catch (e) {
            return false;
          }
        }

        if (titlePopup.toLowerCase() == "kinerja anggaran") {
          try {
            let
              perData = periode.split("-"),
              res = await fetch(config.api_url + '/ka/ro-anggaran', {
                method: 'POST',
                body: JSON.stringify({
                  "tahun": perData[0],
                  "semester": perData[1],
                  "kl": sel_kl,
                  "intervensi": sel_int,
                  "search": $("#kinerjaAnggaranSrc").val(),
                  "parameter": cPersen
                }),
                headers: config.fetchHeaders
              });
            res_popup1 = await res.json();

            res_popup1.data.detail.forEach((item, index1) => {
              let gRo = [],
                itemW = [];
              item._children.sort((a, b) => b.prsn_anl_realisasi - a.prsn_anl_realisasi);
              item._children.forEach((itemx, index2) => {
                gRo.push(/*html*/`
                  <li class="ms-4 d-flex bd-highlight fs-14px">
                    <div class="p-1 bd-highlight">${index2 + 1}. </div>
                    <div class="p-1 bd-highlight">${itemx.suboutput_nama}.</div>
                    <div class="p-1 bd-highlight ms-auto">
                    ${(itemx.prsn_anl_realisasi) >= 1 ? 100 : (itemx.prsn_anl_realisasi * 100).toFixed(2)}%
                    </div>
                    <!-- <div class="p-1 bd-highlight ms-auto">${itemx.kl_id + itemx.intervensi_id + itemx.program_kode + itemx.kegiatan_kode + itemx.output_kode + itemx.suboutput_kode} </div> -->
                  </li>
                `);
              });

              gKl.push(/*html*/`
                <ul class="list-unstyled">
                  <li class="ms-4">
                    <div class="d-flex bd-highlight h6 mb-0">
                      <div class="p-1 bd-highlight">${index1 + 1}. </div>
                      <div class="p-1 bd-highlight">${item.name}.</div>
                    </div>
                    <ul class="list-unstyled">${gRo.join(" ")}</ul>
                  </li>
                </ul>
              `);
            });
          } catch (e) {
            return false;
          }
        }

        $("#titleInv").html(
          titlePopup + "<br/>" +
          "<div class='h6 py-1 fw-500'>" + $(this).find(".h4").html().trim() + "   (" + $(this).find(".h5").html() + " dari total RO)</div>"
        );
        $("#viewData").html(gKl);
      });

      return {
        'data': table,
        'chat1': chart_bar('Tingkat Ouput', 'Triliun', cat1X, seriesDataTile21, 270),
        'chat2': chart_bar('Analisis Lanjutan', 'Triliun', cat1X, seriesDataTile22, 270),
        'chat3': chart_bar2('Tingkat Ouput', 'Persen (%)', cat2X, seriesDataTile31, 270),
        'chat4': chart_bar2('Analisis Lanjutan', 'Persen (%)', cat2X, seriesDataTile32, 270),
        'chat5': chart_bar3(' ', 'Persen (%)', cat3X, seriesDataTile4, 410),
        'result': result.detail
      };
    }

    /* chart */
    popUp = /*html*/ `
      <div class="modal-header bg-gray-300 w-100">
        <h5 class="modal-title">
          <i class="far fa-lg fa-fw fa-chart-bar"></i>
          Kinerja Anggaran
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body w-100">
        <div class="tab-overflowx">
          <ul class="nav nav-tabs ">
            <li class="nav-item"><a  class="nav-link nav-popup active" onClick="tabElemn(this);" data-active="true" data-tab="1"><i class="material-icons" style="position: relative;bottom: -7px;">fact_check</i> &nbsp; Chart Tingkat Output</h4></a></li>
            <li class="nav-item"><a  class="nav-link nav-popup" onClick="tabElemn(this);" data-active="false" data-tab="2"><i class="material-icons" style="position: relative;bottom: -7px;">content_paste_search</i> &nbsp; Chart Tingkat Analisis Lanjutan</h4></a></li>
          </ul>
        </div>
        <div class="tab-content border-top">
          <!-- begin tab-pane -->
          <div class="tab-pane p-3 fade active show" id="default-pop-1">                        
            <div class="btn-group btn-group-justified" id="btn-pilih">
              <span class="gchart me-3">Group By :</span>
              <a class="btn btn-default text-end active" id="gpIntervensi" onClick="gpIntervensi(this)" style="min-width: 8em;border-top-left-radius: 5px;border-bottom-left-radius: 5px;"><i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Intervensi</a>
              <a class="btn btn-default text-end " id="gpKL" onClick="gpKL(this)" style="min-width: 14em;">Kementerian/Lembaga</a>
            </div>                        
            <div class="col-xl-12 show active" id="contentIntervensi" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL" ><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR" ><span class="text-middle">Dokumen Ringkasan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA" ><span class="text-middle">Pagu Awal</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH" ><span class="text-middle">Pagu Harian</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-danger" id="sortByR" ><span class="text-middle">Realisasi</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-green" id="sortByRO" ><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
              </div>
              <!--GRAFIK-->
              <div id="chartdiv" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
            <div class="col-xl-12 hide" id="contentKL" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL12" ><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR12" ><span class="text-middle">Dokumen Ringkasan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA12" ><span class="text-middle">Pagu Awal</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH12" ><span class="text-middle">Pagu Harian</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-danger" id="sortByR12" ><span class="text-middle">Realisasi</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-green" id="sortByRO12" ><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
              </div>
              <!--GRAFIK-->
              <div id="chartdiv12" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
          </div>
          <div class="tab-pane p-3 fade" id="default-pop-2">
            <div class="btn-group btn-group-justified" id="btn-pilih">
              <span class="gchart me-3">Group By :</span>
              <a class="btn btn-default text-end active" id="gpIntervensi2"  onClick="gpIntervensi2(this)" style="min-width: 8em;border-top-left-radius: 5px;border-bottom-left-radius: 5px;"><i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Intervensi</a>
              <a class="btn btn-default text-end " id="gpKL2" onClick="gpKL2(this)" style="min-width: 14em;">Kementerian/Lembaga</a>
            </div>
            <div class="col-xl-12 show active" id="contentIntervensi2" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL2" ><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR2" ><span class="text-middle">Dokumen Ringkasan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA2" ><span class="text-middle">Pagu Awal</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH2" ><span class="text-middle">Pagu Harian</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-danger" id="sortByR2" ><span class="text-middle">Realisasi</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-green" id="sortByRO2" ><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>                                    
              </div>
              <!--GRAFIK--->
              <div id="chartdiv3" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK--->                    
            </div>
            <div class="col-xl-12 hide" id="contentKL2" >
              <div class="text-left pt-3">
                <span class="gchart me-4">Sort By :</span>
                <div class="btn btn-primary" id="sortByKL22" ><span class="text-middle">Kementerian Lembaga</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-info" id="sortByDR22" ><span class="text-middle">Dokumen Ringkasan</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-indigo" id="sortByPA22" ><span class="text-middle">Pagu Awal</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
                <div class="btn btn-pink" id="sortByPH22" ><span class="text-middle">Pagu Harian</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-danger" id="sortByR22" ><span class="text-middle">Realisasi</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i> </div>
                <div class="btn btn-green" id="sortByRO22" ><span class="text-middle">RO</span> <span class=""> | </span> <i class="fas fa-align-justify text-middle"></i></div>
              </div>
              <!--GRAFIK-->
              <div id="chartdiv32" class="col-xl-12 col-lg-11 pt-3" style="margin-top: 0em;margin-bottom: 1em;height:1000px"></div>
              <!--GRAFIK-->
            </div>
          </div>
        </div>
      </div>`;

    /*------------------- Belanja KL Krisna ----------------------*/
    belanjaKL(periode, sel_kl, sel_int, search);

    async function getBelanjaKL(periode, kl, int, search) {
      let perData = periode.split("-");
      try {
        let res = await fetch(config.api_url + '/renja/kabupaten', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": [perData[0]],
            //"semester": perData[1],
            "kl": kl,
            //"intervensi": int,
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
    async function getDetailBelanjaKL(periode, kl, int, search) {
      /* kl = ["010", "063", "047", "027"] */
      try {
        let res = await fetch(config.api_url_v3 + '/renja/renjakl-v3', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": periode,
            "kl": kl,
            "search": search
          }),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        return _res.data;
      } catch (e) {
        console.log("e", e);
        return false;
      }
    };

    async function belanjaKL(periode, sel_kl, sel_int, search) {
      let dataBKL, dataDetailBKL,
        perData = periode.split("-");
      if (['2022', '2023'].includes(perData[0])) {
        $("#mapload,#tableload,.sumber-data-renja,#container_renjakl").removeClass("hide");
        $("#mapload,#tableload").addClass("loading");
        await getBelanjaKL(periode, sel_kl, sel_int, search).then(function (data) {
          mData.belanjaKL = data;
          viewMapBelanjaKL(mData.belanjaKL);
        });
        /*tabel dibawah*/
        await getDetailBelanjaKL(periode, sel_kl, sel_int, search).then(function (data) {
          mData.dataDetailBKL = data;
          // strukturData(data);
          // let adjust = tableTreeLevel(data.detail, "all");
          let adjust = tableTreeLevel(strukturKinerjaAnggaran(data), "all");
          tableDataKrisna(adjust);
          //treeOpenClose(data.detail);
        });
      } else {
        $("#mapload,#tableload,.sumber-data-renja,#container_renjakl").addClass("hide");
      }
      closeButton();

      if (typeof mData.belanjaKL === "undefined") {
        $("#belanjaKL").hide();
      } else {
        $("#belanjaKL").show();
        $("#mapload,#tableload").removeClass("loading");
      }
    }








    treeOpenCloseHtml("#elemenOpenClose");

    $(".openclose").on("click", function () {
      let periode = document.getElementById("sel_ta").value;
      if (['2022', '2023'].includes(periode)) {
        let data = treeOpenClose(this, mData.dataDetailBKL.detail);
        tableDataKrisna(data.adjust, data.opsiTabel, data.item);
      } else {
        let
          detail = mData.kinerjaAnggaranBelanja.detail,
          data = treeOpenClose(this, detail, true), /* intervensi is true*/
          dataAdjust = {
            "detail": data.adjust,
            "tile": mData.kinerjaAnggaranBelanja.tile,
          };
        tableData(dataAdjust, data.opsiTabel, data.item).then((result) => {
          var chart1 = new ApexCharts(
            document.querySelector('#tingkat_output'),
            result.chat1
          ), chart2 = new ApexCharts(
            document.querySelector('#analisis_lanjutan'),
            result.chat2
          ), chart3 = new ApexCharts(
            document.querySelector('#ra_tingkat_output'),
            result.chat3
          ), chart4 = new ApexCharts(
            document.querySelector('#ra_analisis_lanjutan'),
            result.chat4
          ), chart5 = new ApexCharts(
            document.querySelector('#chart-capaian-kinerja-anggaran'),
            result.chat5
          );
          chart1.render();
          chart2.render();
          chart3.render();
          chart4.render();
          chart5.render();
        })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    $(".groupItem button").on("click", function () {
      let periode = document.getElementById("sel_ta").value;
      console.log(this);
      if (['2022', '2023'].includes(periode)) {
        let data = treeBtnGroup(this, mData.dataDetailBKL.detail);
        tableDataKrisna(data.adjust, data.opsiTabel, data.item);
      } else {
        let
          detail = mData.kinerjaAnggaranBelanja.detail,
          data = treeBtnGroup(this, detail, true), /* intervensi is true*/
          dataAdjust = {
            "detail": data.adjust,
            "tile": mData.kinerjaAnggaranBelanja.tile,
          }
          ;
        tableData(dataAdjust, data.opsiTabel, data.item).then((result) => {
          var chart1 = new ApexCharts(
            document.querySelector('#tingkat_output'),
            result.chat1
          ), chart2 = new ApexCharts(
            document.querySelector('#analisis_lanjutan'),
            result.chat2
          ), chart3 = new ApexCharts(
            document.querySelector('#ra_tingkat_output'),
            result.chat3
          ), chart4 = new ApexCharts(
            document.querySelector('#ra_analisis_lanjutan'),
            result.chat4
          ), chart5 = new ApexCharts(
            document.querySelector('#chart-capaian-kinerja-anggaran'),
            result.chat5
          );
          chart1.render();
          chart2.render();
          chart3.render();
          chart4.render();
          chart5.render();
        })
          .catch((error) => {
            console.log(error);
          });
      }
    });

    async function tableDataKrisna(result, opsiTabel = { expand: false }, itemShow) {
      //console.log(result);
      let thn_ini = parseInt($("#sel_ta").val()),
        thn_1 = thn_ini + 1,
        thn_2 = thn_ini + 2,
        thn_3 = thn_ini + 3;
      //console.log(item);
      const table = new Tabulator("#tableload", {
        /* height: "515px", */
        data: result,
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
                ncode = '<div class="badge py-1 ' + c_main + '" ><span class="' + c_kl + '  badge-main p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight ps-1"> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              } else if (cell._cell.row.data.posisi === 'Program') {
                ncode = '<div class="badge ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' badge-right  p-1" title="Program">' + cell._cell.row.data.program_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              } else if (cell._cell.row.data.posisi === 'Kegiatan') {
                ncode = '<div class="badge  ' + c_main + '"><span class=" badge-left ' + c_kl + ' p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' p-1" title="Program">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' badge-right  p-1" title="Kegiatan">' + cell._cell.row.data.kegiatan_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              } else if (cell._cell.row.data.posisi === 'KRO') {/* OUTPUT */
                ncode = '<div class="badge ' + c_main + '" ><span class="  badge-left ' + c_kl + ' p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' p-1" title="Program">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1" title="Kegiatan">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + '  badge-right p-1"  title="Klasifikasi Rincian Ouput">' + cell._cell.row.data.kro_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              } else if (cell._cell.row.data.posisi === 'RO') {
                ncode = '<div class="badge ' + c_main + '"><span class="' + c_kl + '  badge-left  p-1" title="Kementerian/Lembaga">' + cell._cell.row.data.kl_id + '</span><span class="' + c_prog + ' p-1" title="Program">' + cell._cell.row.data.program_id + '</span><span class="' + c_keg + ' p-1" title="Kegiatan">' + cell._cell.row.data.kegiatan_id + '</span><span class="' + c_kro + ' p-1"  title="Klasifikasi Rincian Output">' + cell._cell.row.data.kro_id + '</span><span class="' + color_ro + '  badge-right p-1"  title="Rincian Output">' + cell._cell.row.data.ro_id + '</span></div>';
                hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
              } else {
                ncode = '<span class="badge rounded-pill bg-yellow-600 py-1">' + cell._cell.row.data.komponen_id + '</span>';
                hasil = /*html*/`
                    <div class="container">
                      <div class="row">
                        <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
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
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
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
            headerMenuIcon:/*html*/`<i class="fas fa-lg fa-fw fa-check text-primary-700 fs-15px"></i>`,
            headerMenu: closeColumn,
            visible: ((itemShow == "semua") || (itemShow == "kegiatan") || (typeof itemShow == "undefined")) ? true : false,
            field: "jml_kegiatan", formatter: "number", sorter: "number", headerHozAlign: "center",
            hozAlign: "right", bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            }, mutator: function (value, data, type, params, component) {
              let chld_data = (typeof data._children == "undefined") ? 0 : data._children.length,
                dt = data.program_id !== undefined && data.kegiatan_id === undefined ? chld_data : '',
                dy = 0;
              if (data.kl_id !== undefined && data.program_id === undefined) {
                data._children.forEach(function (arrayItem) {
                  dy = dy + ((typeof arrayItem._children == "undefined") ? 0 : arrayItem._children.length);
                });
                return dy;
              } else if (data.program_id !== undefined && data.kegiatan_id === undefined) {
                return (typeof data._children == "undefined") ? 0 : data._children.length;
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
            }, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "" || value === null) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
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
            }, formatter: function (cell, formatterParams) {
              var value = cell.getValue();
              if (value === "" || value === null) {
                cell.getElement().style.backgroundColor = "#E5E8E8";
              }
              return value;
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
              var
                value = cell.getValue(),
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
          }
          ,
          {
            title: "Tingkat Output",
            titleDownload: "Tingkat Output",
            field: "",/* belum ada data */
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
            field: "",/* belum ada data */
            headerPopup: function (e, column, onRendered) {
              return popupnote("Alokasi ditingkat Analisis Lanjutan");
            },
            headerPopupIcon: "<i class='fas fa-exclamation-circle'></i>",

            /*  formatter: "money", */
            formatter: function (cell, formatterParams) {
              var
                value = cell.getValue(),
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
            title: "Realiasasi Tingkat Output",
            titleDownload: "Realiasasi Tingkat Output",
            field: "alokasi_realisasi",/* belum ada data */
            headerPopup: function (e, column, onRendered) {
              return popupnote("Realiasasi Tingkat Output");
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
              return "";
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
            title: "Realisasi Analisis Lanjutan",
            titleDownload: "Realisasi Analisis Lanjutan",
            field: "",/* belum ada data */
            headerPopup: function (e, column, onRendered) {
              return popupnote("Realiasasi Analisis Lanjutan");
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
              return "";
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
              return popupnote("Lokasi");
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
              return popupnote("Satuan");
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
            sorter: "text", headerHozAlign: "center", hozAlign: "center",
            accessorDownload: numberIDRDownload
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
          },
          {
            title: "Target Kesepakatan Tingkat Output",
            titleDownload: "Target Kesepakatan Tingkat Output ",
            field: "",/* belum ada data */
            headerPopup: function (e, column, onRendered) {
              return popupnote("Target Kesepakatan Tingkat Output");
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
            field: "",/* belum ada data */
            headerPopup: function (e, column, onRendered) {
              return popupnote("Target Kesepakatan Tingkat Analisis Lanjutan");
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
    }

    function viewMapBelanjaKL(datax) {

      function loadMap(parentId, id) {
        return (typeof document.querySelector(parentId) === 'undefined') || (document.querySelector(parentId) == null) ? " " : document.querySelector(parentId).innerHTML = '<div id="' + id + '" style="height: 37em;""></div>',
          document.querySelector("#before-side-bar").innerHTML = /* html */`
            <div id="leaflet-sidebar" class="leaflet-sidebar collapsed">
              <div id="title-tab"></div>
              <!-- Nav tabs -->
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link nav-popup active" onclick="tabElemn(this);" data-active="true" data-tab="1">
                    <i class='fa fa-table text-primary me-2'></i>Detail Indikator
                  </a>
                </li>
                <li class="nav-item hide">
                  <a class="nav-link nav-popup" onclick="tabElemn(this);" data-active="false" data-tab="2">
                    <i class='fa fa-chart-bar text-primary me-2'></i>Grafik
                  </a>
                </li>
              </ul>
              <!-- Tab panes -->
              <div class="tab-content mx-2">
                <div class="d-flex justify-content-between bd-highlight">
                  <div class="d-flex justify-content-between pt-3 pb-2 ms-2 bd-highlight open_table">
                    <div class="fs-12px fw-600 position-relative ">                  
                      <i class="material-icons fs-15px text-green-400">close_fullscreen</i> 
                      <span class="position-absolute top-50 start-5 translate-middle-y ps-1 material-text" style="width: 5em;">Open All</span>
                    </div>
                  </div>
                </div>
                <div class="tab-pane fade active show" id="default-pop-1"></div>
                <div class="tab-pane fade" id="default-pop-2">
                  <div class="row flex">
                    <div class="card rounded-lg m-2 mt-3 col">
                      <div class="card-body">
                        <h5 class="card-title text-dark font-weight-bold">Proporsi Alokasi Anggaran</h5>
                        <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Kementerian/ Lembaga </h6>
                        <div id="chart-pie-kl"></div>
                      </div>
                    </div>
                    <div class="card rounded-lg m-2 mt-3 col">
                      <div class="card-body">
                        <h5 class="card-title text-dark font-weight-bold">Alokasi dan Realisasi Anggaran</h5>
                        <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Kementerian/ Lembaga </h6>
                        <div id="chart-bar-kementerian"></div>
                      </div>
                    </div>                            
                  </div>
                  <div class="row flex">
                    <div class="card rounded-lg m-2 mt-3 col">
                      <div class="card-body">
                        <h5 class="card-title text-dark font-weight-bold">Proporsi Alokasi Anggaran</h5>
                        <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Intervensi </h6>
                        <div id="chart-pie-int"></div>
                      </div>
                    </div>
                    <div class="card rounded-lg m-2 mt-3 col">
                      <div class="card-body">
                        <h5 class="card-title text-dark font-weight-bold">Alokasi dan Realisasi Anggaran</h5>
                        <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Intervensi </h6>
                        <div id="chart-bar-int"></div>
                      </div>
                    </div>                            
                  </div>
                  <div class="row flex">
                    <div class="card rounded-lg m-2 mt-3 col">
                      <div class="card-body">
                        <h5 class="card-title text-dark font-weight-bold">Capaian Indikator Komponen</h5>
                        <h6 class="card-subtitle mb-2 text-dark">Terhadap Tahun Anggaran </h6>
                        <div id="chart-capaian-1"></div>
                      </div>
                    </div>
                    <div class="card rounded-lg m-2 mt-3 col">
                      <div class="card-body">
                        <h5 class="card-title text-dark font-weight-bold">Capaian Indikator Komponen</h5>
                        <h6 class="card-subtitle mb-2 text-dark">Berdasarkan Intervensi </h6>
                        <div id="chart-capaian-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
      }

      let mapId = "belanjaKL",
        popup = new L.Popup({ autoPan: false });
      loadMap("#mapload", mapId);
      //$("#mapload").addClass("loading");
      var
        closeTooltip,
        openStreetMap = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
        map = L.map(document.getElementById(mapId), {
          layers: [openStreetMap],
          zoomControl: false,
          scrollWheelZoom: true,
          loadingControl: true,
          gestureHandling: true
        });

      var gmap_data = L.geoJSON(null, {
        className: '',
        onEachFeature: function (feature, layer) {
          let
            dataProperties = feature.properties;
          layer.setStyle({
            weight: 1,
            color: '#ff9800',
            dashArray: '',
            fillOpacity: 0.7
          });
          layer.bindTooltip('<span class="fs-12px fw-600">' + kabKotaName(dataProperties.kabupaten_nama, "sort") + ' |</span> <span class= "fs-12px" >' + dataProperties.provinsi_nama + '</span>');
          layer.bindPopup('<div class="spinner-grow text-warning mt-2"></div>', {
            keepInView: true,
            autoPan: true,
            autoClose: true,
            closeOnClick: false,
            className: 'popupCustom',
            maxWidth: 307
          });
          layer.on({
            mouseover: function (e) {
              highlightFeature(e);
              layer.openTooltip();
            },
            //mouseout: highlightFeature,
            mouseout: resetHighlight,
            click: function (e) {
              map.closePopup();
              layer.openPopup();
              sidebar.isVisible() ? sidebar.hide() : null;
              getDetail(e, dataProperties);
            },
          });
        },
      }).addTo(map);
      map.addControl(L.control.fullscreen({
        position: 'topright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
        forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
        fullscreenElement: document.getElementById("fbody") // Dom element to render in full screen, false by default, fallback to map._container
      }));
      L.control.zoom({
        position: 'topright'
      }).addTo(map);
      let btnHomeReset = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function (map) {
          var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0');
          container.title = 'Reset Posisi Peta';
          container.type = "button";
          container.style.backgroundImage = 'url(img/home.png)';
          container.style.backgroundSize = "26px 26px";
          container.style.width = '27px';
          container.style.height = '27px';
          container.onclick = function () {
            map.closePopup();
            map.fitBounds(gmap_data.getBounds());
          }
          return container;
        }
      }),
        search = new GeoSearch.GeoSearchControl({
          provider: new GeoSearch.OpenStreetMapProvider({
            params: {
              'accept-language': 'id',
              countrycodes: 'id',
              addressdetails: 0,
            }
          }),
          showMarker: false,
          searchLabel: 'Pencarian Lokasi',
          style: 'button', // button atau bar
          autoClose: true,
          updateMap: true
        }),
        sidebar = L.control.sidebar('leaflet-sidebar', {
          closeButton: true,
          position: 'right'
        });
      map.addControl(sidebar);
      map.addControl(new btnHomeReset());
      map.addControl(search);
      map.on('click', function () {
        sidebar.hide();
        map.closePopup();
        closeButton();
      })

      const initData = async () => {
        if (datax.features != null) {
          //console.log(datax);
          map.spin(true, { lines: 10, length: 20 });
          gmap_data.addData(datax);
          //gmap_data.addData({ 'features': null });
          map.spin(false);
        }
      };
      initData();

      function getColor(d) {
        return d == 6 ? "#eb72a2" :
          d == 5 ? "#fed976" :
            d == 4 ? "#feb24c" :
              d == 3 ? "#9e9ac8" :
                d == 2 ? "#fc4e2a" :
                  d == 1 ? "#6a51a3" :
                    "#b10026";
      }
      function style(feature) {
        var color_poligon = {
          weight: 1,
          opacity: 1,
          color: 'rgba(35,35,35,1.0)',
          dashArray: '',
          fillOpacity: 1,
          //fillColor: getColor(feature)
          fillColor: "#FFC107"
        };
        return color_poligon;
      }
      function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#ff9800',
          dashArray: '',
          fillOpacity: 0.9
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
      }
      function resetHighlight(e) {
        var layer = e.target;
        layer.setStyle({
          weight: 1,
          color: '#ff9800',
          dashArray: '',
          fillOpacity: 0.7
        });
        //gmap_data.resetStyle(e.target);
      }

      function getDetail(e, p) {
        let
          buttonInfo,
          popupContent = '',
          popup = e.target.getPopup(),
          kab_kode = p.kabupaten_kode,
          kab_nama = kabKotaName(p.kabupaten_nama),
          prov_nama = p.provinsi_nama,
          thn = $("#sel_ta").val(),
          kl = $("#sel_kl").val()
          ;

        /*  var mmn = async () => { */
        $(".leaflet-popup-content-wrapper").addClass(['bg-black-transparent-8', 'rounded']);

        /* if (typeof mData.detailBL === "undefined") { */
        const request = async () => {
          var detailBL;
          try {
            let res = await fetch(config.api_url + '/renja/renjalokus', {
              method: 'POST',
              body: JSON.stringify({
                tahun: thn,
                kl: kl,
                level: "kabupaten",
                kabupaten: kab_kode
              }),
              headers: config.fetchHeaders
            });
            let _res = await res.json();
            detailBL = _res.data;
          } catch (e) {
            return false;
          }
          /* } */

          $("#title-tab").html(/*html*/`
          <p class="h3 p-0 m-0 mx-4 text-black">${kab_nama}</p>
          <p class="h5 py-1 m-0 mx-4 mb-3 text-black">Provinsi ${prov_nama}</p>
        `);

          tableDataSide(detailBL);
          $(".open_table").on("click", async function () {
            var opsiTabelx;
            $(this).toggleClass('opentable');
            if ($(this).hasClass('opentable')) {
              $(this).find(".material-icons").html("open_in_full");
              $(this).find(".material-text").html("Close All");
              opsiTabelx = { expand: true };
            } else {
              closeButton();
              opsiTabelx = { expand: false };
            }
            tableDataSide(detailBL, opsiTabelx);
          });

          async function tableDataSide(result, opsiTabel = { expand: false }) {
            const tData = () => {
              let data = Object.values(result.detail);
              data.sort((a, b) => a.kl_id > b.kl_id && 1 || -1)
              data.forEach((item, i) => {
                Object.values(item._children).forEach((aa) => {
                  Object.values(aa._children).forEach((bb) => {
                    Object.values(bb._children).forEach((cc) => {
                      Object.values(cc._children).forEach((dd) => {
                        //delete dd._children;
                        dd.lokasi = "";
                        if ((typeof dd.lokasi_ro !== "undefined") || (dd.lokasi_ro != null) || (dd.lokasi_ro != "")) {
                          let mmmm = Object.assign({}, dd.lokasi_ro),
                            eef = [];
                          Object.values(mmmm).forEach((ee) => {
                            eef.push(ee.nama_lokus)
                          });
                          dd.lokasi = eef.join(",");
                        }
                      })
                    })
                  })
                });
                item.id = i + 1;
              });
              return data;
            }
            console.log(tData());
            const table = new Tabulator("#default-pop-1", {
              height: "515px",
              data: tData(),
              index: "id",
              /* rowHeight: 60, */
              layout: "fitDataStretch", //fitDataFill, fitData, fitDataTable, fitColumns, fitDataStretch
              columnHeaderVertAlign: "middle",
              dataTree: true,
              dataTreeStartExpanded: opsiTabel.expand,
              dataTreeFilter: true,
              dataTreeElementColumn: "name",
              dataTreeChildColumnCalcs: false, //include child rows in column calculations
              dataTreeSelectPropagate: true,
              dataLoader: false, //disable remote loader
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
                  vertAlign: "middle",
                  field: "name", sorter: "string", width: 450, responsive: 0,
                  variableHeight: true,
                  formatter: function (cell, formatterParams) {
                    let
                      hasil,
                      value = cell.getValue(),
                      ncode = "";
                    if (cell._cell.row.data.posisi === 'KL') {
                      ncode = '<span class="badge rounded-pill py-1 bg-orange-600">K/L</span>';
                      hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>`;
                    } else if (cell._cell.row.data.posisi === 'Program') {
                      ncode = '<span class="badge rounded-pill py-1 bg-cyan-600">Program</span>';
                      hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
                    } else if (cell._cell.row.data.posisi === 'Kegiatan') {
                      ncode = '<span class="badge rounded-pill py-1 bg-green-600">Kegiatan</span>';
                      hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
                    } else if (cell._cell.row.data.posisi === 'KRO') {
                      ncode = '<span class="badge rounded-pill bg-warning py-1 bg-lime-600">KRO</span>';
                      hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
                    } else if (cell._cell.row.data.posisi === 'RO') {
                      ncode = '<span class="badge rounded-pill py-1 bg-purple-600">RO</span>';
                      hasil = /*html*/`
                      <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
                        </div>
                    `;
                    } else {
                      // cell.getElement().style.whiteSpace = "pre-wrap";
                      ncode = '<span class="badge rounded-pill bg-yellow-600 py-1">Komponen</span>';
                      hasil = /*html*/`
                    <div class="container">
                      <div class="row">
                        <div class="col d-flex flex-row bd-highlight">
                          <div class="bd-highlight "> ${ncode}</div>  
                          <div class="bd-highlight text-wrap ms-1">${value}</div>
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
                },
                {
                  title: "Alokasi Bulan Januari",
                  titleDownload: "Alokasi Bulan Januari",
                  field: "alokasi_totaloutput",
                  formatter: "money",
                  width: 150,
                  formatterParams: {
                    decimal: ",",
                    thousand: ".",
                    symbol: "",
                    symbolAfter: "",
                    precision: 2, dataTreeChildColumnCalcs: true, //include child rows in column calculations
                  }, sorter: "number", headerHozAlign: "center", hozAlign: "right",
                  accessorDownload: numberIDRDownload,
                  bottomCalc: "sum", bottomCalcFormatter: "money", bottomCalcFormatterParams: {
                    decimal: ",",
                    thousand: ".",
                    symbol: "",
                    symbolAfter: "",
                    precision: 2,
                  },
                  formatter: function (cell, formatterParams) {
                    let
                      hasil,
                      value = cell.getValue();

                    return (typeof value == "undefined") ? "" : formatNumber(value * 1000);
                  }
                },
                {
                  title: "Tingkat Output",
                  titleDownload: "Tingkat Output",
                  field: "alokasi_totaloutput",
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
                  title: "Realisasi Tingkat Output",
                  titleDownload: "Realisasi Tingkat Output",
                  field: "alokasi_totaloutputx",
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
                    return "";
                  },
                  width: 167,
                  sorter: "number", headerHozAlign: "center", hozAlign: "right",
                  accessorDownload: numberIDRDownload,

                },
                {
                  title: "Realisasi Analisis Lanjutan",
                  titleDownload: "Realisasi Analisis Lanjutan",
                  field: "alokasi_totaloutputx",
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
                    return "";
                  },
                  width: 167,
                  sorter: "number", headerHozAlign: "center", hozAlign: "right",
                  accessorDownload: numberIDRDownload
                },
                {
                  title: "Lokasi",
                  titleDownload: "Lokasi",
                  field: "lokasi_ro",
                  hozAlign: "left",
                  width: 500,
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
                  accessorDownload: numberIDRDownload
                },
                {
                  title: "Target ",
                  titleDownload: "Target ",
                  field: "target_0",
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
          }

          let nmKL = [];
          detailBL.detail.forEach((row) => {
            let prog = [];
            row._children.forEach((a) => {
              prog.push(/*html*/`
              <li class="list-group-item py-1 px-2 text-dark">
                <div class="d-flex flex-row bd-highlight">
                  <div class="bd-highlight">
                    <i class="fa fa-capsules me-2 text-primary"></i>
                  </div>
                  <div class="bd-highlight">  
                    ${a.name}
                  </div>   
                </div>   
                <span class="badge badge-dark py-1 ps-4 text-black fs-11px" > Alokasi <b>Rp ${formatNumber(a.alokasi_totaloutput * 1000)}</b></span>
              </li>`);
            });
            nmKL.push(/*html*/`
            <ul class="list-group mt-1 border-0 fs-12px mb-2">
              <li class="list-group-item py-1 px-2 active" >
                <div class="d-flex flex-row bd-highlight">
                  <div class="bd-highlight">
                    <i class="fa fa-landmark me-2"></i>
                  </div>
                  <div class="bd-highlight">
                    ${row.name}
                  </div>   
                </div>
              </li >
              ${prog.join(" ")}  
            </ul>           
            `);
          });

          popupContent = /*html*/`       
            <span class='h6 text-white'>${kab_nama}</span>
            <span class='float-end'><button class='btn btn-primary btn-sm rounded h6 mt-2 ' id="infoBtn">Detail</button></span>
            <br/>
            <span class='fs-12px fw-600 h6 text-white'>Provinsi ${prov_nama}</span>
            <br/>
            
              ${nmKL.join(" ")}
            `;

          popup.setContent(popupContent);
          popup.update();
          buttonInfo = L.DomUtil.get('infoBtn');
          L.DomEvent.addListener(buttonInfo, 'click', function (e) {
            sidebar.isVisible() ? null : sidebar.toggle();
          });

        };
        request();
      };
      if (datax.features != null) {
        map.fitBounds(gmap_data.getBounds());
      }
    }



    /* let dataX = strukturKinerjaAnggaran(dataXC.data);
    console.log("dataX", dataX); */


    function strukturKinerjaAnggaran(data) {
      let
        groupByKL = arr_groupBy(['kementerian_kode']),
        data_perkl = groupByKL(data),
        dataA = Object.assign({}, data_perkl),
        kl = [];

      Object.keys(dataA).forEach((aa) => {  //kl
        let
          dataA1 = Object.assign({}, dataA[aa]),
          v_realisasi_ro = sumObject(Object.values(dataA1), "realisasi_ro"),
          v_alokasi_0 = sumObject(Object.values(dataA1), "alokasi_0"),
          jml_programA = 0,
          jml_kegiatanA = 0,
          jml_kroA = 0,
          jml_roA = 0,
          groupByProg = arr_groupBy(['program_kode']),
          data_perprog = groupByProg(Object.values(dataA1)),
          dataB = Object.assign({}, data_perprog),
          prog = [];

        Object.keys(dataB).forEach((bb) => {    //prog
          jml_programA += 1;

          let
            dataB1 = Object.assign({}, dataB[bb]),
            v_realisasi_ro = sumObject(Object.values(dataB1), "realisasi_ro"),
            v_alokasi_0 = sumObject(Object.values(dataB1), "alokasi_0"),
            jml_kegiatanB = 0,
            jml_kroB = 0,
            jml_roB = 0,
            groupByKeg = arr_groupBy(['kegiatan_kode']),
            data_perkeg = groupByKeg(Object.values(dataB1)),
            dataC = Object.assign({}, data_perkeg),
            keg = [];

          /*Start kegiatan*/
          Object.keys(dataC).forEach((cc) => {    //kegiatan
            jml_kegiatanB += 1;

            let
              dataC1 = Object.assign({}, dataC[cc]),
              v_realisasi_ro = sumObject(Object.values(dataC1), "realisasi_ro"),
              v_alokasi_0 = sumObject(Object.values(dataC1), "alokasi_0"),
              jml_kroC = 0,
              jml_roC = 0,
              groupByKro = arr_groupBy(['output_kode']),
              data_perkro = groupByKro(Object.values(dataC1)),
              dataD = Object.assign({}, data_perkro),
              kro = [];

            /*Start KRO*/
            Object.keys(dataD).forEach((dd) => {    //KRO
              jml_kroC += 1;

              let
                dataD1 = Object.assign({}, dataD[dd]),
                v_realisasi_ro = sumObject(Object.values(dataD1), "realisasi_ro"),
                v_alokasi_0 = sumObject(Object.values(dataD1), "alokasi_0"),
                jml_roD = 0,
                groupByRo = arr_groupBy(['suboutput_kode']),
                data_perRo = groupByRo(Object.values(dataD1)),
                dataE = Object.assign({}, data_perRo),
                ro = [];

              /*Start RO*/
              Object.keys(dataE).forEach((dd) => {    //RO
                jml_roD += 1;
                let
                  dataE1 = Object.assign({}, dataE[dd]),
                  v_realisasi_ro = sumObject(Object.values(dataE1), "realisasi_ro"),
                  v_alokasi_0 = sumObject(Object.values(dataE1), "alokasi_0"),
                  jml_komp = 0,
                  groupByKomp = arr_groupBy(['komponen_kode']),
                  data_perKomp = groupByKomp(Object.values(dataE1)),
                  dataF = Object.assign({}, data_perKomp),
                  komponen = [];

                /*Start Komponen if ready*/
                Object.keys(dataF).forEach((dd) => {
                  jml_komp += 1;

                  let
                    dataF1 = Object.assign({}, dataF[dd]),
                    v_realisasi_ro = sumObject(Object.values(dataF1), "realisasi_ro"),
                    v_alokasi_0 = sumObject(Object.values(dataF1), "alokasi_0"),
                    jml_roE = 0
                    ;

                  komponen.push({
                    komponen_jenis: dataF1[0].jenis_komponen,
                    indikator_pbj: dataF1[0].indikator_pbj,
                    target_0: dataF1[0].target_0,
                    satuan: dataF1[0].satuan,
                    indikator_komponen: dataF1[0].indikator_komponen,
                    sumber_dana: dataF1[0].sumber_dana_ids,

                    attrs: dataF1[0].attrs,
                    tahun: dataF1[0].tahun,
                    kro_id: dataF1[0].output_kode,
                    jml_kro: null,
                    jml_ro: null,
                    jml_program: null,
                    jml_kegiatan: null,
                    kegiatan_id: dataF1[0].kegiatan_kode,
                    program_id: dataF1[0].program_kode,
                    komponen_id: dataF1[0].komponen_kode,
                    name: dataF1[0].komponen_nama,
                    tahun: dataF1[0].tahun,
                    kl_id: dataF1[0].kementerian_kode,
                    alokasi_totaloutput: v_alokasi_0,
                    alokasi_realisasi: v_realisasi_ro,
                    keterangan: "",
                    posisi: "komponen"
                  });

                });
                /*End Komponen*/

                ro.push({
                  tahun: dataE1[0].tahun,
                  kl_id: dataE1[0].kementerian_kode,
                  program_id: dataE1[0].program_kode,
                  kro_id: dataE1[0].output_kode,
                  kegiatan_id: dataE1[0].kegiatan_kode,
                  ro_id: dataE1[0].suboutput_kode,
                  name: dataE1[0].suboutput_nama,
                  jml_program: null,
                  jml_kegiatan: null,
                  jml_kro: null,
                  jml_ro: null,
                  jml_komponen: jml_komp,
                  alokasi_totaloutput: v_alokasi_0,
                  alokasi_realisasi: v_realisasi_ro,
                  lokasi_ro: null,
                  keterangan: "",
                  posisi: "RO",
                  _children: komponen
                });
              });
              /*End RO*/

              kro.push({
                tahun: dataD1[0].tahun,
                name: dataD1[0].kegiatan_nama,
                kl_id: dataD1[0].kementerian_kode,
                program_id: dataD1[0].program_kode,
                kegiatan_id: dataD1[0].kegiatan_kode,
                kro_id: dataD1[0].output_kode,
                jml_program: null,
                jml_kegiatan: null,
                jml_kro: null,
                jml_ro: jml_roD,
                alokasi_totaloutput: v_alokasi_0,
                alokasi_realisasi: v_realisasi_ro,
                keterangan: "",
                posisi: "KRO",
                _children: ro
              });
              jml_roC += jml_roD;
            });
            /*End KRO*/

            keg.push({
              tahun: dataC1[0].tahun,
              kl_id: dataC1[0].kementerian_kode,
              kegiatan_id: dataC1[0].kegiatan_kode,
              program_id: dataC1[0].program_kode,
              name: dataC1[0].kegiatan_nama,
              jml_program: null,
              jml_kegiatan: null,
              jml_kro: jml_kroC,
              jml_ro: jml_roC,
              alokasi_totaloutput: v_alokasi_0,
              alokasi_realisasi: v_realisasi_ro,
              keterangan: "",
              posisi: "Kegiatan",
              _children: kro
            });
            jml_roB += jml_roC;
            jml_kroB += jml_kroC;
          });
          /*End kegiatan*/

          prog.push({
            program_id: dataB1[0].program_kode,
            name: dataB1[0].program_nama,
            jml_program: null,
            jml_kegiatan: jml_kegiatanB,
            jml_kro: jml_kroB,
            jml_ro: jml_roB,
            tahun: dataB1[0].tahun,
            kl_id: dataB1[0].kementerian_kode,
            alokasi_totaloutput: v_alokasi_0,
            alokasi_realisasi: v_realisasi_ro,
            keterangan: "",
            posisi: "Program",
            _children: keg
          });
          jml_roA += jml_roB;
          jml_kroA += jml_kroB;
        });
        /*End Program*/

        kl.push({
          tahun: dataA1[0]['tahun'],
          kl_id: dataA1[0]['kementerian_kode'],
          name: dataA1[0]['kementerian_nama'],
          name_short: dataA1[0]['kementerian_nama_alias'],
          alokasi_totaloutput: v_alokasi_0,
          alokasi_realisasi: v_realisasi_ro,
          keterangan: "",
          posisi: "KL",
          jml_program: jml_programA,
          jml_kegiatan: jml_kegiatanA,
          jml_kro: jml_kroA,
          jml_ro: jml_roA,
          _children: prog
          /* id:i + 1, */
        })

      });
      return kl;
    }


    document.getElementById('popUp').innerHTML = popUp;
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    });
    $(".leaflet-popup-content").removeAttr("style").attr("style", "width:10em");
  }
};
export default KinerjaAnggaran;