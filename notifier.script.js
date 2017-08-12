(function(){
    "use strict";
    
    $.Notifier = function(title, message, type, options){
        var defaultOptions = {
            appendTo: "body",
            border_radius:6,
            rtl:false,
            vertical_align:"center",
            has_icon:true,
            btns:[
                {
                    label:"ok",
                    type:"default",
                    onClick:$.noop
                },
            ],
            callback:$.noop
        }

        var $options = $.extend(true, {}, defaultOptions, options);
        var isShown = false;
        var $overlay = $('<div class="notifier-overlay"></div>');
        var $element = $('<div class="notifier-wrapper"></div>');
        var $header = $('<div class="notifier-header"></div>');
        var $body = $('<div class="notifier-body"></div>');
        var $footer = $('<div class="notifier-footer"></div>');

        var css = {"border-radius":$options.border_radius};


        switch(type){
            case "success" : {
                $element.addClass("success");
                break;
            }
            case "error" : {
                $element.addClass("error");
                break;
            }
            case "warning" : {
                $element.addClass("warning");
                break;
            }
            case "notice" : {
                $element.addClass("notice");
                break;
            }
            case "info" : {
                $element.addClass("info");
                break;
            }             
            default:{
                $element.addClass("info");
                type = "info"
                break;
            }
        }

        switch($options.vertical_align){
            case "top" : {
                $element.addClass("top");
                break;
            }
            case "center" : {
                $element.addClass("center");
                break;
            }
            case "bottom" : {
                $element.addClass("bottom");
                break;
            }
            default:{
                $options.vertical_align = "top";
                $element.addClass("top");
                break;
            }
        }

        $element.css(css);

        if( $options.rtl ){
            $element.addClass("rtl");
        }

        $element.append($header);
        $element.append($body);
        $element.append($footer);

        $header.append('<span class="notifier-close">&times;</span>');
        $header.append('<span class="notifier-title">' + title + '</span>');

        $body.append('<p>' + message + '</p>');

        if($options.has_icon){
            $body.append('<i class="notifier-icon notifier-icon-' + type + '"></i>');
            $body.addClass("has-icon");
        }

        $.each($options.btns, function(index, btnObj){
            var css = {"border-radius":$options.border_radius};
            var $btn = $('<button class="notifier-btn"></button>');
            switch(btnObj.type){
                case "success" : {
                    $btn.addClass("success");
                    break;
                }
                case "error" : {
                    $btn.addClass("error");
                    break;
                }
                case "warning" : {
                    $btn.addClass("warning");
                    break;
                }
                case "notice" : {
                    $btn.addClass("notice");
                    break;
                }
                case "info" : {
                    $btn.addClass("info");
                    break;
                }
                case "default" : {
                    $btn.addClass("default");
                    break;
                }
                default:{
                    $btn.addClass("default");
                    break;
                }
            }

            $btn.text( btnObj.label );
            $btn.css(css);
            $btn.click( function(e){
                "use strict";
                closeNotifier();
                btnObj.onClick.call(this);
            });
            $footer.append( $btn );
        });

        var showNotifier = function(){
            "use strict";
            $element.appendTo($options.appendTo);
            $overlay.appendTo($options.appendTo);
        }

        var closeNotifier = function(){
            "use strict";
            $(".notifier-overlay", $options.appendTo).remove();
            $(".notifier-wrapper", $options.appendTo).remove();
        }

        showNotifier();

        $(".notifier-close", $header).click(function(){
            "use strict";
            closeNotifier();
            $options.callback.call();
        })

        close = function(){
            "use strict";
            closeNotifier();
        }

        return this;
    }
})();