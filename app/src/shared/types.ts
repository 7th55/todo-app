
export type Project = {
  id: string;
  name: string;
};

export type Projects = Array<Project> | [];

export type RootState = {
  projects: Projects;
};
