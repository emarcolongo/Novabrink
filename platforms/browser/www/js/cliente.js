/*jslint browser: true*/
/*global $, alert*/

/****** DEFININDO BASES **************************/
var regs_1001 = localStorage.getItem('NB1001');
regs_1001 = JSON.parse(regs_1001);
if (regs_1001 == null) { regs_1001 = [] };

var regs_1002 = localStorage.getItem('NB1002');
regs_1002 = JSON.parse(regs_1002);
if (regs_1002 == null) { regs_1002 = [] };

$(document).ready(function($){
    default_1002();
    aplicar_mascara();
    $("#i1001_Cnpj").focus();    
    $("#i1001_Cnpj").blur(function(){ formatar_cnpj(); });  
    $("#ibtn_Cob").click(function() { dados_cobranca(); });    
    $("#ibtn_Ent").click(function() { dados_entrega(); });    
    $("#ibtn_Inserir").click(function() { update_1001(); });
});

/// Exibindo Cond.Pagamento //////////////////////////////////////////////////////////////
(default_1002 = function () {
    for (var i in regs_1002) {
        var data = JSON.parse(regs_1002[i]);
        $('#i1002_Numero').append('<option value="' + data.numero + '" data-numero="' + data.numero + '">' + data.nome + '</option>');
    }
});

/// Validando cliente //////////////////////////////////////////////////
(validar_1001 = function () {
    var sValida = true;
    var sMsg    = '';

    if ($('#i1001_End_Cob').val()   == "") { dados_cobranca(); }
    if ($('#i1001_End_Ent').val()   == "") { dados_entrega(); }
    if ($('#i1001_Fantasia').val()  == "") { $('#i1001_Fantasia').val($('#i1001_Nome').val()) }
    if ($('#i1001_Inscricao').val() == "") { $('#i1001_Inscricao').val("ISENTO"); }
    
    for (var i in regs_1001) {
        var record = JSON.parse(regs_1001[i]);
        if (record.cnpj == $('#i1001_Cnpj').val()) { sMsg = sMsg + '- Cliente já Cadastrado</br>' ; sValida = false; }
    }
    if ($('#i1001_Nome').val() == "") { sMsg = sMsg + '- Razão Social não informado</br>' ; sValida = false; }
    if ($('#i1001_Email').val() == "") { sMsg = sMsg + '- E-Mail não informado</br>' ; sValida = false; }
    if ($('#i1001_Telefone').val() == "") { sMsg = sMsg + '- Telefone não informado</br>' ; sValida = false; }
    if ($("#i1002_Numero option:selected").val() == "") { sMsg = sMsg + '- Ramo de Atividade não informado</br>' ; sValida = false; }
    //
    if ($('#i1001_End_Fat').val() == "") { sMsg = sMsg + '- Endereço de Faturamento não informado</br>' ; sValida = false; }
    if ($('#i1001_Nro_Fat').val() == "") { sMsg = sMsg + '- Numero de Faturamento não informado</br>' ; sValida = false; }
    if ($('#i1001_Bai_Fat').val() == "") { sMsg = sMsg + '- Bairro de Faturamento não informado</br>' ; sValida = false; }
    if ($('#i1001_Cid_Fat').val() == "") { sMsg = sMsg + '- Cidade de Faturamento não informado</br>' ; sValida = false; }
    if ($('#i1001_Est_Fat').val() == "") { sMsg = sMsg + '- Estado de Faturamento não informado</br>' ; sValida = false; }
    if ($('#i1001_Cep_Fat').val() == "") { sMsg = sMsg + '- Cep de Faturamento não informado</br>' ; sValida = false; }
    
    if ($('#i1001_End_Cob').val() == "") { sMsg = sMsg + '- Endereço de Cobrança não informado</br>' ; sValida = false; }
    if ($('#i1001_Nro_Cob').val() == "") { sMsg = sMsg + '- Numero de Cobrança não informado</br>' ; sValida = false; }
    if ($('#i1001_Bai_Cob').val() == "") { sMsg = sMsg + '- Bairro de Cobrança não informado</br>' ; sValida = false; }
    if ($('#i1001_Cid_Cob').val() == "") { sMsg = sMsg + '- Cidade de Cobrança não informado</br>' ; sValida = false; }
    if ($('#i1001_Est_Cob').val() == "") { sMsg = sMsg + '- Estado de Cobrança não informado</br>' ; sValida = false; }
    if ($('#i1001_Cep_Cob').val() == "") { sMsg = sMsg + '- Cep de Cobrança não informado</br>' ; sValida = false; }
    
    if ($('#i1001_End_Ent').val() == "") { sMsg = sMsg + '- Endereço de Entrega não informado</br>' ; sValida = false; }
    if ($('#i1001_Nro_Ent').val() == "") { sMsg = sMsg + '- Numero de Entrega não informado</br>' ; sValida = false; }
    if ($('#i1001_Bai_Ent').val() == "") { sMsg = sMsg + '- Bairro de Entrega não informado</br>' ; sValida = false; }
    if ($('#i1001_Cid_Ent').val() == "") { sMsg = sMsg + '- Cidade de Entrega não informado</br>' ; sValida = false; }
    if ($('#i1001_Est_Ent').val() == "") { sMsg = sMsg + '- Estado de Entrega não informado</br>' ; sValida = false; }
    if ($('#i1001_Cep_Ent').val() == "") { sMsg = sMsg + '- Cep de Entrega não informado</br>' ; sValida = false; }
    
    if (sValida == false) {
        $("#myErroMsg").html(sMsg);
        $('#myError').modal('show');
        $("#i1001_Cnpj").focus();        
    }
    return sValida;
});

