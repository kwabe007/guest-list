<script context="module" lang="ts">
  import type {Load} from '@sveltejs/kit';

  export const load: Load = ({session}) => {
    if (session.user) return {redirect: '/', status: 302};

    return { status: 200 };
  }
</script>

<script>
  import { login } from "$lib/auth";
  import { setUser } from "$lib/stores/user";
  import { goto } from "$app/navigation";
  import { session } from "$app/stores";

  let email = '';
  let password = '';
  // let sessionValue = $session;

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await login(email, password);
    setUser(user);
    await goto('/');
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