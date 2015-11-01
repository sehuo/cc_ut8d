{include file="header_preprepend.tpl"}
<title>{poc_lang key=search}{$search_keyword}{poc_lang key=related}{if in_array($search_type, array('tagname', 'tagid'))}
{poc_lang key=tag}{elseif $search_type == 'playlist'}{poc_lang key=playlist}{else}{poc_lang key=video}{/if} - WWE狂野角斗士</title>
<meta name="Keywords" content="{$search_keyword}最新赛事,{$search_keyword}最新视频,{$search_keyword}全部视频,{$search_keyword}专辑,{$search_keyword}全集在线播放,{$search_keyword}高清在线观看" />
<meta name="description" content="WWE狂野角斗士-WWE美国职业摔角为广大摔迷朋友提供搜索功能，WWE全明星选手个人资料介绍、视频专辑在线观看。" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}
<div class="container-fluid">
    <h4><em class="text-danger">{$search_keyword}</em>相关视频</h4>
    <!--{if in_array($search_type, array('title', 'tagname', 'tagid', 'user_video'))}-->
        <!--{if $search_type == 'tagid'}-->
            <!--{poc_load_data action=video fields=vid,uid,username,title,viewcount,date,pic,videolink type=tag id=$tagid output=videos,multipage order=$orderby infonum=10 page=1 titlelen=50 cache=40}-->
        <!--{else}-->
            <!--{poc_load_data action=video fields=vid,uid,username,title,viewcount,date,pic,videolink id=$ids output=videos,multipage order=$orderby infonum=10 page=1 titlelen=50 cache=40}-->
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
</div>

<nav class="text-center">
    <div class="pagination pages">
        {$multipage}
    </div>
</nav>
 
{include file="footer.tpl"}