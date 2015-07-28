style = window.getComputedStyle document.documentElement, ""
vendor = ( Array.prototype.slice.call( style ).join( "" ).match( /-(moz|webkit|ms)-/ ) || ( style.OLink == "" && [ "", "o" ] ) )[ 1 ]
vendor = "Moz" if vendor == "moz"

module.exports.vendor = vendor
module.exports.transform = vendor + "Transform"
module.exports.transformOrigin = vendor + "TransformOrigin"
