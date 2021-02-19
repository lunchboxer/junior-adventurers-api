import NotFound from './NotFound.svelte'
import Students from './Students.svelte'
import UOI from './UOI.svelte'
import Handbook from './Handbook.svelte'
import Schedule from './Schedule.svelte'
import Home from './Home.svelte'
import Login from './Login.svelte'
import Logout from './Logout.svelte'
import Settings from './Settings.svelte'

export default {
  // Catch-all, must be last
  '/': Home,
  '/students': Students,
  '/uoi': UOI,
  '/handbook': Handbook,
  '/schedule': Schedule,
  '/login': Login,
  '/logout': Logout,
  '/settings': Settings,
  '*': NotFound,
}
