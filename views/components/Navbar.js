const Navbar={render:async()=>{let a=[{name:"Home",slug:"",icon:"home"}],e=[{name:"Penandaan dan Pagu",slug:"penandaan-dan-pagu",icon:"verified"},{name:"Kinerja Anggaran  Belanja K/L",slug:"kinerja-anggaran-belanja-kl",icon:"balance"},{name:"Dana Alokasi Khusus",slug:"dak",icon:"real_estate_agent"},{name:"Kinerja Pembangunan",slug:"kinerja-pembangunan",icon:"account_balance"},{name:"Capaian Indikator",slug:"capaian-indikator",icon:"stacked_bar_chart"}],i=[],s=(user.role_permissions.forEach((a,n)=>{"administrator"==a.name&&(i=e),"admin_ro"==a.name&&(i=e),"dashboard"==a.name&&(i=e),"dak"==a.name&&(i[n]={sort:3,name:"Dana Alokasi Khusus",slug:"dak",icon:"real_estate_agent"}),"penandaan_pagu"==a.name&&(i[n]={sort:1,name:"Penandaan dan Pagu",slug:"penandaan-dan-pagu",icon:"verified"}),"kinerja_anggaran"==a.name&&(i[n]={sort:2,name:"Kinerja Anggaran  Belanja K/L",slug:"kinerja-anggaran-belanja-kl",icon:"balance"}),"kineja_pembangunan"==a.name&&(i[n]={sort:4,name:"Kinerja Pembangunan",slug:"kinerja-pembangunan",icon:"account_balance"}),"capaian_indikator"==a.name&&(i[n]={sort:5,name:"Capaian Indikator",slug:"capaian-indikator",icon:"stacked_bar_chart"})}),(a=a.concat(i)).sort((a,n)=>a.sort-n.sort),"");return"undefined"!=typeof user&&user.role_permissions.forEach(a=>{var n,e;"administrator"==a.name?(n=[{name:"Admin Penandaan RO",slug:"admin-penandaan-ro",icon:"check_circle"},{name:"Admin Penandaan dan Pagu",slug:"admin-penandaan-dan-pagu",icon:"check_circle"},{name:"Admin Penandaan Intervensi",slug:"admin-penandaan-intervensi",icon:"check_circle"}],e=[{name:"Admin Master Intervensi",slug:"admin-master-intervensi",icon:"account_tree"},{name:"Admin Master RO Keywords",slug:"admin-master-keywords",icon:"account_tree"}],s=`
            <div class="menu-header">Menu Administrasi</div>
            ${r(n)}
            <div class="menu-header">Menu Master</div>
            ${r(e)}
            `):"admin_ro"==a.name&&(n=[{name:"Admin Penandaan RO",slug:"admin-penandaan-ro",icon:"check_circle"}],e=[{name:"Admin Master RO Keywords",slug:"admin-master-keywords",icon:"account_tree"}],s=`
            <div class="menu-header">Menu Administrasi</div>
            ${r(n)}
            <div class="menu-header">Menu Master</div>
            ${r(e)}
            `)}),`
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
            ${r(a)}
            ${s}                 
          </div>
          <!-- END menu -->
      </div>            
    `;function r(a){let n=[],e;return a.forEach(a=>{if(a.child){let n=[];a.child.forEach(a=>{n.push(`
            <div class="menu-item ${parseRequestUrl().resource==a.slug?"active":""}">
              <a href="#/${a.slug}" class="menu-link">
                <div class="menu-icon">
                  <i class="material-icons">${a.icon}</i>
                </div>
                <div class="menu-text ms-n2">${a.name}</div>
              </a>
            </div>
          `)}),e=`
        <div class="menu-item has-sub ${parseRequestUrl().resource==a.slug?"active":""}">
          <a href="#/${a.slug}" class="menu-link">
            <div class="menu-icon">
              <i class="material-icons">${a.icon}</i>
            </div>
            <div class="menu-text ">${a.name}</div>
            <div class="menu-caret"></div>
          </a>
          <div class="menu-submenu  fs-14px ms-n3">`+n.join("\n")+`
          </div>
        </div>`}else e=`
        <div class="menu-item  ${parseRequestUrl().resource==a.slug?"active":""}" >
          <a href="#/${a.slug}" class="menu-link">
            <div class="menu-icon">
              <i class="material-icons">${a.icon}</i>
            </div>
            <div class="menu-text">${a.name}</div>
          </a>
        </div>`;n.push(e)}),n.join("\n")}},after_render:async()=>{$(".menu-item").find(".active").parent().parent().addClass("active")}};export default Navbar;