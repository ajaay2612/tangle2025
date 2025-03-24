<script>
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import PostData from '$lib/stores/PostData';


    $: postData = PostData;

    function handlePost() {
        console.log($postData);
        window.parent.postMessage({
            type: 'setPostData',
            data: { postdata: $postData }
        }, '*');
    }

</script>

<div class="z-[599] fixed top-0 left-0 px-1em w-full ">
    <div class="flex justify-between items-center  p-1em">
        <button on:click={()=>$CurrentFrame = "home"}
        class="py-[0.4em] block tanButton">
            Back
        </button>
        {#if $postData.canPost}
            <button on:click={handlePost}
            class="py-[0.4em] block tanButton">
                post
            </button>
        {/if}
    </div>

</div>