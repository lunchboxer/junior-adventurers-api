<script>
  export let errors = ''
  const getMessage = (errors) => {
    if (!errors) return false
    return (Array.isArray(errors))
      ? errors.map(error => error.message).join('\n')
      : (!errors.message ? errors : errors.message)
  }
</script>

<style>
  .error {
    color: #ff5555;
  }
  .error strong {
    color: inherit;
  }
</style>

{#if getMessage(errors)}
<p class="error">
    <span class="error-message"><strong>Error:</strong>&nbsp;{getMessage(errors)}</span>
</p>
{/if}
