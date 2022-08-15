//pages 
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Signin from './pages/Signin';
import ChangeProfile from './pages/ChangeProfile';
import ChangePassword from './pages/ChangePassword';
import Error from './pages/Error';

//styles
import '../static/css/styles.pcss';

import Router from "./modules/Router";

const user = {};


export const router = new Router('#app');

router
    .use('/', Login)
    .use('/settings', UserProfile, {profile: user})
    .use('/sign-up', Signin)
    .use('/404', Error, {errorCode: 404, errorMessage: 'Не туда попали'})
    .use('/500', Error, {errorCode: 500, errorMessage: 'Мы уже фиксим'})
    .use('/change_profile', ChangeProfile, {profile: user})
    .use('/change_password', ChangePassword, {profile: user})
.start();
