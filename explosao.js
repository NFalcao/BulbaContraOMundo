var SOM_EXPLOSAO = new Audio();
SOM_EXPLOSAO.src = 'snd/explosao.mp3';
SOM_EXPLOSAO.volume = 0.4;
SOM_EXPLOSAO.load();


function Explosao(context, imagens, x, y, opcoes, fimDaExplosao) {
    this.context = context;
    this.imagens = imagens;
    this.x = x;
    this.y = y;
    this.frameAtual = 0;
    this.tempoUltimoQuadro = 0;
    this.intervalo = 75;
    this.fimDaExplosao = fimDaExplosao;
    this.opcoes = opcoes || {};
    // opções suportadas: escala (multiplicador), largura, altura, centralizado (booleano)
    this.escala = typeof this.opcoes.escala === 'number' ? this.opcoes.escala : 1;
    this.forcarLargura = this.opcoes.largura || null;
    this.forcarAltura = this.opcoes.altura || null;
    this.centralizado = !!this.opcoes.centralizado;
    SOM_EXPLOSAO.currentTime = 0.0;
    SOM_EXPLOSAO.play();
}
Explosao.prototype = {
    atualizar: function() {
        var agora = new Date().getTime();

        if (!this.tempoUltimoQuadro) {
            this.tempoUltimoQuadro = agora;
            return;
        }

        if (agora - this.tempoUltimoQuadro < this.intervalo) return;
        this.frameAtual++;

        if (this.frameAtual >= this.imagens.length) {
            this.animacao.excluirSprite(this);
            if (this.fimDaExplosao) this.fimDaExplosao();
            return;
        }
        this.tempoUltimoQuadro = agora;
    },
    desenhar: function() {
        var img = this.imagens[this.frameAtual];
        if (!img) return;
        var drawW = this.forcarLargura || (img.width * this.escala);
        var drawH = this.forcarAltura || (img.height * this.escala);

        var drawX = this.x;
        var drawY = this.y;
        if (this.centralizado) {
            drawX = Math.round(this.x - drawW / 2);
            drawY = Math.round(this.y - drawH / 2);
        }

        this.context.drawImage(img, drawX, drawY, drawW, drawH);
    }
}