<?php
include 'ChromePhp.php';
    
if ($_POST["ID"] == "F1") { $output = validar_usuario($_POST["VEND"],$_POST["PASS"]); }
if ($_POST["ID"] == "F1001") { $output = avec1001($_POST["VEND"]); }
if ($_POST["ID"] == "F1005") { $output = avec1005(); }
if ($_POST["ID"] == "F1007") { $output = avec1007(); }
if ($_POST["ID"] == "F1035") { $output = avec1035(); }
echo $output;

function validar_usuario($vend,$pass)
{
    $vend = strtoupper($vend);
    $pass = strtoupper($pass);
    $numero = array();
    $nome = array();
    $senha = array();

    $username = 'asinfo';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=novabrink', $username, $password);
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

    $username = 'asinfo';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=novabrink', $username, $password);
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

    $username = 'asinfo';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=novabrink', $username, $password);
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

    $username = 'asinfo';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=novabrink', $username, $password);
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

function avec1035()
{
    $numero = array();
    $nome = array();
    $fator = array();

    $username = 'asinfo';
    $password = 'as12*';
    $conn = new PDO('sqlsrv:Server=138.97.105.135;Database=novabrink', $username, $password);
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

?>