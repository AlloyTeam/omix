import Omi from './omi.js'

// many thanks to https://github.com/thomaspark/scoper/
function scoper(css, prefix) {
    // https://www.w3.org/TR/css-syntax-3/#lexical
    css = css.replace(/\/\*[^*]*\*+([^/][^*]*\*+)*\//g, '')
    // eslint-disable-next-line
    let re = new RegExp('([^\r\n,{}:]+)(:[^\r\n,{}]+)?(,(?=[^{}]*{)|\s*{)', 'g')
    /**
     * Example:
     *
     * .classname::pesudo { color:red }
     *
     * g1 is normal selector `.classname`
     * g2 is pesudo class or pesudo element
     * g3 is the suffix
     */
    css = css.replace(re, function(g0, g1, g2, g3) {
        if (typeof g2 === 'undefined') {
            g2 = ''
        }

        /* eslint-ignore-next-line */
        if (g1.match(/^\s*(@media|\d+%?|@-webkit-keyframes|@keyframes|to|from|@font-face)/)) {
            return g1 + g2 + g3
        }

        let appendClass = g1.replace(/(\s*)$/, '') + prefix + g2
        let prependClass = prefix + ' ' + g1.trim() + g2
        return appendClass + ',' + prependClass + g3
    })

    return css
}

function addStyle(cssText, id) {
    let ele = document.getElementById(Omi.PREFIX + id)
    let head = document.getElementsByTagName('head')[0]
    if (ele && ele.parentNode === head) {
        head.removeChild(ele)
    }

    let someThingStyles = document.createElement('style')
    head.appendChild(someThingStyles)
    someThingStyles.setAttribute('type', 'text/css')
    someThingStyles.setAttribute('id', Omi.PREFIX + id)
    if (window.ActiveXObject) {
        someThingStyles.styleSheet.cssText = cssText
    } else {
        someThingStyles.textContent = cssText
    }
}

export default {
    scoper: scoper,
    addStyle: addStyle
}
