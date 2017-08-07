import Omi from '../../src/index.js'
import HE from './hello2.js'
Omi.tag('aa', HE)

class Hello extends Omi.Component {
    style() {
        return `div{
            cursor: pointer;
        }`
    }

    install() {
        console.log(11)
    }
    installed() {
        console.log(22)
    }

    beforeUpdate() {
        console.log('beforeUpdate' + 11)
    }

    beforeRender() {
        console.log('beforeRender' + 22)
    }
    afterUpdate() {
        console.log('afterUpdate' + 33)
    }
    clickHandler(evt) {
        alert(evt.target.innerHTML)
    }

    render() {
        return <div onclick={this.clickHandler.bind(this)}>Hello, {this.data.name}<aa></aa></div>
    }
}

Omi.tag('hello', Hello)
export default Hello
