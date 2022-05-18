<script>
</script>


<main>
  <div class="form-container">
  <h1>Login</h1>
  <form>
    <label for="email">Email</label>
    <input id="email" type="text">
    <label for="password">Password</label>
    <input id="password" type="password">
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