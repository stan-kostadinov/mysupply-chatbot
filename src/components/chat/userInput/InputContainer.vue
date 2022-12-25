<template>
    <div class="user-input-container">
        <user-input />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserInput from './UserInput.vue'

export default defineComponent({
	components: { UserInput },
})
</script>

<style lang="scss" scoped>
.user-input-container {
    width: 420px;
    max-width: 100%;
}
</style>
