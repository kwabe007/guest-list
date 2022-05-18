<script>
</script>

<main>
  <div class="form-container">
  <h1>Login</h1>
  <form>
    <label for="email">Email</label>
    <input class="mb-4" id="email" type="text">
    <label for="password">Password</label>
    <input class="mb-8" id="password" type="password">
    <button class="mx-auto block button button--primary">Login</button>
  </form>
  </div>
</main>

<style type="text/scss">
  .form-container {
    padding-top: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {

    label, input {
      display: block;
    }
  }
</style>