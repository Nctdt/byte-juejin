import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import dayjs from 'dayjs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Spin } from '@douyinfe/semi-ui'

import { Post } from './feature/Post'
import { Posts } from './feature/Posts'

import './index.css'
declare global {
  interface Window {
    dayjs: typeof dayjs
  }
}
window.dayjs = dayjs
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<Spin size="large" />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/post/:postId" element={<Post />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
)
