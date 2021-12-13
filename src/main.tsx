import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Spin } from '@douyinfe/semi-ui'

import './index.css'
import { Posts } from './feature/Posts'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<Spin size="large" />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Posts />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
)
