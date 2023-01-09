export const apopoverTrigger = () => {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });
}
export const datePicker = () => {
    var handleDatepicker = function () {
        "use strict";

        $('[data-render="datepicker"]').datepicker({
            todayHighlight: true,
            autoclose: true,
            startDate: '01/01/1997'
        });
    };
    return handleDatepicker();
}
export const sweetNotification = (titlex) => {
    var handleSweetNotification = function (titlex) {

        $('[data-click="swal-info"]').click(function (e) {
            e.preventDefault();
            swal({
                title: titlex,
                text: 'You will not be able to recover this imaginary file!',
                icon: 'info',
                buttons: {
                    cancel: {
                        text: 'Cancel',
                        value: null,
                        visible: true,
                        className: 'btn btn-default',
                        closeModal: true,
                    },
                    confirm: {
                        text: 'Info',
                        value: true,
                        visible: true,
                        className: 'btn btn-info',
                        closeModal: true
                    }
                }
            });
        });
        $('[data-click="swal-success"]').click(function (e) {
            e.preventDefault();
            swal({
                title: 'Tersimpan',
                text: ' ',
                icon: 'success',
                buttons: {
                    /* cancel: {
                        text: 'Cancel',
                        value: null,
                        visible: true,
                        className: 'btn btn-default',
                        closeModal: true,
                    }, */
                    confirm: {
                        text: 'Tutup',
                        value: true,
                        visible: true,
                        className: 'btn btn-success',
                        closeModal: true
                    }
                }
            });
        });
    }
    var Notification = function () {
        "use strict";
        return {
            //main function
            init: function () {
                handleSweetNotification();
            }
        };
    }();
    return Notification.init();
}

export const apiStunting = async () => {
    async function getGeodataStunting() {
        try {
            let res = await fetch(config.api_url + '/geodata/stunting', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: config.fetchHeaders
            });
            let _res = await res.json();

            return _res.data;
        } catch (e) {
            return false;
        }
    };
    var datax;
    await getGeodataStunting().then(function (data) {
        datax = data;
    });
    return datax;
}

export const apiWasting = async () => {
    async function getGeodataWasting() {
        try {
            let res = await fetch(config.api_url + '/geodata/wasting', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };
    var datax;
    await getGeodataWasting().then(function (data) {
        datax = data;
    });
    return datax;
}

export const apiUnderweight = async () => {
    async function getGeodataUnderweight() {
        try {
            let res = await fetch(config.api_url + '/geodata/underweight', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };
    var datax;
    await getGeodataUnderweight().then(function (data) {
        datax = data;
    });
    return datax;
}

export const apiDataNasional = async () => {
    async function getDataNasional() {
        try {
            let res = await fetch(config.api_url + '/dampak/nasional', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };
    var datax;
    await getDataNasional().then(function (data) {
        datax = data;
    });
    return datax;
}

export const apiPrioritasKabupaten = async () => {
    async function getPrioritasKabupaten() {
        try {
            let res = await fetch(config.api_url + '/geodata/kabupaten', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };
    var datax;
    await getPrioritasKabupaten().then(function (data) {
        datax = data;
    });
    return datax;
}

export const apiKementerian = async () => {

    async function getKementerian() {
        try {
            let res = await fetch(config.api_url + '/ka/kementerian', {
                method: 'GET',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };

    var resData;
    await getKementerian().then(function (dataA) {
        resData = dataA;
    });
    return resData;
}

export const apiTahunSemester = async () => {

    async function getTahunSemester() {
        try {
            let res = await fetch(config.api_url + '/ka/tahun-semester', {
                method: 'GET',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };

    var resData;
    await getTahunSemester().then(function (dataA) {
        resData = dataA;
    });
    return resData;
}

export const apiIntervensi = async () => {

    async function getIntervensi() {
        try {
            let res = await fetch(config.api_url + '/ka/intervensi', {
                method: 'GET',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };

    var resData;
    await getIntervensi().then(function (dataA) {
        resData = dataA;
    });
    return resData;
}

export const apiPetaProvinsi = async () => {

    async function getPetaProvinsi() {
        try {
            let res = await fetch(config.api_url + '/geodata/provinsi', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };

    var resData;
    await getPetaProvinsi().then(function (dataA) {
        resData = dataA;
    });
    return resData;
}

/* DAK */
export const apiAnggaranDak = async () => {

    async function getDak() {
        try {
            let res = await fetch(config.api_url + '/sys/json-collection/EAkMmBdZqojlD267RryYbe4Xr9x3J890pPKNnvVzGOwE1gW5Qj', {
                method: 'GET',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };

    var resData;
    await getDak().then(function (dataA) {
        resData = dataA;
    });
    return resData;
}

export const ApiTahunDAK = async () => {
    async function getTahunDAK() {
        try {
            let res = await fetch(config.api_url + '/dak/tahun', {
                method: 'GET',
                headers: config.fetchHeaders,
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            return false;
        }
    };
    var resData;
    await getTahunDAK().then(function (x) {
        resData = x;
    });
    return resData;
}

export const ApiDataByTahun = async () => {
    async function getDataByTahun() {
        try {
            let res = await fetch(config.api_url + '/dak/data-by-tahun', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            //Gtahun = _res;
            return _res.data;
        } catch (e) {
            return false;
        }
    }
    let resData;
    await getDataByTahun().then(function (a) {
        resData = a;
    });
    return resData;
}

export const ApiDakPeta = async () => {
    async function getDakPeta() {
        let url = config.api_url + '/dak/data-peta';
        try {
            let res = await fetch(url, {
                method: 'POST',
                headers: config.fetchHeaders,
                // body: JSON.stringify({tahun:[2021]}),
            });
            let _res = await res.json();
            return _res.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    let resData;
    await getDakPeta().then(function (a) {
        resData = a;
    });
    return resData;
}

/* Belanja K/L */
export const apiGeodataKab = async () => {
    async function getGeodataKab() {
        let url = config.api_url + '/geodata/agg/kabupaten';
        try {
            let res = await fetch(url, {
                method: 'POST',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    let resData;
    await getGeodataKab().then(function (a) {
        resData = a;
    });
    return resData;
}
export const apiDataTahun = async () => {
    async function getData() {
        let url = config.api_url + '/data/tahun';
        try {
            let res = await fetch(url, {
                method: 'GET',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    let resData;
    await getData().then(function (a) {
        resData = a;
    });
    return resData;
}

export const apiBklKementerian = async () => {
    async function getData() {
        let url = config.api_url + '/data/kementerian';
        try {
            let res = await fetch(url, {
                method: 'GET',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    let resDatax;
    await getData().then(function (a) {
        resDatax = a;
    });
    return resDatax;
}

export const apiBklIntervensi = async () => {
    async function getData() {
        let url = config.api_url + '/data/intervensi/group';
        try {
            let res = await fetch(url, {
                method: 'GET',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    let resData;
    await getData().then(function (a) {
        resData = a;
    });
    return resData;
}

export const apiBklProgram = async () => {
    async function getData() {
        let url = config.api_url + '/data/program';
        try {
            let res = await fetch(url, {
                method: 'GET',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    let resData;
    await getData().then(function (a) {
        resData = a;
    });
    return resData;
}

export const apiMasterIntervensi = async () => {
    async function getData() {
        try {
            let res = await fetch(config.api_url + '/data/intervensi', {
                method: 'GET',
                headers: config.fetchHeaders
            });
            let _res = await res.json();
            return _res.data;
        } catch (e) {
            console.log(error);
            return false;
        }
    }
    let resData;
    await getData().then(function (a) {
        resData = a;
    });
    return resData;
}