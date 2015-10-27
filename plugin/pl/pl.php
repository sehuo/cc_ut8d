<?php


//author:QQ352794 ccvms专业定制
//version:1.0 2012.10.10

define('SITE_ROOT', substr(dirname(__FILE__), 0, -9));

require_once("db.php");
require_once("page.php");

$config = require_once SITE_ROOT.'system/config.inc.php';

//数据库连接类实例化
$conn= new cikeDB();
$conn->connect($config['db_connection']['host'], $config['db_connection']['user'], $config['db_connection']['pass'], $config['db_connection']['database'], $config['db_character_set'], 0, $config['db_table_prefix']);

//更多视频URL的初始化
$quotes_tableName = $config['db_table_prefix']."cikeplug_video_quotes";
$quotes_installSql = "CREATE TABLE IF NOT EXISTS `".$quotes_tableName."` (
  `vid` int(8) unsigned NOT NULL DEFAULT '0',
  `url` text NOT NULL DEFAULT '',
  PRIMARY KEY (`vid`),
  KEY `vid` (`vid`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;";
//$conn->query($quotes_installSql);

function quotes_Get($vid=0){
	global $conn,$quotes_tableName;
	$sql = "select url from `".$quotes_tableName."` where vid = ".$vid;
	$result =  $conn->result_first($sql);
	return $result;
}

function quotes_Add($vid=0,$url=""){
	global $conn,$quotes_tableName;
	$sql = "REPLACE INTO `".$quotes_tableName."` (`vid`, `url`) VALUES ($vid, '$url')";
	$conn->query($sql);
	//return $conn->insert_id();
	return "1";
}
function getPlayList($vid=0,$plid=0){
	global $conn,$config;
	$result = array();
	$curpage = $_GET["p"];
	$pageSize = $_GET["size"];
	$allnum = $_GET["all"];
	if(!($pageSize>0)) $pageSize = 7;
	if($plid>0){
		//$plylistIDs = array(array("plid"=>$plid));
	}else{
		$sql = "select plid from ".$config['db_table_prefix']."playlistvideo where vid = ".$vid;
		$plylistIDs = ($conn->fetch_all($sql));
		$plid = $plylistIDs[0]['plid'];
	}

	$sql = "select v.vid,v.title from ".$config['db_table_prefix']."video as v left join ".$config['db_table_prefix']."playlistvideo as p on p.vid = v.vid where p.plid = ".$plid." order by p.vieworder asc";

	if($curpage == "0") $curpage = 1;

	if($allnum){
		$sql .= " limit ". ($curpage - 1)*$pageSize.",".$pageSize;
	}

	//foreach ($plylistIDs as $value) {
		//$sql = "select v.vid,v.title from ".$config['db_table_prefix']."video as v left join ".$config['db_table_prefix']."playlistvideo as p on p.vid = v.vid where p.plid = ".$value['plid']." order by p.vieworder asc";
		//array_push($result,$conn->fetch_all($sql));
		if($plid){
			$result = $conn->fetch_all($sql);
		}
		
	//}
	//第一次没有显式传curpage，要自己算，然后排除列表
	if(empty($allnum)){
		for($i = 0;$i<count($result);$i++){
			if($result[$i]['vid'] == $vid) {
				$index = $i;
				break;
			}
		}
		$allnum = count($result);
		$curpage = ceil(($index+1)/$pageSize);
		array_splice($result,0,($curpage-1)*$pageSize);
		array_splice($result,$pageSize);
	}
	//echo $curpage;
	$page = new SubPages($pageSize,$allnum,$curpage,5,"plid=$plid&all=$allnum");
	return array(
		"list"=>$result,
		"page"=>$page->html
	);
}



function playAll($vid=0,$plid=0){
	$callback = $_GET["callback"];
	$result = array(
		"playList"=>getPlayList($vid,$plid),
		"playUrls"=>quotes_Get($vid)
		);

	return $callback."(".json_encode($result).")";;
}

function playList($vid=0,$plid=0){
	$callback = $_GET["callback"];
	$result = array(
		"playList"=>getPlayList($vid,$plid)
		);

	return $callback."(".json_encode($result).")";;
}



$vid = $_GET['vid']?$_GET['vid']:$_POST['vid'];
$vid = intval($vid);
$type = $_GET['type']?$_GET['type']:$_POST['type'];

$plid = intval($_GET['plid']);

switch ($type){
	case "getQuotes":
	  	echo quotes_Get($vid);
	  	break;
	case "addQuotes": 
		echo quotes_Add($vid,$_POST['url']);
		break;
	case "play":
		echo playAll($vid,$plid);
		break;
	case "playList":
		echo playList($vid,$plid);
		break;
}



/*fetch_row
insert_id
free_result
num_fields
num_rows
result
affected_rows
query
fetch_all
result_first
fetch_first
fetch_array*/


?>