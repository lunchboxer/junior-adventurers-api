<script context="module">
  import { writable } from 'svelte/store'

  const createThemeStore = () => {
    const chosenTheme = window.localStorage.getItem('theme') || 'light'
    const { subscribe, update } = writable(chosenTheme)
    return {
      subscribe,
      toggle: () => {
        update(previous => {
          const newTheme = previous === 'light' ? 'dark' : 'light'
          window.localStorage.setItem('theme', newTheme)
          return newTheme
        })
      },
    }
  }
  export const theme = createThemeStore()
</script>

<script>
  import DarkTheme from './DarkTheme.svelte'
  import LightTheme from './LightTheme.svelte'
</script>

{#if $theme === 'light'}
  <LightTheme />
{/if}
{#if $theme === 'dark'}
  <DarkTheme />
{/if}
