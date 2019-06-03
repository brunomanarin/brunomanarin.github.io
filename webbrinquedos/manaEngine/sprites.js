
var Obj = function (name, x, y, size, texture) {
    var me = {
        name: name,
        x: x,
        y: y,
        size: size, // 0..1 (for a 256x256 wall texture)
        texture: texture
    };

    me.distance = function (x, y) {
        return Math.pow(x - me.x, 2) + Math.pow(y - me.y, 2);
    };

    return me;
};

var Objects = function () {
    var me = {
        textures: [],
        objs: []
    };

    me.init = function () {
        var ver = 1, // increase this for refreshing the cache
            i,
            files = ['https://raw.githubusercontent.com/brunomanarin/brunomanarin.github.io/master/pics/waluigi.png'];

        for (i = 0; i < files.length; i++) {
            me.textures[i] = new Image();
            me.textures[i].src = files[i];
        }
    };

    me.add = function (name, x, y, size, texture) {
        me.objs[me.objs.length] = Obj(name, x, y, size, texture);
    };

    me.remove = function (index) {
        delete me.objs[index];
    };

    me.sorted = function (x, y) {
        var o, t = [];
        for (o in me.objs) {
            t[t.length] = {
                obj: me.objs[o],
                dist: me.objs[o].distance(x, y)
            };
        }
        return t.sort(function (a, b) {
            return b.dist - a.dist;
        });
    };

    me.get_texture = function (idx) {
        return me.textures[idx];
    };

    me.init();

    return me;
};