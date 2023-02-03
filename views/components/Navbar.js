const Navbar={render:async()=>{var a;let e="";return"admin"===user.role&&(a=[{name:"Admin Master Intervensi",slug:"admin-master-intervensi",icon:"account_tree"},{name:"Admin Master RO Keywords",slug:"admin-master-keywords",icon:"account_tree"}],e=`
      <div class="menu-header">Menu Administrasi</div>
      ${n([{name:"Admin Penandaan RO",slug:"admin-penandaan-ro",icon:"check_circle"},{name:"Admin Penandaan dan Pagu",slug:"admin-penandaan-dan-pagu",icon:"check_circle"},{name:"Admin Penandaan Intervensi",slug:"admin-penandaan-intervensi",icon:"check_circle"}])}
      <div class="menu-header">Menu Master</div>
      ${n(a)}
      `),`
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
            ${n([{name:"Home",slug:"",icon:"home"},{name:"Penandaan dan Pagu",slug:"penandaan-dan-pagu",icon:"verified"},{name:"Kinerja Anggaran  Belanja K/L",slug:"kinerja-anggaran-belanja-kl",icon:"balance"},{name:"Dana Alokasi Khusus",slug:"dak",icon:"real_estate_agent"},{name:"Kinerja Pembangunan",slug:"kinerja-pembangunan",icon:"account_balance"},{name:"Capaian Indikator",slug:"capaian-indikator",icon:"stacked_bar_chart"}])}
            ${e}                 
          </div>
          <!-- END menu -->
      </div>            
    `;function n(a){let e=[],n;return a.forEach(a=>{if(a.child){let e=[];a.child.forEach(a=>{e.push(`
            <div class="menu-item ${parseRequestUrl().resource==a.slug?"active":""}">
              <a href="#/${a.slug}" class="menu-link">
                <div class="menu-icon">
                  <i class="material-icons">${a.icon}</i>
                </div>
                <div class="menu-text ms-n2">${a.name}</div>
              </a>
            </div>
          `)}),n=`
        <div class="menu-item has-sub ${parseRequestUrl().resource==a.slug?"active":""}">
          <a href="#/${a.slug}" class="menu-link">
            <div class="menu-icon">
              <i class="material-icons">${a.icon}</i>
            </div>
            <div class="menu-text ">${a.name}</div>
            <div class="menu-caret"></div>
          </a>
          <div class="menu-submenu  fs-14px ms-n3">`+e.join("\n")+`
          </div>
        </div>`}else n=`
        <div class="menu-item  ${parseRequestUrl().resource==a.slug?"active":""}" >
          <a href="#/${a.slug}" class="menu-link">
            <div class="menu-icon">
              <i class="material-icons">${a.icon}</i>
            </div>
            <div class="menu-text">${a.name}</div>
          </a>
        </div>`;e.push(n)}),e.join("\n")}},after_render:async()=>{$(".menu-item").find(".active").parent().parent().addClass("active")}};export default Navbar;