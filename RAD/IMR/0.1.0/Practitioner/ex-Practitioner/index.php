<?php
function Redirect($url)
{
  header('Location: ' . $url, true, 302);
  exit();
}

$accept = $_SERVER['HTTP_ACCEPT'];
if (strpos($accept, 'application/json+fhir') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/Practitioner-ex-Practitioner.json2');
elseif (strpos($accept, 'application/fhir+json') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/Practitioner-ex-Practitioner.json1');
elseif (strpos($accept, 'json') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/Practitioner-ex-Practitioner.json');
elseif (strpos($accept, 'application/xml+fhir') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/Practitioner-ex-Practitioner.xml2');
elseif (strpos($accept, 'application/fhir+xml') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/Practitioner-ex-Practitioner.xml1');
elseif (strpos($accept, 'html') !== false)
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/Practitioner-ex-Practitioner.html');
else 
  Redirect('https://profiles.ihe.net/RAD/imr/0.1.0/Practitioner-ex-Practitioner.xml');
?>
    
You should not be seeing this page. If you do, PHP has failed badly.
