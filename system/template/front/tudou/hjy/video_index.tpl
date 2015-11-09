{include file="header_preprepend.tpl"}
<!--{poc_load_data action=tag type=video id=$video_info.vid output=tags}-->
<title>{$video_info.title}{if $series} - {$playlist_info.title}{/if} - WWE狂野角斗士</title>
<meta name="title" content="{$video_info.title}{if $series} - {$playlist_info.title}{/if}-在线播放-{$video_info.cname} - WWE狂野角斗士" />
<meta name="Keywords" content="{foreach from=$tags item=tag}{$tag.name},{/foreach}{$video_info.cname}" />
<meta name="description" content="{$video_info.description|cutstr:520}" />
{include file="header_prepend.tpl"}
<script type="text/javascript">
    var vid = "{$video_info.vid}";
    var video_info = {
        addr : "{$video_info.videoaddr}",
        title: "{$video_info.title}"
    };
    <!--{if $series}-->
    var next_video_url = "{$front_url}video/index/{$next_vid}/series/1/plid/{$plid}";
    var series = true;
    var plid = {$plid};
    <!--{/if}-->
</script>
{include file="header_append.tpl"}
<div id="player">
</div>

<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">{$video_info.title} {if $series} - {$playlist_info.title} {/if}</h3>
    </div>
    <div class="panel-body">
    <p>发布: <em>{$video_info.date}</em></p>
    <p>栏目: <a href="{poc_url url=channel/view/`$video_info.cid`}">{$video_info.cname}</a></p>
    {$video_info.description}
    </div>
</div>

<!--{if $series}-->
<div class="panel panel-default hidden" id="J-videoPlayList">
    <div class="panel-heading">
        <h3 class="panel-title">播放列表</h3>
    </div>
    <div class="panel-body">
        <div class="list-group">
            <div id="cike_plug_playlist"></div>
        </div>
    </div>
</div>
<!--{/if}-->

<div class="panel panel-default hidden videoSrcs" id="J-videoSrcs">
    <div class="panel-heading">
        <h3 class="panel-title">播放异常、无法观看？切换视频试试</h3>
    </div>
    <div class="panel-body">
        <div class="list-group">
        </div>
    </div>
</div>


<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">评论</h3>
    </div>
    <div class="panel-body">
        {include file="video_comment.tpl"}
    </div>
</div>
                
<script src="/s/js/video.js?t=20151108"></script>
{include file="footer.tpl"}
