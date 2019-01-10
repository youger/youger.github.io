window.onload = colorRows;
function colorRows() {
       var myDD = document.getElementsByTagName('dd');
       for (var i=0;i<mydd.length;i++) {="" if="" (!(i%2)="" ){="" mydd[i].classname="rowTint" ;="" }="" 2014-05-16,="" liyou="" added="" $(document).ready(function(){="" initdata(myjsondata);="" open_closehandler();="" togglebox();="" load_more_sentence();="" });="" function="" togglebox(){="" $('.title').bind("click",="" function(){="" var="" this="$(this);" list_on="This.next();" open_on="function(){" list_on.toggle();="" pos_top="This.position().top;" $("body").animate({scrolltop:="" pos_top},="" 500);="" classname="This[0].children[0].children[0].className;" if(classname="=" "icon-angle-down"){="" }else{="" this[0].children[0].children[0].classname="className;" open_on();="" open_closehandler()="" toggleflag="false;" $("#more-exp-button").bind("click",="" function()="" $(".title").each(function(){="" list_on.toggle(toggleflag);="" if(toggleflag){="" load_more_sentence()="" $(="" document="" ).ajaxcomplete(function()="" combine_more_cases(mymoredatajson);="" $("#more-sentence-button").bind("click",="" $.ajax({="" url:="" "data.js",="" context:="" document.body="" }).done(function(data)="" ).append(="" data="" );="" same="" origin="" policy="" $.get(="" "http:="" dic.kingyee.com="" search="" searchsentences.do",="" token:"kingyee",keyword:"test",="" start:"1",="" num:"3"},="" function(data,="" textstatus,="" jqxhr){="" combine_more_cases(data);="" initdata(json_data)="" 数组="" j_items="json_data.data.items;" div_contents="$('#more-network');" div_contents.empty();="" for(i="" in="" j_items)="" div_contents.append("<div="" class="title"><a>"+j_items[i].dicName+"</a><i class="\"icon-angle-up\""></i><div style="display:none">"+j_items[i].expl+"</div>");
  }
  var T = this;

  open_closeHandler();

  $("#sentence-title").hide();
  $("#sentence_contents").empty();

  //init_more_cases(MyMoreDataJson);
}

// 下载更多例句
function combine_more_cases(json_data) {
  if(json_data.data.count == 0) {
    return;
  }
  var m_cases = json_data.data.items;
  var m_page = json_data.data.nowPage;
  var isLast = 0;
  if((json_data.data.rowsPerPage*m_page) >= json_data.data.count) {
    isLast = 1;
  } else {
    isLast = 0;
  }

  var div_example_list = $("#sentence-title");
  var div_example_contents = $("#sentence-contents");
  var div_more = $("#more-sentence-button");
  if(m_cases) {

    div_example_list.show();
    div_example_contents.show();
    div_more.show();

    for(i in m_cases) {
      div_example_contents.append('<div><div style="margin:0px 0px 0px 10px"><div style="float:left"><img src="./sentence.png" width="10" height="10">&nbsp;</div><div style="margin:0px 8px 0px 18px; font-size:16px;">'
                                        + m_cases[i].word
                                        +'</div><div style="margin:0px 8px 0px 18px; font-size:16px;">'
                                        + m_cases[i].expl
                                        +'</div></div><br></div>');
    }
    div_more.attr("page",m_page);
    if(isLast == 1) {
      div_more.hide();
    } else {
      div_more.show();
    }
  }
}

function more_cases() {
  combine_more_cases(MyMoreDataJson);
  //window.wordDetail.moreCaseList($("#div_more").attr("page")+"");
}
//
</mydd.length;i++)>