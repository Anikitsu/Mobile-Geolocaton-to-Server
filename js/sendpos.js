var url="http://192.168.137.1:8010";
var xhr=new XMLHttpRequest();

function sendpos(po){
	xhr.open("POST",url,true);
//	xhr.withCredentials=true;
	var posmessage=JSON.stringify(po)
	xhr.send(posmessage);
	console.log(posmessage);
}
var sst=document.getElementById("serverstatus");
xhr.onreadystatechange=function(){
	switch (xhr.readyState){
		case 1:
			sst.innerHTML='不在，cmn';
			break;
		case 2:
			sst.innerHTML='请求已发送';
			break;
		case 3:
			sst.innerHTML='请求处理中';
			break;
		case 4:
			var endtime=new Date().toLocaleTimeString();
			if (xhr.status==200) {sst.innerHTML='传输完成于'+endtime;}
			if (xhr.status==404) {sst.innerHTML='tan90';}
			break;
		default:
			sst.innerHTML='';
			break;
	}
}
