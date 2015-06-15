stage = require "fz/core/stage"
stage.init()

lp = require "fz/core/loop"
lp.start()

pixi = require "pixi"
pixi.init()

loader = require "loader"
loader.init()

resize = ->
    pixi.resize stage.w, stage.h
stage.on "resize", resize
resize()

#

loader.on "complete", ->
    pixi.start()
    
    flowers = new ( require "Flowers" )()
    pixi.stage.addChild flowers
loader.load()
