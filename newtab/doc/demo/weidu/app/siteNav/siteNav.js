(function ($) {
    $.siteNav = function () {
        return new siteNav()
    };
    var siteNav = (function () {
        var siteNav = function () {
        };
        siteNav.prototype = {content: '', init: function () {
            var self = this;
            if (self.content != '') {
                return self.content
            }
            var template = $(this.template());
            template.find('iframe').show();
            self.content = template;
            return template
        }, template: function () {
            var self = this;
            return'<div class="siteNavContainer"><div class="siteNavHeader"><div class="headerIcon"></div>' + getI18nMsg('siteNavAppTitle') + '</div><div class="siteNavBody"><iframe style="display:none" src="http://' + iframeDomain + '/myapp/siteNav/' + _langPre + '_small.html" width="840" height="460" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="auto"></iframe></div></div>'
        }};
        return siteNav
    })()
})(jq);
var siteNav = $.siteNav();