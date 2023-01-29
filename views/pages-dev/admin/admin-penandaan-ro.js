import { apopoverTrigger, apiMasterIntervensi } from '../../../services/api.js';

const AdminPenandaanRo = {
  /**
   * Render the page content.
   */
  render: async () => {
    mData.dataMasterIntervensi = (typeof mData.dataMasterIntervensi === "undefined") ? await apiMasterIntervensi() : mData.dataMasterIntervensi;

    return /*html*/ `
    <div class="app-content-padding flex-grow-1 overflow-auto admin-cover" data-height="100%">
      <h2 class="page-header text-blue">
        <i class="material-icons text-blue-600 align-middle me-1 mb-1">check_circle3</i>Administrasi Penandaan RO Ditandai dan Disepakati
      </h2>      
      <form class=" " id="formsub">          
        <div class="row pt-3 mx-0 mb-3 py-3 bg-gray-300 rounded" >        
          <div class="col-xl-3"></div>
          <div class="col-xl-4"></div>
          <div class="col-xl-3 ">          
            <div class="form-group sel_tax">                  
              <select id="sel_tahun" name="sel_tahun" class="form-control" required>
                <option value="">Pilih Tahun</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
          <div class="col-xl-2 ">
            <div class="form-group pull-right width-full">
              <div class="btn btn-primary mx-3 px-3" id="subdata">Filter</div>
            </div>
          </div>
        </div>          
      </form>
      <div class="" id="beforeload">	
        <form class="hide" id="input-revisi-penandaan">
          <div class="row mt-3" >	
            <div class="col-xl-12 ">
              <div class="card">
                <div class="card-body " >
                  <div class="" id="table-admin-penandaan-pagu"></div>      
                </div>      
              </div>      
            </div>      
          </div>
          <div class="row mt-3" >	
            <div class="col-xl-3">
              <div class="form-group  width-full">
                <div class="btn btn-primary" data-click="swal-success" id="pushdata">Submit Data</div>
              </div>
            </div>
          </div>
        </form> 
      </div>  
      <div class="modal fade" id="tileModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog ">
          <div class="modal-content" style="width: 58em;margin-left: -13em;">  
            <div class="modal-header bg-gray-300">
              <h4 class="modal-title" id="titleInv"></h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
            </div>
            <div class="modal-body" id="viewData"></div>			
          </div>
        </div>
      </div>
    </div>`;
  },

  after_render: async () => {
    async function getDataPenandaanRo(tahun) {
      try {
        let res = await fetch(config.api_url + '/renja/listro-tagging', {
          method: 'POST',
          body: JSON.stringify({
            "tahun": tahun
          }),
          headers: config.fetchHeaders
        });
        let _res = await res.json();
        console.log(_res.data);
        return _res.data;
      } catch (e) {
        return false;
      }
    };

    let
      form = document.querySelector('#formsub'),
      formIsi = document.querySelector('#input-revisi-penandaan'),
      triggerButton = document.querySelector('#subdata'),
      pushdataButton = document.querySelector('#pushdata');

    pushdataButton.onclick = async function () {

      let subdata2 = formIsi.reportValidity();
      if (subdata2) {
        let
          ditandaiAll = [],
          disepakatiAll = [],
          datas = $("#input-revisi-penandaan").serializeArray();
        datas.forEach((a) => {
          if (a.name === "ditandai") {
            ditandaiAll.push(a.value);
          }
          if (a.name === "disepakati") {
            disepakatiAll.push(a.value);
          }
        });
        try {
          let res = await fetch(config.api_url + '/renja/taggingpost', {
            method: 'POST',
            body: JSON.stringify({
              "tahun": $("#sel_tahun").val(),
              "ditandai": ditandaiAll,
              "disepakati": disepakatiAll
            }),
            headers: config.fetchHeaders
          });
          let _res = await res.json();
          console.log(_res);
          if (_res.status) {
            swal({
              title: 'Data tersimpan',
              text: ' ',
              icon: 'success',
              buttons: {
                confirm: {
                  text: 'Tutup',
                  value: true,
                  visible: true,
                  className: 'btn btn-success',
                  closeModal: true
                }
              }
            });
          }
          return _res.data;
        } catch (e) {
          return false;
        }
      }
    }
    triggerButton.onclick = async function () {
      $("#beforeload").addClass("loading");
      let subdata = form.reportValidity();
      if (subdata) {
        let thn = $("#sel_tahun").val();
        await getDataPenandaanRo(thn).then(function (data) {
          $("#input-revisi-penandaan").removeClass("hide");
          tableDataRo(data);
        });
      }
      $("#beforeload").removeClass("loading");
    }
    async function tableDataRo(tableData) {
      const data = tableData.data,
        dataInt = () => {
          let td = [];
          data.sort((a, b) => a.kementerian_kode > b.kementerian_kode && 1 || -1);
          console.log("xxx", data);
          data.forEach((item, i) => {
            //item.idx = i + 1;
            let ncode = '<div class="badge ' + c_main + '">' +
              '<span class="badge-left ' + c_kl + ' p-1" title="K/L : ' + item.kementerian_nama + '"  data-bs-toggle="popover" style="cursor:pointer">' + item.kementerian_kode + '</span>' +
              '<span class="' + c_prog + ' p-1" title="Program : ' + item.program_nama + '">' + item.program_kode + '</span>' +
              '<span class="' + c_keg + ' p-1" title="Kegiatan : ' + item.kegiatan_nama + '">' + item.kegiatan_kode + '</span>' +
              '<span class="' + c_kro + ' p-1" title="KRO : ' + item.output_nama + '">' + item.output_kode + '</span>' +
              '<span class="' + color_ro + ' badge-right p-1" title="RO : ' + item.suboutput_nama + '">' + item.suboutput_kode + '</span></div>';

            td.push(/*html*/
              `<tr>
                <td style="">
                  ${i + 1}.
                </td>
                <td style="">
                  <div class="form-check ms-3">
                    <input class="form-check-input" type="checkbox"  check="ditandai" ${item.ditandai == 1 ? "checked='checked'" : ""} value="${item.idro}" name="ditandai" >
                  </div>
                </td>
                <td style="">
                  <div class="form-check"">
                    <input class="form-check-input" type="checkbox"  check="disepakati" ${item.disepakati == 1 ? "checked='checked'" : ""} value="${item.idro}" name="disepakati">
                  </div>
                </td>
                <td style="">
                  <div class="text-wrap">
                    ${item.kdtema.search("008") === -1 ? "Kata Kunci" : "Tematik Stunting"}
                  </div>
                </td>
                <td style="">
                  <div class="text-wrap">
                    ${item.kementerian_nama}
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-row bd-highlight">
                    <div class="bd-highlight">${ncode}</div>
                    <div class="bd-highlight text-wrap">${item.suboutput_nama}</div>
                  </div>
                </td>
            </tr>`
            );
          });
          return td.join("");
        };
      //console.log(dataInt());
      Loadtable(dataInt());
      function Loadtable(results) {

        $("#table-admin-penandaan-pagu").html(/*html*/`
        <table class="table" id="tableData" style="width: 100% !important;">
          <thead class="w-100x" style="width: 100% !important;">
            <tr>
              <td >No.</td>
              <td >
                <div style="writing-mode: vertical-rl;text-orientation: mixed;padding-bottom: 0.5em;margin-left: 1em;margin-right: -1em;" >Ditandai</div>
                <div class="form-check" style="margin-left: 1em;margin-right: -1em;">
                  <input class="form-check-input" type="checkbox" id="ditandaiAll">
                </div>
              </td>
              <td style="">
                <div style="writing-mode: vertical-rl;text-orientation: mixed;padding-bottom: 0.5em;">Disepakati</div>
                <div class="form-check" >
                  <input class="form-check-input" type="checkbox"  id="disepakatiAll">
                </div>
              </td>
              <td style="">Filter By</td>
              <td style="">Kementerian/Lembaga</td>
              <td style="">Rincian Output</td>
            </tr>
          </thead>
          <body>
          ${results}
          </body>
        </table>        
        `);

        $('#tableData').DataTable({
          scrollY: 300,
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
        $('#ditandaiAll').click(function (event) {
          var selected = this.checked;
          $('input[check="ditandai"]').each(function () {
            this.checked = selected;
          });
        });
        $('#disepakatiAll').click(function (event) {
          var selected = this.checked;
          $('input[check="disepakati"]').each(function () {
            this.checked = selected;
          });
        });
      }
      async function validateonSubmitFormIntv(form, fields) {
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
          var data = {
            intervensi_id: document.querySelector("#selectIntMaster").value,
            ro_id: document.querySelector("#ro_id").value,
            thang: document.querySelector("#thang").value
          }
        }
      }
    }
    apopoverTrigger();
  }
};
export default AdminPenandaanRo;