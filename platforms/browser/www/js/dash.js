/*jslint browser: true*/
/*global $, alert*/

/****** DEFININDO BASES **************************/
var regs_1018 = localStorage.getItem('NB1018');
regs_1018 = JSON.parse(regs_1018);
if (regs_1018 == null) { regs_1018 = [] };

var regs_1020 = localStorage.getItem('NB1020');
regs_1020 = JSON.parse(regs_1020);
if (regs_1020 == null) { regs_1020 = [] };

var regs_1050 = localStorage.getItem('NB1050');
regs_1050 = JSON.parse(regs_1050);
if (regs_1050 == null) { regs_1050 = [] };

$(document).ready(function($){
    listAll();
    $("#ibtn_Excluir").click(function() { excluir_pedidos(); });    
});

function listAll(e)
{
    var nTotal = 0,
        nItens = 0;
    
    $("#i1018_Grid tbody tr").remove();
    
    for (var i in regs_1018) {
        var i1018 = JSON.parse(regs_1018[i]);
        nTotal = 0;
        nItens = 0;
        
        if (i1018.internet == 'I') {
            for (var x in regs_1020) {
                var i1020 = JSON.parse(regs_1020[x]);
                if (i1020.pedido == i1018.numero) { nTotal = eval(i1020.total+nTotal); nItens = (nItens + 1) };
            }
            include_line(i1018.numero,i1018.cliente,i1018.nome,nItens,nTotal,i1018.tipo);
        }
    }
}

function include_line(numero,cliente,nome,itens,total,tipo)
{
    total = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
    var spedido = numero.toString();
    if (spedido.length == 1) { spedido = "00" + spedido; }
    if (spedido.length == 2) { spedido = "0" + spedido; }
    spedido = spedido + "-" +tipo.toUpperCase();
    
    var cols = '',
    newRow = $("<tr>");
    cols += '<td data-numero="'+ numero +'">'+spedido+'</td>';
    cols += '<td>' + cliente + '</td>';
    cols += '<td>' + nome + '</td>';
    cols += '<td>' + itens + '</td>';
    cols += '<td>' + total + '</td>';
    cols += '<td><button type="button" class="btn btn-success btn-sm" onclick="editar_linha(this)">Alterar</button></td>';
    cols += '<td><button type="button" class="btn btn-danger btn-sm" onclick="cancelar_linha(this)">Cancelar</button></td>';
    cols += '</tr>';
    newRow.append(cols);
    $('#i1018_Grid').append(newRow);
}

function cancelar_linha(iLinha) {
    var iPedido  = 0,
        iProduto = 0,
        tr = $(iLinha).closest('tr');
    
    iPedido = tr.find('td[data-numero]').data('numero');
    
    for (var x in regs_1018) {
        var record = JSON.parse(regs_1018[x]);
        if (record.numero == iPedido) { 
            regs_1018[x] = JSON.stringify({
                numero          : record.numero,
                data            : record.data,
                cliente         : record.cliente,
                nome            : record.nome,
                vendedor1       : record.vendedor1,
                tabela          : record.tabela,
                condicao        : record.condicao,
                desc1           : record.desc1,
                desc2           : record.desc2,
                desc3           : record.desc3,
                total           : record.total,
                obs             : record.obs,
                status          : record.status,
                internet        : 'C',
                transportadora  : record.transportadora
            });
            localStorage.setItem("NB1018",JSON.stringify(regs_1018));
        }
    }
    listAll();

}

function editar_linha(iLinha) {
    var iPedido  = 0,
        tr = $(iLinha).closest('tr');
    
    regs_1050 = [];    
    localStorage.setItem('NB1050', JSON.stringify(regs_1050));    
    iPedido = tr.find('td[data-numero]').data('numero');
    
    regs_1050[0] = JSON.stringify({
        numero : iPedido
    });
    localStorage.setItem("NB1050",JSON.stringify(regs_1050));    
    location.href='pedido.html';
}

function excluir_pedidos() {
    var new_array_1018 = [];
    var new_array_1020 = [];

    for (var y in regs_1018) {
        var i1018_tmp = JSON.parse(regs_1018[y]);
        if (i1018_tmp.tipo == "O") {
            for (var x in regs_1020) {
                var i1020_tmp = JSON.parse(regs_1020[x]);       
                if (i1020_tmp.pedido == i1018_tmp.numero) {
                    var i1020 = JSON.stringify({
                        pedido      : i1020_tmp.pedido,
                        produto     : i1020_tmp.produto,
                        nome        : i1020_tmp.nome,
                        qtde        : i1020_tmp.qtde,
                        unitario    : i1020_tmp.unitario,
                        total       : i1020_tmp.total,
                        status      : i1020_tmp.status
                    });
                    new_array_1020.push(i1020);
                }
            }    
        }
    }
    
    if (new_array_1020.length > 0) {
        regs_1020 = [];
        localStorage.setItem('NB1020', JSON.stringify(regs_1020));
    
        regs_1020 = new_array_1020;
        localStorage.setItem('NB1020', JSON.stringify(regs_1020));
    }
    
    for (var x in regs_1018) {
        var i1018_tmp = JSON.parse(regs_1018[x]);
        if (i1018_tmp.tipo == "O") {
            var i1018 = JSON.stringify({
                numero      : i1018_tmp.numero,
                data        : i1018_tmp.data,
                cliente     : i1018_tmp.cliente,
                nome        : i1018_tmp.nome,
                vendedor1   : i1018_tmp.vendedor1,
                tabela      : i1018_tmp.tabela,
                condicao    : i1018_tmp.condicao,
                desc1       : i1018_tmp.desc1,
                desc2       : i1018_tmp.desc2,
                desc3       : i1018_tmp.desc3,
                total       : i1018_tmp.total,
                obs         : i1018_tmp.obs,
                status      : i1018_tmp.status,
                internet    : i1018_tmp.internet,
                transportadora  :   i1018_tmp.transportadora,
                tipo            :   i1018_tmp.tipo,
                pedido_cliente  :   i1018_tmp.pedido_cliente,
                porc_pola       :   i1018_tmp.porc_pola
            });
            new_array_1018.push(i1018);
        }
    }
    if (new_array_1018.length > 0) {
        regs_1018 = [];
        localStorage.setItem('NB1018', JSON.stringify(regs_1018));
        
        regs_1018 = new_array_1018;
        localStorage.setItem('NB1018', JSON.stringify(regs_1018));
    }
    
    listAll();
}