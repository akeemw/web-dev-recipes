<?php
//Credit - http://www.sitepoint.com/php-xml-to-json-proxy/
//Alternative - http://benalman.com/code/projects/php-simple-proxy/examples/simple/

$r = '';
$url = (isset($_GET['url']) ? $_GET['url'] : null);

if ($url) {
  // fetch XML
  $c = curl_init();
  curl_setopt_array($c, array(
    CURLOPT_URL => $url,
    CURLOPT_HEADER => false,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_RETURNTRANSFER => true
  ));
  $r = curl_exec($c);
  curl_close($c);
}

if ($r) {
  // Set this as an XML document and return the result
  header("Content-type: text/xml; charset=utf-8");
  echo $r;
}
else {
  // nothing returned?
  ReturnError();
}
// return JSON error flag
function ReturnError() {
  echo '{"error":true}';
}