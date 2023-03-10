import { logOut } from '../../services/auth.js';

const Header = {
  /**
   * Render the component content.
   */
  render: async () => {
    const userProfile = (JSON.parse(localStorage.getItem("userProfile")) == null) ? "" : JSON.parse(localStorage.getItem("userProfile")).value;
    let name_user = userProfile.email.split("@"),
      name_img = "./img/user/" + name_user[0] + ".jpg";
    /*   var fileExt = imagesExtension.indexOf(name_img);
      console.log("fileExt", fileExt); */
    return /*html*/ `
      		
            <!-- BEGIN navbar-header -->
            <div class="navbar-header">
              <button type="button" class="navbar-desktop-toggler" data-toggle="app-sidebar-minify">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a href="#/" class="navbar-brand">
                <b class="me-1">i-Monev</b> Stunting
                <div class="widget-img widget-img-xl rounded float-start" style="background-image: url(img/logo-bappenas.png);width: 2.7em;position: relative;left: 1em;background-size: contain;">
                </div>                
              </a>
              <button type="button" class="navbar-mobile-toggler" data-toggle="app-sidebar-mobile">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <!-- END navbar-header -->
            <!-- BEGIN header-nav -->
            <div class="navbar-nav float-end">
              <div class="navbar-item navbar-form">
                <form action="" method="POST" name="search" class="d-none">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder='Try searching "Users Today"' />
                    <button type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
                  </div>
                </form>
              </div>
              <div class="navbar-item navbar-user dropdown float-end">
                <a href="#" class="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
                  <div class="image image-icon bg-gray-800 text-gray-600">
                    <!---img src="${userProfile.avatar}"/--->

                    <!-- <img src="https://i.pravatar.cc/150?img=56"/> -->
                    <img src="${name_img}" style="margin: 0% !important;width: 100% !important;height: 100% !important;"/>

                  </div>
                  <span class="d-none d-md-inline">${userProfile.name}</span> <b class="caret ms-lg-2"></b>
                </a>
                <div class="dropdown-menu dropdown-menu-end me-1">
                  <!-- <a href="javascript:;" class="dropdown-item">Edit Profile</a>
                  <a href="javascript:;" class="dropdown-item">Setting</a> -->
                  <a href="javascript:;" class="dropdown-item logout-button">Log Out</a>
                </div>
              </div>
            </div>
            <!-- END header-nav -->
         
    `;
  },
  /**
   * All the code related to DOM interactions and controls go in here.
   * This is a separate call as these can be registered only after the DOM has been painted.
   */
  after_render: async () => {
    const elLogout = D.querySelector('.logout-button');
    elLogout.addEventListener("click", function (event) {
      event.preventDefault();
      logOut();
    });


  }
};

export default Header;