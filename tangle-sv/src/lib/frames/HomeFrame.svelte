<script>
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import { fade, scale } from "svelte/transition";
    import Logo from "../components/Logo.svelte";
    let allButtons = [
        {name: 'create', to: 'create'},
        {name: 'How To Play', to: 'howToPlay'},
    ]

    let showHowToPlay

    function playNext(){
        window.parent.postMessage({
            type: 'playNext'
        }, '*');
    }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if showHowToPlay}
    <div transition:fade on:click={()=> showHowToPlay = false} class="fixed z-10 w-full h-screen flex justify-center items-center">
        <div transition:scale={{start:0.7}} class="space-y-[1.2em] text-[0.85em] p-[1.8em]  bg-tert w-[90%] h-auto">
            <p>You’ll see 16 words on the screen. Your goal is to group 12 of them into three categories of four words each. But watch out, <span class="text-[#E30000]">four Joker words</span> don’t fit into any category!</p>
        
            <p>Tap on four words that belong together. If you're correct, the category locks in. Keep going until you’ve found all three categories. Your time is recorded, so solve it as quickly as you can!</p>
        
            <p>Find the connections, avoid the Jokers, and untangle the puzzle!</p>
        </div>
    </div>
{/if}

<div class="text-[0.95em] flex flex-col justify-center gap-2em items-center">
    <div class="space-y-[0.4em]">
        <Logo/>
        <p class="font-montserrat-italic font-normal italic text-[0.8em]">Find the patterns. Untangle the trickery.</p>
    </div>
    <div class="space-y-[0.6em]">
        <div class="flex justify-center gap-[0.6em]">
            <button on:click={playNext}
            class="tanButton cursor-pointer rounded-[0.66em] bg-tert w-[6em] gap-[0.45em] flex flex-col justify-center items-center aspect-[1] ">
                
                <div class="w-[2em]">
                    <svg viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="19" cy="19" r="19" fill="white"/>
                        <path d="M27.4647 17.63L14.5972 10.3384C14.3306 10.1873 14 10.3799 14 10.6864V26.3136C14 26.6201 14.3305 26.8127 14.5972 26.6616L27.4647 19.37C28.1407 18.987 28.1407 18.013 27.4647 17.63Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                    
                </div>
                <p class="text-[0.9em]">play</p>
            </button>
            <button on:click={()=>$CurrentFrame = "create"}
            class="tanButton cursor-pointer rounded-[0.66em] bg-[#ffffff] border-2 border-tert w-[6em] gap-[0.45em] flex flex-col justify-center items-center aspect-[1] ">
                
                <div class="w-[2em]">
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="19" cy="19" r="19" fill="#C6FFA0"/>
                        <path d="M19 26L19 12" stroke="black" stroke-width="2" stroke-linecap="round"/>
                        <path d="M12 19H26" stroke="black" stroke-width="2" stroke-linecap="round"/>
                    </svg>  
                </div>
                <p class="text-[0.9em]">create</p>
            </button>
        </div>
        
        <button on:click={()=>{showHowToPlay = true}}
        class="tanButton cursor-pointer w-full py-[0.5em] rounded-[0.66em] bg-[#ffffff] border-2 border-tert">
            <p class="text-[0.9em]">How to play</p>
        </button>
    </div>

    <!-- <div class="space-y-[0.5em]">
        {#each allButtons as {name, to}}
            <button on:click={()=>$CurrentFrame = to} 
            class="py-[0.2em] block tanButton">
                {name}
            </button>
        {/each}
    </div> -->
</div>