const CONFIG = {
  basePlayerHp: 100,
  baseDamage: 10,
  baseCritChance: 0.05,
  baseCritDamage: 1.5,
  baseTimeLimit: 15,
  comboDamageBonus: 0.02,
  maxCombo: 999,
  enemyHpScale: 1.15,
  enemyDamageScale: 1.1,
  bossHpMult: 3,
  bossEvery: 10,
  draftCount: 3,
  leaderboardSize: 10,
  enemyCount: 12,
  bossCount: 5,
};

const UPGRADES = [
  { id: 'dmg_up', name: 'Damage Boost', desc: '+3 Damage', type: 'damage', value: 3, max: 10, rarity: 'common' },
  { id: 'crit_chance', name: 'Sharp Eye', desc: '+5% Crit Chance', type: 'critChance', value: 0.05, max: 10, rarity: 'common' },
  { id: 'crit_dmg', name: 'Overcharge', desc: '+25% Crit Damage', type: 'critDamage', value: 0.25, max: 5, rarity: 'common' },
  { id: 'lifesteal', name: 'Life Drain', desc: '+3% Lifesteal', type: 'lifesteal', value: 0.03, max: 8, rarity: 'uncommon' },
  { id: 'max_hp', name: 'Vitality', desc: '+20 Max HP', type: 'maxHp', value: 20, max: 5, rarity: 'common' },
  { id: 'timer_bonus', name: 'Time Warp', desc: '+2s Timer', type: 'timeBonus', value: 2, max: 5, rarity: 'common' },
  { id: 'combo_mult', name: 'Combo Strike', desc: 'Combo bonus +50%', type: 'comboMult', value: 0.5, max: 5, rarity: 'uncommon' },
  { id: 'shield', name: 'Aegis', desc: 'Block next hit', type: 'shield', value: 1, max: 3, rarity: 'rare' },
  { id: 'double_strike', name: 'Double Strike', desc: '+10% Double hit', type: 'doubleStrike', value: 0.10, max: 5, rarity: 'rare' },
];

const SYNERGIES = [
  { ids: ['crit_chance', 'combo_mult'], name: 'Chain Reaction', desc: 'Crit hits add +2 combo' },
  { ids: ['lifesteal', 'dmg_up'], name: 'Bloodthirst', desc: 'Lifesteal scales with combo count' },
  { ids: ['timer_bonus', 'crit_chance'], name: 'Precision Time', desc: '>50% timer = guaranteed crit' },
  { ids: ['dmg_up', 'combo_mult'], name: 'Finisher', desc: 'Every 10 combo: next hit 2x (resets)' },
  { ids: ['lifesteal', 'timer_bonus'], name: 'Overcharge', desc: 'Overheal grants shield' },
];

const ENEMY_TYPES = [
  { name: 'Nano Spider', image: './assets/enemies/enemy1.png', color: '#00ff88' },
  { name: 'Kilo Demon', image: './assets/enemies/enemy2.png', color: '#ff00ff' },
  { name: 'Centi Worm', image: './assets/enemies/enemy3.png', color: '#aa66ff' },
  { name: 'Data Moth', image: './assets/enemies/enemy4.png', color: '#00e5ff' },
  { name: 'Kelvin Slime', image: './assets/enemies/enemy5.png', color: '#ff4444' },
  { name: 'Mole Scorpion', image: './assets/enemies/enemy6.png', color: '#00ffaa' },
  { name: 'Candela Dragon', image: './assets/enemies/enemy7.png', color: '#44aaff' },
  { name: 'Newton Rat', image: './assets/enemies/enemy8.png', color: '#ffaa00' },
  { name: 'Volt Eye', image: './assets/enemies/enemy9.png', color: '#ff6600' },
  { name: 'Watt Drone', image: './assets/enemies/enemy10.png', color: '#0088ff' },
  { name: 'Hertz Fly', image: './assets/enemies/enemy11.png', color: '#66ff00' },
  { name: 'Tesla Crystal', image: './assets/enemies/enemy12.png', color: '#aa44ff' },
];

const BOSS_TYPES = [
  {
    name: 'The Second Sovereign',
    image: './assets/bosses/boss1.png',
    color: '#00d4ff',
    frames: 15,
    phases: [
      { threshold: 1.0, name: 'Phase 1: Temporal Anchor', timerMult: 0.9 },
      { threshold: 0.7, name: 'Phase 2: Time Dilation', timerMult: 0.75 },
      { threshold: 0.4, name: 'Phase 3: Singularity', twoStep: true, timerMult: 0.6 },
    ]
  },
  {
    name: 'The Joule Tyrant',
    image: './assets/bosses/boss2.png',
    color: '#ff00ff',
    frames: 15,
    phases: [
      { threshold: 1.0, name: 'Phase 1: Static Field', timerMult: 0.9 },
      { threshold: 0.7, name: 'Phase 2: Overload', freezeCombo: true },
      { threshold: 0.4, name: 'Phase 3: Total Discharge', twoStep: true, timerMult: 0.6 },
    ]
  },
  {
    name: 'The Kelvin Sun',
    image: './assets/bosses/boss3.png',
    color: '#ff6600',
    frames: 15,
    phases: [
      { threshold: 1.0, name: 'Phase 1: Heat Wave', healOnWrong: 0.05 },
      { threshold: 0.7, name: 'Phase 2: Thermal Runaway', timerMult: 0.75 },
      { threshold: 0.4, name: 'Phase 3: Absolute Zero', twoStep: true },
    ]
  },
  {
    name: 'The Meter Weaver',
    image: './assets/bosses/boss4.png',
    color: '#00ffaa',
    frames: 15,
    phases: [
      { threshold: 1.0, name: 'Phase 1: Spatial Fold', timerMult: 0.9 },
      { threshold: 0.7, name: 'Phase 2: Dimensional Rift', altTypes: true },
      { threshold: 0.4, name: 'Phase 3: Infinite Grid', twoStep: true, timerMult: 0.6 },
    ]
  },
  {
    name: 'The Kilogram Colossus',
    image: './assets/bosses/boss5.png',
    color: '#ff4444',
    frames: 15,
    phases: [
      { threshold: 1.0, name: 'Phase 1: Gravitational Pull', timerMult: 0.85 },
      { threshold: 0.7, name: 'Phase 2: Mass Density', timerMult: 0.7 },
      { threshold: 0.4, name: 'Phase 3: Black Hole', twoStep: true, timerMult: 0.5 },
    ]
  },
];

