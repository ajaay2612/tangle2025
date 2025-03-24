<script>
    import CurrentFrame from "$lib/stores/CurrentFrame";
    
    let allButtons = [
        {name: 'create', to: 'create'},
        {name: 'How To Play', to: 'howToPlay'},
    ]

</script>

<div class="flex flex-col justify-center gap-3hem items-center">
    <!-- <div class=" w-full">
        <img class="w-full h-full object-contain block" src="/images/intro.webp" alt="">
    </div> -->

    <div class="space-y-[0.5em]">
        {#each allButtons as {name, to}}
            <button on:click={()=>$CurrentFrame = to} 
            class="py-[0.2em] block tanButton">
                {name}
            </button>
        {/each}
    </div>
</div>