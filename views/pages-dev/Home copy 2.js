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
      des1 = "Perkembangan penandaan dan pagu Program-program terkait dengan percepatan penurunan <i>stunting</i> pada tahap perencanaan dan penganggaran",
      des2 = "Pemantauan kinerja Kementerian/Lembaga (K/L) serta mengidentifikasi kegiatan khususnya pada keluaran (output) yang berkontribusi terhadap percepatan penurunan stunting. Terdiri dari subsistem <a href='#/belanja-kl' class='link-info' style='position: relative;z-index: 9;'>Belanja K/L</a> dan <a href='#/dak' class='link-info' style='position: relative;z-index: 9;'>Dana Alokasi Khusus (DAK)</a>",
      des3 = "Pemantauan kinerja Kementerian/Lembaga (K/L) serta mengidentifikasi kegiatan khususnya pada keluaran (output) yang berkontribusi terhadap percepatan penurunan stunting. Terdiri dari subsistem <a href='#/belanja-kl' class='link-info' style='position: relative;z-index: 9;'>Belanja K/L</a> dan <a href='#/dak' class='link-info' style='position: relative;z-index: 9;'>Dana Alokasi Khusus (DAK)</a>",
      des4 = "Pemantau dan evaluasi kinerja kementerian/lembaga (K/L) serta mengidentifikasi keberhasilan dan hambatan pelaksanaan kegiatan",
      des5 = "Capaian Indikator dan Analisis Data",
      widgetCardLink1 = await WidgetCardLink.render('tile-1', 'Penandaan dan Pagu', 'verified', 'white-100', 'lg-3', 'white-100', '#/penandaan-dan-pagu', des1),
      widgetCardLink2 = await WidgetCardLink.render('tile-2', 'Kinerja Anggaran', 'balance', 'white-100', 'lg-3', 'white-100', '#/kinerja-anggaran', des2),
      widgetCardLink3 = await WidgetCardLink.render('tile-3', 'Kinerja Pembangunan', 'real_estate_agent', 'white-100', 'lg-3', 'white-100', '#/kinerja-pembangunan', des3),
      widgetCardLink4 = await WidgetCardLink.render('tile-4', 'Capaian Indikator', 'stacked_bar_chart', 'white-100', 'lg-3', 'white-100', '#/capaian-indikator', des4)
      ;

    return /*html*/ `
    <div class="app-content-padding p-2 overflow-hidden" data-scrollbar="true">
      <div class="btn-group float-end">
        <a href="#" class="btn btn-sm btn-primary">${userProfile.name}</a>
        <a href="#" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown">
          <i class="fa fa-caret-down"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li class="dropdown-item">Setting</li>
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
        <div class="row p-2 align-self-center">
          ${widgetCardLink1}
          ${widgetCardLink2}
          ${widgetCardLink3}
          ${widgetCardLink4}
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
