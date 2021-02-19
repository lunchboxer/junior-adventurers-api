<script>
  import { notifications } from './data'

  export let id
  export let message

  $: text = !message || typeof message === 'string' ? message : message.text
  $: type = !message || typeof message === 'string' ? 'info' : message.type

  const remove = () => notifications.remove(id)
</script>

<div class="notification is-{type}">
  <button class="delete" on:click={remove}> ✕ </button>
  {text}
</div>

<style>
  .notification {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    background-color: var(--primary-color);
    border-radius: 6px;
    padding: 1rem 2rem 1rem 1rem;
    min-height: 6rem;
    position: relative;
    color: var(--color-on-primary);
  }
  .delete {
    padding: 0 8px;
    border-radius: 50%;
    margin-right: 1rem;
  }
</style>
