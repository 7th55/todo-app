// Routing
import { RouterProvider, createHashRouter } from 'react-router-dom';
// Store
import { Provider } from 'react-redux';
// Components
import { Projects } from 'pages/Projects';
import { Tasks } from 'pages/Tasks';
import { store } from 'app/model/store';

const router = createHashRouter([
  {
    path: '/',
    element: <Projects />,
  },
  {
    path: '/:projectName/tasks',
    element: <Tasks />,
  },
]);

export const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
