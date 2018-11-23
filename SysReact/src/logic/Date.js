export default () => {
    let date = new Date()
    let mm = date.getMinutes()
    let hh = date.getHours()
    let DD = date.getDate()
    let MM = date.getMonth() + 1 // january is 0
    let YYYY = date.getFullYear()

    if(DD < 10) DD = '0' + DD
    if(MM < 10) MM = '0' + MM;
    return `${YYYY}-${MM}-${DD}T${hh}:${mm}`
}