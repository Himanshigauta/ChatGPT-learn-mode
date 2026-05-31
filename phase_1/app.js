/**
 * ChatGPT Learn Mode Feature Prototype - Phase 1 Application Script
 * Handles basic navigation router, tab switching states, and layouts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    activeTab: 'chat',
    stats: {
      trustPoints: 350,
      level: 2,
      xpToNextLevel: 500,
      streakDays: 4
    }
  };

  // DOM Elements
  const navTabs = document.querySelectorAll('.nav-tab');
  const viewContents = document.querySelectorAll('.tab-content');
  const chatInputField = document.getElementById('chat-input-field');
  const sendMessageBtn = document.getElementById('send-message-btn');
  const headerTrustPill = document.getElementById('header-trust-pill');

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

    // Toggle active state in sidebar navigation lists
    navTabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === tabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Fade and transition view content bodies
    viewContents.forEach(view => {
      if (view.id === `${tabId}-view`) {
        view.classList.add('active');
      } else {
        view.classList.remove('active');
      }
    });

    console.log(`[Router] Active tab switched to: ${tabId}`);
  }

  // Hook up event triggers to nav tabs
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Switch to Dashboard when clicking on header Trust Pill
  if (headerTrustPill) {
    headerTrustPill.addEventListener('click', () => {
      switchTab('dashboard');
    });
  }

  // Basic textarea height auto-grow helper
  if (chatInputField) {
    chatInputField.addEventListener('input', () => {
      chatInputField.style.height = '24px';
      chatInputField.style.height = `${Math.min(chatInputField.scrollHeight - 6, 180)}px`;
    });
  }

  // Simulated New Chat action
  const newChatBtn = document.querySelector('.new-chat-btn');
  if (newChatBtn) {
    newChatBtn.addEventListener('click', () => {
      alert("Starting a new chat conversation session. Clear current thread placeholders in subsequent phases.");
    });
  }

  // Initialize
  updateSidebarStateUI();
  console.log("Phase 1 ChatGPT Feature Shell Initialized.");
});
