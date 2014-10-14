	function OKBook_indexing(urlcsv){
        //alert("cool");
        var info_node = document.getElementById("info");
        info_node.innerHTML = "";
        var req;
        var url = "/IMAnnotator/org/openk/annotator/servlet/IndexServlet";
        var para = "urlcsv=" + encodeURI(urlcsv);
        if(window.XMLHttpRequest){
            req = new window.XMLHttpRequest();
        }
        else if(window.ActiveXObject){
            req = new window.ActiveXObject("XMLHTTP");
        }
        req.open("POST", url, true);
        req.onreadystatechange = function () {
            if(req.readyState == 4){
                if(req.status == 200){
                    info_node.innerHTML = req.responseText;
                }
            }
        }
        req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	req.setRequestHeader("Content-length", para.length);
	req.setRequestHeader("Connection", "close");
        req.send(para);
    }

	function OKBook_harvesting(){
     /*   var info_ele = document.getElementById("info");
        info_ele.innerHTML = "";
        var url = "$module_folder/" + "harvesting.php";
        var req;
        if(window.XMLHttpRequest){
            req = new window.XMLHttpRequest();
        }
        else if(window.ActiveXObject){
            req = new window.ActiveXObject("XMLHTTP");
        }
        req.open("GET", url, true);
        req.onreadystatechange = function () {
            if(req.readyState == 4)
                if(req.status == 200){
                    info_ele.innerHTML = req.responseText;
            }
        }
        req.send(null);
		*/
    }
	
	function OKBook_presubmit(){
      var prep = document.getElementById("preprocess");
      prep.style.display = "none";
      var myframe = document.getElementById("matchresult");
      myframe.style.display = "block";
      var myform = document.getElementById("preprocessform");
      myform.submit;//very annoying, submit() is supposed to work.
   }