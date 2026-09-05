<template>
  <div class="q-pa-md">
    <h5>Module Federation Host (Main)</h5>
    <p>Remote module 로드 예시:</p>
    <RemoteComponent
      :loadRemoteModule="loadTestModule"
      :props="{}"
    />
  </div>
</template>

<script setup lang="ts">
import RemoteComponent from 'src/components/modules/RemoteComponent.vue';

const loadTestModule = async () => {
  //@ts-ignore
  const res = (await import('User/mftest')).default;
  return res;
};
</script>
