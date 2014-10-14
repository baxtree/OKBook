 var labels = new Array();
 var uris = new Array();
 var zz = -1;
 var previous_request;
    
	
    function beKeyUp()
            {
				if(previous_request != undefined){
					previous_request.abort();
				}
                var key = document.getElementById("query").value;
                if(key.length>0)
                {
					url = "http://localhost:10081/IMAnnotator/org/openk/annotator/servlet/DBpediaURILookupServlet?keywords=" + key;
					url = encodeURI(url);
					if(window.XMLHttpRequest){
						req = new window.XMLHttpRequest();
					}
					else if(window.ActiveXObject){
						req = new window.ActiveXObejct("XMLHTTP");
					}
					
					req.open("GET", url, true);
					req.onreadystatechange = function () {
						if(req.readyState == 4){
							if(req.status == 200){
								var root = req.responseXML.documentElement;
								var results = root.getElementsByTagName("Result");
								positionDiv();
								document.getElementById("search_suggest").innerHTML="";
								if(results.length == 0){
									document.getElementById("search_suggest").style.display="none";
								}
								else{
									for(var i = 0 ; i < results.length; i++){
										labels[i] = results[i].childNodes[1].childNodes[0].nodeValue;
										uris[i] =  results[i].childNodes[5].childNodes[0].nodeValue;
										document.getElementById("search_suggest").innerHTML+=" <div id='item" + i + "' class='itemBg' onmouseover='beMouseOver(" + i +")' onmouseout='beMouseOut(" + i + ")' onclick='beClick(" + i + ")'>" + decodeURI(labels[i]) + " </div>";
									}
									document.getElementById("search_suggest").innerHTML+=" <div class='item_button' onclick='hiddenDiv();'> <font color='#999999'>close</font> </div>";
									document.getElementById("search_suggest").style.display="inline";
								}
							}
						}
					}
					req.send(null);
					previous_request = req;
                }
            }
			            
            function positionDiv()
            {
                var DivRef= document.getElementById("search_suggest");
                DivRef.style.position = "absolute";
                var t=document.getElementById("query");
                DivRef.style.top= getAbsolutePos(t).y;
                DivRef.style.left= getAbsolutePos(t).x ;
                DivRef.style.height=labels.length * 20;
            }
           
            function hiddenDiv()
            {
                document.getElementById("search_suggest").style.display="none";
            }
           
            function getAbsolutePos(el)
            {
                var SL = 0, ST = 0;
                var is_div = /^div$/i.test(el.tagName);
                if (is_div && el.scrollLeft) SL = el.scrollLeft;
                if (is_div && el.scrollTop) ST = el.scrollTop;
                var r = { x: el.offsetLeft - SL, y: el.offsetTop - ST };
                if (el.offsetParent)
                {
                    var tmp = this.getAbsolutePos(el.offsetParent);
                    r.x += tmp.x;
                    r.y += tmp.y;
                }
                return r;
            }
           
               
            function beMouseOverEFF(i)
            {
                if ((i>=0)&(i <=labels.length-1))
                {
                    document.getElementById("item" + i).className="item_high";
                }
            }

            
            function beMouseOutEFF(i)
            {
                if ((i>=0)&(i <=labels.length-1))
                {
                    document.getElementById("item" + i).className="item_normal";
                }
            }

            
            function beMouseOver(i)
            {
                document.getElementById("query").focus();
                beMouseOutEFF(zz);
                zz=i;
                beMouseOverEFF(zz);
            }

            
            function beMouseOut(i)
            {
                beMouseOutEFF(i);
            }
            
            function beClick(i)
            {
				
                document.getElementById("query").value= document.getElementById("query").value + " <" + uris[i] + ">";
				document.getElementById("search_suggest").style.display="none";
				document.getElementById("query").focus();
            }