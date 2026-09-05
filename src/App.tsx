import { Toaster } from 'sonner'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Overview from './pages/Overview'
import Customers from './pages/Customers'
import Orders from './pages/Orders'
import Menu from './pages/Menu'
import Payment from './pages/Payment'
import Review from './pages/Review'
import Notification from './pages/Notification'
import Settings from './pages/Settings'
import ViewMenu from './pages/ViewMenu'
import Login from './pages/auth/Login'
import { useUser } from './context/UserContext'

function App() {
  const { loading } = useUser()

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>
  }

  return (
    <>
      <Toaster />

      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/dashboard/overview'
          element={
            <MainLayout
              child={<Overview />}
              heading='Overview'
            />
          }
        />
        <Route
          path='/dashboard/customers'
          element={
            <MainLayout
              child={<Customers />}
              heading='Customers'
            />
          }
        />
        <Route
          path='/dashboard/order'
          element={
            <MainLayout
              child={<Orders isRecent={true} />}
              heading='Orders'
            />
          }
        />
        <Route
          path='/dashboard/order/view/:order_no'
          element={
            <MainLayout
              child={<ViewMenu />}
              heading='Orders'
            />
          }
        />
        <Route
          path='/dashboard/order/edit/:id'
          element={
            <MainLayout
              child={<ViewMenu />}
              heading='Edit Order'
            />
          }
        />
        <Route
          path='/dashboard/menu'
          element={
            <MainLayout
              child={<Menu />}
              heading='Menu'
            />
          }
        />
        <Route
          path='/dashboard/payment'
          element={
            <MainLayout
              child={<Payment />}
              heading='Payment'
            />
          }
        />
        <Route
          path='/dashboard/review'
          element={
            <MainLayout
              child={<Review />}
              heading='Review'
            />
          }
        />
        <Route
          path='/dashboard/notification'
          element={
            <MainLayout
              child={<Notification />}
              heading='Notification'
            />
          }
        />
        <Route
          path='/dashboard/settings'
          element={
            <MainLayout
              child={<Settings />}
              heading='settings'
            />
          }
        />
        <Route
          path='/dashboard/analysis'
          element={
            <MainLayout
              child={<Settings />}
              heading='Analysis'
            />
          }
        />
      </Routes>

    </>
  )
}

export default App
