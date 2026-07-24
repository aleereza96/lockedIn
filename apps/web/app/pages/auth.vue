<template>
	<div class="auth-page">
		<!-- Logo -->
		<div class="auth-logo">
			<svg width="32" height="32" viewBox="-40 -40 80 80">
				<circle
					cx="0"
					cy="0"
					r="36"
					fill="none"
					stroke="#7C6FE8"
					stroke-width="1.5"
					stroke-opacity="0.18"
				/>
				<circle
					cx="0"
					cy="0"
					r="24"
					fill="none"
					stroke="#7C6FE8"
					stroke-width="4.5"
					stroke-opacity="0.45"
				/>
				<circle cx="0" cy="0" r="13" fill="#7C6FE8" fill-opacity="0.18" />
				<circle cx="0" cy="0" r="10" fill="#7C6FE8" />
			</svg>
			<span class="logo-wordmark">lockedIn</span>
		</div>

		<!-- Card -->
		<div class="auth-card">
			<!-- Toggle -->
			<div class="auth-toggle">
				<button
					class="toggle-btn"
					:class="{ active: mode === 'login' }"
					@click="switchMode('login')"
				>
					Sign in
				</button>
				<button
					class="toggle-btn"
					:class="{ active: mode === 'register' }"
					@click="switchMode('register')"
				>
					Create account
				</button>
			</div>

			<!-- Form -->
			<Transition name="form" mode="out-in">
				<!-- ── Login ── -->
				<form
					v-if="mode === 'login'"
					key="login"
					class="auth-form"
					@submit.prevent="handleLogin"
				>
					<div class="field">
						<label class="field-label" for="login-email">Email</label>
						<input
							id="login-email"
							v-model="login.email"
							type="email"
							class="field-input"
							:class="{ error: errors.email }"
							placeholder="you@example.com"
							autocomplete="email"
						/>
						<span v-if="errors.email" class="field-error">{{
							errors.email
						}}</span>
					</div>

					<div class="field">
						<label class="field-label" for="login-password">
							Password
							<a href="#" class="forgot-link" @click.prevent
								>Forgot password?</a
							>
						</label>
						<div class="input-wrap">
							<input
								id="login-password"
								v-model="login.password"
								:type="showPass ? 'text' : 'password'"
								class="field-input"
								:class="{ error: errors.password }"
								placeholder="••••••••"
								autocomplete="current-password"
							/>
							<button
								type="button"
								class="eye-btn"
								@click="showPass = !showPass"
								:aria-label="showPass ? 'Hide password' : 'Show password'"
							>
								<i
									:class="`ti ti-eye${showPass ? '-off' : ''}`"
									aria-hidden="true"
								/>
							</button>
						</div>
						<span v-if="errors.password" class="field-error">{{
							errors.password
						}}</span>
					</div>

					<div v-if="errors.form" class="form-error">{{ errors.form }}</div>

					<button type="submit" class="submit-btn" :disabled="loading">
						<span v-if="!loading">Sign in →</span>
						<span v-else class="loading-dots"> <span /><span /><span /> </span>
					</button>
				</form>

				<!-- ── Register ── -->
				<form
					v-else
					key="register"
					class="auth-form"
					@submit.prevent="handleRegister"
				>
					<div class="field">
						<label class="field-label" for="reg-username">Username</label>
						<div class="input-wrap">
							<span class="input-prefix">@</span>
							<input
								id="reg-username"
								v-model="register.username"
								type="text"
								class="field-input prefixed"
								:class="{ error: errors.username }"
								placeholder="yourname"
								autocomplete="username"
								spellcheck="false"
							/>
						</div>
						<span v-if="errors.username" class="field-error">{{
							errors.username
						}}</span>
					</div>

					<div class="field">
						<label class="field-label" for="reg-email">Email</label>
						<input
							id="reg-email"
							v-model="register.email"
							type="email"
							class="field-input"
							:class="{ error: errors.email }"
							placeholder="you@example.com"
							autocomplete="email"
						/>
						<span v-if="errors.email" class="field-error">{{
							errors.email
						}}</span>
					</div>

					<div class="field">
						<label class="field-label" for="reg-password">Password</label>
						<div class="input-wrap">
							<input
								id="reg-password"
								v-model="register.password"
								:type="showPass ? 'text' : 'password'"
								class="field-input"
								:class="{ error: errors.password }"
								placeholder="••••••••"
								autocomplete="new-password"
							/>
							<button
								type="button"
								class="eye-btn"
								@click="showPass = !showPass"
								:aria-label="showPass ? 'Hide password' : 'Show password'"
							>
								<i
									:class="`ti ti-eye${showPass ? '-off' : ''}`"
									aria-hidden="true"
								/>
							</button>
						</div>
						<span v-if="errors.password" class="field-error">{{
							errors.password
						}}</span>
						<!-- Strength bar -->
						<div class="strength-bar">
							<div
								v-for="i in 4"
								:key="i"
								class="strength-segment"
								:class="strengthClass(i)"
							/>
						</div>
						<span class="strength-label" :class="`strength-${strength}`">{{
							strengthLabel
						}}</span>
					</div>

					<div class="field">
						<label class="field-label" for="reg-confirm"
							>Confirm password</label
						>
						<div class="input-wrap">
							<input
								id="reg-confirm"
								v-model="register.confirm"
								:type="showConfirm ? 'text' : 'password'"
								class="field-input"
								:class="{
									error: errors.confirm,
									match:
										!errors.confirm &&
										register.confirm &&
										register.confirm === register.password
								}"
								placeholder="••••••••"
								autocomplete="new-password"
							/>
							<button
								type="button"
								class="eye-btn"
								@click="showConfirm = !showConfirm"
								:aria-label="showConfirm ? 'Hide' : 'Show'"
							>
								<i
									:class="`ti ti-eye${showConfirm ? '-off' : ''}`"
									aria-hidden="true"
								/>
							</button>
						</div>
						<span v-if="errors.confirm" class="field-error">{{
							errors.confirm
						}}</span>
						<span
							v-else-if="
								register.confirm && register.confirm === register.password
							"
							class="field-match"
						>
							<i class="ti ti-check" aria-hidden="true" /> Passwords match
						</span>
					</div>

					<div v-if="errors.form" class="form-error">{{ errors.form }}</div>

					<button type="submit" class="submit-btn" :disabled="loading">
						<span v-if="!loading">Create account →</span>
						<span v-else class="loading-dots"><span /><span /><span /></span>
					</button>

					<p class="terms">
						By creating an account you agree to our
						<a href="#" @click.prevent>Terms</a> and
						<a href="#" @click.prevent>Privacy policy</a>.
					</p>
				</form>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, reactive } from 'vue'

	definePageMeta({ layout: 'blank' })

	type Mode = 'login' | 'register'

	const mode = ref<Mode>('login')
	const showPass = ref(false)
	const showConfirm = ref(false)
	const loading = ref(false)

	const login = reactive({ email: '', password: '' })
	const register = reactive({
		username: '',
		email: '',
		password: '',
		confirm: ''
	})
	const errors = reactive<Record<string, string>>({})

	function clearErrors() {
		Object.keys(errors).forEach((k) => delete errors[k])
	}

	function switchMode(m: Mode) {
		mode.value = m
		showPass.value = false
		showConfirm.value = false
		clearErrors()
	}

	// ── Password strength ──
	const strength = computed(() => {
		const p = register.password
		if (!p) return 0
		let score = 0
		if (p.length >= 8) score++
		if (/[A-Z]/.test(p)) score++
		if (/[0-9]/.test(p)) score++
		if (/[^A-Za-z0-9]/.test(p)) score++
		return score
	})

	const strengthLabel = computed(() => {
		return ['', 'Weak', 'Fair', 'Good', 'Strong'][strength.value] ?? ''
	})

	function strengthClass(segment: number) {
		if (strength.value === 0) return ''
		if (segment > strength.value) return ''
		if (strength.value === 1) return 'seg-weak'
		if (strength.value === 2) return 'seg-fair'
		if (strength.value === 3) return 'seg-good'
		return 'seg-strong'
	}

	// ── Validation ──
	function validateLogin(): boolean {
		clearErrors()
		let ok = true
		if (!login.email) {
			errors.email = 'Email is required'
			ok = false
		}
		if (!login.password) {
			errors.password = 'Password is required'
			ok = false
		}
		return ok
	}

	function validateRegister(): boolean {
		clearErrors()
		let ok = true
		if (!register.username) {
			errors.username = 'Username is required'
			ok = false
		} else if (!/^[a-z0-9_]{3,20}$/.test(register.username)) {
			errors.username = '3–20 chars, letters, numbers, underscores only'
			ok = false
		}
		if (!register.email) {
			errors.email = 'Email is required'
			ok = false
		}
		if (!register.password) {
			errors.password = 'Password is required'
			ok = false
		} else if (register.password.length < 8) {
			errors.password = 'At least 8 characters'
			ok = false
		}
		if (!register.confirm) {
			errors.confirm = 'Please confirm your password'
			ok = false
		} else if (register.confirm !== register.password) {
			errors.confirm = "Passwords don't match"
			ok = false
		}
		return ok
	}

	// ── Handlers ──
	async function handleLogin() {
		if (!validateLogin()) return
		loading.value = true
		try {
			// TODO: call your auth API
			await new Promise((r) => setTimeout(r, 800)) // remove — simulate latency
			navigateTo('/map')
		} catch {
			errors.form = 'Invalid email or password.'
		} finally {
			loading.value = false
		}
	}

	async function handleRegister() {
		if (!validateRegister()) return
		loading.value = true
		try {
			// TODO: call your auth API
			await new Promise((r) => setTimeout(r, 800)) // remove — simulate latency
			navigateTo('/onboarding')
		} catch {
			errors.form = 'Something went wrong. Please try again.'
		} finally {
			loading.value = false
		}
	}
