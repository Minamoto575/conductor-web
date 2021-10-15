export function baiduMap() {
    return new Promise(function(resolve, reject) {
        window.baiduMap = function() {
            resolve()
        }
        let script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `http://api.map.baidu.com/api?v=3.0&ak=oGeCbnlnaGEqkHl8npEWyD3tNbDEMEfM&callback=baiduMap`
        script.onerror = reject
        document.head.appendChild(script)
    })
}
