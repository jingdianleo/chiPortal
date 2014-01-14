function debug(obj){
	var code ;
	for(var p in obj){
		code += "<p style='padding:5px'><b style='margin-right:10px'>property:"+p+"</b>"+"value:"+obj[p]+" </p>";
	}
	debugWindow = window.open('about:blank', 'Debug', 'width=600,height=400,scrollbars=1,resizable,status');
	debugWindow.document.write("<html><title>Debug</title>"+code+"</html>");

}


function doAction(action){
	var obj = $('#x-main');
	var html = "<div id='iframe-loading'><img class='img' src='/images/loading.gif' /><span class='span'>Loading...</span></div>";
		html += "<iframe id='iframe' width='100%' allowtransparency='true' scrolling='auto' frameborder='0'></iframe>"; 
	obj.html(html);
	$('#iframe-loading').show();
	$('#iframe').height(obj.height()).attr('src',action);
	
	var iframe = $('#iframe').get(0);
    iframe.onload = function(){
        $('#iframe-loading').hide();
        iframe.style.display = "block";
    };
}

function execMethod(methodName){
	this.func = function(){};
	try{
		this.func = eval(methodName);
	}catch(e){
		alert("error exception: not found this mehtod :" + methodName );
	}
}

function goUrl(url){
	window.location.href=url;
}

//点击拷贝
function copyText(obj){ 
	obj.select(); 
	js=obj.createTextRange(); 
	js.execCommand("Copy");
	alert('已复制');
} 

//删除左右两端的空格
function trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//删除左边的空格
function ltrim(str){ 
  return str.replace(/(^\s*)/g,"");
}
//删除右边的空格
function rtrim(str){ 
 return str.replace(/(\s*$)/g,"");
}

//start with
String.prototype.startWith=function(str){     
    var reg=new RegExp("^"+str);     
    return reg.test(this);        
}  
//end with
String.prototype.endWith=function(str){     
    var reg=new RegExp(str+"$");     
    return reg.test(this);        
}  

//获取字符的长度，汉字算两个占位
function CheckStrLength(strTemp)
{
	 var i,sum;
	 sum=0;
	 for(i=0;i<strTemp.length;i++)
	 {
	  if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255))
	   sum=sum+1;
	  else
	   sum=sum+2;
	 }
	 return sum;
}

//检查字符是否为空
function isNull(){
	var value = arguments[0];
	if(value == undefined || value == "undefined" || value == "" || value.length < 1)
		return true;
	return false;
}

//图片插入小图片
function InsertSmallToImgUrl(imgUrl,small){
	var index = imgUrl.lastIndexOf(".");
	imgUrl = imgUrl.substring(0,index) + small + imgUrl.substr(index);
	return imgUrl;
}

//验证邮箱格式是否正确
function IsEmail(emailStr){
    var re=/^[\w-]+(\.*[\w-]+)*@([0-9a-z]+(([0-9a-z]*)|([0-9a-z-]*[0-9a-z]))+\.)+[a-z]{2,3}$/i;
    if(re.test(emailStr))
        return true;
    else
        return false;
}

//兼容浏览器，同IE的outerHTML
function GetOuterHTML(element)
{
	return document.createElement("DIV").appendChild(element.cloneNode(true)).parentNode.innerHTML;
}

//获取对象位置信息
function GetPlace(o){
	var to = new Object();
	to.left = to.right = to.top = to.bottom = 0;
	var twidth = o.offsetWidth;
	var theight = o.offsetHeight;
	while(o!=document.body){
		try{
			to.left += o.offsetLeft;
			to.top += o.offsetTop;
			o = o.offsetParent;
		}catch(e){break;}
	}
	to.right = to.left + twidth;
	to.bottom = to.top + theight;
	return to;
}

/**
 * @classDescription 获取滚动条上边距
 * @author ice deng
 * @return (Array)
 */
function getPageScroll(){
	var yScroll;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
	}
	arrayPageScroll = new Array('',yScroll) 
	return arrayPageScroll;
}


/**
 * @classDescription 获取窗口大小
 * @author ice deng
 * @return (Array)
 */
function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}

