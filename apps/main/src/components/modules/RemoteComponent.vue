<!--
  * @file: InventoryReqListTab.vue
  * @author: liam / liam@o2pluss.com
  * @description: coconut-modules module federation 연동용 컴포넌트
 -->
<template>
  <!-- 에러 발생시 -->
  <div v-if="error" class="mfed-container">
    <slot name="error" />
  </div>
  <!-- 로딩 중 -->
  <div v-else-if="isLoading" class="mfed-container">
    <slot name="loading" />
  </div>
  <div :class="props.containerStyle || ''">
    <div ref="root" :class="'mfed-container'"></div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  watch,
  toRaw,
  computed,
} from 'vue';
import { Container, Root, createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import React from 'react';
import { useStore } from 'vuex';
import toastNotify from 'src/stores/toastNotify';
import dialogStore from 'src/stores/dialogStore';
import { useRoute } from 'vue-router';

const store = useStore();
const hostProps = ref(store.getters['auth/getMfedHostProps']);
const dialog = dialogStore();
const notify = toastNotify();
const route = useRoute();

/**
 * React Remote Module props
 * @param props: remote 컴포넌트로 전달할 props
 * @param loadRemoteModule: module load 함수
 */
const props = defineProps({
  props: {
    type: Object,
    required: true,
  },
  loadRemoteModule: {
    type: Function,
    required: true,
  },
  // 전체에 적용할 CSS 클래스
  containerStyle: {
    type: String,
    default: '',
  },
});

const reactRoot = ref<Root | null>(null); // react root
const root = ref<Container | null>(null);
const error = ref<Error>(); // error 저장
const remoteModule = ref<Root | null>(null); // entry의 react module str
const isLoading = ref(true);

const updateReactComponent = () => {
  if (!!error.value || !remoteModule.value || !root.value) return;
  // prod 환경에서 실행시 에러발생하여 ReactDOM.render로 사용
  // if (!reactRoot.value) {
  //   reactRoot.value = createRoot(root.value); // bundle의 element를 넣음
  // }
  // // root에서 컴포넌트 초기화 진행
  // reactRoot.value.render(
  //   // TODO: update시에도 써도 되는지 체크
  //   React.createElement(remoteModule.value, {
  //     ...props.props,
  //   })
  // );
  ReactDOM.render(
    React.createElement(remoteModule.value, {
      ...props.props,
      host_userInfo: toRaw(hostProps.value.host_userInfo),
      host_token: toRaw(hostProps.value.host_token),
      host_role: toRaw(hostProps.value.host_roles),
      host_organizable: toRaw(hostProps.value.host_organizable),
      host_openDialog: dialog.openDialog,
      host_openToast: notify.openToast,
    }),
    root.value,
  );
};

onMounted(() => {
  if (remoteModule.value) return;
  props
    .loadRemoteModule()
    .then((b: any) => {
      remoteModule.value = b;
      updateReactComponent();
    })
    .catch((e: Error) => {
      console.error('Remote Module Load Error ', e);
      error.value = e;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

watch(() => props.props, updateReactComponent, { deep: true, immediate: true });

onBeforeUnmount(() => {
  reactRoot.value && reactRoot.value.unmount();
  reactRoot.value = null;
});
</script>
<style scoped>
.mfed-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
