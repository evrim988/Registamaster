
$("#dZUploadImg").dropzone({
    url: "/User/FileUpload",
    maxFiles: 1,
    paramName: "FileUrl",
    maxFilesize: 15,
    clickable: true,
    addRemoveLinks: true,
    success: function (file, response) {
        $('#Image').val(response);
        $("#imgMainImage").attr('src', '/Modernize/Img/ProfilePhotos/' + response);
    },
    removedfile: function (file) {

    },
    error: function (file, response) {
        var drop = this;
        drop.removeFile(file);
        WarningMessage("Dosya Boyutu Maximum 15 Mb Olmalıdır", 'Bilgilendirme', { positionClass: 'toast-bottom-left', containerId: 'toast-top-center' });
    }
});

function Show() {
    if ($("#showPassword").is(':checked')) {
        $('#Password').prop("type", "text");
        $('#PasswordRepeat').prop("type", "text");
    } else {
        $('#Password').prop("type", "password");
        $('#PasswordRepeat').prop("type", "password");
    }
}
function ImageCopy() {
    var data = new FormData();
    data.append('base64', $('#base64').val());

    $.ajax({
        url: "/User/FileUploadbase",
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (fileName, response) {

            $('#UserImageURL').val(fileName);
            $("#imgMainImage").attr('src', '/Content/Assets/ProfilePhotos/' + fileName);
            $('#m_modal_ImageCopy').modal('toggle');

        },
        removedfile: function (file) {

        },
        error: function (file, response) {
            var drop = this;
            drop.removeFile(file);
            WarningMessage("Dosya Boyutu Maximum 15 Mb Olmalıdır", 'Bilgilendirme', { positionClass: 'toast-bottom-left', containerId: 'toast-top-center' });
        }
    });
}

function SubmitControl() {

    var form = $('#CreateUser');
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    form.addClass('was-validated');

    $('#CreateUser').validate({
        errorClass: 'invalid-feedback',
        validClass: 'valid-feedback',
        errorElement: 'div',
        highlight: function (element, errorClass, validClass) {
            $(element).parents("div.control-group").addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).parents(".error").removeClass(errorClass).addClass(validClass);
        }
    });

    var isValid = $('#CreateUser').valid();
    if (!isValid) {
        return;
    }

    $('#CreateUser').submit();
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


$(".needs-validation").submit(function () {
    var form = $(this);
    if (form[0].checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    form.addClass('was-validated');
});