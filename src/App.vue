<template>
  <div id="app">
    <b-container>
      <h1>
        <router-link to="/">Directory</router-link>
      </h1>

      <router-view/>

    </b-container>
  </div>
</template>

<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter {
  transform: translateX(-278px);
}

.fade-leave-to {
  transform: translateX(278px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms, transform 200ms;
}
.fade-leave-active {
  position: absolute;
}
</style>
