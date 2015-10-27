{include file="header_preprepend.tpl"}
<title>{$msg_title} - WWE狂野角斗士</title>
{include file="header_prepend.tpl"}
{include file="header_append.tpl"}
<div class="container">
    <div class="panel panel-danger">
        <div class="panel-heading">
            <h3 class="panel-title">{$msg_title}</h3>
        </div>
        <div class="panel-body">
            {$msg_content}
        </div>
        <div class="panel-footer"><a href="{$url}" role="button">点些返回</a></div>
    </div>
</div>

{include file="footer.tpl"}