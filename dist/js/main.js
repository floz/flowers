(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/scripts/main.coffee":[function(require,module,exports){
var colors, engine, loader, lp, resize, stage;

stage = require("fz/core/stage");

stage.init();

lp = require("fz/core/loop");

lp.start();

colors = require("colors");

colors.setHUE(20);

engine = require("engine");

engine.init();

engine.setClearColor(colors.getFloor()[0].c);

loader = require("loader");

loader.init();

resize = function() {
  return engine.resize(stage.w, stage.h);
};

stage.on("resize", resize);

resize();

loader.on("complete", function() {
  var field;
  console.log("complete");
  engine.start();
  field = new (require("flowers/Field"))();
  return engine.scene.add(field);
});

loader.load();


},{"colors":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/colors.coffee","engine":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/engine.coffee","flowers/Field":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Field.coffee","fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee","loader":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/loader.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/assets.coffee":[function(require,module,exports){
var path;

path = "imgs/";

module.exports.data = {
  heart: path + "heart.png",
  petale_0: path + "petale_0.png",
  petale_1: path + "petale_1.png",
  floor_0: path + "floor_0.png",
  floor_1: path + "floor_1.png"
};

module.exports.textures = {};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/colors.coffee":[function(require,module,exports){
var Color, HUE, Set, uColors;

uColors = require("fz/utils/colors");

Color = uColors.Color;

Set = (function() {
  function Set(cLeafs, cHeart) {
    this.colorsLeafs = this._generateColors(cLeafs, 1, 10);
    this.colorsHeart = this._generateColors(cHeart, 1, 5);
  }

  Set.prototype._generateColors = function(c, offset, steps) {
    var cNew, colors, i, j, o, oAdd, oCurr, ref;
    o = offset * .5;
    oCurr = offset - o;
    oAdd = offset / steps;
    colors = [];
    for (i = j = 0, ref = steps; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      cNew = c.generateFromOffset(oCurr);
      colors.push(cNew);
      oCurr += oAdd;
    }
    return colors;
  };

  Set.prototype.getColorLeaf = function() {
    var idx;
    idx = Math.random() * this.colorsLeafs.length >> 0;
    return this.colorsLeafs[idx];
  };

  Set.prototype.getColorHeart = function() {
    var idx;
    idx = Math.random() * this.colorsHeart.length >> 0;
    return this.colorsHeart[idx];
  };

  return Set;

})();

HUE = 0;

module.exports.setHUE = function(value) {
  return HUE = value;
};

module.exports.getFlowers = function() {
  return uColors.generateHarmony(50, HUE, 90, 180, 60, 0, 0, 1, .5);
};

module.exports.getFloor = function() {
  return uColors.generateHarmony(50, HUE + 180, 90, 180, 30, 0, 0, 1, .5);
};


},{"fz/utils/colors":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/colors.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/engine.coffee":[function(require,module,exports){
var Engine, lp, stage,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

stage = require("fz/core/stage");

lp = require("fz/core/loop");

Engine = (function() {
  function Engine() {
    this._update = bind(this._update, this);
    this.renderer = null;
  }

  Engine.prototype.init = function() {
    var lightDir;
    this.scene = new THREE.Scene;
    this.scene.add(new THREE.AmbientLight(0x444444));
    lightDir = new THREE.DirectionalLight(0xffffff, .5);
    lightDir.position.z = 1000;
    this.scene.add(lightDir);
    this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -100, 10000);
    this.scene.add(this.camera);
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x64a543);
    this.renderer.autoClear = false;
    return document.body.appendChild(this.renderer.domElement);
  };

  Engine.prototype.resize = function(w, h) {
    this.renderer.setSize(w, h);
    this.camera.left = -stage.w * .5;
    this.camera.right = stage.w * .5;
    this.camera.top = stage.h * .5;
    this.camera.bottom = -stage.h * .5;
    return this.camera.updateProjectionMatrix();
  };

  Engine.prototype.setClearColor = function(value) {
    return this.renderer.setClearColor(value);
  };

  Engine.prototype.start = function() {
    return lp.add(this._update);
  };

  Engine.prototype._update = function() {
    this.renderer.clear();
    return this.renderer.render(this.scene, this.camera);
  };

  return Engine;

})();

module.exports = new Engine;


},{"fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Field.coffee":[function(require,module,exports){
var Field, Flowers, interactions, stage,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

stage = require("fz/core/stage");

Flowers = require("flowers/Flowers");

interactions = require("fz/core/interactions");

Field = (function(superClass) {
  extend(Field, superClass);

  function Field(_grid) {
    this._grid = _grid;
    this._onDown = bind(this._onDown, this);
    Field.__super__.constructor.apply(this, arguments);
    interactions.on(document.body, "down", this._onDown);
  }

  Field.prototype._onDown = function(e) {
    var flowers, x, y;
    x = e.x - stage.w * .5 >> 0;
    y = -e.y + stage.h * .5 >> 0;
    flowers = new Flowers;
    flowers.position.x = x;
    flowers.position.y = y;
    return this.add(flowers);
  };

  return Field;

})(THREE.Object3D);

module.exports = Field;


},{"flowers/Flowers":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flowers.coffee","fz/core/interactions":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/interactions.js","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flower.coffee":[function(require,module,exports){
var Flower, assets, cFlowers, dataShader, lp, uArrays, utils,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

lp = require("fz/core/loop");

uArrays = require("fz/utils/arrays");

cFlowers = require("flowers/consts");

assets = require("assets");

dataShader = require("shaders/FlowerShader");

utils = require("flowers/utils");

Flower = (function(superClass) {
  extend(Flower, superClass);

  function Flower(_life, colorsSet) {
    var colorDarken, colorDarkest, geom, idx, mat, s, sRatio;
    this._life = _life;
    Flower.__super__.constructor.apply(this, arguments);
    idx = colorsSet.length * Math.random() >> 0;
    this._color = colorsSet[idx];
    colorDarken = this._color.clone().setLuminance(.35);
    colorDarkest = this._color.clone().setLuminance(.15);
    this._dRand = Math.random() * 1;
    geom = new THREE.PlaneBufferGeometry(20, 20, 1);
    this._createLeafs(20, this._color.c);
    if (Math.random() > .25) {
      this._createLeafs(12, colorDarken.c);
    }
    mat = new THREE.MeshLambertMaterial({
      map: assets.textures.heart,
      transparent: true,
      color: colorDarkest.c
    });
    this._heart = new THREE.Mesh(geom, mat);
    this.add(this._heart);
    this._leafs = [];
    sRatio = this._life / cFlowers.life;
    s = (.7 + Math.random() * .3) * sRatio;
    if (s < .35) {
      s = .35;
    }
    s *= 1.65;
    this.scale.x = 0.000001;
    this.scale.y = 0.000001;
    TweenLite.to(this.scale, .6, {
      delay: this._dRand,
      x: s,
      y: s,
      ease: Quad.easeOut
    });
    this.rotation.z = Math.random() * Math.PI * 2;
  }

  Flower.prototype._createLeafs = function(size, c) {
    var a, aAdd, as, cntLeaf, d, dAdd, dAddMin, dFriction, dRand, geom, i, j, k, leaf, mat, n, rand, ref, ref1, results, tox, toy, types;
    types = ["a", "b", "c", "d"];
    geom = new THREE.PlaneBufferGeometry(size, size, 1);
    mat = new THREE.MeshLambertMaterial({
      map: assets.textures.petale_1,
      transparent: true,
      color: c
    });
    mat.depthTest = false;
    mat.side = THREE.DoubleSide;
    n = 4 + Math.random() * 5 >> 0;
    if (n === 4 && Math.random() > .3) {
      n += 1;
    }
    a = 0;
    aAdd = (Math.PI * 2) / n;
    as = [];
    for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      as.push(a);
      a += aAdd;
    }
    if (Math.random() < .5) {
      as.reverse();
    }
    as = uArrays.shift(as, as.length * Math.random() >> 0);
    d = 0;
    dAdd = .1;
    dAddMin = .04;
    dFriction = .87;
    results = [];
    for (i = k = 0, ref1 = n; 0 <= ref1 ? k < ref1 : k > ref1; i = 0 <= ref1 ? ++k : --k) {
      a = as[i];
      rand = Math.random();
      tox = size * 3 / (4.2 + rand) * Math.cos(a);
      toy = size * 3 / (4.2 + rand) * Math.sin(a);
      cntLeaf = new THREE.Object3D;
      cntLeaf.position.x = tox * .75;
      cntLeaf.position.y = toy * .75;
      cntLeaf.rotation.z = a;
      leaf = new THREE.Mesh(geom, mat);
      leaf.rotation.x = -Math.PI * .3 * Math.random();
      leaf.rotation.y = -Math.PI * .45;
      cntLeaf.add(leaf);
      dRand = Math.random() * (leaf.visible = false);
      TweenLite.to(cntLeaf.position, 1.2, {
        delay: .17 + d + this._dRand,
        x: tox,
        y: toy,
        ease: Cubic.easeOut
      });
      TweenLite.to(leaf.rotation, 1.2, {
        delay: .17 + d + this._dRand,
        x: 0,
        y: 0,
        ease: Quad.easeOut,
        onStart: function(obj) {
          return obj.visible = true;
        },
        onStartParams: [leaf]
      });
      this.add(cntLeaf);
      d += dAdd;
      dAdd *= dFriction;
      if (dAdd < dAddMin) {
        results.push(dAdd = dAddMin);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  return Flower;

})(THREE.Object3D);

module.exports = Flower;


},{"assets":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/assets.coffee","flowers/consts":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/consts.coffee","flowers/utils":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/utils.coffee","fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","fz/utils/arrays":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/arrays.coffee","shaders/FlowerShader":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/shaders/FlowerShader.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flowers.coffee":[function(require,module,exports){
var Drunk, Flower, Flowers, Linear, Opts, PathDrawer, Sinus, Turning, cFlowers, colors, lp, pool, stage, timeout,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

stage = require("fz/core/stage");

lp = require("fz/core/loop");

pool = require("flowers/pool");

Flower = require("flowers/Flower");

cFlowers = require("flowers/consts");

colors = require("colors");

PathDrawer = require("paths/PathDrawer");

Linear = require("paths/Linear");

Turning = require("paths/Turning");

Drunk = require("paths/Drunk");

Sinus = require("paths/Sinus");

Opts = require("paths/Opts");

timeout = require("fz/utils/timeout");

Flowers = (function(superClass) {
  extend(Flowers, superClass);

  function Flowers() {
    this._update = bind(this._update, this);
    var i, j, n, path, rad, ref;
    Flowers.__super__.constructor.apply(this, arguments);
    this._pathDrawer = new PathDrawer;
    this._origin = new Flower(cFlowers.life, colors.getFlowers());
    this.add(this._origin);
    this._flowers = [this._origin];
    this._opts = [];
    this._isAlive = true;
    rad = 0;
    n = 25;
    this._paths = [];
    for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      path = new Sinus(rad);
      this._paths.push(path);
      this._opts.push({
        speed: (Math.random() * 50 + 20) * 1.2 >> 0,
        life: Math.random() * cFlowers.life * .6 + cFlowers.life * .4 >> 0
      });
      this._pathDrawer.add(path);
      rad += (Math.PI * 2) / n;
    }
    timeout(this._update, 80);
  }

  Flowers.prototype._generateColors = function() {
    var idx;
    idx = Math.random() * colors.length >> 0;
    return colors[idx];
  };

  Flowers.prototype._update = function() {
    var i, isAlive, j, len, opt, path, ref;
    if (!this._isAlive) {
      return;
    }
    isAlive = false;
    ref = this._paths;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      path = ref[i];
      opt = this._opts[i];
      if (!opt.life) {
        continue;
      }
      if (path.modifier) {
        opt.speed = path.modifier.speed(opt.speed);
        if (opt.speed < 10) {
          opt.speed = 10;
        }
      }
      path.next(opt.speed);
      this._addFlower(path.current, opt.life);
      opt.life -= 1;
      if (opt.life > 0) {
        isAlive = true;
      }
    }
    this._pathDrawer.update();
    this._isAlive = isAlive;
    return timeout(this._update, 50);
  };

  Flowers.prototype._addFlower = function(pos, life) {
    var flower;
    flower = new Flower(life, colors.getFlowers());
    flower.position.x = pos.x;
    flower.position.y = pos.y;
    this.add(flower);
    return this._flowers.push(flower);
  };

  return Flowers;

})(THREE.Object3D);

module.exports = Flowers;


},{"colors":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/colors.coffee","flowers/Flower":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flower.coffee","flowers/consts":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/consts.coffee","flowers/pool":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/pool.coffee","fz/core/loop":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee","fz/core/stage":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee","fz/utils/timeout":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/timeout.coffee","paths/Drunk":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Drunk.coffee","paths/Linear":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Linear.coffee","paths/Opts":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Opts.coffee","paths/PathDrawer":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/PathDrawer.coffee","paths/Sinus":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Sinus.coffee","paths/Turning":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Turning.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/consts.coffee":[function(require,module,exports){
module.exports = {
  life: 5
};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/pool.coffee":[function(require,module,exports){
var Flower, Pool;

Flower = require("flowers/Flower");

Pool = (function() {
  function Pool() {
    this._available = [];
  }

  Pool.prototype.fill = function(amount) {
    var i, j, ref;
    if (amount == null) {
      amount = 500;
    }
    for (i = j = 0, ref = amount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      this._available.push(new Flower);
    }
  };

  Pool.prototype.get = function() {
    return this._available.pop();
  };

  Pool.prototype["return"] = function(item) {
    return this._available.push(item);
  };

  return Pool;

})();

module.exports = new Pool;


},{"flowers/Flower":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/Flower.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/flowers/utils.coffee":[function(require,module,exports){
module.exports.initModifs = function(sprite) {
  sprite.modifs = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    x3: 0,
    y3: 0
  };
};

module.exports.eztween = {
  "in": function(sprite, type, delay) {
    var s;
    if (delay == null) {
      delay = 0;
    }
    s = sprite.width;
    if (type === "a") {
      sprite.modifs.x1 = -s;
      sprite.modifs.y1 = -s * .5;
      sprite.modifs.x2 = -s;
      sprite.modifs.y2 = s * .5;
    } else if (type === "b") {
      sprite.modifs.x2 = s * .5;
      sprite.modifs.y2 = -s;
      sprite.modifs.x3 = -s * .5;
      sprite.modifs.y3 = -s;
    } else if (type === "c") {
      sprite.modifs.x0 = s;
      sprite.modifs.y0 = -s * .5;
      sprite.modifs.x3 = s;
      sprite.modifs.y3 = s * .5;
    } else {
      sprite.modifs.x0 = -s * .5;
      sprite.modifs.y0 = s;
      sprite.modifs.x1 = s * .5;
      sprite.modifs.y1 = s;
    }
    TweenLite.to(sprite.modifs, .4, {
      delay: delay,
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      x3: 0,
      y3: 0,
      ease: Cubic.easeInOut
    });
  }
};

module.exports.tween = {
  "in": function(sprite, delay) {
    var s;
    if (delay == null) {
      delay = 0;
    }
    s = sprite.width;
    sprite.modifs.x0 = -s * .5;
    sprite.modifs.x1 = s * .5;
    sprite.modifs.y0 = sprite.modifs.y1 = s;
    TweenLite.to(sprite.modifs, .4, {
      delay: delay,
      x0: 0,
      y0: 0,
      x1: 0,
      y1: 0,
      ease: Cubic.easeInOut
    });
  }
};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/interactions.js":[function(require,module,exports){
var downs = {};
var moves = {};
var ups = {};
var clicks = {};
var overs = {};
var outs = {};

var interactions = [ downs, moves, ups, clicks ];

function getEvent( action ) {
  var evt = "";
  if( isMobile.any ) {

    if (window.navigator.msPointerEnabled) {
      switch( action ) {
        case "down": evt = "MSPointerDown"; break;
        case "move": evt = "MSPointerMove"; break;
        case "up": evt = "MSPointerUp"; break;
        case "click": evt = "MSPointerUp"; break;
      }

      //console.log("evt", evt, action);

    } else {
      switch( action ) {
        case "down": evt = "touchstart"; break;
        case "move": evt = "touchmove"; break;
        case "up": evt = "touchend"; break;
        case "click": evt = "touchstart"; break;
      }
    }


  } else {
    switch( action ) {
      case "down": evt = "mousedown"; break;
      case "move": evt = "mousemove"; break;
      case "up": evt = "mouseup"; break;
      case "click": evt = "click"; break;
      case "over": evt = bowser.safari ? "mouseover" : "mouseenter"; break;
      case "out": evt = bowser.safari ? "mouseout" : "mouseleave"; break;
    }
  }
  return evt;
}

function getObj( action ) {
  switch( action ) {
    case "down": return downs;
    case "move": return moves;
    case "up": return ups;
    case "click": return clicks;
    case "over": return overs;
    case "out": return outs;
  }
}

function find( cb, datas ) {
  var data = null;
  for( var i = 0, n = datas.length; i < n; i++ ) {
    data = datas[ i ];
    if( data.cb == cb ) {
      return { data: data, idx: i };
    }
  }
  return null;
}

module.exports.on = function( elt, action, cb ) {
  var evt = getEvent( action );
  if( evt == "" ){
    return;
  }

  var obj = getObj( action );
  if( !obj[ elt ] ) {
    obj[ elt ] = [];
  }

  var isOver = false;

  function proxy( e ) {
    if( isMobile.any ) {

      if (window.navigator.msPointerEnabled) {
          // mspointerevents
          e.x = e.clientX;
          e.y = e.clientY;

      } else {
        var touch = e.touches[ 0 ];
        if( touch ) {
          e.x = touch.clientX;
          e.y = touch.clientY;
        }
      }

    } else {
      e.x = e.clientX;
      e.y = e.clientY;
    }

    cb.call( this, e );
  }

  obj[ elt ].push( { cb: cb, proxy: proxy } );
  elt.addEventListener( evt, proxy, false );
}

module.exports.off = function( elt, action, cb ) {
  var evt = getEvent( action );
  if( evt == "" ) {
    return;
  }

  var obj = getObj( action );
  if( !obj[ elt ] ) {
    return;
  }

  var datas = obj[ elt ];
  if( cb ) {
    var result = find( cb, datas );
    if( !result ) {
      return;
    }
    elt.removeEventListener( evt, result.data.proxy, false );
    obj[ elt ].splice( datas.idx, 1 );
  } else {
    var data = null;
    for( var i = 0, n = datas.length; i < n; i++ ) {
      data = datas[ i ];
      elt.removeEventListener( evt, data.proxy, false );
    }
    obj[ elt ] = null;
    delete obj[ elt ];
  }
}

module.exports.has = function( elt, action, cb ) {
  var evt = getEvent( action );
  if( evt == "" ) {
    return;
  }

  var obj = getObj( action );
  if( !obj[ elt ] ) {
    return;
  }

  var datas = obj[ elt ];
  if( cb ) {
    return true;
  }
  return false;
}

module.exports.unbind = function( elt ) {
  for( var i = 0, n = interactions.length; i < n; i++ ) {
    interactions[ i ][ elt ] = null;
    delete interactions[ i ][ elt ];
  }
}

},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/loop.coffee":[function(require,module,exports){
var idx, listeners, n, update;

idx = -1;

listeners = [];

n = 0;

update = function() {
  var i;
  i = n;
  while (--i >= 0) {
    listeners[i].apply(this, null);
  }
  return idx = requestAnimationFrame(update);
};

module.exports.start = function() {
  return update();
};

module.exports.stop = function() {
  return cancelAnimationFrame(idx);
};

module.exports.add = function(listener) {
  idx = listeners.indexOf(listener);
  if (idx >= 0) {
    return;
  }
  listeners.push(listener);
  return n++;
};

module.exports.remove = function(listener) {
  idx = listeners.indexOf(listener);
  if (idx < 0) {
    return;
  }
  listeners.splice(idx, 1);
  return n--;
};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/core/stage.coffee":[function(require,module,exports){
var Stage, timeout,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

timeout = require("fz/utils/timeout");

Stage = (function(superClass) {
  extend(Stage, superClass);

  function Stage() {
    this._onResize = bind(this._onResize, this);
    this._update = bind(this._update, this);
    this.w = 0;
    this.h = 0;
  }

  Stage.prototype.init = function() {
    window.addEventListener("resize", this._onResize, false);
    window.addEventListener("orientationchange", this._onResize, false);
    return this._onResize();
  };

  Stage.prototype._update = function() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    return this.emit("resize");
  };

  Stage.prototype._onResize = function() {
    return timeout(this._update, 10);
  };

  Stage.prototype.resize = function(withDelay) {
    if (withDelay == null) {
      withDelay = false;
    }
    if (withDelay) {
      this._onResize();
      return;
    }
    return this._update();
  };

  return Stage;

})(Emitter);

module.exports = new Stage;


},{"fz/utils/timeout":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/timeout.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/arrays.coffee":[function(require,module,exports){
module.exports.shuffle = function(a) {
  var i, j, t;
  i = a.length;
  while (--i > 0) {
    j = ~~(Math.random() * (i + 1));
    t = a[j];
    a[j] = a[i];
    a[i] = t;
  }
  return a;
};

module.exports.shift = function(a, from) {
  var aFirst;
  aFirst = a.splice(from, a.length);
  a = aFirst.concat(a.splice(0, a.length));
  return a;
};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/colors.coffee":[function(require,module,exports){
var Color, HSLtoRGB, RGBtoHSL, combineRGB, getRGB;

Color = (function() {
  function Color(c1) {
    this.c = c1;
    this.rgb = getRGB(this.c);
    this.hsl = RGBtoHSL(this.rgb.r, this.rgb.g, this.rgb.b);
  }

  Color.prototype.setLuminance = function(value) {
    this.hsl.l = value;
    this.rgb = HSLtoRGB(this.hsl.h, this.hsl.s, this.hsl.l);
    this.c = combineRGB(this.rgb.r, this.rgb.g, this.rgb.b);
    return this;
  };

  Color.prototype.clone = function() {
    return new Color(this.c);
  };

  return Color;

})();

module.exports.Color = Color;

getRGB = module.exports.getRGB = function(c) {
  return {
    r: (c >> 16) & 0xff,
    g: (c >> 8) & 0xff,
    b: c & 0xff
  };
};

combineRGB = module.exports.combineRGB = function(r, g, b) {
  return (r << 16) | (g << 8) | b;
};

RGBtoHSL = module.exports.RGBtoHSL = function(r, g, b) {
  var d, h, l, max, min, s;
  r /= 255;
  g /= 255;
  b /= 255;
  max = Math.max(r, g, b);
  min = Math.min(r, g, b);
  l = (max + min) * .5;
  if (max === min) {
    h = s = 0;
  } else {
    d = max - min;
    s = l > .5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) {
      h = (g - b) / d + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / d + 2;
    } else {
      h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return {
    h: h,
    s: s,
    l: l
  };
};

HSLtoRGB = module.exports.HSLtoRGB = function(h, s, l) {
  var b, g, hue2rgb, p, q, r;
  if (s === 0) {
    return r = g = b = l;
  } else {
    hue2rgb = function(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < .5) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };
    q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
    return {
      r: r * 255 >> 0,
      g: g * 255 >> 0,
      b: b * 255 >> 0
    };
  }
};

module.exports.generateHarmony = function(count, aRef, aOffset0, aOffset1, aRange0, aRange1, aRange2, saturation, luminance) {
  var aRand, colors, i, j, ref, rgb;
  colors = [];
  for (i = j = 0, ref = count; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
    aRand = Math.random() * (aRange0 + aRange1 + aRange2);
    if (aRand > aRange0) {
      if (aRand < aRange0 + aRange1) {
        aRand += aOffset0;
      } else {
        aRand += aOffset1;
      }
    }
    rgb = HSLtoRGB(((aRef + aRand) / 360) % 1, saturation, luminance);
    colors.push(new Color(combineRGB(rgb.r, rgb.g, rgb.b)));
  }
  return colors;
};


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/now.coffee":[function(require,module,exports){
module.exports = (function() {
  var perf;
  perf = window && window.performance;
  if (perf && perf.now) {
    return perf.now.bind(perf);
  } else {
    return function() {
      return new Date().getTime();
    };
  }
})();


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/timeout.coffee":[function(require,module,exports){
var now;

now = require("fz/utils/now");

module.exports = function(fn, delay) {
  var data, lp, start;
  start = now();
  lp = function() {
    if ((now() - start) >= delay) {
      return fn.call();
    } else {
      return data.id = requestAnimationFrame(lp);
    }
  };
  data = {};
  data.id = requestAnimationFrame(lp);
  return data;
};

module.exports.clear = function(data) {
  return cancelAnimationFrame(data.id);
};


},{"fz/utils/now":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/fz/utils/now.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/loader.coffee":[function(require,module,exports){
var Loader, assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

assets = require("assets");

Loader = (function(superClass) {
  extend(Loader, superClass);

  function Loader() {
    this._onComplete = bind(this._onComplete, this);
    Loader.__super__.constructor.apply(this, arguments);
    this._idxLoaded = 0;
    this._idxTotal = 0;
  }

  Loader.prototype.init = function() {
    var id;
    for (id in assets.data) {
      this._idxTotal++;
    }
  };

  Loader.prototype._onComplete = function() {
    this._idxLoaded++;
    if (this._idxLoaded === this._idxTotal) {
      return this.emit("complete");
    }
  };

  Loader.prototype.load = function() {
    var id, tex, url;
    for (id in assets.data) {
      url = assets.data[id];
      tex = THREE.ImageUtils.loadTexture(url, void 0, this._onComplete);
      tex.minFilter = THREE.NearestFilter;
      assets.textures[id] = tex;
    }
  };

  return Loader;

})(Emitter);

module.exports = new Loader;


},{"assets":"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/assets.coffee"}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Drunk.coffee":[function(require,module,exports){
var Drunk;

Drunk = (function() {
  function Drunk(_dir) {
    this._dir = _dir;
    this.current = {
      x: 0,
      y: 0
    };
    this._a = 0;
  }

  Drunk.prototype.next = function(speed) {
    speed += Math.random() * 10 - 5;
    this._a += 1;
    this.current.x += speed * Math.cos(this._dir + this._a);
    return this.current.y += speed * Math.sin(this._dir + this._a);
  };

  return Drunk;

})();

module.exports = Drunk;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Linear.coffee":[function(require,module,exports){
var Linear;

Linear = (function() {
  function Linear(_dir) {
    this._dir = _dir;
    this.current = {
      x: 0,
      y: 0
    };
  }

  Linear.prototype.next = function(speed) {
    speed += Math.random() * 10 - 5;
    this.current.x += speed * Math.cos(this._dir);
    return this.current.y += speed * Math.sin(this._dir);
  };

  return Linear;

})();

module.exports = Linear;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Opts.coffee":[function(require,module,exports){
var Opts;

Opts = (function() {
  function Opts() {
    this.speed = 50;
    this.life = 10;
  }

  return Opts;

})();

module.exports = Opts;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/PathDrawer.coffee":[function(require,module,exports){
var PathDrawer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PathDrawer = (function(superClass) {
  extend(PathDrawer, superClass);

  function PathDrawer(color) {
    if (color == null) {
      color = 0xff00ff;
    }
    PathDrawer.__super__.constructor.apply(this, arguments);
    this._paths = [];
    this._lasts = [];
    this._g = new PIXI.Graphics;
    this._g.lineColor = 0;
    this._g.lineAlpha = 1;
    this._g.lineWidth = 1;
    this.addChild(this._g);
  }

  PathDrawer.prototype.add = function(path) {
    this._paths.push(path);
    return this._lasts.push({
      x: 0,
      y: 0
    });
  };

  PathDrawer.prototype.update = function() {
    var current, i, j, last, len, path, ref;
    ref = this._paths;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      path = ref[i];
      last = this._lasts[i];
      current = path.current;
      this._g.moveTo(last.x, last.y);
      this._g.lineTo(current.x, current.y);
      last.x = current.x;
      last.y = current.y;
    }
  };

  return PathDrawer;

})(PIXI.Container);

