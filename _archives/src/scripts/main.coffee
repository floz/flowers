stage = require "fz/core/stage"
stage.init()

lp = require "fz/core/loop"
lp.start()

# pool = require "flowers/pool"
# pool.fill()

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
    
    grid = new ( require "Grid" )()
    pixi.stage.addChild grid

    field = new ( require "flowers/Field" )()
    pixi.stage.addChild field

loader.load()
