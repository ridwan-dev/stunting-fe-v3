var provPrioritasKhusus = ['Aceh', 'Sumatera Utara', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Banten', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Selatan', 'Sulawesi Barat', 'Sulawesi Utara'];

function m_prioritas(datax) {

   let
      elm1 = document.querySelector("#m_prioritas"),
      status1 = elm1.dataset.active;

   if (status1 == "false") {
      let
         elmMap = document.querySelector("#data-map"),
         elmPerioritas = document.querySelector("#data-prioritas"),
         elm1 = document.querySelector("#m_prioritas"),
         elm2 = document.querySelector("#m_stunting"),
         elm3 = document.querySelector("#m_underweight"),
         elm4 = document.querySelector("#m_wasting"),
         tStatus = document.querySelector("#status_active");

      //elmMap.style.display = 'none';
      elmPerioritas.style.display = 'block';
      elm1.dataset.active = 'active';
      elm2.dataset.active = 'false';
      elm3.dataset.active = 'false';
      elm4.dataset.active = 'false';
      tStatus.dataset.status = 'prioritas';
      // mapPrioritas(geoData.dataPrioritasKabupaten);
   }
}
async function m_stunting(datax) {
   let
      elm2 = document.querySelector("#m_stunting"),
      status2 = elm2.dataset.active,
      paramDampak = { age: "balita", area: "provinsi" }
      ;
   $("#data_map_stunting").attr("fullscreen") == "true" ? $("#map_stunting").addClass("fullscreen-map-dampak") : $("#map_stunting").removeClass("fullscreen-map-dampak");
   if (status2 == "false") {
      let
         mapArea = "provinsi",
         elmPerioritas = document.querySelector("#data-prioritas"),
         elm1 = document.querySelector("#m_prioritas"),
         elm2 = document.querySelector("#m_stunting"),
         elm3 = document.querySelector("#m_underweight"),
         elm4 = document.querySelector("#m_wasting"),
         tStatus = document.querySelector("#status_active");

      elmPerioritas.style.display = 'none';
      elm1.dataset.active = 'false';
      elm2.dataset.active = 'active';
      elm3.dataset.active = 'false';
      elm4.dataset.active = 'false';
      tStatus.dataset.status = 'stunting';

      if (typeof geoData.paramDataStunting === "undefined") {
         try {
            let res = await fetch(config.api_url + '/dampak/stuntingsurvey', {
               method: 'POST',
               body: JSON.stringify({
                  age: paramDampak.age,
                  area: paramDampak.area
               }),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.paramDataStunting = _res.data;
         } catch (e) {
            return false;
         }
      }
      if (typeof geoData.dataStunting === "undefined") {
         let survey = Object.keys(geoData.paramDataStunting)[0],
            paramData = {
               age: paramDampak.age,
               area: paramDampak.area,
               sumber: survey,
               tahun: geoData.paramDataStunting[survey][0],
            };
         try {
            let res = await fetch(config.api_url + '/dampak/stuntingpartial', {
               method: 'POST',
               body: JSON.stringify(paramData),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.dataStunting = _res.data;
         } catch (e) {
            return false;
         }
      }
      //console.log("ccc", geoData.dataStunting);
      mapStunting(geoData.dataStunting, mapArea);
   }
}
async function m_underweight(datax) {
   let
      elm3 = document.querySelector("#m_underweight"),
      status3 = elm3.dataset.active,
      paramDampak = { age: "balita", area: "provinsi" }
      ;
   $("#data_map_underweight").attr("fullscreen") == "true" ? $("#map_underweight").addClass("fullscreen-map-dampak") : $("#map_underweight").removeClass("fullscreen-map-dampak");
   if (status3 == "false") {
      let
         mapArea = "provinsi",
         elmMap = document.querySelector("#data-map"),
         elmPerioritas = document.querySelector("#data-prioritas"),
         elm1 = document.querySelector("#m_prioritas"),
         elm2 = document.querySelector("#m_stunting"),
         elm3 = document.querySelector("#m_underweight"),
         elm4 = document.querySelector("#m_wasting"),
         tStatus = document.querySelector("#status_active");

      //elmPerioritas.style.display = 'none';
      elm1.dataset.active = 'false';
      elm2.dataset.active = 'false';
      elm3.dataset.active = 'active';
      elm4.dataset.active = 'false';
      tStatus.dataset.status = 'underweight';

      if (typeof geoData.paramUnderweight === "undefined") {
         try {
            let res = await fetch(config.api_url + '/dampak/underweightsurvey', {
               method: 'POST',
               body: JSON.stringify({
                  age: paramDampak.age,
                  area: paramDampak.area
               }),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.paramUnderweight = _res.data;
         } catch (e) {
            return false;
         }
      }
      if (typeof geoData.dataUnderweight === "undefined") {
         let survey = Object.keys(geoData.paramUnderweight)[0],
            paramData = {
               age: paramDampak.age,
               area: paramDampak.area,
               sumber: survey,
               tahun: geoData.paramUnderweight[survey][0],
            };
         try {
            let res = await fetch(config.api_url + '/dampak/underweightpartial', {
               method: 'POST',
               body: JSON.stringify(paramData),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.dataUnderweight = _res.data;
         } catch (e) {
            return false;
         }
      }
      mapUnderweight(geoData.dataUnderweight, mapArea);
   }
}
async function m_wasting(datax) {
   let
      elm4 = document.querySelector("#m_wasting"),
      status4 = elm4.dataset.active,
      paramDampak = { age: "balita", area: "provinsi" }
      ;
   $("#data_map_wasting").attr("fullscreen") == "true" ? $("#map_wasting").addClass("fullscreen-map-dampak") : $("#map_wasting").removeClass("fullscreen-map-dampak");
   if (status4 == "false") {
      let
         mapArea = "provinsi",
         elmMap = document.querySelector("#data-map"),
         elmPerioritas = document.querySelector("#data-prioritas"),
         elm1 = document.querySelector("#m_prioritas"),
         elm2 = document.querySelector("#m_stunting"),
         elm3 = document.querySelector("#m_underweight"),
         elm4 = document.querySelector("#m_wasting"),
         tStatus = document.querySelector("#status_active");
      ;

      elm1.dataset.active = 'false';
      elm2.dataset.active = 'false';
      elm3.dataset.active = 'false';
      elm4.dataset.active = 'active';
      tStatus.dataset.status = 'wasting';

      if (typeof geoData.paramWasting === "undefined") {
         try {
            let res = await fetch(config.api_url + '/dampak/wastingsurvey', {
               method: 'POST',
               body: JSON.stringify({
                  age: paramDampak.age,
                  area: paramDampak.area
               }),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.paramWasting = _res.data;
         } catch (e) {
            return false;
         }
      }

      if (typeof geoData.dataWasting === "undefined") {
         let survey = Object.keys(geoData.paramWasting)[0],
            paramData = {
               age: paramDampak.age,
               area: paramDampak.area,
               sumber: survey,
               tahun: geoData.paramWasting[survey][0],
            };
         try {
            let res = await fetch(config.api_url + '/dampak/wastingpartial', {
               method: 'POST',
               body: JSON.stringify(paramData),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.dataWasting = _res.data;
         } catch (e) {
            return false;
         }
      }
      mapWasting(geoData.dataWasting, mapArea);
   }
}
function mapStunting(datax, area) {
   //console.log("datax", datax);
   const
      age = datax.data.age.active,
      dataSurvey = datax.data.sumber.data,
      survey = datax.data.sumber.active,
      dataTahun = datax.data.tahun.data,
      tahun = datax.data.tahun.active
      ;

   viewMap('stunting', datax, area, age, { 'active': tahun, 'data': dataTahun }, { 'active': survey, 'data': dataSurvey });
}

function viewMap(statusGizi, datax, dAreaX, dAge, dTahun, dSurvey) {
   geoData.compare = false;
   let dArea;
   if (statusGizi === "stunting") {
      if (typeof geoData.dAreaStunting === "undefined") {
         dArea = dAreaX;
      } else {
         dArea = geoData.dAreaStunting;
      }
   }
   if (statusGizi === "wasting") {
      if (typeof geoData.dAreaWasting === "undefined") {
         dArea = dAreaX;
      } else {
         dArea = geoData.dAreaWasting;
      }
   }
   if (statusGizi === "underweight") {
      if (typeof geoData.dAreaUnderweight === "undefined") {
         dArea = dAreaX;
      } else {
         dArea = geoData.dAreaUnderweight;
      }
   }
   geoData.dArea = dArea;
   var
      mapId,
      num_gradien,
      color_gradien,
      info_gradien = ["sangat tinggi", "tinggi", "sedang", "rendah", "sangat rendah"],
      dataMap = []
      ;
   mapId = "map_" + statusGizi;
   $("#data_" + mapId).addClass('loading');
   let paramData = {
      age: dAge,
      area: dArea,
      sumber: dSurvey.active,
      tahun: dTahun.active,
   };
   if (statusGizi == "stunting") {
      /*  console.log(datax);
       console.log(dArea);
       console.log(paramData);
       if (dArea === "kabupaten") {
          geoData.dataStuntingProvKab = datax;
          geoData.paramStuntingKab = paramData;
       } */

      //console.log("yyyy", datax);
      datax.features.forEach((row) => {
         let dataY = 0;
         row.properties.data.forEach((rowX) => {
            if (rowX.tahun == dTahun.active) {
               let nameLabel,
                  codeLabel;
               if (dArea === "provinsi") {
                  codeLabel = row.properties.provinsi_kode;
                  nameLabel = row.properties.provinsi_nama;
               } else if (dArea === "kabupaten") {
                  codeLabel = row.properties.kabupaten_kode;
                  nameLabel = row.properties.kabupaten_nama;
               } else {
                  codeLabel = row.properties.kecamatan_kode;
                  nameLabel = row.properties.kecamatan_nama;
               }

               dataY = {
                  "type": "Feature",
                  "properties": {
                     'data': statusGizi,
                     'state': dArea,
                     'code': codeLabel,
                     'name': nameLabel,
                     'age': dAge,
                     'rse': rowX.rse,
                     'pb_u_normal': rowX.pb_u_normal,
                     'pb_u_pendek': rowX.pb_u_pendek,
                     'pb_u_sangat_pendek': rowX.pb_u_sangat_pendek,
                     'pb_u_stunting': rowX.pb_u_stunting,
                     'jml': rowX.jml,
                     'balita_ditimbang': rowX.balita_ditimbang,
                     'ps': rowX.ps,
                     'puskesmas': row.properties.puskesmas,
                     'lat': row.properties.latitude,
                     'long': row.properties.longitude,
                     'sumber': rowX.sumber,
                     'tahun': rowX.tahun,
                  },
                  'geometry': row.geometry
               };
            }
         });
         dataMap.push(dataY);
      });
      if (dataMap.reduce((a, b) => a + b, 0) === 0) {
         alertMsg(/*html*/`<div class="py-1">Survey <span class="text-uppercase ">${dSurvey.active}</span></div><div class="py-1">Tahun ${dTahun.active}</div><div class="py-1">Cakupan <span class="text-capitalize">${dArea}</span></div><div class=" py-1">Data tidak ditemukan</div>`);
         $("#data_" + mapId).removeClass('loading');
         return false;
      }

      num_gradien = [30, 20, 10, 2.5, 0];
      color_gradien = ["#e32291", "#35b9c5", "#9fd9d8", "#92cea5", "#67ae3d"];
   }
   if (statusGizi == "wasting") {
      datax.features.forEach((row) => {
         let nameLabel,
            codeLabel;
         if (dArea === "provinsi") {
            codeLabel = row.properties.provinsi_kode;
            nameLabel = row.properties.provinsi_nama;
         } else if (dArea === "kabupaten") {
            /* } else if (dArea === "kabupaten") { */
            codeLabel = row.properties.kabupaten_kode;
            nameLabel = row.properties.kabupaten_nama;
         } else {
            codeLabel = row.properties.kecamatan_kode;
            nameLabel = row.properties.kecamatan_nama;
         }
         dataMap.push({
            "type": "Feature",
            "properties": {
               'data': statusGizi,
               'state': dArea,
               'code': codeLabel,
               'name': nameLabel,
               'age': dAge,
               'jml_a2': row.properties.data[0].jml_a2,
               'jml_a3': row.properties.data[0].jml_a3,
               'jml_a1': row.properties.data[0].jml_a1,
               'balita_ditimbang': row.properties.data[0].balita_ditimbang,
               'jml': row.properties.data[0].jml,
               'ps': null,
               'puskesmas': row.properties.puskesmas,
               'lat': row.properties.latitude,
               'long': row.properties.longitude,
               'sumber': row.properties.data[0].sumber,
               'tahun': row.properties.data[0].tahun,
            },
            'geometry': row.geometry
         });
      });
      //console.log(dataMap);
      if (dataMap.reduce((a, b) => a + b, 0) === 0) {
         alertMsg(/*html*/`<div class="py-1">Survey <span class="text-uppercase ">${dSurvey.active}</span></div><div class="py-1">Tahun ${dTahun.active}</div><div class="py-1">Cakupan <span class="text-capitalize">${dArea}</span></div><div class=" py-1">Data tidak ditemukan</div>`);
         $("#data_" + mapId).removeClass('loading');
         return false;
      }
      mapId = "map_wasting";
      num_gradien = [15, 10, 5, 2.5, 0];
      color_gradien = ["#e32291", "#f15a40", "#fbae52", "#a1cd3c", "#7bc1a5"];
   }


   if (statusGizi == "underweight") {
      //console.log("datax", datax);
      datax.features.forEach((row) => {

         let nameLabel,
            codeLabel;
         if (dArea === "provinsi") {
            codeLabel = row.properties.provinsi_kode;
            nameLabel = row.properties.provinsi_nama;
         } else if (dArea === "kabupaten") {
            codeLabel = row.properties.kabupaten_kode;
            nameLabel = row.properties.kabupaten_nama;
         } else {
            codeLabel = row.properties.kecamatan_kode;
            nameLabel = row.properties.kecamatan_nama;
         }
         dataMap.push({
            "type": "Feature",
            "properties": {
               'data': statusGizi,
               'state': dArea,
               'code': codeLabel,
               'name': nameLabel,
               'age': dAge,
               'jml_a2': row.properties.data[0].jml_a2,
               'jml_a3': row.properties.data[0].jml_a3,
               'jml_a1': row.properties.data[0].jml_a1,
               'balita_ditimbang': row.properties.data[0].balita_ditimbang,
               'jml': row.properties.data[0].jml,
               'ps': null,
               'puskesmas': row.properties.puskesmas,
               'lat': row.properties.latitude,
               'long': row.properties.longitude,
               'sumber': row.properties.data[0].sumber,
               'tahun': row.properties.data[0].tahun,
            },
            'geometry': row.geometry
         });
      });
      mapId = "map_underweight";
      num_gradien = [15, 10, 5, 2.5, 0];
      color_gradien = ["#e32291", "#6950a2", "#b0a3d0", "#a1cd3c", "#67ae3d"];
   }

   loadMap("#data_" + mapId, mapId);
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
   var gmap_data = L.geoJSON(dataMap, {
      className: 'shadow',
      onEachFeature: function (feature, layer) {
         let
            titleInfo,
            dataProperties = feature.properties,
            cPuskesmas = Math.floor(Math.random() * 100);
         layer.setStyle(style(dataProperties));
         if ((dArea == "provinsi")) {
            layer.on({
               mousemove: StuntingMapStyleOver,
               mouseout: StuntingMapStyleOut,
               click: whenClickedMe
            });
         } else if (dArea == "kabupaten") {
            layer.on({
               mousemove: StuntingMapStyleOver,
               mouseout: StuntingMapStyleOut,
               click: whenClickedMeKab
            });

         } else {
            layer.on({
               mousemove: StuntingMapStyleOver,
               mouseout: StuntingMapStyleOut
            });
         }
         //console.log(dataProperties);
         if (dArea === "provinsi") {
            titleInfo = /*html*/`<h5 class="card-title fs-13px text-black">Provinsi ${dataProperties.name}</h5>`;
         } else if (dArea === "kabupaten") {
            titleInfo = /*html*/`<h5 class="card-title fs-13px text-black">${kabKotaName(dataProperties.name)}</h5>`;
         } else {
            titleInfo = /*html*/`<h5 class="card-title fs-13px text-black">Kecamatan ${dataProperties.name}</h5>`;
         }

         let pusK = dataProperties.puskesmas;
         //console.log("pusK", pusK);
         let listPusk = [],
            clistPusk = 0,
            i = 1;
         if (pusK != null) {
            clistPusk = pusK.length;
            pusK.forEach((row) => {
               listPusk.push(/*html*/`<div class="fs-10px fw-400"><span>${i++}. </span>Puskesmas ${capitalize(row.nama)} </div>`);
            });
         }
         let cssMarker,
            cssMarkerNum;
         //console.log((clistPusk.toString()).length);
         if ((clistPusk.toString()).length === 4) {
            cssMarker = " fourpointround ";
            cssMarkerNum = " fourpointpos ";
         } else if ((clistPusk.toString()).length === 3) {
            cssMarker = " threepointround ";
            cssMarkerNum = " threepointroundpos ";
         } else if ((clistPusk.toString()).length === 2) {
            cssMarker = " twopointround ";
            cssMarkerNum = " twopointroundpos ";
         } else {
            cssMarker = " onepointround ";
            cssMarkerNum = " onepointroundpos ";
         }
         //console.log(dataProperties.lat);
         let
            boundsMarker = layer.getBounds(),
            centerMarkerBound = boundsMarker.getCenter(),
            centerMarkerLat = [dataProperties.lat, dataProperties.long],
            centerMarker = (typeof dataProperties.lat === 'undefined') ? centerMarkerBound : centerMarkerLat,
            myIcon = L.divIcon({
               className: " bg-blue-600 m-auto rounded icon-map border " + cssMarker,
               html: /*html*/`
               <span class="text-white fs-9px ${cssMarkerNum}" style=" ">${clistPusk}</span>
               `,
               dataText: /*html*/`
               <div class="d-flex justify-content-between bd-highlight border-bottom mb-1">
                  <div class="bd-highlight">
                     ${titleInfo}
                  </div>
                  <div class="bd-highlight">                  
                     <button type="button" class="btn-close fs-10px" style="position: relative;top: -15px; right: -11px;" aria-hidden="true" onclick="closelabel()"></button>
                  </div>
               </div>
               <div class="card-title fs-12px mb-n1 text-black">Puskesmas</div>
               <div class="row">
                  <div class="col-md-12 d-flex">
                     <div class="w-100" >
                        <div class="d-flex justify-content-between bd-highlight my-2">
                           <div class="bd-highlight mx-1 pe-2 overflow-auto" style="max-height: 10em;">
                              ${listPusk.join(" ")}
                           </div>
                        </div>
                        <div class="card-title fs-10px mb-n1 text-black"> Total : ${clistPusk} Puskesmas</div>
                     </div>
                  </div>
               </div>
               `,
               iconAnchor: [5, 15]
            }),
            marker = L.marker(centerMarker,
               {
                  icon: myIcon,
                  radius: 20
               }
            );
         if (clistPusk > 0) {
            marker.addTo(map).on('mouseover',
               function () {
                  let text = $(this)[0].options.icon.options.dataText;
                  $("#loadInfo").removeClass("hide");
                  $("#loadInfoText").html(text);
               }
            );
         }
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
      $("#map_" + statusGizi).addClass('fullscreen-map-dampak');
      $("#mapPrioritas").addClass('fullscreen-map-prioritas');
      $(".jstree-container").addClass('fullscreen-tree-prioritas');
      $("#main-map").addClass('scrool-zoom-page');

      map.fitBounds(gmap_data.getBounds());
      //alert("yes");
   });

   map.on('exitFullscreen', function () {
      $("#map_" + statusGizi).removeClass('fullscreen-map-dampak');
      $("#main-map").removeClass('scrool-zoom-page');
      $("#mapPrioritas").removeClass('fullscreen-map-priorita');
      $(".jstree-container").removeClass('fullscreen-tree-prioritas');
   });

   let
      btnBack = L.control({ position: 'topleft' }),
      nameSection = L.control({ position: 'topleft' }),
      btnHomeReset = L.control({ position: 'topleft' }),
      btnGrafik = L.control({ position: 'topright' }),
      btnCompire = L.control({ position: 'topright' }),
      infoData = L.control({ position: 'bottomright' }),
      logicTahun = L.control({ position: 'bottomleft' }),
      logicArea = L.control({ position: 'bottomleft' }),
      logicAge = L.control({ position: 'bottomleft' }),
      logicSurvey = L.control({ position: 'bottomleft' }),
      legend = L.control({ position: 'bottomright' })
      ;

   legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend fs-12px'),
         grades = num_gradien,
         ginfo = info_gradien,
         labels = ['Dalam persentase (%)'],
         from, to, grange;
      for (var i = 0; i < grades.length; i++) {
         from = grades[i];
         to = parseInt(grades[i - 1]);
         if (i == 0) {
            grange = "<span class='num_persen'>&#8805; " + from + "%</span>";
         } else if (i == (grades.length - 1)) {
            grange = "<span class='num_persen'>&#8805; </span><span class=''>" + grades[i - 1] + "%</span>";
         } else {
            grange = "<span class='num_persen'>" + from + "</span> " + (to ? "<span class=''>&ndash;</span> <span class='num_persen'>&#60;</span><span class=''>" + to + "</span>" : '+') + "<span>%</span>";
         }
         labels.push(
            '<i class="color_info" style="background:' + getColor(from + 1) + '"></i> ' +
            grange + " <span class='level_info' >(" + ginfo[i] + ")</span>"
         );
      }
      labels.push('<div class="level_info right" >Standar : WHO - de Onis es al, 2018</div>');
      div.innerHTML = labels.join('<br>');
      return div;
   };
   legend.addTo(map);
   if (((dArea === "kabupaten") || (dArea === "kecamatan")) && (typeof geoData.area === "undefined")) {

      nameSection.onAdd = function (map) {
         let nameProv,
            nameKab;
         if (statusGizi == "stunting") {
            nameProv = geoData.nameStuntingProv;
            nameKab = geoData.nameStuntingKab;
         } else if (statusGizi == "underweight") {
            nameProv = geoData.nameUnderweightProv;
            nameKab = geoData.nameUnderweightKab;
         } else {
            nameProv = geoData.nameWastingProv;
            nameKab = geoData.nameWastingKab;
         }
         let
            nameSec = dArea === "kabupaten" ? "Provinsi " : "Kabupaten/Kota ",
            name = dArea === "kabupaten" ? nameProv : "Kabupaten/Kota"
            ;
         var container = L.DomUtil.create('div', 'h4 leaflet-control leaflet-control-custom p-0 bg-none');
         container.title = nameSec + name;
         container.innerHTML = /* HTML */`
         <div class="bg-gray-200 py-1 px-2 rounded" style="opacity:0.9">
         Provinsi ${nameProv} 
         ${dArea === "kecamatan" ? "<br><h5 class='pt-1'> Kebupaten " + nameKab + "</h5>" : ""}
         </div>
         `;
         return container;
      };
      nameSection.addTo(map);
   }
   if ((dArea === "provinsi") || (dArea === "kabupaten")) {
      //console.log("ccc", dArea);
      logicTahun.onAdd = function (map) {
         let thn = [],
            div = L.DomUtil.create('div');
         div.setAttribute("id", "tahunParam_" + statusGizi);
         dTahun.data.forEach((row, index) => {
            thn.push(`
               <div class="form-check mb-n1">
                  <input class="form-check-input" type="radio" name="pilih_tahun" value="${row}" OnChange="pilihTahun(this)"  ${row == dTahun.active ? "checked='checked'" : ""} id="flexRadioDefaulta${index}">
                  <label class="form-check-label  fs-11px fw-600" for="flexRadioDefaulta${index}">
                     ${dSurvey.active == "eppgbm" ? row + " Februari" : row}
                  </label>
               </div>
            `);
         });

         div.innerHTML = `
            <p class="h6"  id="pilihTahun" data-tahun= ${JSON.stringify(dTahun.data)} >Pilih Tahun</p>
            <div class="leaflet-control-layers leaflet-control-layers-expanded">
               ${thn.join("")}
            </div>
            `;
         return div;
      }
      logicTahun.addTo(map);

      logicSurvey.onAdd = function (map) {
         let surv = [],
            survComp = [],
            div = L.DomUtil.create('div');
         div.setAttribute("id", "surveyParam_" + statusGizi);
         //console.log(dSurvey.data);
         dSurvey.data.forEach((row, index) => {
            surv.push(`
            <div class="form-check mb-n1">
                  <input class="form-check-input" type="radio" name="pilih_survey" value="${row}" OnChange="pilihSurvey(this)"  ${row == dSurvey.active ? "checked='checked'" : ""} id="flexRadioDefaultb${index}">
                  <label class="form-check-label text-uppercase  fs-11px fw-600" for="flexRadioDefaultb${index}">
                     ${row}
                  </label>
               </div>
            `);
            survComp.push(`
               <div class="form-check my-1">
                  <input class="form-check-input" type="radio" name="pilih_surveyComp" value="${row}" OnChange="pilihSurveyComp(this)" id="flexRadioDefaultb${index}Comp">
                  <label class="form-check-label text-uppercase  fs-11px fw-600" for="flexRadioDefaultb${index}Comp">
                     ${row}
                  </label>
               </div>
            `);
         });

         div.innerHTML = `
            <p class="h6" id="pilihSumber" data-survey= ${JSON.stringify(dSurvey.data)}>Pilih Sumber Data</p>
            <div class="leaflet-control-layers leaflet-control-layers-expanded">
               ${surv.join("")}
            </div>
               `;
         $("#compireData").html(/*html*/`
         <div class="leaflet-control pt-4 w-100" id="surveyParam_comp">
            <div class="d-flex flex-row bd-highlight">
               <div class="bd-highlight">
                  <p class="fs-12px fw-600 mb-2" id="pilihSumberComp" data-survey= ${JSON.stringify(dSurvey.data)}>Pilih Sumber Data</p>
                  <div class="leaflet-control-layers leaflet-control-layers-expanded" id="load-survey-komparasi">
                     ${survComp.join("")}
                  </div>
               </div>
               <div class="bd-highlight">
                  <div class="leaflet-control ms-4 hide" id="tahunParam_comp" >
                  <p class="fs-12px fw-600 mb-2 hide" id="pilihTahunComp" data-tahun="[]">Pilih Tahun</p>
                  <div class="leaflet-control-layers leaflet-control-layers-expanded" id="tahunLodParam"></div>
                  </div>
               </div>
            </div>
            <div class="mt-3 hide">
               <div class="btn btn-primary py-1 fs-10px" id="expKomparasi" title="export xls" onclick="toXls('#tabelKomparasi','xls','komparasi.xls');">Export XLS</div>
            </div>
            <div class="mt-3 hide">
               <div class="fs-10px" id="tabelKomparasi"></div>
            </div>
         </div>
         `);

         if (dArea === "kabupaten") {
            surveyLoad(statusGizi, dAge, dArea).then(function (x) {
               $("#load-survey-komparasi").html(x);
            });
         }
         //$("#btnKompar").parent().parent().show();
         return div;
      }
      logicSurvey.addTo(map);

      logicAge.onAdd = function (map) {
         var
            selectBalita = (dAge == 'balita') ? 'checked = "checked"' : '',
            selectBaduta = (dAge == 'baduta') ? 'checked = "checked"' : '',
            disabledBaduta = (dArea == "kabupaten") ? 'disabled = "disabled"' : '',
            div = L.DomUtil.create('div');
         div.setAttribute("id", "usiaParam_" + statusGizi);
         div.innerHTML = /* HTML */`
            <p class="h6">Pilih Usia</p>      
            <div class="leaflet-control-layers leaflet-control-layers-expanded">
               <div class="form-check mb-n1">
                  <input class="form-check-input" type="radio" name="radio_age" value="balita" onchange="r_age(this)"  ${selectBalita} id="balitaRadio">
                  <label class="form-check-label  fs-11px fw-600" for="balitaRadio">
                     Balita
                  </label>
               </div>
               <div class="form-check mb-n1">
                  <input class="form-check-input" type="radio" name="radio_age" value="baduta" onchange="r_age(this)"  ${selectBaduta} ${disabledBaduta} id="badutaRadio" >
                  <label class="form-check-label  fs-11px fw-600" for="badutaRadio">
                     Baduta
                  </label>
               </div>
            </div>
         `;
         return div;
      }
      logicAge.addTo(map);

      logicArea.onAdd = function (map) {

         var
            selectProv = (dArea == 'provinsi') ? 'checked = "checked"' : '',
            selectKab = (dArea == 'kabupaten') ? 'checked = "checked"' : '',
            div = L.DomUtil.create('div'),
            disabled = '';
         div.setAttribute("id", "areaParam_" + statusGizi);
         div.innerHTML = /* HTML */`
            <p class="h6">Pilih Area</p>      
            <div class="leaflet-control-layers leaflet-control-layers-expanded">
               <div class="form-check mb-n1">
                  <input class="form-check-input" type="radio" name="radio_area" value="provinsi" onchange="r_area(this)"  ${selectProv} id="flexRadioDefaultA">
                  <label class="form-check-label  fs-11px fw-600" for="flexRadioDefaultA">
                     Provinsi
                  </label>
               </div>
               <div class="form-check mb-n1">
                  <input class="form-check-input" type="radio" name="radio_area" value="kabupaten" onchange="r_area(this)"  ${selectKab} id="flexRadioDefaultB"  ${disabled}>
                  <label class="form-check-label  fs-11px fw-600" for="flexRadioDefaultB">
                     Kabupaten
                  </label>
               </div>
            </div>
         `;
         return div;
      }
      logicArea.addTo(map);

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
   }


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

   btnGrafik.onAdd = function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0 bg-none');
      container.title = 'Lihat Grafik';
      container.innerHTML = /* HTML */`
         <div class="menu-icon" style="margin-bottom: -0.4em;">
            <i class="medium material-icons bg-white text-black" id="showChart" data-bs-toggle="modal" data-bs-target="#GrafikModal" >insert_chart</i>
         </div>
         `;
      container.onclick = function () {

         let
            dataMap = datax.features,
            param,
            ageR,
            surveyR,
            tahunR,
            pilih_area = document.querySelector('input[name="radio_area"]:checked').value
            ;
         console.log("dArea", dArea);
         console.log("statusGizi", statusGizi);
         if (dArea == "kabupaten" && pilih_area == "provinsi") {
            if (statusGizi == "stunting") {
               dataMap = geoData.dataStuntingProvKab.features;
               ageR = geoData.paramStuntingKab.age;
               surveyR = geoData.paramStuntingKab.sumber;
               tahunR = geoData.paramStuntingKab.tahun;
            } else if (statusGizi == "underweight") {
               dataMap = geoData.dataUnderweightProvKab.features;
               ageR = geoData.paramUnderweightKab.age;
               surveyR = geoData.paramUnderweightKab.sumber;
               tahunR = geoData.paramUnderweightKab.tahun;
            } else {
               dataMap = geoData.dataWastingProvKab.features;
               ageR = geoData.paramWastingKab.age;
               surveyR = geoData.paramWastingKab.sumber;
               tahunR = geoData.paramWastingKab.tahun;
            }

         } else {
            ageR = document.querySelector("[name='radio_age']:checked").value;
            surveyR = document.querySelector("[name='pilih_survey']:checked").value;
            tahunR = document.querySelector("[name='pilih_tahun']:checked").value;
         }
         console.log("dataMap", dataMap);
         param = { "ageR": ageR, "surveyR": surveyR, "tahunR": tahunR };
         getChart(statusGizi, dataMap, dArea, param);
      }
      return container;
   };
   btnGrafik.addTo(map);

   var elmData = $("#elmsidebarR").html(),
      sidebar = L.control.sidebar('sidebarR', {
         closeButton: true,
         position: 'right'
      });

   map.addControl(sidebar);
   $("#elmsidebarR").html(elmData);
   $("#sidebarR").parent().find(".close").on("click", function () {
      $("#areaParam_" + statusGizi + ",#usiaParam_" + statusGizi + ",#surveyParam_" + statusGizi + ",#tahunParam_" + statusGizi + "").show();
      $(".leaflet-right").toggleClass('leaflet-right-move');
      if ($(".leaflet-right").hasClass('leaflet-right-move')) {
         geoData.compare = true;
      } else {
         geoData.compare = false;
      }
   });
   $("#sidebarR").parent().addClass("w-25").attr("style", "z-index: 999");

   btnCompire.onAdd = function (map) {
      var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0 bg-none');
      container.title = 'Komparasi Data';
      container.innerHTML = /* HTML */`
         <div class="menu-icon" style="margin-bottom: -0.3em;">
            <i class="medium material-icons bg-white text-black" id="btnKompar" >compare_arrows</i>
         </div>
         `;
      container.onclick = function () {
         /* $("#sidebarR").addClass("loading"); */
         map.closePopup();
         sidebar.toggle();
         $("#areaParam_" + statusGizi + ",#usiaParam_" + statusGizi + ",#surveyParam_" + statusGizi + ",#tahunParam_" + statusGizi + "").toggle();
         $(".leaflet-right").toggleClass('leaflet-right-move');
         if ($(".leaflet-right").hasClass('leaflet-right-move')) {
            geoData.compare = true;
         } else {
            geoData.compare = false;
         }

         let
            ageR,
            surveyR,
            tahunR;

         if (dArea == "kabupaten") {
            if (statusGizi == "stunting") {
               dataMap = geoData.dataStuntingProvKab.features;
               ageR = geoData.paramStuntingKab.age;
               surveyR = geoData.paramStuntingKab.sumber;
               tahunR = geoData.paramStuntingKab.tahun;
            } else if (statusGizi == "underweight") {
               dataMap = geoData.dataUnderweightProvKab.features;
               ageR = geoData.paramUnderweightKab.age;
               surveyR = geoData.paramUnderweightKab.sumber;
               tahunR = geoData.paramUnderweightKab.tahun;
            } else {
               dataMap = geoData.dataWastingProvKab.features;
               ageR = geoData.paramWastingKab.age;
               surveyR = geoData.paramWastingKab.sumber;
               tahunR = geoData.paramWastingKab.tahun;
            }

         } else {
            ageR = document.querySelector("[name='radio_age']:checked").value;
            surveyR = document.querySelector("[name='pilih_survey']:checked").value;
            tahunR = document.querySelector("[name='pilih_tahun']:checked").value;
         }
         param = { "ageR": ageR, "surveyR": surveyR, "tahunR": tahunR };
         $("#paramData").html(/*html*/ `
         <div class="d-flex flex-row bd-highlight mt-3">
            <div class="bd-highlight h5 pe-1 w-25">Tag : </div>
            <div class="bd-highlight">
               <span class="badge bg-primary">#${ageR}</span>
               <span class="badge bg-info">#${surveyR}</span>
               <span class="badge bg-purple">#${tahunR}</span>
            </div>
         </div>
         `);
         /* $("#sidebarR").removeClass("loading"); */
         //getChart(statusGizi, dataMap, dArea, param);
      }
      return container;
   };
   /* if (dArea != "kecamatan") {
      btnCompire.addTo(map);
   } */
   //$("#btnKompar").parent().parent().hide();

   infoData.onAdd = function (map) {
      let div = L.DomUtil.create('div')
      div.innerHTML = /*html*/`
      <div id="loadInfo" class="card bg-white-100 h-100 hide" style="position: relative;right: 0em;top: 0em;opacity: 0.95;max-height: 16.7em !important;min-width: 13.7em;">
         <div class="card-body" id="loadInfoText"></div>
      </div>
      `;
      return div;
   };
   infoData.addTo(map);

   if (((dArea === "kabupaten") || (dArea === "kecamatan")) && (typeof geoData.area === "undefined")) {
      btnBack.onAdd = function (map) {
         var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom btn btn-light p-0 bg-none');
         container.title = 'Kembali ke Awal Peta';
         container.innerHTML = /* HTML */`
         <div class="menu-icon bg-white">
            <i class="medium material-icons text-black pt-1" >arrow_back</i>
         </div>
         `;
         container.onclick = function () {
            let mapBack;
            if (statusGizi == "stunting") {
               if (dArea === "kabupaten") {
                  mapBack = mapStunting(geoData.dataStunting, "provinsi");
               } else {
                  mapBack = mapStunting(geoData.dataStuntingProvKab, "kabupaten");
               }
            } else if (statusGizi == "underweight") {
               if (dArea === "kabupaten") {
                  mapBack = mapUnderweight(geoData.dataUnderweight, "provinsi");
               } else {
                  mapBack = mapUnderweight(geoData.dataUnderweightProvKab, "kabupaten");
               }
            } else {
               if (dArea === "kabupaten") {
                  mapBack = mapWasting(geoData.dataWasting, "provinsi");
               } else {
                  mapBack = mapWasting(geoData.dataWastingProvKab, "kabupaten");
               }
            }
            return mapBack;
         }

         $("#areaParam_" + statusGizi + ",#usiaParam_" + statusGizi + ",#surveyParam_" + statusGizi + ",#tahunParam_" + statusGizi + "").addClass("hide");
         return container;
      };
      btnBack.addTo(map);
   }

   function getChart(statusGizi, data, area, param = {}) {
      //console.log(param.surveyR);
      let
         nameTitle = statusGizi.toUpperCase(),
         ageR = param.ageR,
         surveyR = param.surveyR,
         tahunR = param.tahunR,
         dataX,
         dataA = [],
         dataB = [],
         dataD = [],
         optionData = [],
         subData;

      if (statusGizi == "stunting") {
         subData = geoData.dataNasional.stunting;
      } else if (statusGizi == "underweight") {
         subData = geoData.dataNasional.underweight;
      } else {
         subData = geoData.dataNasional.wasting;
      }
      //console.log("data", data);
      Object.values(subData).forEach((rowX) => {
         //console.log("rowX", rowX);
         if (
            rowX.tahun.includes(tahunR) && rowX.age.includes(ageR) && rowX.sumber.includes(surveyR)
         ) {
            dataX = rowX;
         }
      });
      if (statusGizi == "stunting") {
         data.forEach((row) => {
            //console.log("ccc", row.properties);
            var nameOp = (area === "provinsi") ? row.properties.provinsi_nama : row.properties.kabupaten_nama;
            let dataOp;
            if (row.properties.data[0].sumber === "eppgbm") {
               dataOp = {
                  "name": nameOp,
                  "value": row.properties.data[0].pb_u_stunting,
                  "nasional": parseFloat(dataX.pb_u_stunting, 2),
                  "balita_ditimbang": row.properties.data[0].balita_ditimbang
               };
            } else if (row.properties.data[0].sumber === "ssgi") {
               dataOp = {
                  "name": nameOp,
                  "value": row.properties.data[0].pb_u_stunting,
                  "nasional": parseFloat(dataX.pb_u_stunting, 2),
                  "rse": Number(row.properties.data[0].rse)
               };
            } else {
               dataOp = {
                  "name": nameOp,
                  "value": row.properties.data[0].pb_u_stunting,
                  "nasional": parseFloat(dataX.pb_u_stunting, 2)
               };
            }
            if (area != "provinsi") {
               console.log(dataOp);
               dataD.push(dataOp);
            } else {
               let dataOpx;
               if (provPrioritasKhusus.includes(row.properties.provinsi_nama)) {
                  if (row.properties.data[0].sumber === "eppgbm") {
                     dataOpx = {
                        "name": nameOp,
                        "value": row.properties.data[0].pb_u_stunting,
                        "nasional": parseFloat(dataX.pb_u_stunting, 2),
                        "balita_ditimbang": row.properties.data[0].balita_ditimbang
                     };
                  } else {
                     dataOpx = {
                        "name": nameOp,
                        "value": row.properties.data[0].pb_u_stunting,
                        "nasional": parseFloat(dataX.pb_u_stunting, 2),
                     };
                  }
                  dataA.push(dataOpx);


               } else {
                  let dataOpy;
                  if (row.properties.data[0].sumber === "eppgbm") {
                     dataOpy = {
                        "name": nameOp,
                        "value": row.properties.data[0].pb_u_stunting,
                        "nasional": parseFloat(dataX.pb_u_stunting, 2),
                        "balita_ditimbang": row.properties.data[0].balita_ditimbang
                     };
                  } else if (row.properties.data[0].sumber === "ssgi") {
                     dataOpy = {
                        "name": nameOp,
                        "value": row.properties.data[0].pb_u_stunting,
                        "nasional": parseFloat(dataX.pb_u_stunting, 2),
                        "rse": (typeof row.properties.data[0].rse != "undefined") ? parseFloat(row.properties.data[0].rse, 2) : ""
                     };
                  } else {
                     dataOpy = {
                        "name": nameOp,
                        "value": row.properties.data[0].pb_u_stunting,
                        "nasional": parseFloat(dataX.pb_u_stunting, 2),
                     };
                  }
                  dataB.push(dataOpy);
               }
            }
            optionData.push("<option value='" + JSON.stringify(dataOp) + "' selected='selected'>" + nameOp + "</option>");
         });
      } else if (statusGizi == "underweight") {
         data.forEach((row) => {
            let nameOp = (area === "provinsi") ? row.properties.provinsi_nama : row.properties.kabupaten_nama,
               dataOp = {
                  "name": nameOp,
                  "value": row.properties.data[0].jml_a1,
                  "nasional": (typeof dataX == "undefined" ? 0 : parseFloat(dataX.jml_a1, 2)),
               };
            if (area != "provinsi") {
               dataD.push(dataOp);
            } else {
               if (provPrioritasKhusus.includes(row.properties.provinsi_nama)) {
                  dataA.push({
                     "name": nameOp,
                     "value": row.properties.data[0].jml_a1,
                     "nasional": (typeof dataX == "undefined" ? 0 : parseFloat(dataX.jml_a1, 2)),
                  });
               } else {
                  dataB.push({
                     "name": nameOp,
                     "value": row.properties.data[0].jml_a1,
                     "nasional": (typeof dataX == "undefined" ? 0 : parseFloat(dataX.jml_a1, 2)),
                  });
               }
            }
            optionData.push("<option value='" + JSON.stringify(dataOp) + "' selected='selected'>" + nameOp + "</option>");
         });
      } else {
         /*wasting if change data*/
         console.log("data", data);
         data.forEach((row) => {
            let nameOp = (area === "provinsi") ? row.properties.provinsi_nama : row.properties.kabupaten_nama,
               dataOp = {
                  "name": nameOp,
                  "value": row.properties.data[0].jml_a1,
                  "nasional": (typeof dataX == "undefined" ? 0 : parseFloat(dataX.jml_a1, 2)),
               };
            if (area != "provinsi") {
               dataD.push(dataOp);
            } else {
               if (provPrioritasKhusus.includes(row.properties.provinsi_nama)) {
                  dataA.push({
                     "name": nameOp,
                     "value": row.properties.data[0].jml_a1,
                     "nasional": (typeof dataX == "undefined" ? 0 : parseFloat(dataX.jml_a1, 2)),
                  });
               } else {
                  dataB.push({
                     "name": nameOp,
                     "value": row.properties.data[0].jml_a1,
                     "nasional": (typeof dataX == "undefined" ? 0 : parseFloat(dataX.jml_a1, 2)),
                  });
               }
            }
            optionData.push("<option value='" + JSON.stringify(dataOp) + "' selected='selected'>" + nameOp + "</option>");
         });
      }

      let dataC;
      if (area === "provinsi") {
         var sorted = cbSort(dataA, function (item) {
            return item.value; // make this as complex as you like
         });
         dataC = (sorted).concat(dataB);
      } else {
         dataC = dataD;
      }
      console.log("dataC", dataC);
      let nameArea = (area === "kabupaten") ? "kabupaten" : area;
      document.querySelector("#chart_stunting").innerHTML = /* HTML */`
         <div class="d-flex justify-content-end ">
            <div class="bd-highlight h6 pt-2 px-2" >Filter : </div>
            <div class="form-group sel_src bd-highlight me-3">
               <select id="sel_src" name="sel_src" class="form-control selectpicker" data-live-search="true" data-title="Pilih ${capitalize(nameArea)}" data-show-subtext="true" data-actions-box="true" multiple="" data-selected-text-format="count > 2" data-select-all-text="Pilih Semua" data-deselect-all-text="Reset" data-count-selected-text="{0}  ${capitalize(nameArea)} dipilih" >
                  ${optionData}
               </select>
            </div>
         </div>      
         <div id='chart_stuntingx' style='height:500px'></div>`;
      $('select').selectpicker();
      am5.ready(function () {
         var root = am5.Root.new("chart_stuntingx");
         root.setThemes([am5themes_Animated.new(root)]);
         var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
               panX: false,
               panY: false,
               wheelX: "panX",
               wheelY: "zoomX",
               layout: root.verticalLayout
            })
         );
         chart.set(
            "scrollbarX",
            am5.Scrollbar.new(root, {
               orientation: "horizontal"
            })
         );

         var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
         xRenderer.labels.template.setAll({
            rotation: -50,
            fontSize: 12,
            centerY: am5.p50,
            centerX: am5.p100,
            paddingRight: 15
         });
         var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "name",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
         }));

         xAxis.data.setAll(dataC); /* name */

         var yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
               maxDeviation: 0.3,
               min: 0,
               extraMax: 0.1,
               renderer: am5xy.AxisRendererY.new(root, {})
            })
         );

         // Add series
         // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
         var label0 = am5.Label.new(root, {
            rotation: -90,
            text: "Prevalensi (%)",
            y: am5.p50,
            centerX: am5.p50
            //x: am5.p0,
            //centerY: am5.p0
         }),
            yAxis0 = chart.yAxes.push(
               am5xy.ValueAxis.new(root, {
                  renderer: am5xy.AxisRendererY.new(root, {})
               })
            );
         yAxis0.children.unshift(
            label0
         );

         var series1 = chart.series.push(
            am5xy.ColumnSeries.new(root, {
               name: "Wilayah",
               xAxis: xAxis,
               yAxis: yAxis,
               valueYField: "value",
               categoryXField: "name",
               // fill: "red",
               /* data prov/kab */
               tooltip: am5.Tooltip.new(root, {
                  pointerOrientation: "horizontal",
                  labelText: " {categoryX}: {valueY} %"
               })
            })
         );
         series1.columns.template.setAll({
            cornerRadiusTL: 5,
            cornerRadiusTR: 5,
            tooltipY: am5.percent(10),
            templateField: "columnSettings",
         });

         series1.data.setAll(dataC); /* batang */

         var series2 = chart.series.push(
            am5xy.LineSeries.new(root, {
               name: "Nasional",
               xAxis: xAxis,
               yAxis: yAxis,
               valueYField: "nasional",
               categoryXField: "name",
               tooltip: am5.Tooltip.new(root, {
                  pointerOrientation: "horizontal",
                  labelText: " Nasional: {valueY} %"
               })
            })
         );

         series2.strokes.template.setAll({
            strokeWidth: 5,
            templateField: "strokeSettings"
         });

         series2.data.setAll(dataC); /* nasional garis */
         var i = 0;

         series1.columns.template.adapters.add("fill", function (fill, target) {
            var s2DataItem = series2.dataItems[i];
            if (target.dataItem.get("valueY") > s2DataItem.get("valueY")) {
               //return am5.color(0x50b300);
               return am5.color(0xCD5C5C);
            }
            else {
               //return am5.color(0x8d8d8d);
               return am5.color(0x80D60B);
            }
         });
         //series2.set("fill", ["white", am5.color("#00ff00")]);

         if (surveyR === "eppgbm") {
            var yRenderer1 = am5xy.AxisRendererY.new(root, {
               opposite: true
            });
            yRenderer1.grid.template.set("forceHidden", true);

            var yAxis1 = chart.yAxes.push(
               am5xy.ValueAxis.new(root, {
                  renderer: yRenderer1,
                  syncWithAxis: yAxis0
               })
            );
            var label1 = am5.Label.new(root, {
               rotation: -90,
               text: "Bayi ditimbang (%)",
               FontWeight: "1600",
               y: am5.p50,
               centerX: am5.p50
            })
            yAxis1.children.unshift(
               label1
            );

            var series3 = chart.series.push(
               am5xy.LineSeries.new(root, {
                  name: "Bayi Ditimbang",
                  xAxis: xAxis,
                  yAxis: yAxis1,
                  //fill: "red",
                  valueYField: "balita_ditimbang",
                  categoryXField: "name",
                  tooltip: am5.Tooltip.new(root, {
                     pointerOrientation: "horizontal",
                     labelText: " Bayi ditimbang: {valueY} %"
                  })
               })
            );
            series3.bullets.push(function () {
               return am5.Bullet.new(root, {
                  sprite: am5.Circle.new(root, {
                     radius: 4,
                     fill: series3.get("fill")
                  })
               });
            });
            series3.bullets.push(function (root, series, dataItem) {
               return am5.Bullet.new(root, {
                  sprite: am5.Label.new(root, {
                     text: dataItem.get("valueY") + "%",
                     fontSize: 9,
                     fill: series3.get("fill"),
                     centerX: am5.p50,
                     centerY: am5.p100,
                     dx: 5
                  })
               });
            });
            series3.strokes.template.setAll({
               strokeWidth: 1,
               templateField: "strokeSettings"
            });
            series3.data.setAll(dataC); /* bayi ditimbang garis */
         }

         if (surveyR === "ssgi" && tahunR == 2021) {

            var yRenderer1 = am5xy.AxisRendererY.new(root, {
               opposite: true
            });
            yRenderer1.grid.template.set("forceHidden", true);

            var yAxis1 = chart.yAxes.push(
               am5xy.ValueAxis.new(root, {
                  renderer: yRenderer1,
                  syncWithAxis: yAxis0
               })
            );
            var label1 = am5.Label.new(root, {
               rotation: -90,
               text: "Relative Standard Error (RSE)",
               FontWeight: "1600",
               y: am5.p50,
               centerX: am5.p50
            })
            yAxis1.children.unshift(
               label1
            );

            var series3 = chart.series.push(
               am5xy.LineSeries.new(root, {
                  name: "Relative Standard Error (RSE)",
                  xAxis: xAxis,
                  yAxis: yAxis1,
                  //fill: "red",
                  valueYField: "rse",
                  categoryXField: "name",
                  tooltip: am5.Tooltip.new(root, {
                     pointerOrientation: "horizontal",
                     labelText: " Relative Standard Error (RSE): {valueY}"
                  })
               })
            );
            series3.bullets.push(function () {
               return am5.Bullet.new(root, {
                  sprite: am5.Circle.new(root, {
                     radius: 4,
                     fill: series3.get("fill")
                  })
               });
            });
            series3.bullets.push(function (root, series, dataItem) {
               return am5.Bullet.new(root, {
                  sprite: am5.Label.new(root, {
                     text: dataItem.get("valueY") + "%",
                     fontSize: 9,
                     fill: series3.get("fill"),
                     centerX: am5.p50,
                     centerY: am5.p100,
                     dx: 5
                  })
               });
            });
            series3.strokes.template.setAll({
               strokeWidth: 1,
               templateField: "strokeSettings"
            });
            series3.data.setAll(dataC); /* bayi ditimbang garis */
         }


         $('#sel_src').on("change", function () {

            let dataX = JSON.parse("[" + $(this).val().toString() + "]");
            let dataA = [];
            let dataB = [];
            let dataC;

            if (area != "provinsi") {
               dataC = dataX;
            } else {
               dataX.forEach((row) => {
                  //console.log("row", row);
                  //console.log("provPrioritasKhusus", provPrioritasKhusus);
                  if (provPrioritasKhusus.includes(row.name)) {
                     dataA.push({
                        "name": row.name,
                        "value": row.value,
                        "nasional": row.nasional,
                     });
                  } else {
                     dataB.push({
                        "name": row.name,
                        "value": row.value,
                        "nasional": row.nasional,
                     });
                  }
               });
               var sorted = cbSort(dataA, function (item) {
                  return item.value; // make this as complex as you like
               });
               dataC = (sorted).concat(dataB);

            }
            xAxis.data.setAll(dataC);
            series1.data.setAll(dataC);
            series2.data.setAll(dataC);
         });

         // Add export menu
         var exporting = am5plugins_exporting.Exporting.new(root, {

            menu: am5plugins_exporting.ExportingMenu.new(root, {
               align: "right",
               valign: "top",
               paddingRight: 3
            })
         });

         chart.set("cursor", am5xy.XYCursor.new(root, {}));

         // Add legend
         // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
         var legend = chart.children.push(
            am5.Legend.new(root, {
               centerX: am5.p50,
               x: am5.p50
            })
         );
         legend.data.setAll(chart.series.values);

         // Make stuff animate on load
         // https://www.amcharts.com/docs/v5/concepts/animations/
         // chart.appear(1000, 100);
         // series1.appear();
         let sumber_data = param.surveyR == "eppgbm" ? surveyR.toUpperCase() + " Februari" : surveyR.toUpperCase();
         chart.children.unshift(am5.Label.new(root, {
            text: "Sumber data : " + sumber_data + " | Tahun : " + tahunR + " | Usia : " + capitalize(ageR),
            fontSize: 15,
            fontWeight: "100",
            textAlign: "center",
            x: am5.percent(50),
            centerX: am5.percent(50),
            paddingTop: 5,
            paddingBottom: 10
         }));

         chart.children.unshift(am5.Label.new(root, {
            text: "Prevalensi " + capitalize(nameTitle),
            fontSize: 25,
            fontWeight: "500",
            textAlign: "center",
            x: am5.percent(50),
            centerX: am5.percent(50),
            paddingTop: 0,
            paddingBottom: 0
         }));
      }); // end am5.ready()
   }
   /* chart sampe sini */

   var popup = new L.Popup({ autoPan: false });

   /* Function */
   function getColor(d) {
      var scolor = d > num_gradien[0] ? color_gradien[0] :
         d > num_gradien[1] ? color_gradien[1] :
            d > num_gradien[2] ? color_gradien[2] :
               d > num_gradien[3] ? color_gradien[3] :
                  color_gradien[4];
      return scolor;
   }

   function StuntingMapStyleOver(e) {
      //console.log("rrr", e.target.feature.properties);
      var layer = e.target, vcolor;
      if (statusGizi == "stunting") {
         vcolor = layer.feature.properties.pb_u_stunting;
      }
      if (statusGizi == "wasting") {
         vcolor = layer.feature.properties.jml_a1;
      }
      if (statusGizi == "underweight") {
         vcolor = layer.feature.properties.jml_a1;
      }
      //console.log("dArea", dArea);
      //console.log("ddd", layer.feature.properties);
      var layer_map = label_map(layer.feature.properties, getColor(vcolor));
      popup.setLatLng(e.latlng);
      popup.setContent(layer_map);
      if (!popup._map) popup.openOn(map)
      window.clearTimeout(closeTooltip);
      if (!L.Browser.ie && !L.Browser.opera) {
         layer.bringToFront();
      }
      return this.setStyle(styleOver());
   }
   function StuntingMapStyleOut(e) {
      if (geoData.compare === true) { return false; }
      closeTooltip = window.setTimeout(function () {
         map.closePopup();
      }, 100);
      return this.setStyle(styleOut());
   }
   /* action on poligon */
   async function whenClickedMe(e) {
      console.log(geoData.dArea);
      if (geoData.compare === true) { return false; }
      //console.log(geoData);
      delete geoData.area;
      let layer = e.target.feature.properties,
         paramDampak = {
            "provinsi": layer.code,
            "area": "provinsi",
            "sumber": layer.sumber,
            "tahun": layer.tahun,
            "age": layer.age
         };
      //console.log("ddd", e.target);
      $("#data_map_" + layer.data).addClass('loading');
      if (layer.age === "baduta") {
         $("#data_map_" + layer.data).removeClass('loading');
         return false;
      }
      if (layer.data === "stunting") {
         try {
            let res = await fetch(config.api_url + '/dampak/stuntingpartial', {
               method: 'POST',
               body: JSON.stringify(paramDampak),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            //console.log("_res.data", _res.data);
            geoData.dataStuntingProvKab = _res.data;
            geoData.paramStuntingKab = paramDampak;
            geoData.nameStuntingProv = layer.name;
         } catch (e) {
            return false;
         }

         if (geoData.dataStuntingProvKab.features === null) {
            $("#data_map_" + layer.data).removeClass('loading');
            return false;
         };

         //console.log(geoData.dataStuntingProvKab);
         mapStunting(geoData.dataStuntingProvKab, "kabupaten");
      }

      if (layer.data === "underweight") {
         try {
            let res = await fetch(config.api_url + '/dampak/underweightpartial', {
               method: 'POST',
               body: JSON.stringify(paramDampak),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.dataUnderweightProvKab = _res.data;
            geoData.paramUnderweightKab = paramDampak;
            geoData.nameUnderweightProv = layer.name;
         } catch (e) {
            return false;
         }
         if (geoData.dataUnderweightProvKab.features === null) {
            $("#data_map_" + layer.data).removeClass('loading');
            return false;
         };
         mapUnderweight(geoData.dataUnderweightProvKab, "kabupaten");
      }
      if (layer.data === "wasting") {
         try {
            let res = await fetch(config.api_url + '/dampak/wastingpartial', {
               method: 'POST',
               body: JSON.stringify(paramDampak),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.dataWastingProvKab = _res.data;
            geoData.paramWastingKab = paramDampak;
            geoData.nameWastingProv = layer.name;
            //console.log("geoData.dataWastingProvKab", geoData.dataWastingProvKab);
         } catch (e) {
            return false;
         }
         if (geoData.dataWastingProvKab.features === null) {
            $("#data_map_" + layer.data).removeClass('loading');
            return false;
         };
         mapWasting(geoData.dataWastingProvKab, "kabupaten");
      }
      return false;
   }
   async function whenClickedMeKab(e) {
      if (geoData.compare === true) { return false; }
      //console.log("kabX", e.target.feature);
      var dataMap;
      let dataX = e.target.feature.properties,
         tabX = dataX.data,
         paramData = {
            age: dataX.age,
            area: "kecamatan",
            kabupaten: dataX.code,
            sumber: dataX.sumber,
            tahun: dataX.tahun
         };
      //console.log("kabX", tabX);
      if (tabX === "stunting") {
         try {
            let res = await fetch(config.api_url + '/dampak/stuntingpartial', {
               method: 'POST',
               body: JSON.stringify(paramData),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.dataKecamatanStunting = _res.data;
            geoData.nameStuntingKab = dataX.name;
            if (geoData.dataKecamatanStunting.features === null) { return false; };
            mapStunting(geoData.dataKecamatanStunting, paramData.area);
         } catch (e) {
            return false;
         }
      }
      if (tabX === "wasting") {
         try {
            let res = await fetch(config.api_url + '/dampak/wastingpartial', {
               method: 'POST',
               body: JSON.stringify(paramData),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.dataKecamatanWasting = _res.data;
            geoData.nameWastingKab = dataX.name;
            if (geoData.dataKecamatanWasting.features === null) { return false; }
            mapWasting(geoData.dataKecamatanWasting, paramData.area);
         } catch (e) {
            return false;
         }
      }
      if (tabX === "underweight") {
         try {
            let res = await fetch(config.api_url + '/dampak/underweightpartial', {
               method: 'POST',
               body: JSON.stringify(paramData),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.dataKecamatanUnderweight = _res.data;
            geoData.nameUnderweightKab = dataX.name;
            if (geoData.dataKecamatanUnderweight.features === null) { return false; };
            mapUnderweight(geoData.dataKecamatanUnderweight, paramData.area);
         } catch (e) {
            return false;
         }
      }
   }

   function style(feature) {
      if (statusGizi == "stunting") {
         feature = feature.pb_u_stunting;
      }
      if (statusGizi == "wasting") {
         feature = feature.jml_a1;
      }
      if (statusGizi == "underweight") {
         feature = feature.jml_a1;
      }
      var color_poligon = {
         weight: 1,
         opacity: 1,
         color: 'rgba(35,35,35,1.0)',
         dashArray: '',
         fillOpacity: 1,
         fillColor: getColor(feature)
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
   if (typeof state.click != "undefined") {
      $("#btnKompar,#showChart").parent().parent().hide();
      if (state.click.click === "area") {
         $("#usiaParam_" + statusGizi + ",#surveyParam_" + statusGizi + ",#tahunParam_" + statusGizi).fadeOut(10, function () {
            $("#usiaParam_" + statusGizi).fadeIn(2000);
            $("#surveyParam_" + statusGizi).fadeIn(2000);
            $("#tahunParam_" + statusGizi).fadeIn(2000);
         });
      }
      if (state.click.click === "age") {
         $("#surveyParam_" + statusGizi + ",#tahunParam_" + statusGizi).fadeOut(10, function () {
            $("#surveyParam_" + statusGizi).fadeIn(2000);
            $("#tahunParam_" + statusGizi).fadeIn(2000);
         });
      }
      if (state.click.click === "survey") {
         $("#tahunParam_" + statusGizi).fadeOut(10, function () {
            $("#tahunParam_" + statusGizi).fadeIn(2000);
         });
      }
      $("#btnKompar,#showChart").parent().parent().show();
   }

   var resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
      map.fitBounds(gmap_data.getBounds());
   });
   resizeObserver.observe(document.getElementById("data_map_stunting"));
   resizeObserver.observe(document.getElementById("data_map_wasting"));
   resizeObserver.observe(document.getElementById("data_map_underweight"));
   if (dArea != "kecamatan") {
      btnCompire.addTo(map);
   }
   map.fitBounds(gmap_data.getBounds());
   /* if (statusGizi==="stunting"){
      geoData.dAreaStunting = dArea;
   } */
   //$("#btnKompar").hide();

   /* ------ END MAP ------ */
}

async function r_area(e) {
   $("#btnKompar,#showChart").parent().parent().hide();
   let
      area = e.value,
      age = "balita",
      tStatus = document.querySelector("#status_active"),
      dataStatus = tStatus.dataset.status;
   state.click = JSON.parse('{ "dampak":"' + dataStatus + '", "click": "area" }');

   $("#map_" + dataStatus).addClass('loading');
   if (dataStatus == 'stunting') {
      geoData.dAreaStunting = area;
      try {
         let res = await fetch(config.api_url + '/dampak/stuntingsurvey', {
            method: 'POST',
            body: JSON.stringify({
               age: age,
               area: area
            }),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.paramDataStunting = _res.data;
      } catch (e) {
         return false;
      }

      let survey = Object.keys(geoData.paramDataStunting)[0],
         paramData = {
            age: age,
            area: area,
            sumber: survey,
            tahun: geoData.paramDataStunting[survey][0],
         };
      try {
         let res = await fetch(config.api_url + '/dampak/stuntingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataStunting = _res.data;
         console.log("geoData.dataStunting", geoData.dataStunting);
         geoData.area = area;
      } catch (e) {
         return false;
      }

      if (area === "kabupaten") {
         geoData.dataStuntingProvKab = geoData.dataStunting;
         geoData.paramStuntingKab = paramData;
      }
      mapStunting(geoData.dataStunting, area);
      return false;
   }

   if (dataStatus === 'wasting') {
      geoData.dAreaWasting = area;
      try {
         let res = await fetch(config.api_url + '/dampak/wastingsurvey', {
            method: 'POST',
            body: JSON.stringify({
               age: age,
               area: area
            }),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.paramWasting = _res.data;
      } catch (e) {
         return false;
      }

      let survey = Object.keys(geoData.paramWasting)[0],
         paramData = {
            age: age,
            area: area,
            sumber: survey,
            tahun: geoData.paramWasting[survey][0],
         };
      try {
         let res = await fetch(config.api_url + '/dampak/wastingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataWasting = _res.data;
         geoData.area = area;
      } catch (e) {
         return false;
      }
      if (area === "kabupaten") {
         geoData.dataWastingProvKab = geoData.dataWasting;
         geoData.paramWastingKab = paramData;
      }
      mapWasting(geoData.dataWasting, area);
      return false;
   }

   if (dataStatus === 'underweight') {
      geoData.dAreaUnderweight = area;
      try {
         let res = await fetch(config.api_url + '/dampak/underweightsurvey', {
            method: 'POST',
            body: JSON.stringify({
               age: age,
               area: area
            }),
            headers: config.fetchHeaders
         });
         let _res = await res.json();

         geoData.paramUnderweight = _res.data;
      } catch (e) {
         return false;
      }

      let survey = Object.keys(geoData.paramUnderweight)[0],
         paramData = {
            age: age,
            area: area,
            sumber: survey,
            tahun: geoData.paramUnderweight[survey][0],
         };
      //console.log(geoData.paramDataUnderweight);
      //console.log(paramData);
      try {
         let res = await fetch(config.api_url + '/dampak/underweightpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataUnderweight = _res.data;
         geoData.area = area;
      } catch (e) {
         return false;
      }
      if (area === "kabupaten") {
         geoData.dataUnderweightProvKab = geoData.dataUnderweight;
         geoData.paramUnderweightKab = paramData;
      }
      mapUnderweight(geoData.dataUnderweight, area);
      return false;
   }

}

async function r_age(e) {
   $("#btnKompar,#showChart").parent().parent().hide();
   let
      age = e.value,
      area = document.querySelector('input[name="radio_area"]:checked').value,
      tStatus = document.querySelector("#status_active"),
      dataStatus = tStatus.dataset.status;
   state.click = JSON.parse('{ "dampak": "' + dataStatus + '", "click": "age" }');

   $("#map_" + dataStatus).addClass('loading');

   if (dataStatus == 'stunting') {
      try {
         let res = await fetch(config.api_url + '/dampak/stuntingsurvey', {
            method: 'POST',
            body: JSON.stringify({
               age: age,
               area: area
            }),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.paramDataStunting = _res.data;
      } catch (e) {
         return false;
      }

      let survey = Object.keys(geoData.paramDataStunting)[0],
         paramData = {
            age: age,
            area: area,
            sumber: survey,
            tahun: geoData.paramDataStunting[survey][0],
         };

      try {
         let res = await fetch(config.api_url + '/dampak/stuntingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataStunting = _res.data;
      } catch (e) {
         return false;
      }
      mapStunting(geoData.dataStunting, area);
      return false;
   }

   if (dataStatus == 'wasting') {
      try {
         let res = await fetch(config.api_url + '/dampak/wastingsurvey', {
            method: 'POST',
            body: JSON.stringify({
               age: age,
               area: area
            }),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.paramWasting = _res.data;
      } catch (e) {
         return false;
      }

      let survey = Object.keys(geoData.paramWasting)[0],
         paramData = {
            age: age,
            area: area,
            sumber: survey,
            tahun: geoData.paramWasting[survey][0],
         };

      try {
         let res = await fetch(config.api_url + '/dampak/wastingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataWasting = _res.data;
      } catch (e) {
         return false;
      }
      mapWasting(geoData.dataWasting, area);
      return false;
   }

   if (dataStatus == 'underweight') {
      try {
         let res = await fetch(config.api_url + '/dampak/underweightsurvey', {
            method: 'POST',
            body: JSON.stringify({
               age: age,
               area: area
            }),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         //console.log("ddd", _res);
         geoData.paramUnderweight = _res.data;
      } catch (e) {
         return false;
      }

      let survey = Object.keys(geoData.paramUnderweight)[0],
         paramData = {
            age: age,
            area: area,
            sumber: survey,
            tahun: geoData.paramUnderweight[survey][0],
         };

      try {
         let res = await fetch(config.api_url + '/dampak/underweightpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataUnderweight = _res.data;
      } catch (e) {
         return false;
      }
      mapUnderweight(geoData.dataUnderweight, area);
      return false;
   }

}

async function pilihSurvey(e) {
   $("#btnKompar,#showChart").parent().parent().hide();
   let
      survey = e.value,
      age = document.querySelector('input[name="radio_age"]:checked').value,
      area = document.querySelector('input[name="radio_area"]:checked').value,
      tStatus = document.querySelector("#status_active"),
      dataStatus = tStatus.dataset.status;
   state.click = JSON.parse('{ "dampak": "' + dataStatus + '", "click": "survey" }');

   $("#map_" + dataStatus).addClass('loading');
   if (dataStatus === 'stunting') {
      let paramData = {
         age: age,
         area: area,
         sumber: survey,
         tahun: geoData.paramDataStunting[survey][0],
      };
      try {
         let res = await fetch(config.api_url + '/dampak/stuntingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataStunting = _res.data;
      } catch (e) {
         return false;
      }
      mapStunting(geoData.dataStunting, area);
      return false;
   }

   if (dataStatus === 'wasting') {
      let paramData = {
         age: age,
         area: area,
         sumber: survey,
         tahun: geoData.paramWasting[survey][0],
      };
      try {
         let res = await fetch(config.api_url + '/dampak/wastingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataWasting = _res.data;
      } catch (e) {
         return false;
      }
      mapWasting(geoData.dataWasting, area);
      return false;
   }

   if (dataStatus === 'underweight') {
      //console.log("geoData.paramUnderweight", geoData.paramUnderweight);
      let paramData = {
         age: age,
         area: area,
         sumber: survey,
         //tahun: area === "kabupaten" ? geoData.paramDataUnderweight[survey][0] : geoData.paramUnderweight[survey][0],
         tahun: geoData.paramUnderweight[survey][0],

      };
      //console.log("paramData", paramData);
      //geoData.paramUnderweight
      try {
         let res = await fetch(config.api_url + '/dampak/underweightpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataUnderweight = _res.data;
      } catch (e) {
         return false;
      }
      //console.log("geoData.dataUnderweight", geoData.dataUnderweight);
      mapUnderweight(geoData.dataUnderweight, area);
      return false;
   }
}

async function pilihSurveyComp(e) {
   let
      survey = e.value,
      age = document.querySelector('input[name="radio_age"]:checked').value,
      area = document.querySelector('input[name="radio_area"]:checked').value,
      tStatus = document.querySelector("#status_active"),
      dataStatus = tStatus.dataset.status,
      dataSurvey;

   $("#tahunParam_comp").removeClass("hide").addClass(['loading', 'mt-5']);

   if (dataStatus === 'stunting') {
      if (typeof geoData.paramDataStuntingComp === "undefined") {
         try {
            let res = await fetch(config.api_url + '/dampak/stuntingsurvey', {
               method: 'POST',
               body: JSON.stringify({
                  age: age,
                  area: area
               }),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.paramDataStuntingComp = _res.data;
         } catch (e) {
            return false;
         }
      }
      dataSurvey = geoData.paramDataStuntingComp[survey];
   }

   if (dataStatus === 'wasting') {
      if (typeof geoData.paramDataWastingComp === "undefined") {
         try {
            let res = await fetch(config.api_url + '/dampak/wastingsurvey', {
               method: 'POST',
               body: JSON.stringify({
                  age: age,
                  area: area
               }),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.paramDataWastingComp = _res.data;
         } catch (e) {
            return false;
         }
      }
      dataSurvey = geoData.paramDataWastingComp[survey];
   }

   if (dataStatus === 'underweight') {
      if (typeof geoData.paramDataUnderweightComp === "undefined") {
         try {
            let res = await fetch(config.api_url + '/dampak/underweightsurvey', {
               method: 'POST',
               body: JSON.stringify({
                  age: age,
                  area: area
               }),
               headers: config.fetchHeaders
            });
            let _res = await res.json();
            geoData.paramDataUnderweightComp = _res.data;
         } catch (e) {
            return false;
         }
      }
      dataSurvey = geoData.paramDataUnderweightComp[survey];
   }

   let thnComp = [];
   dataSurvey.forEach((row, index) => {
      thnComp.push(`
         <div class="form-check my-1">
            <input class="form-check-input" type="radio" name="pilih_tahunComp" value="${row}" OnChange="pilihtahunComp(this)" id="flexRadiotahun${index}Comp">
            <label class="form-check-label text-uppercase  fs-11px fw-600" for="flexRadiotahun${index}Comp">
               ${row}
            </label>
         </div>
      `);
   });
   $("#tahunLodParam").html(/*html*/` ${thnComp.join(" ")}`);
   $("#tahunParam_comp").removeClass(['loading', 'mt-5']);
   $("#pilihTahunComp").removeClass("hide");
   $("#expKomparasi").parent().addClass("hide");
}

async function pilihTahun(e) {
   $("#btnKompar,#showChart").parent().parent().hide();
   let
      tahun = e.value,
      age = document.querySelector('input[name="radio_age"]:checked').value,
      area = document.querySelector('input[name="radio_area"]:checked').value,
      survey = document.querySelector('input[name="pilih_survey"]:checked').value,
      tStatus = document.querySelector("#status_active"),
      dataStatus = tStatus.dataset.status;
   state.click = JSON.parse('{ "dampak": "' + dataStatus + '", "click": "tahun" }');

   $("#map_" + dataStatus).addClass('loading');
   if (dataStatus == 'stunting') {
      let paramData = {
         age: age,
         area: area,
         sumber: survey,
         tahun: tahun,
      };
      try {
         let res = await fetch(config.api_url + '/dampak/stuntingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataStunting = _res.data;

      } catch (e) {
         return false;
      }

      mapStunting(geoData.dataStunting, area);
      return false;
   }

   if (dataStatus == 'wasting') {
      let paramData = {
         age: age,
         area: area,
         sumber: survey,
         tahun: tahun,
      };
      try {
         let res = await fetch(config.api_url + '/dampak/wastingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataWasting = _res.data;
      } catch (e) {
         return false;
      }

      mapWasting(geoData.dataWasting, area);
      return false;
   }
   if (dataStatus == 'underweight') {
      let paramData = {
         age: age,
         area: area,
         sumber: survey,
         tahun: tahun,
      };
      try {
         let res = await fetch(config.api_url + '/dampak/underweightpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataUnderweight = _res.data;
      } catch (e) {
         return false;
      }

      mapUnderweight(geoData.dataUnderweight, area);
      return false;
   }
}

async function pilihtahunComp(e) {
   geoData.map.closePopup();
   let
      tahun = e.value,
      age = document.querySelector('input[name="radio_age"]:checked').value,
      area = document.querySelector('input[name="radio_area"]:checked').value,
      survey = document.querySelector('input[name="pilih_surveyComp"]:checked').value,
      tStatus = document.querySelector("#status_active"),
      dataStatus = tStatus.dataset.status,
      paramData = {
         age: age,
         area: area,
         sumber: survey,
         tahun: tahun,
      },
      dataSurv
      ;
   $("#map_" + dataStatus).addClass('loading');

   if (dataStatus === 'stunting') {
      try {
         let res = await fetch(config.api_url + '/dampak/stuntingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataStuntingComp = _res.data.features;
         dataSurv = _res.data.features;
      } catch (e) {
         return false;
      }
   }
   if (dataStatus == 'wasting') {
      try {
         let res = await fetch(config.api_url + '/dampak/wastingpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataWastingComp = _res.data.features;
         dataSurv = _res.data.features;
      } catch (e) {
         return false;
      }
   }
   if (dataStatus == 'underweight') {
      try {
         let res = await fetch(config.api_url + '/dampak/underweightpartial', {
            method: 'POST',
            body: JSON.stringify(paramData),
            headers: config.fetchHeaders
         });
         let _res = await res.json();
         geoData.dataUnderweightComp = _res.data.features;
         dataSurv = _res.data.features;
      } catch (e) {
         return false;
      }
   }
   exportXls(dataSurv, dataStatus);
   $("#expKomparasi").parent().removeClass("hide");
   $("#map_" + dataStatus).removeClass('loading');
}

function exportXls(data, dataStatus) {

   /* console.log("dataStatus", dataStatus);
   console.log("geoData.dArea", geoData.dArea);
   console.log("data", data);
   console.log("datass", geoData.dataStunting); */

   let
      sumbAge = capitalize(document.querySelector("[name='radio_age']:checked").value),
      sumbSurvey = capitalize(document.querySelector("[name='pilih_survey']:checked").value),
      sumbTahun = document.querySelector("[name='pilih_tahun']:checked").value,
      kompSurvey = capitalize(document.querySelector("[name='pilih_surveyComp']:checked").value),
      kompTahun = document.querySelector("[name='pilih_tahunComp']:checked").value,
      i = 1,
      axx = [],
      kompar,
      tableXls;

   if (dataStatus === "stunting") {
      geoData.dataStunting.features.forEach((row) => {
         if (geoData.dArea === "provinsi") {
            kompar = data.find((e) => e.properties.provinsi_kode == row.properties.provinsi_kode);
         } else {
            kompar = data.find((e) => e.properties.kabupaten_kode == row.properties.kabupaten_kode);
         }
         //console.log("kompar", kompar);
         let td = /*html*/`<tr>
               <td>${i++}</td>
               <td>${geoData.dArea === "provinsi" ? row.properties.provinsi_nama : row.properties.kabupaten_nama}</td>
               <td align="right">${row.properties.data[0].pb_u_stunting === null ? "-" : row.properties.data[0].pb_u_stunting}</td>
               <td align="right">${row.properties.data[0].pb_u_normal === null ? "-" : row.properties.data[0].pb_u_normal}</td>
               <td align="right">${row.properties.data[0].pb_u_pendek === null ? "-" : row.properties.data[0].pb_u_pendek}</td>
               <td align="right">${row.properties.data[0].pb_u_sangat_pendek === null ? "-" : row.properties.data[0].pb_u_sangat_pendek}</td>
               <td align="right">${row.properties.data[0].ps === null ? "-" : formatNumber(row.properties.data[0].ps) + " / " + formatNumber(row.properties.data[0].jml)}</td>
               <td align="right">${row.properties.data[0].rse === null ? "-" : row.properties.data[0].rse}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].pb_u_stunting === null) ? "-" : kompar.properties.data[0].pb_u_stunting}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].pb_u_normal === null) ? "-" : kompar.properties.data[0].pb_u_normal}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].pb_u_pendek === null) ? "-" : kompar.properties.data[0].pb_u_pendek}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].pb_u_sangat_pendek === null) ? "-" : kompar.properties.data[0].pb_u_sangat_pendek}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].ps === null) ? "-" : formatNumber(kompar.properties.data[0].ps) + " / " + formatNumber(kompar.properties.data[0].jml)}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].rse === null) ? "-" : kompar.properties.data[0].rse}</td>
            </tr>`;
         axx.push(td);
      });
      tableXls = /*html*/`
         <table class="table">
            <thead>
               <tr>
                  <th colspan="6">Komparasi Survei ${sumbAge}</th>
               </tr>
               <tr>   
                  <th></th>
                  <th></th>
                  <th colspan="6" align="center">${sumbSurvey} (${sumbTahun})</th>
                  <th colspan="6" align="center">${kompSurvey} (${kompTahun})</th>
               </tr>
               <tr>
                  <th>No.</th>
                  <th>${capitalize(geoData.dArea)}</th>
                  <th>Stunting (%)</th>
                  <th>Normal (%)</th>
                  <th>Pendek (%)</th>
                  <th>Sangant Pendek (%)</th>
                  <th>Bayi Ditimbang</th>
                  <th>RSE</th>
                  <th>Stunting (%)</th>
                  <th>Normal (%)</th>
                  <th>Pendek (%)</th>
                  <th>Sangat Pendek (%)</th>
                  <th>Bayi Ditimbang</th>
                  <th>RSE</th>
               </tr>
            </thead>
            <tbody>
               ${axx.join("")}
            </tbody>
         </table>
      `;
   } else {
      let dataX;
      if (dataStatus === "wasting") {
         dataX = geoData.dataWasting;
      } else {
         dataX = geoData.dataUnderweight;
      }
      console.log(dataX);
      //return false;
      dataX.features.forEach((row) => {
         //console.log("xxx", row);
         if (geoData.dArea === "provinsi") {
            kompar = data.find((e) => e.properties.provinsi_kode == row.properties.provinsi_kode);
         } else {
            kompar = data.find((e) => e.properties.kabupaten_kode == row.properties.kabupaten_kode);
         }
         let td = /*html*/`<tr>
               <td>${i++}</td>
               <td>${geoData.dArea === "provinsi" ? row.properties.provinsi_nama : row.properties.kabupaten_nama}</td>
               <td align="right">${row.properties.data[0].jml_a1 === null ? "-" : row.properties.data[0].jml_a1}</td>
               <td align="right">${row.properties.data[0].jml_a2 === null ? "-" : row.properties.data[0].jml_a2}</td>
               <td align="right">${row.properties.data[0].jml_a3 === null ? "-" : row.properties.data[0].jml_a3}</td>
               <td align="right">${row.properties.data[0].ps === null ? "-" : formatNumber(row.properties.data[0].ps) + " / " + formatNumber(row.properties.data[0].jml)}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].jml_a1 === null) ? "-" : kompar.properties.data[0].jml_a1}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].jml_a2 === null) ? "-" : kompar.properties.data[0].jml_a2}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].jml_a3 === null) ? "-" : kompar.properties.data[0].jml_a3}</td>
               <td align="right">${(typeof kompar === "undefined") || (kompar.properties.data[0].ps === null) ? "-" : formatNumber(kompar.properties.data[0].ps) + " / " + formatNumber(kompar.properties.data[0].jml)}</td>
            </tr>`;
         axx.push(td);
      });
      tableXls = /*html*/`
         <table class="table">
            <thead>
               <tr>
                  <th colspan="6">Komparasi Survei ${sumbAge}</th>
               </tr>
               <tr>   
                  <th></th>
                  <th></th>
                  <th colspan="4" align="center">${sumbSurvey} (${sumbTahun})</th>
                  <th colspan="4" align="center">${kompSurvey} (${kompTahun})</th>
               </tr>
               <tr>
                  <th>No.</th>
                  <th>Provinsi</th>
                  <th>${dataStatus.toUpperCase()} (%)</th>
                  <th>${dataStatus === "underweight" ? "Gizi Baik" : "Normal"} (%)</th>
                  <th>${dataStatus === "underweight" ? "Gizi Lebih" : "Gemuk"} (%)</th>
                  <th>Bayi Ditimbang</th>
                  <th>${dataStatus.toUpperCase()} (%)</th>
                  <th>${dataStatus === "underweight" ? "Gizi Baik" : "Normal"} (%)</th>
                  <th>${dataStatus === "underweight" ? "Gizi Lebih" : "Gemuk"} (%)</th>
                  <th>Bayi Ditimbang</th>
               </tr>
            </thead>
            <tbody>
               ${axx.join("")}
            </tbody>
         </table>
      `;
   }
   $("#tabelKomparasi").html(tableXls);
}

function loadMap(parentId, id) {
   return (typeof document.querySelector(parentId) === 'undefined') || (document.querySelector(parentId) == null) ? " " : document.querySelector(parentId).innerHTML = '<div id="' + id + '"></div>';
}

function mapWasting(datax, area) {
   const
      age = datax.data.age.active,
      dataSurvey = datax.data.sumber.data,
      survey = datax.data.sumber.active,
      dataTahun = datax.data.tahun.data,
      tahun = datax.data.tahun.active
      ;

   viewMap('wasting', datax, area, age, { 'active': tahun, 'data': dataTahun }, { 'active': survey, 'data': dataSurvey });
}

function mapUnderweight(datax, area) {
   const
      age = datax.data.age.active,
      dataSurvey = datax.data.sumber.data,
      survey = datax.data.sumber.active,
      dataTahun = datax.data.tahun.data,
      tahun = datax.data.tahun.active
      ;

   viewMap('underweight', datax, area, age, { 'active': tahun, 'data': dataTahun }, { 'active': survey, 'data': dataSurvey });
}

function mapPrioritas(datax) {

   let lokus = [],
      tahun = []
      ;
   datax.features.forEach((row) => {
      let pertahun = [];
      row.properties.prioritas.forEach((thn) => {
         pertahun.push({
            "propinsi_name": row.properties.provinsi_nama,
            "propinsi_id": row.properties.provinsi_id.toString(),
            "kabupaten_name": row.properties.kabupaten_nama,
            "kabupaten_id": row.properties.kabupaten_kode.toString(),
            'tahun': thn
         });
      });
      lokus.push(mergeArray(pertahun));
   });

   let mDatax = mergeArray(lokus),
      groupByTahun = arr_groupBy(['tahun']),
      data_perthn = groupByTahun(mDatax),
      c_propinsi = [],
      c_kabupaten = [],
      check_thn = [];
   ;

   Object.keys(data_perthn).forEach((row, index) => {
      let groupByPropinsi_id = arr_groupBy(['propinsi_id']),
         data_perProv = groupByPropinsi_id(data_perthn[row]),
         totCurr = data_perthn[row].length,
         totLast = (typeof data_perthn[row - 1] == "undefined") ? 0 : data_perthn[row - 1].length,
         data_html_kab = '<div class="col bd-highlight mx-2 mb-4 card">' +
            '<p class="h6 card-header text-center" >' + data_perthn[row][0].tahun + '</p>' +
            '<div class="card-body p-0 fs-14px text-center">' +
            '<p class="mt-2">' + ((index == 0) ? 0 : "<sup>+</sup>" + (totCurr - totLast)) + '</p>' +
            '<p> <span style="position: relative;top: -2px;">&Sigma;</span> ' + totCurr + '</p>' +
            '</div>' +
            '</div>'
         ;
      c_kabupaten.push(data_html_kab);
   });

   document.querySelector("#data_prioritas").innerHTML = c_kabupaten.join(" ");
   let groupByProv = arr_groupBy(['propinsi_id']),
      data_perPropinsi = groupByProv(mDatax),
      data_prov = [],
      table_prov = [];

   for (let key in data_perPropinsi) {
      let data_row = data_perPropinsi[key],
         groupByKab = arr_groupBy(['kabupaten_id']),
         data_perkabupaten = groupByKab(data_row),
         tahun_prov = [],
         tahun_tableprov = [],
         data_kab = [],
         tabel_kab = [];

      data_row.forEach((row) => {
         tahun_prov.push('<div class="progress-bar px-1">' + row.tahun + '</div>');
         tahun_tableprov.push(row.tahun);
      });

      for (let key2 in data_perkabupaten) {
         let data_perkab = data_perkabupaten[key2],
            tahun_kab = [],
            tahun_tablekab = [];
         data_perkab.forEach((row) => {
            tahun_kab.push('<div class="progress-bar px-1">' + row.tahun + '</div>');
            tahun_tablekab.push(row.tahun);
         });
         data_kab.push({
            "count": tahun_kab.filter(onlyUnique).length,
            "data": '<li data-count=' + tahun_kab.filter(onlyUnique).length + '>' +
               '<div class="content-tree level2">' +
               '<div class="content-name name-child">' + capitalize(data_perkab[0].kabupaten_name) + '</div>' +
               '<div class="progress  content-value rounded">' +
               tahun_kab.filter(onlyUnique).sort().join(' ') +
               '</div>' +
               '</div>' +
               '</li>'
         }
         );
         tabel_kab.push(/* html */`
         <tr>
            <td> </td>
            <td>${capitalize(data_perkab[0].kabupaten_name)}</td>
            <td >${tahun_tablekab.filter(onlyUnique).sort().join(', ')}</td>
         </tr>
         `);
      }
      let
         mm = [],
         order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      data_kab.sort((a, b) => (order.indexOf(a.data) - order.indexOf(b.data)) || a.count - b.count);
      data_kab.filter(function filterYums(currentItem, index) {
         mm.push(currentItem.data);
      });
      data_prov.push('<li data-jstree=\'{"opened":false}\' >' +
         '<div class="content-tree  level1">' +
         '<div class="content-name">' + data_row[0].propinsi_name + '</div>' +
         '<div class="progress  content-value ">' +
         tahun_prov.filter(onlyUnique).sort().join(' ') +
         '</div>' +
         '</div>' +
         '<ul>' +
         mm.join(' ') +
         '</ul>' +
         '</li>');

      table_prov.push(/* html */
         `<tr>
            <td>${capitalize(data_row[0].propinsi_name)}</td>
            <td> </td>
            <td>${tahun_tableprov.filter(onlyUnique).sort().join(', ')}</td>
         </tr>
         ${tabel_kab.join(' ')}`);
   }
   $("#jstree-default").jstree("destroy").empty();
   $("#jstreeplan").html(/*html*/
      ` <table class="table table-sm bg-light-500 rounded-top fs-11px mb-0">
         <thead>
            <tr class="fw-normal border-0 text-gray-700">
               <th class="border-0 ps-2">Provinsi</th>
               <th class="border-0 text-end">Kabupaten/Kota</th>
               <th class="border-0 text-end">Tahun Prioritas</th>            
            </tr>
         </thead>
         <tbody class="fs-10px bg-white">
         ${table_prov.join(' ')}      
         </tbody>      
      </table>`
   );
   $("#jstree-default").html('<ul>' +
      data_prov.join(' ') +
      '</ul>');
   jstree_load("#jstree-default");
   $(".jstree-container").removeClass("bg-gray-100");
}

function PetaPropinsi(dataLokus) {
   document.querySelector("#mapPrioritas").parentElement.innerHTML = "<div id='mapPrioritas'></div>";

   let data = [];
   dataLokus.features.forEach((row) => {
      data.push(
         {
            "type": "Feature",
            "properties": {
               "province_id": row.properties.id,
               "province_code": row.properties.provinsi_kode,
               "propinsi_name": row.properties.provinsi_nama,
               "kabupaten_nama": row.properties.kabupaten_nama,
               "kabupaten_kode": row.properties.kabupaten_kode,
               "tahun": (row.properties.prioritas).toString(),
               "count": (row.properties.prioritas).length,
               "color": getColor((row.properties.prioritas).length)
            },
            "geometry": row.geometry
         }
      );
   });
   //L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);
   let closeTooltip,
      openStreetMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }),
      map = L.map("mapPrioritas", {
         layers: [openStreetMap],
         scrollWheelZoom: true,
         loadingControl: true,
         gestureHandling: true,
         adeAnimation: true,
         zoomAnimation: true
      });

   //console.log("map", map);
   map.addControl(L.control.fullscreen({
      position: 'topright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
      forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
      fullscreenElement: document.getElementById("main-map") // Dom element to render in full screen, false by default, fallback to map._container
   }));

   map.on('enterFullscreen', function () {
      $("#mapPrioritas").addClass('fullscreen-map-prioritas ');
      $(".jstree-container").addClass('fullscreen-tree-prioritas');
      $("#main-map").addClass('scrool-zoom-page');

      $("#map_stunting,#map_underweight,#map_wasting").addClass('fullscreen-map-dampak');
      $("#data_map_stunting,#data_map_underweight,#data_map_wasting").attr("fullscreen", "true");
      //$("#map_stunting,#map_underweight,#map_wasting")


      map.fitBounds(gmap_data.getBounds());
   });

   map.on('exitFullscreen', function () {
      /* $("#mapPrioritas").height('43em');
      $(".jstree-container").height('52.1em'); */
      $("#mapPrioritas").removeClass('fullscreen-map-prioritas ');
      $(".jstree-container").removeClass('fullscreen-tree-prioritas');
      $("#main-map").removeClass('scrool-zoom-page');
      $("#map_stunting,#map_underweight,#map_wasting").removeClass('fullscreen-map-dampak');
   });
   let
      gmap_data = L.geoJSON(data, {
         className: 'shadow',
         style: style,
         onEachFeature: function (feature, layer) {
            var layer_map = label_map_lokus(feature.properties);
            layer.bindPopup(layer_map);
            layer.on({
               mousemove: PolygonMapStyleOver,
               mouseout: PolygonMapStyleOut,
               click: whenClicked
            });
         }
      }).addTo(map);

   let
      btnHomeReset = L.control({ position: 'topleft' }),
      logicCheck = L.control({ position: 'bottomleft' }),
      legend = L.control({ position: 'bottomleft' })
      ;

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

   legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info lagend-prioritas legend');
      div.innerHTML = `
      <h5>Lokasi Prioritas</h5>
      <i style="background: #eb72a2"></i><span>6 tahun</span><br>
      <i style="background: #fed976"></i><span>5 tahun</span><br>
      <i style="background: #feb24c"></i><span>4 tahun</span><br>
      <i style="background: #9e9ac8"></i><span>3 tahun</span><br>
      <i style="background: #fc4e2a"></i><span>2 tahun</span><br>
      <i style="background: #6a51a3"></i><span>1 tahun</span><br>
      <i style="background: #b10026"></i><span>Bukan Lokasi Prioritas</span>
      <br>
      `;
      return div;
   };
   legend.addTo(map);

   logicCheck.onAdd = function (map) {

      let
         select2018 = "checked",
         select2019 = "checked",
         select2020 = "checked",
         select2021 = "checked",
         select2022 = "checked",
         select2023 = "checked";

      if (typeof geoData.dataC !== 'undefined') {
         select2018 = (geoData.dataC.includes(2018)) ? "checked" : "";
         select2019 = (geoData.dataC.includes(2019)) ? "checked" : "";
         select2020 = (geoData.dataC.includes(2020)) ? "checked" : "";
         select2021 = (geoData.dataC.includes(2021)) ? "checked" : "";
         select2022 = (geoData.dataC.includes(2022)) ? "checked" : "";
         select2023 = (geoData.dataC.includes(2023)) ? "checked" : "";
      }
      let
         div = L.DomUtil.create('div');
      div.innerHTML = /*html*/`
         <p class="h6">Pilih Tahun</p>      
         <div class="leaflet-control-layers leaflet-control-layers-expanded fs-10px" style="background: #cccccc91; border-radius: 5%; border-color: #212529; border-style: solid; border-width: thin;min-width: 65px;">
            <div class="form-check mb-n1">
               <input class="form-check-input" type="checkbox" name="checkTahun[]" value="2018" onchange="r_pTahun(this)"  ${select2018} id="flexRadioDefault1">
               <label class="form-check-label  fs-11px fw-600" for="flexRadioDefault1">
                  2018
               </label>
            </div>
            <div class="form-check mb-n1">
               <input class="form-check-input" type="checkbox" name="checkTahun[]" value="2019" onchange="r_pTahun(this)"  ${select2019} id="flexRadioDefault2">
               <label class="form-check-label  fs-11px fw-600" for="flexRadioDefault2">
                  2019
               </label>
            </div>
            <div class="form-check mb-n1">
               <input class="form-check-input" type="checkbox" name="checkTahun[]" value="2020" onchange="r_pTahun(this)"  ${select2020} id="flexRadioDefault3">
               <label class="form-check-label  fs-11px fw-600" for="flexRadioDefault3">
                  2020
               </label>
            </div>
            <div class="form-check mb-n1">
               <input class="form-check-input" type="checkbox" name="checkTahun[]" value="2021" onchange="r_pTahun(this)"  ${select2021} id="flexRadioDefault4">
               <label class="form-check-label  fs-11px fw-600" for="flexRadioDefault4">
                  2021
               </label>
            </div>
            <div class="form-check mb-n1">
               <input class="form-check-input" type="checkbox" name="checkTahun[]" value="2022" onchange="r_pTahun(this)"  ${select2022} id="flexRadioDefault5">
               <label class="form-check-label  fs-11px fw-600" for="flexRadioDefault5">
                  2022
               </label>
            </div>
            <div class="form-check mb-n1">
               <input class="form-check-input" type="checkbox" name="checkTahun[]" value="2023" onchange="r_pTahun(this)"  ${select2023} id="flexRadioDefault6">
               <label class="form-check-label  fs-11px fw-600" for="flexRadioDefault6">
                  2023
               </label>
            </div>
         </div>
      `;
      return div;
   }
   logicCheck.addTo(map);

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



   var popup = new L.Popup({ autoPan: false });
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
      var gcolor = feature.properties.count;
      return {
         fillColor: getColor(gcolor),
         weight: 1,
         opacity: 1,
         color: 'black',
         fillOpacity: 0.7
      };
   }

   function resetHighlight(e) {
      geoJsonLayer.setStyle(style);
      info.update();
   }
   function PolygonMapStyleOver(e) {
      var layer = e.target;
      var datax = feature_properties(e);
      var layer_map = label_map_lokus(datax);
      popup.setLatLng(e.latlng);
      popup.setContent(layer_map);
      if (!popup._map) popup.openOn(map)
      window.clearTimeout(closeTooltip);
      if (!L.Browser.ie && !L.Browser.opera) {
         layer.bringToFront();
      }
   }
   function PolygonMapStyleOut(e) {
      gmap_data.resetStyle(e.target);
      closeTooltip = window.setTimeout(function () {
         map.closePopup();
      }, 100);
   }
   function feature_properties(e) {
      var data = e.target.feature.properties
      return data;
   }
   function whenClicked(e) {
      return false;
   }
   map.fitBounds(gmap_data.getBounds());
}

function label_map_lokus(properties) {
   //console.log(properties);
   var data_map = "<h5 class='text-orange-700'>Kabupaten/Kota Prioritas</h5>" +
      "<p class='h5' style='color:" + properties.color + "'>" + properties.kabupaten_nama + "</p>" +
      "<table class='fs-11px' style='margin-top: -1.1em;'>" +
      "<tr><td>" + "Propinsi </td><td class='px-1'> : " + properties.propinsi_name + "</td></tr>" +
      "<tr><td>" + "Tahun Prioritas </td><td class='px-1'> : " + properties.tahun + "</td></tr>" +
      "<table>";
   return "<div>" + data_map + "</div>";
}

function r_pTahun(data) {
   let dataC = [],
      dataX = [],
      dataCheck = document.querySelectorAll("input[name='checkTahun[]']");
   dataCheck.forEach((v) => {
      if (v.checked) {
         dataC.push(parseInt(v.value));
      }
   });
   dataC = (dataC.length == 0) ? [2018] : dataC;
   geoData.dataC = dataC;
   geoData.dataPrioritasKabupaten.features.forEach((row) => {
      if (row.properties.prioritas.find(element => dataC.includes(element))) {
         dataX.push(row);
      }
   });
   PetaPropinsi({ "features": dataX });
   mapPrioritas({ "features": dataX });
}

function bgpoligon(data) {
   var bg;
   if (data == 0) {
      bg = "bg-gradient-blue";
   } else if (data == 1) {
      bg = "bg-gradient-orange";
   } else if (data == 2) {
      bg = "bg-gradient-green";
   } else if (data == 3) {
      bg = "bg-gradient-purple";
   }
   return bg;
}

function jstree_load(id) {
   $(id).jstree({
      "core": {
         "themes": {
            "responsive": false
         }
      },
      "types": {
         "default": {
            "icon": "fa fa-folder text-warning fa-lg"
         },
         "file": {
            "icon": "fa fa-file text-inverse fa-lg"
         }
      },
      "plugins": ["types"]
   });

   $(id).on('select_node.jstree', function (e, data) {
      var link = $('#' + data.selected).find('a');
      if (link.attr("href") != "#" && link.attr("href") != "javascript:;" && link.attr("href") != "") {
         if (link.attr("target") == "_blank") {
            link.attr("href").target = "_blank";
         }
         document.location.href = link.attr("href");
         return false;
      }
   });

}

function bySumberStunting(datax, category, age, sumber, tahun, area) {
   const dataMap = datax.features,
      dproper = [],
      mThn = [],
      mSurvey = [];
   dataMap.forEach((dataRow) => {
      const proper = [],
         thn = [],
         surv = []
         ;
      dataRow.properties.data.forEach((dataProperties) => {
         if ((dataProperties.sumber == sumber) && (dataProperties.age == age)) {
            thn.push(dataProperties.tahun);
         }
         if ((dataProperties.age == age)) {
            surv.push(dataProperties.sumber);
         }

         if (
            (dataProperties.sumber == sumber) &&
            (dataProperties.tahun == tahun) &&
            (dataProperties.age == age) && (area === "provinsi")
         ) {
            proper.push({
               "type": "Feature",
               "properties": {
                  'data': 'stunting',
                  'state': 'province',
                  'code': dataRow.properties.provinsi_kode,
                  'name': dataRow.properties.provinsi_nama,
                  'age': dataProperties.age,
                  'pb_u_normal': dataProperties.pb_u_normal,
                  'pb_u_pendek': dataProperties.pb_u_pendek,
                  'pb_u_sangat_pendek': dataProperties.pb_u_sangat_pendek,
                  'pb_u_stunting': dataProperties.pb_u_stunting,
                  'lat': dataProperties.latitude,
                  'long': dataProperties.longitude,
                  'sumber': dataProperties.sumber,
                  'tahun': dataProperties.tahun
               },
               'geometry': dataRow.geometry
            });
         }

         if (
            (typeof sumber === 'undefined' || sumber === null) &&
            (typeof tahun === 'undefined' || tahun === null) &&
            (typeof age === 'undefined' || age === null)
         ) {
            thn.push(dataProperties.tahun);
            surv.push(dataProperties.sumber);
            proper.push({
               'state': 'province',
               'code': dataRow.properties.provinsi_kode,
               'name': dataRow.properties.provinsi_nama,
               'age': dataProperties.age,
               'pb_u_normal': dataProperties.pb_u_normal,
               'pb_u_pendek': dataProperties.pb_u_pendek,
               'pb_u_sangat_pendek': dataProperties.pb_u_sangat_pendek,
               'pb_u_stunting': dataProperties.pb_u_stunting,
               'lat': dataProperties.latitude,
               'long': dataProperties.longitude,
               'sumber': dataProperties.sumber,
               'tahun': dataProperties.tahun,
               'geometry': dataRow.geometry
            });
         }

         if ((typeof tahun === 'undefined' || tahun === null) && (area === "kabupaten")) {
            thn.push(dataProperties.tahun);
            surv.push(dataProperties.sumber);
            proper.push({
               'state': 'kabupaten',
               'code': dataRow.properties.kabupaten_kode,
               'name': dataRow.properties.kabupaten_nama,
               'age': dataProperties.age,
               'pb_u_normal': dataProperties.pb_u_normal,
               'pb_u_pendek': dataProperties.pb_u_pendek,
               'pb_u_sangat_pendek': dataProperties.pb_u_sangat_pendek,
               'pb_u_stunting': dataProperties.pb_u_stunting,
               'sumber': dataProperties.sumber,
               'lat': dataProperties.latitude,
               'long': dataProperties.longitude,
               'tahun': dataProperties.tahun,
               'geometry': dataRow.geometry
            });
         }

         if (
            (dataProperties.sumber == sumber) &&
            (dataProperties.tahun == tahun) &&
            (dataProperties.age == age) && (area === "kabupaten")
         ) {
            proper.push({
               "type": "Feature",
               "properties": {
                  'data': 'stunting',
                  'state': 'kabupaten',
                  'code': dataRow.properties.kabupaten_kode,
                  'name': dataRow.properties.kabupaten_nama,
                  'age': dataProperties.age,
                  'pb_u_normal': dataProperties.pb_u_normal,
                  'pb_u_pendek': dataProperties.pb_u_pendek,
                  'pb_u_sangat_pendek': dataProperties.pb_u_sangat_pendek,
                  'pb_u_stunting': dataProperties.pb_u_stunting,
                  'lat': dataProperties.latitude,
                  'long': dataProperties.longitude,
                  'sumber': dataProperties.sumber,
                  'tahun': dataProperties.tahun
               },
               'geometry': dataRow.geometry
            });
         }
      });
      dproper.push(proper);
      mThn.push(thn);
      mSurvey.push(surv);
   });

   const
      DSumber = mergeArray(dproper),
      gTahun = mergeArray(mThn).reduce((unique, item) => {
         return unique.includes(item) ? unique : [...unique, item]
      }, []),
      gSurvey = mergeArray(mSurvey).reduce((unique, item) => {
         return unique.includes(item) ? unique : [...unique, item]
      }, [])
      ;
   return { 'data': DSumber, 'sumber': gSurvey, 'tahun': gTahun };
}

function bySumberWasting(datax, category, age, sumber, tahun, area) {
   const dataMap = datax.features,
      dproper = [],
      mThn = [],
      mSurvey = [];
   dataMap.forEach((dataRow) => {
      const proper = [],
         thn = [],
         surv = []
         ;
      dataRow.properties.data.forEach((dataProperties) => {
         if ((dataProperties.sumber == sumber) && (dataProperties.age == age)) {
            thn.push(dataProperties.tahun);
         }
         if ((dataProperties.age == age)) {
            surv.push(dataProperties.sumber);
         }

         if (
            (dataProperties.sumber == sumber) &&
            (dataProperties.tahun == tahun) &&
            (dataProperties.age == age) && (area === "provinsi")
         ) {
            proper.push({
               "type": "Feature",
               "properties": {
                  'data': 'wasting',
                  'state': 'province',
                  'code': dataRow.properties.provinsi_kode,
                  'name': dataRow.properties.provinsi_nama,
                  'age': dataProperties.age,
                  'jml': dataProperties.jml,
                  'jml_a1': dataProperties.jml_a1,
                  'jml_a2': dataProperties.jml_a2,
                  'jml_a3': dataProperties.jml_a3,
                  'balita_ditimbang': row.properties.data[0].balita_ditimbang,
                  'lat': dataProperties.latitude,
                  'long': dataProperties.longitude,
                  'sumber': dataProperties.sumber,
                  'tahun': dataProperties.tahun,
               },
               'geometry': dataRow.geometry
            });
         }

         if (
            (typeof sumber === 'undefined' || sumber === null) &&
            (typeof tahun === 'undefined' || tahun === null) &&
            (typeof age === 'undefined' || age === null)
         ) {
            thn.push(dataProperties.tahun);
            surv.push(dataProperties.sumber);
            proper.push({
               'state': 'province',
               'code': dataRow.properties.provinsi_kode,
               'name': dataRow.properties.provinsi_nama,
               'age': dataProperties.age,
               'jml': dataProperties.jml,
               'jml_a1': dataProperties.jml_a1,
               'jml_a2': dataProperties.jml_a2,
               'jml_a3': dataProperties.jml_a3,
               'balita_ditimbang': row.properties.data[0].balita_ditimbang,
               'lat': dataProperties.latitude,
               'long': dataProperties.longitude,
               'sumber': dataProperties.sumber,
               'tahun': dataProperties.tahun,
               'geometry': dataRow.geometry
            });
         }

         if ((typeof tahun === 'undefined' || tahun === null) && (area === "kabupaten")) {
            thn.push(dataProperties.tahun);
            surv.push(dataProperties.sumber);
            proper.push({
               'state': 'kabupaten',
               'code': dataRow.properties.kabupaten_kode,
               'name': dataRow.properties.kabupaten_nama,
               'age': dataProperties.age,
               'jml': dataProperties.jml,
               'jml_a1': dataProperties.jml_a1,
               'jml_a2': dataProperties.jml_a2,
               'jml_a3': dataProperties.jml_a3,
               'balita_ditimbang': dataProperties.balita_ditimbang,
               'lat': dataProperties.latitude,
               'long': dataProperties.longitude,
               'sumber': dataProperties.sumber,
               'tahun': dataProperties.tahun,
               'geometry': dataRow.geometry
            });
         }

         if (
            (dataProperties.sumber == sumber) &&
            (dataProperties.tahun == tahun) &&
            (dataProperties.age == age) && (area === "kabupaten")
         ) {
            proper.push({
               "type": "Feature",
               "properties": {
                  'data': 'wasting',
                  'state': 'province',
                  'code': dataRow.properties.kabupaten_kode,
                  'name': dataRow.properties.kabupaten_nama,
                  'age': dataProperties.age,
                  'jml': dataProperties.jml,
                  'jml_a1': dataProperties.jml_a1,
                  'jml_a2': dataProperties.jml_a2,
                  'jml_a3': dataProperties.jml_a3,
                  'balita_ditimbang': dataProperties.balita_ditimbang,
                  'lat': dataProperties.latitude,
                  'long': dataProperties.longitude,
                  'sumber': dataProperties.sumber,
                  'tahun': dataProperties.tahun
               },
               'geometry': dataRow.geometry
            });
         }
      });
      dproper.push(proper);
      mThn.push(thn);
      mSurvey.push(surv);
   });
   const
      DSumber = mergeArray(dproper),
      gTahun = mergeArray(mThn).reduce((unique, item) => {
         return unique.includes(item) ? unique : [...unique, item]
      }, []),
      gSurvey = mergeArray(mSurvey).reduce((unique, item) => {
         return unique.includes(item) ? unique : [...unique, item]
      }, [])
      ;
   return { 'data': DSumber, 'sumber': gSurvey, 'tahun': gTahun };
}

function bySumberUnderweight(datax, category, age, sumber, tahun) {
   const dataMap = datax.features,
      dproper = [],
      mThn = [],
      mSurvey = [];
   dataMap.forEach((dataRow) => {
      const proper = [],
         thn = [],
         surv = []
         ;
      dataRow.properties.data.forEach((dataProperties) => {
         if ((dataProperties.sumber == sumber) && (dataProperties.age == age)) {
            thn.push(dataProperties.tahun);
         }
         if ((dataProperties.age == age)) {
            surv.push(dataProperties.sumber);
         }

         if (
            (dataProperties.sumber == sumber) &&
            (dataProperties.tahun == tahun) &&
            (dataProperties.age == age)
         ) {
            proper.push({
               "type": "Feature",
               "properties": {
                  'data': 'underweight',
                  'state': 'province',
                  'code': dataRow.properties.provinsi_kode,
                  'name': dataRow.properties.provinsi_nama,
                  'age': dataProperties.age,
                  'jml': dataProperties.jml,
                  'jml_a1': dataProperties.jml_a1,
                  'jml_a2': dataProperties.jml_a2,
                  'jml_a3': dataProperties.jml_a3,
                  'balita_ditimbang': row.properties.data[0].balita_ditimbang,
                  'lat': dataProperties.latitude,
                  'long': dataProperties.longitude,
                  'sumber': dataProperties.sumber,
                  'tahun': dataProperties.tahun,
               },
               'geometry': dataRow.geometry
            });
         }

         if (
            (typeof sumber === 'undefined' || sumber === null) &&
            (typeof tahun === 'undefined' || tahun === null) &&
            (typeof age === 'undefined' || age === null)
         ) {
            thn.push(dataProperties.tahun);
            surv.push(dataProperties.sumber);
            proper.push({
               'state': 'province',
               'code': dataRow.properties.provinsi_kode,
               'name': dataRow.properties.provinsi_nama,
               'age': dataProperties.age,
               'jml': dataProperties.jml,
               'jml_a1': dataProperties.jml_a1,
               'jml_a2': dataProperties.jml_a2,
               'jml_a3': dataProperties.jml_a3,
               'balita_ditimbang': dataProperties.balita_ditimbang,
               'lat': dataProperties.latitude,
               'long': dataProperties.longitude,
               'sumber': dataProperties.sumber,
               'tahun': dataProperties.tahun,
               'geometry': dataRow.geometry
            });
         }
      });
      dproper.push(proper);
      mThn.push(thn);
      mSurvey.push(surv);
   });
   const
      DSumber = mergeArray(dproper),
      gTahun = mergeArray(mThn).reduce((unique, item) => {
         return unique.includes(item) ? unique : [...unique, item]
      }, []),
      gSurvey = mergeArray(mSurvey).reduce((unique, item) => {
         return unique.includes(item) ? unique : [...unique, item]
      }, [])
      ;
   return { 'data': DSumber, 'sumber': gSurvey, 'tahun': gTahun };
}

function bySumberNasional(data, age, sumber, tahun) {
   let
      dataNasional = JSON.parse(localStorage.getItem("dataNasional")).value,
      datay;
   if (data == 'stunting') {
      dataNasional.stunting.forEach((dataRow) => {
         if (
            (dataRow.age == age) &&
            (dataRow.sumber == sumber) &&
            (dataRow.tahun == tahun)
         ) {
            datay = {
               'age': dataRow.age,
               'pb_u_normal': dataRow.pb_u_normal,
               'pb_u_pendek': dataRow.pb_u_pendek,
               'pb_u_sangat_pendek': dataRow.pb_u_sangat_pendek,
               'pb_u_stunting': dataRow.pb_u_stunting,
               'sumber': dataRow.sumber,
               'tahun': dataRow.tahun
            }
         }
      });
   }
   if (data == 'wasting') {
      dataNasional.wasting.forEach((dataRow) => {
         if (
            (dataRow.age == age) &&
            (dataRow.sumber == sumber) &&
            (dataRow.tahun == tahun)
         ) {
            datay = {
               'age': dataRow.age,
               'jml_a1': dataRow.jml_a1,
               'jml_a2': dataRow.jml_a2,
               'jml_a3': dataRow.jml_a3,
               'sumber': dataRow.sumber,
               'tahun': dataRow.tahun
            }
         }
      });
   }
   if (data == 'underweight') {
      dataNasional.underweight.forEach((dataRow) => {
         if (
            (dataRow.age == age) &&
            (dataRow.sumber == sumber) &&
            (dataRow.tahun == tahun)
         ) {
            datay = {
               'age': dataRow.age,
               'jml_a1': dataRow.jml_a1,
               'jml_a2': dataRow.jml_a2,
               'jml_a3': dataRow.jml_a3,
               'sumber': dataRow.sumber,
               'tahun': dataRow.tahun
            }
         }
      });
   }
   return datay;
}

async function surveyLoad(statusGizi, ages, area) {
   let res,
      survSComp = [];
   try {
      if (statusGizi === "stunting") {
         res = await fetch(config.api_url + '/dampak/stuntingsurvey', {
            method: 'POST',
            body: JSON.stringify({
               age: ages,
               area: area
            }),
            headers: config.fetchHeaders
         });
      } else if (statusGizi === "underweight") {
         res = await fetch(config.api_url + '/dampak/underweightsurvey', {
            method: 'POST',
            body: JSON.stringify({
               age: ages,
               area: area
            }),
            headers: config.fetchHeaders
         });
      } else {
         res = await fetch(config.api_url + '/dampak/wastingsurvey', {
            method: 'POST',
            body: JSON.stringify({
               age: ages,
               area: area
            }),
            headers: config.fetchHeaders
         });
      }
      let _res = await res.json(),
         hasilsurvey = _res.data,
         i = 1;
      for (let surv of Object.keys(hasilsurvey)) {
         survSComp.push(`
               <div class="form-check my-1">
                  <input class="form-check-input" type="radio" name="pilih_surveyComp" value="${surv}" OnChange="pilihSurveyComp(this)" id="flexRadioDefaultb${i}SComp">
                  <label class="form-check-label text-uppercase  fs-11px fw-600" for="flexRadioDefaultb${i}SComp">
                     ${surv}
                  </label>
               </div>
            `);
      }
   } catch (e) {
      return false;
   }
   return survSComp.join(" ");
}

function label_map(properties, color) {

   let name_properti,
      popUpLabe;
   /*rse*/
   if (properties.data == "stunting") {
      //console.log("labelcomp", labelcomp);
      let labelcomp = label_mapComp(properties.code, geoData.dataStuntingComp);
      if (properties.state == "provinsi") {
         name_properti = `<div class="text-gray-700 my-0 fs-15px"> Provinsi ${properties.name} </div>`;
      } else if (properties.state == "kabupaten") {
         name_properti = `<div class="text-gray-700 my-0 fs-15px"> ${kabKotaName(properties.name)} </div>`;
      } else {
         name_properti = `<div class="text-gray-700 my-0 fs-15px"> Kecamatan ${properties.name} </div>`;
      }
      //console.log(labelcomp);
      //console.log(properties);
      //console.log("geoData.compare", geoData.compare);
      //console.log("labelcomp", labelcomp);
      //console.log(" geoData.dataStuntingComp", geoData.dataStuntingComp);
      if ((!geoData.compare) || (labelcomp === false)) {
         popUpLabel = /* html */`
            <div class="h-100 p-1 m-0 rounded bg-none">
               <div class="p-0 m-0">
                  <p class="h5 my-0 text-orange text-uppercase">Status Gizi ${properties.age}</p>
                  <div id="tile-1">
                     <div class="row">
                        <div class="col-md-12">                 
                           <div class="d-flex flex-column mt-2">
                              ${name_properti}                           
                              <div class="d-flex justify-content-between bd-highlight">
                                 <div class=" bd-highlight">
                                    <div class=" h2  mb-0 fw-bolder " style="color:${color}">${properties.pb_u_stunting.toFixed(2)}%</div>
                                    <div class="d-flex text-uppercase text-gray-400 h6 mb-0">Stunting</div>
                                 </div>
                                 ${properties.rse === null ? "" :/*html*/`
                                 <div class="ms-1 mt-1 bd-highlight fs-10px">
                                    <div class="mb-0 fw-600 text-end" >${properties.rse.toFixed(2)} </div>
                                    <div class="d-flex text-uppercase text-end text-gray-300 mb-0">rse</div>
                                 </div>
                                 ` }
                                 
                              </div>


                           </div>
                           <div class="d-flex fw-bold fs-11px py-1 mt-1 border-bottom">
                              <div class="w-100">Normal</div>
                              <div class="flex-shrink-1">${properties.pb_u_normal === null ? "-" : properties.pb_u_normal.toFixed(2) + "%"}</div>
                           </div>
                           <div class="d-flex fw-bold fs-11px py-1 border-bottom">
                              <div class="w-100">Pendek</div>
                              <div class="flex-shrink-1">${properties.pb_u_pendek === null ? "-" : properties.pb_u_pendek.toFixed(2) + "%"}</div>
                           </div>
                           <div class="d-flex fw-bold fs-11px py-1 border-bottom  ">
                              <div class="w-100">Sangat Pendek</div>
                              <div class="flex-shrink-1">${properties.pb_u_sangat_pendek === null ? "-" : properties.pb_u_sangat_pendek.toFixed(2) + "%"}</div>
                           </div>
                           <div class="d-flex fw-bold fs-11px py-1 border-bottom ${((properties.balita_ditimbang === null) || (properties.balita_ditimbang === 0)) ? " hide " : ""}  ">
                              <div class="w-100">Jumlah ditimbang</div>
                              <div class="flex-shrink-1">${properties.balita_ditimbang === null ? "-" : properties.balita_ditimbang.toFixed(2) + "%"}</div>
                           </div>
                           <div class="d-flex fw-bold fs-11px py-1 border-bottom ${properties.jml === null ? "hide" : ""}">
                              <div class="w-100">Jumlah ${capitalize(properties.age)}</div>
                              <div class="flex-shrink-1"><span class="ps-2" style="color:${color}">${formatNumber(properties.ps)}</span>/${formatNumber(properties.jml)}</div>
                           </div>
                           <div class='mt-2 text-uppercase d-flex justify-content-end fs-9px'>Sumber ${properties.sumber} </div>
                           <div class='d-flex justify-content-end fs-9px'>Tahun ${properties.tahun}</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>`;
      } else {
         popUpLabel = /* html */`
            <div class="h-100 p-1 m-0 rounded bg-none">
               <div class="p-0 m-0">
                  <p class="h5 my-0 text-orange text-uppercase">Status Gizi ${properties.age}</p>
                  <div id="tile-1">
                     <div class="row">
                        <div class="col-md-12 compireLab">                 
                           <div class="d-flex flex-column mt-1 mb-2">
                              ${name_properti}                           
                           </div>
                           <table class="table table-bordered fw-bold fs-11px mb-0">
                              <tbody>
                                 <tr>
                                    <td>Sumber</td>
                                    <td class="fs-12px fw-600">${capitalize(properties.sumber)}</td>
                                    <td class="fs-12px fw-600">${capitalize(labelcomp.sumber)}</td>
                                 </tr>
                                 <tr>
                                    <td>Tahun</td>
                                    <td>${properties.tahun}</td>
                                    <td>${labelcomp.tahun}</td>
                                 </tr>
                                 <tr>
                                    <td>Stunting</td>
                                    <td class="fs-12px fw-600" style="color:${color}">${properties.pb_u_stunting.toFixed(2)}%</td>
                                    <td class="fs-12px fw-600" style="color:${getColorLabel(properties.data, labelcomp.pb_u_stunting)}">${labelcomp.pb_u_stunting.toFixed(2)}%</td>
                                 </tr>
                                 <tr class="${((properties.pb_u_normal === null) && (labelcomp.pb_u_normal === null)) ? "hide" : ""}">
                                    <td>Normal</td>
                                    <td>${(properties.pb_u_normal === null) ? "-" : properties.pb_u_normal.toFixed(2) + "%"}</td>
                                    <td>${(labelcomp.pb_u_normal === null) ? "-" : labelcomp.pb_u_normal.toFixed(2) + "%"}</td>
                                 </tr>
                                 <tr class="${((properties.pb_u_pendek === null) && (labelcomp.pb_u_pendek === null)) ? "hide" : ""}">
                                    <td>Pendek</td>
                                    <td>${properties.pb_u_pendek === null ? "-" : properties.pb_u_pendek.toFixed(2) + "%"}</td>
                                    <td>${labelcomp.pb_u_pendek === null ? "-" : labelcomp.pb_u_pendek.toFixed(2) + "%"}</td>
                                 </tr>
                                 <tr class="${((labelcomp.pb_u_sangat_pendek === null) && (properties.pb_u_sangat_pendek === null)) ? "hide" : ""}">
                                    <td>Sangat Pendek</td>
                                    <td>${properties.pb_u_sangat_pendek === null ? "-" : properties.pb_u_sangat_pendek.toFixed(2) + "%"}</td>
                                    <td>${labelcomp.pb_u_sangat_pendek === null ? "-" : labelcomp.pb_u_sangat_pendek.toFixed(2) + "%"}</td>
                                 </tr>
                                 <tr class=" ${((properties.balita_ditimbang === null) || (properties.balita_ditimbang === 0)) ? " hide " : ""}  ">
                                    <td>Jumlah ditimbang</td>
                                    <td>${properties.balita_ditimbang === null ? "-" : properties.balita_ditimbang.toFixed(2) + "%"}</td>
                                    <td>${labelcomp.balita_ditimbang === null ? "-" : labelcomp.balita_ditimbang.toFixed(2) + "%"}</td>
                                 </tr>
                                 <tr class=" ${((properties.jml === null) && (labelcomp.ps === null)) ? "hide" : ""}">
                                    <td>Jumlah ${capitalize(properties.age)}</td>
                                    <td class=" ${((properties.jml === null)) ? "hidex" : ""}"><span style="color:${color}">${formatNumber(properties.ps)}</span>/${formatNumber(properties.jml)}</td>
                                    <td class=" ${((labelcomp.ps === null)) ? "hidex" : ""}"><span style="color:${getColorLabel(properties.data, labelcomp.pb_u_stunting)}">${formatNumber(labelcomp.ps)}</span>/${formatNumber(labelcomp.jml)}</td>
                                 </tr>
                              </tbody>
                           </table> 
                        </div>
                     </div>
                  </div>
               </div>
            </div>`;
      }

   }
   if (properties.data === "wasting") {
      let labelcomp = label_mapComp(properties.code, geoData.dataWastingComp);
      if (properties.state == "provinsi") {
         name_properti = `<div class="text-gray-700 my-0 fs-15px"> Provinsi ${properties.name} </div>`;
      } else {
         name_properti = `<div class="text-gray-700 my-0 fs-15px"> ${kabKotaName(properties.name)} </div>`;
      }
      if ((!geoData.compare) || (labelcomp === false)) {
         popUpLabel = /* html */`
         <div class="h-100 p-1 m-0 rounded bg-none">
            <div class="p-0 m-0">
               <p class="h5 my-0 text-orange text-uppercase">Status Gizi ${properties.age}</p>
               <div id="tile-1">
                  <div class="row">
                     <div class="col-md-12">                 
                        <div class="d-flex flex-column mt-2">
                           ${name_properti}                           
                           <div class="d-flex h1 justify-content-start mb-0 fw-bolder " style="color:${color}">${properties.jml_a1.toFixed(2)}%</div>
                           <div class="d-flex justify-content-start text-uppercase text-gray-400 h5 mb-0">Wasting</div>
                        </div>
                        <div class="d-flex fw-bold fs-11px py-1 mt-1">
                           <div class="w-100">Normal</div>
                           <div class="flex-shrink-1">${properties.jml_a2 === null ? "-" : properties.jml_a2.toFixed(2) + "%"}</div>
                        </div>
                        <div class="d-flex fw-bold fs-11px py-1 border-top border-bottom">
                           <div class="w-100">Gemuk</div>
                           <div class="flex-shrink-1">${properties.jml_a3 === null ? "-" : properties.jml_a3.toFixed(2) + "%"}</div>
                        </div>
                        <div class="d-flex fw-bold fs-11px py-1  ${((typeof properties.balita_ditimbang === "undefined") || (properties.balita_ditimbang === null) || (properties.balita_ditimbang === 0)) ? " hide " : "border-bottom"}  ">
                           <div class="w-100">Jumlah ditimbang</div>
                           <div class="flex-shrink-1">${(typeof properties.balita_ditimbang === "undefined") || (properties.balita_ditimbang === null) || (properties.balita_ditimbang === 0) ? "-" : properties.balita_ditimbang.toFixed(2) + "%"}</div>
                        </div>
                        <div class="d-flex fw-bold fs-11px py-1  ${((typeof properties.jml === "undefined") || (properties.jml === null) || (properties.jml === 0)) ? " hide " : ""}  ">
                           <div class="w-100">Jumlah  ${capitalize(properties.age)}</div>
                           <div class="flex-shrink-1">
                              <span class="ps-2 fw-700" style="color:${color}">${((typeof properties.jml === "undefined") || (properties.jml === null) || (properties.jml === 0)) ? "-" : formatNumber((properties.jml * properties.jml_a1) / 100)}</span>/${formatNumber(properties.jml)}
                           </div>
                        </div>
                        <div class='mt-2 text-uppercase d-flex justify-content-end fs-9px'>Sumber ${properties.sumber} </div>
                        <div class='d-flex justify-content-end fs-9px'>Tahun ${properties.tahun}</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>`;
      } else {
         popUpLabel = /* html */`
            <div class="h-100 p-1 m-0 rounded bg-none">
               <div class="p-0 m-0">
                  <p class="h5 my-0 text-orange text-uppercase">Status Gizi ${properties.age}</p>
                  <div id="tile-1">
                     <div class="row">
                        <div class="col-md-12 compireLab">                 
                           <div class="d-flex flex-column mt-1 mb-2">
                              ${name_properti}                           
                           </div>
                           <table class="table table-bordered fw-bold fs-11px mb-0">
                              <tbody>
                                 <tr>
                                    <td>Sumber</td>
                                    <td class="fs-12px fw-600">${capitalize(properties.sumber)}</td>
                                    <td class="fs-12px fw-600">${capitalize(labelcomp.sumber)}</td>
                                 </tr>
                                 <tr>
                                    <td>Tahun</td>
                                    <td>${properties.tahun}</td>
                                    <td>${labelcomp.tahun}</td>
                                 </tr>
                                 <tr>
                                    <td>Wasting</td>
                                    <td class="fs-12px fw-600" style="color:${color}">${properties.jml_a1.toFixed(2)}%</td>
                                    <td class="fs-12px fw-600" style="color:${getColorLabel(properties.data, labelcomp.jml_a1)}">${labelcomp.jml_a1.toFixed(2)}%</td>
                                 </tr>
                                 <tr class="${((properties.jml_a2 === null) && (labelcomp.jml_a2 === null)) ? "hide" : ""}">
                                    <td>Normal</td>
                                    <td>${(properties.jml_a2 === null) ? "-" : properties.jml_a2.toFixed(2) + "%"}</td>
                                    <td>${(labelcomp.jml_a2 === null) ? "-" : labelcomp.jml_a2.toFixed(2) + "%"}</td>
                                 </tr>
                                 <tr class="${((properties.jml_a3 === null) && (labelcomp.jml_a3 === null)) ? "hide" : ""}">
                                    <td>Gemuk</td>
                                    <td>${properties.jml_a3 === null ? "-" : properties.jml_a3.toFixed(2) + "%"}</td>
                                    <td>${labelcomp.jml_a3 === null ? "-" : labelcomp.jml_a3.toFixed(2) + "%"}</td>
                                 </tr>                                 
                              </tbody>
                           </table> 
                        </div>
                     </div>
                  </div>
               </div>
            </div>`;
      }
   }
   if (properties.data == "underweight") {
      //console.log(properties);
      let labelcomp = label_mapComp(properties.code, geoData.dataUnderweightComp);
      if (properties.state == "provinsi") {
         name_properti = `<div class="text-gray-700 my-0 fs-15px"> Provinsi ${properties.name} </div>`;
      } else {
         name_properti = `<div class="text-gray-700 my-0 fs-15px"> ${kabKotaName(properties.name)} </div>`;
      }
      if ((!geoData.compare) || (labelcomp === false)) {
         popUpLabel = /* html */`
         <div class="h-100 p-1 m-0 rounded bg-none">
            <div class="p-0 m-0">
               <p class="h5 my-0 text-orange text-uppercase">Status Gizi ${properties.age}</p>
               <div id="tile-1">
                  <div class="row">
                     <div class="col-md-12">                 
                        <div class="d-flex flex-column mt-2">
                           ${name_properti}                           
                           <div class="d-flex h1 justify-content-start mb-0 fw-bolder " style="color:${color}">${properties.jml_a1.toFixed(2)}%</div>
                           <div class="d-flex justify-content-start text-uppercase text-gray-400 h5 mb-0">Underweight</div>
                        </div>
                        <div class="d-flex fw-bold fs-11px py-1 mt-1">
                           <div class="w-100">Gizi Baik</div>
                           <div class="flex-shrink-1">${(properties.jml_a2 === null) ? "-" : properties.jml_a2.toFixed(2) + "%"}</div>
                        </div>
                        <div class="d-flex fw-bold fs-11px py-1 border-top border-bottom">
                           <div class="w-100">Gizi Lebih</div>
                           <div class="flex-shrink-1">${(properties.jml_a3 === null) ? "-" : properties.jml_a3.toFixed(2) + "%"}</div>
                        </div>
                        <div class="d-flex fw-bold fs-11px py-1 ${((typeof properties.balita_ditimbang === "undefined") || (properties.balita_ditimbang === null) || (properties.balita_ditimbang === 0)) ? " hide " : "border-bottom"}  ">
                           <div class="w-100">Jumlah ditimbang</div>
                           <div class="flex-shrink-1">${((typeof properties.balita_ditimbang === "undefined") || (properties.balita_ditimbang === null) || (properties.balita_ditimbang === 0)) ? "-" : properties.balita_ditimbang.toFixed(2) + "%"}</div>
                        </div>
                        <div class="d-flex fw-bold fs-11px py-1 ${((typeof properties.jml === "undefined") || (properties.jml === null) || (properties.jml === 0)) ? " hide " : ""}  ">
                           <div class="w-100">Jumlah  ${capitalize(properties.age)}</div>
                           <div class="flex-shrink-1">
                              <span class="ps-2 fw-700" style="color:${color}">${((typeof properties.jml === "undefined") || (properties.jml === null) || (properties.jml === 0)) ? "-" : formatNumber((properties.jml * properties.jml_a1) / 100)}</span>/${formatNumber(properties.jml)}
                           </div>
                        </div>
                        <div class='mt-2 text-uppercase d-flex justify-content-end fs-9px'>Sumber ${properties.sumber} </div>
                        <div class='d-flex justify-content-end fs-9px'>Tahun ${properties.tahun}</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>`;
      } else {
         popUpLabel = /* html */`
            <div class="h-100 p-1 m-0 rounded bg-none">
               <div class="p-0 m-0">
                  <p class="h5 my-0 text-orange text-uppercase">Status Gizi ${properties.age}</p>
                  <div id="tile-1">
                     <div class="row">
                        <div class="col-md-12 compireLab">                 
                           <div class="d-flex flex-column mt-1 mb-2">
                              ${name_properti}                           
                           </div>
                           <table class="table table-bordered fw-bold fs-11px mb-0">
                              <tbody>
                                 <tr>
                                    <td>Sumber</td>
                                    <td class="fs-12px fw-600">${capitalize(properties.sumber)}</td>
                                    <td class="fs-12px fw-600">${capitalize(labelcomp.sumber)}</td>
                                 </tr>
                                 <tr>
                                    <td>Tahun</td>
                                    <td>${properties.tahun}</td>
                                    <td>${labelcomp.tahun}</td>
                                 </tr>
                                 <tr>
                                    <td>Wasting</td>
                                    <td class="fs-12px fw-600" style="color:${color}">${properties.jml_a1.toFixed(2)}%</td>
                                    <td class="fs-12px fw-600" style="color:${getColorLabel(properties.data, labelcomp.jml_a1)}">${labelcomp.jml_a1.toFixed(2)}%</td>
                                 </tr>
                                 <tr class="${((properties.jml_a2 === null) && (labelcomp.jml_a2 === null)) ? "hide" : ""}">
                                    <td>Normal</td>
                                    <td>${(properties.jml_a2 === null) ? "-" : properties.jml_a2.toFixed(2) + "%"}</td>
                                    <td>${(labelcomp.jml_a2 === null) ? "-" : labelcomp.jml_a2.toFixed(2) + "%"}</td>
                                 </tr>
                                 <tr class="${((properties.jml_a3 === null) && (labelcomp.jml_a3 === null)) ? "hide" : ""}">
                                    <td>Gemuk</td>
                                    <td>${properties.jml_a3 === null ? "-" : properties.jml_a3.toFixed(2) + "%"}</td>
                                    <td>${labelcomp.jml_a3 === null ? "-" : labelcomp.jml_a3.toFixed(2) + "%"}</td>
                                 </tr>                                 
                              </tbody>
                           </table> 
                        </div>
                     </div>
                  </div>
               </div>
            </div>`;
      }
   }
   return popUpLabel;
}

function label_mapComp(id, dataZ) {
   if (typeof dataZ != "undefined") {
      let a;
      dataZ.forEach((row) => {
         let codeArea;
         if (geoData.dArea === "provinsi") {
            codeArea = row.properties.provinsi_kode;
         } else if (geoData.dArea === "kabupaten") {
            codeArea = row.properties.kabupaten_kode;
         }
         if ([codeArea].includes(id)) {
            a = row.properties.data[0];
         }
      });
      return a;


   } else {
      return false;
   }
}

function closelabel(data) {
   $("#loadInfo").addClass("hide");
}

function getColorLabel(dampak, d) {
   let num_gradien, color_gradien;
   if (dampak === "stunting") {
      num_gradien = [30, 20, 10, 2.5, 0];
      color_gradien = ["#e32291", "#35b9c5", "#9fd9d8", "#92cea5", "#67ae3d"];

   }
   if (dampak === "wasting") {
      num_gradien = [15, 10, 5, 2.5, 0];
      color_gradien = ["#e32291", "#f15a40", "#fbae52", "#a1cd3c", "#7bc1a5"];

   }
   if (dampak === "underweight") {
      num_gradien = [15, 10, 5, 2.5, 0];
      color_gradien = ["#e32291", "#6950a2", "#b0a3d0", "#a1cd3c", "#67ae3d"];

   }
   var scolor = d > num_gradien[0] ? color_gradien[0] :
      d > num_gradien[1] ? color_gradien[1] :
         d > num_gradien[2] ? color_gradien[2] :
            d > num_gradien[3] ? color_gradien[3] :
               color_gradien[4];
   return scolor;
}