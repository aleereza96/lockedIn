<template>
  <div class="session-page">
    <!-- Header -->
    <header class="session-header">
      <div class="session-meta">
        <div class="eyebrow">Locked in</div>
        <h1 class="session-topic">{{ topicLabel }}</h1>
      </div>

      <!-- Ring timer -->
      <div class="ring-wrap" :class="{ paused: isPaused }">
        <svg width="72" height="72" class="ring-svg">
          <circle cx="36" cy="36" r="30" fill="none" stroke="#1E2229" stroke-width="3.5" />
          <circle
            cx="36" cy="36" r="30"
            fill="none"
            :stroke="isPaused ? '#555B6B' : '#7C6FE8'"
            stroke-width="3.5"
            :stroke-dasharray="`${ringDash} ${circumference}`"
            stroke-linecap="round"
            style="transition: stroke-dasharray 0.5s linear, stroke 0.3s;"
          />
        </svg>
        <div class="ring-label font-mono">{{ fmtTime(elapsed) }}</div>
      </div>

      <div class="goal-wrap">
        <div class="goal-label">Goal</div>
        <div class="goal-val font-mono">{{ targetMins }} min</div>
        <div v-if="isPaused" class="paused-badge">paused</div>
      </div>
    </header>

    <!-- Notes -->
    <div class="notes-area">
      <div class="area-label">Session notes</div>
      <textarea
        v-model="notes"
        class="notes-textarea"
        placeholder="Work through what you're learning here..."
        :disabled="isPaused"
      />
    </div>

    <!-- Music tray -->
    <Transition name="tray">
      <div v-if="musicOpen" class="tray">
        <iframe
          v-if="embedUrl"
          :src="embedUrl"
          class="music-iframe"
          allow="autoplay"
          title="music player"
          frameborder="0"
        />
        <div v-else class="tray-row">
          <input
            v-model="musicInput"
            class="tray-input"
            placeholder="Paste a SoundCloud or YouTube URL..."
            @keydown.enter="applyMusic"
          />
          <button class="tray-btn" @click="applyMusic">Play</button>
        </div>
      </div>
    </Transition>

    <!-- Footer -->
    <footer class="session-footer">
      <!-- Pause / Resume -->
      <button
        class="foot-btn"
        :class="{ active: isPaused }"
        @click="togglePause"
      >
        <i :class="`ti ti-${isPaused ? 'player-play' : 'player-pause'}`" aria-hidden="true" />
        {{ isPaused ? 'Resume' : 'Pause' }}
      </button>

      <!-- Music -->
      <button
        class="foot-btn"
        :class="{ active: musicOpen }"
        @click="toggleMusic"
      >
        <i class="ti ti-music" aria-hidden="true" />
        Music
      </button>

      <!-- Brain dump -->
      <NuxtLink :to="`/session/${topicId}/dump`" class="foot-btn dump-link">
        <i class="ti ti-brain" aria-hidden="true" />
        Brain dump
        <span v-if="dumpCount > 0" class="dump-badge">{{ dumpCount }}</span>
      </NuxtLink>

      <!-- End session -->
      <button class="end-btn" @click="endSession">End session →</button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

definePageMeta({ layout: 'default' })

const route    = useRouter()
const topicId  = useRoute().params.topicId as string

// Placeholder — replace with store lookup
const topicLabel = 'Waves — Interference & Superposition'
const targetMins = ref(25)

const elapsed    = ref(0)
const isPaused   = ref(false)
const notes      = ref('')
const musicOpen  = ref(false)
const musicInput = ref('')
const musicUrl   = ref('')
const dumpCount  = ref(0) // pull from session store

const circumference = 2 * Math.PI * 30
const ringDash = computed(() =>
  Math.min(elapsed.value / (targetMins.value * 60), 1) * circumference
)

// Timer
let timer: ReturnType<typeof setInterval>
let pauseStart: number | null = null
const pauses: { pausedAt: number; resumedAt?: number }[] = []

onMounted(() => {
  timer = setInterval(() => {
    if (!isPaused.value) elapsed.value++
  }, 1000)
})

onUnmounted(() => clearInterval(timer))

