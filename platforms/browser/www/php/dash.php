<?php
include 'ChromePhp.php';
    
if ($_POST["ID"] == "F1007") { $output = avec1007(); }
echo $output;

function avec1007()
{
    $numero = array();
    $nome = array();
    $unitario = array();
    $qtde_emb = array();

    $username = 'asinfo';
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

?>