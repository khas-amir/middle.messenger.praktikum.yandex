import { render } from './utils/renderDom'

//pages 
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Block from './utils/Block';
import Signin from './pages/Signin';
import ChangeProfile from './pages/ChangeProfile';
import ChangePassword from './pages/ChangePassword';
import IndexPage from './pages/IndexPage';
import Error from './pages/Error';

//styles
import '../static/css/styles.pcss';


const events = {
    'blur': (e: InputEvent) => {
        console.log(e.target)
    }
}

const user = {
    "email": "pochta@yandex.ru",
    "login": "ivanivanov",
    "first_name": "Иван",
    "second_name": "Иванов",
    "chat_login": "Иван",
    "phone": "+7 (909) 967 30 30",
    "username": "Иван"
}

const renderPage = (block: Block) => render('#app', block);

document.addEventListener('DOMContentLoaded', () => {
    // const app =  document.getElementById('app');
    if (window.location.pathname === '/') {
        renderPage(new IndexPage());
    }
})

window.addEventListener('hashchange', () => {
    const app = document.getElementById('app');
    if (app) {
        app.textContent = ''
    }
    switch (window.location.hash) {
        case '#login':
            renderPage(new Login())
            break;
        case '#profile':
            renderPage(new UserProfile({ profile: user }))
            break;
        case '#signin':
            renderPage(new Signin());
            break;
        case '#change_profile':
            renderPage(new ChangeProfile({profile: user}))
            break;
        case '#change_password':
            renderPage(new ChangePassword({profile: user}))
            break;
        case '#404':
            renderPage(new Error({errorCode: 404, errorMessage: 'Не туда попали'}))
            break;
        case '#500':
            renderPage(new Error({errorCode: 500, errorMessage: 'Мы уже фиксим'}))
            break;

        default:
            break;
    }

})

