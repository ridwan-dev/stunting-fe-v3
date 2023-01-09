import{validateonSubmit}from"../../services/auth.js";const Login={render:async()=>`
        <div class="d-flex align-items-center justify-content-center vh-100">
                        
            <form action="#/" class="form-signin text-center" >
                <img id="logo" class="mb-4" src="img/logo-cegah-stunting.svg" alt="" width="150" height="150">
                <p class="h2 pb-3 text-success">i-MONEV <span class="text-warning fw-bold">STUNTING
                <!--
                <span class="text-primary fw-normal">&trade;</span>
                -->
                </span></p>
                <div class="alert alert-danger d-none" role="alert">
                    Kombinasi Email dan Password tidak ditemukan
                </div>
                <div class="form-floating">
                <input type="email" class="form-control form-control-sm" id="email" placeholder="nama@email.com">
                <label for="email">Alamat Email</label>
                <span class="error-message ps-2 text-danger text-left" style="text-align:left !important"></span>
                </div>
                <div class="form-floating">
                <input type="password" class="form-control form-control-sm" id="password" placeholder="Password">
                <label for="password">Password</label>
                <span class="error-message ps-2 text-danger text-left" style="text-align:left !important"></span>
                </div>
                <div id="gchapca"></div>
                <button id="login-button" class="w-100 btn btn-lg btn-primary mt-3" type="submit">Login</button>
                <p class="mt-2 mb-0 text-muted"><small>2022 &copy; Direktorat Kesehatan Gizi Masyarakat</small></p>
            </form>
            
        </div>
    `,after_render:async()=>{let t;grecaptcha.render(document.getElementById("gchapca"),{sitekey:"6Len2_8aAAAAAP259arN6ctswagsfS50D2rLeuiz",callback:function(a){t=a;a=document.querySelector(".form-signin");a&&validateonSubmit(a,["email","password"],t)},theme:"light"});$("#g-recaptcha-response").removeAttr("name")}};export default Login;