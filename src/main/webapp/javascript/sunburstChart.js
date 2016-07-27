       var svgNS = "http://www.w3.org/2000/svg";	

	   var centerX = 390;
	   var centerY = 335;
	
	   var COLOR_NUM = 256;
	
	   var chartColors = Array(COLOR_NUM);
	   
	   for (var i = 0; i < COLOR_NUM; i++) {
		   var red = 128 + parseInt(Math.random() * 127);
		   var green = 255 - parseInt(Math.random() * 127);
		   var blue = 128 + parseInt(Math.random() * 127);
		   chartColors[i] = "#" + red.toString(16) + green.toString(16) + blue.toString(16);
	   }
	   
	   var ROOT_FILES_COLOR = "#b0b0b0";
	   
       function showDirName(titleText, sectorColor, mouseXPos, mouseYPos)	
	   {
		   var infoBoxYPos = mouseYPos;
		   if (infoBoxYPos > 30)
		   {
		       infoBoxYPos = mouseYPos - 30;
		   }
		   
		   var infoBoxXPos = mouseXPos + 5;
		   
           var infoBox = document.createElement("div");
		   infoBox.id = "infoBox";
           infoBox.setAttribute("class", "sunburstTreeInfo");
           infoBox.style.left = infoBoxXPos + "px";
           infoBox.style.top = infoBoxYPos + "px";
           infoBox.style.backgroundColor = sectorColor;
		   
		   infoBox.innerHTML = titleText;
		   
		   document.documentElement.appendChild(infoBox);
	   }
	   
	   function hideDirName() 
	   {
	       var infoBox = document.getElementById("infoBox");
		   if (infoBox) 
		   {
		       var parent = infoBox.parentNode;
			   parent.removeChild(infoBox);
		   }
	   }
	   
	   function showTitle(titleText, sectorColor)
	   {
	       var titleBox = document.getElementById("titleBox");
		   if (!titleBox)
		   {
		       return;
		   }
		   titleBox.innerHTML = titleText;
           titleBox.style.backgroundColor = sectorColor;
	       titleBox.style.visibility = "visible";
	   }
	   
	   function hideTitleText()
	   {
	       var titleBox = document.getElementById("titleBox");
		   if (!titleBox)
		   {
		       return;
		   }
	       titleBox.style.visibility = "hidden";
	   }

	   function pieChartSector(startAngle, endAngle, sectorColor, chartRadius, titleText, path, clickTarget) 
	   {
		   if (endAngle - startAngle > 180)
		   {
			   pieChartSectorInternal(startAngle, startAngle + 180, sectorColor, chartRadius, titleText, path, clickTarget, 1);
			   pieChartSectorInternal(startAngle + 180, endAngle, sectorColor, chartRadius, titleText, path, clickTarget, 2);
		   }
		   else 
		   {
			   pieChartSectorInternal(startAngle, endAngle, sectorColor, chartRadius, titleText, path, clickTarget);
		   }
	   }
	   
	   function pieChartSectorInternal(startAngle, endAngle, sectorColor, chartRadius, titleText, path, clickTarget, splitPart) 
	   {
	       var startRadiant = startAngle * Math.PI / 180;
	       var endRadiant = endAngle * Math.PI / 180;
	   
           var startX = centerX + (Math.cos(startRadiant) * chartRadius);
		   var startY = centerY + (Math.sin(startRadiant) * chartRadius);
		   var endX = centerX + (Math.cos(endRadiant) * chartRadius);
		   var endY = centerY + (Math.sin(endRadiant) * chartRadius);
		   
		   var largeArcFlag = 0;
		   if (endAngle - startAngle > 180) 
		   {
		       largeArcFlag = 1;
		   }
		   
		   var pathData;
		   
		   pathData = "M " + centerX + "," + centerY;

		   if ((!splitPart) || (splitPart == 1))
		   {
			   pathData = pathData + " L " + startX + "," + startY;
		   }
		   else
		   {
			   pathData = pathData + " M " + startX + "," + startY;
		   }

		   pathData = pathData + " A " + chartRadius + " " + chartRadius + " 0 " + largeArcFlag + ",1 " + endX + "," + endY;
		   
		   if (!splitPart)
		   {
			   pathData = pathData + " Z";
		   }
		   else if (splitPart == 1)
		   {
			   pathData = pathData + " M " + centerX + "," + centerY
		   }
		   else if (splitPart == 2)
		   {
			   pathData = pathData + " L " + centerX + "," + centerY
		   }
		   
    	   var pathElem = document.createElementNS(svgNS, "path");
		   pathElem.setAttribute("d", pathData);
		   pathElem.setAttribute("stroke", "black");
		   pathElem.setAttribute("style", "fill: " + sectorColor + ";cursor:pointer");
		   
           pathElem.addEventListener("mouseover", 
		       function (mouseEvt) {
                   showTitle(titleText, sectorColor);
				   if (!mouseEvt) {
				       mouseEvt = window.event;
				   }
				   showDirName(titleText, sectorColor, mouseEvt.clientX, mouseEvt.clientY);
               }, false);

           if (path || clickTarget)
           {
               pathElem.addEventListener("click",
            	   function () {
                       window.location.href = clickTarget + encodeURIComponent(path) + "&random=" + (new Date()).getTime();
                   }, false);
           }
           
		   pathElem.addEventListener("mouseout", hideTitleText);
		   pathElem.addEventListener("mouseout", hideDirName);

		   document.getElementById("svgChart").appendChild(pathElem);
	   }
	   
	   function shellTransparentSector(startAngle, endAngle, sectorColor, fillOpacity, innerRadius, outerRadius, titleText, clickAction)
	   {
		   if (endAngle - startAngle > 180)
		   {
			   shellSectorInternal(startAngle, startAngle + 180, sectorColor, fillOpacity, innerRadius, outerRadius, titleText, clickAction, 1);
			   shellSectorInternal(startAngle + 180, endAngle, sectorColor, fillOpacity, innerRadius, outerRadius, titleText, clickAction, 2);
		   }
		   else 
		   {
			   shellSectorInternal(startAngle, endAngle, sectorColor, fillOpacity, innerRadius, outerRadius, titleText, clickAction);
		   }
	   }

	   function shellSector(startAngle, endAngle, sectorColor, innerRadius, outerRadius, titleText, clickAction)
	   {
		   if (endAngle - startAngle > 180)
		   {
			   shellSectorInternal(startAngle, startAngle + 180, sectorColor, 0, innerRadius, outerRadius, titleText, clickAction, 1);
			   shellSectorInternal(startAngle + 180, endAngle, sectorColor, 0, innerRadius, outerRadius, titleText, clickAction, 2);
		   }
		   else 
		   {
			   shellSectorInternal(startAngle, endAngle, sectorColor, 0, innerRadius, outerRadius, titleText, clickAction);
		   }
	   }

	   function shellSectorInternal(startAngle, endAngle, sectorColor, fillOpacity, innerRadius, outerRadius, titleText, clickAction, splitPart)
	   {
	       var startRadiant = startAngle * Math.PI / 180;
	       var endRadiant = endAngle * Math.PI / 180;

           var innerStartX = centerX + (Math.cos(startRadiant) * innerRadius);
		   var innerStartY = centerY + (Math.sin(startRadiant) * innerRadius);
		   var innerEndX = centerX + (Math.cos(endRadiant) * innerRadius);
		   var innerEndY = centerY + (Math.sin(endRadiant) * innerRadius);

           var outerStartX = centerX + (Math.cos(startRadiant) * outerRadius);
		   var outerStartY = centerY + (Math.sin(startRadiant) * outerRadius);
		   var outerEndX = centerX + (Math.cos(endRadiant) * outerRadius);
		   var outerEndY = centerY + (Math.sin(endRadiant) * outerRadius);

		   var largeArcFlag = 0;
		   if (endAngle - startAngle > 180) 
		   {
		       largeArcFlag = 1;
		   }
		   
		   var pathData = "M " + innerStartX + "," + innerStartY + " A " + innerRadius + " " + innerRadius + " 0 " + largeArcFlag + ",1 " + innerEndX + "," + innerEndY;
           
		   if (splitPart && (splitPart == 1))
		   {
			   pathData = pathData + " M " + outerEndX + "," + outerEndY;
		   }
		   else
		   {
			   pathData = pathData + " L " + outerEndX + "," + outerEndY;
		   }
		   
		   pathData = pathData + " A " + outerRadius + " " + outerRadius + " 0 " + largeArcFlag + ",0 " + outerStartX + "," + outerStartY;
		   
		   if (!splitPart)
		   {
			   pathData = pathData + " Z";
		   }
		   else if (splitPart == 1)
		   {
			   pathData = pathData + " L " + innerStartX + "," + innerStartY
		   }

    	   var pathElem = document.createElementNS(svgNS, "path");
		   pathElem.setAttribute("d", pathData);
		   pathElem.setAttribute("stroke", "black");
		   
		   if (fillOpacity > 0)
		   {
			   pathElem.setAttribute("fill-opacity", fillOpacity);
		   }

		   var sectorStyle = "fill: " + sectorColor;
           if (clickAction && clickAction.length > 0)
           {
        	   sectorStyle = sectorStyle + ";cursor:pointer";
           }
		   pathElem.setAttribute("style", sectorStyle);
		   
           pathElem.addEventListener("mouseover", 
		       function (mouseEvt) {
                   showTitle(titleText, sectorColor);
				   if (!mouseEvt) {
				       mouseEvt = window.event;
				   }
				   showDirName(titleText, sectorColor, mouseEvt.clientX, mouseEvt.clientY);
               }, false);
			   
		   pathElem.addEventListener("mouseout", hideTitleText);
		   pathElem.addEventListener("mouseout", hideDirName);
		   
           if (clickAction && clickAction.length > 0)
           {
               pathElem.addEventListener("click",
            	   function () {
                       window.location.href = clickAction;
                   }, false);
           }
		   
		   document.getElementById("svgChart").appendChild(pathElem);
	   }
	   
	   function sectorLabel(startAngle, endAngle, innerRadius, outerRadius, textColor, text, textSize, reverse)
	   {
	       if (endAngle - startAngle < 2)
		   {
		       return;
		   }
		  
	       if (!textSize)
	       {
	    	   textSize = "12px";
	       }
	       
	       var labelText = document.createElementNS(svgNS, "text");
		   labelText.setAttribute("style", "color:" + textColor + ";font-family:Arial,Helvetica;font-size:" + textSize + ";font-weight: bold");
	       var labelTextNode = document.createTextNode(text);
		   labelText.appendChild(labelTextNode);
			  
		   var textRadius = innerRadius + 5;
			  
		   var textAngle = (startAngle + endAngle) / 2;
		   
		   var startRadiant = textAngle * Math.PI / 180;

	       var textStartPointX = centerX + (Math.cos(startRadiant) * textRadius);
		   var textStartPointY = centerY + (Math.sin(startRadiant) * textRadius);

		   labelText.setAttribute("x", textStartPointX);
	       labelText.setAttribute("y", textStartPointY);
			  
		   var rotateTransform = "rotate(" + textAngle + "," + textStartPointX + "," + textStartPointY + ")";
			  
		   var moveTransform = " translate(0,5)";;

		   var transform = rotateTransform;
		   
		   if (reverse) {
		       var reverseTransform = "";
		       if ((textAngle > 90) && (textAngle < 270))
		       {
			       reverseTransform = " rotate(180," + textStartPointX + "," + textStartPointY + ")";
			       moveTransform = " translate(" + (outerRadius - innerRadius - 20) + ",-5)";
		       }
		   
		       transform = transform + moveTransform + reverseTransform;
		   } else {
		       transform = transform + moveTransform;
		   }

		   labelText.setAttribute("transform", transform);
			  
		   document.getElementById("svgChart").appendChild(labelText);
	   }
		
	   function textOnCircle(startAngle, endAngle, radius, text, textStartOffset, fontSize)
	   {
	       var startRadiant = startAngle * Math.PI / 180;
	       var endRadiant = endAngle * Math.PI / 180;

           var startX = centerX + (Math.cos(startRadiant) * radius);
		   var startY = centerY + (Math.sin(startRadiant) * radius);
		   var endX = centerX + (Math.cos(endRadiant) * radius);
		   var endY = centerY + (Math.sin(endRadiant) * radius);

		   var largeArcFlag = 0;
		   if (endAngle - startAngle > 180) 
		   {
		       largeArcFlag = 1;
		   }
		   
		   var pathId = Math.random().toString(36).substr(2, 9);
		   
		   var pathData = "M " + startX + "," + startY + " A " + radius + " " + radius + " 0 " + largeArcFlag + ",1 " + endX + "," + endY;
		   
    	   var pathElem = document.createElementNS(svgNS, "path");
		   pathElem.id = pathId;
		   pathElem.setAttribute("d", pathData);
		   
		   var defsElem = document.createElementNS(svgNS, "defs");
		   defsElem.appendChild(pathElem);
		   
		   document.getElementById("svgChart").appendChild(defsElem);
		   
		   var textPathElem = document.createElementNS(svgNS, "textPath");
		   textPathElem.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + pathId);
		   textPathElem.setAttribute("startOffset", textStartOffset);
		   var textNode = document.createTextNode(text);
           textPathElem.appendChild(textNode);
		   
           var textElem = document.createElementNS(svgNS, "text");
		   textElem.setAttribute("style", "fill:#000000;font-size:" + fontSize + ";font-weight:bold;");
		   
           textElem.appendChild(textPathElem);		

		   document.getElementById("svgChart").appendChild(textElem);
	   }

