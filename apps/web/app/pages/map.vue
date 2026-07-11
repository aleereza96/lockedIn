<template>
  <div class="map-page">
    <!-- Graph canvas -->
    <div class="canvas" ref="canvasRef">
      <div class="canvas-label">Classical Mechanics</div>

      <svg viewBox="0 0 100 100" class="graph-svg" @click.self="activeNode = null">
        <!-- Edges -->
        <line
          v-for="([a, b], i) in edges" :key="`e-${i}`"
          :x1="getNode(a)!.x" :y1="getNode(a)!.y"
          :x2="getNode(b)!.x" :y2="getNode(b)!.y"
          stroke="#1E2229" stroke-width="0.6"
        />

        <!-- Nodes -->
        <g
          v-for="n in nodes" :key="n.id"
          class="node-g"
          @click="activeNode = n.id"
        >
          <!-- Glow ring for active/done -->
          <circle v-if="isActive(n)" :cx="n.x" :cy="n.y" r="9"  fill="#7C6FE8" fill-opacity="0.1" />
          <circle v-if="n.done && !isActive(n)" :cx="n.x" :cy="n.y" r="7" fill="#4CAF82" fill-opacity="0.08" />

          <circle
            :cx="n.x" :cy="n.y" r="3"
            :fill="isActive(n) ? '#7C6FE8' : n.done ? '#4CAF82' : '#2A2D3A'"
            :stroke="isActive(n) ? '#7C6FE8' : 'transparent'"
            stroke-width="0.8"
          />
          <text
            :x="n.x" :y="n.y - 5"
            text-anchor="middle"
            font-size="3.2"
            font-family="JetBrains Mono, monospace"
            :fill="isActive(n) ? '#C8CCD8' : n.done ? '#6A9E82' : '#555B6B'"
          >{{ n.label }}</text>
        </g>
      </svg>

      <!-- Empty state -->
      <div v-if="nodes.length === 0" class="empty-state">
        <div class="empty-ghost">
          <i class="ti ti-topology-star-3" aria-hidden="true" />
        </div>
        <p class="empty-title">Your map starts here</p>
        <p class="empty-sub">Add a topic you're working on. Each session you log will grow it.</p>
        <button class="empty-cta">Add your first topic</button>
      </div>
    </div>

    <!-- Node detail panel -->
    <Transition name="panel">
      <aside v-if="activeNode && currentDetail" class="detail-panel">
        <button class="panel-close" @click="activeNode = null" aria-label="Close">
          <i class="ti ti-x" aria-hidden="true" />
        </button>

        <span class="panel-tag">{{ currentDetail.subject }}</span>
        <h2 class="panel-title">{{ currentDetail.label }}</h2>
        <p class="panel-sub">{{ currentDetail.desc }}</p>

        <div class="panel-stats">
          <div class="stat-row">
            <span class="stat-label">Sessions</span>
            <span class="stat-val font-mono">{{ currentDetail.sessions }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Total time</span>
            <span class="stat-val font-mono">{{ currentDetail.time }}</span>
          </div>
          <div class="stat-row">
            <span class="stat-label">Last studied</span>
            <span class="stat-val">{{ currentDetail.last }}</span>
          </div>
        </div>

        <div v-if="currentDetail.reflection" class="panel-reflection">
          <div class="reflection-date">{{ currentDetail.reflectionDate }} · latest reflection</div>
          <p class="reflection-body">"{{ currentDetail.reflection }}"</p>
        </div>

        <NuxtLink :to="`/session/${activeNode}`" class="start-session-btn">
          Start session
        </NuxtLink>
      </aside>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({ layout: 'default' })

interface GraphNode {
  id: string; label: string; x: number; y: number; done: boolean
}

const nodes: GraphNode[] = [
  { id: 'phys',  label: 'Physics',     x: 50, y: 38, done: true  },
  { id: 'osc',   label: 'Oscillators', x: 30, y: 62, done: true  },
  { id: 'waves', label: 'Waves',        x: 56, y: 70, done: true  },
  { id: 'thermo',label: 'Thermo',       x: 74, y: 52, done: false },
  { id: 'em',    label: 'Magnetism',    x: 72, y: 76, done: false },
  { id: 'math',  label: 'Math',         x: 20, y: 42, done: true  },
  { id: 'diff',  label: 'Diff Eq',      x: 18, y: 66, done: true  },
]

const edges: [string, string][] = [
  ['phys','osc'],['phys','thermo'],['phys','waves'],
  ['osc','waves'],['waves','em'],['math','diff'],
  ['diff','osc'],['diff','waves'],['thermo','em'],
]

const details: Record<string, {
  label: string; subject: string; desc: string
  sessions: number; time: string; last: string
  reflection?: string; reflectionDate?: string
}> = {
  waves: {
    label: 'Waves', subject: 'Physics',
    desc: 'Wave equations, interference, standing waves',
    sessions: 3, time: '4h 20m', last: 'Today',
    reflection: 'Superposition makes sense now. Drew out two wave collisions by hand.',
    reflectionDate: 'Jun 21',
  },
  osc: {
    label: 'Oscillators', subject: 'Physics',
    desc: 'Simple harmonic motion, damping, resonance',
    sessions: 7, time: '6h 10m', last: 'Jun 19',
    reflection: 'Damping ratio finally makes sense. Underdamped overshoots but settles.',
    reflectionDate: 'Jun 19',
  },
  thermo: {
    label: 'Thermodynamics', subject: 'Physics',
    desc: 'Laws of thermodynamics, entropy, heat engines',
    sessions: 1, time: '45m', last: 'Jun 17',
    reflection: 'Just getting started. Zeroth law is obvious, entropy is not.',
    reflectionDate: 'Jun 17',
  },
  phys:  { label: 'Physics',      subject: 'Domain', desc: 'Classical physics overview', sessions: 2, time: '1h 05m', last: 'Jun 15' },
  em:    { label: 'Magnetism',    subject: 'Physics', desc: 'Electromagnetism and fields', sessions: 0, time: '—', last: 'Not started' },
  math:  { label: 'Math',         subject: 'Maths',  desc: 'Calculus and linear algebra foundation', sessions: 5, time: '4h 30m', last: 'Jun 18' },
  diff:  { label: 'Diff Eq',      subject: 'Maths',  desc: 'Ordinary differential equations', sessions: 4, time: '3h 20m', last: 'Jun 16' },
}

const activeNode = ref<string | null>(null)
const getNode = (id: string) => nodes.find(n => n.id === id)
const isActive = (n: GraphNode) => n.id === activeNode.value
const currentDetail = computed(() => activeNode.value ? details[activeNode.value] : null)
</script>

<style scoped>
.map-page {
  display: flex;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* Canvas */
.canvas {
  flex: 1;
  position: relative;
  background: var(--color-bg);
}

.canvas-label {
  position: absolute;
  top: 16px; left: 18px;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-dim);
  z-index: 1;
}

.graph-svg {
  width: 100%;
  height: 100%;
}

.node-g { cursor: pointer; }

/* Empty state */
.empty-state {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  z-index: 1;
}

.empty-ghost {
  width: 72px; height: 72px;
  border-radius: 50%;
  border: 1.5px dashed var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--color-dim);
  margin-bottom: 16px;
}

