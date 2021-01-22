<template>
  <transition name="fade">
    <div
      class="modal"
      @touchmove.prevent.stop
      @click="$emit('click', $event)"
    />
  </transition>
</template>
<script>
export default {
  name: 'modal',
  props: {
    visible: Boolean,
  },
};
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition:  0.2s ease-out;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 2000;
}
</style>
