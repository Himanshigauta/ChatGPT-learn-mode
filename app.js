/**
 * ChatGPT Learn Mode & Verification
 * Core Application Logic, Dynamic Scoring Engine, Checklists, & Learning Carousel Hub.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DEFAULT INITIAL STATE
  const defaultState = {
    stats: {
      trustScore: 84,
      claimsVerified: 14,
      claimsQuestioned: 4,
      streakDays: 4,
      xp: 350,
      level: 2,
      xpToNextLevel: 500,
      topics: {
        'Nutrition & Health': 4,
        'History & Mythology': 6,
        'Plant Biology': 4
      }
    },
    badges: [
      { id: 'fact_checker', title: 'Fact Checker', desc: 'Verify your first claim', unlocked: true, icon: '🔍' },
      { id: 'skeptic', title: 'Healthy Skeptic', desc: 'Question 3 questionable claims', unlocked: false, icon: '⚖️' },
      { id: 'streak_3', title: 'Consistency King', desc: 'Maintain a 3-day verification streak', unlocked: true, icon: '🔥' },
      { id: 'master_validator', title: 'Master Validator', desc: 'Verify 15 claims successfully', unlocked: false, icon: '🏆' }
    ],
    history: [
      { id: 101, claim: "Eating carrots significantly improves night vision.", topic: "Nutrition & Health", action: "Questioned", status: "Successful", points: 50, date: "2026-05-30" },
      { id: 102, claim: "Water boils at a lower temperature at high altitudes.", topic: "Physics & Earth Science", action: "Verified", status: "Successful", points: 50, date: "2026-05-29" }
    ],
    verifiedClaimsRegistry: {}, // Tracks active chat verifications e.g. { 'coffee-claim-1': 'Evidence Makes Sense' }
    reviewedClaimIds: {}, // Tracks XP eligibility and reviewed status: { [claimId]: 'Evidence Makes Sense' | 'Needs More Evidence' }
    mostQuestionedStats: [
      { id: "coffee-claim-3", claim: "Caffeine consumption increases your basal metabolic rate by 20% to 30%, leading to rapid weight loss.", count: 8, label: "low", status: "🔴 Potentially Incorrect" },
      { id: "ai_learning-claim-2", claim: "Using AI tools as immediate feedback assistants increases student retention rates by up to 90% across all scientific curricula.", count: 5, label: "medium", status: "🟡 Needs Context" },
      { id: "remote_work-claim-2", claim: "Large organizational surveys prove that remote workers are consistently 20% to 30% more productive than WFH counterparts.", count: 4, label: "medium", status: "🟡 Needs Context" }
    ]
  };

  // Global State Variable
  let state = {};

  // Load state from local storage or set defaults
  function loadPersistedState() {
    const saved = localStorage.getItem('chatgpt_learn_state');
    if (saved) {
      try {
        state = JSON.parse(saved);
        if (!state.reviewedClaimIds) state.reviewedClaimIds = {};
        if (!state.mostQuestionedStats) {
          state.mostQuestionedStats = JSON.parse(JSON.stringify(defaultState.mostQuestionedStats));
        }
        if (state.stats.claimsReviewed !== undefined) {
          state.stats.claimsVerified = state.stats.claimsVerified || 14;
          state.stats.claimsQuestioned = state.stats.claimsQuestioned || 4;
        }
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
  const chatHomeView = document.getElementById('chat-home-view');
  const chatThreadContainer = document.getElementById('chat-thread-container');
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
  const drawerSourceTitle = document.getElementById('drawer-source-title');
  const drawerSourceOrg = document.getElementById('drawer-source-org');
  const drawerSourceDate = document.getElementById('drawer-source-date');
  const drawerExplanationText = document.getElementById('drawer-explanation-text');
  const drawerSourceLink = document.getElementById('drawer-source-link');
  const drawerCorrectionCard = document.getElementById('drawer-correction-card');
  const drawerCorrectionText = document.getElementById('drawer-correction-text');
  const drawerGuideCard = document.getElementById('drawer-guide-card');
  const drawerGuideText = document.getElementById('drawer-guide-text');
  const btnDrawerClose = document.getElementById('btn-drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  const btnDrawerEvidenceOk = document.getElementById('btn-drawer-evidence-ok');
  const btnDrawerNeedsMore = document.getElementById('btn-drawer-needs-more');
  const drawerReviewedBadge = document.getElementById('drawer-reviewed-badge');
  const drawerActionsContainer = document.getElementById('drawer-actions-container');

  // Drawer Checklist Checkboxes
  const checkReputable = document.getElementById('check-reputable');
  const checkRecent = document.getElementById('check-recent');
  const checkFact = document.getElementById('check-fact');
  const checkConsensus = document.getElementById('check-consensus');
  const checkEvidence = document.getElementById('check-evidence');

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
  const dashQuestionedCount = document.getElementById('dash-questioned-count');
  const dashStreakNum = document.getElementById('dash-streak-num');
  const dashProgressPct = document.getElementById('dash-progress-pct');
  const dashTopicsList = document.getElementById('dash-topics-list');
  const dashBadgesGrid = document.getElementById('dash-badges-grid');
  const dashLedgerBody = document.getElementById('dash-ledger-body');

  // Learn Mode DOM Elements
  const learnTabBtns = document.querySelectorAll('.learn-tab-btn');
  const moduleBodies = document.querySelectorAll('.module-body');
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


  // --- DYNAMIC AUTOMATIC SENTENCE GRADING ENGINE ---

  /**
   * Evaluates ANY question typed by the user, splits it, scoring sentences dynamically.
   */
  function displayAIChatResponse(promptText) {
    if (!promptText) return;
    const cleanText = promptText.trim().toLowerCase();

    // 1. Prepare/Reset chat view containers
    chatHomeView.style.display = 'none';
    chatThreadContainer.style.display = 'flex';
    
    // Render user message bubble
    appendUserMessage(promptText);

    // 2. Decide response payload (check keyword mappings representing the curated demo question set)
    let responseData = null;
    let topicName = "General Inquiry";

    if (cleanText.includes('mars') || cleanText.includes('survive')) {
      responseData = mockDatabase.mars;
      topicName = responseData.topic;
    } else if (cleanText.includes('coffee') || cleanText.includes('health')) {
      responseData = mockDatabase.coffee;
      topicName = responseData.topic;
    } else if (cleanText.includes('climate') || cleanText.includes('sea level') || cleanText.includes('ocean')) {
      responseData = mockDatabase.climate;
      topicName = responseData.topic;
    } else if (cleanText.includes('chatgpt') && (cleanText.includes('work') || cleanText.includes('how'))) {
      responseData = mockDatabase.chatgpt;
      topicName = responseData.topic;
    } else if (cleanText.includes('inflation') || cleanText.includes('purchasing')) {
      responseData = mockDatabase.inflation;
      topicName = responseData.topic;
    } else if (cleanText.includes('student') || cleanText.includes('use ai') || cleanText.includes('learning')) {
      responseData = mockDatabase.ai_learning;
      topicName = responseData.topic;
    } else if (cleanText.includes('remote') || cleanText.includes('office') || cleanText.includes('productivity') || cleanText.includes('work productive')) {
      responseData = mockDatabase.remote_work;
      topicName = responseData.topic;
    } else if (cleanText.includes('electric') || cleanText.includes('vehicle') || cleanText.includes('ev') || cleanText.includes('battery')) {
      responseData = mockDatabase.ev_benefits;
      topicName = responseData.topic;
    } else if (cleanText.includes('carrot') || cleanText.includes('vision')) {
      responseData = mockDatabase.carrot;
      topicName = responseData.topic;
    } else if (cleanText.includes('photo') || cleanText.includes('synthesis')) {
      responseData = mockDatabase.photosynthesis;
      topicName = responseData.topic;
    } else {
      // Fallback search in 50-claim database for single matched entries
      let matchedClaim = null;
      if (typeof verificationKnowledgeBase !== 'undefined') {
        for (const entry of verificationKnowledgeBase) {
          const matchCount = entry.keywords.filter(kw => cleanText.includes(kw)).length;
          if (matchCount >= 2) {
            matchedClaim = entry;
            break;
          }
        }
      }
      if (matchedClaim) {
        topicName = matchedClaim.category;
        
        const claimSpecificIntros = {
          // Core Demo Questions
          "env-7": "Longitudinal satellite measurements confirm that rising global temperatures cause thermal expansion of seawater and glacier melt.",
          "geo-2": "Europe is a distinct geographical region located entirely in the Northern Hemisphere, bordered by the Arctic Ocean to the north.",
          "tech-8": "ChatGPT is a state-of-the-art conversational AI system developed by OpenAI, trained on a diverse corpus of digital text.",
          "fin-4": "Economic principles dictate that inflation represents the rate at which the real purchasing power of a currency declines over time.",
          "hist-7": "The outbreak of the First World War in 1914 was preceded by decades of rising nationalism, militarism, and imperial rivalries across Europe.",
          "sci-7": "Mars is a cold, terrestrial desert planet with polar ice caps and a carbon dioxide atmosphere.",
          "health-6": "Vitamins are essential micronutrients that the human body needs in small quantities to maintain metabolic functions.",
          
          // Procedural & Extra Knowledge Base Claims
          "sci-1": "Water undergoes phase transitions between solid, liquid, and gas states based on temperature and atmospheric conditions.",
          "sci-2": "The human brain is a highly complex organ consisting of approximately 86 billion neurons that control all cognitive functions.",
          "sci-3": "In physics, the speed of light in a vacuum is a fundamental physical constant denoted by c.",
          "sci-4": "Sound is a mechanical wave that propagates through a medium like air, water, or solids via molecular collisions.",
          "sci-5": "Modern atomic theory describes electrons existing in probability clouds or orbitals around a central nucleus.",
          "sci-6": "Heavy chemical elements like gold and platinum are synthesized during extreme cosmic events in the universe.",
          "health-1": "Sucrose is a common disaccharide sugar refined from cane or sugar beet, providing empty dietary calories.",
          "health-2": "Caffeine is a central nervous system stimulant that temporarily reduces fatigue and increases alertness.",
          "health-3": "Human hydration needs vary dynamically based on physical activity levels, local climate, and body size.",
          "health-4": "Vaccines expose the immune system to harmless antigens to build protective antibodies against pathogens.",
          "health-5": "Apple cider vinegar is produced by fermenting apple juice, containing acetic acid and minor trace nutrients.",
          "health-7": "Regular physical exercise is a scientifically proven way to strengthen cardiovascular fitness and skeletal muscles.",
          "geo-1": "The Great Wall of China is an ancient military fortification stretching thousands of miles across northern borders.",
          "geo-3": "Mount Everest, located in the Himalayas on the border of Nepal and China, is a massive geological peak.",
          "geo-4": "The equator divides the Earth into the Northern and Southern hemispheres, experiencing a tropical climate.",
          "geo-5": "Australia is a massive landmass surrounded by the Indian and Pacific oceans, hosting unique wildlife ecosystems.",
          "geo-6": "The Nile River is a major north-flowing river in northeastern Africa, historically supporting ancient civilizations.",
          "hist-1": "Napoleon Bonaparte was a brilliant French military commander and emperor who dominated European affairs for years.",
          "hist-2": "Albert Einstein developed the theory of relativity, transforming our understanding of space, time, and gravity.",
          "hist-3": "The Magna Carta was a historic charter of rights agreed to by King John of England at Runnymede in 1215.",
          "hist-4": "Cleopatra VII was the last active ruler of the Ptolemaic Kingdom of Egypt, famous for her political alliances.",
          "hist-5": "The Gutenberg press revolutionized printing by introducing movable metal type to Europe in the 15th century.",
          "hist-6": "George Washington served as the first President of the United States and commander of the Continental Army.",
          "tech-1": "Artificial Intelligence algorithms utilize mathematical models to recognize patterns and make predictions from data.",
          "tech-2": "Quantum computing utilizes the principles of superposition and entanglement to perform complex computations.",
          "tech-3": "Blockchain is a distributed ledger technology that records transactions across a network of computers.",
          "tech-4": "Intel co-founder Gordon Moore observed that the number of transistors on a microchip doubles periodically.",
          "tech-5": "Fiber optic communication relies on transmitting information as light pulses through thin glass fibers.",
          "tech-6": "Random Access Memory (RAM) serves as high-speed temporary storage for active operating system tasks.",
          "tech-7": "The Internet is a global network of interconnected computer networks utilizing the TCP/IP protocol suite.",
          "fin-1": "Cryptocurrencies are digital currencies that utilize decentralized networks and cryptography for security.",
          "fin-2": "Portfolio diversification is a widely accepted strategy of spreading investments across different asset classes.",
          "fin-3": "A high credit score indicates that a borrower has a historically reliable record of repaying debts.",
          "fin-5": "Passive index investing involves holding a diversified basket of stocks to track overall market performance.",
          "fin-6": "Compound interest represents interest calculated on both the initial principal and accumulated interest."
        };

        const introText = claimSpecificIntros[matchedClaim.id] || `Factual context establishes that ${matchedClaim.category.toLowerCase()} concepts are built on verified physical baselines and empirical consensus observations.`;

        responseData = {
          topic: topicName,
          paragraphs: [
            [
              { text: introText, score: 98, label: "high" }
            ],
            [
              {
                id: matchedClaim.id,
                text: matchedClaim.claim,
                score: matchedClaim.score,
                label: matchedClaim.label,
                uncertaintyReason: matchedClaim.uncertaintyReason,
                correctedVersion: matchedClaim.correctedVersion,
                source: matchedClaim.source,
                sourceTitle: matchedClaim.sourceTitle,
                sourceOrg: matchedClaim.sourceOrg,
                sourceDate: matchedClaim.sourceDate,
                sourceLink: matchedClaim.sourceLink,
                explanation: matchedClaim.explanation,
                evaluationGuide: matchedClaim.evaluationGuide,
                correctAction: matchedClaim.label === 'high' ? 'Confirm' : 'Dispute'
              }
            ]
          ]
        };
      }
    }

    // Demo Mode Validation Check
    const isSupported = (responseData !== null);

    if (!isSupported) {
      const aiMessageEl = document.createElement('div');
      aiMessageEl.className = 'message system-message';
      aiMessageEl.innerHTML = `
        <div class="message-avatar">AI</div>
        <div class="message-body">
          <div style="background: rgba(255, 193, 7, 0.05); border: 1px solid rgba(255, 193, 7, 0.25); border-radius: 12px; padding: 16px 20px; margin: 10px 0; display: flex; gap: 16px; align-items: flex-start;">
            <span style="font-size: 24px; line-height: 1;">⚠️</span>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <h5 style="margin: 0; font-size: 15px; font-weight: 600; color: #ffc107;">Demo Mode Notice</h5>
              <p style="margin: 0; font-size: 13.5px; color: var(--text-secondary); line-height: 1.6;">
                Demo Mode: This prototype currently supports a curated set of examples designed to demonstrate ChatGPT's claim verification capabilities. Please select one of the sample questions from the sidebar to explore the experience.
              </p>
            </div>
          </div>
        </div>
      `;
      chatThreadContainer.appendChild(aiMessageEl);
      chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;
      return;
    }

    state.currentChatClaims = {};

    // 3. Render AI Response bubble
    const aiMessageEl = document.createElement('div');
    aiMessageEl.className = 'message system-message';
    aiMessageEl.innerHTML = `
      <div class="message-avatar">AI</div>
      <div class="message-body" id="typing-body-container"></div>
    `;
    chatThreadContainer.appendChild(aiMessageEl);
    chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;

    const bodyContainer = document.getElementById('typing-body-container');
    bodyContainer.removeAttribute('id');

    let sentenceList = [];
    responseData.paragraphs.forEach((paragraph, pIdx) => {
      paragraph.forEach(sentence => {
        if (sentence.id) {
          state.currentChatClaims[sentence.id] = {
            ...sentence,
            topic: topicName
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
        appendVerifyResponseButton(aiMessageEl, bodyContainer);
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
        chatThreadContainer.scrollTop = chatThreadContainer.scrollHeight;
        setTimeout(typeChar, 6);
      }
      typeChar();
    }

    setTimeout(renderNextSentence, 450);
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
    chatThreadContainer.appendChild(el);
  }

  function appendVerifyResponseButton(aiMessageEl, bodyContainer) {
    const totalCount = Object.keys(state.currentChatClaims).length;
    if (totalCount === 0) return;

    const btn = document.createElement('button');
    btn.className = 'btn-verify-response';
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <span>Verify This Response</span>
    `;

    btn.addEventListener('click', () => {
      if (btn.classList.contains('loading')) return;

      btn.classList.add('loading');
      btn.innerHTML = `
        <span class="spinner-verify" style="margin-right: 6px;"></span>
        <span>Analyzing claims...</span>
      `;

      // Simulates real-time claims verification check
      setTimeout(() => {
        aiMessageEl.classList.add('review-mode-active');
        btn.remove();
        appendVerificationBanner(bodyContainer);
        console.log("[Verification] User-initiated Trust Review Mode activated.");
      }, 800);
    });

    bodyContainer.appendChild(btn);
  }

  function appendVerificationBanner(container) {
    const claims = Object.values(state.currentChatClaims);
    const totalCount = claims.length;
    if (totalCount === 0) return;

    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    claims.forEach(c => {
      if (c.label === 'high') highCount++;
      else if (c.label === 'medium') mediumCount++;
      else if (c.label === 'low') lowCount++;
    });

    const banner = document.createElement('div');
    banner.className = 'verification-status-summary';
    banner.innerHTML = `
      <div class="summary-header-row">
        <span class="summary-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Trust Review Complete</span>
        </span>
      </div>
      <div class="summary-grid">
        <div class="summary-stat-card">
          <span class="summary-stat-val total">${totalCount}</span>
          <span class="summary-stat-label">Claims Analyzed</span>
        </div>
        <div class="summary-stat-card">
          <span class="summary-stat-val high">${highCount}</span>
          <span class="summary-stat-label">Verified (🟢)</span>
        </div>
        <div class="summary-stat-card">
          <span class="summary-stat-val medium">${mediumCount}</span>
          <span class="summary-stat-label">Needs Context (🟡)</span>
        </div>
        <div class="summary-stat-card">
          <span class="summary-stat-val low">${lowCount}</span>
          <span class="summary-stat-label">Potential Issues (🔴)</span>
        </div>
      </div>
    `;
    
    container.appendChild(banner);
  }

  function updateActiveChatBanner() {
    const lastAIElement = chatThreadContainer.querySelector('.message.system-message:last-child');
    if (!lastAIElement || !lastAIElement.classList.contains('review-mode-active')) return;

    const activeBanner = lastAIElement.querySelector('.verification-status-summary');
    if (activeBanner) {
      activeBanner.remove();
    }
    const currentAIContainer = lastAIElement.querySelector('.message-body');
    if (currentAIContainer) {
      appendVerificationBanner(currentAIContainer);
    }
  }


  // --- WHY AM I SEEING THIS? DYNAMIC AUTOMATIC VERIFICATION ---

  function bindClaimInteractiveClicks() {
    const claims = document.querySelectorAll('.interactive-claim');
    claims.forEach(claim => {
      claim.addEventListener('click', (e) => {
        e.stopPropagation();

        const parentMsg = claim.closest('.message.system-message');
        if (!parentMsg || !parentMsg.classList.contains('review-mode-active')) {
          return;
        }

        const claimId = claim.getAttribute('data-claim-id');
        const isHigh = claim.classList.contains('high');
        
        let claimData = null;
        if (claimId) {
          claimData = state.currentChatClaims[claimId];
        } else if (isHigh) {
          claimData = {
            id: "high-consensus-procedural",
            score: 95,
            label: "high",
            text: claim.textContent.trim(),
            uncertaintyReason: "Highly supported scientific consensus backed by replicated clinical trials.",
            source: "Academic & Clinical Repositories",
            sourceTitle: "Primary Scientific & Clinical Review Literature",
            sourceOrg: "Consensus Science Portals",
            sourceDate: "August 2023",
            sourceLink: "https://pubmed.ncbi.nlm.nih.gov",
            explanation: "Extensive peer-reviewed trials validate this baseline fact. There is no active experimental divergence or consensus doubt."
          };
        }

        if (claimData) {
          openDrawer(claimData);
        }
      });
    });
  }

  // --- BUTTON CLICKS HANDLERS ---
  if (btnDrawerEvidenceOk) {
    btnDrawerEvidenceOk.addEventListener('click', () => {
      if (!activeSelectedClaimData || !activeSelectedClaimData.id) {
        closeDrawer();
        return;
      }
      
      const claimId = activeSelectedClaimData.id;
      if (state.reviewedClaimIds[claimId]) {
        closeDrawer();
        return;
      }
      
      // Award points only on first review
      state.stats.xp += 50;
      state.reviewedClaimIds[claimId] = "Evidence Makes Sense";
      state.stats.claimsVerified += 1;
      
      // Update ledger history
      const today = new Date().toISOString().split('T')[0];
      state.history.unshift({
        id: Date.now(),
        claim: activeSelectedClaimData.text,
        topic: activeSelectedClaimData.topic || 'General Inquiry',
        action: "Verified",
        status: "Successful",
        points: 50,
        date: today
      });
      
      const topName = activeSelectedClaimData.topic || 'General Inquiry';
      state.stats.topics[topName] = (state.stats.topics[topName] || 0) + 1;
      
      checkLevelUp();
      
      const spanInChat = chatThreadContainer.querySelector(`.interactive-claim[data-claim-id="${claimId}"]`);
      if (spanInChat) {
        spanInChat.className = `interactive-claim ${activeSelectedClaimData.label} verified-confirmed`;
      }
      
      saveStateToPersist();
      updateSidebarStateUI();
      renderDashboardMetrics();
      showToastNotification("+50 XP Gained!", "Claim successfully verified.");
      closeDrawer();
    });
  }

  if (btnDrawerNeedsMore) {
    btnDrawerNeedsMore.addEventListener('click', () => {
      if (!activeSelectedClaimData || !activeSelectedClaimData.id) {
        closeDrawer();
        return;
      }
      
      const claimId = activeSelectedClaimData.id;
      if (state.reviewedClaimIds[claimId]) {
        closeDrawer();
        return;
      }
      
      // Award points only on first review
      state.stats.xp += 50;
      state.reviewedClaimIds[claimId] = "Needs More Evidence";
      state.stats.claimsQuestioned += 1;
      
      // Increment count in questioned stats dynamically
      const statIndex = state.mostQuestionedStats.findIndex(item => item.id === claimId);
      if (statIndex !== -1) {
        state.mostQuestionedStats[statIndex].count += 1;
      } else {
        let labelName = activeSelectedClaimData.label || "medium";
        let statusName = "🟡 Needs Context";
        if (labelName === 'high') statusName = "🟢 Verified";
        else if (labelName === 'low') statusName = "🔴 Potentially Incorrect";
        
        state.mostQuestionedStats.push({
          id: claimId,
          claim: activeSelectedClaimData.text,
          count: 1,
          label: labelName,
          status: statusName
        });
      }
      
      // Sort so highest bubbled to top
      state.mostQuestionedStats.sort((a, b) => b.count - a.count);
      
      // Update ledger history
      const today = new Date().toISOString().split('T')[0];
      state.history.unshift({
        id: Date.now(),
        claim: activeSelectedClaimData.text,
        topic: activeSelectedClaimData.topic || 'General Inquiry',
        action: "Questioned",
        status: "Successful",
        points: 50,
        date: today
      });
      
      const topName = activeSelectedClaimData.topic || 'General Inquiry';
      state.stats.topics[topName] = (state.stats.topics[topName] || 0) + 1;
      
      checkLevelUp();
      
      const spanInChat = chatThreadContainer.querySelector(`.interactive-claim[data-claim-id="${claimId}"]`);
      if (spanInChat) {
        spanInChat.className = `interactive-claim ${activeSelectedClaimData.label} verified-disputed`;
      }
      
      saveStateToPersist();
      updateSidebarStateUI();
      renderDashboardMetrics();
      showToastNotification("+50 XP Gained!", "Claim flagged as needing more evidence.");
      closeDrawer();
    });
  }

  function checkLevelUp() {
    if (state.stats.xp >= state.stats.xpToNextLevel) {
      state.stats.level += 1;
      state.stats.xp = state.stats.xp - state.stats.xpToNextLevel;
      setTimeout(() => alert(`🎉 LEVEL UP! You reached Level ${state.stats.level} Critical Thinker!`), 500);
    }
  }

  function showToastNotification(title, detail) {
    pointsNotifTitle.textContent = title;
    pointsNotifDetail.textContent = detail;
    pointsNotification.classList.add('show');
    setTimeout(() => pointsNotification.classList.remove('show'), 3500);
  }

  function hideTooltip() {}

  document.addEventListener('click', (e) => {});
  chatThreadContainer.addEventListener('scroll', hideTooltip);
  window.addEventListener('resize', hideTooltip);


  // --- EDUCATIONAL TRUST ANALYSIS DRAWER & CHECKLISTS ---

  function openDrawer(claimData) {
    if (!claimData) return;
    
    activeSelectedClaimData = claimData;

    drawerMetaTopic.textContent = `Topic: ${claimData.topic || 'Nutrition'}`;
    drawerClaimText.textContent = `"${claimData.text}"`;
    drawerScoreVal.textContent = `${claimData.score}%`;
    drawerScoreBar.style.width = `${claimData.score}%`;

    // Apply color bounds based on score
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
    bullet2.innerHTML = `<span class="bullet-icon">💡</span><span class="bullet-text">Evaluate the scientific indicators below to build critical skills.</span>`;
    drawerReasonsList.appendChild(bullet2);

    // Clickable Source Information
    drawerSourceTitle.textContent = claimData.sourceTitle || "Primary Reference Article";
    drawerSourceOrg.textContent = claimData.sourceOrg || claimData.source || "Academic Repository";
    drawerSourceDate.textContent = claimData.sourceDate ? `Published: ${claimData.sourceDate}` : "Publication Date: N/A";
    drawerExplanationText.textContent = claimData.explanation || 'Detailed verification materials pending.';
    drawerSourceLink.href = claimData.sourceLink || '#';
    const linkSpan = drawerSourceLink.querySelector('span');
    if (linkSpan) {
      linkSpan.textContent = `Read article on ${claimData.source || 'Primary Source'}`;
    }

    // Render Suggested Correction if applicable
    if (claimData.correctedVersion) {
      drawerCorrectionText.textContent = claimData.correctedVersion;
      drawerCorrectionCard.style.display = 'block';
    } else {
      drawerCorrectionCard.style.display = 'none';
    }

    // Render Self-Evaluation Steps
    if (claimData.evaluationGuide) {
      drawerGuideText.textContent = claimData.evaluationGuide;
      drawerGuideCard.style.display = 'block';
    } else {
      drawerGuideText.textContent = "To evaluate similar claims yourself: 1) Verify backing peer-reviewed literature in academic hubs. 2) Check domain extensions and sponsoring organizations for biases. 3) Cross-reference statements with consensus scientific reviews.";
      drawerGuideCard.style.display = 'block';
    }

    // Set clear statuses with visual treatments
    let statusText = "🟢 Verified";
    let statusClass = "verified";
    
    if (claimData.label === 'medium') {
      statusText = "🟡 Needs Context";
      statusClass = "partially-supported";
    } else if (claimData.label === 'low') {
      statusText = "🔴 Potentially Incorrect";
      statusClass = "potentially-incorrect";
    }
    setDrawerStatusPill(statusText, statusClass);

    // Automatically check checklist checkboxes as static read-only indicators
    checkReputable.checked = (claimData.score >= 50);
    checkRecent.checked = (claimData.score >= 40);
    checkFact.checked = true;
    checkConsensus.checked = (claimData.score >= 60);
    checkEvidence.checked = (claimData.score >= 50);
    
    checkReputable.disabled = true;
    checkRecent.disabled = true;
    checkFact.disabled = true;
    checkConsensus.disabled = true;
    checkEvidence.disabled = true;

    // XP Anti-Farming & Reviewed State checks
    const isReviewed = state.reviewedClaimIds && state.reviewedClaimIds[claimData.id];
    if (isReviewed) {
      const choiceVal = state.reviewedClaimIds[claimData.id];
      drawerReviewedBadge.textContent = `Reviewed - ${choiceVal}`;
      drawerReviewedBadge.className = `reviewed-badge ${choiceVal === 'Evidence Makes Sense' ? 'verified-ok' : 'unconvinced'}`;
      drawerReviewedBadge.style.display = 'inline-block';
      
      btnDrawerEvidenceOk.disabled = true;
      btnDrawerNeedsMore.disabled = true;
    } else {
      drawerReviewedBadge.style.display = 'none';
      btnDrawerEvidenceOk.disabled = false;
      btnDrawerNeedsMore.disabled = false;
    }

    drawerContainer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.style.display = 'block';
  }

  function setDrawerStatusPill(status, className) {
    drawerStatusPill.className = `status-pill ${className}`;
    drawerStatusPill.textContent = status;
  }

  function closeDrawer() {
    drawerContainer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.style.display = 'none';
  }

  if (btnDrawerClose) btnDrawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);


  // --- PROFESSIONAL ANALYTICS DASHBOARD ENGINE ---

  function renderDashboardMetrics() {
    // Dynamically recalculate Trust Score based on active engagement metrics
    state.stats.trustScore = Math.min(100, Math.round(75 + (state.stats.claimsVerified * 0.8) + (state.stats.claimsQuestioned * 0.5)));

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

    if (dashVerifiedCount) dashVerifiedCount.textContent = state.stats.claimsVerified || 0;
    if (dashQuestionedCount) dashQuestionedCount.textContent = state.stats.claimsQuestioned || 0;
    if (dashStreakNum) dashStreakNum.textContent = `${state.stats.streakDays} Days`;
    
    // Learning progress percentage
    const progressVal = Math.round((state.stats.xp / state.stats.xpToNextLevel) * 100);
    if (dashProgressPct) dashProgressPct.textContent = `${progressVal}%`;
    
    const learningBarFill = document.getElementById('dash-learning-bar-fill');
    if (learningBarFill) learningBarFill.style.width = `${progressVal}%`;

    // Reviewed Claims count
    const reviewedCountEl = document.getElementById('dash-reviewed-count');
    if (reviewedCountEl) {
      const reviewedCount = Object.keys(state.reviewedClaimIds || {}).length;
      reviewedCountEl.textContent = reviewedCount || 0;
    }

    // Render Recent Activity Timeline
    const timelineEl = document.getElementById('dash-activity-timeline');
    if (timelineEl && state.history) {
      timelineEl.innerHTML = '';
      if (state.history.length === 0) {
        timelineEl.innerHTML = '<p class="no-activity">No recent verification activity.</p>';
      } else {
        state.history.slice(0, 4).forEach(item => {
          const div = document.createElement('div');
          div.className = `timeline-item ${item.action.toLowerCase()}`;
          div.innerHTML = `
            <div class="timeline-badge">${item.action === 'Verified' ? '✓' : '⚠️'}</div>
            <div class="timeline-details">
              <span class="timeline-time">${item.date}</span>
              <h5>Claim ${item.action}: ${item.topic}</h5>
              <p class="timeline-claim-snippet">"${item.claim.substring(0, 75)}..."</p>
              <span class="timeline-points">+${item.points} XP gained</span>
            </div>
          `;
          timelineEl.appendChild(div);
        });
      }
    }

    // Render Most Questioned Claims widget dynamically
    const questionedBody = document.getElementById('dash-questioned-claims-body');
    if (questionedBody && state.mostQuestionedStats) {
      questionedBody.innerHTML = '';
      state.mostQuestionedStats.slice(0, 5).forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><div class="ledger-claim-cell" title="${item.claim}">${item.claim}</div></td>
          <td style="text-align: center;"><span class="question-count-badge">${item.count} times</span></td>
          <td style="text-align: center;"><span class="status-pill ${item.label === 'high' ? 'verified' : (item.label === 'medium' ? 'partially-supported' : 'potentially-incorrect')}">${item.status}</span></td>
        `;
        questionedBody.appendChild(tr);
      });
    }

    // Explored Topics Row
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
          <span class="topic-count">${count} inspection${count > 1 ? 's' : ''}</span>
        `;
        dashTopicsList.appendChild(row);
      });
    }

    // Badge Credentials Cabinet
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

    // Claims Ledger Table
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


  // --- REDESIGNED LEARN MODE VERIFICATION FRAMEWORK ENGINE ---

  const verificationScenarios = [
    {
      id: "scenario-mars",
      topic: "Space Colonization",
      claim: "Building self-sustaining cities on Mars is scientifically viable with existing technology by 2030.",
      steps: [
        {
          step: 1,
          type: "options",
          correct: "Prediction",
          feedback: "Correct! This is a prediction because it speculates about a future accomplishment (2030) that has not yet occurred, rather than describing a present objective reality."
        },
        {
          step: 2,
          type: "options",
          correct: "biased_speculative",
          sourceText: "<strong>Source</strong>: A tech enthusiast blog posting on a social space forum, citing visionary CEO social media statements.",
          feedback: "Correct! Enthusiast blogs lack scientific peer-review and present commercial and visionary speculation, making them biased and speculative."
        },
        {
          step: 3,
          type: "options",
          correct: "weak",
          evidenceText: "<strong>Primary Evidence</strong>: The blog cites promotional rocket test renders, but notes no closed-loop bioregenerative life support systems have ever been successfully tested for Mars atmosphere.",
          feedback: "Correct! Lacking direct physical prototypes and long-duration survival test results, renders represent extremely weak scientific evidence."
        },
        {
          step: 4,
          type: "options",
          correct: "contradict",
          crossText: "<strong>Expert Panel Cross-Check</strong>: NASA, ESA, and academic planetary scientists consensus reports assert that radiation shield technology is in its infancy and human Mars survival requires decades of research.",
          feedback: "Correct! Renowned planetary science organizations strongly qualify or contradict the claim of 2030 viability using existing technology."
        },
        {
          step: 5,
          type: "decision",
          correct: "Needs More Evidence",
          feedback: "Correct! Based on a speculative prediction, a promotional source, weak primary evidence, and contradicting scientific consensus, this claim absolutely Needs More Evidence to be taken seriously."
        }
      ]
    },
    {
      id: "scenario-coffee",
      topic: "Nutrition & Health",
      claim: "Drinking 3-4 cups of coffee daily blocks carbohydrate absorption, accelerating metabolic fat-burn by 30%.",
      steps: [
        {
          step: 1,
          type: "options",
          correct: "Fact",
          feedback: "Correct! This presents itself as an objective, measurable biological fact, which requires rigorous medical validation."
        },
        {
          step: 2,
          type: "options",
          correct: "biased_speculative",
          sourceText: "<strong>Source</strong>: A sponsored press-release by a premium commercial coffee manufacturers coalition.",
          feedback: "Correct! Because the source is directly funded by organizations selling the product, there is a substantial sponsor bias risk."
        },
        {
          step: 3,
          type: "options",
          correct: "weak",
          evidenceText: "<strong>Primary Evidence</strong>: An observational lifestyle survey of 150 corporate employees, showing coffee drinkers lost slightly more weight on average over 2 months.",
          feedback: "Correct! Small-sample self-reported surveys show correlation but fail to prove biological causation, making this weak evidence."
        },
        {
          step: 4,
          type: "options",
          correct: "contradict",
          crossText: "<strong>Expert Panel Cross-Check</strong>: A major meta-analysis published in the New England Journal of Medicine shows metabolic rates fluctuate only marginally (3-11%) from caffeine and does not block carb absorption.",
          feedback: "Correct! Rigorous peer-reviewed medical consensus directly contradicts the sensational 30% fat-burn and carbohydrate blocking claims."
        },
        {
          step: 5,
          type: "decision",
          correct: "Needs More Evidence",
          feedback: "Correct! A biased commercial source with weak observational survey data contradicting clinical meta-analyses fails our framework and requires more evidence."
        }
      ]
    },
    {
      id: "scenario-boiling",
      topic: "Physics & Earth Science",
      claim: "Water boils at a lower temperature at high altitudes because atmospheric pressure is reduced.",
      steps: [
        {
          step: 1,
          type: "options",
          correct: "Fact",
          feedback: "Correct! This is a physical statement describing pressure-temperature relationships, which can be empirically verified."
        },
        {
          step: 2,
          type: "options",
          correct: "highly_credible",
          sourceText: "<strong>Source</strong>: The National Oceanic and Atmospheric Administration (NOAA) science education handbook.",
          feedback: "Correct! NOAA is a federal scientific agency with institutional standing and zero commercial bias."
        },
        {
          step: 3,
          type: "options",
          correct: "strong",
          evidenceText: "<strong>Primary Evidence</strong>: Thermodynamic equations and lab tests demonstrating that at 1 mile elevation (Denver, CO), reduced pressure lowers boiling point to 95°C.",
          feedback: "Correct! Handbooks rely on replicated physical laws and well-tested thermal dynamic models."
        },
        {
          step: 4,
          type: "options",
          correct: "agree",
          crossText: "<strong>Expert Panel Cross-Check</strong>: Physics textbooks, NIST parameters, and worldwide barometric studies fully agree on the pressure-vapor curve.",
          feedback: "Correct! Broad consensus exists without any academic divergence or controversy."
        },
        {
          step: 5,
          type: "decision",
          correct: "Evidence Makes Sense",
          feedback: "Correct! This claim is a well-established, highly verified physical science fact with highly credible sources, strong evidence, and consensus agreement."
        }
      ]
    }
  ];

  let currentScenarioIdx = 0;
  let currentStepNum = 1;
  let scenarioState = {
    selectedAnswers: {}
  };

  const scenarioSelectorList = document.getElementById('scenario-selector-list');
  const frameworkScenarioTitle = document.getElementById('framework-scenario-title');
  const frameworkScenarioTopic = document.getElementById('framework-scenario-topic');
  const frameworkScenarioClaim = document.getElementById('framework-scenario-claim');
  const frameworkStepIndicator = document.getElementById('framework-step-indicator');
  const btnFrameworkPrev = document.getElementById('btn-framework-prev');
  const btnFrameworkNext = document.getElementById('btn-framework-next');

  // Load scenarios buttons in sidebar
  function initScenarioList() {
    if (!scenarioSelectorList) return;
    scenarioSelectorList.innerHTML = '';
    
    verificationScenarios.forEach((s, idx) => {
      const btn = document.createElement('button');
      btn.className = `btn-scenario-item ${idx === currentScenarioIdx ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="scenario-btn-topic">${s.topic}</span>
        <span class="scenario-btn-claim">${s.claim.substring(0, 45)}...</span>
      `;
      btn.addEventListener('click', () => {
        currentScenarioIdx = idx;
        currentStepNum = 1;
        scenarioState.selectedAnswers = {};
        
        document.querySelectorAll('.btn-scenario-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        loadScenarioStep();
      });
      scenarioSelectorList.appendChild(btn);
    });
  }

  function loadScenarioStep() {
    const scenario = verificationScenarios[currentScenarioIdx];
    if (!scenario) return;

    // Load static details
    if (frameworkScenarioTitle) frameworkScenarioTitle.textContent = `Guided Scenario: ${scenario.topic}`;
    if (frameworkScenarioTopic) frameworkScenarioTopic.textContent = `Topic: ${scenario.topic}`;
    if (frameworkScenarioClaim) frameworkScenarioClaim.textContent = `"${scenario.claim}"`;

    // Update Dots & Indicator
    document.querySelectorAll('.step-dot').forEach(dot => {
      const dotStep = parseInt(dot.getAttribute('data-step'));
      dot.className = 'step-dot';
      if (dotStep === currentStepNum) {
        dot.classList.add('active');
      } else if (dotStep < currentStepNum) {
        dot.classList.add('completed');
      }
    });

    const stepTitles = [
      "Step 1: What Type of Claim Is This?",
      "Step 2: Who Is Making The Claim?",
      "Step 3: What Evidence Supports It?",
      "Step 4: Can The Claim Be Cross-Verified?",
      "Step 5: Final Assessment"
    ];
    if (frameworkStepIndicator) frameworkStepIndicator.textContent = stepTitles[currentStepNum - 1];

    // Show active panel
    document.querySelectorAll('.step-panel').forEach((panel, idx) => {
      if (idx === (currentStepNum - 1)) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Populate Dynamic Step Panels
    const stepData = scenario.steps[currentStepNum - 1];
    
    if (currentStepNum === 2) {
      const srcEl = document.getElementById('framework-source-info');
      if (srcEl) srcEl.innerHTML = stepData.sourceText;
    } else if (currentStepNum === 3) {
      const evEl = document.getElementById('framework-evidence-info');
      if (evEl) evEl.innerHTML = stepData.evidenceText;
    } else if (currentStepNum === 4) {
      const crossEl = document.getElementById('framework-cross-info');
      if (crossEl) crossEl.innerHTML = stepData.crossText;
    }

    // Set buttons states based on selection history
    const panelId = `step-panel-${currentStepNum}`;
    const panel = document.getElementById(panelId);
    const feedbackBox = document.getElementById(`step-feedback-${currentStepNum}`);

    if (panel) {
      const btns = panel.querySelectorAll('.btn-step-option, .btn-framework-final');
      const alreadySelected = scenarioState.selectedAnswers[currentStepNum];
      
      if (feedbackBox) feedbackBox.style.display = 'none';

      btns.forEach(btn => {
        btn.classList.remove('correct', 'incorrect', 'active');
        btn.disabled = false;

        const btnOpt = btn.getAttribute('data-option') || btn.textContent.trim();
        
        if (alreadySelected) {
          btn.disabled = true;
          if (btnOpt.toLowerCase().includes(alreadySelected.toLowerCase()) || btnOpt.toLowerCase().includes(stepData.correct.toLowerCase())) {
            if (alreadySelected.toLowerCase() === stepData.correct.toLowerCase() || (currentStepNum === 5 && alreadySelected === stepData.correct)) {
              btn.classList.add('correct');
            } else {
              btn.classList.add('incorrect');
            }
          }
        }

        // Attach option clicks (avoiding multiple events by cloning)
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        
        if (!alreadySelected) {
          newBtn.addEventListener('click', () => {
            handleStepSelection(newBtn, btnOpt, stepData);
          });
        }
      });
    }

    // Navigation footers
    if (btnFrameworkPrev) btnFrameworkPrev.disabled = (currentStepNum === 1);
    if (btnFrameworkNext) {
      const isCompleted = !!scenarioState.selectedAnswers[currentStepNum];
      btnFrameworkNext.disabled = !isCompleted || currentStepNum === 5;
    }
  }

  function handleStepSelection(btnElement, selection, stepData) {
    const isCorrect = selection.toLowerCase().includes(stepData.correct.toLowerCase()) || 
                      (currentStepNum === 5 && selection === stepData.correct);
    
    scenarioState.selectedAnswers[currentStepNum] = selection;
    
    // Toggle active classes
    const panel = document.getElementById(`step-panel-${currentStepNum}`);
    panel.querySelectorAll('.btn-step-option, .btn-framework-final').forEach(b => {
      b.disabled = true;
    });

    if (isCorrect) {
      btnElement.classList.add('correct');
      
      // Award XP points on first time successfully answering a step!
      state.stats.xp += 15;
      showToastNotification("+15 XP Gained!", `Framework step ${currentStepNum} completed!`);
      checkLevelUp();
      saveStateToPersist();
      updateSidebarStateUI();
      renderDashboardMetrics();
    } else {
      btnElement.classList.add('incorrect');
    }

    const feedbackBox = document.getElementById(`step-feedback-${currentStepNum}`);
    if (feedbackBox) {
      feedbackBox.className = `step-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
      feedbackBox.innerHTML = `<strong>${isCorrect ? '✓ Excellent!' : '✗ Let\'s Re-evaluate:'}</strong> ${stepData.feedback}`;
      feedbackBox.style.display = 'block';
    }

    if (btnFrameworkNext && currentStepNum < 5) btnFrameworkNext.disabled = false;
  }

  // Navigation handlers
  if (btnFrameworkPrev) {
    btnFrameworkPrev.addEventListener('click', () => {
      if (currentStepNum > 1) {
        currentStepNum--;
        loadScenarioStep();
      }
    });
  }
  if (btnFrameworkNext) {
    btnFrameworkNext.addEventListener('click', () => {
      if (currentStepNum < 5) {
        currentStepNum++;
        loadScenarioStep();
      }
    });
  }

  // Sub-tabs switcher
  learnTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      learnTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetMod = btn.getAttribute('data-module');
      moduleBodies.forEach(body => {
        if (body.id === `module-${targetMod}-view`) {
          body.classList.add('active');
        } else {
          body.classList.remove('active');
        }
      });
      
      if (targetMod === 'exercises') {
        initScenarioList();
        loadScenarioStep();
      }
    });
  });

  function loadLearnPracticeCard() {
    // Legacy mapping fallback, redirects internally to verification framework
    initScenarioList();
    loadScenarioStep();
  }


  // --- INPUT & SIDEBAR EVENTS BINDINGS ---

  // Click quick-prompt cards triggers immediate search!
  const promptCards = document.querySelectorAll('.chat-prompt-card');
  promptCards.forEach(card => {
    card.addEventListener('click', () => {
      const prompt = card.getAttribute('data-prompt');
      displayAIChatResponse(prompt);
    });
  });

  // Recent Chats Sidebar list items click
  const historyItems = document.querySelectorAll('.history-list li');
  const sampleQuestionItems = document.querySelectorAll('.sample-question-item');

  historyItems.forEach(item => {
    item.addEventListener('click', () => {
      historyItems.forEach(i => i.classList.remove('active'));
      sampleQuestionItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const trigger = item.getAttribute('data-chat-trigger');
      if (trigger) {
        switchTab('chat');
        let promptVal = "";
        if (trigger === 'coffee') promptVal = "Is coffee healthy?";
        if (trigger === 'carrot') promptVal = "Do carrots improve night vision?";
        if (trigger === 'photosynthesis') promptVal = "How does photosynthesis work?";
        displayAIChatResponse(promptVal);
      }
    });
  });

  // Sample Questions click triggers
  sampleQuestionItems.forEach(item => {
    item.addEventListener('click', () => {
      sampleQuestionItems.forEach(i => i.classList.remove('active'));
      historyItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const prompt = item.getAttribute('data-prompt');
      if (prompt) {
        switchTab('chat');
        displayAIChatResponse(prompt);
      }
    });
  });

  if (sendMessageBtn && chatInputField) {
    sendMessageBtn.addEventListener('click', () => {
      const txt = chatInputField.value.trim();
      if (!txt) return;

      chatInputField.value = '';
      chatInputField.style.height = '24px';

      displayAIChatResponse(txt);
    });

    chatInputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageBtn.click();
      }
    });
  }

  // Reset to empty start home screen on "New chat" click
  const newChatSidebarBtn = document.getElementById('new-chat-sidebar-btn');
  if (newChatSidebarBtn) {
    newChatSidebarBtn.addEventListener('click', () => {
      chatThreadContainer.innerHTML = '';
      chatThreadContainer.style.display = 'none';
      chatHomeView.style.display = 'flex';
      
      historyItems.forEach(i => i.classList.remove('active'));
      sampleQuestionItems.forEach(i => i.classList.remove('active'));
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
  renderDashboardMetrics();
  loadLearnPracticeCard();
  console.log("ChatGPT Learn Mode Loaded successfully.");
});
