/**
 * ChatGPT Learn Mode Feature Prototype - Phase 5 Application Script
 * Implements full Learn Mode carousel quiz engine, slide animations, and final UX polish.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DEFAULT INITIAL STATE
  const defaultState = {
    stats: {
      trustScore: 84,
      claimsVerified: 14,
      accuracyRate: 92,
      streakDays: 4,
      xp: 350,
      level: 2,
      xpToNextLevel: 500,
      topics: {
        'Nutrition': 4,
        'History & Mythology': 6,
        'Plant Biology': 4
      }
    },
    badges: [
      { id: 'fact_checker', title: 'Fact Checker', desc: 'Verify your first claim', unlocked: true, icon: '🔍' },
      { id: 'skeptic', title: 'Healthy Skeptic', desc: 'Dispute 3 incorrect claims', unlocked: false, icon: '⚖️' },
      { id: 'streak_3', title: 'Consistency King', desc: 'Maintain a 3-day verification streak', unlocked: true, icon: '🔥' },
      { id: 'master_validator', title: 'Master Validator', desc: 'Verify 15 claims successfully', unlocked: false, icon: '🏆' }
    ],
    history: [
      { id: 101, claim: "Eating carrots significantly improves night vision.", topic: "Nutrition", action: "Disputed", status: "Successful", points: 50, date: "2026-05-30" },
      { id: 102, claim: "Water boils at a lower temperature at high altitudes.", topic: "Science", action: "Confirmed", status: "Successful", points: 50, date: "2026-05-29" }
    ],
    verifiedClaimsRegistry: {} // Tracks active chat verifications e.g. { 'coffee-claim-1': 'Confirm' }
  };

  // Global State Variable
  let state = {};

  // Load state from local storage or set defaults
  function loadPersistedState() {
    const saved = localStorage.getItem('chatgpt_learn_state');
    if (saved) {
      try {
        state = JSON.parse(saved);
        state.verifiedClaimsRegistry = {};
        console.log("[State] Local Storage loaded successfully.", state);
      } catch (e) {
        state = JSON.parse(JSON.stringify(defaultState));
      }
    } else {
      state = JSON.parse(JSON.stringify(defaultState));
    }
  }

  // Save current state to local storage
  function saveStateToPersist() {
    localStorage.setItem('chatgpt_learn_state', JSON.stringify(state));
  }

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

  // Dashboard DOM Elements
  const dashTrustScoreNum = document.getElementById('dash-trust-score-num');
  const dialProgressCircle = document.getElementById('dial-progress-circle');
  const dashLevelBadge = document.getElementById('dash-level-badge');
  const dashXpBar = document.getElementById('dash-xp-bar');
  const dashXpText = document.getElementById('dash-xp-text');
  const dashVerifiedCount = document.getElementById('dash-verified-count');
  const dashAccuracyNum = document.getElementById('dash-accuracy-num');
  const dashStreakNum = document.getElementById('dash-streak-num');
  const dashTopicsList = document.getElementById('dash-topics-list');
  const dashBadgesGrid = document.getElementById('dash-badges-grid');
  const dashLedgerBody = document.getElementById('dash-ledger-body');

  // Learn Mode DOM Elements
  const practiceCardBox = document.getElementById('practice-card-box');
  const practiceCardProgress = document.getElementById('practice-card-progress');
  const practiceStreakPill = document.getElementById('practice-streak-pill');
  const practiceCardTopic = document.getElementById('practice-card-topic');
  const practiceCardClaim = document.getElementById('practice-card-claim');
  const practiceCardActionsRow = document.getElementById('practice-card-actions-row');
  const btnPracticeTrustworthy = document.getElementById('btn-practice-trustworthy');
  const btnPracticeQuestionable = document.getElementById('btn-practice-questionable');
  
  const practiceFeedbackCard = document.getElementById('practice-feedback-card');
  const practiceFeedbackBadge = document.getElementById('practice-feedback-badge');
  const practiceFeedbackExplanation = document.getElementById('practice-feedback-explanation');
  const btnPracticeNextCard = document.getElementById('btn-practice-next-card');

  let activeSelectedClaimData = null; // Full metadata of currently opened claim
  let currentCardIndex = 0; // Active card in Learn Mode deck

  // Initialize UI Values from State
  function updateSidebarStateUI() {
    const pointsValueEl = document.getElementById('sidebar-points-val');
    const streakValueEl = document.getElementById('sidebar-streak-val');
    const userRoleEl = document.getElementById('sidebar-user-role');
    const headerPillEl = document.querySelector('#header-trust-pill span');

    if (pointsValueEl) pointsValueEl.textContent = `${state.stats.xp} XP`;
    if (streakValueEl) streakValueEl.textContent = `🔥 ${state.stats.streakDays} Days`;
    if (userRoleEl) userRoleEl.textContent = `Level ${state.stats.level} Apprentice`;
    if (headerPillEl) headerPillEl.textContent = `Trust Score: ${state.stats.trustScore}%`;
    
    // Sync learn streak pill
    if (practiceStreakPill) {
      practiceStreakPill.textContent = `🔥 ${state.stats.streakDays} Day Streak`;
    }
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

    if (tabId === 'dashboard') {
      renderDashboardMetrics();
    } else if (tabId === 'learn') {
      loadLearnPracticeCard();
    }
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

    state.verifiedClaimsRegistry = {};
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
          setTimeout(renderNextSentence, 80);
          return;
        }
        span.textContent += textVal[charIdx];
        charIdx++;
        chatThread.scrollTop = chatThread.scrollHeight;
        setTimeout(typeChar, 6);
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
          // Demo fallback
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
    
    drawerMetaTopic.textContent = `Topic: ${claimData.topic || 'Nutrition'}`;
    drawerClaimText.textContent = `"${claimData.text}"`;
    drawerScoreVal.textContent = `${claimData.score}%`;
    drawerScoreBar.style.width = `${claimData.score}%`;

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

    drawerReasonsList.innerHTML = '';
    const bullet1 = document.createElement('div');
    bullet1.className = 'reason-bullet';
    bullet1.innerHTML = `<span class="bullet-icon">⚠️</span><span class="bullet-text">${claimData.uncertaintyReason}</span>`;
    drawerReasonsList.appendChild(bullet1);
    
    const bullet2 = document.createElement('div');
    bullet2.className = 'reason-bullet';
    bullet2.innerHTML = `<span class="bullet-icon">⚠️</span><span class="bullet-text">Source credibility check highlights alternative findings.</span>`;
    drawerReasonsList.appendChild(bullet2);

    drawerSourceName.textContent = claimData.source || 'Verified Authority';
    const domainStr = claimData.sourceLink ? claimData.sourceLink.replace('https://', '') : 'authority.org';
    drawerSourceDomain.textContent = domainStr;
    drawerExplanationText.textContent = claimData.explanation || 'Detailed verification materials pending.';
    drawerSourceLink.href = claimData.sourceLink || '#';

    const verifiedStatus = state.verifiedClaimsRegistry[claimData.id];
    
    if (verifiedStatus) {
      setDrawerStatusPill(verifiedStatus);
      drawerActionsContainer.style.display = 'none';
    } else {
      setDrawerStatusPill('Pending');
      drawerActionsContainer.style.display = 'flex';
    }

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


  // --- CONFIRM / DISPUTE VERIFICATION ENGINE ---

  function handleUserVerification(action) {
    if (!activeSelectedClaimData) return;
    const correctVal = activeSelectedClaimData.correctAction;

    if (action === correctVal) {
      const claimId = activeSelectedClaimData.id;
      
      // Update global state registries
      state.verifiedClaimsRegistry[claimId] = action;
      
      state.stats.xp += 50;
      state.stats.claimsVerified += 1;

      const today = new Date().toISOString().split('T')[0];
      state.history.unshift({
        id: Date.now(),
        claim: activeSelectedClaimData.text,
        topic: activeSelectedClaimData.topic || 'Nutrition',
        action: action,
        status: "Successful",
        points: 50,
        date: today
      });

      const topName = activeSelectedClaimData.topic || 'Nutrition';
      if (state.stats.topics[topName] !== undefined) {
        state.stats.topics[topName] += 1;
      } else {
        state.stats.topics[topName] = 1;
      }

      if (state.stats.xp >= state.stats.xpToNextLevel) {
        state.stats.level += 1;
        state.stats.xp = state.stats.xp - state.stats.xpToNextLevel;
        setTimeout(() => alert(`🎉 LEVEL UP! You reached Level ${state.stats.level}!`), 500);
      }

      const ledgerHistoryCount = state.history.length;
      const successLogs = state.history.filter(h => h.status === 'Successful').length;
      state.stats.accuracyRate = Math.min(100, Math.round((successLogs / ledgerHistoryCount) * 100));

      state.stats.trustScore = Math.min(100, Math.round(75 + (state.stats.claimsVerified * 0.7) + (state.stats.accuracyRate * 0.1)));

      let badgeUnlockedAlertStr = "";
      state.badges.forEach(badge => {
        if (!badge.unlocked) {
          if (badge.id === 'master_validator' && state.stats.claimsVerified >= 16) {
            badge.unlocked = true;
            badgeUnlockedAlertStr = badge.title;
          } else if (badge.id === 'skeptic' && state.history.filter(h => h.action === 'Disputed').length >= 3) {
            badge.unlocked = true;
            badgeUnlockedAlertStr = badge.title;
          }
        }
      });

      if (badgeUnlockedAlertStr) {
        setTimeout(() => alert(`🏆 NEW BADGE UNLOCKED: "${badgeUnlockedAlertStr}"! Check it in your Trust Profile cabinet.`), 1000);
      }

      saveStateToPersist();

      setDrawerStatusPill(action);
      drawerActionsContainer.style.display = 'none';

      const spanInChat = chatThread.querySelector(`.interactive-claim[data-claim-id="${claimId}"]`);
      if (spanInChat) {
        spanInChat.className = `interactive-claim ${activeSelectedClaimData.label} verified-${action.toLowerCase()}`;
      }

      updateActiveChatBanner();

      const xpValSidebar = document.getElementById('sidebar-points-val');
      if (xpValSidebar) {
        xpValSidebar.classList.add('bump');
        setTimeout(() => xpValSidebar.classList.remove('bump'), 400);
      }
      
      updateSidebarStateUI();

      pointsNotifTitle.textContent = `+50 Trust Points!`;
      pointsNotifDetail.textContent = `Claim successfully ${action.toLowerCase()}ed. Your Trust Profile is growing!`;
      pointsNotification.classList.add('show');
      setTimeout(() => pointsNotification.classList.remove('show'), 3500);

      console.log(`[Verification] Verified claim ID: ${claimId}. Saved state.`);
    } else {
      alert(`The evidence contradicts this. Please review the "Verified Primary Source" details below. The citation material contradicts this claim, meaning you should dispute it instead.`);
    }
  }

  if (btnConfirmClaim) btnConfirmClaim.addEventListener('click', () => handleUserVerification('Confirm'));
  if (btnDisputeClaim) btnDisputeClaim.addEventListener('click', () => handleUserVerification('Dispute'));


  // --- PROFESSIONAL ANALYTICS DASHBOARD ENGINE ---

  function renderDashboardMetrics() {
    if (dashTrustScoreNum) dashTrustScoreNum.textContent = `${state.stats.trustScore}%`;
    if (dialProgressCircle) {
      const circumference = 345.57;
      const offset = circumference * (1 - (state.stats.trustScore / 100));
      dialProgressCircle.style.strokeDashoffset = offset;
    }

    if (dashLevelBadge) dashLevelBadge.textContent = `Lvl ${state.stats.level}`;
    if (dashXpBar) {
      const pct = (state.stats.xp / state.stats.xpToNextLevel) * 100;
      dashXpBar.style.width = `${pct}%`;
    }
    if (dashXpText) dashXpText.textContent = `${state.stats.xp} / ${state.stats.xpToNextLevel} XP`;

    if (dashVerifiedCount) dashVerifiedCount.textContent = state.stats.claimsVerified;
    if (dashAccuracyNum) dashAccuracyNum.textContent = `${state.stats.accuracyRate}%`;
    if (dashStreakNum) dashStreakNum.textContent = `🔥 ${state.stats.streakDays} Days`;

    if (dashTopicsList) {
      dashTopicsList.innerHTML = '';
      
      let totalCounts = 0;
      Object.keys(state.stats.topics).forEach(topic => {
        totalCounts += state.stats.topics[topic];
      });

      Object.keys(state.stats.topics).forEach(topic => {
        const count = state.stats.topics[topic];
        const pct = totalCounts > 0 ? (count / totalCounts) * 100 : 0;
        
        const row = document.createElement('div');
        row.className = 'topic-row';
        row.innerHTML = `
          <span class="topic-name">${topic}</span>
          <div class="topic-bar-wrapper">
            <div class="topic-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <span class="topic-count">${count} verification${count > 1 ? 's' : ''}</span>
        `;
        dashTopicsList.appendChild(row);
      });
    }

    if (dashBadgesGrid) {
      dashBadgesGrid.innerHTML = '';
      state.badges.forEach(badge => {
        const item = document.createElement('div');
        item.className = `badge-item ${badge.unlocked ? '' : 'locked'}`;
        item.innerHTML = `
          <span class="badge-icon">${badge.icon}</span>
          <span class="badge-title">${badge.title}</span>
          <span class="badge-desc">${badge.desc}</span>
        `;
        dashBadgesGrid.appendChild(item);
      });
    }

    if (dashLedgerBody) {
      dashLedgerBody.innerHTML = '';
      state.history.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><div class="ledger-claim-cell" title="${log.claim}">${log.claim}</div></td>
          <td>${log.topic}</td>
          <td>${log.action}</td>
          <td><span class="ledger-status-badge successful">${log.status}</span></td>
          <td><span class="ledger-xp-val">+${log.points} XP</span></td>
          <td>${log.date}</td>
        `;
        dashLedgerBody.appendChild(tr);
      });
    }
  }


  // --- LEARN MODE INTERACTIVE CAROUSEL DECK ENGINE ---

  function loadLearnPracticeCard() {
    const cardData = learnPracticeDeck[currentCardIndex];
    if (!cardData) return;

    // Reset feedback card visibility
    if (practiceFeedbackCard) practiceFeedbackCard.classList.remove('show');
    
    // Enable option buttons
    btnPracticeTrustworthy.disabled = false;
    btnPracticeQuestionable.disabled = false;

    // Remove any leftover styling borders
    practiceCardBox.style.borderColor = 'var(--border-color)';
    practiceCardBox.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';

    // Update metadata details
    if (practiceCardProgress) {
      practiceCardProgress.textContent = `Card ${currentCardIndex + 1} of ${learnPracticeDeck.length}`;
    }
    if (practiceCardTopic) {
      practiceCardTopic.textContent = `Topic: ${cardData.topic}`;
    }
    if (practiceCardClaim) {
      practiceCardClaim.textContent = `"${cardData.claim}"`;
    }
  }

  function handleLearnPracticeOption(choice) {
    const cardData = learnPracticeDeck[currentCardIndex];
    if (!cardData) return;

    // Disable option buttons to prevent multiple clicks
    btnPracticeTrustworthy.disabled = true;
    btnPracticeQuestionable.disabled = true;

    const isCorrect = choice === cardData.type;

    if (isCorrect) {
      // Correct Path
      practiceFeedbackBadge.className = 'feedback-badge correct';
      practiceFeedbackBadge.textContent = 'Correct! (+10 XP)';
      
      // Highlight card green
      practiceCardBox.style.borderColor = 'var(--green-primary)';
      practiceCardBox.style.boxShadow = '0 8px 30px rgba(16, 185, 129, 0.1)';

      // State updates
      state.stats.xp += 10;
      
      // Topic verifications increment
      if (state.stats.topics[cardData.topic] !== undefined) {
        state.stats.topics[cardData.topic] += 1;
      }

      // Calculate XP limits
      if (state.stats.xp >= state.stats.xpToNextLevel) {
        state.stats.level += 1;
        state.stats.xp = state.stats.xp - state.stats.xpToNextLevel;
        setTimeout(() => alert(`🎉 LEVEL UP! You reached Level ${state.stats.level}!`), 500);
      }

      // Push XP points float notification banner
      pointsNotifTitle.textContent = `+10 Trust Points!`;
      pointsNotifDetail.textContent = `Practice evaluation correct. Level XP incremented!`;
      pointsNotification.classList.add('show');
      setTimeout(() => pointsNotification.classList.remove('show'), 3500);

      // XP bump animation in sidebar
      const xpValSidebar = document.getElementById('sidebar-points-val');
      if (xpValSidebar) {
        xpValSidebar.classList.add('bump');
        setTimeout(() => xpValSidebar.classList.remove('bump'), 400);
      }

      saveStateToPersist();
      updateSidebarStateUI();
    } else {
      // Incorrect Path
      practiceFeedbackBadge.className = 'feedback-badge incorrect';
      practiceFeedbackBadge.textContent = 'Incorrect';
      
      // Highlight card red
      practiceCardBox.style.borderColor = 'var(--red-primary)';
      practiceCardBox.style.boxShadow = '0 8px 30px rgba(239, 68, 68, 0.1)';
    }

    // Set explanation text details and show sheet
    if (practiceFeedbackExplanation) {
      practiceFeedbackExplanation.textContent = cardData.explanation;
    }
    if (practiceFeedbackCard) {
      practiceFeedbackCard.classList.add('show');
    }
  }

  if (btnPracticeTrustworthy) {
    btnPracticeTrustworthy.addEventListener('click', () => handleLearnPracticeOption('Trustworthy'));
  }
  if (btnPracticeQuestionable) {
    btnPracticeQuestionable.addEventListener('click', () => handleLearnPracticeOption('Questionable'));
  }

  // Next Card Button Carousel Animation Logic
  if (btnPracticeNextCard) {
    btnPracticeNextCard.addEventListener('click', () => {
      // 1. Trigger slide out left offscreen animation
      practiceCardBox.classList.add('slide-out');
      
      // 2. Increment card index
      currentCardIndex = (currentCardIndex + 1) % learnPracticeDeck.length;

      // 3. Complete sliding shifts
      setTimeout(() => {
        // Load details onto card
        loadLearnPracticeCard();

        // Shift card to right offscreen position instantly
        practiceCardBox.className = 'practice-card-wrapper slide-in';

        // Animate slide back into center smoothly
        setTimeout(() => {
          practiceCardBox.className = 'practice-card-wrapper';
        }, 50);

      }, 350); // timeout matches sliding transition
    });
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
  loadPersistedState();
  updateSidebarStateUI();
  bindClaimInteractiveClicks();
  renderDashboardMetrics();
  loadLearnPracticeCard();
  console.log("Phase 5 Learn Mode Quiz Carousel Engine Loaded. Visual Polish Complete.");
});
