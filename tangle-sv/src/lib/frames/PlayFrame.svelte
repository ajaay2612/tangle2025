<script>
    import HeaderPlay from "$lib/components/HeaderPlay.svelte";
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
                    stopTimer()
                    doneCards = [...doneCards, {data: shoeCardsData[0], title: "joker"}];
                    removeMatchedGroupFromShoeCards(shoeCardsData[0]);
                    alert("You have matched all groups");
                    $PostData.doneTangle = doneCards;
                    console.log(JSON.stringify(doneCards));
                    $PostData.doneTime = formatTime(totalTime);                    

                    window.parent.postMessage({
                        type: 'setUserPostData',
                        data: { tangle: $PostData.doneTangle, doneTime: formatTime(totalTime) }
                    }, '*');

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

        // doneCards = [{"data":["PANDA","CROSSWORD","TUXEDO","OREO"],"title":"BLACK-AND-WHITETHINGS"}];
        // shoeCardsData = []
    });



    // timer

    let timer = 0;
    let timerInterval;
    let isTimerRunning = false;
    let totalTime
    function startTimer() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            timerInterval = setInterval(() => {
                timer += 1;
            }, 1000);
        }
    }

    function stopTimer() {
        if (isTimerRunning) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            
            // Store or process the total time
            totalTime = timer;
            
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    onMount(() => {
        initialTangle = $PostData.tangle;
        shuffleTangleData(initialTangle, true);
        startTimer(); // Start timer when component mounts
    });
  
</script>

<HeaderPlay />



<div class="w-[70%] flex justify-center items-center h-full  mx-auto">


    <div class="space-y-[0.8em] mt-1em w-full">
        <div class="text-center   text-[0.62em]">
            <p class="font-medium font-montserrat ">{formatTime(timer)}</p>
            <p class="font-normal  font-montserrat-italic">Find the Three Categories and Spot the Jokers</p>
        </div>
        <div class="text-[0.6em] space-y-[0.5em] p-[0.5em]">
            {#if doneCards?.length > 0}
                <div 
                class="space-y-[0.5em]">
                    {#each doneCards as row, i}
                        <div 
                        class="
                        {i+1 == 1 ? 'bg-box-1' : i+1 == 2 ? 'bg-box-2' :  i+1 == 3 ? 'bg-box-3' : "bg-black text-white" }
                        relative text-center rounded-[0.5em] pt-[0.9em] pb-[0.9em]">
                            {#if row.title == "joker"}
                                <div class="flex justify-center items-center gap-[0.5em]">
                                    <img class="w-[1.7em] mb-[0.3em]" src="/images/joker.svg" alt="">
                                    <p>JOKER CARDS</p>
                                </div>
                            {:else}
                                <p>{row.title}</p>
                            {/if}
                            <div class="leading-[1.1em] font-normal">
                                {row.data.join(", ")}
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
                                class="transition-colors focus-within:outline-none text-[0.9em] bg-[#F2F6EF] rounded-[0.5em] w-full text-center aspect-[3/1.4]"
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
                class="cursor-pointer border border-black rounded-full py-[0.2em] px-[1.18em] block font-montserrat font-normal"
            >
                <p class="text-[0.55em] capitalize">shuffle</p>
            </button>
            <button
                on:click={deselectAll}
                class="cursor-pointer border border-black rounded-full py-[0.2em] px-[1.18em] block font-montserrat font-normal"
            >
                <p class="text-[0.55em] capitalize">deselect all</p>
            </button>
            <button
                on:click={()=> checkMatch(currentGroup, initialTangle)}
                class="cursor-pointer border bg-black text-white border-black rounded-full py-[0.2em] px-[1.18em] block font-montserrat font-normal"
            >
                <p class="text-[0.55em] capitalize">submit</p>
            </button>
        </div>
    </div>
</div>
