// Components
import { Button } from 'shared/UI/Button';
// Hooks
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// Lib
import { filterTasks } from './model/filterReducer';
// Types
import { Tasks } from 'shared/types';

type FilterProps = {
  tasks?: Tasks['projectTasks'];
  tasksState: Array<Tasks>;
  open: () => void;
};

export const Filter = (props: FilterProps) => {
  const { tasks, open, tasksState } = props;

  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (toggle) {
      value !== ''
        ? dispatch(
            filterTasks({
              tasks,
              title: value,
            })
          )
        : dispatch(filterTasks({}));
    }
  }, [value, dispatch, tasksState]);

  return (
    <>
      <Button
        onClickHandler={() => {
          setToggle(!toggle);
          open();
        }}
      >
        {toggle ? 'Close Filter' : 'Open Filter'}
      </Button>
      {toggle && (
        <>
          <input
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
          />
        </>
      )}
    </>
  );
};
