import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'
import * as defaultVeeRules from 'vee-validate/dist/rules'
import Vue from 'vue'

Object.keys(defaultVeeRules).forEach(rule => {
  extend(rule, defaultVeeRules[rule]);
});

// with typescript
for (let [rule, validation] of Object.entries(defaultVeeRules)) {
  extend(rule, {
    ...validation
  });
}

function registerVeeValidation() {
  setInteractionMode('eager')
  registerRules()
}

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

export { registerVeeValidation }

