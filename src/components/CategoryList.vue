<script setup>
import { NTag, NSpace } from 'naive-ui'
defineProps({ items: { type: Array, required: true } })
</script>

<template>
  <NSpace justify="center" wrap>
    <NTag
      v-for="c in items"
      :key="c.id"
      size="large"
      round
      :bordered="false"
      type="success"
    >
      {{ c.name }}
    </NTag>
  </NSpace>
</template>
