/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  ListItem,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  visibled: {
    visibility: 'hidden'
  }
}));

const NavItem = ({
  className,
  href,
  icon: Icon,
  title,
  type,
  ...rest
}) => {
  const classes = useStyles();

  const [user, setUser] = useState({ role: 'student' });

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setUser({
        role: userData ? userData.role : 'student',
      });
    }, 250);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {(type === 'admin' && user.role === 'student')
         || (type === 'root' && user.role === 'student')
         || (type === 'root' && user.role === 'teacher')
         || (type === 'user' && user.role === 'teacher') ? (<></>)
        : (
          <ListItem
            className={clsx(classes.item, className)}
            disableGutters
            {...rest}
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={RouterLink}
              to={href}
            >
              {Icon && (
              <Icon
                className={classes.icon}
                size="20"
              />
              )}
              <Typography
                variant={user.role === 'student' ? 'h4' : 'h5'}
                element="p"
                className={classes.title}
              >
                {title}

              </Typography>
            </Button>

          </ListItem>
        )}
    </div>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  type: PropTypes.string
};

export default NavItem;
