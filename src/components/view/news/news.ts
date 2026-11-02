import './news.css';
import { IArticle } from '../../../types';

class News {
    public draw(data: IArticle[]): void {
        const news: IArticle[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('Template #newsItemTemp not found');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItem = newsClone.querySelector<HTMLElement>('.news__item');

            if (idx % 2 && newsItem) {
                newsItem.classList.add('alt');
            }

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photo) {
                photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (author) {
                author.textContent = item.author || item.source.name;
            }

            const date = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (date) {
                date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const title = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (title) {
                title.textContent = item.title;
            }

            const source = newsClone.querySelector<HTMLElement>('.news__description-source');
            if (source) {
                source.textContent = item.source.name;
            }

            const content = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (content) {
                content.textContent = item.description;
            }

            const readMore = newsClone.querySelector<HTMLAnchorElement>('.news__read-more a');
            if (readMore) {
                readMore.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector<HTMLElement>('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
