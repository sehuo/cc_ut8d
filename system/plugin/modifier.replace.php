<?php
function modifier_replace($string="", $pattern = "", $replacement = ''){
  return preg_replace($pattern, $replacement, $string);
}
?>