module.exports = PathDrawer;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Sinus.coffee":[function(require,module,exports){
var Modifier, Sinus;

Modifier = (function() {
  function Modifier() {}

  Modifier.prototype.speed = function(value) {
    return value * .9;
  };

  return Modifier;

})();

Sinus = (function() {
  function Sinus(_dir) {
    this._dir = _dir;
    this.current = {
      x: 0,
      y: 0
    };
    this.modifier = new Modifier;
    this._a = 0;
    this._aAdd = Math.PI * (.4 * Math.random()) + .1;
    this._aPerp = this._dir + Math.PI * .5;
    this._rad = 0;
    this._radMax = 15 + Math.random() * 25;
  }

  Sinus.prototype.next = function(speed) {
    speed += Math.random() * 10 - 5;
    this.current.x += speed * Math.cos(this._dir) + this._rad * Math.cos(this._aPerp);
    this.current.y += speed * Math.sin(this._dir) + this._rad * Math.sin(this._aPerp);
    this._a += this._aAdd;
    return this._rad = this._radMax * Math.cos(this._a);
  };

  return Sinus;

})();

module.exports = Sinus;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/paths/Turning.coffee":[function(require,module,exports){
var Turning;

Turning = (function() {
  function Turning(_dir) {
    this._dir = _dir;
    this.current = {
      x: 0,
      y: 0
    };
    this._a = 0;
    this._aAdd = (Math.PI * 2) * .1;
  }

  Turning.prototype.next = function(speed) {
    speed += Math.random() * 10 - 5;
    this.current.x += speed * Math.cos(this._dir + this._a);
    this.current.y += speed * Math.sin(this._dir + this._a);
    this._a += this._aAdd;
    return console.log(this._a);
  };

  return Turning;

})();

