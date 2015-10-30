{include file="header_preprepend.tpl"}
<title>{$site_name}</title>
<meta name="Keywords" content="{$site_keyword}" />
<meta name="description" content="{$site_description}" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}
<div class="panel panel-default">
    <div class="panel-heading">推荐赛事  <a href="{poc_url url=video/show/order/6}" class="badge">更多</a></div>
    <div class="panel-body container-fluid">
        <!--{poc_load_data action=video fields=pic,videolink,title output=videos infonum=4 order=6 titlelen=35}-->
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

<div class="panel panel-default">
    <div class="panel-heading">最新赛事  <a href="{poc_url url=video/showorder/2}" class="badge">更多</a></div>
    <div class="panel-body container-fluid">
        <!--{poc_load_data action=video fields=pic,videolink,title output=videos infonum=4 order=2 titlelen=35}-->
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

<div class="panel panel-default">
    <div class="panel-heading">专辑推荐 <a href="{poc_url url=playlist/index}">更多</a></div>
    <div class="panel-body container-fluid">
        <!-- 推荐专辑 -->
        <!--{poc_load_data action=playlist output=playlists infonum=4 order=5 desclen=100 titlelen=100 elite=5}-->
        <!--{foreach from=$playlists key=key item=playlist}-->
        <div class="row">
            <div class="col-xs-4">
                <a href="{poc_url url=playlist/view/`$playlist.plid`}">
                    {$playlist.pic|thumbnail_render}
                </a>
            </div>
            <div class="col-xs-8">
                <h4><a href="{poc_url url=playlist/view/`$playlist.plid`}">{$playlist.title}</a></h4>
                {$playlist.sdes}
            </div>
        </div>
        <!--{/foreach}-->
    </div>
</div>
{include file="footer.tpl"}