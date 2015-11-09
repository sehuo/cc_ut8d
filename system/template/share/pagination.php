<?php if (!defined('SYSPATH')) exit('Access Denied');
/**
 * Pagination style
 * 
 * @preview  current_page/total_pages first_page Previous 1 2 3 4 5 Next last_page
 */
$url = preg_replace('/(?:\?|&)message=[^&]+/', '', $url);
?>

<div id="multi_page">
	<?php if ($previous_page): ?>
		<a href="<?php echo str_replace('{page}', $previous_page, $url) ?>" class="prepage">上一页</a>
	<?php else: ?>
		<span class="prepage">上一页</span>
	<?php endif ?>
    
	<?php $list_page = 3; ?>
	<?php $middle_page = floor($list_page / 2); ?>
	
	<?php 
		if($current_page <= $middle_page):	//当前页小于居中位置
			$start_page = 1;
		elseif($total_pages - $current_page <= $middle_page):	//剩下页数不足显示的数目向前获取页面
			$start_page = $total_pages - $list_page + 1 < 1 ? 1 : $total_pages - $list_page + 1;
		else:	//其余页面居中
			$start_page = $current_page - $middle_page;
		endif
	?>
	
	<?php $end_page = $start_page + $list_page - 1 > $total_pages ? $total_pages : $start_page + $list_page - 1; ?>
	
	<?php for($i = $start_page; $i <= $end_page; $i++): ?>
			<?php if ($i == $current_page): ?>
				<strong class="currentpage"><?php echo $i;?></strong>
			<?php else: ?>
				<a href="<?php echo str_replace('{page}', $i, $url) ?>" class="otherpage"><?php echo $i;?></a>
			<?php endif ?>
	<?php endfor ?>
	
	<?php if($current_page < $total_pages): ?>
		<a href="<?php echo str_replace('{page}', $next_page, $url) ?>" class="nextpage">下一页</a>
	<?php else: ?>
		<span class="nextpage">下一页</span>
	<?php endif ?>

</div>