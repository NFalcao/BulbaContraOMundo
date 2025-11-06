function Bulba(context, teclado, imagem) {
    this.context = context;
    this.teclado = teclado;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.imagem = imagem;

    // Spritesheet: 1 linha, 4 colunas
    this.sheet = new Spritesheet(context, imagem, 1, 4);
    this.sheet.intervalo = 100;

    this.andando = false;
    this.acabaramVidas = null;
    this.vidasExtras = 3;
    // Adicionando cooldown ao tiro
    this.tempoUltimoTiro = 0;
    this.cooldownTiro = 200;
}

Bulba.prototype = {
    atualizar: function() {
        var incremento = this.velocidade * this.animacao.decorrido / 1000;
        this.andando = false;

        if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0) {
            this.x -= incremento;
            this.andando = true;
        }
        if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - (this.sheet.imagem.width / this.sheet.numColunas)) {
            this.x += incremento;
            this.andando = true;
        }
        if (this.teclado.pressionada(SETA_CIMA) && this.y > 0) {
            this.y -= incremento;
            this.andando = true;
        }
        if (this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - (this.sheet.imagem.height / this.sheet.numLinhas)) {
            this.y += incremento;
            this.andando = true;
        }

        if (this.andando) {
            this.sheet.linha = 0; // única linha
            this.sheet.proximoQuadro();
        } else {
            this.sheet.linha = 0;
            this.sheet.coluna = 0; // parado no primeiro quadro
        }
    },
    desenhar: function() {
        this.sheet.desenhar(this.x, this.y);
    },
    atirar: function() {
        var agora = new Date().getTime();
        if (agora - this.tempoUltimoTiro < this.cooldownTiro) {
            return;
        }
        this.tempoUltimoTiro = agora;

        var t = new Tiro(this.context, this, window.imgFolha);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
    },
    posicionar: function() {
        var canvas = this.context.canvas;
        this.x = this.context.canvas.width / 2 - (this.sheet.imagem.width / this.sheet.numColunas) / 2;
        this.y = this.context.canvas.height - this.sheet.imagem.height;
    },
    retangulosColisao: function() {
        return [{ x: this.x, y: this.y, largura: 51, altura: 59 }];
    },
    colidiuCom: function(outro) {
        if (outro instanceof Patrat) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            
            var bulba = this;
            var explosao = new Explosao(this.context, 
                window.imgExplosoes,
                this.x + this.sheet.imagem.width/8, 
                this.y + this.sheet.imagem.height/2,
                {
                    largura: this.sheet.imagem.width/2,
                    altura: this.sheet.imagem.height,
                    centralizado: true
                },
                function() {
                    bulba.vidasExtras--;
                    if (bulba.vidasExtras <= 0) {
                        if (bulba.acabaramVidas) bulba.acabaramVidas();
                    } else {
                        bulba.colisor.novoSprite(bulba);
                        bulba.animacao.novoSprite(bulba);
                        bulba.posicionar();
                    }
                }
            );
            
            this.animacao.novoSprite(explosao);
        }
    }
}