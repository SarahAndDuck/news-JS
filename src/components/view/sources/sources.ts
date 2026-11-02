import './sources.css';
import { ISource } from '../../../types';

class Sources {
    public draw(data: Pick<ISource, 'id' | 'name'>[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error('Template #sourceItemTemp not found');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameEl = sourceClone.querySelector<HTMLElement>('.source__item-name');
            if (nameEl) {
                nameEl.textContent = item.name;
            }

            const itemEl = sourceClone.querySelector<HTMLElement>('.source__item');
            if (itemEl && item.id) {
                itemEl.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector<HTMLElement>('.sources');
        if (sourcesContainer) {
            sourcesContainer.append(fragment);
        }
    }
}

export default Sources;
