<?php
function modifier_thumbnail_render($src="", $cls = "w100"){
  return '<img src="'. preg_replace('/\bm\./', 'www.', $src) .'" class="'. $cls .'" />';
  // onerror="this.src=\'/s/no.jpg\'" 
}
?>