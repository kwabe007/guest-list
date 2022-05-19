<script>
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
  import { goto } from "$app/navigation";
  import { login } from "$lib/firebase";

  let email = '';
  let password = '';

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password).then((userCredentials) => {
      console.log(userCredentials);
    })
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