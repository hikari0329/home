var ssvalue = "";
var name = "";
$(function(){
	AuthSessopn();
});

function AuthSessopn() {
	$("#google_logout").css('display', 'none');
	getSession("name");
	name = ssvalue;
	if (name == "") {
	//if (name == "") {	
		loadApi();
		$("#google_login").css('display', '');
		$("#google_logout").css('display', 'none');
	} else {
		$("#google_login").css('display', 'none');
		$("#google_logout").css('display', '');
		//$("#imgUrl").html("<img style='width: 40 px;' src='" + imgUrl + "'/><br/>");
		$("#google_logout").text(name + ' 登出');
	}
}

function AuthCookie() {
	$("#google_logout").css('display', 'none');
	name = getCookie("name");
	if (name == "") {
	//if (name == "") {	
		loadApi();
		$("#google_login").css('display', '');
		$("#google_logout").css('display', 'none');
	} else {
		$("#google_login").css('display', 'none');
		$("#google_logout").css('display', '');
		//$("#imgUrl").html("<img style='width: 40 px;' src='" + imgUrl + "'/><br/>");
		$("#google_logout").text(name + ' 登出');
	}
}

function initGoogleSignIn() {
  gapi.load('auth2', function() {
	gapi.auth2.init({
	  client_id: '683176154967-q74gmc90qnar7enm3ilgkn9amv93unfj.apps.googleusercontent.com',
	});
  });
}

function signIn() {
  gapi.auth2.getAuthInstance().signIn().then(function(response) {
	var user = response.getBasicProfile();
	console.log('ID: ' + user.getId());
	console.log('Name: ' + user.getName());
	console.log('Email: ' + user.getEmail());
  }, function(error) {
	console.error('登入失敗: ' + error);
  });
}

var client_id = "683176154967-q74gmc90qnar7enm3ilgkn9amv93unfj.apps.googleusercontent.com",
	apiKey = "AIzaSyAycuLascfUHSMVJNFhXY0OTnMu_ADDUmI",
	scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email" ,// https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read",
	personFields = "names,emailAddresses,photos",//genders,birthdays",
	discovery_doc = "https://www.googleapis.com/discovery/v1/apis/people/v1/rest",
	resourceName = "people/me",
	$persoanl_info = $("#persoanl_info"),
	tokenClient;

var result = "",
	errorMessage = "請重新登入, 並勾選生日及性別!",
	html = "",
	id, name, email;//,, imgUrl gender, birthday, birthdayStr;

// 載入 google api
function loadApi() {
	// 載入 gapi
	$.getScript("https://apis.google.com/js/api.js", function() {
		gapi.load("client", function() {
			gapi.client.init({
				apiKey: apiKey,
				discoveryDocs: [discovery_doc],
			});
		});
	});

	// 載入 gsi
	$.getScript("https://accounts.google.com/gsi/client", function() {
		tokenClient = google.accounts.oauth2.initTokenClient({
			client_id: client_id,
			scope: scope,
			callback: signIn_callback,
			error_callback: error_callback
		});
	});

	// 登入後 callback
	function signIn_callback(res) {
		// 登入失敗時
		if (res.error !== undefined) {
			console.log(res.error);
			$persoanl_info.html(res.error);
		}

		// 登入成功後
		if (res && res.access_token) {
			// 顯示帳號資訊
			listAccountInfo();		
		}
	}

	// 捕捉非 OAuth 錯誤 或是在傳回 OAuth 回應前遭到關閉
	function error_callback(res) {
		console.log(res);
		$persoanl_info.html(res.message);
	}

	// 顯示帳號資訊
	function listAccountInfo() {
		// 呼叫 people api 取得資料
		gapi.client.people.people.get({
			"resourceName": resourceName,
			"personFields": personFields,
		}).then(function(res) {
			// 顯示資料
			result = res.result;
			errorMessage = "請重新登入, 並勾選生日及性別!";
			html = "";

			// 沒有勾選生日、性別時
			//if (!result.genders || !result.birthdays) {
				//alert(errorMessage);
				//$persoanl_info.html(errorMessage);
				//return;
			//}
		
			id = result.resourceName.split("/")[1];
			name = result.names[0].displayName;
			//imgUrl = result.photos[0].url;
			email = result.emailAddresses[0].value;
			//gender = result.genders[0].formattedValue;
			//birthday = result.birthdays[1].date;
			//birthdayStr = birthday.year + "-" + birthday.month + "-" + birthday.day;

			html += "ID： " + id + "<br/>";
			html += "暱稱： " + name + "<br/>";
			//html += "頭像：<img style='width: 40 px;' src='" + imgUrl + "'/><br/>";
			html += "email：" + email + "<br/>";
			//html += "性別：" + gender + "<br/>";
			//html += "生日：" + birthdayStr + "<br/>";
			//$persoanl_info.html(html);

			setCookie("id",id,1);
			setCookie("name",name,1);
			setCookie("email",email,1);
			
			setSession("id",id);
			setSession("name",name);
			setSession("email",email);
			
			getSession("name");
			alert(ssvalue + " 登入成功");
			window.location.reload();			
		});
	}
}

