import { validateonSubmit } from '../../services/auth.js';

const Login = {
    /**
     * Render the page content.
     */
    render: async () => {
        return /*html*/ `
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
    `;
    },
    /**
     * All the code related to DOM interactions and controls go in here.
     * This is a separate call as these can be registered only after the DOM has been painted.
     */
    after_render: async () => {
        let gCapcha,
            verifyCallback = function (response) {
                gCapcha = response;
                const form = document.querySelector(".form-signin");
                // document.getElementById("login-button").addEventListener("click", login);

                // loginButton.addEventListener("click", function (event) {
                //     event.preventDefault()

                // if the form exists, run the class
                if (form) {
                    // setup the fields we want to validate
                    const fields = ["email", "password"];
                    // run the class
                    // const validator = new Login(form, fields);
                    const validator = validateonSubmit(form, fields, gCapcha);
                }
            };
        // Renders the HTML element with id 'example1' as a reCAPTCHA widget.
        // The id of the reCAPTCHA widget is assigned to 'widgetId1'.
        var cg = grecaptcha.render(document.getElementById('gchapca'), {
            'sitekey': '6Len2_8aAAAAAP259arN6ctswagsfS50D2rLeuiz',
            'callback': verifyCallback,
            'theme': 'light'
        });

        $("#g-recaptcha-response").removeAttr("name");



        // const loginButton = document.getElementById("login-button");
        // loginButton.preventDefault().addEventListener("click", login);


        // });


    }
};
export default Login;
