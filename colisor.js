function Colisor() {
    this.sprites = [];
    this.spritesExcluir = [];
    this.aoColidir = null;
}
Colisor.prototype = {
    novoSprite: function (sprite) {
        this.sprites.push(sprite);
        sprite.colisor = this;
    },
    processar: function () {
        for (var i in this.sprites) {
            for (var j in this.sprites) {
                if (i == j) continue;
                
                this.testarColisao(this.sprites[i], this.sprites[j]);
                
            }
        }
        this.processarExclusoes();
    },
    testarColisao: function (sprite1, sprite2) {
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();

        colisoes:
        for (var i in rets1) {
            for (var j in rets2) {
                if (this.retangulosColidem(rets1[i], rets2[j])) {
                    if (typeof this.aoColidir === 'function') {
                        this.aoColidir(sprite1, sprite2);
                    }
                    sprite1.colidiuCom(sprite2);
                    break colisoes;
                }
            }
        }
    },
    retangulosColidem: function (ret1, ret2) {
        return (ret1.x + ret1.largura) > ret2.x &&
               ret1.x < (ret2.x + ret2.largura) &&
               (ret1.y + ret1.altura) > ret2.y &&
               ret1.y < (ret2.y + ret2.altura);
    },
    excluirSprite: function (sprite) {
        this.spritesExcluir.push(sprite);
    },
    processarExclusoes: function () {
        var novoArray = [];
        for (var i in this.sprites) {
            if (this.spritesExcluir.indexOf(this.sprites[i]) == -1) {
                novoArray.push(this.sprites[i]);
            }
        }
        this.spritesExcluir = [];
        this.sprites = novoArray;
    }
}