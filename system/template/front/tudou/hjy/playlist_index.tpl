{include file="header_preprepend.tpl"}
<title>WWE专辑列表 - WWE美国职业摔角 - WWE狂野角斗士</title>
<meta name="Keywords" content="wwe专辑,摔角专辑,WWE最新赛事" />
<meta name="description" content="专业提供WWE美国职业摔角_中文解说,国语配音,官方解说,女子撕衣,经典赛事,综合赛事格斗等(PPV、RAW、SmackDown、Main Event 、SaturdayMorningSlam、NXT、SuperStars、ECW、TNA)专辑高清晰在线观看" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}

<ul class="nav nav-tabs nav-justified c-subnav-tab">
    <li {if $order == 2} class="active"{/if}><a href="{poc_url url=playlist/index/cid/`$cid`/order/2}">发布时间</a></li>
    <li {if $order == 3} class="active"{/if}><a href="{poc_url url=playlist/index/cid/`$cid`/order/3}">按热度</a></li>
    <li {if $order == 4} class="active"{/if}><a href="{poc_url url=playlist/index/cid/`$cid`/order/4}">按推荐</a></li>
</ul>
<div class="container-fluid">  
    <!--{poc_load_data action=playlist fields=plid,title,pic,description,videocount output=playlists,multipage type=channel id=$cid infonum=10 titlelen=40 desclen=70 order=$order period=$time page=1 cache=40}-->
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
                    <p><a href="{poc_url url=playlist/view/`$playlist.plid`}">{$playlist.stitle}</a></p>
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