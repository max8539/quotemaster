<script setup>
    import { ref, onMounted } from "vue";

    import * as config from "../config.js";
    import QuoteRenderer from "../components/quoteRenderer.vue"
    import Navbar from "../components/navbar.vue";

    const QUOTE = ref(null);
    const error = ref(false);

    async function getQuote () {
        QUOTE.value = null;
        error.value = false;

        let res;
        try {
            res = await fetch(`${config.API_HOST}/quotemaster/popular`);
            if (!res.ok) {
                error.value = true;
            } else {
                QUOTE.value = await res.json();
            }
        } catch {
            error.value = true;
        }
    }

    onMounted(getQuote);

</script>

<template>
    <Navbar />
    <div id="error-layover" v-if="error">
        <p>Unable to load quote.</p>
        <div class="button-container">
            <button @click="getQuote">Retry</button>
        </div>
    </div>
    <div id="quote-display" v-else>
        <QuoteRenderer :quote="QUOTE" />
        <div id="reload-button" class="button-container">
            <button @click="getQuote">Get another quote</button>
        </div>
    </div>
</template>

<style scoped>
    #error-layover {
        background-color: #ffaaaa;
        margin: auto;
        padding: 10px;
        text-align: center;
    }
    #reload-button {
        padding-top: 10px;
    }

</style>