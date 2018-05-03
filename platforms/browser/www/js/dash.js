/*jslint browser: true*/
/*global $, alert*/

/****** DEFININDO BASES **************************/
var regs_1007 = localStorage.getItem('NB1007');
regs_1007 = JSON.parse(regs_1007);
if (regs_1007 == null) { regs_1007 = [] };

function listAll(e)
{
    for (var i in regs_1007) {
        var record = JSON.parse(regs_1007[i]);
        include_line(record.numero,record.nome);
    }
}

function include_line(numero,nome)
{
    var cols = '',
    newRow = $("<tr>");
    cols += '<td data-recnum="'+ numero +'">'+numero+'</td>';
    cols += '<td>' + nome + '</td>';
    cols += '</tr>';
    newRow.append(cols);
    $('#grid_1007').append(newRow);
}
