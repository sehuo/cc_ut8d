{include file="header_preprepend.tpl"}
<title>WWE专题列表 - WWE美国职业摔角 - WWE狂野角斗士</title>
<meta name="Keywords" content="WWE赛事,WWE专题,RAW专辑,Smackdown专辑,经典特辑,WWE选手资料视频" />
<meta name="description" content="WWE狂野角斗士-WWE美国职业摔角-为广大摔迷朋友提供WWF历年经典比赛、铁笼赛、梯子赛、硬核赛、强弱不等赛、皇家大战、摔角狂热等专题。" />
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}

<div class="container-fluid">
    <!--{poc_load_data action=special fields=name,sid,pic,videocount output=specials,multipage infonum=15 order=2 page=1}-->
    <!--{foreach from=$specials key=key item=special}-->
        <!--{if $key%2 == 0}-->
            <div class="row">
        <!--{/if}-->
        <div class="col-xs-6">
            <div class="thumbnail">
                <a href="{poc_url url=special/view/`$special.sid`}">
                    {$special.pic|thumbnail_render}
                </a>
                <div class="caption">
                   <p><a href="{poc_url url=special/view/`$special.sid`}">{$special.name}<span class="badge">{$special.videocount}</span></a></p>
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
    <div class="pagination">
        {$multipage}
    </div>
</nav>

{include file="footer.tpl"}