const allPosts = document.querySelectorAll('.Post_header_GeZlc');
const feed = document.querySelector('.Feed_feed_vmBqX');
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.addedNodes[0]) {
            if(mutation.addedNodes[0].classList.contains('Feed_itemWrap_B5r5i')) {
                const postHeader = mutation.addedNodes[0].querySelector('.Post_header_GeZlc');
                createDownloadButton(postHeader);
                createFavouriteButton(postHeader);
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
            downloadButton.innerText = 'Скачать видео';
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

// Favourite
const storage = chrome.storage;
let favourites = [];
let createFavouriteButton = () => {};
storage.local.get('favourites').then(data => {
    favourites = data.favourites;
    createFavouriteButton = (post) => {
        let currentLink = post.querySelector('a')?.getAttribute('href') || window.location.href.replace('https://boosty.to', '');
        currentLink = 'boosty.to'+currentLink;
        let currentTitle = post.parentNode.querySelector('.Post_title_G2QHp');
        const favouriteButton = document.createElement('button');
        if (favourites.filter(favPost => favPost.link === currentLink).length > 0) {
            favouriteButton.innerText = 'Удалить из избранного';
        } else {
            favouriteButton.innerText = 'Добавить в избранное';
        }
        favouriteButton.classList.add('button');
        favouriteButton.onclick = () => {
            // check if link is already in favourites
            if (favourites.filter(favPost => favPost.link === currentLink).length > 0) {
                favourites = favourites.filter(post => post.link !== currentLink);
                favouriteButton.innerText = 'Добавить в избранное';
                storage.local.set({ favourites });
            } else {
                if (currentTitle === null)
                    currentTitle = post.parentNode.querySelector('.PostSubscriptionBlock_title_WXCN0');
                favourites.push({ title: currentTitle.innerHTML, link: currentLink });
                favouriteButton.innerText = 'Удалить из избранного';
                storage.local.set({ favourites });
            }
        }
        post.parentNode.insertBefore(favouriteButton, post);
    }

    allPosts.forEach(post => {
        createDownloadButton(post);
        createFavouriteButton(post);
    });
});