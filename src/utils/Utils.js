//get cookie by name
export function getCookie(name) {
    return (document.cookie.match('(^|;) *'+name+'=([^;]*)')||"")[2];
}