export default () => {
    const date = new Date()
    const mm = date.getMinutes()
    const hh = date.getHours()
    const DD = date.getDate()
    const MM = date.getMonth() + 1 // january is 0
    const YYYY = date.getFullYear()

    if(DD < 10) DD = '0' + DD
    if(MM < 10) MM = '0' + MM;
    return `${YYYY}-${MM}-${DD}T${hh}:${mm}`
}