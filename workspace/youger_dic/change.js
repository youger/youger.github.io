function Change(flag)
{
	var slash = document.search[flag].src.lastIndexOf("/") + 1;
	var length = document.search[flag].src.length;
	var file_name = document.search[flag].src.substring(slash, length);

	var flag_no = ( flag.split("con")) . join("");

	if(file_name == "ClosedLayer.gif")
		document.search[flag].src = "OpenedLayer.gif";
	else
		document.search[flag].src = "ClosedLayer.gif";

	if(file_name == "ClosedLayer.gif")
	{
		$("#tango" + flag_no).slideDown();
	}
	else
	{
		$("#tango" + flag_no).slideUp();
	}
}

function Media(onsei)
{
	var data = "";
	var browser_flag = 0;

	// 1がWindows、2がMac
	var os_flag = 0;

	//変数myOSにユーザーの環境を代入
	myOS = navigator.userAgent;

	//変数myOSに文字列Winが入っていた場合（Windows）の処理
	if(myOS.indexOf("Win") >= 0 )
	{
		if(myOS.indexOf("Firefox") >= 0)
		{
			os_flag = 1;
			browser_flag = 1;
		}
		else
		{
			os_flag = 1;
		}
	}
	//変数myOSに文字列Macが入っていた場合（Mac OS 9以前）の処理。
	//Mac OS Xにも文字列Macが入っているため、必ずMac OSの処理の後に行います。
	else if(myOS.indexOf("Mac") >= 0 )
	{
		os_flag = 2;
	}

	// OSがWindowsで、ブラウザがFireFox以外
	if(os_flag == 1 && browser_flag == 0)
	{
		data += "<object classid="\"CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95\"" height="\"30\"">";
		//data += "<object classid="\"CLSID:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\"" height="\"30\"" codebase="\"http://www.apple.com/qtactivex/qtplugin.cab\"">";
		data += "<param name="\"SRC\"" value="\""" +="" onsei="" "\"="">";
		data += "<param name="\"AUTOSTART\"" value="\"true\"">";
		data += "<param name="\"CONTROLS\"" value="\"ControlPanel\"">";
		data += "<param name="\"CONSOLE\"" value="\"cons\"">";
		data += "<param name="\"NOLOGO\"" value="\"true\"">";
		data += "<param name="\"ShowPositionControls\"" value="\"false\"">";
		data += "<embed type="\"application/x-mplayer2\"" src="\""" +="" onsei="" "\"="" autostart="\"true\"" height="\"30\"" controls="\"ControlPanel\"" console="\"cons\"" name="\"player\"" nologo="\"true\"">";
		//data += "<embed type="\"video/quicktime\"" src="\""" +="" onsei="" "\"="" autostart="\"true\"" height="\"30\"" controls="\"ControlPanel\"" console="\"cons\"" name="\"player\"" nologo="\"true\"">";
		data += "";
		data += "</object>";
	}
	// OSがWindowsで、ブラウザがFireFoxの場合
	else if(os_flag == 1 && browser_flag == 1)
	{
		data += "<object classid="\"CLSID:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\"" height="\"30\"" codebase="\"http://www.apple.com/qtactivex/qtplugin.cab\"">";
		data += "<param name="\"SRC\"" value="\""" +="" onsei="" "\"="">";
		data += "<param name="\"AUTOSTART\"" value="\"true\"">";
		data += "<param name="\"CONTROLS\"" value="\"ControlPanel\"">";
		data += "<param name="\"CONSOLE\"" value="\"cons\"">";
		data += "<param name="\"NOLOGO\"" value="\"true\"">";
		data += "<param name="\"ShowPositionControls\"" value="\"false\"">";
		data += "<embed type="\"video/quicktime\"" src="\""" +="" onsei="" "\"="" autostart="\"true\"" height="\"30\"" controls="\"ControlPanel\"" console="\"cons\"" name="\"player\"" nologo="\"true\"">";
		data += "";
		data += "</object>";
	}
	// OSがMacの場合
	else if(os_flag == 2)
	{
		data += "<object classid="\"CLSID:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B\"" height="\"30\"" codebase="\"http://www.apple.com/qtactivex/qtplugin.cab\"">";
		data += "<param name="\"SRC\"" value="\""" +="" onsei="" "\"="">";
		data += "<param name="\"AUTOSTART\"" value="\"true\"">";
		data += "<param name="\"CONTROLS\"" value="\"ControlPanel\"">";
		data += "<param name="\"CONSOLE\"" value="\"cons\"">";
		data += "<param name="\"NOLOGO\"" value="\"true\"">";
		data += "<param name="\"ShowPositionControls\"" value="\"false\"">";
		data += "<embed type="\"audio/mp3\"" src="\""" +="" onsei="" "\"="" autostart="\"true\"" height="\"30\"" controls="\"ControlPanel\"" console="\"cons\"" name="\"player\"" nologo="\"true\"">";
		data += "";
		data += "</object>";
	}

	document.write(data);
}

// 2009-05-13, Lijun added for iPhone version(iPhone support "stringByEvaluatingJavaScriptFromString()")
function SetShowLayers(show_layer)
{
	document.search.layer.id = show_layer;
}
//

