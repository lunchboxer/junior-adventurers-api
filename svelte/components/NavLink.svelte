<script>
  import { location } from 'svelte-spa-router'

  export let url = ''
  export let label = ''
</script>

<a href="#/{url}" class:active={$location === '/' + url}>{label}</a>

<style>
  a {
    float: left;
    clear: left;
    width: auto;
    transition-property: font-size, margin, padding;
    transition-duration: 0.5s;
    text-decoration: none;
    font-size: 2.8rem;
    font-weight: 200;
    color: white;
    padding: 0.8rem 2rem;
    margin: 0.5rem 0;
    background: rgba(0, 0, 0, 0.6);
  }
  a:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  a.active {
    background-color: var(--primary-color);
    color: var(--color-on-primary);
  }
 @media (min-width:400px) {
     a {
        font-size: 3rem;
     }
 }
</style>
