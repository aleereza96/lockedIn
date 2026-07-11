<template>
  <div class="app-shell">
    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- Logo -->
      <div class="sidebar-logo">
        <span class="font-mono text-xs tracking-widest uppercase text-[var(--color-muted)]">
          lockedIn
        </span>
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: route.path === item.to }"
        >
          <i :class="`ti ti-${item.icon}`" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Topics -->
      <div class="sidebar-section">
        <div class="sidebar-section-label">Topics</div>
        <div
          v-for="topic in topics"
          :key="topic.id"
          class="topic-item"
          :class="{ active: activeTopicId === topic.id }"
          @click="activeTopicId = topic.id"
        >
          <span class="topic-dot" :style="{ background: topic.color }" />
          <span class="truncate">{{ topic.label }}</span>
        </div>

        <button class="add-topic-btn" @click="$emit('add-topic')">
          <i class="ti ti-plus" aria-hidden="true" />
          Add topic
        </button>
      </div>

      <!-- Bottom: lock in -->
      <div class="sidebar-bottom">
        <NuxtLink
          v-if="activeTopicId"
          :to="`/session/${activeTopicId}`"
          class="lock-in-btn"
        >
          Lock in →
        </NuxtLink>
        <div v-else class="lock-in-btn disabled">
          Select a topic first
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

defineEmits<{ 'add-topic': [] }>()

const route = useRoute()
const activeTopicId = ref<string | null>('waves')

const navItems = [
  { to: '/map',      icon: 'topology-star-3', label: 'Map'      },
  { to: '/settings', icon: 'settings',         label: 'Settings' },
]

// Placeholder — replace with Pinia store
const topics = ref([
  { id: 'osc',   label: 'Oscillators',    color: '#7C6FE8' },
  { id: 'waves', label: 'Waves',           color: '#7C6FE8' },
  { id: 'thermo',label: 'Thermodynamics',  color: '#4CAF82' },
  { id: 'calc',  label: 'Calculus',        color: '#E8A84C' },
])
</script>

<style scoped>
.app-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--color-bg);
}

/* ── Sidebar ── */
.sidebar {
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  height: 100%;
  border-right: 1px solid var(--color-border);
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.sidebar-logo {
  padding: 18px 16px 14px;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-nav {
  padding: 12px 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-bottom: 1px solid var(--color-border);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  color: var(--color-muted);
  text-decoration: none;
  transition: all 0.15s;
}

.nav-item:hover { background: var(--color-surface-raise); color: var(--color-text); }
.nav-item.active { background: var(--color-accent-soft); color: var(--color-accent); }

.nav-item i { font-size: 15px; }

/* ── Topics ── */
.sidebar-section {
  flex: 1;
  padding: 16px 10px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
}

.sidebar-section-label {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-dim);
  padding: 0 6px;
  margin-bottom: 6px;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 7px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--color-muted);
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid transparent;
}

.topic-item:hover { background: var(--color-surface-raise); color: var(--color-text); }

.topic-item.active {
  background: var(--color-accent-soft);
  color: var(--color-text);
  border-color: color-mix(in srgb, var(--color-accent) 20%, transparent);
}

.topic-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.add-topic-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--color-accent);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  margin-top: 4px;
  transition: background 0.15s;
  width: 100%;
}

.add-topic-btn:hover { background: var(--color-accent-soft); }

/* ── Bottom ── */
.sidebar-bottom {
  padding: 12px 10px;
  border-top: 1px solid var(--color-border);
}

.lock-in-btn {
  display: block;
  width: 100%;
  padding: 10px 0;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s;
  border: none;
  font-family: inherit;
}

.lock-in-btn:hover { background: var(--color-accent-dark); }

.lock-in-btn.disabled {
  background: var(--color-surface-raise);
  color: var(--color-dim);
  cursor: default;
  pointer-events: none;
}

/* ── Main ── */
.main-content {
  flex: 1;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
