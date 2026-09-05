const state = () => ({
  token: localStorage.getItem('token') || '',
  roles: localStorage.getItem('roles') || '',
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  organizable: JSON.parse(localStorage.getItem('organizable') || '{}'),
});

const getters = {
  isAuthenticated(state) {
    return state.token !== '';
  },
  getUserRoles(state) {
    return state.roles;
  },
  getUserInfo(state) {
    return state.user;
  },
  getOrganizable(state) {
    return state.organizable;
  },
  getMfedHostProps(state) {
    return {
      host_userInfo: state.user,
      host_organizable: state.organizable,
      host_roles: state.roles,
      host_token: state.token,
    };
  },
};

const mutations = {
  setToken(state, token) {
    localStorage.setItem('token', token);
    state.token = token;
  },
  setUserRoles(state, roles) {
    localStorage.setItem('roles', roles);
    state.roles = roles;
  },
  setUserInfo(state, user) {
    localStorage.setItem('user', JSON.stringify(user));
    state.user = user;
  },
  setOrganizable(state, organizable) {
    localStorage.setItem('organizable', JSON.stringify(organizable));
    state.organizable = organizable;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
