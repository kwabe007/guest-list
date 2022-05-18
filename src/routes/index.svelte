<script>
  const SAMPLE_GUEST_DATA = [
    {name: "Lárus Aemilianus", isChecked: false},
    {name: "Finees Milana", isChecked: false},
    {name: "Mandla Atalanta", isChecked: true},
  ]
</script>

<main class="max-w-5xl mx-auto">
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
      border-bottom: 1px solid $secondary-color;
    }

    td, th {
      padding: 16px;
    }
  }
</style>