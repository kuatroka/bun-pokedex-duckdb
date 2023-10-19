<script lang="ts">
    import type { PageData } from './$types';
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import type { IndexMonster } from "./+page";
    import { generations } from "./generations";    
    import Monster from "./Monster.svelte";
    import { browser } from '$app/environment';
    import { count } from "$lib/stores";
    export let data: PageData;

    let form = {
        searchString: ''
    };
    let searchString = '';
    $: selectedMonsters = data.monsters.filter((monster) =>  { 
        return monster.name.toLowerCase().includes(searchString.toLowerCase())});

    $: selectedGenerationId = $page.url.searchParams.get('generation_id') || '';

    const updateSearchParams = (key: string, value: string) => {
        const searchParams = new URLSearchParams($page.url.searchParams);
        searchParams.set(key, value);
        goto(`?${searchParams.toString()}`);
        };

    const submitSearch = (e: Event) => {
        searchString = form.searchString
    };


    // $: console.log($page.url.searchParams.get('monsterId'))
</script>


<div class="generations">
    <!-- button that adds to count -->
    <button 
        class='generation'
        on:click={() => $count += 1}
        >Add to Count {$count}
    </button>
    <button
        class='generation'
        class:active={selectedGenerationId === 'all'}
        on:click={() => updateSearchParams('generation_id', 'all')}
        >All
    </button>
{#each generations as generation (generation.id)}
    <button 
        class='generation'
        class:active={selectedGenerationId === generation.id.toString()}
        on:click={() => updateSearchParams('generation_id', generation.id.toString())}
        >
        {generation.main_region}
    </button>
{/each}
</div>

<form class="search-form" on:submit|preventDefault={submitSearch}>
<input class="search-field" type="text" bind:value={form.searchString} placeholder="Pokemon Name"/>
<input type="submit" value="Search">
</form>

<div class="monsters">
{#each selectedMonsters as monster (monster.id)}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
    <Monster monster={monster} />
{/each}
</div>


<style>
    .generations {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .generation {
        margin: 10px;
        padding: 5px 10px;
        border: 1px solid black;
        background-color: #f9f9f9;
        color: #333;
        cursor: pointer;
    }
    .generation.active {
        background-color: #333;     
        color: #fff
    }
    .generation:hover {
        background-color: #eee;
    }

    .generation.active:hover {
        background-color: #444;
    }
    .monsters {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }


.search-form {
    display: flex;
    justify-content: center;
    margin: 20px 0;

}

.search-form input[type='text'] {
    padding: 5px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    width: 200px;
}

.search-form input[type='submit'] {
    padding: 5px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
    margin-left: 10px;
}



</style>





