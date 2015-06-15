class Nav extends Emitter

    constructor: ->
        @id = ""

    set: ( id ) ->
        return if @id == id
        @id = id
        @emit "change"

module.exports = new Nav

