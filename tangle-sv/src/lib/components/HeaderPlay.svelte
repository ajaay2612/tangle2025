<script>
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import PostData from '$lib/stores/PostData';

</script>

<div class="z-[599] fixed top-0 left-0 px-1em w-full ">
    <div class="flex justify-between items-center  p-1em">
        <button on:click={()=>$CurrentFrame = "home"}
        class="py-[0.4em] block tanButton">
            Back
        </button>
   
    </div>

</div>