<?php
function Redirect($url)
{
  header('Location: ' . $url, true, 302);
  exit();
}

$accept = $_SERVER['HTTP_ACCEPT'];
if (strpos($accept, 'application/json+fhir') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.0-comment/List-593cd04e-b696-45c1-bc32-39e55a340a45.json2');
elseif (strpos($accept, 'application/fhir+json') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.0-comment/List-593cd04e-b696-45c1-bc32-39e55a340a45.json1');
elseif (strpos($accept, 'json') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.0-comment/List-593cd04e-b696-45c1-bc32-39e55a340a45.json');
elseif (strpos($accept, 'application/xml+fhir') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.0-comment/List-593cd04e-b696-45c1-bc32-39e55a340a45.xml2');
elseif (strpos($accept, 'application/fhir+xml') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.0-comment/List-593cd04e-b696-45c1-bc32-39e55a340a45.xml1');
elseif (strpos($accept, 'html') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.0-comment/List-593cd04e-b696-45c1-bc32-39e55a340a45.html');
else 
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.0-comment/List-593cd04e-b696-45c1-bc32-39e55a340a45.xml');
?>
    
You should not be seeing this page. If you do, PHP has failed badly.
