<script>
  import { onMount } from 'svelte';
  import { scale } from 'svelte/transition';
  import Icon from "@iconify/svelte";

  export let onDelete = () => undefined;
  export let onUncheck = () => undefined;

  let show = false; // menu state
  let menu = null; // menu wrapper DOM reference

  onMount(() => {
    const handleOutsideClick = (event) => {
      if (show && !menu.contains(event.target)) {
        show = false;
      }
    };

    const handleEscape = (event) => {
      if (show && event.key === 'Escape') {
        show = false;
      }
    };

    // add events when element is added to the DOM
    document.addEventListener('click', handleOutsideClick, false);
    document.addEventListener('keyup', handleEscape, false);

    // remove events when element is removed from the DOM
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
      document.removeEventListener('keyup', handleEscape, false);
    };
  });
</script>

<div class="relative" bind:this={menu}>
  <div>
    <button
      on:click={() => (show = !show)}
      class="menu focus:outline-none focus:shadow-solid"
    >
      <Icon icon="zondicons:dots-horizontal-triple"/>
    </button>

    {#if show}
      <div
        in:scale={{ duration: 100, start: 0.95 }}
        out:scale={{ duration: 75, start: 0.95 }}
        class="origin-top-right absolute right-0 w-48 py-2 mt-1 bg-gray-800
          rounded shadow-md z-10"
      >
        <button class="block w-full" on:click={() => {show = false; onUncheck()}}>
          <span class="block ml-auto pl-4 py-2 text-left">Uncheck</span>
        </button>
        <button class="block w-full"  on:click={() => {show = false; onDelete()}}>
          <span class="block ml-auto pl-4 py-2 text-left text-red-600">Delete</span>
        </button>
      </div>
    {/if}
  </div>
</div>