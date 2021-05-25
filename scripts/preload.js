// 向网页window注入electron api
window.electron = window?.require('electron') ?? {};
