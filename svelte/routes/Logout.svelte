<script>
  import { onMount } from 'svelte'
  import { pop, push } from 'svelte-spa-router'
  import { notifications } from '../components/notifications'
  import { auth } from '../data/auth'

  async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  onMount(async () => {
    if (!$auth.token) {
      notifications.add({
        text: 'Cannot log out. User not logged in.',
        type: 'danger',
      })
      pop()
      return
    }
    const email = await auth.logout()
    notifications.add({ text: `Logged out user ${email}`, type: 'success' })
    await wait(1500)
    push('/')
  })
</script>

<div class="center">
  <h2>See you next time!</h2>
</div>

<style>
  .center {
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h2 {
    font-size: 4.2rem;
  }
</style>
