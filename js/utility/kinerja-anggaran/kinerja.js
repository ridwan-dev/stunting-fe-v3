var
   popUp,
   c_main = "bg-none",
   c_kl = "bg-lime-600",
   c_inv = "bg-red-600",
   c_prog = "bg-indigo-600",
   c_keg = "bg-teal-600",
   c_kro = "bg-orange-600",
   color_ro = "bg-yellow-600",
   c_inv = "bg-gray-600",
   color1 = "#4285f4",
   color1a = "white",
   color2 = "#ff9800",
   color2a = "black",
   color3 = "#909090",
   color3a = "white",
   color4 = "#fecf4a",
   color4a = "black",
   color5 = "#33a853",
   color5a = "white"
   ;

function checkValue(value, hasil) {
   let val = ((typeof value == 'undefined') || (value === null) || (value == '')) ? hasil : value;
   return val;
}
function fCurrency(value, hasil) {
   let val = ((typeof value == 'undefined') || (value === null) || (value == '')) ? hasil : parseInt(value).toLocaleString("id").split(",")[0];
   return val;
}
function vpersen(xnilai) {
   var hasil = (xnilai * parseFloat(100)).toFixed(2);
   return badgeWarnaPersentase(xnilai, hasil);
}
function badgeWarnaPersentase(xnilai, hasil) {
   let warna,
      cstyle,
      nilai = (xnilai * 100);
   if (nilai > 90) {
      warna = color1;
      cstyle = "background:" + color1 + ";color:" + color1a;
   } else if (((nilai >= 71) && (nilai < 90))) {
      warna = color2;
      cstyle = "background:" + color2 + ";color:" + color2a;
   } else if (((nilai >= 51) && (nilai < 71))) {
      warna = color3;
      cstyle = "background:" + color3 + ";color:" + color3a;
   } else if (((nilai >= 30) && (nilai < 51))) {
      warna = color4;
      cstyle = "background:" + color4 + ";color:" + color4a;
   } else {
      warna = color5;
      cstyle = "background:" + color5 + ";color:" + color5a;
   }
   return '<div class="badge" style="' + cstyle + '"><span class="px-2"  >' + hasil + '</span></div>';
}
function upDown(value, nilai_awal) {
   let hasil,
      ntitle = (value - nilai_awal),
      mtitle = fCurrency(ntitle, 0),
      xtitle = (ntitle > 0) ? "+" + mtitle : mtitle
      ;
   if (nilai_awal > value) {
      hasil = '<span ><i class="ion ion-md-arrow-down fa-2x fa-fw pull-right m-r-10  f-s-15 text-pink-darker"  ' +
         'title="' + xtitle + '" ></i>' + fCurrency(value, 0) + '</span>';
   } else if (nilai_awal < value) {
      hasil = '<span ><i  data-toggle="popover" class="popoverOption ion ion-md-arrow-up fa-2x fa-fw pull-right m-r-10  f-s-15 text-lime-darker" ' +
         'title="' + xtitle + '" ></i>' + fCurrency(value, 0) +
         '<span class="hide">' + xtitle + '</span>';
      '</span>';
   } else {
      hasil = '<span style="padding-right: 2em;">' + fCurrency(value, 0) + '</span >';
   }
   return hasil;
}

function yesNo(value) {
   let hasil;
   if (value === "") {
      hasil = "";
   } else if (value) {
      hasil = '<i class="material-icons align-middle f-s-21 text-lime-600" title="Ya">task_alt</i>';
   } else {
      hasil = '<i class="material-icons align-middle fa-2x fa-fw  m-r-10  f-s-21 text-pink-600" title="Tidak" >close</i>';
   }
   return hasil;
}
function stringOrCurrency(value) {
   let hasil;
   if (isNaN(parseInt(value))) {
      hasil = value;
   } else {
      hasil = fCurrency(value, 0);
   }
   return hasil;
}

function htmlWrapFormatter(cell, formatterParams, onRendered) {
   cell.getElement().style.whiteSpace = "pre-wrap";
   return this.emptyToSpace(cell.getValue());
}

/* PAGE Kinerja Anggaran */
function kinerjaAnggaranChart(datax) {
   var handleDataX = function () {
      "use strict";
      grafikPage2Tab1(datax, sortData(), 'kementerian_kode');
      grafikPage2Tab2(datax, sortData(), 'kementerian_kode');
      grafikPage2Tab3(datax, sortData(), 'kementerian_kode');
      grafikPage2Tab4(datax, sortData(), 'kementerian_kode');

      $("#sortByKL").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab1(datax, sortData(), 'kementerian_kode');
      });
      $("#sortByRO").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab1(datax, sortData(), 'jml_ro');
      });
      $("#sortByDR").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab1(datax, sortData(), 'alokasi_0');
      });
      $("#sortByPA").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab1(datax, sortData(), 'alokasi_1');
      });
      $("#sortByPH").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab1(datax, sortData(), 'alokasi_2');
      });
      $("#sortByR").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab1(datax, sortData(), 'alokasi_realisasi');
      });

      /*page2-TAB2*/
      $("#sortByKL12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab2(datax, sortData(), 'kementerian_kode');
      });
      $("#sortByDR12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab2(datax, sortData(), 'alokasi_0');
      });
      $("#sortByPA12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab2(datax, sortData(), 'alokasi_1');
      });
      $("#sortByPH12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab2(datax, sortData(), 'alokasi_2');
      });
      $("#sortByR12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab2(datax, sortData(), 'alokasi_realisasi');
      });
      $("#sortByRO12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab2(datax, sortData(), 'jml_ro');
      });

      /*page2-TAB3*/
      $("#sortByKL2").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab3(datax, sortData(), 'kementerian_kode');
      });
      $("#sortByDR2").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab3(datax, sortData(), 'anl_alokasi_0');
      });
      $("#sortByPA2").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab3(datax, sortData(), 'anl_alokasi_1');
      });
      $("#sortByPH2").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab3(datax, sortData(), 'anl_alokasi_2');
      });
      $("#sortByR2").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab3(datax, sortData(), 'anl_alokasi_realisasi');
      });
      $("#sortByRO2").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab3(datax, sortData(), 'jml_ro');
      });

      /*page2-TAB4*/
      $("#sortByKL22").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab4(datax, sortData(), 'kementerian_kode');
      });
      $("#sortByDR22").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab4(datax, sortData(), 'anl_alokasi_0');
      });
      $("#sortByPA22").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab4(datax, sortData(), 'anl_alokasi_1');
      });
      $("#sortByPH22").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab4(datax, sortData(), 'anl_alokasi_2');
      });
      $("#sortByR22").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab4(datax, sortData(), 'anl_alokasi_realisasi');
      });
      $("#sortByRO22").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage2Tab4(datax, sortData(), 'jml_ro');
      });

   };
   var dataGrafik = function () {
      "use strict";
      return {
         //main function
         init: function () {
            handleDataX();
         }
      };
   }();
   $(document).ready(function () {
      dataGrafik.init();
   });
}

/* Chart untuk sheet 1 dan 2 */
function penandaanPagu(datax) {
   var handleDataX = function () {
      "use strict";
      grafikPage1Tab1(datax, sortData(), 'kementerian_kode');
      grafikPage1Tab2(datax, sortData(), 'kementerian_kode');

      $("#sortByKL11").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab1(datax, sortData(), 'kementerian_kode');
      });
      $("#sortByDR11").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab1(datax, sortData(), 'alokasi_0');
      });
      $("#sortByPA11").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab1(datax, sortData(), 'alokasi_2');
      });
      $("#sortByPH11").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab1(datax, sortData(), 'anl_alokasi');
      });
      $("#sortByRO11").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab1(datax, sortData(), 'roGabung');
      });

      /*page2-TAB2*/
      $("#sortByKL12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab2(datax, sortData(), 'kementerian_kode');
      });
      $("#sortByDR12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab2(datax, sortData(), 'alokasi_0');
      });
      $("#sortByPA12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab2(datax, sortData(), 'alokasi_2');
      });
      $("#sortByPH12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab2(datax, sortData(), 'anl_alokasi');
      });
      $("#sortByRO12").on("click", function () {
         tombolUbah(this, sortData());
         grafikPage1Tab2(datax, sortData(), 'roGabung');
      });
   };
   var dataGrafik = function () {
      "use strict";
      return {
         //main function
         init: function () {
            handleDataX();
         }
      };
   }();

   $(document).ready(function () {
      dataGrafik.init();
   });


}