// SI Unit Conversions - Basic and Derived
const CONVERSIONS = [
  // Length (m)
  { from: 'km', to: 'm', factor: 1000, type: 'length' },
  { from: 'm', to: 'cm', factor: 100, type: 'length' },
  { from: 'cm', to: 'mm', factor: 10, type: 'length' },
  { from: 'm', to: 'mm', factor: 1000, type: 'length' },
  { from: 'km', to: 'cm', factor: 100000, type: 'length' },
  { from: 'm', to: 'μm', factor: 1000000, type: 'length' },

  // Mass (kg)
  { from: 'kg', to: 'g', factor: 1000, type: 'mass' },
  { from: 'g', to: 'mg', factor: 1000, type: 'mass' },
  { from: 'kg', to: 'mg', factor: 1000000, type: 'mass' },
  { from: 'ton', to: 'kg', factor: 1000, type: 'mass' },

  // Time (s)
  { from: 'hr', to: 'min', factor: 60, type: 'time' },
  { from: 'min', to: 's', factor: 60, type: 'time' },
  { from: 'hr', to: 's', factor: 3600, type: 'time' },
  { from: 'day', to: 'hr', factor: 24, type: 'time' },
  { from: 'day', to: 's', factor: 86400, type: 'time' },

  // Temperature (K)
  { from: 'C', to: 'K', formula: 'c2k', type: 'temp' },
  { from: 'K', to: 'C', formula: 'k2c', type: 'temp' },
  { from: 'C', to: 'F', formula: 'c2f', type: 'temp' },
  { from: 'F', to: 'C', formula: 'f2c', type: 'temp' },

  // Amount (mol)
  { from: 'mol', to: 'mmol', factor: 1000, type: 'amount' },
  { from: 'kmol', to: 'mol', factor: 1000, type: 'amount' },

  // Current (A)
  { from: 'A', to: 'mA', factor: 1000, type: 'current' },
  { from: 'kA', to: 'A', factor: 1000, type: 'current' },

  // Force (N = kg·m/s²)
  { from: 'kN', to: 'N', factor: 1000, type: 'force' },
  { from: 'N', to: 'mN', factor: 1000, type: 'force' },

  // Energy (J = N·m)
  { from: 'kJ', to: 'J', factor: 1000, type: 'energy' },
  { from: 'J', to: 'mJ', factor: 1000, type: 'energy' },
  { from: 'MJ', to: 'J', factor: 1000000, type: 'energy' },

  // Power (W = J/s)
  { from: 'kW', to: 'W', factor: 1000, type: 'power' },
  { from: 'W', to: 'mW', factor: 1000, type: 'power' },
  { from: 'MW', to: 'W', factor: 1000000, type: 'power' },

  // Pressure (Pa = N/m²)
  { from: 'kPa', to: 'Pa', factor: 1000, type: 'pressure' },
  { from: 'MPa', to: 'Pa', factor: 1000000, type: 'pressure' },
  { from: 'GPa', to: 'Pa', factor: 1000000000, type: 'pressure' },

  // Voltage (V)
  { from: 'kV', to: 'V', factor: 1000, type: 'voltage' },
  { from: 'V', to: 'mV', factor: 1000, type: 'voltage' },

  // Resistance (Ω)
  { from: 'kΩ', to: 'Ω', factor: 1000, type: 'resistance' },
  { from: 'MΩ', to: 'Ω', factor: 1000000, type: 'resistance' },

  // Frequency (Hz)
  { from: 'kHz', to: 'Hz', factor: 1000, type: 'frequency' },
  { from: 'MHz', to: 'Hz', factor: 1000000, type: 'frequency' },
  { from: 'GHz', to: 'Hz', factor: 1000000000, type: 'frequency' },
];

// ==================== AUDIO ====================
class AudioSystem {
  constructor() { this.ctx = null; this.enabled = true; }
  init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }
  playTone(freq, type, duration, vol) {
    if (!this.ctx || !this.enabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type || 'square';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol || 0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (duration || 0.1));
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + (duration || 0.1));
  }
  playHit() { this.playTone(440, 'square', 0.1, 0.1); this.playTone(660, 'square', 0.1, 0.08); }
  playCrit() { this.playTone(880, 'sawtooth', 0.2, 0.12); this.playTone(1100, 'sawtooth', 0.15, 0.1); }
  playDamage() { this.playTone(150, 'sawtooth', 0.3, 0.15); }
  playVictory() {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.playTone(f, 'square', 0.2, 0.1), i * 100));
  }
  playGameOver() {
    [400, 350, 300, 200].forEach((f, i) => setTimeout(() => this.playTone(f, 'sawtooth', 0.3, 0.12), i * 150));
  }
  playUpgrade() { this.playTone(600, 'sine', 0.1, 0.1); this.playTone(800, 'sine', 0.15, 0.1); }
  playError() { this.playTone(200, 'sawtooth', 0.2, 0.1); }
}

