<template>
  <div class="dump-page">
    <!-- Header -->
    <header class="dump-header">
      <NuxtLink :to="`/session/${topicId}`" class="back-link">
        <i class="ti ti-arrow-left" aria-hidden="true" /> back to session
      </NuxtLink>
      <div class="header-pills">
        <span class="timer-pill font-mono">{{ fmtTime(elapsed) }}</span>
        <span class="topic-pill">{{ topicLabel }}</span>
      </div>
    </header>

    <!-- Input -->
    <div class="dump-input-area">
      <div class="area-label">What's on your mind?</div>
      <textarea
        v-model="input"
        class="dump-textarea"
        placeholder="Just get it out. Trash it or save it for later."
        ref="textareaRef"
        @keydown.ctrl.enter.prevent="add('save')"
      />
      <div class="dump-actions">
        <button class="action-btn trash" :disabled="!input.trim()" @click="add('trash')">
          <i class="ti ti-trash" aria-hidden="true" /> Trash it
        </button>
        <button class="action-btn save" :disabled="!input.trim()" @click="add('save')">
          <i class="ti ti-inbox" aria-hidden="true" /> Save for later
        </button>
      </div>
    </div>

    <!-- Divider -->
    <div class="dump-divider">
      <span class="divider-label">Parked thoughts</span>
      <span class="count-pill font-mono">{{ items.length }}</span>
    </div>

    <!-- List -->
    <div class="dump-list">
      <div v-if="items.length === 0" class="empty-list">
        Nothing parked yet — dump it, don't lose it.
      </div>

      <TransitionGroup name="dump-item" tag="div" class="items-group">
        <div
          v-for="item in items"
          :key="item.id"
          class="dump-item"
          :class="item.type"
        >
          <div class="item-left">
            <span class="item-pill" :class="item.type">{{ item.type }}</span>
            <span class="item-text">{{ item.text }}</span>
          </div>
          <button class="item-delete" @click="remove(item.id)" aria-label="Remove">
            <i class="ti ti-x" aria-hidden="true" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

definePageMeta({ layout: 'default' })

const route     = useRoute()
const topicId   = route.params.topicId as string
const topicLabel = 'Waves' // replace with store lookup

type DumpType = 'trash' | 'save'
interface DumpItem { id: number; text: string; type: DumpType }

const input       = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const elapsed     = ref(0) // sync from session store in real app

const items = ref<DumpItem[]>([
  { id: 1, text: 'Email Prof. Martinez about the assignment deadline', type: 'save' },
  { id: 2, text: "What's the capital of Mongolia?", type: 'trash' },
])

let timer: ReturnType<typeof setInterval>
onMounted(() => {
  timer = setInterval(() => elapsed.value++, 1000)
  nextTick(() => textareaRef.value?.focus())
})
onUnmounted(() => clearInterval(timer))

const fmtTime = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

async function add(type: DumpType) {
  if (!input.value.trim()) return
  items.value.unshift({ id: Date.now(), text: input.value.trim(), type })
  input.value = ''
  await nextTick()
  textareaRef.value?.focus()
}

function remove(id: number) {
  items.value = items.value.filter(i => i.id !== id)
}
</script>

<style scoped>
.dump-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg);
}

/* Header */
.dump-header {
  padding: 13px 24px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface);
}

.back-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.15s;
}

.back-link:hover { color: var(--color-text); }

.header-pills { display: flex; align-items: center; gap: 8px; }

.timer-pill {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 20px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
}

.topic-pill {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 20px;
  background: var(--color-surface-raise);
  color: var(--color-muted);
  border: 1px solid var(--color-border);
}

/* Input area */
.dump-input-area {
  padding: 16px 24px 14px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.area-label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.dump-textarea {
  width: 100%;
  height: 88px;
  padding: 12px 14px;
  font-size: 13px;
  line-height: 1.7;
  resize: none;
}

.dump-actions { display: flex; gap: 8px; }

.action-btn {
  flex: 1;
  padding: 9px 0;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.15s;
  border: 1px solid transparent;
}

.action-btn:disabled { opacity: 0.35; cursor: default; }

.action-btn.trash {
  background: color-mix(in srgb, var(--color-trash) 10%, transparent);
  color: var(--color-trash);
  border-color: color-mix(in srgb, var(--color-trash) 20%, transparent);
}

.action-btn.trash:not(:disabled):hover {
  background: color-mix(in srgb, var(--color-trash) 18%, transparent);
}

.action-btn.save {
  background: color-mix(in srgb, var(--color-spam) 10%, transparent);
  color: var(--color-spam);
  border-color: color-mix(in srgb, var(--color-spam) 20%, transparent);
}

.action-btn.save:not(:disabled):hover {
  background: color-mix(in srgb, var(--color-spam) 18%, transparent);
}

/* Divider */
.dump-divider {
  padding: 10px 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.divider-label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.count-pill {
  font-size: 10px;
  font-weight: 700;
  padding: 1px 8px;
  border-radius: 20px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
}

/* List */
.dump-list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 24px 16px;
}

.items-group { display: flex; flex-direction: column; gap: 6px; }

.empty-list {
  font-size: 13px;
  color: var(--color-dim);
  font-style: italic;
  padding: 20px 0;
  text-align: center;
}

.dump-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-left-width: 2px;
}

.dump-item.trash { border-left-color: color-mix(in srgb, var(--color-trash) 50%, transparent); }
.dump-item.save  { border-left-color: color-mix(in srgb, var(--color-spam)  50%, transparent); }

.item-left {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.item-pill {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 500;
  flex-shrink: 0;
  margin-top: 1px;
}

.item-pill.trash {
  background: color-mix(in srgb, var(--color-trash) 12%, transparent);
  color: var(--color-trash);
  border: 1px solid color-mix(in srgb, var(--color-trash) 20%, transparent);
}

.item-pill.save {
  background: color-mix(in srgb, var(--color-spam) 12%, transparent);
  color: var(--color-spam);
  border: 1px solid color-mix(in srgb, var(--color-spam) 20%, transparent);
}

.item-text {
  font-size: 13px;
  color: var(--color-text);
  line-height: 1.5;
  word-break: break-word;
}

.item-delete {
  background: none;
  border: none;
  color: var(--color-dim);
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  transition: color 0.15s;
  flex-shrink: 0;
  font-size: 13px;
}

.item-delete:hover { color: var(--color-trash); }

/* Transitions */
.dump-item-enter-active { transition: all 0.2s ease; }
.dump-item-leave-active { transition: all 0.15s ease; }
.dump-item-enter-from   { opacity: 0; transform: translateY(-8px); }
.dump-item-leave-to     { opacity: 0; transform: translateX(12px); }
</style>
