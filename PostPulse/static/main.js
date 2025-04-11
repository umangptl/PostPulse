const templates = [
  {
    name: "Suggested",
    icon: "/static/img/suggested-logo.png",
    prompts: [
      "Summarize the following:",
      "Create a promotional ad for:",
      "Create a social media post for:",
      "Write a witty Instagram caption about:",
      "Rewrite and improve the following content:"
    ]
  },
  {
    name: "Favorite",
    icon: "/static/img/favorite-logo.png",
    prompts: [
      "Engage your audience with a question about {{ topic}}.",
      "Share a behind-the-scenes photo about {{topic}}.",
      "Post a motivational quote related to (topic}}.",
      "Add a personal touch to the following social media post to make it more relatable:",
      "Add emojis to the following social media post:"
    ]
  },
  {
    name: "Edit",
    icon: "/static/img/edit-logo.png",
    prompts: [
      "Edit the following social media post to have a {{ adjective }} tone of voice:",
      "Add a call to action to the following social media post.",
      "Adjust the following social media post's formatting to make it easier to read.",
      "Add relevant hashtags to the following social media post to increase its visibility:",
      "Remove any unnecessary information from the following social media post:"
    ]
  },
  {
    name: "Facebook",
    icon: "/static/img/facebook-logo.png",
    prompts: [
      "Write a Facebook post about {{ topic }}",
      "Produce a Facebook status about the benefits of {{ topic }}.",
      "Give me an interesting question to post on my Facebook Group about {{ topic }}..",
      "Rephrase the content above as a catchy Facebook post.",
      "Generate question ideas for a Facebook poll/quiz about {{ topic }}."
    ]
  },
  {
    name: "Instagram",
    icon: "/static/img/instagram-logo.png",
    prompts: [
      "Write a witty Instagram caption about {{ topic }}.",
      "Generate 10 viral Instagram Reel ideas about {{ topic }}.",
      "Share a story or personal experience related to {{ topic }} on Instagram.",
      "Create a themed Instagram challenge or contest related to {{ topic }}.",
      "Ask your followers to share their own experiences or opinions about {{ topic }} in the comments."
    ]
  },
  {
    name: "Threads",
    icon: "/static/img/threads-logo.png",
    prompts: [
      "Generate Threads post ideas about {{ topic }}.",
      "Generate a list of hashtag ideas for a Threads video about {{ topic }}..",
      "Write a funny joke for a Threads post about {{ topic }}..",
      "Give me Threads challenge ideas.",
      "Generate a captivating intro for a Threads post about {{ topic }}."
    ]
  },
  {
    name: "X",
    icon: "/static/img/x-logo.png",
    prompts: [
      "Write a Twitter thread about {{ topic }}.",
      "Generate a funny tweet.",
      "Write a tweet about {{ topic }} in a {{ adjective }} tone.",
      "Ask a question related to {{ topic }} and encourage your followers to share their thoughts.",
      "Share a piece of advice or wisdom related to {{ topic }} that you wish you had known earlier in life."
    ]
  },
  {
    name: "LinkedIn",
    icon: "/static/img/linkedin-logo.png",
    prompts: [
      "Write a LinkedIn post about the importance of networking and building professional relationships.",
      "Generate a LinkedIn post about the benefits of continuous learning and professional development.",
      "Create a LinkedIn post about the importance of building a strong personal brand.",
      "Write a LinkedIn post about the benefits of taking calculated risks in your career.",
      "Create a LinkedIn post about the importance of work-life balance and self-care."
    ]
  },
  {
    name: "Educational",
    icon: "/static/img/educational-logo.png",
    prompts: [
      "Write a social media post based on the statistic/information mentioned above.",
      "Mention a little-known fact about {{ topic }}.",
      "Explain in a social media post how X works.",
      "Create a short social media post answering: {{ question }}?",
      "Write a social media post comparing {{ topic }} and {{ topic }}."
    ]
  },{
    name: "Ads",
    icon: "/static/img/ads-logo.png",
    prompts: [
      "Create a social media ad from the following product/service description.",
      "Generate a social media ad copy that highlights {{ discounts and promotions }}. Use phrases that create a sense of urgency to encourage customers to shop now.",
      "Write a social media ad that drives traffic to {{ website }}. Use language that creates curiosity and encourages customers to click through to learn more.",
      "Write a social media ad that promotes {{ seasonal promotion }}. Use language that ties the promotion to the season and creates excitement."
    ]
  },
  {
    name: "Promotional",
    icon: "/static/img/promotional-logo.png",
    prompts: [
      "Write a social media post about {{ product/service }} and include {{ client pain points }}.",
      "Craft a social media post for {{ product/service }} that addresses positive customer emotions.",
      "Finish this paragraph: We are launching {{ product name }} to help you {{ benefit }}.",
      "Create a post highlighting the unique features of our product {{ product name }}.",
      "Create a social media post that compares our product {{ product name }} with a similar product on the market."
    ]
  },
  {
    name: "Summarize",
    icon: "/static/img/summarize-logo.png",
    prompts: [
      "Shorten the following social media post without losing its meaning:",
      "Break down the steps or components of the following process:",
      "Rewrite the following sentence using simpler language:",
      "Simplify the following technical process into step-by-step instructions:",
      "Create a social media post that captures the essence of the following message:"
    ]
  }
];

