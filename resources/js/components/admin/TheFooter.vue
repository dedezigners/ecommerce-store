<template>
  <CFooter :fixed="false">
    <div>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} All Rights Reserved.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Design &amp; Developed By</span>
      <a href="https://dedezigners.com" target="_blank">DeDezigners</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
