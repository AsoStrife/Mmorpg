<template>
    <div class="container">
        <div class="row justify-content-center fixed-bottom">
            <h1>Kasteddu</h1>
            <div class="col-4 login">
                <p>Scegli uno username per iniziare a giocare</p>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <input type="text" placeholder="Username" class="form-control username-input"
                            v-model="user.nickname" :maxlength="maxTextLength">
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-outline-info float-end">Accedi</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

export default {
    name: 'rpg-login',
    inject: ['rpgGui', 'rpgGuiInteraction', 'rpgSocket'],
    components: {
    },
    data() {
        return {
            page: 'login',
            user: {
                nickname: '',
                sex: ''
            },
            maxTextLength: 12

        }
    },
    mounted() {
        const socket = this.rpgSocket()
        socket.on('login-fail', ({ message }) => {
            let msg = ''
            switch (message) {
                case 'LOGIN_FAIL':
                    msg = 'Your login details are not correct!'
                    break;
                case 'PLAYER_IN_GAME':
                    msg = 'You are already playing in the game'
                    break;
                default:
                    msg = 'An error has occurred'
            }
            this.notificationError(msg)
        })
    },
    methods: {
        login() {
            if (!this.user.nickname) {
                return this.notificationError('Please enter a nickname')
            }

            this.rpgGuiInteraction('rpg-title-screen', 'login', this.user)
        },
        notificationError(msg) {
            this.rpgGui.display('rpg-notification', {
                message: msg,
                time: 5000,
                position: 'top',
                type: 'error'
            })
        }
    }
}
</script>

<style scoped lang="scss">
$title-screen-window-bg: #07111c;
$title-screen-window-border: 3px solid #0dcaf0;

h1 {
    font-size: 6rem; 
    color: #07111c;
    text-align: center;
    text-transform: uppercase; 
    letter-spacing: 4px; 
    text-shadow: 2px 2px #0dcaf0;
}
.row {
    margin-bottom: 5%;
}
.login {
    background-color: $title-screen-window-bg;
    border: $title-screen-window-border;
    color: white;
    margin: auto auto;
    padding: 15px;
    align-self: flex-end;
    opacity: 0.9;
}

.username-input {
    background-color: #07111c;
    color: white;
    border: 1px solid #0dcaf0;
}

.form-control::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: white;
}


</style>