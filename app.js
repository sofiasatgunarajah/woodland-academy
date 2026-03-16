// ═══════════════════════════════════════════
// WOODLAND ACADEMY — DATABASE & APP LOGIC
// ═══════════════════════════════════════════

const DB = {
  // ── INIT ──
  init() {
    if (!localStorage.getItem('wa_sofia')) {
      const defaultData = {
        name: 'Sofia',
        xp: 0,
        streak: 0,
        lastActiveDate: null,
        badges: [],
        subjectProgress: {
          maths:    { easy: { attempts: 0, correct: 0 }, medium: { attempts: 0, correct: 0 }, hard: { attempts: 0, correct: 0 } },
          english:  { easy: { attempts: 0, correct: 0 }, medium: { attempts: 0, correct: 0 }, hard: { attempts: 0, correct: 0 } },
          verbal:   { easy: { attempts: 0, correct: 0 }, medium: { attempts: 0, correct: 0 }, hard: { attempts: 0, correct: 0 } },
          nonverbal:{ easy: { attempts: 0, correct: 0 }, medium: { attempts: 0, correct: 0 }, hard: { attempts: 0, correct: 0 } }
        },
        quizHistory: [],
        totalQuizzes: 0,
        totalCorrect: 0,
        totalQuestions: 0
      };
      localStorage.setItem('wa_sofia', JSON.stringify(defaultData));
    }
    // Check/update streak
    const d = this.load();
    const today = new Date().toDateString();
    if (d.lastActiveDate !== today) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      if (d.lastActiveDate === yesterday.toDateString()) {
        d.streak = (d.streak || 0) + 1;
      } else if (d.lastActiveDate !== today) {
        if (d.lastActiveDate) d.streak = 0;
      }
      d.lastActiveDate = today;
      this.save(d);
    }
  },
  load() { return JSON.parse(localStorage.getItem('wa_sofia') || '{}'); },
  save(data) { localStorage.setItem('wa_sofia', JSON.stringify(data)); },

  recordQuizResult(subject, difficulty, score, total, questions) {
    const d = this.load();
    const prog = d.subjectProgress[subject][difficulty];
    prog.attempts++;
    prog.correct += score;
    d.totalQuizzes++;
    d.totalCorrect += score;
    d.totalQuestions += total;
    const xpGained = score * 10 + (score === total ? 25 : 0);
    d.xp += xpGained;
    d.quizHistory.unshift({
      subject, difficulty, score, total,
      date: new Date().toLocaleString('en-GB'),
      xpGained,
      pct: Math.round((score / total) * 100)
    });
    if (d.quizHistory.length > 50) d.quizHistory = d.quizHistory.slice(0, 50);
    this.checkBadges(d, score, total, subject, difficulty);
    this.save(d);
    return xpGained;
  },

  checkBadges(d, score, total, subject, difficulty) {
    const badges = d.badges;
    const add = (id) => { if (!badges.includes(id)) badges.push(id); };
    if (d.totalQuizzes >= 1) add('first_quiz');
    if (score === total) add('perfect_score');
    if (d.xp >= 100) add('xp_100');
    if (d.xp >= 500) add('xp_500');
    if (d.streak >= 3) add('streak_3');
    if (d.streak >= 7) add('streak_7');
    if (d.totalQuizzes >= 10) add('quiz_10');
    if (d.totalQuizzes >= 25) add('quiz_25');
    if (difficulty === 'hard' && score >= 6) add('hard_hero');
    const subjects = ['maths','english','verbal','nonverbal'];
    if (subjects.every(s => d.subjectProgress[s].easy.attempts > 0 &&
                            d.subjectProgress[s].medium.attempts > 0 &&
                            d.subjectProgress[s].hard.attempts > 0)) {
      add('all_rounder');
    }
  },

  getSubjectAvg(subject) {
    const d = this.load();
    const p = d.subjectProgress[subject];
    let totalC = 0, totalA = 0;
    ['easy','medium','hard'].forEach(diff => {
      totalC += p[diff].correct;
      totalA += p[diff].attempts * 8;
    });
    return totalA > 0 ? Math.round((totalC / totalA) * 100) : 0;
  },

  getOverallAvg() {
    const d = this.load();
    if (d.totalQuestions === 0) return 0;
    return Math.round((d.totalCorrect / d.totalQuestions) * 100);
  }
};

