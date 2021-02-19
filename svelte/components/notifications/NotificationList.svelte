<script>
  import { fly } from 'svelte/transition'
  import NotificationItem from './NotificationItem.svelte'
  import { notifications } from './data'
</script>

{#if $notifications}
  <div class="notification-list">
    {#each Object.entries($notifications) as [id, message] (id)}
      <div transition:fly={{ x: 400 }}>
        <NotificationItem {message} {id} />
      </div>
    {/each}
  </div>
{/if}

<style>
  .notification-list {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 6rem;
    right: 0;
    margin: 0.5rem;
    width: auto;
    max-width: calc(100% - 4rem);
    z-index: 99;
  }
</style>