function IsEmail(emailStr){
    var re=/^[\w-]+(\.*[\w-]+)*@([0-9a-z]+(([0-9a-z]*)|([0-9a-z-]*[0-9a-z]))+\.)+[a-z]{2,3}$/i;
    if(re.test(emailStr))
        return true;
    else
        return false;
}

 
function IsTelephone(obj) 
{ 
	var pattern=/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/; 
	if(pattern.test(obj)){ 
		return true; 
	} 
	else{ 
		return false; 
	} 
} 



function isCharsInBagEn (s, bag) 
{ 
	var i,c; 
	for (i = 0; i < s.length; i++) 
	{ 
		c = s.charAt(i);//字符串s中的字符 
		if (bag.indexOf(c) <0) 
			return c; 
	} 
	return ""; 
} 


function isEnglish(s) 
{ 
	var errorChar; 
	var badChar = " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; 
	errorChar = isCharsInBagEn( s, badChar);
	if (errorChar != "" ) 
	{ 
		alert("请重新输入英文");
		return false; 
	}
	return true;
} 

function isNumber(s) 
{ 
	var errorChar; 
	var badChar = "0123456789"; 
	errorChar = isCharsInBagEn( s, badChar) ;
	if (errorChar != "" ) 
	{ 
		alert("请重新输入英文\n"); 
		return false; 
	}
	return true;
} 

 
function CutString(str,len){
	if(StrLength(str)>len){
		var tmpstr = "";
		for(var i=0;i<str.length;i++){
			var tmplen=StrLength(tmpstr);
			if(tmplen == len){
				break;
			}else{
				if(tmplen+StrLength(str.substr(i,1))>len)
					tmpstr+=" ";
				else
					tmpstr+=str.substr(i,1);
			}
		}
		return tmpstr+"...";
	}
	else{
		return str;
	}
}

function strLength(strTemp)
{
	 var i,sum;
	 sum=0;
	 for(i=0;i<strTemp.length;i++)
	 {
	  if ((strTemp.charCodeAt(i)>=0) && (strTemp.charCodeAt(i)<=255))
	   sum=sum+1;
	  else
	   sum=sum+2;
	 }
	 return sum;
}

function setCopy(meintext){
 	if(window.clipboardData){
		window.clipboardData.setData("Text", meintext);
	}else {
		if(!setCopy.isInit){
			Body = document.getElementsByTagName("body").item(0);
			var flashCopier = document.createElement("div");
			flashCopier.setAttribute("id","flashcopier");
			Body.appendChild(flashCopier);
			setCopy.isInit = true;
		}
		$("flashcopier").innerHTML = "<embed src=\"http://www.yoho.cn/swf/copy.swf?flashcopier="+meintext+"\" width=\"0\" height=\"0\" type=\"application/x-shockwave-flash\"></embed>";
	}
 return true;
};
setCopy.isInit = false;

// createPopup
if (!window.createPopup) {   
    var __createPopup = function() {   
        var SetElementStyles = function( element, styleDict ) {   
            var style = element.style ;   
            for ( var styleName in styleDict )style[ styleName ] = styleDict[ styleName ] ;    
        }   
        var eDiv = document.createElement( 'div' );    
        SetElementStyles( eDiv, { 'position': 'absolute', 'top': 0 + 'px', 'left': 0 + 'px', 'width': 0 + 'px', 'height': 0 + 'px', 'zIndex': 1000, 'display' : 'none', 'overflow' : 'hidden' } ) ;   
        eDiv.body = eDiv ;   
        var opened = false ;   
        var setOpened = function( b ) {   
            opened = b;    
        }   
        var getOpened = function() {   
            return opened ;    
        }   
        var getCoordinates = function( oElement ) {   
            var coordinates = {x:0,y:0} ;    
            while( oElement ) {   
                coordinates.x += oElement.offsetLeft ;   
                coordinates.y += oElement.offsetTop ;   
                oElement = oElement.offsetParent ;   
            }   
            return coordinates ;   
        }   
        return {htmlTxt : '',
        	   	document : eDiv,
        	   	isOpen : getOpened(),
			   	isShow : false,
				hide : function() { SetElementStyles( eDiv, { 'top': 0 + 'px', 'left': 0 + 'px', 'width': 0 + 'px', 'height': 0 + 'px', 'display' : 'none' } ) ;
					 eDiv.innerHTML = '' ;
					 this.isShow = false ;
					 },
				show : function( iX, iY, iWidth, iHeight, oElement ) { 
						if (!getOpened()) { 
							document.body.appendChild( eDiv ) ;
							setOpened( true ) ;
						};
						this.htmlTxt = eDiv.innerHTML ;
						if (this.isShow){
							this.hide() ;
						} ;
						eDiv.innerHTML = this.htmlTxt ;
						var coordinates = getCoordinates ( oElement ) ;
						eDiv.style.top = ( iX + coordinates.x ) + 'px' ; eDiv.style.left = ( iY + coordinates.y ) + 'px' ;
						eDiv.style.width = iWidth + 'px' ;
						eDiv.style.height = iHeight + 'px' ;
						eDiv.style.display = 'block' ;
						this.isShow = true ;
						}
			}  ;
    }   ;
    window.createPopup = function() {   
        return __createPopup();    
    }  ;
}
/**
 * format date for example new Date().format("yyyy-MM-dd");
 * @param format
 * @return
 */
