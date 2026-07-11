<template>
  <div class="onboarding">
    <div class="ob-logo">lockedIn</div>

    <!-- Step 1: Pick a plan -->
    <Transition name="fade" mode="out-in">
      <div v-if="step === 1" key="step1" class="ob-card">
        <div class="ob-progress">
          <span class="ob-dot active" />
          <span class="ob-dot" />
        </div>

        <h1 class="ob-title">How do you want to work?</h1>
        <p class="ob-sub">Pick the plan that fits where you are right now. You can change this later.</p>

        <div class="plans">
          <button
            class="plan-card"
            :class="{ selected: plan === 'growth' }"
            @click="plan = 'growth'"
          >
            <i class="ti ti-plant-2 plan-icon" aria-hidden="true" />
            <div class="plan-body">
              <div class="plan-name">Growth plan</div>
              <div class="plan-desc">Start with short sessions. The app gently pushes your focus capacity over time.</div>
              <span class="plan-tag growth">Start at 10 min sessions</span>
            </div>
          </button>

          <button
            class="plan-card"
            :class="{ selected: plan === 'business' }"
            @click="plan = 'business'"
          >
            <i class="ti ti-bolt plan-icon" aria-hidden="true" />
            <div class="plan-body">
              <div class="plan-name">Straight to business</div>
              <div class="plan-desc">No hand-holding. Set your own session length and lock in immediately.</div>
              <span class="plan-tag business">You're in control</span>
            </div>
          </button>
        </div>

        <button class="ob-btn" :disabled="!plan" @click="step = 2">
          Continue
        </button>
      </div>

      <!-- Step 2: Confirm -->
      <div v-else-if="step === 2" key="step2" class="ob-card">
        <div class="ob-progress">
          <span class="ob-dot done" />
          <span class="ob-dot active" />
        </div>

        <h1 class="ob-title">You're all set</h1>
        <p class="ob-sub">Here's how lockedIn will work for you.</p>

        <div class="confirm-box">
          <div class="confirm-row">
            <span class="confirm-label">Plan</span>
            <span class="confirm-val">{{ plan === 'growth' ? 'Growth plan' : 'Straight to business' }}</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Starting session length</span>
            <span class="confirm-val">{{ plan === 'growth' ? '10 minutes' : 'Set by you' }}</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Brain dump</span>
            <span class="confirm-val">Always available</span>
          </div>
          <div class="confirm-row">
            <span class="confirm-label">Knowledge graph</span>
            <span class="confirm-val">Builds as you go</span>
          </div>
        </div>

        <button class="ob-btn" @click="finish">Start using lockedIn</button>
        <button class="ob-back" @click="step = 1">← Go back</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: 'blank' })

const step = ref(1)
const plan = ref<'growth' | 'business' | null>(null)

const onboarded = useCookie('lockedin_onboarded')

function finish() {
  onboarded.value = 'true'
  // TODO: persist plan to user store / API
  navigateTo('/map')
}
</script>

<style scoped>
.onboarding {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  width: 100%;
  max-width: 440px;
}

.ob-logo {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.ob-card {
  width: 100%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Progress dots */
.ob-progress {
  display: flex;
  gap: 6px;
  margin-bottom: 24px;
}

.ob-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-border);
}

.ob-dot.active { background: var(--color-accent); }
.ob-dot.done   { background: var(--color-accent); opacity: 0.4; }

.ob-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 6px;
}

.ob-sub {
  font-size: 13px;
  color: var(--color-muted);
  line-height: 1.6;
  margin: 0 0 20px;
}

/* Plan cards */
.plans {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.plan-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s;
  font-family: inherit;
}

.plan-card:hover { border-color: var(--color-muted); }

.plan-card.selected {
  border-color: var(--color-accent);
  background: var(--color-accent-soft);
}

.plan-icon {
  font-size: 20px;
  color: var(--color-muted);
  margin-top: 1px;
  flex-shrink: 0;
}

.plan-card.selected .plan-icon { color: var(--color-accent); }

.plan-body { display: flex; flex-direction: column; gap: 4px; }

.plan-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.plan-desc {
  font-size: 12px;
  color: var(--color-muted);
  line-height: 1.5;
}

.plan-tag {
  display: inline-block;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 20px;
  margin-top: 4px;
  font-weight: 500;
}

.plan-tag.growth   { background: color-mix(in srgb, var(--color-accent) 15%, transparent); color: var(--color-accent); }
.plan-tag.business { background: color-mix(in srgb, var(--color-node-done) 15%, transparent); color: var(--color-node-done); }

/* Confirm box */
.confirm-box {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 4px 16px;
  margin-bottom: 20px;
}

.confirm-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 13px;
  border-bottom: 1px solid var(--color-border);
}

.confirm-row:last-child { border-bottom: none; }

.confirm-label { color: var(--color-muted); }
.confirm-val   { color: var(--color-text); font-weight: 500; }

/* Buttons */
.ob-btn {
  width: 100%;
  padding: 11px 0;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.ob-btn:hover:not(:disabled) { background: var(--color-accent-dark); }

.ob-btn:disabled {
  background: var(--color-surface-raise);
  color: var(--color-dim);
  cursor: default;
}

.ob-back {
  display: block;
  width: 100%;
  margin-top: 10px;
  background: none;
  border: none;
  color: var(--color-muted);
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
  text-align: center;
  transition: color 0.15s;
}

.ob-back:hover { color: var(--color-text); }

/* Transition */
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s, transform 0.15s; }
.fade-enter-from { opacity: 0; transform: translateY(6px); }
.fade-leave-to   { opacity: 0; transform: translateY(-6px); }
</style>
