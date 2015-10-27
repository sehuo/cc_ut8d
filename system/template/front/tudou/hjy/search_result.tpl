{include file="header_preprepend.tpl"}
<title>{poc_lang key=search}{$search_keyword}{poc_lang key=related}{if in_array($search_type, array('tagname', 'tagid'))}
{poc_lang key=tag}{elseif $search_type == 'playlist'}{poc_lang key=playlist}{else}{poc_lang key=video}{/if} - WWE狂野角斗士</title>
<meta name="Keywords" content="{$search_keyword}最新赛事,{$search_keyword}最新视频,{$search_keyword}全部视频,{$search_keyword}专辑,{$search_keyword}全集在线播放,{$search_keyword}高清在线观看" />
<meta name="description" content="WWE狂野角斗士-WWE美国职业摔角为广大摔迷朋友提供搜索功能，WWE全明星选手个人资料介绍、视频专辑在线观看。" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}
<div class="page-header">
  <h3><em class="text-danger">{$search_keyword}</em>相关视频</h3>
</div>
<ul class="nav nav-tabs nav-justified">
    <li {if $_template.get.sort == 'last_publish' || !$_template.get.sort} class="active"{/if}><a href="{if $tagid}{poc_url url=search/tagid/$tagid?sort=last_publish}{else}{poc_url url=search/searchid/$search_id?sort=last_publish}{/if}">发布时间</a></li>
    <li {if $_template.get.sort == 'browse_most'} class="active"{/if}><a href="{if $tagid}{poc_url url=search/tagid/$tagid?sort=browse_most}{else}{poc_url url=search/searchid/$search_id?sort=browse_most}{/if}">按热度</a></li>
    <li {if $_template.get.sort == 'recommend_rank'} class="active"{/if}><a href="{if $tagid}{poc_url url=search/tagid/$tagid?sort=recommend_rank}{else}{poc_url url=search/searchid/$search_id?sort=recommend_rank}{/if}">按推荐</a></li>
</ul>

<!--{if in_array($search_type, array('title', 'tagname', 'tagid', 'user_video'))}-->
    <!--{if $search_type == 'tagid'}-->
        <!--{poc_load_data action=video fields=vid,uid,username,title,viewcount,date,pic,videolink type=tag id=$tagid output=videos,multipage order=$orderby infonum=15 page=1 titlelen=100 cache=0}-->
    <!--{else}-->
        <!--{poc_load_data action=video fields=vid,uid,username,title,viewcount,date,pic,videolink id=$ids output=videos,multipage order=$orderby infonum=15 page=1 titlelen=100 cache=0}-->
    <!--{/if}-->
    
    <!--{foreach from=$videos key=key item=video}-->
        <!--{if $key%2 == 0}-->
            <div class="row">
        <!--{/if}-->
        <div class="col-xs-6">
            <div class="thumbnail">
                <a href="{$video.videolink}">
                    {$video.pic|thumbnail_render}
                </a>
                <div class="caption">
                    <p><a href="{$video.videolink}">{$video.stitle}</a></p>
                </div>
            </div>
        </div>
        <!--{if $key%2 == 1}-->
            </div >
        <!--{/if}-->
    <!--{/foreach}-->
    <!--{if $key%2 == 0}-->
        </div >
    <!--{/if}-->
<!--{else}-->
    <!--{poc_load_data action=playlist fields=plid,title,uid,username,pic,date,viewcount id=$ids output=playlists,multipage order=$orderby infonum=15 page=1 titlelen=100 cache=0}-->
    <!--{foreach from=$playlists key=key item=playlist}-->
        <!--{if $key%2 == 0}-->
            <div class="row">
        <!--{/if}-->
        <div class="col-xs-6">
            <div class="thumbnail">
                <a href="{poc_url url=playlist/view/`$playlist.plid`}">
                    {$playlist.pic|thumbnail_render}
                </a>
                <div class="caption">
                    <p><a href="{poc_url url=playlist/view/`$playlist.plid`}">{$playlist.name}</a></p>
                </div>
            </div>
        </div>
        <!--{if $key%2 == 1}-->
            </div >
        <!--{/if}-->
    <!--{/foreach}-->
    <!--{if $key%2 == 0}-->
        </div >
    <!--{/if}-->
<!--{/if}-->

<nav class="text-center">
    <div class="pagination">
        {$multipage}
    </div>
</nav>
 
{include file="footer.tpl"}