// ==================== RENDERER ====================
class SpriteRenderer {
  constructor(config) {
    this.config = config || {};
    this.image = null;
    this.loaded = false;
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.state = 'idle';
    this.states = config.states || { idle: { start: 0, end: 0, loop: true } };
    this.onComplete = null;
    this.glitchTimer = 0;
    this.glitchIntensity = 0;
    this.noiseOffset = Math.random() * 1000;
    if (config.imagePath) this.load(config.imagePath);
  }
  load(path) {
    this.image = new Image();
    var self = this;
    this.image.onload = function() { 
      self.loaded = true; 
    };
    this.image.onerror = function() { 
      self.loaded = false; 
    };
    this.image.src = path;
  }
  setState(name, opts) {
    opts = opts || {};
    if (!this.states[name]) return;
    this.state = name;
    this.currentFrame = this.states[name].start;
    this.frameTimer = 0;
    if (opts.onComplete) this.onComplete = opts.onComplete;
  }
  triggerGlitch(intensity, duration) {
    this.glitchIntensity = intensity || 1;
    this.glitchTimer = duration || 0.3;
  }
  update(dt) {
    const st = this.states[this.state];
    if (!st) return;
    this.frameTimer += dt;
    const frameDuration = 1 / (this.config.fps || 8);
    if (this.frameTimer >= frameDuration) {
      this.frameTimer -= frameDuration;
      this.currentFrame++;
      if (this.currentFrame > st.end) {
        if (st.loop) { this.currentFrame = st.start; }
        else {
          this.currentFrame = st.end;
          if (this.onComplete) { this.onComplete(); this.onComplete = null; }
        }
      }
    }
    if (this.glitchTimer > 0) {
      this.glitchTimer -= dt;
      this.glitchIntensity = Math.max(0, this.glitchIntensity - dt * 3);
    }
    this.noiseOffset += dt * 2;
  }
  draw(ctx, x, y, w, h) {
    if (this.glitchIntensity > 0.1) {
      ctx.save();
      const shift = (Math.random() - 0.5) * this.glitchIntensity * 10;
      ctx.filter = 'drop-shadow(' + shift + 'px 0 #ff0040) drop-shadow(' + (-shift) + 'px 0 #00e5ff)';
    }
    // Check if image is actually ready
    var imgReady = this.image && this.image.complete && this.image.naturalWidth > 0;
    if (imgReady) {
      // For single-frame images, just draw the whole image
      var isSingleFrame = !this.config.frameWidth || this.config.framesPerRow === 1;
      if (isSingleFrame) {
        ctx.drawImage(this.image, x, y, w, h);
      } else {
        var fw = this.config.frameWidth;
        var fh = this.config.frameHeight;
        var fpr = this.config.framesPerRow || 1;
        var fx = (this.currentFrame % fpr) * fw;
        var fy = Math.floor(this.currentFrame / fpr) * fh;
        ctx.drawImage(this.image, fx, fy, fw, fh, x, y, w, h);
      }
    } else {
      this.drawProcedural(ctx, x, y, w, h);
    }
    if (this.glitchIntensity > 0.1) ctx.restore();
  }
  drawProcedural(ctx, x, y, w, h) {
    const color = this.config.fallbackColor || '#444';
    const isBoss = (this.config.fallbackLabel || '') === 'BOSS';
    const cx = x + w/2, cy = y + h/2;
    const r = Math.min(w, h) * 0.35;

    // Glow background
    ctx.shadowColor = color;
    ctx.shadowBlur = 30;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.15;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.3, 0, Math.PI*2);
    ctx.fill();

    // Main shape
    ctx.globalAlpha = 0.9;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.fill();

    // Inner ring
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Scanline effect
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.6, 0, Math.PI*2);
    ctx.fill();

    // Label
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Orbitron';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const label = this.config.fallbackLabel || '?';
    ctx.fillText(label, cx, cy);

    // Subtitle
    ctx.font = '10px "Share Tech Mono"';
    ctx.fillStyle = color;
    ctx.fillText(isBoss ? 'BOSS UNIT' : 'ENEMY UNIT', cx, cy + r + 20);

    ctx.globalAlpha = 1;
  }
}

class ScreenEffects {
  constructor() {
    this.flashEl = document.getElementById('screen-flash');
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
  }
  flash(color, duration) {
    if (!this.flashEl) return;
    this.flashEl.style.background = color;
    this.flashEl.classList.add('active');
    setTimeout(() => this.flashEl.classList.remove('active'), duration || 200);
  }
  shake(intensity, duration) {
    this.shakeIntensity = intensity || 10;
    this.shakeDuration = duration || 300;
  }
  update(dt, container) {
    if (this.shakeDuration > 0) {
      this.shakeDuration -= dt * 1000;
      const dx = (Math.random() - 0.5) * this.shakeIntensity * 2;
      const dy = (Math.random() - 0.5) * this.shakeIntensity * 2;
      container.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
      if (this.shakeDuration <= 0) container.style.transform = 'none';
    }
  }
}

