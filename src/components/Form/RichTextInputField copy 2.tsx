import { useField, useFormikContext } from 'formik';
import { debounce } from 'lodash';
import Quill from 'quill';
import React, { useCallback, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import {
  FieldErrorInfo,
  IInputField,
  InputLabel,
  InputWrapper,
} from './FormField';

const RichTextInputField: React.FC<IInputField> = React.memo(
  ({ label, className, placeholder, ...props }) => {
    const quillRef = useRef<HTMLDivElement | null>(null);
    const [field, meta, helper] = useField(props);
    const { handleBlur } = useFormikContext<any>();

    useEffect(() => {
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
              [
                // "link",
                'blockquote',
              ],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ align: [] }],
            ],
          },
          placeholder: placeholder,
          theme: 'snow',
        });

        if (quill) {
        }

        quillElement.__quill = quill;

        if (field.value) {
          quill.clipboard.dangerouslyPasteHTML(field.value);
        }

        // Handle content changes
        const handleTextChange = debounce(() => {
          const editorContent = quill.root.innerHTML.trim();
          const isEmpty =
            editorContent === '<p><br></p>' ||
            editorContent === '<h1><br></h1>' ||
            editorContent === '<h2><br></h2>' ||
            editorContent === '<h3><br></h3>' ||
            editorContent === '';
          helper.setValue(isEmpty ? '' : editorContent);
        }, 300);

        quill.on('text-change', handleTextChange);

        // Trigger handleBlur when the editor loses focus
        quill.on('blur', () => {
          handleBlur({ target: { name: props.name } });
        });

        // Reset Quill when field value is empty
        return () => {
          quill.off('text-change', handleTextChange);
          if (field.value === '') {
            quill.setText('');
          }
        };
      }
      // eslint-disable-next-line
    }, [field.value, props.name, handleBlur, helper]);

    // Additional effect for resetting Quill when field.value changes to empty
    useEffect(() => {
      if (field.value === '') {
        const quill = (quillRef.current as HTMLDivElement & { __quill?: Quill })
          .__quill;
        if (quill) {
          quill.setText('');
        }
      }
    }, [field.value]);

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
  }
);

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