/*Chart Kinerja Anggaran*/
function grafikPage2Tab1(datax, urutan, field_urutan) {
   //console.log("dataxee",datax);
   if (datax) {
      let cdata = { "data": datax },
         chartData = [],
         lineSeriesData = [],
         isVertical = false,
         maxData = cdata.data.maxAmount;
      cdata.data = cdata.data.result;
      //console.log("cdata.data",cdata.data);
      var lagend_ro =
         '<span class="btn btn-xs btn-icon btn-circle bg-blue" style="margin-left:11px;"></span> RO Spesifik' +
         '<span class="btn btn-xs btn-icon btn-circle bg-red" style="margin-left:11px;"></span> RO Sensitif' +
         '<span class="btn btn-xs btn-icon btn-circle bg-green" style="margin-left:11px;"></span> RO Dukungan'
         ;
      $(".lagend_name1").remove();
      if (cdata.data.length > 5) {
         isVertical = true;
         document.getElementById('chartdiv').style.height = "3000px";
      } else {
         isVertical = false;
         document.getElementById('chartdiv').style.height = "600px";
      }
      $("#chartdiv").after('<div class="lagend_name1" style="color: black;margin: 0 33%;">' + lagend_ro + '</div >');

      am4core.ready(function () {
         var chart = am4core.create("chartdiv", am4charts.XYChart);

         // some extra padding for range labels
         chart.paddingBottom = 50;
         chart.colors.step = 3;
         // will use this to store colors of the same items
         var colors = {};

         if (isVertical) {
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
         } else {
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
         }
         categoryAxis.dataFields.category = "category";
         categoryAxis.renderer.minGridDistance = 60;
         categoryAxis.renderer.grid.template.location = 0;
         categoryAxis.renderer.opposite = false;

         if (field_urutan == 'kementerian_kode') {
            categoryAxis.dataItems.template.text = "{intervensi_nama} ";
         } else {
            categoryAxis.dataItems.template.text = "{kementerian_nama_short} - {intervensi_nama}";
         }

         categoryAxis.renderer.grid.template.disabled = true;
         categoryAxis.renderer.minGridDistance = 1;
         categoryAxis.groupData = true;
         categoryAxis.cursorTooltipEnabled = false;

         if (isVertical) {
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
         }

         // valueAxis.tooltip.disabled = true;
         valueAxis.min = 0;
         //valueAxis.max = 8000000;
         valueAxis.max = maxData;
         //valueAxis.max = maxData * 1.01;
         valueAxis.strictMinMax = true;
         valueAxis.title.text = "Alokasi dalam jutaan, Rupiah";
         valueAxis.renderer.grid.template.strokeWidth = 0;
         //valueAxis.renderer.labels.template.disabled = true;
         valueAxis.renderer.baseGrid.disabled = true;

         createSeries('alokasi_0', 'Pagu Dalam Ringkasan Dokumen', true);
         createSeries('alokasi_1', 'Pagu Awal');
         createSeries('alokasi_2', 'Pagu Harian');
         createSeries('alokasi_realisasi', 'Realisasi');

         // second value axis for quantity
         if (isVertical) {
            var valueAxis2 = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
         }

         valueAxis2.renderer.opposite = true;
         valueAxis2.syncWithAxis = valueAxis;
         valueAxis2.tooltip.disabled = true;

         // Add cursor
         chart.cursor = new am4charts.XYCursor();
         //chart.cursor.behavior = "zoomXY";
         //chart.cursor.lineX.disabled = true;

         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }// Add cursor
         chart.cursor = new am4charts.XYCursor();
         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }

         // quantity line series
         var lineSeries = chart.series.push(new am4charts.LineSeries());
         lineSeries.name = "Jumlah RO";
         if (isVertical) {
            // lineSeries.tooltipText = "{valueX}";
            lineSeries.dataFields.categoryY = "category";
            lineSeries.dataFields.valueX = "jml_ro";
            lineSeries.xAxis = valueAxis2;
         } else {
            // lineSeries.tooltipText = "{valueY}";
            lineSeries.dataFields.categoryX = "category";
            lineSeries.dataFields.valueY = "jml_ro";
            lineSeries.yAxis = valueAxis2;
         }

         // Add a bullet
         var bullet = lineSeries.bullets.push(new am4charts.Bullet());
         var latitudeLabel = lineSeries.bullets.push(new am4charts.LabelBullet());

         latitudeLabel.label.text = "{jml_ro}";
         latitudeLabel.label.horizontalCenter = "left";
         latitudeLabel.label.dx = 14;

         // Add a triangle to act as am arrow
         var arrow = bullet.createChild(am4core.Circle);
         arrow.horizontalCenter = "middle";
         arrow.verticalCenter = "middle";
         arrow.stroke = am4core.color("#FFFF00");
         //arrow.stroke = false;
         arrow.direction = "top";
         arrow.width = 12;
         arrow.height = 12;

         arrow.adapter.add("fill", function (fill, target) {
            if (!target.dataItem) {
               return fill;
            }
            var values = target.dataItem.values;
            if (target.dataItem._dataContext.intervensi_kode == "A") {
               return am4core.color("blue")
            } else if (target.dataItem._dataContext.intervensi_kode == "B") {
               return am4core.color("red")
            } else {
               return am4core.color("green")
            }
         });

         lineSeries.bullets.push(bullet);
         lineSeries.stroke = chart.colors.getIndex(13);
         lineSeries.fill = lineSeries.stroke;
         lineSeries.strokeWidth = 3;
         lineSeries.snapTooltip = false;

         // when data validated, adjust location of data item based on count
         lineSeries.events.on("datavalidated", function () {
            lineSeries.dataItems.each(function (dataItem) {
               // if count divides by two, location is 0 (on the grid)
               if (dataItem.dataContext.count / 2 == Math.round(dataItem.dataContext.count / 2)) {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0);
                  } else {
                     dataItem.setLocation("categoryX", 0);
                  }
               }
               // otherwise location is 0.5 (middle)
               else {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0.5);
                  } else {
                     dataItem.setLocation("categoryX", 0.5);
                  }
               }
            })
         })

         var rangeTemplate = categoryAxis.axisRanges.template;
         rangeTemplate.tick.disabled = false;
         rangeTemplate.tick.location = 0;
         rangeTemplate.tick.strokeOpacity = 0.6;
         rangeTemplate.tick.length = 60;
         rangeTemplate.grid.strokeOpacity = 0.5;
         rangeTemplate.label.tooltip = new am4core.Tooltip();
         rangeTemplate.label.tooltip.dy = -10;
         rangeTemplate.label.cloneTooltip = false;

         var axisBreak = valueAxis.axisBreaks.create();
         //axisBreak.breakSize = 0.005;
         axisBreak.startValue = maxData * 0.12;
         axisBreak.endValue = maxData * 1.2;
         //axisBreak.endValue = valueAxis.max * 0.6;
         //axisBreak.startValue = 5000000;
         /* axisBreak.startValue = 5000000;
         axisBreak.endValue = 70000000; */
         /* axisBreak.startValue = 100000;
         axisBreak.endValue = 70000000; */
         //console.log("ori", maxData);
         //console.log("test1x", maxData * 0.6);

         // fixed axis break
         var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
         //axisBreak.breakSize = 0.3 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
         axisBreak.breakSize = 0.1 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height

         // make break expand on hover
         var hoverState = axisBreak.states.create("hover");
         hoverState.properties.breakSize = 1;
         hoverState.properties.opacity = 0.1;
         hoverState.transitionDuration = 1500;

         axisBreak.defaultState.transitionDuration = 1000;

         cdata.data.forEach(function (dataKementerian, klIndex) {
            // console.log("asdf", dataKementerian);
            var tempArray = [];
            // add items

            dataKementerian.data.forEach(function (intervensiData, intervensiIndex) {
               var count = 0;
               var _data = intervensiData.data;
               for (var data in intervensiData.data) {
                  // console.log("test", data);
                  if (count == 0) {
                     _data.category = dataKementerian.kementerian_nama + "_" + intervensiData.intervensi_nama;
                  }
                  count++;
               }
               _data.prsn_realisasi_dikali = _data.prsn_realisasi * 100;

               tempArray.push(_data)

               //console.log("tempData", tempArray)
               // sort temp array
               /* tempArray.sort(function (a, b) {

                  if (a.value > b.value) {
                     return 1;
                  }
                  else if (a.value < b.value) {
                     return -1
                  }
                  else {
                     return 0;
                  }
               }) */

               // add quantity and count to middle data item (line series uses it)
               // var lineSeriesDataIndex = Math.floor(count / 2);
               // tempArray[lineSeriesDataIndex].jml_ro = intervensiData.data.jml_ro;
               // tempArray[lineSeriesDataIndex].count = count;

               if (intervensiIndex == dataKementerian.data.length - 1) {
                  // push to the final data
                  am4core.array.each(tempArray, function (item) {
                     chartData.push(item);
                  })

                  // create range (the additional label at the bottom)
                  var range = categoryAxis.axisRanges.create();
                  range.category = tempArray[0].category;
                  range.endCategory = tempArray[tempArray.length - 1].category;

                  if (field_urutan == 'kementerian_kode') {
                     range.label.text = tempArray[0].kementerian_nama_short;
                  } else {
                     range.label.text = '';
                  }

                  // range.label.truncate = true;
                  range.label.fontWeight = "bold";
                  range.label.tooltipText = tempArray[0].kementerian_nama_short;
                  if (isVertical) {
                     range.label.rotation = 270;
                     range.label.dx = -95;
                     range.label.dy = 50;
                  } else {
                     range.label.dy = 30;

                  }

                  range.label.adapter.add("maxWidth", function (maxWidth, target) {
                     var range = target.dataItem;
                     var startPosition = categoryAxis.categoryToPosition(range.category, 0);
                     var endPosition = categoryAxis.categoryToPosition(range.endCategory, 1);
                     var startX = categoryAxis.positionToCoordinate(startPosition);
                     var endX = categoryAxis.positionToCoordinate(endPosition);
                     return endX - startX;
                  })
               }
            })
         })
         //console.log("chartData1 ", chartData);
         /* chartData.sort(function (a, b) {
            chartData = a.kementerian_nama_short.localeCompare(b.kementerian_nama_short);
         });
         console.log("chartData2 ", chartData); */
         var hasilnya;
         if (urutan) {
            hasilnya = chartData.sort(GetSortOrderDesc(field_urutan));
         }
         else {
            hasilnya = chartData.sort(GetSortOrderAsc(field_urutan));
         }

         chart.data = hasilnya;

         // last tick
         //console.log("ooo", chart.data[chart.data.length - 1]);
         var InTial = (typeof chart.data[chart.data.length - 1] === 'undefined') ? ' ' : chart.data[chart.data.length - 1].category;
         var range = categoryAxis.axisRanges.create();
         range.category = InTial;
         range.label.disabled = true;
         range.tick.location = 1;
         range.grid.location = 1;

         chart.legend = new am4charts.Legend();
         chart.legend.marginTop = 40;
         /*  if (isVertical)
             chart.legend.position = "bottom";
          else
             chart.legend.position = "right"; */

         chart.legend.position = "bottom";
         chart.legend.labels.template.truncate = false;
         // chart.legend.labels.template.text = "[{color}]{intervensi_nama}[/]";

         function createSeries(value, name, createTooltip = false) {
            var series = chart.series.push(new am4charts.ColumnSeries())
            if (isVertical) {
               series.dataFields.valueX = value
               series.dataFields.categoryY = 'category'
            } else {
               series.dataFields.valueY = value
               series.dataFields.categoryX = 'category'
            }

            series.name = name
            if (createTooltip) {
               series.tooltipText = `
                  Tingkat Output
                  [bold]{kementerian_nama}[/] - {intervensi_nama}
                  Total RO : [bold]{jml_ro} RO[/]
                  Pagu Ringkasan Dokumen : Rp. [bold]{alokasi_0.formatNumber('#,###.')}[/]
                  Pagu Awal : [bold]Rp. {alokasi_1.formatNumber('#,###.')}[/]
                  Pagu Harian : [bold]Rp. {alokasi_2.formatNumber('#,###.')}[/]
                  Realisasi : [bold]Rp. {alokasi_realisasi.formatNumber('#,###.')} ({prsn_realisasi_dikali.formatNumber('#,###.')} %)[/]`;
            }

            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#fff");
            series.tooltip.label.fill = am4core.color("#00");

            // Prevent cross-fading of tooltips
            series.tooltip.defaultState.transitionDuration = 0;
            series.tooltip.hiddenState.transitionDuration = 0;

            //console.log('value', valueX);
            //console.log('valueX.value', valueX.value);
            if (value == 'alokasi_realisasi') {
               var bullet = series.bullets.push(new am4charts.LabelBullet())
               bullet.interactionsEnabled = false
               //bullet.dx = -10;
               bullet.label.horizontalCenter = "right";
               bullet.label.dx = 170;
               bullet.label.text = "Realisasi : [bold]Rp. {alokasi_realisasi.formatNumber('#,###.')} ({prsn_realisasi_dikali.formatNumber('#,###.')} %)[/]"
               bullet.label.fill = am4core.color('#242b30')
               bullet.label.hideOversized = false;
               bullet.label.truncate = false;
            }
            series;
         }

      });
      // end am4core.ready()
   }
   return false;
}
function grafikPage2Tab2(datax, urutan, field_urutan) {

   if (datax) {
      let cdata = { "data": datax },
         chartData2 = [],
         lineSeriesData = [],
         isVertical = false,
         maxData = cdata.data.maxAmount;
      cdata.data = cdata.data.result;

      var lagend_ro =
         '<span class="btn btn-xs btn-icon btn-circle bg-blue" style="margin-left:11px;"></span> RO Spesifik' +
         '<span class="btn btn-xs btn-icon btn-circle bg-red" style="margin-left:11px;"></span> RO Sensitif' +
         '<span class="btn btn-xs btn-icon btn-circle bg-green" style="margin-left:11px;"></span> RO Dukungan'
         ;
      $(".lagend_name12").remove();
      if (cdata.data.length > 5) {
         isVertical = true;
         document.getElementById('chartdiv12').style.height = "1500px";
      } else {
         isVertical = false;
         document.getElementById('chartdiv12').style.height = "600px";
      }
      $("#chartdiv12").after('<div class="lagend_name12" style="color: black;margin: 0 33%;">' + lagend_ro + '</div >');

      am4core.ready(function () {
         var chart = am4core.create("chartdiv12", am4charts.XYChart);

         // some extra padding for range labels
         chart.paddingBottom = 50;
         chart.colors.step = 3;
         // will use this to store colors of the same items
         var colors = {};

         if (isVertical) {
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
         } else {
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
         }
         categoryAxis.dataFields.category = "category";
         categoryAxis.renderer.minGridDistance = 60;
         categoryAxis.renderer.grid.template.location = 0;
         categoryAxis.renderer.opposite = false;
         categoryAxis.dataItems.template.text = "{category}";

         categoryAxis.renderer.grid.template.disabled = true;
         categoryAxis.renderer.minGridDistance = 1;
         categoryAxis.groupData = true;
         categoryAxis.cursorTooltipEnabled = false;

         if (isVertical) {
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
         }

         // valueAxis.tooltip.disabled = true;
         valueAxis.min = 0;
         //valueAxis.max = 8000000;
         valueAxis.max = maxData;
         //valueAxis.max = maxData * 1.01;
         valueAxis.strictMinMax = true;
         valueAxis.title.text = "Alokasi dalam jutaan, Rupiah";
         valueAxis.renderer.grid.template.strokeWidth = 0;
         //valueAxis.renderer.labels.template.disabled = true;
         valueAxis.renderer.baseGrid.disabled = true;

         createSeries('alokasi_0', 'Pagu Dalam Ringkasan Dokumen', true);
         createSeries('alokasi_1', 'Pagu Awal');
         createSeries('alokasi_2', 'Pagu Harian');
         createSeries('alokasi_realisasi', 'Realisasi');

         // second value axis for quantity
         if (isVertical) {
            var valueAxis2 = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
         }

         valueAxis2.renderer.opposite = true;
         valueAxis2.syncWithAxis = valueAxis;
         valueAxis2.tooltip.disabled = true;

         // Add cursor
         chart.cursor = new am4charts.XYCursor();

         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }// Add cursor
         chart.cursor = new am4charts.XYCursor();
         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }

         // quantity line series
         var lineSeries = chart.series.push(new am4charts.LineSeries());
         lineSeries.name = "Jumlah RO";
         if (isVertical) {
            // lineSeries.tooltipText = "{valueX}";
            lineSeries.dataFields.categoryY = "category";
            lineSeries.dataFields.valueX = "jml_ro";
            lineSeries.xAxis = valueAxis2;
         } else {
            // lineSeries.tooltipText = "{valueY}";
            lineSeries.dataFields.categoryX = "category";
            lineSeries.dataFields.valueY = "jml_ro";
            lineSeries.yAxis = valueAxis2;
         }

         // Add a bullet
         var bullet = lineSeries.bullets.push(new am4charts.Bullet());
         var latitudeLabel = lineSeries.bullets.push(new am4charts.LabelBullet());

         latitudeLabel.label.text = "{jml_ro}";
         latitudeLabel.label.horizontalCenter = "left";
         latitudeLabel.label.dx = 14;

         // Add a triangle to act as am arrow
         var arrow = bullet.createChild(am4core.Circle);
         arrow.horizontalCenter = "middle";
         arrow.verticalCenter = "middle";
         arrow.stroke = am4core.color("#FFFF00");
         //arrow.stroke = false;
         arrow.direction = "top";
         arrow.width = 12;
         arrow.height = 12;

         arrow.adapter.add("fill", function (fill, target) {
            if (!target.dataItem) {
               return fill;
            }
            var values = target.dataItem.values;
            if (target.dataItem._dataContext.intervensi_kode == "A") {
               return am4core.color("blue")
            } else if (target.dataItem._dataContext.intervensi_kode == "B") {
               return am4core.color("red")
            } else {
               return am4core.color("green")
            }
         });

         lineSeries.bullets.push(bullet);
         lineSeries.stroke = chart.colors.getIndex(13);
         lineSeries.fill = lineSeries.stroke;
         lineSeries.strokeWidth = 3;
         lineSeries.snapTooltip = false;

         // when data validated, adjust location of data item based on count
         lineSeries.events.on("datavalidated", function () {
            lineSeries.dataItems.each(function (dataItem) {
               // if count divides by two, location is 0 (on the grid)
               if (dataItem.dataContext.count / 2 == Math.round(dataItem.dataContext.count / 2)) {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0);
                  } else {
                     dataItem.setLocation("categoryX", 0);
                  }
               }
               // otherwise location is 0.5 (middle)
               else {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0.5);
                  } else {
                     dataItem.setLocation("categoryX", 0.5);
                  }
               }
            })
         })

         var rangeTemplate = categoryAxis.axisRanges.template;
         rangeTemplate.tick.disabled = false;
         rangeTemplate.tick.location = 0;
         rangeTemplate.tick.strokeOpacity = 0.6;
         rangeTemplate.tick.length = 60;
         rangeTemplate.grid.strokeOpacity = 0.5;
         rangeTemplate.label.tooltip = new am4core.Tooltip();
         rangeTemplate.label.tooltip.dy = -10;
         rangeTemplate.label.cloneTooltip = false;

         var axisBreak = valueAxis.axisBreaks.create();
         //axisBreak.breakSize = 0.005;
         axisBreak.startValue = maxData * 0.12;
         axisBreak.endValue = maxData * 1.2;

         // fixed axis break
         var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
         //axisBreak.breakSize = 0.3 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
         axisBreak.breakSize = 0.1 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height

         // make break expand on hover
         var hoverState = axisBreak.states.create("hover");
         hoverState.properties.breakSize = 1;
         hoverState.properties.opacity = 0.1;
         hoverState.transitionDuration = 1500;

         axisBreak.defaultState.transitionDuration = 1000;
         //console.log('sini', cdata.data);

         var susun_data = [];
         cdata.data.forEach(function (dataKementerian, klIndex) {

            var tempArrayx = [],
               alokasi_0 = 0,
               alokasi_1 = 0,
               alokasi_2 = 0,
               alokasi_realisasi = 0,
               jml_ro = 0;
            dataKementerian.data.forEach(function (intervensiData, intervensiIndex) {
               //console.log("intervensiData", intervensiData);
               var count = 0;
               var _data = intervensiData.data;

               alokasi_0 += _data.alokasi_0;
               alokasi_1 += _data.alokasi_1;
               alokasi_2 += _data.alokasi_2;
               alokasi_realisasi += _data.alokasi_realisasi;
               jml_ro += _data.jml_ro;
               tempArrayx.push(_data);
            });

            var dataxxx = {
               'category': dataKementerian.data[0].data.kementerian_nama_short,
               'kementerian_nama': dataKementerian.kementerian_nama,
               'kementerian_kode': dataKementerian.kementerian_kode,
               'kementerian_nama': dataKementerian.kementerian_nama,
               'alokasi_0': alokasi_0,
               'alokasi_1': alokasi_1,
               'alokasi_2': alokasi_2,
               'alokasi_realisasi': alokasi_realisasi,
               'prsn_realisasi': (alokasi_realisasi / alokasi_2) * 100,
               'jml_ro': jml_ro
            };
            susun_data.push(dataxxx);
         });

         var hasilnya;
         if (urutan) {
            hasilnya = susun_data.sort(GetSortOrderDesc(field_urutan));
         }
         else {
            hasilnya = susun_data.sort(GetSortOrderAsc(field_urutan));
         }

         chart.data = hasilnya;
         chart.legend = new am4charts.Legend();
         chart.legend.marginTop = 40;
         /* if (isVertical)
            chart.legend.position = "bottom";
         else
            chart.legend.position = "right"; */

         chart.legend.position = "bottom";
         function createSeries(value, name, createTooltip = false) {
            var series = chart.series.push(new am4charts.ColumnSeries())
            if (isVertical) {
               series.dataFields.valueX = value
               series.dataFields.categoryY = 'category'
            } else {
               series.dataFields.valueY = value
               series.dataFields.categoryX = 'category'
            }

            series.name = name
            if (createTooltip) {
               series.tooltipText = `
                  Tingkat Output
                  [bold]{kementerian_nama}[/] 
                  Total RO : [bold]{jml_ro} RO[/]
                  Pagu Ringkasan Dokumen : Rp. [bold]{alokasi_0.formatNumber('#,###.')}[/]
                  Pagu Awal : [bold]Rp. {alokasi_1.formatNumber('#,###.')}[/]
                  Pagu Harian : [bold]Rp. {alokasi_2.formatNumber('#,###.')}[/]
                  Realisasi : [bold]Rp. {alokasi_realisasi.formatNumber('#,###.')} ({prsn_realisasi.formatNumber('#,###.')} %)[/]`;
            }

            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#fff");
            series.tooltip.label.fill = am4core.color("#00");

            // Prevent cross-fading of tooltips
            series.tooltip.defaultState.transitionDuration = 0;
            series.tooltip.hiddenState.transitionDuration = 0;

            if (value == 'alokasi_realisasi') {
               var bullet = series.bullets.push(new am4charts.LabelBullet())
               bullet.interactionsEnabled = false
               //bullet.dx = -10;
               bullet.label.horizontalCenter = "right";
               bullet.label.dx = 170;
               bullet.label.text = "Realisasi : [bold]Rp. {alokasi_realisasi.formatNumber('#,###.')} ({prsn_realisasi.formatNumber('#,###.')} %)[/]"
               bullet.label.fill = am4core.color('#242b30')
               bullet.label.hideOversized = false;
               bullet.label.truncate = false;
            }
            series;
         }

      });
      // end am4core.ready()
   }
   return false;
}
function grafikPage2Tab3(datax, urutan, field_urutan) {

   if (datax) {
      let cdata = { "data": datax },
         chartData = [],
         lineSeriesData = [],
         isVertical = false,
         maxData = cdata.data.maxAmount;
      cdata.data = cdata.data.result;

      var lagend_ro =
         '<span class="btn btn-xs btn-icon btn-circle bg-blue" style="margin-left:11px;"></span> RO Spesifik' +
         '<span class="btn btn-xs btn-icon btn-circle bg-red" style="margin-left:11px;"></span> RO Sensitif' +
         '<span class="btn btn-xs btn-icon btn-circle bg-green" style="margin-left:11px;"></span> RO Dukungan'
         ;
      $(".lagend_name2").remove();
      if (cdata.data.length > 5) {
         isVertical = true;
         document.getElementById('chartdiv3').style.height = "3000px";
      } else {
         isVertical = false;
         document.getElementById('chartdiv3').style.height = "600px";
      }
      $("#chartdiv3").after('<div class="lagend_name2" style="color: black;margin: 0 33%;">' + lagend_ro + '</div >');

      am4core.ready(function () {
         var chart = am4core.create("chartdiv3", am4charts.XYChart);

         // some extra padding for range labels
         chart.paddingBottom = 50;
         chart.colors.step = 3;
         // will use this to store colors of the same items
         var colors = {};

         if (isVertical) {
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
         } else {
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
         }
         categoryAxis.dataFields.category = "category";
         categoryAxis.renderer.minGridDistance = 60;
         categoryAxis.renderer.grid.template.location = 0;
         categoryAxis.renderer.opposite = false;

         if (field_urutan == 'kementerian_kode') {
            categoryAxis.dataItems.template.text = "{intervensi_nama}";
         } else {
            categoryAxis.dataItems.template.text = "{kementerian_nama_short} - {intervensi_nama}";
         }

         categoryAxis.renderer.grid.template.disabled = true;
         categoryAxis.renderer.minGridDistance = 1;
         categoryAxis.groupData = true;
         categoryAxis.cursorTooltipEnabled = false;

         if (isVertical) {
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
         }

         // valueAxis.tooltip.disabled = true;
         valueAxis.min = 0;
         //valueAxis.max = 8000000;
         valueAxis.max = maxData;
         //valueAxis.max = maxData * 1.01;
         valueAxis.strictMinMax = true;
         valueAxis.title.text = "Alokasi dalam jutaan, Rupiah";
         valueAxis.renderer.grid.template.strokeWidth = 0;
         //valueAxis.renderer.labels.template.disabled = true;
         valueAxis.renderer.baseGrid.disabled = true;

         createSeries('anl_alokasi_0', 'Pagu Dalam Ringkasan Dokumen', true);
         createSeries('anl_alokasi_1', 'Pagu Awal');
         createSeries('anl_alokasi_2', 'Pagu Harian');
         createSeries('anl_alokasi_realisasi', 'Realisasi');

         // second value axis for quantity
         if (isVertical) {
            var valueAxis2 = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
         }

         valueAxis2.renderer.opposite = true;
         valueAxis2.syncWithAxis = valueAxis;
         valueAxis2.tooltip.disabled = true;

         // Add cursor
         chart.cursor = new am4charts.XYCursor();
         //chart.cursor.behavior = "zoomXY";
         //chart.cursor.lineX.disabled = true;

         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }// Add cursor
         chart.cursor = new am4charts.XYCursor();
         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }

         // quantity line series
         var lineSeries = chart.series.push(new am4charts.LineSeries());
         lineSeries.name = "Jumlah RO";
         if (isVertical) {
            // lineSeries.tooltipText = "{valueX}";
            lineSeries.dataFields.categoryY = "category";
            lineSeries.dataFields.valueX = "jml_ro";
            lineSeries.xAxis = valueAxis2;
         } else {
            // lineSeries.tooltipText = "{valueY}";
            lineSeries.dataFields.categoryX = "category";
            lineSeries.dataFields.valueY = "jml_ro";
            lineSeries.yAxis = valueAxis2;
         }

         // Add a bullet
         var bullet = lineSeries.bullets.push(new am4charts.Bullet());
         var latitudeLabel = lineSeries.bullets.push(new am4charts.LabelBullet());

         latitudeLabel.label.text = "{jml_ro}";
         latitudeLabel.label.horizontalCenter = "left";
         latitudeLabel.label.dx = 14;

         // Add a triangle to act as am arrow
         var arrow = bullet.createChild(am4core.Circle);
         arrow.horizontalCenter = "middle";
         arrow.verticalCenter = "middle";
         arrow.stroke = am4core.color("#FFFF00");
         //arrow.stroke = false;
         arrow.direction = "top";
         arrow.width = 12;
         arrow.height = 12;

         arrow.adapter.add("fill", function (fill, target) {
            if (!target.dataItem) {
               return fill;
            }
            var values = target.dataItem.values;
            if (target.dataItem._dataContext.intervensi_kode == "A") {
               return am4core.color("blue")
            } else if (target.dataItem._dataContext.intervensi_kode == "B") {
               return am4core.color("red")
            } else {
               return am4core.color("green")
            }
         });

         lineSeries.bullets.push(bullet);
         lineSeries.stroke = chart.colors.getIndex(13);
         lineSeries.fill = lineSeries.stroke;
         lineSeries.strokeWidth = 3;
         lineSeries.snapTooltip = false;

         // when data validated, adjust location of data item based on count
         lineSeries.events.on("datavalidated", function () {
            lineSeries.dataItems.each(function (dataItem) {
               // if count divides by two, location is 0 (on the grid)
               if (dataItem.dataContext.count / 2 == Math.round(dataItem.dataContext.count / 2)) {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0);
                  } else {
                     dataItem.setLocation("categoryX", 0);
                  }
               }
               // otherwise location is 0.5 (middle)
               else {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0.5);
                  } else {
                     dataItem.setLocation("categoryX", 0.5);
                  }
               }
            })
         })

         var rangeTemplate = categoryAxis.axisRanges.template;
         rangeTemplate.tick.disabled = false;
         rangeTemplate.tick.location = 0;
         rangeTemplate.tick.strokeOpacity = 0.6;
         rangeTemplate.tick.length = 60;
         rangeTemplate.grid.strokeOpacity = 0.5;
         rangeTemplate.label.tooltip = new am4core.Tooltip();
         rangeTemplate.label.tooltip.dy = -10;
         rangeTemplate.label.cloneTooltip = false;

         var axisBreak = valueAxis.axisBreaks.create();
         //axisBreak.breakSize = 0.005;
         axisBreak.startValue = maxData * 0.12;
         axisBreak.endValue = maxData * 1.2;
         //axisBreak.endValue = valueAxis.max * 0.6;
         //axisBreak.startValue = 5000000;
         /* axisBreak.startValue = 5000000;
         axisBreak.endValue = 70000000; */
         /* axisBreak.startValue = 100000;
         axisBreak.endValue = 70000000; */
         //console.log("ori", maxData);
         //console.log("test1x", maxData * 0.6);

         // fixed axis break
         var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
         //axisBreak.breakSize = 0.3 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
         axisBreak.breakSize = 0.1 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height

         // make break expand on hover
         var hoverState = axisBreak.states.create("hover");
         hoverState.properties.breakSize = 1;
         hoverState.properties.opacity = 0.1;
         hoverState.transitionDuration = 1500;

         axisBreak.defaultState.transitionDuration = 1000;

         cdata.data.forEach(function (dataKementerian, klIndex) {
            // console.log("asdf", dataKementerian);
            var tempArray = [];
            // add items

            dataKementerian.data.forEach(function (intervensiData, intervensiIndex) {
               var count = 0;
               var _data = intervensiData.data;
               for (var data in intervensiData.data) {
                  // console.log("test", data);
                  if (count == 0) {
                     _data.category = dataKementerian.kementerian_nama + "_" + intervensiData.intervensi_nama;
                  }
                  count++;
               }
               _data.prsn_realisasi_dikali = _data.prsn_anl_realisasi * 100;

               tempArray.push(_data)

               //console.log("tempData", tempArray)


               // add quantity and count to middle data item (line series uses it)
               // var lineSeriesDataIndex = Math.floor(count / 2);
               // tempArray[lineSeriesDataIndex].jml_ro = intervensiData.data.jml_ro;
               // tempArray[lineSeriesDataIndex].count = count;

               if (intervensiIndex == dataKementerian.data.length - 1) {
                  // push to the final data
                  am4core.array.each(tempArray, function (item) {
                     chartData.push(item);
                  })

                  // create range (the additional label at the bottom)
                  var range = categoryAxis.axisRanges.create();
                  range.category = tempArray[0].category;
                  range.endCategory = tempArray[tempArray.length - 1].category;

                  if (field_urutan == 'kementerian_kode') {
                     range.label.text = tempArray[0].kementerian_nama_short;
                  } else {
                     range.label.text = '';
                  }

                  // range.label.truncate = true;
                  range.label.fontWeight = "bold";
                  range.label.tooltipText = tempArray[0].kementerian_nama_short;
                  if (isVertical) {
                     range.label.rotation = 270;
                     range.label.dx = -95;
                     range.label.dy = 50;
                  } else {
                     range.label.dy = 30;
                  }

                  range.label.adapter.add("maxWidth", function (maxWidth, target) {
                     var range = target.dataItem;
                     var startPosition = categoryAxis.categoryToPosition(range.category, 0);
                     var endPosition = categoryAxis.categoryToPosition(range.endCategory, 1);
                     var startX = categoryAxis.positionToCoordinate(startPosition);
                     var endX = categoryAxis.positionToCoordinate(endPosition);
                     return endX - startX;
                  })
               }
            })
         });
         var hasilnya;
         if (urutan) {
            hasilnya = chartData.sort(GetSortOrderDesc(field_urutan));
         }
         else {
            hasilnya = chartData.sort(GetSortOrderAsc(field_urutan));
         }
         //console.log("chartData1 ", chartData);

         chart.data = hasilnya;

         // last tick
         var InTial = (typeof chart.data[chart.data.length - 1] === 'undefined') ? ' ' : chart.data[chart.data.length - 1].category;
         var range = categoryAxis.axisRanges.create();
         range.category = InTial;
         range.label.disabled = true;
         range.tick.location = 1;
         range.grid.location = 1;

         chart.legend = new am4charts.Legend();
         chart.legend.marginTop = 40;
         /* if (isVertical)
            chart.legend.position = "bottom";
         else
            chart.legend.position = "right"; */

         chart.legend.position = "bottom";
         chart.legend.labels.template.truncate = false;
         // chart.legend.labels.template.text = "[{color}]{intervensi_nama}[/]";

         function createSeries(value, name, createTooltip = false) {
            var series = chart.series.push(new am4charts.ColumnSeries())
            if (isVertical) {
               series.dataFields.valueX = value
               series.dataFields.categoryY = 'category'
            } else {
               series.dataFields.valueY = value
               series.dataFields.categoryX = 'category'
            }

            series.name = name
            if (createTooltip) {
               series.tooltipText = `
                  Tingkat Analisis Lanjutan
                  [bold]{kementerian_nama}[/] - {intervensi_nama}
                  Total RO : [bold]{jml_ro} RO[/]
                  Pagu Ringkasan Dokumen : Rp. [bold]{anl_alokasi_0.formatNumber('#,###.')}[/]
                  Pagu Awal : [bold]Rp. {anl_alokasi_1.formatNumber('#,###.')}[/]
                  Pagu Harian : [bold]Rp. {anl_alokasi_2.formatNumber('#,###.')}[/]
                  Realisasi : [bold]Rp. {anl_alokasi_realisasi.formatNumber('#,###.')} ({prsn_realisasi_dikali.formatNumber('#,###.')} %)[/]`;
            }

            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#fff");
            series.tooltip.label.fill = am4core.color("#00");

            // Prevent cross-fading of tooltips
            series.tooltip.defaultState.transitionDuration = 0;
            series.tooltip.hiddenState.transitionDuration = 0;

            //console.log('value', valueX);
            //console.log('valueX.value', valueX.value);
            if (value == 'anl_alokasi_realisasi') {
               var bullet = series.bullets.push(new am4charts.LabelBullet())
               bullet.interactionsEnabled = false
               //bullet.dx = -10;
               bullet.label.horizontalCenter = "right";
               bullet.label.dx = 170;
               bullet.label.text = "Realisasi : [bold]Rp. {anl_alokasi_realisasi.formatNumber('#,###.')} ({prsn_realisasi_dikali.formatNumber('#,###.')} %)[/]"
               bullet.label.fill = am4core.color('#242b30')
               bullet.label.hideOversized = false;
               bullet.label.truncate = false;
            }
            series;
         }

      });
      // end am4core.ready()
   }
   return false;
}
function grafikPage2Tab4(datax, urutan, field_urutan) {

   if (datax) {
      let cdata = { "data": datax },
         chartData4 = [],
         lineSeriesData = [],
         isVertical = false,
         maxData = cdata.data.maxAmount;
      cdata.data = cdata.data.result;

      var lagend_ro =
         '<span class="btn btn-xs btn-icon btn-circle bg-blue" style="margin-left:11px;"></span> RO Spesifik' +
         '<span class="btn btn-xs btn-icon btn-circle bg-red" style="margin-left:11px;"></span> RO Sensitif' +
         '<span class="btn btn-xs btn-icon btn-circle bg-green" style="margin-left:11px;"></span> RO Dukungan'
         ;
      $(".lagend_name24").remove();
      if (cdata.data.length > 5) {
         isVertical = true;
         document.getElementById('chartdiv32').style.height = "3000px";
      } else {
         isVertical = false;
         document.getElementById('chartdiv32').style.height = "500px";
      }
      $("#chartdiv32").after('<div class="lagend_name24" style="color: black;margin: 0 33%;">' + lagend_ro + '</div >');

      am4core.ready(function () {
         var chart = am4core.create("chartdiv32", am4charts.XYChart);

         // some extra padding for range labels
         chart.paddingBottom = 50;
         chart.colors.step = 3;
         // will use this to store colors of the same items
         var colors = {};

         if (isVertical) {
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
         } else {
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
         }
         categoryAxis.dataFields.category = "category";
         categoryAxis.renderer.minGridDistance = 60;
         categoryAxis.renderer.grid.template.location = 0;
         categoryAxis.renderer.opposite = false;
         categoryAxis.dataItems.template.text = "{category}";

         categoryAxis.renderer.grid.template.disabled = true;
         categoryAxis.renderer.minGridDistance = 1;
         categoryAxis.groupData = true;
         categoryAxis.cursorTooltipEnabled = false;

         if (isVertical) {
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
         }

         // valueAxis.tooltip.disabled = true;
         valueAxis.min = 0;
         //valueAxis.max = 8000000;
         valueAxis.max = maxData;
         //valueAxis.max = maxData * 1.01;
         valueAxis.strictMinMax = true;
         valueAxis.title.text = "Alokasi dalam jutaan, Rupiah";
         valueAxis.renderer.grid.template.strokeWidth = 0;
         //valueAxis.renderer.labels.template.disabled = true;
         valueAxis.renderer.baseGrid.disabled = true;

         createSeries('anl_alokasi_0', 'Pagu Dalam Ringkasan Dokumen', true);
         createSeries('anl_alokasi_1', 'Pagu Awal');
         createSeries('anl_alokasi_2', 'Pagu Harian');
         createSeries('anl_alokasi_realisasi', 'Realisasi');

         // second value axis for quantity
         if (isVertical) {
            var valueAxis2 = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
         }

         valueAxis2.renderer.opposite = true;
         valueAxis2.syncWithAxis = valueAxis;
         valueAxis2.tooltip.disabled = true;

         // Add cursor
         chart.cursor = new am4charts.XYCursor();
         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }// Add cursor
         chart.cursor = new am4charts.XYCursor();
         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }

         // quantity line series
         var lineSeries = chart.series.push(new am4charts.LineSeries());
         lineSeries.name = "Jumlah RO";
         if (isVertical) {
            // lineSeries.tooltipText = "{valueX}";
            lineSeries.dataFields.categoryY = "category";
            lineSeries.dataFields.valueX = "jml_ro";
            lineSeries.xAxis = valueAxis2;
         } else {
            // lineSeries.tooltipText = "{valueY}";
            lineSeries.dataFields.categoryX = "category";
            lineSeries.dataFields.valueY = "jml_ro";
            lineSeries.yAxis = valueAxis2;
         }

         // Add a bullet
         var bullet = lineSeries.bullets.push(new am4charts.Bullet());
         var latitudeLabel = lineSeries.bullets.push(new am4charts.LabelBullet());

         latitudeLabel.label.text = "{jml_ro}";
         latitudeLabel.label.horizontalCenter = "left";
         latitudeLabel.label.dx = 14;

         // Add a triangle to act as am arrow
         var arrow = bullet.createChild(am4core.Circle);
         arrow.horizontalCenter = "middle";
         arrow.verticalCenter = "middle";
         arrow.stroke = am4core.color("#FFFF00");
         //arrow.stroke = false;
         arrow.direction = "top";
         arrow.width = 12;
         arrow.height = 12;

         arrow.adapter.add("fill", function (fill, target) {
            if (!target.dataItem) {
               return fill;
            }
            var values = target.dataItem.values;
            if (target.dataItem._dataContext.intervensi_kode == "A") {
               return am4core.color("blue")
            } else if (target.dataItem._dataContext.intervensi_kode == "B") {
               return am4core.color("red")
            } else {
               return am4core.color("green")
            }
         });

         lineSeries.bullets.push(bullet);
         lineSeries.stroke = chart.colors.getIndex(13);
         lineSeries.fill = lineSeries.stroke;
         lineSeries.strokeWidth = 3;
         lineSeries.snapTooltip = false;

         // when data validated, adjust location of data item based on count
         lineSeries.events.on("datavalidated", function () {
            lineSeries.dataItems.each(function (dataItem) {
               // if count divides by two, location is 0 (on the grid)
               if (dataItem.dataContext.count / 2 == Math.round(dataItem.dataContext.count / 2)) {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0);
                  } else {
                     dataItem.setLocation("categoryX", 0);
                  }
               }
               // otherwise location is 0.5 (middle)
               else {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0.5);
                  } else {
                     dataItem.setLocation("categoryX", 0.5);
                  }
               }
            })
         })

         var rangeTemplate = categoryAxis.axisRanges.template;
         rangeTemplate.tick.disabled = false;
         rangeTemplate.tick.location = 0;
         rangeTemplate.tick.strokeOpacity = 0.6;
         rangeTemplate.tick.length = 60;
         rangeTemplate.grid.strokeOpacity = 0.5;
         rangeTemplate.label.tooltip = new am4core.Tooltip();
         rangeTemplate.label.tooltip.dy = -10;
         rangeTemplate.label.cloneTooltip = false;

         var axisBreak = valueAxis.axisBreaks.create();
         //axisBreak.breakSize = 0.005;
         axisBreak.startValue = maxData * 0.12;
         axisBreak.endValue = maxData * 1.2;

         // fixed axis break
         var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
         //axisBreak.breakSize = 0.3 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
         axisBreak.breakSize = 0.1 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height

         // make break expand on hover
         var hoverState = axisBreak.states.create("hover");
         hoverState.properties.breakSize = 1;
         hoverState.properties.opacity = 0.1;
         hoverState.transitionDuration = 1500;

         axisBreak.defaultState.transitionDuration = 1000;

         var susun_data = [];
         cdata.data.forEach(function (dataKementerian, klIndex) {

            var tempArrayx = [],
               anl_alokasi_0 = 0,
               anl_alokasi_1 = 0,
               anl_alokasi_2 = 0,
               anl_alokasi_realisasi = 0,
               jml_ro = 0;
            dataKementerian.data.forEach(function (intervensiData, intervensiIndex) {
               //console.log("intervensiData", intervensiData);
               var count = 0;
               var _data = intervensiData.data;

               anl_alokasi_0 += _data.anl_alokasi_0;
               anl_alokasi_1 += _data.anl_alokasi_1;
               anl_alokasi_2 += _data.anl_alokasi_2;
               anl_alokasi_realisasi += _data.anl_alokasi_realisasi;
               jml_ro += _data.jml_ro;
               tempArrayx.push(_data);
            });

            var dataxxx = {
               'category': dataKementerian.data[0].data.kementerian_nama_short,
               'kementerian_nama': dataKementerian.kementerian_nama,
               'kementerian_kode': dataKementerian.kementerian_kode,
               'anl_alokasi_0': anl_alokasi_0,
               'anl_alokasi_1': anl_alokasi_1,
               'anl_alokasi_2': anl_alokasi_2,
               'anl_alokasi_realisasi': anl_alokasi_realisasi,
               'prsn_anl_realisasi': (anl_alokasi_realisasi / anl_alokasi_2) * 100,
               'jml_ro': jml_ro
            };
            susun_data.push(dataxxx);
         });

         var hasilnya;
         if (urutan) {
            hasilnya = susun_data.sort(GetSortOrderDesc(field_urutan));
         }
         else {
            hasilnya = susun_data.sort(GetSortOrderAsc(field_urutan));
         }

         chart.data = hasilnya;
         chart.legend = new am4charts.Legend();
         chart.legend.marginTop = 40;
         /* if (isVertical)
            chart.legend.position = "bottom";
         else
            chart.legend.position = "right"; */

         chart.legend.position = "bottom";
         chart.legend.labels.template.truncate = false;
         // chart.legend.labels.template.text = "[{color}]{intervensi_nama}[/]";

         function createSeries(value, name, createTooltip = false) {
            var series = chart.series.push(new am4charts.ColumnSeries())
            if (isVertical) {
               series.dataFields.valueX = value
               series.dataFields.categoryY = 'category'
            } else {
               series.dataFields.valueY = value
               series.dataFields.categoryX = 'category'
            }

            series.name = name
            if (createTooltip) {
               series.tooltipText = `
                  Tingkat Analisis Lanjutan
                  [bold]{kementerian_nama}[/]
                  Total RO : [bold]{jml_ro} RO[/]
                  Pagu Ringkasan Dokumen : Rp. [bold]{anl_alokasi_0.formatNumber('#,###.')}[/]
                  Pagu Awal : [bold]Rp. {anl_alokasi_1.formatNumber('#,###.')}[/]
                  Pagu Harian : [bold]Rp. {anl_alokasi_2.formatNumber('#,###.')}[/]
                  Realisasi : [bold]Rp. {anl_alokasi_realisasi.formatNumber('#,###.')} ({prsn_anl_realisasi.formatNumber('#,###.')} %)[/]`;
            }

            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#fff");
            series.tooltip.label.fill = am4core.color("#00");

            // Prevent cross-fading of tooltips
            series.tooltip.defaultState.transitionDuration = 0;
            series.tooltip.hiddenState.transitionDuration = 0;

            if (value == 'anl_alokasi_realisasi') {
               var bullet = series.bullets.push(new am4charts.LabelBullet())
               bullet.interactionsEnabled = false
               //bullet.dx = -10;
               bullet.label.horizontalCenter = "right";
               bullet.label.dx = 170;
               bullet.label.text = "Realisasi : [bold]Rp. {anl_alokasi_realisasi.formatNumber('#,###.')} ({prsn_anl_realisasi.formatNumber('#,###.')} %)[/]"
               bullet.label.fill = am4core.color('#242b30')
               bullet.label.hideOversized = false;
               bullet.label.truncate = false;
            }
            series;
         }

      });
      // end am4core.ready()
   }
   return false;
}
/*End Chart Kinerja Anggaran*/


