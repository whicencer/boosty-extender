const allPosts = document.querySelectorAll('.Post_header_GeZlc');
const feed = document.querySelector('.Feed_feed_vmBqX');
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes[0]) {
            if(mutation.addedNodes[0].classList.contains('Feed_itemWrap_B5r5i')) {
                const postHeader = mutation.addedNodes[0].querySelector('.Post_header_GeZlc');
                createDownloadButton(postHeader);
            }
        }
    });
});

// Download
observer.observe(feed, { childList: true });
function createDownloadButton(post) {
    setTimeout(() => {
        const player = post.parentNode.querySelector('.VideoPlayer_player_R3Y_R');
        if (player !== null) {
            const downloadButton = document.createElement('button');
            downloadButton.innerText = 'Download video';
            downloadButton.classList.add('button');
            downloadButton.onclick = () => setTimeout(() => {
                const video = player.firstChild.shadowRoot.querySelector('video');
                const videoLink = video.getAttribute('src')
                videoLink !== null ? window.open(videoLink, '_blank') : alert('Для начала запустите видео');
            }, 200);

            post.parentNode.insertBefore(downloadButton, post);
        }
    }, 200);
}

allPosts.forEach(post => {
    createDownloadButton(post);
});