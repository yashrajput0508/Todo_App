import { useState } from 'react';
import './TodoApp.css';
import { Link, Navigate, Outlet, RouterProvider, createBrowserRouter, useNavigate, useParams } from 'react-router-dom';
import LogoutComponent from '../logoutcomponent/LogoutComponent';
import FooterComponent from '../footercomponent/FooterComponent';
import HeaderComponent from '../headercomponent/HeaderComponent';
import ListTodosComponent from '../listtodoscomponent/ListTodosComponent';
import ErrorComponent from '../errorcomponent/ErrorComponent';
import WelcomeComponent from '../welcomecomponent/WelcomeComponent';
import LoginComponent from '../logincomponent/LoginComponent';
import AuthProvider, { useAuth } from '../security/AuthContext';
import TodoComponent from '../todoComponent/TodoComponent';

const router = createBrowserRouter([
    {
        path: "/", Component: Format, children: [
            { path: "/", Component: LoginComponent },
            { path: "/login", Component: LoginComponent },

            { path: "/welcome/:username", element:(
                <AuthenticatedRoute>
                    <WelcomeComponent />
                </AuthenticatedRoute>
            )},

            { path: "/todos", element:(
                <AuthenticatedRoute>
                    <ListTodosComponent />
                </AuthenticatedRoute>
            )},
            { path: "/todo/:id", element:(
                <AuthenticatedRoute>
                    <TodoComponent />
                </AuthenticatedRoute>
            )},
            { path: "/logout", element:(
                <AuthenticatedRoute>
                    <LogoutComponent />
                </AuthenticatedRoute>
            ) },
            { path: '*', Component: ErrorComponent }
        ]
    }
]);

function AuthenticatedRoute({children}) {
    const authContext = useAuth();

    if(authContext.isAuthenticated)
        return children;

    return <Navigate to="/" />
}

function Format() {
    return (
        <>
            <HeaderComponent />
            <Outlet />
            <FooterComponent />
        </>
    )
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <RouterProvider router={router}>
                </RouterProvider>
            </AuthProvider>
        </div>
    )
}

