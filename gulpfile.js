const gulp = require('gulp');
const connect = require('gulp-connect');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify');
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const esmify = require('esmify');
const htmlmin = require('gulp-htmlmin');

const destPath = './dist/',
    destProd = './views/pages/',
    destAdm = './views/pages/admin/',
    destCom = './views/components/',
    destServ = './services/'
    ;

gulp.task('bundle-css', () => {
    return gulp.src([
        "plugins/core/css/app.min.css",
        "plugins/core/css/vendor.min.css",
        "plugins/core/css/bootstrap-select.min.css",
        "plugins/core/css/loadspiner.css",
        "plugins/core/css/bootstrap-datepicker.css",
        "plugins/core/css/bootstrap-datepicker3.css",
        "plugins/core/css/style.css",
        "plugins/core/css/add.css",
        "plugins/jstree/dist/themes/default/style.min.css",
        "plugins/leaflet/css/add.css",
        "plugins/leaflet/css/Control.FullScreen.css",
        "plugins/leaflet/css/Control.Loading.css",
        "plugins/leaflet/css/geosearch.css",
        "plugins/leaflet/css/L.Control.Sidebar.css",
        "plugins/leaflet/css/leaflet.css",
        "plugins/leaflet/css/leaflet-gesture-handling.min.css",
        "plugins/core/css/ionicons.min.css",
        "plugins/vanilla-notify/vanilla-notify.css",
        'plugins/tabulator/css/tabulator_bulma.css',
        'plugins/vanilla-notify/vanilla-notify.css',
        "plugins/tabulator/css/tabulator_bulma.min.css",
        "plugins/tabulator/css/tabulator.min.css",
        "plugins/dataTables/jquery.dataTables.min.css",
    ])
        .pipe(concat('bundle.css'))
        .pipe(minifyCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(destPath))
        ;
});

