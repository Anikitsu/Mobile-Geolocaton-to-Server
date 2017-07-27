# Mobile-Geolocaton-to-Server
个人用途移动APP，用于在“一些特殊的情况”下，将实时位置持续记录在服务器上
An app on mobile phone for private use, aimming to keep recording geolocation on a private server, in 'some special situations'.

APP基于 HTML5+ 开发，附带Node.js的服务器端

[APP说明]
0)	已发布安卓端v0.0.1版本apk，可以参考[服务端说明].0设置服务端以体验
	// apk.path=unpackage/release/*.apk
1)	目前持续记录每次间隔时间为5秒，可在GeoSafty.html中，watchPos内更改

2)	使用带有cookie的POST请求向服务端发送位置数据，cookie可在GeoSafty.html中，plusReady内更改

3)	POST的目标URL在js/sendpos.js内设置

4)	更改设置后，在打包app前请在manifest内自行添加 百度地图appkey

5)	仍保留在ios端上运行的机能，但尚未进行测试

[服务端说明]
0)	v0.0.1版本用于局域网内测试，服务端局域网内IP设为192.168.137.1

1)	服务开放8010端口，可在GSserver.js内更改

2)	对收到的POST请求，会进行cookie校验，对于不含cookie以及未通过cookie校验的请求会回复404

3)	接收的位置信息会记录在geotrack.txt中，如果此txt不存在会自行创建

4)	保存的位置信息中的坐标，使用的是GCJ02标准