const sidebar = document.querySelector('.sidebar');
const middlePanel = document.querySelector('.middle-panel');
const rightPanel = document.querySelector('.right-panel');
const toggleButton = document.querySelector('.toggle-sidebar');

toggleButton.addEventListener('click', () => {
  const isCollapsing = !sidebar.classList.contains('collapsed');

  if (isCollapsing) {
    // Before collapsing, reset the view to grid
    templateGrid.style.display = 'grid';
    templateContent.style.display = 'none';
  }

  sidebar.classList.toggle('collapsed');

  if (sidebar.classList.contains('collapsed')) {
    middlePanel.style.flex = 1.5;
    rightPanel.style.flex = 1.5;
    toggleButton.textContent = '»';
  } else {
    middlePanel.style.flex = 1;
    rightPanel.style.flex = 1;
    toggleButton.textContent = '«';
  }
});

const backButton = document.querySelector('.back-button');

backButton.addEventListener('click', () => {
  templateGrid.style.display = 'grid';
  templateContent.style.display = 'none';
});

const templateGrid = document.querySelector('.template-grid');
const templateContent = document.querySelector('.template-content');
const templateIcon = document.querySelector('.template-content .template-icon');
const templateTitle = document.querySelector('.template-title');
const promptList = document.querySelector('.prompt-list');

// Clear existing static buttons
templateGrid.innerHTML = '';

// Generate buttons dynamically
templates.forEach(template => {
  const button = document.createElement('button');
  button.classList.add('template-btn');
  button.innerHTML = `<img src="${template.icon}" alt="${template.name}" class="template-icon">
  <span>${template.name}</span>`;

  // Attach click handler
  button.addEventListener('click', () => {
    const sidebarIsCollapsed = sidebar.classList.contains('collapsed');

    if (sidebarIsCollapsed) {
      sidebar.classList.remove('collapsed');
      middlePanel.style.flex = 1;
      rightPanel.style.flex = 1;

      setTimeout(() => {
        openTemplate(template);
      }, 30);
    } else {
      openTemplate(template);
    }
  });

  templateGrid.appendChild(button);
});

