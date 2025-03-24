
<script>
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import CreateFrame from "../lib/frames/CreateFrame.svelte";
    import PlayFrame from "../lib/frames/PlayFrame.svelte";
    import DoneFrame from "../lib/frames/DoneFrame.svelte";
    import HomeFrame from "../lib/frames/HomeFrame.svelte";


</script>


<div class="bg-[url('/images/map.webp')] bg-no-repeat bg-cover flex justify-center items-center h-screen w-full">
    
    
    {#if $CurrentFrame == 'home'}
        <HomeFrame/>
    {:else if $CurrentFrame == 'create'}
        <CreateFrame/>
    {:else if $CurrentFrame == 'play'}
        <PlayFrame/>
    {:else if $CurrentFrame == 'done'}
        <DoneFrame/>

    <!-- {:else if $CurrentFrame == 'history'}
        <HistoryFrame/>
    {:else if $CurrentFrame == 'treasure'}
        <TreasureFrame/>
    {:else if $CurrentFrame == 'howToPlay'}
        <HowToPlayFrame/> -->
    {/if}


    
</div>