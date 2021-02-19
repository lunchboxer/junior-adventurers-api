<script>
  const icp = '湘ICP备20004695号-1'
</script>

<footer>
  <p>
    <span class="copy">&copy; 2021, James Smith</span>
    {#if icp}
      |
      <span class="icp">{icp}</span>
    {/if}
  </p>
</footer>

<style>
  footer {
    width: 100%;
    text-align: center;
    font-size: 1.3rem;
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
  }
  span {
    margin: 0 1rem;
  }
</style>
