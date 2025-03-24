export function addImage() {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            window.removeEventListener('message', handleMessage);
            reject(new Error('Image upload timed out after 60 seconds'));
        }, 60000);

        const handleMessage = (ev) => {
            const { type, data } = ev.data;

            if (type === 'devvit-message') {
                const { message } = data;

                if (message.type === 'imageUploaded') {
                    console.log('Image uploaded:', message.data.imageUrl);

                    const checkImageUrl = async () => {
                        try {
                            const response = await fetch(message.data.imageUrl);
                            if (response.status === 404) {
                                setTimeout(checkImageUrl, 500);
                            } else {
                                console.log('Image exists:', message.data.imageUrl);
                                clearTimeout(timeout);
                                window.removeEventListener('message', handleMessage);
                                resolve(message.data.imageUrl);
                            }
                        } catch (error) {
                            console.error('Error checking image URL:', error);
                            setTimeout(checkImageUrl, 500);
                        }
                    };

                    checkImageUrl();
                }
            }
        };

        window.addEventListener('message', handleMessage);

        console.log('Adding image...');
        window.parent.postMessage({
            type: 'addImage'
        }, '*');
    });
}