// ═══════════════════════════════════════════
// QUIZ ENGINE
// ═══════════════════════════════════════════
const Quiz = {
  subject: null,
  difficulty: 'easy',
  questions: [],
  currentQ: 0,
  score: 0,
  answered: false,

  start(subject, difficulty) {
    this.subject = subject;
    this.difficulty = difficulty;
    this.questions = this.shuffle(QUESTIONS_DB[subject][difficulty]).slice(0, 8);
    this.currentQ = 0;
    this.score = 0;
    this.answered = false;
    this.render();
  },

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  render() {
    const q = this.questions[this.currentQ];
    const total = this.questions.length;
    const pct = ((this.currentQ) / total) * 100;

    document.getElementById('q-counter').textContent = `Question ${this.currentQ + 1} of ${total}`;
    document.getElementById('q-running-score').textContent = `${this.score * 10} pts`;
    document.getElementById('q-bar').style.width = pct + '%';
    document.getElementById('q-text').textContent = q.q;
    document.getElementById('q-num').textContent = `Question ${this.currentQ + 1}`;

    const subjColors = { maths: '#1565C0', english: '#880E4F', verbal: '#E65100', nonverbal: '#6A1B9A' };
    const subjBgs = { maths: '#E3F2FD', english: '#FCE4EC', verbal: '#FFF8E1', nonverbal: '#F3E5F5' };
    const subjTag = document.getElementById('quiz-subj-tag');
    subjTag.style.background = subjBgs[this.subject];
    subjTag.style.color = subjColors[this.subject];

    const diffColors = { easy: '#E8F5E9', medium: '#FFF3E0', hard: '#FFEBEE' };
    const diffTextColors = { easy: '#2E7D32', medium: '#E65100', hard: '#C62828' };
    const diffTag = document.getElementById('quiz-diff-tag');
    diffTag.style.background = diffColors[this.difficulty];
    diffTag.style.color = diffTextColors[this.difficulty];
    diffTag.textContent = this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);

    const letters = ['A','B','C','D'];
    const opts = document.getElementById('q-options');
    opts.innerHTML = '';
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.innerHTML = `<span class="opt-letter">${letters[i]}</span>${opt}`;
      btn.onclick = () => this.selectAnswer(i, q.ans, q.exp, btn);
      opts.appendChild(btn);
    });

    document.getElementById('q-feedback').className = 'feedback-box';
    document.getElementById('q-feedback').innerHTML = '';
    document.getElementById('btn-next').className = 'btn-next';
    this.answered = false;
  },

  selectAnswer(i, correct, explanation, btn) {
    if (this.answered) return;
    this.answered = true;
    const btns = document.querySelectorAll('.opt-btn');
    btns.forEach(b => b.disabled = true);
    const fb = document.getElementById('q-feedback');

    if (i === correct) {
      btn.classList.add('correct');
      this.score++;
      fb.innerHTML = `✅ <strong>Correct!</strong> ${explanation}`;
      fb.className = 'feedback-box correct show';
    } else {
      btn.classList.add('wrong');
      btns[correct].classList.add('correct');
      fb.innerHTML = `❌ <strong>Not quite.</strong> ${explanation}`;
      fb.className = 'feedback-box wrong show';
    }
    document.getElementById('btn-next').className = 'btn-next show';
    document.getElementById('btn-skip').style.display = 'none';
  },

  next() {
    this.currentQ++;
    if (this.currentQ >= this.questions.length) {
      this.finish();
    } else {
      this.render();
      document.getElementById('btn-skip').style.display = '';
    }
  },

  finish() {
    const xpGained = DB.recordQuizResult(
      this.subject, this.difficulty,
      this.score, this.questions.length, this.questions
    );
    const pct = this.score / this.questions.length;
    let emoji, title, msg;
    if (pct === 1)       { emoji = '🏆'; title = 'Perfect Score!'; msg = 'Outstanding! Every single answer correct. Henrietta Barnett, here comes Sofia! 🌟'; }
    else if (pct >= 0.9) { emoji = '🌟'; title = 'Brilliant!'; msg = 'Almost perfect — you\'re really excelling! Just one or two to review.'; }
    else if (pct >= 0.75){ emoji = '🎉'; title = 'Great Work!'; msg = 'Solid performance! Read through the explanations for the ones you missed.'; }
    else if (pct >= 0.5) { emoji = '🌿'; title = 'Good Effort!'; msg = 'You\'re making progress! Review your answers and try again to boost your score.'; }
    else                  { emoji = '🌱'; title = 'Keep Growing!'; msg = 'Every expert was once a beginner. Review the tips section and try again!'; }

    document.getElementById('quiz-q-area').style.display = 'none';
    const rs = document.getElementById('quiz-result');
    rs.className = 'result-screen show';
    document.getElementById('res-emoji').textContent = emoji;
    document.getElementById('res-title').textContent = title;
    document.getElementById('res-score').textContent = `${this.score}/${this.questions.length}`;
    document.getElementById('res-pct').textContent = `${Math.round(pct * 100)}%`;
    document.getElementById('res-msg').textContent = msg;
    document.getElementById('res-xp').textContent = `+${xpGained} XP earned!`;

    // Update XP in header
    const d = DB.load();
    document.getElementById('header-xp').textContent = d.xp;
    updateHomeStats();
  }
};

