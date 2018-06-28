const routers = {
    '/index': {
        component(resolve) {
            require(['./views/index.vue'], resolve);
        }
    },
    '/prescription': {
        component(resolve) {
            require(['./views/prescription.vue'], resolve);
        }
    },
    '/user': {
        component(resolve) {
            require(['./views/user.vue'], resolve);
        }
    },
    '/prescription/edit/:id': {
        component(resolve) {
            require(['./views/prescription_edit.vue'], resolve);
        }
    },
    '/prescription/add': {
        component(resolve) {
            require(['./views/prescription_edit.vue'], resolve);
        }
    }
};
export default routers;