.empty-title { font-size: 15px; font-weight: 500; color: var(--color-text); margin: 0 0 6px; }
.empty-sub   { font-size: 13px; color: var(--color-muted); margin: 0 0 18px; text-align: center; max-width: 220px; line-height: 1.5; }

.empty-cta {
  padding: 9px 20px;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.empty-cta:hover { background: var(--color-accent-dark); }

/* Detail panel */
.detail-panel {
  width: 240px;
  min-width: 240px;
  height: 100%;
  border-left: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  position: relative;
}

.panel-close {
  position: absolute;
  top: 14px; right: 14px;
  background: none;
  border: none;
  color: var(--color-dim);
  font-size: 15px;
  cursor: pointer;
  padding: 4px;
  border-radius: var(--radius-sm);
  transition: color 0.15s;
}

.panel-close:hover { color: var(--color-text); }

.panel-tag {
  display: inline-block;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--color-accent-soft);
  color: var(--color-accent);
  margin-bottom: 10px;
  font-weight: 500;
}

.panel-title { font-size: 16px; font-weight: 600; color: var(--color-text); margin: 0 0 4px; }
.panel-sub   { font-size: 12px; color: var(--color-muted); margin: 0 0 16px; line-height: 1.5; }

.panel-stats {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-border);
  margin-bottom: 14px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 12px;
  border-bottom: 1px solid var(--color-border);
}

.stat-label { color: var(--color-muted); }
.stat-val   { color: var(--color-text); font-weight: 500; }

.panel-reflection {
  background: var(--color-surface-raise);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  margin-bottom: 16px;
}

.reflection-date { font-size: 10px; color: var(--color-dim); margin-bottom: 5px; }
.reflection-body { font-size: 12px; color: var(--color-muted); line-height: 1.6; font-style: italic; margin: 0; }

.start-session-btn {
  display: block;
  margin-top: auto;
  padding: 10px 0;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: background 0.15s;
}

.start-session-btn:hover { background: var(--color-accent-dark); }

/* Panel transition */
.panel-enter-active, .panel-leave-active { transition: transform 0.2s ease, opacity 0.2s ease; }
.panel-enter-from, .panel-leave-to       { transform: translateX(20px); opacity: 0; }
</style>
