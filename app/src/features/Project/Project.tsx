// Hooks
import { useProject } from './model/projectReducer';
// Components
import { Link } from 'react-router-dom';

export const Project = () => {
  const projects = useProject();

  return (
    <div>
      {projects.map((project, index) => (
        <Link key={project.name} to={`/${project.name}/tasks`}>
          <p>
            {index + 1} {project.name}
          </p>
        </Link>
      ))}
    </div>
  );
};