/*Chart Penandaan Pagu*/
function grafikPage1Tab1(datax, urutan, field_urutan) {

   if (datax) {
      let cdata = { "data": datax },
         chartData = [],
         lineSeriesData = [],
         isVertical = false,
         maxData = cdata.data.maxAmount;
      cdata.data = cdata.data.result;

      var lagend_ro =
         '<span class="btn btn-xs btn-icon btn-circle bg-blue" style="margin-left:11px;"></span> RO Spesifik' +
         '<span class="btn btn-xs btn-icon btn-circle bg-red" style="margin-left:11px;"></span> RO Sensitif' +
         '<span class="btn btn-xs btn-icon btn-circle bg-green" style="margin-left:11px;"></span> RO Dukungan'
         ;
      $(".lagend_nameA").remove();
      if (cdata.data.length > 5) {
         isVertical = true;
         document.getElementById('chartdiv11').style.height = "3000px";
      } else {
         isVertical = false;
         document.getElementById('chartdiv11').style.height = "600px";
      }
      $("#chartdiv11").after('<div class="lagend_nameA" style="color: black;margin: 0 33%;">' + lagend_ro + '</div >');

      am4core.ready(function () {
         var chart = am4core.create("chartdiv11", am4charts.XYChart);
         // some extra padding for range labels
         chart.paddingBottom = 50;
         chart.colors.step = 3;
         // will use this to store colors of the same items
         var colors = {};

         if (isVertical) {
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
         }
         else {
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
         }

         //var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
         categoryAxis.dataFields.category = "category";
         categoryAxis.renderer.minGridDistance = 60;
         categoryAxis.renderer.grid.template.location = 0;
         categoryAxis.renderer.opposite = false;

         if (field_urutan == 'kementerian_kode') {
            categoryAxis.dataItems.template.text = "{intervensi_nama}";
         } else {
            categoryAxis.dataItems.template.text = "{kementerian_nama_short} [/] {intervensi_nama}";
            //categoryAxis.dataItems.template.text = "{intervensi_nama}";
         }

         categoryAxis.renderer.grid.template.disabled = true;
         categoryAxis.renderer.minGridDistance = 1;
         categoryAxis.groupData = true;
         categoryAxis.cursorTooltipEnabled = false;

         if (isVertical) {
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
         }

         // valueAxis.tooltip.disabled = true;
         valueAxis.min = 0;
         //valueAxis.max = 8000000;
         valueAxis.max = maxData;
         //valueAxis.max = maxData * 1.01;
         valueAxis.strictMinMax = true;
         valueAxis.title.text = "Alokasi dalam jutaan, Rupiah";
         valueAxis.renderer.grid.template.strokeWidth = 0;
         //valueAxis.renderer.labels.template.disabled = true;
         valueAxis.renderer.baseGrid.disabled = true;

         createSeries('alokasi_0', 'Pagu Awal (Renja K/L)', true);
         createSeries('alokasi_2', 'Pagu Awal (RKA K/L)');
         createSeries('anl_alokasi', 'Analisis Lanjutan');
         //createSeries('alokasi_realisasi', 'Realisasi');

         // second value axis for quantity
         if (isVertical) {
            var valueAxis2 = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
         }

         valueAxis2.renderer.opposite = true;
         valueAxis2.syncWithAxis = valueAxis;
         valueAxis2.tooltip.disabled = true;

         // Add cursor
         chart.cursor = new am4charts.XYCursor();
         //chart.cursor.behavior = "zoomXY";
         //chart.cursor.lineX.disabled = true;

         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }// Add cursor

         /* chart.cursor.lineY.strokeOpacity = 0;
         chart.cursor.lineY.fill = am4core.color("#000");
         chart.cursor.lineY.fillOpacity = 0.1;
         chart.scrollbarY = new am4core.Scrollbar();
         chart.cursor.fullWidthLineY = true;
         chart.cursor.yAxis = categoryAxis; */


         chart.cursor = new am4charts.XYCursor();
         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }

         // quantity line series
         var lineSeries = chart.series.push(new am4charts.LineSeries());
         lineSeries.name = "Jumlah RO";
         if (isVertical) {
            // lineSeries.tooltipText = "{valueX}";
            lineSeries.dataFields.categoryY = "category";
            lineSeries.dataFields.valueX = "jml_ro_tagging";
            lineSeries.xAxis = valueAxis2;
         } else {
            // lineSeries.tooltipText = "{valueY}";
            lineSeries.dataFields.categoryX = "category";
            lineSeries.dataFields.valueY = "jml_ro_tagging";
            lineSeries.yAxis = valueAxis2;
         }

         // Add a bullet
         var bullet = lineSeries.bullets.push(new am4charts.Bullet());
         var latitudeLabel = lineSeries.bullets.push(new am4charts.LabelBullet());

         latitudeLabel.label.text = "{jml_ro_teridentifikasi}[/]/{jml_ro_tagging}";
         latitudeLabel.label.horizontalCenter = "left";
         latitudeLabel.label.dx = 14;

         // Add a triangle to act as am arrow
         var arrow = bullet.createChild(am4core.Circle);
         arrow.horizontalCenter = "middle";
         arrow.verticalCenter = "middle";
         arrow.stroke = am4core.color("#FFFF00");
         //arrow.stroke = false;
         arrow.direction = "top";
         arrow.width = 12;
         arrow.height = 12;

         arrow.adapter.add("fill", function (fill, target) {
            if (!target.dataItem) {
               return fill;
            }
            var values = target.dataItem.values;
            if (target.dataItem._dataContext.intervensi_kode == "A") {
               return am4core.color("blue")
            } else if (target.dataItem._dataContext.intervensi_kode == "B") {
               return am4core.color("red")
            } else {
               return am4core.color("green")
            }
         });

         lineSeries.bullets.push(bullet);
         lineSeries.stroke = chart.colors.getIndex(13);
         lineSeries.fill = lineSeries.stroke;
         lineSeries.strokeWidth = 3;
         lineSeries.snapTooltip = false;

         // when data validated, adjust location of data item based on count
         lineSeries.events.on("datavalidated", function () {
            lineSeries.dataItems.each(function (dataItem) {
               // if count divides by two, location is 0 (on the grid)
               if (dataItem.dataContext.count / 2 == Math.round(dataItem.dataContext.count / 2)) {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0);
                  } else {
                     dataItem.setLocation("categoryX", 0);
                  }
               }
               // otherwise location is 0.5 (middle)
               else {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0.5);
                  } else {
                     dataItem.setLocation("categoryX", 0.5);
                  }
               }
            })
         })

         var rangeTemplate = categoryAxis.axisRanges.template;
         rangeTemplate.tick.disabled = false;
         rangeTemplate.tick.location = 0;
         rangeTemplate.tick.strokeOpacity = 0.6;
         rangeTemplate.tick.length = 60;
         rangeTemplate.grid.strokeOpacity = 0.5;
         rangeTemplate.label.tooltip = new am4core.Tooltip();
         rangeTemplate.label.tooltip.dy = -10;
         rangeTemplate.label.cloneTooltip = false;

         var axisBreak = valueAxis.axisBreaks.create();
         //axisBreak.breakSize = 0.005;
         axisBreak.startValue = maxData * 0.12;
         axisBreak.endValue = maxData * 1.2;
         //axisBreak.endValue = valueAxis.max * 0.6;
         //axisBreak.startValue = 5000000;
         /* axisBreak.startValue = 5000000;
         axisBreak.endValue = 70000000; */
         /* axisBreak.startValue = 100000;
         axisBreak.endValue = 70000000; */
         //console.log("ori", maxData);
         //console.log("test1x", maxData * 0.6);

         // fixed axis break
         var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
         //axisBreak.breakSize = 0.3 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
         axisBreak.breakSize = 0.1 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height

         // make break expand on hover
         var hoverState = axisBreak.states.create("hover");
         hoverState.properties.breakSize = 1;
         hoverState.properties.opacity = 0.1;
         hoverState.transitionDuration = 1500;

         axisBreak.defaultState.transitionDuration = 1000;

         cdata.data.forEach(function (dataKementerian, klIndex) {
            // console.log("asdf", dataKementerian);
            var tempArray = [];
            // add items

            dataKementerian.data.forEach(function (intervensiData, intervensiIndex) {
               var count = 0;
               var _data = intervensiData.data;
               for (var data in intervensiData.data) {
                  // console.log("test", data);
                  if (count == 0) {
                     _data.category = dataKementerian.kementerian_nama + "_" + intervensiData.intervensi_nama;
                  }
                  count++;
               }
               _data.prsn_realisasi_dikali = _data.prsn_realisasi * 100;

               tempArray.push(_data)

               //console.log("tempData", tempArray)
               // sort temp array
               /* tempArray.sort(function (a, b) {

                  if (a.value > b.value) {
                     return 1;
                  }
                  else if (a.value < b.value) {
                     return -1
                  }
                  else {
                     return 0;
                  }
               }) */

               // add quantity and count to middle data item (line series uses it)
               // var lineSeriesDataIndex = Math.floor(count / 2);
               // tempArray[lineSeriesDataIndex].jml_ro = intervensiData.data.jml_ro;
               // tempArray[lineSeriesDataIndex].count = count;

               if (intervensiIndex == dataKementerian.data.length - 1) {
                  // push to the final data
                  am4core.array.each(tempArray, function (item) {
                     item.roGabung = item.jml_ro_teridentifikasi.toString() + "_" + item.jml_ro_tagging.toString() + "_" + item.kementerian_kode;
                     chartData.push(item);
                  });

                  // create range (the additional label at the bottom)
                  var range = categoryAxis.axisRanges.create();
                  range.category = tempArray[0].category;
                  range.endCategory = tempArray[tempArray.length - 1].category;

                  if (field_urutan == 'kementerian_kode') {
                     range.label.text = tempArray[0].kementerian_nama_short;
                  } else {
                     range.label.text = '';
                     //range.label.text = tempArray[0].kementerian_nama_short;
                  }

                  // range.label.truncate = true;
                  range.label.fontWeight = "bold";
                  range.label.tooltipText = tempArray[0].kementerian_nama_short;
                  if (isVertical) {
                     range.label.rotation = 270;
                     range.label.dx = -95;
                     range.label.dy = 50;
                  } else {
                     range.label.dy = 30;
                  }

                  range.label.adapter.add("maxWidth", function (maxWidth, target) {
                     var range = target.dataItem;
                     var startPosition = categoryAxis.categoryToPosition(range.category, 0);
                     var endPosition = categoryAxis.categoryToPosition(range.endCategory, 1);
                     var startX = categoryAxis.positionToCoordinate(startPosition);
                     var endX = categoryAxis.positionToCoordinate(endPosition);
                     return endX - startX;
                  })
               }
            })
         })
         //console.log("chartData1 ", chartData);
         /* chartData.sort(function (a, b) {
            chartData = a.kementerian_nama_short.localeCompare(b.kementerian_nama_short);
         });
         console.log("chartData2 ", chartData); */
         var hasilnya;
         if (urutan) {
            hasilnya = chartData.sort(GetSortOrderDesc(field_urutan));
         }
         else {
            hasilnya = chartData.sort(GetSortOrderAsc(field_urutan));
         }

         chart.data = hasilnya;

         // last tick
         var range = categoryAxis.axisRanges.create();
         range.category = chart.data[chart.data.length - 1].category;
         range.label.disabled = true;
         range.tick.location = 1;
         range.grid.location = 1;

         chart.legend = new am4charts.Legend();
         chart.legend.marginTop = 40;
         /* if (isVertical)
            chart.legend.position = "bottom";
         else
            chart.legend.position = "right"; */

         chart.legend.position = "bottom";
         chart.legend.labels.template.truncate = false;
         // chart.legend.labels.template.text = "[{color}]{intervensi_nama}[/]";

         function createSeries(value, name, createTooltip = false) {
            var series = chart.series.push(new am4charts.ColumnSeries());
            if (isVertical) {
               series.dataFields.valueX = value
               series.dataFields.categoryY = 'category'
            } else {
               series.dataFields.valueY = value
               series.dataFields.categoryX = 'category'
            }

            series.name = name
            if (createTooltip) {
               series.tooltipText = `
                  Tingkat Output
                  [bold]{kementerian_nama}[/] - {intervensi_nama}
                  Total RO Tagging : [bold]{jml_ro_tagging} RO[/]
                  Total RO Teridentifikasi : [bold]{jml_ro_teridentifikasi} RO[/]
                  Pagu Awal (Renja K/L) : Rp. [bold]{alokasi_0.formatNumber('#,###.')}[/]
                  Pagu Awal (RKA K/L) : [bold]Rp. {alokasi_2.formatNumber('#,###.')}[/]
                  Analisis Lanjutan : [bold]Rp. {anl_alokasi.formatNumber('#,###.')} [/]
                  `;
            }

            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#fff");
            series.tooltip.label.fill = am4core.color("#00");

            // Prevent cross-fading of tooltips
            series.tooltip.defaultState.transitionDuration = 0;
            series.tooltip.hiddenState.transitionDuration = 0;

            //console.log('value', valueX);
            //console.log('valueX.value', valueX.value);
            /* if (value == 'anl_alokasi') {
               var bullet = series.bullets.push(new am4charts.LabelBullet())
               bullet.interactionsEnabled = false
               bullet.label.horizontalCenter = "right";
               bullet.label.dx = 170;
               bullet.label.text = "Realisasi : [bold]Rp. {alokasi_realisasi.formatNumber('#,###.')} ({prsn_realisasi_dikali.formatNumber('#,###.')} %)[/]"
               bullet.label.fill = am4core.color('#242b30')
               bullet.label.hideOversized = false;
               bullet.label.truncate = false;
            } */
            series;
         }

      });
      // end am4core.ready()
   }
   return false;
}
function grafikPage1Tab2(datax, urutan, field_urutan) {

   if (datax) {
      let cdata = { "data": datax },
         chartData2 = [],
         lineSeriesData = [],
         isVertical = false,
         maxData = cdata.data.maxAmount;
      cdata.data = cdata.data.result;

      var lagend_ro =
         '<span class="btn btn-xs btn-icon btn-circle bg-blue" style="margin-left:11px;"></span> RO Spesifik' +
         '<span class="btn btn-xs btn-icon btn-circle bg-red" style="margin-left:11px;"></span> RO Sensitif' +
         '<span class="btn btn-xs btn-icon btn-circle bg-green" style="margin-left:11px;"></span> RO Dukungan'
         ;
      $(".lagend_name12").remove();
      if (cdata.data.length > 5) {
         isVertical = true;
         document.getElementById('chartdiv12x').style.height = "1500px";
      } else {
         isVertical = false;
         document.getElementById('chartdiv12x').style.height = "600px";
      }

      $("#chartdiv12x").after('<div class="lagend_name12" style="color: black;margin: 0 33%;">' + lagend_ro + '</div >');

      am4core.ready(function () {
         var chart = am4core.create("chartdiv12x", am4charts.XYChart);

         // some extra padding for range labels
         chart.paddingBottom = 50;
         chart.colors.step = 3;
         // will use this to store colors of the same items
         var colors = {};

         if (isVertical) {
            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
         } else {
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
         }
         categoryAxis.dataFields.category = "category";
         //categoryAxis.renderer.labels.template.fill = am4core.color("grey");
         //categoryAxis.dataItems.fontWeight = "bold";
         //categoryAxis.dataFields.category = "kementerian_nama";
         categoryAxis.renderer.minGridDistance = 60;
         categoryAxis.renderer.grid.template.location = 0;
         categoryAxis.renderer.opposite = false;
         categoryAxis.dataItems.template.text = "[bold font-style: italic !important]{category}[/]";

         /* categoryAxis.renderer.axisFills.template.disabled = false;
         categoryAxis.renderer.axisFills.template.fillOpacity = 0.2;
         categoryAxis.renderer.axisFills.template.fill = am4core.color("grey");
         categoryAxis.renderer.grid.template.disabled = true;
         categoryAxis.renderer.grid.template.location = 0;
         categoryAxis.renderer.inversed = true; */


         categoryAxis.renderer.grid.template.disabled = true;
         categoryAxis.renderer.minGridDistance = 1;
         categoryAxis.groupData = true;
         categoryAxis.cursorTooltipEnabled = false;

         if (isVertical) {
            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
         }

         // valueAxis.tooltip.disabled = true;
         valueAxis.min = 0;
         //valueAxis.max = 8000000;
         valueAxis.max = maxData;
         //valueAxis.max = maxData * 1.01;
         valueAxis.strictMinMax = true;
         valueAxis.title.text = "Alokasi dalam jutaan, Rupiah";
         valueAxis.renderer.grid.template.strokeWidth = 0;
         //valueAxis.renderer.labels.template.disabled = true;
         valueAxis.renderer.baseGrid.disabled = true;

         createSeries('alokasi_0', 'Pagu Awal (Renja K/L)', true);
         createSeries('alokasi_2', 'Pagu Awal (RKA K/L)');
         createSeries('anl_alokasi', 'Analisis Lanjutan');

         // second value axis for quantity
         if (isVertical) {
            var valueAxis2 = chart.xAxes.push(new am4charts.ValueAxis());
         } else {
            var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
         }

         valueAxis2.renderer.opposite = true;
         valueAxis2.syncWithAxis = valueAxis;
         valueAxis2.tooltip.disabled = true;

         // Add cursor
         chart.cursor = new am4charts.XYCursor();

         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }// Add cursor
         chart.cursor = new am4charts.XYCursor();
         chart.cursor.behavior = "zoomXY";
         chart.mouseWheelBehavior = "zoomXY";
         if (isVertical) {
            chart.cursor.lineY.strokeOpacity = 0;
            chart.cursor.lineY.fill = am4core.color("#000");
            chart.cursor.lineY.fillOpacity = 0.1;
            chart.scrollbarY = new am4core.Scrollbar();
            chart.cursor.fullWidthLineY = true;
            chart.cursor.yAxis = categoryAxis;
         } else {
            chart.cursor.lineX.strokeOpacity = 0;
            chart.cursor.lineX.fill = am4core.color("#000");
            chart.cursor.lineX.fillOpacity = 0.1;
            chart.scrollbarX = new am4core.Scrollbar();
            chart.cursor.fullWidthLineX = true;
            chart.cursor.xAxis = categoryAxis;
         }

         // quantity line series
         var lineSeries = chart.series.push(new am4charts.LineSeries());
         lineSeries.name = "Jumlah RO";
         if (isVertical) {
            // lineSeries.tooltipText = "{valueX}";
            lineSeries.dataFields.categoryY = "category";
            //lineSeries.dataFields.categoryY = "kementerian_nama";
            //lineSeries.fontWeight = "bold";
            //lineSeries.dataFields.fontWeight = "bold";
            lineSeries.dataFields.valueX = "jml_ro_tagging";
            lineSeries.xAxis = valueAxis2;
         } else {
            // lineSeries.tooltipText = "{valueY}";
            lineSeries.dataFields.categoryX = "category";
            //lineSeries.dataFields.categoryX = "kementerian_nama";
            //lineSeries.fontWeight = "bold";
            //lineSeries.dataFields.fontWeight = "bold";

            lineSeries.dataFields.valueY = "jml_ro_tagging";
            lineSeries.yAxis = valueAxis2;
         }

         // Add a bullet
         var bullet = lineSeries.bullets.push(new am4charts.Bullet());


         // Add a triangle to act as am arrow
         var arrow = bullet.createChild(am4core.Circle);
         arrow.horizontalCenter = "middle";
         arrow.verticalCenter = "middle";
         arrow.stroke = am4core.color("#FFFF00");
         //arrow.stroke = false;
         arrow.direction = "top";
         arrow.width = 12;
         arrow.height = 12;

         arrow.adapter.add("fill", function (fill, target) {
            if (!target.dataItem) {
               return fill;
            }
            var values = target.dataItem.values;
            if (target.dataItem._dataContext.intervensi_kode == "A") {
               return am4core.color("blue")
            } else if (target.dataItem._dataContext.intervensi_kode == "B") {
               return am4core.color("red")
            } else {
               return am4core.color("green")
            }
         });

         lineSeries.bullets.push(bullet);
         lineSeries.stroke = chart.colors.getIndex(13);
         lineSeries.fill = lineSeries.stroke;
         lineSeries.strokeWidth = 3;
         lineSeries.snapTooltip = false;

         // when data validated, adjust location of data item based on count
         lineSeries.events.on("datavalidated", function () {
            lineSeries.dataItems.each(function (dataItem) {
               // if count divides by two, location is 0 (on the grid)
               if (dataItem.dataContext.count / 2 == Math.round(dataItem.dataContext.count / 2)) {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0);
                  } else {
                     dataItem.setLocation("categoryX", 0);
                  }
               }
               // otherwise location is 0.5 (middle)
               else {
                  if (isVertical) {
                     dataItem.setLocation("categoryY", 0.5);
                  } else {
                     dataItem.setLocation("categoryX", 0.5);
                  }
               }
            })
         })

         var rangeTemplate = categoryAxis.axisRanges.template;
         rangeTemplate.tick.disabled = false;
         rangeTemplate.tick.location = 0;
         rangeTemplate.tick.strokeOpacity = 0.6;
         rangeTemplate.tick.length = 60;
         rangeTemplate.grid.strokeOpacity = 0.5;
         rangeTemplate.label.tooltip = new am4core.Tooltip();
         rangeTemplate.label.tooltip.dy = -10;
         rangeTemplate.label.cloneTooltip = false;

         var axisBreak = valueAxis.axisBreaks.create();
         //axisBreak.breakSize = 0.005;
         axisBreak.startValue = maxData * 0.12;
         axisBreak.endValue = maxData * 1.2;

         // fixed axis break
         var d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
         //axisBreak.breakSize = 0.3 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height
         axisBreak.breakSize = 0.1 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height

         // make break expand on hover
         var hoverState = axisBreak.states.create("hover");
         hoverState.properties.breakSize = 1;
         hoverState.properties.opacity = 0.1;
         hoverState.transitionDuration = 1500;

         axisBreak.defaultState.transitionDuration = 1000;
         //console.log('sini', cdata.data);

         var susun_data = [];
         cdata.data.forEach(function (dataKementerian, klIndex) {

            var tempArrayx = [],
               alokasi_0 = 0,
               alokasi_2 = 0,
               anl_alokasi = 0,
               jml_ro_teridentifikasi = 0,
               jml_ro_tagging = 0;
            dataKementerian.data.forEach(function (intervensiData, intervensiIndex) {
               //console.log("intervensiData", intervensiData);
               var count = 0;
               var _data = intervensiData.data;

               alokasi_0 += parseInt(_data.alokasi_0);
               alokasi_2 += parseInt(_data.alokasi_2);
               anl_alokasi += parseInt(_data.anl_alokasi);
               jml_ro_tagging += parseInt(_data.jml_ro_tagging);
               jml_ro_teridentifikasi += parseInt(_data.jml_ro_teridentifikasi);
               tempArrayx.push(_data);
            });

            var dataxxx = {
               'roGabung': dataKementerian.data[0].data.jml_ro_teridentifikasi.toString() + "_" + dataKementerian.data[0].data.jml_ro_tagging.toString() + "_" + dataKementerian.data[0].data.kementerian_kode,
               'category': dataKementerian.data[0].data.kementerian_nama_short,
               'kementerian_nama': dataKementerian.kementerian_nama,
               'kementerian_kode': dataKementerian.kementerian_kode,
               'alokasi_0': alokasi_0,
               'alokasi_2': alokasi_2,
               'anl_alokasi': anl_alokasi,
               /* 'prsn_realisasi': (alokasi_realisasi / alokasi_2) * 100, */
               'jml_ro_tagging': jml_ro_tagging,
               'jml_ro_teridentifikasi': jml_ro_teridentifikasi
            };
            susun_data.push(dataxxx);
         });
         //console.log("susun_data", susun_data);

         var latitudeLabel = lineSeries.bullets.push(new am4charts.LabelBullet());

         latitudeLabel.label.text = "{jml_ro_teridentifikasi}[/]/{jml_ro_tagging}";
         latitudeLabel.label.horizontalCenter = "left";
         latitudeLabel.label.dx = 14;

         var hasilnya;
         if (urutan) {
            hasilnya = susun_data.sort(GetSortOrderDesc(field_urutan));
         }
         else {
            hasilnya = susun_data.sort(GetSortOrderAsc(field_urutan));
         }

         chart.data = hasilnya;
         chart.legend = new am4charts.Legend();
         chart.legend.marginTop = 40;
         /*  if (isVertical)
             chart.legend.position = "bottom";
          else
             chart.legend.position = "right"; */

         chart.legend.position = "bottom";
         chart.legend.labels.template.truncate = false;

         function createSeries(value, name, createTooltip = false) {
            var series = chart.series.push(new am4charts.ColumnSeries())
            if (isVertical) {
               series.dataFields.valueX = value
               series.dataFields.categoryY = 'category'
            } else {
               series.dataFields.valueY = value
               series.dataFields.categoryX = 'category'
            }

            series.name = name
            if (createTooltip) {
               series.tooltipText = `
                  Tingkat Output
                  [bold]{kementerian_nama}[/] - {intervensi_nama}
                  Total RO Tagging : [bold]{jml_ro_tagging} RO[/]
                  Total RO Teridentifikasi : [bold]{jml_ro_teridentifikasi} RO[/]
                  Pagu Awal (Renja K/L) : Rp. [bold]{alokasi_0.formatNumber('#,###.')}[/]
                  Pagu Awal (RKA K/L) : [bold]Rp. {alokasi_2.formatNumber('#,###.')}[/]
                  Analisis Lanjutan : [bold]Rp. {anl_alokasi.formatNumber('#,###.')} [/]
                  `;
            }

            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#fff");
            series.tooltip.label.fill = am4core.color("#00");

            // Prevent cross-fading of tooltips
            series.tooltip.defaultState.transitionDuration = 0;
            series.tooltip.hiddenState.transitionDuration = 0;

            /* if (value == 'alokasi_realisasi') {
               var bullet = series.bullets.push(new am4charts.LabelBullet())
               bullet.interactionsEnabled = false
               //bullet.dx = -10;
               bullet.label.horizontalCenter = "right";
               bullet.label.dx = 170;
               bullet.label.text = "Realisasi : [bold]Rp. {alokasi_realisasi.formatNumber('#,###.')} ({prsn_realisasi.formatNumber('#,###.')} %)[/]"
               bullet.label.fill = am4core.color('#242b30')
               bullet.label.hideOversized = false;
               bullet.label.truncate = false;
            } */
            series;
         }

      });
      // end am4core.ready()
   }
   return false;
}
/*End Chart Penandaan Pagu*/


