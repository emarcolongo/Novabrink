/*jslint browser: true*/
/*global $, alert*/

/****** DEFININDO BASES **************************/
var regs_1018 = localStorage.getItem('NB1018');
regs_1018 = JSON.parse(regs_1018);
if (regs_1018 == null) { regs_1018 = [] };

var regs_1020 = localStorage.getItem('NB1020');
regs_1020 = JSON.parse(regs_1020);
if (regs_1020 == null) { regs_1020 = [] };

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
            include_line(i1018.numero,i1018.cliente,i1018.nome,nItens,nTotal);
        }
    }
}

function include_line(numero,cliente,nome,itens,total)
{
    total = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
    
    var cols = '',
    newRow = $("<tr>");
    cols += '<td data-numero="'+ numero +'">'+numero+'</td>';
    cols += '<td>' + cliente + '</td>';
    cols += '<td>' + nome + '</td>';
    cols += '<td>' + itens + '</td>';
    cols += '<td>' + total + '</td>';
    cols += '</tr>';
    newRow.append(cols);
    $('#i1018_Grid').append(newRow);
}