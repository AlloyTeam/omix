import Omi from '../../src/index.js'
import TodoApp from './todo-app.js'
import Store from './store.js'


let app = new TodoApp()
let store = new Store({
    items: [
        {id: 1, text: 'Omi'},
        {id: 2, text: 'AlloyTeam'}
    ],
    text: ''
},{
    add: (text)=>{
        //�������ע�붯����Ч�������߼��ٽ���app.update������
        setTimeout(()=>{
            app.update()
        },1000)

    }
})



Omi.render(app, 'body', {
    store
})
