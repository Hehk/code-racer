const content =
`jQuery.each(["get", "post"], function(i, method) {
  jQuery[method] = function(url, data, callback, type) {

    if (jQuery.isFunction(data)) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax(jQuery.extend({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    }, jQuery.isPlainObject(url) && url));
  };
});`;

export default {
  source: 'https://github.com/jquery/jquery/blob/master/src/ajax.js',
  content,
};
