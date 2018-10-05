<?php
include 'ChromePhp.php';
    
if ($_POST["ID"] == "F1") { $output = validar_usuario($_POST["VEND"],$_POST["PASS"]); }
if ($_POST["ID"] == "F1001") { $output = avec1001($_POST["VEND"]); }
if ($_POST["ID"] == "F1005") { $output = avec1005(); }
if ($_POST["ID"] == "F1007") { $output = avec1007(); }
if ($_POST["ID"] == "F1011") { $output = avec1011(); }
if ($_POST["ID"] == "F1035") { $output = avec1035(); }
if ($_POST["ID"] == "F1080") { $output = avec1080(); }

if ($_POST["ID"] == "U1001") { $output = update_avec1001($_POST["CNPJ"],$_POST["NOME"],$_POST["EMAIL"],$_POST["TELEFONE"],$_POST["UF"],$_POST["VENDEDOR_PADRAO"]) ;}
if ($_POST["ID"] == "U1018") { $output = update_avec1018($_POST["CLIENTE"],$_POST["VENDEDOR1"],$_POST["TABELA"],$_POST["CONDICAO"],$_POST["OBS"],$_POST["TRANSPORTADORA"],
                                                         $_POST["iPRODUTO"],$_POST["iQTDE"],$_POST["iUNITARIO"],$_POST["iTOTAL"]); }
echo $output;

function validar_usuario($vend,$pass)
{
    $vend = strtoupper($vend);
    $pass = strtoupper($pass);
    $numero = array();
    $nome = array();
    $senha = array();

    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = $conn->prepare('SELECT numero, nome, senha FROM avec1006 WHERE numero = :id AND senha = :senha AND ativo = :status');
    $data->execute(array('id'=>$vend,
                         'senha'=>$pass,
                         'status'=>'S'));
    $result = $data->fetchAll();    
    
    if (count($result)) {
        foreach($result as $row) {
            array_push($numero,(trim($row[0])));
            array_push($nome,(trim($row[1])));
            array_push($senha,(trim($row[2])));
        }
    }
    return json_encode(array("numero"=>$numero,"nome"=>$nome,"senha"=>$senha));
}

function avec1001($vend)
{
    $vend = strtoupper($vend);
    $cnpj = array();
    $nome = array();
    $email = array();
    $telefone = array();
    $uf = array();

    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = $conn->prepare('SELECT cnpj, nome, email, telefone, uf FROM avec1001 WHERE vendedor_padrao = :id ORDER BY cnpj');
    $data->execute(array('id'=>$vend));
    $result = $data->fetchAll();    
    
    if (count($result)) {
        foreach($result as $row) {
            array_push($cnpj,(trim($row[0])));
            array_push($nome,(trim($row[1])));
            array_push($email,(trim($row[2])));
            array_push($telefone,(trim($row[3])));
            array_push($uf,(trim($row[4])));
        }
    }
    return json_encode(array("cnpj"=>$cnpj,"nome"=>$nome,"email"=>$email,"telefone"=>$telefone,"uf"=>$uf));
}


function avec1005()
{
    $numero = array();
    $nome = array();
    $parcelas = array();

    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = $conn->prepare('SELECT numero, nome, parcelas FROM avec1005 ORDER BY numero');
    $data->execute();
    $result = $data->fetchAll();    
    
    if (count($result)) {
        foreach($result as $row) {
            array_push($numero,(trim($row[0])));
            array_push($nome,(trim($row[1])));
            array_push($parcelas,(trim($row[2])));
        }
    }
    return json_encode(array("numero"=>$numero,"nome"=>$nome,"parcelas"=>$parcelas));
}

function avec1007()
{
    $numero = array();
    $nome = array();
    $unitario = array();
    $qtde_emb = array();

    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = $conn->prepare('SELECT numero, nome, unitario, qtde_emb FROM avec1007 ORDER BY numero');
    $data->execute();
    $result = $data->fetchAll();    
    
    if (count($result)) {
        foreach($result as $row) {
            array_push($numero,(trim($row[0])));
            array_push($nome,(trim($row[1])));
            array_push($unitario,(trim($row[2])));
            array_push($qtde_emb,(trim($row[3])));
        }
    }
    return json_encode(array("numero"=>$numero,"nome"=>$nome,"unitario"=>$unitario,"qtde_emb"=>$qtde_emb));
}

function avec1011()
{
    $cnpj = array();
    $nome = array();

    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = $conn->prepare('SELECT cnpj, nome, ativo FROM avec1011 ORDER BY nome');
    $data->execute();
    $result = $data->fetchAll();    
    
    if (count($result)) {
        foreach($result as $row) {
            array_push($cnpj,(trim($row[0])));
            array_push($nome,(trim($row[1])));
        }
    }
    return json_encode(array("cnpj"=>$cnpj,"nome"=>$nome));
}

