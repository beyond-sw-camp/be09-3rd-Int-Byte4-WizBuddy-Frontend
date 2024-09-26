<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 IntByte</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  background-color: #3A4E8B;
  padding: 10px;
  text-align: center;
  color: white;
  /* 콘텐츠가 적을 때도 화면 하단에 배치되도록 수정 */
  position: relative; /* absolute에서 relative로 변경 */
  bottom: 0;
  width: 100%;
}

.footer-content p {
  margin: 0;
}
</style>
