import WidgetCardLink from '../components/WidgetCardLink.js';
import { logOut } from '../../services/auth.js';

const Home = {
  /**
   * Render the page content.
   */
  render: async () => {
    if (JSON.parse(localStorage.getItem("userProfile")) == null) {
      return false;
    }
    const
      userProfile = JSON.parse(localStorage.getItem("userProfile")).value,
      des1 = "<div style=''>Perkembangan penandaan dan pagu Program-program terkait dengan percepatan penurunan <i>stunting</i> pada tahap perencanaan dan penganggaran.</div>",
      des2 = "<div style=''>Pemantauan kinerja Kementerian/Lembaga (K/L) serta mengidentifikasi kegiatan khususnya pada keluaran (output) yang berkontribusi terhadap percepatan penurunan stunting atas penggunaan anggaran yang tertuang dalam dokumen anggaran.</div>",
      des3 = "<div style=''>Pemantauan dana yang bersumber dari pendapatan APBN yang dialokasikan kepada daerah tertentu dengan tujuan untuk membantu mendanai kegiatan khusus yang merupakan urusan daerah dan sesuai dengan Prioritas Nasional  berupa DAK Fisik maupun Non Fisik, ke pemerintah daerah.</div>",
      des4 = "<div style=''>Pemantau dan evaluasi kinerja kementerian/lembaga (K/L) serta mengidentifikasi keberhasilan dan hambatan pelaksanaan kegiatan.</div>",
      des5 = "<div style=''>Capaian Indikator meliputi cakupan gizi buruk <i>stunting, underweight, wasting</i> berdasarkan basis data survei terkait pada anak balita dan baduta.</div>",
      desExc = "<div style=''>Executive Summary</div>",
      widgetExcSumary = await WidgetCardLink.render('tile-exc', 'Executive Summary', 'widgets', 'white-100', '', 'white-100', '#/executive-summary', desExc),
      widgetCardLink1 = await WidgetCardLink.render('tile-1', 'Penandaan dan Pagu', 'verified', 'white-100', 'lg-2', 'white-100', '#/penandaan-dan-pagu', des1),
      widgetCardLink2 = await WidgetCardLink.render('tile-2', 'Kinerja Anggaran', 'balance', 'white-100', 'lg-3', 'white-100', '#/kinerja-anggaran-belanja-kl', des2),
      widgetCardLink3 = await WidgetCardLink.render('tile-3', 'Dana Alokasi Khusus', 'real_estate_agent', 'white-100', 'lg-3', 'white-100', '#/dak', des3),
      widgetCardLink4 = await WidgetCardLink.render('tile-4', 'Kinerja Pembangunan', 'stacked_bar_chart', 'white-100', 'lg-2', 'white-100', '#/kinerja-pembangunan', des4),
      widgetCardLink5 = await WidgetCardLink.render('tile-5', 'Capaian Indikator', 'insights', 'white-100', 'lg-2', 'white-100', '#/capaian-indikator', des5)
      ;
    let widgetCard = [];
    let authority_access = [
      { sort: 1, data: widgetCardLink1 }
    ].concat(
      { sort: 2, data: widgetCardLink2 },
      { sort: 3, data: widgetCardLink3 },
      { sort: 4, data: widgetCardLink4 },
      { sort: 5, data: widgetCardLink5 }
    );
    if (typeof user == 'undefined') {
      widgetCard = '';
    } else {
      user.role_permissions.forEach((row, i) => {
        if (row.name == "administrator") {
          widgetCard = authority_access;
        }
        if (row.name == "admin_ro") {
          widgetCard = authority_access;
        }
        if (row.name == "dashboard") {
          widgetCard = authority_access;
        }
        if (row.name == "kinerja_anggaran") {
          widgetCard[i] = { sort: 3, data: widgetCardLink2 };
        }
        if (row.name == "kineja_pembangunan") {
          widgetCard[i] = { sort: 5, data: widgetCardLink4 };
        }
        if (row.name == "capaian_indikator") {
          widgetCard[i] = { sort: 6, data: widgetCardLink5 };
        }
        if (row.name == "dak") {
          widgetCard[i] = { sort: 4, data: widgetCardLink3 };
        }
        if (row.name == "penandaan_pagu") {
          widgetCard[i] = { sort: 2, data: widgetCardLink1 };
        }
        if (row.name == "executive_summary") {
          widgetCard[i] = { sort: 1, data: widgetExcSumary };
        }
      });
    }
    widgetCard.sort((a, b) => a.sort - b.sort);

    let widgetCardx = [];
    widgetCard.forEach((row) => { widgetCardx.push(row.data); });

    return /*html*/ `
    <div class="app-content-padding p-2 overflow-hidden" data-scrollbar="true">
      <div class="btn-group float-end">
        <a href="#" class="btn btn-sm btn-primary">${userProfile.name}</a>
        <a href="#" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown">
          <i class="fa fa-caret-down"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <!-- <li class="dropdown-item">Setting</li> -->
          <li class="dropdown-item logout-button">Log Out</li>
        </ul>
      </div>
      <div class="p-3 text-center">                
        <p class="h2 text-green mt-5 mb-2">i-MONEV <span class="text-warning fw-bold">STUNTING</span></p>
        <p class="h3 text-gray-700 mt-3">Sistem Pemantauan & Evaluasi</p>
        <p class="h4 text-gray-700">Program Percepatan Penurunan Stunting</p>
        <p class="h5 text-gray-700">Secara Terintegrasi dan Berbasis Spasial</p>
      </div>
      <div class="container d-flex flex-column border-top pt-2">
        <div class="row p-2 align-self-center" id="widgetcard">
          ${widgetCardx.join(" ")}
        </div>
      </div>
    </div>
    `;
  },
  /* ${widgetCardLink1}
          ${widgetCardLink2}
          ${widgetCardLink3}
          ${widgetCardLink4}
          ${widgetCardLink5} */
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */
  after_render: async () => {
    try {
      let res = await fetch(config.api_url + '/pp/krisna-update', {
        method: 'GET',
        headers: config.fetchHeaders
      });
      let _res = await res.json();
      setWithExpiry("updateRenja", _res.data, 1000 * 60 * 60);
    } catch (e) {
      console.log(e);
    }

    $("#tile-1,#tile-2,#tile-3,#tile-4,#tile-5").find("h5").attr("style", "height: 2em;");
    const elLogout = D.querySelector('.logout-button');
    if (elLogout == null) {
      return false;
    }
    elLogout.addEventListener("click", function (event) {
      event.preventDefault();
      logOut();
    });
  }
};
export default Home;