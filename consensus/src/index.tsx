import ReactDom from 'react-dom'
import App from './App'
import React from 'react'

const provider = (Component: any) => {
    return <Component />
}

ReactDom.render(provider(App), document.getElementById('root'))
