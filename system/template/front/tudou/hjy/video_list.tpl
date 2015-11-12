{include file="header_preprepend.tpl"}
<title>WWE视频列表 - WWE美国职业摔角 - WWE狂野角斗士</title>
<meta name="Keywords" content="wwe最新赛事全集在线观看,wwe美国职业摔角,女子摔角,wwe中文字幕解说版" />
<meta name="description" content="专业提供WWE美国职业摔角_中文解说,国语配音,官方解说,女子撕衣,经典赛事,综合赛事格斗等(PPV、RAW、SmackDown、Main Event 、SaturdayMorningSlam、NXT、SuperStars、ECW、TNA)视频高清晰在线观看" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}

<div class="panel panel-info">
    <!--{if $cid > 0}-->
    <div class="panel-heading">{poc_channel id=$cid field=name}视频列表</div>
    <!--{else}-->
    <ul class="nav nav-tabs nav-justified c-subnav-tab">
        <li {if $order == 2} class="active"{/if}><a href="{poc_url url=video/show/cid/`$cid`/order/2}">发布时间</a></li>
        <li {if $order == 3} class="active"{/if}><a href="{poc_url url=video/show/cid/`$cid`/order/3}">按热度</a></li>
        <li {if $order == 6} class="active"{/if}><a href="{poc_url url=video/show/cid/`$cid`/order/6}">按推荐</a></li>
    </ul>
    <!--{/if}-->
    <div class="panel-body container-fluid">
        <!--{if $cid == 0}-->
            <!--{poc_load_data action=video output=videos,multipage infonum=10 page=1 titlelen=200 order=$order cache=40}-->
        <!--{else}-->
            <!--{poc_load_data action=video output=videos,multipage infonum=10 type=channel id=$cid page=1 titlelen=200 order=$order cache=40}-->
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
    </div>
</div>
<nav class="text-center">
    <div class="pagination pages">
        {$multipage}
    </div>
</nav>

{include file="footer.tpl"}