Date.prototype.format = function(format)   
{   
        var o =   
        {   
            "M+" : this.getMonth()+1, //month   
            "d+" : this.getDate(),    //day   
            "h+" : this.getHours(),   //hour   
            "m+" : this.getMinutes(), //minute   
            "s+" : this.getSeconds(), //second   
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter   
            "S" : this.getMilliseconds() //millisecond   
        };
        if(/(y+)/.test(format))   
        format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));   
        for(var k in o)   
        if(new RegExp("("+ k +")").test(format))   
        format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));   
        return format;   
}


function fixPng(myImage) 
{
	var arVersion = navigator.appVersion.split("MSIE");
	var version = parseFloat(arVersion[1]);
    if ((version >= 5.5) && (version < 7) && (document.body.filters)) 
    {
    	var imgID = (myImage.id) ? "id='" + myImage.id + "' " : ""
    	var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : ""
    	var imgTitle = (myImage.title) ? "title='" + myImage.title  + "' " : "title='" + myImage.alt + "' ";
    	var imgStyle = "display:inline-block;" + myImage.style.cssText
    	var strNewHTML = "<span " + imgID + imgClass + imgTitle
    					+ " style=\"" + "width:" + myImage.width 
    					+ "px; height:" + myImage.height 
    					+ "px;" + imgStyle + ";"
    					+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
    					+ "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>"
    	myImage.outerHTML = strNewHTML ;
    }
}


function compareDate(startdt,stopdt)
{
	var arr1=startdt.split("-");
	var startDate=new Date(arr1[0],arr1[1],arr1[2]);
	var starttime = startDate.getTime();
	
	var arr2=stopdt.split("-");
	var stopDate=new Date(arr2[0],arr2[1],arr2[2]);
	var stoptime=stopDate.getTime();

	if(starttime>stoptime)
	{ 
		return false;
	}else{
		return true;
	}
}

/**
 * 
 * format "YYYY-MM-DD HH:MM:SS"; 
 * @param startTime
 * @param endTime
 * @return
 */
function compareTime(beginTime , endTime){
	
	var beginTimes=beginTime.substring(0,10).split('-');
	var endTimes=endTime.substring(0,10).split('-');

	beginTime=beginTimes[1]+'-'+beginTimes[2]+'-'+beginTimes[0]+' '+beginTime.substring(10,19);
	endTime=endTimes[1]+'-'+endTimes[2]+'-'+endTimes[0]+' '+endTime.substring(10,19);

	alert(beginTime+"aaa"+endTime);
	alert(Date.parse(endTime));
	alert(Date.parse(beginTime));
	var a =(Date.parse(endTime)-Date.parse(beginTime))/3600/1000;
	if(a<0){
		alert("endTime小!");
	}else if (a>0){
		alert("endTime大!");
	}else if (a==0){
		alert("时间相等!");
	}else{
		return 'exception';
	}
}

//过滤非法字符
function isTchars(s) { 
	var patrn=/^[^`~!*@$%^&()\-+=|\\\] [\]\{\}:;'\,.<>?]{1}[^`~!*@$%^&()\-+=|\\\] [\]\{\}:;'\,.<>?]{0,19}$/; 
	if(!patrn.exec(s)){
		return false ;
	}
	return true ;
}

