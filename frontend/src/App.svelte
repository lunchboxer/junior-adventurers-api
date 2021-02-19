<script>
  import Router from 'svelte-spa-router'
  import { NotificationList } from './components/notifications'
  import routes from './routes'
  import Header from './components/Header.svelte'
  import ThemeLoader from './components/themes/ThemeLoader.svelte'
  import Footer from './components/Footer.svelte'

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
  }
</script>

<ThemeLoader />

<Header />

<main>
  <Router {routes} />
</main>
<Footer />

<NotificationList />

<style>
  main {
    margin: 0;
    padding: 5rem 1rem 2rem;
  }
  @media (min-width: 480px) {
    main {
      padding: 6rem 3rem 4rem;
    }
  }
</style>
