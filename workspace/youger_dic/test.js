function GetMoreExplanation(elementID){
	//alert(1);
 	//document.location = 'http://meddic.medlive.test:2051/api/search.do?from=1&apiVersion=1&word=invoke&type=1&userType=2';
	ShowOrHideContent(elementID);
}
function ShowOrHideContent(elementID)
{
	var element = document.getElementById(elementID);
	if(element.style.display=='none'){
		element.style.display = 'block';
	}else{
		element.style.display = 'none';
	}
}

function ShowOrHideExplanation(index)
{
	var element = document.getElementsByClassName("title")[index].nextElementSibling;
	if(element.style.display=='none'){
		element.style.display = 'block';
	}else{
		element.style.display = 'none';
	}
}

$(document).ready(function(){
		//window.wordDetail.initWordInfo();
		//initData(myJsonData);
		
		$('.title').bind("click", function(){
		
			var dicname=$(this);
			var explanation=dicname.next();
			var open_on=function(){
				explanation.toggle();
				var pos_top = dicname.position().top;
				$("body").animate({scrollTop: pos_top}, 500);
			}
			open_on();	
		});

	})