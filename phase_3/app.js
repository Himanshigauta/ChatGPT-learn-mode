/**
 * ChatGPT Learn Mode Feature Prototype - Phase 3 Application Script
 * Implements sliding Trust Transparency Drawer, verification confirm/dispute logic, and XP reward loop.
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
    currentChatClaims: {}, // Active claims in the chat thread
    verifiedClaimsRegistry: {} // Tracks which claim IDs have been successfully verified e.g. { 'coffee-claim-1': 'Confirmed' }
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

  // Trust Drawer Elements
  const drawerContainer = document.getElementById('trust-drawer-container');
  const drawerMetaTopic = document.getElementById('drawer-meta-topic');
  const drawerClaimText = document.getElementById('drawer-claim-text');
  const drawerScoreVal = document.getElementById('drawer-score-val');
  const drawerScoreBar = document.getElementById('drawer-score-bar');
  const drawerStatusPill = document.getElementById('drawer-status-pill');
  const drawerReasonsList = document.getElementById('drawer-reasons-list');
  const drawerSourceName = document.getElementById('drawer-source-name');
  const drawerSourceDomain = document.getElementById('drawer-source-domain');
  const drawerExplanationText = document.getElementById('drawer-explanation-text');
  const drawerSourceLink = document.getElementById('drawer-source-link');
  const btnDrawerClose = document.getElementById('btn-drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  const btnConfirmClaim = document.getElementById('btn-confirm-claim');
  const btnDisputeClaim = document.getElementById('btn-dispute-claim');
  const drawerActionsContainer = document.getElementById('drawer-actions-container');

  // Points notification Banner
  const pointsNotification = document.getElementById('points-notification-banner');
  const pointsNotifTitle = document.getElementById('points-notif-title');
  const pointsNotifDetail = document.getElementById('points-notif-detail');

  let activeSelectedClaimData = null; // Holds full metadata of current drawer claim

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

    hideTooltip();
    closeDrawer();
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
  
  function displayAIChatResponse(promptKey) {
    const data = mockDatabase[promptKey];
    if (!data) return;

    state.currentChatClaims = {};
    clearThreadForSimulation();

    let userPromptText = "";
    if (promptKey === 'coffee') userPromptText = "Is drinking black coffee healthy for you, and does it boost metabolism?";
    if (promptKey === 'carrot') userPromptText = "Do carrots actually improve night vision?";
    if (promptKey === 'photosynthesis') userPromptText = "How does plant photosynthesis work?";

    appendUserMessage(userPromptText);

    const aiMessageEl = document.createElement('div');
    aiMessageEl.className = 'message system-message';
    aiMessageEl.innerHTML = `
      <div class="message-avatar">AI</div>
      <div class="message-body" id="typing-body-container"></div>
    `;
    chatThread.appendChild(aiMessageEl);
    chatThread.scrollTop = chatThread.scrollHeight;

    const bodyContainer = document.getElementById('typing-body-container');
    bodyContainer.removeAttribute('id');

    let paragraphIndex = 0;
    let sentenceList = [];

    data.paragraphs.forEach((paragraph, pIdx) => {
      paragraph.forEach(sentence => {
        if (sentence.id) {
          state.currentChatClaims[sentence.id] = {
            ...sentence,
            topic: data.topic
          };
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
        appendVerificationBanner(bodyContainer);
        bindClaimInteractiveClicks();
        return;
      }

      const sentenceData = sentenceList[currentSentenceIdx];
      const span = document.createElement('span');
      
      // If this claim is already verified in state registry, render appropriate color!
      const verDict = state.verifiedClaimsRegistry[sentenceData.id];
      if (verDict) {
        span.className = `interactive-claim ${sentenceData.label} verified-${verDict.toLowerCase()}`;
      } else {
        span.className = `interactive-claim ${sentenceData.label}`;
      }
      
      if (sentenceData.id) {
        span.setAttribute('data-claim-id', sentenceData.id);
      }
      
      let pEl = bodyContainer.querySelectorAll('p')[sentenceData.paragraphIndex];
      if (!pEl) {
        pEl = document.createElement('p');
        bodyContainer.appendChild(pEl);
      }
      pEl.appendChild(span);

      let charIdx = 0;
      const textVal = sentenceData.text + (sentenceData.isLastInParagraph ? "" : " ");
      
      function typeChar() {
        if (charIdx >= textVal.length) {
          currentSentenceIdx++;
          setTimeout(renderNextSentence, 100);
          return;
        }
        span.textContent += textVal[charIdx];
        charIdx++;
        chatThread.scrollTop = chatThread.scrollHeight;
        setTimeout(typeChar, 8);
      }
      typeChar();
    }

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
    const bubbles = chatThread.querySelectorAll('.message');
    bubbles.forEach((bubble, idx) => {
      if (idx > 0) bubble.remove();
    });
  }

  function appendVerificationBanner(container) {
    const totalCount = Object.keys(state.currentChatClaims).length;
    if (totalCount === 0) return;

    // Count how many are still pending
    let pendingCount = 0;
    Object.keys(state.currentChatClaims).forEach(id => {
      if (!state.verifiedClaimsRegistry[id]) pendingCount++;
    });

    const banner = document.createElement('div');
    
    if (pendingCount === 0) {
      banner.className = 'verification-status-tag verified-all';
      banner.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>All claims successfully verified in this response!</span>
      `;
    } else {
      banner.className = 'verification-status-tag pending';
      banner.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <span>${pendingCount} claim${pendingCount > 1 ? 's' : ''} can be verified in this response</span>
      `;
    }
    
    container.appendChild(banner);
  }

  function updateActiveChatBanner() {
    const activeBanner = chatThread.querySelector('.verification-status-tag');
    if (activeBanner) {
      activeBanner.remove();
    }
    const currentAIContainer = chatThread.querySelector('.message:last-child .message-body');
    if (currentAIContainer) {
      appendVerificationBanner(currentAIContainer);
    }
  }


  // --- WHY AM I SEEING THIS? TOOLTIP LOGIC ---

  function bindClaimInteractiveClicks() {
    const claims = document.querySelectorAll('.interactive-claim');
    claims.forEach(claim => {
      claim.addEventListener('click', (e) => {
        e.stopPropagation();
        const claimId = claim.getAttribute('data-claim-id');
        const isHigh = claim.classList.contains('high');
        
        let claimData = null;
        if (claimId) {
          claimData = state.currentChatClaims[claimId];
        } else {
          // Demo overrides
          const demoId = claim.getAttribute('data-claim-id');
          if (demoId === 'demo-1') {
            claimData = { ...mockDatabase.coffee.paragraphs[1][0], topic: 'Nutrition' };
          } else if (demoId === 'demo-2') {
            claimData = { ...mockDatabase.coffee.paragraphs[2][0], topic: 'Nutrition' };
          }
        }

        if (claimData) {
          showTooltip(claim, claimData);
        } else if (isHigh) {
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
    activeSelectedClaimData = claimData;
    
    tooltipScoreVal.textContent = `${claimData.score}%`;
    tooltipSeverityBadge.textContent = `${claimData.label} Confidence`;
    tooltipSeverityBadge.className = `tooltip-badge ${claimData.label}`;
    
    if (claimData.label === 'high') {
      tooltipExplanationText.textContent = claimData.uncertaintyReason;
      tooltipVerifyTriggerBtn.style.display = 'none';
    } else {
      // Check if it is already verified in state
      const isVerified = state.verifiedClaimsRegistry[claimData.id];
      if (isVerified) {
        tooltipExplanationText.textContent = `This claim is already verified as ${isVerified}! View deep transparency details in the drawer.`;
        tooltipVerifyTriggerBtn.textContent = 'View Details';
      } else {
        tooltipExplanationText.textContent = `This claim is marked ${claimData.label} confidence because: ${claimData.uncertaintyReason}`;
        tooltipVerifyTriggerBtn.textContent = 'Verify Claim';
      }
      tooltipVerifyTriggerBtn.style.display = 'inline-block';
    }

    tooltipContainer.classList.add('show');
    
    const rect = targetEl.getBoundingClientRect();
    const tooltipWidth = tooltipContainer.offsetWidth;
    const tooltipHeight = tooltipContainer.offsetHeight;
    
    let leftPos = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    let topPos = rect.top - tooltipHeight - 12;
    
    if (leftPos < 10) leftPos = 10;
    if (leftPos + tooltipWidth > window.innerWidth - 10) {
      leftPos = window.innerWidth - tooltipWidth - 10;
    }
    
    tooltipContainer.style.left = `${leftPos}px`;
    tooltipContainer.style.top = `${topPos}px`;
  }

  function hideTooltip() {
    tooltipContainer.classList.remove('show');
  }

  if (tooltipCloseBtn) {
    tooltipCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideTooltip();
    });
  }

  // Hook floating tooltip triggers to Trust Drawer slide in
  if (tooltipVerifyTriggerBtn) {
    tooltipVerifyTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideTooltip();
      if (activeSelectedClaimData) {
        openDrawer(activeSelectedClaimData);
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (tooltipContainer.classList.contains('show') && !tooltipContainer.contains(e.target)) {
      hideTooltip();
    }
  });

  chatThread.addEventListener('scroll', hideTooltip);
  window.addEventListener('resize', hideTooltip);


  // --- TRUST TRANSPARENCY DRAWER & VERIFICATION ENGINE ---

  function openDrawer(claimData) {
    if (!claimData) return;
    
    // Set text contents
    drawerMetaTopic.textContent = `Topic: ${claimData.topic || 'Nutrition'}`;
    drawerClaimText.textContent = `"${claimData.text}"`;
    drawerScoreVal.textContent = `${claimData.score}%`;
    drawerScoreBar.style.width = `${claimData.score}%`;

    // Visual score color bar updates
    if (claimData.score >= 85) {
      drawerScoreVal.style.color = 'var(--green-primary)';
      drawerScoreBar.style.backgroundColor = 'var(--green-primary)';
    } else if (claimData.score >= 50) {
      drawerScoreVal.style.color = 'var(--yellow-primary)';
      drawerScoreBar.style.backgroundColor = 'var(--yellow-primary)';
    } else {
      drawerScoreVal.style.color = 'var(--red-primary)';
      drawerScoreBar.style.backgroundColor = 'var(--red-primary)';
    }

    // Set reduced reasons checklist
    drawerReasonsList.innerHTML = '';
    // Format mock details into bullet list points
    const bullet1 = document.createElement('div');
    bullet1.className = 'reason-bullet';
    bullet1.innerHTML = `<span class="bullet-icon">⚠️</span><span class="bullet-text">${claimData.uncertaintyReason}</span>`;
    drawerReasonsList.appendChild(bullet1);
    
    const bullet2 = document.createElement('div');
    bullet2.className = 'reason-bullet';
    bullet2.innerHTML = `<span class="bullet-icon">⚠️</span><span class="bullet-text">Source credibility check highlights alternative figures.</span>`;
    drawerReasonsList.appendChild(bullet2);

    // Citations
    drawerSourceName.textContent = claimData.source || 'Verified Authority';
    const domainStr = claimData.sourceLink ? claimData.sourceLink.replace('https://', '') : 'authority.org';
    drawerSourceDomain.textContent = domainStr;
    drawerExplanationText.textContent = claimData.explanation || 'Detailed verification materials pending.';
    drawerSourceLink.href = claimData.sourceLink || '#';

    // Verify state registry status
    const verifiedStatus = state.verifiedClaimsRegistry[claimData.id];
    
    if (verifiedStatus) {
      // Already verified! Disable/hide actions, show static verified pill
      setDrawerStatusPill(verifiedStatus);
      drawerActionsContainer.style.display = 'none';
    } else {
      // Pending verification, show action buttons, pill as pending
      setDrawerStatusPill('Pending');
      drawerActionsContainer.style.display = 'flex';
    }

    // Slide in
    drawerContainer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.style.display = 'block';
  }

  function setDrawerStatusPill(status) {
    drawerStatusPill.className = `status-pill ${status.toLowerCase()}`;
    if (status === 'Pending') {
      drawerStatusPill.textContent = 'Pending Verification';
    } else {
      drawerStatusPill.textContent = `Successfully ${status}`;
    }
  }

  function closeDrawer() {
    drawerContainer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.style.display = 'none';
  }

  if (btnDrawerClose) btnDrawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);


  // --- CONFIRM / DISPUTE VERIFICATION HOOKS ---

  function handleUserVerification(action) {
    if (!activeSelectedClaimData) return;
    const correctVal = activeSelectedClaimData.correctAction; // 'Confirm' or 'Dispute'

    if (action === correctVal) {
      // SUCCESSFUL PATH
      const claimId = activeSelectedClaimData.id;
      
      // Update global state registries
      state.verifiedClaimsRegistry[claimId] = action;
      state.stats.trustPoints += 50;

      // Slide out drawer status change
      setDrawerStatusPill(action);
      drawerActionsContainer.style.display = 'none';

      // Typewriter highlight update in chat bubble
      const spanInChat = chatThread.querySelector(`.interactive-claim[data-claim-id="${claimId}"]`);
      if (spanInChat) {
        spanInChat.className = `interactive-claim ${activeSelectedClaimData.label} verified-${action.toLowerCase()}`;
      }

      // Update Active Chat pending tag banner
      updateActiveChatBanner();

      // Trigger XP bump sidebar animation
      const xpValSidebar = document.querySelector('.points-value');
      if (xpValSidebar) {
        xpValSidebar.classList.add('bump');
        setTimeout(() => xpValSidebar.classList.remove('bump'), 400);
      }
      updateSidebarStateUI();

      // Show points award notification banner
      pointsNotifTitle.textContent = `+50 Trust Points!`;
      pointsNotifDetail.textContent = `Claim successfully ${action.toLowerCase()}ed. Your Trust Profile is growing!`;
      pointsNotification.classList.add('show');
      setTimeout(() => pointsNotification.classList.remove('show'), 3500);

      // Verify and play confetti if desired, or simple success logger
      console.log(`[Verification] Claim ID: ${claimId} successfully ${action}ed! State stats updated.`);
    } else {
      // INCORRECT PATH
      alert(`The evidence contradicts this. Please review the "Verified Primary Source" details below. The citation material contradicts this claim, meaning you should dispute it instead.`);
    }
  }

  if (btnConfirmClaim) {
    btnConfirmClaim.addEventListener('click', () => handleUserVerification('Confirm'));
  }

  if (btnDisputeClaim) {
    btnDisputeClaim.addEventListener('click', () => handleUserVerification('Dispute'));
  }


  // --- INPUT & SIDEBAR EVENTS BINDINGS ---

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

  if (sendMessageBtn && chatInputField) {
    sendMessageBtn.addEventListener('click', () => {
      const txt = chatInputField.value.trim().toLowerCase();
      if (!txt) return;

      chatInputField.value = '';
      chatInputField.style.height = '24px';

      if (txt.includes('coffee')) {
        displayAIChatResponse('coffee');
      } else if (txt.includes('carrot') || txt.includes('night vision')) {
        displayAIChatResponse('carrot');
      } else if (txt.includes('photo') || txt.includes('synthesis')) {
        displayAIChatResponse('photosynthesis');
      } else {
        clearThreadForSimulation();
        appendUserMessage(txt);
        setTimeout(() => {
          const aiMessageEl = document.createElement('div');
          aiMessageEl.className = 'message system-message';
          aiMessageEl.innerHTML = `
            <div class="message-avatar">AI</div>
            <div class="message-body">
              <p>I am the high-fidelity Learn Mode prototype. To test the <strong>Confidence Scoring & Verification</strong> system, please ask about:</p>
              <ul>
                <li><strong>"Is coffee healthy?"</strong></li>
                <li><strong>"Do carrots improve night vision?"</strong> (low confidence, disputable)</li>
                <li><strong>"How does photosynthesis work?"</strong> (medium confidence, disputable CAM plant claim)</li>
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

  const newChatSidebarBtn = document.getElementById('new-chat-sidebar-btn');
  if (newChatSidebarBtn) {
    newChatSidebarBtn.addEventListener('click', () => {
      clearThreadForSimulation();
      const greet = chatThread.querySelector('.message');
      if (!greet) {
        window.location.reload();
      }
      switchTab('chat');
    });
  }

  if (chatInputField) {
    chatInputField.addEventListener('input', () => {
      chatInputField.style.height = '24px';
      chatInputField.style.height = `${Math.min(chatInputField.scrollHeight - 6, 180)}px`;
    });
  }


  // --- INITIALIZE ---
  updateSidebarStateUI();
  bindClaimInteractiveClicks();
  console.log("Phase 3 Verification Drawer & Trust Transparency Initialized.");
});