function openTemplate(template) {
  // Update header
  templateIcon.src = template.icon;
  templateTitle.textContent = template.name;

  // Populate prompt list
  promptList.innerHTML = '';
  template.prompts.forEach(prompt => {
    const li = document.createElement('li');
    li.innerHTML = `${prompt} <span class="heart">♥</span>`;

    // Heart click
    const heart = li.querySelector('.heart');
    heart.addEventListener('click', (event) => {
      event.stopPropagation();
      heart.classList.toggle('lit');
    });

    // Prompt line click
    li.addEventListener('click', () => {
      document.querySelectorAll('.prompt-list li').forEach(item => item.classList.remove('active'));
      li.classList.add('active');

      const userPrompt = document.getElementById('userPrompt');
      if (userPrompt) {
        userPrompt.value = prompt;
        userPrompt.focus(); // Optional: focus the textarea
      }
    });

    promptList.appendChild(li);
  });

  // Show prompt view
  templateGrid.style.display = 'none';
  templateContent.style.display = 'block';
}

const wordCountInput = document.getElementById('wordCount');
const wordRangeInput = document.getElementById('wordRange');

// When slider changes, update number input
wordRangeInput.addEventListener('input', () => {
  wordCountInput.value = wordRangeInput.value;
});

// When number input changes, update slider
wordCountInput.addEventListener('input', () => {
  // Clamp value within slider range to avoid errors
  let value = parseInt(wordCountInput.value, 10);
  if (value < parseInt(wordRangeInput.min)) value = wordRangeInput.min;
  if (value > parseInt(wordRangeInput.max)) value = wordRangeInput.max;

  wordCountInput.value = value;
  wordRangeInput.value = value;
});

const generateBtn = document.getElementById('generate-btn');

generateBtn.addEventListener('click', async function() {
  // Add loading state
  this.classList.add('loading');
  this.disabled = true;

  // ✅ Collect user input
  const prompt = document.getElementById('userPrompt').value;
  const tone = localStorage.getItem('selectedTone') || 'Polite';
  const wordCount = parseInt(document.getElementById('wordCount').value, 10);
  const hashtags = document.getElementById('generateHashtags').checked;
  const emoji = document.getElementById('includeEmoji').checked;
  const postCount = parseInt(document.getElementById('postCount').value, 10);

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        tone,
        word_count: wordCount,
        hashtags,
        emoji,
        post_count: postCount
      })
    });

    const data = await response.json();
    console.log('📦 Data from backend:', data);

    const resultsList = document.querySelector('.results-list');
    resultsList.innerHTML = ''; // Clear previous

    if (data.posts && data.posts.length > 0) {
      data.posts.forEach((post, index) => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
          <input type="checkbox" class="postSelect" id="post${index + 1}">
          <label for="post${index + 1}">${post}</label>
        `;
        resultsList.appendChild(item);
      });

      document.getElementById('resultsCount').textContent = `${data.posts.length} results in the feed`;
    } else {
      resultsList.innerHTML = `<p>No posts generated. Try adjusting your prompt or settings.</p>`;
    }

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while generating posts. Please try again.');
  }

  // Remove loading state
  this.classList.remove('loading');
  this.disabled = false;
});

// Select all tone buttons
const toneButtons = document.querySelectorAll('.tone-btn');

// Function to handle tone selection
function selectTone(event) {
  // Remove 'active' class from all buttons
  toneButtons.forEach(btn => btn.classList.remove('active'));

  // Add 'active' class to the clicked button
  const selectedButton = event.currentTarget;
  selectedButton.classList.add('active');

  // Store the selected tone in localStorage
  const selectedTone = selectedButton.getAttribute('data-tone');
  localStorage.setItem('selectedTone', selectedTone);
}

// Add click event listener to each tone button
toneButtons.forEach(button => {
  button.addEventListener('click', selectTone);
});

// On page load, set the default or previously selected tone
document.addEventListener('DOMContentLoaded', () => {
  const savedTone = localStorage.getItem('selectedTone') || 'Polite';
  const defaultButton = [...toneButtons].find(btn => btn.getAttribute('data-tone') === savedTone);
  if (defaultButton) {
    defaultButton.classList.add('active');
  }
});

const clearResultsBtn = document.getElementById('clearResults');
const resultsList = document.querySelector('.results-list');

clearResultsBtn.addEventListener('click', () => {
  resultsList.innerHTML = ''; // Clear all results
  document.getElementById('resultsCount').textContent = '0 results in the feed';
});

