// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const div = document.querySelector(`.gallery`);

const galleryMarkup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(images){
return images.map((img) => `<li><a class="gallery__item" href="${img.original}">
<img class="gallery__image" src="${img.preview}" alt="${img.description}" />
</a></li>`).join('')
}

div.innerHTML = galleryMarkup;


let lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });