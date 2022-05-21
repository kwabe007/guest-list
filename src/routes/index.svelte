<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit';

  const RESPONSE_REDIRECT = {redirect: '/login', status: 302};

  export const load: Load = ({session}) => {
    if (!session?.user) return RESPONSE_REDIRECT;

    return {
      props: {
        user: session.user,
      },
      status: 200
    };
  }
</script>

<script>
  import { logOut } from "../lib/auth.js";
  import { goto } from "$app/navigation";

  const SAMPLE_GUEST_DATA = [
    {name: "Lárus Aemilianus", isChecked: false},
    {name: "Finees Milana", isChecked: false},
    {name: "Mandla Atalanta", isChecked: true},
  ]

  export let user;

  async function handleClickLogout() {
    await logOut();
    await goto('/login');
  }

</script>

<main class="max-w-5xl mx-auto">
  <p>Welcome, {user.email} <button on:click={handleClickLogout}>Logout</button></p>
  <table class="guest-list">
    <tr>
      <th>Name</th>
      <th>Mark</th>
    </tr>
    {#each SAMPLE_GUEST_DATA as guest}
      <tr>
        <td>{guest.name}</td>
        <td>{guest.isChecked}</td>
      </tr>
    {/each}
  </table>
</main>

<style type="text/scss">
  @import "../styles/colors";

  .guest-list {
    border-collapse: collapse;
    width: 100%;

    th {
      text-align: left;
    }

    tr {
      border-bottom: 1px solid $text-secondary;
    }

    td, th {
      padding: 16px;
    }
  }
</style>