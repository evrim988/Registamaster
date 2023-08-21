


function ImageClick(url) {

    if (url != '') {
        var a = '/Modernize/Img/TaskFiles/' + url;
        console.log(a);
        $("#imgModal").attr("src", a);
    } else {
        $("#imgModal").attr("src", '/Modernize/Img/yok.png');
    }


}

(function ($) {
    var defaults;
    $.event.fix = (function (originalFix) {
        return function (event) {
            event = originalFix.apply(this, arguments);
            if (event.type.indexOf("copy") === 0 || event.type.indexOf("paste") === 0) {
                event.clipboardData = event.originalEvent.clipboardData;
            }
            return event;
        };
    })($.event.fix);
    defaults = {
        callback: $.noop,
        matchType: /image.*/
    };
    return ($.fn.pasteImageReader = function (options) {
        if (typeof options === "function") {
            options = {
                callback: options
            };
        }
        options = $.extend({}, defaults, options);
        return this.each(function () {
            var $this, element;
            element = this;
            $this = $(this);
            return $this.bind("paste", function (event) {
                var clipboardData, found;
                found = false;
                clipboardData = event.clipboardData;
                return Array.prototype.forEach.call(clipboardData.types, function (type, i) {
                    var file, reader;
                    if (found) {
                        return;
                    }
                    if (
                        type.match(options.matchType) ||
                        clipboardData.items[i].type.match(options.matchType)
                    ) {
                        file = clipboardData.items[i].getAsFile();
                        reader = new FileReader();
                        reader.onload = function (evt) {
                            return options.callback.call(element, {
                                dataURL: evt.target.result,
                                event: evt,
                                file: file,
                                name: file.name
                            });
                        };
                        reader.readAsDataURL(file);
                        snapshoot();
                        return (found = true);
                    }
                });
            });
        });
    });
})(jQuery);

var dataURL, filename;
$("html").pasteImageReader(function (results) {
    filename = results.filename, dataURL = results.dataURL;
    $data.text(dataURL);
    $size.val(results.file.size);
    $type.val(results.file.type);
    var img = document.createElement("img");
    img.src = dataURL;
    var w = img.width;
    var h = img.height;
    $width.val(w);
    $height.val(h);
    return $(".actives")
        .css({
            backgroundImage: "url(" + dataURL + ")"
        })
        .data({ width: w, height: h });
});

var $data, $size, $type, $width, $height;
$(function () {
    $data = $(".data");
    $size = $(".size");
    $type = $(".type");
    $width = $("#width");
    $height = $("#height");
    $(".target").on("click", function () {
        var $this = $(this);
        var bi = $this.css("background-image");
        if (bi != "none") {
            $data.text(bi.substr(4, bi.length - 6));
        }

        $(".actives").removeClass("actives");
        $this.addClass("actives");

        $this.toggleClass("contain");

        $width.val($this.data("width"));
        $height.val($this.data("height"));
        if ($this.hasClass("contain")) {
            $this.css({
                width: $this.data("width"),
                height: $this.data("height"),
                "z-index": "10"
            });
        }
        else {
            $this.css({ width: "", height: "", "z-index": "" });
        }
    });
});

function copy(text) {
    var t = document.getElementById("base64");
    t.select();
    try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successfully" : "unsuccessfully";
        alert("Base64 data coppied " + msg + " to clipboard");
    } catch (err) {
        alert("Unable to copy text");
    }
}




function SaveTask() {

    var data = new FormData();

    data.append('title', $('#title').val());
    data.append('PlanedStart', $('#PlanedStart').val());
    data.append('description', $('#description').val());
    data.append('ResponsibleID', $('#ResponsibleID').val());
    data.append('TaskStatus', $('#TaskStatus').val());
    data.append('PriorityStatus', $('#PriorityStatus').val());
    data.append('RequestID', $('#RequestID').val());
    data.append('base64', $('#base64').val());

    $.ajax({
        url: "/Task/Create",
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data == '1') {
                window.location.href = "/Task/Index";
            }

        },
        error: function (textStatus) {
            console.log('ERRORS: ' + textStatus);
        },
    });
    $('#exampleModal1').modal('toggle');

};