var urutan = true
function rowAsc() {
   return urutan = true;
}
function rowDesc() {
   return urutan = false;
}
function sortData() {
   return urutan ? rowDesc() : rowAsc();
}
function GetSortOrderAsc(prop) {
   return function (a, b) {
      if ((prop == "kementerian_kode") || (prop == "roGabung")) {
         if (a[prop] < b[prop]) {
            return 1;
         } else if (a[prop] > b[prop]) {
            return -1;
         }
      } else {
         if (parseInt(a[prop]) < parseInt(b[prop])) {
            return 1;
         } else if (parseInt(a[prop]) > parseInt(b[prop])) {
            return -1;
         }
      }
      return 0;
   }
}
function GetSortOrderDesc(prop) {
   return function (a, b) {
      if ((prop == "kementerian_kode") || (prop == "roGabung")) {
         if (a[prop] > b[prop]) {
            return 1;
         } else if (a[prop] < b[prop]) {
            return -1;
         }
      } else {
         if (parseInt(a[prop]) > parseInt(b[prop])) {
            return 1;
         } else if (parseInt(a[prop]) < parseInt(b[prop])) {
            return -1;
         }
      }
      return 0;
   }
}
function klikKementerian(datax) {
   if (datax) {
      return false;
   } else {
      return true;
   }
}
function klikKementerian2() {
   return klikKementerian();
}
function tombolUbah(tombol, sorting) {
   var icon;
   if (sorting) {
      icon = 'fas fa-sort-amount-up';
   }
   else {
      icon = 'fas fa-sort-amount-down';
   }
   $("#sortByKL11,#sortByKL12,#sortByKL22,#sortByKL,#sortByKL2").attr("class", "btn btn-primary").find("i").removeAttr("class").attr("class", "fas fa-align-justify text-middle");
   $("#sortByDR11,#sortByDR12,#sortByDR22,#sortByDR,#sortByDR2").attr("class", "btn btn-info").find("i").removeAttr("class").attr("class", "fas fa-align-justify text-middle");
   $("#sortByPA11,#sortByPA12,#sortByPA22,#sortByPA,#sortByPA2").attr("class", "btn btn-indigo").find("i").removeAttr("class").attr("class", "fas fa-align-justify text-middle");
   $("#sortByPH11, #sortByPH12, #sortByPH22, #sortByPH,#sortByPH2").attr("class", "btn btn-pink").find("i").removeAttr("class").attr("class", "fas fa-align-justify text-middle");
   $("#sortByRO11, #sortByRO12, #sortByRO22, #sortByRO,#sortByRO2").attr("class", "btn btn-green").find("i").removeAttr("class").attr("class", "fas fa-align-justify text-middle");
   $("#sortByR22,#sortByR,#sortByR2,#sortByR12").attr("class", "btn btn-danger").find("i").removeAttr("class").attr("class", "fas fa-align-justify text-middle");

   $(tombol).removeAttr("class").attr('class', 'btn btn_aktif');
   $(tombol).find('i').attr('class', icon);

   return sortData();
}
function tombolGroup(tombol, sorting) {
   var class_btn = $(tombol).attr("class");
   $("#toggle-ro,#toggle-inv22,#toggle-ro21,#toggle-keg21,#toggle-kro21,#toggle-pro21,#toggle-inv222,#toggle-kro,#toggle-pro,#toggle-keg, #toggle-inv,#toggle-vis,#toggle-vis1,#toggle-vis2,#toggle-pro2,#toggle-ro2,#toggle-kro2,#toggle-keg2,#toggle-pro1,#toggle-keg1,#toggle-kro1,#toggle-ro1").removeClass("btn_aktif");
   $("#toggle-vis,#toggle-vis1,#toggle-vis2,#toggle-vis22").addClass(" bg-lime-darker ");
   $("#toggle-keg, #toggle-keg1,#toggle-keg2,#toggle-keg21").addClass("btn-info ");
   $("#toggle-kro,#toggle-kro1,#toggle-kro2,#toggle-kro21").addClass("btn-warning ");
   $("#toggle-ro,#toggle-ro1, #toggle-ro2,#toggle-pro21").addClass("btn-yellow ");
   $("#toggle-pro1,#toggle-pro2,#toggle-pro,#toggle-ro21").addClass("btn-indigo ");
   $("#toggle-inv,#toggle-inv2x,#toggle-inv22,#toggle-inv222").addClass("bg-gray-darker ");

   var class_btn = $(tombol).attr("class"),
      class_main = class_btn.split(' ');

   $(tombol).removeAttr("class").attr('class', 'btn btn_aktif ');
}
function gpIntervensi(data) {
   $("#contentIntervensi, #contentKL").removeClass(["active", "show", "hide"]);
   $("#contentIntervensi").addClass(["active", "show"]);
   $("#contentKL").addClass("hide");
   $("#gpKL").removeClass("active").html("Kementerian/Lembaga");
   $(data).addClass("active").html('<i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Intervensi');
};
function gpKL(data) {
   $("#contentKL, #contentIntervensi").removeClass(["active", "show", "hide"]);
   $("#contentKL").addClass(["active", "show"]);
   $("#contentIntervensi").addClass("hide");
   $("#gpIntervensi").removeClass("active").html("Intervensi");
   $(data).addClass("active").html('<i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Kementerian/Lembaga');
};
function gpIntervensi2(data) {
   $("#contentIntervensi2,#contentKL2").removeClass(["active", "show", "hide"]);
   $("#contentIntervensi2").addClass(["active", "show"]);
   $("#contentKL2").addClass("hide");
   $("#gpKL2").removeClass("active").html("Kementerian/Lembaga");
   $(data).addClass("active").html('<i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Intervensi');
};
function gpKL2(data) {
   $("#contentKL2, #contentIntervensi2").removeClass(["active", "show", "hide"]);
   $("#contentKL2").addClass(["active", "show"]);
   $("#contentIntervensi2").addClass("hide");
   $("#gpIntervensi2").removeClass("active").html("Intervensi");
   $(data).addClass("active").html('<i class="fas fa-lg fa-fw m-r-10 fa-check-circle text-green pull-right mt-1 icon-right"></i>Kementerian/Lembaga');
};
function hide_persen(idField, p1) {
   if (
      (parseFloat(p1) == 0) || ((p1 == ""))
   ) {
      $(idField).html(" ");
      return 1;
   } else {
      return false;
   }
}
function hide_cell(idField, p1, p2) {
   if (
      ((parseFloat(p1) == 0) && (parseFloat(p2) == 0)) || ((p1 == "") && (p2 == ""))
   ) {
      $(idField).html(" ");
      return 1;
   } else {
      return false;
   }
}