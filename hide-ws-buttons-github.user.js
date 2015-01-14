// ==UserScript==
// @name         Hide Whitespace button on github
// @namespace    http://alexturek.com
// @version      0.1
// @description  Add 'Hide/Show whitespace' buttons to Github diffs and PRs
// @author       Alex Turek
// @include      https://*github.com/*/*/commit/*
// @include      https://*github.com/*/*/pull/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.3.min.js
// ==/UserScript==

(function($) {
  var query = window.location.search.substring(1),
      hiding = false,
      restOfQuery = [],
      urlWithPath = window.location.href.split('?')[0];
  
  // Extract the rest of the query
  // and find out if there's a "w=..." pair in there
  $.map(query.split('&'), function(pair) {
    var kv = pair.split('=', 2);
    if(kv.length < 2) return;
    // https://github.com/blog/967-github-secrets isn't quite accurate
    // ?w=1 hides whitespace, but so does ?w=0, ?w=nonsense, etc
    if(kv[0] == 'w'){
      hiding = true;
    }
    else {
      restOfQuery.push(pair);
    }
  });
  
  var queryWithShowing = restOfQuery.join('&'),
      queryWithHiding = restOfQuery.concat(['w=1']).join('&'),
      showButton = $('<a class="minibutton" href="' + [urlWithPath, queryWithShowing].join('?') + '">WS Shown</a>'),
      hideButton = $('<a class="minibutton" href="' + [urlWithPath, queryWithHiding].join('?') + '">WS Hidden</a>');
  if(hiding) {
    hideButton.addClass('selected');
  } else {
    showButton.addClass('selected');
  }
  
  $('#toc .button-group.right').append(showButton);
  $('#toc .button-group.right').append(hideButton);
})(jQuery);
