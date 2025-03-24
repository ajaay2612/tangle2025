import { writable } from 'svelte/store';

const PostData = writable({
    tangle: [{ "title": "BLACK-AND-WHITETHINGS", "data": ["CROSSWORD", "OREO", "PANDA", "TUXEDO"] }, { "title": "ANAGRAMS", "data": ["ABEL", "ABLE", "BALE", "BELA"] }, { "title": "CLEAR AS", "data": ["A BELL", "CRYSTAL", "DAY", "MUD"] }, { "title": "Joker", "data": ["joker 1", "joker 2", "joker 3", "joker 4"] }],
    doneTangle:[{"data":["PANDA","CROSSWORD","TUXEDO","OREO"],"title":"BLACK-AND-WHITETHINGS"},{"data":["BELA","BALE","ABLE","ABEL"],"title":"ANAGRAMS"},{"data":["MUD","DAY","A BELL","CRYSTAL"],"title":"CLEAR AS"},["joker 2","joker 4","joker 3","joker 1"]]
});

export default PostData;