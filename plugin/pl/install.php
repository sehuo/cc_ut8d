<?php


//author:QQ352794 ccvms专业定制
//version:1.0 2012.10.10

define('SITE_ROOT', substr(dirname(__FILE__), 0, -9));

require_once("db.php");

$config = require_once SITE_ROOT.'system/config.inc.php';

//数据库连接类实例化
$conn= new cikeDB();
$conn->connect($config['db_connection']['host'], $config['db_connection']['user'], $config['db_connection']['pass'], $config['db_connection']['database'], $config['db_character_set'], 0, $config['db_table_prefix']);

//更多视频URL的初始化
$quotes_tableName = $config['db_table_prefix']."cikeplug_video_quotes";
$quotes_installSql = "CREATE TABLE IF NOT EXISTS `".$quotes_tableName."` (
  `vid` int(8) unsigned NOT NULL DEFAULT '0',
  `url` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`vid`),
  KEY `vid` (`vid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
$conn->query($quotes_installSql);



?>