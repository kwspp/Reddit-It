// Wait for the DOM to load
window.addEventListener("load", function () {

    chrome.storage.sync.get('enabled', (data) => {
        if (data.enabled) {
          // Get the search query from URL
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
        
            // Create Reddit search URL
            const redditUrl = `https://www.reddit.com/search/?q=${query}`;
        
            // Create new link element
            const redditLink = document.createElement("a");
            redditLink.textContent = `Search for "${query}" on Reddit`;
            redditLink.href = redditUrl;
            redditLink.target = "_blank";
            redditLink.style.display = "block";
            redditLink.style.margin = "20px";
            redditLink.style.fontSize = "20px";
        
            // Insert the link at the top of search results
            const search = document.getElementById("search");
            if (search) {
            search.insertBefore(redditLink, search.firstChild);
            }
        }
      });
    
  });
  