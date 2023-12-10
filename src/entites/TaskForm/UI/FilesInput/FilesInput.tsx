import { useState } from 'react';
// Components
import { Button } from 'shared/UI/Button';
// Styles
import classes from './styles.module.css';

export type FilesInputProps = {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FilesInput = (props: FilesInputProps) => {
  const { onChangeHandler } = props;

  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className={classes.filesInputBox}>
      <span className={classes.filesInputCustomButton}>
        <Button>
          {files?.length ? 'Clear All And Add' : 'Add Files'}
          <input
            className={classes.filesInput}
            onChange={(e) => {
              setFiles(e.target.files);
              onChangeHandler(e);
            }}
            type="file"
            multiple
          />
        </Button>
        {files?.length ? <span>Files Added: {files.length}</span> : null}
      </span>
      <div>
        {files?.length ? (
          <>
            <h4 className={classes.filesHeader}>Attached Files:</h4>
            {Array.from(files).map((file) => (
              <p className={classes.filesFileName}>{file.name}</p>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};
