(function () {
  'use strict';

  // ─── MOCK DATA ────────────────────────────────────────────
  const DEFAULT_MEMOJI = { face: '🟡', eyes: '👀', mouth: '😊' };

  const MOCK_FRIENDS = [
    { id: 'f1', name: 'Alex Chen', memoji: '🧑', color: '#ff6b6b', online: true },
    { id: 'f2', name: 'Maya Rodriguez', memoji: '👩', color: '#ffd93d', online: true },
    { id: 'f3', name: 'Jordan Kim', memoji: '🧔', color: '#6bcbff', online: false },
    { id: 'f4', name: 'Sam Taylor', memoji: '👨', color: '#a66cff', online: true },
    { id: 'f5', name: 'Priya Sharma', memoji: '👩‍🦱', color: '#ff8fab', online: true },
    { id: 'f6', name: 'Chris Miller', memoji: '🧑‍🦰', color: '#51cf66', online: false },
    { id: 'f7', name: 'Emma Wilson', memoji: '👩‍🦳', color: '#ff922b', online: true },
    { id: 'f8', name: 'Liam Garcia', memoji: '👨‍🦱', color: '#845ef7', online: false },
    { id: 'f9', name: 'Zoe Patel', memoji: '👧', color: '#ff6b6b', online: true },
    { id: 'f10', name: 'Noah Brown', memoji: '👦', color: '#20c997', online: true },
  ];

  const MOCK_CHANNELS = [
    {
      id: 'ch1', name: 'Trending Todos', icon: '🔥',
      posts: [
        { user: 'trending_bot', avatar: '🔥', text: '"Clean your workspace" is the #1 todo today — 2.4k people just did it!' },
        { user: 'trending_bot', avatar: '🔥', text: '"Drink 8 glasses of water" trending up 340% this week. Stay hydrated!' },
        { user: 'trending_bot', avatar: '🔥', text: '"Read for 20 mins" hits peak productivity hours at 7pm. Join the club.' },
      ]
    },
    {
      id: 'ch2', name: 'World Tasks', icon: '🌍',
      posts: [
        { user: 'global_admin', avatar: '🌍', text: 'Tokyo: 12k people checked off "Morning stretch" today. 05/05 ✅' },
        { user: 'global_admin', avatar: '🌍', text: 'London: "Take the stairs" challenge completed by 8.3k users. Go go go!' },
        { user: 'global_admin', avatar: '🌍', text: 'São Paulo: "Learn 5 new words" is the top educational task this month.' },
      ]
    },
    {
      id: 'ch3', name: 'Daily Challenges', icon: '🏆',
      posts: [
        { user: 'challenge_master', avatar: '🏆', text: '🔥 TODAY\'S CHALLENGE: Complete 3 todos before noon. Reward: 7-day streak boost!' },
        { user: 'challenge_master', avatar: '🏆', text: '⭐ WEEKLY: "No phone 1 hour before bed" — 5,200 participants joined!' },
        { user: 'challenge_master', avatar: '🏆', text: '🎯 30-day productivity sprint — Day 17: "Plan tomorrow, tonight."' },
      ]
    },
    {
      id: 'ch4', name: 'Todo Squad', icon: '💪',
      posts: [
        { user: 'squad_leader', avatar: '💪', text: 'Our squad checked off 847 todos this week. Let\'s hit 1k!' },
        { user: 'maya_rodriguez', avatar: '👩', text: 'Just cleared my whole list. Who\'s next? 🔥' },
        { user: 'alex_chen', avatar: '🧑', text: 'Double digits today — 10/10 todos done before lunch!' },
      ]
    }
  ];

  const MOCK_STORIES = [
    { id: 's1', friendId: 'f1', content: 'Just finished 5 todos this morning! ☀️', viewed: false },
    { id: 's2', friendId: 'f2', content: 'Todo streak: 12 days and counting 🎯', viewed: false },
    { id: 's3', friendId: 'f3', content: 'Checked off "Grocery shopping" ✅', viewed: false },
    { id: 's4', friendId: 'f4', content: 'Morning routine = 4/4 todos done 🧘', viewed: false },
    { id: 's5', friendId: 'f5', content: 'Study session + todo list = productive day 📚', viewed: false },
    { id: 's6', friendId: 'f6', content: 'Workout todo DONE. Let\'s go! 💪', viewed: false },
    { id: 's7', friendId: 'f7', content: 'Completed "Read 30 pages" — great book! 📖', viewed: false },
    { id: 's8', friendId: 'f8', content: 'Cleaned my entire desk. Feels amazing 🧹', viewed: false },
    { id: 's9', friendId: 'f9', content: 'Todo snap: hydrated, moved, learned ✅🔥', viewed: false },
    { id: 's10', friendId: 'f10', content: '7-day streak! Nothing can stop me 🚀', viewed: false },
  ];

  const MOCK_CHATS = [
    {
      friendId: 'f1', messages: [
        { text: 'Hey! Checked off my morning todos?', sent: false, time: '9:15 AM' },
        { text: 'Nice! Which ones?', sent: true, time: '9:16 AM' },
        { text: 'Meditate, stretch, and made my bed 😎', sent: false, time: '9:17 AM' },
        { text: 'That\'s a solid start! I got 4 done already', sent: true, time: '9:18 AM' },
        { text: 'Noice! Let\'s keep the streak going 🔥', sent: false, time: '9:19 AM' },
      ]
    },
    {
      friendId: 'f2', messages: [
        { text: 'Todo check! What\'s on your list today?', sent: false, time: '8:00 AM' },
        { text: 'Workout, code, read, cook. You?', sent: true, time: '8:02 AM' },
        { text: 'Same vibes! Plus I added "learn Spanish"', sent: false, time: '8:03 AM' },
        { text: 'Ooh nice. Duolingo streak?', sent: true, time: '8:05 AM' },
        { text: '45 days 💪', sent: false, time: '8:06 AM' },
      ]
    },
    {
      friendId: 'f3', messages: [
        { text: 'Bro did you see the new challenge?', sent: true, time: 'Yesterday' },
        { text: 'The "no phone before bed" one? Yeah I joined!', sent: false, time: 'Yesterday' },
        { text: 'Same. Gonna be rough lol', sent: true, time: 'Yesterday' },
        { text: 'We got this. Set a reminder on Todo Snap', sent: false, time: 'Yesterday' },
      ]
    },
    {
      friendId: 'f4', messages: [
        { text: 'Your todo streak is insane this week', sent: true, time: '2:30 PM' },
        { text: 'Haha thanks! Locked in 🔒', sent: false, time: '2:31 PM' },
      ]
    },
    {
      friendId: 'f5', messages: [
        { text: 'New here! How do I add friends?', sent: false, time: '10:00 AM' },
        { text: 'Hey! Just search their username in the chat tab', sent: true, time: '10:01 AM' },
        { text: 'Got it, thanks! 🙏', sent: false, time: '10:02 AM' },
      ]
    },
    {
      friendId: 'f6', messages: [
        { text: 'What todo app do you use?', sent: false, time: 'Mon' },
        { text: 'Todo Snap obviously 😂', sent: true, time: 'Mon' },
        { text: 'LOL fair. The ghost logo is cute', sent: false, time: 'Mon' },
      ]
    },
    {
      friendId: 'f7', messages: [
        { text: 'Check your streaks! You\'re on day 7', sent: false, time: '11:20 AM' },
        { text: 'Omg you\'re right! Time to celebrate 🎉', sent: true, time: '11:21 AM' },
      ]
    },
    {
      friendId: 'f8', messages: [
        { text: 'Task ideas for tomorrow?', sent: true, time: '8:45 PM' },
        { text: 'Gym, meal prep, call mom, write journal', sent: false, time: '8:47 PM' },
        { text: 'Solid list. Stealing the journal idea 📝', sent: true, time: '8:48 PM' },
      ]
    },
  ];

  const MOCK_MAP_PINS = [
    { friendId: 'f1', x: 22, y: 35, todos: ['Morning stretch ✅', 'Meditate ✅'] },
    { friendId: 'f2', x: 75, y: 25, todos: ['Workout ✅', 'Read 20 pages ✅'] },
    { friendId: 'f5', x: 60, y: 65, todos: ['Study Spanish ✅', 'Journal ✅'] },
    { friendId: 'f7', x: 35, y: 72, todos: ['Grocery run ✅', 'Meal prep ✅'] },
    { friendId: 'f4', x: 85, y: 55, todos: ['Code project ✅', 'Walk ✅'] },
    { friendId: 'f9', x: 15, y: 55, todos: ['Hydrate ✅', 'Stretch ✅'] },
    { friendId: 'f10', x: 50, y: 45, todos: ['Laundry ✅', 'Clean desk ✅'] },
    { friendId: 'f3', x: 68, y: 80, todos: ['Call mom ✅', 'Plan week ✅'] },
  ];

  const MOCK_TODO_FRIENDS = [
    { friendId: 'f1', streak: 12, doneToday: 5 },
    { friendId: 'f2', streak: 9, doneToday: 4 },
    { friendId: 'f5', streak: 15, doneToday: 6 },
    { friendId: 'f7', streak: 7, doneToday: 3 },
    { friendId: 'f4', streak: 21, doneToday: 4 },
    { friendId: 'f10', streak: 8, doneToday: 5 },
    { friendId: 'f9', streak: 4, doneToday: 2 },
    { friendId: 'f3', streak: 3, doneToday: 1 },
  ];

  const TODOS_FOR_OVERLAY = [
    '☀️ Morning stretch', '💧 Drink water', '📖 Read 10 pages',
    '🧘 Meditate', '🏋️ Workout', '📝 Plan day',
    '🥗 Eat healthy', '🚶 Walk 30 min', '🧹 Clean desk',
  ];

  // ─── STATE ────────────────────────────────────────────────
  let state = {
    loggedIn: false,
    memoji: { ...DEFAULT_MEMOJI },
    todosDone: 17,
    currentChat: null,
    currentStoryIndex: -1,
    storyTimer: null,
    flashMode: false,
    cameraMode: 'front',
  };

  // ─── LOCAL STORAGE ───────────────────────────────────────
  function loadState() {
    try {
      const saved = localStorage.getItem('todosnap_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        state.loggedIn = parsed.loggedIn || false;
        state.memoji = parsed.memoji || { ...DEFAULT_MEMOJI };
        state.todosDone = parsed.todosDone || 17;
      }
      const chats = localStorage.getItem('todosnap_chats');
      if (chats) {
        const parsed = JSON.parse(chats);
        // Merge into MOCK_CHATS, preserve new messages
        parsed.forEach((pc, i) => {
          if (MOCK_CHATS[i]) {
            // Merge messages, keep existing ones + any new ones from storage
            const existingIds = new Set(MOCK_CHATS[i].messages.map(m => m.text + m.time));
            pc.messages.forEach(m => {
              if (!existingIds.has(m.text + m.time)) {
                MOCK_CHATS[i].messages.push(m);
              }
            });
          } else {
            MOCK_CHATS.push(pc);
          }
        });
      }
    } catch (e) { /* ignore */ }
  }

  function saveState() {
    localStorage.setItem('todosnap_state', JSON.stringify({
      loggedIn: state.loggedIn,
      memoji: state.memoji,
      todosDone: state.todosDone,
    }));
  }

  function saveChats() {
    localStorage.setItem('todosnap_chats', JSON.stringify(MOCK_CHATS));
  }

  // ─── DOM REFS ────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const loginView = $('view-login');
  const mainView = $('view-main');
  const loginBtn = $('login-btn');
  const cameraTodos = $('camera-todos');
  const chatList = $('chat-list');
  const chatWindow = $('chat-window');
  const chatMessages = $('chat-messages');
  const chatInput = $('chat-input');
  const chatSendBtn = $('chat-send-btn');
  const chatBackBtn = $('chat-back-btn');
  const chatWindowInfo = $('chat-window-info');
  const storiesList = $('stories-list');
  const storyViewer = $('story-viewer');
  const storyProgress = $('story-progress');
  const storyViewerContent = $('story-viewer-content');
  const storyViewerCaption = $('story-viewer-caption');
  const storyCloseBtn = $('story-close-btn');
  const storyTapLeft = $('story-tap-left');
  const storyTapRight = $('story-tap-right');
  const feedChannels = $('feed-channels');
  const mapPins = $('map-pins');
  const memojiPreview = $('memoji-preview');
  const faceShapeOptions = $('face-shape-options');
  const eyesOptions = $('eyes-options');
  const mouthOptions = $('mouth-options');
  const snapOverlay = $('snap-overlay');
  const snapFlash = $('snap-flash');
  const snapResultText = $('snap-result-text');
  const captureBtn = $('capture-btn');
  const flashBtn = $('flash-btn');
  const flipBtn = $('flip-btn');
  const statTodos = $('stat-todos');
  const statStreak = $('stat-streak');
  const statFriends = $('stat-friends');
  const todoFriendsView = $('view-todo-friends');
  const todoFriendsList = $('todo-friends-list');
  const todoFriendsBack = $('todo-friends-back');
  const profileSaveBtn = $('profile-save-btn');
  const profileBackBtn = $('profile-back-btn');
  const logoutBtn = $('logout-btn');
  const newChatBtn = $('new-chat-btn');
  const bottomNav = $('bottom-nav');

  // ─── NAVIGATION ──────────────────────────────────────────
  function navigateTo(tab) {
    document.querySelectorAll('.subview').forEach(v => v.classList.remove('active'));
    const target = $('subview-' + tab);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.nav-btn[data-tab="${tab}"]`);
    if (btn) btn.classList.add('active');

    // Close chat window if navigating away
    if (tab !== 'chat') {
      chatWindow.style.display = 'none';
      state.currentChat = null;
    }
    // Close story viewer
    if (tab !== 'stories') {
      storyViewer.style.display = 'none';
      if (state.storyTimer) clearTimeout(state.storyTimer);
    }
    // Load content
    if (tab === 'chat') renderChatList();
    if (tab === 'stories') renderStories();
    if (tab === 'feed') renderFeed();
    if (tab === 'map') renderMap();
    if (tab === 'profile') renderProfile();
    if (tab === 'camera') renderCameraTodos();
  }

  // ─── LOGIN ────────────────────────────────────────────────
  function handleLogin() {
    state.loggedIn = true;
    loginView.classList.remove('active');
    mainView.classList.add('active');
    saveState();
    renderCameraTodos();
    renderChatList();
    renderStories();
  }

  // ─── CAMERA ───────────────────────────────────────────────
  function renderCameraTodos() {
    const shuffled = [...TODOS_FOR_OVERLAY].sort(() => Math.random() - 0.5).slice(0, 4);
    cameraTodos.innerHTML = shuffled.map(t => `<span class="todo-chip">${t}</span>`).join('');
  }

  captureBtn.addEventListener('click', function () {
    // Snap animation
    snapOverlay.style.display = 'flex';
    const flash = document.createElement('div');
    flash.className = 'snap-overlay-flash';
    snapOverlay.appendChild(flash);

    state.todosDone += Math.floor(Math.random() * 3) + 1;
    saveState();

    const messages = [
      '📸 Today\'s todos snapped!',
      '✅ Todos captured! Keep going!',
      '🔥 Snap! Todos documented!',
      '⭐ Another productive snap!',
      '💪 Todos checked! You\'re on fire!'
    ];
    snapResultText.textContent = messages[Math.floor(Math.random() * messages.length)];

    setTimeout(() => {
      snapOverlay.style.display = 'none';
      while (snapOverlay.firstChild) snapOverlay.removeChild(snapOverlay.firstChild);
      renderCameraTodos();
    }, 1200);
  });

  flashBtn.addEventListener('click', function () {
    state.flashMode = !state.flashMode;
    flashBtn.style.background = state.flashMode ? 'rgba(255,252,0,0.4)' : 'rgba(255,255,255,0.2)';
    flashBtn.textContent = state.flashMode ? '⚡💡' : '⚡';
  });

  flipBtn.addEventListener('click', function () {
    state.cameraMode = state.cameraMode === 'front' ? 'back' : 'front';
    flipBtn.style.transform = 'rotate(360deg)';
    setTimeout(() => flipBtn.style.transform = '', 400);
    renderCameraTodos();
  });

  // ─── CHAT ─────────────────────────────────────────────────
  function renderChatList() {
    chatList.innerHTML = '';
    chatList.style.display = '';
    chatWindow.style.display = 'none';
    state.currentChat = null;
    MOCK_FRIENDS.forEach(friend => {
      const chat = MOCK_CHATS.find(c => c.friendId === friend.id);
      if (!chat) return;
      const last = chat.messages[chat.messages.length - 1];
      const item = document.createElement('div');
      item.className = 'chat-item';
      item.dataset.friendId = friend.id;
      item.innerHTML = `
        <div class="chat-item-avatar">${friend.memoji}</div>
        <div class="chat-item-info">
          <div class="chat-item-name">${friend.name}</div>
          <div class="chat-item-preview">${last ? last.text : 'No messages yet'}</div>
        </div>
        <div class="chat-item-time">${last ? last.time : ''}</div>
      `;
      item.addEventListener('click', () => openChat(friend));
      chatList.appendChild(item);
    });
  }

  function openChat(friend) {
    state.currentChat = friend.id;
    chatList.style.display = 'none';
    chatWindow.style.display = 'flex';
    chatWindowInfo.innerHTML = `${friend.memoji} ${friend.name} <span class="chat-window-status">${friend.online ? '🟢 Online' : '⚪ Offline'}</span>`;
    renderChatMessages();
  }

  function renderChatMessages() {
    const chat = MOCK_CHATS.find(c => c.friendId === state.currentChat);
    if (!chat) return;
    chatMessages.innerHTML = '';
    chat.messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = `message ${msg.sent ? 'sent' : 'received'}`;
      div.innerHTML = `${msg.text}<div class="msg-time">${msg.time}</div>`;
      chatMessages.appendChild(div);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatSendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') sendMessage();
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || !state.currentChat) return;
    const chat = MOCK_CHATS.find(c => c.friendId === state.currentChat);
    if (!chat) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    chat.messages.push({ text, sent: true, time: timeStr });
    chatInput.value = '';
    renderChatMessages();
    saveChats();

    // Simulate reply after short delay
    setTimeout(() => {
      const replies = [
        'Nice! Keep going 🔥', 'Got it! ✅', 'Love that energy! 💪',
        'Todo snapped! 📸', 'You\'re killing it! ⭐', 'Same here! 🙌',
        'Awesome! Let\'s do this! 🚀', 'Noted! 👌', 'Haha yes! 😄'
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      chat.messages.push({ text: reply, sent: false, time: replyTime });
      renderChatMessages();
      saveChats();
    }, 1500 + Math.random() * 2000);
  }

  chatBackBtn.addEventListener('click', function () {
    renderChatList();
  });

  newChatBtn.addEventListener('click', function () {
    // Show a simple prompt to simulate new chat
    const name = prompt('Enter friend\'s name:');
    if (name && name.trim()) {
      const newFriend = {
        id: 'f' + Date.now(),
        name: name.trim(),
        memoji: ['🧑', '👩', '🧔', '👨', '👩‍🦱', '🧑‍🦰'][Math.floor(Math.random() * 6)],
        color: '#fffc00',
        online: true
      };
      MOCK_FRIENDS.push(newFriend);
      MOCK_CHATS.push({ friendId: newFriend.id, messages: [
        { text: 'You\'re now connected on Todo Snap! 👻', sent: false, time: 'Just now' }
      ]});
      saveChats();
      renderChatList();
    }
  });

  // ─── STORIES ──────────────────────────────────────────────
  function renderStories() {
    storiesList.innerHTML = '';
    const allStories = getStories();
    allStories.forEach(story => {
      const friend = MOCK_FRIENDS.find(f => f.id === story.friendId);
      if (!friend) return;
      const item = document.createElement('div');
      item.className = 'story-item';
      item.innerHTML = `
        <div class="story-ring ${story.viewed ? 'viewed' : ''}">
          <div class="story-ring-inner">${friend.memoji}</div>
        </div>
        <div class="story-item-name">${friend.name}</div>
      `;
      item.addEventListener('click', () => openStoryViewer(allStories.indexOf(story)));
      storiesList.appendChild(item);
    });
  }

  function getStories() {
    const stored = localStorage.getItem('todosnap_stories');
    if (stored) {
      return JSON.parse(stored);
    }
    return MOCK_STORIES;
  }

  function saveStories(stories) {
    localStorage.setItem('todosnap_stories', JSON.stringify(stories));
  }

  function openStoryViewer(index) {
    const stories = getStories();
    if (index < 0 || index >= stories.length) return;
    state.currentStoryIndex = index;
    const story = stories[index];
    const friend = MOCK_FRIENDS.find(f => f.id === story.friendId);
    if (!friend) return;

    // Mark as viewed
    stories[index].viewed = true;
    saveStories(stories);

    storyViewer.style.display = 'flex';
    renderStoryContent(story, friend);
    startStoryTimer(stories, index);

    renderStories();
  }

  function renderStoryContent(story, friend) {
    storyProgress.innerHTML = '<div class="story-progress-bar"><div class="story-progress-fill"></div></div>';
    storyViewerContent.innerHTML = `
      <div class="story-big-avatar">${friend.memoji}</div>
      <div class="story-big-text">${story.content}</div>
    `;
    storyViewerCaption.textContent = `${friend.name} • Just now`;
  }

  function startStoryTimer(stories, index) {
    if (state.storyTimer) clearTimeout(state.storyTimer);
    state.storyTimer = setTimeout(() => {
      if (index + 1 < stories.length) {
        openStoryViewer(index + 1);
      } else {
        storyViewer.style.display = 'none';
      }
    }, 5000);
  }

  storyCloseBtn.addEventListener('click', function () {
    storyViewer.style.display = 'none';
    if (state.storyTimer) clearTimeout(state.storyTimer);
  });

  storyTapLeft.addEventListener('click', function () {
    const stories = getStories();
    if (state.currentStoryIndex > 0) {
      if (state.storyTimer) clearTimeout(state.storyTimer);
      openStoryViewer(state.currentStoryIndex - 1);
    }
  });

  storyTapRight.addEventListener('click', function () {
    const stories = getStories();
    if (state.currentStoryIndex < stories.length - 1) {
      if (state.storyTimer) clearTimeout(state.storyTimer);
      openStoryViewer(state.currentStoryIndex + 1);
    } else {
      storyViewer.style.display = 'none';
      if (state.storyTimer) clearTimeout(state.storyTimer);
    }
  });

  $('my-story-btn').addEventListener('click', function () {
    const stories = getStories();
    const newStory = {
      id: 's' + Date.now(),
      friendId: 'self',
      content: 'My todo snap! 📸 ' + Math.random().toString(36).slice(2, 8),
      viewed: false,
    };
    stories.unshift(newStory);
    saveStories(stories);
    renderStories();
    // Add self to friends list as a pseudo-friend
    if (!MOCK_FRIENDS.find(f => f.id === 'self')) {
      MOCK_FRIENDS.unshift({ id: 'self', name: 'My Story', memoji: '👻', color: '#fffc00', online: true });
    }
    alert('Story added! 👻');
  });

  // ─── FEED ─────────────────────────────────────────────────
  function renderFeed() {
    feedChannels.innerHTML = '';
    MOCK_CHANNELS.forEach(channel => {
      const card = document.createElement('div');
      card.className = 'channel-card';
      card.innerHTML = `
        <div class="channel-header">
          <span class="channel-icon">${channel.icon}</span>
          <span class="channel-name">${channel.name}</span>
        </div>
        <div class="channel-posts">
          ${channel.posts.map(p => `
            <div class="channel-post">
              <div class="channel-post-header">
                <span class="channel-post-avatar">${p.avatar}</span>
                <span class="channel-post-user">${p.user}</span>
              </div>
              <div class="channel-post-text">${p.text}</div>
              <div class="channel-post-actions">
                <span>💬 ${Math.floor(Math.random() * 50) + 5}</span>
                <span>🔄 ${Math.floor(Math.random() * 100) + 10}</span>
                <span>❤️ ${Math.floor(Math.random() * 200) + 20}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      feedChannels.appendChild(card);
    });
  }

  // ─── MAP ──────────────────────────────────────────────────
  function renderMap() {
    mapPins.innerHTML = '';
    MOCK_MAP_PINS.forEach(pin => {
      const friend = MOCK_FRIENDS.find(f => f.id === pin.friendId);
      if (!friend) return;
      const div = document.createElement('div');
      div.className = 'map-pin';
      div.style.left = pin.x + '%';
      div.style.top = pin.y + '%';
      div.innerHTML = `
        <div class="map-pin-avatar">${friend.memoji}</div>
        <div class="map-pin-label">${friend.name}</div>
      `;
      div.addEventListener('click', function () {
        snapResultText.textContent = `${friend.name}'s todos: ${pin.todos.join(', ')}`;
        snapOverlay.style.display = 'flex';
        setTimeout(() => {
          snapOverlay.style.display = 'none';
          while (snapOverlay.firstChild) snapOverlay.removeChild(snapOverlay.firstChild);
        }, 2500);
      });
      mapPins.appendChild(div);
    });
  }

  // ─── PROFILE / MEMOJI ────────────────────────────────────
  const FACE_OPTIONS = ['🟡', '🔵', '🟢', '🟣', '🔴', '🟠'];
  const EYES_OPTIONS = ['👀', '😳', '👁️', '🙄', '😤', '😑', '🥺', '😵'];
  const MOUTH_OPTIONS = ['😊', '😄', '😐', '😮', '😏', '😋', '😌', '😆'];

  function renderProfile() {
    statTodos.textContent = state.todosDone;
    statStreak.textContent = Math.floor(state.todosDone / 3) + 1;
    statFriends.textContent = MOCK_FRIENDS.length;

    renderMemojiPreview();

    // Face shape
    faceShapeOptions.innerHTML = FACE_OPTIONS.map(f =>
      `<button class="option-btn ${state.memoji.face === f ? 'selected' : ''}" data-type="face" data-value="${f}">${f}</button>`
    ).join('');

    eyesOptions.innerHTML = EYES_OPTIONS.map(e =>
      `<button class="option-btn ${state.memoji.eyes === e ? 'selected' : ''}" data-type="eyes" data-value="${e}">${e}</button>`
    ).join('');

    mouthOptions.innerHTML = MOUTH_OPTIONS.map(m =>
      `<button class="option-btn ${state.memoji.mouth === m ? 'selected' : ''}" data-type="mouth" data-value="${m}">${m}</button>`
    ).join('');

    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const type = this.dataset.type;
        const value = this.dataset.value;
        state.memoji[type] = value;
        renderProfile();
        saveState();
      });
    });
  }

  function renderMemojiPreview() {
    memojiPreview.innerHTML = `<div class="memoji-display">${state.memoji.face}${state.memoji.eyes}${state.memoji.mouth}</div>`;
  }

  profileSaveBtn.addEventListener('click', function () {
    saveState();
    alert('Memoji saved! 👻');
  });

  profileBackBtn.addEventListener('click', function () {
    navigateTo('camera');
  });

  // ─── TODO FRIENDS ─────────────────────────────────────────
  function renderTodoFriends() {
    todoFriendsList.innerHTML = '';
    MOCK_TODO_FRIENDS.forEach(tf => {
      const friend = MOCK_FRIENDS.find(f => f.id === tf.friendId);
      if (!friend) return;
      const item = document.createElement('div');
      item.className = 'todo-friend-item';
      item.innerHTML = `
        <div class="todo-friend-avatar">${friend.memoji}</div>
        <div class="todo-friend-info">
          <div class="todo-friend-name">${friend.name}</div>
          <div class="todo-friend-desc">${tf.doneToday} todos done today</div>
        </div>
        <div class="todo-friend-streak">
          <span class="streak-fire">🔥</span>
          ${tf.streak} day streak
        </div>
      `;
      todoFriendsList.appendChild(item);
    });
  }

  function showTodoFriends() {
    renderTodoFriends();
    todoFriendsView.style.display = 'flex';
  }

  todoFriendsBack.addEventListener('click', function () {
    todoFriendsView.style.display = 'none';
  });

  // ─── BOTTOM NAV ──────────────────────────────────────────
  bottomNav.addEventListener('click', function (e) {
    const btn = e.target.closest('.nav-btn');
    if (!btn) return;
    const tab = btn.dataset.tab;
    if (tab) navigateTo(tab);
  });

  // ─── LOGOUT ───────────────────────────────────────────────
  logoutBtn.addEventListener('click', function () {
    if (confirm('Log out of Todo Snap?')) {
      state.loggedIn = false;
      mainView.classList.remove('active');
      loginView.classList.add('active');
      saveState();
    }
  });

  // ─── SIGNUP LINK ─────────────────────────────────────────
  $('signup-link').addEventListener('click', function (e) {
    e.preventDefault();
    const username = prompt('Choose a username:');
    if (username && username.trim()) {
      $('login-username').value = username.trim();
      $('login-password').value = 'todo123';
      alert('Account created! Log in to get started 👻');
    }
  });

  // ─── LOGIN BUTTON ────────────────────────────────────────
  loginBtn.addEventListener('click', handleLogin);
  $('login-username').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleLogin();
  });
  $('login-password').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleLogin();
  });

  // ─── INIT ─────────────────────────────────────────────────
  loadState();

  if (state.loggedIn) {
    loginView.classList.remove('active');
    mainView.classList.add('active');
    renderCameraTodos();
    renderChatList();
    renderStories();
    renderFeed();
    renderMap();
    renderProfile();
  } else {
    loginView.classList.add('active');
  }

  // Expose todo friends to the profile stat click
  document.querySelector('.stat-card:nth-child(3)')?.addEventListener('click', showTodoFriends);

  // Also make stat cards clickable after render
  // Use mutation observer to handle dynamic content
  const observer = new MutationObserver(() => {
    const cards = document.querySelectorAll('.stat-card');
    if (cards.length === 3) {
      cards[2].addEventListener('click', showTodoFriends);
      cards[0].addEventListener('click', function () {
        alert(`You've done ${state.todosDone} todos in total! 👻`);
      });
      cards[1].addEventListener('click', function () {
        const streak = Math.floor(state.todosDone / 3) + 1;
        alert(`🔥 ${streak} day streak! Keep it up!`);
      });
      observer.disconnect();
    }
  });
  observer.observe(document.querySelector('.profile-stats'), { childList: true, subtree: true });

  // ─── FILTER/SEARCH BUTTONS ──────────────────────────────
  $('feed-search-btn').addEventListener('click', function () {
    alert('🔍 Search channels (coming soon!)');
  });

  $('map-filter-btn').addEventListener('click', function () {
    alert('🗺️ Showing all active todo locations');
  });

})();
