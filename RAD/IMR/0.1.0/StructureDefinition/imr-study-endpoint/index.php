<?php
function Redirect($url)
{
  header('Location: ' . $url, true, 302);
  exit();
}

$accept = $_SERVER['HTTP_ACCEPT'];
if (strpos($accept, 'application/json+fhir') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/StructureDefinition-imr-study-endpoint.json2');
elseif (strpos($accept, 'application/fhir+json') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/StructureDefinition-imr-study-endpoint.json1');
elseif (strpos($accept, 'json') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/StructureDefinition-imr-study-endpoint.json');
elseif (strpos($accept, 'application/xml+fhir') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/StructureDefinition-imr-study-endpoint.xml2');
elseif (strpos($accept, 'application/fhir+xml') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/StructureDefinition-imr-study-endpoint.xml1');
elseif (strpos($accept, 'html') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/StructureDefinition-imr-study-endpoint.html');
else 
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/StructureDefinition-imr-study-endpoint.xml');
?>
    
You should not be seeing this page. If you do, PHP has failed badly.
