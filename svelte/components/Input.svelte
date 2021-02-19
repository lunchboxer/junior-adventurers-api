<script>
  let input
  export let disabled = false
  export let value = ''
  export let label = ''
  let error = false
  export let required = false
  export let pattern = '^.+$'
  export let minlength = 1
  export let maxlength = ''
  export let type = 'text'
  export let description = ''
  export let max = ''
  export let placeholder = ''
  export let autocomplete = ''
  let passwordShowing = false

  $: name = label.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
  $: descriptionId = `description${name}`

  function checkValidity() {
    error =
      !input.validity.valid && input.validationMessage
        ? input.validationMessage
        : ''
  }
</script>

<label class="label" for={name}>
  {label}
  {#if description}
    <p class="help is-info" id={descriptionId}>{description}</p>
  {/if}
</label>
{#if type === 'text'}
  <input
    bind:this={input}
    {name}
    class="input"
    bind:value
    class:error
    type="text"
    {disabled}
    {pattern}
    {minlength}
    {maxlength}
    {required}
    {autocomplete}
    aria-describedby={descriptionId}
    on:input={checkValidity}
    on:invalid|preventDefault={checkValidity}
    {placeholder}
  />
{/if}
{#if type === 'password'}
  <div class="field-with-button">
    {#if passwordShowing}
      <input
        bind:this={input}
        {name}
        class="input"
        bind:value
        class:error
        type="text"
        {pattern}
        {disabled}
        {minlength}
        {maxlength}
        {required}
        {autocomplete}
        aria-describedby={descriptionId}
        on:input={checkValidity}
        on:invalid|preventDefault={checkValidity}
        {placeholder}
      />
    {:else}
      <input
        bind:this={input}
        {name}
        class="input"
        bind:value
        class:error
        type="password"
        {pattern}
        {disabled}
        {minlength}
        {maxlength}
        {required}
        {autocomplete}
        aria-describedby={descriptionId}
        on:input={checkValidity}
        on:invalid|preventDefault={checkValidity}
        {placeholder}
      />
    {/if}
    <span
      class="button button-outline button-in-input"
      on:click={() => {
        passwordShowing = !passwordShowing
      }}
    >
      {#if passwordShowing}
        hide
      {:else}
        show
      {/if}
    </span>
  </div>
{/if}
{#if type === 'date'}
  <input
    bind:this={input}
    {name}
    class="input"
    bind:value
    class:error
    {disabled}
    type="date"
    pattern="^[0-9]{4}-(1[0-2]|0[1-9])-([1-3][0-9]|0[1-9])$"
    {required}
    {max}
    aria-describedby={descriptionId}
    on:input={checkValidity}
    on:invalid|preventDefault={checkValidity}
  />
{/if}
{#if type === 'datetime-local'}
  <input
    bind:this={input}
    {name}
    class="input"
    bind:value
    class:error
    {disabled}
    type="datetime-local"
    {required}
    {max}
    aria-describedby={descriptionId}
    on:input={checkValidity}
    on:invalid|preventDefault={checkValidity}
  />
{/if}
{#if type === 'email'}
  <input
    bind:this={input}
    {name}
    class="input"
    bind:value
    class:error
    type="email"
    {disabled}
    {pattern}
    {minlength}
    {maxlength}
    {required}
    {autocomplete}
    aria-describedby={descriptionId}
    on:input={checkValidity}
    on:invalid|preventDefault={checkValidity}
    {placeholder}
  />
{/if}
{#if error}
  <p class="help is-danger">{error}</p>
{/if}

<style>
  input {
    max-width: 40rem;
  }
  .field-with-button {
    position: relative;
    max-width: 40rem;
  }
  .button-in-input {
    border-radius: 0 0.4rem 0.4rem 0;
    padding: 0 1rem;
    position: absolute;
    right: 0;
  }
</style>
