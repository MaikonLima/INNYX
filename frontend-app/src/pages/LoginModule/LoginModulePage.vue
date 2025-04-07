<template>
    <div class="flex items-center justify-center h-screen bg-green-100">
        <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-4">
            <div class="flex flex-col justify-center items-center">
                <img src="../../assets/icons/stock-icon.png" class="w-16 h-16" />
                <h2 class="text-2xl font-bold text-center mb-6">Acesso ao sistema</h2>
            </div>

            <div class="flex flex-col space-y-4">
                <InputTextField id="user_name" name="user" v-model="username" label="Usuário" placeholder="usuário" />
                <InputTextField id="user_password" name="password" v-model="password" type="password" label="Senha"
                    placeholder="senha" />
            </div>

            <div>
                <ButtonComponent label="Entrar" @click="handleLogin" style="width: 100%;" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent.vue';
import InputTextField from '../../components/InputComponent/InputTextFieldComponent/InputTextField.vue';
import Auth from '../../middleware/auth';
import router from '../../routes';

const username = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        const payload = {
            email: username.value,
            password: password.value,
        };

        await Auth(payload);
        router.push('/');
        alert('Login realizado com sucesso!');
    } catch (error) {
        alert('Usuário ou senha inválidos!');
        console.error(error);
    }
};
</script>

<style lang="scss" scoped></style>