import React from 'react';
import { Navigate } from 'react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

function ProtectedRoute({ children }) {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
