<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit';

  export const load: Load = ({session}) => {
    if (!session?.user) return {redirect: '/login', status: 302};
    return {
      props: {
        user: session.user,
      },
      status: 200
    };
  }
</script>

<script>
  const SAMPLE_GUEST_DATA = [
    {name: "Lárus Aemilianus", isChecked: false},
    {name: "Finees Milana", isChecked: false},
    {name: "Mandla Atalanta", isChecked: true},
  ]

  export let user;
</script>

<main class="max-w-5xl mx-auto">
  <p>Welcome, {user.email}</p>
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