<script>
    import LeaderBoard from "$lib/stores/LeaderBoard";
    import LeaderBoardTable from "./LeaderBoardTable.svelte";
    
    export let showLeaderboard = false;

</script>
    
    
<LeaderBoardTable 
bind:leaderBoard={$LeaderBoard} 
bind:showLeaderboard={showLeaderboard} />
