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
  import Fuse from "fuse.js";
  import type {Guest, User} from "../types";
  import Icon from "@iconify/svelte";
  import Dropdown from "../lib/components/Dropdown.svelte";
  import {session} from "$app/stores";
  import {onMount} from "svelte";

  export let user: User;
  export let guests: Guest[];
  $session; // We subscribe to the session before it is used in logout;
  let searchString;
  let searchResults;
  let fuse; // TODO: Update fuse list on guests change
  $: filteredGuests = guests.filter((guest) => {
    if (!searchString || !searchResults) return true;

    return searchResults.map((res) => res.item.id).includes(guest.id);
  })

  onMount(async () => {
    const options = {
      includeScore: true,
      keys: ['name'],
    }
    fuse = new Fuse(guests, options);
  });

  async function handleLogoutClick() {
    await logOut();
    await goto('/login');
  }

  async function handleCheckInClick(clickedGuest: Guest) {
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

  function handleSearchInput() {
    searchResults = fuse.search(searchString);
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
  <input bind:value={searchString} on:input={handleSearchInput} class="mb-4" id="searchGuestName" type="text"/>
  <div>
    {searchResults}
  </div>

  <p>Welcome, {user.email}
    <button on:click={handleLogoutClick}>Logout</button>
  </p>
  <table class="guest-list">
    <colgroup>
      <col style="width: 45%;">
      <col style="width: 45%;">
      <col style="width: 10%;">
    </colgroup>
    <tr>
      <th class="text-left pl-4">Name</th>
      <th>Status</th>
    </tr>
    {#each filteredGuests as guest}
      <tr>
        <td class="text-left pl-4">{guest.name}</td>
        <td class="text-center">
          {#if !guest.isCheckedIn}
            <button on:click={() => handleCheckInClick(guest)} class="button button--primary">Check in</button>
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
      height: 4rem;
    }

    td, th {
    }
  }

  .check-icon {
    color: green;
  }

  .button {

  }
</style>