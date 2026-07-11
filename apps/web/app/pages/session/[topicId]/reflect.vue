<template>
  <div class="reflect-page">
    <header class="reflect-header">
      <div class="eyebrow">Session complete</div>
      <h1 class="reflect-title">What did you learn?</h1>
      <div class="reflect-meta">
        <span class="font-mono">{{ topicLabel }} · {{ fmtTime(actualSecs) }}</span>
        <span v-if="hitGoal" class="goal-hit">
          <i class="ti ti-check" aria-hidden="true" /> Hit your goal
        </span>
      </div>
    </header>

    <div class="reflect-body">
      <!-- Written reflection -->
      <div class="field">
        <label class="field-label" for="reflection">In your own words</label>
        <textarea
          id="reflection"
          v-model="reflectionText"
          class="reflect-textarea"
          placeholder="e.g. Understood how two waves superpose — constructive interference happens when they're in phase, destructive when 180° out..."
        />
        <div class="char-hint" :class="{ ready: reflectionText.trim().length > 10 }">
          {{ reflectionText.trim().length > 10 ? 'Looks good' : 'Write something meaningful to save' }}
        </div>
      </div>

      <!-- Focus rating -->
      <div class="field">
        <div class="field-label">How was your focus?</div>
        <div class="rating-row">
          <button
            v-for="(r, i) in ratings"
            :key="i"
            class="rating-btn"
            :class="{ active: focusRating === i }"
            @click="focusRating = i"
          >{{ r }}</button>
        </div>
      </div>
    </div>

    <footer class="reflect-footer">
      <button
        class="save-btn"
        :class="{ ready: canSave }"
        :disabled="!canSave"
        @click="save"
      >
        {{ canSave ? 'Save to graph →' : 'Write something first' }}
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'default' })

const route      = useRoute()
const topicId    = route.params.topicId as string
const topicLabel = 'Waves' // replace with store lookup
const actualSecs = ref(1483) // replace with session store value

const reflectionText = ref('')
const focusRating    = ref<number | null>(null)
const ratings        = ['Struggled', 'Okay', 'Deep focus']

const hitGoal = computed(() => actualSecs.value >= 25 * 60)
const canSave = computed(() => reflectionText.value.trim().length > 10)

const fmtTime = (s: number) => {
  const m = Math.floor(s / 60)
  return m > 0 ? `${m} min` : `${s}s`
}

async function save() {
  if (!canSave.value) return
  // TODO: persist to API
  // { topicId, reflection: reflectionText.value, focusRating: focusRating.value, actualSecs: actualSecs.value }
  navigateTo('/map')
}
</script>

<style scoped>
.reflect-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg);
}

.reflect-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
}

.eyebrow { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-muted); margin-bottom: 5px; }

.reflect-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 6px;
}

.reflect-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: var(--color-muted);
}

.goal-hit {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: var(--color-node-done);
}

/* Body */
.reflect-body {
  flex: 1;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

.field { display: flex; flex-direction: column; gap: 8px; }

.field-label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.reflect-textarea {
  width: 100%;
  height: 130px;
  padding: 14px;
  font-size: 13px;
  line-height: 1.7;
  resize: none;
}

.char-hint {
  font-size: 11px;
  color: var(--color-dim);
  transition: color 0.2s;
}

.char-hint.ready { color: var(--color-node-done); }

/* Rating */
.rating-row { display: flex; gap: 8px; }

.rating-btn {
  flex: 1;
  padding: 10px 0;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  background: var(--color-surface);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
  transition: all 0.15s;
}

.rating-btn:hover {
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-color: color-mix(in srgb, var(--color-accent) 25%, transparent);
}

.rating-btn.active {
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-color: color-mix(in srgb, var(--color-accent) 30%, transparent);
}

/* Footer */
.reflect-footer {
  padding: 14px 24px;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}

.save-btn {
  width: 100%;
  padding: 12px 0;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  cursor: default;
  font-family: inherit;
  background: var(--color-surface-raise);
  color: var(--color-dim);
  border: 1px solid var(--color-border);
  transition: all 0.2s;
}

.save-btn.ready {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
  cursor: pointer;
}

.save-btn.ready:hover { background: var(--color-accent-dark); }
</style>
