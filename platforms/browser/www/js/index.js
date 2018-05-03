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

var regs_1017 = localStorage.getItem('NB1017');
regs_1017 = JSON.parse(regs_1017);
avec1017();

var regs_1035 = localStorage.getItem('NB1035');
regs_1035 = JSON.parse(regs_1035);
if (regs_1035 == null) { regs_1035 = [] };

function localizar_produto(sNumero)
{
    for (var i in regs_1007) {
        var record = JSON.parse(regs_1007[i]);
        if (record.numero == sNumero) { console.log(record.nome) };
    }
}

function validar_usuario(sVendedor,sPass)
{
    var sUsuario_Valido = false;
    sVendedor = sVendedor.trim();
    sPass = sPass.trim();
    
    for (var i in regs_1006) {
        var record = JSON.parse(regs_1006[i]);
        if (record.numero == sVendedor && record.senha == sPass) { sUsuario_Valido = true; }
    }
    return sUsuario_Valido;
}

function avec1017()
{
    if (regs_1017 == null) { 
        regs_1017 = [];
        var record = JSON.stringify({
            versao      :  '1.0'
            });    
        regs_1017.push(record);
        localStorage.setItem('NB1017', JSON.stringify(regs_1017));
        
        regs_1017 = localStorage.getItem('NB1017');
        regs_1017 = JSON.parse(regs_1017);
    };
}

function avec1001(sVendedor)
{
    $.ajax({
        type: 'POST',
        url: 'http://www.asctbinf.com/vendas/phonegap/dados.php',
        dataType: "json",
        data:({"ID"     : "F1001",
               "VEND"   : sVendedor}),
        success: function (data) {
            if (data.nome != "") {
                regs_1001 = [];
                for (var i = 0; i < data.nome.length; i++) {
                    var record = JSON.stringify({
                        cnpj        :  data.cnpj[i],
                        nome        :  data.nome[i],
                        email       :  data.email[i],
                        telefone    :  data.telefone[i],
                        uf          :  data.uf[i]
                    });    
                    regs_1001.push(record);
                }
                localStorage.setItem('NB1001', JSON.stringify(regs_1001));
            }
        },
        error: function(xhr, textStatus, error){
            console.log(error);
            $('#i1006_ErroMsg').html("<strong>Erro.</strong></br>Não foi possivel atualizar os dados. Por favor, verifique sua conexão");
            $('#i1006_Erro').modal('show');
        }
    });
}


function avec1005()
{
    $.ajax({
        type: 'POST',
        url: 'http://www.asctbinf.com/vendas/phonegap/dados.php',
        dataType: "json",
        data:({"ID" :"F1005" }),
        success: function (data) {
            if (data.nome != "") {
                regs_1005 = [];
                for (var i = 0; i < data.nome.length; i++) {
                    var record = JSON.stringify({
                        numero      :  data.numero[i],
                        nome        :  data.nome[i],
                        parcelas    :  data.parcelas[i]
                    });    
                    regs_1005.push(record);
                }
                localStorage.setItem('NB1005', JSON.stringify(regs_1005));
            }
        },
        error: function(xhr, textStatus, error){
            console.log(error);
            $('#i1006_ErroMsg').html("<strong>Erro.</strong></br>Não foi possivel atualizar os dados. Por favor, verifique sua conexão");
            $('#i1006_Erro').modal('show');
        }
    });
}

function avec1007()
{
    $.ajax({
        type: 'POST',
        url: 'http://www.asctbinf.com/vendas/phonegap/dados.php',
        dataType: "json",
        data:({"ID" :"F1007" }),
        success: function (data) {
            if (data.nome != "") {
                regs_1007 = [];
                for (var i = 0; i < data.nome.length; i++) {
                    var record = JSON.stringify({
                        numero      :  data.numero[i],
                        nome        :  data.nome[i],
                        unitario    :  data.unitario[i],
                        qtde_emb    :  data.qtde_emb[i]
                    });    
                    regs_1007.push(record);
                }
                localStorage.setItem('NB1007', JSON.stringify(regs_1007));
            }
        },
        error: function(xhr, textStatus, error){
            console.log(error);
            $('#i1006_ErroMsg').html("<strong>Erro.</strong></br>Não foi possivel atualizar os dados. Por favor, verifique sua conexão");
            $('#i1006_Erro').modal('show');
        }
    });
    //localizar_produto(1300);
}

