var SOM_TIRO = new Audio();
SOM_TIRO.src = 'snd/tiro.mp3';
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();

function Tiro(context, bulba, imagem)  {
    this.context = context;
    this.bulba = bulba;
    this.imagem = imagem;
    this.largura = 32;
    this.altura = 32;
    this.x = bulba.x + (bulba.sheet.imagem.width / bulba.sheet.numColunas) / 2 - this.largura / 2;
    this.y = bulba.y - this.altura;
    this.velocidade = 11;
    this.angulo = 0;
    SOM_TIRO.currentTime = 0.0;
    SOM_TIRO.play();
}
Tiro.prototype = {
    atualizar: function() {
        this.y -= this.velocidade;
        if (this.y < -this.altura) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
        this.angulo += 0.2; // Faz a folha rodar
    },
    desenhar: function() {
        var ctx = this.context;
        ctx.save();
        ctx.translate(this.x + this.largura / 2, this.y + this.altura / 2);
        ctx.rotate(this.angulo);
        ctx.drawImage(this.imagem, -this.largura / 2, -this.altura / 2, this.largura, this.altura);
        ctx.restore();
    },
    retangulosColisao: function() {
        return [{ x: this.x, y: this.y, largura: this.largura + 5, altura: this.altura }];
    },
    colidiuCom: function(outro) {
        if (outro instanceof Patrat) {
        }
    }   
}