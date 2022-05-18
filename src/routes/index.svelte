<script>
  const SAMPLE_GUEST_DATA = [
    {name: "Lárus Aemilianus", isChecked: false},
    {name: "Finees Milana", isChecked: false},
    {name: "Mandla Atalanta", isChecked: true},
  ]
</script>

<h1 class="mb-4">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p class="secondary">Secondary</p>
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

<style type="text/scss">
  @import "../styles/colors";

  .guest-list {
      border-collapse: collapse;

      tr {
        padding: 16px 0;
          border-bottom: 1px solid $secondary-color;
      }

    td {
      padding: 16px;
    }
  }
</style>