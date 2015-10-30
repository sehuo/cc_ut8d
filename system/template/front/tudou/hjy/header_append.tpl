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
        <form class="navbar-form" role="search" action="{$front_url}search" method="post">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search" name="keyword">
            <input name="key" value="title" type="hidden"/>
          </div>
          <button type="submit" class="btn btn-success">搜索</button>
        </form>
        <ul class="nav navbar-nav">
          <li><a href="/wwe/playdc/">单场</a></li>
          <li><a href="/wwe/playzw/">解说</a></li>
          <li><a href="/wwe/playgy/">国语</a></li>
          <li><a href="/wwe/playpy/">配音</a></li>
          <li><a href="/wwe/ppv/">PPV</a></li>
          <li><a href="/wwe/raw/">RAW</a></li>
          <li><a href="/wwe/sd/">SD</a></li>
          <li><a href="/wwe/nxt/">NXT</a></li>
          <li><a href="/wwe/me/">ME</a></li>
          <li><a href="/wwe/sms/">SMS</a></li>
          <li><a href="/wwe/ss/">SS</a></li>
          <li><a href="/wwe/ecw/">ECW</a></li>
          <li><a href="/wwe/tna/">TNA</a></li>
          <li><a href="/wwe/sexy/">女摔</a></li>
          <li><a href="/wwe/jd/">经典</a></li>
          <li><a href="/wwe/playKill/">招式</a></li>
          <li role="separator" class="divider"></li>
          <li><a href="{poc_url url=search/tagid/3506}">摔角狂热2015</a></li>
          <li><a href="{poc_url url=search/tagid/3565}">血债血偿2015</a></li>
          <li><a href="{poc_url url=search/tagid/3582}">铁笼密室2015</a></li>
          <li><a href="{poc_url url=search/tagid/3596}">合约阶梯2015</a></li>
          <li><a href="{poc_url url=search/tagid/3634}">决战之地2015</a></li>
          <li><a href="{poc_url url=search/tagid/3674}">夏日狂潮2015</a></li>
          <li role="separator" class="divider"></li>
          <li><a href="/wwe/playmrjd/">其他</a></li>
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

    