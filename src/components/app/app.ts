import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IArticlesResponse, ISourcesResponse } from '../../types';

class App {
    private controller: AppController;

    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement = document.querySelector('.sources');

        if (!sourcesElement) {
            throw new Error('Element .sources not found');
        }

        sourcesElement.addEventListener('click', (e) => {
            this.controller.getNews(e as MouseEvent, (data: IArticlesResponse) => this.view.drawNews(data));
        });

        this.controller.getSources((data: ISourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
