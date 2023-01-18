function viewMapKinerjaPembangunan(datax) {
   $("#ro-lokus-detail").html(`<div id="peta-ro-lokus" style="height: 36em;"></div>`);

   var
      info_gradien = ["sangat tinggi", "tinggi", "sedang", "rendah", "sangat rendah"],
      num_gradien = [50, 45, 40, 35, 30],
      color_gradien = ["#1a237e", "#303f9f", "#3f51b5", "#7986cb", "#c5cae9"];




   let mapId = "peta-ro-lokus";
   $("#data_" + mapId).addClass('loading');
   /*action*/

   //loadMap("#data_" + mapId, mapId);
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
   geoData.map = map;
   //console.log("xxx", dataMap);
   var gmap_data = L.geoJSON(datax.detail, {
      className: 'shadow',
      onEachFeature: function (feature, layer) {
         let dataProperties = feature.properties;
         layer.setStyle(style(dataProperties));
         layer.on({
            mousemove: MapStyleOver,
            mouseout: MapStyleOut,
            click: whenClickedMe
         });
         titleInfo = /*html*/`<h5 class="card-title fs-13px text-black">${dataProperties.kab_name}</h5>`;
      },
   }).addTo(map);

   map.addControl(L.control.fullscreen({
      position: 'topright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
      forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
      fullscreenElement: document.getElementById("main-map") // Dom element to render in full screen, false by default, fallback to map._container
   }));
   L.control.zoom({
      position: 'topright'
   }).addTo(map);

   map.on('enterFullscreen', async function () {
      /* $("#map_" + statusGizi).addClass('fullscreen-map-dampak');
      $("#mapPrioritas").addClass('fullscreen-map-prioritas');
      $(".jstree-container").addClass('fullscreen-tree-prioritas');
      $("#main-map").addClass('scrool-zoom-page');

      map.fitBounds(gmap_data.getBounds());
      //alert("yes"); */
   });

   map.on('exitFullscreen', function () {
      /* $("#map_" + statusGizi).removeClass('fullscreen-map-dampak');
      $("#main-map").removeClass('scrool-zoom-page');
      $("#mapPrioritas").removeClass('fullscreen-map-priorita');
      $(".jstree-container").removeClass('fullscreen-tree-prioritas'); */
   });

   let
      /* btnBack = L.control({ position: 'topleft' }),
      nameSection = L.control({ position: 'topleft' }), */
      btnHomeReset = L.control({ position: 'topleft' }),
      /* btnGrafik = L.control({ position: 'topright' }), */
      btnCompire = L.control({ position: 'topright' }),
      infoData = L.control({ position: 'bottomleft' }),
      /*  logicTahun = L.control({ position: 'bottomleft' }),
       logicArea = L.control({ position: 'bottomleft' }),
       logicAge = L.control({ position: 'bottomleft' }),
       logicSurvey = L.control({ position: 'bottomleft' }), */
      legend = L.control({ position: 'bottomright' })
      ;

   legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend fs-12px'),
         grades = num_gradien,
         ginfo = info_gradien,
         labels = ['Jumlah Rincian Output'],
         from, to, grange;
      for (var i = 0; i < grades.length; i++) {
         from = grades[i];
         to = parseInt(grades[i - 1]);
         if (i == 0) {
            //grange = "<span class='num_persen'>&#8805; " + from + "</span>";
            grange = "<span class='num_persen'>&#8805; " + from + " RO</span>";
         } else if (i == (grades.length - 1)) {
            //grange = "<span class='num_persen'>&#8805; </span><span class=''>" + grades[i - 1] + "%</span>";
            grange = "<span class='num_persen'>&#8805; </span><span class=''>" + grades[i - 1] + " RO</span>";
            // grange = "<span class='num_persen'>&#8805; </span>";
         } else {
            //grange = "<span class='num_persen'>" + from + "</span> " + (to ? "<span class=''>&ndash;</span> <span class='num_persen'>&#60;</span><span class=''>" + to + "</span>" : '+') + "<span>%</span>";
            grange = "<span class='num_persen'>" + from + "</span> " + (to ? "<span class=''>&ndash;</span> <span class='num_persen'>&#60;</span><span class=''>" + to + "</span>" : '+') + " RO";
         }
         labels.push(
            '<i class="color_info" style="background:' + getColor(from + 1) + '"></i> ' +
            //grange + " <span class='level_info' >(" + ginfo[i] + ")</span>"
            grange
         );
      }
      labels.push(' ');
      div.innerHTML = labels.join('<br>');
      return div;
   };
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



   btnHomeReset.onAdd = function (map) {
      var container = L.DomUtil.create('div', 'bhomeleaftlet leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0');
      container.title = 'Reset Posisi Peta';
      container.type = "button";
      container.style.backgroundSize = "26px 26px";
      container.style.width = '27px';
      container.style.height = '27px';
      container.onclick = function () {
         map.closePopup();
         map.fitBounds(gmap_data.getBounds());
      }
      return container;
   };
   btnHomeReset.addTo(map);



   /* var elmData = $("#elmsidebarR").html(),
      sidebar = L.control.sidebar('sidebarR', {
         closeButton: true,
         position: 'right'
      });

   map.addControl(sidebar); */
   /* $("#elmsidebarR").html(elmData);
   $("#sidebarR").parent().find(".close").on("click", function () {
      $("#areaParam_" + statusGizi + ",#usiaParam_" + statusGizi + ",#surveyParam_" + statusGizi + ",#tahunParam_" + statusGizi + "").show();
      $(".leaflet-right").toggleClass('leaflet-right-move');
      if ($(".leaflet-right").hasClass('leaflet-right-move')) {
         geoData.compare = true;
      } else {
         geoData.compare = false;
      }
   });
   $("#sidebarR").parent().addClass("w-25").attr("style", "z-index: 999"); */


   infoData.onAdd = function (map) {
      let div = L.DomUtil.create('div');
      div.innerHTML = /*html*/`
      <div id="loadInfo" class="card bg-white-100 h-100 hide" style="position: relative;right: 0em;top: 0em;opacity: 0.95;max-width: 61.5em;max-height: 30em;">
         <div class="card-body" id="loadInfoText"></div>
      </div>
      `;
      return div;
   };
   infoData.addTo(map);





   var popup = new L.Popup({ autoPan: false });

   /* Function */

   function getColor(d) {
      /* var
         num_gradien = [30, 20, 10, 2.5, 0],
         color_gradien = ["#e32291", "#35b9c5", "#9fd9d8", "#92cea5", "#67ae3d"];
 */
      var scolor = d > num_gradien[0] ? color_gradien[0] :
         d > num_gradien[1] ? color_gradien[1] :
            d > num_gradien[2] ? color_gradien[2] :
               d > num_gradien[3] ? color_gradien[3] :
                  color_gradien[4];
      return scolor;
   }

   function MapStyleOver(e) {
      //console.log("rrr", e.target.feature.properties);
      var layer = e.target;
      let c_ro = 0;
      Object.values(layer.feature.properties).forEach((ro) => {
         if (ro === "Y") {
            c_ro += 1
         }
      });

      var layer_map = label_map_ro(layer.feature.properties, getColor(c_ro), c_ro);
      popup.setLatLng(e.latlng);
      popup.setContent(layer_map);
      if (!popup._map) popup.openOn(map)
      window.clearTimeout(closeTooltip);
      if (!L.Browser.ie && !L.Browser.opera) {
         layer.bringToFront();
      }
      return this.setStyle(styleOver());
   }
   function
      MapStyleOut(e) {
      if (geoData.compare === true) { return false; }
      closeTooltip = window.setTimeout(function () {
         map.closePopup();
      }, 100);
      return this.setStyle(styleOut());
   }



   /* action on poligon */
   async function whenClickedMe(e) {
      let dataX = e.target.feature.properties,
         ro_name = []
         ;
      $i = 1;

      Object.keys(dataX).forEach((ro) => {
         if (dataX[ro] === "Y") {
            let row_ro = datax.field.find(item => item.ro_field === ro);
            ro_name.push("<tr><td class='text-wrap fs-12px p-1 m-0'>" + $i++ + ".</td><td class='text-wrap fs-12px p-1 m-0'>" + row_ro.ro_code + " " + row_ro.ro_name + "</td></tr>");
         }

      });
      let text = /*html*/`
      <div class="h5">${dataX.kab_alias}</div>
      <div class="h6">Provinsi ${dataX.prov_name}</div>
      <a href="javascript:;" class="btn btn-xs btn-icon" style="position: absolute;right: 5px;top: 5px;"><i class="fa fa-times fs-14px" style="position: relative;top: -1px;left: 1px;"></i></a>
      <table class="table table-bordered fs-12px" id="poptabel">
         <thead>
            <tr>
               <td>No.</td><td>Rincian Output</td>
            </tr>
         </thead>
         <tbody>
            ${ro_name.join(" ")}
         </tbody>
      </table>
      `;



      $("#loadInfo").removeClass("hide");
      $("#loadInfoText").html(text);
      $('#poptabel').DataTable({
         scrollY: 250,
         scrollX: true,
         scrollCollapse: true,
         paging: false,
         fixedColumns: true,
         responsive: true,
         dom: 'Bfrtip',
         buttons: [
            'excel',
         ]
      });

      $("#loadInfoText a").on('click', function () {
         $("#loadInfo").addClass("hide");
      });
   }

   function style(feature) {
      let c_ro = 0;
      Object.values(feature).forEach((ro) => {
         if (ro === "Y") {
            c_ro += 1
         }
      });

      var color_poligon = {
         weight: 1,
         opacity: 1,
         color: 'rgba(35,35,35,1.0)',
         dashArray: '',
         fillOpacity: 1,
         fillColor: getColor(c_ro)
      };
      return color_poligon;
   }

   function styleOver(feature) {
      return {
         weight: 2,
         opacity: 1,
         color: 'rgba(35,35,35,1.0)',
         dashArray: '',
         fillOpacity: 0.9,
      };
   }

   function styleOut(feature) {
      return {
         weight: 1,
         opacity: 1,
         dashArray: '',
         fillOpacity: 1,
      };
   }
   $("#data_" + mapId).removeClass('loading');
   map.fitBounds(gmap_data.getBounds());

   function label_map_ro(properties, color, jml_ro) {
      popUpLabel = /* html */`
         <div class="h-100 p-1 m-0 rounded bg-none">
            <div class="p-0 m-0">
               <p class="h5 my-0 text-orange text-uppercase">Rincian Output </p>
               <div id="tile-1">
                  <div class="row">
                     <div class="col-md-12 compireLab">        
                        <div class="d-flex flex-row bd-highlight" style="width: max-content;">         
                           <div class="bd-highlight mt-2" style="widthx: 25em;">
                              <div class="pt-1 fs-17px fw-600" style="color:${color}"> ${properties.kab_alias} </div>
                              <div class="text-gray-700 fs-14px fw-400"> Provinsi ${properties.prov_name} </div>                           
                           </div>                           
                           <div class="bd-highlight mt-3 ps-3">
                              <div class="my-0 h4" style="color:${color}">  ${jml_ro}RO </div>                          
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>`;
      return popUpLabel;
   }
}