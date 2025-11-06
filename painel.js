function Painel(context, bulba) {
    this.context = context;
    this.bulba = bulba;
    this.spritesheet = new Spritesheet (context, bulba.imagem, 1, 4);
    this.spritesheet.linha = 0;
    this.spritesheet.coluna = 0;
    this.frameRow = 0;
    this.frameCol = 0;
    this.iconeLargura = 70;
    this.padding = 8;
    this.pontuacao = 0;
}
Painel.prototype = {
    atualizar: function() {

    },
    desenhar: function() {
        var ctx = this.context;
        ctx.save();

        var sheet = this.spritesheet;
        var frameW = sheet.imagem.width / sheet.numColunas;
        var frameH = sheet.imagem.height / sheet.numLinhas;

        // preserva proporção do frame
        var drawW = this.iconeLargura;
        var drawH = Math.round(drawW * (frameH / frameW));

        var x = 20;
        var y = 20;

        // usar sempre o mesmo frame (frameRow, frameCol)
        var sx = this.frameCol * frameW;
        var sy = this.frameRow * frameH;

        for (var i = 0; i < this.bulba.vidasExtras; i++) {
            ctx.drawImage(
                sheet.imagem,
                sx, sy, frameW, frameH,   // source rect (frame fixo)
                x, y, drawW, drawH        // dest rect (tamanho preservando proporção)
            );

            x += drawW + this.padding;
        }
        ctx.restore();

        ctx.save();
        ctx.fillStyle = 'white';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        var padding = 12;
        var scoreX = ctx.canvas.width - padding;
        var scoreY = padding;
        ctx.fillText(this.pontuacao, scoreX, scoreY);
        ctx.restore();
    }
}