import WidgetCard from '../components/WidgetCard.js';
import { ApiTahunDAK, ApiDataByTahun, apiAnggaranDak, ApiDakPeta } from '../../services/api.js';

const DAK = {
  /**
   * Render the page content.
   */
  render: async () => {

    const widgetCard1 = await WidgetCard.render('tile-1', 'Total Anggaran', 'transparent', 'lg-3 ');
    const widgetCard2 = await WidgetCard.render('tile-2', 'Top 5 Provinsi & Kota/ Kab', 'white-100', 'lg-6 ');
    const widgetCard4 = await WidgetCard.render('tile-4', '3 Tahun Terakhir', 'light-100', 'lg-3');

    return /*html*/ `
    <div class="app-content-padding flex-grow-1 overflow-auto" data-height="100%" >
				<!-- BEGIN page-header -->
				<h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">real_estate_agent</i>Dana Alokasi Khusus Fisik</h2>
				<!-- END page-header -->
        <!-- begin widget-card -->        
        <div id="fbody">
          <div class="row card-deck">
            ${widgetCard1}
            ${widgetCard2}
            ${widgetCard4}
          </div>
        <!-- end widget-card -->        
        <!-- begin widget-map -->
          <div class="border rounded mt-4 p-2">
            <div class="row pt-2">
              <div class="col-sm-12 col-xl-7 col-lg-8">
                <div class="mb-3 ps-2 fs-13px">
                  <b>SEBARAN ALOKASI ANGGARAN DAK FISIK</b>
                  <span class="ms-2 text-muted">
                    <i class="fa fa-info-circle" data-bs-toggle="popover" data-bs-trigger="hover"
                      data-bs-title="Sebaran Alokasi Anggaran DAK Fisik" data-bs-placement="top"
                      data-bs-content="Sebaran Alokasi Anggaran DAK Fisik." data-original-title="" title="">
                      </i>
                  </span>
                </div>
              </div>
              <div class="col-sm-2 col-xl-1">
                <div class="form-group mt-n2">
                  <select class="selectpicker" id="tahun-group" title="Tahun" data-style="btn-white" data-selected-text-format="count > 2" data-actions-box="true"  
                    data-selected-text-format="count > 2" data-width='100%' data-actions-box="false">
                    <option value="2021" selected>2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-10 col-xl-4">
                <div class="form-group mt-n2 ms-n1 me-2">
                  <select class="selectpicker" id="bidang-group" title="Bidang Kegiatan"
                    data-style="btn-white" data-selected-text-format="count > 2" data-width='100%' data-multiple-separator=' ' data-select-all-text='Semua' data-deselect-all-text='Reset' data-actions-box="true" multiple
                    data-selected-text-format="count > 2" data-actions-box="true" multiple>
                    <option data-icon="text-yellow fa fa-circle" value="Kesehatan dan KB" selected>Kesehatan dan KB</option>
                    <option data-icon="text-primary fa fa-circle" value="Air Minum" selected>Air Minum</option>
                    <option data-icon="text-success fa fa-circle" value="Sanitasi">Sanitasi</option>
                    <option data-icon="text-warning fa fa-circle" value="Lingkungan Hidup dan Kehutanan">Lingkungan Hidup dan Kehutanan</option>
                  </select>
                </div>
              </div>
            </div>          
            <div class="row px-3">
              <div  id="map-dak" class="col-xl-12 col-12" ></div>
            </div>            
          </div>
          <div class="row my-3">
            <div class="col-xl-6 col-6 " >
              <div class="card" >
                <div class="card-body me-1">
                  <div class="mb-2 fs-13px">
                    <b>BIDANG</b>
                    <span class="ms-2 text-muted">
                      <i class="fa fa-info-circle" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title="Pemetaan Berdasarkan Bidang" data-bs-placement="top" data-bs-content="Menampilkan data alokasi berdasarkan Bidang DAK." data-bs-original-title="" title=""></i>
                    </span>
                  </div>
                  <div id="chart-bidang" class="mb-2" style="height: 200px"></div>
                </div>
              </div>
            </div>
            <div class="col-xl-6 col-6" >
              <div class=" card" >
                <div class="card-body ms-1">
                  <div class="mb-2 fs-13px">
                    <b>REALISASI BERDASARKAN TAHUN</b>
                    <span class="ms-2 text-muted">
                      <i class="fa fa-info-circle" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title="Realisasi berdasarkan tahun" data-bs-placement="top" data-bs-content="Menampilkan data realisasi DAK berdasarkan tahun." data-bs-original-title="" title=""></i>
                    </span>
                  </div>
                  <div id="chart-realisasi" class="mb-2" style="height: 200px"></div>
                </div>
              </div>               
            </div>               
          </div>
          <div class="card">
            <div class="card-body">
              <div class="row pt-3 mx-0 mb-3 py-3 bg-gray-300 rounded" id="drp_option">
                <div class="col-xl-3 ">
                  <div class="form-group sel_tax">                  
                    <select id="sel_ta" name="sel_ta" class="form-control selectpicker" data-title="Pilih Tahun" data-actions-box="true" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset">
                    </select>                    
                  </div>
                </div>
                <div class="col-xl-9">
                  <div class="form-group sel_tp">
                    <select id="sel_tp" name="sel_tp" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Tingkat Pelaksanaan" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Tingkat Pelaksanaan dipilih">
                    </select>
                  </div>
                </div>
                <div class="col-xl-3 hide">
                  <div class="form-group sel_provinsi">                  
                    <select id="sel_provinsi" name="sel_provinsi" class="form-control selectpicker" data-live-search="true" data-title="Pilih Intervensi" data-show-subtext="true" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Provinsi dipilih">
                    </select>                  
                  </div>
                </div>
                <div class="col-xl-3 hide">
                  <div class="form-group sel_pemda">                  
                    <select id="sel_pemda" name="sel_pemda" class="form-control selectpicker" data-live-search="true" data-title="Pilih Intervensi" data-show-subtext="true" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Pemda dipilih">
                    </select>
                  </div>
                </div>                
                <!-- <div class="col-xl-1 ">
                    <div class="form-group pull-right width-full">              
                      <div class="menu-icon btn btn-primary m-0 p-0 px-2" data-bs-toggle="modal" data-bs-target="#chartModal" >
                        <i class="material-icons fs-29px">bar_chart</i>
                      </div>
                    </div>
                </div> -->
              </div>
              <div class="d-flex justify-content-between bd-highlight" style="height: 2em;">
                <div class="bd-highlight cursor-pointer open_table" style="width: 6%;">
                    <div class="fs-12px fw-600 position-relative ">                  
                      <i class="material-icons fs-15px text-green-400">close_fullscreen</i> 
                      <span class="position-absolute top-50 start-5 translate-middle-y ps-1 material-text">Open All</span>
                    </div>
                  </div>
                <div class="bd-highlight mt-n1 fs-11px fw-600">
                  <div class="d-flex flex-row hide" id="provkab">
                    <div class="form-check-inline bd-highlight ps-1 me-1">Filter By :</div>
                    <div class="form-group bd-highlight">                  
                      <select id="provkabG" name="provkab" class="form-control selectpicker" data-title="Pilih Intervensi" data-show-subtext="true" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Pemda dipilih">
                        <option value="Provinsi" selected="selected"> Provinsi </option>
                        <option value="Kota/ Kabupaten" selected="selected"> Kota/Kabupaten </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between bd-highlight">

                  

                  <div class="bd-highlight">
                    <div class="d-flex flex-row bd-highlight flex-row-reverse fw-600 text-gray-700 my-2 mt-n1 fs-11px">
                      
                      <div class="bd-highlight">
                        <i class="fas fa-lg fa-fw fa-file-pdf p-0 m-0 cursor-pointer fs-15px text-red-400" title="export pdf" id="download-pdf-dak"></i>
                      </div>  
                      <div class="bd-highlight">
                        <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer fs-15px text-green-400" title="export xls" id="download-xlsx-dak"></i>
                      </div>    
                      <div class="bd-highlight">
                        <div class="fs-12px fw-700">Download : </div>
                      </div>        
                    </div>
                  </div>
                </div>
              </div>
              <div id="dak-table" class="rounded-bottom"></div>  
            </div>        
          </div>
        </div>
      </div>
    </div>`;
  },
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */

  after_render: async () => {

    const
      tile1 = document.getElementById('tile-1'),
      tile2 = document.getElementById('tile-2'),
      tile3 = document.getElementById('tile-3'),
      tile4 = document.getElementById('tile-4');
    mData.dataDak = (typeof mData.dataDak === "undefined") ? await apiAnggaranDak() : mData.dataDak;
    mData.tahunDAK = (typeof mData.tahunDAK === "undefined") ? await ApiTahunDAK() : mData.tahunDAK;
    mData.dataByTahun = (typeof mData.dataByTahun === "undefined") ? await ApiDataByTahun() : mData.dataByTahun;
    mData.DakPeta = (typeof mData.DakPeta === "undefined") ? await ApiDakPeta() : mData.DakPeta;

    let
      currentYear = 2021,
      thID = document.getElementById('sel_ta'),
      tpID = document.getElementById('sel_tp'),
      pemdaID = document.getElementById('sel_pemda'),
      provID = document.getElementById('sel_provinsi'),
      dTahun = [],
      dTp = [],
      dPemda = [],
      dProv = [],
      ftingkat_pelaksanaan = 6,
      fpemda = 11,
      fprovinsi = 12,
      ftahun = 0,
      fbidang = 1,
      fsubbidang = 2,
      fkegiatan = 4,
      falokasi = 10,
      fvolumn = 7,
      fsatuan = 8,
      fkementerian = 3,
      fnilai = 9,
      fjenis = 5,
      fkewenangan = 13,
      frincian = 14 /*belum ada*/
      ;

    if (typeof mData.GrpBidang === "undefined") {
      let
        byBidang = arr_groupBy([fbidang]);
      mData.GrpBidang = byBidang(mData.dataDak);
    }
    if (typeof mData.filterBidang === "undefined") {
      mData.filterBidang = Object.keys(mData.GrpBidang);
    }

    async function getDataByTingpel(currentYearx) {
      new FormData().append("tahun[]", currentYearx);
      try {
        let res = await fetch(config.api_url + '/dak/data-by-bidang', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": [currentYearx]
          }),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        $("#chart-bidang").parent().find("b").html("Bidang Tahun " + currentYearx + "");
        return _res.data;
      } catch (e) {
        return false;
      }
    }

    if (typeof mData.DataByTingpel === "undefined") {
      let data;
      await getDataByTingpel(currentYear).then(function (a) {
        data = a;
      });
      mData.DataByTingpel = data;
    }
    $("#chart-bidang").parent().find("b").html("Bidang Tahun " + currentYear + "");
    chartBar(mData.DataByTingpel);

    $("#tahun-group").on("change", async function () {
      let xy, val = $(this).val();
      await getDataByTingpel(val).then(function (a) {
        xy = a;
      });
      mData.DataByTingpel = xy;
      return chartBar(mData.DataByTingpel);
    });

    /*--------------------------------------------------------------------------------------*/
    function chartBar(dataX) {
      let a = dataX,
        chart = am4core.create("chart-bidang", am4charts.PieChart),
        dChart = [];

      a.forEach((val) => {
        dChart.push({
          "bidang_kode": val.bidang_kode,
          "bidang_nama": val.bidang_nama,
          "grand_total": parseFloat((val.grand_total / 1000000000000).toFixed(2)),
        });
      });

      chart.data = dChart;
      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "grand_total";
      pieSeries.dataFields.category = "bidang_nama";


      // Let's cut a hole in our Pie chart the size of 40% the radius
      chart.innerRadius = am4core.percent(40);

      // Disable ticks and labels
      pieSeries.labels.template.disabled = true;
      pieSeries.labels.template.maxWidth = 130;
      pieSeries.labels.template.wrap = true;
      pieSeries.ticks.template.disabled = true;
      // Disable tooltips
      pieSeries.slices.template.tooltipText = "{category}: {value.value}T";
      pieSeries.colors.list = [
        am4core.color("#eb72a2"),
        am4core.color("#44b5de"),
        am4core.color("#845EC2"),
        am4core.color("#2eb6ac"),
        am4core.color("#D65DB1"),
        am4core.color("#FF6F91"),
        am4core.color("#FF9671"),
        am4core.color("#FFC75F"),
        am4core.color("#F9F871"),
      ];

      // Add a legend
      chart.legend = new am4charts.Legend();
      chart.fontSize = 12;
      chart.legend.position = 'right'
      //chart.legend.oversizedBehavior = "wrap"
      // Enable export


      exportAmchart4(chart);
    }
    /*--------------------------------------------------------------------------------------*/


    /*--------------------------------------------------------------------------------------*/
    let z = mData.dataByTahun;
    am4core.ready(function () {
      // Themes begin
      am4core.useTheme(am4themes_animated);
      // Themes end
      var chart = am4core.create('chart-realisasi', am4charts.XYChart)
      //chart.colors.step = 5;
      chart.legend = new am4charts.Legend()
      chart.legend.position = 'bottom'
      chart.legend.paddingBottom = 0
      chart.legend.labels.template.maxWidth = 10
      chart.fontSize = 12;
      //xAxis.renderer.minGridDistance = 50;

      var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      xAxis.dataFields.category = 'tahun'
      xAxis.renderer.cellStartLocation = 0.1
      xAxis.renderer.cellEndLocation = 0.9
      xAxis.renderer.grid.template.location = 0;
      xAxis.renderer.minGridDistance = 50;

      var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.min = 0;
      function createSeries(name, value) {
        var series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value;
        //series.dataFields.categoryX = 'category'
        series.dataFields.categoryX = 'tahun';
        //series.dataFields.width = 10;
        series.name = name;
        series.tooltipText = "{name}: [bold]{valueY}T[/]";
        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        return series;
      }

      let dChart = [];
      z.chart_data.forEach((val) => {
        //console.log("val", val);
        dChart.push({
          "nilai_rk": parseFloat((val.nilai_rk / 1000000000000).toFixed(2)),
          "realisasi": parseFloat((val.realisasi / 1000000000000).toFixed(2)),
          "tahun": val.tahun
        });
      });

      chart.data = dChart;
      createSeries("Alokasi", "nilai_rk");
      createSeries("Realisasi", "realisasi");

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
      chart.adapter.add("tooltipText", function (text, ev) {
        if (!ev.dataItem.dataContext.value) {
          return "{name}: No value";
        }
        return text;
      });


      chart.cursor = new am4charts.XYCursor();
      exportAmchart4(chart);
      //  chart.scrollbarX = new am4core.Scrollbar();
    }); // end am4core.ready()
    /*--------------------------------------------------------------------------------------*/

    currentYear = Math.max(...mData.tahunDAK);
    if (typeof mData.PageData === "undefined") {
      async function getPageData() {
        var formdata = new FormData();
        formdata.append("tahun[]", currentYear);
        try {
          let res = await fetch(config.api_url + '/dak/one-page', {
            method: 'POST',
            body: JSON.stringify({ "tahun": [currentYear] }),
            headers: config.fetchHeaders,
          });
          let _res = await res.json();
          return _res.data;
        } catch (e) {
          return false;
        }
      };
      let datax;
      await getPageData().then(function (x) {
        datax = x;
      });
      mData.PageData = datax;
    }
    /*--------------------------------------------------------------------------------------*/

    let x = mData.PageData;
    mData.dak_total_anggaran = x.total_dak;
    mData.dak_total_anggaran_before = x.total_dak_before;
    mData.dak_selisih = x.total_dak - x.total_dak_before;
    mData.dak_selisih_persen = ((x.total_dak - x.total_dak_before) / x.total_dak_before) * 100;

    tile1.innerHTML = /*html*/ `
      <p id="dak-total-anggaran" class="h2 mb-0 text-green" 
        data-bs-toggle="popover" data-bs-trigger="hover" data-bs-placement="left" 
        data-bs-content="${parseFloat((mData.dak_total_anggaran / 1).toFixed(0)).toLocaleString('id-ID')}"> 
        ${parseFloat((mData.dak_total_anggaran / 1000000000000).toFixed(2)).toLocaleString('id-ID')} T
      </p>
      <p id="dak-total-anggaran-before" class="fs-13px mb-0 text-gray-700">
        <span class="text-${mData.dak_selisih > 0 ? "success" : "danger"} fs-bold">
          <i class="fa fa-caret-${mData.dak_selisih > 0 ? "up" : "down"}"></i>
          <b> ${parseFloat(mData.dak_selisih_persen.toFixed(2)).toLocaleString('id-ID')}%</b>
        </span> 
        dari tahun sebelumnya <span class="fw-bold" data-bs-toggle="popover" data-bs-trigger="hover" 
          data-bs-placement="top" data-bs-content="${parseFloat((mData.dak_total_anggaran_before / 1).toFixed(0)).toLocaleString('id-ID')}"> 
          ${parseFloat((mData.dak_total_anggaran_before / 1000000000000).toFixed(2)).toLocaleString('id-ID')} T</span>
      </p>
      <hr class="my-3"/>
      <div class="row text-truncate">
        <!-- BEGIN col-6 -->
        <div class="col-6">
          <div class="fs-12px">Tingkat Provinsi</div>
          <div id="tile-1-tingpel-prov" class="h6 mb-2px fw-bold text-primary" ><i class="fas fa-circle-notch fa-spin"></i></div>
          <div class="progress h-5px rounded-3 mt-2 mb-0">
            <div class="progress-bar progress-bar-striped rounded-right " data-animation="width" data-value="100%" style="width: 100%"></div>
          </div>
        </div>
        <!-- END col-6 -->
        <!-- BEGIN col-6 -->
        <div class="col-6">
          <div class="fs-12px">Tingkat Kab/Kota</div>
          <div id="tile-1-tingpel-kot" class="h6 mb-2px fw-bold text-warning"><span><i class="fas fa-circle-notch fa-spin"></i></span></div>
          <div class="progress h-5px rounded-3 mt-2 mb-0">
            <div class="progress-bar progress-bar-striped rounded-right bg-orange" data-animation="width" data-value="100%" style="width: 100%"></div>
          </div>
        </div>
        <!-- END col-6 -->
      </div>`;
    $('#tile-1-tingpel-prov').html(parseFloat((x.tingpel[0]['grand_total'] / 1000000000000).toFixed(2)).toLocaleString('id-ID') + ' T <span class="fw-600 fs-9px">(' + (parseFloat(x.tingpel[0]['grand_total']) / parseFloat(x.total_dak) * 100).toLocaleString('id-ID') + '%)</span>')
    $('#tile-1-tingpel-kot').html(parseFloat((x.tingpel[1]['grand_total'] / 1000000000000).toFixed(2)).toLocaleString('id-ID') + ' T <span  class="fw-600 fs-9px">(' + (parseFloat(x.tingpel[1]['grand_total']) / parseFloat(x.total_dak) * 100).toLocaleString('id-ID') + '%)</span>')

    tile2.innerHTML = /*html*/ `
      <div class="row">
        <div class="col">
          <p class="h4 mb-5px text-black-transparent-7"><span id="total-prov" class="h2 text-blue"></span> Provinsi</p>
          <div id="top-5-prov" class="fs-13px mt-3"></div>
        </div>
        <div class="col">
          <p class="h4 mb-5px text-black-transparent-7"><span id="total-pemda" class="h2 text-orange"></span> Kota/Kab</p>
          <div id="top-5-pemda" class="fs-13px mt-3"></div>
        </div>
      </div>`;

    /* tile3.innerHTML = `
      <div class="d-flex align-items-center mb-1">
        <h4 class="mb-0"><span id="total-kl" class="h2 text-green-600"><i class="fas fa-circle-notch fa-spin"></i></span> K/L</h4>
      </div>
      <div class="mb-1 fs-14px text-gray-700">
        Total keseluruhan K/L
      </div>
      <div id="top-3-kl" class="fs-14px"></div>
    `; */

    tile4.innerHTML = /*html*/ `
      <div class="d-flex align-items-center mb-1">
        <h3 class="mb-0"><span id="tahun-total" class="text-green-600"><i class="fas fa-circle-notch fa-spin"></i></span></h4>
        <div class="ms-auto">
          <div id="store-session-sparkline"></div>
        </div>
      </div>
      <div class="mb-3">
      </div>
      <div class="d-flex mb-2">        
      </div>
      <div id="tahun-list" class="fs-13px"></div>`;

    $('#total-kl').html(x.kl_only.length);

    let html1 = '';
    x.data_kl.forEach(function (kl, i) {
      html1 += '<div class="d-flex py-1 mb-0 border-top">' +
        '<div class="d-flex align-items-center">' +
        '<i class="fa fa-circle text-red fs-8px me-2"></i>' +
        kl.kementerian_nama +
        '</div>' +
        '<div class="d-flex align-items-center ms-auto">' +
        '<div class="w-120px text-end ps-12 text-gray-700 fw-bold"><span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title="' + kl.kementerian_nama + '" data-bs-placement="top" data-bs-content="' + (kl.grand_total).toLocaleString('id-ID') + '">' + (kl.grand_total / 1000000000).toLocaleString('id-ID') + ' M</span></div>' +
        '</div>' +
        '</div>';
      $("#top-3-kl").html(html1);
    });
    $('#total-prov').html(x.prov_count_all);
    $('#total-pemda').html(x.pemda_count_all);

    let html2 = '';
    x.top_5_prov.forEach(function (prov, i) {
      html2 += '<div class="d-flex border-top">' +
        '<div class="d-flex align-items-center align-middle">' +
        '<i class="fa fa-circle text-blue fs-8px me-2"></i>' +
        prov.prov_nama +
        '</div>' +
        '<div class="d-flex align-items-center ms-auto">' +
        '<div class="w-120px text-end ps-12 fw-500"><span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title="' + prov.prov_nama + '" data-bs-placement="top" data-bs-content="' + (prov.grand_total).toLocaleString('id-ID') + '">' + (prov.grand_total / 1000000000).toLocaleString('id-ID') + ' M</span></div>' +
        '</div>' +
        '</div>';
      $("#top-5-prov").html(html2);
    });

    let html3 = '';
    x.top_5_pemda.forEach(function (pemda, i) {
      html3 += '<div class="d-flex border-top">' +
        '<div class="d-flex align-items-center">' +
        '<i class="fa fa-circle text-warning fs-8px me-2"></i>' +
        pemda.pemda_nama +
        '</div>' +
        '<div class="d-flex align-items-center ms-auto">' +
        '<div class="w-120px text-end ps-12 fw-500"><span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title="' + pemda.pemda_nama + '" data-bs-placement="top" data-bs-content="' + (pemda.grand_total).toLocaleString('id-ID') + '">' + (pemda.grand_total / 1000000000).toLocaleString('id-ID') + ' M</span></div>' +
        '</div>' +
        '</div>';
      $("#top-5-pemda").html(html3);
    });

    let html4 = '';
    var totalAllTahun = 0;
    x.data_3_tahun.forEach(function (objTahun, i) {
      var selisih = "";
      if (objTahun.seilsih_before != null) {
        selisih = '<div class="fs-12px mx-3 ' + ((objTahun.seilsih_before > 0) ? 'text-success' : 'text-danger') + '"><i class="fa ' + ((objTahun.seilsih_before > 0) ? 'fa-caret-up' : 'fa-caret-down') + '"></i> <span data-animation="number" data-value="' + objTahun.seilsih_before + '">' + parseFloat(objTahun.seilsih_before.toFixed(2)).toLocaleString('id-ID') + '</span>%</div>';
      }
      html4 += '<div class="d-flex mb-2">' +
        '<div class="d-flex align-items-center">' +
        '<i class="fa fa-circle text-red fs-8px me-2"></i>' +
        objTahun.tahun +
        '</div>' +
        '<div class="d-flex align-items-center ms-auto">' +
        selisih +
        '<div class="w-120px text-end ps-12 fw-bold text-gray-700"><span data-bs-toggle="popover" style="cursor:pointer" data-bs-trigger="hover" data-bs-title="' + objTahun.tahun + '" data-bs-placement="top" data-bs-content="' + (objTahun.grand_total).toLocaleString('id-ID') + '">' + parseFloat((objTahun.grand_total / 1000000000000).toFixed(2)).toLocaleString('id-ID') + ' T</span></div>' +
        '</div>' +
        '</div>';
      $("#tahun-list").html(html4);
      totalAllTahun += objTahun.grand_total;
    });

    $('#tahun-total').html(parseFloat((totalAllTahun / 1000000000000).toFixed(2)).toLocaleString('id-ID') + " T");
    $('[data-bs-toggle=popover]').popover();
    /*--------------------------------------------------------------------------------------*/

    /*--------------------------------------------------------------------------------------*/
    let thn = mData.dataByTahun;
    thn.chart_data.forEach((item) => {
      dTahun.push(
        `<option value="${item.tahun}" ${item.tahun == currentYear ? "selected='selected'" : ""} >${item.tahun}</option>`
      );
    });
    thID.innerHTML = dTahun.join(" ");

    mData.PageData.tingpel.forEach((item) => {
      dTp.push(`<option value="${item.tingkat_pelaksanaan}" selected="selected" >${item.tingkat_pelaksanaan}</option>`);
    });
    tpID.innerHTML = dTp.join(" ");
    mData.PageData.pemda.forEach((item) => {
      dPemda.push(`<option value="${item.pemda_kode + "-" + item.pemda_nama}" selected="selected" >${item.pemda_kode + "-" + item.pemda_nama}</option>`);
    });
    pemdaID.innerHTML = dPemda.join(" ");

    mData.PageData.provinsi.forEach((item) => {
      dProv.push(`<option value="${item.prov_kode + "-" + item.prov_nama}" selected="selected" >${item.prov_kode + "-" + item.prov_nama}</option>`);
    });
    provID.innerHTML = dProv.join(" ");

    /* select filter */
    $("#provkabG").on("change", async function () {
      let
        provkab = $(this).val(),
        kf = [];

      mData.dataDakHistory.filter(async function (ef) {
        if (
          provkab.includes(ef[ftingkat_pelaksanaan].trim())
          && !(["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(ef[fsubbidang].trim()))
          && !(["All"].includes(ef[fkewenangan]))
        ) {
          kf.push(ef);
        }
      });
      dataTableDAK(kf);
    });

    $("#sel_tp").on("change", async function () {
      let kat = $(this).val();
      if (kat.includes("Provinsi") && (kat.length === 1)) {
        $("#sel_tp").parent().parent().parent().removeClass("col-xl-9").addClass("col-xl-3");
        $("#sel_provinsi,#sel_pemda").parent().parent().parent().removeClass("hide");
      } else if (kat.includes("Kota/ Kabupaten") && (kat.length === 1)) {
        $("#sel_tp").parent().parent().parent().removeClass("col-xl-9").addClass("col-xl-3");
        $("#sel_provinsi").parent().parent().parent().addClass("hide");
        $("#sel_pemda").parent().parent().parent().removeClass("hide");
        $("#sel_pemda").parent().parent().parent().removeClass("col-xl-3").addClass("col-xl-6");
      } else if (kat.length === 2) {
        $("#sel_tp").parent().parent().parent().removeClass("col-xl-3").addClass("col-xl-9");
        $("#sel_provinsi,#sel_pemda").parent().parent().parent().addClass("hide");
        $("#sel_provinsi,#sel_pemda").parent().parent().parent().removeClass("col-xl-6").addClass("col-xl-3");
      } else {
        $("#sel_tp").parent().parent().parent().removeClass("col-xl-3").addClass("col-xl-9");
        $("#sel_provinsi,#sel_pemda").parent().parent().parent().addClass("hide");
        $("#sel_provinsi,#sel_pemda").parent().parent().parent().removeClass("col-xl-6").addClass("col-xl-3");
      }
    });

    $("#sel_provinsi").on("change", async function () {
      $("#provkabG").find("option").attr("selected", "selected");

      let
        ta = $("#sel_ta").val(),
        prv = $(this).val(),
        e = [],
        f = [],
        g = [];

      pemdaID.innerHTML = "";
      mData.PageData.pemda.forEach((item) => {
        if (
          (prv.includes(item.provinsi))
        ) {
          e.push(`<option value="${item.pemda_kode + "-" + item.pemda_nama}" selected="selected" >${item.pemda_kode + "-" + item.pemda_nama}</option>`);
          f.push(item.pemda_kode + "-" + item.pemda_nama);
        }
      });
      pemdaID.innerHTML = e.join(" ");
      $("#sel_pemda").selectpicker('refresh');

      mData.dataDak.filter(async function (h) {
        if (
          (ta.includes(h[ftahun].trim())) &&
          (prv.includes(h[fprovinsi].trim())) &&
          !(["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(h[fsubbidang].trim())) &&
          !(["All"].includes(h[fkewenangan]))
        ) {
          g.push(h);
        }
      });
      $("#provkabG").selectpicker('selectAll');
      mData.dataDakHistory = g;
      dataTableDAK(g);
    });

    $("#sel_pemda").on("change", async function () {
      let
        ta = $("#sel_ta").val(),
        pm = $(this).val(),
        prv = $("#sel_provinsi").val(),
        h = [];

      $("#provkabG").find("option").attr("selected", "selected");

      mData.dataDak.filter(async function (j) {
        if (
          (ta.includes(j[ftahun].trim()) &&
            prv.includes(j[fprovinsi].trim())) &&
          pm.includes(j[fpemda].trim())
          && !(["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(j[fsubbidang].trim()))
          && !(["All"].includes(j[fkewenangan]))
        ) {
          h.push(j);
        }
      });
      $("#provkabG").selectpicker('selectAll');
      mData.dataDakHistory = h;
      dataTableDAK(h);
    });

    $("#sel_tp").on("change", async function () {
      let
        ta = $("#sel_ta").val(),
        tp = $("#sel_tp").val(),
        pm = $("#sel_pemda").val(),
        d = [];
      mData.dataDak.filter(async function (e) {
        if (
          (tp.length === 2)
          && (ta.includes(e[ftahun]))
          && !(["All"].includes(e[fkewenangan]))
          && !(["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(e[fsubbidang].trim()))
        ) {
          d.push(e);
        }
        else if (
          (tp.length === 1)
          && (tp.toString() === "Provinsi")
          && (ta.includes(e[ftahun].trim()))
          && !(["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(e[fsubbidang].trim()))
          && !(["All"].includes(e[fkewenangan]))
        ) {
          d.push(e);
        }
        else if (
          (tp.length === 1)
          && (tp.toString() === "Kota/ Kabupaten")
          && (ta.includes(e[ftahun].trim()))
          && (pm.includes(e[fpemda].trim()))
          && !(["All"].includes(e[fkewenangan]))
          && !(["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(e[fsubbidang].trim()))
        ) {
          d.push(e);
        }
      });

      if ((tp.toString() === "Kota/ Kabupaten") || (tp.length === 2)) {
        $("#provkab").addClass("hide");
      } else {
        $("#sel_pemda").find("option").attr("selected", "selected");
        $("#sel_pemda").selectpicker('selectAll');
        $("#provkab").removeClass("hide");
      }
      mData.dataDakHistory = d;
      dataTableDAK(d);
    });

    //console.log("ccc", mData.dataDak);
    $("#sel_ta").on("change", async function () {
      let
        ta = $(this).val(),
        ef = [];
      mData.dataDak.filter(async function (e) {
        if (
          (ta.includes(e[ftahun]))
          && !(["All"].includes(e[fkewenangan]))
          && !(["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(e[fsubbidang].trim()))
        ) {
          ef.push(e);
        };
      });
      $("#sel_tp").parent().parent().parent().removeClass("col-xl-3").addClass("col-xl-9");
      $("#sel_provinsi,#sel_pemda").parent().parent().parent().addClass("hide");
      $("#sel_provinsi,#sel_pemda").parent().parent().parent().removeClass("col-xl-6").addClass("col-xl-3");
      $("#provkab").addClass("hide");
      $("#sel_pemda,#sel_tp,#sel_provinsi,#sel_pemda").selectpicker('selectAll');
      dataTableDAK(ef);
    });

    let dy = [];
    mData.dataDak.filter(async function (e) {
      if (
        ([currentYear.toString()].includes(e[ftahun]))
        && !(["All"].includes(e[fkewenangan]))
        && !(["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(e[fsubbidang].trim()))
      ) {
        dy.push(e);
      }
    });
    dataTableDAK(dy);

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
      let
        ta = $("#sel_ta").val(),
        pm = $("#sel_pemda").val(),
        prv = $("#sel_provinsi").val(),
        h = [];
      //await getPageDataLoad($("#sel_ta").val(), $("#sel_kl").val(), $("#sel_int").val(), $("#kinerjaAnggaranSrc").val()).then(function (data) {
      //dataTableDAK(data, opsiTabelx);
      //});
      mData.dataDak.filter(async function (j) {
        if (
          (ta.includes(j[ftahun].trim()) &&
            prv.includes(j[fprovinsi].trim())) &&
          pm.includes(j[fpemda].trim())
          && !(["06-Penguatan Penurunan Angka Kematian Ibu dan Bayi"].includes(j[fsubbidang].trim()))
          && !(["All"].includes(j[fkewenangan]))
        ) {
          h.push(j);
        }
      });
      //$("#provkabG").selectpicker('selectAll');
      mData.dataDakHistory = h;
      dataTableDAK(h, opsiTabelx);

    });

    async function dataTableDAK(dx, opsiTabel = { expand: false }) {

      let
        a = [],
        i = 1,
        unique_ftahun = [...new Set(dx.map(item => item[ftahun]))],
        unique_fbidang = [...new Set(dx.map(item => item[fbidang]))],
        bid2019 = unique_fbidang.filter(bidd => bidd !== "15-Lingkungan Hidup dan Kehutanan"),
        bid2020 = unique_fbidang.filter(bidd => bidd !== "14-Lingkungan Hidup dan Kehutanan")
        ;
      var thn_unique_fbidang = unique_fbidang;

      if (unique_ftahun.toString() === "2019") {
        thn_unique_fbidang = bid2019;
      } else if (unique_ftahun.toString() === "2020") {
        thn_unique_fbidang = bid2020;
      }

      for (let bid of thn_unique_fbidang) {
        let
          aa = 0,
          bb = [];

        dx.forEach((rowa) => {
          if (
            ([bid].includes(rowa[fbidang]))
          ) {
            aa += rowa[fnilai];
            bb.push(rowa);
          }
        });

        const
          b = [],
          unique_subbid = [...new Set(bb.map(item => item[fsubbidang]))];

        for (let subbid of unique_subbid) {
          let
            aaa = 0,
            bbb = [];

          bb.forEach((rowb) => {
            if ([subbid].includes(rowb[fsubbidang])) {
              aaa += rowb[fnilai];
              bbb.push(rowb);
            }
          });

          const
            c = [],
            unique_kegiatan = [...new Set(bbb.map(item => item[fkegiatan]))];
          for (let keg of unique_kegiatan) {
            let
              aaaa = 0,
              bbbb = [];
            bbb.forEach((rowc) => {
              if ([keg].includes(rowc[fkegiatan])) {
                aaaa += rowc[fnilai];
                bbbb.push(rowc);
              }
            });
            const
              e = [],
              unique_rincian = [...new Set(bbbb.map(item => item[frincian]))];
            for (let rinc of unique_rincian) {
              let aaaaa = 0,
                sat,
                vol;
              bbbb.forEach((rowd) => {
                if ([rinc].includes(rowd[frincian])) {
                  aaaaa += rowd[fnilai];
                  sat = rowd[fsatuan];
                  vol = rowd[fvolumn];
                }
              });
              e.push({
                "name": "  " + rinc,
                "nilai": aaaaa,
                "satuan": sat,
                "volumn": vol
              });
            }
            c.push({
              "name": "  " + keg,
              "nilai": aaaa,
              "satuan": "",
              "volumn": "",
              "_children": e
            });
          }
          b.push({
            "name": " " + subbid,
            "nilai": aaa,
            "satuan": "",
            "volumn": "",
            "_children": c
          });
        }
        a.push({
          "no": i++,
          "name": bid,
          "nilai": aa,
          "satuan": "",
          "volumn": "",
          "_children": b
        });
      }
      //console.log(a);
      const table = new Tabulator("#dak-table", {
        data: a,
        index: "id",
        layout: "fitDataStretch", //fitDataFill, fitData, fitDataTable, fitColumns, fitDataStretch
        columnHeaderVertAlign: "middle",
        dataTree: true,
        dataTreeStartExpanded: false,
        dataTreeFilter: true,
        dataTreeElementColumn: "name",
        dataTreeStartExpanded: opsiTabel.expand,
        dataTreeChildColumnCalcs: false, //include child rows in column calculations
        dataTreeSelectPropagate: true,
        dataLoader: false, //disable remote loader
        movableColumns: true,
        columns: [
          { title: "Bidang/Sub Bidang/Kegiatan/Rincian", field: "name", visible: true, width: 500, sorter: "string", hozAlign: "left", headerHozAlign: "left", frozen: true },
          {
            title: "Nilai RK", field: "nilai", visible: true, bottomCalc: "sum", width: 250,
            bottomCalcFormatter: "money", bottomCalcFormatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            },
            sorter: "number", hozAlign: "right", headerHozAlign: "right", formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            },
          },
          { title: "Satuan", field: "satuan", visible: true, sorter: "number", hozAlign: "center", headerHozAlign: "center" },
          {
            title: "Volumn", field: "volumn", visible: true, formatter: "money", formatterParams: {
              decimal: ",",
              thousand: ".",
              symbol: "",
              symbolAfter: "",
              precision: 0,
            },
            sorter: "number", hozAlign: "right", headerHozAlign: "right"
          },
        ],
        initialSort: [
          { column: "name", dir: "asc" }
        ]
      });
      document.getElementById("download-xlsx-dak").addEventListener("click", function () {
        table.download("xlsx", "Dana_Alokasi_Khusus.xlsx", { sheetName: "data" });
      });

      document.getElementById("download-pdf-dak").addEventListener("click", function () {
        table.download("pdf", "Dana Alokasi Khusus.pdf", {
          orientation: "landscape", //set page orientation to portrait
          title: "Dana Alokasi Khusus", //add title to report
          unit: 'in',
          format: 'tabloid',
          autoTable: function (doc) {
            return {
              styles: { fontsize: 7 },
              columnStyles: {
                0: { cellWidth: 450 },
                1: { halign: 'right' },
                2: { halign: 'center' },
                3: { halign: 'right' },
              },
            }
          },
          documentProcessing: function (doc) {
          },
        });
      });
      return table;
    }

    const geojsonMarkerGreen = {
      radius: 3,
      fillColor: "MediumSeaGreen",
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    };
    const geojsonMarkerBlue = {
      radius: 3,
      fillColor: "blue",
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    };
    const geojsonMarkerYellow = {
      radius: 3,
      fillColor: "yellow",
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    };
    const geojsonMarkerOrange = {
      radius: 3,
      fillColor: "orange",
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    };
    const geojsonMarkerRed = {
      radius: 3,
      fillColor: "red",
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    };
    const geojsonMarkerBrown = {
      radius: 3,
      fillColor: "#dd7f2a",
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    };
    const geojsonMarkerDarkGreen = {
      radius: 3,
      fillColor: "darkgreen",
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    };

    const provinsiStyle = {
      fillColor: "#FFB230",
      color: "#FFFFFF",
      weight: 1,
      fillOpacity: 0.9
    };

    // let lokasiGeoDataX = {"type" : "FeatureCollection", "features" : []};
    var lokasiGeoDataX,
      fuse = null;
    $('.selectpicker').selectpicker();

    initMap();
    function initMap() {
      //LEAFLET MAP
      // CONTROL BUTTON
      const btnHomeReset = L.Control.extend({
        options: {
          position: 'topleft'
        },
        onAdd: function (map) {
          var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0');
          //   var container = L.DomUtil.create('input','shadow-sm p-1 mb-1 border-0 rounded');
          container.title = 'Reset Posisi Peta';
          container.type = "button";
          //   container.style.backgroundColor = 'blue';     
          container.style.backgroundImage = 'url(img/home.png)';
          container.style.backgroundSize = "30px 30px";
          container.style.width = '33px';
          container.style.height = '33px';
          container.onclick = function () {
            // map.setView([-2, 119], 5)
            // map.closePopup();
            map.fitBounds(provinsiLayer.getBounds());
          }
          return container;
        }
      });
      const legend = L.control({ position: "bottomleft" });

      let selectedStates;
      let map = L.map('map-dak', { attributionControl: false }).setView([-2, 117], 5);
      map.addControl(new btnHomeReset());
      legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Bidang Kegiatan</h4>";
        // div.innerHTML += '<i style="background-color: MediumSeaGreen"></i><span>Kesehatan</span><br>';
        div.innerHTML += '<i style="background-color: yellow"></i><span>Kesehatan dan KB</span><br>';
        div.innerHTML += '<i style="background-color: blue"></i><span>Air Minum</span><br>';
        // div.innerHTML += '<i style="background-color: orange"></i><span>Lingkungan Hidup</span>';
        div.innerHTML += '<i style="background-color: darkgreen"></i><span>Sanitasi</span><br>';
        div.innerHTML += '<i style="background-color: #dd7f2a"></i><span>Lingkungan Hidup dan Kehutanan</span><br>';
        // div.innerHTML += '<i style="background-color: #FFB230"></i><span>Lingkungan Hidup</span>';
        // div.innerHTML += '<i style="background-color: red"></i><span>Lain-lain</span><br>';
        return div;
      };
      map.addControl(L.control.fullscreen({
        position: 'topright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
        forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
        fullscreenElement: document.getElementById("fbody") // Dom element to render in full screen, false by default, fallback to map._container
      }));
      map.on('enterFullscreen', function () {
        //$("#map-dak").height('32em');
        $("#map-dak").addClass('fullscreen-map-dak');
        $("#fbody").addClass(['p-2', 'bg-white']);
      });
      map.on('exitFullscreen', function () {
        //$("#map-dak").height('55vh');
        $("#fbody").removeClass(['p-2', 'bg-white']);
        $("#map-dak").removeClass('fullscreen-map-dak');
      });

      legend.addTo(map);
      const search = new GeoSearch.GeoSearchControl({
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
      });
      map.addControl(search);

      const baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
        tileSize: 512,
        maxZoom: 20,
        zoomOffset: -1,
        id: 'mapbox/streets-v11',
        // id: 'mapbox/satellite-streets-v11',
        accessToken: 'pk.eyJ1IjoiYXJqaWFudG8iLCJhIjoiMjYxNWQ1YjkyMjIzMTdkMDE2ODJiNTBkYmE4MDcyNjAifQ.NvwfCpUvHeEiTXXcTJ3MfQ'
      }).addTo(map);

      let lokasiLayer = L.geoJSON(null, {
        filter: (feature) => {
          let isTahunSelected = selectedStates.tahun.includes(feature.properties.tahun)
          let isBidangSelected = selectedStates.bidang.includes(feature.properties.bidang_nama)
          return isTahunSelected && isBidangSelected //only true if both are true
        },
        pointToLayer: function (feature, latlng) {
          //console.log(latlng);
          /* console.log(feature);         
          console.log(feature.properties.bidang_nama); */
          switch (feature.properties.bidang_nama) {

            case 'Kesehatan dan KB': return L.circleMarker(latlng, geojsonMarkerYellow); break;
            case 'Air Minum': return L.circleMarker(latlng, geojsonMarkerBlue); break;
            case 'Sanitasi': return L.circleMarker(latlng, geojsonMarkerDarkGreen); break;
            case 'Lingkungan Hidup dan Kehutanan': return L.circleMarker(latlng, geojsonMarkerBrown); break;
            default: return L.circleMarker(latlng, geojsonMarkerYellow);
          }
        },
        onEachFeature: popUpMarker
      }).addTo(map);

      let provinsiLayer = L.geoJSON(provinsiGeoData, {
        style: provinsiStyle,
        onEachFeature: onEachFeature
      }).addTo(map);

      // map.fitBounds(provinsiLayer.getBounds());
      map.on('zoomend', function () {
        if (map.getZoom() >= 11 && map.hasLayer(provinsiLayer)) {
          map.removeLayer(provinsiLayer);
        }
        if (map.getZoom() < 11 && map.hasLayer(provinsiLayer) == false) {
          map.addLayer(provinsiLayer);
          provinsiLayer.bringToBack()
        }
      });
      map.spin(true,);

      /*--------------------------------------------------------------------------------------*/
      lokasiGeoDataX = mData.DakPeta;
      updateSelectedStates();
      lokasiLayer.addData(lokasiGeoDataX);
      lokasiLayer.bringToFront();
      map.spin(false);

      let fuse = new Fuse(lokasiGeoDataX.features, {
        keys: [
          'properties.provinsi_nama',
          'properties.detail_rincian',
          'properties.pemda_nama',
          'properties.detail_rincian_nama',
          //'properties.operator'
        ]
      });
      L.control.search({
        layer: lokasiLayer,
        propertyName: 'pemda_nama',
        filterData: function (text, records) {
          var jsons = fuse.search(text),
            ret = {}, key;
          for (var i in jsons) {
            key = jsons[i].properties.pemda_nama;
            ret[key] = records[key];
          }
          //console.log(jsons, ret);
          return ret;
        }
      })
        .on('search:locationfound', function (e) {
          e.layer.openPopup();
        })
        .addTo(map);

      function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
          weight: 4,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.4
        });
        // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        //     layer.bringToFront();
        // }
      }

      function resetHighlight(e) {
        // var layer = e.target;
        provinsiLayer.resetStyle(e.target);
        provinsiLayer.bringToBack()
      }

      function onEachFeature(f, l) {
        // var t0 = performance.now();
        // let info = "";
        if (f.properties) {

          l.bindTooltip('<b>' + f.properties.name + '</b>');
          // l.bindPopup(info, { keepInView: true, autoClose: true, closeOnClick: false, className: 'popupCustom' });
          l.on({
            mouseover: function (e) {
              // highlightFeature(e);
              l.openTooltip();
              map.closePopup();
            },
            click: function (e) {
              // map.closePopup();
              // l.openPopup();
              // buttonInfo = L.DomUtil.get('infoBtn');
              // sidebar.isVisible() ? sidebar.hide() : null;
              zoomToFeature(e);
              // getDetail(f.properties.id, f.properties.nama, f.properties.provinsi_nama);
              // L.DomEvent.addListener(buttonInfo, 'click', function (e) {
              //     sidebar.isVisible() ? null : sidebar.toggle();
              // });
            },
            mouseout: function (e) {
              // resetHighlight(e)
            },
          });
        }
        // var t1 = performance.now();
        // t2 += t1 - t0;
      }
      function popUpMarker(f, l) {
        var info = "";
        // console.log('prop',f.properties);
        if (f.properties) {
          for (const key in f.properties) {
            info = /* html */`
            <span class='fs-6 fw-bold text-blue'><b>TA ${f.properties['tahun']} </b></span><br/>
            <span class='fs-5 text-green-700'> ${f.properties['pemda_nama']} </span><br/>
            <span class='fs-6 text-green-700'>
              ${(f.properties['provinsi_kode'] == f.properties['pemda_kode'] ? '' : 'Provinsi ' + f.properties['provinsi_nama'])}
            </span>
            <hr class='my-1'>
            <div style="font-size:0.85rem">
              <span >
                <b>Bidang ${f.properties['bidang_nama']} </b><br/>
                <i style='font-size:0.775rem;'>Sub Bidang ${f.properties['sub_bidang_nama']} </i>
              </span><br/>
              <b>Menu Kegiatan:</b><br>
              <span style='font-size:0.775rem;'>${f.properties['menu_kegiatan_nama']}</span><br/>
              <b>Rincian:</b><br>
              <span style='font-size:0.775rem;'>${f.properties['rincian_nama']}</span><br/>
              <b>Detail Rincian:</b><br>
              <span style='font-size:0.775rem;'>${f.properties['detail_rincian_nama']}</span><br/>
              <span style='font-size:0.9rem;'>
                <b>Volume </b> <span style='font-size:0.775rem;'>${f.properties['volume_rk']} ${f.properties['satuan']}</span><br/>
                <b>Nilai </b> <span style='font-size:0.775rem;'>Rp ${f.properties['nilai_rk'].toLocaleString('id-ID')}</span>
              </span>
              <hr class='my-1'>
              <span>
                <b>Latitute </b>${f.geometry.coordinates[1].toFixed(6)} | <b>Longtitude </b> ${f.geometry.coordinates[0].toFixed(6)} 
              </span><br>
              <a href = 'https://www.google.com/maps?layer=c&cbll=${f.geometry.coordinates[1].toFixed(6)} , ${f.geometry.coordinates[0].toFixed(6)} &cbp=11,0,0,0,0' target = '_blank' id = 'infoBtn' class='btn btn-default btn-sm mt-1'>Street View</a></span>
              </div>        
              `;

            // info += "<a href='https://www.google.com/maps?layer=c&cbll=-8.2087716,113.1158043' target='_blank' id='infoBtn' class='btn btn-default btn-sm mt-2'>Street View</a>";
            // info += "<a href='https://www.google.com/maps?layer=c&cbll=" + f.geometry.coordinates[1].toFixed(6) + "," + f.geometry.coordinates[0].toFixed(6) + "' target='_blank' id='infoBtn' class='btn btn-default btn-sm mt-2'>Street View</a></span>";

          }
          l.bindPopup(info, { minWidth: 300, maxWidth: 600, keepInView: false });
          l.on({
            mouseover: function (e) {
              l.openPopup();
            },
            //mousemove: function(e) { map.closePopup();},
            click: zoomToPoint
          });
        }
      }

      function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
      }

      function zoomToPoint(e) {
        var l = e.target;
        map.flyTo([e.latlng.lat, e.latlng.lng], 20, {
          animate: true,
          duration: 1 // in seconds
        });
        l.openPopup();
      }

      function updateSelectedStates() {
        selectedStates = {
          tahun: [],
          bidang: []
        }
        selectedStates.tahun = $('#tahun-group').val();
        selectedStates.bidang = $('#bidang-group').val();
      }

      $('#tahun-group').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        lokasiLayer.clearLayers();
        updateSelectedStates();
        lokasiLayer.addData(lokasiGeoDataX);
      });

      $('#bidang-group').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        lokasiLayer.clearLayers();
        updateSelectedStates();
        lokasiLayer.addData(lokasiGeoDataX);
      });
      /*--------------------------------------------------------------------------------------*/
    }
  }
};
export default DAK;