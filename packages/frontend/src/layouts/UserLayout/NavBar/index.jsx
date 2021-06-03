import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import {
  Home as HomeIcon,
  BarChart as BarChartIcon,
  BookOpen as ClassRoomIcon,
  Book as CourseIcon,
  Users as UsersIcon,
  FileText as AssessmentIcon,
  Edit as EnrollmentIcon,
  LogOut as LogOutIcon
} from 'react-feather';
import CustomTooltip from 'src/utils/CustomTooltip';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/home',
    icon: HomeIcon,
    title: 'Home',
    type: 'user'
  },
  {
    href: '/app/enrollments',
    icon: EnrollmentIcon,
    title: 'Matrículas',
    type: 'user'
  },
  {
    href: '/app/student-assessment-applications',
    icon: AssessmentIcon,
    title: 'Avaliações',
    type: 'user'
  },
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    type: 'admin'
  },
  {
    href: '/app/students',
    icon: UsersIcon,
    title: 'Discentes',
    type: 'admin'
  },
  {
    href: '/app/teachers',
    icon: UsersIcon,
    title: 'Docentes',
    type: 'admin'
  },
  {
    href: '/app/coordinators',
    icon: UsersIcon,
    title: 'Coordenadores',
    type: 'root'
  },
  {
    href: '/app/courses',
    icon: CourseIcon,
    title: 'Cursos',
    type: 'admin'
  },
  {
    href: '/app/classrooms',
    icon: ClassRoomIcon,
    title: 'Turmas',
    type: 'admin'
  },
  // {
  //   href: '/app/teste',
  //   icon: AssessmentIcon,
  //   title: 'Teste'
  // }
];

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 25px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const timer = setTimeout(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setUser({
        name: userData ? userData.firstName : '',
        email: userData ? userData.email : '',
      });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <CustomTooltip title="Editar o seu perfil">
          <Avatar
            className={classes.avatar}
            component={RouterLink}
            src={user.avatar}
            to="/app/account"
          />
        </CustomTooltip>
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              type={item.type}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
          <Button
            className={classes.button}
            component={RouterLink}
            to="/"
          >
            <LogOutIcon
              className={classes.icon}
              size="20"
            />
            <span className={classes.title}>
              Sair
            </span>
          </Button>

        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
