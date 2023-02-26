const favouriteList = document.querySelector('#favourites_list');
console.log(favouriteList);
chrome.storage.local.get('favourites').then(data => {
    if (data.favourites.length === 0) {
        const h2 = document.createElement('h2');
        h2.innerText = 'У тебя нет избранных видео';
        document.body.appendChild(h2);
    }

    data.favourites.forEach(post => {
        const postTitle = document.createElement('p');

        postTitle.innerText = post.title;
        postTitle.onclick = () => {
            chrome.tabs.create({ url: `https://${post.link}` });
        };
        postTitle.style = { margin: '5px 0' };

        favouriteList.appendChild(postTitle);
    });
});