(function ($) {
    $.share = function () {
        return new share()
    };
    var share = (function () {
        var share = function () {
        };
        share.prototype = {content: '', init: function () {
            var self = this;
            if (self.content != '') {
                return self.content
            }
            var template = $(this.template());
            self.content = template;
            $(self.content).find('.shareClose').unbind('click').bind('click', function (e) {
                if ($(this).attr("checked") == 'checked' || $(this).attr("checked") == null) {
                    PDI.set("setup", "isShared", true)
                }
            });
            return self.content
        }, template: function () {
            var self = this;
            return'<div class="shareContainer"><div class="shareBody"><iframe name="shareContent" src="http://' + iframeDomain + '/myapp/share/share.html" width="516" height="247" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="auto"></iframe></div><div class="shareButtons"><input class="shareClose" type="checkbox">' + getI18nMsg('shareClose') + '</div></div>'
        }};
        return share
    })()
})(jq);
var share = $.share();