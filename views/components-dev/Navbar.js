const Navbar = {
  /**
   * Render the component content.
   */
  render: async () => {
    //console.log('user', user.role_permissions);
    // Define a list of navbar links. Next step get link's menu from database.
    /* {
        name: 'Kinerja Anggaran  Belanja K/L', slug: 'kinerja-anggaran', icon: 'balance', child: [
          { name: 'Belanja K/L', slug: 'belanja-kl', icon: 'real_estate_agent' },
          { name: 'Dana Alokasi Khusus', slug: 'dak', icon: 'real_estate_agent' }
        ]
      }, */

    let links_global = [
      { name: 'Home', slug: '', icon: 'home' }
    ];

    let authority_access = [
      { name: 'Penandaan dan Pagu', slug: 'penandaan-dan-pagu', icon: 'verified' },
      { name: 'Kinerja Anggaran  Belanja K/L', slug: 'kinerja-anggaran-belanja-kl', icon: 'balance' },
      { name: 'Dana Alokasi Khusus', slug: 'dak', icon: 'real_estate_agent' },
      { name: 'Kinerja Pembangunan', slug: 'kinerja-pembangunan', icon: 'account_balance' },
      { name: 'Capaian Indikator', slug: 'capaian-indikator', icon: 'stacked_bar_chart' }
    ];
    let routesPage = [];
    user.role_permissions.forEach((row, i) => {
      if (row.name == "administrator") {
        routesPage = authority_access;
      }
      if (row.name == "admin_ro") {
        routesPage = authority_access;
      }
      if (row.name == "dashboard") {
        routesPage = authority_access;
      }
      if (row.name == "dak") {
        routesPage[i] = { sort: 3, name: 'Dana Alokasi Khusus', slug: 'dak', icon: 'real_estate_agent' };
      }
      if (row.name == "penandaan_pagu") {
        routesPage[i] = { sort: 1, name: 'Penandaan dan Pagu', slug: 'penandaan-dan-pagu', icon: 'verified' };
      }
      if (row.name == "kinerja_anggaran") {
        routesPage[i] = { sort: 2, name: 'Kinerja Anggaran  Belanja K/L', slug: 'kinerja-anggaran-belanja-kl', icon: 'balance' };
      }
      if (row.name == "kineja_pembangunan") {
        routesPage[i] = { sort: 4, name: 'Kinerja Pembangunan', slug: 'kinerja-pembangunan', icon: 'account_balance' };
      }
      if (row.name == "capaian_indikator") {
        routesPage[i] = { sort: 5, name: 'Capaian Indikator', slug: 'capaian-indikator', icon: 'stacked_bar_chart' };
      }
    });

    links_global = links_global.concat(routesPage);
    links_global.sort((a, b) => a.sort - b.sort);

    let links_admin = "";
    if (typeof user != 'undefined') {
      user.role_permissions.forEach((row) => {
        if (row.name == "administrator") {
          let mn = [
            { name: 'Admin Penandaan RO', slug: 'admin-penandaan-ro', icon: 'check_circle' },
            { name: 'Admin Penandaan dan Pagu', slug: 'admin-penandaan-dan-pagu', icon: 'check_circle' },
            { name: 'Admin Penandaan Intervensi', slug: 'admin-penandaan-intervensi', icon: 'check_circle' }
          ];
          let mo = [
            { name: 'Admin Master Intervensi', slug: 'admin-master-intervensi', icon: 'account_tree' },
            { name: 'Admin Master RO Keywords', slug: 'admin-master-keywords', icon: 'account_tree' }
          ];
          links_admin =  /*html*/`
            <div class="menu-header">Menu Administrasi</div>
            ${view_menu(mn)}
            <div class="menu-header">Menu Master</div>
            ${view_menu(mo)}
            `;
          ;
        } else if (row.name == "admin_ro") {
          let mn = [
            { name: 'Admin Penandaan RO', slug: 'admin-penandaan-ro', icon: 'check_circle' },
          ];
          let mo = [
            { name: 'Admin Master RO Keywords', slug: 'admin-master-keywords', icon: 'account_tree' }
          ];
          links_admin =  /*html*/`
            <div class="menu-header">Menu Administrasi</div>
            ${view_menu(mn)}
            <div class="menu-header">Menu Master</div>
            ${view_menu(mo)}
            `;
          ;
        }
      });
    }

    /* console.log("menu", links);
    console.log("menux", parseRequestUrl().resource);
     */// Build html with navigation links.
    return /*html*/ `
      <div class="app-sidebar-content app-sidebar-content-full-height" style="overflow-y: scroll;height: 100%;">
          <!-- BEGIN menu -->
          <div class="menu bg-white-500">
              <div class="menu-profile bg-light mb-2 px-2" style="padding-top: 2.5em !important;">
                  <a href="javascript:;" class="menu-profile-link" data-toggle="app-sidebar-profile"
                      data-target="#appSidebarProfileMenu">
                      <div class="float-start">
                        <!-- <div class="widget-img widget-img-xl rounded float-start" style="background-image: url(img/logo-bappenas.png);width: 5em;position: relative;left: 2px;background-size: contain;">
                        </div> -->
                        <div class="widget-img widget-img-xl rounded float-start" style="width: 4.5em;background: #212121;border-radius: 3em !important;height: 4.4em;position: relative;left: 24px;">
                          <img src="img/logo-krisna.png" style="width: 100%;margin-top: -18px;margin-left: 0.3px;">
                        </div>
                        <div class="widget-img widget-img-xl rounded float-start" style="background-image: url(img/logo-cegah-stunting.png);width: 6em;position: relative;height: 6em;background-size: contain;left: 4em;top: -0.5em;">
                        </div>
                      </div>
                  </a>
              </div>                    
            ${view_menu(links_global)}
            ${links_admin}                 
          </div>
          <!-- END menu -->
      </div>            
    `;

    function view_menu(links) {

      let menu = [],
        isiLink;
      links.forEach((link) => {
        if (link.child) {
          let subX = [];
          link.child.forEach((sublink) => {
            subX.push(/*html*/`
            <div class="menu-item ${parseRequestUrl().resource == sublink.slug ? 'active' : ''}">
              <a href="#/${sublink.slug}" class="menu-link">
                <div class="menu-icon">
                  <i class="material-icons">${sublink.icon}</i>
                </div>
                <div class="menu-text ms-n2">${sublink.name}</div>
              </a>
            </div>
          `)
          });

          isiLink = /*html*/`
        <div class="menu-item has-sub ${parseRequestUrl().resource == link.slug ? 'active' : ''}">
          <a href="#/${link.slug}" class="menu-link">
            <div class="menu-icon">
              <i class="material-icons">${link.icon}</i>
            </div>
            <div class="menu-text ">${link.name}</div>
            <div class="menu-caret"></div>
          </a>
          <div class="menu-submenu  fs-14px ms-n3">`+
            subX.join('\n') +
          /*html*/`
          </div>
        </div>`
        } else {
          isiLink = /*html*/`
        <div class="menu-item  ${parseRequestUrl().resource == link.slug ? 'active' : ''}" >
          <a href="#/${link.slug}" class="menu-link">
            <div class="menu-icon">
              <i class="material-icons">${link.icon}</i>
            </div>
            <div class="menu-text">${link.name}</div>
          </a>
        </div>`;
        }
        menu.push(isiLink);
      });
      return menu.join('\n');
    }
  },
  after_render: async () => {
    $(".menu-item").find(".active").parent().parent().addClass("active");
  }
};

export default Navbar;