// ==================== UI ====================
class UIManager {
  constructor() {
    this.screens = {
      title: document.getElementById('title-screen'),
      battle: document.getElementById('battle-screen'),
      upgrade: document.getElementById('upgrade-screen'),
      gameover: document.getElementById('gameover-screen'),
      leaderboard: document.getElementById('leaderboard-screen'),
    };
    this.floatContainer = document.getElementById('floating-text-container');
    this.elements = {
      levelNum: document.getElementById('level-num'),
      scoreNum: document.getElementById('score-num'),
      comboNum: document.getElementById('combo-num'),
      playerHpFill: document.getElementById('player-hp-fill'),
      playerHpText: document.getElementById('player-hp-text'),
      enemyHpFill: document.getElementById('enemy-hp-fill'),
      enemyName: document.getElementById('enemy-name'),
      bossIndicator: document.getElementById('boss-indicator'),
      questionText: document.getElementById('question-text'),
      timerFill: document.getElementById('timer-fill'),
      answerInput: document.getElementById('answer-input'),
      btnSubmit: document.getElementById('btn-submit'),
      upgradeCards: document.getElementById('upgrade-cards'),
      upgradeList: document.getElementById('upgrade-list'),
      synergyIcons: document.getElementById('synergy-icons'),
      finalLevel: document.getElementById('final-level'),
      finalScore: document.getElementById('final-score'),
      finalCombo: document.getElementById('final-combo'),
      finalAccuracy: document.getElementById('final-accuracy'),
      playerName: document.getElementById('player-name'),
      leaderboardList: document.getElementById('leaderboard-list'),
    };
  }
  showScreen(name) {
    if (!this.screens[name]) return;
    Object.values(this.screens).forEach(s => s.classList.remove('active'));
    this.screens[name].classList.add('active');
  }
  setPlayerHp(hp, max) {
    if (!this.elements.playerHpFill) return;
    const pct = Math.max(0, (hp / max) * 100);
    this.elements.playerHpFill.style.width = pct + '%';
    this.elements.playerHpFill.style.background = pct > 50 ? 'var(--amber)' : pct > 25 ? 'var(--amber-dim)' : 'var(--red)';
    this.elements.playerHpText.textContent = Math.ceil(hp) + '/' + max;
  }
  setEnemyHp(hp, max) {
    if (!this.elements.enemyHpFill) return;
    const pct = Math.max(0, (hp / max) * 100);
    this.elements.enemyHpFill.style.width = pct + '%';
  }
  setEnemyName(name, isBoss) {
    if (!this.elements.enemyName) return;
    this.elements.enemyName.textContent = name;
    this.elements.enemyName.style.color = isBoss ? 'var(--red)' : 'var(--amber)';
    if (this.elements.bossIndicator) this.elements.bossIndicator.style.display = isBoss ? 'block' : 'none';
  }
  setQuestion(text) { if (this.elements.questionText) this.elements.questionText.textContent = text; }
  setTimer(pct) {
    if (!this.elements.timerFill) return;
    this.elements.timerFill.style.width = (pct * 100) + '%';
    this.elements.timerFill.style.background = pct > 0.5 ? 'var(--amber)' : pct > 0.25 ? 'var(--amber-dim)' : 'var(--red)';
  }
  setLevel(n) { if (this.elements.levelNum) this.elements.levelNum.textContent = n; }
  setScore(n) { if (this.elements.scoreNum) this.elements.scoreNum.textContent = n; }
  setCombo(n) { if (this.elements.comboNum) this.elements.comboNum.textContent = n; }
  clearInput() { if (this.elements.answerInput) this.elements.answerInput.value = ''; }
  getInput() { return this.elements.answerInput ? this.elements.answerInput.value.trim() : ''; }
  focusInput() { setTimeout(() => { if (this.elements.answerInput) this.elements.answerInput.focus(); }, 50); }
  showUpgrades(cards, onSelect) {
    if (!this.elements.upgradeCards) return;
    this.elements.upgradeCards.innerHTML = '';
    cards.forEach(card => {
      const el = document.createElement('div');
      el.className = 'upgrade-card';
      el.innerHTML = '<div class="card-name">' + card.name + '</div><div class="card-desc">' + card.desc + '</div>' + (card.synergy ? '<div class="card-synergy">>> ' + card.synergy + '</div>' : '');
      el.onclick = function() { onSelect(card); };
      this.elements.upgradeCards.appendChild(el);
    });
  }
  setUpgradeList(upgrades, synergies) {
    if (!this.elements.upgradeList) return;
    this.elements.upgradeList.innerHTML = '';
    upgrades.forEach(u => {
      const tag = document.createElement('span');
      tag.className = 'upgrade-tag';
      const syn = synergies.find(s => s.ids.includes(u.id));
      if (syn) tag.classList.add('synergy');
      tag.textContent = u.name.toUpperCase();
      this.elements.upgradeList.appendChild(tag);
    });
  }
  setSynergyIcons(synergies) {
    if (!this.elements.synergyIcons) return;
    this.elements.synergyIcons.innerHTML = '';
    synergies.forEach(s => {
      const icon = document.createElement('span');
      icon.className = 'synergy-icon';
      icon.textContent = s.name.toUpperCase();
      this.elements.synergyIcons.appendChild(icon);
    });
  }
  showFloatingText(text, x, y, color) {
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.color = color;
    this.floatContainer.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
  showFinalStats(level, score, combo, accuracy) {
    if (this.elements.finalLevel) this.elements.finalLevel.textContent = level;
    if (this.elements.finalScore) this.elements.finalScore.textContent = score;
    if (this.elements.finalCombo) this.elements.finalCombo.textContent = combo;
    if (this.elements.finalAccuracy) this.elements.finalAccuracy.textContent = accuracy + '%';
  }
  showLeaderboard(entries) {
    if (!this.elements.leaderboardList) return;
    this.elements.leaderboardList.innerHTML = '';
    if (entries.length === 0) {
      this.elements.leaderboardList.innerHTML = '<div class="lb-entry">NO DATA FOUND</div>';
      return;
    }
    entries.forEach((e, i) => {
      const row = document.createElement('div');
      row.className = 'lb-entry';
      row.innerHTML = '<span class="lb-rank">#' + (i+1) + '</span><span class="lb-name">' + e.name + '</span><span class="lb-score">LV.' + e.level + ' // ' + e.score + '</span>';
      this.elements.leaderboardList.appendChild(row);
    });
  }
}

// ==================== PLAYER ====================
class Player {
  constructor() {
    this.maxHp = CONFIG.basePlayerHp;
    this.hp = this.maxHp;
    this.baseDamage = CONFIG.baseDamage;
    this.critChance = CONFIG.baseCritChance;
    this.critDamage = CONFIG.baseCritDamage;
    this.lifesteal = 0;
    this.timeBonus = 0;
    this.comboMult = 0;
    this.doubleStrike = 0;
    this.shields = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.upgrades = [];
    this.score = 0;
    this.correct = 0;
    this.total = 0;
    this.finisherReady = false;
  }
  reset() {
    this.maxHp = CONFIG.basePlayerHp;
    this.hp = this.maxHp;
    this.baseDamage = CONFIG.baseDamage;
    this.critChance = CONFIG.baseCritChance;
    this.critDamage = CONFIG.baseCritDamage;
    this.lifesteal = 0;
    this.timeBonus = 0;
    this.comboMult = 0;
    this.doubleStrike = 0;
    this.shields = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.upgrades = [];
    this.score = 0;
    this.correct = 0;
    this.total = 0;
    this.finisherReady = false;
  }
  takeDamage(amount) {
    if (this.shields > 0) { this.shields--; return 0; }
    this.hp = Math.max(0, this.hp - amount);
    this.combo = 0;
    return amount;
  }
  heal(amount) {
    const actual = Math.min(amount, this.maxHp - this.hp);
    this.hp += actual;
    return actual;
  }
  addUpgrade(upg) {
    const existing = this.upgrades.find(u => u.id === upg.id);
    if (existing) { existing.stacks = (existing.stacks || 1) + 1; }
    else { this.upgrades.push({ ...upg, stacks: 1 }); }
    this.recalcStats();
  }
  recalcStats() {
    this.baseDamage = CONFIG.baseDamage;
    this.critChance = CONFIG.baseCritChance;
    this.critDamage = CONFIG.baseCritDamage;
    this.lifesteal = 0;
    this.timeBonus = 0;
    this.comboMult = 0;
    this.doubleStrike = 0;
    this.maxHp = CONFIG.basePlayerHp;
    this.shields = 0;
    this.upgrades.forEach(u => {
      const def = u;
      const stacks = u.stacks || 1;
      if (def.type === 'damage') this.baseDamage += def.value * stacks;
      if (def.type === 'critChance') this.critChance = Math.min(1, this.critChance + def.value * stacks);
      if (def.type === 'critDamage') this.critDamage += def.value * stacks;
      if (def.type === 'lifesteal') this.lifesteal += def.value * stacks;
      if (def.type === 'maxHp') this.maxHp += def.value * stacks;
      if (def.type === 'timeBonus') this.timeBonus += def.value * stacks;
      if (def.type === 'comboMult') this.comboMult += def.value * stacks;
      if (def.type === 'doubleStrike') this.doubleStrike = Math.min(1, this.doubleStrike + def.value * stacks);
      if (def.type === 'shield') this.shields += def.value * stacks;
    });
  }
  getDamage() {
    let dmg = this.baseDamage;
    dmg *= (1 + this.combo * (CONFIG.comboDamageBonus + this.comboMult));
    if (this.finisherReady) { dmg *= 2; this.finisherReady = false; this.combo = 0; }
    return dmg;
  }
  getSynergies() {
    const ids = this.upgrades.map(u => u.id);
    return SYNERGIES.filter(s => s.ids.every(id => ids.includes(id)));
  }
  hasSynergy(sid) {
    return this.getSynergies().some(s => s.ids.includes(sid));
  }
  addCombo() {
    this.combo++;
    if (this.combo > this.maxCombo) this.maxCombo = this.combo;
    if (this.hasSynergy('dmg_up') && this.hasSynergy('combo_mult') && this.combo % 10 === 0) {
      this.finisherReady = true;
    }
    return this.combo;
  }
  getAccuracy() {
    return this.total > 0 ? Math.round((this.correct / this.total) * 100) : 0;
  }
}

// ==================== ENEMY ====================
class Enemy {
  constructor(level) {
    this.level = level;
    const idx = Math.floor(Math.random() * ENEMY_TYPES.length);
    this.type = ENEMY_TYPES[idx];
    this.maxHp = Math.floor(30 * Math.pow(CONFIG.enemyHpScale, level - 1));
    this.hp = this.maxHp;
    this.damage = Math.floor(8 * Math.pow(CONFIG.enemyDamageScale, level - 1));
    this.isBoss = false;
    this.spriteConfig = {
      imagePath: this.type.image,
      fallbackColor: this.type.color,
      fallbackLabel: this.type.name.split(' ')[0],
      fps: 1,
      frameWidth: 128,
      frameHeight: 128,
      framesPerRow: 1,
      totalFrames: 1,
      states: { idle: { start: 0, end: 0, loop: true } }
    };
  }
  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
    return this.hp <= 0;
  }
  getAttackDamage() { return this.damage; }
  isDead() { return this.hp <= 0; }
}

