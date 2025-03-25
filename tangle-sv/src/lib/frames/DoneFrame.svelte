<script>
    import HeaderDone from "$lib/components/HeaderDone.svelte";
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import PostData from "$lib/stores/PostData";


    function playNext(){
        window.parent.postMessage({
            type: 'playNext'
        }, '*');
    }

  
</script>

<HeaderDone />
<!-- <div
    class="w-[85%] h-[calc(100%-4.5em)] pb-2em mt-[4.5em] overflow-auto mx-auto"
>
    <div class="space-y-[0.5em] p-[0.5em]">

        <div class="flex justify-center mb-4">
            <p class="text-2xl font-bold">{$PostData?.doneTime}</p>
        </div>

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
</div> -->



<div class="w-[70%] flex justify-center items-center h-full  mx-auto">


    <div class="space-y-[0.8em] mt-1em w-full">
        {#if !$PostData.isCreator}
            <div class="text-center   text-[0.62em]">
                <p class="font-normal  font-montserrat-italic">Solved In </p>
                <p class="font-medium font-montserrat ">{$PostData?.doneTime}</p>
            </div>
        {/if}
        <div class="text-[0.6em] space-y-[0.5em] p-[0.5em]">
            {#if $PostData?.doneTangle?.length  > 0}
                <div 
                class="space-y-[0.5em]">
                    {#each $PostData?.doneTangle as row, i}
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
                                {row?.data?.join(", ")}
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}          
        </div>
        <div class="flex justify-center gap-0hem mt-1em">
            <button
                on:click={()=> $CurrentFrame = "create"}
                class=" monotonButton cursor-pointer border border-black rounded-full py-[0.2em] px-[1.18em] block font-montserrat font-normal"
                >
                <p class="text-[0.55em] capitalize">Create a Tangle</p>
            </button>
            <button
                on:click={playNext}
                class=" monotonButton cursor-pointer border border-black rounded-full py-[0.2em] px-[1.18em] block font-montserrat font-normal"
            >
                <p class="text-[0.55em] capitalize">play another tangle</p>
            </button>
        </div> 
    </div>
</div>