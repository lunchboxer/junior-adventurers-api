<script context="module">
  import { writable } from 'svelte/store'

  const createLoadingStore = () => {
    const { subscribe, set } = writable(false)
    return {
      subscribe,
      set,
    }
  }
  export const loading = createLoadingStore()
</script>

<script>
  import { fade } from 'svelte/transition'

  export let what = ''
</script>

{#if $loading}
  <div transition:fade={{ duration: 200 }} class="loading">
    <div class="container">
      <p class="loading">Loading ...</p>
      <p class="what">{what}</p>
      <div class="spinny" />
    </div>
  </div>
{/if}

<style>
  .loading {
    font-size: 2rem;
      margin: 0;
  }
 p {
     font-size: 2rem;
     margin: 0;
 }
  div.loading {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
  .container {
    position: relative;
    text-align: center;
  }
  .spinny:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    margin-top: -100px;
    margin-left: -100px;
    border-radius: 50%;
    border: 4px solid var(--color-on-primary);
    border-top-color: var(--primary-color);
    animation: spinner 1s linear infinite;
  }
</style>
