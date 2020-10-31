<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}</span>
      <a href="https://bawse.life" target="_blank">Bawse</a>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Developed By</span>
      <a href="https://dedezigners.com" target="_blank">DeDezigners</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
