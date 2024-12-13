import { useField, useFormikContext } from 'formik';
import Quill from 'quill';
import React, { useLayoutEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { FieldErrorInfo, IInputField, InputLabel, InputWrapper } from './FormField';

const RichTextInputField: React.FC<IInputField> = ({
  label,
  className,
  placeholder,
  ...props
}) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const [field, meta] = useField(props);
  const { handleBlur, setFieldValue } = useFormikContext<any>();

  const initializeQuill = () => {
    const quillElement = quillRef.current as HTMLDivElement & {
      __quill?: Quill;
    };

    if (quillElement && !quillElement.__quill) {
      const quill = new Quill(quillElement, {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            ['blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
          ],
        },
        placeholder: placeholder,
        theme: 'snow',
      });

      quillElement.__quill = quill;

      if (field.value) {
        quill.clipboard.dangerouslyPasteHTML(field.value);
      }

      const handleTextChange = () => {
        const editorContent = quill.root.innerHTML.trim();
        const isEmpty =
          editorContent === '<p><br></p>' ||
          editorContent === '<h1><br></h1>' ||
          editorContent === '<h2><br></h2>' ||
          editorContent === '<h3><br></h3>' ||
          editorContent === '';
        setFieldValue(props.name, isEmpty ? '' : editorContent);
      };

      quill.on('text-change', handleTextChange);
      quill.on('blur', () => handleBlur({ target: { name: props.name } }));

      return () => {
        quill.off('text-change', handleTextChange);
      };
    }
  };

  // Use useLayoutEffect for immediate visual updates
  useLayoutEffect(() => {
    initializeQuill();
    // eslint-disable-next-line
  }, []);

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>{label}</InputLabel>
      <Shell>
        <QuillBox
          ref={quillRef}
          className='ql-editor'
          onBlur={() => handleBlur({ target: { name: props.name } })}
          style={{ height: '329px' }}
        ></QuillBox>
      </Shell>
      {meta.touched && meta.error ? (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      ) : null}
    </InputWrapper>
  );
};

export default RichTextInputField;

const Shell = styled.div`
  width: 100%;

  & > .ql-toolbar.ql-snow {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom: none;
  }

  &:focus-within {
    & > .ql-toolbar.ql-snow {
      border: 1px solid ${({ theme }) => theme.palette.greyGrey1};
      border-bottom: none;
    }
  }
`;

const QuillBox = styled.div`
  &.ql-editor {
    font-weight: 400;
    color: ${({ theme }) => theme.palette.blackBlack2};
    font-family: 'Kanit';
    font-size: 16px;
    overflow-y: auto;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    &:focus-within {
      border: 1px solid ${({ theme }) => theme.palette.greyGrey1};
      border-top: none;
    }
  }
`;
