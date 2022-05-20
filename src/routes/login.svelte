<script>
  import { login } from "$lib/auth";
  import { setUser } from "$lib/stores/user";
  import { goto } from "$app/navigation";

  let email = '';
  let password = '';

  async function handleSubmit(e) {
    e.preventDefault();
    const userInfo = await login(email, password).then((userCredentials) => {
      console.log(userCredentials);
    })
    setUser(userInfo);
    goto('/');
  }
</script>

<main>
  <div class="form-container">
  <h1>Login</h1>
  <form on:submit={handleSubmit}>
    <label for="email">Email</label>
    <input bind:value={email} class="mb-4" id="email" type="text">
    <label for="password">Password</label>
    <input bind:value={password} class="mb-8" id="password" type="password">
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