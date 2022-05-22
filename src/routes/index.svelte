<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit';

  const RESPONSE_REDIRECT = {redirect: '/login', status: 302};

  export const load: Load = async ({fetch, session}) => {
    if (!session?.user) return RESPONSE_REDIRECT;
    const user = session.user;

    const res = await fetch('/guests.json');

    if (res.ok) {
      const guests = await res.json();
      return {
        props: {guests, user}
      };
    }

    const {message} = await res.json();
    return {
      error: new Error(message)
    };
  }
</script>

<script lang="ts">
  import {logOut} from "../lib/auth.js";
  import {goto} from "$app/navigation";
  import type {Guest, User} from "../types";
  import Icon from "@iconify/svelte";
  import Dropdown from "../lib/components/Dropdown.svelte";

  export let user: User;
  export let guests: Guest[];

  async function handleClickLogout() {
    await logOut();
    await goto('/login');
  }

  async function handleClickCheckIn(clickedGuest: Guest) {
    await fetch(
      `/guests/${clickedGuest.id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({isCheckedIn: true}),
        headers: {'Content-Type': 'application/json'},
      },
    );
    guests = guests.map((guest) => {
      if (guest.id === clickedGuest.id) {
        return {...clickedGuest, isCheckedIn: true};
      } else {
        return guest;
      }
    })
  }

  async function handleUncheck(uncheckedGuest: Guest) {
    await fetch(
      `/guests/${uncheckedGuest.id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({isCheckedIn: false}),
        headers: {'Content-Type': 'application/json'},
      },
    );
    guests = guests.map((guest) => {
      if (guest.id === uncheckedGuest.id) {
        return {...uncheckedGuest, isCheckedIn: false};
      } else {
        return guest;
      }
    })
  }
</script>

<main class="max-w-5xl mx-auto">
  <p>Welcome, {user.email}
    <button on:click={handleClickLogout}>Logout</button>
  </p>
  <table class="guest-list">
    <tr>
      <th class="text-left">Name</th>
      <th>Status</th>
    </tr>
    {#each guests as guest}
      <tr>
        <td>{guest.name}</td>
        <td>
          {#if !guest.isCheckedIn}
            <button on:click={() => handleClickCheckIn(guest)} class="button button--primary">Check in</button>
          {:else}
            <span class="check-icon"> <Icon class="mx-auto" icon="ic:baseline-check"/> </span>
          {/if}
        </td>
        <td class="text-center">
          <Dropdown isCheckedIn={guest.isCheckedIn} onUncheck={() => handleUncheck(guest)}/>
        </td>
      </tr>
    {/each}
  </table>
</main>

<style type="text/scss">
  @import "../styles/colors";

  .guest-list {
    border-collapse: collapse;
    width: 100%;

    tr {
      border-bottom: 1px solid $text-secondary;
    }

    td, th {
      padding: 16px;
    }
  }

  .check-icon {
    color: green;
  }

  .button {

  }
</style>