function avec1035()
{
    $.ajax({
        type: 'POST',
        url: 'http://www.asctbinf.com/vendas/phonegap/dados.php',
        dataType: "json",
        data:({"ID" :"F1035" }),
        success: function (data) {
            if (data.nome != "") {
                regs_1035 = [];
                for (var i = 0; i < data.nome.length; i++) {
                    var record = JSON.stringify({
                        numero  :  data.numero[i],
                        nome    :  data.nome[i],
                        fator   :  data.fator[i]
                    });    
                    regs_1035.push(record);
                }
                localStorage.setItem('NB1035', JSON.stringify(regs_1035));
            }
        },
        error: function(xhr, textStatus, error){
            console.log(error);
            $('#i1006_ErroMsg').html("<strong>Erro.</strong></br>Não foi possivel atualizar os dados. Por favor, verifique sua conexão");
            $('#i1006_Erro').modal('show');
        }
    });
}

/*********************************************************************************************************/
function btnEntrar(e)
{
    var sVendedor = $("#i1006_Numero").val().toUpperCase();
    var sPass = $("#i1006_Senha").val().toUpperCase();
    sValido = (validar_usuario(sVendedor,sPass));
    
    console.log(sValido);
    if (sValido == false) {
        $('#i1006_ErroMsg').html("<strong>Login inválido.</strong></br>Por favor, verifique seu ID Vendedor e Senha");
        $('#i1006_Erro').modal('show');
    } else {
        location.href='dash.html';
    }
}

function btnAcesso(e)
{
    var sVendedor = $("#i1006_Numero").val().toUpperCase();
    var sPass = $("#i1006_Senha").val().toUpperCase();
    
    $.ajax({
        type: 'POST',
        url: 'http://www.asctbinf.com/vendas/phonegap/dados.php',
        dataType: "json",
        data:({"ID"     :"F1",
               "VEND"   : sVendedor,
               "PASS"   : sPass
              }),
        success: function (data) {
            if (data.nome != "") {
                regs_1006 = [];                
                var record = JSON.stringify({
                    numero  :  data.numero,
                    nome    :  data.nome,
                    senha   :  data.senha
                });
                regs_1006.push(record);
                localStorage.setItem('NB1006', JSON.stringify(regs_1006));
                
                avec1001(sVendedor);
                avec1005();
                avec1007();
                avec1035();
                //location.href='dash.html';
            } else {
                $('#i1006_ErroMsg').html("<strong>Login inválido.</strong></br>Por favor, verifique seu ID Vendedor e Senha");
                $('#i1006_Erro').modal('show');
            }
        },
        error: function(xhr, textStatus, error){
            console.log(error);
            $('#i1006_ErroMsg').html("<strong>Erro.</strong></br>Não foi possivel atualizar os dados. Por favor, verifique sua conexão");
            $('#i1006_Erro').modal('show');
        }
    });
}


/********************************/
function test_json()
{
    $.post( "http://www.asctbinf.com/phonegap/cliente.php", { }, function( data ) {
        console.log( data.nome ); // John
    }, "json");
    
    $.ajax({
        type: 'POST',
        url: 'http://www.asctbinf.com/phonegap/cliente.php',
        dataType: "json",
        data:({ }),
        success: function (data) {
            console.log( data.nome + ' Ajax' );
        },
        error: function(xhr, textStatus, error){
            console.log(error);
        }
    });            
 
    var sVendedor = $("#i1006_Numero").val().toUpperCase();
    $.ajax({
        type: 'POST',
        url: 'http://www.asctbinf.com/phonegap/vendedor.php',
        dataType: "json",
        data:({
            "xID"    :   '1',
            "xVend"  :   sVendedor
        }),
        success: function (data) {
            console.log(data.nome);
        },
        error: function(xhr, textStatus, error){
            console.log(error);
        }
    });            
}

function excluir_dados()
{
    regs_1001 = [];
    regs_1005 = [];
    regs_1006 = [];
    regs_1007 = [];
    regs_1017 = [];
    regs_1035 = [];
    localStorage.clear();
}