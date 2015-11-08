{include file="header_preprepend.tpl"}
<title>{$site_name}</title>
<meta name="Keywords" content="{$site_keyword}" />
<meta name="description" content="{$site_description}" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}
<div class="panel panel-info">
    <div class="panel-heading">推荐赛事  <a href="{poc_url url=video/show/order/6}" class="badge pull-right">更多</a></div>
    <div class="panel-body container-fluid">
        <!--{poc_load_data action=video fields=pic,videolink,title output=videos infonum=6 order=6 titlelen=100 cache=40}-->
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
                        <a href="{$video.videolink}">{$video.stitle}</a>
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
</div>

<div class="panel panel-info">
    <div class="panel-heading">最新赛事  <a href="{poc_url url=video/showorder/2}" class="badge pull-right">更多</a></div>
    <div class="panel-body container-fluid">
        <!--{poc_load_data action=video fields=pic,videolink,title output=videos infonum=4 order=2 titlelen=100 cache=40}-->
        <!--{foreach from=$videos key=key item=video}-->
            <!--{if $key%2 == 0}-->
                <div class="row">
            <!--{/if}-->
            <div class="col-xs-6">
                <div class="thumbnail">
                    <a href="{$video.videolink}">
                        {$video.pic|thumbnail_render}
                    </a>
                    <a class="caption" href="{$video.videolink}">{$video.stitle}</a>
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
</div>

<div class="panel panel-info">
    <div class="panel-heading">专辑推荐 <a href="{poc_url url=playlist/index}" class="badge pull-right">更多</a></div>
    <div class="panel-body">
        <!-- 推荐专辑 -->
        <!--{poc_load_data action=playlist output=playlists infonum=4 order=5 desclen=100 titlelen=70 elite=5 cache=40}-->
        <!--{foreach from=$playlists key=key item=playlist}-->
        <a href="{poc_url url=playlist/view/`$playlist.plid`}" class="list-group-item">
            <h5 class="list-group-item-heading">{$playlist.stitle}</h5>
            <p class="list-group-item-text">{$playlist.sdes}</p>
        </a>
        <!--{/foreach}-->
    </div>
</div>
{include file="footer.tpl"}