// blackcircle.js is part of a triptych of Firefox browser-plugins called Browser-based Malevich
// by Adriaan Odendaal and internet teapot (www.internetteapot.com) 
// Github: https://github.com/waodendaal/Browser-based_Malevich
// Medium post: https://medium.com/internet-teapot 
//This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.


// Block the body
var body = document.body 
body.style.transition =  "10s ease-in-out";
// body.style.width = body.offsetWidth
// body.style.height = body.offsetHeight
body.style.padding = "0px";
body.style.background = "white !important";
document.getElementsByTagName('html')[0].style.transition =  "transform 10s ease-in-out";

// Counters for transformDoms
let loopCount = 0; 
let count = 1; 
let easeOut = 100;


setTimeout(function(){transformBody(body)}, 500);

function transformBody(body){

    // Sets the circle
    let heightWindow = window.innerHeight;
    let widthWindow = window.innerWidth;
    let preferedSize = heightWindow * 0.7
    let heightDocument = body.clientHeight;
    let widthDocument = body.clientWidth;

    // Margin top = 1/4 of windowHeight
    body.style.marginTop = String(heightWindow * 0.05) + "px";
    // Margin bottom = (documentHeight - windowHeight) + 1/4 of windowHeight
    body.style.marginBottom = String((heightDocument - heightWindow) + (heightWindow * 0.25)) + "px"
    // Margin right = (documentWidth - preferedSize) * 0.5
    body.style.marginRight = String(widthWindow * 0.05) + "px";
    // Margin left = (documentWidth - preferedSize) * 0.5
    body.style.marginLeft = String((widthDocument - preferedSize) * 0.5   + 100) + "px"


    
    var doms = document.getElementsByTagName("*");
    for (let i = 0; i < doms.length; i++){
        if (doms[i].tagName != 'BODY' ){
            doms[i].style.cssText = doms[i].style.cssText + "transition: 5s ease-in-out;"
            doms[i].style.height = doms[i].offsetHeight
            doms[i].style.width = doms[i].offsetWidth
        }
    }

    // DOMs transform after transition applied
    setTimeout(function(){transformDOMs(preferedSize, doms)}, 300);
    // Don't know why I'm struggling to just get the damn <header> to change
    document.getElementsByTagName('header')[0].style.maxWidth =  "10px !important";
}


function transformDOMs(preferedSize, doms){
    // This section can still be improved. I've had to add a lot of weird extra provisions as I test on different websites. 
    // Animation can also be smoother.

    loopCount = doms.length
    // Timeout rather than for loop to give it a bit of space between transformations
    setTimeout(function() {  
        let i = loopCount - count;
        
        let extraCSS = ""


        if (doms[i].tagName == 'HTML' || doms[i].tagName == 'BODY' ){
            doms[i].style.height = String(preferedSize)+"px"
            doms[i].style.width = String(preferedSize)+"px"
        }
        else {
            if (getComputedStyle(doms[i])["display"] == "none"){
                console.log("Skip B", doms[i])
            }
            else {

                if (doms[i].tagName == 'DIV'){
                    if (getComputedStyle(doms[i])["background-color"]){
                        extraCSS = "top:auto !important; left:auto !important;";    
                    }
                    else {
                        extraCSS = "top:auto !important; left:auto !important; height:"+preferedSize+"px !important;"+"width:"+preferedSize+"px !important;";
                    }
                }
                if (doms[i].tagName == 'P' || String(doms[i].tagName).startsWith('H') ){
                    extraCSS = extraCSS + "z-index: 1000 !important;";
                }
                if (doms[i].tagName == 'IMG'){
                    extraCSS = extraCSS + "z-index: 10 !important;"
                }
                extraCSS = extraCSS + "overflow:hidden !important;"
                doms[i].style.cssText = doms[i].style.cssText + 
                                        "position:fixed !important;"+ 
                                        "display:inline-block !important;"+              
                                        "width:"+preferedSize+"px !important;"+
                                        "height:"+preferedSize+"px !important;"+
                                        "max-width:"+preferedSize+"px !important;"+
                                        "max-height:"+preferedSize+"px !important;"+
                                        "background: black !important;"+
                                        "color: black !important;"+
                                        "min-width:0px; !important;"+
                                        "min-height:0px; !important;"+
                                        "z-index:0 !important;"+
                                        "transform: none !important;"+
                                        "top: "+document.body.style.marginTop+" !important;"+
                                        "bottom:auto !important;"+
                                        "padding:0px !important;"+
                                        "right: "+document.body.style.marginRight+" !important;"+
                                        "left: auto !important;" +
                                        "border-radius: 50% !important;"+
                                        "margin:0px !important;"+
                                        "text-align: center !important;"+
                                        "text-overflow:hidden;"+
                                        "white-space:normal !important;" +
                                        extraCSS;
            }                                        

        }

  
        count++;   
        if (easeOut > 1){
            easeOut--;
        }          
        if (count < loopCount) {       
            transformDOMs(preferedSize, doms)             
        }                      
      }, easeOut)
    
}

console.log(`%c
Browser-based Malevich is a triptych of Firefox browser-plugins from internet teapot that warp and distort any webpage you open into a digital approximation of one of the three thematically-related Suprematism paintings by early 20th-century Russian avant-garde Russian artist Kazimir Malevich: Black Square (1913), Black Circle (1915), and Black Cross (1915).

                               xxX###xx        
                                ::XXX         
                         xxXX::::::###XXXXXx/#####
                    :::XXXXX::::::XXXXXXXXX/    ####
         xXXX//::::::://///////:::::::::::/#####    #         ##########
      XXXXXX//:::::://///x                       #####      ###   ###
     XXXX        :://///  www.internetteapot.com      #   ###    #
     XXXX        ::////   www.internetteapot.com       ####   #  #
      XXXX/:     ::////X  www.internetteapot.com      ###      ##
       ""XX//::::::////XX                             #       #
           "::::::::////XXXXXXXXXXXX/    #     #     #      ##
                 ::::////XXXXXXXXXX/##################   ###
                     ::::://XXXXXX/#    #     #   #######
                         ::::::::/################

Read the Medium post: Browser-based Malevich: What the Minimalism of Modernism Can Tell Us About Digital Culture --> https://medium.com/internet-teapot`, "font-family:monospace")
