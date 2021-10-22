
interface loginState {
    token: string;
}

const state = () => ({
    token: '',
})


const mutations = {
    setToken(state: loginState, param: string){
        state.token = param;
    },
    removeToken(state: loginState){
        state.token = '';
    }
}

const getters = {
    token: (state: loginState) => state.token
}

const actions = {
    setToken(ctx: any, param: string){
        ctx.commit('setToken', param);
        sessionStorage.setItem('token', param);
    },
    removeToken(ctx: any){
        ctx.commit('removeToken');
        sessionStorage.removeItem('token');
    }
}

export default {namespaced: true, state, mutations, getters, actions}

// export default login;