function avec1035()
{
    $numero = array();
    $nome = array();
    $fator = array();

    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = $conn->prepare('SELECT numero, nome, fator FROM avec1035 ORDER BY numero');
    $data->execute();
    $result = $data->fetchAll();    
    
    if (count($result)) {
        foreach($result as $row) {
            array_push($numero,(trim($row[0])));
            array_push($nome,(trim($row[1])));
            array_push($fator,(trim($row[2])));
        }
    }
    return json_encode(array("numero"=>$numero,"nome"=>$nome,"fator"=>$fator));
}

function avec1080()
{
    $numero = array();
    $produto = array();
    $valor = array();
    $data = array();

    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = $conn->prepare('SELECT numero, produto, valor, data FROM avec1080 ORDER BY numero');
    $data->execute();
    $result = $data->fetchAll();    
    
    if (count($result)) {
        foreach($result as $row) {
            array_push($numero,(trim($row[0])));
            array_push($produto,(trim($row[1])));
            array_push($valor,(trim($row[2])));
            array_push($data,(trim($row[3])));
        }
    }
    return json_encode(array("numero"=>$numero,"produto"=>$produto,"valor"=>$valor,"data"=>$data));
}

function nro_pedido()
{
    $imax = 0;
    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $data = $conn->prepare('SELECT max(numero) as numero FROM avec1018');
    $data->execute();    
    $result = $data->fetchAll();
    
    if (count($result)) {
        foreach($result as $row) {
            $imax = ($row[0]+1);
        }
    }
    if ($imax < 300000) {
        $imax = 300000;
    }
    return $imax;
}

function update_avec1001($CNPJ,$NOME,$EMAIL,$TELEFONE,$UF,$VENDEDOR_PADRAO){
    $VENDEDOR_PADRAO    = strtoupper($VENDEDOR_PADRAO);
    $UF                 = strtoupper($UF);

    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO avec1001 (cnpj,nome,email,telefone,uf,ativo,vendedor_padrao) VALUES(
            :cnpj,:nome,:email,:fone,:uf,:ativo,:vend)";
    $params = array($CNPJ,
                    $NOME,
                    $EMAIL,
                    $TELEFONE,
                    $UF,
                    'S',
                    $VENDEDOR_PADRAO);
    $insert = $conn->prepare($sql);
    $insert->execute($params);
    return json_encode(array("status"=>'OK'));
}

function update_avec1018($CLIENTE,$VENDEDOR1,$TABELA,$CONDICAO,$OBS,$TRANSPORTADORA,$iPRODUTO,$iQTDE,$iUNITARIO,$iTOTAL) {
    $nro        = nro_pedido();
    $VENDEDOR1  = strtoupper($VENDEDOR1);
    $OBS        = strtoupper($OBS);
    
    $iItems = count($iPRODUTO);
    for ($i=0; $i< $iItems; $i++ ) {
        $VALOR = $VALOR + $iTOTAL[$i];
    }
    
    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = "INSERT INTO avec1018 (numero,data,cliente,vendedor1,tabela,condicao,obs,total,internet,transportadora) VALUES(
            :numero,:data,:cliente,:vendedor1,:tabela,:condicao,:obs,:total,:internet,:transportadora)";
    $params = array($nro,
                    date ("Y-m-d"),
                    $CLIENTE,
                    $VENDEDOR1,
                    $TABELA,
                    $CONDICAO,
                    $OBS,
                    $VALOR,
                    'I',
                    $TRANSPORTADORA);
    $insert = $conn->prepare($sql);
    $insert->execute($params);
    
    $iItems = count($iPRODUTO);
    for ($i=0; $i< $iItems; $i++ ) {
        update_avec1020($nro,$iPRODUTO[$i],$iQTDE[$i],$iUNITARIO[$i],$iTOTAL[$i]);
    }
    
    
    return json_encode(array("status"=>'OK',"pedido"=>$nro));
}

function update_avec1020($NRO,$PRODUTO,$QTDE,$UNITARIO,$TOTAL){
    $username = 'asbrf';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=brasilflex', $username, $password);
    $conn->beginTransaction();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO avec1020 (pedido, produto, qtde, unitario, total) VALUES(
            :pedido, :produto, :qtde, :unitario, :total)";
    $params = array($NRO,
                    $PRODUTO,
                    $QTDE,
                    $UNITARIO,
                    $TOTAL);
    $insert = $conn->prepare($sql);
    $insert->execute($params);
    $conn->commit();
}

?>