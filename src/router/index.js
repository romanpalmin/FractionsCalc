import Vue from 'vue';
import Router from 'vue-router';
import Calculator from '@/pages/Calculator';
import Comments from '@/pages/Comments';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calculator',
      component: Calculator
    },
    {
      path: '/Calculator',
      name: 'Calculator',
      component: Calculator
    },
    {
      path: '/Comments',
      name: 'Comments',
      component: Comments
    }
  ]
})
