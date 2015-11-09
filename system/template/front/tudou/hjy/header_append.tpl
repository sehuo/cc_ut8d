</head>
<body>
  <nav class="navbar navbar-default navbar-static-top c-navbar-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="{$base_url}">狂野角斗士</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li><a href="{poc_url url=special/view/11}">选手专区</a></li>
          <li><a href="{poc_url url=playlist/view/2255}">21-1特辑</a></li>
          <li><a href="{poc_url url=playlist/view/2242}">每周集锦</a></li>
          <li><a href="{poc_url url=special/view/26}">中文解说</a></li>
          <li><a href="{poc_url url=playlist/view/2239}">TOP排行</a></li>
          <li><a href="{poc_url url=playlist/view/2240}">台前幕后</a></li>
          <li><a href="{poc_url url=playlist/view/2237}">出场音乐</a></li>
          <li><a href="{poc_url url=playlist/view/2222}">终结招式</a></li> 
          <li><a href="{poc_url url=playlist/view/2221}">女子撕衣</a></li>
          <li><a href="{poc_url url=playlist/view/2225}">每日经典</a></li>
          <li role="separator" class="divider"></li>
          <li><a href="{poc_url url=search/tagid/3506}">摔角狂热2015</a></li>
          <li><a href="{poc_url url=search/tagid/3565}">血债血偿2015</a></li>
          <li><a href="{poc_url url=search/tagid/3582}">铁笼密室2015</a></li>
          <li><a href="{poc_url url=search/tagid/3596}">合约阶梯2015</a></li>
          <li><a href="{poc_url url=search/tagid/3634}">决战之地2015</a></li>
          <li><a href="{poc_url url=search/tagid/3674}">夏日狂潮2015</a></li>
          <li role="separator" class="divider"></li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="c-main-nav">
    <ul class="nav nav-pills nav-justified">
      <li{if in_array($current_act, array('video/show'))} class="active"{/if}><a href="{poc_url url=video/show}">视频</a></li>
      <li{if in_array($current_act, array('channel/index'))} class="active"{/if}><a href="{poc_url url=channel/index}">分类</a></li> 
      <li{if in_array($current_act, array('playlist/index'))} class="active"{/if}><a href="{poc_url url=playlist/index}">特辑</a></li>
      <li{if in_array($current_act, array('special/index'))} class="active"{/if}><a href="{poc_url url=special/index}">专题</a></li>
    </ul>
  </div>
  <div class="container search">
    <div class="row">
      <div class="col-xs-12">
        <form action="{$front_url}search" method="post">
          <div class="input-group">
            <input name="key" value="title" type="hidden"/>
            <input type="text" class="form-control" name="keyword" placeholder="输入视频标题" value="{$search_keyword}">
            <span class="input-group-btn">
              <button class="btn btn-default" type="submit">搜索</button>
            </span>
          </div>
        </form>
      </div>
    </div>
    </form>
  </div>
    