// ==================== BOSS ====================
class Boss extends Enemy {
  constructor(level) {
    super(level);
    this.isBoss = true;
    const bossIdx = Math.floor((level / CONFIG.bossEvery - 1) % BOSS_TYPES.length);
    const bossDef = BOSS_TYPES[bossIdx];
    this.type = { name: bossDef.name, color: bossDef.color, image: bossDef.image };
    this.phases = bossDef.phases;
    this.currentPhase = 0;
    this.maxHp = Math.floor(100 * Math.pow(CONFIG.enemyHpScale, level - 1) * CONFIG.bossHpMult);
    this.hp = this.maxHp;
    this.damage = Math.floor(12 * Math.pow(CONFIG.enemyDamageScale, level - 1));
    const frames = bossDef.frames || 15;
    this.spriteConfig = {
      imagePath: this.type.image,
      fallbackColor: this.type.color,
      fallbackLabel: 'BOSS',
      fps: 8,
      frameWidth: 128,
      frameHeight: 128,
      framesPerRow: frames,
      totalFrames: frames,
      states: {
        intro: { start: 0, end: 2, loop: false },
        idle: { start: 3, end: 6, loop: true },
        charge: { start: 7, end: 8, loop: false },
        attack: { start: 9, end: 11, loop: false },
        hurt: { start: 12, end: 12, loop: false },
        death: { start: 13, end: 14, loop: false },
        phase_transition: { start: 0, end: 2, loop: false }
      }
    };
  }
  checkPhaseTransition() {
    const hpPct = this.hp / this.maxHp;
    for (let i = this.phases.length - 1; i > this.currentPhase; i--) {
      if (hpPct <= this.phases[i].threshold) {
        this.currentPhase = i;
        return this.phases[i];
      }
    }
    return null;
  }
  getCurrentModifiers() {
    return this.phases[this.currentPhase] || this.phases[0];
  }
}

