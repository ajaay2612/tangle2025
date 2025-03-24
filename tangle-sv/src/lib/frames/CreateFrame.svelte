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
<div class="w-[85%] h-[calc(100%-4.5em)] pb-2em mt-[4.5em] overflow-auto mx-auto">

    <div class="space-y-[0.5em]">
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
    </div>

</div>