/// Funcao para gravar o cliente //////////////////////////////////////////////////
(update_1001 = function () {
    if (validar_1001() == true) {
        var i1001 = JSON.stringify({
            cnpj        : $('#i1001_Cnpj').val(),
            nome        : $('#i1001_Nome').val(),
            fantasia    : $('#i1001_Fantasia').val(),
            inscricao   : $('#i1001_Inscricao').val(),
            email       : $('#i1001_Email').val(),
            telefone    : $('#i1001_Telefone').val(),
            ramo        : $("#i1002_Numero option:selected").val(),
            end_fat     : $('#i1001_End_Fat').val(),
            nro_fat     : $('#i1001_Nro_Fat').val(),
            bai_fat     : $('#i1001_Bai_Fat').val(),
            cid_fat     : $('#i1001_Cid_Fat').val(),
            est_fat     : $('#i1001_Est_Fat').val(),
            cep_fat     : $('#i1001_Cep_Fat').val(),
            compl_fat   : $('#i1001_Compl_Fat').val(),
            end_cob     : $('#i1001_End_Cob').val(),
            nro_cob     : $('#i1001_Nro_Cob').val(),
            bai_cob     : $('#i1001_Bai_Cob').val(),
            cid_cob     : $('#i1001_Cid_Cob').val(),
            est_cob     : $('#i1001_Est_Cob').val(),
            cep_cob     : $('#i1001_Cep_Cob').val(),
            compl_cob   : $('#i1001_Compl_Cob').val(),
            end_ent     : $('#i1001_End_Ent').val(),
            nro_ent     : $('#i1001_Nro_Ent').val(),
            bai_ent     : $('#i1001_Bai_Ent').val(),
            cid_ent     : $('#i1001_Cid_Ent').val(),
            est_ent     : $('#i1001_Est_Ent').val(),
            cep_ent     : $('#i1001_Cep_Ent').val(),
            compl_ent   : $('#i1001_Compl_Ent').val(),
            status      :  'I'            
        });
        regs_1001.push(i1001);
        localStorage.setItem("NB1001", JSON.stringify(regs_1001));
    }
});

/// Aplicar Mascara  //////////////////////////////////////////////////////////////
function aplicar_mascara()
{
    $("#i1001_Cep_Fat").mask("00000-000");
    $("#i1001_Cep_Cob").mask("00000-000");
    $("#i1001_Cep_Ent").mask("00000-000");
    //
    $("#i1001_Telefone").mask("(00) 0000-00009");
    $("#i1001_Telefone").blur(function(event){
        if ($(this).val().length == 15) {
            $("#i1001_Telefone").mask("(00) 00000-0009");
        } else {
            $("#i1001_Telefone").mask("(00) 0000-00009");
        }
    })
}

/// Formatar CNPJ //////////////////////////////////////////////////////////////
function formatar_cnpj()
{
    var sID = $("#i1001_Cnpj").val();
    if (sID === "") { return; }
    if (sID.length < 11) { return; }    
    
    if (formata_cpf_cnpj(sID)) {
        $("#i1001_Cnpj").val(formata_cpf_cnpj(sID));
        } else {
            $("#i1001_Cnpj").focus();
            $("#myErroMsg").html('CPF ou CNPJ invalidos');
            $('#myError').modal('show');
            return;
        }
}

/// Copiar Dados da Entrega //////////////////////////////////////////////////////////////
function dados_cobranca()
{
    $('#i1001_Cep_Cob').val($('#i1001_Cep_Fat').val());
    $('#i1001_End_Cob').val($('#i1001_End_Fat').val());
    $('#i1001_Nro_Cob').val($('#i1001_Nro_Fat').val());
    $('#i1001_Bai_Cob').val($('#i1001_Bai_Fat').val());
    $('#i1001_Cid_Cob').val($('#i1001_Cid_Fat').val());
    $('#i1001_Est_Cob').val($('#i1001_Est_Fat').val());
    $('#i1001_Compl_Cob').val($('#i1001_Compl_Fat').val());
}

/// Copiar Dados da Entrega //////////////////////////////////////////////////////////////
function dados_entrega()
{
    $('#i1001_Cep_Ent').val($('#i1001_Cep_Fat').val());
    $('#i1001_End_Ent').val($('#i1001_End_Fat').val());
    $('#i1001_Nro_Ent').val($('#i1001_Nro_Fat').val());
    $('#i1001_Bai_Ent').val($('#i1001_Bai_Fat').val());
    $('#i1001_Cid_Ent').val($('#i1001_Cid_Fat').val());
    $('#i1001_Est_Ent').val($('#i1001_Est_Fat').val());
    $('#i1001_Compl_Ent').val($('#i1001_Compl_Fat').val());
}