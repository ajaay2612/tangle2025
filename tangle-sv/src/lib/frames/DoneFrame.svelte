<script>
    import Header from "$lib/components/Header.svelte";
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import PostData from "$lib/stores/PostData";




  
</script>

<Header />
<div
    class="w-[85%] h-[calc(100%-4.5em)] pb-2em mt-[4.5em] overflow-auto mx-auto"
>
    <div class="space-y-[0.5em] p-[0.5em]">
        {#if $PostData?.doneTangle?.length > 0}
            <div class="bg-red-100 space-y-[0.5em] p-[0.5em]">               
                {#each $PostData?.doneTangle as row, i}
                    <div class="relative space-y-[0.5em]">
                        <p>{row.title}</p>
                        <div class="grid grid-cols-2 xsm:grid-cols-4 gap-[0.5em]">
                            {#each row.data as cell, j}
                                <button
                                    class="focus-within:outline-none border-2 px-[0.4em] text-center p-[0.3em]"
                                >
                                    {cell}
                                </button>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    <div class="flex justify-center gap-0hem mt-1em">
        <!-- <button
            on:click={()=> shuffleTangleData(shoeCardsData) }
            class="focus-within:outline-none border-2 px-[0.4em] text-center p-[0.3em]"
        >
            shuffle
        </button>
        <button
            on:click={deselectAll}
            class="focus-within:outline-none border-2 px-[0.4em] text-center p-[0.3em]"
        >
            deselect all
        </button>
        <button
            on:click={()=> checkMatch(currentGroup, initialTangle)}
            class="focus-within:outline-none border-2 px-[0.4em] text-center p-[0.3em]"
        >
            submit
        </button> -->
    </div>
</div>
