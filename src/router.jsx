/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext(null);

function parseHashLocation() {
    const rawHash = typeof window === 'undefined' ? '' : window.location.hash.slice(1);
    const route = rawHash || '/';
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    const [pathnamePart, searchPart = ''] = normalizedRoute.split('?');

    return {
        pathname: pathnamePart || '/',
        search: searchPart ? `?${searchPart}` : '',
        hash: '',
        key: normalizedRoute
    };
}

function toHashUrl(to) {
    const path = String(to || '/');
    return `#${path.startsWith('/') ? path : `/${path}`}`;
}

export function HashRouter({ children }) {
    const [location, setLocation] = useState(parseHashLocation);

    useEffect(() => {
        const handleHashChange = () => setLocation(parseHashLocation());
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const navigate = useCallback((to, options = {}) => {
        if (typeof to === 'number') {
            window.history.go(to);
            return;
        }

        const nextUrl = toHashUrl(to);
        if (options.replace) {
            window.history.replaceState(window.history.state, '', nextUrl);
            setLocation(parseHashLocation());
            return;
        }

        window.location.hash = nextUrl.slice(1);
    }, []);

    const value = useMemo(() => ({ location, navigate }), [location, navigate]);

    return (
        <RouterContext.Provider value={value}>
            {children}
        </RouterContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error('useLocation precisa estar dentro de HashRouter.');
    }

    return context.location;
}

export function useNavigate() {
    const context = useContext(RouterContext);
    if (!context) {
        throw new Error('useNavigate precisa estar dentro de HashRouter.');
    }

    return context.navigate;
}

export function Navigate({ to, replace = false }) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(to, { replace });
    }, [navigate, replace, to]);

    return null;
}

export function Link({ to, onClick, children, ...props }) {
    const navigate = useNavigate();

    const handleClick = (event) => {
        onClick?.(event);
        if (
            event.defaultPrevented
            || event.button !== 0
            || event.metaKey
            || event.altKey
            || event.ctrlKey
            || event.shiftKey
        ) {
            return;
        }

        event.preventDefault();
        navigate(to);
    };

    return (
        <a href={toHashUrl(to)} onClick={handleClick} {...props}>
            {children}
        </a>
    );
}

export function Route() {
    return null;
}

export function Routes({ children }) {
    const location = useLocation();
    const routes = React.Children.toArray(children);
    const matchedRoute = routes.find((route) => {
        if (!React.isValidElement(route)) return false;
        return route.props.path === location.pathname || route.props.path === '*';
    });

    return matchedRoute?.props?.element || null;
}
