import { writable } from 'svelte/store';

const General = writable({
    userName:"guest",
    mode:"create",
});

export default General;