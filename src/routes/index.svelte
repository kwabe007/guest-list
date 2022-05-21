<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit';

  const RESPONSE_REDIRECT = {redirect: '/login', status: 302};

  export const load: Load = async ({ fetch, session}) => {
    if (!session?.user) return RESPONSE_REDIRECT;
    const user = session.user;

    const res = await fetch('/guests');

    if (res.ok) {
      const guests = await res.json();
      return {
        props: { guests, user }
      };
    }

    const { message } = await res.json();
    return {
      error: new Error(message)
    };
  }
</script>

<script lang="ts">
  import { logOut } from "../lib/auth.js";
  import { goto } from "$app/navigation";
  import type { Guest, User } from "../types";

  export let user: User;
  export let guests: Guest[];

  async function handleClickLogout() {
    await logOut();
    await goto('/login');
  }

  async function handleClickCheckIn(guest: Guest) {
    await fetch(
      `/guests/${guest.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ checkedIn: true }),
        headers: { 'Content-Type': 'application/json'},
      },
    );
  }
</script>

<main class="max-w-5xl mx-auto">
  <p>Welcome, {user.email} <button on:click={handleClickLogout}>Logout</button></p>
  <table class="guest-list">
    <tr>
      <th>Name</th>
      <th>Mark</th>
    </tr>
    {#each guests as guest}
      <tr>
        <td>{guest.name}</td>
        <td><button on:click={() => handleClickCheckIn(guest)} class="button button--primary">Check in</button></td>
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

  .button {

  }
</style>