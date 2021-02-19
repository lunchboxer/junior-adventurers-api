<script>
  import { onMount } from 'svelte'
  import { pop, push } from 'svelte-spa-router'
  import { auth } from '../data/auth'
  import { notifications } from '../components/notifications'
  import Input from '../components/Input.svelte'
  import Loading, { loading } from '../components/Loading.svelte'
  import Error from '../components/Error.svelte'

  let userCount = 0
  let signupForm
  let loginForm
  let formLoading = false
  let signupSubmit
  let loginSubmit
  let name = ''
  let password = ''
  let email = ''
  let errors = ''
  let show = false

  loading.set(true)

  onMount(async () => {
    if ($auth.token) {
      notifications.add({ text: 'Already logged in.', type: 'danger' })
      pop()
      return
    }
    try {
      userCount = await auth.getUserCount()
    } catch (error) {
      errors = error
    } finally {
      loading.set(false)
      show = true
    }
  })

  const login = async () => {
    const isValid = loginForm.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger',
      })
      return
    }
    formLoading = true
    loginSubmit.diabled = true
    try {
      await auth.login(email, password)
      notifications.add({
        text: `Logged in wih email: ${email}`,
        type: 'success',
      })
      push('/')
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Something went wrong. Could not log in.',
        type: 'danger',
      })
      loginSubmit.disabled = false
    } finally {
      formLoading = false
    }
  }
  const signup = async () => {
    const isValid = signupForm.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger',
      })
      return
    }
    formLoading = true
    signupSubmit.diabled = true
    try {
      await auth.createUser(name, email, password)
      notifications.add({
        text: `Created a new user account with email: ${email}`,
        type: 'success',
      })
      push('/')
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Something went wrong. Could not create new account.',
        type: 'danger',
      })
      signupSubmit.disabled = false
    } finally {
      formLoading = false
    }
  }

  const reset = () => {
    password = ''
    email = ''
    pop()
  }
</script>

<Loading what="User count"/>

<div class="hider" class:show>

  {#if userCount === 0}

    <h2>Sign up</h2>
    <p>It looks like you are the first user in the system</p>

    <Error {errors} />

    <form
      bind:this={signupForm}
      novalidate
      on:submit|preventDefault={signup}
      on:reset|preventDefault={reset}
    >
      <Input label="Name" bind:value={name} autocomplete="name" />
      <Input
        label="Email"
        type="email"
        bind:value={email}
        required
        autocomplete="username"
      />

      <Input
        label="Password"
        type="password"
        bind:value={password}
        required
        autocomplete="new-password"
      />
      <button type="reset" class="button-outline">Cancel</button>
      <button
        type="submit"
        bind:this={signupSubmit}
        class:is-loading={formLoading}>Sign up</button
      >
    </form>
  
  {:else}

    <h2>Log in</h2>

    <Error {errors} />

    <form
      bind:this={loginForm}
      novalidate
      on:submit|preventDefault={login}
      on:reset|preventDefault={reset}
    >
      <Input
        label="Email"
        bind:value={email}
        required
        disabled={formLoading}
        autocomplete="username"
      />
      <Input
        label="Password"
        bind:value={password}
        required
        disabled={formLoading}
        type="password"
        autocomplete="current-password"
      />
      <button type="reset" class="button-outline">Cancel</button>
      <button
        type="submit"
        bind:this={loginSubmit}
        class:is-loading={formLoading}>Log in</button
      >
    </form>
  {/if}
</div>

<style>
  .hider {
    opacity: 0;
    transition: opacity 1s;
  }
  .hider.show {
    opacity: 100%;
  }
</style>
