(function ($) {
    $.tools = function () {
        return new tools()
    };
    var tools = (function () {
        var tools = function () {
        };
        tools.prototype = {content: '', init: function () {
            var self = this;
            if (self.content != '') {
                return self.content
            }
            var template = $(this.template());
            self.content = template;
            return template
        }, template: function () {
            var self = this;
            return'<div class="toolsContainer"><div class="toolsHeader"><div class="headerIcon"></div>' + getI18nMsg('toolsAppTitle') + '</div><div class="toolsBody"><iframe src="http://' + iframeDomain + '/myapp/tools/' + _langPre + '_small.html" width="840" height="460" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="auto"></iframe></div></div>'
        }};
        return tools
    })()
})(jq);
var tools = $.tools();