{include file="header_preprepend.tpl"}
<title>WWE美国职业摔角2015 - {$site_name}</title>
<meta name="Keywords" content="wwe,网站地图,WWE最新赛事,WWE美国职业摔角在线观看" />
<meta name="description" content="{$site_description}" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}
<div class="container">
    <div class="list-group">
        <!--{poc_load_data action=channel type=nav output=channels infonum=all}-->
        <!--{foreach from=$channels item=channel}-->
        <a href="{poc_url url=video/show/cid/`$channel.cid`}" class="list-group-item">{poc_channel id=`$channel.cid` field=name}</a>
        <!--{/foreach}-->
    </div>
</div>
{include file="footer.tpl"}