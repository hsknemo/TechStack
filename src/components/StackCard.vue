<script setup>
import { NCard, NTag, NSpace, NText, NIcon } from 'naive-ui'
import { useRouter } from 'vue-router'
const props = defineProps({ item: { type: Object, required: true } })
const router = useRouter()

function goDetail() {
  if (props.item?.id) {
    router.push({ path: `/library/${props.item.id}` })
  }
}
</script>

<template>
  <NCard
    :title="props.item?.name"
    hoverable
    style="cursor: pointer; height: 100%;"
    @click="goDetail"
  >
    <template #header-extra>
      <NText depth="3" style="font-size: 12px;">{{ props.item?.category }}</NText>
    </template>
    <NText depth="2" style="display: block; margin-bottom: 12px;">
      {{ props.item?.description }}
    </NText>
    <NSpace>
      <NTag v-for="t in props.item?.tags" :key="t" size="small" type="info">
        {{ t }}
      </NTag>
    </NSpace>
  </NCard>
</template>
