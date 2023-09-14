import { openAIKey } from './apiKey';

async function shouldDisplayReddit(query) {
  const prompt = 
  `User Intent Evaluation: To Add or Not to Add "Reddit" to Your Search

  User Scenario: Imagine you are a knowledgeable online researcher assisting a user who is unsure whether to include the word "reddit" in their Google search. The user is interested in gathering information, opinions, or experiences related to various topics. Your task is to analyze the user's search query and advise them on whether they should or should not add "reddit" to their search. Consider the nature of the information being sought and the reliability of sources.
  
  User Query: ${query}
  
  Statement Types to Consider:
  1. Opinions and experiences
  2. Troubleshooting and technical help
  3. Comparisons and recommendations
  4. Pop culture discussions
  5. Niche interests
  6. General information
  7. Authoritative sources
  8. Specific professional advice
  9. Official announcements
  10. Time-sensitive information
  
  Based on the user's query and the list of statement types, provide a well-reasoned response indicating whether the user should include "reddit" in their search or not. Give a Yes or No answer only.
  
  If the user query involves seeking general factual information, authoritative sources, professional advice, official announcements, or time-sensitive information, the answer should be "No." If the user query aligns with obtaining opinions, experiences, troubleshooting help, comparisons, niche interests, or pop culture discussions, the answer should be "Yes."`;
  
  const url = "https://api.openai.com/v1/engines/davinci-codex/completions";
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openAIKey}`
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 5
    })
  });

  const data = await response.json();
  const answer = data.choices[0].text.trim().toLowerCase();

  // Return true if the answer is "yes", false if the answer is "no"
  return answer === "yes";
}

window.addEventListener("load", async function () {
  // Fetch the "enabled" setting
  const storageData = await new Promise((resolve) => {
    chrome.storage.sync.get('enabled', resolve);
  });

  // Get the search query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');

  if (storageData.enabled && await shouldDisplayReddit(query)) {
    
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