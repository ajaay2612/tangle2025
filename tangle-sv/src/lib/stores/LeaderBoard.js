import { writable } from 'svelte/store';

const LeaderBoard = writable([
    { username: 'Ordinary-Jello-4342', doneTime: '00:21', rank: 1 },
    { username: 'guest-42', doneTime: '00:s1', rank: 2 },
    { username: 'guest', doneTime: '00:12', rank: 3 },
    { username: 'Ordnary-42', doneTime: '00:s1', rank: 4 },
    { username: 'Ordo-4342', doneTime: '00:12', rank: 5 },
    { username: 'gueast', doneTime: '00:s1', rank: 6 },
    { username: 'Ordo-4342', doneTime: '00:12', rank: 7 },
]);
// const LeaderBoard = writable([]);

export default LeaderBoard;