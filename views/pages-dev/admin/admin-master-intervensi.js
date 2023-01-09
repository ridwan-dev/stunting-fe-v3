import { apopoverTrigger, apiMasterIntervensi } from '../../../services/api.js';

const AdminPenandaanDanPagu = {
  /**
   * Render the page content.
   */
  render: async () => {
    mData.dataMasterIntervensi = (typeof mData.dataMasterIntervensi === "undefined") ? await apiMasterIntervensi() : mData.dataMasterIntervensi;


    return /*html*/ `
    <div class="app-content-padding flex-grow-1 overflow-auto admin-cover" data-height="100%">
      <h2 class="page-header text-blue">
        <i class="material-icons text-blue-600 align-middle me-1 mb-1">account_tree</i>Master Intervensi
      </h2>
      
      <form class=" " id="dataIntev">          
        <div class="row pt-3 mx-0 mb-3 py-3  rounded" >
          <div class="col-xl-12 ">          
            <div class="text-end mb-3"><div class="btn btn-success" id="addIntv" data-bs-toggle="modal" data-bs-target="#tileModal">Tambah Intervensi</div></div>
            <div id="intervensi-table"></div>
          </div>          
        </div>          
      </form>
      
      <div class="modal fade" id="tileModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content" style="width: 58em;margin-left: -13em;">  
            <div class="modal-header bg-gray-300">
              <h4 class="modal-title" id="titleInv"></h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body" id="viewData">
            </div>			
          </div>
        </div>
      </div>
            
    </div>`;


  },

  after_render: async () => {

    $("#addIntv").on("click", async function () {
      $("#titleInv").html("Tambah Intervensi ");
      $("#viewData").html(/*html*/`
              <form action="${window.location.href}"  id="form-add">
								<fieldset>
                  <div class="mb-3">
										<label class="form-label" for="grInt">Group Intevensir</label>
										<select class="form-select" id="grInt" data-error="This field should not be left blank." x-moz-errormessage="This field should not be left blank." required>
                      <option value="" >Pilih</option>
                      <option value="1-Spesifik">Spesifik</option>
                      <option value="2-Sensitif" >Sensitif</option>
                      <option value="3-Dukungan" >Dukungan</option>
                      <option value="100-Linnya" >Lainnya</option>
                    </select>
									</div>
									<div class="mb-3">
										<label class="form-label" for="kodeInt">Kode Intervensi</label>
										<input class="form-control" type="text"  id="kodeInt" placeholder="Kode Intervensi" title="This field should not be left blankx." required>
									</div>
									<div class="mb-3">
										<label class="form-label" for="namaInt">Kelompok Intervensi</label>
										<input class="form-control" type="text" id="namaInt"  placeholder="kelompok Intervensi" required>
									</div>									
									<div class="mb-3">
										<label class="form-label" for="aliasInt">Alias</label>
										<input class="form-control" type="text" id="aliasInt"  placeholder="Alias" required>
									</div>
									<div class="mb-3">
										<label class="form-label" for="deskInt">Deskripsi</label>
										<input class="form-control" type="text" id="deskInt" placeholder="Deskripsi">
									</div>
                  <button type="submit" class="btn btn-primary w-100px me-5px" id="submit-intv" >Submit</button>
									<div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
								</fieldset>
							</form>
              `);
      document.querySelector('#submit-intv').addEventListener('click', (event) => {
        const form = document.querySelector("form");
        if (form) {
          const fields = ["grInt", "kodeInt", "namaInt", "aliasInt", "deskInt"];
          validateonSubmitForm(form, fields, "insert");
        }
      });
      /* $(".swal-button--confirm").on("click", async function () {

        delete mData.dataMasterIntervensi;
        tableData(await apiMasterIntervensi());

      }); */
    });

    async function validateonSubmitForm(form, fields, action) {
      var error = 0;
      fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        if (validateFields(input) == false) {
          error++;
        }
      });
      console.log("error", error);
      if (error > 0) {
        return false;
      } else {
        let gintv = document.querySelector("#grInt").value.split("-"),
          data;
        if (action === "edit") {
          data = {
            tipe_id: gintv[0],
            id: document.querySelector("#idInt").value,
            intervensi_kode: document.querySelector("#kodeInt").value,
            intervensi_nama: document.querySelector("#namaInt").value,
            intervensi_nama_alias: document.querySelector("#aliasInt").value,
            deskripsi: document.querySelector("#deskInt").value
          }
        } else {
          data = {
            tipe_id: gintv[0],
            intervensi_kode: document.querySelector("#kodeInt").value,
            intervensi_nama: document.querySelector("#namaInt").value,
            intervensi_nama_alias: document.querySelector("#aliasInt").value,
            deskripsi: document.querySelector("#deskInt").value
          }
        }

        try {
          let res = await fetch(config.api_url + '/data/intervensipost', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: config.fetchHeaders
          });
          let _res = await res.json();
          swalPopup("Data Tersimpan");
          delete mData.dataMasterIntervensi;
          mData.dataMasterIntervensi = (typeof mData.dataMasterIntervensi === "undefined") ? await apiMasterIntervensi() : mData.dataMasterIntervensi;
          tableData(mData.dataMasterIntervensi);
        } catch (e) {
          return false;
        }



      }
      //});
    }
    tableData(mData.dataMasterIntervensi);

    async function tableData(data) {
      console.log(data);
      const dataInt = () => {
        let datax = Object.values(data);
        data.sort((a, b) => a.kementerian_kode > b.kementerian_kode && 1 || -1)
        data.forEach((item, i) => {
          item.idx = i + 1;
        });
        return datax;
      };

      var table = new Tabulator("#intervensi-table", {
        height: "411px",
        data: dataInt(),
        layout: "fitColumns",
        columns: [
          {
            title: "No.",
            titleDownload: "No.", vertAlign: "middle",
            field: "idx", width: 70,
            visible: true, sorter: "number",
            hozAlign: "center", headerHozAlign: "center", frozen: true
          },
          { title: "Kode Intervensi", field: "intervensi_kode", width: 150, headerFilter: "input" },
          { title: "Kelompok Intervensi", field: "intervensi_nama", width: 390, headerFilter: "input" },
          { title: "Alias", field: "intervensi_nama_alias", width: 110, headerFilter: "input" },
          { title: "Deskripsi", field: "deskripsi", width: 170, headerFilter: "input" },
          { title: "Group Intervensi", field: "tipe_nama", width: 150, headerFilter: "input" },
          {
            title: "Aksi", hozAlign: "center",
            cellClick: function (e, cell) {
              //console.log(cell.getRow().getData());
              console.log(cell._cell.row.data.intervensi_nama);
              $("#titleInv").html("Edit Intervensi " + cell._cell.row.data.intervensi_nama);
              $("#viewData").html(/*html*/`
              <form action="${window.location.href}"  id="form-add">
            <!--  <form action="/" method="POST"> -->
								<fieldset>
                  <div class="mb-3">
                    <input class="form-control" type="hidden" value="${cell._cell.row.data.id}" id="idInt" required>
                    <label class="form-label" for="grInt">Group Intevensi</label>
										<select class="form-select" id="grInt"  required>
                      <option value="" >Pilih</option>
                      <option value="1-Spesifik" ${cell._cell.row.data.tipe_id === 1 ? 'selected="selected"' : ''} >Spesifik</option>
                      <option value="2-Sensitif" ${cell._cell.row.data.tipe_id === 2 ? 'selected="selected"' : ''} >Sensitif</option>
                      <option value="3-Dukungan" ${cell._cell.row.data.tipe_id === 3 ? 'selected="selected"' : ''} >Dukungan</option>
                      <option value="100-Linnya" ${cell._cell.row.data.tipe_id === 100 ? 'selected="selected"' : ''} >Lainnya</option>
                    </select>
									</div>
									<div class="mb-3">
										<label class="form-label" for="kodeInt">Kode Intervensi</label>
										<input class="form-control" type="text" value="${cell._cell.row.data.intervensi_kode}" id="kodeInt" placeholder="Kode Intervensi"  required>
									</div>
									<div class="mb-3">
										<label class="form-label" for="namaInt">Kelompok Intervensi</label>
										<input class="form-control" type="text" id="namaInt" value="${cell._cell.row.data.intervensi_nama}" placeholder="Kelompok Intervensi"  required>
									</div>									
									<div class="mb-3">
										<label class="form-label" for="aliasInt">Alias</label>
										<input class="form-control" type="text" id="aliasInt" value="${cell._cell.row.data.intervensi_nama_alias}" placeholder="Alias"  required>
									</div>
									<div class="mb-3">
										<label class="form-label" for="deskInt">Deskripsi</label>
										<input class="form-control" type="text" id="deskInt" value="${cell._cell.row.data.deskripsi === null ? '' : cell._cell.row.data.deskripsi}" placeholder="Deskripsi">
									</div>
                  <button type="submit" class="btn btn-primary w-100px me-5px" id="submit-intv-edit" >Submit</button>
									<div class="btn btn-default w-100px" data-bs-dismiss="modal">Cancel</div>
								</fieldset>
							</form>
              `);
              document.querySelector('#submit-intv-edit').addEventListener('click', (event) => {
                const form = document.querySelector("form");
                if (form) {
                  const fields = ["idInt", "grInt", "kodeInt", "namaInt", "aliasInt", "deskInt"];
                  validateonSubmitForm(form, fields, "edit");
                }
              });
            }, formatter: function (cell, formatterParams, onRendered) { //plain text value
              return "<div class='btn btn-primary editIntv' data-bs-toggle='modal' data-bs-target='#tileModal'>Edit</div>";
            }
          }],
        initialSort: [
          { column: "idx", dir: "asc" }
        ]
      });

      return table;
    }
    apopoverTrigger();
    //datePicker();

  }
};

export default AdminPenandaanDanPagu;
