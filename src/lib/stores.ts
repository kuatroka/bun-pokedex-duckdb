import {writable,  type Writable, derived} from "svelte/store";

export let count = writable(0);
export let doubleCount = derived(count, $count => $count * 2);

// ### store with multiple params
export let prop2 = writable(34);
export let doubleCount2 = derived([count, prop2], ([c, prop2]) => c * prop2);

import type { IndexMonster } from "../routes/pokemons/+page";

export const caughtMonsters: Writable<IndexMonster[]> = writable([]);