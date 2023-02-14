function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }
function capitalize(text) {
   var str = text.toLowerCase();
   return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatNumber(numb, decimal = 0) {
   return numb == null ? "" : numb.toLocaleString('id-ID', { minimumFractionDigits: decimal, maximumFractionDigits: decimal });
}
function alertMsg(text) {
   var myModal = new bootstrap.Modal(document.getElementById("alertModal"), {});
   $("#alertMsg").html(text);
   return myModal.show();
}
function kabKotaName(text, sort) {
   let name = text.split(" "),
      kabupaten = (sort == "sort") ? "Kab " : "Kabupaten "
      ;
   return name[0] === "Kota" ? text : kabupaten + text;
}
function cbSort(toSort, callback, dataSort = "up") {
   //console.log("toSort", toSort);
   //console.log("callback", callback);
   return toSort.sort(function (a, b) {
      //console.log("aaa", parseFloat(a));
      //console.log("bbb", parseFloat(b));
      return dataSort === "up" ? (callback(a) - callback(b)) : (callback(b) - callback(a));
   });
}
var arr_groupBy = function arr_groupBy(keys) {
   return function (array) {
      return array.reduce(function (objectsByKeyValue, obj) {
         var value = keys.map(function (key) {
            return obj[key];
         }).join('-');
         objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
         return objectsByKeyValue;
      }, {});
   };
},
   mergeArray = function mergeArray(arr) {
      var _ref;
      return _toConsumableArray(new Set((_ref = []).concat.apply(_ref, _toConsumableArray(arr))));
   };

function onlyUnique(value, index, self) {
   return self.indexOf(value) === index;
}

function sumObject(dataX, fieldx) {
   let value = 0;
   dataX.forEach((item, i) => {
      value += isNaN(parseInt(item[fieldx])) ? 0 : parseInt(item[fieldx]);
   });
   return value;
}

function tabElemn(tab) {
   let
      elem = $(tab).data("active"),
      tabElm = $(tab).data("tab");

   if (elem === false) {

      if ($(tab).data("table") === true) {
         if ((tabElm === 1) || (tabElm === 2)) {
            $(".nav-table").attr("data-active", "false");
            $(".nav-table").removeClass("active");
         }
         if ((tabElm === "1a") || (tabElm === "2a")) {
            $(".nav-tableX").attr("data-active", "false");
            $(".nav-tableX").removeClass("active");
         }

         if (tabElm === 1) {
            $("#default-tab-1").addClass(["active", "show"]);
            $("#default-tab-2").removeClass(["active", "show"]);
         }
         if (tabElm === 2) {
            $("#default-tab-2").addClass(["active", "show"]);
            $("#default-tab-1").removeClass(["active", "show"]);
         }

         if (tabElm === "1a") {
            $("#default-tab-1a").addClass(["active", "show"]);
            $("#default-tab-2a").removeClass(["active", "show"]);
         }
         if (tabElm === "2a") {
            $("#default-tab-2a").addClass(["active", "show"]);
            $("#default-tab-1a").removeClass(["active", "show"]);
         }

      } else {
         $(".nav-popup").attr("data-active", "false");
         $(".nav-popup").removeClass("active");
         if (tabElm === 1) {
            $("#default-pop-1").addClass(["active", "show"]);
            $("#default-pop-2").removeClass(["active", "show"]);
         } else {
            $("#default-pop-2").addClass(["active", "show"]);
            $("#default-pop-1").removeClass(["active", "show"]);
         }
      }
      $(tab).attr("data-active", "true");
      $(tab).addClass("active");


   }
}

function toXls(elemn, type, fn, dl) {
   let elt = document.querySelector(elemn),
      wb = XLSX.utils.table_to_book(elt, { sheet: "data" });
   return dl ?
      XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
      XLSX.writeFile(wb, fn || ('DataXLS.' + (type || 'xlsx')));
}

function toPdf(elemn, type, fn) {
   $(elemn).tableHTMLExport({
      // csv, txt, json, pdf
      type: type,
      filename: fn,
      // for csv
      separator: ',',
      newline: '\r\n',
      trimContent: true,
      quoteFields: true,
      // CSS selector(s)
      ignoreColumns: '',
      ignoreRows: '',
      // your html table has html content?
      htmlContent: true,
      // debug
      consoleLog: true,
   });
}

/* function Tabulator */
var numberIDRDownload = function (value, data, type, params, column) {
   //var dt = value === "" ? "" : (isNaN(value) ? "" : parseFloat(value).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
   var dt = value === "" ? "" : (isNaN(value) ? "" : parseInt(value));
   return dt;
}, persenDownload = function (value, data, type, params, column) {
   //var dt = value === "" ? "" : (isNaN(value) ? "" : parseFloat(value).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
   var dt = value === "" ? "" : (isNaN(value) ? "" : parseFloat(value * 100));
   return dt;
}, booleanDownload = function (value, data, type, params, column) {
   //return value == 'TRUE' ? "Ya" : "Tidak";
   //console.log("ccc", value);
   return typeof value == 'undefined' ? "" : (value === "" ? "" : ((value == true) ? "Ya" : "Tidak"));
}, cleanTextDownload = function (value, data, type, params, column) {
   return typeof value == 'undefined' ? "" : value.trim();
}
var minMaxFilterEditor = function (cell, onRendered, success, cancel, editorParams) {

   let end,
      container = document.createElement("span");

   //create and style inputs
   let start = document.createElement("input");
   start.setAttribute("type", "number");
   start.setAttribute("placeholder", "Min");
   start.setAttribute("min", 0);
   start.setAttribute("max", 100);
   start.style.padding = "4px";
   start.style.width = "50%";
   start.style.boxSizing = "border-box";

   start.value = cell.getValue();

   function buildValues() {
      success({
         start: start.value,
         end: end.value,
      });
   }

   function keypress(e) {
      if (e.keyCode == 13) {
         buildValues();
      }

      if (e.keyCode == 27) {
         cancel();
      }
   }

   end = start.cloneNode();
   end.setAttribute("placeholder", "Max");

   start.addEventListener("change", buildValues);
   start.addEventListener("blur", buildValues);
   start.addEventListener("keydown", keypress);

   end.addEventListener("change", buildValues);
   end.addEventListener("blur", buildValues);
   end.addEventListener("keydown", keypress);


   container.appendChild(start);
   container.appendChild(end);

   return container;
}
const validateFields = (field) => {
   // remove any whitespace and check to see if the field is blank, if so return false
   if (field.value.trim() === "") {
      // set the status based on the field, the field label, and if it is an error message
      /* setStatus(
        field,
        `${field.nextElementSibling.innerText} tidak boleh kosong!`,
        "error"
      ); */
      return false;
   } else {

      // set the status based on the field without text and return a success message
      //setStatus(field, null, "success");
      return true;

   }
}


//custom max min filter function
function minMaxFilterFunction(headerValue, rowValue, rowData, filterParams) {
   //headerValue - the value of the header filter element
   //rowValue - the value of the column in this row
   //rowData - the data for the row being filtered
   //filterParams - params object passed to the headerFilterFuncParams property

   if (rowValue) {
      if (headerValue.start != "") {
         if (headerValue.end != "") {
            return rowValue >= headerValue.start && rowValue <= headerValue.end;
         } else {
            return rowValue >= headerValue.start;
         }
      } else {
         if (headerValue.end != "") {
            return rowValue <= headerValue.end;
         }
      }
   }

   return true; //must return a boolean, true if it passes the filter.
}
//define column header menu as column visibility toggle

var closeColumn = function (e, columns) {
   let tot = 0;
   for (let column of this.getColumns()) {
      if (column.isVisible()) {
         tot += 1;
      }
   }
   if (tot > 3) {
      return columns.hide();
   }
}

var headerContextMenu = [
   {
      label: "Hide Column",
      action: function (e, column) {
         column.hide();
      }
   },
]

var headerMenu = function () {
   var menu = [];
   var columns = this.getColumns();

   for (let column of columns) {
      //create checkbox element using font awesome icons
      let icon = document.createElement("i");
      //icon.setAttribute("title", "Tutup Kolom");;
      icon.classList.add("fas");
      icon.classList.add(column.isVisible() ? "fa-check-square" : "fa-square");

      //build label
      let label = document.createElement("span");
      let title = document.createElement("span");

      title.textContent = " " + column.getDefinition().titleDownload;

      label.appendChild(icon);
      label.appendChild(title);

      if (!["id", "name", "no"].includes(column.getDefinition().field)) {
         //create menu item
         menu.push({
            label: label,
            action: function (e) {
               //prevent menu closing
               e.stopPropagation();

               //toggle current column visibility
               column.toggle();

               //change menu item icon
               if (column.isVisible()) {
                  icon.classList.remove("fa-square");
                  icon.classList.add("fa-check-square");
               } else {
                  icon.classList.remove("fa-check-square");
                  icon.classList.add("fa-square");
               }
            }
         });
      }
   }

   return menu;
};

function tableTreeLevel(detail, level, intervensi = false) {
   let dataY = Object.values(detail),
      dataF = JSON.parse(JSON.stringify(dataY));

   dataF.sort((a, b) => a.kementerian_kode > b.kementerian_kode && 1 || -1);

   if ((intervensi == true && level == "intervensi") || (intervensi == false && level == "program")) {
      dataF.forEach((item, i) => {
         Object.values(item._children).forEach((aa) => {
            delete aa._children;
         });
         item.id = i + 1;
      });
   } else if ((intervensi == true && level == "program") || (intervensi == false && level == "kegiatan")) {
      dataF.forEach((item, i) => {  //kl
         let child = [];
         Object.values(item._children).forEach((aa) => {    //keg
            let prog = [];
            Object.values(aa._children).forEach((bb) => {   //Prog
               delete bb._children
               prog.push(bb);
               /* (bb._children).forEach((cc) => {
                  (cc._children).forEach((dd) => {
                  });
               }); */
            });
            delete aa._children;
            child.push(mergeArray(prog));
         });
         delete item._children;
         item._children = mergeArray(child);
         item.id = i + 1;
      });
   } else if ((intervensi == true && level == "kegiatan") || (intervensi == false && level == "kro")) {
      dataF.forEach((item, i) => {  //kl
         let child = [];
         Object.values(item._children).forEach((aa) => {    //keg
            let prog = [];
            Object.values(aa._children).forEach((bb) => {   //Prog
               //delete bb._children
               //prog.push(bb);
               let kro = [];
               Object.values(bb._children).forEach((cc) => {
                  delete cc._children
                  kro.push(cc);
                  /* (cc._children).forEach((dd) => {
                  }); */
               });
               delete bb._children;
               child.push(mergeArray(kro));
            });
            delete aa._children;
            child.push(mergeArray(prog));
         });
         delete item._children;
         item._children = mergeArray(child);
         item.id = i + 1;
      });
   } else if ((intervensi == false && level == "ro")) {
      dataF.forEach((item, i) => {  //kl
         let child = [];
         Object.values(item._children).forEach((aa) => {    //keg
            let prog = [];
            Object.values(aa._children).forEach((bb) => {   //Prog
               let kro = [];
               Object.values(bb._children).forEach((cc) => { //KRO
                  let ro = [];
                  Object.values(cc._children).forEach((dd) => {
                     dd.lokasi = "";
                     if ((typeof dd.lokasi_ro !== "undefined") || (dd.lokasi_ro != null) || (dd.lokasi_ro != "")) {
                        let mmmm = Object.assign({}, dd.lokasi_ro),
                           eef = [];
                        Object.values(mmmm).forEach((ee) => {
                           eef.push(ee.nama_lokus)
                        });
                        dd.lokasi = eef.join(",");
                     }
                     ro.push(dd);
                  })
                  kro.push(mergeArray(ro)); //RO
               });
               delete bb._children;
               prog.push(mergeArray(kro));
            });
            delete aa._children;
            child.push(mergeArray(prog));
         });
         delete item._children;
         item._children = mergeArray(child);
         item.id = i + 1;
      });
   } else if ((intervensi == true && level == "kro")) {
      dataF.forEach((item, i) => {  //kl
         let child = [];
         Object.values(item._children).forEach((aa) => {    //keg
            let prog = [];
            Object.values(aa._children).forEach((bb) => {   //Prog
               let kro = [];
               Object.values(bb._children).forEach((cc) => { //KRO
                  let ro = [];
                  Object.values(cc._children).forEach((dd) => {
                     delete dd._children
                     ro.push(dd);
                  });
                  kro.push(mergeArray(ro)); //RO
               });
               delete bb._children;
               prog.push(mergeArray(kro));
            });
            delete aa._children;
            child.push(mergeArray(prog));
         });
         delete item._children;
         item._children = mergeArray(child);
         item.id = i + 1;
      });
   } else if ((intervensi == true && level == "ro")) {
      dataF.forEach((item, i) => {  //kl
         let child = [];
         Object.values(item._children).forEach((aa) => {    //keg
            let prog = [];
            Object.values(aa._children).forEach((bb) => {   //Prog
               let kro = [];
               Object.values(bb._children).forEach((cc) => { //KRO
                  let ro = [];
                  Object.values(cc._children).forEach((dd) => {
                     let rro = [];
                     Object.values(dd._children).forEach((ee) => {
                        delete ee._children
                        rro.push(ee);
                     });
                     delete dd._children;
                     ro.push(mergeArray(rro)); //RO 
                  });
                  kro.push(mergeArray(ro)); //RO
               });
               delete bb._children;
               child.push(mergeArray(kro));
            });
            delete aa._children;
            child.push(mergeArray(prog));
         });
         delete item._children;
         item._children = mergeArray(child);
         item.id = i + 1;
      });
   } else {
      dataF.forEach((item, i) => {  //kl
         Object.values(item._children).forEach((aa) => {    //keg
            Object.values(aa._children).forEach((bb) => {   //Prog
               Object.values(bb._children).forEach((cc) => { //KRO
                  Object.values(cc._children).forEach((dd) => {
                     if ((typeof dd.lokasi_ro !== "undefined") || (dd.lokasi_ro != null) || (dd.lokasi_ro != "")) {
                        let mmmm = Object.assign({}, dd.lokasi_ro),
                           eef = [];
                        Object.values(mmmm).forEach((ee) => {
                           eef.push(ee.nama_lokus)
                        });
                        dd.lokasi = eef.join(",");
                     }
                  })
               });
            });
         });
         item.id = i + 1;
      });
   }
   let dataA = dataF;
   delete dataF
   return dataA;
};
function popupnote(notice) {
   let container = document.createElement("div"),
      label = document.createElement("label");
   label.innerHTML = notice;
   label.style.display = "block";
   label.style.fontSize = "1em";
   label.style.padding = "7px";
   container.appendChild(label);
   return container;
}

function sumberDataRenja() {
   const updatedRenja = (JSON.parse(localStorage.getItem("updateRenja")) == null) ? "" : JSON.parse(localStorage.getItem("updateRenja")).value[0].updated_at,
      dateT = updatedRenja.split(" "),
      dateTm = dateT[0].split("-"),
      //dateTime = new Date(dateTm[0], dateTm[1], dateTm[2]).toLocaleDateString('id-ID');
      dateTime = dateTm[2] + "/" + dateTm[1] + "/" + dateTm[0];
   console.log(dateTime);
   document.querySelector(".sumber-data-renja").innerHTML = "*Data berasal dari Krisna Renja K/L tanggal " + dateTime;
};

function sumberDataAnnual() {
   document.querySelector(".sumber-data-annual").innerHTML = "*Data berasal dari Laporan Semesteran K/L";
};
function treeOpenCloseHtml(class_id, downld = {}, intervensi = false) {

   let xls_id = "download-xlsx",
      pdf_id = "download-pdf",
      btn_pdf = "",
      btn_xls = "";

   if (typeof downld.xls_id != "undefined") {
      xls_id = downld.xls_id;
      btn_xls = /*html*/`
            <button class="btn btn-white" >
               <i class="fas fa-lg fa-fw fa-file-excel p-0 m-0 cursor-pointer fs-20px text-green-400" title="export xls" id="${xls_id}"></i>
            </button>
                  `;
   }
   if (typeof downld.xls_html != "undefined") {
      btn_xls = downld.xls_html;
   }
   if (typeof downld.pdf_id != "undefined") {
      pdf_id = downld.pdf_id;
      btn_pdf = /*html*/`
            <button class="btn btn-white" >
               <i class="fas fa-lg fa-fw fa-file-pdf p-0 m-0 cursor-pointer fs-20px text-red-400" title="export pdf" id="${pdf_id}"></i>
            </button>
                  `;
   }
   console.log("btn_xls2", btn_xls);
   let
      html = /*html*/`      
      <div class="d-flex justify-content-between">
         <div class="d-flex flex-row bd-highlight">
            <div class="pb-2 mt-n2 bd-highlight">
               <div class="ms-1 mt-2 openclose"  data-tree="close">
               <i class="fas fa-compress-arrows-alt fs-23px"></i>
               </div>
            </div>
            <div class="pb-2 mt-n2 ps-3 bd-highlight">
               <div class="btn-group groupItem">
               <button class="btn bg-lime-600 text-light active" data-item="semua">Semua</button>
               ${intervensi ? /*html*/`<button class="btn bg-gray-600 text-light" data-item="intervensi">Intervensi</button>` : ""}
               <button class="btn bg-indigo-600 text-light" data-item="program">Program</button>
               <button class="btn bg-teal-600 text-light" data-item="kegiatan">Kegiatan</button>
               <button class="btn bg-orange-600 text-light" data-item="kro">KRO</button>
               <button class="btn bg-yellow-600 text-light" data-item="ro">RO</button>
               </div>
            </div>            
         </div>
         <div class="d-flex flex-row bd-highlight">
            <div class="mt-n2  bd-highlight">
            ${((typeof downld.xls_id == "undefined") && (typeof downld.pdf_id == "undefined") && (typeof downld.xls_html == "undefined")) ?
            "" :/*html*/`
               <div class="btn-group" id="groupExp">
                  <button class="btn btn-white active" >Export</button>
                  ${btn_xls}${btn_pdf}
               </div>
               `} 
               
            </div>
         </div>
      </div>`;
   return $(class_id).html(html);
}

function treeOpenClose(datax, tabelData, intervensi = false) {
   let opsiTabel;
   $(datax).toggleClass("topen");
   if ($(datax).hasClass("topen")) {
      $(datax).attr("data-tree", "open");
      $(datax).find("i").removeClass(['fa-compress-arrows-alt']);
      $(datax).find("i").addClass(['fa-expand-arrows-alt', 'text-green']);
      opsiTabel = { expand: true };
   } else {
      $(datax).attr("data-tree", "close");
      $(datax).find("i").removeClass(['fa-expand-arrows-alt', 'text-green']);
      $(datax).find("i").addClass(['fa-compress-arrows-alt']);
      opsiTabel = { expand: false };
   }
   let item = $(datax).parent().parent().find(".groupItem").find(".active").data("item"),
      adjust = tableTreeLevel(tabelData, item, intervensi);

   return { 'adjust': adjust, 'opsiTabel': opsiTabel, 'item': item };
}

function treeBtnGroup(datax, tabelData, intervensi = false) {
   $(datax).parent().find(".active").removeClass("active");
   $(datax).addClass("active");
   let item = $(datax).data("item"),
      openclose = $(datax).parent().parent().parent().find(".openclose").attr("data-tree"),
      opsiTabel;
   if (openclose == "close") {
      opsiTabel = { expand: false }
   } else {
      opsiTabel = { expand: true }
   }
   let adjust = tableTreeLevel(tabelData, item, intervensi);
   return { 'adjust': adjust, 'opsiTabel': opsiTabel, 'item': item };
}

function resetOpenClose() {
   $(".openclose").attr("data-tree", "close");
   $(".openclose").find("i").removeClass(["fa-expand-arrows-alt", "text-green"]);
   $(".openclose").find("i").addClass(["fa-compress-arrows-alt"]);
}

/* function Amchart4 */
function exportAmchart4(chart) {
   chart.exporting.menu = new am4core.ExportMenu();
   chart.exporting.menu.align = "right";
   chart.exporting.menu.verticalAlign = "top";
   chart.exporting.menu.items = [
      {
         "label": "...",
         "menu": [
            {
               "label": "Image",
               "menu": [
                  { "type": "png", "label": "PNG" },
                  { "type": "jpg", "label": "JPG" }
               ]
            }, {
               "label": "Data",
               "menu": [
                  { "type": "csv", "label": "CSV" }
               ]
            }
         ]
      }
   ];
}
function closeButton() {
   $(".open_table").find(".material-icons").html("close_fullscreen");
   $(".open_table").find(".material-text").html("Open All");
}
function swalPopup(title, modalID = "#tileModal") {
   swal({
      title: title,
      text: ' ',
      icon: 'success',
      buttons: {
         /* cancel: {
             text: 'Cancel',
             value: null,
             visible: true,
             className: 'btn btn-default',
             closeModal: true,
         }, */
         confirm: {
            text: 'Tutup',
            value: true,
            visible: true,
            className: 'btn btn-success',
            closeModal: true
         }
      }
   });
   $(".swal-button--confirm").on("click", function () {
      $(modalID).modal('hide');
   });

}

