<script>
    import CurrentFrame from "$lib/stores/CurrentFrame";
    import PostData from '$lib/stores/PostData';
    import Logo from "../components/Logo.svelte";

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
        <div class="text-[0.5em]"><Logo/></div>

        <div class="text-[0.9em] flex justify-center items-center gap-[0.5em]">
            <button on:click={()=>$CurrentFrame = "home"}
            class="border border-black rounded-full py-[0.2em] px-[1.18em] block font-montserrat font-normal">
                <p class="text-[0.55em]">Back</p>
            </button>

            <button
            disabled={!$postData.canPost}
            on:click={handlePost}
            class="border border-black disabled:opacity-50 bg-black text-white rounded-full py-[0.2em] px-[1.18em] block font-montserrat font-normal">
                <p class="text-[0.55em]">Post</p>
            </button>
        </div>
    </div>

</div>