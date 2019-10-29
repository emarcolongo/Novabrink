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