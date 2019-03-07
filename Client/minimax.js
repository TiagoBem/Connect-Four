///////////////////////////////////////////////////////////////////////////////////////////////
//                                                        ___                                //
//                 ||\\//||  ||  ||\\ ||  ||  ||\\//||  ||   ||  \\//                        //
//                 ||    ||  ||  || \\||  ||  ||    ||  ||___||   \\                         //
//                 ||    ||  ||  ||  \\|  ||  ||    ||  ||   ||  //\\                        //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////



var tabuleiro = (function () {
    function tabuleiro() {
        this.m = null;
        this.depth = 0;
        this.utilidade = 0;
        this.jogada = 0;
        this.m = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
            return undefined;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([6, 7]);
        this.depth = 0;
        this.utilidade = 0;
        this.jogada = -1;
    }
    return tabuleiro;
}());
tabuleiro["__class"] = "tabuleiro";
var jogo = (function () {
    function jogo() {
    }
    /*
    jogo.criatabuleiro = function (n, s) {
        var n2 = new tabuleiro();
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 7; j++) {
                n2.m[i][j] = n.m[i][j];
            }
            ;
            n2.depth = n.depth + 1;
            n2.utilidade = 0;
            n2.jogada = s;
        }
        ;
        return n2;
    };
    jogo.verificavertical = function (n, x, y) {
        var contador = 0;
        var contx = 0;
        var conto = 0;
        for (var i = x; i < x + 4; i++) {
            if (i < 6) {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[i][y]) == 'X'.charCodeAt(0))
                    contx++;
                else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[i][y]) == 'O'.charCodeAt(0))
                    conto++;
                contador++;
            }
        }
        ;
        if (contador === 4) {
            if (contx === 0 && conto !== 0) {
                if (conto === 1)
                    return -1;
                else if (conto === 2)
                    return -10;
                else if (conto === 3)
                    return -50;
            }
            else if (conto === 0 && contx !== 0) {
                if (contx === 1)
                    return 1;
                else if (contx === 2)
                    return 10;
                else if (contx === 3)
                    return 50;
            }
        }
        return 0;
    };
    jogo.verificavertical2 = function (n, x, y) {
        var contx = 0;
        var conto = 0;
        for (var i = x; i < x + 4; i++) {
            if (i < 6) {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[i][y]) == 'X'.charCodeAt(0))
                    contx++;
                else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[i][y]) == 'O'.charCodeAt(0))
                    conto++;
            }
        }
        ;
        if (contx === 4)
            return 512;
        else if (conto === 4)
            return -512;
        else
            return 0;
    };
    jogo.verificahorizontal = function (n, x, y) {
        var contador = 0;
        var contx = 0;
        var conto = 0;
        for (var i = y; i < y + 4; i++) {
            if (i < 7) {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'X'.charCodeAt(0))
                    contx++;
                else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'O'.charCodeAt(0))
                    conto++;
                contador++;
            }
        }
        ;
        if (contador === 4) {
            if (contx === 0 && conto !== 0) {
                if (conto === 1)
                    return -1;
                else if (conto === 2)
                    return -10;
                else if (conto === 3)
                    return -50;
            }
            if (conto === 0 && contx !== 0) {
                if (contx === 1)
                    return 1;
                else if (contx === 2)
                    return 10;
                else if (contx === 3)
                    return 50;
            }
        }
        return 0;
    };
    jogo.verificahorizontal2 = function (n, x, y) {
        var contx = 0;
        var conto = 0;
        for (var i = y; i < y + 4; i++) {
            if (i < 7) {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'X'.charCodeAt(0))
                    contx++;
                else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'O'.charCodeAt(0))
                    conto++;
            }
        }
        ;
        if (contx === 4)
            return 512;
        else if (conto === 4)
            return -512;
        else
            return 0;
    };
    jogo.verificadiagonal = function (n, x, y) {
        var contador = 0;
        var contx = 0;
        var conto = 0;
        for (var i = y; i < y + 4; i++) {
            if (i < 7 && x < 6) {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'X'.charCodeAt(0))
                    contx++;
                else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'O'.charCodeAt(0))
                    conto++;
                contador++;
            }
            x++;
        }
        ;
        if (contador === 4) {
            if (contx === 0 && conto !== 0) {
                if (conto === 1)
                    return -1;
                else if (conto === 2)
                    return -10;
                else if (conto === 3)
                    return -50;
            }
            if (conto === 0 && contx !== 0) {
                if (contx === 1)
                    return 1;
                else if (contx === 2)
                    return 10;
                else if (contx === 3)
                    return 50;
            }
        }
        return 0;
    };
    jogo.verificadiagonal2 = function (n, x, y) {
        var contador = 0;
        var contx = 0;
        var conto = 0;
        for (var i = y; i > y - 4; i--) {
            if (i >= 0 && x < 6) {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'X'.charCodeAt(0))
                    contx++;
                else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'O'.charCodeAt(0))
                    conto++;
                contador++;
            }
            x++;
        }
        ;
        if (contador === 4) {
            if (contx === 0 && conto !== 0) {
                if (conto === 1)
                    return -1;
                else if (conto === 2)
                    return -10;
                else if (conto === 3)
                    return -50;
            }
            if (conto === 0 && contx !== 0) {
                if (contx === 1)
                    return 1;
                else if (contx === 2)
                    return 10;
                else if (contx === 3)
                    return 50;
            }
        }
        return 0;
    };
    jogo.verificadiagonal3 = function (n, x, y) {
        var contx = 0;
        var conto = 0;
        for (var i = y; i < y + 4; i++) {
            if (i < 7 && x < 6) {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'X'.charCodeAt(0))
                    contx++;
                else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'O'.charCodeAt(0))
                    conto++;
            }
            x++;
        }
        ;
        if (contx === 4)
            return 512;
        else if (conto === 4)
            return -512;
        else
            return 0;
    };
    jogo.verificadiagonal4 = function (n, x, y) {
        var contx = 0;
        var conto = 0;
        for (var i = y; i > y - 4; i--) {
            if (i >= 0 && x < 6) {
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'X'.charCodeAt(0))
                    contx++;
                else if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[x][i]) == 'O'.charCodeAt(0))
                    conto++;
            }
            x++;
        }
        ;
        if (contx === 4)
            return 512;
        else if (conto === 4)
            return -512;
        else
            return 0;
    };
    */

    jogo.inicial_$LI$ = function () { if (jogo.inicial == null)
        jogo.inicial = (function (dims) { var allocate = function (dims) { if (dims.length == 0) {
            return undefined;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([7, 6]); return jogo.inicial; };
    ;
    jogo.fazerinicial = function (n) {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 7; j++) {
                n.m[i][j] = '-';
            }
            ;
        }
        ;
        return n;
    };

    jogo.estado_de_vitoria = function (n) {
        estado_de_jogo();
    };

    jogo.quemganha = function (n) {
        var c;
        if ((c = jogo.estado_de_vitoria(n)) !== 0) {
            return c;
        }
        else if (jogo.jogocompleto(n))
            return 0;
        else if (n.depth >= 6)
            return 1;
        else
            return -1;
    };
    jogo.jogocompleto = function (n) {
        for (var i = 0; i < 7; i++) {
            if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[0][i]) == '-'.charCodeAt(0))
                return false;
        }
        ;
        return true;
    };
    jogo.ocupado = function (n, jogada) {
        if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[0][jogada]) != '-'.charCodeAt(0))
            return true;
        return false;
    };
    jogo.valormin = function (n) {
        var val = jogo.quemganha(n);
        if (val !== -1) {
            if (val === 1) {
                var u = jogo.utilidade(n);
                return u;
            }
            else
                return val;
        }
        var v = Number.MAX_VALUE;
        for (var j = 6; j >= 0; j--)
            for (var i = 5; i >= 0; i--) {
                var k = jogo.criatabuleiro(n, j);
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[i][j]) == '-'.charCodeAt(0)) {
                    k.m[i][j] = 'O';
                    v = Math.min(v, jogo.valormax(k));
                    break;
                }
            }
        ;
        ;
        return v;
    };
    jogo.utilidade = function (n) {
        var valor = 0;
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 7; j++) {
                var hor = jogo.verificahorizontal(n, i, j);
                var ver = jogo.verificavertical(n, i, j);
                var diag = jogo.verificadiagonal(n, i, j);
                var diag2 = jogo.verificadiagonal2(n, i, j);
                valor += hor + ver + diag + diag2;
            }
            ;
        }
        ;
        return valor;
    };
    jogo.modifica = function (n, jogada, jogador) {
        for (var i = 5; i >= 0; i--) {
            if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[i][jogada]) == '-'.charCodeAt(0)) {
                n.m[i][jogada] = jogador;
                break;
            }
        }
        ;
        return n;
    };
    jogo.valormax = function (n) {
        var val = jogo.quemganha(n);
        if (val !== -1) {
            if (val === 1) {
                var u = jogo.utilidade(n);
                return u;
            }
            else
                return val;
        }
        var v = Number.MIN_VALUE;
        for (var j = 6; j >= 0; j--) {
            for (var i = 5; i >= 0; i--) {
                var k = jogo.criatabuleiro(n, j);
                if ((function (c) { return c.charCodeAt == null ? c : c.charCodeAt(0); })(n.m[i][j]) == '-'.charCodeAt(0)) {
                    k.m[i][j] = 'X';
                    var v2 = void 0;
                    v2 = Math.max(v, jogo.valormin(k));
                    if (v !== v2) {
                        k.utilidade = v2;
                        v = v2;
                        jogo.testeutilidade = v2;
                        if (k.depth === 1) {
                            jogo.proximajogada = k.jogada;
                        }
                    }
                    break;
                }
            }
            ;
        }
        ;
        return v;
    };
    jogo.minimax = function (n) {
        var l;
        l = jogo.valormax(n);
    };
    return jogo;
}());
jogo.testeutilidade = 0;
jogo.proximajogada = -1;
jogo["__class"] = "jogo";
jogo.inicial_$LI$();
