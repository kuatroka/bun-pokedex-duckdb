<script lang="ts">
	import Monster from "../pokemons/Monster.svelte";
    import { count, doubleCount } from "$lib/stores";

    // $: doubleCount = $count * 2;

</script>

<p>
    Count is: {$count}
    Double is: {$doubleCount}
</p>
<button on:click={() => $count++}>++</button>
<!-- <button on:click={() => count.set($count + 1)}>++</button> -->

<button on:click={() => $count += 1}>+=</button>
<!-- <button on:click={() => count.update( c => c + 1)}>++ with function</button> -->
<button on:click={() => $count = $count +1}> +1</button>
