import {
	writable
} from 'svelte/store';

const ShowLoader = writable(false);

export default ShowLoader;