<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit';
  import type {Guest} from "../types";

  const RESPONSE_REDIRECT = {redirect: '/login', status: 302};

  export const load: Load = async ({fetch, session}) => {
    if (!session?.user) return RESPONSE_REDIRECT;
    const user = session.user;

    const res = await fetch('/guests.json');

    if (res.ok) {
      const guestArray = await res.json();
      const guestMap = guestArray.reduce((map, guest) => {
        map.set(guest.id, guest);
        return map;
      }, new Map<string, Guest>())
      return {
        props: {guests: guestMap, user}
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
  import Icon from "@iconify/svelte";
  import Dropdown from "../lib/components/Dropdown.svelte";
  import {session} from "$app/stores";
  import {onMount} from "svelte";

  export let guests: Map<string, Guest>;
  $session; // We subscribe to the session before it is used in logout;
  let searchString;
  let searchResults;
  let fuse; // TODO: Update fuse list on guests change
  let filteredGuests;
  $: {
    if (!searchResults) {
      filteredGuests = Array.from(guests.values());
    } else {
      filteredGuests = searchResults.map((res) => guests.get(res.item.id));
    }
  }

  onMount(async () => {
    const options = {
      includeScore: true,
      keys: ['name'],
      threshold: 0.4
    }
    fuse = new Fuse<Guest>(Array.from(guests.values()), options);
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

    guests = new Map(guests).set(clickedGuest.id, { ...clickedGuest, isCheckedIn: true });
  }

  function handleSearchInput() {
    searchResults = searchString ? fuse.search(searchString) : undefined;
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
    guests = new Map(guests).set(uncheckedGuest.id, { ...uncheckedGuest, isCheckedIn: false });
  }
</script>

<main class="max-w-5xl mx-auto">
  <input
    class="search mb-4"
    bind:value={searchString}
    on:input={handleSearchInput}
    id="searchGuestName"
    type="text"
    placeholder="Enter name to search for"
  />

  <div class="logout-button-container">
    <button class="logout-button" on:click={handleLogoutClick}>Logout</button>
  </div>

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

  .search {
    width: 100%;
    height: 4rem;
    padding: 0 1rem;
  }

  .logout-button-container {
    display: flex;
    flex-direction: row;
    justify-content: right;
    padding-right: 1rem;
  }

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