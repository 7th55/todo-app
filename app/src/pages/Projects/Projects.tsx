// Hooks
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// Components
import { Project as ProjectFeature } from 'features/Project';
// Lib
import { createId } from 'shared/lib';

export const Projects = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  return (
    <section>
      <h1>Projects</h1>
      <ProjectFeature />
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Project Name"
      />
      <button
        onClick={() => {
          dispatch({
            type: 'project/CREATE_PROJECT',
            payload: { id: createId(), name },
          });
        }}
      >
        Create Project
      </button>
    </section>
  );
};
