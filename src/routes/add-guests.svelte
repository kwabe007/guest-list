<script lang="ts">
  let newGuestsRawText: string;

  async function handleSubmit(e) {
    e.preventDefault();

    const newGuests = newGuestsRawText.split('\n');
    const res = await fetch(
      `/guests.json`,
      {
        method: 'POST',
        body: JSON.stringify(newGuests),
        headers: {'Content-Type': 'application/json'},
      },
    );
  }

</script>


<main>
  <form class="text-center" on:submit={handleSubmit}>
    <textarea class="guests-textarea" bind:value={newGuestsRawText}></textarea>
    <button class="button button--primary">Submit</button>
  </form>
</main>

<style type="text/scss">
  @import "src/styles/colors";

  .guests-textarea {
    color: $input-text-primary;
    height: 15rem;
    width: 100%;
    padding: 1rem;
  }
</style>