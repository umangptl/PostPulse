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

document.addEventListener('DOMContentLoaded', () => {
  // === Global variables ===
  const sidebar = document.querySelector('.sidebar');
  const middlePanel = document.querySelector('.middle-panel');
  const rightPanel = document.querySelector('.right-panel');
  const toggleButton = document.querySelector('.toggle-sidebar');

  const backButton = document.querySelector('.back-button');
  const templateGrid = document.querySelector('.template-grid');
  const templateContent = document.querySelector('.template-content');
  const templateIcon = document.querySelector('.template-content .template-icon');
  const templateTitle = document.querySelector('.template-title');
  const promptList = document.querySelector('.prompt-list');

  const wordCountInput = document.getElementById('wordCount');
  const wordRangeInput = document.getElementById('wordRange');
  const generateBtn = document.getElementById('generate-btn');
  const clearResultsBtn = document.getElementById('clearResults');
  const resultsList = document.querySelector('.results-list');
  const previewBtn = document.getElementById('mockupPreview');

  const previewPanel = document.getElementById('previewPanel');
  const previewContainer = document.getElementById('previewContainer');

  let selectedPostText = null;
  const profileImageInput = document.getElementById('profileImageUpload');
  let uploadedPostImage = 'static/images/post-image.jpg'; // Default image


  // === Initial state ===
  previewBtn.disabled = true;
  previewPanel.style.display = 'none';

  // === Sidebar toggle ===
  toggleButton.addEventListener('click', () => {
    const isCollapsing = !sidebar.classList.contains('collapsed');
    if (isCollapsing) {
      templateGrid.style.display = 'grid';
      templateContent.style.display = 'none';
    }
    sidebar.classList.toggle('collapsed');
    middlePanel.style.flex = sidebar.classList.contains('collapsed') ? 1.5 : 1;
    rightPanel.style.flex = sidebar.classList.contains('collapsed') ? 1.5 : 1;
    toggleButton.textContent = sidebar.classList.contains('collapsed') ? '»' : '«';
  });

  backButton.addEventListener('click', () => {
    templateGrid.style.display = 'grid';
    templateContent.style.display = 'none';
  });

  // === Word count sync ===
  wordRangeInput.addEventListener('input', () => {
    wordCountInput.value = wordRangeInput.value;
  });
  wordCountInput.addEventListener('input', () => {
    let value = parseInt(wordCountInput.value, 10);
    value = Math.max(wordRangeInput.min, Math.min(wordRangeInput.max, value));
    wordCountInput.value = value;
    wordRangeInput.value = value;
  });

  // === Tone selection ===
  const toneButtons = document.querySelectorAll('.tone-btn');
  toneButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      toneButtons.forEach(btn => btn.classList.remove('active'));
      event.currentTarget.classList.add('active');
      const selectedTone = event.currentTarget.getAttribute('data-tone');
      localStorage.setItem('selectedTone', selectedTone);
    });
  });

  // Set previously selected tone on page load
  const savedTone = localStorage.getItem('selectedTone') || 'Polite';
  const defaultButton = [...toneButtons].find(btn => btn.getAttribute('data-tone') === savedTone);
  if (defaultButton) defaultButton.classList.add('active');

  // === Dynamic templates (I assume you have templates variable defined elsewhere) ===
  templateGrid.innerHTML = '';
  templates.forEach(template => {
    const button = document.createElement('button');
    button.classList.add('template-btn');
    button.innerHTML = `<img src="${template.icon}" alt="${template.name}" class="template-icon"><span>${template.name}</span>`;
    button.addEventListener('click', () => {
      if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        middlePanel.style.flex = 1;
        rightPanel.style.flex = 1;
        setTimeout(() => openTemplate(template), 30);
      } else {
        openTemplate(template);
      }
    });
    templateGrid.appendChild(button);
  });

  function openTemplate(template) {
    templateIcon.src = template.icon;
    templateTitle.textContent = template.name;
    promptList.innerHTML = '';
    template.prompts.forEach(prompt => {
      const li = document.createElement('li');
      li.innerHTML = `${prompt} <span class="heart">♥</span>`;
      const heart = li.querySelector('.heart');
      heart.addEventListener('click', (event) => {
        event.stopPropagation();
        heart.classList.toggle('lit');
      });
      li.addEventListener('click', () => {
        document.querySelectorAll('.prompt-list li').forEach(item => item.classList.remove('active'));
        li.classList.add('active');
        document.getElementById('userPrompt').value = prompt;
      });
      promptList.appendChild(li);
    });
    templateGrid.style.display = 'none';
    templateContent.style.display = 'block';
  }

  // === Generate posts ===
  generateBtn.addEventListener('click', async function () {
    this.classList.add('loading');
    this.disabled = true;

    const prompt = document.getElementById('userPrompt').value;
    const tone = localStorage.getItem('selectedTone') || 'Polite';
    const wordCount = parseInt(document.getElementById('wordCount').value, 10);
    const hashtags = document.getElementById('generateHashtags').checked;
    const emoji = document.getElementById('includeEmoji').checked;
    const postCount = parseInt(document.getElementById('postCount').value, 10);

    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, tone, word_count: wordCount, hashtags, emoji, post_count: postCount })
      });

      const data = await response.json();
      console.log('📦 Data from backend:', data);

      resultsList.innerHTML = '';
      previewBtn.disabled = true;
      selectedPostText = null;

      if (data.posts && data.posts.length > 0) {
        data.posts.forEach((post, index) => {
          const item = document.createElement('div');
          item.className = 'result-item';
          item.innerHTML = `<input type="checkbox" class="postSelect" id="post${index + 1}"><label for="post${index + 1}">${post}</label>`;

          item.addEventListener('click', () => {
            document.querySelectorAll('.result-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            selectedPostText = post;
            previewBtn.disabled = false;
          });

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

    this.classList.remove('loading');
    this.disabled = false;
  });

  // === Clear results ===
  clearResultsBtn.addEventListener('click', () => {
    resultsList.innerHTML = '';
    document.getElementById('resultsCount').textContent = '0 results in the feed';
    previewBtn.disabled = true;
    selectedPostText = null;
    previewPanel.style.display = 'none';
  });

  // === Preview post ===

  // 🌀 Default branding for PostPulse
  const profileName = 'PostPulse';
  const profileEmoji = '🌀';

const postImageInput = document.getElementById('postImageUpload');
postImageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadedPostImage = URL.createObjectURL(file);

    // ✅ If post and platform selected, auto-refresh preview
    if (selectedPostText && lastSelectedPlatform) {
      previewContainer.innerHTML = previewTemplates[lastSelectedPlatform](selectedPostText);
    }
  }
});

  // Templates for each platform
  const previewTemplates = {
    facebook: (postText) => `
      <div class="platform-preview-card facebook">
        <div class="profile">
          <span class="profile-pic">${profileEmoji}</span>
          <div class="profile-info">
            <span class="profile-name">${profileName} <img src="/static/images/verified.png" style="width: 0.7rem; height: 0.7rem;" /></span>
            <span class="post-time">1m ago • <img src="/static/images/globe.png" style="width: 0.7rem; height: 0.7rem;" /></span>
          </div>
        </div>
        <p>${postText}</p>
        <div class="post-image">
          <img src="${uploadedPostImage || uploadedPostImage }" alt="Post Content Image" />
        </div>
        <div class="post-actions social-actions">
          <div class="action-icon like"><img src="/static/images/like.png" /> <span>Like</span></div>
          <div class="action-icon comment"><img src="/static/images/comment-fb.png" /> <span>Comment</span></div>
          <div class="action-icon share"><img src="/static/images/share.png" /> Share</div>
        </div>
      </div>
    `,
    instagram: (postText) => `
      <div class="platform-preview-card instagram">
        <div class="profile">
          <span class="profile-pic">${profileEmoji}</span>
          <div class="profile-info">
            <span class="profile-name">${profileName} <img src="/static/images/verified.png" style="width: 0.7rem; height: 0.7rem;" /></span>
          </div>
        </div>
        <div class="post-image">
          <img src="${uploadedPostImage || uploadedPostImage }" alt="Post Content Image" />
        </div>
        <b>${profileName}</b> ${postText}
        <div class="post-actions instagram-actions">
          <div class="action-left">
            <div class="action-icon"><img src="/static/images/heart.png" /></div>
            <div class="action-icon"><img src="/static/images/comment.png" /></div>
            <div class="action-icon"><img src="/static/images/send.png" /></div>
          </div>
          <div class="action-right">
            <div class="action-icon"><img src="/static/images/bookmark.png" /></div>
          </div>
        </div>
      </div>
    `,
    threads: (postText) => `
      <div class="platform-preview-card threads">
        <div class="profile">
          <span class="profile-pic">${profileEmoji}</span>
          <div class="profile-info">
            <span class="profile-name">${profileName} <img src="/static/images/verified.png" style="width: 0.7rem; height: 0.7rem;" /> 1m</span>
          </div>
        </div>
        ${postText}
        <div class="post-image">
         <img src="${uploadedPostImage || uploadedPostImage }" alt="Post Content Image" />
        </div>
        <div class="post-actions threads-actions">
          <div class="action-icon"><img src="/static/images/heart.png" /></div>
          <div class="action-icon"><img src="/static/images/comment.png" /></div>
          <div class="action-icon"><img src="/static/images/repost.png" /></div>
          <div class="action-icon"><img src="/static/images/share.png" /></div>
        </div>
      </div>
    `,
    linkedin: (postText) => `
      <div class="platform-preview-card linkedin">
        <div class="profile">
          <span class="profile-pic">${ profileEmoji}</span>
          <div class="profile-info">
            <span class="profile-name">${profileName} <img src="/static/images/linkedinPremium.png" style="width: 0.7rem; height: 0.7rem;" /></span>
            <span class="profile-role">Digital Agency</span>
            <span class="post-time">1m ago • <img src="/static/images/globe.png" style="width: 0.7rem; height: 0.7rem;" /></span>
          </div>
        </div>
        <p>${postText}</p>
        <div class="post-image">
          <img src="${uploadedPostImage || uploadedPostImage }" alt="Post Content Image" />
        </div>
        <div class="post-actions social-actions">
          <div class="action-icon like"><img src="/static/images/like-linkedin.png" /> Like</div>
          <div class="action-icon comment"><img src="/static/images/comment-linkedin.png" /> Comment</div>
          <div class="action-icon share"><img src="/static/images/share.png" /> Share</div>
          <div class="action-icon send"><img src="/static/images/send.png" /> Send</div>
        </div>
      </div>
    `,
    twitter: (postText) => {
      const currentTime = new Date();
      const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateString = currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `
        <div class="platform-preview-card twitter">
          <div class="profile">
            <span class="profile-pic">${profileEmoji}</span>
            <div class="profile-info">
              <span class="profile-name">${profileName} <img src="/static/images/verified.png" style="width: 0.7rem; height: 0.7rem;" /></span>
              <span class="profile-username">@postpulse</span>
            </div>
          </div>
          <p>${postText}</p>
          <div class="post-image">
          <img src="${uploadedPostImage || uploadedPostImage }" alt="Post Content Image" />
        </div>
          <div class="post-time-twitter">${timeString} · ${dateString}</div>
          <div class="post-actions social-actions">
            <div class="action-icon"><img src="/static/images/comment-x.png" /></div>
            <div class="action-icon"><img src="/static/images/retweet.png" /></div>
            <div class="action-icon"><img src="/static/images/heart.png" /></div>
            <div class="action-icon"><img src="/static/images/bookmark.png" /></div>
            <div class="action-icon"><img src="/static/images/export.png" /></div>
          </div>
        </div>
      `;
    }
  };

  // Detect platform in prompt
  function detectPlatform(prompt) {
    const platforms = ['facebook', 'instagram', 'threads', 'twitter', 'linkedin'];
    prompt = prompt.toLowerCase();
    return platforms.find(platform => prompt.includes(platform));
  }

  // Hook into your existing preview button
  document.getElementById('mockupPreview').addEventListener('click', () => {
    if (!selectedPostText) {
      alert('Please select a post to preview.');
      return;
    }

    previewPanel.style.display = 'block';
    previewPanel.scrollIntoView({ behavior: 'smooth' });

    const userPrompt = document.getElementById('userPrompt').value;
    const detected = detectPlatform(userPrompt);

    if (detected) {
      previewContainer.innerHTML = previewTemplates[detected](selectedPostText);
    } else {
      previewContainer.innerHTML = `<h4>Select a platform</h4><p>to see the preview here.</p>`;
    }
  });

  // Manual platform selection
  document.querySelectorAll('.social-media-btn').forEach(button => {
    button.addEventListener('click', () => {
      if (!selectedPostText) {
        alert('Please select a post to preview.');
        return;
      }
      const platform = button.getAttribute('social-media').toLowerCase().replace('/', '').replace(' ', '');
      previewContainer.innerHTML = previewTemplates[platform](selectedPostText);
    });
  });

  // ✅ Hook into your result selection
  document.querySelector('.results-list').addEventListener('click', (event) => {
    const postItem = event.target.closest('.result-item');
    if (postItem) {
      selectedPostText = postItem.querySelector('label').textContent;
    }
  });

});
