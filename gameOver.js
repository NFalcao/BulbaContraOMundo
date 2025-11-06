function TelaGameOver(context, pontuacao, tempo) {
    this.context = context;
    this.pontuacao = pontuacao;
    this.tempo = tempo;
}
TelaGameOver.prototype = {
    atualizar: function() {},
    desenhar: function() {
        var ctx = this.context;
        ctx.save();
        
        // Fundo semi-transparente
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Título "GAME OVER"
        ctx.fillStyle = '#FF0000';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', ctx.canvas.width / 2, ctx.canvas.height / 2 - 80);
        ctx.strokeText('GAME OVER', ctx.canvas.width / 2, ctx.canvas.height / 2 - 80);
        
        // Pontuação final
        ctx.font = '28px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText('Pontuação Final: ' + this.pontuacao, ctx.canvas.width / 2, ctx.canvas.height / 2 - 20);
        
        // Tempo de jogo
        var minutos = Math.floor(this.tempo / 60);
        var segundos = this.tempo % 60;
        ctx.fillText(
            'Tempo: ' + (minutos < 10 ? '0' : '') + minutos + ':' + (segundos < 10 ? '0' : '') + segundos,
            ctx.canvas.width / 2,
            ctx.canvas.height / 2 + 20
        );
        
        ctx.restore();
    }
};