import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { useState, useContext, useEffect } from 'react';

import './Modal.scss';

import AuthContext from '../../context/AuthProvider';
import Button from '../buttons/Button';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function DeleteModal(props) {
  const [ message, setMessage ] = useState('');
  const [ targetType, setTargetType ] = useState('');
  const [ identifier, setIdentifier ] = useState('');
  const [ targetTitle, setTargetTitle ] = useState('');
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  
  const { onClose } = props;

  const title = 'Delete confirmation';

  const deleteConfirm = async() => {
    try {
      if (targetType === 'project') {
        await axiosPrivate.delete(`/projects/${identifier}`)
      };
      if (targetType === 'contributor') {
        await axiosPrivate.delete(`/contributors/${identifier}`)
      };
      props.deleteSuccessful(identifier);
      setTimeout(onClose, 500);
      
    } catch (err) {
      setMessage(err?.response?.data?.error);
    }
  }

  const closeModal = () => {
    setMessage('');
    onClose();
  };

  useEffect(() => {
    if (props.target.project) {
      setTargetType('project');
      setIdentifier(props.target.project.slug);
      setTargetTitle(props.target.project.title);
    };
    if (props.target.contributor) {
      setTargetType('contributor');
      setIdentifier(props.target.contributor._id);
      setTargetTitle(props.target.contributor.title);
    };
  }, [props])

  if (!props.isOpen) return null;

  return (
    <>
      <div className={'overlay'} onClick={closeModal}>
      </div>
      <div className={'modal'}>
        <Box className={'modal-content'}>
          <Typography variant={'h6'} className={'modal-title'}>
            {title}
          </Typography>

          <Typography variant={'body2'} className={'modal-text'}>
            Are you sure you would like to delete {targetType} <span className='highlight-text'>{targetTitle}</span>? This cannot be undone.
          </Typography>

          <Typography variant={'caption'} className={'modal-error'}>
            {message}
          </Typography>
        </Box>

        <Box padding={2}>
          <Button 
            onClick={deleteConfirm}
            title='Delete'
            variant='contained'
            category="action"
          />
          <Button 
            onClick={closeModal}
            title='Cancel'
            variant='outlined'
            category="action"
          />
        </Box>
      </div>
    </>
  )
}
