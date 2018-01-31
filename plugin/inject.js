var cmsToolbar = document.getElementsByClassName('cms-toolbar');
// TODO replace with chrome db
var publicHosts = {
  'DEV': ['localhost'],
  'TEST': ['staging.nationalgeographic.org'],
  'PROD': ['www.nationalgeographic.org']  
}

if (cmsToolbar.length) {
  Object.keys(publicHosts).forEach(function(env) {
    publicHosts[env].forEach(function(host) {
      if (window.location.hostname.indexOf(host) > -1) {
        var banner = document.createElement('h3');
        banner.className = 'ewb-plugin-banner ';
        banner.innerHTML = `${env} server`;
        if (env == 'DEV') {
          banner.className += 'ewb-plugin-banner-dev';
        } else if (env == 'TEST') {
          banner.className += 'ewb-plugin-banner-test';
        } else {
          banner.className += 'ewb-plugin-banner-prod';
        }

        document.body.insertBefore(banner, document.body.firstChild);

        // Hide if mouse at top of screen
        document.body.onmousemove = function(e) {
          var toolbarExpanded = document.getElementsByClassName('cms-toolbar-expanded');
          var mouseThreshold = toolbarExpanded.length ? 85 : 40;
          banner.style.display = e.clientY < mouseThreshold ? 'none' : 'block';
        }
      }
    });
  });
}