// ═══════════════════════════════════════════
// PAGE NAVIGATION
// ═══════════════════════════════════════════
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (page) page.classList.add('active');
  const navEl = document.querySelector(`[data-page="${name}"]`);
  if (navEl) navEl.classList.add('active');
  window.scrollTo(0, 0);

  if (name === 'student') updateHomeStats();
  if (name === 'parent') renderParentDashboard();
}

function startSubjectQuiz(subject) {
  // Default to easy, show quiz page with that subject selected
  showPage('quiz');
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.diff-btn.easy').classList.add('active');
  Quiz.difficulty = 'easy';
  beginQuiz(subject);
}

function beginQuiz(subject) {
  Quiz.subject = subject || Quiz.subject;
  if (!Quiz.subject) { showToast('Please select a subject first!', 'error'); return; }
  document.getElementById('quiz-intro').style.display = 'none';
  document.getElementById('quiz-q-area').style.display = 'block';
  document.getElementById('quiz-result').className = 'result-screen';
  document.getElementById('btn-skip').style.display = '';
  Quiz.start(Quiz.subject, Quiz.difficulty);
}

function setDifficulty(diff) {
  Quiz.difficulty = diff;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.diff-btn.${diff}`).classList.add('active');
}

function updateHomeStats() {
  const d = DB.load();
  document.getElementById('header-xp').textContent = d.xp;
  const subjects = ['maths','english','verbal','nonverbal'];
  subjects.forEach(s => {
    const avg = DB.getSubjectAvg(s);
    const el = document.getElementById(`prog-${s}`);
    const txt = document.getElementById(`prog-${s}-txt`);
    if (el) el.style.width = avg + '%';
    if (txt) txt.textContent = avg > 0 ? avg + '%' : 'Not started';
  });
  const overall = DB.getOverallAvg();
  const oel = document.getElementById('overall-score');
  if (oel) oel.textContent = overall + '%';
  const xpel = document.getElementById('sofia-xp');
  if (xpel) xpel.textContent = d.xp;
  const sel = document.getElementById('sofia-streak');
  if (sel) sel.textContent = (d.streak || 0) + ' days';
  const qel = document.getElementById('sofia-quizzes');
  if (qel) qel.textContent = d.totalQuizzes || 0;
  renderBadges();
}

function renderParentDashboard() {
  const d = DB.load();
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('pd-xp', d.xp || 0);
  setEl('pd-streak', (d.streak || 0) + ' days');
  setEl('pd-quizzes', d.totalQuizzes || 0);
  const overall = DB.getOverallAvg();
  setEl('pd-avg', overall + '%');

  const subjects = ['maths','english','verbal','nonverbal'];
  const subjectNames = { maths:'Maths', english:'English', verbal:'Verbal Reasoning', nonverbal:'Non-Verbal Reasoning' };
  const subjectColors = { maths:'#2196F3', english:'#E91E63', verbal:'#FF9800', nonverbal:'#9C27B0' };
  const breakdown = document.getElementById('pd-breakdown');
  if (breakdown) {
    breakdown.innerHTML = '';
    subjects.forEach(s => {
      const avg = DB.getSubjectAvg(s);
      const p = d.subjectProgress?.[s] || {};
      let totalAttempts = 0;
      ['easy','medium','hard'].forEach(diff => { totalAttempts += (p[diff]?.attempts || 0); });
      const card = document.createElement('div');
      card.className = 'breakdown-card';
      card.innerHTML = `
        <div class="bc-subj">${subjectNames[s]}</div>
        <div class="bc-score" style="color:${subjectColors[s]}">${avg}%</div>
        <div class="bc-bar"><div class="bc-fill" style="width:${avg}%;background:${subjectColors[s]}"></div></div>
        <div class="bc-attempts">${totalAttempts} quiz session${totalAttempts !== 1 ? 's' : ''} completed</div>
        <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">
          ${['easy','medium','hard'].map(diff => {
            const pa = p[diff] || { attempts: 0, correct: 0 };
            const sc = pa.attempts > 0 ? Math.round((pa.correct / (pa.attempts * 8)) * 100) : 0;
            const diffColors = { easy: '#4CAF50', medium: '#FF9800', hard: '#F44336' };
            return `<span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:10px;background:${diffColors[diff]}20;color:${diffColors[diff]}">${diff.charAt(0).toUpperCase()+diff.slice(1)}: ${pa.attempts > 0 ? sc+'%' : 'N/A'}</span>`;
          }).join('')}
        </div>`;
      breakdown.appendChild(card);
    });
  }

  const log = document.getElementById('pd-activity');
  if (log) {
    if (!d.quizHistory || d.quizHistory.length === 0) {
      log.innerHTML = '<div style="padding:20px;text-align:center;color:#aaa;font-size:14px">No activity yet — encourage Sofia to start her first quiz! 🌱</div>';
    } else {
      log.innerHTML = d.quizHistory.slice(0, 12).map(h => {
        const emoji = { maths:'🔢', english:'📝', verbal:'💬', nonverbal:'🔷' };
        const passed = h.pct >= 60;
        return `<div class="activity-row">
          <span class="ar-icon">${emoji[h.subject]}</span>
          <span class="ar-text"><strong>${h.subject.charAt(0).toUpperCase()+h.subject.slice(1)}</strong> — ${h.difficulty} — ${h.score}/${h.total} questions (${h.pct}%)</span>
          <span class="ar-badge ${passed ? 'badge-pass' : 'badge-fail'}">${passed ? '✓ Pass' : '✗ Review'}</span>
          <span class="ar-time">${h.date}</span>
        </div>`;
      }).join('');
    }
  }
}

function renderBadges() {
  const d = DB.load();
  const earnedBadges = d.badges || [];
  const ALL_BADGES = [
    { id:'first_quiz', icon:'🌱', name:'First Steps', desc:'Complete your first quiz' },
    { id:'perfect_score', icon:'⭐', name:'Star Pupil', desc:'Score 100% on a quiz' },
    { id:'xp_100', icon:'🌿', name:'100 XP Club', desc:'Earn 100 XP total' },
    { id:'xp_500', icon:'🌲', name:'Forest Expert', desc:'Earn 500 XP total' },
    { id:'streak_3', icon:'🔥', name:'On Fire', desc:'3-day streak' },
    { id:'streak_7', icon:'💫', name:'Week Warrior', desc:'7-day streak' },
    { id:'quiz_10', icon:'🦉', name:'Wise Owl', desc:'Complete 10 quizzes' },
    { id:'quiz_25', icon:'🏆', name:'Champion', desc:'Complete 25 quizzes' },
    { id:'hard_hero', icon:'💪', name:'Hard Hero', desc:'Score 6+ on Hard level' },
    { id:'all_rounder', icon:'🦋', name:'All-Rounder', desc:'Try all subjects & levels' },
    { id:'hb_bound', icon:'🎓', name:'HB Bound', desc:'Henrietta Barnett Goal — keep going!' },
    { id:'consistent', icon:'📚', name:'Bookworm', desc:'Answer 100 questions total' }
  ];
  if (d.totalQuestions >= 100) { if (!earnedBadges.includes('consistent')) earnedBadges.push('consistent'); }
  const grid = document.getElementById('badges-grid-main');
  if (!grid) return;
  grid.innerHTML = '';
  ALL_BADGES.forEach(b => {
    const earned = earnedBadges.includes(b.id);
    const el = document.createElement('div');
    el.className = 'badge-item' + (earned ? ' earned' : '');
    el.innerHTML = `
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.desc}</div>
      <span class="badge-tag ${earned ? 'earned-tag' : 'locked-tag'}">${earned ? 'EARNED' : 'LOCKED'}</span>`;
    grid.appendChild(el);
  });
}

// ─── MODAL ───
function openModal(tab) {
  document.getElementById('login-modal').classList.add('open');
  if (tab) switchModalTab(tab);
}
function closeModal() { document.getElementById('login-modal').classList.remove('open'); }
function switchModalTab(tab) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.login-form').forEach(f => f.style.display = 'none');
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  document.getElementById(`form-${tab}`).style.display = 'block';
}

// ─── TOAST ───
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  setTimeout(() => t.className = 'toast', 3000);
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  DB.init();
  updateHomeStats();
  showPage('home');
});