function HideLayer()
{
	var i;
	var num_layer = document.search.layer.value;
	var show_layer = document.search.layer.id;

	for (i = 0; i < num_layer; i++)
	{
		var layer_name = "layer" + i;
		var layer_elements = document.getElementsByName(layer_name);
		if (!layer_elements.length)
			continue;

		var cur_layer = layer_elements[0].value;
		if (cur_layer > show_layer)
		{
			$("#tango" + i).hide();
			document.search["con"+i].src = "ClosedLayer.gif";
		}
		else
		{
			$("#tango" + i).show();
			document.search["con"+i].src = "OpenedLayer.gif";
		}
	}

}

// 画像のポップアップ
function i_popup(url)
{
	var width = 500;
	var height = 500;
	var left = (window.screen.width-width)/2;
	var top = 0;
	if (window.screen.height > height)
	{
		top = (window.screen.height-height)/2;
	}
	var option = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",scrollbars=yes,resizable=yes,menubar=no,location=no,status=no,toolbar=no";
	window.open(url,"web_stedman",option);
}

// 音声のポップアップ
function v_popup(url)
{
	var width = 350;
	var height = 100;
	var left = (window.screen.width-width)/2;
	var top = (window.screen.height-height)/2;
	var option = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top + ",scrollbars=no,resizable=yes,menubar=no,location=no,status=no,toolbar=no";
	window.open(url,"web_stedman",option);
}

// 2009-05-14, Lijun added for iPhone version(iPhone support "stringByEvaluatingJavaScriptFromString()")
function SetInlineImage(inline_image)
{
	if (inline_image == 0)
	{
		document.getElementById("small_image").style.display = "inline";
		document.getElementById("big_image").style.display = "none";
	}
	else
	{
		document.getElementById("small_image").style.display = "none";
		document.getElementById("big_image").style.display = "inline";
	}
}
//

// 2009-05-21, Lijun added for Safari doesn't support "style=zoom:xx"
function SetBodyFontSize(font_size)
{
	if (font_size == 1)
		document.body.style.fontSize = "8pt";
	else if (font_size == 2)
		document.body.style.fontSize = "10pt";
	else if (font_size == 3)
		document.body.style.fontSize = "12pt";
	else if (font_size == 4)
		document.body.style.fontSize = "15pt";
	else if (font_size == 5)
		document.body.style.fontSize = "18pt";
	else
		document.body.style.fontSize = "12pt";
}

// 2009-05-24, Lijun added for Safari
function ScrollViewPosIntoView()
{
	//alert(123);
	var viewPosElement = document.getElementById("viewpos");
	if (viewPosElement)
		viewPosElement.scrollIntoView(true);

}
//

// 2009-06-23, Lijun added to support change image size on iPhone version
function SetImageSize(image_size)
{
    //alert(image_size);
    var image_elements = document.getElementsByName("image");
    var height_str = image_size + "%";
    for (i = 0; i < image_elements.length; i++)
    {
        image_elements[i].style.height = height_str;
        //image_elements[i].style.width = "auto";
    }
}
//

// 2010-03-02, Lijun added
// 受けとったIDは変数targetIDに格納。
function showHide(targetID)
{
	var ico_name = "con-" + targetID;
	var slash = document.search[ico_name].src.lastIndexOf("/") + 1;
	var length = document.search[ico_name].src.length;
	var file_name = document.search[ico_name].src.substring(slash, length);

	if(file_name == "ClosedLayer.gif")
		document.search[ico_name].src = "OpenedLayer.gif";
	else
		document.search[ico_name].src = "ClosedLayer.gif";


	if( document.getElementById(targetID)) { //指定のIDのついたオブジェクトがあったら処理する
		//指定されたIDのstyle.displayがnoneなら
		if( document.getElementById(targetID).style.display == "none") {
			//blockに変更する
			document.getElementById(targetID).style.display = "block";
		} else { //noneでなければ、つまりblockなら
			//noneにする
			document.getElementById(targetID).style.display = "none";
		}
	}
}

function showHideInit()
{
	var i;
	var num_layer = document.search.layer.value;
	var show_layer = document.search.layer.id;

	for (i = 0; i < num_layer; i++)
	{
		var layer_name = "layer" + i;
		var layer_elements = document.getElementsByName(layer_name);
		if (!layer_elements.length)
			continue;

		var cur_layer = layer_elements[0].value;
		var targetID = "li-" + i;
		var ico_name = "con-" + targetID;

		if (cur_layer > show_layer)
		{
			document.getElementById(targetID).style.display = "none";
			document.search[ico_name].src = "ClosedLayer.gif";
		}
		else
		{
			document.getElementById(targetID).style.display = "block";
			document.search[ico_name].src = "OpenedLayer.gif";
		}
	}
}
//

// 2010-06-29, Lijun added to reset the height of dummy table while resizing webView
function SetDummyTableHeight(tableHeight)
{
	var height_str = tableHeight + "px";
	document.getElementById("dummy").style.height = height_str;
}
//
</object>