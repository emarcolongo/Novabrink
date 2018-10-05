/*jslint browser: true*/
/*global $, alert*/

/****** DEFININDO BASES **************************/
var regs_1001 = localStorage.getItem('NB1001');
regs_1001 = JSON.parse(regs_1001);
if (regs_1001 == null) { regs_1001 = [] };

var regs_1005 = localStorage.getItem('NB1005');
regs_1005 = JSON.parse(regs_1005);
if (regs_1005 == null) { regs_1005 = [] };

var regs_1006 = localStorage.getItem('NB1006');
regs_1006 = JSON.parse(regs_1006);
if (regs_1006 == null) { regs_1006 = [] };

var regs_1007 = localStorage.getItem('NB1007');
regs_1007 = JSON.parse(regs_1007);
if (regs_1007 == null) { regs_1007 = [] };

var regs_1011 = localStorage.getItem('NB1011');
regs_1011 = JSON.parse(regs_1011);
if (regs_1011 == null) { regs_1011 = [] };

var regs_1018 = localStorage.getItem('NB1018');
regs_1018 = JSON.parse(regs_1018);
if (regs_1018 == null) { regs_1018 = [] };

var regs_1020 = localStorage.getItem('NB1020');
regs_1020 = JSON.parse(regs_1020);
if (regs_1020 == null) { regs_1020 = [] };

var regs_1035 = localStorage.getItem('NB1035');
regs_1035 = JSON.parse(regs_1035);
if (regs_1035 == null) { regs_1035 = [] };

var regs_1080 = localStorage.getItem('NB1080');
regs_1080 = JSON.parse(regs_1080);
if (regs_1080 == null) { regs_1080 = [] };

/// Excluir Linha da Grade ///////////////////////////////////////////////////////////////
(excluir_linha = function (iLinha) {
    var iPedido  = 0,
        iProduto = 0,
        tr = $(iLinha).closest('tr');
    
    iProduto = tr.find('td[data-numero]').data('numero');
    iPedido  = $('#i1018_Numero').val();

    excluir_1020(iPedido,iProduto);
    grade_1020(iPedido);
});

/// Excluir Itens  ///////////////////////////////////////////////////////////////////////
(excluir_1020 = function (iPedido, iProduto) {
    var index = -1;
    
    for (var i in regs_1020) {
        var record = JSON.parse(regs_1020[i]);
        if (record.pedido == iPedido && record.produto == iProduto) { index = i };
    }
    
    if (index != -1) {
        regs_1020.splice(index,1);
        localStorage.setItem('NB1020',JSON.stringify(regs_1020));
    }
});

/// Exibindo Cond.Pagamento //////////////////////////////////////////////////////////////
(default_1005 = function () {
    for (var i in regs_1005) {
        var data = JSON.parse(regs_1005[i]);
        $('#i1005_Numero').append('<option value="' + data.numero + '" data-parc="' + data.parc + '">' + data.nome + '</option>');
    }
});

/// Exibindo Vendedor ////////////////////////////////////////////////////////////////////
(default_1006 = function () {
    for (var i in regs_1006) {
        var record = JSON.parse(regs_1006[i]);
        $("#i1018_Vendedor").val(record.numero);
    }   
})

// Exibindo Cond.Pagamento //////////////////////////////////////////////////////////////
(default_1011 = function () {
    for (var i in regs_1011) {
        var data = JSON.parse(regs_1011[i]);
        $('#i1011_Cnpj').append('<option value="' + data.cnpj + '">' + data.nome + '</option>');
    }
});


/// Exibindo Tabela de Preco//////////////////////////////////////////////////////////////
(default_1035 = function () {
    for (var i in regs_1035) {
        var data = JSON.parse(regs_1035[i]);
        $('#i1035_Numero').append('<option value="' + data.numero + '" data-fator="' + data.fator + '">' + data.nome + '</option>');
    }
});

/// Validar Cliente //////////////////////////////////////////////////////////////////////
(validar_1001 = function (sCNPJ) {
    var sValida = false;
    
    for (var i in regs_1001) {
        var record = JSON.parse(regs_1001[i]);
        if (record.cnpj == sCNPJ) { sValida = true };
    }
    
    return sValida;
});


/// Funcao para localizar o cliente //////////////////////////////////////////////////////
(default_1001 = function () {
    var sID = $("#i1018_Cliente").val();
    $("#i1001_Nome").val('');
    $("#i1001_Fone").val('');
    $("#i1001_Email").val('');
    $("#i1001_Uf").val('');

    if (formata_cpf_cnpj(sID)) {
        $("#i1018_Cliente").val(formata_cpf_cnpj(sID));
        } else {
            $("#i1018_Cliente").focus();
            alert('CPF ou CNPJ invalidos');
            return;
        }

    sID = $("#i1018_Cliente").val();
    document.getElementById("i1001_Fone").disabled = false;
    document.getElementById("i1001_Email").disabled = false;
    document.getElementById("i1001_Uf").disabled = false;
    document.getElementById("i1001_Nome").disabled = true;
    
    $('#i1001_Nome').val('NAO CADASTRADO');
    $('#i1001_Fone').val('');
    $('#i1001_Email').val('');
    $('#i1001_Uf').val('');
    $('#i1001_Fone').focus();    
    
    for (var i in regs_1001) {
        var record = JSON.parse(regs_1001[i]);
        if (record.cnpj == sID) { 
            $('#i1001_Nome').val(record.nome);
            $('#i1001_Fone').val(record.telefone);
            $('#i1001_Email').val(record.email);
            $('#i1001_Uf').val(record.uf);

            document.getElementById("i1001_Fone").disabled = true;
            document.getElementById("i1001_Email").disabled = true;
            document.getElementById("i1001_Uf").disabled = true;
            $('#i1018_Obs').focus();
        };
    }
});

