<template>
  <div id="app">
    <NavBar class="mb-4"/>
    <b-container>

      <router-view/>

    </b-container>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  components: { NavBar }
};
</script>


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
