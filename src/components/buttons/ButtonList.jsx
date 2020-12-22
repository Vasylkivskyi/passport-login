import React from 'react';
import { data } from '../../data';
import IconButton from './IconButton';

const ButtonsList = () => {
  return data.map((app) => <IconButton app={app} key={app.name} />)
}

export default ButtonsList;
