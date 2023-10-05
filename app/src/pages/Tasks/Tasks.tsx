// Hooks
import { useProject } from 'features/Project/model/projectReducer';
import { useParams } from 'react-router-dom';
// Components
import { Link } from 'react-router-dom';
import { Projects } from 'shared/types';

export const Tasks = () => {
  const { projectName } = useParams();
  const projects = useProject() as Projects;
  const project = projects.find((proj) => proj.name === projectName);

  return (
    <section>
      <h1>Tasks Page</h1>
      <nav>
        <Link to="/">Back To Projects</Link>
      </nav>
      {<h3>Project Name: {project?.name}</h3>}
      {<h3>Project ID: {project?.id}</h3>}
    </section>
  );
};
