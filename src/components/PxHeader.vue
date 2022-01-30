<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="https://www.nous.com.co/" target="_blank">
            <img 
                class="logo"
                src="@/assets/img/logo.png" 
                alt="logo nous marketing"
            />
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link exact class="nav-link" :to="{ name: 'clients' }">Clientes</router-link>
                </li>
                <li class="nav-item">
                    <router-link exact class="nav-link" :to="{ name: 'covid-history' }">Historial de covid</router-link>
                </li>
            </ul>
        </div>
    </nav>
  </div>
</template>

<script>

export default {
    name: "PxHeader"
}
</script>

<style>
    .logo {
        width: 8rem;
    }

    nav a.router-link-exact-active, a.router-link-active {
        color: black !important;
        font-weight: 500;
    }
</style>