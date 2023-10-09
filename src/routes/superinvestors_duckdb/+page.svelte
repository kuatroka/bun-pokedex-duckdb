<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    export let data : PageData;

    let form = {
        searchString: ''
    };
    let searchString = '';
    $: selectedCusip = data.entries_cusip.filter((d) =>  { 
        return d.name_of_issuer.toLowerCase().includes(searchString.toLowerCase())});


    $: cusipId = $page.url.searchParams.get('cusipId') || '';
    $: cusip = data.entries_cusip.find((d) => d.cusip === cusipId);
    $: cusipId2 = $page.url.searchParams.get('cusipId2') || '';
    $: cusip2 = data.entries_cusip.find((d) => d.cusip === cusipId2);

    $: selectedQuarter = $page.url.searchParams.get('quarter') || '';

    const updateSearchParams = (key: string, value: string) => {
        const searchParams = new URLSearchParams($page.url.searchParams);
        searchParams.set(key, value);
        goto(`?${searchParams.toString()}`);
        };

        const submitSearch = (e: Event) => {
        searchString = form.searchString
    };


$: {console.log('console.log for searchparams', $page.url.searchParams.get('cusipId2'))}

</script>
<!-- <h1>{cusipId}</h1>
<h1>{cusip?.name_of_issuer}</h1>
<h1>{cusipId2}</h1>
<h1>{cusip2?.name_of_issuer}</h1> -->


<!-- {$page.url.searchParams.get('cusipId')} -->

<!-- {JSON.stringify(Object.keys(data), null, 2)} -->

<div class="quarters">
  <button
  class='quarter'
  class:active={selectedQuarter === 'all'}
  on:click={() => updateSearchParams('quarter', 'last')}
  >Last
</button>
{#each data.entries_cik as entry (entry.quarter)}
    <button
    class='quarter'
    class:active={selectedQuarter === entry.quarter.toString()}
    on:click={() => updateSearchParams('quarter', entry.quarter.toString())}
    >{entry.quarter}
    </button>
{/each}
</div>

<form class="search-form" on:submit|preventDefault={submitSearch}>
  <input class="search-field" type="text" bind:value={form.searchString} placeholder="Search cusip"/>
  <input type="submit" value="Search">
  </form>
  
<div class="cusips">
{#each selectedCusip as entry (entry.cusip)}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="cusip">
        <div on:click={() => updateSearchParams('cusipId', entry.cusip)}>
            <div class="cusip-content">
                {entry.name_of_issuer}<br>
            </div>
            <div class="cusip-id">
            {entry.cusip}
            </div>
            <div class="cusip-quarter">
              {entry.quarter}
              </div>
          </div>
            <br>
        </div>
    {/each}
  </div>
    
    
    <style>
        .quarters {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    
        .quarter {
            width: 100px;
            margin: 5px;
            /* margin: auto; */
            padding: 5px 10px;
            border: 1px solid black;
            background-color: #f9f9f9;
            color: steelblue;
            align-items: center;
            text-align: center;
        }
        .quarter:hover {
            background-color: #eee;
        }
    
        .cusips {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }
    
.cusip {
  width: 100px;
  /* border: 1px solid black; */
  margin: 10px;
  padding: 10px;
  position: relative;
  background-color: #eee;
  overflow: hidden;
}

.cusip:hover {
  background-color: #ddd; 
}

.cusip-id {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 0.8em;
  color: #aaa;
}

.cusip-quarter {
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 0.8em;
  color: steelblue;
}

.cusip-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
.cusip {
  width: 100px;
  /* border: 1px solid black; */
  margin: 10px;
  padding: 10px;
  position: relative;
  background-color: #eee;
  overflow: auto;
}

.cusip:hover {
  background-color: #ddd; 
}

.cusip-id {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 0.8em;
  color: #aaa;
}

.cusip-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
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