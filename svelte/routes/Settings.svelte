<script>
 import { theme } from '../components/themes/ThemeLoader.svelte'
</script>

<h2>Settings</h2>
<p>Change your personal settings for experiencing the site.</p>

<h3>Light/Dark Mode</h3>
<p>Currently using {$theme} theme.</p>
<button on:click={theme.toggle}>Toggle theme</button>
