<script>
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import PostData from '$lib/stores/PostData';
    import { fade, scale } from "svelte/transition";
    import Logo from "../components/Logo.svelte";
    
    import LeaderBoard from "./leaderBoard.svelte";
    import { cubicOut } from "svelte/easing";
    let showLeaderboard = false;
    function toggleLeaderboard() {
        showLeaderboard = !showLeaderboard;
    }
    function closeLeaderBoard(){
        showLeaderboard = false
    }
</script>


<div class="pointer-events-none z-[599] fixed top-0 left-0 px-1em w-full ">
    <div class="flex justify-between items-center  p-1em">
        <div class="text-[0.5em]"><Logo/></div>

        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button on:click={toggleLeaderboard}
        class="text-[1.2em] pointer-events-auto py-[0.4em] block tanButton">
            <div class="w-[1.5em]">
                <svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21" cy="21" r="21" fill="#C6FFA0"/>
                    <path d="M26 31H16" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M21.75 29C21.75 29.4142 21.4142 29.75 21 29.75C20.5858 29.75 20.25 29.4142 20.25 29H21.75ZM20.25 29V26H21.75V29H20.25Z" fill="black"/>
                    <path d="M19 19H23" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M13.5 24C13.5 24 11 22.3125 11 19.5C11 18.7493 11 18.0788 11 17.4991C11 17.035 11 16.803 11.0384 16.6098C11.1962 15.8164 11.8164 15.1962 12.6098 15.0384C12.803 15 13.0353 15 13.5 15V15C13.9647 15 14.197 15 14.3902 15.0384C15.1836 15.1962 15.8038 15.8164 15.9616 16.6098C16 16.803 16 17.0353 16 17.5V18.375" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M28.5 24C28.5 24 31 22.3125 31 19.5C31 18.7493 31 18.0788 31 17.4991C31 17.035 31 16.803 30.9616 16.6098C30.8038 15.8164 30.1836 15.1962 29.3902 15.0384C29.197 15 28.9647 15 28.5 15V15C28.0353 15 27.803 15 27.6098 15.0384C26.8164 15.1962 26.1962 15.8164 26.0384 16.6098C26 16.803 26 17.0353 26 17.5V18.375" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M26 20.5648V16C26 14.8954 25.1046 14 24 14H18C16.8954 14 16 14.8954 16 16V20.5648C16 21.9142 16.6803 23.1726 17.8094 23.9116L20.4523 25.6415C20.785 25.8593 21.215 25.8593 21.5477 25.6415L24.1906 23.9116C25.3197 23.1726 26 21.9142 26 20.5648Z" stroke="black" stroke-width="1.5"/>
                </svg>
            </div>          
        </button>
    </div>

</div>

{#if showLeaderboard}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <button on:click|self={closeLeaderBoard} transition:fade={{duration:400, easing: cubicOut}} class="z-[10] h-screen backdrop-blur-[5px] absolute left-0 top-0 w-full bg-pickem-header-bg flex justify-center items-center">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div on:click|self={closeLeaderBoard} transition:scale={{start:0.9, duration:400, easing: cubicOut}} class="w-full">
            <LeaderBoard bind:showLeaderboard={showLeaderboard}/>
        </div>
    </button>
{/if}