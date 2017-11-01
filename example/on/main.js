import Omi from '../../src/index.js'
import Hello from './hello.js'

class App extends Omi.Component {
    install() {
        this.name = 'Omi'

        this.handleClick = this.handleClick.bind(this)

    }

    handleClick(e) {
        this.name = 'Omix'
        this.update()
    }

    style() {
        return `h3{
                    color:red;
                    cursor: pointer;
                }`
    }

    render() {
        return <div>
                    <Hello name={this.name}></Hello>
                    <h3 onclick={this.handleClick}>Scoped css and event test! click me!</h3>
                </div>
    }
}

Omi.render(new App(), 'body')
