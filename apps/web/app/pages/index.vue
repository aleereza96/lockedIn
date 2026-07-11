<script setup lang="ts">
// Redirect to map, or onboarding if first visit
// Replace this condition with your actual auth/onboarding check
const isOnboarded = useCookie('lockedin_onboarded')
if (!isOnboarded.value) {
  navigateTo('/onboarding')
} else {
  navigateTo('/map')
}
</script>