module.exports = Turning;


},{}],"/Users/floz/Documents/projects/perso/digital/flowers/src/scripts/shaders/FlowerShader.coffee":[function(require,module,exports){
module.exports.uniforms = function() {
  return {};
};

module.exports.vertex = ["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", '}'].join("");

module.exports.fragment = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;", "}"].join("");


},{}]},{},["./src/scripts/main.coffee"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL21haW4uY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9hc3NldHMuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9jb2xvcnMuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9lbmdpbmUuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mbG93ZXJzL0ZpZWxkLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvZmxvd2Vycy9GbG93ZXIuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mbG93ZXJzL0Zsb3dlcnMuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mbG93ZXJzL2NvbnN0cy5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL2Zsb3dlcnMvcG9vbC5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL2Zsb3dlcnMvdXRpbHMuY29mZmVlIiwic3JjL3NjcmlwdHMvZnovY29yZS9pbnRlcmFjdGlvbnMuanMiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL2Z6L2NvcmUvbG9vcC5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL2Z6L2NvcmUvc3RhZ2UuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mei91dGlscy9hcnJheXMuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mei91dGlscy9jb2xvcnMuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mei91dGlscy9ub3cuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9mei91dGlscy90aW1lb3V0LmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvbG9hZGVyLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvcGF0aHMvRHJ1bmsuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9wYXRocy9MaW5lYXIuY29mZmVlIiwiL1VzZXJzL2Zsb3ovRG9jdW1lbnRzL3Byb2plY3RzL3BlcnNvL2RpZ2l0YWwvZmxvd2Vycy9zcmMvc2NyaXB0cy9wYXRocy9PcHRzLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvcGF0aHMvUGF0aERyYXdlci5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL3BhdGhzL1NpbnVzLmNvZmZlZSIsIi9Vc2Vycy9mbG96L0RvY3VtZW50cy9wcm9qZWN0cy9wZXJzby9kaWdpdGFsL2Zsb3dlcnMvc3JjL3NjcmlwdHMvcGF0aHMvVHVybmluZy5jb2ZmZWUiLCIvVXNlcnMvZmxvei9Eb2N1bWVudHMvcHJvamVjdHMvcGVyc28vZGlnaXRhbC9mbG93ZXJzL3NyYy9zY3JpcHRzL3NoYWRlcnMvRmxvd2VyU2hhZGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxlQUFSOztBQUNSLEtBQUssQ0FBQyxJQUFOLENBQUE7O0FBRUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxjQUFSOztBQUNMLEVBQUUsQ0FBQyxLQUFILENBQUE7O0FBRUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSOztBQUNULE1BQU0sQ0FBQyxNQUFQLENBQWMsRUFBZDs7QUFFQSxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVI7O0FBQ1QsTUFBTSxDQUFDLElBQVAsQ0FBQTs7QUFDQSxNQUFNLENBQUMsYUFBUCxDQUFxQixNQUFNLENBQUMsUUFBUCxDQUFBLENBQW1CLENBQUEsQ0FBQSxDQUFHLENBQUMsQ0FBNUM7O0FBRUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSOztBQUNULE1BQU0sQ0FBQyxJQUFQLENBQUE7O0FBRUEsTUFBQSxHQUFTLFNBQUE7U0FDTCxNQUFNLENBQUMsTUFBUCxDQUFjLEtBQUssQ0FBQyxDQUFwQixFQUF1QixLQUFLLENBQUMsQ0FB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SUFFbkIsU0FBUyxDQUFDLEVBQVYsQ0FBYSxNQUFNLENBQUMsTUFBcEIsRUFBNEIsRUFBNUIsRUFDSTtNQUFBLEtBQUEsRUFBTyxLQUFQO01BQ0EsRUFBQSxFQUFJLENBREo7TUFFQSxFQUFBLEVBQUksQ0FGSjtNQUdBLEVBQUEsRUFBSSxDQUhKO01BSUEsRUFBQSxFQUFJLENBSko7TUFLQSxJQUFBLEVBQU0sS0FBSyxDQUFDLFNBTFo7S0FESjtFQVJBLENBQUo7Ozs7O0FDckRKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Tm9CLEVBUXBCLGdDQVJvQixFQVVwQiw2QkFWb0IsRUFXcEIsc0JBWG9CLEVBYXBCLGtCQWJvQixFQWNwQixzRkFkb0IsRUFlcEIsbUNBZm9CLEVBZ0JwQixvREFoQm9CLEVBaUJwQixHQWpCb0IsQ0FtQnZCLENBQUMsSUFuQnNCLENBbUJqQixFQW5CaUI7O0FBcUJ4QixNQUFNLENBQUMsT0FBTyxDQUFDLFFBQWYsR0FBMEIsQ0FFdEIsdUJBRnNCLEVBSXRCLDZCQUpzQixFQUt0QixzQkFMc0IsRUFPdEIsNkJBUHNCLEVBU3RCLGtCQVRzQixFQVV0QixnRUFWc0IsRUFXdEIsR0FYc0IsQ0FhekIsQ0FBQyxJQWJ3QixDQWFuQixFQWJtQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJzdGFnZSA9IHJlcXVpcmUgXCJmei9jb3JlL3N0YWdlXCJcbnN0YWdlLmluaXQoKVxuXG5scCA9IHJlcXVpcmUgXCJmei9jb3JlL2xvb3BcIlxubHAuc3RhcnQoKVxuXG5jb2xvcnMgPSByZXF1aXJlIFwiY29sb3JzXCJcbmNvbG9ycy5zZXRIVUUgMjBcblxuZW5naW5lID0gcmVxdWlyZSBcImVuZ2luZVwiXG5lbmdpbmUuaW5pdCgpXG5lbmdpbmUuc2V0Q2xlYXJDb2xvciBjb2xvcnMuZ2V0Rmxvb3IoKVsgMCBdLmNcblxubG9hZGVyID0gcmVxdWlyZSBcImxvYWRlclwiXG5sb2FkZXIuaW5pdCgpXG5cbnJlc2l6ZSA9IC0+XG4gICAgZW5naW5lLnJlc2l6ZSBzdGFnZS53LCBzdGFnZS5oXG5zdGFnZS5vbiBcInJlc2l6ZVwiLCByZXNpemVcbnJlc2l6ZSgpXG5cbiNcblxubG9hZGVyLm9uIFwiY29tcGxldGVcIiwgLT5cbiAgICBjb25zb2xlLmxvZyBcImNvbXBsZXRlXCJcbiAgICBlbmdpbmUuc3RhcnQoKVxuICAgICMgcGl4aS5zdGFydCgpXG4gICAgXG4gICAgIyBncmlkID0gbmV3ICggcmVxdWlyZSBcIkdyaWRcIiApKClcbiAgICAjIHBpeGkuc3RhZ2UuYWRkQ2hpbGQgZ3JpZFxuXG4gICAgIyBmbG9vciA9IG5ldyAoIHJlcXVpcmUgXCJmbG9vci9GbG9vclwiICkoKVxuICAgICMgZW5naW5lLnNjZW5lLmFkZCBmbG9vclxuXG4gICAgZmllbGQgPSBuZXcgKCByZXF1aXJlIFwiZmxvd2Vycy9GaWVsZFwiICkoKVxuICAgIGVuZ2luZS5zY2VuZS5hZGQgZmllbGRcblxubG9hZGVyLmxvYWQoKVxuIiwicGF0aCA9IFwiaW1ncy9cIlxuXG5tb2R1bGUuZXhwb3J0cy5kYXRhID0ge1xuICAgIGhlYXJ0OiBwYXRoICsgXCJoZWFydC5wbmdcIlxuICAgIHBldGFsZV8wOiBwYXRoICsgXCJwZXRhbGVfMC5wbmdcIlxuICAgIHBldGFsZV8xOiBwYXRoICsgXCJwZXRhbGVfMS5wbmdcIlxuICAgIGZsb29yXzA6IHBhdGggKyBcImZsb29yXzAucG5nXCJcbiAgICBmbG9vcl8xOiBwYXRoICsgXCJmbG9vcl8xLnBuZ1wiXG59XG5cbm1vZHVsZS5leHBvcnRzLnRleHR1cmVzID0ge31cbiIsInVDb2xvcnMgPSByZXF1aXJlIFwiZnovdXRpbHMvY29sb3JzXCJcbkNvbG9yID0gdUNvbG9ycy5Db2xvclxuXG5jbGFzcyBTZXRcblxuICAgIGNvbnN0cnVjdG9yOiAoIGNMZWFmcywgY0hlYXJ0ICkgLT5cbiAgICAgICAgQGNvbG9yc0xlYWZzID0gQF9nZW5lcmF0ZUNvbG9ycyBjTGVhZnMsIDEsIDEwXG4gICAgICAgIEBjb2xvcnNIZWFydCA9IEBfZ2VuZXJhdGVDb2xvcnMgY0hlYXJ0LCAxLCA1XG5cbiAgICBfZ2VuZXJhdGVDb2xvcnM6ICggYywgb2Zmc2V0LCBzdGVwcyApIC0+XG4gICAgICAgIG8gPSBvZmZzZXQgKiAuNVxuXG4gICAgICAgIG9DdXJyID0gb2Zmc2V0IC0gb1xuICAgICAgICBvQWRkID0gb2Zmc2V0IC8gc3RlcHNcblxuICAgICAgICBjb2xvcnMgPSBbXVxuICAgICAgICBmb3IgaSBpbiBbMC4uLnN0ZXBzXVxuICAgICAgICAgICAgY05ldyA9IGMuZ2VuZXJhdGVGcm9tT2Zmc2V0IG9DdXJyXG4gICAgICAgICAgICBjb2xvcnMucHVzaCBjTmV3XG4gICAgICAgICAgICBvQ3VyciArPSBvQWRkXG5cbiAgICAgICAgY29sb3JzXG5cbiAgICBnZXRDb2xvckxlYWY6IC0+XG4gICAgICAgIGlkeCA9IE1hdGgucmFuZG9tKCkgKiBAY29sb3JzTGVhZnMubGVuZ3RoID4+IDBcbiAgICAgICAgQGNvbG9yc0xlYWZzWyBpZHggXVxuXG4gICAgZ2V0Q29sb3JIZWFydDogLT5cbiAgICAgICAgaWR4ID0gTWF0aC5yYW5kb20oKSAqIEBjb2xvcnNIZWFydC5sZW5ndGggPj4gMFxuICAgICAgICBAY29sb3JzSGVhcnRbIGlkeCBdXG5cbiMgYmx1ZTEgPSBuZXcgU2V0IG5ldyBDb2xvciggMHgxZTQ1YjkgKSwgbmV3IENvbG9yKCAweGJmYzdkZiApXG4jIGJsdWUyID0gbmV3IFNldCBuZXcgQ29sb3IoIDB4MzUyOGYwICksIG5ldyBDb2xvciggMHhlM2I2MjIgKVxuIyByZWQxID0gbmV3IFNldCBuZXcgQ29sb3IoIDB4ZTQzODFhICksIG5ldyBDb2xvciggMHhjYzc0MDIgKVxuIyByZWQyID0gbmV3IFNldCBuZXcgQ29sb3IoIDB4ZTQzODFhICksIG5ldyBDb2xvciggMHhmZmY3MDIgKVxuIyB5ZWxsb3cxID0gbmV3IFNldCBuZXcgQ29sb3IoIDB4ZmZmNzAyICksIG5ldyBDb2xvciggMHhmZmY3MDIgKVxuIyB5ZWxsb3cyID0gbmV3IFNldCBuZXcgQ29sb3IoIDB4ZmZhNzAzICksIG5ldyBDb2xvciggMHhmZmUyMDMgKVxuIyBwdXJwbGUxID0gbmV3IFNldCBuZXcgQ29sb3IoIDB4OTAwNWM3ICksIG5ldyBDb2xvciggMHhlYWM0MDggKVxuIyBwdXJwbGUyID0gbmV3IFNldCBuZXcgQ29sb3IoIDB4NzIwOWViICksIG5ldyBDb2xvciggMHhmZmUyMDMgKVxuXG4jIG1vZHVsZS5leHBvcnRzID0gW1xuIyAgICAgWyBibHVlMSBdLFxuIyAgICAgWyBibHVlMiBdLFxuIyAgICAgWyBibHVlMSwgYmx1ZTIgXSxcbiMgICAgIFsgcmVkMSBdLFxuIyAgICAgWyByZWQyIF0sXG4jICAgICBbIHJlZDEsIHJlZDIgXSxcbiMgICAgIFsgcHVycGxlMSBdLFxuIyAgICAgWyBwdXJwbGUyIF0sXG4jICAgICBbIHB1cnBsZTEsIHB1cnBsZTIgXSxcbiMgICAgIFsgcHVycGxlMSwgYmx1ZTEgXSxcbiMgICAgIFsgeWVsbG93MSwgeWVsbG93MiBdLFxuIyAgICAgWyB5ZWxsb3cxIF0sXG4jICAgICBbIHllbGxvdzIgXSxcbiMgICAgIFsgeWVsbG93MiwgYmx1ZTIgXSxcbiMgXVxuXG4jIGNvbXBsZW1lbnRhcnlcbiMgbW9kdWxlLmV4cG9ydHMgPSAtPiB1Q29sb3JzLmdlbmVyYXRlSGFybW9ueSA1MCwgMCwgMTgwLCAwLCA0MCwgNTAsIDAsIC43NSwgLjVcblxuSFVFID0gMFxuXG5tb2R1bGUuZXhwb3J0cy5zZXRIVUUgPSAoIHZhbHVlICkgLT5cbiAgICBIVUUgPSB2YWx1ZVxuXG4jIGFuYWxvZ291c1xubW9kdWxlLmV4cG9ydHMuZ2V0Rmxvd2VycyA9IC0+IHVDb2xvcnMuZ2VuZXJhdGVIYXJtb255IDUwLCBIVUUsIDkwLCAxODAsIDYwLCAwLCAwLCAxLCAuNVxubW9kdWxlLmV4cG9ydHMuZ2V0Rmxvb3IgPSAtPiB1Q29sb3JzLmdlbmVyYXRlSGFybW9ueSA1MCwgSFVFICsgMTgwLCA5MCwgMTgwLCAzMCwgMCwgMCwgMSwgLjVcblxuIyB0cmlhZFxuIyBtb2R1bGUuZXhwb3J0cyA9IC0+IHVDb2xvcnMuZ2VuZXJhdGVIYXJtb255IDUwLCAwLCAxMjAsIDI0MCwgMTAsIDEwLCAxMCwgMSwgLjVcbiIsInN0YWdlID0gcmVxdWlyZSBcImZ6L2NvcmUvc3RhZ2VcIlxubHAgPSByZXF1aXJlIFwiZnovY29yZS9sb29wXCJcblxuY2xhc3MgRW5naW5lXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHJlbmRlcmVyID0gbnVsbFxuXG4gICAgaW5pdDogLT5cbiAgICAgICAgQHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lXG5cbiAgICAgICAgQHNjZW5lLmFkZCBuZXcgVEhSRUUuQW1iaWVudExpZ2h0IDB4NDQ0NDQ0XG5cbiAgICAgICAgbGlnaHREaXIgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCAweGZmZmZmZiwgLjVcbiAgICAgICAgbGlnaHREaXIucG9zaXRpb24ueiA9IDEwMDBcbiAgICAgICAgQHNjZW5lLmFkZCBsaWdodERpclxuXG4gICAgICAgIEBjYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhIDAsIDAsIDAsIDAsIC0xMDAsIDEwMDAwXG4gICAgICAgICMgQGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSA1MCwgMCwgMSwgNTAwMFxuICAgICAgICBAc2NlbmUuYWRkIEBjYW1lcmFcbiAgICAgICAgIyBAY2FtZXJhLnBvc2l0aW9uLnogPSA1MDBcblxuICAgICAgICBAcmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlciB7IGFudGlhbGlhczogdHJ1ZSB9XG4gICAgICAgIEByZW5kZXJlci5zZXRQaXhlbFJhdGlvIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvXG4gICAgICAgIEByZW5kZXJlci5zZXRDbGVhckNvbG9yIDB4NjRhNTQzXG4gICAgICAgIEByZW5kZXJlci5hdXRvQ2xlYXIgPSBmYWxzZVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIEByZW5kZXJlci5kb21FbGVtZW50XG5cbiAgICByZXNpemU6ICggdywgaCApIC0+XG4gICAgICAgIEByZW5kZXJlci5zZXRTaXplIHcsIGhcblxuICAgICAgICAjIEBjYW1lcmEuYXNwZWN0ID0gdyAvIGhcbiAgICAgICAgIyBAY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKVxuXG4gICAgICAgIEBjYW1lcmEubGVmdCA9IC1zdGFnZS53ICogLjU7XG4gICAgICAgIEBjYW1lcmEucmlnaHQgPSBzdGFnZS53ICogLjU7XG4gICAgICAgIEBjYW1lcmEudG9wID0gc3RhZ2UuaCAqIC41O1xuICAgICAgICBAY2FtZXJhLmJvdHRvbSA9IC1zdGFnZS5oICogLjU7XG4gICAgICAgIEBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gICAgc2V0Q2xlYXJDb2xvcjogKCB2YWx1ZSApIC0+XG4gICAgICAgIEByZW5kZXJlci5zZXRDbGVhckNvbG9yIHZhbHVlXG5cblxuICAgIHN0YXJ0OiAtPlxuICAgICAgICBscC5hZGQgQF91cGRhdGVcblxuICAgIF91cGRhdGU6ID0+XG4gICAgICAgIEByZW5kZXJlci5jbGVhcigpXG4gICAgICAgIEByZW5kZXJlci5yZW5kZXIgQHNjZW5lLCBAY2FtZXJhXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IEVuZ2luZVxuIiwic3RhZ2UgPSByZXF1aXJlIFwiZnovY29yZS9zdGFnZVwiXG5GbG93ZXJzID0gcmVxdWlyZSBcImZsb3dlcnMvRmxvd2Vyc1wiXG5cbmludGVyYWN0aW9ucyA9IHJlcXVpcmUgXCJmei9jb3JlL2ludGVyYWN0aW9uc1wiXG5cbmNsYXNzIEZpZWxkIGV4dGVuZHMgVEhSRUUuT2JqZWN0M0RcblxuICAgIGNvbnN0cnVjdG9yOiAoIEBfZ3JpZCApIC0+XG4gICAgICAgIHN1cGVyXG5cbiAgICAgICAgaW50ZXJhY3Rpb25zLm9uIGRvY3VtZW50LmJvZHksIFwiZG93blwiLCBAX29uRG93blxuXG4gICAgIyAgICAgQF9hcmVhID0gbmV3IFBJWEkuR3JhcGhpY3NcbiAgICAjICAgICBAX2FyZWEuYmVnaW5GaWxsIDB4ZmYwMGZmLCAwXG4gICAgIyAgICAgQF9hcmVhLmRyYXdSZWN0IDAsIDAsIHN0YWdlLncsIHN0YWdlLmhcbiAgICAjICAgICBAYWRkQ2hpbGQgQF9hcmVhXG5cbiAgICAjICAgICBAX2FyZWEuaW50ZXJhY3RpdmUgPSBAX2FyZWEuYnV0dG9uTW9kZSA9IHRydWVcbiAgICAjICAgICBAX2FyZWEub24gXCJ0YXBcIiwgQF9vbkRvd25cbiAgICAjICAgICBAX2FyZWEub24gXCJjbGlja1wiLCBAX29uRG93blxuXG4gICAgICAgICMgY29uc29sZS5sb2cgXCJ5b1wiXG4gICAgICAgICMgQF9vbkRvd24geyB4OiAwLCB5OiAwfVxuXG4gICAgX29uRG93bjogKCBlICkgPT5cbiAgICAgICAgeCA9IGUueCAtIHN0YWdlLncgKiAuNSA+PiAwXG4gICAgICAgIHkgPSAtZS55ICsgc3RhZ2UuaCAqIC41ID4+IDBcblxuICAgICAgICBmbG93ZXJzID0gbmV3IEZsb3dlcnNcbiAgICAgICAgZmxvd2Vycy5wb3NpdGlvbi54ID0geFxuICAgICAgICBmbG93ZXJzLnBvc2l0aW9uLnkgPSB5XG4gICAgICAgIEBhZGQgZmxvd2Vyc1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpZWxkXG4iLCJscCA9IHJlcXVpcmUgXCJmei9jb3JlL2xvb3BcIlxudUFycmF5cyA9IHJlcXVpcmUgXCJmei91dGlscy9hcnJheXNcIlxuXG5jRmxvd2VycyA9IHJlcXVpcmUgXCJmbG93ZXJzL2NvbnN0c1wiXG5hc3NldHMgPSByZXF1aXJlIFwiYXNzZXRzXCJcbmRhdGFTaGFkZXIgPSByZXF1aXJlIFwic2hhZGVycy9GbG93ZXJTaGFkZXJcIlxudXRpbHMgPSByZXF1aXJlIFwiZmxvd2Vycy91dGlsc1wiXG5cbmNsYXNzIEZsb3dlciBleHRlbmRzIFRIUkVFLk9iamVjdDNEXG5cbiAgICBjb25zdHJ1Y3RvcjogKCBAX2xpZmUsIGNvbG9yc1NldCApIC0+XG4gICAgICAgIHN1cGVyXG5cbiAgICAgICAgaWR4ID0gY29sb3JzU2V0Lmxlbmd0aCAqIE1hdGgucmFuZG9tKCkgPj4gMFxuICAgICAgICBAX2NvbG9yID0gY29sb3JzU2V0WyBpZHggXVxuICAgICAgICBjb2xvckRhcmtlbiA9IEBfY29sb3IuY2xvbmUoKS5zZXRMdW1pbmFuY2UgLjM1XG4gICAgICAgIGNvbG9yRGFya2VzdCA9IEBfY29sb3IuY2xvbmUoKS5zZXRMdW1pbmFuY2UgLjE1XG5cbiAgICAgICAgQF9kUmFuZCA9IE1hdGgucmFuZG9tKCkgKiAxXG5cbiAgICAgICAgZ2VvbSA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5IDIwLCAyMCwgMVxuXG4gICAgICAgIEBfY3JlYXRlTGVhZnMgMjAsIEBfY29sb3IuY1xuICAgICAgICBAX2NyZWF0ZUxlYWZzIDEyLCBjb2xvckRhcmtlbi5jIGlmIE1hdGgucmFuZG9tKCkgPiAuMjVcbiAgICAgICAgbWF0ID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwgeyBtYXA6IGFzc2V0cy50ZXh0dXJlcy5oZWFydCwgdHJhbnNwYXJlbnQ6IHRydWUsIGNvbG9yOiBjb2xvckRhcmtlc3QuYyB9XG4gICAgICAgIEBfaGVhcnQgPSBuZXcgVEhSRUUuTWVzaCBnZW9tLCBtYXRcbiAgICAgICAgQGFkZCBAX2hlYXJ0XG5cbiAgICAgICAgQF9sZWFmcyA9IFtdXG5cbiAgICAgICAgc1JhdGlvID0gQF9saWZlIC8gY0Zsb3dlcnMubGlmZVxuICAgICAgICBzID0gKCAuNyArIE1hdGgucmFuZG9tKCkgKiAuMyApICogc1JhdGlvXG4gICAgICAgIHMgPSAuMzUgaWYgcyA8IC4zNVxuICAgICAgICBzICo9IDEuNjVcbiAgICAgICAgQC5zY2FsZS54ID0gMC4wMDAwMDFcbiAgICAgICAgQC5zY2FsZS55ID0gMC4wMDAwMDFcbiAgICAgICAgVHdlZW5MaXRlLnRvIEAuc2NhbGUsIC42LFxuICAgICAgICAgICAgZGVsYXk6IEBfZFJhbmRcbiAgICAgICAgICAgIHg6IHNcbiAgICAgICAgICAgIHk6IHNcbiAgICAgICAgICAgIGVhc2U6IFF1YWQuZWFzZU91dFxuXG4gICAgICAgIEByb3RhdGlvbi56ID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyXG5cbiAgICBfY3JlYXRlTGVhZnM6ICggc2l6ZSwgYyApIC0+XG4gICAgICAgIHR5cGVzID0gWyBcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIl1cblxuICAgICAgICBnZW9tID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkgc2l6ZSwgc2l6ZSwgMVxuICAgICAgICBtYXQgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCB7IG1hcDogYXNzZXRzLnRleHR1cmVzLnBldGFsZV8xLCB0cmFuc3BhcmVudDogdHJ1ZSwgY29sb3I6IGMgfVxuICAgICAgICBtYXQuZGVwdGhUZXN0ID0gZmFsc2VcbiAgICAgICAgbWF0LnNpZGUgPSBUSFJFRS5Eb3VibGVTaWRlXG5cbiAgICAgICAgbiA9IDQgKyBNYXRoLnJhbmRvbSgpICogNSA+PiAwXG4gICAgICAgIG4gKz0gMSBpZiBuID09IDQgJiYgTWF0aC5yYW5kb20oKSA+IC4zXG4gICAgICAgIGEgPSAwXG4gICAgICAgIGFBZGQgPSAoIE1hdGguUEkgKiAyICkgLyBuXG4gICAgICAgIGFzID0gW11cbiAgICAgICAgZm9yIGkgaW4gWzAuLi5uXVxuICAgICAgICAgICAgYXMucHVzaCBhXG4gICAgICAgICAgICBhICs9IGFBZGRcbiAgICAgICAgYXMucmV2ZXJzZSgpIGlmIE1hdGgucmFuZG9tKCkgPCAuNVxuICAgICAgICBhcyA9IHVBcnJheXMuc2hpZnQgYXMsIGFzLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkgPj4gMFxuXG4gICAgICAgIGQgPSAwXG4gICAgICAgIGRBZGQgPSAuMVxuICAgICAgICBkQWRkTWluID0gLjA0XG4gICAgICAgIGRGcmljdGlvbiA9IC44N1xuICAgICAgICBmb3IgaSBpbiBbMC4uLm5dXG4gICAgICAgICAgICBhID0gYXNbIGkgXVxuXG4gICAgICAgICAgICByYW5kID0gTWF0aC5yYW5kb20oKVxuICAgICAgICAgICAgdG94ID0gc2l6ZSAqIDMgLyAoIDQuMiArIHJhbmQgKSAqIE1hdGguY29zIGFcbiAgICAgICAgICAgIHRveSA9IHNpemUgKiAzIC8gKCA0LjIgKyByYW5kICkgKiBNYXRoLnNpbiBhXG5cbiAgICAgICAgICAgIGNudExlYWYgPSBuZXcgVEhSRUUuT2JqZWN0M0RcbiAgICAgICAgICAgIGNudExlYWYucG9zaXRpb24ueCA9IHRveCAqIC43NVxuICAgICAgICAgICAgY250TGVhZi5wb3NpdGlvbi55ID0gdG95ICogLjc1XG4gICAgICAgICAgICBjbnRMZWFmLnJvdGF0aW9uLnogPSBhXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxlYWYgPSBuZXcgVEhSRUUuTWVzaCBnZW9tLCBtYXRcbiAgICAgICAgICAgIGxlYWYucm90YXRpb24ueCA9IC1NYXRoLlBJICogLjMgKiBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgICBsZWFmLnJvdGF0aW9uLnkgPSAtTWF0aC5QSSAqIC40NVxuICAgICAgICAgICAgY250TGVhZi5hZGQgbGVhZlxuXG4gICAgICAgICAgICBkUmFuZCA9IE1hdGgucmFuZG9tKCkgKiBcbiAgICAgICAgICAgIGxlYWYudmlzaWJsZSA9IGZhbHNlXG4gICAgICAgICAgICBUd2VlbkxpdGUudG8gY250TGVhZi5wb3NpdGlvbiwgMS4yLFxuICAgICAgICAgICAgICAgIGRlbGF5OiAuMTcgKyBkICsgQF9kUmFuZFxuICAgICAgICAgICAgICAgIHg6IHRveFxuICAgICAgICAgICAgICAgIHk6IHRveVxuICAgICAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcblxuICAgICAgICAgICAgVHdlZW5MaXRlLnRvIGxlYWYucm90YXRpb24sIDEuMixcbiAgICAgICAgICAgICAgICBkZWxheTogLjE3ICsgZCArIEBfZFJhbmRcbiAgICAgICAgICAgICAgICB4OiAwXG4gICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIGVhc2U6IFF1YWQuZWFzZU91dFxuICAgICAgICAgICAgICAgIG9uU3RhcnQ6ICggb2JqICkgLT5cbiAgICAgICAgICAgICAgICAgICAgb2JqLnZpc2libGUgPSB0cnVlXG4gICAgICAgICAgICAgICAgb25TdGFydFBhcmFtczogWyBsZWFmIF1cblxuICAgICAgICAgICAgQGFkZCBjbnRMZWFmXG5cbiAgICAgICAgICAgIGQgKz0gZEFkZFxuICAgICAgICAgICAgZEFkZCAqPSBkRnJpY3Rpb25cbiAgICAgICAgICAgIGRBZGQgPSBkQWRkTWluIGlmIGRBZGQgPCBkQWRkTWluXG5cbiAgICAgICAgICAgIFxuXG5cbm1vZHVsZS5leHBvcnRzID0gRmxvd2VyXG4iLCJzdGFnZSA9IHJlcXVpcmUgXCJmei9jb3JlL3N0YWdlXCJcbmxwID0gcmVxdWlyZSBcImZ6L2NvcmUvbG9vcFwiXG5cbnBvb2wgPSByZXF1aXJlIFwiZmxvd2Vycy9wb29sXCJcbkZsb3dlciA9IHJlcXVpcmUgXCJmbG93ZXJzL0Zsb3dlclwiXG5jRmxvd2VycyA9IHJlcXVpcmUgXCJmbG93ZXJzL2NvbnN0c1wiXG5cbmNvbG9ycyA9IHJlcXVpcmUgXCJjb2xvcnNcIlxuXG5QYXRoRHJhd2VyID0gcmVxdWlyZSBcInBhdGhzL1BhdGhEcmF3ZXJcIlxuTGluZWFyID0gcmVxdWlyZSBcInBhdGhzL0xpbmVhclwiXG5UdXJuaW5nID0gcmVxdWlyZSBcInBhdGhzL1R1cm5pbmdcIlxuRHJ1bmsgPSByZXF1aXJlIFwicGF0aHMvRHJ1bmtcIlxuU2ludXMgPSByZXF1aXJlIFwicGF0aHMvU2ludXNcIlxuT3B0cyA9IHJlcXVpcmUgXCJwYXRocy9PcHRzXCJcblxudGltZW91dCA9IHJlcXVpcmUgXCJmei91dGlscy90aW1lb3V0XCJcblxuY2xhc3MgRmxvd2VycyBleHRlbmRzIFRIUkVFLk9iamVjdDNEXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXJcblxuICAgICAgICBAX3BhdGhEcmF3ZXIgPSBuZXcgUGF0aERyYXdlclxuICAgICAgICAjIEBhZGRDaGlsZCBAX3BhdGhEcmF3ZXJcblxuICAgICAgICAjIEBfY29sb3JzID0gQF9nZW5lcmF0ZUNvbG9ycygpXG5cbiAgICAgICAgQF9vcmlnaW4gPSBuZXcgRmxvd2VyIGNGbG93ZXJzLmxpZmUsIGNvbG9ycy5nZXRGbG93ZXJzKClcbiAgICAgICAgQGFkZCBAX29yaWdpblxuXG4gICAgICAgIEBfZmxvd2VycyA9IFsgQF9vcmlnaW4gXVxuXG4gICAgICAgIEBfb3B0cyA9IFtdXG4gICAgICAgIFxuICAgICAgICBAX2lzQWxpdmUgPSB0cnVlXG5cbiAgICAgICAgcmFkID0gMFxuICAgICAgICBuID0gMjVcbiAgICAgICAgQF9wYXRocyA9IFtdXG4gICAgICAgIGZvciBpIGluIFsgMC4uLm4gXVxuICAgICAgICAgICAgcGF0aCA9IG5ldyBTaW51cyByYWRcbiAgICAgICAgICAgIEBfcGF0aHMucHVzaCBwYXRoXG5cbiAgICAgICAgICAgIEBfb3B0cy5wdXNoXG4gICAgICAgICAgICAgICAgc3BlZWQ6ICggTWF0aC5yYW5kb20oKSAqIDUwICsgMjAgKSAqIDEuMiA+PiAwXG4gICAgICAgICAgICAgICAgbGlmZTogTWF0aC5yYW5kb20oKSAqIGNGbG93ZXJzLmxpZmUgKiAuNiArIGNGbG93ZXJzLmxpZmUgKiAuNCA+PiAwXG5cbiAgICAgICAgICAgIEBfcGF0aERyYXdlci5hZGQgcGF0aFxuXG4gICAgICAgICAgICByYWQgKz0gKCBNYXRoLlBJICogMiApIC8gblxuXG4gICAgICAgIHRpbWVvdXQgQF91cGRhdGUsIDgwXG5cbiAgICBfZ2VuZXJhdGVDb2xvcnM6IC0+XG4gICAgICAgIGlkeCA9IE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoID4+IDBcbiAgICAgICAgY29sb3JzWyBpZHggXVxuXG4gICAgX3VwZGF0ZTogPT5cbiAgICAgICAgaWYgIUBfaXNBbGl2ZVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgaXNBbGl2ZSA9IGZhbHNlXG4gICAgICAgIGZvciBwYXRoLCBpIGluIEBfcGF0aHNcbiAgICAgICAgICAgIG9wdCA9IEBfb3B0c1sgaSBdXG5cbiAgICAgICAgICAgIGNvbnRpbnVlIGlmICFvcHQubGlmZVxuXG4gICAgICAgICAgICBpZiBwYXRoLm1vZGlmaWVyXG4gICAgICAgICAgICAgICAgb3B0LnNwZWVkID0gcGF0aC5tb2RpZmllci5zcGVlZCBvcHQuc3BlZWRcbiAgICAgICAgICAgICAgICBvcHQuc3BlZWQgPSAxMCBpZiBvcHQuc3BlZWQgPCAxMFxuICAgICAgICAgICAgcGF0aC5uZXh0IG9wdC5zcGVlZFxuICAgICAgICAgICAgQF9hZGRGbG93ZXIgcGF0aC5jdXJyZW50LCBvcHQubGlmZVxuXG4gICAgICAgICAgICBvcHQubGlmZSAtPSAxXG4gICAgICAgICAgICBpc0FsaXZlID0gdHJ1ZSBpZiBvcHQubGlmZSA+IDBcbiAgICAgICAgQF9wYXRoRHJhd2VyLnVwZGF0ZSgpXG5cbiAgICAgICAgQF9pc0FsaXZlID0gaXNBbGl2ZVxuXG4gICAgICAgIHRpbWVvdXQgQF91cGRhdGUsIDUwXG5cbiAgICBfYWRkRmxvd2VyOiAoIHBvcywgbGlmZSApIC0+XG4gICAgICAgIGZsb3dlciA9IG5ldyBGbG93ZXIgbGlmZSwgY29sb3JzLmdldEZsb3dlcnMoKVxuICAgICAgICBmbG93ZXIucG9zaXRpb24ueCA9IHBvcy54XG4gICAgICAgIGZsb3dlci5wb3NpdGlvbi55ID0gcG9zLnlcbiAgICAgICAgQGFkZCBmbG93ZXJcblxuICAgICAgICBAX2Zsb3dlcnMucHVzaCBmbG93ZXJcblxubW9kdWxlLmV4cG9ydHMgPSBGbG93ZXJzXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsaWZlOiA1XG59XG4iLCJGbG93ZXIgPSByZXF1aXJlIFwiZmxvd2Vycy9GbG93ZXJcIlxuXG5jbGFzcyBQb29sXG5cbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQF9hdmFpbGFibGUgPSBbXVxuXG4gICAgZmlsbDogKCBhbW91bnQgPSA1MDAgKSAtPlxuICAgICAgICBmb3IgaSBpbiBbIDAuLi5hbW91bnQgXVxuICAgICAgICAgICAgQF9hdmFpbGFibGUucHVzaCBuZXcgRmxvd2VyXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0OiAtPlxuICAgICAgICBAX2F2YWlsYWJsZS5wb3AoKVxuXG4gICAgcmV0dXJuOiAoIGl0ZW0gKSAtPlxuICAgICAgICBAX2F2YWlsYWJsZS5wdXNoIGl0ZW1cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgUG9vbFxuIiwibW9kdWxlLmV4cG9ydHMuaW5pdE1vZGlmcyA9ICggc3ByaXRlICkgLT5cbiAgICBzcHJpdGUubW9kaWZzID0gXG4gICAgICAgIHgwOiAwXG4gICAgICAgIHkwOiAwXG4gICAgICAgIHgxOiAwXG4gICAgICAgIHkxOiAwXG4gICAgICAgIHgyOiAwXG4gICAgICAgIHkyOiAwXG4gICAgICAgIHgzOiAwXG4gICAgICAgIHkzOiAwXG4gICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzLmV6dHdlZW4gPVxuICAgIGluOiAoIHNwcml0ZSwgdHlwZSwgZGVsYXkgPSAwICkgLT5cbiAgICAgICAgcyA9IHNwcml0ZS53aWR0aFxuXG4gICAgICAgIGlmIHR5cGUgPT0gXCJhXCJcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueDEgPSAtcyBcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueTEgPSAtcyAqIC41XG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLngyID0gLXMgXG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLnkyID0gcyAqIC41XG4gICAgICAgIGVsc2UgaWYgdHlwZSA9PSBcImJcIlxuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy54MiA9IHMgKiAuNSBcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueTIgPSAtc1xuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy54MyA9IC0gcyAqIC41IFxuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy55MyA9IC1zIFxuICAgICAgICBlbHNlIGlmIHR5cGUgPT0gXCJjXCJcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueDAgPSBzXG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLnkwID0gLXMgKiAuNVxuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy54MyA9IHNcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueTMgPSBzICogLjVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3ByaXRlLm1vZGlmcy54MCA9IC1zICogLjVcbiAgICAgICAgICAgIHNwcml0ZS5tb2RpZnMueTAgPSBzXG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLngxID0gcyAqIC41XG4gICAgICAgICAgICBzcHJpdGUubW9kaWZzLnkxID0gc1xuXG4gICAgICAgIFR3ZWVuTGl0ZS50byBzcHJpdGUubW9kaWZzLCAuNCxcbiAgICAgICAgICAgIGRlbGF5OiBkZWxheVxuICAgICAgICAgICAgeDA6IDBcbiAgICAgICAgICAgIHkwOiAwXG4gICAgICAgICAgICB4MTogMFxuICAgICAgICAgICAgeTE6IDBcbiAgICAgICAgICAgIHgyOiAwXG4gICAgICAgICAgICB5MjogMFxuICAgICAgICAgICAgeDM6IDBcbiAgICAgICAgICAgIHkzOiAwXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5PdXRcblxuICAgICAgICByZXR1cm5cblxuIyB0b2RvOiBwcmVuZHJlIGVuIGNvbXB0ZSBsYSByb3RhdGlvbiBwb3VyIGxlcyBjYWxjdWxzIGRlIHZlcnRpY2VzXG5tb2R1bGUuZXhwb3J0cy50d2VlbiA9XG4gICAgaW46ICggc3ByaXRlLCBkZWxheSA9IDAgKSAtPlxuICAgICAgICBzID0gc3ByaXRlLndpZHRoXG5cbiAgICAgICAgc3ByaXRlLm1vZGlmcy54MCA9IC1zICogLjVcbiAgICAgICAgc3ByaXRlLm1vZGlmcy54MSA9IHMgKiAuNVxuICAgICAgICBzcHJpdGUubW9kaWZzLnkwID0gXG4gICAgICAgIHNwcml0ZS5tb2RpZnMueTEgPSBzXG5cbiAgICAgICAgVHdlZW5MaXRlLnRvIHNwcml0ZS5tb2RpZnMsIC40LFxuICAgICAgICAgICAgZGVsYXk6IGRlbGF5XG4gICAgICAgICAgICB4MDogMFxuICAgICAgICAgICAgeTA6IDBcbiAgICAgICAgICAgIHgxOiAwXG4gICAgICAgICAgICB5MTogMFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluT3V0XG5cbiAgICAgICAgcmV0dXJuXG4iLCJ2YXIgZG93bnMgPSB7fTtcbnZhciBtb3ZlcyA9IHt9O1xudmFyIHVwcyA9IHt9O1xudmFyIGNsaWNrcyA9IHt9O1xudmFyIG92ZXJzID0ge307XG52YXIgb3V0cyA9IHt9O1xuXG52YXIgaW50ZXJhY3Rpb25zID0gWyBkb3ducywgbW92ZXMsIHVwcywgY2xpY2tzIF07XG5cbmZ1bmN0aW9uIGdldEV2ZW50KCBhY3Rpb24gKSB7XG4gIHZhciBldnQgPSBcIlwiO1xuICBpZiggaXNNb2JpbGUuYW55ICkge1xuXG4gICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCkge1xuICAgICAgc3dpdGNoKCBhY3Rpb24gKSB7XG4gICAgICAgIGNhc2UgXCJkb3duXCI6IGV2dCA9IFwiTVNQb2ludGVyRG93blwiOyBicmVhaztcbiAgICAgICAgY2FzZSBcIm1vdmVcIjogZXZ0ID0gXCJNU1BvaW50ZXJNb3ZlXCI7IGJyZWFrO1xuICAgICAgICBjYXNlIFwidXBcIjogZXZ0ID0gXCJNU1BvaW50ZXJVcFwiOyBicmVhaztcbiAgICAgICAgY2FzZSBcImNsaWNrXCI6IGV2dCA9IFwiTVNQb2ludGVyVXBcIjsgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vY29uc29sZS5sb2coXCJldnRcIiwgZXZ0LCBhY3Rpb24pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCggYWN0aW9uICkge1xuICAgICAgICBjYXNlIFwiZG93blwiOiBldnQgPSBcInRvdWNoc3RhcnRcIjsgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtb3ZlXCI6IGV2dCA9IFwidG91Y2htb3ZlXCI7IGJyZWFrO1xuICAgICAgICBjYXNlIFwidXBcIjogZXZ0ID0gXCJ0b3VjaGVuZFwiOyBicmVhaztcbiAgICAgICAgY2FzZSBcImNsaWNrXCI6IGV2dCA9IFwidG91Y2hzdGFydFwiOyBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cblxuICB9IGVsc2Uge1xuICAgIHN3aXRjaCggYWN0aW9uICkge1xuICAgICAgY2FzZSBcImRvd25cIjogZXZ0ID0gXCJtb3VzZWRvd25cIjsgYnJlYWs7XG4gICAgICBjYXNlIFwibW92ZVwiOiBldnQgPSBcIm1vdXNlbW92ZVwiOyBicmVhaztcbiAgICAgIGNhc2UgXCJ1cFwiOiBldnQgPSBcIm1vdXNldXBcIjsgYnJlYWs7XG4gICAgICBjYXNlIFwiY2xpY2tcIjogZXZ0ID0gXCJjbGlja1wiOyBicmVhaztcbiAgICAgIGNhc2UgXCJvdmVyXCI6IGV2dCA9IGJvd3Nlci5zYWZhcmkgPyBcIm1vdXNlb3ZlclwiIDogXCJtb3VzZWVudGVyXCI7IGJyZWFrO1xuICAgICAgY2FzZSBcIm91dFwiOiBldnQgPSBib3dzZXIuc2FmYXJpID8gXCJtb3VzZW91dFwiIDogXCJtb3VzZWxlYXZlXCI7IGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXZ0O1xufVxuXG5mdW5jdGlvbiBnZXRPYmooIGFjdGlvbiApIHtcbiAgc3dpdGNoKCBhY3Rpb24gKSB7XG4gICAgY2FzZSBcImRvd25cIjogcmV0dXJuIGRvd25zO1xuICAgIGNhc2UgXCJtb3ZlXCI6IHJldHVybiBtb3ZlcztcbiAgICBjYXNlIFwidXBcIjogcmV0dXJuIHVwcztcbiAgICBjYXNlIFwiY2xpY2tcIjogcmV0dXJuIGNsaWNrcztcbiAgICBjYXNlIFwib3ZlclwiOiByZXR1cm4gb3ZlcnM7XG4gICAgY2FzZSBcIm91dFwiOiByZXR1cm4gb3V0cztcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kKCBjYiwgZGF0YXMgKSB7XG4gIHZhciBkYXRhID0gbnVsbDtcbiAgZm9yKCB2YXIgaSA9IDAsIG4gPSBkYXRhcy5sZW5ndGg7IGkgPCBuOyBpKysgKSB7XG4gICAgZGF0YSA9IGRhdGFzWyBpIF07XG4gICAgaWYoIGRhdGEuY2IgPT0gY2IgKSB7XG4gICAgICByZXR1cm4geyBkYXRhOiBkYXRhLCBpZHg6IGkgfTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzLm9uID0gZnVuY3Rpb24oIGVsdCwgYWN0aW9uLCBjYiApIHtcbiAgdmFyIGV2dCA9IGdldEV2ZW50KCBhY3Rpb24gKTtcbiAgaWYoIGV2dCA9PSBcIlwiICl7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG9iaiA9IGdldE9iaiggYWN0aW9uICk7XG4gIGlmKCAhb2JqWyBlbHQgXSApIHtcbiAgICBvYmpbIGVsdCBdID0gW107XG4gIH1cblxuICB2YXIgaXNPdmVyID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gcHJveHkoIGUgKSB7XG4gICAgaWYoIGlzTW9iaWxlLmFueSApIHtcblxuICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCkge1xuICAgICAgICAgIC8vIG1zcG9pbnRlcmV2ZW50c1xuICAgICAgICAgIGUueCA9IGUuY2xpZW50WDtcbiAgICAgICAgICBlLnkgPSBlLmNsaWVudFk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciB0b3VjaCA9IGUudG91Y2hlc1sgMCBdO1xuICAgICAgICBpZiggdG91Y2ggKSB7XG4gICAgICAgICAgZS54ID0gdG91Y2guY2xpZW50WDtcbiAgICAgICAgICBlLnkgPSB0b3VjaC5jbGllbnRZO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgZS54ID0gZS5jbGllbnRYO1xuICAgICAgZS55ID0gZS5jbGllbnRZO1xuICAgIH1cblxuICAgIGNiLmNhbGwoIHRoaXMsIGUgKTtcbiAgfVxuXG4gIG9ialsgZWx0IF0ucHVzaCggeyBjYjogY2IsIHByb3h5OiBwcm94eSB9ICk7XG4gIGVsdC5hZGRFdmVudExpc3RlbmVyKCBldnQsIHByb3h5LCBmYWxzZSApO1xufVxuXG5tb2R1bGUuZXhwb3J0cy5vZmYgPSBmdW5jdGlvbiggZWx0LCBhY3Rpb24sIGNiICkge1xuICB2YXIgZXZ0ID0gZ2V0RXZlbnQoIGFjdGlvbiApO1xuICBpZiggZXZ0ID09IFwiXCIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG9iaiA9IGdldE9iaiggYWN0aW9uICk7XG4gIGlmKCAhb2JqWyBlbHQgXSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGF0YXMgPSBvYmpbIGVsdCBdO1xuICBpZiggY2IgKSB7XG4gICAgdmFyIHJlc3VsdCA9IGZpbmQoIGNiLCBkYXRhcyApO1xuICAgIGlmKCAhcmVzdWx0ICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHQucmVtb3ZlRXZlbnRMaXN0ZW5lciggZXZ0LCByZXN1bHQuZGF0YS5wcm94eSwgZmFsc2UgKTtcbiAgICBvYmpbIGVsdCBdLnNwbGljZSggZGF0YXMuaWR4LCAxICk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRhdGEgPSBudWxsO1xuICAgIGZvciggdmFyIGkgPSAwLCBuID0gZGF0YXMubGVuZ3RoOyBpIDwgbjsgaSsrICkge1xuICAgICAgZGF0YSA9IGRhdGFzWyBpIF07XG4gICAgICBlbHQucmVtb3ZlRXZlbnRMaXN0ZW5lciggZXZ0LCBkYXRhLnByb3h5LCBmYWxzZSApO1xuICAgIH1cbiAgICBvYmpbIGVsdCBdID0gbnVsbDtcbiAgICBkZWxldGUgb2JqWyBlbHQgXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cy5oYXMgPSBmdW5jdGlvbiggZWx0LCBhY3Rpb24sIGNiICkge1xuICB2YXIgZXZ0ID0gZ2V0RXZlbnQoIGFjdGlvbiApO1xuICBpZiggZXZ0ID09IFwiXCIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG9iaiA9IGdldE9iaiggYWN0aW9uICk7XG4gIGlmKCAhb2JqWyBlbHQgXSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGF0YXMgPSBvYmpbIGVsdCBdO1xuICBpZiggY2IgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cy51bmJpbmQgPSBmdW5jdGlvbiggZWx0ICkge1xuICBmb3IoIHZhciBpID0gMCwgbiA9IGludGVyYWN0aW9ucy5sZW5ndGg7IGkgPCBuOyBpKysgKSB7XG4gICAgaW50ZXJhY3Rpb25zWyBpIF1bIGVsdCBdID0gbnVsbDtcbiAgICBkZWxldGUgaW50ZXJhY3Rpb25zWyBpIF1bIGVsdCBdO1xuICB9XG59XG4iLCJpZHggPSAtMVxubGlzdGVuZXJzID0gW11cblxubiA9IDBcblxudXBkYXRlID0gLT5cbiAgaSA9IG5cbiAgd2hpbGUgLS1pID49IDBcbiAgICBsaXN0ZW5lcnNbIGkgXS5hcHBseSB0aGlzLCBudWxsXG4gIGlkeCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSB1cGRhdGVcblxubW9kdWxlLmV4cG9ydHMuc3RhcnQgPSAtPlxuICB1cGRhdGUoKVxuXG5tb2R1bGUuZXhwb3J0cy5zdG9wID0gLT5cbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgaWR4XG5cbm1vZHVsZS5leHBvcnRzLmFkZCA9ICggbGlzdGVuZXIgKSAtPlxuICBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZiBsaXN0ZW5lclxuICByZXR1cm4gaWYgaWR4ID49IDBcbiAgbGlzdGVuZXJzLnB1c2ggbGlzdGVuZXJcbiAgbisrXG5cbm1vZHVsZS5leHBvcnRzLnJlbW92ZSA9ICggbGlzdGVuZXIgKSAtPlxuICBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZiBsaXN0ZW5lclxuICByZXR1cm4gaWYgaWR4IDwgMFxuICBsaXN0ZW5lcnMuc3BsaWNlIGlkeCwgMVxuICBuLS1cbiIsInRpbWVvdXQgPSByZXF1aXJlIFwiZnovdXRpbHMvdGltZW91dFwiXG5cbmNsYXNzIFN0YWdlIGV4dGVuZHMgRW1pdHRlclxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEB3ID0gMFxuICAgICAgICBAaCA9IDBcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwicmVzaXplXCIsIEBfb25SZXNpemUsIGZhbHNlXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIFwib3JpZW50YXRpb25jaGFuZ2VcIiwgQF9vblJlc2l6ZSwgZmFsc2VcbiAgICAgICAgQF9vblJlc2l6ZSgpXG5cbiAgICBfdXBkYXRlOiA9PlxuICAgICAgICBAdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIEBoID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICAgICAgQGVtaXQgXCJyZXNpemVcIlxuXG4gICAgX29uUmVzaXplOiA9PlxuICAgICAgICB0aW1lb3V0IEBfdXBkYXRlLCAxMFxuXG4gICAgcmVzaXplOiAoIHdpdGhEZWxheSA9IGZhbHNlICkgLT5cbiAgICAgICAgaWYgd2l0aERlbGF5XG4gICAgICAgICAgICBAX29uUmVzaXplKClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAX3VwZGF0ZSgpXG5cblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgU3RhZ2VcbiIsIm1vZHVsZS5leHBvcnRzLnNodWZmbGUgPSAoIGEgKSAtPlxuICAgIGkgPSBhLmxlbmd0aFxuICAgIHdoaWxlIC0taSA+IDBcbiAgICAgICAgaiA9IH5+KCBNYXRoLnJhbmRvbSgpICogKCBpICsgMSApIClcbiAgICAgICAgdCA9IGFbIGogXVxuICAgICAgICBhWyBqIF0gPSBhWyBpIF1cbiAgICAgICAgYVsgaSBdID0gdFxuICAgIGFcblxubW9kdWxlLmV4cG9ydHMuc2hpZnQgPSAoIGEsIGZyb20gKSAtPlxuICAgIGFGaXJzdCA9IGEuc3BsaWNlIGZyb20sIGEubGVuZ3RoXG4gICAgYSA9IGFGaXJzdC5jb25jYXQgYS5zcGxpY2UgMCwgYS5sZW5ndGhcbiAgICBhXG4iLCJjbGFzcyBDb2xvclxuXG4gICAgY29uc3RydWN0b3I6ICggQGMgKSAtPlxuICAgICAgICBAcmdiID0gZ2V0UkdCIEBjXG4gICAgICAgIEBoc2wgPSBSR0J0b0hTTCBAcmdiLnIsIEByZ2IuZywgQHJnYi5iXG5cbiAgICBzZXRMdW1pbmFuY2U6ICggdmFsdWUgKSAtPlxuICAgICAgICBAaHNsLmwgPSB2YWx1ZVxuICAgICAgICBAcmdiID0gSFNMdG9SR0IgQGhzbC5oLCBAaHNsLnMsIEBoc2wubFxuICAgICAgICBAYyA9IGNvbWJpbmVSR0IgQHJnYi5yLCBAcmdiLmcsIEByZ2IuYlxuICAgICAgICBAXG5cbiAgICBjbG9uZTogLT4gbmV3IENvbG9yIEBjXG5cbm1vZHVsZS5leHBvcnRzLkNvbG9yID0gQ29sb3JcblxuZ2V0UkdCID0gXG5tb2R1bGUuZXhwb3J0cy5nZXRSR0IgPSAoIGMgKSAtPlxuICAgIHJldHVybiB7XG4gICAgICAgIHI6ICggYyA+PiAxNiApICYgMHhmZlxuICAgICAgICBnOiAoIGMgPj4gOCApICYgMHhmZlxuICAgICAgICBiOiBjICYgMHhmZlxuICAgIH1cblxuY29tYmluZVJHQiA9IFxubW9kdWxlLmV4cG9ydHMuY29tYmluZVJHQiA9ICggciwgZywgYiApIC0+XG4gICAgKCByIDw8IDE2ICkgfCAoIGcgPDwgOCApIHwgYlxuICAgIFxuIyBodHRwczovL2dpdGh1Yi5jb20vbWphY2tzb24vbWppamFja3Nvbi5naXRodWIuY29tL2Jsb2IvbWFzdGVyLzIwMDgvMDIvcmdiLXRvLWhzbC1hbmQtcmdiLXRvLWhzdi1jb2xvci1tb2RlbC1jb252ZXJzaW9uLWFsZ29yaXRobXMtaW4tamF2YXNjcmlwdC50eHRcblJHQnRvSFNMID1cbm1vZHVsZS5leHBvcnRzLlJHQnRvSFNMID0gKCByLCBnLCBiICkgLT5cbiAgICByIC89IDI1NVxuICAgIGcgLz0gMjU1XG4gICAgYiAvPSAyNTVcblxuICAgIG1heCA9IE1hdGgubWF4IHIsIGcsIGJcbiAgICBtaW4gPSBNYXRoLm1pbiByLCBnLCBiXG5cbiAgICBsID0gKCBtYXggKyBtaW4gKSAqIC41XG5cbiAgICBpZiBtYXggPT0gbWluXG4gICAgICAgIGggPSBzID0gMFxuICAgIGVsc2VcbiAgICAgICAgZCA9IG1heCAtIG1pblxuICAgICAgICBzID0gaWYgbCA+IC41IHRoZW4gZCAvICggMiAtIG1heCAtIG1pbiApIGVsc2UgZCAvICggbWF4ICsgbWluIClcbiAgICAgICAgaWYgbWF4ID09IHJcbiAgICAgICAgICAgIGggPSAoIGcgLSBiICkgLyBkICsgKCBpZiBnIDwgYiB0aGVuIDYgZWxzZSAwIClcbiAgICAgICAgZWxzZSBpZiBtYXggPT0gZ1xuICAgICAgICAgICAgaCA9ICggYiAtIHIgKSAvIGQgKyAyXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGggPSAoIHIgLSBnICkgLyBkICsgNFxuICAgICAgICBoIC89IDZcblxuICAgIHsgaDogaCwgczogcywgbDogbCB9XG5cbkhTTHRvUkdCID1cbm1vZHVsZS5leHBvcnRzLkhTTHRvUkdCID0gKCBoLCBzLCBsICkgLT5cbiAgICBpZiBzID09IDBcbiAgICAgICAgciA9IGcgPSBiID0gbFxuICAgIGVsc2VcbiAgICAgICAgaHVlMnJnYiA9ICggcCwgcSwgdCApIC0+XG4gICAgICAgICAgICB0ICs9IDEgaWYgdCA8IDAgXG4gICAgICAgICAgICB0IC09IDEgaWYgdCA+IDFcbiAgICAgICAgICAgIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0IGlmIHQgPCAxLzZcbiAgICAgICAgICAgIHJldHVybiBxIGlmIHQgPCAuNVxuICAgICAgICAgICAgcmV0dXJuIHAgKyAocSAtIHApICogKDIvMyAtIHQpICogNiBpZiB0IDwgMi8zXG4gICAgICAgICAgICByZXR1cm4gcFxuXG4gICAgICAgIHEgPSBpZiBsIDwgMC41IHRoZW4gbCAqICgxICsgcykgZWxzZSBsICsgcyAtIGwgKiBzXG4gICAgICAgIHAgPSAyICogbCAtIHFcblxuICAgICAgICByID0gaHVlMnJnYiBwLCBxLCBoICsgMS8zXG4gICAgICAgIGcgPSBodWUycmdiIHAsIHEsIGhcbiAgICAgICAgYiA9IGh1ZTJyZ2IgcCwgcSwgaCAtIDEvM1xuXG4gICAgICAgIHsgcjogciAqIDI1NSA+PiAwLCBnOiBnICogMjU1ID4+IDAsIGI6IGIgKiAyNTUgPj4gMCB9XG5cblxuIyBodHRwOi8vZGV2bWFnLm9yZy56YS8yMDEyLzA3LzI5L2hvdy10by1jaG9vc2UtY29sb3Vycy1wcm9jZWR1cmFsbHktYWxnb3JpdGhtcy9cbm1vZHVsZS5leHBvcnRzLmdlbmVyYXRlSGFybW9ueSA9ICggY291bnQsIGFSZWYsIGFPZmZzZXQwLCBhT2Zmc2V0MSwgYVJhbmdlMCwgYVJhbmdlMSwgYVJhbmdlMiwgc2F0dXJhdGlvbiwgbHVtaW5hbmNlICkgLT5cbiAgICBjb2xvcnMgPSBbXVxuXG4gICAgIyBhUmVmID0gTWF0aC5yYW5kb20oKSAqIDM2MFxuICAgIGZvciBpIGluIFswLi4uY291bnRdXG4gICAgICAgIGFSYW5kID0gTWF0aC5yYW5kb20oKSAqICggYVJhbmdlMCArIGFSYW5nZTEgKyBhUmFuZ2UyIClcbiAgICAgICAgaWYgYVJhbmQgPiBhUmFuZ2UwXG4gICAgICAgICAgICBpZiBhUmFuZCA8IGFSYW5nZTAgKyBhUmFuZ2UxXG4gICAgICAgICAgICAgICAgYVJhbmQgKz0gYU9mZnNldDBcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBhUmFuZCArPSBhT2Zmc2V0MVxuXG4gICAgICAgIHJnYiA9IEhTTHRvUkdCICggKCBhUmVmICsgYVJhbmQgKSAvIDM2MCApICUgMSwgc2F0dXJhdGlvbiwgbHVtaW5hbmNlXG4gICAgICAgIGNvbG9ycy5wdXNoIG5ldyBDb2xvciBjb21iaW5lUkdCIHJnYi5yLCByZ2IuZywgcmdiLmJcblxuICAgIGNvbG9yc1xuIiwibW9kdWxlLmV4cG9ydHMgPSBkbyAtPlxuICAgIHBlcmYgPSB3aW5kb3cgJiYgd2luZG93LnBlcmZvcm1hbmNlXG4gICAgaWYgcGVyZiAmJiBwZXJmLm5vd1xuICAgICAgICBwZXJmLm5vdy5iaW5kIHBlcmZcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiAtPiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICAgICAgXG4iLCJub3cgPSByZXF1aXJlIFwiZnovdXRpbHMvbm93XCJcblxubW9kdWxlLmV4cG9ydHMgPSAoIGZuLCBkZWxheSApIC0+XG4gICAgc3RhcnQgPSBub3coKVxuXG4gICAgbHAgPSAtPlxuICAgICAgICBpZiAoIG5vdygpIC0gc3RhcnQgKSA+PSBkZWxheVxuICAgICAgICAgICAgZm4uY2FsbCgpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRhdGEuaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgbHBcblxuICAgIGRhdGEgPSB7fVxuICAgIGRhdGEuaWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgbHBcbiAgICBkYXRhXG5cbm1vZHVsZS5leHBvcnRzLmNsZWFyID0gKCBkYXRhICkgLT5cbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSBkYXRhLmlkXG4iLCJhc3NldHMgPSByZXF1aXJlIFwiYXNzZXRzXCJcblxuY2xhc3MgTG9hZGVyIGV4dGVuZHMgRW1pdHRlclxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG5cbiAgICAgICAgQF9pZHhMb2FkZWQgPSAwXG4gICAgICAgIEBfaWR4VG90YWwgPSAwXG5cbiAgICBpbml0OiAtPlxuICAgICAgICBAX2lkeFRvdGFsKysgZm9yIGlkIG9mIGFzc2V0cy5kYXRhXG4gICAgICAgIHJldHVyblxuXG4gICAgX29uQ29tcGxldGU6ID0+XG4gICAgICAgIEBfaWR4TG9hZGVkKytcbiAgICAgICAgaWYgQF9pZHhMb2FkZWQgPT0gQF9pZHhUb3RhbFxuICAgICAgICAgICAgQGVtaXQgXCJjb21wbGV0ZVwiXG5cbiAgICBsb2FkOiAtPlxuICAgICAgICBmb3IgaWQgb2YgYXNzZXRzLmRhdGFcbiAgICAgICAgICAgIHVybCA9IGFzc2V0cy5kYXRhWyBpZCBdXG4gICAgICAgICAgICB0ZXggPSBUSFJFRS5JbWFnZVV0aWxzLmxvYWRUZXh0dXJlIHVybCwgdW5kZWZpbmVkLCBAX29uQ29tcGxldGVcbiAgICAgICAgICAgIHRleC5taW5GaWx0ZXIgPSBUSFJFRS5OZWFyZXN0RmlsdGVyXG4gICAgICAgICAgICBhc3NldHMudGV4dHVyZXNbIGlkIF0gPSB0ZXhcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IExvYWRlclxuIiwiY2xhc3MgRHJ1bmtcblxuICAgIGNvbnN0cnVjdG9yOiAoIEBfZGlyICkgLT5cbiAgICAgICAgQGN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfVxuICAgICAgICBAX2EgPSAwXG5cbiAgICBuZXh0OiAoIHNwZWVkICkgLT5cbiAgICAgICAgc3BlZWQgKz0gTWF0aC5yYW5kb20oKSAqIDEwIC0gNVxuXG4gICAgICAgIEBfYSArPSAxXG4gICAgICAgICMgQF9hICs9IC4xXG4gICAgICAgIEBjdXJyZW50LnggKz0gc3BlZWQgKiBNYXRoLmNvcyBAX2RpciArIEBfYVxuICAgICAgICBAY3VycmVudC55ICs9IHNwZWVkICogTWF0aC5zaW4gQF9kaXIgKyBAX2FcblxubW9kdWxlLmV4cG9ydHMgPSBEcnVua1xuIiwiY2xhc3MgTGluZWFyXG5cbiAgICAjIEBfZGlyIGluIHJhZGlhbnNcbiAgICBjb25zdHJ1Y3RvcjogKCBAX2RpciApIC0+XG4gICAgICAgIEBjdXJyZW50ID0geyB4OiAwLCB5OiAwIH1cblxuICAgIG5leHQ6ICggc3BlZWQgKSAtPlxuICAgICAgICBzcGVlZCArPSBNYXRoLnJhbmRvbSgpICogMTAgLSA1XG4gICAgICAgIEBjdXJyZW50LnggKz0gc3BlZWQgKiBNYXRoLmNvcyBAX2RpclxuICAgICAgICBAY3VycmVudC55ICs9IHNwZWVkICogTWF0aC5zaW4gQF9kaXJcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lYXJcbiIsImNsYXNzIE9wdHNcblxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAc3BlZWQgPSA1MFxuICAgICAgICBAbGlmZSA9IDEwXG5cbm1vZHVsZS5leHBvcnRzID0gT3B0c1xuIiwiY2xhc3MgUGF0aERyYXdlciBleHRlbmRzIFBJWEkuQ29udGFpbmVyXG5cbiAgICBjb25zdHJ1Y3RvcjogKCBjb2xvciA9IDB4ZmYwMGZmICkgLT5cbiAgICAgICAgc3VwZXJcblxuICAgICAgICBAX3BhdGhzID0gW11cbiAgICAgICAgQF9sYXN0cyA9IFtdXG5cbiAgICAgICAgQF9nID0gbmV3IFBJWEkuR3JhcGhpY3NcbiAgICAgICAgQF9nLmxpbmVDb2xvciA9IDBcbiAgICAgICAgQF9nLmxpbmVBbHBoYSA9IDFcbiAgICAgICAgQF9nLmxpbmVXaWR0aCA9IDFcbiAgICAgICAgQGFkZENoaWxkIEBfZ1xuXG4gICAgYWRkOiAoIHBhdGggKSAtPlxuICAgICAgICBAX3BhdGhzLnB1c2ggcGF0aFxuICAgICAgICBAX2xhc3RzLnB1c2ggeyB4OiAwLCB5OiAwIH1cblxuICAgIHVwZGF0ZTogLT5cbiAgICAgICAgZm9yIHBhdGgsIGkgaW4gQF9wYXRoc1xuICAgICAgICAgICAgbGFzdCA9IEBfbGFzdHNbIGkgXVxuICAgICAgICAgICAgY3VycmVudCA9IHBhdGguY3VycmVudFxuXG4gICAgICAgICAgICBAX2cubW92ZVRvIGxhc3QueCwgbGFzdC55XG4gICAgICAgICAgICBAX2cubGluZVRvIGN1cnJlbnQueCwgY3VycmVudC55XG5cbiAgICAgICAgICAgIGxhc3QueCA9IGN1cnJlbnQueFxuICAgICAgICAgICAgbGFzdC55ID0gY3VycmVudC55XG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhdGhEcmF3ZXJcbiIsImNsYXNzIE1vZGlmaWVyXG5cbiAgICBzcGVlZDogKCB2YWx1ZSApIC0+XG4gICAgICAgIHZhbHVlICogLjlcblxuXG5jbGFzcyBTaW51c1xuXG4gICAgY29uc3RydWN0b3I6ICggQF9kaXIgKSAtPlxuICAgICAgICBAY3VycmVudCA9IHsgeDogMCwgeTogMCB9XG5cbiAgICAgICAgQG1vZGlmaWVyID0gbmV3IE1vZGlmaWVyXG5cbiAgICAgICAgQF9hID0gMFxuICAgICAgICBAX2FBZGQgPSBNYXRoLlBJICogKCAuNCAqIE1hdGgucmFuZG9tKCkgKSArIC4xXG4gICAgICAgIEBfYVBlcnAgPSBAX2RpciArIE1hdGguUEkgKiAuNVxuXG4gICAgICAgIEBfcmFkID0gMFxuICAgICAgICBAX3JhZE1heCA9IDE1ICsgTWF0aC5yYW5kb20oKSAqIDI1XG5cbiAgICBuZXh0OiAoIHNwZWVkICkgLT5cbiAgICAgICAgc3BlZWQgKz0gTWF0aC5yYW5kb20oKSAqIDEwIC0gNVxuICAgICAgICBAY3VycmVudC54ICs9IHNwZWVkICogTWF0aC5jb3MoIEBfZGlyICkgKyBAX3JhZCAqIE1hdGguY29zKCBAX2FQZXJwIClcbiAgICAgICAgQGN1cnJlbnQueSArPSBzcGVlZCAqIE1hdGguc2luKCBAX2RpciApICsgQF9yYWQgKiBNYXRoLnNpbiggQF9hUGVycCApXG5cbiAgICAgICAgQF9hICs9IEBfYUFkZFxuICAgICAgICBAX3JhZCA9IEBfcmFkTWF4ICogTWF0aC5jb3MgQF9hXG5cbm1vZHVsZS5leHBvcnRzID0gU2ludXNcbiIsImNsYXNzIFR1cm5pbmdcblxuICAgIGNvbnN0cnVjdG9yOiAoIEBfZGlyICkgLT5cbiAgICAgICAgQGN1cnJlbnQgPSB7IHg6IDAsIHk6IDAgfVxuICAgICAgICBAX2EgPSAwXG4gICAgICAgIEBfYUFkZCA9ICggTWF0aC5QSSAqIDIgKSAqIC4xXG5cbiAgICBuZXh0OiAoIHNwZWVkICkgLT5cbiAgICAgICAgc3BlZWQgKz0gTWF0aC5yYW5kb20oKSAqIDEwIC0gNVxuICAgICAgICBAY3VycmVudC54ICs9IHNwZWVkICogTWF0aC5jb3MgQF9kaXIgKyBAX2FcbiAgICAgICAgQGN1cnJlbnQueSArPSBzcGVlZCAqIE1hdGguc2luIEBfZGlyICsgQF9hXG5cbiAgICAgICAgQF9hICs9IEBfYUFkZFxuICAgICAgICBjb25zb2xlLmxvZyBAX2FcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFR1cm5pbmdcbiIsIm1vZHVsZS5leHBvcnRzLnVuaWZvcm1zID0gLT5cbiAgICByZXR1cm4ge1xuICAgIH1cblxubW9kdWxlLmV4cG9ydHMudmVydGV4ID0gW1xuXG4gICAgXCJwcmVjaXNpb24gbG93cCBmbG9hdDtcIlxuICAgIFxuICAgIFwiYXR0cmlidXRlIHZlYzIgYVZlcnRleFBvc2l0aW9uO1wiXG4gICAgXCJhdHRyaWJ1dGUgdmVjMiBhVGV4dHVyZUNvb3JkO1wiXG4gICAgXCJhdHRyaWJ1dGUgdmVjNCBhQ29sb3I7XCJcblxuICAgIFwidW5pZm9ybSBtYXQzIHByb2plY3Rpb25NYXRyaXg7XCJcblxuICAgIFwidmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7XCJcbiAgICBcInZhcnlpbmcgdmVjNCB2Q29sb3I7XCJcblxuICAgIFwidm9pZCBtYWluKHZvaWQpe1wiXG4gICAgXCIgICBnbF9Qb3NpdGlvbiA9IHZlYzQoKHByb2plY3Rpb25NYXRyaXggKiB2ZWMzKGFWZXJ0ZXhQb3NpdGlvbiwgMS4wKSkueHksIDAuMCwgMS4wKTtcIlxuICAgIFwiICAgdlRleHR1cmVDb29yZCA9IGFUZXh0dXJlQ29vcmQ7XCJcbiAgICBcIiAgIHZDb2xvciA9IHZlYzQoYUNvbG9yLnJnYiAqIGFDb2xvci5hLCBhQ29sb3IuYSk7XCJcbiAgICAnfSdcblxuXS5qb2luIFwiXCJcblxubW9kdWxlLmV4cG9ydHMuZnJhZ21lbnQgPSBbXG5cbiAgICBcInByZWNpc2lvbiBsb3dwIGZsb2F0O1wiXG5cbiAgICBcInZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkO1wiXG4gICAgXCJ2YXJ5aW5nIHZlYzQgdkNvbG9yO1wiXG5cbiAgICBcInVuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyO1wiXG5cbiAgICBcInZvaWQgbWFpbih2b2lkKXtcIlxuICAgIFwiICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4dHVyZUNvb3JkKSAqIHZDb2xvcjtcIlxuICAgIFwifVwiXG5cbl0uam9pbiBcIlwiXG4iXX0=
