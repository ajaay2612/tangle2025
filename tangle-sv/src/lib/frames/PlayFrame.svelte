<script>
    import Header from "$lib/components/Header.svelte";
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import PostData from "$lib/stores/PostData";

    import { checkTangleMatch } from "$lib/utils/checkTangleMatch";

    import { onMount } from "svelte";

    let initialTangle = []

    onMount(() => {
        initialTangle = $PostData.tangle;
    });

   

    function removeMatchedGroupFromShoeCards(group) {
        // Flatten all remaining cards
        const remainingCards = shoeCardsData.flat().filter(cell => !group.includes(cell));

        // Recreate 4-item groups
        shoeCardsData = [];
        for (let i = 0; i < remainingCards.length; i += 4) {
            shoeCardsData.push(remainingCards.slice(i, i + 4));
        }

    }

    function checkMatch(group, tangle) {
        if (group.length > 4) {
            alert("You can only select 4 cards at a time");
            return;
        }

        if (group.length < 4) {
            alert("You must select 4 cards");
            return;
        }

        // console.log(group);

        setTimeout(() => {
            const result = checkTangleMatch(group, tangle);
            // console.log(result);

            if (result.matched) {
                alert(`You have matched the group with ${result.title}`);

                doneCards = [...doneCards, {data: group, title: result.title}];
                // Remove matched group from shoe cards
                removeMatchedGroupFromShoeCards(group);
                
            } else {
                alert("No match found");
            }

            setTimeout(() => {
                if(shoeCardsData.length === 1){
                    doneCards = [...doneCards, {data: shoeCardsData[0], title: "joker"}];
                    removeMatchedGroupFromShoeCards(shoeCardsData[0]);
                    alert("You have matched all groups");
                    $PostData.doneTangle = doneCards;
                    console.log(JSON.stringify(doneCards));
                    $CurrentFrame = "done";
                }  
            }, 500);

            deselectAll();
        }, 500);
    }

    function shuffleTangleData(tangle, data=false) {
        // Combine all data from non-Joker rows
        let allData = [];
        if (data) {
            allData = tangle.flatMap((row) => row.data);
        }else{
            allData = tangle.flat();
        }

        // Fisher-Yates (Knuth) shuffle algorithm
        for (let i = allData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allData[i], allData[j]] = [allData[j], allData[i]];
        }

        // Create 4x4 groups
        const groups = [];
        for (let i = 0; i < allData.length; i += 4) {
            groups.push(allData.slice(i, i + 4));
        }

        shoeCardsData = groups;
        deselectAll()
    }

    function deselectAll() {
        currentGroup = [];
    }

    let shoeCardsData = [];
    let currentGroup = [];
    let doneCards = [];


    onMount(() => {
        shuffleTangleData(initialTangle, true) ;
        // console.log(shoeCardsData);
    });


  
</script>

<Header />
<div
    class="w-[85%] h-[calc(100%-4.5em)] pb-2em mt-[4.5em] overflow-auto mx-auto"
>
    <!-- <div class="space-y-[0.5em]">
        {#each tangle as row, i}

            <div class="relative bg-[#f0f0f0] space-y-[0.5em] p-[0.5em]">
                <p class="absolute top-[1em] right-1hem ">group {i+1 == 5? "joker" : i+1 }</p>
                
                {#if i != tangle.length-1}
                    <input type="text" placeholder="title" bind:value={row.title} class="focus-within:outline-none border-b-2 px-[0.4em] p-[0.3em]"/>
                {:else}
                    <p class="px-[0.4em] text-left p-[0.3em]">joker words</p>
                {/if}
                
                <div class="grid grid-cols-2 xsm:grid-cols-4 gap-[0.5em]">
                    {#each row.data as cell, j}
                        <input type="text" bind:value={cell} class="focus-within:outline-none border-2 px-[0.4em] text-center p-[0.3em]"/>
                    {/each}
                </div>
            </div>


        {/each}
    </div> -->
    <div class="space-y-[0.5em] p-[0.5em]">
        {#if doneCards?.length > 0}
            <div class="bg-red-100 space-y-[0.5em] p-[0.5em]">
                {#each doneCards as row, i}
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


        {#each shoeCardsData as row, i}
            <div class="relative space-y-[0.5em]">
                <div class="grid grid-cols-2 xsm:grid-cols-4 gap-[0.5em]">
                    {#each row as cell, j}
                        <button
                            on:click={() => {
                                if (currentGroup.includes(cell)) {
                                    currentGroup = currentGroup.filter(
                                        (item) => item !== cell,
                                    );
                                } else {
                                    currentGroup = [...currentGroup, cell];
                                }
                            }}
                            class:activeGroup={currentGroup.includes(cell)}
                            class="focus-within:outline-none border-2 px-[0.4em] text-center p-[0.3em]"
                        >
                            {cell}
                        </button>
                    {/each}
                </div>
            </div>
        {/each}
    </div>

    <div class="flex justify-center gap-0hem mt-1em">
        <button
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
        </button>
    </div>
</div>
