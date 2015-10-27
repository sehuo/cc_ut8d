{include file="header_preprepend.tpl"}
<title>WWE美国职业摔角2015 - {$site_name}</title>
<meta name="Keywords" content="wwe,网站地图,WWE最新赛事,WWE美国职业摔角在线观看" />
<meta name="description" content="{$site_description}" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}
<div class="row">
    <div class="col-xs-12">
        <ul class="nav nav-pills nav-stacked">
            <!--{poc_load_data action=channel type=nav output=channels infonum=all}-->
            <!--{foreach from=$channels item=channel}-->
            <li><a href="{poc_url url=video/show/cid/`$channel.cid`}">{poc_channel id=`$channel.cid` field=name}</a></li>
            <!--{/foreach}-->
        </ul>
    </div>
</div>
{include file="footer.tpl"}