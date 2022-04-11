const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const webNameEl = document.getElementById('website-name');
const webUrlEl = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarkArray = [];


// show modal
const showModal = () => {
    modal.classList.add('show-modal');
    webNameEl.focus();
}

// event listener show modal
modalShow.addEventListener('click', showModal);
// close modal 
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'))
window.addEventListener('click', (e) => e.target === modal ? modal.classList.remove('show-modal') : false)

// build finally bookmark
const buildBookmark = () => {
    bookmarksContainer.textContent = '';
    bookmarkArray.forEach((bookmark) => {
        const { name, url } = bookmark;
        console.log(name, url)
        const item = document.createElement('div');
        item.classList.add('item');
        //close icon
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'delete-button');
        closeIcon.setAttribute('onclick', `deleteURL('${url}')`);
        // Favicon/link Container
        const linkInfo = document.createElement('div');
        linkInfo.classList.add('name');
        const image = document.createElement('img');
        image.setAttribute('src', `https://www.google.com/s2/favicons?domain=${url}`)
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`)
        link.setAttribute('target', '_blank');
        link.textContent = name;
        linkInfo.append(image, link);
        item.append(closeIcon, linkInfo)
        bookmarksContainer.appendChild(item);

    })
}

// delete book mark
function deleteURL(url) {
    bookmarkArray.forEach((bookmark, i) => {
        if (bookmark.url === url) {
            bookmarkArray.splice(i, 1)
        }
    })
    console.log(bookmarkArray)
    // update book mark array in localStorage
    localStorage.setItem('bookmark', JSON.stringify(bookmarkArray));
    fetchBookmarks()
}

//fetch data bookmark
const fetchBookmarks = () => {
    if (localStorage.getItem('bookmark')) {
        bookmarkArray = JSON.parse(localStorage.getItem('bookmark'))
    }
    buildBookmark();
}


// store user input
const storeBookmark = (e) => {
    e.preventDefault();
    let nameValue = webNameEl.value;
    let urlValue = webUrlEl.value;
    if (!urlValue.includes('https://')) {
        urlValue = `https://${urlValue}`
    }
    //validate url
    if (!validate(nameValue, urlValue)) {
        return false
    }
    let bookmark = {
        name: nameValue,
        url: urlValue
    }
    bookmarkArray.push(bookmark);
    // save user input in database
    localStorage.setItem('bookmark', JSON.stringify(bookmarkArray))
    fetchBookmarks()
    // renew
    bookmarkForm.reset();
    webNameEl.focus()
}

// valid data
const validate = (nameValue, urlValue) => {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('please enter 2 field');
        return false
    }
    if (!urlValue.match(regex)) {
        alert('please make it as website');
        return false
    }
    return true;

}

// event for submit data
bookmarkForm.addEventListener('submit', storeBookmark)