import AppLoader from './appLoader';
import { Endpoint, TCallback } from './loader';
import { IArticlesResponse, ISourcesResponse, TRequestParams } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: TCallback<ISourcesResponse>): void {
        super.getResp<ISourcesResponse>(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: TCallback<IArticlesResponse>): void {
        let target = e.target as HTMLElement | null;
        const newsContainer = e.currentTarget as HTMLElement | null;

        if (!target || !newsContainer) {
            return;
        }

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    const options: Partial<TRequestParams> = {
                        sources: sourceId,
                    };
                    super.getResp<IArticlesResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options,
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
