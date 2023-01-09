/**
 * Parse current url and break it into resource, id and verb.
 * @return {Object} Path params.
 */

export function levelFrame(key) {
    let a = window.location.pathname,
        b = a.split("/"),
        lev;
    if (b[1] === "dashboard-dev") {
        if (b[2] === "dev.html") {
            lev = "develop";
        } else {
            lev = '';
        }
    } else {
        if (b[1] === "dev.html") {
            lev = "develop";
        } else {
            lev = '';
        }
    }

    return lev;
}