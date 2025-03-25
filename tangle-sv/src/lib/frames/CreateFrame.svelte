<script>
    import Header from "$lib/components/Header.svelte";
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import PostData from '$lib/stores/PostData';

    $: postData = PostData;

    function createTangledArrayWithTitles(rows, cols) {
        return Array.from({ length: rows }, (_, index) => ({
            title: index === rows - 1 ? 'joker' : '',
            data: Array.from({ length: cols }, () => "")
        }));
    }

    function checkCanPost() {
        const allFilled = tangle.every(row =>   
            row.title.trim() !== '' &&
            row.data.every(cell => cell.trim() !== '')
        );
        return allFilled;
        // $postData.canPost = allFilled;
    }

    let prevTangle = null
    $: if (tangle) {
        if (prevTangle !== JSON.stringify(tangle)) {
            $postData.canPost = checkCanPost();
            $postData.tangle = tangle;
            
            prevTangle = JSON.stringify(tangle);
        }
    }
    


    // Example usage
    $: tangle = createTangledArrayWithTitles(4, 4);
    $:console.log(JSON.stringify(tangle));

</script>

<Header/>
<div class="w-[90%] xsm:w-[70%] flex justify-center items-center h-full  mx-auto">

    <div class="space-y-[0.8em] mt-1em">
        <p class="text-center font-montserrat-italic font-normal italic text-[0.62em]">Craft Three Categories and a Set of Jokers</p>
        <div class="space-y-[0.5em]">
            {#each tangle as row, i}
                <div 
                class="
                {i+1 == 1 ? 'bg-box-1' : i+1 == 2 ? 'bg-box-2' :  i+1 == 3 ? 'bg-box-3' : "" }
                text-[0.6em] rounded-[0.5em] relative bg-[#ededed] space-y-[0.5em] p-[0.5em]">
        
                    {#if i != tangle.length-1}
                        <div class="w-full  font-montserrat font-bold">
                            <input type="text" placeholder="name category {i+1 == 1 ? "one" :i+1 == 2 ? "two" :i+1 == 3? "three":""  }" bind:value={row.title} class="w-full text-center block placeholder:capitalize focus-within:outline-none px-[0.4em] mx-auto p-[0.3em]"/>                        
                        </div>
                    {/if}
        
                    <div class="grid grid-cols-4 gap-[0.5em]">
                        {#each row.data as cell, j}
                            <div class="w-auto relative">
                                {#if i != tangle.length-1}
                                    {#if cell.trim() == ''}
                                        <div class="absolute top-1/2 left-1/2 -translate-1/2 w-[1em]">
                                            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 15L8 1" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                                <path d="M1 8L15 8" stroke="black" stroke-width="2" stroke-linecap="round"/>
                                            </svg>                                        
                                        </div>
                                    {/if}
                                {:else}
                                    <div class=" my-[0.5em] mx-auto w-[1.8em]">
                                        <img src="/images/joker.svg" alt="">                                    
                                    </div>                                        
                                {/if}
                                <input 
                                placeholder="{i != tangle.length-1 ? '' : 'joker'}"
                                type="text" bind:value={cell} class="aspect-square xsm:aspect-auto cardsButton focus-within:relative w-full rounded-[0.4em] focus-within:outline-none bg-[#F5F6F3] px-[0.4em] text-center p-[0.3em]"/>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>

</div>