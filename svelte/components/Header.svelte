<script>
  import { location } from 'svelte-spa-router'
  import { fly } from 'svelte/transition'
  import { auth } from '../data/auth'
  import NavLink from './NavLink.svelte'

  let shownav = false
  const toggleMenu = () => {
    shownav = !shownav
  }
</script>

<header>
  <h1 class="centered">
    <a href="/#/">
        <span class="title">Junior Adventurers</span><span class="subtitle">'20-21</span
      >
    </a>
  </h1>

  {#if $location !== '/'}
    <div class="menu-button" on:click={toggleMenu}>
      {#if !shownav}
        ☰
      {:else}
        ✕
      {/if}
    </div>
  {/if}
</header>

{#if $location === '/' || shownav}
  <nav
    class="menu"
    class:home={$location === '/'}
    on:click={() => {
      shownav = false
    }}
    transition:fly={{ x: -200, duration: 200 }}
  >
    <NavLink url="students" label="Students" />
    <NavLink url="uoi" label="Units of Inquiry" />
    <NavLink url="handbook" label="Handbook" />
    <NavLink url="schedule" label="Schedule" />
    {#if $auth && $auth.token}
      <NavLink url="logout" label="Log out" />
    {/if}
    {#if $auth && !$auth.token}
      <NavLink url="login" label="Login" />
    {/if}
    <NavLink url="settings" label="Settings" />
  </nav>
{/if}

<style>
  nav {
    z-index: 99;
    position: absolute;
    top: 7rem;
    left: 0;
    text-align: center;
  }
 .title{
     padding-right: 1rem;
 }
  .subtitle {
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
  }
  .menu-button {
    cursor: pointer;
    align-self: center;
    background: transparent;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 2rem;
    font-weight: 200;
    line-height: 1.1;
    color: var(--header-color);
  }
  header {
    z-index: 99;
    padding: 0.2rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    text-align: left;
    background: var(--header-bg);
    color: var(--header-color);
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  }
  h1 {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    font-size: 2rem;
    color: var(--header-color);
    padding: 1rem 0.5rem;
    margin: 0;
    flex-grow: 1;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
 @media (min-width:400px) {
     h1 {
         font-size: 2.5rem;
     }
 }
  @media (min-width: 640px) {
    h1 {
        font-size: 3rem;
    }
    .menu-button {
      font-size: 2.5rem;
    }
    .subtitle {
      font-size: 1.6rem;
    }
  }
</style>
