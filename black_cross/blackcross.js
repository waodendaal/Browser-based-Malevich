// blackcross.js is part of a triptych of Firefox browser-plugins called Browser-based Malevich
// by Adriaan Odendaal and internet teapot (www.internetteapot.com) 
// Github: https://github.com/waodendaal/Browser-based_Malevich
// Medium post: https://medium.com/internet-teapot 
//This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.


// Block the body
var body = document.body 
body.style.transition =  "20s ease-in-out";
body.style.padding = "0px";
body.style.background = "white !important";

// Counters for transformDoms
let loopCount = 0; 
let count = 1; 
let easeOut = 100;

// Set parameters
let heightWindow = window.innerHeight;
let widthWindow = window.innerWidth;


setTimeout(function(){transformBody(body)}, 500);

function transformBody(body){

    // Sets the cross
    let preferedSize = heightWindow * 0.3
    let heightDocument = body.clientHeight;
    let widthDocument = body.clientWidth;
    
    var doms = document.getElementsByTagName("*");
    for (let i = 0; i < doms.length; i++){
        if (doms[i].tagName != 'HTML' && doms[i].tagName != 'BODY' ){
            doms[i].style.cssText = doms[i].style.cssText + "position:relative !important; transition: 5s ease-in-out;"
        }
    }

    // DOMs transform after transition applied
    setTimeout(function(){transformDOMs(preferedSize, doms)}, 100);
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
        console.log(i)
        
        let extraCSS = ""
        let heightTo = heightWindow;
        let widthTo = widthWindow; 
        let marginTop = 0;
        let marginSides = 0;

        // Alternate between the vertical and horizontal
        if ( i % 2 == 0) {
            // console.log('Vertical cross');
            widthTo = preferedSize;
            marginSides = String((widthWindow - preferedSize) / 2) + "px";


        }else{
            // console.log('Horizontal cross');
            heightTo = preferedSize;
            marginTop = String((heightWindow - preferedSize) / 2) + "px";
        } 

        if (doms[i].tagName == 'HTML' || doms[i].tagName == 'BODY' ){
            // console.log("Skip A: ", doms[i])
            doms[i].style.height = String(heightTo)+"px"
            doms[i].style.width = String(widthTo)+"px"
        }
        else {
            if (getComputedStyle(doms[i])["display"] == "none"){
                // console.log("Skip B", doms[i])
            }
            else {

                if (doms[i].tagName == 'DIV'){
                    if (getComputedStyle(doms[i])["background-color"]){
                        extraCSS = "top:auto !important; left:auto !important;";    
                    }
                    else {
                        extraCSS = "top:auto !important; left:auto !important; height:"+heightTo+"px !important;"+"width:"+widthTo+"px !important;";
                    }
                }
                if (doms[i].tagName == 'IMG' || doms[i].tagName == 'IFRAME' || doms[i].tagName == 'SVG') {
                    extraCSS = extraCSS + "filter: brightness(0%);";
                }

                if (doms[i].tagName == 'A' || doms[i].tagName == 'P' || String(doms[i].tagName).startsWith('H') ){
                    extraCSS = extraCSS + "z-index: 1000 !important;";
                }
                if (doms[i].tagName == 'UL'){
                    extraCSS = extraCSS + "display: block !important;";
                }

                extraCSS = extraCSS + "overflow:visible !important;"
                doms[i].style.cssText = doms[i].style.cssText + 
                                        "position:fixed !important;"+ 
                                        "display:auto !important;"+              
                                        "width:"+widthTo+"px !important;"+
                                        "height:"+heightTo+"px !important;"+
                                        "min-width:0px; !important;"+
                                        "background: black !important;"+
                                        "border-color: black !important"+
                                        "color: black !important;"+
                                        "min-height:0px; !important;"+
                                        "z-index:0 !important;"+
                                        "transform: none !important;"+
                                        "top: "+marginTop+" !important;"+
                                        "bottom: "+marginTop+" !important;"+
                                        "left: "+marginSides+" !important;"+
                                        "padding:0px !important;"+
                                        "right: "+marginSides+" !important;"+
                                        "margin:0px !important;"+
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
Browser-based Malevich is a triptych of Firefox browser-plugins from internet teapot that warp and distort any webpage you open into a digital approximation of one of the three thematically-related Suprematism paintings by early 20th-century avant-garde Russian artist Kazimir Malevich: Black Square (1913), Black Circle (1915), and Black Cross (1915).

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
