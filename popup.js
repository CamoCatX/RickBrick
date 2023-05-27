document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.getElementById('addButton');
  const urlInput = document.getElementById('urlInput');
  const blocklist = document.getElementById('blocklist');

  addButton.addEventListener('click', function() {
    const url = urlInput.value.trim();
    if (url !== '') {
      browser.runtime.sendMessage({ action: 'addToBlocklist', url: url });
      appendToList(url);
      urlInput.value = '';
    }
  });

  browser.runtime.sendMessage({ action: 'getBlocklist' }, function(response) {
    response.blocklist.forEach(function(url) {
      appendToList(url);
    });
  });

  function appendToList(url) {
    const li = document.createElement('li');
    li.textContent = url;
    blocklist.appendChild(li);
  }
});