const fmtTime = (s: number) => {
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function togglePause() {
  if (isPaused.value) {
    // Resume
    if (pauseStart !== null) {
      pauses[pauses.length - 1].resumedAt = Date.now()
      pauseStart = null
    }
    isPaused.value = false
  } else {
    // Pause
    pauseStart = Date.now()
    pauses.push({ pausedAt: pauseStart })
    isPaused.value = true
  }
}

// Music
const toEmbed = (url: string): string | null => {
  try {
    const u = new URL(url)
    if (u.hostname.includes('soundcloud.com'))
      return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%237C6FE8&auto_play=true&hide_related=true&show_comments=false&show_user=false&visual=false`
    if (u.hostname.includes('youtube.com') || u.hostname.includes('youtu.be')) {
      const vid = u.searchParams.get('v') || u.pathname.split('/').pop()
      return `https://www.youtube.com/embed/${vid}?autoplay=1`
    }
  } catch { return null }
  return null
}

const embedUrl = computed(() => toEmbed(musicUrl.value))

function applyMusic()  { musicUrl.value = musicInput.value }
function toggleMusic() {
  musicOpen.value = !musicOpen.value
  if (!musicOpen.value) { musicUrl.value = ''; musicInput.value = '' }
}

function endSession() {
  // TODO: persist session to store/API with elapsed, pauses, notes
  navigateTo(`/session/${topicId}/reflect`)
}
</script>

<style scoped>
.session-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg);
}

/* Header */
.session-header {
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 20px;
  background: var(--color-surface);
}

.session-meta  { flex: 1; }
.eyebrow       { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 3px; }
.session-topic { font-size: 14px; font-weight: 600; color: var(--color-text); margin: 0; }

/* Ring */
.ring-wrap { position: relative; width: 72px; height: 72px; flex-shrink: 0; }
.ring-svg  { position: absolute; top: 0; left: 0; transform: rotate(-90deg); }

.ring-label {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; color: var(--color-accent);
  transition: color 0.3s;
}

.ring-wrap.paused .ring-label { color: var(--color-muted); }

.goal-wrap { text-align: right; flex-shrink: 0; }
.goal-label { font-size: 10px; color: var(--color-muted); letter-spacing: 0.08em; text-transform: uppercase; }
.goal-val   { font-size: 14px; font-weight: 700; color: var(--color-text); }

.paused-badge {
  display: inline-block;
  font-size: 10px;
  padding: 2px 7px;
  border-radius: 20px;
  background: color-mix(in srgb, var(--color-muted) 15%, transparent);
  color: var(--color-muted);
  margin-top: 4px;
}

/* Notes */
.notes-area {
  flex: 1;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
}

.area-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-muted); }

.notes-textarea {
  flex: 1;
  width: 100%;
  padding: 14px;
  font-size: 13px;
  line-height: 1.7;
  resize: none;
  min-height: 0;
}

.notes-textarea:disabled { opacity: 0.5; cursor: not-allowed; }

/* Music tray */
.tray {
  padding: 10px 24px;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface-raise);
}

.tray-row { display: flex; gap: 8px; }

.tray-input { flex: 1; padding: 8px 12px; font-size: 12px; }

.tray-btn {
  padding: 8px 16px;
  border-radius: var(--radius-md);
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.tray-btn:hover { background: color-mix(in srgb, var(--color-accent) 20%, transparent); }

.music-iframe { width: 100%; height: 60px; border-radius: var(--radius-md); display: block; }

/* Footer */
.session-footer {
  padding: 12px 24px;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  display: flex;
  gap: 8px;
  align-items: center;
}

.foot-btn, .dump-link {
  flex: 1;
  padding: 9px 0;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  background: var(--color-bg);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
  position: relative;
}

.foot-btn:hover, .dump-link:hover {
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-color: color-mix(in srgb, var(--color-accent) 25%, transparent);
}

.foot-btn.active {
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-color: color-mix(in srgb, var(--color-accent) 25%, transparent);
}

.dump-badge {
  position: absolute;
  top: -6px; right: -6px;
  background: var(--color-accent);
  color: #fff;
  font-size: 9px;
  font-weight: 700;
  width: 16px; height: 16px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}

.end-btn {
  flex: 1.2;
  padding: 9px 0;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.end-btn:hover { background: var(--color-accent-dark); }

/* Tray transition */
.tray-enter-active, .tray-leave-active { transition: all 0.2s ease; }
.tray-enter-from, .tray-leave-to       { opacity: 0; transform: translateY(6px); }
</style>
