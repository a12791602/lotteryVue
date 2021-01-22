<template>
  <transition name="actionsheet-float" v-show='value'>
    <div class="actionsheet" :class="{ 'actionsheet_title': title }" v-show='value'>
      <div class="actionsheet-header" v-if="title">
        <div v-text="title" />
        <i class="iconfont icon-cuo" @click.stop="$emit('hide', false)" />
      </div>
      <ul v-if="!title" class="actionsheet-list">
        <li v-for="(item, index) in actions" :key="index" class="actionsheet-item hairline--top" :class="[item.className, { 'actionsheet-item-loading': item.loading }]" @click.stop="onClickItem(item)">
          <template>
            <span class="actionsheet-name">{{ item.name }}</span>
            <span class="actionsheet-subname" v-if="item.subname">{{ item.subname }}</span>
          </template>
        </li>
      </ul>
      <div v-if="cancelText" v-text="cancelText" class="actionsheet-item actionsheet-cancel" @click.stop="$emit('hide', false)" />
      <div v-else class="actionsheet-content">
        <slot />
      </div>
    </div>
  </transition>
</template>
<script>
import Modal from "./Modal";
import Vue from "vue";
export default {
  name: "actionsheet",
  props: {
    value: Boolean,
    title: String,
    cancelText: String,
    actions: {
      type: Array,
      default: () => []
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(val) {
      this.update();
    }
  },
  beforeDestroy() {
    let modal = document.querySelector(".modal");
    if (modal) {
      document.body.removeChild(modal);
    }
  },
  methods: {
    update() {
      let tmp=document.querySelector(".modal");
      if (!tmp) {
        let modal = new (Vue.extend(Modal))({
          el: document.createElement("div")
        });
        modal.$on("click", this.onClick);
        const actionsheet=document.querySelector(".actionsheet");
        const targetNode = actionsheet && actionsheet.parentNode && actionsheet.parentNode.nodeType !== 11 ? actionsheet.parentNode : document.body;
        targetNode.appendChild(modal.$el);
      }
      document.querySelector(".modal").style.display = this.value
        ? "block"
        : "none";
    },
    onClick() {
      this.$emit("hide", false);
    },
    onClickItem(item) {
      if (typeof item.callback === "function") {
        item.callback(item);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.actionsheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  color: #333;
  padding: 0 !important;
  background-color: #f8f8f8;
  z-index: 2001;
  transition: 0.2s ease-out;
  &-float-enter,
  &-float-leave-active {
    transform: translateY(100%);
  }
  &-withtitle {
    background-color: white;
  }

  &-item {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    background-color: white;

    &:active {
      background-color: #e8e8e8;
    }
  }

  &-subname {
    font-size: 12px;
    color: #666;
    margin-left: 5px;
  }

  &-loading {
    display: inline-block;
  }

  &-cancel {
    margin-top: 10px;
  }
  &-header {
    line-height: 44px;
    text-align: center;
    position: relative;
    & .iconfont {
      top: 0;
      right: 0;
      padding: 0 0.4rem;
      font-size: 0.48rem;
      color: #999;
      position: absolute;
      line-height: inherit;
    }
  }
}
[class*="hairline"] {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e5e5e5;
    border-top-width: 0.026667rem;
  }
}
</style>
