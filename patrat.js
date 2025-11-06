function Patrat(context, imagem) {
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;

    this.sheet = new Spritesheet(context, imagem, 1, 4);
    this.sheet.intervalo = 150;
    this.largura = imagem.width / this.sheet.numColunas;
    this.altura = imagem.height / this.sheet.numLinhas;
}
Patrat.prototype = {
    atualizar: function() {
        this.y += this.velocidade;
        if (this.y > this.context.canvas.height) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
        this.sheet.proximoQuadro();
    },
    desenhar: function() {
        this.sheet.desenhar(this.x, this.y);
    },
    retangulosColisao: function() {
        return [{ x: this.x, y: this.y, largura: 29, altura: 29 }];
    },
    colidiuCom: function(outro) {
        if (outro instanceof Tiro && window.imgExplosoes && window.imgExplosoes.length > 0) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);
            var centroX = this.x + this.largura / 2;
            var centroY = this.y + this.altura / 2;
            var explosao = new Explosao(this.context, window.imgExplosoes, centroX, centroY, 
                {
                    largura: this.largura * 1.6,
                    altura: this.altura * 1.6,
                    centralizado: true
            });
            this.animacao.novoSprite(explosao);
        }
    }
}