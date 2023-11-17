// Hooks
import { useForm } from 'shared/UI/Input/hooks';
// Components
import { Button } from 'shared/UI/Button';
import { Input } from 'shared/UI/Input';
// Lib
import { isEmptyString } from 'shared/lib';
// Types
import { UseForm } from 'shared/UI/Input/hooks';

type CommentFormProps = {
  type: 'Comment' | 'ReplyToComment';
  onClickHandler: (form: UseForm) => void;
};

export const CommentForm = (props: CommentFormProps) => {
  const { type, onClickHandler } = props;

  const formInitialState = {
    author: {
      value: '',
      error: {
        message: 'Pls Add Author',
        isOpen: false,
      },
    },
    comment: {
      value: '',
      error: { message: 'Pls Add Comment', isOpen: false },
    },
  };

  const [form, onChange, error] = useForm(formInitialState);

  const checkInputs = () => {
    const authorInput = isEmptyString(form.author.value);
    authorInput && error('author');

    const commentInput = isEmptyString(form.comment.value);
    commentInput && error('comment');

    const ready = !authorInput && !commentInput;

    if (ready) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div style={{ margin: '10px' }}>
      <ul>
        <li>
          <Input
            value={form.author.value}
            onChangeHandler={(e) => {
              onChange('author', e);
            }}
            error={form.author.error}
            placeholder="Author"
          />
        </li>
        <li>
          <Input
            value={form.comment.value}
            onChangeHandler={(e) => {
              onChange('comment', e);
            }}
            error={form.comment.error}
            placeholder="Comment"
          />
        </li>
      </ul>
      <Button
        onClickHandler={() => {
          if (checkInputs()) {
            onClickHandler(form);
          }
        }}
      >
        {type === 'Comment' ? 'Comment' : 'Reply'}
      </Button>
    </div>
  );
};
