import HomePage from "./pages/HomePage";
import {EPISODE_ROUTE, HOME_ROUTE} from "./utils/consts";
import EpisodePage from "./pages/EpisodePage";


export interface Route {
  path: string;
  component: () => JSX.Element
}

export const routes: Route[] = [
  {path: HOME_ROUTE, component: HomePage},
  {path: EPISODE_ROUTE + '/:id', component: EpisodePage},
]