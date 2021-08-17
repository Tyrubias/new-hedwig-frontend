import { BrowserRouter as Router, useRoutes } from 'react-router-dom';

import { Routes as RoutesArray } from '@hedwig/components/Routes';
import { ProvideAuth } from '@hedwig/hooks';
import { GlobalFonts } from '@hedwig/shared/fonts.styles';

const App = (): JSX.Element => {
  const routes = useRoutes(RoutesArray);

  return (
    <>
      <GlobalFonts />
      <Router>
        <ProvideAuth>{routes}</ProvideAuth>
      </Router>
    </>
  );
};

export default App;
