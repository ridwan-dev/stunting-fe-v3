// Import pages, components and helper functions.

import { setWithExpiry, getWithExpiry, parseRequestUrl } from './services/utils.js';
import { validateAuth } from './services/auth.js';
import { api_url, api_url_v3 } from './js/utility/api.js';

import Home from './views/pages/Home.js';
import KinerjaAnggaran from './views/pages/KinerjaAnggaran.js';
import KinerjaPembangunan from './views/pages/KinerjaPembangunan.js';
import BelanjaKL from './views/pages/BelanjaKL.js';
import PenandaanPagu from './views/pages/PenandaanPagu.js';
import DAK from './views/pages/DAK.js';
import CapaianIndikator from './views/pages/CapaianIndikator.js';
import Login from './views/pages/Login.js';
import Error404 from './views/pages/Error404.js';

/*administrasi*/
import AdminPenandaanDanPagu from './views/pages/admin/admin-penandaan-dan-pagu.js';
import AdminPenandaanRo from './views/pages/admin/admin-penandaan-ro.js';
import AdminPenandaanIntervensi from './views/pages/admin/admin-penandaan-intervensi.js';
import AdminMasterIntervensi from './views/pages/admin/admin-master-intervensi.js';
import AdminMasterKeywords from './views/pages/admin/admin-master-keywords.js';

import Header from './views/components/Header.js';
import Navbar from './views/components/Navbar.js';
import Footer from './views/components/Footer.js';

window.config = {
  api_url: api_url(),
  api_url_v3: api_url_v3(),
  fetchHeaders: {
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": 'application/json; charset=utf-8',
    "Authorization": `Bearer ` + getWithExpiry("userLogIn"),
  }
};
window.D = document;
window.parseRequestUrl = parseRequestUrl;
window.setWithExpiry = setWithExpiry;
window.getWithExpiry = getWithExpiry;
window.state = {};
window.geoData = {};
window.mData = {};
window.user = {};

if (getWithExpiry("userProfile") != null) {
  user.name = getWithExpiry("userProfile").name;
  user.email = getWithExpiry("userProfile").email;
  user.role = getWithExpiry("userProfile").roles[0].name;
}

Number.prototype.format_uang = function (n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));
  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
}

// List of supported routes. Any url other than these will render 404 page.
const routes = {
  '/': Home,
  '/kinerja-anggaran-belanja-kl': KinerjaAnggaran,
  '/belanja-kl': BelanjaKL,
  '/kinerja-pembangunan': KinerjaPembangunan,
  '/penandaan-dan-pagu': PenandaanPagu,
  '/dak': DAK,
  '/capaian-indikator': CapaianIndikator,
  '/login': Login,
  '/admin-penandaan-dan-pagu': AdminPenandaanDanPagu,
  '/admin-penandaan-ro': AdminPenandaanRo,
  '/admin-penandaan-intervensi': AdminPenandaanIntervensi,
  '/admin-master-intervensi': AdminMasterIntervensi,
  '/admin-master-keywords': AdminMasterKeywords
};

/**
 * The router code. Takes a URL, checks against the list of
 * supported routes and then renders the corresponding content page.
 */
const router = async () => {

  // Destructure the parsed URl from the addressbar.
  const { resource, id, verb } = parseRequestUrl();

  // Do Auth
  const oauth = !(validateAuth(resource)) ?
    window.location.replace("#/login") :
    (resource === 'login') ?
      window.location.replace("#/") : null;

  // Parse the URL and if it has an id part, change it with the string ":id".
  const parsedUrl =
    (resource ? '/' + resource : '/') +
    (id ? '/:id' : '') +
    (verb ? '/' + verb : '');

  // Lazy load view element:
  const header = null || D.getElementById('header');
  const content = null || D.getElementById('content');
  const main = null || D.getElementById('app');
  const sidebar = null || D.getElementById('sidebar');
  const appClass = D.getElementById("app");
  const sidebarBg = D.querySelector('.app-sidebar-bg');

  // Render the page from map of supported routes or render 404 page.
  const page = routes[parsedUrl] || Error404;
  main.classList.add("loading");
  content.innerHTML = await page.render();

  //return false;
  if (resource === 'login' || resource === null) {
    appClass.classList.remove('app-header-fixed', 'app-content-full-height', 'app-with-wide-sidebar', 'app-with-light-sidebar');
    appClass.classList.add('app-without-sidebar');
    sidebar.classList.add('d-none');
    sidebarBg.classList.add('d-none');
    header.innerHTML = '';
    sidebar.innerHTML = '';
  }
  else {
    if (typeof oauth === 'undefined') {
      window.location.replace("#/");
    }
    appClass.classList.remove('app-without-sidebar');
    appClass.classList.add('app-header-fixed', 'app-content-full-height', 'app-with-wide-sidebar', 'app-with-light-sidebar');
    sidebar.classList.remove('d-none');
    sidebarBg.classList.remove('d-none');
    header.innerHTML = await Header.render();
    sidebar.innerHTML = await Navbar.render();
    content.innerHTML += await Footer.render();
    await Header.after_render();
    await Navbar.after_render();
  }

  await page.after_render();
  main.classList.remove("loading");
};

/**
 * Add event listeners
 */

// Listen on hash change.
window.addEventListener('hashchange', router);

// Listen on page load.
window.addEventListener('load', router);