gulp.task('vendor-js', () => {
    return gulp.src([
        "plugins/core/js/google.min.js",
        "plugins/core/js/vendor.min.js",
        "plugins/core/js/app.min.js",
        "plugins/core/js/bootstrap-select.min.js",
        "plugins/core/js/bootstrap-datepicker.js",
        "plugins/core/js/sweetalert.min.js",
        "plugins/core/js/fuse.js",
        "plugins/core/js/numeral.min.js",
        "plugins/tabulator/js/tabulator.min.js",
        "plugins/tabulator/js/tabulator531.min.js",
        "plugins/tabulator/js/jspdf141.min.js",
        "plugins/tabulator/js/jspdf235.plugin.autotable.min.js",
        "plugins/tabulator/js/jspdf240.umd.min.js",
        "plugins/tabulator/js/jspdf352.plugin.autotable.min.js",
        "plugins/tabulator/js/xlsx.full531.min.js",
        "plugins/tabulator/js/tableHTMLExport.js",
        "plugins/localforage/localforage.min.js",
        "plugins/leaflet/js/leaflet.js",
        "plugins/leaflet/js/iso8601.min.js",
        "plugins/leaflet/js/Leaflet.Coordinates-0.1.3.min.js",
        "plugins/leaflet/js/leaflet-plugins.js",
        "plugins/leaflet/js/leaflet-search.src.js",
        "plugins/leaflet/js/leaflet-sidebar.min.js",
        "plugins/leaflet/js/leaflet-spin.js",
        "plugins/leaflet/js/Control.FullScreen.js",
        "plugins/leaflet/js/Control.Loading.js",
        "plugins/leaflet/js/geosearch.umd.js",
        "plugins/leaflet/js/L.Control.Sidebar.js",
        "plugins/leaflet/js/leaflet.markercluster.js",
        "plugins/leaflet/js/leaflet-gesture-handling.min.js",
        "plugins/leaflet/js/leaflet-heat.js",
        "plugins/apexcharts/dist/apexcharts.min.js",
        "plugins/jstree/dist/jstree.min.js",
        "plugins/vanilla-notify/vanilla-notify.js",
        "plugins/amcharts5/index.js",
        "plugins/amcharts5/xy.js",
        "plugins/amcharts5/Animated.js",
        "plugins/amcharts5/percent.js",
        "plugins/amcharts5/exporting.js",
        "plugins/amcharts4/core.js",
        "plugins/amcharts4/charts.js",
        "plugins/amcharts4/venn.js",
        "plugins/amcharts4/animated.js",
        "plugins/amcharts4/forceDirected.js",
        "plugins/parsley/parsley.min.js",
        "plugins/dataTables/jquery.dataTables.min.js",
        "js/utility/core.js",
        "js/utility/capaian-indikator/stunting.js",
        "js/utility/kinerja-anggaran/kinerja.js",
        "js/utility/kinerja-pembangunan/rolokasi.js",
        "js/utility/dak/db_dak.js",
        "js/utility/monitoring/intervensi.js",
    ])
        .pipe(concat('vendor.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destPath));
});

gulp.task('index-html', () => {
    return gulp.src('index-ori.html')
        .pipe(concat('index.html'))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("."));
});


gulp.task('header-js', () => {
    return gulp.src([
        "views/components-dev/Header.js",
    ])
        .pipe(concat('Header.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destCom));
});

gulp.task('navbar-js', () => {
    return gulp.src([
        "views/components-dev/Navbar.js",
    ])
        .pipe(concat('Navbar.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destCom));
});

gulp.task('footer-js', () => {
    return gulp.src([
        "views/components-dev/Footer.js",
    ])
        .pipe(concat('Footer.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destCom));
});

gulp.task('api-js', () => {
    return gulp.src([
        "services-dev/api.js",
    ])
        .pipe(concat('api.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destServ));
});

gulp.task('auth-js', () => {
    return gulp.src([
        "services-dev/auth.js",
    ])
        .pipe(concat('auth.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destServ));
});

gulp.task('core-js', () => {
    return gulp.src([
        "services-dev/core.js",
    ])
        .pipe(concat('core.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destServ));
});

gulp.task('utils-js', () => {
    return gulp.src([
        "services-dev/utils.js",
    ])
        .pipe(concat('utils.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destServ));
});

gulp.task('home-js', () => {
    return gulp.src([
        "views/pages-dev/Home.js",
    ])
        .pipe(concat('Home.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destProd));
});

gulp.task('belanjakl-js', () => {
    return gulp.src([
        "views/pages-dev/BelanjaKL.js",
    ])
        .pipe(concat('BelanjaKL.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destProd));
});

gulp.task('capaian-js', () => {
    return gulp.src([
        "views/pages-dev/CapaianIndikator.js",
    ])
        .pipe(concat('CapaianIndikator.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destProd));
});

gulp.task('dak-js', () => {
    return gulp.src([
        "views/pages-dev/DAK.js",
    ])
        .pipe(concat('DAK.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destProd));
});

gulp.task('e404-js', () => {
    return gulp.src([
        "views/pages-dev/Error404.js",
    ])
        .pipe(concat('Error404.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destProd));
});

gulp.task('kinerjaA-js', () => {
    return gulp.src([
        "views/pages-dev/KinerjaAnggaran.js",
    ])
        .pipe(concat('KinerjaAnggaran.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destProd));
});

gulp.task('kinerjaP-js', () => {
    return gulp.src([
        "views/pages-dev/KinerjaPembangunan.js",
    ])
        .pipe(concat('KinerjaPembangunan.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destProd));
});

gulp.task('login-js', () => {
    return gulp.src([
        "views/pages-dev/Login.js",
    ])
        .pipe(concat('Login.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destProd));
});

gulp.task('penandaan-js', () => {
    return gulp.src([
        "views/pages-dev/PenandaanPagu.js",
    ])
        .pipe(concat('PenandaanPagu.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destProd));
});

gulp.task('adm-penandaan-js', () => {
    return gulp.src([
        "views/pages-dev/admin/admin-penandaan-dan-pagu.js",
    ])
        .pipe(concat('admin-penandaan-dan-pagu.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destAdm));
});

gulp.task('adm-master-int-js', () => {
    return gulp.src([
        "views/pages-dev/admin/admin-master-intervensi.js",
    ])
        .pipe(concat('admin-master-intervensi.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destAdm));
});

gulp.task('adm-penandaan-ro-js', () => {
    return gulp.src([
        "views/pages-dev/admin/admin-penandaan-ro.js",
    ])
        .pipe(concat('admin-penandaan-ro.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destAdm));
});

gulp.task('adm-penandaan-intervensi-js', () => {
    return gulp.src([
        "views/pages-dev/admin/admin-penandaan-intervensi.js",
    ])
        .pipe(concat('admin-penandaan-intervensi.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destAdm));
});
gulp.task('adm-master-ro-keyword-js', () => {
    return gulp.src([
        "views/pages-dev/admin/admin-master-keywords.js",
    ])
        .pipe(concat('admin-master-keywords.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest(destAdm));
});

gulp.task("build", function () {

    return browserify({
        entries: ["./index.js"],
        plugin: [esmify],
    })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest(destPath));
});

/* gulp.task('connect', function () {
    connect.server();
}); */

gulp.task('default', gulp.series('bundle-css', 'vendor-js', 'index-html', 'navbar-js', 'navbar-js', 'footer-js', 'api-js', 'auth-js', 'core-js', 'utils-js', 'home-js', 'belanjakl-js', 'capaian-js', 'dak-js', 'e404-js', 'kinerjaA-js', 'kinerjaP-js', 'login-js', 'penandaan-js', 'adm-penandaan-js', 'adm-master-int-js', 'adm-penandaan-ro-js', 'adm-penandaan-intervensi-js', 'adm-master-ro-keyword-js'/* , 'connect' */));