// 點擊登入按鈕
$("#google_login").click(function() {
	
	// 進動畫
	$persoanl_info.html("<img src='https://lh5.googleusercontent.com/-EyVZ0f8J0qQ/UCeEG7aa8nI/AAAAAAAADtY/9sXw53XkYXM/s512/indicator-light.gif' /> <span>請稍後...</span>");
	
	if (gapi.client.getToken() === null) {
		// 未登入則彈出登入視窗
		tokenClient.requestAccessToken();
	} else {
		// 已登入則不彈出視窗
		tokenClient.requestAccessToken({
			prompt: ""
		});
	}
});

// 點擊登出按鈕
$("#google_logout1").click(function() {
	var token = gapi.client.getToken();
	if (token !== null) {
		google.accounts.oauth2.revoke(token.access_token);
		gapi.client.setToken("");

		// 登出後的動作
		//$persoanl_info.html("已登出");
		setCookie("id","",0);
		setCookie("name","",0);
		setCookie("email","",0);
		//$("#imgUrl").html("<img style='width: 40 px;' src='" + imgUrl + "'/><br/>");
		window.location.reload();		
	}
});

$("#google_logout").click(function() {	
	if (getCookie("id") != "") {		
		//$persoanl_info.html("已登出");
		setCookie("id","",0);
		setCookie("name","",0);
		setCookie("email","",0);
		setSession("id","");
		setSession("name","");
		setSession("email","");		
		window.location.reload();	
	}
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var setSession = function(skey,svalue){
	$.ajax({
		async: false,	
		url: "../php/setSession.php",
		data: "skey=" + skey + "&svalue=" + svalue,
		type: "POST",
		dataType:"text",
		success: function(resp){			
			if (resp.length == 0) {
				//$("#show_info").html(sql).css({color:"red"});
				ssvalue = "";
			} else {
				ssvalue = resp;
			}
			//alert(resp[0][0]);
			//$("#show_info").html("作業成功");
		},
		error: function(xhr, ajaxOptions, thrownError){
			//$("#show_info").html("作業失敗：" + thrownError).css({color:"red"});
			ssvalue = "";
			//alert(xhr.status);
			//alert(thrownError);
		}
	});
	//return result;
	//alert(ssvalue);
}

var getSession = function(skey){
	$.ajax({
		async: false,	
		url: "../php/getSession.php",
		data: "skey=" + skey,
		type: "POST",
		dataType:"text",
		success: function(resp){			
			if (resp.length == 0) {
				//$("#show_info").html(sql).css({color:"red"});
				ssvalue = "";
			} else {
				ssvalue = resp;
			}
			//alert(resp[0][0]);
			//$("#show_info").html("作業成功");
		},
		error: function(xhr, ajaxOptions, thrownError){
			//$("#show_info").html("作業失敗：" + thrownError).css({color:"red"});
			ssvalue = "";
			//alert(xhr.status);
			//alert(thrownError);
		}
	});
	//return result;
	//alert(ssvalue);
}

async function getIpClient() {	
	try {
		response = await axios.get('https://api.ipify.org?format=json');
		var myJSON = JSON.stringify(response);
		var obj = JSON.parse(myJSON);
		IPAdr = obj.data.ip;
		//console.log(response);
		console.log(IPAdr);
		//alert(IPAdr);
		//setCookie("IPAdr", IPAdr, 1)
	} catch (error) {
		console.error(error);
	}
}