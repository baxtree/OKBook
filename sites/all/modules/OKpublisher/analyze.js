    function analyze(im, user_kb, base, module_path, analysis_id, uid, nid) {
	    //alert(urldecode(im));
		//alert(urldecode(user_kb));
		//alert(urldecode(base));
		//alert(analysis_id);
		//alert(uid);
		//alert(nid);
		var analysis_button = document.getElementById("analyze");
		analysis_button.style.display = "none";
		var loading_indicator = document.getElementById("loading");
		loading_indicator.style.display = "block";
        im_published_content = urldecode(im);
        user_local_kb = urldecode(user_kb);
		base_uri = urldecode(base);
		module_path = urldecode(module_path);
		var req;
		if (window.XMLHttpRequest){
			req = new window.XMLHttpRequest();
		}
		else if (window.ActiveXObject){
			req = new window.ActiveXObject("XMLHTTP");
		}
		var url = "http://localhost:10081/IMAnnotator/org/openk/annotator/servlet/DiscoverServlet";
		var para = "rdfacontent=" + escape(im_published_content) + "&localkb=" + escape(user_local_kb) + "&baseuri=" + escape(base_uri);
		//alert(para);
		req.open("POST", url, true);
		req.onreadystatechange = function () {
			if(req.readyState == 4){
				if(req.status == 200){
					//alert(req.responseText);
					loading_indicator.style.display = "none";
					var analysis_result = document.getElementById(analysis_id);
					//alert("$"+req.responseText+"$");
					if(req.responseText === "none"){
						analysis_result.innerHTML = "<span style='color:red'>Sorry. No role you can play in this interaction model.</span>";
					}
					else{
						var role_uris = req.responseText.split(",");
						var role_list = "<ul style='color:blue'>Cool. You can play following role(s) in this interaction model.";
						for(var i = 0 ; i < role_uris.length; i++){
							role_list += "<li id='" + role_uris[i] + "'>" + role_uris[i] + "<button name='subscribe' value='subscribe' style='width: 100px; height: 25px' onclick='subscribe(\""+ uid + "\",\""+ nid + "\",\"" + module_path + "\",\"" + role_uris[i] + "\");'>subscribe</button></li>";
						}
						role_list += "</ul>";
						analysis_result.innerHTML = role_list;
					}
				}
			}
		}
		req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		req.setRequestHeader("Content-length", para.length);
		req.setRequestHeader("Connection", "close");
		req.send(para);
		//alert("here");
    }
	
	function subscribe(uid, nid, module_path, role_uri) {
		var req;
		var url = "/drupal/" + module_path + "/subscribe.php?uid=" + uid + "&nid=" + nid + "&role_uri=" + urlencode(role_uri);
		//alert(url);
		if(window.XMLHttpRequest){
			req = new window.XMLHttpRequest();
		}
		else if(window.ActiveXObject){
			req = new window.ActiveXObject("XMLHTTP");
		}
		req.open("GET", url, true);
		req.onreadystatechange = function () {
			if(req.readyState == 4){
				if(req.status == 200){
					//alert(req.responseText);
					var analysis_result_li = document.getElementById(role_uri);
					//alert(analysis_result_li);
					if(req.responseText === "yes"){
						analysis_result_li.innerHTML = role_uri + "<br/> Sorry. You have already subscribed to this IM playing this role. Do you want to unsubscribe it? <button name='unsubscribe' value='unsubscribe' style='width: 100px; height: 25px'  onclick='unsubscribe(\""+ uid + "\",\""+ nid + "\",\"" + module_path + "\",\"" + role_uri + "\")'>YES</button><button name='cancel' value='cancel' style='width: 100px; height: 25px'  onclick='cancel();'>NO</button>";
					}
					else if(req.responseText === "no"){
						analysis_result_li.innerHTML = role_uri + "<br/>You successfully subscribed to this IM. The service will come and please be patient. You can unsubscribe this IM by clicking the button. <button name='unsubscribe' value='unsubscribe' style='width: 100px; height: 25px'  onclick='unsubscribe(\""+ uid + "\",\""+ nid + "\",\"" + module_path + "\",\"" + role_uri + "\")'>unsubscribe</button>";
					}
					else{
						analysis_result_li.innerHTML = role_uri + "<br/>Error occured!";
					}
				}
			}
		}
		req.send(null);
	}
	
	function unsubscribe(uid, nid, module_path, role_uri) {
		var req;
		var url = "/drupal/" + module_path + "/unsubscribe.php?uid=" + uid + "&nid=" + nid + "&role_uri=" + urlencode(role_uri);
		//alert(url);
		if(window.XMLHttpRequest){
			req = new window.XMLHttpRequest();
		}
		else if(window.ActiveXObject){
			req = new window.ActiveXObject("XMLHTTP");
		}
		req.open("GET", url, true);
		req.onreadystatechange = function () {
			if(req.readyState == 4){
				if(req.status == 200){
					//alert(req.responseText);
					var analysis_result_li = document.getElementById(role_uri);
					if(req.responseText === "deleted"){
						analysis_result_li.innerHTML = "You successfully unsubscribed to this IM. But you can also resubscribe it by clicking the button. <button name='subscribe' value='subscribe' style='width: 100px; height: 25px' onclick='subscribe(\""+ uid + "\",\""+ nid + "\",\"" + module_path + "\",\"" + role_uri + "\");'>subscribe</button>"
					}
					else if(req.responseText === "not_deleted"){
						analysis_result_li.innerHTML = "You cannot unsubscribe to this IM.";
					}
					else{
						analysis_result_li.innerHTML = role_uri + "<br/>Error occured!";
					}
				}
			}
		}
		req.send(null);
	}
	
	function cancel() {
		alert("nothing happened.");
	}