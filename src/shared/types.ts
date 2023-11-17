export type Tasks = {
  projectName: string;
  projectId: string;
  projectTasks: Array<Task>;
};

export type Comment = {
  id: string;
  author: string;
  comment: string;
  replies: Array<Comment> | null;
  parent?: string;
};

export type Task = {
  taskId: string;
  title: string;
  description: string;
  time: {
    create: {
      ms: number | Date;
      time: string;
      date: string;
    };
    development: {
      ms: number | Date;
      timeInDev: number;
      time: string;
      date: string;
    };
    done: {
      ms: number | Date;
      time: string;
      date: string;
    };
  };
  priority: 'High' | 'Mid' | 'Low';
  files: Array<{ objectURL: string; name: string }> | null;
  status: 'Queue' | 'Development' | 'Done';
  subTasks: Array<Task> | null;
  comments: Array<Comment> | null;
};

export type Project = {
  id: string;
  name: string;
};

export type Projects = Array<Project> | [];

export type RootState = {
  projects: Projects;
  tasks: Array<Tasks>;
  filter: Tasks['projectTasks'];
  upperLayer: {
    isOpen: boolean;
  };
};
