/**
 * ChatGPT Learn Mode Feature Prototype - Phase 2 Application Script
 * Implements Confidence Scoring Engine, Interactive Claims Parser, & Floating Tooltips.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    activeTab: 'chat',
    stats: {
      trustPoints: 350,
      level: 2,
      xpToNextLevel: 500,
      streakDays: 4
    },
    currentChatClaims: {} // Stores active claims loaded in the current chat
  };

  // DOM Elements
  const navTabs = document.querySelectorAll('.nav-tab');
  const viewContents = document.querySelectorAll('.tab-content');
  const chatThread = document.getElementById('chat-thread-container');
  const chatInputField = document.getElementById('chat-input-field');
  const sendMessageBtn = document.getElementById('send-message-btn');
  const headerTrustPill = document.getElementById('header-trust-pill');
  
  // Tooltip Elements
  const tooltipContainer = document.getElementById('explain-tooltip-container');
  const tooltipSeverityBadge = document.getElementById('tooltip-severity-badge');
  const tooltipScoreVal = document.getElementById('tooltip-score-val');
  const tooltipExplanationText = document.getElementById('tooltip-explanation-text');
  const tooltipVerifyTriggerBtn = document.getElementById('tooltip-verify-trigger-btn');
  const tooltipCloseBtn = document.getElementById('tooltip-close-btn');

  let activeSelectedClaimId = null; // Tracks which claim has its tooltip active

  // Initialize UI Values from State
  function updateSidebarStateUI() {
    const pointsValueEl = document.querySelector('.points-value');
    const streakValueEl = document.querySelector('.streak-value');
    const userRoleEl = document.querySelector('.user-role');

    if (pointsValueEl) pointsValueEl.textContent = `${state.stats.trustPoints} XP`;
    if (streakValueEl) streakValueEl.textContent = `🔥 ${state.stats.streakDays} Days`;
    if (userRoleEl) userRoleEl.textContent = `Level ${state.stats.level} Apprentice`;
  }

  // View Tab Router
  function switchTab(tabId) {
    if (!tabId) return;
    state.activeTab = tabId;

    navTabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    viewContents.forEach(view => {
      if (view.id === `${tabId}-view`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    // Close any floating tooltip when switching tabs
    hideTooltip();
    console.log(`[Router] Active tab switched to: ${tabId}`);
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.getAttribute('data-tab'));
    });
  });

  if (headerTrustPill) {
    headerTrustPill.addEventListener('click', () => {
      switchTab('dashboard');
    });
  }

  // --- CONFIDENCE PARSING & SCORING ENGINE ---
  
  /**
   * Simulates AI message typing, applying confidence classification layer dynamically.
   */
  function displayAIChatResponse(promptKey) {
    const data = mockDatabase[promptKey];
    if (!data) return;

    // Reset current active chat claims register
    state.currentChatClaims = {};

    // 1. Create User Message bubble if it was sent by user, or simulate clear thread
    // For demo, we clear thread items except the first intro system bubble, then render user prompt
    clearThreadForSimulation();

    // Render User bubble
    let userPromptText = "";
    if (promptKey === 'coffee') userPromptText = "Is drinking black coffee healthy for you, and does it boost metabolism?";
    if (promptKey === 'carrot') userPromptText = "Do carrots actually improve night vision?";
    if (promptKey === 'photosynthesis') userPromptText = "How does plant photosynthesis work?";

    appendUserMessage(userPromptText);

    // Render AI bubble with typewriter output
    const aiMessageEl = document.createElement('div');
    aiMessageEl.className = 'message system-message';
    aiMessageEl.innerHTML = `
      <div class="message-avatar">AI</div>
      <div class="message-body" id="typing-body-container"></div>
    `;
    chatThread.appendChild(aiMessageEl);
    chatThread.scrollTop = chatThread.scrollHeight;

    const bodyContainer = document.getElementById('typing-body-container');
    bodyContainer.removeAttribute('id'); // Remove id to avoid duplicates later

    // Parse and queue sentences for typewriter
    let paragraphIndex = 0;
    let sentenceList = [];

    data.paragraphs.forEach((paragraph, pIdx) => {
      paragraph.forEach(sentence => {
        // Register claim in active state
        if (sentence.id) {
          state.currentChatClaims[sentence.id] = sentence;
        }
        sentenceList.push({
          ...sentence,
          paragraphIndex: pIdx,
          isLastInParagraph: sentence === paragraph[paragraph.length - 1]
        });
      });
    });

    let currentSentenceIdx = 0;

    function renderNextSentence() {
      if (currentSentenceIdx >= sentenceList.length) {
        // Finish typing sequence: append pending verification status banner
        appendVerificationBanner(bodyContainer, Object.keys(state.currentChatClaims).length);
        bindClaimInteractiveClicks();
        return;
      }

      const sentenceData = sentenceList[currentSentenceIdx];
      
      // Create element for sentence
      const span = document.createElement('span');
      span.className = `interactive-claim ${sentenceData.label}`;
      if (sentenceData.id) {
        span.setAttribute('data-claim-id', sentenceData.id);
      }
      
      // Find or create paragraph container
      let pEl = bodyContainer.querySelectorAll('p')[sentenceData.paragraphIndex];
      if (!pEl) {
        pEl = document.createElement('p');
        bodyContainer.appendChild(pEl);
      }
      pEl.appendChild(span);

      // Typewriter character by character
      let charIdx = 0;
      const textVal = sentenceData.text + (sentenceData.isLastInParagraph ? "" : " ");
      
      function typeChar() {
        if (charIdx >= textVal.length) {
          currentSentenceIdx++;
          setTimeout(renderNextSentence, 150); // delay before next sentence
          return;
        }
        span.textContent += textVal[charIdx];
        charIdx++;
        chatThread.scrollTop = chatThread.scrollHeight;
        setTimeout(typeChar, 12); // speed of typing
      }
      typeChar();
    }

    // Start typing
    setTimeout(renderNextSentence, 400);
  }

  function appendUserMessage(text) {
    const el = document.createElement('div');
    el.className = 'message user-message';
    el.innerHTML = `
      <div class="message-avatar">U</div>
      <div class="message-body">
        <p>${text}</p>
      </div>
    `;
    chatThread.appendChild(el);
  }

  function clearThreadForSimulation() {
    // Keep the greeting bubble, remove others
    const bubbles = chatThread.querySelectorAll('.message');
    bubbles.forEach((bubble, idx) => {
      if (idx > 0) bubble.remove();
    });
  }

  function appendVerificationBanner(container, count) {
    if (count === 0) return;
    const banner = document.createElement('div');
    banner.className = 'verification-status-tag pending';
    banner.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <span>${count} claim${count > 1 ? 's' : ''} can be verified in this response</span>
    `;
    container.appendChild(banner);
  }


  // --- WHY AM I SEEING THIS? TOOLTIP LOGIC ---

  function bindClaimInteractiveClicks() {
    const claims = document.querySelectorAll('.interactive-claim');
    claims.forEach(claim => {
      claim.addEventListener('click', (e) => {
        e.stopPropagation();
        const claimId = claim.getAttribute('data-claim-id');
        
        // High confidence standard claims don't have detailed explanations, but we can show they are high-confidence!
        const isHigh = claim.classList.contains('high');
        
        let claimData = null;
        if (claimId) {
          claimData = state.currentChatClaims[claimId];
        } else {
          // Fallback or demo hardcoded bindings for initial layout
          const demoId = claim.getAttribute('data-claim-id');
          if (demoId === 'demo-1') {
            claimData = mockDatabase.coffee.paragraphs[1][0];
          } else if (demoId === 'demo-2') {
            claimData = mockDatabase.coffee.paragraphs[2][0];
          }
        }

        if (claimData) {
          showTooltip(claim, claimData);
        } else if (isHigh) {
          // High confidence tooltip
          showTooltip(claim, {
            score: 95,
            label: "high",
            uncertaintyReason: "Standard scientific facts supported by robust cross-referenced clinical trials. High confidence assigned."
          });
        }
      });
    });
  }

  function showTooltip(targetEl, claimData) {
    activeSelectedClaimId = claimData.id || 'demo';
    
    // Set content details
    tooltipScoreVal.textContent = `${claimData.score}%`;
    tooltipSeverityBadge.textContent = `${claimData.label} Confidence`;
    
    // Setup badge class colors
    tooltipSeverityBadge.className = `tooltip-badge ${claimData.label}`;
    
    // Custom explanation or fallback
    if (claimData.label === 'high') {
      tooltipExplanationText.textContent = claimData.uncertaintyReason;
      tooltipVerifyTriggerBtn.style.display = 'none'; // No need to verify high-confidence
    } else {
      tooltipExplanationText.textContent = `This claim is marked ${claimData.label} confidence because: ${claimData.uncertaintyReason}`;
      tooltipVerifyTriggerBtn.style.display = 'inline-block'; // Show verification action
    }

    // Positions mapping
    tooltipContainer.classList.add('show');
    
    const rect = targetEl.getBoundingClientRect();
    const scrollEl = chatThread;
    
    // Calculate tooltip coordinates relative to window/body
    const tooltipWidth = tooltipContainer.offsetWidth;
    const tooltipHeight = tooltipContainer.offsetHeight;
    
    // Centered above the hovered/clicked sentence
    let leftPos = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    let topPos = rect.top - tooltipHeight - 12; // 12px padding above sentence
    
    // Screen boundaries checks
    if (leftPos < 10) leftPos = 10;
    if (leftPos + tooltipWidth > window.innerWidth - 10) {
      leftPos = window.innerWidth - tooltipWidth - 10;
    }
    
    tooltipContainer.style.left = `${leftPos}px`;
    tooltipContainer.style.top = `${topPos}px`;
  }

  function hideTooltip() {
    tooltipContainer.classList.remove('show');
    activeSelectedClaimId = null;
  }

  // Event handlers to close tooltip
  if (tooltipCloseBtn) {
    tooltipCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideTooltip();
    });
  }

  if (tooltipVerifyTriggerBtn) {
    tooltipVerifyTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      alert(`Verifying Claim ID: ${activeSelectedClaimId}. Verification Drawer UI (Trust Transparency) will slide in Phase 3!`);
      hideTooltip();
    });
  }

  // Close tooltip when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (tooltipContainer.classList.contains('show') && !tooltipContainer.contains(e.target)) {
      hideTooltip();
    }
  });

  // Keep tooltip anchored on viewport resize or scroll
  chatThread.addEventListener('scroll', hideTooltip);
  window.addEventListener('resize', hideTooltip);


  // --- INPUT & SIDEBAR EVENTS BINDINGS ---

  // Handle sidebar conversation trigger items
  const historyItems = document.querySelectorAll('.history-list li');
  historyItems.forEach(item => {
    item.addEventListener('click', () => {
      historyItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const trigger = item.getAttribute('data-chat-trigger');
      if (trigger) {
        switchTab('chat');
        displayAIChatResponse(trigger);
      }
    });
  });

  // Setup send buttons
  if (sendMessageBtn && chatInputField) {
    sendMessageBtn.addEventListener('click', () => {
      const txt = chatInputField.value.trim().toLowerCase();
      if (!txt) return;

      chatInputField.value = '';
      chatInputField.style.height = '24px';

      // Smart responsive matcher
      if (txt.includes('coffee')) {
        displayAIChatResponse('coffee');
      } else if (txt.includes('carrot') || txt.includes('night vision')) {
        displayAIChatResponse('carrot');
      } else if (txt.includes('photo') || txt.includes('synthesis')) {
        displayAIChatResponse('photosynthesis');
      } else {
        // Fallback response for unmocked prompts
        clearThreadForSimulation();
        appendUserMessage(txt);
        setTimeout(() => {
          const aiMessageEl = document.createElement('div');
          aiMessageEl.className = 'message system-message';
          aiMessageEl.innerHTML = `
            <div class="message-avatar">AI</div>
            <div class="message-body">
              <p>I am the high-fidelity Learn Mode prototype. To test the <strong>Confidence Scoring Engine</strong>, please ask about:</p>
              <ul>
                <li><strong>"Is coffee healthy?"</strong> (contains both medium and low claims)</li>
                <li><strong>"Do carrots improve night vision?"</strong> (contains a highly disputed historical low confidence claim)</li>
                <li><strong>"How does photosynthesis work?"</strong> (contains a medium confidence CAM plant claim)</li>
              </ul>
            </div>
          `;
          chatThread.appendChild(aiMessageEl);
          chatThread.scrollTop = chatThread.scrollHeight;
        }, 500);
      }
    });

    chatInputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageBtn.click();
      }
    });
  }

  // Reset chat sidebar button
  const newChatSidebarBtn = document.getElementById('new-chat-sidebar-btn');
  if (newChatSidebarBtn) {
    newChatSidebarBtn.addEventListener('click', () => {
      clearThreadForSimulation();
      // Reload initial greeting
      const greet = chatThread.querySelector('.message');
      if (!greet) {
        window.location.reload();
      }
      switchTab('chat');
    });
  }

  // Auto grow textarea helper
  if (chatInputField) {
    chatInputField.addEventListener('input', () => {
      chatInputField.style.height = '24px';
      chatInputField.style.height = `${Math.min(chatInputField.scrollHeight - 6, 180)}px`;
    });
  }


  // --- INITIALIZE ---
  updateSidebarStateUI();
  bindClaimInteractiveClicks(); // Bind demo responses preloaded
  console.log("Phase 2 Confidence Engine & Explainable Tooltips Initialized.");
});