/// Funcao para localizar o produto //////////////////////////////////////////////////////
(default_1007 = function () {
    var sMsg = '',
        sID = $("#i1020_Prod").val(),
        sNM = "",
        sTB = $("#i1035_Numero option:selected").val(),
        nUN = 0;
    $("#i1007_Nome").val('');
    $("#i1020_Qtde").val('');
    $("#i1020_Preco").val('');
    $("#i1007_Emb").val('');
    
    var fator = $("#i1035_Numero").find(':selected').attr('data-fator');
    console.log(sTB);
    console.log(sID);
    
    for (var x in regs_1080) {
        var rec1080 = JSON.parse(regs_1080[x]);
        if (rec1080.numero == sTB && rec1080.produto == sID) {
            nUN = rec1080.valor;
        }
    }

    for (var i in regs_1007) {
        var record = JSON.parse(regs_1007[i]);
        if (record.numero == sID && nUN != 0) { 
            sNM = record.nome;
            //nUN = record.unitario;
            //nUN = eval(fator*nUN);
            
            $('#i1007_Nome').val(record.nome);
            $('#i1007_Emb').val(record.qtde_emb);
            $('#i1020_Preco').val(nUN);
            $('#i1020_Qtde').focus();
        };
    };
    
    if (sNM == "" || nUN == 0) {
        sMsg = sMsg + '- Produto não localizado nesta tabela de Preço.</br>' ;
        $("#myErroMsg").html(sMsg);
        $('#myError').modal('show');
        //
        $("#i1020_Prod").val('');
        $("#i1007_Nome").val('');
        $("#i1020_Qtde").val('');
        $("#i1020_Preco").val('');
        $("#i1007_Emb").val('');
        $("#i1020_Prod").focus();
    };
});

/// Validar Itens antes de gravar  ////////////////////////////////////////////////
(validar_1020 = function () {
    var sValidar = true,
        sMsg = '',
        nResto = 0,
        iEmb  = $("#i1007_Emb").val().replace(",","."),
        iQtde = $("#i1020_Qtde").val().replace(",",".");
    
    nResto = eval(iQtde % iEmb);

    if ($('#i1018_Vendedor').val() == '')   { sMsg = sMsg + '- Vendedor inválido. Por favor, faça o login novamente.</br>' ; sValidar = false; }
    if ($('#i1001_Nome').val() == '')       { sMsg = sMsg + '- Cliente não informado</br>' ; sValidar = false; }
    if ($('#i1001_Fone').val() == '')       { sMsg = sMsg + '- Telefone não informado</br>' ; sValidar = false; }
    if ($('#i1001_Email').val() == '')      { sMsg = sMsg + '- E-Mail não informado</br>' ; sValidar = false; }
    if ($('#i1001_Uf').val() == '')         { sMsg = sMsg + '- UF não informada</br>' ; sValidar = false; }
    if ($('#i1007_Nome').val() == '')       { sMsg = sMsg + '- Produto não informado</br>' ; sValidar = false; }
    if (iQtde <= 0)                         { sMsg = sMsg + '- Quantidade não informada</br>' ; sValidar = false; }
    if (nResto != 0)                        { sMsg = sMsg + '- Quantidade informada não é Multipla</br>' ; sValidar = false; }
    
    if (sValidar == false) {
        $("#myErroMsg").html(sMsg);
        $('#myError').modal('show');
    }    
    
    return sValidar;
});

/// Funcao para gravar o cliente //////////////////////////////////////////////////
(update_1001 = function (sCNPJ) {
    if (validar_1001(sCNPJ) == false) {
        var i1001 = JSON.stringify({
            cnpj        : $('#i1018_Cliente').val(),
            nome        : $('#i1001_Nome').val(),
            email       : $('#i1001_Email').val(),
            telefone    : $('#i1001_Fone').val(),
            uf          : $('#i1001_Uf').val(),
            status      : 'I'
        });
        regs_1001.push(i1001);
        localStorage.setItem("NB1001", JSON.stringify(regs_1001));
    }
});


