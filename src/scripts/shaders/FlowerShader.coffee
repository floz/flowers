module.exports.uniforms = ->
    return {
    }

module.exports.vertex = [

    "precision lowp float;"
    
    "attribute vec2 aVertexPosition;"
    "attribute vec2 aTextureCoord;"
    "attribute vec4 aColor;"

    "uniform mat3 projectionMatrix;"

    "varying vec2 vTextureCoord;"
    "varying vec4 vColor;"

    "void main(void){"
    "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);"
    "   vTextureCoord = aTextureCoord;"
    "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);"
    '}'

].join ""

module.exports.fragment = [

    "precision lowp float;"

    "varying vec2 vTextureCoord;"
    "varying vec4 vColor;"

    "uniform sampler2D uSampler;"

    "void main(void){"
    "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;"
    "}"

].join ""
