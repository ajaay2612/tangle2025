import './createPost.js';

import { Devvit, useState, useWebView } from '@devvit/public-api';

import type { DevvitMessage, WebViewMessage } from './message.js';

Devvit.configure({
    redditAPI: true,
    redis: true,
});

// Add a custom post type to Devvit
Devvit.addCustomPostType({
    name: 'Web View Example',
    height: 'tall',
    render: (context) => {
        // Load username with `useAsync` hook
        const [username] = useState(async () => {
            return (await context.reddit.getCurrentUsername()) ?? 'anon';
        });

        const [postData] = useState(async () => {

            let postData = JSON.parse(await context.redis.get(`postData_${context.postId}`) || "{}");

            return postData?.allPostData ||  null ;
        });

        // Load latest counter from redis with `useAsync` hook
        const [counter, setCounter] = useState(async () => {
            const redisCount = await context.redis.get(`counter_${context.postId}`);
            return Number(redisCount ?? 0);
        });

        const webView = useWebView<WebViewMessage, DevvitMessage>({
            // URL of your web view content
            url: 'index.html',

            // Handle messages sent from the web view
            async onMessage(message, webView) {
                switch (message.type) {
                    case 'setCounter':
                        await context.redis.set(
                            `counter_${context.postId}`,
                            message.data.newCounter.toString()
                        );
                        setCounter(message.data.newCounter);

                        webView.postMessage({
                            type: 'updateCounter',
                            data: {
                                currentCounter: message.data.newCounter,
                            },
                        });
                        break;

                    case 'setUserPostData':

                        async function setUserPostData() {
                            await context.redis.set(`postData_${context.postId}_${username}`, JSON.stringify({
                                doneTangle: message?.data?.tangle,
                                doneTime: message?.data?.doneTime
                            }));

                            const leaderBoard = await context.redis.get(`postData_${context.postId}_leaderBoard`)
                            let parsedLeaderBoard = leaderBoard ? JSON.parse(leaderBoard) : [];

                            parsedLeaderBoard = [...parsedLeaderBoard, {
                                username: username,
                                doneTime: message?.data?.doneTime
                            }];

                            await context.redis.set(`postData_${context.postId}_leaderBoard`, JSON.stringify(parsedLeaderBoard));


                            console.log('setUserPostData', message?.data?.tangle);

                            context.ui.showToast('Untangled!!');
                        }

                        await setUserPostData();

                        webView.postMessage({
                            type: 'refresh'
                        });

                        break;

                    case 'playNext':

                        console.log("play")
                        // async function playNext() {

                        async function playNext() {
                            let allPostIds = JSON.parse(await context.redis.get(`${(await context.reddit.getCurrentSubreddit()).name}_postIds `) || "[]") || [];

                            console.log(allPostIds)

                            if (allPostIds && allPostIds.length > 0) {

                                // Start from the last added post
                                let currentIndex = 0;

                                // Check posts from the end until finding a post not by the current user
                                while (currentIndex <= allPostIds.length - 1) {

                                    const postData = await context.redis.get(`postData_${allPostIds[currentIndex].postId}_${username}`);
                                    const parsedGameData = postData ? JSON.parse(postData) : {};

                                    let postDataTangle = parsedGameData

                                    console.log(postDataTangle)

                                    if (allPostIds[currentIndex].creator !== username && !postDataTangle?.doneTime) {
                                        // return allPostIds[currentIndex];
                                        // console.log(allPostIds[currentIndex].postId)
                                        context.ui.navigateTo(allPostIds[currentIndex].postUrl);
                                    }
                                    currentIndex++;
                                }

                            } else {
                                context.ui.showToast('No Game Found');
                            }

                        }

                        await playNext()



                        //     try {
                        //         // Get the current subreddit name
                        //         const subredditName = (await context.reddit.getCurrentSubreddit()).name;

                        //         // Fetch the post IDs for the current subreddit
                        //         const allPostIds = JSON.parse(await context.redis.get(`${subredditName}_postIds`) || "[]");

                        //         // If no posts exist, return early
                        //         if (allPostIds.length === 0) {
                        //             return null;
                        //         }

                        //         console.log(allPostIds)
                        //         return allPostIds[0]
                        //         // // Start from the last added post
                        //         // let currentIndex = allPostIds.length - 1;

                        //         // // Check posts from the end until finding a post not by the current user
                        //         // while (currentIndex >= 0) {
                        //         //     if (allPostIds[currentIndex].creator !== username) {
                        //         //         return allPostIds[currentIndex];
                        //         //     }
                        //         //     currentIndex--;
                        //         // }

                        //         // If all posts are by the current user, return null
                        //         return null;
                        //     } catch (error) {
                        //         console.error("Error in playNext:", error);
                        //         return null;
                        //     }
                        // }

                        // let nextPostData = await playNext()

                        // console.log(nextPostData)

                        // if(nextPostData){
                        //     context.ui.navigateTo(nextPostData.postUrl);   
                        // }else{
                        //     context.ui.showToast('No Game Found');
                        // }

                        break;

                    case 'setPostData':
                        // Post the app with the new data
                        const newPost = await context.reddit.submitPost({
                            title: 'Untangle the Tangle',
                            subredditName: await (await context.reddit.getCurrentSubreddit()).name,
                            preview: (
                                <vstack height="100%" width="100%" alignment="middle center">
                                    <text size="large">Loading ...</text>
                                </vstack>
                            ),
                        });
                        let postData = {
                            creator_username: username,
                            allPostData: message?.data?.postdata,
                        };

                        await context.redis.set(`postData_${newPost.id}`, JSON.stringify(postData));


                        let allPostIds = JSON.parse(await context.redis.get(`${(await context.reddit.getCurrentSubreddit()).name}_postIds `) || "[]") || [];

                        allPostIds = [...allPostIds, { creator: username, postId: newPost.id, postUrl: newPost.url }]

                        await context.redis.set(`${(await context.reddit.getCurrentSubreddit()).name}_postIds `, JSON.stringify(allPostIds));
                        console.log(allPostIds)

                        const postUrl = newPost.url;
                        webView.postMessage({
                            type: 'newPostCreated',
                            data: {
                                postId: newPost.id,
                                creator_username: username,
                                postUrl: postUrl
                            },
                        });
                        context.ui.showToast('Post Created!');

                        context.ui.navigateTo(postUrl);
                        break;
                    case 'webViewReady':
                        // await context.redis.set(`postData_${context.postId}_${username}`, JSON.stringify({}));

                        const postDataIni = await context.redis.get(`postData_${context.postId}`);
                        const parsedGameData = postDataIni ? JSON.parse(postDataIni) : {};

                        const doneGame = await context.redis.get(`postData_${context.postId}_${username}`)
                        const parsedDoneGame = doneGame ? JSON.parse(doneGame) : {};

                        const leaderBoard = await context.redis.get(`postData_${context.postId}_leaderBoard`)
                        let parsedLeaderBoard = leaderBoard ? JSON.parse(leaderBoard) : [];

                        if (parsedLeaderBoard.length > 0) {
                            function processLeaderboard() {
                                // Convert time strings to total seconds for proper comparison
                                const convertTimeToSeconds = (timeString) => {
                                    const [minutes, seconds] = timeString.split(':').map(Number);
                                    return minutes * 60 + seconds;
                                };

                                // Sort the leaderboard by converted time (ascending)
                                const sortedLeaderboard = parsedLeaderBoard.sort((a, b) =>
                                    convertTimeToSeconds(a.doneTime) - convertTimeToSeconds(b.doneTime)
                                );

                                // Map the sorted leaderboard with ranks
                                return sortedLeaderboard.map((entry, index) => ({
                                    username: entry.username,
                                    doneTime: entry.doneTime,
                                    rank: index + 1
                                }));
                            }

                            parsedLeaderBoard = processLeaderboard();

                            console.log('parsedLeaderBoard', parsedLeaderBoard);
                        }

                        webView.postMessage({
                            type: 'initialData',
                            data: {
                                username: username,
                                isCreator: parsedGameData?.creator_username === username,
                                isGameData: Object.keys(parsedGameData).length > 0,
                                postData: parsedGameData?.allPostData || {},
                                parsedDoneGame: parsedDoneGame,
                                parsedLeaderBoard: parsedLeaderBoard
                            },
                        });
                        break;
                    default:
                        throw new Error(`Unknown message type: ${message satisfies never}`);
                }
            },
            onUnmount() {
                context.ui.showToast('Web view closed!');
            },
        });

        // Render the custom post type
        return (
            <zstack width="100%" height="100%" alignment="center middle">


                <zstack width="100%" height="100%">
                
                    <hstack
                        backgroundColor="#fff"
                        width="100%"
                        height="100%"
                    />
                </zstack>

                <vstack gap="medium" grow alignment="middle center">
                    <image
                        url="intro.png"
                        // Adjust image size based on device
                        imageWidth={150}
                        imageHeight={100}
                        description="Introduction image"
                    />
                    <spacer />
                    <button
                        onPress={() => webView.mount()}
                        appearance="secondary"
                    >
                        {postData ? "Solve" : "Launch"}
                    </button>
                </vstack>
            </zstack>
        );
    },
});

export default Devvit;