/// Funcao para gravar o pedido ///////////////////////////////////////////////////
(default_1018 = function (iPedido) {
    console.log(iPedido);
    var sCNPJ = $('#i1018_Cliente').val(),
        sNome = $('#i1001_Nome').val(),
        dData = new Date(),
        sData = dData.getFullYear() + '.' + (dData.getMonth()+1) + '.' + dData.getDate();
    
    var i1018 = JSON.stringify({
        numero      : iPedido,
        data        : sData,
        cliente     : sCNPJ,
        nome        : sNome,
        vendedor1   : $('#i1018_Vendedor').val(),
        tabela      : $("#i1035_Numero option:selected").val(),
        condicao    : $("#i1005_Numero option:selected").val(),
        desc1       : $('#i1018_Desc1').val(),
        desc2       : $('#i1018_Desc2').val(),
        desc3       : $('#i1018_Desc3').val(),
        total       : '0',
        obs         : $('#i1018_Obs').val(),
        status      : 'A',
        internet    : 'I',
        transportadora  :   $("#i1011_Cnpj option:selected").val()
    });
    regs_1018.push(i1018);
    localStorage.setItem("NB1018", JSON.stringify(regs_1018));
    if (sNome == 'NAO CADASTRADO') { update_1001(sCNPJ) };
    console.log('1018:2');
});

/// Funcao para gravar itens //////////////////////////////////////////////////////
(default_1020 = function () {
    if (validar_1020() == false) { return; }

    var iPedido  = 0,
        iProduto = 0,
        nQtde    = 0,
        nPreco   = 0,
        nTotal   = 0,
        nDesc1   = 0,
        nDesc2   = 0,
        nDesc3   = 0,
        nFator   = 1,
        sNome    = '';
    
    //iPedido  = $("#i1018_Numero").val();
    iProduto = $("#i1020_Prod").val();
    sNome    = $("#i1007_Nome").val();
    nPreco   = $("#i1020_Preco").val().replace(",",".");
    nQtde    = $("#i1020_Qtde").val().replace(",",".");
    nDesc1   = $("#i1018_Desc1").val();
    nDesc2   = $("#i1018_Desc2").val();
    nDesc3   = $("#i1018_Desc3").val();
    
    if (nDesc1 != 0) { nDesc1 = (1-(nDesc1 / 100)) };
    if (nDesc2 != 0) { nDesc2 = (1-(nDesc2 / 100)) };
    if (nDesc3 != 0) { nDesc3 = (1-(nDesc3 / 100)) };
    
    if (nDesc1 != 0) { nFator = (nFator * nDesc1 ) };
    if (nDesc2 != 0) { nFator = (nFator * nDesc2 ) };
    if (nDesc3 != 0) { nFator = (nFator * nDesc3 ) };
    
    nTotal   = eval(nPreco*nQtde*nFator);
        
    if (iPedido == 0) {
        for (var i in regs_1018) {
            var record = JSON.parse(regs_1018[i]);
            if (record.numero > iPedido) { 
                iPedido = record.numero;
            };
        };
    iPedido = eval(iPedido+1);
    default_1018(iPedido);
    //$('#i1018_Numero').val(iPedido);
    };

    excluir_1020(iPedido,iProduto);
    var i1020 = JSON.stringify({
        pedido      : iPedido,
        produto     : iProduto,
        nome        : sNome,
        qtde        : nQtde,
        unitario    : nPreco,
        total       : nTotal,
        status      : ''
    });
    regs_1020.push(i1020);
    localStorage.setItem("NB1020", JSON.stringify(regs_1020));
    
    document.getElementById("i1018_Cliente").disabled = true;
    document.getElementById("i1001_Nome").disabled = true;    
    document.getElementById("i1001_Fone").disabled = true;
    document.getElementById("i1001_Email").disabled = true;
    document.getElementById("i1001_Uf").disabled = true;
    //
    document.getElementById("i1035_Numero").disabled = true; 
    document.getElementById("ibtn_Cliente").disabled = true;
    document.getElementById("i1018_Desc1").disabled = true;
    document.getElementById("i1018_Desc2").disabled = true;
    document.getElementById("i1018_Desc3").disabled = true;
    
    $("#i1020_Prod").val('');
    $("#i1007_Nome").val('');
    $("#i1007_Emb").val('');
    $("#i1020_Qtde").val('');
    $("#i1020_Preco").val('');
    $("#i1020_Prod").focus();
    
    grade_1020(iPedido);
});

/// Listar Itens na tabela ////////////////////////////////////////////////////////
(grade_1020 = function (iPedido) {
    var nTotal = 0,
        nSub   = 0;
    
    $("#i1020_Grid tbody tr").remove();
    for (var i in regs_1020) {
        var record = JSON.parse(regs_1020[i]);
        if (record.pedido == iPedido) {
            nTotal = eval(nTotal + record.total);
            nSub = record.total;
            nSub = nSub.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
            
            var cols = '',
            newRow = $("<tr>");
            cols += '<td data-numero="' + record.produto + '"">' + record.produto + '</td>';
            cols += '<td>' + record.nome + '</td>';
            cols += '<td>' + record.qtde + '</td>';
            cols += '<td>' + nSub + '</td>';
            cols += '<td><button type="button" class="btn btn-danger btn-sm" onclick="excluir_linha(this)">Remover</button></td>';
            cols += '</tr>';
            newRow.append(cols);
            $("#i1020_Grid").append(newRow);
        }
    }
    nTotal = nTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
    $('#i1018_Total').val(nTotal);
})