// ==================== QUESTION ====================
class QuestionGenerator {
  generate(level, isBoss, phase) {
    const mods = phase || {};
    let convs = [...CONVERSIONS];
    if (mods.altTypes) {
      const types = ['length', 'mass', 'time', 'energy'];
      const pick = types[Math.floor(Math.random() * types.length)];
      convs = convs.filter(c => c.type === pick);
    }
    // Filter by difficulty
    if (level <= 3) convs = convs.filter(c => !c.formula && c.factor <= 1000);
    else if (level <= 6) convs = convs.filter(c => !c.formula || c.type === 'temp');

    const conv = convs[Math.floor(Math.random() * convs.length)];
    let val, ans, text, tolerance;

    if (mods.twoStep) {
      const conv2 = CONVERSIONS.filter(c => c !== conv && c.type === conv.type && !c.formula)[0] || conv;
      val = this.randVal(level);
      const mid = conv.formula ? this.applyFormula(conv, val) : val * conv.factor;
      ans = mid * conv2.factor;
      text = val + ' ' + conv.from + ' = ? ' + conv2.to;
      tolerance = Math.max(0.01, Math.abs(ans) * 0.02);
    } else if (conv.formula === 'c2k') {
      val = Math.floor(Math.random() * 200) - 50;
      ans = val + 273.15;
      text = val + '°C = ?K';
      tolerance = 0.5;
    } else if (conv.formula === 'k2c') {
      val = Math.floor(Math.random() * 200) + 223;
      ans = val - 273.15;
      text = val + 'K = ?°C';
      tolerance = 0.5;
    } else if (conv.formula === 'c2f') {
      val = Math.floor(Math.random() * 200) - 50;
      ans = (val * 9/5) + 32;
      text = val + '°C = ?°F';
      tolerance = 0.5;
    } else if (conv.formula === 'f2c') {
      val = Math.floor(Math.random() * 200) + 32;
      ans = (val - 32) * 5/9;
      text = val + '°F = ?°C';
      tolerance = 0.5;
    } else {
      val = this.randVal(level);
      ans = val * conv.factor;
      text = val + ' ' + conv.from + ' = ? ' + conv.to;
      tolerance = Math.max(0.01, Math.abs(ans) * (mods.toleranceMult || 0.01));
    }

    const timeLimit = Math.max(5, CONFIG.baseTimeLimit * Math.pow(0.97, level - 1) * (mods.timerMult || 1));
    return { text: text, answer: ans, tolerance: tolerance, timeLimit: Math.ceil(timeLimit), raw: val };
  }
  randVal(level) {
    const base = Math.pow(10, Math.floor(Math.random() * Math.min(3, 1 + Math.floor(level / 5))));
    return Math.round((Math.random() * 9 + 1) * base * 10) / 10;
  }
  applyFormula(conv, val) {
    if (conv.formula === 'c2k') return val + 273.15;
    if (conv.formula === 'k2c') return val - 273.15;
    if (conv.formula === 'c2f') return (val * 9/5) + 32;
    if (conv.formula === 'f2c') return (val - 32) * 5/9;
    return val * conv.factor;
  }
  checkAnswer(input, expected, tolerance) {
    const num = parseFloat(input);
    if (isNaN(num)) return false;
    return Math.abs(num - expected) <= tolerance;
  }
}

// ==================== UPGRADE ====================
class UpgradeSystem {
  generateDraft(player, count) {
    count = count || 3;
    const pool = [];
    const playerIds = player.upgrades.map(u => u.id);
    UPGRADES.forEach(u => {
      const existing = player.upgrades.find(pu => pu.id === u.id);
      const stacks = existing ? (existing.stacks || 1) : 0;
      if (stacks < u.max) {
        const weight = u.rarity === 'common' ? 3 : u.rarity === 'uncommon' ? 2 : 1;
        for (let i = 0; i < weight; i++) pool.push(u);
      }
    });
    const draft = [];
    const used = new Set();
    while (draft.length < count && pool.length > 0) {
      const idx = Math.floor(Math.random() * pool.length);
      const pick = pool[idx];
      if (!used.has(pick.id)) {
        used.add(pick.id);
        const syn = SYNERGIES.find(s => s.ids.includes(pick.id) && s.ids.some(id => playerIds.includes(id)));
        draft.push({ ...pick, synergy: syn ? syn.name : null });
      }
      pool.splice(idx, 1);
    }
    return draft;
  }
}

// ==================== LEADERBOARD ====================
const LB_KEY = 'unit_hunter_lb';

class Leaderboard {
  getEntries() {
    try { return JSON.parse(localStorage.getItem(LB_KEY)) || []; } catch(e) { return []; }
  }
  addEntry(name, level, score, accuracy) {
    const entries = this.getEntries();
    entries.push({ name: (name || '').trim() || 'UNKNOWN', level: level, score: score, accuracy: accuracy, date: Date.now() });
    entries.sort((a, b) => b.score - a.score);
    localStorage.setItem(LB_KEY, JSON.stringify(entries.slice(0, CONFIG.leaderboardSize)));
  }
  getTop(n) {
    return this.getEntries().slice(0, n || 10);
  }
  clear() {
    localStorage.removeItem(LB_KEY);
  }
}

