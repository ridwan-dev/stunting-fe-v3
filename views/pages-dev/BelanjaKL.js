import WidgetCard from '../components/WidgetCard.js';
import { apiGeodataKab, apiDataTahun, apiBklKementerian, apiBklIntervensi, apiBklProgram } from '../../services/api.js';

const KinerjaAnggaran = {
    /**
     * Render the page content.
     */
    render: async () => {

        const widgetCard1 = await WidgetCard.render('tile-1', 'Alokasi', '', 'lg-3');
        const widgetCard2 = await WidgetCard.render('tile-2', 'Kinerja Anggaran', '', 'lg-3');
        const widgetCard3 = await WidgetCard.render('tile-3', 'Capaian Output', '', 'lg-3');
        const widgetCard4 = await WidgetCard.render('tile-4', 'Sub Output / RO', '', 'lg-3');

        return /*html*/`
        <div class="app-content-padding flex-grow-1 overflow-auto"  data-height="100%" >				
            <!-- BEGIN page-header -->
            <h2 class="page-header text-blue"><i class="material-icons text-blue-600 align-middle me-1 mb-1">balance</i>Belanja K/L</h2>
            <!-- END page-header -->
            <!-- begin widget-card -->
            <div id="fbody" style="min-height: 53em;">
            <div class="row pt-3 mt-3  mx-0 py-3 bg-gray-300 rounded mb-3 hide" id="drp_option">
                <div class="col-xl-4 ">
                    <div class="form-group sel_tax">
                        <select id="sel_ta" name="sel_ta" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Tahun" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Tahun dipilih">
                        </select>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="form-group sel_kl">
                        <select id="sel_kl" name="sel_kl" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Kementerian/ Lembaga" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} K/L dipilih">
                        </select>
                    </div>
                </div>
                <div class="col-xl-4">
                    <div class="form-group sel_ig">
                        <select id="sel_ig" name="sel_ig" class="form-control selectpicker" data-toggle="dropdown" data-title="Pilih Intervensi" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0} Intervensi dipilih">
                        </select>
                    </div>
                </div>                
            </div>

            <div id="top-tiles" class="row mb-3">
                ${widgetCard1}
                ${widgetCard2}
                ${widgetCard3}    
                ${widgetCard4}    
            </div>
            <!-- end widget-card -->
            
            <div class="row">
                <div class="col-xl-12">
                    <div id="leaflet-sidebar" class="leaflet-sidebar collapsed">
                        <div id="title-tab"></div>
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs hide" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link font-weight-normal active" id="detail-data-tab" data-toggle="tab" href="#detail-data" role="tab" aria-controls="home" aria-selected="true" style="text-shadow:none"><i class='fa fa-table text-primary me-2'></i>Detail Indikator</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link font-weight-normal" id="chart-tab" data-toggle="tab" href="#chart" role="tab" aria-controls="chart" aria-selected="false" style="text-shadow:none"><i class='fa fa-chart-bar text-primary me-2'></i>Grafik</a>
                            </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content mx-2">
                            <div class="tab-pane active" id="detail-data" role="tabpanel" aria-labelledby="home-tab">
                            <!--isi--> 
                            </div>
                            <div class="tab-pane  p-3" id="chart" role="tabpanel" aria-labelledby="profile-tab">
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
                    </div>
                </div>
            </div>
            <div id="peta-sebaran-kegiatan" class="rounded " style="width: 100%; float: left; "> </div>    
            </div>
            
        </div>`;
    },
    /**
     * All the code related to DOM interactions and controls go in here.
     * This is a separate call as these can be registered only after the DOM has been painted.
     */
    after_render: async () => {
        mData.GeodataKab = (typeof mData.GeodataKab === "undefined") ? await apiGeodataKab() : mData.GeodataKab;
        mData.DataThn = (typeof mData.DataThn === "undefined") ? await apiDataTahun() : mData.DataThn;
        mData.BklKementerian = (typeof mData.BklKementerian === "undefined") ? await apiBklKementerian() : mData.BklKementerian;
        mData.BklInterv = (typeof mData.BklInterv === "undefined") ? await apiBklIntervensi() : mData.BklInterv;
        mData.BklProgram = (typeof mData.BklProgram === "undefined") ? await apiBklProgram() : mData.BklProgram;

        let _res = mData.GeodataKab,
            _res0 = mData.DataThn,
            _res1 = mData.BklKementerian,
            _res2 = mData.BklInterv,
            _res3 = mData.BklProgram;

        $(function () {
            $('select').selectpicker();
        });
        let
            thID = document.getElementById('sel_ta'),
            klID = document.getElementById('sel_kl'),
            intID = document.getElementById('sel_ig'),
            dKementerian = [],
            dTahun = [],
            dIntervensi = []
            ;
        _res0.forEach((item) => {
            dTahun.push(
                `<option value="${item.id}" selected="selected">${item.text}</option>`
            );
        });
        thID.innerHTML = dTahun.join(" ");
        _res1.forEach((item) => {
            dKementerian.push(
                `<option value="${item.id}" selected="selected">${item.text}</option>`
            );
        });
        klID.innerHTML = dKementerian.join(" ");
        _res2.forEach((item) => {
            let lev1 = [];
            item.children.forEach((in_item) => {
                lev1.push(`<option data-subtext='${in_item.type}' value='${in_item.id}' selected="selected"> ${in_item.text}</option>`);
            });
            dIntervensi.push(`<optgroup label='${item.text}' >${lev1.join(" ")}</optgroup>`);
        });
        intID.innerHTML = dIntervensi.join(" ");

        const
            tile1 = document.getElementById('tile-1'),
            tile2 = document.getElementById('tile-2'),
            tile3 = document.getElementById('tile-3'),
            tile4 = document.getElementById('tile-4');

        let
            drpTahun = $("#sel_ta").val(),
            drpKl = $("#sel_kl").val(),
            drpIntv = $("#sel_ig").val();
        ;

        async function tileBelanjaKL(tahun, kl, int, tile) {

            tile1.innerHTML =/*html*/`
            <div class="loading spin-5px"></div>
            `;
            tile2.innerHTML =/*html*/`
            <div class="loading spin-5px"></div>
            `;
            tile3.innerHTML =/*html*/`
            <div class="loading spin-5px"></div>
            `;
            tile4.innerHTML =/*html*/`
            <div class="loading spin-5px"></div>
            `;
            let _resx;
            try {
                let res = await fetch(config.api_url + '/monitoring/capaian/intervensitotal', {
                    method: 'POST',
                    body: JSON.stringify({
                        "tahun": tahun,
                        "kementerian": kl,
                        "intervensi": int
                    }),
                    headers: config.fetchHeaders
                });
                _resx = await res.json();
                //return _res.data;
            } catch (e) {
                return false;
            }

            /*  1. Alokasi : alokasi
                2. Kinerja anggaran : Realisasi
                3. capaian output : capaian keu
                4. Sub output : capain fisik
                */

            tile1.innerHTML =/*html*/`
                    <div class="d-flex bd-highlight">
                        <span class="h3 py-2 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((_resx.data.alokasi).toFixed(2)).toLocaleString('id-ID')}" title="" data-bs-original-title="Alokasi Tahun ${_resx.data.tahun}">
                            ${parseFloat((_resx.data.alokasi / 1000000000000).toFixed(2)).toLocaleString('id-ID')}T
                        </span>
                    </div>
                    <div class="d-flex flex-row bd-highlight mb-3 fs-10px">
                        <div class="bd-highlight">
                            <div class="${(_resx.data.perbandinganalokasi < 0) ? 'text-red' : 'text-lime-600'} text-lime fw-400">
                                <i class="fa ${(_resx.data.perbandinganalokasi < 0) ? 'fa-caret-down' : 'fa-caret-up'}"></i> 
                                ${(_resx.data.perbandinganalokasi < 0) ? parseFloat((_resx.data.perbandinganalokasi * -1).toFixed(2)).toLocaleString('id-ID') : (typeof _resx.data.perbandinganalokasi === 'undefined' ? 100 : parseFloat((_resx.data.perbandinganalokasi).toFixed(2)).toLocaleString('id-ID'))}%
                            </div>
                        </div>    
                        <div class="bd-highlight">
                            <div class="ms-1 fw-400">
                                <div>dari tahun sebelumnya
                                    <span class="text-blue fw-700" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((_resx.data.alokasi_sebelumnya).toFixed(2)).toLocaleString('id-ID')}" title="" data-bs-original-title="Alokasi Tahun ${_resx.data.tahun - 1}">
                                        ${parseFloat((_resx.data.alokasi_sebelumnya / 1000000000000).toFixed(2)).toLocaleString('id-ID')}T
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>              
                    `;

            tile2.innerHTML =/*html*/`
                    <div class="d-flex bd-highlight">
                        <span class="h3 py-2 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((_resx.data.realisasi).toFixed(2)).toLocaleString('id-ID')}" title="" data-bs-original-title="Kinerja Anggaran Tahun ${_resx.data.tahun}">
                            ${parseFloat((_resx.data.realisasi / 1000000000000).toFixed(2)).toLocaleString('id-ID')}T
                        </span>
                    </div>
                    <div class="d-flex flex-row bd-highlight mb-3 fs-10px">
                        <div class="bd-highlight">
                            <div class="${(_resx.data.perbandingan_realisasi < 0) ? 'text-red' : 'text-lime-600'} text-lime fw-400">
                                <i class="fa ${(_resx.data.perbandingan_realisasi < 0) ? 'fa-caret-down' : 'fa-caret-up'}"></i> 
                                ${(_resx.data.perbandingan_realisasi < 0) ? parseFloat((_resx.data.perbandingan_realisasi * -1).toFixed(2)).toLocaleString('id-ID') : parseFloat((_resx.data.perbandingan_realisasi).toFixed(2)).toLocaleString('id-ID')}%
                            </div>
                        </div>    
                        <div class="bd-highlight">
                            <div class="ms-1 fw-400">
                                <div>dari tahun sebelumnya
                                    <span class="text-blue fw-700" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="Rp. ${parseFloat((_resx.data.realisasi_sebelumnya).toFixed(2)).toLocaleString('id-ID')}" title="" data-bs-original-title="Kinerja Anggaran Tahun ${_resx.data.tahun - 1}">
                                        ${parseFloat((_resx.data.realisasi_sebelumnya / 1000000000000).toFixed(2)).toLocaleString('id-ID')}T
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>              
                    `;

            tile3.innerHTML =/*html*/`
                    <div class="d-flex bd-highlight">
                        <span class="h3 py-2 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="${parseFloat((_resx.data.capaian_keu).toFixed(2)).toLocaleString('id-ID')}%" title="" data-bs-original-title="Capaian Output Tahun ${_resx.data.tahun}">
                            ${parseFloat((_resx.data.capaian_keu).toFixed(2)).toLocaleString('id-ID')}%
                        </span>
                    </div>
                    <div class="d-flex flex-row bd-highlight mb-3 fs-10px">
                        <div class="bd-highlight">
                            <div class="${(_resx.data.perbandingan_capaiankeu < 0) ? 'text-red' : 'text-lime-600'} text-lime fw-400">
                                <i class="fa ${(_resx.data.perbandingan_capaiankeu < 0) ? 'fa-caret-down' : 'fa-caret-up'}"></i> 
                                ${(_resx.data.perbandingan_capaiankeu < 0) ? parseFloat(((_resx.data.perbandingan_capaiankeu) * -1).toFixed(2)).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : parseFloat((_resx.data.perbandingan_capaiankeu).toFixed(2)).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                            </div>
                        </div>    
                        <div class="bd-highlight">
                            <div class="ms-1 fw-400">
                                <div>dari tahun sebelumnya
                                    <span class="text-blue fw-700" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="${parseFloat((_resx.data.capaian_keu_sebelumnya).toFixed(2)).toLocaleString('id-ID')}%" title="" data-bs-original-title="Capaian Output Tahun ${_resx.data.tahun - 1}">
                                        ${parseFloat((_resx.data.capaian_keu_sebelumnya).toFixed(2)).toLocaleString('id-ID')}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>              
                    `;

            tile4.innerHTML =/*html*/`
                    <div class="d-flex bd-highlight">
                        <span class="h3 py-2 text-green" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="${parseFloat((_resx.data.capaian_fisik).toFixed(2)).toLocaleString('id-ID')}%" title="" data-bs-original-title="Sub Output/Rincian Output Tahun ${_resx.data.tahun}">
                            ${parseFloat((_resx.data.capaian_fisik).toFixed(2)).toLocaleString('id-ID')}%
                        </span>
                    </div>
                    <div class="d-flex flex-row bd-highlight mb-3 fs-10px ">
                        <div class="bd-highlight">
                            <div class="${(_resx.data.perbandingan_capaianfisik < 0) ? 'text-red' : 'text-lime-600'} text-lime fw-400">
                                <i class="fa ${(_resx.data.perbandingan_capaianfisik < 0) ? 'fa-caret-down' : 'fa-caret-up'}"></i> 
                                ${(_resx.data.perbandingan_capaianfisik < 0) ? parseFloat((_resx.data.perbandingan_capaianfisik * -1).toFixed(2)).toLocaleString('id-ID') : parseFloat((_resx.data.perbandingan_capaianfisik).toFixed(2)).toLocaleString('id-ID')}%
                            </div>
                        </div>    
                        <div class="bd-highlight">
                            <div class="ms-1 fw-400">
                                <div>dari tahun sebelumnya
                                    <span class="text-blue fw-700" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title=" " data-bs-placement="top" data-bs-content="${parseFloat((_resx.data.capaian_fisik_sebelumnya).toFixed(2)).toLocaleString('id-ID')}%" title="" data-bs-original-title="Sub Output/Rincian Output Tahun ${_resx.data.tahun - 1}">
                                        ${parseFloat((_resx.data.capaian_fisik_sebelumnya).toFixed(2)).toLocaleString('id-ID')}%                                
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>              
                    `;
        }

        await tileBelanjaKL(drpTahun, drpKl, drpIntv);

        $("#sel_ta, #sel_kl, #sel_int").on('change', async () => {
            let
                drpTahun = $("#sel_ta").val(),
                drpKl = $("#sel_kl").val(),
                drpIntv = $("#sel_ig").val();
            ;
            await tileBelanjaKL(drpTahun, drpKl, drpIntv);

        });

        if (numeral.locales['id'] === undefined) {
            numeral.register("locale", "id", {
                delimiters: {
                    thousands: '.',
                    decimal: ','
                },
                abbreviations: {
                    thousand: 'k',
                    million: 'm',
                    billion: 'b',
                    trillion: 't'
                },
                currency: {
                    symbol: 'Rp',
                    position: 'prefix', // 'prefix'/'infix'/'postfix'. Default is 'prefix'
                    spaceSeparated: 'false' // 'true'/'false'. Default is 'false'
                },
                ordinal: function (number) {
                    return '.';
                }
            });
        }
        numeral.locale('id');

        let map = L.map("peta-sebaran-kegiatan", {
            zoomControl: false,
            center: [-2.45, 118],
            zoom: 5.25,
            zoomSnap: 0.25,
            zoomDelta: 0.25,
            fadeAnimation: false,
            zoomAnimation: false
        });

        $('#myTab a').on('click', function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
        $('#chart-tab').on('click', function (e) {
            chartUpdate(aggregateData);
        });

        Apex.theme = {
            mode: 'light',
            palette: 'palette2',
            monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        };
        Apex.chart = {
            fontFamily: 'Nunito, Segoe UI',
            toolbar: { show: false }
        };

        var optBarKL = {
            chart: {
                type: 'bar',
                id: 'bar-kl'
            },
            series: [
                {
                    name: 'Alokasi',
                    type: 'column',
                    data: []
                },
                {
                    name: 'Realisasi',
                    type: 'column',
                    data: []
                }
            ],
            xaxis: {
                type: 'category',
                categories: [],
            },
            yaxis: [
                {
                    decimalsInFloat: 0,
                    tickAmount: 4,
                    title: {
                        text: 'Anggaran (Juta)'
                    },
                    labels: {
                        formatter: function (value) {
                            return numeral(value / 1000000).format("0,0")
                        }
                    }
                }
            ],
            tooltip: {
                y: {
                    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                        return numeral(value / 1000000).format("0,0.00") + " Juta"
                    }
                }
            },
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    // columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            noData: {
                text: 'Loading...'
            }
        }

        var optPieKL = {
            chart: {
                id: 'pie-kl',
                type: 'donut'
            },
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                    size: '67%'
                }
            },
            series: [],
            labels: [],
            // fill: {
            //     type: 'gradient'
            // },
            dataLabels: {
                enabled: true,
                formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                    return numeral(value).format("0") + '%'
                }
            },
            tooltip: {
                y: {
                    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                        return numeral(value / 1000000).format("0,0.000") + ' Juta'
                    }
                }
            }
        }

        var optBarInt = {
            chart: {
                id: 'bar-int',
                type: 'bar'
            },
            series: [
                {
                    name: 'Alokasi',
                    type: 'column',
                    data: []
                },
                {
                    name: 'Realisasi',
                    type: 'column',
                    data: []
                }
            ],
            xaxis: {
                type: 'category',
                categories: [],
                labels: { trim: true }
            },
            yaxis: [
                {
                    decimalsInFloat: 0,
                    tickAmount: 4,
                    title: {
                        text: 'Anggaran (Juta)'
                    },
                    labels: {
                        formatter: function (value) {
                            return numeral(value / 1000000).format("0,0")
                        }
                    }
                }
            ],
            tooltip: {
                y: {
                    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                        return numeral(value / 1000000).format("0,0.00") + " Juta"
                    }
                }
            },
            dataLabels: {
                enabled: false,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    // columnWidth: '55%',
                    // endingShape: 'rounded',
                },
            }
        }

        var optPieInt = {
            chart: {
                id: 'pie-int',
                type: 'donut'
            },
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 270,
                    size: '67%'
                }
            },
            series: [],
            labels: [],
            fill: {
                type: 'gradient'
            },
            dataLabels: {
                enabled: true,
                formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                    return numeral(value).format("0") + '%'
                }
            },
            tooltip: {
                y: {
                    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                        return numeral(value / 1000000).format("0,0.000") + ' Juta'
                    }
                }
            }
        }

        var optCapFisKeu = {
            series: [
                {
                    name: 'Alokasi Anggaran',
                    type: 'column',
                    data: []
                },
                {
                    name: 'Capaian Anggaran',
                    type: 'line',
                    data: []
                },
                {
                    name: 'Capaian Indikator',
                    type: 'line',
                    data: []
                }
            ],
            chart: {
                id: 'mix-indi-1',
                // height: 180,
                type: 'line'
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
                width: [0, 4, 4],
                dashArray: [0, 5, 0]
            },
            xaxis: {
                categories: []
            },
            yaxis: [
                {
                    title: {
                        text: 'Alokasi Anggaran (Juta)'
                    },
                    decimalsInFloat: 0,
                    labels: {
                        formatter: function (value) {
                            return numeral(value / 1000000).format("0,0")
                        }
                    }
                },
                {
                    seriesName: 'Capaian Anggaran',
                    title: {
                        text: 'Capaian Anggaran (%)'
                    },
                    decimalsInFloat: 0,
                    min: 0,
                    max: 100,
                    opposite: true,
                    show: false
                },
                {
                    seriesName: 'Capaian Indikator',
                    title: {
                        text: 'Capaian (%)'
                    },
                    decimalsInFloat: 0,
                    min: 0,
                    max: 100,
                    tickAmount: 5,
                    opposite: true,
                    showAlways: true
                }
            ],
            tooltip: {
                y: {
                    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {

                        return seriesIndex == 0 ? numeral(value / 1000000).format("0,0.00") + ' Juta' : numeral(value).format("0,0.00") + ' %'
                    }
                }
            }
        };

        var optCapInt = {
            series: [
                {
                    name: 'Alokasi Anggaran',
                    type: 'column',
                    data: []
                },
                {
                    name: 'Capaian Anggaran',
                    type: 'line',
                    data: []
                },
                {
                    name: 'Capaian Indikator',
                    type: 'line',
                    data: []
                }
            ],
            chart: {
                id: 'mix-indi-2',
                // height: 180,
                type: 'line'
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
                width: [0, 4, 4],
                dashArray: [0, 5, 0]
            },
            xaxis: {
                categories: [],
                labels: { trim: true }
            },
            yaxis: [
                {
                    title: {
                        text: 'Alokasi Anggaran (Juta)'
                    },
                    decimalsInFloat: 0,
                    labels: {
                        formatter: function (value) {
                            return numeral(value / 1000000).format("0,0")
                        }
                    }
                },
                {
                    seriesName: 'Capaian Anggaran',
                    title: {
                        text: 'Capaian Anggaran (%)'
                    },
                    decimalsInFloat: 0,
                    min: 0,
                    max: 100,
                    opposite: true,
                    show: false
                },
                {
                    seriesName: 'Capaian Indikator',
                    title: {
                        text: 'Capaian (%)'
                    },
                    decimalsInFloat: 0,
                    min: 0,
                    max: 100,
                    tickAmount: 5,
                    opposite: true,
                    showAlways: true
                }
            ],
            tooltip: {
                y: {
                    formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {

                        return seriesIndex == 0 ? numeral(value / 1000000).format("0,0.00") + ' Juta' : numeral(value).format("0,0.00") + ' %'
                    }
                }
            }
        };

        var chartMapPieKL = new ApexCharts(document.querySelector("#chart-pie-kl"), optPieKL);
        var chartMapBarKL = new ApexCharts(document.querySelector("#chart-bar-kementerian"), optBarKL);
        var chartMapPieInt = new ApexCharts(document.querySelector("#chart-pie-int"), optPieInt);
        var chartMapBarIntervensi = new ApexCharts(document.querySelector("#chart-bar-int"), optBarInt);
        var chartMapCapFisKeu = new ApexCharts(document.querySelector("#chart-capaian-1"), optCapFisKeu);
        var chartMapCapInt = new ApexCharts(document.querySelector("#chart-capaian-2"), optCapInt); chartMapPieKL.render();
        chartMapBarKL.render();
        chartMapPieInt.render();
        chartMapBarIntervensi.render();
        chartMapCapFisKeu.render();
        chartMapCapInt.render();

        let selectedStates = [];
        let filtering = [];
        let GeoData, detailMonData, grouped, groups, groupsD, alokasi, realisasi, refIntervensiData, refIndikatorData, titleD, groupedD, refKlData, buttonInfo, intervensiData, intervensiAllData, programData, indikatorData, aggregateData, kementerianData, dataProgram, featureDetail = [];
        let t2 = 0;
        let c_program = [];

        // CONTROL BUTTON
        const btnHomeReset = L.Control.extend({
            options: {
                position: 'topleft'
            },
            onAdd: function (map) {
                var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0');
                //   var container = L.DomUtil.create('input','shadow-sm px-2 p-1 mb-1 border-0 rounded');
                container.title = 'Reset Posisi Peta';
                container.type = "button";
                //   container.style.backgroundColor = 'blue';     
                container.style.backgroundImage = 'url(img/home.png)';
                container.style.backgroundSize = "26px 26px";
                container.style.width = '27px';
                container.style.height = '27px';
                container.onclick = function () {
                    // map.setView([-2, 119], 5)
                    map.closePopup();
                    map.fitBounds(geojsonLayer.getBounds());
                }
                return container;
            }
        });
        const watermark = L.Control.Watermark = L.Control.extend({
            onAdd: function (map) {
                var img = L.DomUtil.create('img');
                img.src = 'img/icon-logo.png';
                img.style.width = '100px';
                img.style.opacity = '0.7';
                return img;
            }
        });
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

        const sidebar = L.control.sidebar('leaflet-sidebar', {
            closeButton: true,
            position: 'right'
        });
        map.addControl(sidebar);
        map.addControl(new btnHomeReset());
        map.addControl(search);
        map.addControl(new watermark({ position: 'bottomleft' }));
        map.addControl(L.control.fullscreen({
            position: 'topright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
            forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
            fullscreenElement: document.getElementById("fbody") // Dom element to render in full screen, false by default, fallback to map._container
        }));
        L.control.zoom({
            position: 'topright'
        }).addTo(map);

        map.on('enterFullscreen', function () {
            $("#peta-sebaran-kegiatan").addClass('fullscreen-map-belanja-kl');
            $("#fbody").addClass(['p-2', 'bg-white']);
        });
        map.on('exitFullscreen', function () {
            $("#peta-sebaran-kegiatan").removeClass('fullscreen-map-belanja-kl');
            $("#fbody").removeClass(['p-2', 'bg-white', 'screen-map-belanja-kl']);
        });
        map.on('click', function () {
            sidebar.hide();
            map.closePopup();
        })
        // END OF BUTTON CONTROL

        const baseLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 18
        }).addTo(map);

        let geojsonLayer = L.geoJSON(null, {
            filter: function (feature) {
                return !filtering[0] ? false : filterPlainArray(feature.properties.data, filtering[0]).length ? true : false;
            },
            style: function (feature) {
                feature.properties.style = {
                    fillColor: "#FFB230",
                    color: "#FFFFFF",
                    weight: 1,
                    fillOpacity: 0.9
                };
                return feature.properties && feature.properties.style;
            },
            onEachFeature: onEachFeature
        }).addTo(map)

        const initData = async () => {
            var t0 = performance.now();
            map.spin(true, { lines: 10, length: 20 });
            //geoData = _res.data;
            geoData = _res;
            kementerianData = _res1;
            intervensiData = _res2;
            intervensiAllData = [].concat(intervensiData[0].children, intervensiData[1].children, intervensiData[2].children, intervensiData[3].children);
            programData = _res3;
            var t1 = performance.now();
            updateSelectedStates();
            /* geojsonLayer.addData(fetchData.data); */
            //geojsonLayer.addData(_res.data);
            geojsonLayer.addData(_res);
            map.spin(false);
        };
        initData();

        function highlightFeature(e) {
            var layer = e.target;
            layer.setStyle({
                weight: 4,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.4
            });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        }

        function resetHighlight(e) {
            geojsonLayer.resetStyle(e.target);
        }

        function zoomToFeature(e) {
            // Livewire.emit('getMapDetail', e.target.feature.properties);
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(f, l) {
            var t0 = performance.now();
            var popCard = "";

            if (f.properties) {
                l.bindTooltip('<b>' + f.properties.kabupaten_nama + ' |</b> ' + f.properties.provinsi_nama);
                l.bindPopup('<div class="spinner-grow text-warning mt-2"></div>', { keepInView: true, autoPan: true, autoClose: true, closeOnClick: false, className: 'popupCustom' });
                l.on({
                    mouseover: function (e) {
                        highlightFeature(e);
                        l.openTooltip();
                        // map.closePopup();
                    },
                    click: function (e) {
                        map.closePopup();
                        l.openPopup();
                        sidebar.isVisible() ? sidebar.hide() : null;
                        // zoomToPoint(e);
                        getDetail(e, f.properties);
                    },
                    mouseout: resetHighlight,
                });
            }
            var t1 = performance.now();
            t2 += t1 - t0;
        }

        function zoomToPoint(e) {
            var longtitude = e.latlng.lng;
            var latitude = e.latlng.lat;
            map.closePopup();
            map.flyTo([latitude, longtitude], 9, {
                animate: true,
                duration: 2 // in seconds
            });
            l.openPopup();
        }

        function updateSelectedStates() {
            selectedStates = {
                tahun: [],
                kementerian_id: [],
                intervensi_id: []
            };

            selectedStates.tahun = $('#sel_ta').val();
            selectedStates.kementerian_id = $('#sel_kl').val();
            selectedStates.intervensi_id = $('#sel_ig').val();
            filtering = [];
            filtering.push(selectedStates);
        }

        function getDetail(e, p) {
            let popupContent = '', infoD = '';
            let propD = [];
            let popup = e.target.getPopup();
            let lokasi_id = p.id;
            const request = async () => {
                // const fetchData = await fetch('http://localhost:8080/api/v1/monitoring/capaian/intervensi', {
                const fetchData = await fetch(config.api_url + '/monitoring/capaian/intervensi', {
                    method: 'POST',
                    body: JSON.stringify({
                        "lokasi_id": p.id,
                        "tahun": filtering[0].tahun,
                        "intervensi": filtering[0].intervensi_id,
                        "kementerian": filtering[0].kementerian_id
                    }),
                    headers: config.fetchHeaders
                });

                let _resx = await fetchData.json();
                indikatorData = _resx.data.indikator;
                featureDetail = _resx.data.detail;
                aggregateData = _resx.data.chart;

                //POPUP CONTENT
                groups = ['tahun', 'kementerian_id'],
                    grouped = {};
                aggregateData.forEach(function (a) {
                    groups.reduce(function (o, g, i) {
                        o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {});
                        return o[a[g]];
                    }, grouped).push(a)
                });
                popupContent = `<span class='font-weight-bold text-light' style='font-size:1.4rem;'>` + p.kabupaten_nama + ` </span>
                <span class='float-end me-4'><button id='infoBtn' class='btn btn-primary btn-sm rounded font-weight-bold mt-2'>Detail</button></span><br/>
                <span class='text-light' style='font-size:0.925rem;'>PROVINSI `+ p.provinsi_nama.toUpperCase() + `</span><br/>`;

                $.each(grouped, function (iTahun, vTahun) {
                    popupContent += "<div class='bg-orange-600 badge badge-warning font-weight-bold text-light mt-3 me-1 mb-1 text-start' style='font-size:1rem;display: block;width: 3em;'>" + iTahun + "</div>";

                    $.each(vTahun, function (iKementerian, vKementerian) {
                        popupContent += "<ul class='list-group mt-1 border-0'>";
                        let kementerian = findRef(kementerianData, iKementerian);
                        popupContent += "<li class='list-group-item py-1 px-2 active' style='font-size:0.85rem;'><i class='fa fa-landmark me-2'></i>" + kementerian.text + "</li>";
                        $.each(vKementerian, function (iIntervensi, vIntervensi) {
                            popupContent += "<li class='list-group-item py-1 px-2 text-dark' style='font-size:0.8rem;'><i class='fa fa-capsules me-2 text-primary'></i>" + vIntervensi.intervensi + " <br><span class='badge badge-dark py-1 pl-2 text-black' style='font-size:0.75rem;'> Alokasi <b>Rp" + numeral(vIntervensi.alokasi).format('0,0') + "</b> | Realisasi <b>Rp" + numeral(vIntervensi.realisasi).format('0,0') + "</b> | <b>" + numeral((vIntervensi.realisasi) / (vIntervensi.alokasi)).format('0.00%') + "</b></span></li>"
                        });
                        popupContent += "</ul>"
                    });

                });

                popup.setContent(popupContent);
                popup.update();
                buttonInfo = L.DomUtil.get('infoBtn');
                L.DomEvent.addListener(buttonInfo, 'click', function (e) {
                    sidebar.isVisible() ? null : sidebar.toggle();
                });
                // END OF POPUP CONTENT

                //DETAIL CONTENT
                if (featureDetail) {
                    propD = filterPlainArray(featureDetail, filtering[0]);
                };

                groupsD = ['tahun', 'kementerian_id', 'intervensi_id', 'program_id', 'kegiatan_id', 'output_id', 'sub_output_id'],
                    groupedD = {};
                let refData = [];

                propD.forEach(function (a) {
                    groupsD.reduce(function (o, g, i) {
                        o[a[g]] = o[a[g]] || (i + 1 === groupsD.length ? [] : {});
                        return o[a[g]];
                    }, groupedD).push(a);
                });

                titleD = "<p class='h3 p-0 m-0 mx-4 text-black'>" + p.kabupaten_nama + "</p><p class='h5 py-1 m-0 mx-4 mb-3 text-black'>PROVINSI " + p.provinsi_nama.toUpperCase() + "</p>";
                infoD = "<section class='container p-0 m-0'>"
                document.getElementById("detail-data").innerHTML = infoD;
                document.getElementById("title-tab").innerHTML = titleD;

                Object.entries(groupedD).forEach(([i, v]) => { //Tahun Anggaran
                    infoD += "<div class='ac p-0'>"
                    infoD += "<input class='ac-input' id='t-" + i + "' name='t-" + i + "' type='checkbox' /><label class='ac-label rounded-top bg-pastel-6 text-inverse my-0 mt-2 p-2 pl-3' for='t-" + i + "' style='font-size:1rem;'><i class='fa fa-calendar-alt me-2'></i>" + i + "</label>\
                                <article class='ac-text'>"
                    Object.entries(v).forEach(([j, v]) => {
                        refKlData = findRef(kementerianData, j); //Kementerian
                        infoD += "<div class='ac-sub'>"
                        infoD += "<input class='ac-input' id='k-" + i + j + "' name='k-" + i + j + "' type='checkbox' /><label class='ac-label bg-pastel-7 text-dark my-0 p-2 pl-3' for='k-" + i + j + "' style='font-size:0.95rem;'><i class='fa fa-landmark me-2'></i>" + refKlData.text + "</label>"
                        infoD += "<article class='ac-text'>"
                        Object.entries(v).forEach(([k, v]) => {
                            alokasi = 0;
                            realisasi = 0;
                            refIntervensiData = findRef(intervensiAllData, k); //Intervensi
                            infoD += "<div class='ac-sub'>"
                            infoD += "<input class='ac-input' id='i-" + i + j + k + "' name='i-" + i + j + k + "' type='checkbox' /><label class='ac-label bg-pastel-9 text-dark my-0 p-2 pl-3' for='i-" + i + j + k + "'><i class='fa fa-capsules me-2'></i>" + refIntervensiData.text + "<span class='badge badge-light float-end align-middle py-1'>INTERVENSI " + refIntervensiData.type.toUpperCase() + "</span></label>"
                            infoD += "<article class='ac-text'>"
                            Object.entries(v).forEach(([m, v]) => {
                                refData = findRef(programData, m); //Program
                                infoD += "<div class='ac-sub bg-pastel-1'>"
                                infoD += "<input class='ac-input' id='" + 'p-' + j + k + m + "' name='" + 'p-' + j + k + m + "' type='checkbox' /><label class='ac-label text-dark my-0 p-2 pl-3 ml-2' for='" + 'p-' + j + k + m + "'><i class='fa fa-paperclip text-pink me-2'></i>" + refData.text + "<span class='badge badge-pink mt-1 py-1 float-end'>PROGRAM</span></label>"
                                infoD += "<article class='ac-text'>";
                                Object.entries(v).forEach(([n, v]) => {
                                    refData = findRef(programData, n); //Kegiatan
                                    infoD += "<div class='ac-sub bg-pastel-2'>"
                                    infoD += "<input class='ac-input' id='" + 'pk-' + j + k + n + "' name='" + 'pk-' + j + k + n + "' type='checkbox'/><label class='ac-label text-dark my-0 p-2 pl-3 ml-3' for='" + 'pk-' + j + k + n + "'><i class='fa fa-paperclip text-blue me-2'></i>" + refData.text + "<span class='badge badge-blue  mt-1 py-1 float-end'>KEGIATAN</span></label>"
                                    infoD += "<article class='ac-text'>";
                                    Object.entries(v).forEach(([o, v]) => {
                                        refData = findRef(programData, o); //Output
                                        infoD += "<div class='ac-sub bg-pastel-3'>"
                                        infoD += "<input class='ac-input' id='" + 'o-' + j + k + o + "' name='" + 'o-' + j + k + o + "' type='checkbox' /><label class='ac-label text-dark my-0 p-2 pl-3 ml-4' for='" + 'o-' + j + k + o + "'><i class='fa fa-paperclip text-orange me-2'></i>" + refData.text + "<span class='badge badge-orange mt-1 py-1 float-end'>OUTPUT</span></label>"
                                        infoD += "<article class='ac-text'>";
                                        Object.entries(v).forEach(([p, v]) => {
                                            refData = findRef(programData, p); // Sub Output
                                            infoD += "<div class='ac-sub bg-pastel-4'>";
                                            infoD += "<input class='ac-input' id='" + 's-' + j + k + p + "' name='" + 's-' + j + k + p + "' type='checkbox' /><label class='ac-label text-dark my-0 p-2 pl-3 ml-5' for='" + 's-' + j + k + p + "' ><i class='fa fa-paperclip text-indigo me-2'></i>" + refData.text + "<span class='badge badge-indigo mt-1 py-1 float-end'>SUB OUTPUT</span></label>";
                                            infoD += "<article class='ac-text'>";
                                            Object.entries(v).forEach(([q, v]) => {
                                                refData = findRef(programData, v.komponen_id); // komponen
                                                refIndikatorData = indikatorData.filter(i => [v.komponen_id].includes(i.parent_id) && [lokasi_id].includes(i.lokasi_id)); //indikator komponen
                                                infoD += "<div class='ac-sub bg-pastel-5'>";
                                                infoD += "<input class='ac-input' id='" + 'p-' + j + k + p + q + v.komponen_id + "' name='" + 'p-' + j + k + p + q + v.komponen_id + "' type='checkbox' /><label class='ac-label text-dark my-0 p-2 ml-5' for='" + 'p-' + j + k + p + q + v.komponen_id + "'><i class='fa fa-paperclip text-danger me-2'></i>" + refData.text + "<span class='badge badge-danger mt-1 py-1 float-end'>KOMPONEN</span></label>";
                                                infoD += "<article class='ac-text'>";
                                                infoD += "<div class='my-0 '><table class='table table-sm table-bordered my-0' style='border-color: #00000021;'><thead class='bg-light'>\
                                                <tr>\
                                                    <th rowspan='2' class='bg-pastel-5 text-dark text-center align-middle'>Satuan</th>\
                                                    <th colspan='3' class='bg-pastel-5 text-dark text-center align-middle'>Fisik</th>\
                                                    <th colspan='3'class='bg-pastel-5 text-dark text-center align-middle'>Keuangan</th>\
                                                </tr>\
                                                <tr>\
                                                    <th class='bg-pastel-5 text-dark text-center' style=width:10%'>Volume</th>\
                                                    <th class='bg-pastel-5 text-dark text-center' style='width:10%'>Realisasi</th>\
                                                    <th class='bg-pastel-5 text-dark text-center' style='width:10%'>Capaian(%)</th>\
                                                    <th class='bg-pastel-5 text-dark text-center' style=width:20%'>Alokasi</th>\
                                                    <th class='bg-pastel-5 text-dark text-center' style='width:20%'>Realisasi</th>\
                                                    <th class='bg-pastel-5 text-dark text-center' style='width:10%'>Capaian(%)</th>\
                                                </tr></thead><tbody>";
                                                $.each(refIndikatorData, function (q, refIndikatorData) {
                                                    infoD += "<tr class='bg-light'><td>" + refIndikatorData.satuan + "</td><td class='text-end'>" + v.target + "</td><td class='text-end'>" + (isNaN(v.target) ? v.target : Math.floor(v.target * v.capaian_fisik / 100)) + "</td><td class='text-end'>" + v.capaian_fisik + "</td><td class='text-end'>" + numeral(v.alokasi).format("0,0") + "</td><td class='text-end'>" + numeral(v.realisasi).format("0,0") + "</td><td class='text-end'>" + v.capaian + "</td></tr>";
                                                });
                                                infoD += "</tbody></table>";
                                                infoD += "</div>";
                                                infoD += "</article>"
                                                infoD += "</div>";
                                            });
                                            // infoD+="</ul";
                                            infoD += "</article>"
                                            infoD += "</div>"
                                        });
                                        infoD += "</article>"
                                        infoD += "</div>"
                                    });
                                    infoD += "</article>"
                                    infoD += "</div>"
                                });
                                infoD += "</article>"
                                infoD += "</div>"
                            });
                            infoD += "</article>";
                            infoD += "</div>";
                        });
                        infoD += "</article>"
                        infoD += "</div>"
                    });
                    infoD += "</article>"
                    infoD += "</div>"
                });
                infoD += "</section>"
                document.getElementById("detail-data").innerHTML = infoD;
                // END OF DETAIL CONTENT
                chartUpdate(aggregateData);
            }
            request();
        }

        function chartUpdate(srcChart) {
            chartMapBarKL.updateOptions({
                xaxis: {
                    categories: grpSumBy(srcChart, 'kementerian', 'grpby')
                },
                series: [
                    {
                        data: grpSumBy(srcChart, 'kementerian', 'alokasi')
                    },
                    {
                        data: grpSumBy(srcChart, 'kementerian', 'realisasi')
                    }
                ]
            });

            chartMapPieKL.updateOptions({
                labels: grpSumBy(srcChart, 'kementerian', 'grpby'),
                series: grpSumBy(srcChart, 'kementerian', 'alokasi')
            });

            chartMapBarIntervensi.updateOptions({
                xaxis: {
                    categories: grpSumBy(srcChart, 'intervensi', 'grpby')
                },
                series: [
                    {
                        data: grpSumBy(srcChart, 'intervensi', 'alokasi')
                    },
                    {
                        data: grpSumBy(srcChart, 'intervensi', 'realisasi')
                    }
                ]
            });

            chartMapPieInt.updateOptions({
                labels: grpSumBy(srcChart, 'intervensi', 'grpby'),
                series: grpSumBy(srcChart, 'intervensi', 'alokasi')
            });

            chartMapCapFisKeu.updateOptions({
                xaxis: {
                    categories: grpSumBy(srcChart, 'tahun', 'grpby')
                },
                series: [
                    {
                        data: grpSumBy(srcChart, 'tahun', 'alokasi')
                    },
                    {
                        data: grpSumBy(srcChart, 'tahun', 'capaian_keuangan')
                    },
                    {
                        data: grpSumBy(srcChart, 'tahun', 'capaian_fisik')
                    }
                ]
            });

            chartMapCapInt.updateOptions({
                xaxis: {
                    categories: grpSumBy(srcChart, 'intervensi', 'grpby')
                },
                series: [
                    {
                        data: grpSumBy(srcChart, 'intervensi', 'alokasi')
                    },
                    {
                        data: grpSumBy(srcChart, 'intervensi', 'capaian_keuangan')
                    },
                    {
                        data: grpSumBy(srcChart, 'intervensi', 'capaian_fisik')
                    }
                ]
            });
        }

        function findRef(data, target) {
            var _data = data[data.findIndex(d => d.id == target)];
            return _data;
        }

        function grpSumBy(arr, grpby, item) {
            var result = [];
            var d = [];
            arr.reduce(function (res, value) {
                if (!res[value[grpby]]) {
                    res[value[grpby]] = { grpby: value[grpby], alokasi: 0, realisasi: 0, capaian_keuangan: 0, jumlah: 0, jfis: 0, capaian_fisik: 0 };
                    result.push(res[value[grpby]])
                }
                res[value[grpby]].alokasi += value['alokasi'];
                res[value[grpby]].realisasi += value['realisasi'];
                res[value[grpby]].capaian_keuangan = (res[value[grpby]].realisasi / res[value[grpby]].alokasi) * 100;
                res[value[grpby]].jumlah += 1;
                res[value[grpby]].jfis += value['capaian_fisik'];
                res[value[grpby]].capaian_fisik = res[value[grpby]].jfis / res[value[grpby]].jumlah;
                return res;
            }, {});

            result.forEach(items => {
                d.push(items[item])
            });
            return d
        }

        const getValue = value => (typeof value === 'string' ? value.toUpperCase() : value);
        function filterPlainArray(array, filters) {
            const filterKeys = Object.keys(filters);
            return array.filter(item => {
                // validates all filter criteria
                return filterKeys.every(key => {
                    // ignores an empty filter
                    if (!filters[key].length) return true;
                    //return filters[key].find(filter => getValue(filter) == getValue(item[key]));
                    return filters[key].find(filter => (typeof filter === 'string' ? filter.toUpperCase() : filter) == (typeof item[key] === 'string' ? item[key].toUpperCase() : item[key]));
                });
            });
        }

        $('.selectpicker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
            geojsonLayer.clearLayers();
            updateSelectedStates();
            geojsonLayer.addData(geoData);
            sidebar.hide()
        });

        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl)
        });
        //$("#myTab").removeClass("hide");
        document.getElementById("myTab").classList.remove("hide");
        document.getElementById("drp_option").classList.remove("hide");
    }
};
export default KinerjaAnggaran;
