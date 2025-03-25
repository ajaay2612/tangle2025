<script>
    import General from "$lib/stores/General";

    export let leaderBoard , showLeaderboard;

    $: userRank = leaderBoard && leaderBoard.length > 0 
    ? leaderBoard.find(item => item.username === $General.userName) || `${{
        "username": $General.userName,
        "doneTime": "-",
        "rank": "-"
    }}`
    : {
        "username": $General.userName,
        "doneTime": "-",
        "rank": "-"
    };

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div on:click|self={()=>showLeaderboard= false} class="w-[90%] h-[calc(85vh-4em)] mt-4em mx-auto text-[0.9em] xsm:text-[0.55em]  ">
        
    <div class="overflow-hidden bg-tert rounded-[0.3em] text-[1.38em] font-primary flex flex-col h-full justify-between">
        <div class="">
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="relative capitalize text-[1.45em] flex justify-center py-[0.3em] border-b items-center px-[1.4em] mb-[0.5em]">
                leaderBoard
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <div on:click={()=> showLeaderboard = false} class=" p-[0.5em] absolute top-[0.3em] right-[0.2em] cursor-pointer w-[1.5em]">
                    <svg viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8L93 93" stroke="black" stroke-width="22"/>
                        <path d="M8.00002 93L93 8" stroke="black" stroke-width="22"/>
                    </svg>
                </div>
            </div>


            {#if leaderBoard && leaderBoard.length > 0}
                <!-- <div class=" flex border-t border-pickem-main-bg justify-between px-[1.5em] py-[0.3em]">
                    <h2  class=" flex-[1] text-center">Rank</h2>
                    <h2 class=" flex-[5]">Username</h2>
                    <h2 class=" flex-[1] text-center">Time</h2>
                </div> -->
                {#each leaderBoard.slice(0,5) as item}
                    <div class:activeRank={item.rank == userRank.rank} class=" text-[0.9em] flex justify-between px-[1.5em] py-[0.7em] ">
                        <p class=" flex-[1] text-center">{item.rank}</p>
                        <p class=" flex-[5]">{item.username}</p>
                        <p class=" flex-[1] text-center">{item.doneTime}</p>
                    </div>
                {/each}
            {:else}
                <div class=" flex border-t border-pickem-main-bg justify-between px-[1.5em] py-[0.5em]">
                    <h2 class="text-center w-full">
                        
                        
                        <!-- {#if loading}
                            Loading...
                        {:else} -->
                            No data
                        <!-- {/if} -->
                    
                    </h2>
                </div>
            {/if}
        </div>


        <div class="">
            {#if userRank && userRank.rank > 5}
                <div class=" ">
                    <div class="text-[0.9em] flex justify-between px-[1.5em] py-[0.4em] border-t-[0.2em] border-pickem-main-bg">
                        <p class="flex-[1] text-center">{userRank.rank}</p>
                        <p class="flex-[5]">{userRank.username}</p>
                        <p class="flex-[1] text-center">{userRank.doneTime}</p>
                    </div>
                </div>
            {/if}
            <!-- <div class=" border-pickem-main-bg border-t">
                <div class="text-[0.75em] uppercase font-inter-italic font-bold flex justify-center px-[1.5em] py-[0.4em] ">
                    <p class="">total votes: <span class="ml-0hem">{leaderBoard?.length || 0}</span></p>
                </div>
            </div> -->
        </div>


    </div>

    
</div>
