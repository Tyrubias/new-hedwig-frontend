import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from '@hedwig/components/Routes';
import { ProvideAuth } from '@hedwig/hooks';
import { GlobalFonts } from '@hedwig/shared/fonts.styles';

const App = (): JSX.Element => {
  return (
    <>
      <GlobalFonts />
      <Router>
        <ProvideAuth>
          <AppRoutes />
        </ProvideAuth>
      </Router>
    </>
  );
};

export default App;
