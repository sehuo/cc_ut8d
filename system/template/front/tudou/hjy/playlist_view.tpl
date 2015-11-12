{include file="header_preprepend.tpl"}
<title>{$playlist_info.title} - 专辑 - WWE狂野角斗士</title>
<meta name="Keywords" content="{$playlist_info.title} - {$site_keyword}" />
<meta name="description" content="{$playlist_info.description|cutstr:520}" />
{include file="header_prepend.tpl"}
<script type="text/javascript">
    var plid = "{$plid}";
</script>
<script type="text/javascript" src="{$front_url}media/js/playlist.js"></script>
{include file="header_append.tpl"}

<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">{$playlist_info.title}</h3>
    </div>
    {$playlist_info.pic|thumbnail_render}
    
    <div class="panel-body">
        <p>发布: <em>{$playlist_info.date}</em></p>
        <p>视频: <em>{$playlist_info.videocount}</em>个</p>
        <p>{$playlist_info.description} </p>
        <!--{if $first_vid}-->
        <p><a href="{poc_url url=video/index/$first_vid/series/1/plid/$playlist_info.plid}" class="btn btn-success btn-block">开始播放本专辑</a></p>
        <!--{/if}-->
    </div>
</div>

<div class="container-fluid">
    <!--{poc_load_data action=listvideo fields=pic,title output=videos,multipage id=$plid infonum=10 page=1 titlelen=200 cache=40}-->
    <!--{foreach from=$videos key=key item=video}-->
        <!--{if $key%2 == 0}-->
            <div class="row">
        <!--{/if}-->
        <div class="col-xs-6">
            <div class="thumbnail">
                <a href="{poc_url url=video/index/$video.vid/series/1/plid/$plid}">
                    {$video.pic|thumbnail_render}
                </a>
                <div class="caption">
                    <p><a href="{poc_url url=video/index/$video.vid/series/1/plid/$plid}">{$video.stitle}</a></p>
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
</div>

<nav class="text-center">
    <div class="pagination pages">
        {$multipage}
    </div>
</nav>

{include file="footer.tpl"} 