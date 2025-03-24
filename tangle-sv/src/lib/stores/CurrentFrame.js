import { writable } from 'svelte/store';

const CurrentFrame = writable("play");

export default CurrentFrame;