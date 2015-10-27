{include file="header_preprepend.tpl"}
<title>{$special_info.name} - WWE狂野角斗士</title>
<meta name="Keywords" content="{$special_info.name}" />
<meta name="description" content="{$special_info.description|cutstr:520}" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}


<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">{$special_info.name}</h3>
    </div>
    <div class="panel-body">
        <p>{$special_info.description} </p>
    </div>
</div>

<!--{poc_special fields=title,date,videolink,pic,date,duration,uid,username id=$sid order=2 type=video group=default output=videos}-->
<!--{if $videos}-->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">视频</h3>
        </div>
        <div class="panel-body">
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
                            <p><a href="{$video.videolink}">{$playlist.title}</a></p>
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
<!--{/if}-->

<!--{poc_special fields=title,date,pic,viewcount,uid,username id=$sid order=3 type=playlist group=default output=playlists}-->
<!--{if $playlists}-->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">专辑</h3>
        </div>
        <div class="panel-body">
            <!--{foreach from=$playlists item=playlist}-->
                <!--{if $key%2 == 0}-->
                    <div class="row">
                <!--{/if}-->
                <div class="col-xs-6">
                    <div class="thumbnail">
                        <a href="{poc_url url=playlist/view/`$playlist.plid`}">
                            {$playlist.pic|thumbnail_render}
                        </a>
                        <div class="caption">
                            <p><a href="{poc_url url=playlist/view/`$playlist.plid`}">{$playlist.title}</a></p>
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
 <!--{/if}-->
   

<script type="text/javascript">
if (typeof misc_statistic_update == "undefined" || misc_statistic_update != '1') {
    $.getJSON(base_dir + "index.php?r=ajax/count_view/special/{$sid}", function(result){});
}
</script>
{include file="footer.tpl"}