</script>

<style scoped>
	.auth-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 28px;
		width: 100%;
		max-width: 400px;
	}

	/* Logo */
	.auth-logo {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo-wordmark {
		font-family: var(--font-mono);
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.12em;
		color: var(--color-text);
	}

	/* Card */
	.auth-card {
		width: 100%;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		overflow: hidden;
	}

	/* Toggle */
	.auth-toggle {
		display: flex;
		border-bottom: 1px solid var(--color-border);
	}

	.toggle-btn {
		flex: 1;
		padding: 14px 0;
		font-size: 13px;
		font-weight: 500;
		font-family: inherit;
		background: none;
		border: none;
		color: var(--color-muted);
		cursor: pointer;
		transition: all 0.15s;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
	}

	.toggle-btn:hover {
		color: var(--color-text);
	}

	.toggle-btn.active {
		color: var(--color-accent);
		border-bottom-color: var(--color-accent);
	}

	/* Form */
	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.field-label {
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-muted);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.forgot-link {
		font-size: 11px;
		color: var(--color-accent);
		text-decoration: none;
		letter-spacing: 0;
		text-transform: none;
		transition: opacity 0.15s;
	}

	.forgot-link:hover {
		opacity: 0.75;
	}

	/* Input */
	.input-wrap {
		position: relative;
		display: flex;
		align-items: center;
	}

	.field-input {
		width: 100%;
		padding: 10px 14px;
		font-size: 13px;
		border-radius: var(--radius-md);
		transition: border-color 0.15s;
	}

	.field-input.error {
		border-color: color-mix(in srgb, var(--color-trash) 60%, transparent);
	}
	.field-input.match {
		border-color: color-mix(in srgb, var(--color-node-done) 60%, transparent);
	}

	.field-input.prefixed {
		padding-left: 30px;
	}

	.input-prefix {
		position: absolute;
		left: 12px;
		font-size: 13px;
		color: var(--color-muted);
		pointer-events: none;
		font-family: var(--font-mono);
	}

	.eye-btn {
		position: absolute;
		right: 10px;
		background: none;
		border: none;
		color: var(--color-muted);
		cursor: pointer;
		padding: 4px;
		font-size: 15px;
		transition: color 0.15s;
		line-height: 1;
	}

	.eye-btn:hover {
		color: var(--color-text);
	}

	/* Errors + hints */
	.field-error {
		font-size: 11px;
		color: var(--color-trash);
	}

	.field-match {
		font-size: 11px;
		color: var(--color-node-done);
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.form-error {
		padding: 10px 14px;
		border-radius: var(--radius-md);
		background: color-mix(in srgb, var(--color-trash) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-trash) 25%, transparent);
		color: var(--color-trash);
		font-size: 12px;
	}

	/* Strength bar */
	.strength-bar {
		display: flex;
		gap: 4px;
		margin-top: 6px;
	}

	.strength-segment {
		flex: 1;
		height: 3px;
		border-radius: 2px;
		background: var(--color-border);
		transition: background 0.2s;
	}

	.seg-weak {
		background: var(--color-trash);
	}
	.seg-fair {
		background: var(--color-spam);
	}
	.seg-good {
		background: #6fc784;
	}
	.seg-strong {
		background: var(--color-node-done);
	}

	.strength-label {
		font-size: 10px;
		letter-spacing: 0.08em;
		color: var(--color-dim);
		transition: color 0.2s;
	}

	.strength-1 {
		color: var(--color-trash);
	}
	.strength-2 {
		color: var(--color-spam);
	}
	.strength-3 {
		color: #6fc784;
	}
	.strength-4 {
		color: var(--color-node-done);
	}

	/* Submit */
	.submit-btn {
		width: 100%;
		padding: 12px 0;
		border-radius: var(--radius-md);
		background: var(--color-accent);
		color: #fff;
		font-size: 13px;
		font-weight: 600;
		border: none;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.15s;
		margin-top: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--color-accent-dark);
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: default;
	}

	/* Loading dots */
	.loading-dots {
		display: flex;
		gap: 5px;
		align-items: center;
	}

	.loading-dots span {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #fff;
		animation: bounce 0.9s infinite ease-in-out both;
	}

	.loading-dots span:nth-child(1) {
		animation-delay: -0.3s;
	}
	.loading-dots span:nth-child(2) {
		animation-delay: -0.15s;
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0.6);
			opacity: 0.4;
		}
		40% {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* Terms */
	.terms {
		font-size: 11px;
		color: var(--color-dim);
		text-align: center;
		line-height: 1.6;
		margin: 0;
	}

	.terms a {
		color: var(--color-muted);
		text-decoration: none;
		transition: color 0.15s;
	}
	.terms a:hover {
		color: var(--color-text);
	}

	/* Transition */
	.form-enter-active,
	.form-leave-active {
		transition:
			opacity 0.15s,
			transform 0.15s;
	}
	.form-enter-from {
		opacity: 0;
		transform: translateX(8px);
	}
	.form-leave-to {
		opacity: 0;
		transform: translateX(-8px);
	}
</style>
