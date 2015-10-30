<?php 
class SubPages{  

	private  $each_disNums;//每页显示的条目数  
	private  $nums;//总条目数  
	private  $current_page;//当前被选中的页  
	private  $sub_pages;//每次显示的页数  
	private  $pageNums;//总页数  
	private  $page_array = array();//用来构造分页的数组  
	private  $subPage_link;//每个分页的链接  
	/* 
	__construct是SubPages的构造函数，用来在创建类的时候自动运行. 
	@$each_disNums   每页显示的条目数 
	@nums     总条目数 
	@current_num     当前被选中的页 
	@sub_pages       每次显示的页数 
	@subPage_link    每个分页的链接 
	*/  
	function __construct($each_disNums,$nums,$current_page,$sub_pages,$subPage_link){  
		$this->each_disNums=intval($each_disNums);  
		$this->nums=intval($nums);  
		if(!$current_page){  
			$this->current_page=1;  
		}else{  
			$this->current_page=intval($current_page);  
		}  
		$this->sub_pages=intval($sub_pages);  
		$this->pageNums=ceil($nums/$each_disNums);  
		$this->subPage_link=$subPage_link;   
		$this->subPageCss2();  
	}  


	/* 
	__destruct析构函数，当类不在使用的时候调用，该函数用来释放资源。 
	*/  
	function __destruct(){  
		unset($each_disNums);  
		unset($nums);  
		unset($current_page);  
		unset($sub_pages);  
		unset($pageNums);  
		unset($page_array);  
		unset($subPage_link);  
	}  


	/* 
	用来给建立分页的数组初始化的函数。 
	*/  
	function initArray(){  
		for($i=0;$i<$this->sub_pages;$i++){  
			$this->page_array[$i]=$i;  
		}  
		return $this->page_array;  
	}  


	function construct_num_Page(){  
		if($this->pageNums < $this->sub_pages){  
			$current_array=array();  
			for($i=0;$i<$this->pageNums;$i++){   
				$current_array[$i]=$i+1;  
			}  
		}else{  
			$current_array=$this->initArray();  
			if($this->current_page <= 3){  
				for($i=0;$i<count($current_array);$i++){  
					$current_array[$i]=$i+1;  
				}  
			}elseif ($this->current_page <= $this->pageNums && $this->current_page > $this->pageNums - $this->sub_pages + 1 ){  
				for($i=0;$i<count($current_array);$i++){  
					$current_array[$i]=($this->pageNums)-($this->sub_pages)+1+$i;  
				}  
			}else{  
				for($i=0;$i<count($current_array);$i++){  
					$current_array[$i]=$this->current_page-2+$i;  
				}  
			}  
		}  
		return $current_array;  
	}  


	function subPageCss2(){
		$a=$this->construct_num_Page(); 
		$aLen = count($a);
		$subPageCss2Str = "";
		$sep = '<span>..</span>';

		if($aLen && $a[0] != 1){
			$subPageCss2Str .= "<a data-url='".$this->subPage_link."&p=1' href='".$this->subPage_link."#1' class='J_pagea'>1</a>".$sep;
		}

		
		for($i=0;$i<count($a);$i++){  
			$s=$a[$i];  
			if($s == $this->current_page ){  
				$subPageCss2Str.="<span class='currentpage'>".$s."</span>";  
			}else{  
				$url=$this->subPage_link."#".$s;  
				$subPageCss2Str.="<a data-url='".$this->subPage_link."&p=".$s."' href='#' class='J_pagea'>".$s."</a>";  
			}  
		}  


		if($aLen && $a[$aLen-1] != $this->pageNums){
			$subPageCss2Str .= $sep."<a class='J_pagea' data-url='".$this->subPage_link."&p=".$this->pageNums."' href='#'>$this->pageNums</a>";
		}
		  
		$this->html =  $subPageCss2Str;  
	}  
}  




/*$page_size=14; 
$nums=124; 

$result =new SubPages($page_size,$nums,$_GET["p"],5,"page.php?p="); 
echo $result->html;*/
?>