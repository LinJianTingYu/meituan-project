// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex)

const store=new Vuex.Store({
	state:{
       foods:[]
	},
	getters:{
       getFoods(state){
       	return state.foods
       }
	},
	mutations:{
		setFoods(state,data){
            
			// console.log(data);
			state.foods=data;
		},
		resetFoods(state,data){
			state.foods.forEach((item)=>{
				item.spus.forEach((spus,index)=>{
					if (spus.name==data.name) {
						console.log(1);
						spus[index]=data;
						// console.log(spus)
					}
				})
			})

		}
	},
	actions:{}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
