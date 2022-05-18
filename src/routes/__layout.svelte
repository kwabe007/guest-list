<script>
  import "../app.scss";
  import { onMount } from "svelte";
  import { initializeApp } from "firebase/app";

  onMount(() => {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCWjP6GA2ef8YVOkMDekuFWrNqi6kio-wE",
      authDomain: "ritmo-guest-list.firebaseapp.com",
      projectId: "ritmo-guest-list",
      storageBucket: "ritmo-guest-list.appspot.com",
      messagingSenderId: "682562677876",
      appId: "1:682562677876:web:a88aa5d38c28afc088f521"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
  })
</script>

<slot/>