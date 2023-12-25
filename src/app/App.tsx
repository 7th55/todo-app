// Routing
import { RouterProvider, createHashRouter } from 'react-router-dom';
// Store
import { Provider } from 'react-redux';
// Components
import { AnimatePresence } from 'framer-motion';
import { Projects } from 'pages/Projects';
import { Tasks } from 'pages/Tasks';
import { store } from 'app/model/store';
// Global Styles
import './index.css';
// import './normalize.css';
// import './reset.css';

const router = createHashRouter([
  {
    path: '/',
    element: <Projects />,
  },
  {
    path: '/:projectId/tasks',
    element: <Tasks />,
    errorElement: <Projects />,
  },
]);

export const App = () => {
  return (
    <div className="upperLayer" style={{ width: '100%', height: '100%' }}>
      <Provider store={store}>
        <AnimatePresence>
          <RouterProvider router={router} />
        </AnimatePresence>
      </Provider>
    </div>
  );
};