// ==================== GAME ====================
class Game {
  constructor() {
    try {
      this.audio = new AudioSystem();
      this.ui = new UIManager();
      this.fx = new ScreenEffects();
      this.player = new Player();
      this.qgen = new QuestionGenerator();
      this.upgSys = new UpgradeSystem();
      this.lb = new Leaderboard();
      this.state = 'TITLE';
      this.level = 1;
      this.enemy = null;
      this.question = null;
      this.timer = 0;
      this.maxTimer = 0;
      this.lastTime = 0;
      this.answered = false;
      this.canvas = document.getElementById('game-canvas');
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.container = document.getElementById('game-container');
      if (!this.canvas) throw new Error('Canvas not found');
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.bindInputs();
      this.scanlineOffset = 0;
      console.log('Game initialized successfully');
    } catch (e) {
      console.error('Game init failed:', e);
    }
  }
  resize() {
    if (!this.canvas || !this.container) return;
    this.canvas.width = this.container.clientWidth || window.innerWidth;
    this.canvas.height = this.container.clientHeight || window.innerHeight;
  }
  bindInputs() {
    var self = this;
    const btnStart = document.getElementById('btn-start');
    const btnLeaderboard = document.getElementById('btn-leaderboard');
    const btnSubmit = document.getElementById('btn-submit');
    const btnRetry = document.getElementById('btn-retry');
    const btnSave = document.getElementById('btn-save');
    const btnBack = document.getElementById('btn-back');

    if (btnStart) btnStart.addEventListener('click', function() { self.startRun(); });
    if (btnLeaderboard) btnLeaderboard.addEventListener('click', function() { self.showLeaderboard(); });
    if (btnSubmit) btnSubmit.addEventListener('click', function() { self.submitAnswer(); });
    if (btnRetry) btnRetry.addEventListener('click', function() { self.startRun(); });
    if (btnSave) btnSave.addEventListener('click', function() { self.saveScore(); });
    if (btnBack) btnBack.addEventListener('click', function() { self.ui.showScreen('title'); });

    if (this.ui.elements.answerInput) {
      var self = this;
      this.ui.elements.answerInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') self.submitAnswer();
      });
    }
  }
  startRun() {
    this.audio.init();
    this.player.reset();
    this.level = 1;
    this.state = 'BATTLE';
    if (this.canvas) this.canvas.style.display = 'block';
    this.ui.showScreen('battle');
    this.startLevel();
  }
  startLevel() {
    var self = this;
    this.answered = false;
    const isBoss = this.level % CONFIG.bossEvery === 0;
    this.enemy = isBoss ? new Boss(this.level) : new Enemy(this.level);
    this.question = this.qgen.generate(this.level, isBoss, isBoss ? this.enemy.getCurrentModifiers() : null);
    this.timer = this.question.timeLimit + this.player.timeBonus;
    this.maxTimer = this.timer;
    this.ui.setLevel(this.level);
    this.ui.setScore(this.player.score);
    this.ui.setCombo(this.player.combo);
    this.ui.setPlayerHp(this.player.hp, this.player.maxHp);
    this.ui.setEnemyHp(this.enemy.hp, this.enemy.maxHp);
    this.ui.setEnemyName(this.enemy.type.name, isBoss);
    this.ui.setQuestion(this.question.text);
    this.ui.setTimer(1);
    this.ui.clearInput();
    this.ui.focusInput();
    this.ui.setUpgradeList(this.player.upgrades, this.player.getSynergies());
    this.ui.setSynergyIcons(this.player.getSynergies());
    this.enemy.renderer = new SpriteRenderer(this.enemy.spriteConfig);
    // Force image load check
    if (this.enemy.renderer.image) {
      this.enemy.renderer.image.onload = function() {
        console.log('Enemy image loaded: ' + this.src);
      };
    }
    if (isBoss) {
      this.enemy.renderer.setState('intro', { onComplete: () => {
        this.enemy.renderer.setState('idle');
      }});
    }
    this.lastTime = performance.now();
    var self = this;
    requestAnimationFrame(function(t) { return self.loop(t); });
  }
  loop(timestamp) {
    var self = this;
    if (this.state !== 'BATTLE') return;
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
    this.lastTime = timestamp;
    this.update(dt);
    this.draw();
    var self = this;
    requestAnimationFrame(function(t) { self.loop(t); });
  }
  update(dt) {
    if (this.answered) return;
    this.timer -= dt;
    this.ui.setTimer(Math.max(0, this.timer / this.maxTimer));
    if (this.enemy && this.enemy.renderer) this.enemy.renderer.update(dt);
    this.fx.update(dt, this.container);
    this.scanlineOffset += dt * 60;
    if (this.timer <= 0) this.handleWrong();
  }
  draw() {
    if (!this.canvas || !this.ctx) return;
    const w = this.canvas.width, h = this.canvas.height;
    this.ctx.clearRect(0, 0, w, h);
    this.ctx.fillStyle = '#0c0804';
    this.ctx.fillRect(0, 0, w, h);
    this.ctx.strokeStyle = 'rgba(255,157,0,0.03)';
    this.ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 50) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, h); this.ctx.stroke();
    }
    for (let y = 0; y < h; y += 50) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(w, y); this.ctx.stroke();
    }
    const grad = this.ctx.createRadialGradient(w/2, h*0.3, 0, w/2, h*0.3, w*0.6);
    grad.addColorStop(0, 'rgba(255,157,0,0.04)');
    grad.addColorStop(1, 'transparent');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, w, h);
    if (this.enemy && this.enemy.renderer) {
      const ew = 180, eh = 180;
      const ex = (w - ew) / 2, ey = h * 0.18;
      this.enemy.renderer.draw(this.ctx, ex, ey, ew, eh);
    }
    this.ctx.fillStyle = 'rgba(255,157,0,0.02)';
    const scanY = (this.scanlineOffset % h);
    this.ctx.fillRect(0, scanY, w, 2);
  }
  submitAnswer() {
    if (this.answered) return;
    const input = this.ui.getInput();
    if (input === '') return;
    this.answered = true;
    const correct = this.qgen.checkAnswer(input, this.question.answer, this.question.tolerance);
    if (correct) this.handleCorrect();
    else this.handleWrong();
  }
  handleCorrect() {
    this.player.correct++;
    this.player.total++;
    this.player.addCombo();
    let isCrit = false;
    const timerPct = this.timer / this.maxTimer;
    if (this.player.hasSynergy('timer_bonus') && this.player.hasSynergy('crit_chance') && timerPct > 0.5) {
      isCrit = true;
    } else if (Math.random() < this.player.critChance) {
      isCrit = true;
    }
    let dmg = this.player.getDamage();
    if (isCrit) dmg *= this.player.critDamage;
    let hits = 1;
    if (Math.random() < this.player.doubleStrike) hits = 2;
    for (let i = 0; i < hits; i++) {
      const dead = this.enemy.takeDamage(dmg);
      this.spawnFloatText(Math.round(dmg), isCrit ? '#ffcc00' : '#fff', i * 200);
      this.audio.playHit();
      if (isCrit) {
        this.audio.playCrit();
        this.fx.flash('#fff', 100);
        if (this.player.hasSynergy('crit_chance') && this.player.hasSynergy('combo_mult')) {
          this.player.combo++;
        }
      }
      let ls = this.player.lifesteal;
      if (this.player.hasSynergy('lifesteal') && this.player.hasSynergy('dmg_up')) {
        ls *= (1 + this.player.combo * 0.05);
      }
      const heal = dmg * ls;
      const actualHeal = this.player.heal(heal);
      if (actualHeal < heal && this.player.hasSynergy('lifesteal') && this.player.hasSynergy('timer_bonus')) {
        this.player.shields++;
      }
      if (dead) break;
    }
    this.ui.setEnemyHp(this.enemy.hp, this.enemy.maxHp);
    this.ui.setPlayerHp(this.player.hp, this.player.maxHp);
    this.ui.setCombo(this.player.combo);
    this.enemy.renderer.triggerGlitch(1.5, 0.3);
    this.enemy.renderer.setState('hurt', { onComplete: () => { this.enemy.renderer.setState('idle'); } });
    if (this.enemy.isDead()) {
      this.player.score += this.level * 100 + this.player.combo * 10;
      var self = this;
      setTimeout(function() { self.handleVictory(); }, 500);
    } else {
      if (this.enemy.isBoss) {
        const newPhase = this.enemy.checkPhaseTransition();
        if (newPhase) {
          this.enemy.renderer.triggerGlitch(2, 0.5);
          var self = this;
          var self = this;
          this.enemy.renderer.setState('phase_transition', { onComplete: function() {
            self.enemy.renderer.setState('idle');
            self.question = self.qgen.generate(self.level, true, self.enemy.getCurrentModifiers());
            self.timer = self.question.timeLimit + self.player.timeBonus;
            self.maxTimer = self.timer;
            self.ui.setQuestion(self.question.text);
            self.answered = false;
            self.ui.clearInput();
            self.ui.focusInput();
          }});
          this.ui.setEnemyName(this.enemy.type.name + ' - ' + newPhase.name, true);
          return;
        }
      }
      this.nextQuestion();
    }
  }
  handleWrong() {
    this.player.total++;
    this.player.combo = 0;
    this.ui.setCombo(0);
    const mods = this.enemy.isBoss ? this.enemy.getCurrentModifiers() : {};
    let dmg = this.enemy.getAttackDamage();
    if (mods.healOnWrong) {
      this.enemy.hp = Math.min(this.enemy.maxHp, this.enemy.hp + this.enemy.maxHp * mods.healOnWrong);
      this.ui.setEnemyHp(this.enemy.hp, this.enemy.maxHp);
    }
    this.player.takeDamage(dmg);
    this.ui.setPlayerHp(this.player.hp, this.player.maxHp);
    this.audio.playDamage();
    this.fx.flash('rgba(255,42,42,0.6)', 200);
    this.fx.shake(10, 300);
    this.container.classList.add('chromatic-shift');
    var self = this;
    setTimeout(function() { self.container.classList.remove('chromatic-shift'); }, 300);
    this.enemy.renderer.triggerGlitch(1, 0.2);
    this.enemy.renderer.setState('attack', { onComplete: () => { this.enemy.renderer.setState('idle'); } });
    this.spawnFloatText('-' + dmg, '#ff4444', 0);
    if (this.player.hp <= 0) {
      var self = this;
      setTimeout(function() { self.handleGameOver(); }, 500);
    } else {
      this.nextQuestion();
    }
  }
  nextQuestion() {
    const isBoss = this.enemy.isBoss;
    this.question = this.qgen.generate(this.level, isBoss, isBoss ? this.enemy.getCurrentModifiers() : null);
    this.timer = this.question.timeLimit + this.player.timeBonus;
    this.maxTimer = this.timer;
    this.ui.setQuestion(this.question.text);
    this.ui.setTimer(1);
    this.answered = false;
    this.ui.clearInput();
    this.ui.focusInput();
  }
  handleVictory() {
    this.audio.playVictory();
    this.state = 'UPGRADE';
    this.ui.showScreen('upgrade');
    const draft = this.upgSys.generateDraft(this.player, CONFIG.draftCount);
    var self = this;
    this.ui.showUpgrades(draft, function(card) {
      self.player.addUpgrade(card);
      self.audio.playUpgrade();
      self.level++;
      self.state = 'BATTLE';
      self.ui.showScreen('battle');
      self.startLevel();
    });
  }
  handleGameOver() {
    this.audio.playGameOver();
    this.state = 'GAMEOVER';
    if (this.canvas) this.canvas.style.display = 'none';
    this.ui.showScreen('gameover');
    this.ui.showFinalStats(this.level, this.player.score, this.player.maxCombo, this.player.getAccuracy());
  }
  saveScore() {
    const name = this.ui.elements.playerName.value;
    this.lb.addEntry(name, this.level, this.player.score, this.player.getAccuracy());
    this.showLeaderboard();
  }
  showLeaderboard() {
    this.state = 'LEADERBOARD';
    this.ui.showScreen('leaderboard');
    this.ui.showLeaderboard(this.lb.getTop());
  }
  spawnFloatText(text, color, delay) {
    var self = this;
    setTimeout(function() {
      var rect = self.canvas.getBoundingClientRect();
      const x = rect.width / 2 + (Math.random() - 0.5) * 60;
      const y = rect.height * 0.3;
      self.ui.showFloatingText(text, x, y, color);
    }, delay);
  }
}

// ==================== MAIN ====================
console.log('UNIT HUNTER loaded');

window.addEventListener('DOMContentLoaded', function() {
  console.log('DOM ready');
  try {
    window.game = new Game();
    console.log('Game initialized');
  } catch(e) {
    console.error('Failed to create Game:', e);
  }
});
