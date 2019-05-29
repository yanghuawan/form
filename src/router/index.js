
/*
路由器对象模块
 */
import Vue from 'vue'
import Router from 'vue-router'
import HeaderGuide from '../components/common/HeaderGuide'
import dashboard from '../components/Dashboard/dashboard'
import management from '../components/Management/management'
import lessonslibrary from '../components/LessonsLibrary/lessonslibrary'
import dynamic from '../components/Dynamic/dynamic'
import documentmanagement from '../components/DocumentManagement/documentmanagement'
import process from '../components/Process/process'

// 测试
import sorter from '../components/common/Sorter'
import NewPost from '../components/common/NewPost'
import Demo from '../components/common/Demo'
import upload from '../components/common/Upload'


import Demo01 from '../components/NewForm/Demo01'
import Dragger from '../components/Dragger/Dragger'

import Base from '../components/Dragger/mixin/Base'
import Form from '../components/Dragger/mixin/Form'
import Process from '../components/Dragger/mixin/Process'

// 工作台
import LeftMenu from '../components/Workbench/LeftMenu'
import RightMenu from '../components/Workbench/RightMenu'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HeaderGuide,
      children: [
        {
          path: 'dashboard',
          component: dashboard
        },
        {
          path: 'management',
          component: management
        },
        {
          path: 'lessonslibrary',
          component: lessonslibrary
        },
        {
          path: 'dynamic',
          component: dynamic
        },
        {
          path: 'documentmanagement',
          component: documentmanagement
        },
        {
          path: 'process',
          component: process
        }
      ]
    },
    { path: '/b',
      component: sorter },
    { path: '/c',
      component: Demo },
    { path: '/a',
      component: NewPost },
    { path: '/d',
      component: upload },
    {
      path: '/e',
      name: 'Demo01',
      component: Demo01
    },
    {
      path: '/dragger',
      name: 'Dragger',
      component: Dragger,
      redirect: '/dragger/form',
      children: [
        { path: 'base',
          name: 'Base',
          component: Base },
        { path: 'form',
          name: 'Form',
          component: Form },
        { path: 'process',
          name: 'Process',
          component: Process }
      ]
    },
    {
      path: '/LeftMenu',
      name: 'LeftMenu',
      component: LeftMenu,
      redirect: '/LeftMenu/RightMeun',
      children: [
        { path: 'RightMeun',
          name: 'RightMeun',
          component: RightMenu }
      ]
    }
  ]
})
